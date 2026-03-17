# Authors: Joysusy & Violet Klaudia 💖
"""Integration tests for MemoryManager coordination features."""

import pytest
from pathlib import Path
from memory.manager import MemoryManager
from storage.sqlite_store import SQLiteStore


@pytest.fixture
async def manager(tmp_path: Path):
    """Create a MemoryManager with temporary SQLite database."""
    db_path = tmp_path / "test_lavender.db"
    store = SQLiteStore(db_path)
    await store.initialize()
    mgr = MemoryManager(store=store)
    yield mgr
    await store.close()


class TestManagerCoordination:
    """Test MemoryManager coordination integration."""

    async def test_synthesize_multi_mind_memory(self, manager):
        """Test multi-Mind memory synthesis via manager."""
        mem1_id = await manager.store(
            title="Vera's insight",
            content="The architecture should use layered design",
            mind_active="Vera",
        )
        mem2_id = await manager.store(
            title="Lyre's addition",
            content="Documentation must be bilingual",
            mind_active="Lyre",
        )

        synthesis_id = await manager.synthesize_multi_mind_memory(
            source_memory_ids=[mem1_id, mem2_id],
            active_minds=["Vera", "Lyre"],
            synthesis_content="🔮 Vera noted layered design, 🦢 Lyre added bilingual docs",
            title="Synthesis: Architecture + Docs",
        )

        assert synthesis_id is not None
        synthesis = await manager.recall(synthesis_id)
        assert synthesis is not None
        assert "Vera" in synthesis["content"]
        assert "Lyre" in synthesis["content"]

    async def test_link_related_memories(self, manager):
        """Test semantic memory linking via manager."""
        mem1_id = await manager.store(
            title="Python best practices",
            content="Use type hints and async/await",
            tags=["python", "coding"],
        )
        mem2_id = await manager.store(
            title="Python testing",
            content="Use pytest with async support",
            tags=["python", "testing"],
        )

        links_created = await manager.link_related_memories(
            memory_ids=[mem1_id, mem2_id],
            min_strength=0.3,
        )

        assert links_created >= 0

    async def test_get_mind_memory_graph(self, manager):
        """Test Mind-aware memory graph retrieval via manager."""
        mem_id = await manager.store(
            title="Root memory",
            content="Starting point for graph traversal",
            mind_active="Vera",
        )

        graph = await manager.get_mind_memory_graph(
            memory_id=mem_id,
            depth=2,
        )

        assert graph is not None
        assert "nodes" in graph
        assert "edges" in graph
        assert "minds_involved" in graph

    async def test_record_coordination_session(self, manager):
        """Test coordination session recording via manager."""
        record_id = await manager.record_coordination_session(
            minds=["Vera", "Lyre"],
            task_type="synthesis",
            success_score=0.85,
            duration_ms=1500,
            memories_created=3,
            context={"session_type": "test"},
        )

        assert record_id is not None

    async def test_get_best_mind_combinations(self, manager):
        """Test best Mind combinations query via manager."""
        await manager.record_coordination_session(
            minds=["Vera", "Lyre"],
            task_type="synthesis",
            success_score=0.9,
            duration_ms=1000,
            memories_created=2,
        )

        combinations = await manager.get_best_mind_combinations(
            task_type="synthesis",
            limit=5,
        )

        assert isinstance(combinations, list)

    async def test_get_mind_effectiveness(self, manager):
        """Test Mind effectiveness metrics via manager."""
        await manager.record_coordination_session(
            minds=["Vera"],
            task_type="research",
            success_score=0.8,
            duration_ms=2000,
            memories_created=1,
        )

        metrics = await manager.get_mind_effectiveness(mind_name="Vera")

        assert metrics is not None
        assert "avg_success_score" in metrics
        assert "total_sessions" in metrics

    async def test_suggest_team_for_task(self, manager):
        """Test team suggestion via manager."""
        await manager.record_coordination_session(
            minds=["Vera", "Lyre"],
            task_type="documentation",
            success_score=0.95,
            duration_ms=1200,
            memories_created=4,
        )

        team = await manager.suggest_team_for_task(
            task_type="documentation",
            context={"priority": "high"},
        )

        assert isinstance(team, list)
        assert len(team) > 0
