# Continuity Control Plane

## Purpose

Define the canonical doctrine for surfaced task continuity inside `developer-tool`.

This document is not a second general-purpose memory system.
It exists to answer a narrower but critical question:

> when a session is interrupted, compacted, restarted, or handed off, what operational artifacts and control surfaces must preserve the workstream so that progress can be reconstructed without guessing?

It focuses on:

- surfaced continuity state
- interruption recovery
- lifecycle capture windows
- hot vs capsule vs archive layers
- doctrine vs runtime-shell ownership

## Source Provenance

- **Primary source:** current `developer-tool` ai-agent-memory doctrine tree and its runtime-shell boundary decisions
- **Derived from:** continuity-oriented donor patterns, surfaced handoff/capsule/archive concepts, and memory/control-plane canonization work
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local continuity doctrine aligned to the current developer-tool engine

---

## Core Rule

Continuity is not the same thing as general memory.

Memory answers:

- what should I know?
- what rule or decision matters here?

Continuity answers:

- what was in progress?
- why did we reach this state?
- what must survive the session boundary?
- how do we restart without reconstructing the whole workstream from scratch?

The goal is not to remember everything.
The goal is to preserve enough surfaced continuity that the next session can resume truthfully.

---

## Continuity Verbs

A useful continuity control plane typically supports verbs like:

| Verb                  | Purpose                                                      |
| --------------------- | ------------------------------------------------------------ |
| `diagnose`            | assess continuity risk / context rot                         |
| `trace`               | reconstruct surfaced rationale or recent history lines       |
| `recover`             | rebuild working state after crash, compaction, or cold start |
| `capture` / `capsule` | externalize the current continuity delta                     |
| `archive`             | package colder continuity artifacts for later retrieval      |

These verbs are not tool names by themselves.
They are continuity functions the runtime may later implement.

---

## Pattern 1 — Continuity Stores Surfaced Workstream Truth, Not Hidden Deliberation

Allowed continuity content includes:

- decisions
- failed attempts and surfaced failure reasons
- conflicts and trade-offs that were explicitly discussed
- changed-file rationale
- next-step handoff notes
- artifact pointers (files, sessions, diffs, traces)

Forbidden continuity content includes:

- hidden chain-of-thought
- invisible private deliberation traces
- indiscriminate transcript dumping with no future retrieval value

The doctrine is:

- continuity stores surfaced reasoning products
- not raw internal cognition

This keeps the control plane useful, safe, and inspectable.

---

## Pattern 2 — Hot, Capsule, Archive, and Anchor Layers Serve Different Purposes

A continuity system is stronger when it distinguishes layers:

| Layer   | Role                               | Example                                       |
| ------- | ---------------------------------- | --------------------------------------------- |
| Hot     | cheap local continuity lookup      | latest handoff note, current working-state    |
| Capsule | richer surfaced continuity package | per-session continuity snapshot               |
| Archive | colder dense packaging             | bundled history/capsule artifacts             |
| Anchor  | ultra-stable non-loss rules        | must-not-forget decisions, stable constraints |

The doctrine is:

- not every continuity artifact belongs in the same storage tier
- hotter layers support resumption speed, colder layers support later reconstruction

This prevents both volatility and clutter.

---

## Pattern 3 — Continuity Is an Operational Layer, Not the Canonical Knowledge Center

Interpretation for this workspace:

- the **knowledge center** remains in `developer-tool`
- the **runtime shell** becomes the operational home for continuity surfaces
- donor/source reservoirs remain upstream evidence, not direct runtime truth

The doctrine is:

- doctrine decides what continuity means
- runtime surfaces execute capture, trace, recover, and archive behavior

This prevents the continuity shell from becoming a second knowledge center.

---

## Pattern 4 — Use Continuity When the Problem Is About In-Progress State, Not General Rules

Use the continuity control plane when the question is about:

- what was in progress
- why a decision was reached in the current workstream
- what failed before the current solution
- what must survive compaction or session stop
- how to recover task state after interruption

Use general memory / recall doctrine when the question is about:

- conventions
- preferences
- stable rules
- long-term reusable patterns

The doctrine is:

- continuity preserves active workstream context
- memory preserves broader reusable knowledge

They are related, but not interchangeable.

---

## Pattern 5 — Lifecycle Boundaries Are the Best Capture Windows

The most valuable times to capture continuity are usually lifecycle boundaries:

- user prompt submission when the task framing changes materially
- stop of the main session
- stop of a subagent
- pre-compact preservation before context loss
- crash or restart recovery windows

The doctrine is:

- capture at the moments where state is most likely to be lost or misremembered
- not continuously and indiscriminately

This keeps continuity dense and useful.

---

## Pattern 6 — Continuity Artifacts Should Reconstruct a Useful Chain, Not Just a Timeline

A good continuity artifact should help reconstruct something like:

```text
considering → conflict → failure → decision → next step
```

If an artifact cannot help recover one or more of those links, it is probably noise.

The doctrine is:

- continuity should preserve decision-relevant movement through the workstream
- not merely a timestamped pile of events

---

## Pattern 7 — Recovery Should Prefer Rebuilding State from Surfaced Artifacts, Not Guesswork

After interruption, a strong recovery flow should prefer:

- current working-state
- latest handoff or capsule
- recent traces or artifact pointers
- surfaced decisions and blockers

The doctrine is:

- resumption should start from explicit continuity surfaces
- not from a vague memory of what the agent thinks it was doing

This is one of the main reasons continuity doctrine exists at all.

---

## Pattern 8 — Continuity and Working-State Reinforce Each Other

Working-state is the hot, compact operational layer.
Continuity artifacts are the broader control-plane layer around it.

Working-state helps answer:

- what are we doing right now?

Continuity helps answer:

- how did we get here, what already failed, and what must survive the boundary?

The doctrine is:

- working-state and continuity should reinforce each other
- neither should be mistaken for the full memory model

---

## Pattern 9 — Archive Should Package, Not Bury

Cold continuity archives are useful when:

- a session is complete but may need later forensic recovery
- a major task handoff needs durable packaging
- a long sequence of surfaced artifacts must be retained without cluttering the hot path

But archives become harmful when they are:

- huge and unindexed
- impossible to skim quickly
- treated as the first-line resumption artifact for every task

The doctrine is:

- archive for later reconstruction
- keep hot continuity for immediate resumption

---

## Pattern 10 — Runtime Continuity Surfaces Must Stay Cleanup-Safe

Because continuity artifacts may live in runtime shells or plugins, they must still obey the broader control-plane rules:

- no direct donor-repo dependence
- no hidden reasoning persistence
- no uncontrolled transcript hoarding
- no ambiguity about what is doctrinal vs operational

The doctrine is:

- continuity must remain cleanup-safe if it is to survive long-term system maintenance

---

## Continuity Checklist

Before calling a continuity system healthy, ask:

- [ ] Is it preserving surfaced workstream truth rather than hidden deliberation?
- [ ] Are hot, capsule, archive, and anchor layers distinguished clearly enough?
- [ ] Is continuity being used for in-progress state rather than general-rule storage?
- [ ] Are lifecycle capture windows deliberate rather than constant?
- [ ] Do continuity artifacts help reconstruct the chain from conflict/failure to decision/next step?
- [ ] Can recovery begin from explicit artifacts instead of guesswork?
- [ ] Are runtime continuity surfaces still cleanup-safe?

---

## Anti-Patterns

- treating continuity as just another name for memory
- dumping transcripts instead of extracting surfaced continuity
- using archive artifacts as the default hot resumption surface
- capturing continuously with no density control
- trying to recover by intuition when explicit continuity artifacts exist
- letting runtime continuity become a second doctrine center

---

## Cross-Links

Read this alongside:

- `../memory-systems-overview.md`
- `working-state-and-self-reminder-discipline.md`
- `recall-before-act.md`
- `history-retrieval-patterns.md`
- `../plugin-runtime-overview.md`

---

## Final Doctrine

The reusable lesson is not:

> “continuity stores decisions, failures, and next steps so sessions can be resumed.”

The reusable lesson is:

> “continuity is the surfaced task-state control plane: preserve the smallest artifacts that reconstruct how the work reached its current state, capture them at high-value lifecycle boundaries, and keep them separate from both hidden reasoning and general reusable memory so recovery can be explicit instead of guessed.”
