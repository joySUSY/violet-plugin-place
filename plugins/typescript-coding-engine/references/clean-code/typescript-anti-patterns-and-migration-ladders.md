# TypeScript Anti-Patterns and Migration Ladders

## Purpose

Define the canonical migration doctrine for recurring TypeScript design debt inside `typescript-coding-engine`.

This document exists because the engine should not only teach ideal doctrine.
It must also teach how to escape common failure patterns without pretending every team can rewrite everything in one heroic pass.

The focused question is:

> when a TypeScript codebase has already drifted into weak type trust, poor runtime boundaries, loose toolchain discipline, or architectural confusion, what are the smallest staged moves that restore honesty and future change velocity?

It focuses on:

- anti-pattern detection
- staged migration ladders
- type-trust recovery
- runtime-boundary repair
- testing and toolchain honesty
- avoiding both paralysis and purity theater

## Source Provenance

- **Primary source:** current `typescript-coding-engine` clean-code doctrine subtree
- **Derived from:** anti-pattern detection, migration, quality-checker, and staged-hardening canonization work inside the heavy-engine shell
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local migration doctrine aligned to the current TypeScript engine

---

## Core Rule

A TypeScript anti-pattern is not just code that looks messy.
It is a repeated design habit that degrades:

- type trust
- review clarity
- runtime safety
- future change velocity
- boundary honesty

The right response is not ritual purity.  
It is structured migration.

The goal is not to make the codebase "perfect" immediately.  
The goal is to move it toward a more truthful architecture without causing unnecessary organizational shock.

---

## Migration Pressure Map

| Debt Family       | What it degrades                                                   |
| ----------------- | ------------------------------------------------------------------ |
| Type-trust debt   | compiler reliability, refactor safety, review confidence           |
| Boundary debt     | runtime safety, parsing/validation clarity, interoperability trust |
| Architecture debt | state ownership, module boundaries, public contract clarity        |
| Toolchain debt    | reproducibility, CI/local parity, consistent team standards        |
| Test debt         | false confidence, weak fixtures, shallow runtime coverage          |

Good migration begins by identifying which family is actually dominant.

---

## Pattern 1 — `any` Spread

### Signal

- `any` appears at trust boundaries and then propagates inward
- the team normalizes `as any` to unblock work
- higher-level abstractions silently depend on erased truth

### Why it matters

- destroys type trust
- hides real boundary uncertainty
- makes refactoring and review weaker
- quietly trains the codebase to stop believing the compiler

### Migration ladder

1. replace `any` with `unknown` at the outermost boundary
2. add runtime validation or type guards
3. narrow into stronger internal types
4. progressively remove downstream unsafe assertions
5. add lint/gate pressure so new `any` does not keep spreading

### Doctrine lesson

Stop the spread first.  
You do not need to remove every historical `any` on day one, but you must stop new uncertainty from escaping the boundary unchecked.

---

## Pattern 2 — Assertion Spam

### Signal

- repeated `as SomeType` without guards or validation
- chains like `foo as Bar as Baz`
- assertions appear wherever the code becomes inconvenient to model honestly

### Why it matters

- lies to the compiler
- encodes wishful thinking instead of proof
- often masks missing discriminants, missing validation, or contract drift

### Migration ladder

1. classify whether the issue is narrowing, validation, or contract mismatch
2. add a guard, assertion function, or schema validation at the real boundary
3. replace repeated assertions with one trusted transformation point
4. tighten review/lint posture against casual assertion chains

### Doctrine lesson

A repeated assertion pattern usually means the model is wrong upstream.
Fix the missing proof, not just the complaint site.

---

## Pattern 3 — Weak Runtime Boundary Discipline

### Signal

- untrusted API/config/form/storage data flows directly into app logic
- compile-time types are mistaken for runtime proof
- external data is cast rather than validated

### Why it matters

- hidden runtime risk
- harder debugging
- brittle integration boundaries
- false sense of safety from compile-time-only reasoning

### Migration ladder

1. map the trust boundary
2. choose a validation posture (`Zod`, `TypeBox`, `Valibot`, or lighter explicit checks)
3. validate once at the boundary
4. flow stronger internal types afterward
5. add tests at the actual trust seam

### Doctrine lesson

Boundary repair is usually one of the highest-leverage TypeScript migrations because it improves both runtime safety and type honesty at once.

---

## Pattern 4 — Type-Level Wizardry with Low Business Value

### Signal

- advanced conditional/mapped/template-literal types where simpler structures would do
- unreadable helper stacks for minimal gain
- maintainers cannot explain what truth the advanced type is preserving

### Why it matters

- increases cognitive load
- slows onboarding and review
- makes failures harder to diagnose
- often hides a simpler runtime or API design problem

### Migration ladder

1. restate the real contract in plain language
2. downgrade to the smallest sufficient type tool
3. keep advanced composition only where it preserves meaningful information
4. move complexity out of the type layer if runtime structure is the actual problem

### Doctrine lesson

Advanced types should preserve truth, not prestige.
If they are not earning their keep, simplify them.

---

## Pattern 5 — Global State Before Blast-Radius Analysis

### Signal

- state solution chosen before understanding scope
- app-wide store used for local or subtree concerns
- state library selected by habit instead of pressure

### Why it matters

- unnecessary coupling
- more re-render/update complexity
- harder reasoning about ownership of state
- migration becomes expensive because the blast radius is already inflated

### Migration ladder

1. classify state scope: local, subtree, global, protocol-state
2. reduce scope where possible
3. move to stronger architectural state boundaries only where the blast radius justifies it
4. document ownership and lifecycle explicitly

### Doctrine lesson

Many state migrations are really blast-radius reduction exercises.
Shrink the scope first; change the library second.

---

## Pattern 6 — Toolchain Looseness in Long-Lived Codebases

### Signal

- weak `tsconfig` posture
- CI not aligned with local expectations
- type-check/lint/test boundaries blurred or skipped
- package/build behavior not reproducible enough to trust

### Why it matters

- silently trains weak architecture
- causes review drift and CI surprises
- makes quality inconsistent across contributors
- normalizes bypass culture

### Migration ladder

1. make local and CI commands explicit
2. harden strictness incrementally if legacy pressure exists
3. enforce check-only gates in CI
4. preserve explicit separation between compile, lint, test, and validation concerns
5. stabilize package/build outputs and versioning discipline

### Doctrine lesson

Toolchain migrations should improve reliability without becoming mysterious pain events.
Tighten by policy, not by accidental drift.

---

## Pattern 7 — Duplicate Parallel Contracts

### Signal

- generated or source contract exists, but handwritten parallel contract also exists
- frontend and backend types drift independently
- docs, DTOs, and generated types tell slightly different stories

### Why it matters

- drift becomes inevitable
- reviews cannot tell which truth wins
- bug reports turn into archaeology across parallel surfaces

### Migration ladder

1. identify the real source of truth
2. collapse duplicates where possible
3. keep wrapping/composition on the consumer side, but stop parallel structural duplication
4. make CI or code review able to detect future drift early

### Doctrine lesson

Parallel truth is one of the most expensive interop and contract debts a TS system can accumulate.
Collapse ownership first, then polish ergonomics.

---

## Pattern 8 — Environment-Lying Tests

### Signal

- tests pass only because mocks or environment wrappers do not match production shape
- boundary failures never appear in the suite
- fixtures are easier to use than they are truthful

### Why it matters

- creates false confidence
- hides contract drift
- breaks trust in CI and release posture

### Migration ladder

1. identify the real boundary or environment under test
2. upgrade fixtures to preserve real contract shape
3. test runtime validation where trust changes
4. separate lightweight unit confidence from environment-heavy integration confidence
5. make test environments explicit enough that maintainers know what is being simulated

### Doctrine lesson

Testing debt is often boundary debt wearing a different costume.
Fixing mocks and environment honesty can recover large amounts of confidence quickly.

---

## Pattern 9 — Framework-First Architecture with No Boundary Analysis

### Signal

- routing, state, or validation choices exist only because the framework defaulted that way
- core data flow is shaped by framework convenience rather than trust or contract design
- architecture decisions become difficult to explain without naming the framework

### Why it matters

- architecture becomes fragile under migration
- boundaries stay implicit
- teams confuse framework habit with domain truth

### Migration ladder

1. restate the core data and trust boundaries in framework-agnostic language
2. identify which framework defaults are helping vs distorting the design
3. move shared contract and state rules into explicit doctrine or central modules
4. keep framework usage downstream of architectural truth

### Doctrine lesson

A framework can host an architecture; it should not secretly become the architecture.

---

## Pattern 10 — Hardening Without Direction

### Signal

- the team says “we should get stricter” but has no migration order
- lint/type/test changes appear randomly across PRs
- strictness and validation tighten in ways that feel arbitrary

### Why it matters

- creates fatigue and resentment
- stalls real migration progress
- makes every change feel like moving targets instead of forward motion

### Migration ladder

1. define the destination posture explicitly
2. choose a sequence (foundations -> boundaries -> gates -> public contracts)
3. stop new debt first
4. migrate the highest-value risk zones next
5. tighten policy only after the previous stage is stable enough to hold

### Doctrine lesson

Migration succeeds when the team can explain both where it is going and what the next step buys.

---

## Incremental Complexity Ladder

### Level 1

Strict local app or utility with small trusted scope

### Level 2

Modular app with clear feature boundaries and basic runtime validation

### Level 3

Richer validation, stronger state boundaries, more explicit API shapes

### Level 4

Shared library or multi-surface app with stronger public contracts and interop concerns

### Level 5

Monorepo/platform-scale TS system with architecture doctrine, quality governance, and cleanup-safe navigation

This ladder should prevent both:

- overbuilding small systems
- under-structuring long-lived systems

The doctrine is:

- migration targets should match the system's actual support burden
- not an abstract ideal borrowed from another team's scale

---

## Migration Heuristics

When deciding what to fix first, prefer this order:

1. stop new debt from spreading
2. fix the boundary that creates the most downstream lies
3. restore the toolchain's ability to tell the truth
4. collapse duplicated contract truth
5. simplify complexity that no longer buys meaningful safety

This order is not absolute, but it is a strong default because it maximizes future leverage.

---

## Anti-Pattern Recovery Checklist

Before calling a migration plan healthy, ask:

- [ ] Have we named the debt in terms of what it degrades, not just how ugly it looks?
- [ ] Are we fixing the origin of the lie rather than only its symptoms?
- [ ] Have we stopped the spread of new debt while paying down old debt?
- [ ] Is the migration staged in a way the team can actually sustain?
- [ ] Are type, runtime, toolchain, testing, and interop debts being treated as connected where they really are?
- [ ] Will the next step reduce future change cost, not just current annoyance?

---

## Anti-Patterns About Anti-Patterns

- declaring a code smell without explaining what truth it is degrading
- demanding purity instead of proposing migration ladders
- trying to harden every lane at once
- fixing local symptoms while leaving the boundary/source of truth unchanged
- assuming advanced type cleverness is always the opposite of debt
- treating migration as a one-shot cleanup event instead of a staged governance program

---

## Why This Matters to `typescript-coding-engine`

This doctrine is a core recovery text because it teaches:

- how to detect repeated TS failure modes
- how to migrate with proportion
- how to connect type debt, runtime debt, test debt, interop debt, and toolchain debt into one coherent recovery model
- how to recover architectural honesty without pretending the team can rewrite everything at once

It should work together with:

- type error diagnosis
- runtime validation doctrine
- architecture decision trees
- narrowing/branding/inference cookbook
- testing strategy doctrine

so the TS engine can teach both strong design and realistic recovery.

---

## Cross-Links

Read this alongside:

- `quality-gates-governance.md`
- `typescript-runtime-validation-decision-matrix.md`
- `toolchain-posture.md`
- `typescript-testing-strategy-and-type-boundaries.md`
- `../foundations/typescript-type-error-diagnosis-and-recovery.md`
- `../architecture/typescript-architecture-decision-trees.md`
- `../advanced/typescript-narrowing-branding-and-inference-cookbook.md`

---

## Final Doctrine

The reusable lesson is not:

> “TypeScript anti-patterns can be addressed with proportionate migration ladders instead of purity.”

The reusable lesson is:

> “TypeScript migration is truth recovery: identify which recurring habit is lying about type safety, runtime trust, contract ownership, state scope, or toolchain reality, then apply the smallest staged change that restores honesty at the boundary where the lie begins while keeping the team moving forward.”
