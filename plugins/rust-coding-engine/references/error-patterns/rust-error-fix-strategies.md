# Rust Error Fix Strategies

## Purpose

Define the canonical operational workflow for fixing Rust errors once a failure has already been encountered.

This document is not the root doctrine for error design, and it is not the main compiler-error family map.

Its role is narrower and more practical:

> when you are staring at a Rust error now, how do you move from symptom to proportionate, architecture-honest repair without falling into panic, clone spam, or random patching?

---

## Source Provenance

- **Primary donor families:** `rust-skills` error-rule family, `rust-error-handling-result-option-match-main`
- **Key local donor materials:**
  - `rust-skills/rules/err-question-mark.md`
  - `rust-skills/rules/err-from-impl.md`
  - `rust-skills/rules/err-source-chain.md`
  - `rust-skills/rules/err-context-chain.md`
  - `rust-skills/rules/err-result-over-panic.md`
  - `rust-compiler-error-recovery-patterns.md`
  - `rust-error-handling-patterns.md`
- **Upstream URL:** not yet fully re-verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending

---

## Core Rule

Do not fix Rust errors by reflex.
Fix them by classification.

A healthy recovery workflow asks, in order:
1. what kind of error is this really?
2. what boundary is this happening at?
3. what family of fix preserves the intended design most honestly?
4. what quick patch would silence the symptom but worsen the architecture?

The point is not just to make the compiler quiet.
The point is to restore correctness without teaching the codebase bad habits.

---

## Error Fix Workflow

### Step 1 — Classify the failure family
Is this primarily:
- a compiler ownership/lifetime/type rejection?
- a runtime fallibility/propagation problem?
- a panic boundary problem?
- a conversion/context/chain problem?
- an interop translation problem?

Wrong classification is the source of many bad fixes.

### Step 2 — Identify the boundary
Ask where the error lives:
- local implementation detail
- public library API
- application/service boundary
- async/runtime boundary
- interop/foreign runtime boundary

This matters because the right fix for a library boundary is often not the same as the right fix for an internal application path.

### Step 3 — Choose the smallest honest repair family
Examples:
- borrow instead of clone
- return `Result` instead of panic
- add context rather than widen the error blindly
- add `From` conversion rather than repeated `map_err` boilerplate
- translate into foreign/runtime-safe failure shape at interop boundaries

### Step 4 — Re-check for architectural drift
After the immediate fix, ask:
- did this patch teach the codebase a worse habit?
- did it increase clone pressure, panic pressure, or type vagueness?
- is the same error family likely to recur nearby?

If yes, widen the repair from local patch to structural adjustment.

---

## Recovery Family 1 — Borrow / Ownership Repairs

Symptoms often include:
- moved value errors
- borrow/lifetime conflicts
- mutation scope problems

Good repair families:
- borrow instead of moving
- shrink the borrow scope
- return owned values when references cannot honestly outlive the owner
- redesign the ownership model when clone pressure keeps recurring

Bad repair reflex:
- add `.clone()` everywhere without checking semantic or performance cost

Primary read:
- `rust-compiler-error-recovery-patterns.md`

---

## Recovery Family 2 — Propagation Repairs

Symptoms often include:
- verbose match-based propagation
- accidental `unwrap()` / `expect()` where recoverable failure exists
- returning a broad opaque error too early

Good repair families:
- use `?` when the boundary and error conversions support it
- implement or derive `From` for expected conversion chains
- keep error typing proportional to the boundary

Bad repair reflex:
- replace clean propagation with panic or manual repetitive `map_err` noise everywhere

Primary reads:
- `rust-error-handling-patterns.md`
- `rust-skills` donor rules around `?` and `From`

---

## Recovery Family 3 — Context Repairs

Symptoms often include:
- errors that say too little
- operators cannot tell what operation failed
- lower-level causes are technically preserved but operationally opaque

Good repair families:
- add `.context()` or `.with_context()` where operation meaning is missing
- add source/error chaining where causal structure should remain visible
- add runtime values only when they clarify the failure story

Bad repair reflex:
- attach decorative or repetitive context that just restates the same thing in different words

Primary reads:
- `rust-error-handling-patterns.md`
- `handling-rust-errors-elegantly-doctrine.md`

---

## Recovery Family 4 — Panic Boundary Repairs

Symptoms often include:
- `unwrap` / `expect` failures in production paths
- recoverable conditions being treated as fatal
- library or interop edges that can panic unexpectedly

Good repair families:
- return `Result` for recoverable failure
- convert `Option` to `Result` when absence needs error meaning
- restrict `expect()` to true invariant documentation
- isolate or translate panic-prone zones at foreign boundaries

Bad repair reflex:
- deciding that because a panic is convenient, it is therefore justified

Primary reads:
- `rust-error-handling-patterns.md`
- `result-option-match-posture.md`

---

## Recovery Family 5 — Type / Conversion Repairs

Symptoms often include:
- mismatched types
- repeated explicit conversions everywhere
- `Result<T, E>` or `Option<T>` not matching the true boundary
- stringly-typed or weakly typed values leaking inward

Good repair families:
- adjust the boundary to the right type
- add `From`-based conversions where stable and obvious
- parse at the boundary into stronger types sooner
- narrow/widen the return surface only when the boundary justifies it

Bad repair reflex:
- random `.into()` or `.to_string()` additions with no semantic review

Primary reads:
- `rust-error-handling-patterns.md`
- `result-option-match-posture.md`

---

## Recovery Family 6 — Interop / Foreign Runtime Repairs

Symptoms often include:
- Rust errors escaping into foreign runtimes unclearly
- unsafe or panic-prone FFI/PyO3/NAPI/WASM/Tauri boundaries
- mismatch between Rust failure model and consumer runtime expectations

Good repair families:
- translate to runtime-safe error objects / exceptions / status codes
- add interop tests proving failure behavior on the consumer side
- keep panic from crossing the foreign boundary casually

Bad repair reflex:
- assuming Rust-native error conventions are automatically meaningful outside Rust

Primary reads:
- `../interop/rust-ffi-and-interop-overview.md`
- `../interop/rust-interop-testing-and-audit-discipline.md`

---

## Fix Selection Heuristics

| Symptom | Usually prefer | Usually avoid |
|---|---|---|
| moved value error | borrow or redesign ownership | blind clone spray |
| missing context on failure | `.context()` / `.with_context()` | replacing with generic string only |
| repeated manual error conversion | `From` / derived conversion | repetitive hand-written `map_err` everywhere |
| panic in recoverable path | `Result` or safer branch logic | normalize `unwrap()` |
| runtime-facing error mismatch | translated boundary-safe error | leaking raw internal details |

---

## Quick Operational Checklist

When fixing a Rust error, ask:

- [ ] Have I identified the real failure family?
- [ ] Do I know which boundary this fix is for?
- [ ] Is this patch preserving ownership/error semantics honestly?
- [ ] Am I introducing clone/panic/type-noise that will recur later?
- [ ] Does this need a local patch only, or a broader structural repair?

---

## Anti-Patterns

- cargo-cult `clone()` to silence ownership issues
- cargo-cult `.into()` to silence type mismatches
- panic-driven shortcuts in production paths
- widening every error to a blob too early
- piling on context until the chain becomes unreadable
- treating interop boundaries like normal Rust-only error surfaces

---

## Cross-Links

Read this alongside:
- `rust-error-handling-patterns.md`
- `rust-compiler-error-recovery-patterns.md`
- `rust-error-pattern-catalog.md`
- `result-option-match-posture.md`
- `handling-rust-errors-elegantly-doctrine.md`

---

## Final Doctrine

The reusable lesson is not:
> “here are some fixes for common Rust errors.”

The reusable lesson is:
> “repair Rust errors by classifying the failure family and choosing the smallest boundary-appropriate fix that preserves architectural honesty, instead of silencing the symptom with clone, panic, or conversion noise.”
