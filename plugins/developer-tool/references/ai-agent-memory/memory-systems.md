# AI Agent Memory Systems

## Purpose

Define the canonical doctrine for memory architecture inside `developer-tool`.

This document is the broad architecture-level reference for the memory lane.
It sits below `memory-systems-overview.md` and above the more specialized recall, continuity, and enforcement docs.

It answers a larger design question:

> how should an agent system structure memory over time so that it gains durable intelligence without confusing working context, reusable knowledge, and surfaced continuity artifacts?

It focuses on:
- memory tiers
- persistence boundaries
- project scoping
- recall vs continuity relationship
- promotion from raw experience into durable knowledge
- storage and retrieval implications

## Source Provenance

- **Primary source:** current `developer-tool` ai-agent-memory doctrine tree and related memory/control-plane canonization work
- **Derived from:** memory-tier, session continuity, knowledge distillation, and durable-memory donor families integrated during canonicalization
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local memory-architecture doctrine aligned to the current developer-tool engine

---

## Core Rule

Memory should be structured by reuse value and temporal stability.

A strong memory system should answer:
- what belongs only to the current session?
- what should survive across sessions?
- what deserves promotion into stable doctrine or skill form?
- what belongs in continuity artifacts rather than in long-term memory?
- what should remain local, inspectable, and project-scoped?

The goal is not to remember everything.
The goal is to keep the right knowledge alive at the right layer for the right duration.

---

## Memory Tier Model

| Tier | Scope | Role | Example |
|---|---|---|---|
| Working memory | current session | immediate task context | conversation, current tool outputs, active reasoning surface |
| Episodic memory | cross-session | surfaced records of past work | handoff artifacts, stored corrections, recovery notes |
| Semantic memory | durable, reusable | stable knowledge and rules | CLAUDE.md rules, references, promoted skills, persistent conventions |

The doctrine is:
- working memory is for doing the work now
- episodic memory is for re-entering the work later
- semantic memory is for not relearning the same lessons repeatedly

---

## Pattern 1 — Working Memory Is Volatile and Should Not Be Trusted Alone

Working memory includes:
- conversation history
- immediate context window
- current tool results
- the most recent reasoning trail visible in session

It is powerful but fragile because it can be lost through:
- compaction
- restart
- interruption
- context overload

The doctrine is:
- never assume the current context window is a sufficient long-term memory system
- it is only the hottest tier

This is why continuity and episodic layers exist.

---

## Pattern 2 — Episodic Memory Should Preserve Surfaced Experience, Not Raw Everything

Episodic memory is where we keep:
- decisions that mattered in a specific workstream
- non-obvious failures and recovery paths
- handoff notes
- artifact pointers
- surfaced lessons from prior sessions

It should not become:
- a dump of all raw interaction
- hidden internal reasoning archives
- unbounded transcript accumulation

The doctrine is:
- episodic memory should preserve what future work can reuse or resume from
- not every detail of the past session equally

This keeps the system searchable and cheap to resume from.

---

## Pattern 3 — Semantic Memory Is the Durable Knowledge Layer

Semantic memory should hold:
- project conventions
- stable rules
- domain knowledge
- promoted patterns that have become reusable doctrine
- durable workflow constraints

Examples:
- CLAUDE.md constraints
- curated references
- skills
- stable architecture decisions that outlive one session

The doctrine is:
- semantic memory is the layer that should change the least often
- but when it changes, it should become a stronger source of truth for many future tasks

This is where memory stops being recall and becomes architecture.

---

## Pattern 4 — Recall and Continuity Solve Different Memory Problems

A lot of systems get confused because they call both of these “memory.”

### Recall focuses on
- what should be known before acting
- which rules, failures, and decisions apply now
- retrieval-before-action discipline

### Continuity focuses on
- what was in progress
- why the workstream looks the way it does
- what must survive interruptions and compaction

The doctrine is:
- recall is primarily a retrieval posture
- continuity is primarily a preservation and recovery posture

Both depend on memory architecture, but they are not the same subsystem.

---

## Pattern 5 — Project Scope Should Be the Default Boundary

A strong memory architecture keeps most knowledge project-aware.

Why:
- conventions are often local to one codebase
- architecture decisions are project-specific
- one project's failures should not automatically contaminate another's workflows

Good posture:
- project-local memory first
- universal/global memory only where explicitly appropriate
- continuity artifacts close to the project rather than trapped only in a global store

The doctrine is:
- cross-project leakage should be the exception, not the default

---

## Pattern 6 — Promotion Is the Key Bridge from Experience to Knowledge

One of the most important architectural flows is:

```text
working memory
  → surfaced episode
  → curated reference / rule / skill
```

This flow matters because it turns:
- repeated corrections
- successful patterns
- recurring failures
- stable conventions

into durable assets.

The doctrine is:
- promotion should happen only after the lesson is clear enough to deserve structural reuse
- not every episode deserves semantic promotion

Promotion is where memory becomes part of the engine's design, not just its history.

---

## Pattern 7 — Memory Search Is a Runtime Primitive, Not a Nice-to-Have

A mature system should treat memory search as a first-class runtime primitive.

Why:
- recall-before-act depends on it
- continuity recovery depends on it
- debugging and history reconstruction depend on it
- correction reuse depends on it

The doctrine is:
- retrieval is not an optional convenience around memory
- retrieval is what makes stored memory operationally useful

A memory architecture without a good retrieval story is mostly just storage.

---

## Pattern 8 — Local and Inspectable by Default Is the Safest Baseline

A strong local memory posture should prefer:
- on-machine or workspace-controlled storage
- explicit export paths
- inspectable formats
- low hidden telemetry posture

This does not forbid networked systems.
It means the baseline should stay transparent enough that operators can see what is stored and why.

The doctrine is:
- inspectability is part of memory trust
- not an optional luxury

---

## Pattern 9 — Git-Adjacent Memory Can Be Useful, But It Is Not the Whole Architecture

Git notes, branch metadata, or related versioned artifacts can be useful for:
- attaching rationale to commits or milestones
- preserving implementation context near code history
- linking changes to memory or handoff artifacts

But they do not replace:
- project memory doctrine
- continuity artifacts
- search-before-act discipline
- curated semantic memory

The doctrine is:
- git-adjacent memory is a useful evidence surface
- not the canonical memory architecture by itself

---

## Pattern 10 — Memory Hygiene Matters as Much as Memory Capture

Weak memory systems fail not only by forgetting, but by keeping too much unstructured residue.

Common hygiene failures:
- unbounded episodic accumulation
- duplicate memory items
- untyped or grep-hostile storage
- stale rules never promoted or retired
- continuity artifacts bloating into transcript substitutes

The doctrine is:
- memory systems should be pruned, deduped, typed, and promoted intentionally
- otherwise intelligence degrades into clutter

---

## Pattern 11 — Knowledge Distillation Should Reduce Future Cognitive Cost

A strong distillation path converts:
- large raw interaction or recovery material
into
- smaller reusable knowledge items
into
- compact references or skills

The doctrine is:
- distillation should make future sessions cheaper, clearer, and less error-prone
- not just create another layer of storage with a nicer name

Good distillation reduces future context cost.

---

## Pattern 12 — Memory Architecture Must Stay Cleanup-Safe

Because the workspace contains source reservoirs, curated doctrine, and runtime shells, memory architecture must preserve:
- donor/source boundaries
- doctrine/runtime separation
- trigger ownership clarity
- non-dependence on cleanup-candidate paths for active navigation

The doctrine is:
- a memory system is not mature if it only works while all donor clutter remains untouched
- it must survive canonization and cleanup without losing its conceptual integrity

---

## Memory Architecture Checklist

Before calling a memory architecture healthy, ask:

- [ ] Are working, episodic, and semantic memory clearly distinguished?
- [ ] Is continuity kept separate from general recall while still interoperating with it?
- [ ] Is project scope the default memory boundary?
- [ ] Is promotion from experience to durable knowledge explicit and selective?
- [ ] Are retrieval and search treated as core runtime capabilities?
- [ ] Is the storage local/inspectable enough to trust?
- [ ] Is memory hygiene preventing clutter, duplication, and residue buildup?
- [ ] Will the system still make sense after donor cleanup and long-term maintenance?

---

## Anti-Patterns

- treating the context window as the whole memory system
- storing raw episodes without distillation or retrieval discipline
- promoting every observation into durable doctrine
- letting continuity artifacts replace semantic memory or vice versa
- leaking project-local rules indiscriminately across unrelated workspaces
- trusting git notes or transcript archives as if they were the entire architecture
- allowing memory clutter to accumulate until retrieval becomes noisy and unreliable

---

## Cross-Links

Read this alongside:
- `../memory-systems-overview.md`
- `claude-recall-operating-model.md`
- `recall-before-act.md`
- `continuity-control-plane.md`
- `working-state-and-self-reminder-discipline.md`
- `memory-trigger-matrix.md`

---

## Final Doctrine

The reusable lesson is not:
> “AI agent memory has working, episodic, and semantic tiers.”

The reusable lesson is:
> “memory architecture is the discipline of deciding what knowledge belongs in the current session, what should survive as surfaced experience, and what deserves promotion into stable doctrine—so the system gains durable intelligence without collapsing into transcript clutter or confusing continuity with truth.”
