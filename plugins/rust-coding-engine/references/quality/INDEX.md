# Rust Quality Index

## Purpose

Canonical entrypoint for testing, benchmarking, documentation quality, public API clarity, and engineering discipline inside `rust-coding-engine`.

Use this category when the task is about:

- testing strategy and proof boundaries
- documentation quality and rustdoc posture
- benchmark and regression discipline
- lint, formatting, and review-noise reduction
- public API clarity and trait-surface quality
- turning “works locally” into repeatable, reviewable quality evidence

This index is not only a file list.
It exists to route readers into the correct quality doctrine lane based on the kind of verification or quality pressure they need to make explicit.

## Source Provenance

- **Primary source:** current canonical quality subtree under `references/quality/`
- **Derived from:** testing, documentation, lint, rustdoc, and quality-lane canonization work
- **Upstream URL:** not applicable as a synthesized local navigation index
- **Freshness status:** canonical local index aligned to the current quality subtree

---

## Quality Spine

The quality subtree now has a clear doctrinal spine:

1. **Root quality law**
   - `rust-quality-testing-benchmarking-documentation.md`
2. **Testing doctrine**
   - `rust-testing-patterns.md`
3. **Documentation and rustdoc doctrine**
   - `rustdoc-mastery.md`
   - `rust-doc-examples-discipline.md`
   - `rust-public-api-documentation-and-trait-surface-discipline.md`
4. **Lint and formatting governance**
   - `rust-style-and-lint-governance.md`
   - `rust-workspace-lint-pipeline-discipline.md`
5. **Cross-lane verification links**
   - `../production/rust-production-patterns.md`
   - `../interop/rust-interop-testing-and-audit-discipline.md`

The doctrine is:
- quality reasoning should move from root posture → proof lane → docs/lint/public-surface specifics → cross-lane operational consequences
- not jump straight into a narrow tooling page without understanding what kind of quality proof is actually required

---

## Documents and Their Roles

| File | Primary Role | Load When |
| --- | --- | --- |
| `rust-quality-testing-benchmarking-documentation.md` | Root doctrine for what “high quality” means in Rust systems | you need the quality model first |
| `rust-testing-patterns.md` | Testing doctrine across unit, integration, async, property, snapshot, and benchmark boundaries | behavioral proof is the main concern |
| `rustdoc-mastery.md` | Rustdoc doctrine for navigable, trustworthy public documentation | docs.rs/public docs/rustdoc structure dominate |
| `rust-style-and-lint-governance.md` | Style, lint, and formatting governance for review hygiene and enforcement | lint posture, formatting, and review-noise reduction dominate |
| `rust-doc-examples-discipline.md` | Doctrine for executable examples and example truthfulness | examples, doctests, and usage teaching dominate |
| `rust-workspace-lint-pipeline-discipline.md` | CI-aligned lint/fmt/doc gate posture across workspaces | workspace-wide enforcement and tooling consistency dominate |
| `rust-public-api-documentation-and-trait-surface-discipline.md` | Public API docs, trait surfaces, module docs, and user-facing help quality | consumer-facing API clarity and public contract communication dominate |

---

## Reading Paths

### If you need the root quality model first

1. `rust-quality-testing-benchmarking-documentation.md`
2. then branch by the dominant quality pressure

### If testing and proof are the bottleneck

1. `rust-quality-testing-benchmarking-documentation.md`
2. `rust-testing-patterns.md`
3. `../interop/rust-interop-testing-and-audit-discipline.md` if the proof boundary crosses languages or runtimes
4. `../production/rust-production-patterns.md` if the verification problem is really operational rather than local

### If rustdoc and documentation clarity are the bottleneck

1. `rust-quality-testing-benchmarking-documentation.md`
2. `rustdoc-mastery.md`
3. `rust-doc-examples-discipline.md`
4. `rust-public-api-documentation-and-trait-surface-discipline.md`

### If lint, formatting, or review noise are the bottleneck

1. `rust-quality-testing-benchmarking-documentation.md`
2. `rust-style-and-lint-governance.md`
3. `rust-workspace-lint-pipeline-discipline.md`
4. `../production/rust-production-patterns.md` if the real pressure is release/CI trust rather than style alone

### If the public API surface is the bottleneck

1. `rust-quality-testing-benchmarking-documentation.md`
2. `rust-public-api-documentation-and-trait-surface-discipline.md`
3. `rustdoc-mastery.md`
4. `rust-doc-examples-discipline.md`

### If examples or doctests are the bottleneck

1. `rust-quality-testing-benchmarking-documentation.md`
2. `rust-doc-examples-discipline.md`
3. `rustdoc-mastery.md`
4. `rust-testing-patterns.md` when examples need to be aligned with broader proof layers

### If workspace-wide quality gates are the bottleneck

1. `rust-quality-testing-benchmarking-documentation.md`
2. `rust-workspace-lint-pipeline-discipline.md`
3. `rust-style-and-lint-governance.md`
4. `../production/rust-sdk-ci-and-multi-surface-release-pipelines.md` if the issue is now release/CI architecture

---

## Quality Decision Questions

Before choosing a quality subpage, ask:

1. Is the real pressure about **behavioral proof**, **documentation truth**, **benchmark/regression evidence**, **lint governance**, or **public API clarity**?
2. Is the problem still inside Rust-local quality, or already crossing into interop or production verification?
3. Do we need root quality doctrine first, or are we already certain which specialized quality lane dominates?
4. Are we trying to prove a boundary, reduce review noise, or improve consumer comprehension?

The doctrine is:
- quality docs are organized by proof pressure and communication pressure
- not by whichever tool or check happens to be most visible first

---

## Cross-Links

Quality doctrine overlaps naturally with these lanes:

- **Production**
  - `../production/rust-production-patterns.md`
  - `../production/INDEX.md`
- **Interop**
  - `../interop/rust-interop-testing-and-audit-discipline.md`
  - `../interop/INDEX.md`
- **Error patterns**
  - `../error-patterns/INDEX.md`
- **Architecture**
  - `../architecture/INDEX.md`

The doctrine is:
- quality is where proof and communication become explicit
- so it must remain connected to production, interop, error handling, and architecture rather than pretending it is only about tests or docs in isolation

---

## Cleanup-Safe Rule

This index is canonical navigation.
It should point to:

- doctrine pages
- stable canonical category indexes
- governance-aware cross-links

It should **not** depend on donor reservoir paths or historical root-level filenames for its main reading flow.

---

## Final Rule

The reusable lesson is not:
> “quality is where the testing and docs files live.”

The reusable lesson is:
> “the quality subtree is the canonical navigation layer for proof, documentation truth, benchmark discipline, lint governance, and public API clarity in Rust systems—routing engineers from root quality law into the exact testing, rustdoc, lint, examples, or public-surface doctrine they need before the codebase is treated as trustworthy.”
