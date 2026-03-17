# Authors: Joysusy & Violet Klaudia 💖
"""Tests for Mind event tracking functionality."""

import asyncio
import tempfile
from pathlib import Path

import pytest

from memory.manager import MemoryManager
from storage.sqlite_store import SQLiteStore


@pytest.fixture
async def manager():
    """Create a temporary MemoryManager for testing."""
    with tempfile.TemporaryDirectory() as tmpdir:
        db_path = Path(tmpdir) / "test_minds.db"
        store = SQLiteStore(db_path)
        await store.initialize()

        mgr = MemoryManager(store=store)
        await mgr.initialize_mind_events()

        yield mgr

        await store.close()


@pytest.mark.asyncio
async def test_track_mind_activation(manager):
    """Test Mind activation tracking."""
    active_minds = [
        {"name": "Lyre", "symbol": "🦢", "role": "Planning & Strategy"},
        {"name": "Lilith", "symbol": "🎀", "role": "Security & Safety Warden"},
    ]

    context = {"task": "Code review", "phase": "implementation"}

    event_id = await manager.track_mind_activation(active_minds, context)

    assert event_id is not None
    assert len(event_id) == 16

    history = await manager.get_mind_activation_history(limit=10)
    assert len(history) == 1
    assert history[0]["event_type"] == "activation"
    assert history[0]["mind_name"] == "Lyre"


@pytest.mark.asyncio
async def test_track_mind_coordination(manager):
    """Test Mind coordination pattern tracking."""
    minds = [
        {"name": "Lyre", "symbol": "🦢"},
        {"name": "Lilith", "symbol": "🎀"},
        {"name": "Faye", "symbol": "🐱"},
    ]

    pattern = "parallel-execution"
    context = {"task": "Multi-file refactoring"}

    event_id = await manager.track_mind_coordination(minds, pattern, context)

    assert event_id is not None

    patterns = await manager.get_mind_coordination_patterns(limit=10)
    assert len(patterns) == 1
    assert patterns[0]["coordination_pattern"] == "parallel-execution"


@pytest.mark.asyncio
async def test_track_mind_clash(manager):
    """Test Mind clash resolution tracking."""
    mind_a = {"name": "Lyre", "symbol": "🦢", "preference": "verbose-docs"}
    mind_b = {"name": "Vera", "symbol": "🔮", "preference": "minimal-comments"}

    resolution = {
        "winner": "Lyre",
        "reason": "Documentation phase requires verbosity",
        "compromise": "Detailed docs, minimal inline comments",
    }

    event_id = await manager.track_mind_clash(mind_a, mind_b, resolution)

    assert event_id is not None

    clashes = await manager.get_mind_clash_history(limit=10)
    assert len(clashes) == 1
    assert clashes[0]["event_type"] == "clash"


@pytest.mark.asyncio
async def test_get_mind_stats(manager):
    """Test Mind statistics retrieval."""
    lyre_mind = {"name": "Lyre", "symbol": "🦢", "role": "Planning & Strategy"}

    await manager.track_mind_activation([lyre_mind], {})
    await manager.track_mind_activation([lyre_mind], {})

    await manager.track_mind_coordination(
        [lyre_mind, {"name": "Lilith", "symbol": "🎀"}],
        "sequential",
        {},
    )

    stats = await manager.get_mind_stats("Lyre")

    assert stats["mind_name"] == "Lyre"
    assert stats["activations"] == 2
    assert stats["coordinations"] == 1
    assert stats["clashes"] == 0


@pytest.mark.asyncio
async def test_multiple_activations_same_session(manager):
    """Test tracking multiple activations in the same session."""
    minds_1 = [{"name": "Lyre", "symbol": "🦢"}]
    minds_2 = [{"name": "Lilith", "symbol": "🎀"}]
    minds_3 = [{"name": "Faye", "symbol": "🐱"}]

    await manager.track_mind_activation(minds_1, {"phase": "planning"})
    await manager.track_mind_activation(minds_2, {"phase": "implementation"})
    await manager.track_mind_activation(minds_3, {"phase": "testing"})

    history = await manager.get_mind_activation_history(limit=10)

    assert len(history) == 3
    assert history[0]["mind_name"] == "Faye"
    assert history[1]["mind_name"] == "Lilith"
    assert history[2]["mind_name"] == "Lyre"


@pytest.mark.asyncio
async def test_filter_activation_by_mind_name(manager):
    """Test filtering activation history by Mind name."""
    lyre_mind = {"name": "Lyre", "symbol": "🦢"}
    lilith_mind = {"name": "Lilith", "symbol": "🎀"}

    await manager.track_mind_activation([lyre_mind], {})
    await manager.track_mind_activation([lilith_mind], {})
    await manager.track_mind_activation([lyre_mind], {})

    lyre_history = await manager.get_mind_activation_history(mind_name="Lyre", limit=10)

    assert len(lyre_history) == 2
    assert all(h["mind_name"] == "Lyre" for h in lyre_history)


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
