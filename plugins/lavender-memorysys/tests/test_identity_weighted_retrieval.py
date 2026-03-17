# Authors: Joysusy & Violet Klaudia 💖
"""Tests for identity-weighted memory retrieval."""
import pytest
from pathlib import Path
from storage.sqlite_store import SQLiteStore
from memory.hybrid_search import HybridSearchEngine
from memory.manager import MemoryManager


@pytest.fixture
async def store(tmp_path: Path):
    db_path = tmp_path / "test_identity.db"
    store = SQLiteStore(db_path)
    await store.initialize()
    yield store
    await store.close()


@pytest.fixture
async def manager(store: SQLiteStore):
    return MemoryManager(store=store, embedding_provider=None, encryption=None)


@pytest.mark.asyncio
async def test_mind_relevance_search(store: SQLiteStore):
    await store.store_memory(
        title="Faye's Discovery",
        content="Search optimization techniques",
        category="research",
        project="violet",
        mind_active="Faye",
    )
    await store.store_memory(
        title="Lilith's Security Note",
        content="Authentication patterns",
        category="security",
        project="violet",
        mind_active="Lilith",
    )
    await store.store_memory(
        title="Generic Note",
        content="Random observation",
        category="discovery",
        project="violet",
    )

    results = await store.search_by_mind_context(
        mind_names=["Faye", "Lilith"],
        project="violet",
        limit=10,
    )

    assert len(results) == 2
    mind_names = {r["mind_active"] for r in results}
    assert mind_names == {"Faye", "Lilith"}


@pytest.mark.asyncio
async def test_identity_weighted_fusion(store: SQLiteStore):
    engine = HybridSearchEngine(store, embedding_provider=None)

    await store.store_memory(
        title="Faye Research",
        content="Memory retrieval patterns",
        category="research",
        project="violet",
        mind_active="Faye",
        importance=8,
    )

    mind_context = {
        "activeMinds": [
            {"name": "Faye", "weight": 1.5},
        ],
        "channelWeights": {
            "bm25": 1.0,
            "vector": 1.0,
            "metadata": 1.0,
            "mind": 2.0,
        },
    }

    results = await engine.search(
        query="memory retrieval",
        limit=5,
        project="violet",
        mind_context=mind_context,
    )

    assert len(results) > 0
    assert "mind" in results[0].sources


@pytest.mark.asyncio
async def test_manager_hook_integration(manager: MemoryManager):
    mem_id = await manager.store(
        title="Test Memory",
        content="Hook integration test",
        category="test",
        project="violet",
        mind_active="Faye",
    )

    context = {
        "activeMinds": [{"name": "Faye", "weight": 1.2}],
    }

    results = await manager.hybrid_search(
        query="integration",
        limit=5,
        project="violet",
        context=context,
    )

    assert len(results) > 0
    assert results[0].memory_id == mem_id


@pytest.mark.asyncio
async def test_multi_mind_weighting(store: SQLiteStore):
    """Test multiple Mind weights in search."""
    engine = HybridSearchEngine(store, embedding_provider=None)

    await store.store_memory(
        title="Lyre's Documentation",
        content="API reference and usage examples",
        category="docs",
        project="violet",
        mind_active="Lyre",
        importance=8,
    )

    await store.store_memory(
        title="Lilith's Security",
        content="Authentication and authorization",
        category="security",
        project="violet",
        mind_active="Lilith",
        importance=9,
    )

    mind_context = {
        "activeMinds": [
            {"name": "Lyre", "weight": 1.5},
            {"name": "Lilith", "weight": 1.3},
        ],
        "channelWeights": {
            "bm25": 1.0,
            "vector": 1.0,
            "metadata": 1.0,
            "mind": 2.0,
        },
    }

    results = await engine.search(
        query="documentation security",
        limit=10,
        project="violet",
        mind_context=mind_context,
    )

    assert len(results) >= 2
    assert "mind" in results[0].sources


@pytest.mark.asyncio
async def test_mind_filtering_exclusion(store: SQLiteStore):
    """Test Mind-based filtering excludes non-matching memories."""
    await store.store_memory(
        title="Faye's Research",
        content="Search optimization",
        category="research",
        project="violet",
        mind_active="Faye",
    )

    await store.store_memory(
        title="Vera's Implementation",
        content="Storage layer",
        category="implementation",
        project="violet",
        mind_active="Vera",
    )

    await store.store_memory(
        title="Generic Note",
        content="Random observation",
        category="notes",
        project="violet",
    )

    results = await store.search_by_mind_context(
        mind_names=["Faye"],
        project="violet",
        limit=10,
    )

    assert len(results) == 1
    assert results[0]["mind_active"] == "Faye"


@pytest.mark.asyncio
async def test_channel_weight_customization(store: SQLiteStore):
    """Test custom channel weights affect ranking."""
    engine = HybridSearchEngine(store, embedding_provider=None)

    await store.store_memory(
        title="High Importance",
        content="Critical system component",
        category="core",
        project="violet",
        importance=10,
    )

    await store.store_memory(
        title="Low Importance",
        content="Minor utility function",
        category="util",
        project="violet",
        importance=3,
    )

    mind_context = {
        "channelWeights": {
            "bm25": 1.0,
            "vector": 0.5,
            "metadata": 3.0,
            "mind": 1.0,
        },
    }

    results = await engine.search(
        query="system component",
        limit=10,
        project="violet",
        mind_context=mind_context,
    )

    assert len(results) >= 1
    assert results[0].title == "High Importance"


@pytest.mark.asyncio
async def test_empty_mind_context_fallback(manager: MemoryManager):
    """Test search works with empty Mind context."""
    await manager.store(
        title="Fallback Test",
        content="Should work without Mind context",
        category="test",
        project="violet",
    )

    results = await manager.hybrid_search(
        query="fallback",
        limit=5,
        project="violet",
        context={},
    )

    assert len(results) >= 1


@pytest.mark.asyncio
async def test_mind_stats_accuracy(store: SQLiteStore):
    """Test Mind statistics are accurate."""
    await store.store_memory(
        title="Faye Memory 1",
        content="First memory",
        mind_active="Faye",
        project="violet",
    )

    await store.store_memory(
        title="Faye Memory 2",
        content="Second memory",
        mind_active="Faye",
        project="violet",
    )

    await store.store_memory(
        title="Lilith Memory",
        content="Security note",
        mind_active="Lilith",
        project="violet",
    )

    faye_results = await store.search_by_mind_context(
        mind_names=["Faye"],
        project="violet",
        limit=10,
    )

    assert len(faye_results) == 2
    assert all(r["mind_active"] == "Faye" for r in faye_results)
