# Result / Option / Match Posture

## Purpose

Capture the canonical error-handling posture implied by the `result/option/match` donor family.

This document is not a syntax tutorial.
It is the doctrinal statement for how Rust wants you to think about fallibility.

## Source Provenance

- **Primary donor families:** `rust-error-handling-result-option-match-main`, `rust-skills` error-rule family
- **Key local donor materials:**
  - `rust-error-handling-result-option-match-main/README.md`
  - `rust-skills/rules/err-result-over-panic.md`
- **Upstream URL:** not yet fully re-verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending

---

## Core Rule

In Rust, failure is part of the type system.

That means:
- absence should be represented deliberately
- recoverable failure should be represented deliberately
- branching on these cases is a core design act, not an afterthought

---

## Pattern 1 — `Option` Means Absence, Not Error Theater

Use `Option<T>` when the meaningful distinction is:
- present
- absent

Do not overload `Option` to hide real failure information when the caller needs to know why something failed.

The doctrinal question is:
- is the value optional by nature?
- or is a failure mode actually being collapsed into silence?

---

## Pattern 2 — `Result` Means Fallible Work

Use `Result<T, E>` when something can fail and the caller may need to react differently depending on the failure.

This reinforces the larger Rust posture:
- errors are data
- propagation is explicit
- control flow is visible

That is why `Result` is central not just to error handling, but to API design.

---

## Pattern 3 — `match` Is Structural, Not Just Verbose

Pattern matching is not merely a language feature here.
It is the structural way Rust exposes branching over:
- success vs failure
- some vs none
- variant-specific logic

The lesson is not “always use raw match everywhere”.
The lesson is:
- make case handling explicit when the branching matters
- use combinators when they clarify, not when they obscure

---

## Pattern 4 — Propagation Should Preserve Meaning

A system that overuses `unwrap`, hides context, or collapses all failures too early loses the advantages of Rust's type-level error model.

The doctrinal goal is:
- preserve enough meaning for the next boundary
- add context where it helps
- convert to broader categories only when the boundary justifies it

This aligns with the stronger doctrine in `error-handling-patterns.md`.

---

## Pattern 5 — Fallibility Is Part of Architectural Design

The deepest lesson is this:
- `Option`, `Result`, and `match` are not low-level language trivia
- they are how Rust forces architectural honesty about uncertainty and failure

This affects:
- domain modeling
- repository design
- parsing
- boundary handling
- interop safety

---

## Why This Matters to `rust-coding-engine`

This donor strengthens the engine's ability to teach:
- when to encode absence vs failure
- how to think about explicit branching
- why Rust error posture is a design philosophy, not just syntax

It is foundational enough to deserve a dedicated doctrinal note inside error-patterns.
