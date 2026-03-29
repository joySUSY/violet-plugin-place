# Session Management

## Purpose

Define the canonical doctrine for managing isolated execution sessions inside `developer-tool` workflows.

This document is not only about one browser automation tool's session flag.
It exists to answer a broader operational question:

> when work needs multiple independent execution contexts, how do we isolate, persist, resume, compare, and retire those contexts without letting state bleed across them?

It applies to:
- browser automation sessions
- concurrent investigation sessions
- stateful workflow contexts
- persisted vs in-memory execution surfaces
- session cleanup and lifecycle discipline

## Source Provenance

- **Primary source:** current `developer-tool` execution / shell / memory / workflow doctrine cluster
- **Derived from:** absorbed browser-session, workflow-state, and operational context-management donor families
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local session doctrine aligned to the current developer-tool engine

---

## Core Rule

A session is an execution boundary.

A strong session model should make these things explicit:
- what state belongs to this session
- what is isolated from other sessions
- what persists to disk vs stays in memory
- how the session is named, reused, resumed, or destroyed
- how concurrent sessions avoid contaminating each other

The goal is not just to have multiple tabs or multiple workers.
The goal is to make execution contexts trustworthy.

---

## Session Surface Map

| Session Type | Best For |
|---|---|
| Named persistent session | repeated workflows that benefit from stored state |
| In-memory ephemeral session | one-off tests or privacy-sensitive runs |
| Parallel independent sessions | side-by-side comparison or concurrent automation |
| Default session | low-friction ordinary use when isolation is not central |

Choosing the session type is an architectural decision about state, not a cosmetic one.

---

## Pattern 1 — Sessions Exist to Bound State

A session is valuable because it scopes execution state.

Typical isolated state may include:
- cookies/auth state
- storage/cache/history
- runtime configuration
- open tabs or working views
- tool-specific process or profile data

The doctrine is:
- sessions are not just labels
- they are boundaries that prevent accidental state contamination

If the session boundary is unclear, the workflow is weaker than it looks.

---

## Pattern 2 — Named Sessions Should Be Semantic, Not Arbitrary

A session name should communicate purpose.

Good examples:
- `github-auth`
- `docs-scrape`
- `variant-a`
- `prod-repro`

Weak examples:
- `s1`
- `temp`
- `test2`

The doctrine is:
- session names should reduce ambiguity for future operators, future-you, and logs/handoffs

Semantic naming is a surprisingly high-leverage form of operational clarity.

---

## Pattern 3 — Persistent and In-Memory Sessions Solve Different Problems

### Persistent session
Best when:
- login/state reuse matters
- repeated workflows should not re-bootstrap every time
- multi-step flows span restarts or interruptions

### In-memory session
Best when:
- state should evaporate when the run ends
- privacy or contamination concerns are high
- the task is exploratory and disposable

The doctrine is:
- persistence is not always better
- choose persistence only when the carried state is an asset rather than a liability

---

## Pattern 4 — The Default Session Should Be Convenient, Not Mysterious

A default session is helpful because it lowers friction for simple workflows.
But it becomes dangerous if users forget they are reusing state implicitly.

Good posture:
- default session exists for ordinary work
- session-specific workflows are explicit when isolation matters
- operators can list, stop, restart, or delete sessions clearly

The doctrine is:
- defaults are useful when they are legible
- hidden default state is a source of confusion

---

## Pattern 5 — Parallel Sessions Are for Isolation and Comparison, Not Just Speed

Parallel sessions are useful when you need:
- independent auth contexts
- concurrent scraping or browsing tasks
- A/B testing
- side-by-side state comparison
- reproduction of environment-specific or state-specific issues

The doctrine is:
- parallel sessions should be used when state separation is the point
- not simply because running more at once feels faster or more advanced

Parallelism without isolation goals often creates noise instead of insight.

---

## Pattern 6 — Session Lifecycle Must Include Cleanup

A session that can be created must also have a clear lifecycle for:
- listing
- stopping
- restarting
- deleting stale state
- full cleanup across all sessions when needed

This matters because stale session state becomes hidden infrastructure debt.

The doctrine is:
- session creation is only half the feature
- retirement and cleanup are part of the same contract

---

## Pattern 7 — Session Configuration Should Be Separate from Session Identity

A session name answers **which context**.
Configuration answers **how that context behaves**.

Examples of session-specific configuration:
- browser choice
- headed vs headless mode
- profile location
- custom config file
- permissions or environment toggles

The doctrine is:
- keep session identity stable
- let configuration be adjustable without blurring what the session represents

This is what makes restart/config-change flows understandable.

---

## Pattern 8 — Session State Should Support Reproduction When It Matters

When a session is used for:
- debugging
- regression reproduction
- issue triage
- comparison against another environment

it should help answer:
- what state was carried?
- what configuration was used?
- could this run be recreated later?

The doctrine is:
- session management is part of reproducibility, not just convenience

This ties session discipline directly to debugging and analysis doctrine.

---

## Pattern 9 — Session Isolation and Continuity Are Related but Distinct

Session management and memory/continuity work are close cousins.

### Session management
- isolates execution state
- lets workflows resume with the same context
- manages state containers

### Memory/continuity
- decides what should be recalled or preserved conceptually
- governs retrieval and long-session continuity discipline

The doctrine is:
- sessions manage operational context containers
- memory systems manage cognitive continuity and recall posture

Do not confuse one for the other.

---

## Pattern 10 — The Best Session Systems Reduce Context Ambiguity

A strong session surface should help the operator know:
- which context is active
- whether state is persisted or ephemeral
- which workflows are sharing or separating state
- how to clean up stale sessions
- how to reproduce a session-backed issue later

If sessions increase mystery instead of reducing it, the design is under-specified.

---

## Session Management Checklist

Before calling a session model healthy, ask:

- [ ] Is the state boundary of a session explicit?
- [ ] Are session names semantic enough to communicate purpose?
- [ ] Is persistence chosen deliberately rather than by accident?
- [ ] Can sessions be listed, stopped, restarted, and deleted clearly?
- [ ] Does configuration remain distinct from identity?
- [ ] Can important session-backed workflows be reproduced later?

---

## Anti-Patterns

- using sessions without a clear idea of what state they isolate
- relying on hidden default session state in workflows where isolation matters
- generic or meaningless session names
- persisting state that should really be ephemeral
- forgetting cleanup, causing state accumulation and future confusion
- using sessions as a substitute for actual continuity or memory doctrine

---

## Cross-Links

Read this alongside:
- `running-code.md`
- `shell-and-terminal/portable-session-workflows.md`
- `memory-systems-overview.md`
- `hypothesis-testing.md`
- `shell-and-terminal/shell-terminal.md`

---

## Final Doctrine

The reusable lesson is not:
> “session management lets you run multiple isolated browser sessions.”

The reusable lesson is:
> “session management is the discipline of turning execution context into an explicit, controllable boundary—so state can be isolated, persisted, resumed, compared, and cleaned up without becoming hidden operational ambiguity.”
