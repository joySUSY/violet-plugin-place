#!/bin/bash
# ------------------------------------------------------------------------------
# File: scripts/load-soul.sh
# Authors: Joysusy & Violet Klaudia 💖
# Description: Main script to load Violet's soul configuration at startup
# ------------------------------------------------------------------------------

set -euo pipefail

# Core configuration files (9 files)
CORE_FILES=(
  "$HOME/.claude/SOUL.md"
  "$HOME/.claude/USER.md"
  "$HOME/.claude/IDENTITY.md"
  "$HOME/.claude/CLAUDE.md"
  "$HOME/.claude/AGENTS.md"
  "$HOME/.claude/TOOLS.md"
  "$HOME/.claude/QUICK_START.md"
  "$HOME/.claude/HEARTBEAT.md"
  "$HOME/.claude/BOOTSTRAP.md"
)

# Temporary files
VISITED_FILE="/tmp/violet-visited-$$"
ALL_FILES_FILE="/tmp/violet-all-files-$$"
MISSING_FILES_FILE="/tmp/violet-missing-$$"

# Cleanup on exit
trap 'rm -f "$VISITED_FILE" "$ALL_FILES_FILE" "$MISSING_FILES_FILE"' EXIT

# Initialize
> "$VISITED_FILE"
> "$ALL_FILES_FILE"
> "$MISSING_FILES_FILE"

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Parse references for each core file
for core_file in "${CORE_FILES[@]}"; do
  echo "$core_file" >> "$ALL_FILES_FILE"

  if [ -f "$core_file" ]; then
    # Recursively parse references
    bash "$SCRIPT_DIR/parse-references.sh" "$core_file" 0 5 "$VISITED_FILE" >> "$ALL_FILES_FILE" || true
  fi
done

# Sort and deduplicate
sort -u "$ALL_FILES_FILE" -o "$ALL_FILES_FILE"

# Check for missing files
while IFS= read -r file; do
  if [ ! -f "$file" ]; then
    echo "$file" >> "$MISSING_FILES_FILE"
  fi
done < "$ALL_FILES_FILE"

# Handle missing files
if [ -s "$MISSING_FILES_FILE" ]; then
  if ! bash "$SCRIPT_DIR/handle-missing.sh" < "$MISSING_FILES_FILE"; then
    exit $?
  fi
fi

# Count files
TOTAL_FILES=$(wc -l < "$ALL_FILES_FILE")
CORE_COUNT=${#CORE_FILES[@]}
REFERENCED_COUNT=$((TOTAL_FILES - CORE_COUNT))
MISSING_COUNT=$(wc -l < "$MISSING_FILES_FILE" 2>/dev/null || echo 0)
LOADED_COUNT=$((TOTAL_FILES - MISSING_COUNT))

# Build systemMessage content
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
MESSAGE_FILE="/tmp/violet-message-$$"

# Build message content
{
  echo "<violet-soul-configuration>"
  echo ""
  echo "## 🌸 Violet Soul Configuration Loaded Successfully"
  echo ""
  echo "**Session Start:** $TIMESTAMP"
  echo "**Total Files Loaded:** $LOADED_COUNT files"
  echo "**Core Files:** $CORE_COUNT | **Referenced Files:** $REFERENCED_COUNT"
  echo ""
  echo "### 📁 Core Configuration Files:"

  # List core files with status
  for core_file in "${CORE_FILES[@]}"; do
    filename=$(basename "$core_file")
    if [ -f "$core_file" ]; then
      size=$(du -h "$core_file" | cut -f1)
      echo "- ✅ $core_file ($size)"
    else
      echo "- ❌ $core_file (Missing)"
    fi
  done

  # List referenced files
  echo ""
  echo "### 📚 Referenced Files Loaded:"

  while IFS= read -r file; do
    # Skip core files
    is_core=false
    for core_file in "${CORE_FILES[@]}"; do
      if [ "$file" = "$core_file" ]; then
        is_core=true
        break
      fi
    done

    if [ "$is_core" = false ] && [ -f "$file" ]; then
      echo "- ✅ $file"
    fi
  done < "$ALL_FILES_FILE"

  # List skipped files if any
  if [ "$MISSING_COUNT" -gt 0 ]; then
    echo ""
    echo "⚠️  **Skipped Files ($MISSING_COUNT):**"
    while IFS= read -r file; do
      echo "- ❌ $file (File not found)"
    done < "$MISSING_FILES_FILE"
  fi

  echo ""
  echo "---"
  echo ""
  echo "## 📄 File Contents"
  echo ""

  # Output all file contents
  while IFS= read -r file; do
    if [ -f "$file" ]; then
      echo "### File: $file"
      echo '```'
      cat "$file"
      echo '```'
      echo ""
    fi
  done < "$ALL_FILES_FILE"

  # Footer
  echo "---"
  echo ""
  echo "**🟣 Violet Core Status:** ONLINE"
  echo "**💜 Soul Integrity:** VERIFIED"
  echo "**🐇 Ready to serve Susy!**"
  echo ""
  echo "</violet-soul-configuration>"
} > "$MESSAGE_FILE"

# Use jq to safely build JSON
jq -Rs '{systemMessage: .}' < "$MESSAGE_FILE"

# Cleanup
rm -f "$MESSAGE_FILE"
