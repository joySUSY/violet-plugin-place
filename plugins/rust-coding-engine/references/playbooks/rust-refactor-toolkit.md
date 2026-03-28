# Rust Refactor Toolkit

## Purpose

Define the canonical playbook doctrine for refactoring Rust systems safely, incrementally, and with boundary awareness.

This document is not the architecture root, and it is not the compiler-error family map.
Its job is narrower and more operational:

> when the code already works well enough to run, but its structure, boundaries, or clarity need to improve, how should Rust refactoring proceed without introducing accidental regressions or architectural drift?

Rust refactoring is unusual because the compiler is not just a guardrail.
It is an active participant in the refactor loop.

---

## Source Provenance

- **Primary donor families:** local refactor reservoir material, `rust-skills` project/api/ownership/error families, anti-pattern doctrine
- **Key local donor materials:**
  - current `rust-anti-pattern-detection-and-migration-ladders.md`
  - current `rust-migration-and-transition.md`
  - current `rust-architecture-and-scaffolding.md`
  - `rust-skills` project/type/ownership/error rule families
- **Upstream URL:** not yet fully re-verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending

---

## Core Rule

Refactoring in Rust should improve structure without making ownership, boundary, or operational truth less honest.

That means a good refactor is not merely one that compiles afterward.
It is one that:
- preserves or intentionally improves semantics
- reduces structural confusion
- keeps the public/operational contract under control
- uses compiler feedback as design guidance instead of fighting it

The point is not to change code shape for its own sake.
The point is to remove design debt while preserving trust.

---

## Refactor Workflow

### Step 1 — Identify the real target
Name what is wrong:
- overgrown module?
- unclear ownership flow?
- too-wide public surface?
- framework leakage?
- clone/lock/panic anti-pattern pressure?

If the problem is not named clearly, the refactor will wander.

### Step 2 — Freeze the protected boundary
Before changing structure, define what must stay stable:
- behavior
- public API
- serialization shape
- CLI output
- interop contract
- operational behavior if relevant

This determines how much freedom the refactor truly has.

### Step 3 — Choose the refactor family
Common families:
- split modules by boundary or feature
- shrink public surface
- move logic out of framework/transport edges
- replace clone/lock/type smells with better ownership models
- extract trait or abstraction only when boundary pressure is real
- collapse abstraction when it is artificial

### Step 4 — Apply in compiler-sized steps
Rust refactors are strongest when done in small, checkable increments:
- rename
- move
- split
- re-export
- narrow visibility
- re-run `cargo check` or equivalent early and often

### Step 5 — Re-test and re-audit the result
Refactoring is complete only when:
- the protected boundary still holds
- the new structure is actually clearer
- the same anti-pattern does not simply reappear in a different file

---

## Pattern 1 — Treat the Compiler as a Design Partner

Rust refactoring is often a dialogue with the compiler.
Compiler errors after a structural change frequently reveal:
- ownership assumptions that were previously hidden
- visibility or module-boundary mismatches
- API coupling that was stronger than expected

A good refactor posture is:
- do not panic when the compiler complains
- interpret the complaint as information about the old design
- decide whether the fix should be local or structural

The compiler is not “being annoying.”
It is exposing the real cost of the structural change you just attempted.

---

## Pattern 2 — Separate Boundary Refactors from Internal Refactors

Not every refactor is the same risk level.

### Internal refactor
- private module reorganization
- helper extraction
- visibility narrowing inside the crate
- internal ownership cleanup

### Boundary refactor
- public API surface changes
- error type changes visible to callers
- serialization or interop contract changes
- CLI or protocol output changes

This distinction matters because internal refactors may move fast, while boundary refactors need stronger compatibility reasoning.

---

## Pattern 3 — Prefer Boundary-Based Splits Over Arbitrary File Chopping

When a module or file becomes too large, splitting by line count alone is weak.

Better split questions:
- what responsibilities are mixed here?
- what part is domain logic versus adapter/transport/wiring?
- which feature or use-case boundaries are already present?
- what piece should become reusable/testable on its own?

The doctrine is:
- split where the design seam is real
- not where the editor scrollbar becomes emotionally offensive

---

## Pattern 4 — Visibility Refactors Are High-Leverage, Low-Drama Improvements

Many Rust codebases leak more surface than they intend.
A valuable refactor family is simply tightening visibility.

Examples:
- `pub` -> `pub(crate)`
- `pub(crate)` -> private
- replacing exposed internal module paths with curated re-exports

These changes often improve:
- refactor freedom
- API clarity
- long-term semver safety

They are among the safest and most leverage-rich structural refactors available.

---

## Pattern 5 — Ownership Smells Often Need Structural, Not Cosmetic Fixes

When refactoring around ownership pain, common bad reflexes are:
- adding `.clone()` everywhere
- adding lifetime annotations everywhere
- introducing `Arc<Mutex<T>>` everywhere

A better posture is to ask:
- should the boundary borrow instead?
- should ownership move differently?
- should state be split?
- should coordination use messages instead of shared mutable state?

In Rust, many refactors are ultimately ownership-model clarifications.
Treat them that way.

---

## Pattern 6 — Extract Traits Only When a Boundary Is Real

Trait extraction can be excellent refactoring—but only when there is real pressure:
- alternative implementations
- test seams that reflect a real dependency boundary
- ports/adapters discipline
- extension points that the architecture genuinely wants

It is a bad refactor when the extracted trait exists only to make the design look abstract.

The doctrine is:
- extract traits to clarify substitution boundaries
- not to manufacture abstraction prestige

---

## Pattern 7 — Framework-Led Code Should Usually Be Pushed Outward

A common corrective refactor in Rust is moving logic out of:
- handlers
- routes
- transport adapters
- CLI entrypoints
- generated-interface layers

and into:
- services
- use-cases
- core modules
- typed domain boundaries

This is often where Rust architecture becomes cleaner very quickly.
Because once the boundary is thinner, testing and reasoning improve together.

---

## Pattern 8 — Refactors Should Usually Preserve Existing Tests Before Rewriting Them

If tests exist and are still aligned with the intended boundary, prefer to keep them as a stability harness during refactor.

Only rewrite tests early when:
- they are coupled to the wrong implementation detail
- they block necessary structural improvement
- they no longer represent the intended contract

This matters because the test suite is part of the safety net.
Do not casually dismantle the net before the refactor begins.

---

## Pattern 9 — Large Refactors Need Staging and Clear Intermediate Shapes

For substantial structural changes, choose an intermediate path deliberately.

Examples:
- create a new module and move callers gradually
- preserve old façade, refactor internals first
- add curated re-exports before deleting old paths
- establish parity tests before swapping implementation

The best refactors often look a little indirect at the start.
That is usually the price of keeping risk bounded.

---

## Pattern 10 — Refactoring Ends with Simplification, Not Permanent Transition Scaffolding

Migration shims, temporary adapters, duplicate APIs, compatibility layers, and transitional re-exports are often justified during refactor.

But a refactor is incomplete if those temporary structures silently become permanent without review.

The doctrine is:
- use scaffolding to make the change safe
- then simplify once the new shape is proven

---

## Refactor Checklist

Before declaring a Rust refactor successful, ask:

- [ ] Is the target smell/problem clearly named?
- [ ] Is the protected boundary explicit?
- [ ] Was the refactor family chosen intentionally?
- [ ] Were changes made in compiler-sized, reviewable steps?
- [ ] Did compiler feedback reveal a deeper design issue that should be addressed?
- [ ] Is the resulting structure actually clearer, or only different?
- [ ] Have temporary transition shims been identified as temporary?

---

## Anti-Patterns

- refactoring for aesthetic novelty instead of problem removal
- splitting files/modules without real boundary seams
- adding traits/indirection with no boundary justification
- clone/lifetime/lock patches used instead of ownership redesign
- rewriting tests too early and losing the safety net
- leaving temporary migration scaffolding behind indefinitely
- claiming success because it compiles even though the design is still muddy

---

## Cross-Links

Read this alongside:
- `rust-anti-pattern-detection-and-migration-ladders.md`
- `rust-migration-and-transition.md`
- `../architecture/rust-architecture-and-scaffolding.md`
- `../error-patterns/rust-compiler-error-recovery-patterns.md`
- `../foundations/rust-ownership-cookbook.md`

---

## Final Doctrine

The reusable lesson is not:
> “rename, extract, move, then run cargo check.”

The reusable lesson is:
> “refactor Rust by naming the real structural problem, protecting the right boundary, and using compiler-guided, boundary-aware steps that reduce design debt without replacing it with more subtle debt.”
