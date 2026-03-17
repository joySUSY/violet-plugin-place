# Authors: Joysusy & Violet Klaudia 💖
"""
Multi-Mind Memory Synthesis Engine.

Provides coordination primitives for merging perspectives from multiple Minds,
linking related memories across Mind contexts, and traversing Mind-aware memory graphs.
"""

from __future__ import annotations

import json
from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from lavender_memorysys.storage.sqlite_store import SQLiteStore


class CoordinationEngine:
    """
    Domain service for Multi-Mind memory coordination.

    Synthesizes memories from multiple Mind perspectives, creates semantic links
    between related memories, and builds Mind-aware memory graphs for context retrieval.
    """

    def __init__(self, store: SQLiteStore) -> None:
        """
        Initialize coordination engine.

        Args:
            store: SQLite storage backend for memory operations
        """
        self._store = store

    async def synthesize_multi_mind_memory(
        self, memories: list[dict], active_minds: list[dict], context: dict
    ) -> dict:
        """
        Merge perspectives from multiple Minds into a synthesis memory.

        Extracts key themes from each Mind's perspective, merges into unified content
        with attribution, creates synthesis links back to source memories, and stores
        the synthesis memory with coordination metadata.

        Args:
            memories: List of source memory dicts (must have 'id', 'content', 'mind_active')
            active_minds: List of Mind configs that participated (must have 'name', 'symbol')
            context: Additional context (e.g., 'task_type', 'session_id')

        Returns:
            Synthesis memory dict with 'id', 'content', 'source_ids', 'minds_involved'
        """
        if not memories:
            raise ValueError("Cannot synthesize from empty memory list")

        if not active_minds:
            raise ValueError("Cannot synthesize without active Minds")

        mind_map = {m["name"]: m for m in active_minds}
        themes_by_mind: dict[str, list[str]] = {}

        for mem in memories:
            mind_name = mem.get("mind_active")
            if not mind_name or mind_name not in mind_map:
                continue

            content = mem.get("content", "")
            themes = self._extract_themes(content)
            if mind_name not in themes_by_mind:
                themes_by_mind[mind_name] = []
            themes_by_mind[mind_name].extend(themes)

        synthesis_content = self._merge_themes(themes_by_mind, mind_map)

        title = context.get("title", "Multi-Mind Synthesis")
        category = context.get("category", "synthesis")
        project = context.get("project", "violet")

        synthesis_id = await self._store.store_memory(
            title=title,
            content=synthesis_content,
            category=category,
            project=project,
            coordination_pattern="synthesis",
            mind_symbols=", ".join(m["symbol"] for m in active_minds),
            mind_context={
                "minds_involved": [m["name"] for m in active_minds],
                "source_count": len(memories),
            },
            session_id=context.get("session_id"),
        )

        for mem in memories:
            await self._store.create_memory_link(
                source_id=synthesis_id,
                target_id=mem["id"],
                link_type="synthesis",
                strength=1.0,
                minds_involved=[m["name"] for m in active_minds],
                context={"synthesis_id": synthesis_id},
            )

        return {
            "id": synthesis_id,
            "content": synthesis_content,
            "source_ids": [m["id"] for m in memories],
            "minds_involved": [m["name"] for m in active_minds],
        }

    async def link_related_memories(
        self, memory_id: str, candidates: list[dict], active_minds: list[dict]
    ) -> list[str]:
        """
        Find and create links between related memories across Mind contexts.

        Uses semantic similarity heuristics to identify related memories and creates
        'related' links with appropriate strength scores.

        Args:
            memory_id: ID of the source memory to link from
            candidates: List of candidate memory dicts (must have 'id', 'content')
            active_minds: List of Mind configs for context attribution

        Returns:
            List of link IDs created
        """
        source_mem = await self._store.recall_memory(memory_id)
        if not source_mem:
            raise ValueError(f"Source memory {memory_id} not found")

        source_content = source_mem.get("content", "")
        source_themes = set(self._extract_themes(source_content))

        link_ids: list[str] = []

        for candidate in candidates:
            if candidate["id"] == memory_id:
                continue

            candidate_content = candidate.get("content", "")
            candidate_themes = set(self._extract_themes(candidate_content))

            overlap = source_themes & candidate_themes
            if not overlap:
                continue

            strength = len(overlap) / max(len(source_themes), len(candidate_themes))

            if strength >= 0.3:
                link_id = await self._store.create_memory_link(
                    source_id=memory_id,
                    target_id=candidate["id"],
                    link_type="coordination",
                    strength=round(strength, 2),
                    minds_involved=[m["name"] for m in active_minds],
                    context={"overlap_count": len(overlap)},
                )
                link_ids.append(link_id)

        return link_ids

    async def get_mind_memory_graph(
        self, memory_id: str, depth: int = 2
    ) -> dict:
        """
        Traverse memory links to build a Mind-aware memory graph.

        Performs breadth-first traversal of memory links, collecting linked memories
        and their Mind context metadata.

        Args:
            memory_id: Starting memory ID
            depth: Maximum traversal depth (default: 2)

        Returns:
            Graph dict with 'root', 'nodes', 'edges', 'minds_involved'
        """
        root_mem = await self._store.recall_memory(memory_id)
        if not root_mem:
            raise ValueError(f"Root memory {memory_id} not found")

        nodes: dict[str, dict] = {memory_id: root_mem}
        edges: list[dict] = []
        minds_involved: set[str] = set()

        if root_mem.get("mind_active"):
            minds_involved.add(root_mem["mind_active"])

        visited = {memory_id}
        current_level = [memory_id]

        for level in range(depth):
            if not current_level:
                break

            next_level = []

            for mid in current_level:
                links = await self._store.get_memory_links(mid, direction="both")

                for link in links:
                    target_id = (
                        link["target_id"] if link["source_id"] == mid else link["source_id"]
                    )

                    if target_id not in visited:
                        visited.add(target_id)
                        next_level.append(target_id)

                        target_mem = await self._store.recall_memory(target_id)
                        if target_mem:
                            nodes[target_id] = target_mem
                            if target_mem.get("mind_active"):
                                minds_involved.add(target_mem["mind_active"])

                    edges.append({
                        "source": link["source_id"],
                        "target": link["target_id"],
                        "type": link["link_type"],
                        "strength": link.get("strength", 1.0),
                        "level": level + 1,
                    })

            current_level = next_level

        return {
            "root": memory_id,
            "nodes": nodes,
            "edges": edges,
            "minds_involved": sorted(minds_involved),
            "depth": depth,
            "total_nodes": len(nodes),
            "total_edges": len(edges),
        }

    @staticmethod
    def _extract_themes(content: str) -> list[str]:
        """Extract key themes from content using simple heuristics."""
        words = content.lower().split()
        stopwords = {"the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with", "by"}
        themes = [w.strip(".,!?;:") for w in words if len(w) > 4 and w not in stopwords]
        return themes[:20]

    @staticmethod
    def _merge_themes(themes_by_mind: dict[str, list[str]], mind_map: dict[str, dict]) -> str:
        """Merge themes from multiple Minds into attributed synthesis content."""
        if not themes_by_mind:
            return "No themes extracted from source memories."

        lines = ["# Multi-Mind Synthesis\n"]

        for mind_name, themes in themes_by_mind.items():
            mind_info = mind_map.get(mind_name, {})
            symbol = mind_info.get("symbol", "")
            unique_themes = list(dict.fromkeys(themes))[:5]

            if unique_themes:
                lines.append(f"{symbol} **{mind_name}** noted: {', '.join(unique_themes)}")

        return "\n".join(lines)
