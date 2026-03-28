---
description: Diagnose borrow-checker and ownership failures before patching symptoms
allowed-tools: Read, Grep, Glob, Bash(git:*)
argument-hint: [error-or-snippet]
---

# Diagnose Borrow Checker

Diagnose the Rust ownership failure represented by `$ARGUMENTS`.

1. Classify the issue into one primary class:
   - move error
   - borrow conflict
   - lifetime mismatch
   - Send/Sync / concurrency ownership issue
   - API design causing ownership friction
2. Read `references/error-patterns/rust-compiler-error-recovery-patterns.md` first.
3. Read `references/foundations/rust-ownership-cookbook.md` for the ownership-model alternatives.
4. If async is involved, also read `references/async-concurrency/rust-concurrency-decision-matrix.md`.
5. If interop is involved, also read `references/interop/rust-ffi-and-interop-overview.md`.
6. Return:
   - error class
   - likely root cause
   - preferred architectural fix
   - next exact file to read
7. Do not jump straight to superficial syntax edits.
