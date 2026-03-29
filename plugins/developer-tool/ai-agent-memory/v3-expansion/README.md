# AI Agent Memory v3-Expansion Staging Governance

# Authors: Joysusy & Violet Klaudia 💖

## Purpose

Define the role of `developer-tool/ai-agent-memory/v3-expansion/`.

This directory is not the canonical doctrine center of the memory lane.
It is a **runtime-aligned module pool and staging layer** containing adapted skill packs, preserved retrieval tooling, and workspace-local memory/history assets that have not yet been fully flattened into the canonical `references/ai-agent-memory/` tree.

This document exists to stop an ambiguous state where many separate memory skills sit side by side without a clear status.

---

## Core Rule

`v3-expansion/` is a staging and runtime-aligned layer.
It is not the first reading path for ordinary memory questions.

The allowed flow is:

`source reservoir -> canonical ai-agent-memory references -> v3-expansion module pool (if needed) -> plugin runtime shell`

The forbidden flow is:

`v3-expansion module pool -> default source of truth`

If the canonical references tree can already answer the question, readers and future agents should stay there.

---

## What This Layer Is

`v3-expansion/` currently acts as a holding and integration zone for:

- already-adapted memory and history skills
- retrieval utilities that still carry their own internal structure
- continuity and hygiene helpers
- heavy search substrates that are too large or tool-centric to flatten immediately

It is valuable, but it is **not yet uniformly canonized**.

---

## Current Cluster Map

A deeper staged reading path now exists:

- `INDEX.md` for cluster navigation
- `MODULE_STATUS_MATRIX.md` for per-module status
- `MEMORY_CREATION_SHAPING_CLUSTER.md`
- `SESSION_HISTORY_RETRIEVAL_CLUSTER.md`
- `CONTINUITY_HYGIENE_CLUSTER.md`
- `SEARCH_SUBSTRATE_CLUSTER.md`

| Cluster                     | Modules                                                                                                                                         | Current Role                                                              |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Memory creation / shaping   | `advanced-memory-skill-creator`, `agent-memory-skills`, `memory-systems`, `memory-retrieval-learning`                                           | staging pool for creation, shaping, and meta-memory techniques            |
| Session / history retrieval | `cc-history`, `chat-history`, `claude-code-history-files-finder`, `code-history`, `history-insight`, `remembering-conversations`, `cass-memory` | operational retrieval module pool behind the canonical retrieval doctrine |
| Continuity / hygiene        | `goodvibes-memory`, `memory-hygiene`, `memory-model`, `meta-cognition-parallel`                                                                 | continuity-adjacent and hygiene-adjacent support modules                  |
| Search substrate            | `coding_agent_session_search-main`                                                                                                              | heavy indexed retrieval substrate; not a first-line doctrine surface      |

This map is descriptive, not a permanent final taxonomy.

---

## Status Model

Within the memory lane, components can now be understood as:

| Status                | Meaning                                                             |
| --------------------- | ------------------------------------------------------------------- |
| Canonical doctrine    | stable reading path under `references/ai-agent-memory/`             |
| Runtime shell         | push-based continuity automation under `plugins/violet-memory-lab/` |
| Staging / module pool | `v3-expansion/` adapted modules not yet flattened into doctrine     |
| Source reservoir      | preserved donor families outside the canonical reading path         |

The doctrine is:

- `v3-expansion/` is above raw donor status
- but below canonical doctrine status

That is the exact nuance this layer needed.

---

## What v3-Expansion Must NOT Become

It must not become:

- a second knowledge center parallel to `references/ai-agent-memory/`
- the default first reading path for memory questions
- a dumping ground where preserved skill packs stay forever without promotion or categorization
- a runtime mirror of donor or third-party directory layouts

If any of those begin happening, the memory lane loses its control plane clarity.

---

## Promotion Criteria

A `v3-expansion/` module or cluster may be promoted upward only when:

1. its doctrinal role is clear
2. it can be explained in a smaller, cleaner canonical document
3. its boundary with runtime automation is explicit
4. its value survives donor cleanup and path changes
5. it no longer needs to remain as a large preserved bundle for operational or forensic reasons

When these are true, the right destination is usually one of:

- `references/ai-agent-memory/*.md`
- `plugins/violet-memory-lab/*`
- a narrower future module/index inside `developer-tool` if justified

---

## Reading Rule

For ordinary memory work, use this order:

1. `developer-tool/ai-agent-memory/README.md`
2. `developer-tool/ai-agent-memory/INVENTORY.md`
3. `developer-tool/references/ai-agent-memory/INDEX.md`
4. canonical memory references
5. `v3-expansion/` only if the canonical references explicitly cannot answer the question yet

This keeps staging subordinate to doctrine.

---

## Why This Layer Still Matters

We keep this layer because some materials here are:

- already adapted to the workspace
- too large or tool-centric to flatten immediately
- operationally useful even before full canonization
- worth preserving as intermediate assets while doctrine evolves

So the correct move is not deletion.
The correct move is governed staging.

---

## Future Convergence Directions

The likely future paths are:

- convert some clusters into smaller lane-specific canonical refs
- add cluster-level staging indexes where needed
- move execution-centric pieces toward `plugins/violet-memory-lab/`
- keep genuinely heavy search substrates as module/runtime assets instead of forcing premature flattening

This means `v3-expansion/` should gradually become more legible, even if it does not disappear entirely.

---
## Cross-Links

Read this alongside:
- `../README.md`
- `../INVENTORY.md`
- `../ABSORPTION_MATRIX.md`
- `../TRIGGER_SCOPE.md`
- `INDEX.md`
- `MODULE_STATUS_MATRIX.md`
- `MEMORY_CREATION_SHAPING_CLUSTER.md`
- `SESSION_HISTORY_RETRIEVAL_CLUSTER.md`
- `CONTINUITY_HYGIENE_CLUSTER.md`
- `SEARCH_SUBSTRATE_CLUSTER.md`
- `../../references/ai-agent-memory/INDEX.md`
- `../../references/ai-agent-memory/history-retrieval-patterns.md`
- `../../references/ai-agent-memory/source-reservoir-map.md`

---



## Cross-Links

Read this alongside:

- `../README.md`
- `../INVENTORY.md`
- `../ABSORPTION_MATRIX.md`
- `../TRIGGER_SCOPE.md`
- `MODULE_STATUS_MATRIX.md`
- `MODULE_STATUS_MATRIX.zh-CN.md`
- `../../references/ai-agent-memory/INDEX.md`
- `../../references/ai-agent-memory/history-retrieval-patterns.md`
- `../../references/ai-agent-memory/source-reservoir-map.md`

---

## Final Doctrine

The reusable lesson is not:

> “v3-expansion is where many separate memory skills are currently sitting.”

The reusable lesson is:

> “`v3-expansion/` is a governed staging and runtime-aligned module pool: more integrated than raw donor material, but not yet the canonical doctrine tree; its job is to hold unresolved complexity without competing with the references lane until each cluster is either flattened, promoted, or explicitly retained for operational reasons.”
