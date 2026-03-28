# Rust Library Development and Cargo Mastery

## Purpose

Define the canonical doctrine for building Rust libraries, curating stable public APIs, using Cargo as an architectural tool, and managing multi-crate/library ecosystems without drifting into dependency chaos.

This document sits in the architecture lane because library shape and Cargo posture are structural decisions, not mere package-manager trivia.

It should answer the deeper question:

> how should a Rust codebase behave when it is meant to be consumed, versioned, tested, and evolved as a library or library family?

---

## Source Provenance

- **Primary donor families:** `rust-skills` API/project/lint/test rule families
- **Key local donor materials:**
  - `rust-skills/rules/api-non-exhaustive.md`
  - `rust-skills/rules/api-sealed-trait.md`
  - `rust-skills/rules/lint-cargo-metadata.md`
  - `rust-skills/rules/test-integration-dir.md`
  - `rust-skills/rules/proj-bin-dir.md`
  - `rust-skills/rules/proj-lib-main-split.md`
  - `rust-skills/rules/proj-workspace-large.md`
  - `rust-skills/rules/proj-workspace-deps.md`
  - `rust-skills/rules/proj-prelude-module.md`
  - `rust-skills/rules/proj-pub-use-reexport.md`
  - `rust-skills/rules/proj-pub-crate-internal.md`
  - `rust-skills/rules/proj-pub-super-parent.md`
- **Upstream URL:** not yet fully re-verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending

---

## Core Rule

A Rust library is a promise to future users, not just a crate that happens to compile today.

That promise includes:
- a stable or intentionally evolving public surface
- a coherent Cargo story
- clear feature boundaries
- tests/examples/docs that prove the consumer path
- a release process that treats semver as a real contract

Cargo is therefore not “just dependency configuration.”
It is part of how the library communicates and preserves its architecture.

---

## Library vs Application Posture

| Aspect | Library Default | Application Default |
|---|---|---|
| Error surface | typed and matchable | ergonomic and contextual |
| Runtime choice | avoid forcing one unless boundary requires it | choose a concrete runtime if needed |
| Public API stability | highly important | internal change velocity often higher |
| Dependency policy | conservative | pragmatic |
| MSRV posture | explicit and tested | often looser |
| Feature policy | additive and well-documented | can be simpler or broader |
| Panics | avoid in exposed paths | acceptable only for narrow unrecoverable/invariant cases |

The deeper lesson is:
- library architecture is consumer-facing architecture
- application architecture is operator/runtime-facing architecture

They overlap, but they are not the same job.

---

## Pattern 1 — `lib.rs` Curates the Surface

A good Rust library does not expose its entire internal directory layout as the public API by accident.

`lib.rs` should act as a curation boundary.
It usually owns:
- top-level public modules
- intentional re-exports
- stable entrypoints
- optional prelude only when it genuinely helps consumers

This matters because:
- internal structure should stay free to evolve
- public structure should stay easy to learn and reasonably stable

The public API is not whatever happened to be `pub` first.
It is what you deliberately choose to present.

---

## Pattern 2 — Keep the Public API Smaller Than the Implementation Surface

A library becomes easier to evolve when most of its implementation details are not part of the public contract.

Useful visibility tools include:
- `pub(crate)` for crate-wide internals
- `pub(super)` / `pub(in ...)` for narrower sharing
- private modules and helpers
- selective `pub use` re-exports

The doctrine is:
- implementation breadth can be wide
- exposed contract should be narrow and intentional

This directly improves semver safety and future refactor freedom.

---

## Pattern 3 — Forward Compatibility Needs Deliberate API Design

When public types may evolve, forward-compatibility patterns matter.

### Useful tools
- `#[non_exhaustive]` on public enums/structs when future additions are likely
- builder patterns for extensible configuration
- sealed traits when external implementations would lock the API too early
- constructors instead of public literal-construction when future fields are likely

The point is not to add ceremony everywhere.
The point is to avoid accidental future breakage caused by an overly exposed current surface.

---

## Pattern 4 — Sealed Traits Protect Libraries from Premature Extension Lock-In

Public traits are powerful but dangerous.
Once others can implement them, adding required behavior later may become breaking.

Sealed traits are useful when:
- the crate wants to control implementations
- future method additions are likely
- invariants or correctness guarantees depend on implementation quality

Do not seal traits reflexively.
Seal them when the library would otherwise be promising too much external flexibility too early.

---

## Pattern 5 — Features Must Be Additive, Not Political

A feature system should reduce consumer pain, not create hidden build conflicts.

Strong feature posture includes:
- additive semantics
- explicit documentation
- no feature combinations that quietly invalidate one another
- test coverage for meaningful combinations
- avoiding negative feature naming where opt-in positive naming is clearer

A feature flag is part of the public contract.
Treat it that way.

---

## Pattern 6 — Workspace Cargo Posture Should Reduce Drift, Not Multiply It

When a library ecosystem grows beyond one crate, a workspace can be the right tool.

Good reasons:
- several internal crates share real architectural boundaries
- a core crate, proc-macro crate, CLI, or adapters coexist
- dependency versions need coordinated control
- shared lint/package metadata helps keep the ecosystem coherent

The workspace should reduce:
- version drift
- duplicated dependency declaration noise
- cross-crate inconsistency

A workspace should not be created only to look enterprise-ready.

---

## Pattern 7 — Dependency Inheritance Is Part of Multi-Crate Hygiene

For real workspaces, shared dependency posture is powerful when used deliberately.

Good effects:
- synchronized versions
- smaller conceptual diff surface across crates
- easier upgrade reasoning
- lower risk of accidental duplicate-version sprawl

But keep nuance:
- not every dependency belongs at workspace scope
- optional dependencies and crate-specific concerns may still be local

The doctrine is:
- centralize what is truly shared
- localize what is truly specific

---

## Pattern 8 — Package Metadata Is Part of Professional Library Quality

Published libraries should not feel anonymous or unfinished.

Cargo/package metadata should make the crate:
- discoverable
- attributable
- trustable
- navigable on docs.rs and crates.io

Useful metadata includes:
- description
- license
- repository
- rust-version / MSRV posture
- documentation/readme
- keywords/categories when they truly help discovery

This is why `clippy::cargo`-style metadata discipline matters for published crates.
It is not vanity. It is ecosystem hygiene.

---

## Pattern 9 — Testing Must Exercise the Consumer Boundary

A library should not rely only on unit tests buried in internals.

Strong posture includes:
- unit tests for internal behavior
- integration tests in `tests/` for public API usage
- examples that reflect real consumer use
- benchmarks where performance is part of the library's promise

Integration tests matter because they simulate the library being used from the outside.
That is often where API awkwardness or accidental leakage becomes visible.

---

## Pattern 10 — Examples and Docs Are Part of the Library Surface

A library that compiles but is hard to understand is still weakly designed.

Strong library doctrine expects:
- docs.rs-friendly output
- examples that prove intended usage
- public items documented enough that consumers can succeed without source-diving first

This is why library development and documentation discipline are tightly coupled.

---

## Pattern 11 — Multiple Binaries Belong Under `src/bin/` When They Are Part of the Package Story

A library-oriented repo may also ship supporting binaries.
When that happens:
- shared logic belongs in the library surface
- binaries stay thin and focused
- `src/bin/` keeps binary identity explicit

This helps avoid turning one crate into an unclear mix of app code and reusable logic.

---

## Pattern 12 — Publishing Is a Validation Event, Not a Final Button Press

Before publishing a library, the crate should usually survive:
- local tests
- docs build
- lint checks
- package inspection
- publish dry-run
- semver/API checks where appropriate

The doctrinal point is:
- `cargo publish` should be the end of a validated release path
- not the first time the artifact is inspected seriously

---

## Pattern 13 — Cargo Tooling Is Part of the Maintenance Contract

Useful tools often include:
- `cargo nextest`
- `cargo deny`
- `cargo audit`
- `cargo machete`
- `cargo semver-checks`
- docs/build/lint commands in CI or local release workflows

These tools are not the architecture.
But they help keep the architecture honest over time.

---

## Pattern 14 — Library Crates Should Avoid Unnecessary Runtime or Ecosystem Lock-In

A reusable library should be careful about prematurely forcing:
- one async runtime
- one logging backend
- one global execution model

Sometimes such coupling is justified.
Often it is not.

The default question should be:
- does the library truly need to choose this for the consumer?
- or can it remain more broadly interoperable?

This is a major difference between library and application posture.

---

## Audit Checklist

Before calling a Rust library/Cargo surface healthy, ask:

- [ ] Is the public API intentionally curated in `lib.rs`?
- [ ] Are internal visibility boundaries tighter than the external contract?
- [ ] Are forward-compatibility patterns used where future evolution is likely?
- [ ] Are feature flags additive and documented?
- [ ] Is the workspace justified by real architectural boundaries?
- [ ] Does Cargo metadata support discoverability and trust?
- [ ] Do integration tests exercise the real consumer surface?
- [ ] Is the publish/release path validated before actual publish?

---

## Anti-Patterns

- exposing internal layout directly as public API
- public types that cannot evolve safely but obviously want to
- negative or mutually destructive feature-flag design
- workspace sprawl without real boundaries
- published crates with weak or missing metadata
- relying only on unit tests for a public library
- forcing runtime/backend choices where a library could remain generic
- treating `cargo publish` as the start of validation instead of the end

---

## Cross-Links

Read this alongside:
- `rust-architecture-and-scaffolding.md`
- `rust-architecture-decision-trees.md`
- `../quality/rust-public-api-documentation-and-trait-surface-discipline.md`
- `../quality/rust-style-and-lint-governance.md`
- `../production/rust-sdk-ci-and-multi-surface-release-pipelines.md`
- `../ecosystem/rust-crate-ecosystem-navigator.md`

---

## Final Doctrine

The reusable lesson is not:
> “know Cargo features and publishing commands.”

The reusable lesson is:
> “treat a Rust library as a long-lived public contract whose API, Cargo posture, feature system, tests, and publish workflow must all support future evolution rather than accidental lock-in or drift.”
