# Claude Recall Patterns

## Purpose

Define the canonical doctrine for high-value runtime patterns derived from Claude Recall–style memory systems inside `developer-tool`.

This document does not copy a product implementation.
It extracts the reusable operational patterns that matter for our memory/control-plane architecture.

It answers a focused question:

> once recall is accepted as necessary, what runtime patterns make recall systems actually reliable in practice without letting them become noisy, invasive, or product-specific clones?

It focuses on:
- rule loading
- recall freshness
- project-scoped retrieval
- typed memory classes
- lifecycle capture windows
- conservative auto-capture
- doctrine vs hook enforcement boundaries

## Source Provenance

- **Primary source:** Claude Recall–style donor patterns preserved through the `developer-tool` memory canonization passes
- **Derived from:** recalled-rule loading, search-before-mutate enforcement, lifecycle capture, and typed memory classification ideas distilled from upstream recall systems
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local recall-pattern doctrine aligned to the current developer-tool engine

---

## Core Rule

The value of a recall system comes from runtime discipline, not just from storing memories.

A strong recall runtime should answer:
- when should memory load?
- what kind of memory should take priority?
- how fresh must recall be before mutation?
- which lifecycle moments deserve capture?
- how much should be auto-captured, and what must never be captured?

The goal is not to build a memory product clone.
The goal is to preserve the operational patterns that make recall reliable and cleanup-safe.

---

## Pattern 1 — Load Rules First

High-value idea:
- rules must inform exploration, not only mutation
- the first meaningful action of a task should be rule loading or memory recall

Why it matters:
- without this, the agent explores blindly, forms an opinion, and only later discovers existing preferences or corrections

Canonical form:
- the **knowledge layer** defines recall-before-act as doctrine
- the **runtime layer** may later enforce freshness at operational boundaries

The doctrine is:
- rule loading belongs at the front of the task, not as cleanup after the task is already mentally shaped

---

## Pattern 2 — Skill Teaches, Hook Enforces

High-value idea:
- doctrine/skills explain *what should happen*
- hooks make sure the runtime does not quietly skip it when the lifecycle makes enforcement valuable

Keep this split:
- long-form rationale belongs in docs/skills/references
- lifecycle enforcement belongs in hooks or bounded runtime surfaces

Do not collapse them into one component.

The doctrine is:
- explanation and enforcement are partners, not substitutes

---

## Pattern 3 — Search Before Mutate

One of the strongest runtime patterns is simple:
- mutation surfaces should not run with completely stale or absent recall

Useful operational ideas preserved here:
- recall freshness may use a TTL / task-window idea
- stale recall may degrade from **block → warn** depending on runtime safety policy
- different mutation classes may deserve different strictness

The doctrine is:
- the stronger the mutation surface, the stronger the burden on fresh recall

Batch 1 keeps the **pattern**, not the exact product-specific tool names.

---

## Pattern 4 — Project-Scoped Namespace

High-value idea:
- one shared store may exist physically
- but runtime retrieval must stay project-aware

This means:
- decisions and conventions are filtered through current project scope
- universal rules may remain available globally
- project-local continuity artifacts should remain near the project, not only in a global store

The doctrine is:
- shared storage does not justify shared semantics across unrelated projects

Project scoping is one of the main protections against memory contamination.

---

## Pattern 5 — Typed Memory Classes

Useful classification preserved from recall-system donors:

| Class | Runtime value |
|---|---|
| `correction` | highest-signal guardrail against repeating mistakes |
| `devops` | workflow / deploy / CI rules |
| `preference` | user or project conventions |
| `failure` | learned pitfalls and recovery paths |

Recommended priority:

```text
correction > devops > preference > failure
```

The doctrine is:
- memory retrieval should not behave as if all memories are equally important
- type and priority help the system choose what matters first

---

## Pattern 6 — Lifecycle Capture Windows

High-value windows to preserve:
- user prompt submission
- stop of main session
- stop of subagent
- pre-compact preservation

Important nuance:
- these windows are good for **surfaced continuity capture**
- they are not permission to dump hidden internal reasoning

The doctrine is:
- capture at lifecycle boundaries where loss is likely
- not continuously and indiscriminately

This keeps continuity strong without turning the system into transcript sludge.

---

## Pattern 7 — Auto-Capture Must Stay Conservative

What to keep:
- auto-capture should favor concise, actionable, searchable records
- duplicate suppression matters
- per-event limits matter
- hooks must not become noisy or block work unnecessarily without strong reason

What to reject:
- opaque capture of large transcript slabs
- hidden-reasoning persistence
- treating every line as worthy of permanent memory

The doctrine is:
- auto-capture should create signal, not sediment

A memory system that records everything equally has already stopped curating.

---

## Pattern 8 — Crystallization Is Optional, Not Foundational

Some recall systems can turn repeated memories into skills or more structured doctrine.

Our interpretation:
- this is a valuable advanced pattern
- but it is **not** the base architecture for the canonical domain
- first establish retrieval doctrine + continuity boundaries
- crystallization can come later once the underlying retrieval model is stable

The doctrine is:
- promotion is valuable only after the memory substrate is disciplined enough to justify it

---

## Pattern 9 — Runtime Enforcement Should Scale with Risk

Not every task needs the same recall strictness.

Useful distinctions:
- low-risk exploration -> reminder or soft warning may be enough
- medium-risk planning -> explicit recall note expected
- high-risk mutation/deletion/deployment -> stronger freshness expectations or explicit route-first behavior

The doctrine is:
- runtime enforcement should scale with risk and blast radius
- not be one rigid posture for all tasks

This makes recall systems usable instead of oppressive.

---

## Pattern 10 — Product-Specific Names Should Be Demoted, Patterns Preserved

One of the main canonization moves is:
- preserve the pattern
- drop or demote product-specific names, commands, and package layouts as canonical truth

That means:
- command names from one donor product are not themselves doctrine
- product folder structure is not itself doctrine
- what matters is the operational lesson underneath

The doctrine is:
- pattern permanence matters more than product vocabulary permanence

---

## Keep / Drop Summary

### Keep
- load-rules-first
- skill teaches, hook enforces
- search-before-mutate freshness posture
- project-scoped retrieval
- typed memory classes
- lifecycle capture windows
- conservative dedupe / per-event limits
- optional later crystallization

### Drop or demote
- product-specific command names as canonical doctrine
- direct dependency on the original recall package layout
- any implication that one memory product becomes the workspace-wide authority
- uncontrolled auto-capture behavior

---

## Runtime Pattern Checklist

Before calling a recall-runtime design healthy, ask:

- [ ] Does rule loading happen early enough to shape the task?
- [ ] Are doctrine and hook enforcement still kept distinct?
- [ ] Is recall freshness proportionate to mutation risk?
- [ ] Is retrieval scoped by project/context appropriately?
- [ ] Are memory classes prioritized meaningfully?
- [ ] Are lifecycle capture windows deliberate rather than indiscriminate?
- [ ] Is auto-capture concise, deduped, and surfaced-only?
- [ ] Are product-specific names demoted beneath the preserved pattern?

---

## Anti-Patterns

- exploring first and only loading rules after an opinion has already formed
- encoding long-form rationale directly into hooks
- treating stale recall as good enough for high-risk mutation
- using a shared store without project-aware retrieval boundaries
- auto-capturing large transcript slabs by default
- treating advanced crystallization as the foundational architecture too early
- allowing one donor product to define the workspace-wide runtime truth

---

## Cross-Links

Read this alongside:
- `claude-recall-operating-model.md`
- `recall-before-act.md`
- `working-state-and-self-reminder-discipline.md`
- `search-before-act-enforcement.md`
- `../memory-systems-overview.md`

---

## Final Doctrine

The reusable lesson is not:
> “Claude Recall had some useful patterns like loading rules first and capturing memory on stop.”

The reusable lesson is:
> “a healthy recall runtime loads rules before exploration hardens into action, scopes retrieval by project, prioritizes memory types explicitly, captures continuity only at high-value lifecycle windows, and keeps auto-capture conservative enough that memory remains signal instead of becoming sediment.”
