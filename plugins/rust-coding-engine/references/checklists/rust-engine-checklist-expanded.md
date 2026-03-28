# Rust Engine Checklist Expanded

## Purpose

Provide the expanded audit map behind the Rust engine checklist.

This document is not a duplicate of every donor rule file.
Instead, it organizes the Rust rule universe into **canonical family lanes** that route into the current doctrine tree and rule indexes.

That makes it cleanup-safe and still useful after donor reservoirs are reduced or archived.

---

## Source Provenance

- **Primary source:** current Rust checklist lane under `references/checklists/`
- **Derived from:** the legacy 179-rule donor surface after cleanup-safe recategorization into family audit lanes and canonical doctrine entrypoints
- **Upstream URL:** not applicable as a synthesized local audit map
- **Freshness status:** canonical local expanded checklist aligned to the current Rust doctrine tree

---


## How to Use

Use this expanded checklist when:
- a rapid checklist is not enough
- you are doing a serious architecture or code-quality review
- you need to know which rule family to consult next
- you want broad coverage without linking directly to cleanup-candidate donor files

Workflow:
1. find the relevant rule family below
2. open the canonical doctrine entrypoints first
3. open the corresponding `rules/*/INDEX.md`
4. only then consult donor rule families if narrower granularity is still required

---

## Rule Family Audit Map

| Family | Approx. legacy rule count | What it covers | Canonical doctrine first | Rule index |
|---|---:|---|---|---|
| anti | 15 | recurring Rust anti-patterns | `../playbooks/rust-anti-pattern-detection-and-migration-ladders.md` | use related lane index below |
| api | 15 | public API shape, typestate, builders, trait boundaries | `../architecture/rust-library-development-and-cargo-mastery.md`, `../foundations/rust-idiomatic-style-and-patterns.md` | `../../rules/api/INDEX.md` |
| async | 15 | runtime, spawning, channels, cancellation, async coordination | `../async-concurrency/rust-concurrency-decision-matrix.md`, `../async-concurrency/rust-async-concurrency-deep-patterns.md` | `../../rules/async/INDEX.md` |
| doc | 11 | rustdoc sections, intra-doc links, module docs, examples | `../quality/rustdoc-mastery.md`, `../quality/rust-doc-examples-discipline.md` | `../../rules/style/INDEX.md` |
| err | 12 | error surface selection, context, panic discipline | `../error-patterns/rust-error-handling-patterns.md`, `../error-patterns/result-option-match-posture.md` | `../../rules/error/INDEX.md` |
| lint | 11 | lint/fmt/doc gate enforcement | `../quality/rust-style-and-lint-governance.md`, `../quality/rust-workspace-lint-pipeline-discipline.md` | `../../rules/style/INDEX.md` |
| mem | 15 | allocations, reuse, zero-copy, data movement | `../foundations/rust-ownership-cookbook.md`, `../production/rust-performance-patterns.md` | `../../rules/perf/INDEX.md` |
| name | 16 | naming semantics, cost-signaling names, bool naming | `../foundations/rust-idiomatic-style-and-patterns.md` | `../../rules/style/INDEX.md` |
| opt | 12 | release profiles, PGO/LTO/CPU tuning, inlining | `../production/rust-performance-patterns.md` | `../../rules/perf/INDEX.md` |
| own | 12 | ownership, borrowing, lifetimes, smart-pointer families | `../foundations/rust-foundations-ownership-memory-safety.md`, `../foundations/rust-ownership-cookbook.md` | `../../rules/ownership/INDEX.md` |
| perf | 11 | measurement, data structures, hot-path discipline | `../production/rust-performance-patterns.md` | `../../rules/perf/INDEX.md` |
| proj | 11 | structure, workspaces, visibility, re-exports | `../architecture/rust-architecture-and-scaffolding.md`, `../architecture/rust-library-development-and-cargo-mastery.md` | `../../rules/api/INDEX.md` |
| test | 13 | unit/integration/async/property/doctest/benchmark posture | `../quality/rust-testing-patterns.md`, `../quality/rust-quality-testing-benchmarking-documentation.md` | `../../rules/testing/INDEX.md` |
| type | 10 | enums, newtypes, fallibility, phantom/repr guidance | `../foundations/rust-idiomatic-style-and-patterns.md`, `../foundations/rust-foundations-ownership-memory-safety.md` | `../../rules/api/INDEX.md` |

Total legacy donor rule surface represented here: **179**.

---

## Family-by-Family Review Prompts

### 1. Ownership / Type Integrity Review
- [ ] Are ownership and borrowing choices honest rather than patched with clone spam?
- [ ] Are semantically distinct values modeled as distinct types where needed?
- [ ] Do lifetimes explain real relationships rather than act as noise?
- [ ] Are shared ownership and interior mutability patterns justified by runtime semantics?

Primary reads:
- `../foundations/rust-foundations-ownership-memory-safety.md`
- `../foundations/rust-ownership-cookbook.md`
- `../../rules/ownership/INDEX.md`
- `../../rules/api/INDEX.md`

### 2. Error / Failure Review
- [ ] Does the boundary expose the right error surface for its consumers?
- [ ] Are panic and `unwrap` disciplined instead of casual?
- [ ] Is context added where it clarifies, not where it bloats?
- [ ] Are interop or foreign runtime boundaries translating errors safely?

Primary reads:
- `../error-patterns/rust-error-handling-patterns.md`
- `../error-patterns/result-option-match-posture.md`
- `../error-patterns/rust-compiler-error-recovery-patterns.md`
- `../../rules/error/INDEX.md`

### 3. Async / Concurrency Review
- [ ] Does the chosen concurrency model fit the workload?
- [ ] Are task lifecycle, cancellation, and shutdown explicit?
- [ ] Are channels and synchronization primitives expressing the right coordination semantics?
- [ ] Are locks, blocking work, and backpressure handled honestly?

Primary reads:
- `../async-concurrency/rust-concurrency-decision-matrix.md`
- `../async-concurrency/rust-async-concurrency-deep-patterns.md`
- `../../rules/async/INDEX.md`

### 4. Architecture / Project Structure Review
- [ ] Is the structure proportional to the system's complexity?
- [ ] Are feature or boundary groupings clearer than technical-kind sprawl?
- [ ] Does the workspace or crate split represent real boundaries?
- [ ] Is the public API meaningfully smaller than the internal surface?

Primary reads:
- `../architecture/rust-architecture-and-scaffolding.md`
- `../architecture/rust-library-development-and-cargo-mastery.md`
- `../architecture/rust-architecture-decision-trees.md`
- `../../rules/api/INDEX.md`

### 5. Quality / Docs / Style Review
- [ ] Do tests prove the right boundaries?
- [ ] Are docs, examples, and rustdoc surfaces trustworthy and navigable?
- [ ] Are style/lint/fmt/doc gates removing review noise effectively?
- [ ] Are common trait surfaces and public docs strong enough for real consumers?

Primary reads:
- `../quality/rust-quality-testing-benchmarking-documentation.md`
- `../quality/rust-testing-patterns.md`
- `../quality/rustdoc-mastery.md`
- `../quality/rust-public-api-documentation-and-trait-surface-discipline.md`
- `../../rules/style/INDEX.md`
- `../../rules/testing/INDEX.md`

### 6. Performance / Production Review
- [ ] Has the real bottleneck been measured?
- [ ] Are allocations, copies, locality, and hot paths treated intentionally?
- [ ] Are release profile and deployment tuning justified by production reality?
- [ ] Are observability, shutdown, and release posture strong enough for operation?

Primary reads:
- `../production/rust-performance-patterns.md`
- `../production/rust-production-patterns.md`
- `../production/rust-logging-and-observability-best-practices.md`
- `../production/rust-sdk-ci-and-multi-surface-release-pipelines.md`
- `../../rules/perf/INDEX.md`

---

## Cleanup-Safe Rule

This expanded checklist deliberately routes through:
- canonical doctrine docs
- canonical rule indexes
- family identifiers only

It must **not** depend on cleanup-sensitive donor filesystem paths as its primary navigation path.
If narrower donor rule lookup is needed, use the relevant rule index to reach the provenance family safely.
