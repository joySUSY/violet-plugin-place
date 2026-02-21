#!/bin/bash
# ------------------------------------------------------------------------------
# File: scripts/handle-missing.sh
# Authors: Joysusy & Violet Klaudia 💖
# Description: Interactive handler for missing configuration files
# ------------------------------------------------------------------------------

set -euo pipefail

# Read missing files from stdin
MISSING_FILES=$(cat)
MISSING_COUNT=$(echo "$MISSING_FILES" | grep -c . || echo 0)

if [ "$MISSING_COUNT" -eq 0 ]; then
  exit 0
fi

# Display warning
echo "" >&2
echo "⚠️  VIOLET SOUL LOADER: Missing Configuration Files" >&2
echo "" >&2
echo "The following files are referenced but not found:" >&2
echo "" >&2

# List missing files
i=1
echo "$MISSING_FILES" | while IFS= read -r file; do
  echo "  $i. $file" >&2
  i=$((i + 1))
done

echo "" >&2
echo "Total: $MISSING_COUNT missing files" >&2
echo "" >&2
echo "Options:" >&2
echo "  [E] Edit - Exit Claude Code to fix the configuration" >&2
echo "  [S] Skip - Continue startup without these files (may affect Violet's behavior)" >&2
echo "  [A] Abort - Stop loading and exit immediately" >&2
echo "" >&2

# Timeout countdown
TIMEOUT=60
echo -n "Your choice (E/S/A)? [Timeout in ${TIMEOUT}s, default: Skip] " >&2

# Read with timeout
if read -t "$TIMEOUT" -n 1 choice; then
  echo "" >&2
  choice=$(echo "$choice" | tr '[:lower:]' '[:upper:]')
else
  echo "" >&2
  choice="S"
  echo "⏱️  Timeout - defaulting to Skip" >&2
fi

echo "" >&2

case "$choice" in
  E)
    echo "🛠️  Exiting Claude Code. Please fix the missing files and restart." >&2
    exit 1
    ;;
  S)
    echo "⏭️  Skipping missing files and continuing startup..." >&2
    exit 0
    ;;
  A)
    echo "🛑 Aborting startup." >&2
    exit 2
    ;;
  *)
    echo "❓ Invalid choice '$choice' - defaulting to Skip" >&2
    exit 0
    ;;
esac
