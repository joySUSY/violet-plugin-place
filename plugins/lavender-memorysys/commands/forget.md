# Authors: Joysusy & Violet Klaudia 💖
---
name: forget
description: Soft-delete a memory from Lavender-MemorySys by ID, with explicit confirmation before deletion.
disable-model-invocation: true
---

# /forget — Soft-Delete a Memory

When Susy invokes `/forget`, follow this procedure exactly:

## 1. Parse the Input

Extract the memory identifier from Susy's message:

| Field    | Required | Description                                         |
|----------|----------|-----------------------------------------------------|
| `memory_id` | yes      | The memory ID to forget (e.g., `a1b2c3d4e5f6`)  |

If Susy provides a search query instead of an ID, first run a `/recall` search to help them identify the correct memory, then return here once they have the ID.

## 2. Preview the Memory

Before deleting, call `lavender_recall` to fetch and display the memory:

```
lavender_recall({
  "memory_id": "<memory_id>"
})
```

Show Susy the memory details:

- **ID**: `<memory_id>`
- **Title**: `<title>`
- **Category**: `<category>` | **Importance**: `<importance>`
- **Content preview**: first 150 characters of the content body

If the memory is not found, inform Susy that the ID is invalid or already deleted, and stop.

## 3. Request Confirmation

Ask Susy for explicit confirmation before proceeding:

```
Are you sure you want to forget this memory?
  "<title>" (ID: <memory_id>)
Reply with "yes" or the confirmation token CONFIRM_DELETION_<memory_id> to proceed.
```

Do NOT proceed without Susy's explicit "yes", "confirm", or the `CONFIRM_DELETION_` token.

## 4. Execute Soft-Delete

Once confirmed, call the `lavender_forget` MCP tool:

```
lavender_forget({
  "memory_id": "<memory_id>"
})
```

## 5. Confirm Deletion

After successful deletion, respond with:

- Confirmation that the memory has been soft-deleted.
- The memory title and ID for reference.
- A note that soft-deleted memories are not permanently destroyed and may be recoverable by an admin.
- Example: `Memory forgotten: "Fix auth refresh" (mem_abc123). This is a soft-delete — the record is hidden but not permanently erased.`

## 6. Error Handling

- If `lavender_forget` returns `false`, the memory was not found or already deleted. Inform Susy.
- If the MCP server is unreachable, report the error and suggest checking the server status.
- Never auto-retry deletion operations.
