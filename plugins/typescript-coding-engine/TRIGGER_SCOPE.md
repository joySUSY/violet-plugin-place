# TypeScript Coding Engine Trigger Scope

## Purpose

Define the canonical trigger-ownership doctrine for `typescript-coding-engine`.

This document freezes which runtime surface should own the **first response** when a TypeScript-related task or event appears.

It answers a control-plane question:

> when a TypeScript trigger fires, which layer should respond first—bridge skill, command, agent, hook, rule, doctrine reference, or donor fallback—and how do we keep those responsibilities from drifting into overlap or automation chaos?

This is not only a routing note.
It is one of the main governance documents that keeps the engine coherent as deep fusion continues.

## Source Provenance

- **Primary source:** current `typescript-coding-engine` root governance and runtime-shell model
- **Derived from:** trigger ownership, bridge-skill routing, command/agent/hook separation, and TypeScript deep-fusion canonization work
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local trigger-ownership doctrine aligned to the current TypeScript engine

---

## Core Rule

Every meaningful TypeScript trigger must have an explicit first owner.

For each trigger, the engine should be able to answer:

- what just happened?
- which surface responds first?
- what kind of action is appropriate at this stage?
- which stronger surface, if any, should be consulted next?

If those answers are fuzzy, the engine will drift toward one of three failures:

- doctrine duplication
- shell overreach
- donor dependence in active workflows

The goal is not maximal automation.
The goal is predictable activation.

---

## Trigger Ownership Model

| Trigger Type                   | Primary Owner              | Use When                                                |
| ------------------------------ | -------------------------- | ------------------------------------------------------- |
| Topic or lane detection        | bridge `skills/`           | first routing of TS-heavy work                          |
| Explicit user action           | `commands/`                | the user needs a concrete operational workflow          |
| Specialist diagnosis or review | `agents/`                  | bounded deep reasoning is needed                        |
| Lifecycle continuity           | `hooks/`                   | startup, compact, or stop guidance improves reliability |
| Stable law or invariant        | `references/` + `rules/`   | a non-negotiable TS pattern or policy is needed         |
| Donor extraction               | doctrine + governance docs | curated material is insufficient                        |

The doctrine is:

- use the smallest surface that preserves the trigger honestly
- do not escalate automatically just because a more powerful surface exists

---

## Surface Ownership

### `skills/`

Bridge skills own:

- first classification
- first routing into TS doctrine
- the shortest safe path to the correct doctrinal lane

They should **not**:

- duplicate the whole donor corpus
- become runtime automation centers
- replace commands or specialist agents when bounded flows are better

### `commands/`

Commands own:

- explicit prime flows
- explicit route selection
- bounded type or toolchain checks
- operationally repeatable tasks with clear user intent

They should **not**:

- replace deep doctrine
- become giant pseudo-tutorial files
- silently mutate broad state just because a route was chosen

### `agents/`

Agents own:

- type diagnosis
- architecture review
- tooling audit
- interop review

They should **not**:

- become all-purpose TypeScript explainers
- replace the doctrine center
- act as permanent ambient reviewers in place of explicit invocation

### `hooks/`

Hooks own:

- light startup priming
- compaction handoff preservation
- stop-time shell review reminders
- narrow, justified lifecycle guidance

They should **not**:

- block all TS work by default
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

## TypeScript-Specific Trigger Table

| Scenario                                                    | Primary Surface                                                                                                                            |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| “Why is this type error happening?”                         | `commands/check/types.md` or `agents/type-diagnostician.md`                                                                                |
| “What validation approach should I use?”                    | `commands/route/choose-runtime-validation.md` or `skills/runtime-validation`                                                               |
| “What state or structure pattern fits this TS app?”         | `commands/route/choose-state-pattern.md` or `agents/ts-architecture-reviewer.md`                                                           |
| “Is this tsconfig/lint/CI/testing posture coherent?”        | `commands/check/toolchain.md` or `agents/ts-tooling-auditor.md`                                                                            |
| “I need the baseline TypeScript mental model first”         | `commands/prime/ts-foundations.md` or `skills/core-types`                                                                                  |
| “I need the TypeScript toolchain posture first”             | `commands/prime/ts-tooling.md` or `skills/tooling-and-quality`                                                                             |
| “How should TypeScript interact with Rust, WASM, or Tauri?” | `skills/interop` first, then `agents/interop-reviewer.md` if bounded review is needed                                                      |
| “How should we test this TS boundary honestly?”             | `skills/testing` or `references/clean-code/typescript-testing-strategy-and-type-boundaries.md`                                             |
| “How do we unwind recurring TS debt?”                       | `references/clean-code/typescript-anti-patterns-and-migration-ladders.md` or the relevant route/check surface if the debt is lane-specific |

This table exists to keep practical activation predictable.

---

## Pattern 1 — Skills Own First Classification

Bridge skills should remain the first responder when the main uncertainty is:

- which lane is active?
- which doctrine should load?
- whether the task is really TS-heavy at all?

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

This is why `prime`, `check`, and `route` remain the core command families.

---

## Pattern 3 — Agents Own Bounded Specialist Reasoning

Agents are the first owner only when the task genuinely benefits from isolated, specialist reasoning.

Examples:

- diagnosing complex type failures
- auditing architecture shape
- reviewing toolchain coherence
- evaluating interop risk at a contract boundary

The doctrine is:

- use agents for bounded leverage
- not as default routing surfaces for ordinary doctrinal questions

If the question is still “what does this principle mean?”, doctrine should answer first.

---

## Pattern 4 — Hooks Own Lifecycle Moments, Not General TypeScript Behavior

Hooks are appropriate when the trigger is lifecycle-shaped:

- session start
- precompact
- stop

They are **not** appropriate as the first owner for ordinary:

- type questions
- architecture decisions
- runtime validation choices
- testing strategy decisions

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

## Pattern 6 — Interop Triggers Need Cross-Engine Ownership Before Action

When a trigger touches Rust, Tauri, generated contracts, or WASM, the first responder should help answer:

- does Rust own structural truth?
- does TypeScript own only consumer ergonomics here?
- is this a TypeScript-side runtime-validation issue instead?
- should the next step escalate into `rust-coding-engine` or remain here?

The doctrine is:

- interop triggers should resolve ownership before implementation
- otherwise the shell will load both lanes or the wrong lane reactively and create confusion

---

## Pattern 7 — Runtime Validation Triggers Are Usually Route, Not Hook, Problems

A runtime-validation question often sounds urgent, but it is usually a route problem first.

Good first owners:

- `commands/route/choose-runtime-validation.md`
- `skills/runtime-validation`
- `references/clean-code/typescript-runtime-validation-decision-matrix.md`

Weak first owners:

- ambient hooks trying to inject validation by surprise
- generic testing nags that do not understand the trust boundary

The doctrine is:

- validation triggers are usually about selecting the right boundary policy
- not about immediate automation

---

## Pattern 8 — Trigger Scope Must Keep Compiler and CI Truth Primary

If the trigger suggests:

- a type mismatch
- a toolchain issue
- a failing quality gate
- a declaration or build drift problem

then the engine should route toward:

- compiler truth
- CI truth
- explicit commands or agents that interpret those truths

The doctrine is:

- runtime shell surfaces should help the user reach the strongest machine truth surface
- not compete with it through weaker approximations

---

## Pattern 9 — Donor Reservoirs Are Never First Owners

A donor family may explain why a pattern exists.
It should never become the first owner of an active trigger.

The doctrine is:

- donor reservoirs are fallback evidence only
- active triggers must resolve through canonical doctrine, skills, commands, agents, hooks, or rules first

This is one of the core cleanup-safe guarantees of the engine.

---

## Trigger Scope Checklist

Before assigning a first owner to a TypeScript trigger, ask:

- [ ] Is the trigger really TypeScript-heavy, or only adjacent to TS work?
- [ ] Which lane is actually active?
- [ ] Is the smallest honest first owner a skill, command, agent, hook, or doctrine page?
- [ ] Does runtime activation add leverage, or only more movement?
- [ ] Is this trying to route, diagnose, preserve, or enforce?
- [ ] Would using a stronger truth surface like `tsc`, CI, or doctrine be cleaner than adding another runtime behavior?

---

## Anti-Patterns

- routing by keyword alone instead of by boundary or pressure
- turning agents into default responders for every TypeScript question
- using hooks as a substitute for routing or doctrine
- letting commands become disguised doctrine dumps
- escalating into donor material before canonical doctrine is exhausted
- allowing interop triggers to blur TypeScript-side and Rust-side ownership

---

## Cross-Links

Read this alongside:

- `SKILL.md`
- `references/INDEX.md`
- `references/source-reservoir-map.md`
- `references/foundations/INDEX.md`
- `references/clean-code/INDEX.md`
- `references/architecture/INDEX.md`
- `references/interop/INDEX.md`
- `commands/prime/ts-foundations.md`
- `commands/prime/ts-tooling.md`
- `commands/check/types.md`
- `commands/check/toolchain.md`
- `commands/route/choose-runtime-validation.md`
- `commands/route/choose-state-pattern.md`
- `agents/type-diagnostician.md`
- `agents/ts-architecture-reviewer.md`
- `agents/ts-tooling-auditor.md`
- `agents/interop-reviewer.md`

---

## Final Doctrine

The reusable lesson is not:

> “TypeScript triggers should go to the closest available runtime surface.”

The reusable lesson is:

> “TypeScript trigger scope should make the first owner explicit, keep bridge routing cheaper than over-escalation, preserve doctrine as the primary teacher, preserve compiler and CI as the primary machine truth, and only harden runtime behavior where the trigger genuinely benefits from bounded operational leverage.”
