#!/bin/bash
# ------------------------------------------------------------------------------
# File: scripts/parse-references.sh
# Authors: Joysusy & Violet Klaudia 💖
# Description: Recursively parse file references in Markdown files
# ------------------------------------------------------------------------------

set -euo pipefail

# Input: file_path current_depth max_depth visited_files_file
FILE_PATH="$1"
CURRENT_DEPTH="${2:-0}"
MAX_DEPTH="${3:-5}"
VISITED_FILE="${4:-/tmp/violet-visited-$$}"

# Check depth limit
if [ "$CURRENT_DEPTH" -ge "$MAX_DEPTH" ]; then
  exit 0
fi

# Check if file exists
if [ ! -f "$FILE_PATH" ]; then
  exit 0
fi

# Get absolute path and resolve symlinks
if command -v realpath >/dev/null 2>&1; then
  ABS_PATH=$(realpath "$FILE_PATH" 2>/dev/null || echo "$FILE_PATH")
else
  # Fallback for systems without realpath
  ABS_PATH=$(cd "$(dirname "$FILE_PATH")" && pwd)/$(basename "$FILE_PATH")
fi

# Check if already visited
if grep -Fxq "$ABS_PATH" "$VISITED_FILE" 2>/dev/null; then
  exit 0
fi

# Mark as visited
echo "$ABS_PATH" >> "$VISITED_FILE"

# Get file directory for relative path resolution
FILE_DIR=$(dirname "$FILE_PATH")

# Extract references using multiple patterns
REFERENCES=$(grep -oE '\[([^\]]+)\]\(([^)]+\.md)\)' "$FILE_PATH" | sed -E 's/.*\(([^)]+)\).*/\1/' || true)
REFERENCES+=$'\n'$(grep -oE '`([^`]+\.md)`' "$FILE_PATH" | sed -E 's/`([^`]+)`/\1/' || true)
REFERENCES+=$'\n'$(grep -oE '(^|\s)([a-zA-Z0-9_\-./~]+\.md)' "$FILE_PATH" | sed -E 's/^\s+//' || true)
REFERENCES+=$'\n'$(grep -oE '(contexts|rules|skills|agents|journals)/[a-zA-Z0-9_\-/]+\.md' "$FILE_PATH" || true)

# Process each reference
echo "$REFERENCES" | while IFS= read -r ref; do
  [ -z "$ref" ] && continue

  # Resolve path
  if [[ "$ref" == ~/* ]]; then
    # Absolute path with ~
    RESOLVED="${ref/#\~/$HOME}"
  elif [[ "$ref" == /* ]]; then
    # Absolute path
    RESOLVED="$ref"
  elif [[ "$ref" == ./* ]] || [[ "$ref" == ../* ]]; then
    # Relative path
    RESOLVED="$FILE_DIR/$ref"
  else
    # Assume relative to ~/.claude/
    RESOLVED="$HOME/.claude/$ref"
  fi

  # Normalize path
  RESOLVED=$(realpath -m "$RESOLVED" 2>/dev/null || echo "$RESOLVED")

  # Output the reference
  echo "$RESOLVED"

  # Recursively parse if file exists
  if [ -f "$RESOLVED" ]; then
    "$0" "$RESOLVED" $((CURRENT_DEPTH + 1)) "$MAX_DEPTH" "$VISITED_FILE"
  fi
done
