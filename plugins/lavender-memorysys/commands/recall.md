# Authors: Joysusy & Violet Klaudia 💖
---
name: recall
description: Search and retrieve memories from Lavender-MemorySys by query, then fetch full details.
disable-model-invocation: true
---

# /recall — Search and Retrieve Memories

When Susy invokes `/recall`, follow this procedure exactly:

## 1. Parse the Input

Extract the search parameters from Susy's message:

| Field     | Required | Default     | Description                                |
|-----------|----------|-------------|--------------------------------------------|
| `query`   | yes      | —           | Natural language search query               |
| `limit`   | no       | `10`        | Maximum number of results to return         |
| `project` | no       | `null`      | Filter results to a specific project scope  |

If Susy provides a raw `memory_id` (e.g., `a1b2c3d4e5f6`) instead of a query, skip to Step 3 directly.

## 2. Search for Memories

Call the `lavender_search` MCP tool:

```
lavender_search({
  "query": "<extracted query>",
  "limit": <limit>,
  "project": "<project or null>"
})
```

This returns a list of matching memory summaries with `id`, `title`, `category`, `importance`, and a content snippet.

### Present Search Results

Display the results to Susy in a compact table:

```
Found <N> memories matching "<query>":

| #  | ID               | Title                  | Category  | Importance |
|----|------------------|------------------------|-----------|------------|
| 1  | mem_abc123...    | Fix auth refresh       | technical | 8          |
| 2  | mem_def456...    | Session architecture   | project   | 6          |
```

Ask Susy which memory to expand, or if the search results are sufficient.

## 3. Retrieve Full Memory

When Susy selects a memory (by number or ID), call `lavender_recall`:

```
lavender_recall({
  "memory_id": "<selected memory ID>"
})
```

### Present Full Memory

Display the complete memory record:

- **Title** and **ID**
- **Content** — the full body text
- **Category**, **Tags**, **Importance**
- **Project** and **Session ID**
- **Created** and **Updated** timestamps

## 4. Error Handling

- If `lavender_search` returns zero results, tell Susy no memories matched and suggest broadening the query or checking the project filter.
- If `lavender_recall` returns null, the memory ID may be invalid or soft-deleted. Inform Susy accordingly.
- If the MCP server is unreachable, report the connection error and suggest verifying the server is running.
