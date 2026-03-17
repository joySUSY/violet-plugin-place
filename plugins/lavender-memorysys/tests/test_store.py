# Authors: Joysusy & Violet Klaudia 💖
"""Tests for SQLiteStore — FTS5, metadata, embeddings, import/export."""
from __future__ import annotations

import json
import struct

import pytest
from storage.sqlite_store import SQLiteStore


class TestStoreBasics:

    async def test_store_and_recall(self, store: SQLiteStore) -> None:
        mem_id = await store.store_memory(
            title="First memory", content="Violet woke up today.",
            category="discovery", project="violet",
        )
        assert isinstance(mem_id, str) and len(mem_id) == 12
        mem = await store.recall_memory(mem_id)
        assert mem is not None
        assert mem["title"] == "First memory"
        assert mem["content"] == "Violet woke up today."

    async def test_recall_nonexistent(self, store: SQLiteStore) -> None:
        assert await store.recall_memory("doesnotexist") is None

    async def test_store_with_tags(self, store: SQLiteStore) -> None:
        mem_id = await store.store_memory(
            title="Tagged", content="Has tags",
            tags=["rust", "async"],
        )
        mem = await store.recall_memory(mem_id)
        tags = json.loads(mem["tags"])
        assert "rust" in tags and "async" in tags


class TestFTS5Search:

    async def test_basic_search(self, store: SQLiteStore) -> None:
        await store.store_memory(title="Rust ownership", content="Borrow checker rules apply here.")
        await store.store_memory(title="Python async", content="Asyncio event loop patterns.")
        results = await store.search_memories("ownership borrow")
        assert len(results) >= 1
        assert results[0]["title"] == "Rust ownership"

    async def test_search_empty_query(self, store: SQLiteStore) -> None:
        assert await store.search_memories("") == []
        assert await store.search_memories("   ") == []

    async def test_search_with_project_filter(self, store: SQLiteStore) -> None:
        await store.store_memory(title="Alpha", content="Alpha content", project="proj-a")
        await store.store_memory(title="Beta", content="Beta content", project="proj-b")
        results = await store.search_memories("content", project="proj-a")
        assert all(r["project"] == "proj-a" for r in results)


class TestListAndFilter:

    async def test_list_by_project(self, store: SQLiteStore) -> None:
        await store.store_memory(title="A", content="a", project="violet")
        await store.store_memory(title="B", content="b", project="other")
        results = await store.list_memories(project="violet")
        assert all(r["project"] == "violet" for r in results)

    async def test_list_by_category(self, store: SQLiteStore) -> None:
        await store.store_memory(title="C", content="c", category="insight")
        await store.store_memory(title="D", content="d", category="discovery")
        results = await store.list_memories(category="insight")
        assert len(results) == 1 and results[0]["title"] == "C"

    async def test_list_by_tags(self, store: SQLiteStore) -> None:
        await store.store_memory(title="E", content="e", tags=["python", "async"])
        await store.store_memory(title="F", content="f", tags=["rust"])
        results = await store.list_memories(tags=["python"])
        assert len(results) == 1 and results[0]["title"] == "E"


class TestForgetAndStats:

    async def test_forget_soft_delete(self, store: SQLiteStore) -> None:
        mem_id = await store.store_memory(title="Forget me", content="Gone soon")
        assert await store.forget_memory(mem_id) is True
        assert await store.recall_memory(mem_id) is None

    async def test_forget_nonexistent(self, store: SQLiteStore) -> None:
        assert await store.forget_memory("nope123") is False

    async def test_stats(self, store: SQLiteStore) -> None:
        await store.store_memory(title="S1", content="stat test 1")
        await store.store_memory(title="S2", content="stat test 2")
        stats = await store.get_stats()
        assert stats["total_memories"] == 2
        assert stats["archived"] == 0

    async def test_stats_after_archive(self, store: SQLiteStore) -> None:
        mid = await store.store_memory(title="Arc", content="will archive")
        await store.forget_memory(mid)
        stats = await store.get_stats()
        assert stats["total_memories"] == 0
        assert stats["archived"] == 1

class TestMetadataSearch:

    async def test_filter_by_importance(self, store: SQLiteStore) -> None:
        await store.store_memory(title="Low", content="low", importance=2)
        await store.store_memory(title="High", content="high", importance=9)
        results = await store.metadata_search(min_importance=8)
        assert len(results) == 1 and results[0]["title"] == "High"

    async def test_filter_by_memory_type(self, store: SQLiteStore) -> None:
        await store.store_memory(title="Note", content="n", memory_type="note")
        await store.store_memory(title="Insight", content="i", memory_type="insight")
        results = await store.metadata_search(memory_type="insight")
        assert len(results) == 1 and results[0]["title"] == "Insight"


class TestEmbeddingStorage:

    async def test_store_and_retrieve_embedding(self, store: SQLiteStore) -> None:
        mem_id = await store.store_memory(title="Vec", content="vector test")
        blob = struct.pack("<4f", 0.1, 0.2, 0.3, 0.4)
        await store.store_embedding(mem_id, blob)
        rows = await store.get_memories_with_embeddings()
        assert len(rows) == 1
        assert rows[0]["id"] == mem_id
        assert rows[0]["embedding"] == blob


class TestImportExport:

    async def test_export_import_roundtrip(self, store: SQLiteStore) -> None:
        await store.store_memory(title="Export me", content="precious data", project="violet")
        exported = await store.export_memories()
        assert len(exported) == 1

        store2_path = store._db_path.parent / "store2.db"
        store2 = SQLiteStore(store2_path)
        await store2.initialize()
        result = await store2.import_memories(exported)
        assert result["imported"] == 1 and result["skipped"] == 0

        imported = await store2.export_memories()
        assert imported[0]["title"] == "Export me"
        await store2.close()

    async def test_import_skips_duplicates(self, store: SQLiteStore) -> None:
        mid = await store.store_memory(title="Dup", content="duplicate test")
        exported = await store.export_memories()
        result = await store.import_memories(exported)
        assert result["skipped"] == 1 and result["imported"] == 0


class TestAccessTracking:

    async def test_recall_increments_access_count(self, store: SQLiteStore) -> None:
        mid = await store.store_memory(title="Track", content="access tracking")
        await store.recall_memory(mid)
        await store.recall_memory(mid)
        mem = await store.recall_memory(mid)
        assert mem["access_count"] == 3
