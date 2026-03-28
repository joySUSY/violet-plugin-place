# Async Rules Index

This index defines the async and concurrency doctrine entrypoint for the rust-coding-engine shell.

## Primary Canonical Sources
- `../../references/async-concurrency/rust-async-concurrency-deep-patterns.md`
- donor family: `rust-skills` async-rule family
- anti-pattern support: `anti-lock-across-await.md`

## What This Zone Owns
- runtime selection
- task spawning discipline
- channel selection
- sync primitives across async boundaries
- structured concurrency and backpressure

## First Reading Path
1. `references/async-concurrency/rust-async-concurrency-deep-patterns.md`
2. route via concurrency command if choice is unclear
3. donor async rules only when deeper granularity is needed

## Cleanup-Safe Rule
Donor family names are retained as provenance identifiers only.
