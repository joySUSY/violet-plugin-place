# Toolchain Posture

## Purpose

Define the canonical toolchain doctrine for `typescript-coding-engine`.

This document exists because a TypeScript system is not governed by types alone.
Its actual behavior is shaped by a coordinated toolchain:
- compiler
- linter
- formatter
- test runner
- package manager
- build scripts
- CI environment

The focused question is:

> how should these tools be treated as one coordinated system so TypeScript code remains reproducible, diagnosable, strict enough to matter, and ergonomic enough that teams do not devolve into bypass culture?

## Source Provenance

- **Primary source:** current `typescript-coding-engine` clean-code doctrine subtree
- **Derived from:** TypeScript toolchain, quality-checker, and reproducibility canonization work inside the heavy-engine shell
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local toolchain doctrine aligned to the current TypeScript engine

---

## Core Rule

The TypeScript toolchain is not a bag of tools.
It is a coordinated system.

A good toolchain posture makes:
- compile-time truth
- style discipline
- test confidence
- build reproducibility
- CI behavior
- developer ergonomics

feel coherent instead of fragmented.

The goal is not to collect more tools.  
The goal is to make the existing tools reinforce one another instead of contradicting each other.

---

## Toolchain Surface Map

| Surface | What it governs |
|---|---|
| Compiler (`tsc`) | structural truth, declarations, config-driven semantics |
| Linter | unsafe or inconsistent coding patterns |
| Formatter | deterministic presentation and diff hygiene |
| Test runner | behavioral confidence and regression proof |
| Package/build tooling | install/build reproducibility |
| CI environment | shared enforcement and release confidence |

The doctrine is:
- each tool has a lane
- the system is healthy when those lanes cooperate rather than blur together

---

## Pattern 1 — Configuration Is Strategy

Tooling choices such as:
- `tsconfig` mode
- module resolution
- lint stack
- formatter behavior
- test runner
- package manager and install mode

are strategy choices.
They define what the codebase considers normal, safe, and easy.

The doctrine is:
- treat tooling configuration as architecture and governance
- not as disposable scaffolding generated once and forgotten

This is why toolchain posture belongs close to foundations and quality-gate doctrine.

---

## Pattern 2 — The Compiler Is the Structural Center

In a TypeScript engine, the compiler is the structural center of the toolchain.

Why:
- it enforces the system's compile-time claims
- it defines declaration output and module semantics
- it exposes boundary and inference failures before runtime
- it gives the cleanest signal about type contract drift

The doctrine is:
- linting does not replace `tsc`
- tests do not replace `tsc`
- formatting certainly does not replace `tsc`

A strong toolchain orbits around compiler truth rather than treating it as one optional check among equals.

---

## Pattern 3 — Strictness Must Be Intentional and Sustained

A team may adopt strictness progressively, especially during migration.
But the engine should still teach a clear destination posture:
- stronger compiler signals
- fewer implicit escapes
- fewer silent widening failures
- more explicit boundary truth

Intentional gradual adoption is fine.
Unintentional permanent looseness is not.

The doctrine is:
- toolchain posture should make the destination visible even when the migration is phased
- otherwise temporary looseness becomes institutional habit

---

## Pattern 4 — Reproducibility Is Part of Toolchain Health

A strong toolchain posture prefers:
- pinned or stable tool versions where appropriate
- project-local config
- reproducible install paths
- commands that run the same way locally and in CI
- low hidden dependence on ambient global tooling

This helps prevent “works on my machine” TypeScript behavior.

The doctrine is:
- if a developer cannot reliably reproduce the same toolchain behavior as CI, the posture is weak even if the code is good

Reproducibility is a property of the whole toolchain, not only the build output.

---

## Pattern 5 — One Tool Must Not Pretend To Be All Others

Examples:
- ESLint is not the compiler
- Prettier is not architectural governance
- tests are not type safety
- audits are not linting
- package manager warnings are not security strategy

Each tool has a lane.

The doctrine is:
- use each tool for the kind of truth it can actually verify
- resist the temptation to let convenience collapse multiple gate types into one surface

This is one of the main ways toolchains become confusing instead of helpful.

---

## Pattern 6 — Local Workflow and CI Must Be Close Enough to Feel Like One System

A strong toolchain avoids one of the worst developer experiences:
- local commands pass
- CI fails for reasons that feel unrelated or irreproducible

The mature posture is:
- local commands mirror CI commands as closely as possible
- CI checks are deterministic and documented
- developers can reproduce failures without ceremony
- the difference between local and CI is mostly environment strictness, not different logic

The doctrine is:
- CI should feel like the stricter sibling of local workflow
- not a mysterious second universe with its own laws

---

## Pattern 7 — Fast Enough to Use Is a Governance Requirement

A toolchain that is technically strict but ergonomically miserable often collapses into bypass culture.

So the mature posture is:
- strict enough to matter
- fast enough to use
- clear enough to debug
- explicit enough to trust

The doctrine is:
- developer ergonomics is not the enemy of governance
- it is one of the things that keeps governance sustainable

A perfect toolchain no one actually uses correctly is still a failed toolchain.

---

## Pattern 8 — Toolchain Boundaries Should Match Project Shape

Different project shapes justify different toolchain posture.

Examples:
- small internal tool -> lighter stack, but still reproducible and strict enough
- reusable package -> declaration and contract integrity become more important
- monorepo -> task orchestration and workspace consistency matter more
- interop-heavy app -> build alignment across boundaries matters more

The doctrine is:
- toolchain complexity should scale with actual project support burden
- not with whichever stack happens to be fashionable

This keeps the engine from overbuilding tiny projects or under-governing large ones.

---

## Pattern 9 — Package Manager and Build Surface Are Part of TypeScript Truth

The TypeScript toolchain is not only editor tooling.
It also includes:
- package manager behavior
- lockfiles
- install determinism
- build scripts
- emitted declarations and package outputs

The doctrine is:
- the build/package layer is part of the toolchain's truth surface
- if packages or declarations drift, the engine's promises drift with them

This is where toolchain posture links directly to quality gates and release discipline.

---

## Pattern 10 — Toolchain Failures Should Be Diagnostic, Not Ritualistic

A useful toolchain should help answer:
- did the compiler fail, or the lint layer, or the test layer?
- was the problem structural, stylistic, or behavioral?
- can the failure be reproduced locally?
- is the issue in code, config, or environment?

The doctrine is:
- toolchain failures should reduce the next question
- not merely announce that “something failed somewhere”

This is one of the clearest signs of a mature engineering environment.

---

## Pattern 11 — Governance Should Tighten by Policy, Not by Surprise Drift

Teams may eventually strengthen posture by:
- tightening compiler flags
- banning new `any`
- making CI parity stricter
- locking package-manager behavior more tightly
- adding generation/build verification

The doctrine is:
- these shifts should happen by explicit decision and communication
- not because the toolchain mutated silently underneath the team

This keeps strictness and reproducibility from feeling arbitrary or hostile.

---

## Toolchain Checklist

Before calling a TypeScript toolchain healthy, ask:

- [ ] Is the compiler clearly treated as the structural center?
- [ ] Are config choices understood as strategy rather than setup trivia?
- [ ] Is the toolchain reproducible across local and CI environments?
- [ ] Are lint, format, test, and build surfaces kept conceptually distinct?
- [ ] Is the system ergonomic enough to avoid bypass culture?
- [ ] Does toolchain complexity match actual project shape and support burden?
- [ ] Do failures help identify which truth surface broke?
- [ ] Are tightening moves deliberate rather than accidental drift?

---

## Anti-Patterns

- treating the TypeScript toolchain as an unrelated bag of tools
- using linting as a surrogate for compiler truth
- allowing CI to diverge so far from local workflow that failures feel alien
- tolerating irreproducible installs or hidden version drift
- building a "strict" toolchain that is so painful developers learn to bypass it
- letting package/build outputs drift as if they were separate from the type/tooling story

---

## Why This Matters to `typescript-coding-engine`

This document anchors the engine's view that:
- TS tooling is part of the architecture
- the toolchain is a coordinated system
- strictness must be intentional
- reproducibility and developer ergonomics both matter
- local and CI parity are governance concerns, not convenience details

It is the main toolchain support doctrine under the `clean-code/` lane.

---

## Cross-Links

Read this alongside:
- `INDEX.md`
- `quality-gates-governance.md`
- `typescript-runtime-validation-decision-matrix.md`
- `../foundations/strict-type-system-posture.md`
- `../architecture/typescript-architecture-decision-trees.md`

---

## Final Doctrine

The reusable lesson is not:
> “the TypeScript toolchain is a coordinated system, so compiler, linter, formatter, and tests should work well together.”

The reusable lesson is:
> “toolchain posture is a governance problem: center compiler truth, make local and CI behavior reproducible, keep each tool honest about its lane, and preserve enough speed and clarity that the team can actually live inside the strictness and quality posture the engine is trying to enforce.”
