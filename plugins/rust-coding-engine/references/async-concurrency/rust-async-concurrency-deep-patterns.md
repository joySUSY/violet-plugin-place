# Rust Async and Concurrency Deep Patterns

## Purpose

Define the canonical deep-pattern doctrine for async runtime behavior, structured concurrency, coordination primitives, cancellation, and synchronization inside `rust-coding-engine`.

This document lives one layer below `rust-concurrency-decision-matrix.md`.

- `rust-concurrency-decision-matrix.md` answers: **which concurrency family fits this workload?**
- this document answers: **once that family is chosen, what are the deeper runtime and coordination patterns?**

---

## Source Provenance

- **Primary donor family:** `rust-skills` async-rule family
- **Key local donor materials:**
  - `rust-skills/rules/async-tokio-runtime.md`
  - `rust-skills/rules/async-spawn-blocking.md`
  - `rust-skills/rules/async-joinset-structured.md`
  - `rust-skills/rules/async-mpsc-queue.md`
  - `rust-skills/rules/async-broadcast-pubsub.md`
  - `rust-skills/rules/async-watch-latest.md`
  - `rust-skills/rules/async-cancellation-token.md`
  - `rust-skills/rules/async-no-lock-await.md`
  - `rust-skills/rules/anti-lock-across-await.md`
  - `rust-skills/rules/async-oneshot-response.md`
  - `rust-skills/rules/async-select-racing.md`
  - `rust-skills/rules/async-try-join.md`
- **Upstream URL:** not yet fully re-verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending

---

## Core Rule

Async and concurrency patterns should preserve three things simultaneously:
1. **runtime health**
2. **ownership clarity**
3. **task lifecycle honesty**

If a pattern improves throughput but destroys lifecycle clarity, it is incomplete.
If it compiles but starves the runtime, it is wrong.
If it scales but nobody can explain cancellation, it is unsafe to trust.

---

## Runtime Posture

### Tokio flavor is a workload decision
A runtime flavor is not chosen by habit.
It should reflect the workload and operational environment.

| Situation | Good default |
|---|---|
| service with many concurrent I/O tasks | multi-threaded Tokio |
| small CLI or tests with modest async needs | current-thread Tokio |
| workload-specific tuning required | explicit `Builder` configuration |

### Principle
- multi-threaded runtime for broad concurrent I/O
- current-thread runtime for lower-overhead, simpler async scenarios
- custom builders when resource limits, worker naming, blocking pool size, or explicit tuning matter

The deeper lesson is:
- runtime configuration belongs to architecture and production posture
- not just to `main()` boilerplate

---

## Pattern 1 — Never Hide CPU Work on Async Workers

One of the most important deep patterns is the strict separation between:
- **I/O-bound async work**
- **CPU-bound blocking work**

CPU-heavy operations should be moved to:
- `spawn_blocking`
- rayon
- dedicated threads/pools

This protects the runtime from starvation.

The anti-pattern is any async function that *looks* non-blocking but actually monopolizes executor time.

---

## Pattern 2 — Structured Task Ownership Beats Fire-and-Forget Drift

`tokio::spawn` is useful, but tasks should still have a lifecycle story.

Questions that must be answerable:
- who spawned this task?
- who observes failure?
- who cancels it?
- does it need joining, draining, or supervision?

For dynamic collections of tasks, `JoinSet` is often the better abstraction because it preserves:
- result harvesting
- dynamic addition
- group-level cancellation/draining semantics

The lesson is:
- task creation without lifecycle ownership is a concurrency smell

---

## Pattern 3 — Channels Encode Coordination Shape

A channel is not just a queue.
It is a declaration of coordination style.

### `mpsc`
Use for:
- work queues
- actor inboxes
- many producers feeding one owner

### `oneshot`
Use for:
- request/response links
- single reply channels
- actor RPC-like patterns

### `broadcast`
Use for:
- pub/sub where all subscribers should see each event
- event fan-out
- observability or notification buses

### `watch`
Use for:
- latest-value state/config propagation
- observers that care about the current state, not full history

The deep doctrine is:
- choose the channel that matches information semantics
- not merely one that happens to compile

---

## Pattern 4 — Synchronization Primitive Choice Must Reflect Access Semantics

Different locks communicate different assumptions.

| Primitive | Best for |
|---|---|
| `std::sync::Mutex` | short sync critical sections, no await |
| `tokio::sync::Mutex` | async code needing async-aware lock acquisition |
| `parking_lot::Mutex` | faster sync mutex patterns where its semantics fit |
| `std::sync::RwLock` | sync read-heavy workloads |
| `tokio::sync::RwLock` | async read-heavy workloads |
| `Semaphore` | bounded concurrency, permits rather than ownership of state |
| `Notify` | wake-up coordination |
| atomics | narrow scalar/shared-state updates |
| `ArcSwap` | lock-free config/pointer swaps |

The principle is not “which one is faster?”
It is “what coordination semantics are actually being expressed?”

---

## Pattern 5 — Never Hold Locks Across `.await`

This is one of the hardest rules because it is easy to violate casually.

Holding a lock across `.await` means:
- other tasks may block behind a suspended owner
- contention becomes unpredictable
- deadlock/starvation risk rises

The preferred extraction strategy is usually:
1. read/clone/compute the minimum needed while locked
2. drop the guard
3. perform async work
4. reacquire lock only for the short writeback phase if necessary

If the lock keeps wanting to cross `.await`, redesign the ownership or coordination model.

---

## Pattern 6 — Cancellation Is Part of Task Design, Not a Cleanup Afterthought

Cancellation should be designed explicitly.

Useful tools and patterns:
- `CancellationToken`
- `select!` on cancellation vs work
- graceful shutdown loops
- explicit drain and cleanup phases

Important doctrine:
- dropping a `JoinHandle` is not the same as graceful cancellation
- background tasks should know how to stop
- shutdown should usually be cooperative first, abrupt second

This matters in services, workers, daemons, and long-lived async systems.

---

## Pattern 7 — `select!`, `try_join!`, and `JoinSet` Serve Different Coordination Stories

These are not interchangeable.

### `select!`
Use when:
- racing futures
- handling cancellation/timeouts alongside work
- choosing first-complete semantics

### `try_join!`
Use when:
- running several fallible operations concurrently
- failing fast if any one fails
- all results are needed together

### `JoinSet`
Use when:
- tasks are dynamic or numerous
- you need to process results as tasks complete
- task ownership/lifecycle should stay explicit

The deep lesson is:
- coordination primitives are architectural statements about completion semantics

---

## Pattern 8 — Streams Are Concurrency Structures Too

Buffered stream combinators are not merely ergonomic helpers.
They are concurrency control surfaces.

Examples:
- `.buffer_unordered(n)` expresses bounded parallelism
- chunked stream processing expresses batching strategy
- stream pipelines often encode throughput/latency trade-offs implicitly

This means stream design should be reviewed as concurrency design, not only as iterator style.

---

## Pattern 9 — Actor and Queue Patterns Often Beat Shared Mutable State

When coordination becomes complex, message-passing often scales cognitively better than shared-state locking.

A strong pattern is:
- one owner task or actor
- commands via `mpsc`
- replies via `oneshot`
- optional broadcast/watch for observability or state fan-out

This model often produces clearer ownership and failure boundaries than many tasks contending on the same lock-protected state.

---

## Pattern 10 — Backpressure Must Be Intentional

Unbounded queues and unconstrained spawning make systems look smooth until load arrives.

A mature async design should explicitly decide:
- bounded vs unbounded channels
- semaphore/concurrency limits
- retry behavior
- how saturation is surfaced

Backpressure is not optional in real systems.
It is part of staying honest about system limits.

---

## Anti-Patterns

- CPU-bound work on async worker threads
- lock guards held across `.await`
- fire-and-forget task spawning with no ownership story
- unbounded queues everywhere
- using `broadcast` when only latest-state semantics are needed
- using `watch` when full event history matters
- using locks where actors/message passing would make ownership clearer
- shutdown logic that only drops handles and hopes for the best

---

## Cross-Links

Read this alongside:
- `rust-concurrency-decision-matrix.md`
- `../foundations/rust-ownership-cookbook.md`
- `../production/rust-performance-patterns.md`
- `../production/rust-logging-and-observability-best-practices.md`
- `../playbooks/rust-anti-pattern-detection-and-migration-ladders.md`

---

## Final Doctrine

The reusable lesson is not:
> “Tokio has many primitives.”

The reusable lesson is:
> “Choose async/concurrency primitives according to workload, coordination semantics, and lifecycle clarity—then enforce runtime health, cancellation honesty, and ownership discipline all the way through.”
