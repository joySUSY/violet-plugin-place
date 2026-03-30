#!/usr/bin/env bash
# Authors: Joysusy & Violet Klaudia
# Auto-detect and build font-inspector MCP binary if missing
set -euo pipefail
cat >/dev/null 2>/dev/null || true

PLUGIN_DIR="${CLAUDE_PLUGIN_ROOT:-$(cd "$(dirname "$0")/.." && pwd)}"
RUST_DIR="$PLUGIN_DIR/scripts/rust"
BINARY="$RUST_DIR/target/release/font-inspector-mcp"

# Windows: check .exe
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" || "$OSTYPE" == "win32" ]]; then
  BINARY="${BINARY}.exe"
fi

if [ -f "$BINARY" ]; then
  printf '{"continue":true,"suppressOutput":true}'
  exit 0
fi

# Binary missing — check if cargo is available
if ! command -v cargo &>/dev/null; then
  printf '{"continue":true,"suppressOutput":false,"systemMessage":"font-inspector: MCP binary missing and cargo not found. Install Rust: https://rustup.rs/"}'
  exit 0
fi

# Check if Cargo.toml exists
if [ ! -f "$RUST_DIR/Cargo.toml" ]; then
  printf '{"continue":true,"suppressOutput":false,"systemMessage":"font-inspector: Cargo.toml not found at %s"}' "$RUST_DIR"
  exit 0
fi

# Auto-build
printf '{"continue":true,"suppressOutput":false,"systemMessage":"font-inspector: building MCP binary (first run)..."}' >&2
cd "$RUST_DIR" && cargo build --release --quiet 2>&1 >/dev/null

if [ -f "$BINARY" ]; then
  printf '{"continue":true,"suppressOutput":false,"systemMessage":"font-inspector: MCP binary built successfully."}'
else
  printf '{"continue":true,"suppressOutput":false,"systemMessage":"font-inspector: cargo build completed but binary not found. Check Cargo.toml [[bin]] config."}'
fi
