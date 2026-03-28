# Rust Async & Concurrency Index

## Purpose

Canonical entrypoint for async runtime and concurrency doctrine.

Use this category when the task is about:

- Tokio runtime choices
- task orchestration and structured concurrency
- channels and coordination patterns
- locks, synchronization, and shared-state models
- structured cancellation and shutdown behavior
- CPU-bound versus I/O-bound routing
- backpressure, bounded parallelism, and runtime health under load

This index is not only a file list.
It exists to route readers into the correct async/concurrency doctrine lane based on the kind of runtime pressure they need to make explicit.

## Source Provenance

- **Primary source:** current canonical async-concurrency subtree under `references/async-concurrency/`
- **Derived from:** async/runtime/channel/coordination donor families and concurrency doctrine canonization passes
- **Upstream URL:** not applicable as a synthesized local navigation index
- **Freshness status:** canonical local index aligned to the current async-concurrency subtree

---

## Async-Concurrency Spine

The async-concurrency subtree now has a clear doctrinal spine:

1. **Workload-first selection law**
   - `rust-concurrency-decision-matrix.md`
2. **Deep runtime and coordination law**
   - `rust-async-concurrency-deep-patterns.md`
3. **Narrow rule routing**
   - `../../rules/async/INDEX.md`
4. **Cross-lane structural and operational links**
   - `../architecture/rust-architecture-decision-trees.md`
   - `../production/rust-production-patterns.md`
   - `../quality/rust-testing-patterns.md`

The doctrine is:
- concurrency reasoning should move from workload shape → coordination family → deeper runtime, ownership, and cancellation patterns → narrower rule detail if needed
- not jump straight into a primitive because it compiles or is popular

---

## Documents and Their Roles

| File | Primary Role | Load When |
| --- | --- | --- |
| `rust-concurrency-decision-matrix.md` | Root doctrine for choosing the right concurrency family by workload shape | you need the concurrency model first |
| `rust-async-concurrency-deep-patterns.md` | Deep doctrine for runtime posture, task ownership, channels, synchronization, cancellation, and backpressure | the family is known, but deeper coordination design is now the problem |
| `../../rules/async/INDEX.md` | Narrower rule routing for specific async/concurrency implementation details | you already know the lane and need exact enforcement-level rules |

---

## Reading Paths

### If you need the root concurrency model first

1. `rust-concurrency-decision-matrix.md`
2. then branch by the dominant runtime pressure

### If the task is about workload-shape selection

1. `rust-concurrency-decision-matrix.md`
2. `../architecture/rust-architecture-decision-trees.md` if the runtime choice is really a larger architecture decision
3. `../production/rust-production-patterns.md` if the wrong choice would become an operational problem under load

### If the task is about Tokio/runtime posture

1. `rust-concurrency-decision-matrix.md`
2. `rust-async-concurrency-deep-patterns.md`
3. `../../rules/async/INDEX.md` for narrower rule detail

### If the task is about channels, task ownership, or coordination shape

1. `rust-concurrency-decision-matrix.md`
2. `rust-async-concurrency-deep-patterns.md`
3. `../production/rust-production-patterns.md` if lifecycle, shutdown, or operational failure pressure dominates

### If the task is about shared mutable state or lock selection

1. `rust-concurrency-decision-matrix.md`
2. `rust-async-concurrency-deep-patterns.md`
3. `../architecture/rust-architecture-decision-trees.md` if the real issue is architectural ownership rather than primitive choice

### If the task is about cancellation, shutdown, or long-lived task lifecycle

1. `rust-async-concurrency-deep-patterns.md`
2. `../production/rust-production-patterns.md`
3. `../../rules/async/INDEX.md` for narrower shutdown/cancellation rule posture

### If the task is about ECS/data-oriented concurrency

1. `rust-concurrency-decision-matrix.md`
2. `../architecture/rust-ecs-and-data-oriented-architecture.md`
3. `rust-async-concurrency-deep-patterns.md` if async/runtime coordination still matters around the ECS core

### If the task is about proving async behavior under stress

1. `rust-async-concurrency-deep-patterns.md`
2. `../quality/rust-testing-patterns.md`
3. `../production/rust-production-patterns.md` if the concern is system behavior under load rather than isolated async correctness

---

## Async-Concurrency Decision Questions

Before choosing a subpage, ask:

1. Is the real pressure about **workload shape**, **task ownership**, **channel/coordination semantics**, **shared state**, **runtime configuration**, or **cancellation/shutdown**?
2. Is this still a concurrency-family selection problem, or already a production or architecture problem disguised as one?
3. Do we need the root matrix first, or are we already certain which concurrency family dominates?
4. Are we optimizing for throughput, safety, lifecycle clarity, or all three?

The doctrine is:
- async docs are organized by runtime and coordination pressure
- not by whichever primitive the engineer happened to think of first

---

## Cross-Links

Async/concurrency doctrine overlaps naturally with these lanes:

- **Architecture**
  - `../architecture/rust-architecture-decision-trees.md`
  - `../architecture/rust-ecs-and-data-oriented-architecture.md`
- **Production**
  - `../production/rust-production-patterns.md`
  - `../production/rust-performance-patterns.md`
- **Quality**
  - `../quality/rust-testing-patterns.md`
- **Root references**
  - `../INDEX.md`

The doctrine is:
- concurrency is where runtime truth becomes explicit
- so it must remain connected to architecture, production, and proof rather than pretending it is only about async syntax or primitive selection

---

## Cleanup-Safe Rule

This index is canonical navigation.
It should point to:

- doctrine pages
- stable canonical category indexes
- governance-aware cross-links

It should **not** depend on donor reservoir paths or historical root-level filenames for its main reading flow.

---

## Final Rule

The reusable lesson is not:
> “async-concurrency is where the Tokio and channel docs live.”

The reusable lesson is:
> “the async-concurrency subtree is the canonical navigation layer for runtime and coordination truth in Rust systems—routing engineers from workload-first concurrency selection into the exact runtime, task-lifecycle, synchronization, or cancellation doctrine they need before concurrency decisions harden into operational risk.”
