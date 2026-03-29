# Agentic System Activation Model

## Purpose

Define the canonical doctrine for how `developer-tool` should activate agentic-system knowledge at runtime without letting the shell become noisy, omnipresent, or structurally confused.

This document sits between the broad root doctrine in `agentic-systems.md` and the more operational runtime guidance in `runtime-activation-patterns.md`.

It answers a focused question:

> when a task intersects agentic-system concerns, how should the system load the right amount of doctrine and runtime support so the correct context becomes easier to use than the wrong one?

## Source Provenance

- **Primary source:** current `developer-tool` agentic-system-basis and runtime-shell doctrine cluster
- **Derived from:** plugin-first shell activation work, bridge-skill routing patterns, and controlled runtime loading decisions during heavy-engine canonization
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local activation doctrine aligned to the current developer-tool engine

---

## Core Rule

Activation should be selective, task-aware, and doctrine-first.

A strong activation model should answer:

- does this task actually belong to the agentic-system lane?
- what minimal doctrinal context is required?
- what runtime surfaces, if any, should be exposed?
- how do we avoid flooding the session with the entire lane when only one narrow concept is needed?

The goal is not maximum activation.
The goal is correct activation.

---

## Activation Order

When the task belongs to `agentic-system-basis`, the preferred order is:

1. detect the task belongs to this lane
2. route via bridge skill or index
3. load the most relevant doctrine reference
4. invoke command or agent only if explicit runtime help is needed

This order matters because it preserves the doctrine/runtime boundary.

The system should learn first, then act.
Not act first and hope the right doctrine was implicitly present.

---

## Pattern 1 — Detection Before Loading

The system should not activate agentic-system doctrine just because the word “agent” appeared.

Useful signals include:

- task decomposition or orchestration questions
- multi-agent/team topology questions
- runtime-shell activation or plugin lifecycle questions
- knowledge-injection or context-loading design
- MCP/server/tool integration as part of an agentic control plane

The doctrine is:

- activate on real task texture
- not on loose keyword coincidence

This prevents gratuitous context noise.

---

## Pattern 2 — Bridge First, Doctrine Second, Runtime Third

Activation should prefer this sequence:

`bridge -> doctrine -> runtime`

### Bridge

A small routing surface helps classify the task quickly.

### Doctrine

The user or agent reads the actual design truth.

### Runtime

Commands, agents, or hooks are only brought in once the task truly needs execution help.

The doctrine is:

- routing should reduce ambiguity
- runtime surfaces should not be the first answer to every agentic question

---

## Pattern 3 — Load the Smallest Useful Slice of Knowledge

A mature activation model does not dump the entire `agentic-system-basis` subtree into every relevant task.

Instead, it should prefer loading:

- the root doctrine when the question is broad
- a focused supporting doc when the question is narrow
- a runtime surface only when operational execution is needed

Examples:

- broad system question -> `agentic-systems.md`
- activation-specific question -> `activation-model.md`
- runtime activation behavior -> `runtime-activation-patterns.md`
- team composition -> `ensemble-team-governance.md`

The doctrine is:

- the smaller the useful slice, the cleaner the session stays

---

## Pattern 4 — Runtime Surfaces Are Optional Escalations, Not Defaults

After doctrine is loaded, ask whether runtime support is actually needed.

Good reasons to escalate into runtime surfaces:

- a route command will materially reduce decision ambiguity
- a specialist agent can isolate a bounded review or synthesis task
- a hook- or lifecycle-related design question needs runtime-aware examination

Weak reasons:

- runtime surfaces feel more impressive
- the task is still mostly conceptual
- the doctrine has not been read yet

The doctrine is:

- commands and agents should be used because they add leverage
- not because they are available

---

## Pattern 5 — Activation Should Be Reversible and Non-Oppressive

An activation model becomes weak when it feels like the lane is “always on” and impossible to escape.

Good activation:

- leaves room for other lanes to take over
- can step back after routing succeeds
- does not keep reasserting itself after the task has moved elsewhere

This matters because `developer-tool` is multi-domain.
A task may start in agentic-system design and then move into build/deploy, shell, memory, or runtime execution.

The doctrine is:

- activate strongly enough to orient the task
- not so strongly that the lane starts colonizing unrelated work

---

## Pattern 6 — Activation Should Make the Correct Context Easier Than the Wrong Context

The activation model succeeds when the agent or user can quickly tell:

- “this is an orchestration problem”
- “this is a team governance problem”
- “this is a plugin-runtime problem”
- “this is a memory/continuity problem that only looks agentic at first glance”

The doctrine is:

- activation should improve task classification
- not simply increase the amount of context in the session

This is one of the clearest signals of a mature heavy-engine shell.

---

## Runtime Goal

Activation should make the right system-level context easier to use than the wrong one.

That means:

- faster correct routing
- less forgotten doctrine
- less runtime misuse
- fewer accidental layer violations

This is the actual goal.
Not “load more knowledge.”

---

## Non-Goal

The shell should not flood every session with the entire `agentic-system-basis` doctrine.
Only prime what is needed for the detected task class.

It should also not:

- activate runtime surfaces before doctrinal understanding exists
- use automation as a substitute for task classification
- behave as though every workflow inside `developer-tool` is fundamentally an agentic-systems problem

---

## Activation Checklist

Before activating this lane, ask:

- [ ] Is the task genuinely agentic-system shaped?
- [ ] What is the smallest relevant doctrine slice?
- [ ] Is a bridge/index enough, or must the root doctrine load?
- [ ] Is runtime help actually needed yet?
- [ ] Will this activation still leave room for another lane to take over if the task changes shape?

---

## Anti-Patterns

- activating the full lane on weak keyword matches
- skipping doctrine and jumping directly to commands/agents
- keeping the lane active after the task has clearly moved elsewhere
- confusing context volume with activation quality
- treating runtime surfaces as the default answer to conceptual questions

---

## Cross-Links

Read this alongside:

- `agentic-systems.md`
- `runtime-activation-patterns.md`
- `ensemble-team-governance.md`
- `../plugin-runtime-overview.md`
- `../memory-systems-overview.md`

---

## Final Doctrine

The reusable lesson is not:

> “detect the lane, load doctrine, then maybe use a command.”

The reusable lesson is:

> “activation is a routing discipline: detect real task texture, load the smallest useful doctrinal slice first, escalate into runtime only when it adds leverage, and keep the lane selective enough that it clarifies the task instead of flooding it.”
