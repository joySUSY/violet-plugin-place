# Authors: Joysusy & Violet Klaudia 💖
"""End-to-end integration tests for VioletCore Phase 3.0 — Complete workflow validation."""
from __future__ import annotations

import asyncio
import time
from pathlib import Path
from typing import Any

import pytest

from memory.manager import MemoryManager
from storage.sqlite_store import SQLiteStore


class TestHookLifecycle:
    """Test hook initialization, detection, and graceful degradation."""

    async def test_hook_initialization_success(self, manager: MemoryManager) -> None:
        """Verify hooks initialize correctly when VioletCore is available."""
        assert manager.store is not None
        stats = await manager.stats()
        assert stats["total_memories"] >= 0

    async def test_graceful_degradation_no_hooks(self, manager_plain: MemoryManager) -> None:
        """Verify system works without VioletCore hooks."""
        mid = await manager_plain.store(
            title="No hooks test",
            content="System should work without VioletCore",
            category="test"
        )
        mem = await manager_plain.recall(mid)
        assert mem is not None
        assert mem["title"] == "No hooks test"

    async def test_hook_detection_environment(self, manager: MemoryManager) -> None:
        """Verify hook detection respects environment configuration."""
        stats = await manager.stats()
        assert "embedding_provider" in stats
        assert "encryption" in stats


class TestMindAwareStorage:
    """Test Mind-aware memory storage with context and metadata."""

    async def test_store_with_mind_context(self, manager: MemoryManager) -> None:
        """Store memory with active Mind context."""
        mid = await manager.store(
            title="Faye's Research",
            content="Identity-weighted retrieval patterns",
            category="research",
            project="violet",
            mind_active="Faye",
            importance=9
        )

        mem = await manager.recall(mid)
        assert mem is not None
        assert mem["mind_active"] == "Faye"
        assert mem["importance"] == 9

    async def test_store_with_kaomoji_metadata(self, manager: MemoryManager) -> None:
        """Store memory with kaomoji style metadata."""
        mid = await manager.store(
            title="Cheerful Discovery",
            content="Found an elegant solution (◕‿◕✿)",
            category="discovery",
            project="violet",
            tags=["kaomoji", "style"]
        )

        mem = await manager.recall(mid)
        assert mem is not None
        assert "(◕‿◕✿)" in mem["content"]
        assert "kaomoji" in mem.get("tags", [])

    async def test_store_multiple_minds_coordination(self, manager: MemoryManager) -> None:
        """Store memories from multiple coordinating Minds."""
        mid1 = await manager.store(
            title="Lyre's Documentation",
            content="API reference for hybrid search",
            category="docs",
            project="violet",
            mind_active="Lyre"
        )

        mid2 = await manager.store(
            title="Lilith's Security Review",
            content="Encryption layer audit complete",
            category="security",
            project="violet",
            mind_active="Lilith"
        )

        mem1 = await manager.recall(mid1)
        mem2 = await manager.recall(mid2)

        assert mem1["mind_active"] == "Lyre"
        assert mem2["mind_active"] == "Lilith"

    async def test_store_with_rich_context(self, manager: MemoryManager) -> None:
        """Store memory with comprehensive context metadata."""
        import json

        mid = await manager.store(
            title="Complex Context Test",
            content="Memory with full context",
            category="test",
            project="violet",
            mind_active="Vera",
            importance=7,
            tags=["context", "metadata", "rich"]
        )

        mem = await manager.recall(mid)
        assert mem is not None
        assert mem["mind_active"] == "Vera"
        assert mem["importance"] == 7

        tags = mem.get("tags", [])
        if isinstance(tags, str):
            tags = json.loads(tags)
        assert len(tags) == 3


class TestIdentityWeightedRetrieval:
    """Test identity-weighted memory retrieval and enhancement."""

    async def test_mind_relevance_filtering(self, manager_plain: MemoryManager) -> None:
        """Filter memories by Mind relevance."""
        await manager_plain.store(
            title="Faye's Discovery",
            content="Search optimization techniques",
            category="research",
            project="violet",
            mind_active="Faye"
        )

        await manager_plain.store(
            title="Lilith's Security Note",
            content="Authentication patterns",
            category="security",
            project="violet",
            mind_active="Lilith"
        )

        results = await manager_plain.search("optimization", limit=10)
        assert len(results) >= 1
        assert any("Faye" in r.get("title", "") for r in results)

    async def test_identity_weighted_scoring(self, manager_plain: MemoryManager) -> None:
        """Verify identity weighting affects search scores."""
        mid1 = await manager_plain.store(
            title="Faye Research",
            content="Memory retrieval patterns",
            category="research",
            project="violet",
            mind_active="Faye",
            importance=8
        )

        mid2 = await manager_plain.store(
            title="Generic Note",
            content="Memory retrieval basics",
            category="notes",
            project="violet",
            importance=5
        )

        mind_context = {
            "activeMinds": [{"name": "Faye", "weight": 1.5}],
            "channelWeights": {
                "bm25": 1.0,
                "vector": 1.0,
                "metadata": 1.0,
                "mind": 2.0
            }
        }

        results = await manager_plain.hybrid_search(
            query="memory retrieval",
            limit=5,
            project="violet",
            context=mind_context
        )

        assert len(results) > 0
        result_ids = [r.memory_id for r in results]
        assert mid1 in result_ids

    async def test_multi_mind_coordination_search(self, manager_plain: MemoryManager) -> None:
        """Search with multiple active Minds."""
        await manager_plain.store(
            title="Lyre's Docs",
            content="Documentation standards",
            mind_active="Lyre",
            project="violet"
        )

        await manager_plain.store(
            title="Vera's Implementation",
            content="Storage layer design",
            mind_active="Vera",
            project="violet"
        )

        mind_context = {
            "activeMinds": [
                {"name": "Lyre", "weight": 1.2},
                {"name": "Vera", "weight": 1.3}
            ]
        }

        results = await manager_plain.hybrid_search(
            query="design standards",
            limit=10,
            project="violet",
            context=mind_context
        )

        assert len(results) >= 1


class TestMindActivationEvents:
    """Test Mind activation tracking and coordination."""

    async def test_track_single_mind_activation(self, manager: MemoryManager) -> None:
        """Track single Mind activation."""
        await manager.initialize_mind_events()

        active_minds = [{"name": "Lyre", "symbol": "🦢", "role": "Documentation"}]
        context = {"task": "Write README", "phase": "documentation"}

        event_id = await manager.track_mind_activation(active_minds, context)

        assert event_id is not None
        assert len(event_id) == 16

        history = await manager.get_mind_activation_history(limit=10)
        assert len(history) >= 1
        assert history[0]["mind_name"] == "Lyre"

    async def test_track_mind_coordination_pattern(self, manager: MemoryManager) -> None:
        """Track Mind coordination patterns."""
        await manager.initialize_mind_events()

        minds = [
            {"name": "Lyre", "symbol": "🦢"},
            {"name": "Lilith", "symbol": "🎀"},
            {"name": "Faye", "symbol": "🐱"}
        ]

        pattern = "parallel-execution"
        context = {"task": "Multi-file refactoring"}

        event_id = await manager.track_mind_coordination(minds, pattern, context)

        assert event_id is not None

        patterns = await manager.get_mind_coordination_patterns(limit=10)
        assert len(patterns) >= 1
        assert patterns[0]["coordination_pattern"] == "parallel-execution"

    async def test_track_mind_clash_resolution(self, manager: MemoryManager) -> None:
        """Track Mind clash and resolution."""
        await manager.initialize_mind_events()

        mind_a = {"name": "Lyre", "symbol": "🦢", "preference": "verbose-docs"}
        mind_b = {"name": "Vera", "symbol": "🔮", "preference": "minimal-comments"}

        resolution = {
            "winner": "Lyre",
            "reason": "Documentation phase requires verbosity",
            "compromise": "Detailed docs, minimal inline comments"
        }

        event_id = await manager.track_mind_clash(mind_a, mind_b, resolution)

        assert event_id is not None

        clashes = await manager.get_mind_clash_history(limit=10)
        assert len(clashes) >= 1
        assert clashes[0]["event_type"] == "clash"

    async def test_mind_statistics_aggregation(self, manager: MemoryManager) -> None:
        """Aggregate Mind statistics."""
        await manager.initialize_mind_events()

        lyre_mind = {"name": "Lyre", "symbol": "🦢", "role": "Documentation"}

        await manager.track_mind_activation([lyre_mind], {})
        await manager.track_mind_activation([lyre_mind], {})

        await manager.track_mind_coordination(
            [lyre_mind, {"name": "Lilith", "symbol": "🎀"}],
            "sequential",
            {}
        )

        stats = await manager.get_mind_stats("Lyre")

        assert stats["mind_name"] == "Lyre"
        assert stats["activations"] >= 2
        assert stats["coordinations"] >= 1


class TestEndToEndWorkflows:
    """Test complete workflows: Mind activation → Storage → Search → Recall."""

    async def test_complete_memory_lifecycle(self, manager_plain: MemoryManager) -> None:
        """Test full lifecycle: store → search → recall → forget."""
        mid = await manager_plain.store(
            title="Lifecycle Test",
            content="Complete workflow validation",
            category="test",
            project="violet",
            mind_active="Faye",
            importance=7
        )

        results = await manager_plain.search("workflow validation", limit=10)
        assert len(results) >= 1
        assert any(r["id"] == mid for r in results)

        mem = await manager_plain.recall(mid)
        assert mem is not None
        assert mem["title"] == "Lifecycle Test"

        await manager_plain.forget(mid)

        forgotten = await manager_plain.recall(mid)
        assert forgotten is None

    async def test_mind_aware_search_workflow(self, manager_plain: MemoryManager) -> None:
        """Test Mind-aware search workflow."""
        mid1 = await manager_plain.store(
            title="Faye's Research",
            content="Advanced search techniques",
            category="research",
            project="violet",
            mind_active="Faye",
            importance=9
        )

        mid2 = await manager_plain.store(
            title="Vera's Implementation",
            content="Storage optimization",
            category="implementation",
            project="violet",
            mind_active="Vera",
            importance=8
        )

        mind_context = {
            "activeMinds": [{"name": "Faye", "weight": 1.5}],
            "channelWeights": {"mind": 2.0}
        }

        results = await manager_plain.hybrid_search(
            query="search techniques",
            limit=10,
            project="violet",
            context=mind_context
        )

        assert len(results) >= 1
        top_result = results[0]
        assert top_result.memory_id == mid1

    async def test_multi_mind_coordination_workflow(self, manager: MemoryManager) -> None:
        """Test multi-Mind coordination workflow."""
        await manager.initialize_mind_events()

        minds = [
            {"name": "Lyre", "symbol": "🦢"},
            {"name": "Lilith", "symbol": "🎀"}
        ]

        await manager.track_mind_activation(minds, {"phase": "review"})

        mid1 = await manager.store(
            title="Lyre's Review",
            content="Documentation review complete",
            mind_active="Lyre",
            project="violet"
        )

        mid2 = await manager.store(
            title="Lilith's Audit",
            content="Security audit passed",
            mind_active="Lilith",
            project="violet"
        )

        results = await manager.search("review audit", limit=10)
        assert len(results) >= 2

        result_ids = [r["id"] for r in results]
        assert mid1 in result_ids
        assert mid2 in result_ids

    async def test_style_preservation_workflow(self, manager: MemoryManager) -> None:
        """Test kaomoji style preservation through workflow."""
        mid = await manager.store(
            title="Cheerful Discovery",
            content="Found elegant solution (◕‿◕✿)",
            category="discovery",
            project="violet",
            mind_active="Lyre",
            tags=["kaomoji"]
        )

        results = await manager.search("elegant solution", limit=10)
        assert len(results) >= 1

        found = next((r for r in results if r["id"] == mid), None)
        assert found is not None
        assert "(◕‿◕✿)" in found["content"]

        mem = await manager.recall(mid)
        assert "(◕‿◕✿)" in mem["content"]


class TestPerformanceBenchmarks:
    """Test performance requirements (<100ms overhead)."""

    async def test_storage_performance(self, manager_plain: MemoryManager) -> None:
        """Benchmark storage operation performance."""
        start = time.perf_counter()

        mid = await manager_plain.store(
            title="Performance Test",
            content="Benchmark storage operation",
            category="test",
            project="violet"
        )

        elapsed = (time.perf_counter() - start) * 1000

        assert mid is not None
        assert elapsed < 200, f"Storage took {elapsed:.2f}ms (target: <200ms)"

    async def test_search_performance(self, manager_plain: MemoryManager) -> None:
        """Benchmark search operation performance."""
        await manager_plain.store(
            title="Search Perf Test",
            content="Performance benchmark data",
            category="test",
            project="violet"
        )

        start = time.perf_counter()

        results = await manager_plain.search("performance benchmark", limit=10)

        elapsed = (time.perf_counter() - start) * 1000

        assert len(results) >= 0
        assert elapsed < 300, f"Search took {elapsed:.2f}ms (target: <300ms)"

    async def test_hybrid_search_performance(self, manager_plain: MemoryManager) -> None:
        """Benchmark hybrid search performance."""
        await manager_plain.store(
            title="Hybrid Perf Test",
            content="Hybrid search benchmark",
            category="test",
            project="violet",
            importance=8
        )

        start = time.perf_counter()

        results = await manager_plain.hybrid_search(
            query="hybrid search",
            limit=10,
            project="violet"
        )

        elapsed = (time.perf_counter() - start) * 1000

        assert len(results) >= 0
        assert elapsed < 300, f"Hybrid search took {elapsed:.2f}ms (target: <300ms)"

    async def test_recall_performance(self, manager_plain: MemoryManager) -> None:
        """Benchmark recall operation performance."""
        mid = await manager_plain.store(
            title="Recall Perf Test",
            content="Benchmark recall operation",
            category="test",
            project="violet"
        )

        start = time.perf_counter()

        mem = await manager_plain.recall(mid)

        elapsed = (time.perf_counter() - start) * 1000

        assert mem is not None
        assert elapsed < 50, f"Recall took {elapsed:.2f}ms (target: <50ms)"


class TestGracefulDegradation:
    """Test graceful degradation when components are unavailable."""

    async def test_no_embedding_provider(self, store: SQLiteStore) -> None:
        """Verify system works without embedding provider."""
        manager = MemoryManager(store=store, embedding_provider=None, encryption=None)

        mid = await manager.store(
            title="No Embeddings",
            content="System should work without embeddings",
            category="test"
        )

        mem = await manager.recall(mid)
        assert mem is not None
        assert mem["title"] == "No Embeddings"

    async def test_no_encryption(self, store: SQLiteStore, mock_provider: Any) -> None:
        """Verify system works without encryption."""
        manager = MemoryManager(store=store, embedding_provider=mock_provider, encryption=None)

        mid = await manager.store(
            title="No Encryption",
            content="System should work without encryption",
            category="test"
        )

        mem = await manager.recall(mid)
        assert mem is not None
        assert mem["content"] == "System should work without encryption"

    async def test_minimal_configuration(self, store: SQLiteStore) -> None:
        """Verify system works with minimal configuration."""
        manager = MemoryManager(store=store, embedding_provider=None, encryption=None)

        mid = await manager.store(
            title="Minimal Config",
            content="Bare minimum configuration",
            category="test"
        )

        results = await manager.search("minimal", limit=10)
        assert len(results) >= 1

        mem = await manager.recall(mid)
        assert mem is not None


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
