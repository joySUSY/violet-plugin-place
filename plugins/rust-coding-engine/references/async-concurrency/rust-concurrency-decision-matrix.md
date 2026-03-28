# Rust Concurrency Decision Matrix

## Purpose

Provide a canonical decision matrix for choosing concurrency models in Rust.

This document turns concurrency into an architecture choice with explicit trade-offs rather than a bag of primitives.

---

## Source Provenance

- **Primary donor families:** `rust-skills`, `bevy` / `bevy-ecs` donor family
- **Key local donor materials:**
  - `RUST_COMPREHENSIVE_REQUIREMENTS.md`
  - `VIOLET_RUST_NEEDS_ANALYSIS.md`
  - `rust-skills/rules/async-*.md`
  - `bevy/bevy/SKILL.md`
  - `bevy-ecs/bevy-ecs/SKILL.md`
- **Upstream URL:** not yet verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending

---


## Core Rule

Do not start with the primitive.
Start with the workload shape.

Ask first:
- is this CPU-bound or I/O-bound?
- is shared state truly necessary?
- do tasks need isolation or collaboration?
- does ordering matter?
- is thread safety required or only parallelism?

Then choose the model.

---

## Decision Matrix

| Situation | Primary Choice | Why |
|---|---|---|
| High-concurrency network/file I/O | Tokio async tasks | Efficient for many waiting tasks |
| CPU-bound parallel computation | rayon or threads | Avoid blocking async runtime |
| Mixed I/O + CPU | Tokio + `spawn_blocking` / rayon bridge | Keep I/O async while isolating CPU work |
| Shared mutable state across threads | `Arc<Mutex<T>>` or `Arc<RwLock<T>>` | Explicit synchronized sharing |
| Message-oriented coordination | channels (`mpsc`, `oneshot`, `broadcast`, etc.) | Reduce lock coupling |
| Read-mostly shared configuration | `Arc<T>`, `ArcSwap`, `RwLock` | Cheap reads, controlled updates |
| Actor-like subsystem boundaries | channel-based actors | Ownership isolation, explicit messaging |
| Small lock-free scalar/shared counters | atomics | Avoid lock overhead for narrow cases |
| Data-oriented parallel entity/system processing | ECS scheduling / data-oriented partitioning | Shared world with structured system boundaries |

---

## Pattern 1 — I/O-Bound Work Favors Async

Use async when tasks spend most of their life waiting:
- network
- filesystem
- database
- message bus
- external service boundaries

The point of async is not “modern syntax”.
It is to scale waiting efficiently.

A good async design still keeps work between `.await` points short and explicit.

---

## Pattern 2 — CPU-Bound Work Does Not Belong on Async Workers

If the core work is CPU-heavy:
- parsing large payloads
- cryptography
- compression
- simulation
- intensive transforms

then do not hide it inside async functions and hope.

Prefer:
- `spawn_blocking`
- rayon
- dedicated threads/pools

This is one of the most important Rust concurrency discipline rules.

---

## Pattern 3 — Shared State Is Expensive Conceptually

Before reaching for `Arc<Mutex<T>>`, ask:
- do these tasks really need shared mutable state?
- could ownership be partitioned instead?
- could the state live inside an actor and be updated via messages?

A lock is not just a technical primitive.
It is an architectural commitment.

The best concurrency models often reduce shared mutable state rather than making it convenient.

---

## Pattern 4 — Channels Encode Architecture, Not Just Communication

Channels are powerful because they turn coordination into explicit message flow.

Use them when:
- request/response boundaries exist
- subsystems should remain loosely coupled
- ownership transfer should be explicit
- actor-style logic is clearer than shared-state logic

Different channel types imply different architectures:
- `oneshot` -> request/response
- `mpsc` -> work queue / inbox
- `broadcast` -> fan-out events
- `watch` -> latest-state subscriptions

The choice is architectural, not just API-level.

---

## Pattern 5 — Read-Mostly vs Write-Heavy State Matters

Shared state decisions should reflect the actual access pattern.

### Read-mostly
Good candidates:
- immutable `Arc<T>`
- `RwLock`
- `ArcSwap`
- snapshot-style config update patterns

### Write-heavy or contention-prone
Often better candidates:
- actor ownership
- queue-based serialization
- partitioned state
- data-oriented sharding

The doctrine lesson is:
- concurrency models should match the contention profile
- not just compile successfully

---

## Pattern 6 — Structured Concurrency Is a Maturity Signal

A system becomes healthier when task lifetimes are managed explicitly.

That means:
- know who spawned the task
- know who awaits or supervises it
- know how it cancels or drains
- know how failure propagates

Rust concurrency is strongest when task lifetime is part of the architecture rather than an afterthought.

---

## Pattern 7 — ECS and Data-Oriented Parallelism Is Its Own Concurrency Family

Some systems do not fit neatly into “async vs threads vs locks.”

ECS/data-oriented systems often use:
- partitioned queries
- explicit system scheduling
- world/state synchronization discipline
- reduced lock dependence through data partitioning

This should be treated as a first-class concurrency family in Rust, especially for:
- simulation
- game logic
- world-model processing
- large query-driven state systems

---

## Pattern 8 — Cancellation and Shutdown Are Part of the Choice

A concurrency model is incomplete if it does not answer:
- how do tasks stop?
- what happens on shutdown?
- what gets dropped halfway?
- which operations are cancellation-sensitive?

This matters especially in:
- async services
- background workers
- pipelines
- long-running event processors

So the decision matrix must consider lifecycle, not just throughput.

---

## Pattern 9 — Simplicity Wins When Pressure Is Low

Do not use an advanced concurrency model just because it is available.

If the workload is simple, often the best answer is:
- single-threaded
- simple thread
- straightforward async request handling

Over-concurrency is as real a problem as under-concurrency.

---

## Anti-Patterns

- blocking CPU work on async workers
- `Arc<Mutex<T>>` as the universal answer
- holding locks across `.await`
- spawning tasks with no ownership/lifecycle story
- picking async where threads are simpler
- picking threads where message queues or actors would clarify ownership
- forcing concurrency where the workload does not need it

---

## Why This Matters to `rust-coding-engine`

This is one of the core requirement-grade Rust doctrine pieces because it teaches:
- concurrency as architecture
- workload-first primitive selection
- shared-state skepticism
- channels as architectural tools
- data-oriented concurrency as a distinct Rust pattern

It should be one of the engine's primary routing docs for any performance or async design decision.
