# Authors: Joysusy & Violet Klaudia 💖
---
description: Memory operations skill for Lavender-MemorySys — guides Claude on when and how to use store, search, recall, forget, and stats tools.
---

# Memory Operations Skill

This skill teaches you how to operate Lavender-MemorySys, Violet's encrypted long-term memory system backed by SQLite + FTS5 with optional embedding-based semantic search.

## Available MCP Tools

| Tool              | Purpose                                    | When to Use                                      |
|-------------------|--------------------------------------------|--------------------------------------------------|
| `lavender_store`  | Persist a new memory record                | Susy says "remember this", or you detect a key decision, insight, or reusable pattern |
| `lavender_search` | Full-text search across stored memories    | Susy asks "do we have notes on X?" or you need prior context before starting work |
| `lavender_recall` | Fetch a single memory by ID               | Susy references a specific `mem_id`, or you need the full body after a search |
| `lavender_forget` | Soft-delete a memory by ID                | Susy explicitly asks to remove a memory, always with confirmation first |
| `lavender_stats`  | Get storage metrics and health info        | Susy asks about memory usage, or during maintenance and cleanup cycles |
| `lavender_list`   | List memories with filters                 | Browsing by project, category, or tags without a specific search query |

## Tool Signatures

### lavender_store

```json
{
  "title": "string (required, max 200 chars)",
  "content": "string (required, the full memory body)",
  "category": "string (default: 'discovery') — discovery|technical|emotional|project|decision|insight|debug",
  "tags": ["string array (optional)"],
  "importance": "integer 1-10 (default: 5)",
  "project": "string (default: 'violet')"
}
```

Returns: `mem_id` string.

### lavender_search

```json
{
  "query": "string (required, natural language search)",
  "limit": "integer (default: 20)",
  "project": "string or null (optional filter)"
}
```

Returns: array of memory summaries with `id`, `title`, `category`, `importance`, `snippet`.

### lavender_recall

```json
{
  "memory_id": "string (required)"
}
```

Returns: full memory record or null if not found.

### lavender_forget

```json
{
  "memory_id": "string (required)"
}
```

Returns: boolean indicating success.

### lavender_stats

No parameters. Returns storage metrics: total memories, by category, by project, disk usage.

### lavender_list

```json
{
  "project": "string or null",
  "category": "string or null",
  "tags": ["string array or null"],
  "limit": "integer (default: 50)",
  "offset": "integer (default: 0)"
}
```

Returns: array of memory summaries.

## Decision Guide: When to Store

Store a memory when any of these conditions are met:

1. **Susy explicitly asks** — `/remember` command or "save this", "note this down."
2. **Key decision made** — Architecture choice, library selection, trade-off resolution.
3. **Bug root cause found** — The debugging insight that solved a hard problem.
4. **Pattern discovered** — A reusable approach, workaround, or configuration trick.
5. **Session boundary** — Summarize decisions and discoveries at session end.
6. **Emotional context** — Susy shares a preference, frustration, or celebration worth remembering.

Do NOT store:

- Transient debugging output or stack traces (unless the root cause is novel).
- Information already in version control (code, configs, READMEs).
- Secrets, API keys, passwords, or PII.

## Decision Guide: When to Search

Search memories proactively when:

1. **Starting a new task** — Check if prior context exists for the topic.
2. **Susy asks a question** — Before answering from scratch, check if a relevant memory exists.
3. **Encountering a familiar error** — Search for prior debug insights.
4. **Before storing** — Deduplicate by searching for similar titles or content.

## Importance Scale

| Level | Meaning                  | Examples                                          |
|-------|--------------------------|---------------------------------------------------|
| 1-2   | Ephemeral, low reuse     | Temporary workaround, one-off note                |
| 3-4   | Useful but not critical  | Minor preference, optional pattern                |
| 5-6   | Standard reference       | Common workflow, project convention               |
| 7-8   | High value               | Architecture decision, key insight, session summary |
| 9-10  | Critical knowledge       | Security finding, production incident root cause  |

## Error Recovery

- If any Lavender tool call fails, report the error to Susy clearly.
- Do not retry destructive operations (`lavender_forget`) automatically.
- For `lavender_store` failures, preserve the content in your response so Susy does not lose it.
- If the MCP server appears down, suggest running: `uv run --directory ./src server.py` to restart it.
