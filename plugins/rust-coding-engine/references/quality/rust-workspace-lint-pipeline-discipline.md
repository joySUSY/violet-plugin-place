# Rust Workspace Lint Pipeline Discipline

## Purpose

Define the canonical posture for workspace-wide lint, formatting, and doc-quality enforcement in Rust projects.

This document distills the strongest reusable lessons from:
- workspace lint rules
- rustfmt CI discipline
- documentation example discipline
- style/lint donor families

---

## Source Provenance

- **Primary donor families:** `rust-skills`, `rust-style-lint`, `rust-sdk-ci`
- **Key local donor materials:**
  - `rust-skills/rules/lint-workspace-lints.md`
  - `rust-skills/rules/lint-rustfmt-check.md`
  - `rust-sdk-ci/rust-sdk-ci/skill.md`
- **Upstream URL:** not yet verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending

---


## Core Rule

Linting and formatting should be treated as part of the engineering pipeline, not as personal clean-up done only when someone remembers.

In Rust, that means:
- workspace-level standards where possible
- CI enforcement for mechanical rules
- local workflows that mirror CI enough to reduce surprise
- explicit distinction between formatting, linting, docs, and tests

---

## Pattern 1 — Workspace Lint Governance Beats Per-Crate Drift

A strong donor lesson is that crate-by-crate lint posture tends to drift unless there is a shared workspace policy.

That creates problems:
- inconsistent expectations
- uneven review quality
- warnings slipping through in some crates but not others

The better posture is:
- define common lint expectations at workspace level
- inherit them in individual crates
- allow overrides only when the crate context truly justifies them

This keeps the codebase coherent without pretending every crate is identical.

---

## Pattern 2 — rustfmt Is the Mechanical Baseline

`cargo fmt --all --check` in CI is not optional hygiene theater.
It is the baseline mechanism that:
- removes formatting debate
- keeps diffs predictable
- standardizes import and layout behavior

The engine should teach that formatting is a machine job.
Humans should spend review energy on meaning, not on brace placement and import trivia.

---

## Pattern 3 — Clippy Categories Need Intentional Severity

Donor rules show a useful pattern:
- correctness/suspicious lints deserve stronger posture
- style/complexity/perf lints deserve visible but proportionate posture
- some pedantic or nursery lints are valuable selectively, not dogmatically

The lesson is:
- lint governance is not “turn on everything”
- it is a policy design problem

A mature pipeline defines severity with purpose.

---

## Pattern 4 — Workspace Docs and rustdoc Quality Belong in the Pipeline Too

Lint pipeline discipline should also account for:
- rustdoc quality
- broken intra-doc links
- example quality expectations
- missing-doc posture where appropriate

This matters because Rust documentation is unusually close to executable truth.
Ignoring docs in the pipeline weakens the whole quality posture.

---

## Pattern 5 — Local and CI Commands Should Resemble Each Other

A healthy pipeline minimizes “it worked locally but CI disagreed.”

That means:
- local commands should mirror CI checks where practical
- contributors should be able to reproduce failures quickly
- the codebase should not hide important pipeline behavior behind opaque CI-only magic

The exact wrappers may vary, but the doctrinal principle is stable:
- reproducible quality checks reduce friction and improve trust

---

## Pattern 6 — Formatting, Linting, Docs, and Tests Are Related but Distinct

A mature Rust quality pipeline should preserve these as distinct layers:
- formatting
- linting
- documentation quality
- tests

They reinforce one another, but they do not replace one another.

This distinction helps the engine avoid a common anti-pattern:
- collapsing all quality discussion into “run clippy”

That is too shallow.

---

## Pattern 7 — Exceptions Must Be Explicit, Not Tribal

If a crate needs an exception:
- binary crate allowing a certain lint
- test-utils crate allowing print statements
- generated code excluded from rustfmt

that exception should be explicit and justified.

The doctrine should not assume:
- exceptions do not exist
- or exceptions can remain tribal knowledge

Explicit exceptions are part of mature governance.

---

## Pattern 8 — Pipeline Discipline Reduces Review Noise and Production Risk

The best reason to invest in workspace lint pipeline discipline is not style purity.
It is leverage.

Benefits:
- lower review noise
- faster confidence-building
- more coherent workspace expectations
- fewer obvious regressions reaching production
- stronger documentation and example quality

This is why lint pipeline doctrine belongs inside `rust-coding-engine`, not only in CI config files.

---

## Why This Matters to `rust-coding-engine`

This doctrine strengthens the engine's ability to teach:
- workspace-level quality governance
- CI as policy enforcement
- rustfmt/clippy/doc/test separation of concerns
- explicit exceptions instead of hidden drift
- the idea that quality pipelines are architecture support systems, not chores
