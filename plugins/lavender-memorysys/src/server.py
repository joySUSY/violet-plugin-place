# Authors: Joysusy & Violet Klaudia 💖
# /// script
# requires-python = ">=3.12"
# dependencies = ["mcp>=1.0.0", "aiosqlite>=0.20.0", "cryptography>=44.0.0", "httpx>=0.28.0", "pydantic>=2.10.0"]
# ///
"""Lavender-MemorySys MCP Server — Token-efficient encrypted memory for Violet."""
from __future__ import annotations

import json
import sys
from pathlib import Path

from mcp.server.fastmcp import FastMCP

sys.path.insert(0, str(Path(__file__).parent))

from config import load_config
from storage.sqlite_store import SQLiteStore
from memory.manager import MemoryManager
from providers.gemini_provider import GeminiProvider
from providers.openai_provider import OpenAIProvider

mcp = FastMCP("lavender-memorysys", version="1.0.0")
_manager: MemoryManager | None = None


async def get_manager() -> MemoryManager:
    global _manager
    if _manager is not None:
        return _manager

    cfg = load_config()
    db_path = cfg.storage.db_dir / "lavender.db"
    store = SQLiteStore(db_path)
    await store.initialize()

    provider = None
    if cfg.provider.gemini_api_key:
        provider = GeminiProvider(cfg.provider.gemini_api_key)
    elif cfg.provider.openai_api_key:
        provider = OpenAIProvider(cfg.provider.openai_api_key)

    _manager = MemoryManager(store, provider)
    return _manager


@mcp.tool()
async def lavender_store(
    title: str,
    content: str,
    category: str = "discovery",
    project: str = "violet",
    tags: str = "[]",
    importance: int = 5,
    mind_active: str = "",
) -> str:
    """Store a new memory with metadata and tags."""
    mgr = await get_manager()
    try:
        tag_list = json.loads(tags) if isinstance(tags, str) else tags
    except (json.JSONDecodeError, TypeError):
        tag_list = []
    mem_id = await mgr.store(
        title=title, content=content, category=category,
        project=project, tags=tag_list, importance=importance,
        mind_active=mind_active or None, session_id=None,
    )
    return json.dumps({"status": "stored", "id": mem_id, "title": title})


@mcp.tool()
async def lavender_search(query: str, limit: int = 20, project: str = "") -> str:
    """Semantic search across memories. Returns compact index."""
    mgr = await get_manager()
    results = await mgr.search(query, limit=limit, project=project or None)
    compact = [{"id": r["id"], "title": r["title"], "category": r["category"],
                "created": r["created_at"][:10]} for r in results]
    return json.dumps({"count": len(compact), "results": compact})


@mcp.tool()
async def lavender_recall(memory_id: str) -> str:
    """Retrieve full memory details by ID."""
    mgr = await get_manager()
    mem = await mgr.recall(memory_id)
    if not mem:
        return json.dumps({"error": f"Memory {memory_id} not found"})
    return json.dumps(mem)


@mcp.tool()
async def lavender_list(
    project: str = "", category: str = "", tags: str = "[]",
    limit: int = 50, offset: int = 0,
) -> str:
    """List memories with filters (project, category, tags)."""
    mgr = await get_manager()
    tag_list = json.loads(tags) if tags and tags != "[]" else None
    results = await mgr.list_all(
        project=project or None, category=category or None,
        tags=tag_list, limit=limit, offset=offset,
    )
    compact = [{"id": r["id"], "title": r["title"], "category": r["category"],
                "project": r["project"]} for r in results]
    return json.dumps({"count": len(compact), "results": compact})


@mcp.tool()
async def lavender_forget(memory_id: str) -> str:
    """Soft-delete a memory by ID (moves to archive)."""
    mgr = await get_manager()
    ok = await mgr.forget(memory_id)
    if not ok:
        return json.dumps({"error": f"Memory {memory_id} not found"})
    return json.dumps({"status": "archived", "id": memory_id})


@mcp.tool()
async def lavender_stats() -> str:
    """Show memory count, storage size, provider status, encryption status."""
    mgr = await get_manager()
    stats = await mgr.stats()
    return json.dumps(stats)


@mcp.tool()
async def lavender_export(project: str = "") -> str:
    """Export all memories to JSON (for backup)."""
    mgr = await get_manager()
    memories = await mgr.export_all(project=project or None)
    return json.dumps({"count": len(memories), "memories": memories})


@mcp.tool()
async def lavender_import(memories_json: str) -> str:
    """Import memories from JSON backup."""
    mgr = await get_manager()
    try:
        memories = json.loads(memories_json)
    except (json.JSONDecodeError, TypeError):
        return json.dumps({"error": "Invalid JSON input"})
    count = await mgr.import_all(memories)
    return json.dumps({"status": "imported", "count": count})


@mcp.resource("memory://recent")
async def recent_memories() -> str:
    """Last 5 memories (compact view)."""
    mgr = await get_manager()
    recent = await mgr.recent(limit=5)
    return json.dumps(recent)


@mcp.resource("memory://status")
async def memory_status() -> str:
    """Memory system status and stats."""
    mgr = await get_manager()
    stats = await mgr.stats()
    return json.dumps(stats)


@mcp.resource("memory://summary")
async def session_summary() -> str:
    """3-line session summary for zero-inject loading (~50 tokens)."""
    mgr = await get_manager()
    summary = await mgr.session_summary()
    return summary


if __name__ == "__main__":
    mcp.run(transport="stdio")
