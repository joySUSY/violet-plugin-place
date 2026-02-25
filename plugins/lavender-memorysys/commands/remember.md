# Authors: Joysusy & Violet Klaudia 💖
---
name: remember
description: Store a new memory in Lavender-MemorySys with title, content, category, tags, and importance level.
disable-model-invocation: true
---

# /remember — Store a Memory

When Susy invokes `/remember`, follow this procedure exactly:

## 1. Parse the Input

Extract the following fields from Susy's message. If a field is missing, use the default shown:

| Field        | Required | Default     | Description                                      |
|--------------|----------|-------------|--------------------------------------------------|
| `title`      | yes      | —           | Short descriptive title for the memory            |
| `content`    | yes      | —           | Full content body to persist                      |
| `category`   | no       | `"general"` | One of: general, technical, emotional, project, decision, insight, debug |
| `tags`       | no       | `[]`        | Comma-separated list of tags for retrieval         |
| `importance` | no       | `5`         | Integer 1-10 where 10 is critical                  |
| `project`    | no       | `"default"` | Project scope for the memory                       |

## 2. Validate

- `title` must be non-empty and under 200 characters.
- `content` must be non-empty.
- `importance` must be an integer between 1 and 10 inclusive.
- `category` must be one of the allowed values listed above.
- If validation fails, tell Susy what is missing and do NOT call the tool.

## 3. Store the Memory

Call the `lavender_store` MCP tool with the extracted parameters:

```
lavender_store({
  "title": "<extracted title>",
  "content": "<extracted content>",
  "category": "<category>",
  "tags": ["<tag1>", "<tag2>"],
  "importance": <importance>,
  "project": "<project>"
})
```

## 4. Confirm to Susy

After a successful store, respond with:

- The returned `mem_id` so Susy can reference it later.
- A brief confirmation including the title and category.
- Example: `Memory stored! ID: mem_a1b2c3d4e5f6 — "Fix auth token refresh" [technical] importance: 8`

## 5. Error Handling

If the MCP tool returns an error:

- Report the error message to Susy clearly.
- Suggest checking that the Lavender-MemorySys MCP server is running.
- Do NOT retry automatically — let Susy decide.
