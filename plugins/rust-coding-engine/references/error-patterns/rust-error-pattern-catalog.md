# Rust Error Pattern Catalog

## Purpose

Provide a canonical catalog of recurring error-handling pattern families in Rust.

This document is not the root doctrine for error design.
That role belongs to `rust-error-handling-patterns.md`.

This catalog exists for a different purpose:

> when a Rust failure surface is already known to matter, what family of pattern is this, and which deeper doctrine should be consulted next?

It is the map, not the constitution.

---

## Source Provenance

- **Primary donor families:** `rust-skills` error-rule family, `rust-error-handling-result-option-match-main`, local error-handling article/doctrine reservoirs
- **Key local donor materials:**
  - `rust-skills/rules/err-anyhow-app.md`
  - `rust-skills/rules/err-thiserror-lib.md`
  - `rust-skills/rules/err-context-chain.md`
  - `rust-skills/rules/err-result-over-panic.md`
  - `rust-skills/rules/err-no-unwrap-prod.md`
  - `rust-skills/rules/err-lowercase-msg.md`
  - `result-option-match-posture.md`
  - `handling-rust-errors-elegantly-doctrine.md`
- **Upstream URL:** not yet fully re-verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending

---

## Core Rule

Not all Rust errors are the same kind of design problem.

A useful error catalog separates failures into families such as:
- absence vs recoverable failure
- typed library errors vs ergonomic application errors
- context/chain enrichment
- panic/invariant boundaries
- interop/runtime translation
- compiler-driven recovery patterns
- operator-facing reporting

The point is to avoid reaching for one universal error style when the boundary is actually asking a more specific question.

---

## Error Family Map

| Family | What it means | Primary doctrine to read next |
|---|---|---|
| Absence vs failure | choose between `Option` and `Result` honestly | `result-option-match-posture.md` |
| Library error surface | typed, matchable public error contracts | `rust-error-handling-patterns.md` |
| Application error surface | ergonomic propagation and context chains | `rust-error-handling-patterns.md` |
| Context chaining | adding useful boundary context without noise | `rust-error-handling-patterns.md` |
| Panic/invariant boundary | deciding when panic is justified vs when `Result` is required | `rust-error-handling-patterns.md` |
| Compiler-error recovery | reacting to borrow/lifetime/type compiler failures | `rust-compiler-error-recovery-patterns.md` |
| Interop-safe translation | converting Rust failure into C/Python/JS/WASM-safe forms | `../interop/rust-ffi-and-interop-overview.md`, `../interop/rust-interop-testing-and-audit-discipline.md` |
| Security-conscious failure surfaces | sanitization, log safety, not leaking secrets | `rust-error-handling-security-checklist.md` |
| Narrative / elegance / proportionality | keeping error surfaces clear and humane | `handling-rust-errors-elegantly-doctrine.md` |

---

## Family 1 — Absence Is Not Automatically an Error

If the meaningful distinction is simply:
- present
- absent

then `Option<T>` is often the right model.

If the caller needs to know *why* the work failed, the pattern belongs to a `Result<T, E>` family instead.

This family is fundamental because many downstream error-shape mistakes begin with collapsing these two concepts too early.

Primary read:
- `result-option-match-posture.md`

---

## Family 2 — Typed Library Errors

This family applies when the boundary is a library or reusable internal contract and callers may need to react differently to different failure kinds.

Typical traits of this family:
- typed enums or structured errors
- stable matchable variants
- explicit conversion strategy
- semver awareness for public error evolution

Primary read:
- `rust-error-handling-patterns.md`

---

## Family 3 — Ergonomic Application Errors

This family applies when the boundary is an application/service orchestration layer and the key need is:
- carrying failures upward cleanly
- adding useful context
- preserving operator-facing readability

Typical traits:
- broader catch-all application error strategy
- context-rich propagation
- less concern about public variant matching

Primary read:
- `rust-error-handling-patterns.md`

---

## Family 4 — Context Chain Enrichment

Sometimes the underlying error is fine, but the boundary needs to say:
- what operation failed
- what resource/input was involved
- why this location cares

This family is about preserving the chain of meaning between low-level cause and high-level operation.

Typical failure mode:
- raw errors with no operational context

Opposite failure mode:
- context so noisy it becomes unreadable

Primary reads:
- `rust-error-handling-patterns.md`
- `handling-rust-errors-elegantly-doctrine.md`

---

## Family 5 — Panic / Invariant Boundary

This family asks:
- is this truly a bug or violated invariant?
- or is this an ordinary recoverable condition?

It matters because panic is not the default production error story in Rust.

Common correct panic zones:
- impossible internal states
- strong invariants already established elsewhere
- tests and narrow proofs

Common incorrect panic zones:
- user input
- file/network/db failures
- validation problems
- interop boundaries

Primary read:
- `rust-error-handling-patterns.md`

---

## Family 6 — Compiler-Driven Recovery

Not all “error work” is runtime error work.
Some errors originate from the compiler and signal problems in:
- ownership design
- lifetime relationships
- type mismatches
- mutation scope

This family deserves its own treatment because the right fix is often architectural, not syntactic.

Primary read:
- `rust-compiler-error-recovery-patterns.md`

---

## Family 7 — Interop and Runtime Translation

When Rust is not the final consumer of the error, the failure must often be translated rather than simply propagated.

Examples:
- C ABI status codes or out-params
- Python exceptions via PyO3
- JS/Promise-facing error values
- Tauri IPC-safe error surfaces
- WASM/module-consumer-facing failures

This family matters because foreign runtimes do not share Rust's native error model.

Primary reads:
- `../interop/rust-ffi-and-interop-overview.md`
- `../interop/rust-interop-testing-and-audit-discipline.md`

---

## Family 8 — Security and Sanitization Error Boundaries

Some errors are operationally useful but dangerous to expose or log naïvely.

This family is about:
- not leaking secrets in messages
- not logging sensitive payloads casually
- preserving enough detail for operators without turning errors into disclosure risks

Primary read:
- `rust-error-handling-security-checklist.md`

---

## Family 9 — Narrative Elegance and Proportionality

A final family is less about mechanics and more about judgment.

It asks:
- is this error surface proportionate?
- is it understandable?
- does it read clearly to humans?
- is the failure shape elegant in the sense of being honest, contextual, and not overengineered?

This is where article-style and narrative doctrine have real value.

Primary read:
- `handling-rust-errors-elegantly-doctrine.md`

---

## Catalog Review Questions

When facing an error-design decision, ask:

- [ ] Is this absence, failure, bug, or foreign-boundary translation?
- [ ] Does the caller need variant-level control or only readable propagation?
- [ ] Is context missing, excessive, or just right?
- [ ] Is panic being used only for true invariants?
- [ ] Does a foreign/runtime boundary require a translated failure shape?
- [ ] Is any security-sensitive information leaking through the error or logs?

---

## Anti-Patterns

- treating all failures as the same family
- defaulting to panic because it is faster to write
- using library-style typed error detail where application ergonomics are what matter
- using application-style broad errors where library callers need precision
- leaving compiler-driven ownership/lifetime failures to ad hoc patching
- exposing raw Rust failure semantics to foreign runtimes

---

## Cross-Links

Read this alongside:
- `rust-error-handling-patterns.md`
- `result-option-match-posture.md`
- `rust-compiler-error-recovery-patterns.md`
- `rust-error-fix-strategies.md`
- `rust-error-handling-security-checklist.md`
- `handling-rust-errors-elegantly-doctrine.md`

---

## Final Doctrine

The reusable lesson is not:
> “Rust errors come in many examples.”

The reusable lesson is:
> “classify the failure family first—absence, runtime failure, compiler recovery, panic boundary, interop translation, or security-sensitive exposure—then apply the doctrine that matches that boundary instead of forcing one universal error style.”
