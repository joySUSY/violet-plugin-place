#!/usr/bin/env bash
# Authors: Joysusy & Violet Klaudia
# Check optional dependencies for developer-tool engine
set -euo pipefail
cat >/dev/null 2>/dev/null || true

missing=""

# Check cass (Coding Agent Session Search)
if ! command -v cass &>/dev/null; then
  missing="${missing}cass (cargo install coding-agent-session-search), "
fi

# Check uv (Python package manager)
if ! command -v uv &>/dev/null; then
  missing="${missing}uv (curl -LsSf https://astral.sh/uv/install.sh | sh), "
fi

if [ -n "$missing" ]; then
  missing="${missing%, }"
  printf '{"continue":true,"suppressOutput":false,"systemMessage":"developer-tool optional deps missing: %s"}' "$missing"
else
  printf '{"continue":true,"suppressOutput":true}'
fi
