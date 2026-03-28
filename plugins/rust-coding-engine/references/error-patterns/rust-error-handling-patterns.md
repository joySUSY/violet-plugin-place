# Rust Error Handling Patterns

## Purpose

Define the canonical doctrine for designing, selecting, and propagating errors in Rust systems.

This document is the root error-handling doctrine inside `rust-coding-engine`.
It should answer the most important architectural question in this domain:

> what kind of error surface should this boundary expose, and why?

It is not just a crate comparison note.
It exists to connect:
- error shape
- context strategy
- panic boundaries
- library vs application differences
- interop-safe error translation

---

## Source Provenance

- **Primary donor families:** `rust-skills` error-rule family, `rust-error-handling-result-option-match-main`, `handling-rust-errors-elegantly` article reservoir
- **Key local donor materials:**
  - `rust-skills/rules/err-anyhow-app.md`
  - `rust-skills/rules/err-thiserror-lib.md`
  - `rust-skills/rules/err-context-chain.md`
  - `rust-skills/rules/err-result-over-panic.md`
  - `rust-skills/rules/err-no-unwrap-prod.md`
  - `rust-skills/rules/err-lowercase-msg.md`
  - `handling-rust-errors-elegantly-doctrine.md`
  - `result-option-match-posture.md`
- **Upstream URL:** not yet fully re-verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending

---

## Core Rule

Error handling is boundary design.

The question is never just:
> how do I return an error here?

The real questions are:
- what failure meaning must survive this boundary?
- how much type precision does the caller need?
- how much context does the operator or developer need?
- where should failure be widened, preserved, or transformed?

In Rust, error handling is not an afterthought layered on top of the program.
It is one of the main ways the program communicates truth.

---

## Error Surface Selection Framework

```text
What boundary are we in?
├── Library / reusable API surface
│   └── Prefer typed, matchable errors
├── Application / binary / service orchestration layer
│   └── Prefer ergonomic propagation with rich context
├── Operator-facing CLI or diagnostic tool
│   └── Prefer richer reporting and readable failure chains
└── Foreign/runtime boundary (FFI, PyO3, NAPI, Tauri, WASM)
    └── Prefer safe translated error surfaces for the consumer runtime
```

This is the true selection framework.
The crate choice follows from it.

---

## Pattern 1 — Library Boundaries Want Typed Errors

A library should usually expose typed, matchable errors because callers may need to distinguish failure cases.

Typical reasons:
- branching on specific variants
- preserving structured domain meaning
- maintaining stable public contracts
- avoiding opaque failure blobs in reusable APIs

This is why `thiserror`-style posture is usually the strongest default for libraries and reusable internal domain boundaries.

The lesson is not “always use `thiserror` because it is popular.”
The lesson is:
- libraries usually need structured, inspectable failure surfaces

---

## Pattern 2 — Application Boundaries Want Ergonomic Propagation

Applications and binaries often have a different priority.
They usually need to:
- move errors upward quickly
- preserve context chains
- keep implementation overhead low
- present useful failure diagnostics to logs or operators

This is where an `anyhow`-style posture becomes strong.

The lesson is:
- applications often need error **aggregation and context flow** more than public variant matching

That does not mean “types do not matter.”
It means the boundary has changed.

---

## Pattern 3 — Rich Reporting Is a Separate Pressure

Some boundaries need more than ordinary propagation.
Examples:
- CLI diagnostics
- operator-facing tooling
- source-snippet-rich reports
- report-heavy internal platforms

In those cases, richer report-oriented tooling can make sense.

The doctrine is:
- rich reporting is about the consumer experience of failure
- not about making every error stack more elaborate than necessary

Use it where the reporting pressure is real.

---

## Pattern 4 — Context Chains Should Explain the Story of Failure

Raw errors often tell you too little.
But context can also become noisy if applied indiscriminately.

A strong Rust context posture helps answer:
- what operation failed?
- what resource or input was involved?
- why does this boundary care?

That means:
- add context where it clarifies the operation
- avoid adding decorative context that repeats what the lower layer already said
- prefer lazy/dynamic context when runtime values matter

Context chains should read like a coherent trail, not like stacked bureaucracy.

---

## Pattern 5 — Panic Is Not the Default Error Strategy

Panic is not the normal recoverable error story for Rust production code.

Panics are appropriate mainly for:
- invariants that truly cannot be violated without a bug
- tests and proofs
- very narrow, justified assumptions

They are not the correct default for:
- file I/O failure
- parse failure
- missing user input
- network failure
- validation failure

The rule is simple:
- if a caller could recover, branch, retry, or surface the issue usefully, prefer `Result`

This matters for both library and application code.

---

## Pattern 6 — `unwrap()` and `expect()` Need Boundary Awareness

`unwrap()` is dangerous mostly because it erases explanation.
`expect()` is better only when it documents a real invariant.

A mature codebase should not normalize:
- `unwrap()` in production paths
- `expect()` with vague messages
- “we'll just panic if that fails” as the main design strategy

The real doctrine is:
- propagate if recoverable
- default if truly acceptable
- match/branch if the recovery path is meaningful
- panic only for genuine invariant violation or proof boundaries

---

## Pattern 7 — Error Message Shape Matters

Error messages should compose well.

A good posture favors:
- lowercase starts unless a proper noun/acronym justifies otherwise
- no unnecessary trailing punctuation
- concrete operation wording
- field/value details where helpful

Why this matters:
- Rust errors are often chained
- awkward capitalization and punctuation degrade composed output quickly

This is a small rule with outsized impact on readability.

---

## Pattern 8 — Interop Boundaries Need Translation, Not Leakage

At foreign/runtime boundaries, Rust errors should not simply leak inward-facing implementation assumptions outward.

Instead, the system should translate errors into:
- safe C-facing status or sentinel/error objects
- Python exceptions
- JS/Promise rejection errors
- Tauri IPC-safe error surfaces
- WASM/module-consumer-friendly failure shapes

This is why error doctrine belongs closely with interop doctrine.

The question is not just “what error occurred?”
It is “what failure contract can this consumer runtime safely understand?”

---

## Pattern 9 — `Result`, `Option`, and `match` Are Part of One Posture

Error handling doctrine in Rust is inseparable from fallibility posture generally.

That means:
- `Option` is for absence when absence is the real concept
- `Result` is for recoverable failure
- `match` and combinators express the branching/propagation logic visibly

This is why `result-option-match-posture.md` exists as a supporting doctrinal note.

The broader lesson is:
- failure and absence should be modeled honestly, not papered over with silent collapse or panic shortcuts

---

## Selection Matrix

| Boundary | Default Posture | Why |
|---|---|---|
| Library / reusable crate | typed error enum (`thiserror`-style) | caller needs matchable failure meaning |
| Application / service orchestration | ergonomic propagation (`anyhow`-style) | context and velocity dominate |
| Rich operator-facing diagnostic tool | richer reporting stack | user/operator experience of failure matters |
| FFI / PyO3 / NAPI / Tauri / WASM boundary | translated boundary-safe errors | consumer runtime needs its own safe error model |

This matrix should guide crate/tool choice—not the other way around.

---

## Anti-Patterns

- stringly-typed library errors where callers need structure
- `Box<dyn Error>` used as a lazy substitute for a real public error contract
- no context at all on application failures
- excessive noisy context that repeats lower layers
- `unwrap()` and `expect()` normalized in production paths
- panic-driven error handling for recoverable conditions
- leaking raw Rust failure semantics across foreign boundaries

---

## Cross-Links

This doctrine should be read alongside:
- `handling-rust-errors-elegantly-doctrine.md`
- `result-option-match-posture.md`
- `rust-compiler-error-recovery-patterns.md`
- `rust-error-fix-strategies.md`
- `rust-error-handling-security-checklist.md`
- `../interop/rust-ffi-and-interop-overview.md`
- `../interop/rust-interop-testing-and-audit-discipline.md`

---

## Final Doctrine

The reusable lesson is not:
> “use `thiserror` here, `anyhow` there.”

The reusable lesson is:
> “choose the error surface that matches the boundary: typed and matchable where callers need semantic control, ergonomic and contextual where applications need propagation, and translated safely where foreign runtimes consume the failure.”
