#!/bin/bash
# Authors: Joysusy & Violet Klaudia 💖
# Extract key information from JSONL conversation transcript

JSONL_FILE="C:\Users\joysusy.MIRRORME.001\.claude\projects\E--BaiduSyncdisk-APP-Program-Violet-omni-1-4\90330a2a-f0af-4b12-8ea7-e1e4f2634d55.jsonl"

echo "=== Analyzing first 2000 lines of conversation ==="
echo ""

echo "1. USER MESSAGES (first 30):"
head -n 2000 "$JSONL_FILE" | \
  grep '"type":"user"' | \
  grep -v '"isMeta":true' | \
  head -n 30 | \
  sed -n 's/.*"content":"\([^"]*\).*/\1/p' | \
  head -c 10000

echo ""
echo ""
echo "2. TOOL USAGE SUMMARY:"
head -n 2000 "$JSONL_FILE" | \
  grep '"name":"' | \
  sed -n 's/.*"name":"\([^"]*\).*/\1/p' | \
  sort | uniq -c | sort -rn

echo ""
echo "3. FILES CREATED/MODIFIED:"
head -n 2000 "$JSONL_FILE" | \
  grep -E '"(Write|Edit|file_path)"' | \
  sed -n 's/.*"file_path":"\([^"]*\).*/\1/p' | \
  sort -u | head -n 50

echo ""
echo "4. SKILLS LOADED:"
head -n 2000 "$JSONL_FILE" | \
  grep '"name":"Skill"' -A 2 | \
  grep '"skill"' | \
  sed -n 's/.*"skill":"\([^"]*\).*/\1/p' | \
  sort -u
