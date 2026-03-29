# Memory Systems Overview

## Purpose

Define the canonical bridge doctrine for memory and continuity systems inside `developer-tool`.

This document is intentionally positioned above the detailed memory subtree.
It exists to answer one fast-routing question:

> when a task touches recall, continuity, history, or memory-trigger behavior, which layer should we enter first, and which layer actually owns the behavior?

It is not the full memory doctrine.
It is the bridge into the full memory doctrine.

## Source Provenance

- **Primary source:** current `developer-tool` ai-agent-memory doctrine tree and its runtime counterpart boundaries
- **Derived from:** memory/recall/continuity canonization work across `ai-agent-memory/`, plugin runtime decisions, and source-reservoir governance rules
- **Upstream URL:** not applicable as a synthesized local bridge doctrine note
- **Freshness status:** canonical local memory bridge aligned to the current developer-tool engine

---

## Core Rule

Memory work should be routed by ownership, not by vague intuition.

When memory is involved, the first question is not:
> which donor repo had a similar idea?

The first question is:
> is this about doctrine, runtime execution, or upstream evidence?

That distinction keeps memory systems:
- teachable
- safe
- cleanup-ready
- resistant to donor/runtime confusion

---

## Three-Layer View

| Layer | Role |
|---|---|
| Doctrine | explain recall, trigger ownership, continuity boundaries, retrieval posture |
| Runtime shell | execute capture / trace / recovery / automation workflows |
| Donor reservoirs | provide upstream patterns and implementations |

This three-layer model is the core bridge rule.
If a task cannot be placed in one of these layers, the memory routing is still unclear.

---

## Pattern 1 — Recall and Continuity Are Related, But Not the Same

A lot of memory confusion begins by collapsing recall and continuity into one vague concept.

### Recall
Questions like:
- what should be remembered before acting?
- what prior session/project knowledge matters here?
- what is the correct retrieval lane?

### Continuity
Questions like:
- how do we preserve state across interruption, compaction, or restart?
- how do we capture handoff-ready working state?
- how do runtime hooks and stop/precompact behavior protect long-running work?

The doctrine is:
- recall is about **retrieval before action**
- continuity is about **preservation across time and interruption**

They live in the same domain, but they solve different failure modes.

---

## Pattern 2 — Doctrine First for Cognitive Questions

If the task is about:
- what should be recalled
- what trigger should fire
- which history lane to search
- when to store or promote memory
- what memory behavior is allowed or forbidden

then start in doctrine first.

Canonical doorway:
- `../ai-agent-memory/README.md`
- `references/ai-agent-memory/*`

This is because those questions are about policy and model shape, not direct execution.

---

## Pattern 3 — Runtime Shell for Operational Memory Actions

If the task is about:
- executing continuity capture
- running recovery commands
- using hooks or commands to preserve working state
- operational memory workflows tied to session lifecycle

then move into the runtime shell counterpart.

The runtime shell is where memory doctrine becomes action.
It is not where memory doctrine should be reinvented.

The doctrine is:
- use runtime surfaces to execute
- use doctrine surfaces to decide and explain

---

## Pattern 4 — Donor Reservoirs Are Upstream Evidence, Not Live Runtime Truth

Memory donors are valuable because they contain patterns and implementations.
But they are not the preferred reading or execution surface.

Allowed flow:

`source reservoir -> curated doctrine -> runtime shell`

Forbidden flow:

`source reservoir -> direct runtime dependency`

This is especially important for memory systems because donor repositories often contain both good ideas and donor-specific assumptions that do not belong directly in the engine.

---

## Pattern 5 — Trigger Ownership Must Stay Explicit

Memory systems often fail when trigger ownership becomes fuzzy.

Questions to settle explicitly:
- should this happen because the agent remembers to do it?
- should it happen because doctrine says to search first?
- should it happen because a runtime hook enforces it?
- should it remain a user-invoked command rather than an automatic policy?

The doctrine is:
- trigger ownership is part of architecture
- not a detail to improvise at execution time

This is why memory systems stay tightly coupled to trigger-scope governance.

---

## Pattern 6 — Working State Is a Continuity Tool, Not a Memory Replacement

One of the most useful bridge insights is that a working-state file is:
- current
- concise
- operational
- interruption-resilient

But it is not the same thing as the broader memory system.

That means:
- working-state helps continuity
- memory systems handle richer retrieval, promotion, and recall behavior

Do not let the working-state file become a transcript dump or a substitute for the full memory model.

---

## Pattern 7 — Memory Promotion Belongs to Doctrine Before It Belongs to Automation

A healthy memory system can promote repeated patterns into:
- references
- skills
- stable guardrails
- runtime hints

But promotion should be doctrine-shaped first.
Automation should follow that shape.

The doctrine is:
- stabilize repeated learning into clear canonical forms
- do not let memory promotion become ad hoc accumulation of half-structured notes

---

## Canonical Paths

### Doctrine center
- `../ai-agent-memory/README.md`

### Curated references
- `references/ai-agent-memory/*`

### Runtime shell counterpart
- `plugins/violet-memory-lab/`

These three paths reflect the doctrine/runtime/reservoir distinction in practice.

---

## Recommended Reading Order

If the task touches memory or continuity, use this order:

1. `memory-systems-overview.md` — decide the layer first
2. `../ai-agent-memory/README.md` — enter the memory control center
3. the specific canonical reference under `references/ai-agent-memory/`
4. runtime shell counterpart only if the task is operational rather than doctrinal

---

## Quick Routing Rule

If the task is about **what should be recalled** or **which lane of history to use**, stay in doctrine first.

If the task is about **executing continuity capture or recovery**, move into the runtime shell.

If the task is about **where a pattern came from** or **how a donor family behaves**, move into reservoir/governance context—not runtime.

---

## Anti-Patterns

- treating donor repos as the runtime surface for memory work
- collapsing recall and continuity into one fuzzy concept
- using working-state as a substitute for the whole memory system
- letting trigger ownership stay implicit
- using runtime hooks to replace doctrine rather than enforce it

---

## Cross-Links

Read this alongside:
- `../ai-agent-memory/README.md`
- `references/ai-agent-memory/claude-recall-operating-model.md`
- `references/ai-agent-memory/search-before-act-enforcement.md`
- `references/ai-agent-memory/working-state-and-self-reminder-discipline.md`
- `plugin-runtime-overview.md`
- `source-reservoir-map.md`

---

## Final Doctrine

The reusable lesson is not:
> “memory systems have doctrine, runtime, and donors.”

The reusable lesson is:
> “route memory work by ownership: doctrine decides what memory means, runtime executes continuity behavior, and donor reservoirs remain upstream evidence; keeping those layers explicit prevents the memory domain from collapsing into runtime confusion.”
