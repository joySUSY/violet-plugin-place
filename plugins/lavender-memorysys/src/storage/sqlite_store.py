# Authors: Joysusy & Violet Klaudia 💖
"""SQLite + FTS5 storage backend for Lavender-MemorySys."""
from __future__ import annotations

import json
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import aiosqlite

SCHEMA_SQL = """
CREATE TABLE IF NOT EXISTS memories (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'discovery',
    project TEXT DEFAULT 'violet',
    tags TEXT DEFAULT '[]',
    importance INTEGER DEFAULT 5,
    mind_active TEXT,
    session_id TEXT,
    token_cost INTEGER DEFAULT 0,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    archived INTEGER DEFAULT 0
);

CREATE VIRTUAL TABLE IF NOT EXISTS memories_fts USING fts5(
    title, content, category, tags,
    content=memories, content_rowid=rowid
);

CREATE TRIGGER IF NOT EXISTS memories_ai AFTER INSERT ON memories BEGIN
    INSERT INTO memories_fts(rowid, title, content, category, tags)
    VALUES (new.rowid, new.title, new.content, new.category, new.tags);
END;

CREATE TRIGGER IF NOT EXISTS memories_ad AFTER DELETE ON memories BEGIN
    INSERT INTO memories_fts(memories_fts, rowid, title, content, category, tags)
    VALUES ('delete', old.rowid, old.title, old.content, old.category, old.tags);
END;

CREATE TRIGGER IF NOT EXISTS memories_au AFTER UPDATE ON memories BEGIN
    INSERT INTO memories_fts(memories_fts, rowid, title, content, category, tags)
    VALUES ('delete', old.rowid, old.title, old.content, old.category, old.tags);
    INSERT INTO memories_fts(rowid, title, content, category, tags)
    VALUES (new.rowid, new.title, new.content, new.category, new.tags);
END;

CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    summary TEXT,
    started_at TEXT NOT NULL,
    ended_at TEXT,
    observation_count INTEGER DEFAULT 0,
    total_tokens INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS compact_history (
    id TEXT PRIMARY KEY,
    trigger_type TEXT NOT NULL,
    context_before INTEGER,
    context_after INTEGER,
    preserved_keys TEXT,
    created_at TEXT NOT NULL
);
"""


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


class SQLiteStore:
    """Async SQLite storage with FTS5 full-text search."""

    def __init__(self, db_path: Path) -> None:
        self._db_path = db_path
        self._db: aiosqlite.Connection | None = None

    async def initialize(self) -> None:
        self._db_path.parent.mkdir(parents=True, exist_ok=True)
        self._db = await aiosqlite.connect(str(self._db_path))
        self._db.row_factory = aiosqlite.Row
        await self._db.executescript(SCHEMA_SQL)
        await self._db.commit()

    async def close(self) -> None:
        if self._db:
            await self._db.close()
            self._db = None

    @property
    def db(self) -> aiosqlite.Connection:
        if not self._db:
            raise RuntimeError("Store not initialized — call initialize() first")
        return self._db

    async def store_memory(
        self,
        title: str,
        content: str,
        category: str = "discovery",
        project: str = "violet",
        tags: list[str] | None = None,
        importance: int = 5,
        mind_active: str | None = None,
        session_id: str | None = None,
    ) -> str:
        mem_id = uuid.uuid4().hex[:12]
        now = _now()
        await self.db.execute(
            """INSERT INTO memories
               (id, title, content, category, project, tags, importance,
                mind_active, session_id, created_at, updated_at)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (mem_id, title, content, category, project,
             json.dumps(tags or []), importance,
             mind_active, session_id, now, now),
        )
        await self.db.commit()
        return mem_id

    async def search_memories(
        self, query: str, limit: int = 20, project: str | None = None,
    ) -> list[dict[str, Any]]:
        if not query or not query.strip():
            return []
        try:
            sql = "SELECT m.* FROM memories m JOIN memories_fts f ON m.rowid = f.rowid WHERE memories_fts MATCH ? AND m.archived = 0"
            params: list[Any] = [query]
            if project:
                sql += " AND m.project = ?"
                params.append(project)
            sql += " ORDER BY rank LIMIT ?"
            params.append(limit)
            async with self.db.execute(sql, params) as cur:
                rows = await cur.fetchall()
            return [dict(r) for r in rows]
        except Exception:
            return []

    async def recall_memory(self, mem_id: str) -> dict[str, Any] | None:
        async with self.db.execute(
            "SELECT * FROM memories WHERE id = ? AND archived = 0", (mem_id,)
        ) as cur:
            row = await cur.fetchone()
        return dict(row) if row else None

    async def list_memories(
        self, project: str | None = None, category: str | None = None,
        tags: list[str] | None = None, limit: int = 50, offset: int = 0,
    ) -> list[dict[str, Any]]:
        sql = "SELECT * FROM memories WHERE archived = 0"
        params: list[Any] = []
        if project:
            sql += " AND project = ?"
            params.append(project)
        if category:
            sql += " AND category = ?"
            params.append(category)
        if tags:
            for tag in tags:
                sql += " AND tags LIKE ?"
                params.append(f"%{tag}%")
        sql += " ORDER BY created_at DESC LIMIT ? OFFSET ?"
        params.extend([limit, offset])
        async with self.db.execute(sql, params) as cur:
            rows = await cur.fetchall()
        return [dict(r) for r in rows]

    async def forget_memory(self, mem_id: str) -> bool:
        cur = await self.db.execute(
            "UPDATE memories SET archived = 1, updated_at = ? WHERE id = ?",
            (_now(), mem_id),
        )
        await self.db.commit()
        return cur.rowcount > 0

    async def get_stats(self) -> dict[str, Any]:
        async with self.db.execute(
            "SELECT COUNT(*) as total, SUM(token_cost) as tokens FROM memories WHERE archived = 0"
        ) as cur:
            row = await cur.fetchone()
        async with self.db.execute(
            "SELECT COUNT(*) as archived FROM memories WHERE archived = 1"
        ) as cur:
            arch = await cur.fetchone()
        return {
            "total_memories": row["total"] if row else 0,
            "total_tokens": row["tokens"] or 0 if row else 0,
            "archived": arch["archived"] if arch else 0,
            "db_path": str(self._db_path),
        }

    async def export_memories(self, project: str | None = None) -> list[dict[str, Any]]:
        sql = "SELECT * FROM memories WHERE archived = 0"
        params: list[Any] = []
        if project:
            sql += " AND project = ?"
            params.append(project)
        async with self.db.execute(sql, params) as cur:
            rows = await cur.fetchall()
        return [dict(r) for r in rows]

    async def import_memories(self, memories: list[dict[str, Any]]) -> int:
        count = 0
        for mem in memories:
            now = _now()
            await self.db.execute(
                """INSERT OR IGNORE INTO memories
                   (id, title, content, category, project, tags, importance,
                    mind_active, session_id, token_cost, created_at, updated_at)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                (mem.get("id", uuid.uuid4().hex[:12]), mem["title"], mem["content"],
                 mem.get("category", "discovery"), mem.get("project", "violet"),
                 mem.get("tags", "[]"), mem.get("importance", 5),
                 mem.get("mind_active"), mem.get("session_id"),
                 mem.get("token_cost", 0),
                 mem.get("created_at", now), now),
            )
            count += 1
        await self.db.commit()
        return count

    async def save_session(self, session_id: str, summary: str, obs_count: int, tokens: int) -> None:
        now = _now()
        await self.db.execute(
            """INSERT OR REPLACE INTO sessions (id, summary, started_at, ended_at, observation_count, total_tokens)
               VALUES (?, ?, ?, ?, ?, ?)""",
            (session_id, summary, now, now, obs_count, tokens),
        )
        await self.db.commit()

    async def recent_memories(self, limit: int = 5) -> list[dict[str, Any]]:
        async with self.db.execute(
            "SELECT id, title, category, project, created_at FROM memories WHERE archived = 0 ORDER BY created_at DESC LIMIT ?",
            (limit,),
        ) as cur:
            rows = await cur.fetchall()
        return [dict(r) for r in rows]
