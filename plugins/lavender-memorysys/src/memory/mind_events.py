# Authors: Joysusy & Violet Klaudia 💖
"""Mind event tracking for VioletCore integration."""

from __future__ import annotations

import json
import logging
import uuid
from datetime import datetime, timezone
from typing import Any

from storage.sqlite_store import SQLiteStore

log = logging.getLogger("lavender.mind_events")


class MindEventTracker:
    """Tracks Mind activation events, coordination patterns, and clash resolutions."""

    def __init__(self, store: SQLiteStore) -> None:
        self._store = store

    async def initialize_schema(self) -> None:
        """Create mind_events table if it doesn't exist."""
        schema = """
        CREATE TABLE IF NOT EXISTS mind_events (
            id TEXT PRIMARY KEY,
            event_type TEXT NOT NULL,
            mind_name TEXT,
            mind_symbol TEXT,
            minds_involved TEXT,
            coordination_pattern TEXT,
            clash_resolution TEXT,
            context TEXT,
            session_id TEXT,
            created_at TEXT NOT NULL
        );

        CREATE INDEX IF NOT EXISTS idx_mind_events_type ON mind_events(event_type);
        CREATE INDEX IF NOT EXISTS idx_mind_events_mind ON mind_events(mind_name);
        CREATE INDEX IF NOT EXISTS idx_mind_events_session ON mind_events(session_id);
        CREATE INDEX IF NOT EXISTS idx_mind_events_created ON mind_events(created_at);
        """

        if self._store._db:
            await self._store._db.executescript(schema)
            await self._store._db.commit()

    async def track_activation(
        self,
        active_minds: list[dict[str, Any]],
        context: dict[str, Any],
        session_id: str | None = None,
    ) -> str:
        """Record Mind activation event."""
        event_id = uuid.uuid4().hex[:16]
        now = datetime.now(timezone.utc).isoformat()

        minds_data = json.dumps([
            {
                "name": m.get("name"),
                "symbol": m.get("symbol"),
                "role": m.get("role"),
            }
            for m in active_minds
        ])

        primary_mind = active_minds[0] if active_minds else {}

        if self._store._db:
            await self._store._db.execute(
                """
                INSERT INTO mind_events (
                    id, event_type, mind_name, mind_symbol,
                    minds_involved, context, session_id, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    event_id,
                    "activation",
                    primary_mind.get("name"),
                    primary_mind.get("symbol"),
                    minds_data,
                    json.dumps(context),
                    session_id,
                    now,
                ),
            )
            await self._store._db.commit()

        log.info("Tracked Mind activation: %s", [m.get("name") for m in active_minds])
        return event_id

    async def track_coordination(
        self,
        minds: list[dict[str, Any]],
        pattern: str,
        context: dict[str, Any],
        session_id: str | None = None,
    ) -> str:
        """Record Mind coordination pattern."""
        event_id = uuid.uuid4().hex[:16]
        now = datetime.now(timezone.utc).isoformat()

        minds_data = json.dumps([m.get("name") for m in minds])

        if self._store._db:
            await self._store._db.execute(
                """
                INSERT INTO mind_events (
                    id, event_type, minds_involved, coordination_pattern,
                    context, session_id, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    event_id,
                    "coordination",
                    minds_data,
                    pattern,
                    json.dumps(context),
                    session_id,
                    now,
                ),
            )
            await self._store._db.commit()

        log.info("Tracked coordination pattern: %s among %s", pattern, minds_data)
        return event_id

    async def track_clash(
        self,
        mind_a: dict[str, Any],
        mind_b: dict[str, Any],
        resolution: dict[str, Any],
        session_id: str | None = None,
    ) -> str:
        """Record Mind clash resolution."""
        event_id = uuid.uuid4().hex[:16]
        now = datetime.now(timezone.utc).isoformat()

        minds_data = json.dumps([mind_a.get("name"), mind_b.get("name")])

        if self._store._db:
            await self._store._db.execute(
                """
                INSERT INTO mind_events (
                    id, event_type, minds_involved, clash_resolution,
                    context, session_id, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    event_id,
                    "clash",
                    minds_data,
                    json.dumps(resolution),
                    json.dumps({"mind_a": mind_a, "mind_b": mind_b}),
                    session_id,
                    now,
                ),
            )
            await self._store._db.commit()

        log.info("Tracked Mind clash: %s vs %s", mind_a.get("name"), mind_b.get("name"))
        return event_id

    async def get_activation_history(
        self,
        mind_name: str | None = None,
        session_id: str | None = None,
        limit: int = 50,
    ) -> list[dict[str, Any]]:
        """Retrieve Mind activation history."""
        if not self._store._db:
            return []

        query = "SELECT * FROM mind_events WHERE event_type = 'activation'"
        params: list[Any] = []

        if mind_name:
            query += " AND mind_name = ?"
            params.append(mind_name)

        if session_id:
            query += " AND session_id = ?"
            params.append(session_id)

        query += " ORDER BY created_at DESC LIMIT ?"
        params.append(limit)

        async with self._store._db.execute(query, params) as cursor:
            rows = await cursor.fetchall()
            return [dict(row) for row in rows]

    async def get_coordination_patterns(
        self,
        session_id: str | None = None,
        limit: int = 50,
    ) -> list[dict[str, Any]]:
        """Retrieve coordination pattern history."""
        if not self._store._db:
            return []

        query = "SELECT * FROM mind_events WHERE event_type = 'coordination'"
        params: list[Any] = []

        if session_id:
            query += " AND session_id = ?"
            params.append(session_id)

        query += " ORDER BY created_at DESC LIMIT ?"
        params.append(limit)

        async with self._store._db.execute(query, params) as cursor:
            rows = await cursor.fetchall()
            return [dict(row) for row in rows]

    async def get_clash_history(
        self,
        session_id: str | None = None,
        limit: int = 50,
    ) -> list[dict[str, Any]]:
        """Retrieve Mind clash resolution history."""
        if not self._store._db:
            return []

        query = "SELECT * FROM mind_events WHERE event_type = 'clash'"
        params: list[Any] = []

        if session_id:
            query += " AND session_id = ?"
            params.append(session_id)

        query += " ORDER BY created_at DESC LIMIT ?"
        params.append(limit)

        async with self._store._db.execute(query, params) as cursor:
            rows = await cursor.fetchall()
            return [dict(row) for row in rows]

    async def get_mind_stats(self, mind_name: str) -> dict[str, Any]:
        """Get statistics for a specific Mind."""
        if not self._store._db:
            return {"activations": 0, "coordinations": 0, "clashes": 0}

        async with self._store._db.execute(
            "SELECT COUNT(*) FROM mind_events WHERE event_type = 'activation' AND mind_name = ?",
            (mind_name,),
        ) as cursor:
            activations = (await cursor.fetchone())[0]

        async with self._store._db.execute(
            "SELECT COUNT(*) FROM mind_events WHERE event_type = 'coordination' AND minds_involved LIKE ?",
            (f'%"{mind_name}"%',),
        ) as cursor:
            coordinations = (await cursor.fetchone())[0]

        async with self._store._db.execute(
            "SELECT COUNT(*) FROM mind_events WHERE event_type = 'clash' AND minds_involved LIKE ?",
            (f'%"{mind_name}"%',),
        ) as cursor:
            clashes = (await cursor.fetchone())[0]

        return {
            "mind_name": mind_name,
            "activations": activations,
            "coordinations": coordinations,
            "clashes": clashes,
        }
