# Rust Coding Engine Trigger Scope

## Purpose

Define the canonical trigger-ownership doctrine for `rust-coding-engine`.

This document freezes which runtime surface should own the **first response** when a Rust-related task or event appears.

It answers a control-plane question:

> when a Rust trigger fires, which layer should respond first—bridge skill, command, agent, hook, rule, doctrine reference, or donor fallback—and how do we keep those responsibilities from drifting into overlap or automation chaos?

This is not only a routing note.
It is one of the main governance documents that keeps the engine coherent as deep fusion continues.

## Source Provenance

- **Primary source:** current `rust-coding-engine` root governance and runtime-shell model
- **Derived from:** trigger ownership, bridge-skill routing, command/agent/hook separation, and Rust deep-fusion canonization work
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local trigger-ownership doctrine aligned to the current Rust engine

---

## Core Rule

Every meaningful Rust trigger must have an explicit first owner.

For each trigger, the engine should be able to answer:
- what just happened?
- which surface responds first?
- what kind of action is appropriate at this stage?
- which stronger surface, if any, should be consulted next?

If those answers are fuzzy, the engine will drift toward:
- doctrine duplication
- shell overreach
- donor dependence in active workflows

The goal is not maximal automation.
The goal is predictable activation.

---

## Trigger Ownership Model

| Trigger Type | Primary Owner | Use When |
| --- | --- | --- |
| Topic or lane detection | bridge `skills/` | first routing of Rust-heavy work |
| Explicit user action | `commands/` | the user needs a concrete operational workflow |
| Specialist diagnosis or review | `agents/` | bounded deep reasoning is needed |
| Lifecycle continuity | `hooks/` | startup, compact, or stop guidance improves reliability |
| Stable law or invariant | `references/` + `rules/` | a non-negotiable Rust pattern or policy is needed |
| Donor extraction | doctrine + governance docs | curated material is insufficient |

The doctrine is:
- use the smallest surface that preserves the trigger honestly
- do not escalate automatically just because a more powerful surface exists

---

## Surface Ownership

### `skills/`
Bridge skills own:
- first classification
- first routing into Rust doctrine
- the shortest safe path to the correct doctrinal lane

They should **not**:
- duplicate the whole donor corpus
- become shell automation centers
- replace commands or specialist agents when bounded flows are better

### `commands/`
Commands own:
- explicit prime flows
- explicit route selection
- bounded diagnosis or review entrypoints
- operationally repeatable tasks with clear user intent

They should **not**:
- replace deep doctrine
- become giant pseudo-tutorial files
- silently mutate broad state just because a route was chosen

### `agents/`
Agents own:
- borrow-checker diagnosis
- architecture review
- interop scouting
- performance diagnosis

They should **not**:
- become all-purpose Rust explainers
- replace the doctrine center
- act as permanent ambient reviewers in place of explicit invocation

### `hooks/`
Hooks own:
- light startup priming
- compaction handoff preservation
- stop-time shell review reminders
- narrow, justified lifecycle guidance

They should **not**:
- block broad classes of Rust work by default
- run heavy donor crawling on every lifecycle event
- mutate broad state unexpectedly
- become a hidden second runtime application

### `references/` and `rules/`
Doctrine references and rule indexes own:
- durable explanations
- decision frameworks
- invariants and laws
- cleanup-safe reading paths

They should **not**:
- be bypassed in favor of donor material during ordinary work
- be duplicated into skills or runtime surfaces without reason

---

## Rust-Specific Trigger Table

| Scenario | Primary Surface |
| --- | --- |
| “What does this borrow checker error mean?” | `commands/diagnose/borrow-checker.md` or `agents/borrow-checker-diagnostician.md` |
| “How should I structure this Rust project?” | `skills/architecture` or `agents/rust-architecture-reviewer.md` |
| “Should this be Tokio, rayon, channels, locks, or atomics?” | `commands/route/choose-concurrency-pattern.md` |
| “How do I expose this to Python / Node / WASM / C / TS?” | `commands/route/choose-interop-path.md` or `agents/ffi-interop-scout.md` |
| “I need the baseline Rust mental model before coding” | `commands/prime/rust-foundations.md` or `skills/foundations` |
| “I need interop safety baseline before coding” | `commands/prime/rust-interop.md` or `skills/interop` |
| “Is this architecture over-abstracted or under-structured?” | `agents/rust-architecture-reviewer.md` |
| “Where is the actual bottleneck and what do I optimize first?” | `agents/performance-surgeon.md` |
| “What crate or ecosystem path fits this?” | `references/ecosystem/INDEX.md` or the matching bridge skill if explicit routing help is needed |

This table exists to keep practical activation predictable.

---

## Pattern 1 — Skills Own First Classification

Bridge skills should remain the first responder when the main uncertainty is:
- which lane is active?
- which doctrine should load?
- whether the task is really Rust-heavy at all?

The doctrine is:
- skills should classify and route
- not attempt to solve every downstream problem themselves

This keeps the first move cheap and context-efficient.

---

## Pattern 2 — Commands Own Repeatable Operational Moves

A command is the correct owner when:
- the action is explicit
- the user or agent can name the workflow clearly
- the workflow is repeated often enough to deserve a stable doorway
- bounded operational leverage is more useful than more reading

The doctrine is:
- commands should expose workflows that are operationally concrete
- not become large passive reference pages in disguise

This is why `prime`, `route`, and `diagnose` remain the core command families.

---

## Pattern 3 — Agents Own Bounded Specialist Reasoning

Agents are the first owner only when the task genuinely benefits from isolated, specialist reasoning.

Examples:
- diagnosing borrow-checker or type-shape failures
- auditing architecture shape
- evaluating FFI or interop risk at a contract boundary
- identifying the true performance bottleneck under evidence

The doctrine is:
- use agents for bounded leverage
- not as default routing surfaces for ordinary doctrinal questions

If the question is still “what does this principle mean?”, doctrine should answer first.

---

## Pattern 4 — Hooks Own Lifecycle Moments, Not General Rust Behavior

Hooks are appropriate when the trigger is lifecycle-shaped:
- session start
- precompact
- stop

They are **not** appropriate as the first owner for ordinary:
- ownership questions
- architecture decisions
- concurrency choices
- interop path selection
- performance investigations

The doctrine is:
- hooks should assist continuity and gentle shell discipline
- not replace the engine's ordinary doctrinal and command-based routing model

This is one of the strongest protections against shell overreach.

---

## Pattern 5 — Doctrine and Rules Own Stable Truth

If the trigger is asking for:
- a principle
- a decision framework
- a migration path
- a non-negotiable boundary law

then doctrine owns the first answer.

Rules participate only when the law is stable enough to freeze as a deterministic shell constraint.

The doctrine is:
- doctrine teaches
- rules freeze only mature law
- runtime surfaces should not harden unstable judgment into pseudo-law

---

## Pattern 6 — Interop Triggers Need Boundary Ownership Before Action

When a trigger touches Python, Node, Tauri, WASM, C/C++, or Rust↔TypeScript contracts, the first responder should help answer:
- does Rust own structural truth here?
- is this really an interop lane question or a production/release one?
- what foreign consumer ergonomics remain local to another engine?
- is the next owner still `rust-coding-engine`, or should the task escalate outward?

The doctrine is:
- interop triggers should resolve structural ownership before implementation
- otherwise the shell will load the wrong lane reactively and create confusion

---

## Pattern 7 — Compiler and Benchmarks Remain the Strongest Truth Surfaces

If the trigger suggests:
- a borrow-checker failure
- an error-propagation issue
- a performance bottleneck
- a lint or test discipline problem

then the engine should route toward:
- compiler truth
- test truth
- benchmark and profiling truth
- explicit commands or agents that interpret those truths

The doctrine is:
- runtime shell surfaces should help the user reach the strongest machine-truth surface
- not compete with it through weaker approximations

---

## Pattern 8 — Donor Reservoirs Are Never First Owners

A donor family may explain why a pattern exists.
It should never become the first owner of an active trigger.

The doctrine is:
- donor reservoirs are fallback evidence only
- active triggers must resolve through canonical doctrine, skills, commands, agents, hooks, or rules first

This is one of the core cleanup-safe guarantees of the engine.

---

## Trigger Scope Checklist

Before assigning a first owner to a Rust trigger, ask:

- [ ] Is the trigger really Rust-heavy, or only adjacent to Rust work?
- [ ] Which lane is actually active?
- [ ] Is the smallest honest first owner a skill, command, agent, hook, or doctrine page?
- [ ] Does runtime activation add leverage, or only more movement?
- [ ] Is this trying to route, diagnose, preserve, or enforce?
- [ ] Would using a stronger truth surface like compiler, tests, or benchmarks be cleaner than adding another runtime behavior?

---

## Anti-Patterns

- routing by keyword alone instead of by ownership or pressure
- turning agents into default responders for every Rust question
- using hooks as a substitute for routing or doctrine
- letting commands become disguised doctrine dumps
- escalating into donor material before canonical doctrine is exhausted
- allowing interop triggers to blur Rust-side and consumer-side ownership

---

## Cross-Links

Read this alongside:
- `SKILL.md`
- `README.md`
- `references/INDEX.md`
- `references/governance/source-reservoir-map.md`
- `references/foundations/INDEX.md`
- `references/architecture/INDEX.md`
- `references/async-concurrency/INDEX.md`
- `references/error-patterns/INDEX.md`
- `references/production/INDEX.md`
- `references/quality/INDEX.md`
- `references/ecosystem/INDEX.md`
- `references/interop/INDEX.md`
- `commands/prime/rust-foundations.md`
- `commands/prime/rust-interop.md`
- `commands/diagnose/borrow-checker.md`
- `commands/route/choose-concurrency-pattern.md`
- `commands/route/choose-interop-path.md`
- `agents/borrow-checker-diagnostician.md`
- `agents/rust-architecture-reviewer.md`
- `agents/ffi-interop-scout.md`
- `agents/performance-surgeon.md`

---

## Status

- Engine: `rust-coding-engine`
- Stage: trigger ownership frozen and aligned to current heavy-engine control-plane standard
- Destructive actions performed: **none**

---

## Final Doctrine

The reusable lesson is not:
> “Rust triggers should go to whichever runtime surface seems nearby.”

The reusable lesson is:
> “Rust trigger scope should make the first owner explicit, keep bridge routing cheaper than over-escalation, preserve doctrine as the primary teacher, preserve compiler, test, and benchmark truth as the primary machine surfaces, and only harden runtime behavior where the trigger genuinely benefits from bounded operational leverage.”
