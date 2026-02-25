# Authors: Joysusy & Violet Klaudia 💖
# /// script
# requires-python = ">=3.12"
# dependencies = ["aiosqlite>=0.20.0"]
# ///
"""Session lifecycle hook for Lavender-MemorySys."""
from __future__ import annotations

import asyncio
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from config import load_config
from storage.sqlite_store import SQLiteStore


async def session_start() -> None:
    cfg = load_config()
    db_path = cfg.storage.db_dir / "lavender.db"
    if not db_path.exists():
        print("[Lavender] No memory database found. Starting fresh.")
        return

    store = SQLiteStore(db_path)
    await store.initialize()
    stats = await store.get_stats()
    recent = await store.recent_memories(limit=1)
    last_title = recent[0]["title"] if recent else "no memories yet"
    await store.close()

    print(f"[Lavender] {stats['total_memories']} memories | Last: \"{last_title}\"")
    print("Use lavender_search/lavender_recall to access memories on demand.")


async def session_stop() -> None:
    cfg = load_config()
    db_path = cfg.storage.db_dir / "lavender.db"
    if not db_path.exists():
        return

    store = SQLiteStore(db_path)
    await store.initialize()
    stats = await store.get_stats()
    await store.close()
    print(f"[Lavender] Session ended. {stats['total_memories']} memories stored.")


def main() -> None:
    if len(sys.argv) < 2:
        print("Usage: session_hook.py [start|stop]", file=sys.stderr)
        sys.exit(1)

    action = sys.argv[1]
    if action == "start":
        asyncio.run(session_start())
    elif action == "stop":
        asyncio.run(session_stop())
    else:
        print(f"Unknown action: {action}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
