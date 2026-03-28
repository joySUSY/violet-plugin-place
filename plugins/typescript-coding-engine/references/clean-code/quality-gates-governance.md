# Quality Gates Governance

## Purpose

Define the canonical governance doctrine for quality gates inside `typescript-coding-engine`.

This document exists because TypeScript quality should not be treated as one vague CI blob.
A serious TypeScript system needs explicit change gates that decide whether a change is ready to:
- continue locally
- enter review
- merge
- ship

The real question is:

> what must be true before a TypeScript change is trusted, and how should those truths be enforced without turning quality into decorative ritual or bureaucratic friction?

## Source Provenance

- **Primary source:** current `typescript-coding-engine` clean-code doctrine subtree
- **Derived from:** TypeScript quality-checker, clean-code, testing, and toolchain canonization work inside the heavy-engine shell
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local clean-code doctrine aligned to the current TypeScript engine

---

## Core Rule

Quality gates are the execution boundary between:
- “it seems fine”
and
- “it is justified enough to merge or ship.”

A TypeScript system without strong gates quietly accumulates:
- weak type posture
- formatting drift
- lint debt
- inconsistent test confidence
- build surprises
- contract drift

The goal is not maximum gate count.  
The goal is to enforce the minimum truths that actually protect the system.

---

## Quality Gate Surface Map

| Gate Surface | What it protects |
|---|---|
| Formatting | shared readability and diff hygiene |
| Linting | code-smell and unsafe-pattern detection |
| Type checking | compile-time truth and contract integrity |
| Testing | behavior and regression confidence |
| Runtime validation / boundary checks | safety at untrusted inputs |
| Dependency/security review | supply-chain and package-risk posture |
| Build/package checks | release readiness and operational integrity |

The doctrine is:
- these are distinct gates with different failure classes
- they should not be collapsed into one vague “quality step”

---

## Pattern 1 — Format, Lint, Typecheck, and Test Are Distinct Gates

The donor lesson is clear:
- formatting
- linting
- type checking
- testing
- security/dependency review

should not be mentally collapsed into one generic “quality step.”

They exist to catch different categories of failure.

The doctrine is:
- keep the gate classes conceptually distinct
- let the team know what each gate is proving

If a team cannot explain what a gate protects, the gate is not yet well-governed.

---

## Pattern 2 — Type Checking Is Central, Not Optional, in a TypeScript Engine

The engine must treat `tsc --noEmit` style verification as a first-class gate.

Why:
- TypeScript's architectural promises are enforced there
- linting cannot replace compiler truth
- runtime tests do not prove compile-time safety
- public contract drift often appears first in typecheck failure

The doctrine is:
- compiler truth should sit near the center of TypeScript governance
- not at the margin as one check among many equally optional steps

This is what connects clean-code posture back to foundations doctrine.

---

## Pattern 3 — Quality Gates Should Be Risk-Matched, Not Cargo-Culted

Not every TypeScript project needs the same enforcement posture.

Examples:
- a small internal script may not need the same matrix as a public SDK
- a reusable package needs stronger API/type discipline than an internal admin page
- a Tauri or interop surface may need stronger boundary validation than a purely internal module
- a long-lived monorepo needs more explicit governance than a throwaway tool

The doctrine is:
- choose gate strength by risk, support burden, and blast radius
- not by copying whatever a template happened to include

This is what turns gates into governance rather than superstition.

---

## Pattern 4 — Auto-Fix Helps, But Check-Only Truth Must Stay Visible

Formatting and some linting can be auto-fixed.
That is useful.

But governance still needs:
- check-only posture in CI
- explicit failure visibility
- a stable sequence for local correction and CI enforcement

The doctrine is:
- auto-fix reduces friction
- it does not replace disciplined gates

If CI silently rewrites truth instead of proving it, the feedback loop becomes harder to reason about.

---

## Pattern 5 — Thresholds Encode Team Standards

Limits like:
- complexity thresholds
- max lines
- explicit return-type expectations
- no-`any` posture
- test coverage floors

are governance choices, not random lint trivia.

They express what the project is willing to normalize.

The doctrine is:
- treat thresholds as explicit policy decisions
- not hidden defaults buried in tooling

This keeps quality standards reviewable and adjustable over time.

---

## Pattern 6 — Security and Dependency Review Belong Near the Gate System

TypeScript/JS ecosystems carry significant supply-chain surface area.
That means quality governance should sit close to:
- dependency freshness review
- audit posture
- suspicious package detection
- lockfile discipline
- registry and installation trust

The doctrine is:
- toolchain governance and dependency governance belong near each other
- not in separate mental universes

A green test suite does not prove a safe dependency posture.

---

## Pattern 7 — Local Workflow and CI Workflow Must Agree Closely Enough to Be Reproducible

A strong gate system avoids one of the worst failure modes:
- code looks fine locally
- CI disagrees in opaque ways

The mature posture is:
- local commands mirror CI commands as closely as possible
- check-only CI gates are deterministic
- developers can reproduce failures without ceremony
- version/tooling mismatch is minimized

The doctrine is:
- CI should be the stricter sibling of local workflow
- not a mysterious second universe

This reduces both frustration and false confidence.

---

## Pattern 8 — Runtime Validation Is a Quality Gate for Boundary Truth

TypeScript types do not eliminate runtime uncertainty.
For systems with real trust boundaries, quality governance should also care about:
- whether external input is validated
- whether parsing and narrowing occur at the right edge
- whether schemas/contracts are drifting from runtime behavior

The doctrine is:
- runtime validation is not “extra” quality work in TypeScript
- it is part of the gate model wherever untrusted data enters the system

This is how clean-code posture stays aligned with actual runtime truth.

---

## Pattern 9 — Build and Package Checks Are Also Quality Gates

Quality is not complete just because types and tests pass.
Projects may also need to prove:
- build succeeds under the supported toolchain
- emitted declarations or packages are correct
- artifact shape matches publishing/runtime assumptions
- generated code or docs are current

The doctrine is:
- build/package integrity is part of change trust
- not only release mechanics after the “real” quality work is done

This is especially important for libraries, CLIs, and plugin ecosystems.

---

## Pattern 10 — Gates Should Fail in Ways That Reduce Human Guesswork

A good gate system should help answer:
- which kind of truth failed?
- is the problem formatting, style, type, runtime contract, or behavior?
- can the failure be reproduced locally?
- is the failure deterministic or environmental?
- what is the next fix surface?

The doctrine is:
- a gate should be diagnostic, not theatrical
- its job is to increase clarity at the moment of failure

A failing gate that cannot guide the next action is under-designed.

---

## Pattern 11 — Governance Should Tighten Over Time Through Deliberate Policy, Not Random Pain

As the system matures, gates may need to grow stronger.
That should happen through explicit policy moves such as:
- banning new `any`
- raising strictness posture
- requiring runtime validation at specific boundaries
- tightening CI parity
- making API/declaration checks mandatory

The doctrine is:
- tightening should be deliberate and reviewable
- not accidental fallout from scattered config drift

This is how quality governance becomes sustainable rather than resented.

---

## Quality Gates Checklist

Before calling a TypeScript quality-gate system healthy, ask:

- [ ] Are formatting, lint, typecheck, test, validation, and dependency review treated as distinct gate classes?
- [ ] Is compiler truth central enough in the system?
- [ ] Are gate strengths matched to real project risk and support burden?
- [ ] Does local workflow align closely enough with CI to reproduce failures easily?
- [ ] Are runtime-boundary truths included where the type system cannot prove them?
- [ ] Do gate failures reduce human guesswork instead of increasing it?
- [ ] Are stricter policies introduced deliberately rather than through drift?

---

## Anti-Patterns

- decorative CI rituals with no clear protected truth
- mentally collapsing all checks into one “quality step”
- treating type checking as optional in a TypeScript engine
- copied gate sets with no link to project risk
- auto-fix replacing explicit check-only proof
- assuming tests prove runtime-boundary safety by themselves
- CI and local workflow diverging into two incompatible realities

---

## Why This Matters to `typescript-coding-engine`

This document gives the engine a canonical answer to:
- what a TypeScript quality gate system actually is
- why compiler truth matters more than vague “quality” language
- how local and CI discipline should fit together
- why no-`any`, validation posture, and build integrity are governance decisions rather than taste

It is one of the main support roots for the `clean-code/` lane.

---

## Cross-Links

Read this alongside:
- `INDEX.md`
- `../foundations/strict-type-system-posture.md`
- `typescript-runtime-validation-decision-matrix.md`
- `toolchain-posture.md`
- `typescript-anti-patterns-and-migration-ladders.md`
- `../architecture/typescript-architecture-decision-trees.md`

---

## Final Doctrine

The reusable lesson is not:
> “TypeScript projects should run format, lint, typecheck, and test in CI.”

The reusable lesson is:
> “quality gates are the governance boundary of a TypeScript system: keep gate classes distinct, put compiler truth near the center, match enforcement to risk, include runtime-boundary truth where needed, and design failures so they reduce the next guess instead of adding another ritual.”
