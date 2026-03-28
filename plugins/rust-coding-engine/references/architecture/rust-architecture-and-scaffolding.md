# Rust Architecture and Scaffolding

## Purpose

Define the canonical doctrine for shaping Rust projects, choosing structure proportionate to scale, and deciding when a codebase should stay flat, become modular, or grow into a workspace.

This document sits at the root of the architecture lane.
It should answer the first structural questions before more specialized doctrine takes over.

It is not a monorepo fetish document.
It is a proportionality document.

---

## Source Provenance

- **Primary donor families:** `rust-skills` project-structure rule family, `clean-architecture-with-rust-master`, `implementing-hexagonal-axum`, `rust-axum-framework`, `rust-fullstack`
- **Key local donor materials:**
  - `rust-skills/rules/proj-flat-small.md`
  - `rust-skills/rules/proj-lib-main-split.md`
  - `rust-skills/rules/proj-workspace-large.md`
  - `rust-skills/rules/proj-workspace-deps.md`
  - `rust-skills/rules/proj-mod-by-feature.md`
  - `rust-skills/rules/proj-mod-rs-dir.md`
  - `rust-skills/rules/proj-prelude-module.md`
  - `rust-skills/rules/proj-pub-use-reexport.md`
  - `rust-skills/rules/proj-pub-crate-internal.md`
  - `rust-skills/rules/proj-pub-super-parent.md`
  - `RUST_COMPREHENSIVE_REQUIREMENTS.md`
- **Upstream URL:** not yet fully re-verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending

---

## Core Rule

Rust structure should scale with architectural pressure.

The right project shape is not the most impressive one.
It is the smallest structure that keeps these things clear:
- boundaries
- ownership of responsibilities
- public vs internal surfaces
- testability
- growth path

That means:
- small projects should stay flat longer than many people think
- larger systems should become explicit sooner than many people admit

---

## Scale Ladder

| Level | Typical Pressure | Recommended Shape |
|---|---|---|
| L0 — small script/utility | one task, tiny codebase, short lifetime | single `main.rs` or very flat `src/` |
| L1 — small app/library | a handful of concepts, modest growth | flat modules + `lib.rs`/`main.rs` split when logic grows |
| L2 — service / medium application | multiple features, external boundaries, tests matter | modular feature folders or layered modules |
| L3 — large system / multi-surface platform | many domains, many adapters, long life | workspace with explicit crate boundaries |

The ladder is not about line count fetishism.
It is about complexity pressure, team navigation cost, and how expensive ambiguity has become.

---

## Pattern 1 — Keep Small Projects Flat

Over-structuring a tiny Rust project creates navigation overhead without buying clarity.

A small project often works best with:
- `src/main.rs`
- a few sibling modules in `src/`
- no needless `core/`, `domain/`, `application/`, `infrastructure/` theater

Good reasons to stay flat:
- the concepts are still few
- files are still easy to find
- boundaries are not yet under real stress

Bad reasons to add deep structure early:
- "it looks more professional"
- copying an enterprise pattern before the pressure exists
- creating folders with one file each and many empty `mod.rs` files

---

## Pattern 2 — Split `main.rs` and `lib.rs` When Logic Wants to Be Tested

Once logic becomes more than entrypoint glue, move it out of `main.rs`.

A good default is:
- `main.rs` owns startup, argument/env capture, and top-level wiring
- `lib.rs` owns the reusable/testable application logic and public exports

This matters because:
- integration tests can target the library surface
- binaries stay thinner and easier to reason about
- the project gains a more stable internal center of gravity

`main.rs` should launch the system.
It should not become the entire system.

---

## Pattern 3 — Organize by Feature or Boundary, Not Just by Technical Kind

As a Rust project grows, organizing purely by technical type often scatters related code across too many places.

Examples of type-based sprawl:
- `controllers/`
- `services/`
- `models/`
- `repositories/`

Feature or boundary grouping often works better because it keeps related behavior closer together.

For example:
- `user/`
- `order/`
- `billing/`
- `shared/`

This is not a dogma.
It is a strong default because most real changes are feature-shaped, not type-shaped.

---

## Pattern 4 — Use Workspaces When Boundaries Become Real, Not Decorative

A workspace is appropriate when the system truly has multiple long-lived concerns that deserve crate boundaries.

Good reasons for a workspace:
- separate core/domain from adapters
- multiple binaries or surfaces sharing a real core
- library + CLI + server + bindings in one repo
- distinct internal crates with meaningful dependency directions
- publish/release boundaries that differ

Weak reasons for a workspace:
- aesthetic preference only
- predicted scale with no current evidence
- trying to look “serious” before the problem is serious

A workspace should clarify architectural truth.
If it mostly adds ceremony, it is too early.

---

## Pattern 5 — Workspace Dependency Inheritance Should Reduce Drift

Once a workspace exists, shared dependency posture matters.

Good workspace practice includes:
- central dependency version control where justified
- shared lint posture where justified
- resolver/version strategy made explicit
- member crates inheriting shared dependencies rather than drifting independently

This is not only about convenience.
It reduces:
- version drift
- duplicated compile cost
- hard-to-explain multi-crate inconsistency

---

## Pattern 6 — Visibility Is a Structural Tool

Rust gives you more visibility levels than just public/private.
Use them deliberately.

### `pub`
Use for actual public API.

### `pub(crate)`
Use for crate-wide internals that should not leak outward.

### `pub(super)` / `pub(in ...)`
Use for narrower internal sharing when parent/module-tree visibility is enough.

This matters because an architecture is partly encoded in who is allowed to see what.
The public surface should be intentionally small.
The internal surface can stay more flexible when visibility is constrained.

---

## Pattern 7 — Re-Exports Can Make Public APIs Cleaner

Internal organization does not have to be identical to public organization.

Good re-export posture allows:
- internal modules to stay organized by feature or concern
- users to access a flatter, more ergonomic public API
- internal refactors without forcing public-path churn unnecessarily

Related patterns:
- careful `pub use`
- optional `prelude` modules when the crate benefits from them
- conservative export of only the items that should define the crate's external identity

The doctrine is:
- internal structure should serve maintainers
- public structure should serve consumers

They are related, but not identical.

---

## Pattern 8 — Structure Should Support Evolution, Not Freeze It Prematurely

Good scaffolding should make growth easy.

Useful questions:
- if this project doubles in complexity, where does the next split happen?
- if a second delivery surface is added, what moves into a shared crate?
- if more adapters appear, where do ports and infrastructure separate?
- if one module becomes crowded, is the split obvious?

A strong scaffolding choice is one that gives a clean next move.

---

## Pattern 9 — Architecture Choice Depends on Boundary Pressure

This document is the structural baseline, not the final architecture choice.

Once the shape is larger than a simple project, other canonical docs should take over:
- `rust-architecture-decision-trees.md`
- `rust-axum-service-architecture-and-thin-adapters.md`
- `rust-library-development-and-cargo-mastery.md`
- repo case studies under `../repo-cases/`

This matters because scaffolding should open the door to the right architecture, not pretend to answer every architecture question itself.

---

## Pattern 10 — Observability and Operational Surfaces Should Not Be Bolted On Last

A project structure is healthier when it leaves clear homes for:
- config
- error surfaces
- tracing/logging
- health/readiness endpoints or checks
- benchmarks and integration tests

This does not mean every tiny project needs a full production scaffold.
It means that when those concerns matter, the structure should accommodate them intentionally instead of treating them as random leftovers.

---

## Scaffolding Checklist

Before finalizing a Rust project shape, ask:

- [ ] Is the current structure proportionate to real complexity?
- [ ] Is `main.rs` thin enough?
- [ ] Are features or boundaries easier to find than technical layers?
- [ ] Is a workspace justified by real boundaries rather than aesthetics?
- [ ] Is the public API smaller than the internal implementation surface?
- [ ] Does the structure suggest a clean next refactor as the project grows?

---

## Anti-Patterns

- enterprise layering for a tiny project
- giant `main.rs` with untestable application logic
- technical-kind folder sprawl that hides feature cohesion
- workspaces created for prestige instead of boundary clarity
- exposing everything as `pub`
- deep module nesting with little actual semantic gain
- public API paths tied too tightly to current internal folder layout

---

## Cross-Links

Read this alongside:
- `rust-architecture-decision-trees.md`
- `rust-library-development-and-cargo-mastery.md`
- `rust-axum-service-architecture-and-thin-adapters.md`
- `../foundations/rust-foundations-ownership-memory-safety.md`
- `../repo-cases/INDEX.md`

---

## Final Doctrine

The reusable lesson is not:
> “use flat structure for small projects and workspaces for large ones.”

The reusable lesson is:
> “shape Rust projects according to real boundary pressure: stay flatter than your ego wants when the system is small, and become more explicit than your inertia wants when the system grows.”
