# Authors: Joysusy & Violet Klaudia 💖
"""Hook wrapper functions for VioletCore integration."""

from __future__ import annotations

import logging
from typing import Any

from integrations.violet_bridge import VioletBridge

log = logging.getLogger("lavender.violet_hooks")


class VioletHooks:
    """High-level hook interface for VioletCore integration."""

    def __init__(self, bridge: VioletBridge | None = None) -> None:
        self._bridge = bridge or VioletBridge()

    def is_available(self) -> bool:
        return self._bridge.is_available()

    def before_search(self, query: str, context: dict[str, Any] | None = None) -> dict[str, Any]:
        if not self._bridge.is_available():
            return {"query": query, "context": context or {}, "enhanced": False}

        result = self._bridge.call_hook("beforeMemorySearch", query, context or {})

        if result.get("success"):
            return result["data"]

        log.warning("beforeMemorySearch hook failed: %s", result.get("error"))
        return {"query": query, "context": context or {}, "enhanced": False}

    def after_retrieval(self, memories: list[dict[str, Any]], context: dict[str, Any] | None = None) -> list[dict[str, Any]]:
        if not self._bridge.is_available():
            return memories

        result = self._bridge.call_hook("afterMemoryRetrieval", memories, context or {})

        if result.get("success"):
            return result["data"]

        log.warning("afterMemoryRetrieval hook failed: %s", result.get("error"))
        return memories

    def before_storage(self, memory: dict[str, Any], interaction: dict[str, Any] | None = None) -> dict[str, Any]:
        if not self._bridge.is_available():
            return memory

        result = self._bridge.call_hook("beforeMemoryStorage", memory, interaction or {})

        if result.get("success"):
            return result["data"]

        log.warning("beforeMemoryStorage hook failed: %s", result.get("error"))
        return memory

    def on_activation(self, active_minds: list[dict[str, Any]], context: dict[str, Any] | None = None) -> dict[str, Any]:
        if not self._bridge.is_available():
            return {"notified": False}

        result = self._bridge.call_hook("onMindActivation", active_minds, context or {})

        if result.get("success"):
            return result["data"]

        log.warning("onMindActivation hook failed: %s", result.get("error"))
        return {"notified": False}

    def on_clash(self, mind_a: dict[str, Any], mind_b: dict[str, Any], resolution: dict[str, Any]) -> dict[str, Any]:
        if not self._bridge.is_available():
            return {"recorded": False}

        result = self._bridge.call_hook("onMindClash", mind_a, mind_b, resolution)

        if result.get("success"):
            return result["data"]

        log.warning("onMindClash hook failed: %s", result.get("error"))
        return {"recorded": False}
