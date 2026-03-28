# Handling Rust Errors Elegantly Doctrine

## Purpose

Capture the canonical error-handling lessons distilled from the local HTML donor **Handling Rust errors elegantly**.

This document turns a narrative article reservoir into reusable doctrine for `rust-coding-engine`.

---

## Source Provenance

- **Local donor asset:** `Handling Rust errors elegantly.html`
- **Upstream URL:** not yet verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending

---

## Core Rule

Elegant Rust error handling is not about avoiding errors.
It is about giving failure the right shape, the right visibility, and the right degree of meaning.

That means:
- use the type system to encode failure honestly
- preserve context where it helps
- avoid panic-driven shortcuts in production code
- choose the right level of specificity for the current boundary

---

## Pattern 1 — Error Style Is Part of API Design

How a function fails is part of its contract.
That means error handling belongs near:
- API design
- boundary design
- application architecture

not only in catch/fix snippets.

This is why Rust error posture deserves dedicated doctrine rather than being hidden inside examples.

---

## Pattern 2 — Clarity Beats Cleverness

Elegant error handling is not the same as the most abstract or shortest-looking error handling.

A good error posture prefers:
- explicit failure surfaces
- context that helps operators and developers
- predictable propagation
- minimal surprise

The lesson is:
- elegance in Rust errors comes from clarity and proportionality, not theatrical complexity

---

## Pattern 3 — Panic Is Not the Default Production Story

One of the strongest narrative lessons from error-handling donors is that production code should not normalize:
- `unwrap`
- `expect`
- panic-driven control flow

Those are sometimes appropriate in:
- tests
- proofs of invariants
- narrow internal assumptions with strong justification

But they are not the general production contract.

---

## Pattern 4 — Context Should Be Added Deliberately

A good error message or chain should help answer:
- what failed
- where it failed
- why the current boundary cares

Too little context produces opaque failures.
Too much noise produces unreadable failure surfaces.

The doctrinal goal is the middle path:
- enough context to be useful
- not so much that the error becomes a dumping ground

---

## Pattern 5 — Error Type Selection Is a Boundary Decision

The right error shape changes by boundary.

Examples:
- tight typed enums for libraries and strong internal boundaries
- more ergonomic higher-level wrappers at application boundaries
- user-facing transformation at delivery boundaries
- safe error translation at interop boundaries

This aligns with the broader engine doctrine:
- `Result<T, E>` is not merely syntax
- it is a way of preserving the right meaning for the next consumer

---

## Pattern 6 — Narrative Error Teaching Has Real Value

Unlike terse rule docs, a strong narrative donor teaches:
- how to reason about the shape of failure
- how to decide between styles
- why one approach feels better or worse operationally

That is valuable because engineering judgment often grows through narrative examples, not just through API docs and lint rules.

This is why the donor deserves to become doctrine rather than merely being archived as an article.

---

## What Must Survive Donor Cleanup

If the HTML donor is later cleaned from the active reservoir, the engine must still preserve these lessons:

1. elegant errors are contract design, not ornament
2. panic is not the normal production story
3. context must be deliberate, not noisy
4. boundary type selection matters
5. error clarity is part of Rust engineering quality

---

## Cross-Links

This doctrine should reinforce:
- `result-option-match-posture.md`
- `rust-error-handling-patterns.md`
- `rust-error-fix-strategies.md`
- `rust-error-handling-security-checklist.md`
- `rust-quality-testing-benchmarking-documentation.md`

---

## Final Doctrine

The reusable lesson is not:
> “copy one article's code snippets.”

The reusable lesson is:
> “treat error handling as a design surface where clarity, proportionality, context, and boundary intent matter as much as raw correctness.”
