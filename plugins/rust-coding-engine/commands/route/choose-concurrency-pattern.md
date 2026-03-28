---
description: Route Rust work to the correct concurrency model before implementation
allowed-tools: Read, Grep, Glob, Bash(git:*)
---

# Choose Concurrency Pattern

Use the Rust concurrency doctrine to classify the current problem.

1. Read `references/async-concurrency/rust-concurrency-decision-matrix.md`.
2. Read `references/async-concurrency/rust-async-concurrency-deep-patterns.md` if you need concrete primitive or runtime patterns.

Choose one primary model:
- Tokio async tasks for I/O-bound work
- `spawn_blocking` or rayon for CPU-bound work
- channels for actor/message-passing flows
- locks only when mutation and shared state are unavoidable
- atomics / lock-free primitives for narrow low-level coordination
- ECS/data-oriented scheduling when shared world truth and query-driven state dominate

Return:
1. chosen concurrency model
2. why it is the best fit
3. what anti-pattern to avoid
4. next exact file to read
