# Rust Performance Patterns

## Purpose

Define the canonical doctrine for performance engineering in Rust systems.

This document is not a bag of disconnected optimization tricks.
It exists to answer the deeper question:

> how should a Rust system reason about speed, allocation, locality, and throughput without drifting into superstition or premature optimization?

It should help the engine choose performance work that is:
- measured
- proportionate
- architecture-aware
- maintainable after the benchmark excitement fades

---

## Source Provenance

- **Primary donor family:** `rust-skills` performance / memory / optimization rule families
- **Key local donor materials:**
  - `rust-skills/rules/perf-profile-first.md`
  - `rust-skills/rules/mem-with-capacity.md`
  - `rust-skills/rules/mem-reuse-collections.md`
  - `rust-skills/rules/mem-zero-copy.md`
  - `rust-skills/rules/perf-entry-api.md`
  - `rust-skills/rules/perf-iter-lazy.md`
  - `rust-skills/rules/anti-format-hot-path.md`
  - `rust-skills/rules/opt-lto-release.md`
  - `rust-skills/rules/opt-target-cpu.md`
  - `rust-skills/rules/opt-pgo-profile.md`
  - `rust-skills/rules/opt-inline-small.md`
  - `rust-skills/rules/mem-smallvec.md`
- **Upstream URL:** not yet fully re-verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending

---

## Core Rule

Performance work begins with **evidence**, not instinct.

Rust gives you many powerful tools:
- ownership-driven zero-copy
- data-oriented layout
- efficient iterators
- concurrency families
- strong release/profile controls

But those tools only help when used in the right order.

The performance doctrine is:
1. find the real bottleneck
2. understand why it exists
3. choose the smallest optimization that changes the actual constraint
4. re-measure

If no measurement happened, performance “improvement” is still only a guess.

---

## Performance Ladder

```text
1. Correctness first
2. Measure with realistic workload
3. Fix algorithm or data-structure problems
4. Reduce allocations and copies
5. Improve locality and contention
6. Tune release/profile settings
7. Use CPU-specific or unsafe optimizations only if still justified
```

This order matters.
It prevents time being wasted on tiny wins while large structural bottlenecks remain untouched.

---

## Pattern 1 — Algorithm and Data Structure First

The largest performance wins usually come from choosing a better algorithm or data structure, not from shaving a few instructions off a hot line.

Examples:
- replacing repeated linear searches with indexed lookups
- using better partitioning for workload distribution
- switching from lock-heavy shared state to message passing or sharding
- choosing the right collection for expected access patterns

Rust's low-level control can make tiny optimizations tempting.
But if the asymptotic shape is wrong, micro-optimizations will not rescue it.

---

## Pattern 2 — Allocation Discipline Is Real Engineering Leverage

Allocation control is one of Rust's biggest performance advantages.
That is why it deserves first-class doctrine.

### Useful defaults
- pre-allocate with `with_capacity()` when size is known or predictable
- reuse collections and buffers in loops instead of allocating fresh ones repeatedly
- avoid formatting-heavy temporary strings in hot paths
- use `SmallVec`, `ArrayVec`, or similar patterns when the common case is small

The point is not “never allocate.”
The point is:
- allocate intentionally
- avoid repeated churn in hot paths
- keep the allocator out of places where it doesn't need to participate

---

## Pattern 3 — Borrowing and Zero-Copy Often Align with Speed

Rust is unusual because the ownership model often helps the performance model.

Good performance posture often looks like:
- `&str` instead of `String`
- `&[T]` instead of `Vec<T>` when ownership isn't needed
- returning borrowed slices/views where lifetime allows
- using `Cow` when conditional ownership is the honest design
- avoiding unnecessary `.to_vec()`, `.to_string()`, or `.clone()` in hot paths

This matters because every needless copy introduces:
- extra memory traffic
- allocator work
- often worse cache behavior

Zero-copy is not free if it makes the API dishonest.
But when the borrow model already fits the meaning, it is often both more idiomatic and faster.

---

## Pattern 4 — Locality Beats Accidental Layout

Data locality is one of the most underappreciated performance levers.

Questions worth asking:
- are related values stored near one another?
- is the hot path walking compact memory, or pointer forests?
- does the chosen collection support the real access pattern?
- is the system read-heavy, write-heavy, scan-heavy, or random-access-heavy?

This matters in:
- parsing
- indexing
- simulation / ECS
- caches
- large collection transforms
- queue and buffer management

Poor locality can destroy throughput even when the code is otherwise “optimized.”

---

## Pattern 5 — Iterators Are Not the Enemy

In Rust, iterator chains are often both expressive and fast.

A healthy performance posture prefers:
- lazy iterator pipelines
- a single final `collect()` when needed
- avoiding unnecessary intermediate collections
- using iterator methods like `any`, `find`, `count`, `sum`, `fold`, `filter_map` when they express the real computation clearly

The point is not that iterators always win.
The point is that hand-written index loops are not automatically faster just because they look lower-level.

Good iterator usage often gives:
- fewer intermediate allocations
- better fusion opportunities
- simpler code that the optimizer can still understand well

---

## Pattern 6 — Hashing and Map Operations Need Workload Awareness

Map performance is not only about “HashMap vs BTreeMap.”
It is also about usage posture.

### Good defaults
- use the entry API for insert-or-update paths
- pre-allocate when size is predictable
- choose faster non-cryptographic hashers only when the workload and threat model justify it

The doctrine is:
- map operations should avoid redundant lookups
- hasher choice is a workload and security decision, not just a speed tweak

---

## Pattern 7 — String and Formatting Work Needs Restraint in Hot Paths

`format!()` is fine for many cold paths.
It is not a good default in very hot loops.

When string work becomes hot:
- pre-size buffers where possible
- reuse `String` buffers
- prefer `write!()` into existing buffers
- delay or eliminate formatting when logs or output are not always needed

The key question is:
- is this path human-facing and cold?
- or does it run often enough that allocation churn matters?

---

## Pattern 8 — Concurrency Is a Performance Tool Only When It Matches the Bottleneck

Parallelism and async can help performance—but only when they match the real problem.

Examples:
- async helps when many tasks are waiting
- rayon helps when CPU work is parallelizable
- semaphores help control concurrency pressure
- lock-free or actor-style designs help when contention is the bottleneck

The performance mistake is using concurrency as a reflex.
The correct approach is:
- identify whether the bottleneck is compute, waiting, contention, or memory movement
- then choose the concurrency strategy that addresses *that* bottleneck

This is why performance doctrine must stay linked to concurrency doctrine.

---

## Pattern 9 — Release Profiles Are Part of the Runtime Contract

Release profile choices are not incidental config trivia.
They are part of the system's performance contract.

Important levers include:
- `opt-level`
- `lto`
- `codegen-units`
- `panic = "abort"` where appropriate
- symbol stripping
- bench-specific profile trade-offs

The doctrine here is:
- local dev profile and production profile serve different goals
- release tuning should be intentional and documented
- profile changes should be measured against actual workloads

---

## Pattern 10 — CPU-Specific and PGO Optimizations Are Deployment Decisions

Flags like:
- `target-cpu=native`
- profile-guided optimization (PGO)
- post-link tools such as BOLT-style workflows

can be extremely valuable.
But they are not universal defaults.

These are deployment-sensitive choices because they depend on:
- where the binary will run
- how reproducible the target hardware assumptions are
- whether workloads are stable enough for profile guidance to matter

The doctrine is:
- powerful low-level tuning belongs near release/deployment policy
- not in casual local development defaults

---

## Pattern 11 — Inline and Unsafe Optimizations Need the Highest Burden of Proof

Inlining hints and unsafe micro-optimizations are the narrowest tools in the box.

They should generally come after:
- measurement
- structural optimization
- allocation/locality improvements
- release/profile tuning

Use them only when:
- profiling says this path is hot enough to matter
- simpler changes have been exhausted or are less effective
- the safety and maintenance costs are acceptable

Especially for `unsafe`, the rule is simple:
- if the gain isn't measured and meaningful, don't buy complexity with safety risk

---

## Pattern 12 — Benchmarking and Profiling Are Different Jobs

### Benchmarking
Good for:
- micro-comparisons
- regression checks
- implementation A vs B comparisons
- stable repeatable measurements of narrow units

### Profiling
Good for:
- discovering where real time or allocations go
- validating whole-program or realistic workload bottlenecks
- understanding the shape of hot paths and call stacks

A mature performance workflow usually needs both.

---

## Audit Checklist

When reviewing a performance-sensitive Rust path, ask:

- [ ] was the hot path measured, not guessed?
- [ ] is the algorithm/data structure still the right one?
- [ ] are needless allocations/copies present?
- [ ] does the API allow borrowing/zero-copy where honest?
- [ ] are collections pre-allocated or reused where it matters?
- [ ] is concurrency helping the real bottleneck?
- [ ] do release profile settings match deployment goals?
- [ ] are inline/unsafe tricks backed by evidence?

---

## Anti-Patterns

- optimizing before profiling
- tuning micro-details while the wrong algorithm remains
- repeated allocation churn in hot loops
- string formatting in hot paths without considering cost
- cloning or copying large data casually in performance-critical sections
- assuming loops are always faster than iterators
- turning on CPU-specific flags without a deployment rationale
- using unsafe performance tricks without hard evidence

---

## Cross-Links

Read this alongside:
- `rust-concurrency-decision-matrix.md`
- `rust-async-concurrency-deep-patterns.md`
- `../foundations/rust-ownership-cookbook.md`
- `rust-production-patterns.md`
- `rust-sdk-ci-and-multi-surface-release-pipelines.md`
- `../playbooks/rust-anti-pattern-detection-and-migration-ladders.md`

---

## Final Doctrine

The reusable lesson is not:
> “Rust has many performance tricks.”

The reusable lesson is:
> “Use Rust's ownership model, allocation control, locality awareness, and release tooling as a measured system—optimize from evidence outward, not from cleverness inward.”
