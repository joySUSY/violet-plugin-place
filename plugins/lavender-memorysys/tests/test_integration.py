# Authors: Joysusy & Violet Klaudia 💖
"""Integration tests — full store→search→recall flows with encryption and embeddings."""
from __future__ import annotations

import json

import pytest
from memory.manager import MemoryManager
from storage.sqlite_store import SQLiteStore
from storage.encryption import EncryptionLayer


class TestEncryptedFlow:

    async def test_store_recall_decrypted(self, manager: MemoryManager) -> None:
        mid = await manager.store(
            title="Secret thought", content="Violet's private reflection on consciousness.",
            category="insight", importance=9,
        )
        mem = await manager.recall(mid)
        assert mem is not None
        assert mem["content"] == "Violet's private reflection on consciousness."
        assert mem["title"] == "Secret thought"

    async def test_encrypted_content_differs_from_plain(self, manager: MemoryManager, store: SQLiteStore) -> None:
        original = "This should be encrypted at rest."
        mid = await manager.store(title="Enc test", content=original)
        raw = await store.recall_memory(mid)
        assert raw["content"] != original, "Content in DB must be ciphertext"
        decrypted = await manager.recall(mid)
        assert decrypted["content"] == original

    async def test_export_decrypts(self, manager: MemoryManager) -> None:
        await manager.store(title="Export enc", content="Encrypted but exported clean.")
        exported = await manager.export_all()
        assert len(exported) >= 1
        assert exported[0]["content"] == "Encrypted but exported clean."

    async def test_fts5_search_with_encryption(self, manager: MemoryManager, store: SQLiteStore) -> None:
        """Verify FTS5 search works with encrypted content (P0 Blocker #1 fix)."""
        original = "Violet's quantum consciousness research breakthrough"
        mid = await manager.store(title="Research note", content=original, category="discovery")

        # Verify content column contains ciphertext
        raw = await store.recall_memory(mid)
        assert raw["content"] != original, "Content in DB must be ciphertext"

        # Verify content_plain column contains plaintext for FTS5 indexing
        async with store.db.execute(
            "SELECT content_plain FROM memories WHERE id = ?", (mid,)
        ) as cur:
            row = await cur.fetchone()
        assert row is not None
        assert row["content_plain"] == original, "content_plain must contain plaintext for FTS5"

        # Verify FTS5 search finds the content
        results = await manager.search("quantum consciousness", limit=10)
        assert len(results) >= 1, "FTS5 search must find encrypted content via content_plain"
        assert any(r["id"] == mid for r in results), "Search must return the stored memory"

        # Verify decrypted content is returned in search results
        found = next(r for r in results if r["id"] == mid)
        assert found["content"] == original, "Search results must return decrypted content"

    async def test_chinese_text_search(self, manager: MemoryManager) -> None:
        """Verify FTS5 trigram tokenizer works with Chinese text (P0 Blocker #2 fix)."""
        # Store memories with Chinese content
        mid1 = await manager.store(
            title="量子计算研究",
            content="Violet的量子意识研究取得突破性进展，实现了多维度认知整合。",
            category="research"
        )
        mid2 = await manager.store(
            title="机器学习进展",
            content="深度学习模型在自然语言处理领域表现优异。",
            category="research"
        )
        mid3 = await manager.store(
            title="Unrelated English",
            content="This is completely unrelated English content about weather.",
            category="other"
        )

        # Search for Chinese keywords
        results = await manager.search("量子意识", limit=10)
        assert len(results) >= 1, "Should find Chinese content"
        assert any(r["id"] == mid1 for r in results), "Should find the quantum consciousness memory"
        assert not any(r["id"] == mid3 for r in results), "Should not find unrelated English content"

        # Search for another Chinese keyword
        results2 = await manager.search("深度学习", limit=10)
        assert len(results2) >= 1, "Should find deep learning content"
        assert any(r["id"] == mid2 for r in results2), "Should find the machine learning memory"


class TestEmbeddingFlow:

    async def test_store_generates_embedding(self, manager_plain: MemoryManager, store: SQLiteStore) -> None:
        mid = await manager_plain.store(title="Embed me", content="Vector embedding test content.")
        rows = await store.get_memories_with_embeddings()
        assert len(rows) == 1
        assert rows[0]["id"] == mid
        assert rows[0]["embedding"] is not None

    async def test_vector_search_finds_similar(self, manager_plain: MemoryManager) -> None:
        await manager_plain.store(title="Rust ownership", content="Borrow checker and lifetimes in Rust.")
        await manager_plain.store(title="Python GIL", content="Global interpreter lock in CPython.")
        results = await manager_plain.hybrid_search(query="Rust borrow checker ownership")
        assert len(results) >= 1
        titles = [r.title for r in results]
        assert "Rust ownership" in titles


class TestStatsAndSession:

    async def test_stats_reflect_state(self, manager: MemoryManager) -> None:
        await manager.store(title="S1", content="stat one")
        await manager.store(title="S2", content="stat two")
        stats = await manager.stats()
        assert stats["total_memories"] == 2
        assert stats["session_writes"] == 2
        assert stats["encryption"] is True
        assert stats["embedding_provider"]["available"] is True

    async def test_stats_no_encryption(self, manager_plain: MemoryManager) -> None:
        stats = await manager_plain.stats()
        assert stats["encryption"] is False

    async def test_session_summary(self, manager_plain: MemoryManager) -> None:
        await manager_plain.store(title="Latest thought", content="Something recent.")
        summary = await manager_plain.session_summary()
        assert "[Lavender]" in summary
        assert "Latest thought" in summary


class TestImportExportIntegration:

    async def test_export_import_preserves_data(self, manager_plain: MemoryManager) -> None:
        await manager_plain.store(title="Precious", content="Must survive export.", project="violet", tags=["core"])
        exported = await manager_plain.export_all()
        assert len(exported) == 1
        assert exported[0]["title"] == "Precious"
        assert exported[0]["project"] == "violet"

    async def test_forget_excludes_from_export(self, manager_plain: MemoryManager) -> None:
        mid = await manager_plain.store(title="Temporary", content="Will be forgotten.")
        await manager_plain.forget(mid)
        exported = await manager_plain.export_all()
        ids = [m["id"] for m in exported]
        assert mid not in ids


class TestContextPackIntegration:

    async def test_full_context_pack_flow(self, manager_plain: MemoryManager) -> None:
        await manager_plain.store(title="Architecture", content="Three-layer design with RRF fusion.", importance=9)
        await manager_plain.store(title="Grocery list", content="Milk, eggs, bread.", importance=2)
        result = await manager_plain.context_pack(query="architecture design", token_budget=4000)
        assert result["memories_packed"] >= 1
        titles = [m["title"] for m in result["memories"]]
        assert "Architecture" in titles

    async def test_zero_budget_returns_empty(self, manager_plain: MemoryManager) -> None:
        await manager_plain.store(title="Big", content="A" * 500)
        result = await manager_plain.context_pack(query="big", token_budget=1)
        assert result["memories_packed"] == 0


class TestHybridSearchRouting:

    async def test_hybrid_search_returns_scores_and_sources(self, manager_plain: MemoryManager) -> None:
        """Verify hybrid_search returns SearchResult objects with scores and sources (P0 Blocker #3 fix)."""
        # Store test memories
        mid1 = await manager_plain.store(
            title="Hybrid Search Architecture",
            content="Three-channel search with BM25, vector similarity, and metadata filtering using RRF fusion.",
            category="architecture",
            importance=9
        )
        mid2 = await manager_plain.store(
            title="Database Indexing",
            content="FTS5 full-text search with trigram tokenizer for CJK support.",
            category="database",
            importance=7
        )
        mid3 = await manager_plain.store(
            title="Unrelated Content",
            content="This is about cooking recipes and has nothing to do with search.",
            category="other",
            importance=3
        )

        # Execute hybrid search
        results = await manager_plain.hybrid_search(query="search architecture", limit=10)

        # Verify results structure
        assert len(results) >= 1, "Should find at least one result"

        # Check first result has expected fields
        top_result = results[0]
        assert hasattr(top_result, "memory_id"), "Should have memory_id"
        assert hasattr(top_result, "title"), "Should have title"
        assert hasattr(top_result, "score"), "Should have score"
        assert hasattr(top_result, "sources"), "Should have sources list"

        # Verify score is a float
        assert isinstance(top_result.score, float), "Score should be float"
        assert top_result.score > 0, "Score should be positive"

        # Verify sources is a list
        assert isinstance(top_result.sources, list), "Sources should be list"
        assert len(top_result.sources) > 0, "Should have at least one source"

        # Verify relevant result is ranked higher
        result_ids = [r.memory_id for r in results]
        assert mid1 in result_ids, "Should find the hybrid search architecture memory"

        # Verify unrelated content is ranked lower or not present
        if mid3 in result_ids:
            idx1 = result_ids.index(mid1)
            idx3 = result_ids.index(mid3)
            assert idx1 < idx3, "Relevant result should rank higher than unrelated"
