# Rust Engine Checklist

## Purpose

Provide the canonical operational checklist for reviewing or finishing Rust work inside `rust-coding-engine`.

This checklist is intentionally compact.
It is designed for real execution use:
- before claiming work complete
- during code review
- before merge or release
- when doing a rapid health pass on a Rust change

It summarizes doctrine.
It does not replace the deeper reference system.

---

## Source Provenance

- **Primary source:** current Rust checklist lane under `references/checklists/`
- **Derived from:** rule-family audit synthesis plus the canonical doctrine/rule-index routing model
- **Upstream URL:** not applicable as a synthesized local checklist surface
- **Freshness status:** canonical local checklist aligned to the current Rust doctrine tree

---


## How to Use

1. Identify the change boundary (library, service, async system, interop, performance-sensitive code, etc.)
2. Run the core checklist sections that always apply
3. Run the lane-specific checklist sections that match the task
4. If any item is uncertain, follow the linked canonical doctrine or rule index before deciding

---

## Core Completion Checklist

### 1. Safety and Failure Discipline
- [ ] No casual `unwrap()` / `expect()` in production paths unless a true invariant justifies it
- [ ] Fallible boundaries expose the right error surface for their consumers
- [ ] Any `unsafe` usage has explicit safety justification and narrow scope
- [ ] Panic does not leak across interop or library public boundaries unintentionally

Primary reads:
- `../foundations/rust-foundations-ownership-memory-safety.md`
- `../error-patterns/rust-error-handling-patterns.md`
- `../../rules/error/INDEX.md`

### 2. Ownership and API Honesty
- [ ] Borrowed inputs are used where ownership is unnecessary (`&str`, `&[T]`, `&Path`, etc.)
- [ ] Clone/copy/allocation choices are deliberate, not borrow-checker escape hatches
- [ ] Newtypes/enums/typestates are used where they clarify semantic boundaries
- [ ] Public surface is smaller than implementation surface

Primary reads:
- `../foundations/rust-foundations-ownership-memory-safety.md`
- `../foundations/rust-idiomatic-style-and-patterns.md`
- `../foundations/rust-ownership-cookbook.md`
- `../../rules/ownership/INDEX.md`
- `../../rules/api/INDEX.md`

### 3. Testing and Quality Proof
- [ ] Unit/integration/async/property tests match the actual boundary being claimed
- [ ] Public docs/examples remain truthful and runnable where appropriate
- [ ] Quality gates (fmt/lint/test/doc) that matter for this crate or workspace have been considered
- [ ] Benchmarks are used only where performance claims or regression protection justify them

Primary reads:
- `../quality/rust-quality-testing-benchmarking-documentation.md`
- `../quality/rust-testing-patterns.md`
- `../quality/rustdoc-mastery.md`
- `../../rules/testing/INDEX.md`
- `../../rules/style/INDEX.md`

---

## Lane-Specific Checklist

### Library / Public Crate Lane
- [ ] `lib.rs` intentionally curates the public API
- [ ] Forward-compatibility posture is appropriate (`#[non_exhaustive]`, builders, sealed traits, etc.)
- [ ] Cargo features are additive and documented
- [ ] Package metadata and publish posture are credible for an external consumer

Primary reads:
- `../architecture/rust-library-development-and-cargo-mastery.md`
- `../quality/rust-public-api-documentation-and-trait-surface-discipline.md`
- `../../rules/api/INDEX.md`

### Async / Concurrency Lane
- [ ] CPU-heavy work is not starving async executors
- [ ] No lock guards are held across `.await`
- [ ] Channel choice matches coordination semantics (`mpsc`, `oneshot`, `broadcast`, `watch`)
- [ ] Cancellation, backpressure, and shutdown behavior are explicit

Primary reads:
- `../async-concurrency/rust-concurrency-decision-matrix.md`
- `../async-concurrency/rust-async-concurrency-deep-patterns.md`
- `../../rules/async/INDEX.md`

### Interop Lane
- [ ] Boundary lane is correctly identified (C/C++, PyO3, NAPI, WASM, Tauri, Rust–TS contracts)
- [ ] Ownership / panic / error / packaging boundaries are explicit
- [ ] Consumer-side or boundary-level verification exists where relevant
- [ ] Generated contract outputs or artifacts are deterministic and reviewable where applicable

Primary reads:
- `../interop/rust-ffi-and-interop-overview.md`
- `../interop/rust-interop-testing-and-audit-discipline.md`
- `../interop/INDEX.md`
- `../../rules/error/INDEX.md`

### Performance Lane
- [ ] Performance claims are based on measurement, not intuition
- [ ] Algorithm/data-structure problems were considered before micro-optimization
- [ ] Allocation/copy/locality posture in hot paths is reasonable
- [ ] Release/profile/CPU-specific tuning is deployment-justified, not cargo-culted

Primary reads:
- `../production/rust-performance-patterns.md`
- `../../rules/perf/INDEX.md`

### Production / Service Lane
- [ ] Configuration fails clearly and early enough
- [ ] Runtime blocking, shutdown, and failure behavior match production expectations
- [ ] Logs/traces/metrics/health surfaces are strong enough for incidents
- [ ] Release/dependency/deployment posture is explicit enough to operate safely

Primary reads:
- `../production/rust-production-patterns.md`
- `../production/rust-logging-and-observability-best-practices.md`
- `../production/rust-sdk-ci-and-multi-surface-release-pipelines.md`

### Architecture / Workspace Lane
- [ ] Flat vs module vs workspace structure matches real complexity pressure
- [ ] Feature/boundary organization is clearer than type-sprawl organization
- [ ] Visibility (`pub`, `pub(crate)`, `pub(super)`) reflects intended boundaries
- [ ] The current structure leaves a clean next move as the system grows

Primary reads:
- `../architecture/rust-architecture-and-scaffolding.md`
- `../architecture/rust-architecture-decision-trees.md`
- `../architecture/INDEX.md`

---

## Minimal “Ready to Claim Done” Gate

Before saying Rust work is done, you should usually be able to say yes to all of these:
- [ ] The boundary was identified correctly
- [ ] The strongest relevant canonical doctrine was consulted
- [ ] Errors, ownership, and test posture align with the boundary
- [ ] No critical unresolved safety/runtime/operational ambiguity remains

---

## Rule

Use this checklist for operational verification.
Use the expanded checklist for deeper audit coverage.
Use the doctrine docs when any item is genuinely uncertain.
