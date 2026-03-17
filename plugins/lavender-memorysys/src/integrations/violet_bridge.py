# Authors: Joysusy & Violet Klaudia 💖
"""Node.js subprocess bridge for VioletCore hook execution."""

from __future__ import annotations

import json
import logging
import subprocess
from pathlib import Path
from typing import Any

log = logging.getLogger("lavender.violet_bridge")


class VioletBridge:
    """Subprocess bridge to execute VioletCore Node.js hooks from Python."""

    def __init__(self, violet_core_path: Path | None = None) -> None:
        self._violet_path = violet_core_path or self._detect_violet_core()
        self._hook_script = self._violet_path / "adapters" / "lavender-hooks.js" if self._violet_path else None
        self._available = self._check_availability()

    @staticmethod
    def _detect_violet_core() -> Path | None:
        current = Path(__file__).resolve()
        for parent in current.parents:
            candidate = parent / "violet-core"
            if candidate.exists() and (candidate / "adapters" / "lavender-hooks.js").exists():
                return candidate
        return None

    def _check_availability(self) -> bool:
        if not self._hook_script or not self._hook_script.exists():
            log.debug("VioletCore hooks not found at %s", self._hook_script)
            return False
        try:
            result = subprocess.run(
                ["node", "--version"],
                capture_output=True,
                text=True,
                timeout=2,
            )
            return result.returncode == 0
        except (subprocess.TimeoutExpired, FileNotFoundError):
            log.debug("Node.js not available for VioletCore bridge")
            return False

    def is_available(self) -> bool:
        return self._available

    def call_hook(self, hook_name: str, *args: Any) -> dict[str, Any]:
        if not self._available:
            return {"success": False, "error": "VioletCore not available"}

        payload = json.dumps({"hook": hook_name, "args": args})
        wrapper_code = f"""
const hooks = require('{str(self._hook_script).replace(chr(92), chr(92) * 2)}');
const payload = {payload};
const result = hooks[payload.hook](...payload.args);
console.log(JSON.stringify(result));
"""

        try:
            result = subprocess.run(
                ["node", "-e", wrapper_code],
                capture_output=True,
                text=True,
                timeout=5,
                cwd=str(self._violet_path),
            )

            if result.returncode != 0:
                log.warning("VioletCore hook %s failed (code %d): stdout=%s stderr=%s",
                           hook_name, result.returncode, result.stdout, result.stderr)
                return {"success": False, "error": result.stderr, "stdout": result.stdout}

            if not result.stdout.strip():
                log.warning("VioletCore hook %s returned empty output", hook_name)
                return {"success": False, "error": "empty_output"}

            return {"success": True, "data": json.loads(result.stdout)}

        except subprocess.TimeoutExpired:
            log.error("VioletCore hook %s timed out", hook_name)
            return {"success": False, "error": "timeout"}
        except json.JSONDecodeError as exc:
            log.error("VioletCore hook %s returned invalid JSON: %s (output: %s)",
                     hook_name, exc, result.stdout if 'result' in locals() else 'N/A')
            return {"success": False, "error": "invalid_json", "output": result.stdout if 'result' in locals() else None}
        except Exception as exc:
            log.error("VioletCore hook %s execution failed: %s", hook_name, exc)
            return {"success": False, "error": str(exc)}
