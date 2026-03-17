# Authors: Joysusy & Violet Klaudia 💖
"""Hybrid search engine with Reciprocal Rank Fusion (RRF)."""
from __future__ import annotations

import logging
import struct
from dataclasses import dataclass, field
from typing import Any

from storage.sqlite_store import SQLiteStore

log = logging.getLogger("lavender.hybrid_search")

DEFAULT_RRF_K = 60
DEFAULT_CANDIDATE_LIMIT = 50


@dataclass
class SearchResult:
    memory_id: str
    title: str
    score: float
    sources: list[str] = field(default_factory=list)
    rank_details: dict[str, float] = field(default_factory=dict)
    memory: dict[str, Any] | None = None


class HybridSearchEngine:
    """Three-channel search with RRF fusion: BM25 + Vector + Metadata."""

    def __init__(
        self,
        store: SQLiteStore,
        embedding_provider: Any | None = None,
        rrf_k: int = DEFAULT_RRF_K,
    ) -> None:
        self._store = store
        self._embedding = embedding_provider
        self._k = rrf_k

    async def search(
        self,
        query: str,
        limit: int = 10,
        project: str | None = None,
        category: str | None = None,
        memory_type: str | None = None,
        min_importance: int = 0,
        tags: list[str] | None = None,
        mind_context: dict[str, Any] | None = None,
    ) -> list[SearchResult]:
        candidate_limit = max(limit * 5, DEFAULT_CANDIDATE_LIMIT)

        bm25_results = await self._fts5_search(query, candidate_limit, project)
        vector_results: list[tuple[str, float]] = []
        if self._embedding:
            vector_results = await self._vector_search(query, candidate_limit, project)
        metadata_results: list[tuple[str, float]] = []
        has_filters = any([category, memory_type, min_importance, tags])
        if has_filters:
            metadata_results = await self._metadata_search(
                project, category, memory_type, min_importance, tags, candidate_limit,
            )

        mind_results: list[tuple[str, float]] = []
        if mind_context:
            mind_results = await self._mind_relevance_search(mind_context, candidate_limit, project)

        channels = [
            ("bm25", bm25_results),
            ("vector", vector_results),
            ("metadata", metadata_results),
            ("mind", mind_results),
        ]
        active = [(name, res) for name, res in channels if res]
        if not active:
            return []

        identity_weights = self._extract_identity_weights(mind_context)
        fused = self._reciprocal_rank_fusion(active, identity_weights)
        top_ids = [mid for mid, _ in fused[:limit]]
        memory_map = await self._fetch_memories(top_ids)

        results: list[SearchResult] = []
        for mem_id, (score, sources, details) in fused[:limit]:
            mem = memory_map.get(mem_id)
            if not mem:
                continue
            results.append(SearchResult(
                memory_id=mem_id,
                title=mem.get("title", ""),
                score=score,
                sources=sources,
                rank_details=details,
                memory=mem,
            ))
        return results

    async def _fts5_search(
        self, query: str, limit: int, project: str | None,
    ) -> list[tuple[str, float]]:
        rows = await self._store.search_memories(query, limit=limit, project=project)
        results: list[tuple[str, float]] = []
        for row in rows:
            rank = abs(row.get("rank", 0.0))
            results.append((row["id"], rank))
        return results

    async def _vector_search(
        self, query: str, limit: int, project: str | None,
    ) -> list[tuple[str, float]]:
        try:
            query_embedding = await self._embedding.embed(query)
        except Exception as exc:
            log.warning("Embedding failed for query: %s", exc)
            return []
        rows = await self._store.get_memories_with_embeddings(limit=limit, project=project)
        scored: list[tuple[str, float]] = []
        for row in rows:
            stored_blob = row.get("embedding")
            if not stored_blob:
                continue
            stored_vec = self._bytes_to_floats(stored_blob)
            if len(stored_vec) != len(query_embedding):
                continue
            sim = self._cosine_similarity(query_embedding, stored_vec)
            scored.append((row["id"], sim))
        scored.sort(key=lambda x: x[1], reverse=True)
        return scored[:limit]

    async def _metadata_search(
        self,
        project: str | None,
        category: str | None,
        memory_type: str | None,
        min_importance: int,
        tags: list[str] | None,
        limit: int,
    ) -> list[tuple[str, float]]:
        rows = await self._store.metadata_search(
            project=project, category=category, memory_type=memory_type,
            min_importance=min_importance, tags=tags, limit=limit,
        )
        results: list[tuple[str, float]] = []
        for row in rows:
            score = float(row.get("importance", 0)) / 10.0
            results.append((row["id"], score))
        return results

    async def _mind_relevance_search(
        self,
        mind_context: dict[str, Any],
        limit: int,
        project: str | None,
    ) -> list[tuple[str, float]]:
        active_minds = mind_context.get("activeMinds", [])
        if not active_minds:
            return []

        mind_names = [m.get("name") for m in active_minds if m.get("name")]
        if not mind_names:
            return []

        rows = await self._store.search_by_mind_context(
            mind_names=mind_names,
            project=project,
            limit=limit,
        )

        scored: list[tuple[str, float]] = []
        for row in rows:
            relevance = self._calculate_mind_relevance(row, active_minds)
            if relevance > 0:
                scored.append((row["id"], relevance))

        scored.sort(key=lambda x: x[1], reverse=True)
        return scored[:limit]

    def _calculate_mind_relevance(
        self,
        memory: dict[str, Any],
        active_minds: list[dict[str, Any]],
    ) -> float:
        mem_mind = memory.get("mind_active")
        if not mem_mind:
            return 0.0

        for mind in active_minds:
            if mind.get("name") == mem_mind:
                weight = mind.get("weight", 1.0)
                return weight

        return 0.3

    def _extract_identity_weights(
        self,
        mind_context: dict[str, Any] | None,
    ) -> dict[str, float]:
        if not mind_context:
            return {}

        weights = mind_context.get("channelWeights", {})
        return {
            "bm25": weights.get("bm25", 1.0),
            "vector": weights.get("vector", 1.0),
            "metadata": weights.get("metadata", 1.0),
            "mind": weights.get("mind", 1.5),
        }

    def _reciprocal_rank_fusion(
        self,
        channels: list[tuple[str, list[tuple[str, float]]]],
        identity_weights: dict[str, float] | None = None,
    ) -> list[tuple[str, tuple[float, list[str], dict[str, float]]]]:
        scores: dict[str, float] = {}
        sources: dict[str, list[str]] = {}
        details: dict[str, dict[str, float]] = {}
        weights = identity_weights or {}

        for channel_name, ranked_list in channels:
            channel_weight = weights.get(channel_name, 1.0)
            for rank, (mem_id, _raw_score) in enumerate(ranked_list):
                rrf_contrib = (1.0 / (self._k + rank + 1)) * channel_weight
                scores[mem_id] = scores.get(mem_id, 0.0) + rrf_contrib
                sources.setdefault(mem_id, []).append(channel_name)
                details.setdefault(mem_id, {})[channel_name] = rrf_contrib

        fused = [
            (mid, (score, sources[mid], details[mid]))
            for mid, score in scores.items()
        ]
        fused.sort(key=lambda x: x[1][0], reverse=True)
        return fused

    async def _fetch_memories(self, mem_ids: list[str]) -> dict[str, dict[str, Any]]:
        result: dict[str, dict[str, Any]] = {}
        for mid in mem_ids:
            mem = await self._store.recall_memory(mid)
            if mem:
                result[mid] = mem
        return result

    @staticmethod
    def _cosine_similarity(a: list[float], b: list[float]) -> float:
        dot = sum(x * y for x, y in zip(a, b))
        norm_a = sum(x * x for x in a) ** 0.5
        norm_b = sum(x * x for x in b) ** 0.5
        if norm_a == 0.0 or norm_b == 0.0:
            return 0.0
        return dot / (norm_a * norm_b)

    @staticmethod
    def _bytes_to_floats(blob: bytes) -> list[float]:
        count = len(blob) // 4
        return list(struct.unpack(f"<{count}f", blob[:count * 4]))

    @staticmethod
    def floats_to_bytes(floats: list[float]) -> bytes:
        return struct.pack(f"<{len(floats)}f", *floats)
