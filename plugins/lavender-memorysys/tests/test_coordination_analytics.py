# Authors: Joysusy & Violet Klaudia 💖
"""Unit tests for CoordinationAnalytics domain service."""

import pytest
from pathlib import Path
from memory.coordination_analytics import CoordinationAnalytics
from storage.sqlite_store import SQLiteStore


@pytest.fixture
async def analytics(tmp_path: Path):
    """Create a CoordinationAnalytics with temporary SQLite database."""
    db_path = tmp_path / "test_lavender.db"
    store = SQLiteStore(db_path)
    await store.initialize()
    ana = CoordinationAnalytics(store)
    yield ana
    await store.close()


class TestCoordinationAnalytics:
    """Test CoordinationAnalytics domain service methods."""

    async def test_record_session(self, analytics):
        """Test recording a coordination session."""
        minds = [
            {"name": "Vera", "symbol": "🔮"},
            {"name": "Lyre", "symbol": "🦢"},
        ]

        record_id = await analytics.record_session(
            minds=minds,
            task_type="synthesis",
            success_score=0.85,
            duration_ms=1500,
            memories_created=3,
            context={"session_type": "test"},
        )

        assert record_id is not None
        assert isinstance(record_id, str)

    async def test_get_best_combinations(self, analytics):
        """Test retrieving best Mind combinations."""
        # Record some sessions first
        minds1 = [{"name": "Vera"}, {"name": "Lyre"}]
        minds2 = [{"name": "Iris"}, {"name": "Aurora"}]

        await analytics.record_session(
            minds=minds1,
            task_type="synthesis",
            success_score=0.9,
            duration_ms=1000,
            memories_created=2,
            context={},
        )

        await analytics.record_session(
            minds=minds2,
            task_type="synthesis",
            success_score=0.7,
            duration_ms=1500,
            memories_created=1,
            context={},
        )

        combinations = await analytics.get_best_combinations(
            task_type="synthesis",
            limit=5,
        )

        assert isinstance(combinations, list)
        # Should be sorted by success_score descending
        if len(combinations) >= 2:
            assert combinations[0]["success_score"] >= combinations[1]["success_score"]

    async def test_get_mind_effectiveness(self, analytics):
        """Test retrieving effectiveness metrics for a Mind."""
        minds = [{"name": "Vera"}]

        # Record multiple sessions
        await analytics.record_session(
            minds=minds,
            task_type="research",
            success_score=0.8,
            duration_ms=2000,
            memories_created=1,
            context={},
        )

        await analytics.record_session(
            minds=minds,
            task_type="research",
            success_score=0.9,
            duration_ms=1800,
            memories_created=2,
            context={},
        )

        metrics = await analytics.get_mind_effectiveness(mind_name="Vera")

        assert metrics is not None
        assert "avg_success_score" in metrics
        assert "total_sessions" in metrics
        assert "success_rate" in metrics
        assert "avg_duration_ms" in metrics
        assert metrics["total_sessions"] == 2
        assert 0.8 <= metrics["avg_success_score"] <= 0.9

    async def test_suggest_team(self, analytics):
        """Test team suggestion based on historical performance."""
        # Record sessions with different Mind combinations
        minds1 = [{"name": "Vera"}, {"name": "Lyre"}]
        minds2 = [{"name": "Iris"}, {"name": "Aurora"}]

        await analytics.record_session(
            minds=minds1,
            task_type="documentation",
            success_score=0.95,
            duration_ms=1200,
            memories_created=4,
            context={},
        )

        await analytics.record_session(
            minds=minds2,
            task_type="documentation",
            success_score=0.75,
            duration_ms=1800,
            memories_created=2,
            context={},
        )

        available_minds = ["Vera", "Lyre", "Iris", "Aurora", "Sydney"]

        team = await analytics.suggest_team(
            task_type="documentation",
            available_minds=available_minds,
        )

        assert isinstance(team, list)
        assert len(team) > 0
        # All suggested Minds should be in available list
        for mind in team:
            assert mind in available_minds

    async def test_record_session_single_mind(self, analytics):
        """Test recording session with single Mind."""
        minds = [{"name": "Vera"}]

        record_id = await analytics.record_session(
            minds=minds,
            task_type="solo-research",
            success_score=0.8,
            duration_ms=3000,
            memories_created=1,
            context={},
        )

        assert record_id is not None

    async def test_get_best_combinations_no_data(self, analytics):
        """Test best combinations with no recorded sessions."""
        combinations = await analytics.get_best_combinations(
            task_type="nonexistent-task",
            limit=5,
        )

        assert isinstance(combinations, list)
        assert len(combinations) == 0

    async def test_get_mind_effectiveness_no_sessions(self, analytics):
        """Test effectiveness metrics for Mind with no sessions."""
        metrics = await analytics.get_mind_effectiveness(mind_name="Nonexistent")

        assert metrics is not None
        assert metrics["avg_success_score"] == 0.0
        assert metrics["total_sessions"] == 0
        assert metrics["success_rate"] == 0.0
        assert metrics["avg_duration_ms"] == 0

    async def test_suggest_team_no_history(self, analytics):
        """Test team suggestion with no historical data."""
        available_minds = ["Vera", "Lyre", "Iris"]

        team = await analytics.suggest_team(
            task_type="new-task-type",
            available_minds=available_minds,
        )

        assert isinstance(team, list)
        # Should return subset of available Minds as fallback
        assert len(team) <= len(available_minds)

    async def test_record_high_success_session(self, analytics):
        """Test recording session with high success score."""
        minds = [{"name": "Vera"}, {"name": "Lyre"}, {"name": "Iris"}]

        record_id = await analytics.record_session(
            minds=minds,
            task_type="complex-synthesis",
            success_score=0.98,
            duration_ms=5000,
            memories_created=10,
            context={"complexity": "high"},
        )

        assert record_id is not None

        # Verify it appears in best combinations
        combinations = await analytics.get_best_combinations(
            task_type="complex-synthesis",
            limit=1,
        )

        assert len(combinations) > 0
        assert combinations[0]["success_score"] == 0.98

    async def test_mind_effectiveness_success_rate(self, analytics):
        """Test success rate calculation in effectiveness metrics."""
        minds = [{"name": "Vera"}]

        # Record 3 successful sessions (score >= 0.7)
        for _ in range(3):
            await analytics.record_session(
                minds=minds,
                task_type="test",
                success_score=0.8,
                duration_ms=1000,
                memories_created=1,
                context={},
            )

        # Record 1 failed session (score < 0.7)
        await analytics.record_session(
            minds=minds,
            task_type="test",
            success_score=0.5,
            duration_ms=1000,
            memories_created=0,
            context={},
        )

        metrics = await analytics.get_mind_effectiveness(mind_name="Vera")

        assert metrics["total_sessions"] == 4
        assert metrics["success_rate"] == 0.75  # 3/4

    async def test_suggest_team_prioritizes_high_performers(self, analytics):
        """Test that team suggestion prioritizes high-performing Minds."""
        # Record sessions with clear performance difference
        high_performer = [{"name": "Vera"}]
        low_performer = [{"name": "Sydney"}]

        # Vera: high success
        for _ in range(3):
            await analytics.record_session(
                minds=high_performer,
                task_type="priority-test",
                success_score=0.95,
                duration_ms=1000,
                memories_created=3,
                context={},
            )

        # Sydney: low success
        for _ in range(3):
            await analytics.record_session(
                minds=low_performer,
                task_type="priority-test",
                success_score=0.6,
                duration_ms=1000,
                memories_created=1,
                context={},
            )

        available_minds = ["Vera", "Sydney", "Iris"]

        team = await analytics.suggest_team(
            task_type="priority-test",
            available_minds=available_minds,
        )

        # Vera should be suggested before Sydney
        if "Vera" in team and "Sydney" in team:
            assert team.index("Vera") < team.index("Sydney")
