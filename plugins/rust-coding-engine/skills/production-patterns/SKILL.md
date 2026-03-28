---
name: production-patterns
description: Use when the task is about performance, benchmarking, observability, release profiles, large-service patterns, production hardening, or constraint-driven operational trade-offs in Rust.
---

# Rust Production Patterns

## Steps

1. Read `../../references/production/INDEX.md`.
2. Read `../../references/production/rust-production-patterns.md`.
3. If performance is central, also read `../../references/production/rust-performance-patterns.md`.
4. If observability is central, also read `../../references/production/rust-logging-and-observability-best-practices.md`.
5. If release, SDK, or multi-surface publishing is central, also read `../../references/production/rust-sdk-ci-and-multi-surface-release-pipelines.md`.
6. If async runtime behavior is central, also read `../../references/async-concurrency/rust-concurrency-decision-matrix.md`.
7. Use `../../rules/perf/INDEX.md` for exact doctrine routing.

## Core Rule

Production Rust should be guided by measured trade-offs, not intuition theater.
