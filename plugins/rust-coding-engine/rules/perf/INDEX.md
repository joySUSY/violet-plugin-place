# Performance Rules Index

This index defines the performance doctrine entrypoint for the rust-coding-engine shell.

## Primary Canonical Sources
- `../../references/production/rust-performance-patterns.md`
- `../../references/async-concurrency/rust-async-concurrency-deep-patterns.md`
- donor families:
  - `rust-skills` performance-rule family
  - `rust-skills` optimization-rule family
  - `rust-skills` memory-rule family

## What This Zone Owns
- profiling-first discipline
- allocation and locality strategy
- release profile choices
- CPU-bound vs I/O-bound optimization
- cache-aware and zero-copy patterns

## First Reading Path
1. `references/production/rust-performance-patterns.md`
2. `references/async-concurrency/rust-async-concurrency-deep-patterns.md` if async hot paths are involved
3. donor perf/opt/mem rule material only when exact micro-pattern selection is needed

## Cleanup-Safe Rule
This index retains donor families as provenance identifiers only, not as cleanup-sensitive path references.
