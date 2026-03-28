# API Rules Index

This index defines the API and type-surface doctrine entrypoint for the rust-coding-engine shell.

## Primary Canonical Sources
- `../../references/foundations/rust-foundations-ownership-memory-safety.md`
- `../../references/architecture/rust-architecture-and-scaffolding.md`
- donor family: `rust-skills` api-rule family

## What This Zone Owns
- parse-don't-validate
- typestate and newtype design
- public API ergonomics
- trait boundaries
- library-vs-app surface decisions

## First Reading Path
1. `references/foundations/rust-foundations-ownership-memory-safety.md`
2. `references/architecture/rust-architecture-and-scaffolding.md`
3. donor API rules only when exact sub-pattern selection is needed

## Cleanup-Safe Rule
This index should survive donor cleanup because it does not rely on cleanup-sensitive reservoir paths.
