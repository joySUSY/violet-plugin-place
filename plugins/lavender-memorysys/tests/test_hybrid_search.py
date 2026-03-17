# Authors: Joysusy & Violet Klaudia 💖
"""Tests for HybridSearchEngine — RRF fusion, vector math, context packing."""
from __future__ import annotations

import math

import pytest
from memory.hybrid_search import HybridSearchEngine, SearchResult
from memory.manager import MemoryManager
from storage.sqlite_store import SQLiteStore


class TestVectorMath:

    def test_cosine_identical_vectors(self) -> None:
        v = [0.5, 0.5, 0.5, 0.5]
        assert math.isclose(HybridSearchEngine._cosine_similarity(v, v), 1.0, abs_tol=1e-6)

    def test_cosine_orthogonal_vectors(self) -> None:
        a = [1.0, 0.0, 0.0, 0.0]
        b = [0.0, 1.0, 0.0, 0.0]
        assert math.isclose(HybridSearchEngine._cosine_similarity(a, b), 0.0, abs_tol=1e-6)

    def test_cosine_opposite_vectors(self) -> None:
        a = [1.0, 0.0]
        b = [-1.0, 0.0]
        assert math.isclose(HybridSearchEngine._cosine_similarity(a, b), -1.0, abs_tol=1e-6)

    def test_cosine_zero_vector(self) -> None:
        a = [0.0, 0.0, 0.0]
        b = [1.0, 2.0, 3.0]
        assert HybridSearchEngine._cosine_similarity(a, b) == 0.0


class TestBytesConversion:

    def test_floats_bytes_roundtrip(self) -> None:
        original = [0.1, 0.25, 0.5, 0.75, 1.0]
        blob = HybridSearchEngine.floats_to_bytes(original)
        recovered = HybridSearchEngine._bytes_to_floats(blob)
        for a, b in zip(original, recovered):
            assert math.isclose(a, b, abs_tol=1e-6)

    def test_empty_floats(self) -> None:
        blob = HybridSearchEngine.floats_to_bytes([])
        assert blob == b""
        assert HybridSearchEngine._bytes_to_floats(b"") == []

class TestRRFFusion:

    def test_single_channel(self) -> None:
        engine = HybridSearchEngine.__new__(HybridSearchEngine)
        engine._k = 60
        channels = [("bm25", [("m1", 5.0), ("m2", 3.0), ("m3", 1.0)])]
        fused = engine._reciprocal_rank_fusion(channels)
        ids = [mid for mid, _ in fused]
        assert ids == ["m1", "m2", "m3"]

    def test_multi_channel_boost(self) -> None:
        engine = HybridSearchEngine.__new__(HybridSearchEngine)
        engine._k = 60
        channels = [
            ("bm25", [("m1", 5.0), ("m2", 3.0)]),
            ("vector", [("m2", 0.9), ("m3", 0.8)]),
        ]
        fused = engine._reciprocal_rank_fusion(channels)
        scores = {mid: s for mid, (s, _, _) in fused}
        assert scores["m2"] > scores["m1"], "m2 appears in both channels, should rank higher"
        assert scores["m2"] > scores["m3"]

    def test_rrf_sources_tracked(self) -> None:
        engine = HybridSearchEngine.__new__(HybridSearchEngine)
        engine._k = 60
        channels = [
            ("bm25", [("m1", 5.0)]),
            ("vector", [("m1", 0.9)]),
            ("metadata", [("m2", 0.5)]),
        ]
        fused = engine._reciprocal_rank_fusion(channels)
        fused_dict = {mid: (s, src, det) for mid, (s, src, det) in fused}
        assert set(fused_dict["m1"][1]) == {"bm25", "vector"}
        assert fused_dict["m2"][1] == ["metadata"]

    def test_rrf_details_contain_contributions(self) -> None:
        engine = HybridSearchEngine.__new__(HybridSearchEngine)
        engine._k = 60
        channels = [("bm25", [("m1", 5.0)]), ("vector", [("m1", 0.9)])]
        fused = engine._reciprocal_rank_fusion(channels)
        _, (_, _, details) = fused[0]
        assert "bm25" in details and "vector" in details
        expected = 1.0 / (60 + 0 + 1)
        assert math.isclose(details["bm25"], expected, abs_tol=1e-9)


class TestHybridSearchIntegration:

    async def test_fts5_channel(self, store: SQLiteStore, search_engine: HybridSearchEngine) -> None:
        await store.store_memory(title="Rust borrow checker", content="Ownership rules in Rust.")
        await store.store_memory(title="Python GIL", content="Global interpreter lock.")
        results = await search_engine.search("Rust ownership borrow")
        assert len(results) >= 1
        assert results[0].title == "Rust borrow checker"

    async def test_metadata_channel(self, store: SQLiteStore, search_engine: HybridSearchEngine) -> None:
        await store.store_memory(title="Important", content="critical insight", importance=10, category="insight")
        await store.store_memory(title="Trivial", content="minor note", importance=1, category="note")
        results = await search_engine.search("insight", min_importance=8, category="insight")
        assert len(results) >= 1
        assert results[0].title == "Important"


class TestContextPack:

    async def test_respects_token_budget(self, manager_plain: MemoryManager) -> None:
        for i in range(10):
            await manager_plain.store(title=f"Memory {i}", content=f"Content block number {i} " * 20)
        result = await manager_plain.context_pack(query="Content block", token_budget=200)
        assert result["tokens_used"] <= 200
        assert result["memories_packed"] >= 1

    async def test_returns_scores_and_sources(self, manager_plain: MemoryManager) -> None:
        await manager_plain.store(title="Scored", content="This memory has a score")
        result = await manager_plain.context_pack(query="score memory", token_budget=4000)
        if result["memories_packed"] > 0:
            mem = result["memories"][0]
            assert "score" in mem and "sources" in mem
            assert isinstance(mem["score"], float)
            assert isinstance(mem["sources"], list)
