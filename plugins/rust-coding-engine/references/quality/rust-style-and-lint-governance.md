# Rust Style and Lint Governance

## Purpose

Define the canonical governance model for Rust style, linting, and formatting inside `rust-coding-engine`.

This document distills the strongest reusable lessons from style-oriented donors without blindly copying team-local quirks into universal doctrine.

---

## Source Provenance

- **Primary donor families:** `rust-style-guidelines`, `rust-style-lint`, `rust-style` variants, `rust-skills` lint/docs/style rule families
- **Key local donor materials:**
  - `rust-style-guidelines/rust-style-guidelines/SKILL.md`
  - `rust-style-lint/rust-style-lint/SKILL.md`
  - `rust-style (1)/rust-style/style-guide.md`
  - `rust-style (1)/rust-style/examples.md`
- **Upstream URL:** not yet verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending

---


## Core Rule

Style is not only cosmetic.
In Rust, style governance determines whether the codebase stays:
- readable
- reviewable
- mechanically enforceable
- stable across many crates and contributors

A mature Rust engine therefore treats style and lint posture as engineering governance, not as personal taste.

---

## Pattern 1 — Separate Universal Doctrine from Local Convention

Some donor rules are broadly reusable.
Some are team-local preferences.
The engine must not confuse them.

### Usually canonical
- self-explanatory code over decorative comments
- consistent naming
- import grouping discipline
- workspace-level lint governance
- `cargo fmt --check` in CI
- `thiserror` for library-facing typed errors
- lower-case error messages unless a proper noun or acronym justifies otherwise
- borrowed types where ownership is unnecessary (`&str`, `&[u8]`, `&Path`)

### Often local-policy, not universal Rust law
- British spelling over American spelling
- always preferring accessors/mutators over `pub` fields in every context
- specific rustfmt import-granularity settings as if they were language law

The doctrinal lesson is:
> canonize the durable engineering principle, not every local team preference.

---

## Pattern 2 — Formatting Must Be Mechanical

Formatting should be machine-enforced, not discussed ad hoc in code review.

That means:
- a project rustfmt posture exists
- `cargo fmt --check` is part of CI
- local format-on-save or pre-commit support is encouraged

The purpose is not perfectionism.
The purpose is to remove noise from review and keep diffs predictable.

---

## Pattern 3 — Lints Need a Governance Home

A mature Rust codebase should prefer workspace-level lint governance where possible.

Why:
- it keeps expectations aligned across crates
- it reduces silent drift in standards
- it makes CI enforcement legible

A good posture distinguishes:
- correctness and suspicious lints as stricter
- style/complexity/perf lints as visible but proportionate
- selective crate-level overrides only when justified by context

The lesson is not “enable everything blindly”.
The lesson is to make the lint posture explicit and consistent.

---

## Pattern 4 — Clippy, rustfmt, and Dylint Play Different Roles

These tools are related but distinct.

### `rustfmt`
Owns:
- mechanical formatting
- import layout according to configured style
- stable text shape

### `clippy`
Owns:
- correctness warnings
- suspicious patterns
- style/perf/complexity feedback
- project-wide hygiene enforcement

### `dylint` or custom lint suites
Owns:
- team- or domain-specific policies when the standard lints are not enough

The doctrinal point is:
- use the right enforcement layer for the right class of rule
- do not force rustfmt to solve policy questions it cannot solve
- do not force clippy to act as architecture doctrine by itself

---

## Pattern 5 — Style Should Improve API Clarity, Not Fight It

Good Rust style governance reinforces API ergonomics.

Examples:
- prefer borrowed types when ownership is not needed
- prefer names that reflect semantic role, not convenience shortcuts
- use `into_`, `to_`, `as_`, `is_` families with meaning
- avoid useless imports and noisy signatures

The style system is working when it makes APIs easier to trust and use.

---

## Pattern 6 — Typed Error and Documentation Discipline Belong Nearby

In Rust, style governance overlaps with:
- typed error posture
- documentation posture
- unsafe documentation expectations
- example quality

That is why style doctrine should stay near:
- quality doctrine
- rustdoc doctrine
- rule indexes for style/docs/lint

This is broader than naming and whitespace.
It is about how the code communicates its invariants.

---

## Pattern 7 — Review Noise Is a Design Smell

If review repeatedly argues about:
- formatting
- imports
- trivial naming cleanup
- obvious lint hygiene

then the style/lint governance is too weak.

The correct remedy is not “review harder”.
It is:
- push mechanical issues into tooling
- reserve review attention for architecture, semantics, and trade-offs

---

## Why This Matters to `rust-coding-engine`

This doctrine strengthens the engine's ability to teach:
- style as governance
- workspace lint strategy
- where local policy ends and canonical doctrine begins
- why formatting and linting are engineering leverage, not bikeshed fuel
