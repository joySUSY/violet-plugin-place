# Authors: Joysusy & Violet Klaudia 💖
"""Integration test for VioletCore hooks in Lavender."""

import asyncio
import logging
import sys
from pathlib import Path

logging.basicConfig(level=logging.DEBUG)

sys.path.insert(0, str(Path(__file__).parent / "src"))

from integrations.violet_bridge import VioletBridge
from integrations.violet_hooks import VioletHooks


async def test_hook_detection():
    print("=== VioletCore Hook Detection Test ===\n")

    import os
    os.environ["LAVENDER_DB_PATH"] = str(Path(__file__).parent / "data" / "lavender.db")

    bridge = VioletBridge()
    hooks = VioletHooks(bridge)

    print(f"VioletCore Available: {hooks.is_available()}")
    print(f"Bridge Path: {bridge._violet_path}")
    print(f"Hook Script: {bridge._hook_script}")
    print(f"LAVENDER_DB_PATH: {os.environ.get('LAVENDER_DB_PATH')}")

    if not hooks.is_available():
        print("\n⚠️  VioletCore not available - graceful degradation active")
        return

    print("\n--- Testing beforeMemorySearch Hook ---")
    result = hooks.before_search("test query", {"mood": "curious"})
    print(f"Result: {result}")
    print(f"Enhanced: {result.get('enhanced')}")
    print(f"Query: {result.get('query')}")
    print(f"Context: {result.get('context')}")

    print("\n--- Testing afterMemoryRetrieval Hook ---")
    test_memories = [
        {"id": "mem1", "title": "Test Memory", "content": "Test content", "mind_active": "Lyre"}
    ]
    filtered = hooks.after_retrieval(test_memories, {"mood": "analytical"})
    print(f"Filtered Memories: {len(filtered)}")

    print("\n--- Testing beforeMemoryStorage Hook ---")
    test_memory = {"title": "New Memory", "content": "New content"}
    enriched = hooks.before_storage(test_memory, {
        "userMessage": "Tell me about X",
        "agentResponse": "Here's what I found (◕‿◕✿)",
        "context": {"mood": "helpful"}
    })
    print(f"Enriched Memory: {enriched.get('title')}")
    print(f"Style Metadata: {enriched.get('styleMetadata') is not None}")

    print("\n✅ Hook integration test complete")


if __name__ == "__main__":
    asyncio.run(test_hook_detection())
