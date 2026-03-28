---
name: async-and-concurrency
description: Use when the task involves Tokio, structured concurrency, channels, locks, CPU-vs-IO routing, or Send/Sync/concurrency strategy in Rust.
---

# Async and Concurrency

## Steps

1. Read `../../references/async-concurrency/INDEX.md`.
2. Read `../../references/async-concurrency/rust-concurrency-decision-matrix.md` to classify the workload first.
3. Read `../../references/async-concurrency/rust-async-concurrency-deep-patterns.md` for concrete runtime and primitive patterns.
4. If ownership friction appears, also read `../../references/foundations/rust-ownership-cookbook.md`.
5. Use `../../rules/async/INDEX.md` for exact doctrine routing.

## Core Rule

Do not treat async as syntax. Treat it as runtime architecture.
