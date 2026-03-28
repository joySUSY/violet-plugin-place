# Rust Migration and Transition

## Purpose

Define the canonical playbook doctrine for moving systems, modules, or behaviors into Rust—or between different Rust architectural states—without losing correctness, observability, or team confidence.

This document exists because migration is not just a rewrite exercise.
It is a transition of:
- contracts
- behavior
- ownership models
- runtime assumptions
- release risk

The real question is not:
> how do we rewrite this in Rust?

The real question is:
> how do we change systems safely while preserving the right truths and intentionally transforming the wrong ones?

---

## Source Provenance

- **Primary donor families:** local migration reservoir material, `rust-skills` project/type/error/ownership families, cross-language workflow doctrine
- **Key local donor materials:**
  - current `rust-cross-language-workflows.md`
  - current `rust-architecture-and-scaffolding.md`
  - current `rust-anti-pattern-detection-and-migration-ladders.md`
  - `RUST_COMPREHENSIVE_REQUIREMENTS.md`
- **Upstream URL:** not yet fully re-verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending

---

## Core Rule

A migration succeeds when the team knows exactly:
1. what behavior must stay equivalent
2. what behavior is intentionally allowed to change
3. where the new Rust boundaries begin
4. how risk is staged and verified during transition

If those are unclear, the migration is still mostly optimism.

---

## Migration Taxonomy

| Migration Type | Typical Example | Primary Risk |
|---|---|---|
| Cross-language replacement | Python/C/JS module moving to Rust | parity drift, contract mismatch |
| Internal Rust restructuring | flat crate -> workspace, concrete type -> clearer boundaries | refactor risk, API churn |
| Boundary hardening | stringly or dynamic boundary -> typed Rust boundary | compatibility breaks if introduced too abruptly |
| Runtime model transition | sync -> async, lock-heavy -> message-driven, single-thread -> multi-thread | operational behavior changes |

Not every migration is the same family.
The first job is to name the family correctly.

---

## Migration Workflow

### Step 1 — Analyze the current system honestly
Identify:
- current behavior and inputs/outputs
- hidden dynamic assumptions
- error shapes and side effects
- what downstream systems depend on
- what tests or fixtures already represent the current truth

This is not optional.
A migration built on guessed source behavior is already unstable.

### Step 2 — Define what must be preserved
Create a preservation boundary:
- API behavior
- output shape/order
- serialization/contracts
- error semantics visible to consumers
- performance constraints if they are part of the promise

Also define what may intentionally change.
Otherwise every difference later becomes an argument instead of a decision.

### Step 3 — Choose the transition shape
Common shapes include:
- big-bang replacement
- adapter-backed staged replacement
- mirrored implementation with parity tests
- façade with gradual subsystem swaps

The more operationally risky the system, the more a staged transition usually helps.

### Step 4 — Transform into Rust-native structure
Do not write “the old language in Rust syntax.”
Move toward:
- stronger types
- explicit fallibility
- ownership honesty
- feature/boundary/module clarity

But do this in the right place:
- preserve behavior at the boundary first
- internal Rust-native improvement can grow from there

### Step 5 — Validate equivalence and intentional differences
Use:
- fixtures
- golden outputs
- integration tests
- parity checks
- benchmark comparisons if performance is part of the migration story

Only after validation should the old path be retired.

---

## Pattern 1 — Preserve Boundary Behavior Before Chasing Internal Elegance

One of the easiest migration mistakes is to improve internal architecture immediately and accidentally break the consumer-visible contract.

A healthier order is often:
1. preserve the external contract
2. verify parity
3. then evolve internals toward stronger Rust-native structure

This matters because migrations fail socially as often as they fail technically.
If the system stops behaving the way its consumers expect, the migration loses trust quickly.

---

## Pattern 2 — Parse at the Edge, Strengthen Internally

When migrating from dynamic or loosely typed systems, a useful transition pattern is:
- accept the old external shape at the edge
- parse/validate into stronger Rust types as early as possible
- keep the inside more explicit and less stringly/dynamic

This lets the migration preserve compatibility while still gaining Rust's core benefits.

It is often better than trying to force the outside world to change all at once.

---

## Pattern 3 — Use Parity Tests Where Two Implementations Coexist

If an old implementation remains alive during transition, establish explicit parity checks.

Questions to answer:
- what outputs must match exactly?
- what differences are acceptable?
- what fixtures define the truth?
- how will failures be diagnosed and approved?

Without parity discipline, “temporary coexistence” turns into drift and folklore.

This pattern is especially important for:
- Python ↔ Rust parity work
- C → Rust staged replacement
- old CLI/new CLI output compatibility
- generated artifact compatibility

---

## Pattern 4 — Adapters and Façades Are Migration Tools, Not Permanent Excuses

During transition, adapters and façades can buy safety.
They can:
- isolate new Rust code from legacy internals
- provide stable old interfaces while internals change
- support staged replacement

But they should not become permanent hiding places for unresolved boundary confusion.

The doctrine is:
- use migration scaffolding to reduce risk
- then simplify once the new boundary is stable

---

## Pattern 5 — Cross-Language Migrations Need Ownership and Runtime Translation, Not Just Syntax Translation

When moving code from Python, C, JS, or other ecosystems into Rust, migration work must address more than syntax.

Important transition questions:
- who owns data now?
- what is copy vs borrow vs shared state?
- how does fallibility translate?
- what runtime model changes (sync/async/threading/event loop) are introduced?
- how do packaging/release surfaces change?

This is why cross-language workflow doctrine is tightly linked to migration doctrine.

---

## Pattern 6 — Runtime Model Transitions Need Operational Validation

If the migration changes the runtime model, treat that as a serious architectural transition.

Examples:
- blocking code -> async executor
- shared state -> channels/actors
- single binary -> workspace/multi-surface layout
- local-only flow -> distributed or service flow

These transitions affect:
- shutdown behavior
- error timing
- concurrency bugs
- observability needs
- operator expectations

Do not call the migration complete if the runtime story changed but operational validation did not happen.

---

## Pattern 7 — Migration Often Needs Intermediate Architectural Shapes

The final ideal structure is not always the first safe landing zone.

Sometimes the best path is:
- legacy-compatible first shape
- then a second structural cleanup pass into the cleaner Rust-native architecture

This is normal.
The mistake is pretending the intermediate shape is either:
- the final target
nor
- a failure

Intermediate structure is often how risk is managed responsibly.

---

## Pattern 8 — Deletion Comes Last, After Verified Replacement

A healthy migration posture does not erase the old path prematurely.

Before removal, the team should usually know:
- the replacement is behaviorally validated
- critical consumers have been checked
- release/deployment posture is ready
- rollback understanding exists if needed

This aligns with the broader rule you already locked:
- broken-looking or legacy-looking code is not automatically disposable
- migration artifacts and fallback paths must be understood before removal

---

## Migration Checklist

Before declaring a Rust migration successful, ask:

- [ ] Have we classified the migration type correctly?
- [ ] Is the preserved boundary explicit?
- [ ] Are intentional behavior changes documented?
- [ ] Is the transition shape (big-bang / staged / parity / adapter-backed) chosen deliberately?
- [ ] Has the code moved toward Rust-native structure without breaking the preserved boundary prematurely?
- [ ] Are parity/equivalence checks strong enough for the consumer impact?
- [ ] If the runtime model changed, was operational behavior validated too?
- [ ] Is old code being retired only after verified replacement?

---

## Anti-Patterns

- rewriting before understanding the source behavior
- mixing behavior preservation and architecture redesign without boundaries
- calling syntax translation a migration strategy
- deleting legacy paths before replacement validation
- coexisting implementations with no parity harness
- treating adapters/façades as permanent hiding places for unfinished transition work
- introducing async/runtime changes without operational validation

---

## Cross-Links

Read this alongside:
- `rust-cross-language-workflows.md`
- `rust-anti-pattern-detection-and-migration-ladders.md`
- `rust-architecture-and-scaffolding.md`
- `rust-library-development-and-cargo-mastery.md`
- `rust-performance-patterns.md`

---

## Final Doctrine

The reusable lesson is not:
> “analyze, plan, transform, validate.”

The reusable lesson is:
> “treat migration as a managed transition of contracts, ownership, runtime assumptions, and release risk—preserve the right truths first, evolve toward Rust-native strength second, and delete old paths only after verified replacement.”
