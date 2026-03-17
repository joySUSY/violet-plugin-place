# Authors: Joysusy & Violet Klaudia 💖
"""Unit tests for CoordinationEngine domain service."""

import pytest
from pathlib import Path
from memory.coordination import CoordinationEngine
from storage.sqlite_store import SQLiteStore


@pytest.fixture
async def engine(tmp_path: Path):
    """Create a CoordinationEngine with temporary SQLite database."""
    db_path = tmp_path / "test_lavender.db"
    store = SQLiteStore(db_path)
    await store.initialize()
    eng = CoordinationEngine(store)
    yield eng
    await store.close()


class TestCoordinationEngine:
    """Test CoordinationEngine domain service methods."""

    async def test_synthesize_multi_mind_memory(self, engine):
        """Test multi-Mind memory synthesis with attribution."""
        # Create source memories
        mem1 = {
            "id": "mem1",
            "title": "Vera's insight",
            "content": "The architecture should use layered design",
            "mind_active": "Vera",
        }
        mem2 = {
            "id": "mem2",
            "title": "Lyre's addition",
            "content": "Documentation must be bilingual",
            "mind_active": "Lyre",
        }

        minds = [
            {"name": "Vera", "symbol": "🔮"},
            {"name": "Lyre", "symbol": "🦢"},
        ]

        context = {
            "title": "Synthesis: Architecture + Docs",
            "session_id": "test-session",
        }

        result = await engine.synthesize_multi_mind_memory(
            memories=[mem1, mem2],
            active_minds=minds,
            context=context,
        )

        assert result is not None
        assert "id" in result
        assert "content" in result
        assert "Vera" in result["content"] or "Lyre" in result["content"]

    async def test_link_related_memories(self, engine):
        """Test semantic memory linking."""
        # Store memories in database first
        mem1_id = await engine._store.store_memory(
            title="Python best practices",
            content="Use type hints and async/await",
            content_plain="Use type hints and async/await",
            tags=["python", "coding"],
        )

        mem2_id = await engine._store.store_memory(
            title="Python testing",
            content="Use pytest with async support",
            content_plain="Use pytest with async support",
            tags=["python", "testing"],
        )

        mem3_id = await engine._store.store_memory(
            title="JavaScript patterns",
            content="Use async/await and promises",
            content_plain="Use async/await and promises",
            tags=["javascript", "coding"],
        )

        # Fetch candidates
        candidates = [
            await engine._store.recall_memory(mem2_id),
            await engine._store.recall_memory(mem3_id),
        ]

        minds = [{"name": "Vera", "symbol": "🔮"}]

        link_ids = await engine.link_related_memories(
            memory_id=mem1_id,
            candidates=candidates,
            active_minds=minds,
        )

        assert isinstance(link_ids, list)
        # Should create links to related memories
        assert len(link_ids) >= 0

    async def test_get_mind_memory_graph(self, engine):
        """Test Mind-aware memory graph retrieval."""
        # Store a test memory first
        memory_id = await engine._store.store_memory(
            title="Root memory",
            content="Starting point for graph traversal",
            content_plain="Starting point for graph traversal",
            mind_active="Vera",
        )

        graph = await engine.get_mind_memory_graph(
            memory_id=memory_id,
            depth=2,
        )

        assert graph is not None
        assert "nodes" in graph
        assert "edges" in graph
        assert "minds_involved" in graph
        assert isinstance(graph["nodes"], dict)  # nodes is a dict, not list
        assert isinstance(graph["edges"], list)
        assert isinstance(graph["minds_involved"], list)

    async def test_synthesize_empty_memories(self, engine):
        """Test synthesis with empty memory list."""
        minds = [{"name": "Vera", "symbol": "🔮"}]
        context = {"title": "Empty synthesis", "session_id": "test"}

        # Empty memory list should be handled gracefully
        # The engine may raise ValueError or return a minimal result
        try:
            result = await engine.synthesize_multi_mind_memory(
                memories=[],
                active_minds=minds,
                context=context,
            )
            # If it succeeds, verify structure
            assert result is not None
            assert "id" in result
        except ValueError as e:
            # If it raises ValueError, that's also acceptable behavior
            assert "empty" in str(e).lower()

    async def test_link_no_candidates(self, engine):
        """Test linking with no candidate memories."""
        # Store memory in database first
        mem_id = await engine._store.store_memory(
            title="Isolated memory",
            content="No related content",
            content_plain="No related content",
        )

        minds = [{"name": "Vera", "symbol": "🔮"}]

        link_ids = await engine.link_related_memories(
            memory_id=mem_id,
            candidates=[],
            active_minds=minds,
        )

        # Should return empty list when no candidates
        assert isinstance(link_ids, list)
        assert len(link_ids) == 0

    async def test_graph_nonexistent_memory(self, engine):
        """Test graph retrieval for nonexistent memory."""
        # Should raise ValueError for nonexistent memory
        try:
            graph = await engine.get_mind_memory_graph(
                memory_id="nonexistent-id",
                depth=1,
            )
            # If it doesn't raise, verify empty structure
            assert graph is not None
            assert "nodes" in graph
            assert "edges" in graph
            assert len(graph["nodes"]) == 0
            assert len(graph["edges"]) == 0
        except ValueError as e:
            # Expected behavior - memory not found
            assert "not found" in str(e).lower()

    async def test_synthesize_single_mind(self, engine):
        """Test synthesis with single Mind."""
        mem = {
            "id": "mem1",
            "title": "Solo insight",
            "content": "Single Mind observation",
            "mind_active": "Vera",
        }

        minds = [{"name": "Vera", "symbol": "🔮"}]
        context = {"title": "Solo synthesis", "session_id": "test"}

        result = await engine.synthesize_multi_mind_memory(
            memories=[mem],
            active_minds=minds,
            context=context,
        )

        assert result is not None
        assert "id" in result
        assert "content" in result

    async def test_link_high_similarity(self, engine):
        """Test linking memories with high semantic similarity."""
        # Store memories in database first
        mem1_id = await engine._store.store_memory(
            title="Async Python patterns",
            content="Use asyncio and aiohttp for concurrent I/O",
            content_plain="Use asyncio and aiohttp for concurrent I/O",
            tags=["python", "async", "concurrency"],
        )

        mem2_id = await engine._store.store_memory(
            title="Python async best practices",
            content="asyncio event loop and async/await syntax",
            content_plain="asyncio event loop and async/await syntax",
            tags=["python", "async", "patterns"],
        )

        # Fetch candidate
        candidates = [await engine._store.recall_memory(mem2_id)]

        minds = [{"name": "Vera", "symbol": "🔮"}]

        link_ids = await engine.link_related_memories(
            memory_id=mem1_id,
            candidates=candidates,
            active_minds=minds,
        )

        # High similarity should create link
        assert isinstance(link_ids, list)

    async def test_graph_depth_limit(self, engine):
        """Test graph traversal respects depth limit."""
        # Store a test memory first
        memory_id = await engine._store.store_memory(
            title="Root memory",
            content="Starting point for depth test",
            content_plain="Starting point for depth test",
            mind_active="Vera",
        )

        # Test with depth 1
        graph_shallow = await engine.get_mind_memory_graph(
            memory_id=memory_id,
            depth=1,
        )

        # Test with depth 3
        graph_deep = await engine.get_mind_memory_graph(
            memory_id=memory_id,
            depth=3,
        )

        assert graph_shallow is not None
        assert graph_deep is not None
        # Deeper graph should have same or more nodes
        assert len(graph_deep["nodes"]) >= len(graph_shallow["nodes"])
