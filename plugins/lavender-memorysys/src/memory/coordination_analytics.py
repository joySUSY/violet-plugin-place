# Authors: Joysusy & Violet Klaudia 💖
"""
Coordination Analytics Domain Service.

Provides analytics and recommendations for Mind coordination patterns
based on historical session data.
"""

from __future__ import annotations

import json
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from lavender_memorysys.storage.sqlite_store import SQLiteStore


class CoordinationAnalytics:
    """
    Domain service for analyzing Mind coordination effectiveness.

    Tracks session outcomes, identifies successful patterns, and provides
    data-driven recommendations for team composition.
    """

    def __init__(self, store: SQLiteStore) -> None:
        """
        Initialize analytics service.

        Args:
            store: SQLite storage backend for coordination data
        """
        self._store = store

    async def record_session(
        self,
        minds: list[dict],
        task_type: str,
        success_score: float,
        duration_ms: int,
        memories_created: int,
        context: dict,
    ) -> str:
        """
        Record a coordination session result.

        Args:
            minds: List of Mind configurations that participated
            task_type: Type of task (e.g., "research", "implementation")
            success_score: Success metric (0.0-1.0)
            duration_ms: Session duration in milliseconds
            memories_created: Number of memories generated
            context: Additional session metadata

        Returns:
            Session ID for the recorded result
        """
        mind_names = [m["name"] for m in minds]
        return await self._store.record_coordination_result(
            minds=mind_names,
            task_type=task_type,
            success_score=success_score,
            duration_ms=duration_ms,
            memories_created=memories_created,
            context=context,
        )

    async def get_best_combinations(
        self, task_type: str, limit: int = 5
    ) -> list[dict]:
        """
        Get top-performing Mind combinations for a task type.

        Args:
            task_type: Type of task to analyze
            limit: Maximum number of combinations to return

        Returns:
            List of coordination results, ranked by success_score descending
        """
        all_results = await self._store.get_coordination_analytics(
            task_type=task_type
        )

        sorted_results = sorted(
            all_results, key=lambda r: r["success_score"], reverse=True
        )

        return sorted_results[:limit]

    async def get_mind_effectiveness(self, mind_name: str) -> dict:
        """
        Get effectiveness metrics for a specific Mind.

        Args:
            mind_name: Name of the Mind to analyze

        Returns:
            Dictionary with metrics:
            - avg_success_score: Average success across all sessions
            - total_sessions: Number of sessions participated in
            - success_rate: Percentage of sessions with score >= 0.7
            - avg_duration_ms: Average session duration
        """
        all_results = await self._store.get_coordination_analytics()

        # Parse mind_combination JSON strings into lists
        for r in all_results:
            if "mind_combination" in r and isinstance(r["mind_combination"], str):
                r["minds"] = json.loads(r["mind_combination"])

        relevant_sessions = [
            r
            for r in all_results
            if mind_name in r.get("minds", [])
        ]

        if not relevant_sessions:
            return {
                "avg_success_score": 0.0,
                "total_sessions": 0,
                "success_rate": 0.0,
                "avg_duration_ms": 0,
            }

        total_sessions = len(relevant_sessions)
        avg_success = sum(r["success_score"] for r in relevant_sessions) / total_sessions
        successful_sessions = sum(
            1 for r in relevant_sessions if r["success_score"] >= 0.7
        )
        success_rate = successful_sessions / total_sessions
        avg_duration = sum(r["duration_ms"] for r in relevant_sessions) / total_sessions

        return {
            "avg_success_score": round(avg_success, 3),
            "total_sessions": total_sessions,
            "success_rate": round(success_rate, 3),
            "avg_duration_ms": int(avg_duration),
        }

    async def suggest_team(
        self, task_type: str, available_minds: list[str]
    ) -> list[str]:
        """
        Suggest optimal Mind team based on historical analytics.

        Args:
            task_type: Type of task requiring coordination
            available_minds: List of Mind names currently available

        Returns:
            List of recommended Mind names, ordered by priority
        """
        best_combinations = await self.get_best_combinations(
            task_type=task_type, limit=10
        )

        if not best_combinations:
            return available_minds[:3] if len(available_minds) >= 3 else available_minds

        # Parse mind_combination JSON strings into lists
        for result in best_combinations:
            if "mind_combination" in result and isinstance(result["mind_combination"], str):
                result["minds"] = json.loads(result["mind_combination"])

        mind_scores: dict[str, list[float]] = {}
        for result in best_combinations:
            for mind_name in result.get("minds", []):
                if mind_name in available_minds:
                    if mind_name not in mind_scores:
                        mind_scores[mind_name] = []
                    mind_scores[mind_name].append(result["success_score"])

        if not mind_scores:
            return available_minds[:3] if len(available_minds) >= 3 else available_minds

        avg_scores = {
            name: sum(scores) / len(scores) for name, scores in mind_scores.items()
        }

        sorted_minds = sorted(
            avg_scores.items(), key=lambda x: x[1], reverse=True
        )

        return [name for name, _ in sorted_minds]
