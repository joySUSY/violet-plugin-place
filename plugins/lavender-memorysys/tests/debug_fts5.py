# Authors: Joysusy & Violet Klaudia 💖
"""Debug script to check FTS5 index population."""
import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

from storage.sqlite_store import SQLiteStore
from storage.encryption import EncryptionLayer
from memory.manager import MemoryManager


async def debug_fts5():
    print("🔍 FTS5 Debug Script")
    print("=" * 60)

    db_path = Path(__file__).parent / "test_data" / "debug_fts5.db"
    db_path.parent.mkdir(parents=True, exist_ok=True)

    store = SQLiteStore(db_path)
    await store.initialize()

    encryption = EncryptionLayer(passphrase="test-key")
    manager = MemoryManager(store, None, encryption=encryption)

    # Store a test memory
    print("\n📝 Storing test memory...")
    mid = await manager.store(
        title="量子计算研究",
        content="Quantum computers use superposition and entanglement for parallel computation.",
        category="science",
        importance=7
    )
    print(f"✅ Stored memory: {mid}")

    # Check if content_plain is set
    print("\n🔍 Checking content_plain in memories table...")
    async with store.db.execute(
        "SELECT id, title, content_plain FROM memories WHERE id = ?", (mid,)
    ) as cur:
        row = await cur.fetchone()
    if row:
        print(f"  ID: {row['id']}")
        print(f"  Title: {row['title']}")
        print(f"  content_plain: {row['content_plain'][:80]}...")
    else:
        print("  ❌ Memory not found!")

    # Check if FTS5 index is populated
    print("\n🔍 Checking FTS5 index (memories_fts)...")
    async with store.db.execute(
        "SELECT rowid, title, content_plain FROM memories_fts WHERE rowid = (SELECT rowid FROM memories WHERE id = ?)", (mid,)
    ) as cur:
        fts_row = await cur.fetchone()
    if fts_row:
        print(f"  ✅ FTS5 index populated!")
        print(f"  rowid: {fts_row['rowid']}")
        print(f"  title: {fts_row['title']}")
        print(f"  content_plain: {fts_row['content_plain'][:80]}...")
    else:
        print("  ❌ FTS5 index NOT populated!")

    # Test direct FTS5 query
    print("\n🔍 Testing direct FTS5 MATCH query...")
    test_queries = [
        "quantum",
        "quantum computing",
        "quantum computing superposition",
        "superposition",
        "Quantum",
    ]

    for query in test_queries:
        safe_query = store._sanitize_fts_query(query)
        print(f"\n  Query: '{query}' → Sanitized: '{safe_query}'")
        async with store.db.execute(
            "SELECT rowid, rank FROM memories_fts WHERE memories_fts MATCH ?", (safe_query,)
        ) as cur:
            results = await cur.fetchall()
        print(f"  Results: {len(results)} rows")
        if results:
            for r in results:
                print(f"    rowid={r['rowid']}, rank={r['rank']}")

    # Test manager.search()
    print("\n🔍 Testing manager.search()...")
    results = await manager.search("quantum computing superposition", limit=10)
    print(f"  Results: {len(results)} memories")
    if results:
        for r in results:
            print(f"    {r['id']}: {r['title']}")

    await store.close()
    print("\n✅ Debug complete!")


if __name__ == "__main__":
    asyncio.run(debug_fts5())
