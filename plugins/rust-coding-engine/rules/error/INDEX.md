# Error Rules Index

This index defines the error-handling doctrine entrypoint for the rust-coding-engine shell.

## Primary Canonical Sources
- `../../references/error-patterns/rust-error-handling-patterns.md`
- `../../references/interop/rust-ffi-and-interop-overview.md`
- donor family: `rust-skills` error-rule family

## What This Zone Owns
- `thiserror` vs `anyhow`
- propagation strategy
- panic boundaries
- error typing and layering
- FFI error return discipline

## First Reading Path
1. `references/error-patterns/rust-error-handling-patterns.md`
2. if interop boundary involved, `references/interop/rust-ffi-and-interop-overview.md`
3. donor error rules only for exact sub-pattern lookup

## Cleanup-Safe Rule
This index must remain readable even if the local donor reservoir is later archived or cleaned.
