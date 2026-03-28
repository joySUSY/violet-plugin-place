---
name: ownership-and-types
description: Use when the task is fundamentally about ownership, borrowing, lifetimes, newtypes, typestate, trait design, or illegal-state prevention in Rust.
---

# Ownership and Types

## Steps

1. Read `../../references/foundations/rust-foundations-ownership-memory-safety.md`.
2. Read `../../references/foundations/rust-ownership-cookbook.md`.
3. If the issue is API-facing, also read `../../references/foundations/rust-idiomatic-style-and-patterns.md`.
4. If the compiler error is central, also read `../../references/error-patterns/rust-compiler-error-recovery-patterns.md`.
5. If the issue is state-machine or invariant heavy, route through `../../rules/api/INDEX.md` and `../../rules/ownership/INDEX.md`.
6. Name the ownership boundary before proposing a fix.

## Core Rule

This bridge skill exists so ownership problems become architectural problems, not clone-spam or annotation-spam.
