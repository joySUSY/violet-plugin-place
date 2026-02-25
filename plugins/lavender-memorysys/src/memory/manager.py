# Authors: Joysusy & Violet Klaudia 💖
"""Core memory manager for Lavender-MemorySys — orchestrates storage and embedding providers."""

from __future__ import annotations

import uuid
from datetime import datetime, timezone
from typing import Any

from storage.sqlite_store import SQLiteStore
from providers.base import EmbeddingProvider


class MemoryManager:

    def __init__(
        self,
        store: SQLiteStore,
        embedding_provider: EmbeddingProvider | None = None,
    ) -> None:
        self._store = store
        self._embedding = embedding_provider
        self._session_id: str = uuid.uuid4().hex[:12]
        self._session_start: datetime = datetime.now(timezone.utc)
        self._session_writes: int = 0

    async def store(
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
        if self._embedding is not None:
            await self._embedding.embed(f"{title} {content}")

        mem_id = await self._store.store_memory(
            title=title,
            content=content,
            category=category,
            project=project,
            tags=tags,
            importance=importance,
            mind_active=mind_active,
            session_id=session_id or self._session_id,
        )
        self._session_writes += 1
        return mem_id

    async def search(
        self,
        query: str,
        limit: int = 20,
        project: str | None = None,
    ) -> list[dict[str, Any]]:
        return await self._store.search_memories(query, limit=limit, project=project)

    async def recall(self, mem_id: str) -> dict[str, Any] | None:
        return await self._store.recall_memory(mem_id)

    async def list_all(
        self,
        project: str | None = None,
        category: str | None = None,
        tags: list[str] | None = None,
        limit: int = 50,
        offset: int = 0,
    ) -> list[dict[str, Any]]:
        return await self._store.list_memories(
            project=project, category=category,
            tags=tags, limit=limit, offset=offset,
        )

    async def forget(self, mem_id: str) -> bool:
        return await self._store.forget_memory(mem_id)

    async def stats(self) -> dict[str, Any]:
        store_stats = await self._store.get_stats()
        provider_health: dict[str, Any] = {"available": False}
        if self._embedding is not None:
            try:
                await self._embedding.health_check()
                provider_health = {"available": True, "provider": self._embedding.name}
            except Exception as exc:
                provider_health = {"available": False, "error": str(exc)}
        return {
            **store_stats,
            "session_id": self._session_id,
            "session_writes": self._session_writes,
            "embedding_provider": provider_health,
        }

    async def export_all(self, project: str | None = None) -> list[dict[str, Any]]:
        return await self._store.export_memories(project=project)

    async def import_all(self, memories: list[dict[str, Any]]) -> int:
        return await self._store.import_memories(memories)

    async def session_summary(self) -> str:
        recent = await self._store.recent_memories(limit=1)
        stats = await self._store.get_stats()
        last_title = recent[0]["title"][:40] if recent else "none"
        total = stats["total_memories"]
        return f'[Lavender] {total} memories | Last: "{last_title}"'

    async def recent(self, limit: int = 5) -> list[dict[str, Any]]:
        return await self._store.recent_memories(limit=limit)
