# Rust Doc Examples Discipline

## Purpose

Define the canonical posture for examples in Rust documentation.

This document distills the strongest reusable lessons from documentation-focused donors and rustdoc example rules.

---

## Source Provenance

- **Primary donor families:** `rust-skills` documentation-rule family, `rustdoc-clap-4.5.60`
- **Key local donor materials:**
  - `rust-skills/rules/doc-examples-section.md`
  - `rust-skills/rules/doc-all-public.md`
  - `rust-skills/rules/doc-module-inner.md`
  - `rust-skills/rules/doc-link-types.md`
- **Upstream URL:** not yet verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending

---


## Core Rule

Examples are not decoration.
They are executable contract evidence.

A public API without usable examples forces readers to reverse-engineer intent from type signatures and source.
That is avoidable friction.

---

## Pattern 1 — Public APIs Should Prefer Example-Backed Docs

A strong Rust documentation posture expects public items to explain:
- what they do
- how they are used
- what success and failure look like in practice

This is why `# Examples` sections matter so much.
They provide the shortest trustworthy bridge from abstraction to usage.

---

## Pattern 2 — Examples Should Be Runnable When Possible

The strongest example is one that can be checked mechanically.

Rust's doc test culture is powerful because it helps keep examples from decaying into fiction.

The lesson is:
- prefer examples that can be exercised
- prefer examples that show realistic usage
- avoid examples that merely restate the signature without teaching anything

---

## Pattern 3 — Hide Setup, Show the Important Part

A good example should foreground the behavior being taught, not drown the reader in boilerplate.

That means:
- hide setup when appropriate
- keep the visible path short
- preserve compilability where possible

The doctrinal point is clarity, not minimalism for its own sake.
The reader should see the pattern immediately.

---

## Pattern 4 — Show Failure and Edge Cases Too

A serious API often needs more than one happy-path example.

Especially valuable:
- empty input behavior
- error-returning behavior
- boundary or edge-case behavior
- optional/none cases

This matters because examples are part of how the API teaches its own contract.

---

## Pattern 5 — Use `?` and Real Result Flow Where It Clarifies

When examples involve fallible operations, the example posture should align with Rust's real error model.

That often means:
- use `?` in example scaffolding
- show fallibility honestly
- avoid unnecessary `unwrap` in instructional examples unless the point is explicitly narrow and safe

The deeper lesson is:
- examples should reinforce good Rust habits, not bypass them casually

---

## Pattern 6 — Documentation Quality Is Part of Engineering Quality

Doc examples sit at the intersection of:
- API design
- quality discipline
- rustdoc mastery
- testing posture

A codebase that treats examples seriously tends to also:
- maintain clearer contracts
- produce better public APIs
- reduce onboarding friction
- reduce support burden

So this is not a soft concern.
It is an engineering quality concern.

---

## Pattern 7 — Example Discipline Should Be Enforced Indirectly

Do not try to encode all example quality in prose alone.
Use a combination of:
- documentation doctrine
- rustdoc expectations
- linting / missing-docs posture
- test/doc-test culture

The goal is to make example quality normal rather than heroic.

---

## Why This Matters to `rust-coding-engine`

This doctrine strengthens the engine's ability to teach:
- why examples matter
- what a good Rust example looks like
- how example quality supports API quality
- how doc examples fit into broader quality governance
