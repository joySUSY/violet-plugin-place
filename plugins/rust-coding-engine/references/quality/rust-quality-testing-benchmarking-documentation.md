# Rust Quality: Testing, Benchmarking, and Documentation

## Purpose

Define the canonical root doctrine for quality engineering in Rust systems.

This document is the quality-lane overview inside `rust-coding-engine`.
It should answer the deeper question:

> what does a Rust codebase need in order to deserve the label “high quality,” beyond merely compiling and passing a handful of tests?

It is not meant to replace the specialized quality documents.
It exists to connect them into one coherent quality posture.

---

## Source Provenance

- **Primary donor families:** `rust-skills` testing/doc/lint rule families, `rustdoc-clap-4.5.60`, quality-oriented Rust reservoir material
- **Key local donor materials:**
  - `rust-skills/rules/test-criterion-bench.md`
  - `rust-skills/rules/test-doctest-examples.md`
  - `rust-skills/rules/doc-all-public.md`
  - `rust-skills/rules/doc-examples-section.md`
  - `rust-skills/rules/lint-workspace-lints.md`
  - `rust-skills/rules/lint-rustfmt-check.md`
  - current canonical docs under `references/quality/`
- **Upstream URL:** not yet fully re-verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending

---

## Core Rule

Rust quality is the discipline of making correctness, usability, maintainability, and regression resistance *visible and repeatable*.

That means high quality is not one thing.
It is the coordinated result of:
- testing the right boundaries
- documenting the public surface clearly
- benchmarking and profiling the right paths
- enforcing style/lint/doc gates mechanically where appropriate

A Rust system is not “high quality” because it has one of these.
It is high quality when these parts reinforce each other instead of drifting apart.

---

## Quality Surfaces

| Surface | What it protects |
|---|---|
| Unit/integration/async/property tests | behavioral correctness and boundary trust |
| Doctests/examples | documentation truth and API usability |
| Benchmarks | performance regression awareness |
| Rustdoc and public docs | consumer comprehension and maintainability |
| Style/lint/fmt/doc gates | review hygiene and consistent enforcement |

These surfaces are complementary.
No single surface can stand in for the rest.

---

## Pattern 1 — Testing Is a Boundary-Proof System, Not a Checkbox

Testing is strongest when different layers prove different things.

Examples:
- unit tests prove local logic
- integration tests prove the public crate boundary
- async/runtime tests prove concurrency/runtime semantics
- property-based tests prove invariants across wide spaces
- snapshot tests prove stable output surfaces

This is why `rust-testing-patterns.md` exists as a dedicated deep doctrine.

The quality lesson is:
- do not collapse all test types into one undifferentiated pile
- choose the test layer that matches the behavior being claimed

---

## Pattern 2 — Documentation Is Part of the Quality Contract

Rust quality is unusually tied to documentation because:
- public APIs can be richly documented with rustdoc
- examples can compile and run as doctests
- docs.rs becomes part of the real user experience

That means documentation is not post-hoc decoration.
It is part of the crate's usability and trustworthiness.

A public API without sufficient docs often shifts the support burden to source-diving and guesswork.
That is a quality failure, not just a docs failure.

---

## Pattern 3 — Executable Examples Are a Gold Standard

Doctests are one of the strongest quality loops in Rust.

Why:
- they teach usage
- they validate examples stay current
- they catch drift between public documentation and real API behavior

This is why doc examples deserve explicit doctrine of their own:
- `rust-doc-examples-discipline.md`
- `rustdoc-mastery.md`

The lesson is simple:
- examples are strongest when they are executable
- executable examples turn documentation into quality evidence

---

## Pattern 4 — Benchmarking Has a Distinct Quality Role

Benchmarking is not just “performance stuff over there.”
It is one part of the overall quality posture because regressions in throughput, latency, or allocation behavior can be quality failures.

Still, benchmarks are not ordinary tests.
Their role is to:
- compare implementations
- track regressions
- provide statistical signal about performance-sensitive paths

This is why benchmarking belongs in the quality lane, but with its own discipline.
It should not be confused with ordinary correctness proofs.

---

## Pattern 5 — Mechanical Gates Should Remove Review Noise

A mature Rust codebase should avoid spending review attention on issues that tools can catch consistently.

Examples:
- rustfmt for formatting
- workspace lint policy for clippy/rustdoc expectations
- doc lints for missing docs or unsafe explanations where appropriate
- CI checks for test/doc/format/lint workflows

The doctrine is:
- push mechanical and repetitive quality work into tooling
- reserve human review for semantics, trade-offs, and architecture

This is how quality scales without exhausting the team.

---

## Pattern 6 — Documentation, Testing, and Benchmarking Should Not Drift Into Silos

A weak quality posture often looks like this:
- tests exist, but docs lie
- docs exist, but examples don't run
- benchmarks exist, but nobody knows what boundary they guard
- lints run, but they don't align with actual team expectations

A strong posture aligns the surfaces:
- public docs describe what the public API really does
- doctests/examples prove those docs
- integration tests validate the external contract
- benchmarks protect performance-sensitive promises
- CI/lints make enforcement consistent

This alignment matters more than the raw number of tools used.

---

## Pattern 7 — Public-Surface Quality and Internal Quality Are Related but Distinct

A Rust crate has at least two quality audiences:

### Internal maintainers
Need:
- readable structure
- trustworthy tests
- enforceable style/lint posture
- confidence in refactoring

### External consumers
Need:
- stable and understandable API
- docs/examples that work
- reliable release behavior
- confidence that performance/correctness claims are real

The quality lane must serve both.
A crate can feel “clean internally” while still being weakly documented and hostile to consumers.

---

## Pattern 8 — Quality Work Should Be Proportionate to Boundary Importance

Not every crate needs the same level of quality ceremony.

Examples:
- a tiny internal tool may not need elaborate docs.rs polish
- a public crate should be much stricter about docs/examples/metadata/stability
- a performance-sensitive core crate may justify stronger benchmarks and profiling discipline

The doctrine is:
- increase quality rigor where boundary importance and operational risk demand it
- but do not treat every tiny internal file as if it were a public ecosystem artifact

This keeps quality serious without making it performative.

---

## Pattern 9 — Quality Gates Should Form a Coherent Pipeline

A healthy quality pipeline often includes some combination of:
- formatting checks
- lint checks
- unit/integration/async tests
- doctests
- benchmark or regression checks where relevant
- docs generation checks

The exact pipeline can vary.
What matters is coherence.

Good questions:
- what can fail the pipeline?
- what is a warning vs a hard stop?
- what is checked locally vs in CI?
- which boundaries are intentionally protected by the pipeline?

Without this coherence, “quality automation” becomes a pile of disconnected commands.

---

## Pattern 10 — Quality Is a System of Trust Preservation

The final reason all this matters is trust.

Quality practices preserve trust between:
- current and future maintainers
- library authors and consumers
- code and documentation
- claimed performance and measured performance
- implementation and release artifact

Rust gives unusually strong tools for building this trust.
The quality lane exists to ensure those tools are used intentionally.

---

## Audit Checklist

Before calling a Rust quality posture healthy, ask:

- [ ] Are the correct test layers proving the correct boundaries?
- [ ] Are public docs and examples strong enough for real users?
- [ ] Do examples compile/run where they should?
- [ ] Are benchmarks protecting meaningful performance promises rather than existing as ornament?
- [ ] Do lint/format/doc gates reduce review noise and drift?
- [ ] Do all these surfaces reinforce one another instead of living in separate silos?

---

## What This Document Does Not Own

This quality root doctrine does **not** fully own:
- deep testing patterns -> `rust-testing-patterns.md`
- rustdoc specifics -> `rustdoc-mastery.md`
- doc examples discipline -> `rust-doc-examples-discipline.md`
- style/lint governance -> `rust-style-and-lint-governance.md`
- workspace lint/doc pipeline discipline -> `rust-workspace-lint-pipeline-discipline.md`
- public API docs and trait-surface discipline -> `rust-public-api-documentation-and-trait-surface-discipline.md`

This separation is intentional.
The root doctrine defines the quality model; the supporting docs define the specialist lanes.

---

## Anti-Patterns

- treating tests as the only quality surface
- writing docs that are not validated by examples or real consumer use
- running benchmarks with no claim they actually protect
- style/lint rules that exist only as review arguments rather than tool-enforced policy
- quality tooling that is disconnected from the boundaries it is supposed to protect
- siloed “docs people / test people / perf people” mentalities that let the crate drift apart

---

## Cross-Links

Read this alongside:
- `rust-testing-patterns.md`
- `rustdoc-mastery.md`
- `rust-doc-examples-discipline.md`
- `rust-style-and-lint-governance.md`
- `rust-workspace-lint-pipeline-discipline.md`
- `rust-public-api-documentation-and-trait-surface-discipline.md`
- `../production/rust-performance-patterns.md`

---

## Final Doctrine

The reusable lesson is not:
> “Rust quality means tests, docs, and benchmarks all exist.”

The reusable lesson is:
> “Rust quality is the coordinated discipline of proving behavior, preserving documentation truth, enforcing style mechanically, and measuring performance where it matters—so that the system stays trustworthy as it evolves.”
