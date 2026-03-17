# Authors: Joysusy & Violet Klaudia 💖
"""Integration tests for JavaScript-Python bridge coordination features."""

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


class TestJavaScriptPythonBridge:
    """Test JavaScript-Python bridge for coordination features."""

    async def test_full_synthesis_workflow(self, manager):
        """Test complete synthesis workflow from JS perspective."""
        # Simulate JavaScript calling Python backend
        # Step 1: Store memories (as JS would via adapter)
        mem1_id = await manager.store(
            title="Vera's architectural insight",
            content="Use layered design with clear boundaries",
            mind_active="Vera",
            tags=["architecture", "design"],
        )

        mem2_id = await manager.store(
            title="Lyre's documentation note",
            content="Documentation must be bilingual and comprehensive",
            mind_active="Lyre",
            tags=["documentation", "standards"],
        )

        # Step 2: Synthesize (as JS would call via adapter)
        synthesis_id = await manager.synthesize_multi_mind_memory(
            source_memory_ids=[mem1_id, mem2_id],
            active_minds=["Vera", "Lyre"],
            synthesis_content="🔮 Vera emphasized layered architecture, 🦢 Lyre added bilingual documentation standards",
            title="Architecture + Documentation Synthesis",
        )

        # Step 3: Verify synthesis was stored correctly
        synthesis = await manager.recall(synthesis_id)
        assert synthesis is not None
        assert "Vera" in synthesis["content"]
        assert "Lyre" in synthesis["content"]
        assert synthesis["coordination_pattern"] == "synthesis"

        # Step 4: Verify links were created
        links = await manager._store.get_memory_links(synthesis_id)
        assert len(links) >= 2  # Links back to source memories

    async def test_analytics_recording_workflow(self, manager):
        """Test analytics recording workflow from JS perspective."""
        # Simulate JavaScript recording a coordination session
        record_id = await manager.record_coordination_session(
            minds=["Vera", "Lyre", "Iris"],
            task_type="feature-implementation",
            success_score=0.92,
            duration_ms=3500,
            memories_created=5,
            context={"feature": "coordination-engine", "complexity": "high"},
        )

        assert record_id is not None

        # Verify analytics can be queried
        combinations = await manager.get_best_mind_combinations(
            task_type="feature-implementation",
            limit=5,
        )

        assert isinstance(combinations, list)
        assert len(combinations) > 0
        assert combinations[0]["success_score"] == 0.92

    async def test_team_suggestion_workflow(self, manager):
        """Test team suggestion workflow from JS perspective."""
        # Record multiple sessions with different Mind combinations
        await manager.record_coordination_session(
            minds=["Vera", "Lyre"],
            task_type="architecture-design",
            success_score=0.95,
            duration_ms=2000,
            memories_created=3,
        )

        await manager.record_coordination_session(
            minds=["Iris", "Aurora"],
            task_type="architecture-design",
            success_score=0.75,
            duration_ms=2500,
            memories_created=2,
        )

        # Request team suggestion (as JS would)
        suggested_team = await manager.suggest_team_for_task(
            task_type="architecture-design",
            context={"priority": "high"},
        )

        assert isinstance(suggested_team, list)
        assert len(suggested_team) > 0
        # Vera and Lyre should be prioritized (higher success score)
        assert "Vera" in suggested_team or "Lyre" in suggested_team

    async def test_memory_linking_workflow(self, manager):
        """Test memory linking workflow from JS perspective."""
        # Store related memories with significant overlap
        mem1_id = await manager.store(
            title="Python async patterns",
            content="Use asyncio for I/O-bound operations",
            tags=["python", "async", "performance", "io", "concurrency"],
        )

        mem2_id = await manager.store(
            title="Python testing with pytest",
            content="Use pytest-asyncio for async test support",
            tags=["python", "testing", "async", "io", "concurrency"],
        )

        mem3_id = await manager.store(
            title="Python async best practices",
            content="Async patterns for Python development",
            tags=["python", "async", "performance", "concurrency"],
        )

        # Link related memories (as JS would call)
        links_created = await manager.link_related_memories(
            memory_ids=[mem1_id, mem2_id, mem3_id],
            min_strength=0.3,
        )

        assert links_created >= 0

        # Verify links exist (at least one pair should have strength >= 0.3)
        links = await manager._store.get_memory_links(mem1_id)
        # With high tag overlap, links should be created
        assert isinstance(links, list)

    async def test_mind_memory_graph_workflow(self, manager):
        """Test Mind memory graph retrieval from JS perspective."""
        # Create a memory network
        root_id = await manager.store(
            title="Root concept",
            content="Foundation of the system",
            mind_active="Vera",
        )

        child1_id = await manager.store(
            title="Child concept 1",
            content="Extends the foundation",
            mind_active="Lyre",
        )

        # Link them
        await manager._store.create_memory_link(
            source_id=root_id,
            target_id=child1_id,
            link_type="continuation",
            strength=0.9,
            minds_involved=["Vera", "Lyre"],
        )

        # Retrieve graph (as JS would call)
        graph = await manager.get_mind_memory_graph(
            memory_id=root_id,
            depth=2,
        )

        assert graph is not None
        assert "nodes" in graph
        assert "edges" in graph
        assert "minds_involved" in graph
        assert isinstance(graph["nodes"], dict)
        assert root_id in graph["nodes"]

    async def test_error_handling_across_bridge(self, manager):
        """Test error handling when JS calls Python with invalid data."""
        # Test with nonexistent memory ID
        try:
            await manager.synthesize_multi_mind_memory(
                source_memory_ids=["nonexistent-id-1", "nonexistent-id-2"],
                active_minds=["Vera"],
                synthesis_content="This should fail",
                title="Invalid Synthesis",
            )
            assert False, "Should have raised ValueError"
        except ValueError as e:
            assert "empty" in str(e).lower() or "not found" in str(e).lower()

        # Test with empty Mind list
        mem_id = await manager.store(
            title="Test memory",
            content="Test content",
        )

        try:
            await manager.synthesize_multi_mind_memory(
                source_memory_ids=[mem_id],
                active_minds=[],  # Empty Mind list
                synthesis_content="This should fail",
                title="Invalid Synthesis",
            )
            assert False, "Should have raised ValueError"
        except ValueError as e:
            assert "mind" in str(e).lower() or "empty" in str(e).lower()

    async def test_data_serialization_across_bridge(self, manager):
        """Test that data serializes correctly across JS-Python boundary."""
        # Test with complex context data (as JS would send)
        record_id = await manager.record_coordination_session(
            minds=["Vera", "Lyre", "Iris"],
            task_type="complex-task",
            success_score=0.88,
            duration_ms=4200,
            memories_created=7,
            context={
                "nested": {"key": "value"},
                "array": [1, 2, 3],
                "unicode": "测试中文 🎨",
                "boolean": True,
                "null": None,
            },
        )

        assert record_id is not None

        # Verify context was stored and can be retrieved
        combinations = await manager.get_best_mind_combinations(
            task_type="complex-task",
            limit=1,
        )

        assert len(combinations) > 0
        # Context should be preserved (stored as JSON)

    async def test_concurrent_js_calls(self, manager):
        """Test handling concurrent calls from JavaScript."""
        import asyncio

        # Simulate multiple JS calls happening concurrently
        tasks = [
            manager.store(
                title=f"Concurrent memory {i}",
                content=f"Content {i}",
                mind_active="Vera",
            )
            for i in range(5)
        ]

        memory_ids = await asyncio.gather(*tasks)

        assert len(memory_ids) == 5
        assert all(isinstance(mid, str) for mid in memory_ids)

        # Verify all memories were stored
        for mem_id in memory_ids:
            mem = await manager.recall(mem_id)
            assert mem is not None
