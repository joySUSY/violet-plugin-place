# Rust References Index

## Purpose

This is the canonical navigation entrypoint for `rust-coding-engine/references` after the Rust taxonomy re-architecture and subsequent canonical deep-fusion passes.

The reference tree is organized by **doctrinal responsibility**, not by historical accretion.
Use this index first instead of scanning directories by filename alone.

This page exists to answer a practical routing question:

> given a real Rust task, which doctrinal lane should be loaded first, which supporting lanes usually follow, and how do the engine's foundations, architecture, interop, production, quality, governance, and case-study layers fit together as one system?

## Source Provenance

- **Primary source:** current canonical Rust reference tree under `rust-coding-engine/references/`
- **Derived from:** the Phase E reference re-architecture and subsequent doctrine canonization passes
- **Upstream URL:** not applicable as a synthesized local navigation index
- **Freshness status:** canonical local index aligned to the current Rust engine structure

---

## Taxonomy

| Category | Purpose | Load When |
| --- | --- | --- |
| `foundations/` | Ownership, borrowing, idiomatic baseline, first-principles Rust | you need the Rust mental model first |
| `architecture/` | Project structure, scaffolding, workspace shape, large-system architecture | you are deciding system shape or crate boundaries |
| `async-concurrency/` | Tokio, task models, structured concurrency, synchronization | workload shape, scheduling, or coordination dominates |
| `interop/` | FFI, PyO3, NAPI-RS, Rust⇄TS, WASM, Tauri, contract boundaries | the task crosses language or runtime boundaries |
| `error-patterns/` | Fallibility posture, panic discipline, propagation, compiler-error recovery | the task is about failures, recovery, or secure error surfaces |
| `production/` | Operational truth, performance, observability, release graphs, trust boundaries | the system must survive real production pressure |
| `quality/` | Testing, benchmarking, docs quality, rustdoc, lint and review discipline | you are proving quality or maintaining engineering discipline |
| `ecosystem/` | Crate discovery, domain-specific Rust guidance | tool or crate selection pressure dominates |
| `repo-cases/` | Curated lessons from large donor repos | you need repo-scale architectural evidence |
| `books/` | Book/article reservoirs and curated doctrine extractions | you want deeper narrative doctrine or concept reinforcement |
| `cross-language/` | Comparative cross-language reference notes | language-to-language comparison is the main lens |
| `checklists/` | Operational audit and master verification surfaces | you need a short audit or review pass |
| `playbooks/` | Migration, refactoring, corrective strategy playbooks | the task is staged remediation or migration |
| `learning-path/` | Ordered chapter sequence for progressive study | the goal is learning rather than immediate implementation |
| `governance/` | Source-reservoir maps and reference-system governance | the task is about donor ownership, cleanup readiness, or canonization rules |

---

## Reference Spines

The Rust reference tree is no longer just a set of folders.
It now has several strong doctrinal spines.

### 1. Foundations → Architecture spine

Use this spine when starting new Rust work or stabilizing a system's shape.

- `foundations/rust-foundations-ownership-memory-safety.md`
- `architecture/rust-architecture-and-scaffolding.md`
- `architecture/rust-architecture-decision-trees.md`

This spine answers:
- how Rust thinks
- how the project should be shaped
- how complexity should scale

### 2. Interop spine

Use this spine when Rust crosses a language or runtime boundary.

- `interop/rust-ffi-and-interop-overview.md`
- `interop/boundary-activation-model.md`
- lane doctrine:
  - C/C++ FFI
  - Python / PyO3 / Maturin
  - Node native addon
  - Rust⇄TypeScript contracts
  - WASM
  - Tauri
- `interop/rust-cross-language-workflows.md`
- `interop/rust-interop-testing-and-audit-discipline.md`

This spine answers:
- which interop lane is active
- who owns structural truth
- how workflow, verification, and release consequences should be handled

### 3. Production spine

Use this spine when operational truth matters more than local correctness alone.

- `production/rust-production-patterns.md`
- `production/rust-performance-patterns.md`
- `production/rust-logging-and-observability-best-practices.md`
- `production/rust-sdk-ci-and-multi-surface-release-pipelines.md`

This spine answers:
- how runtime truth becomes explicit
- how release graphs are governed
- how systems survive load, failure, and deployment pressure

### 4. Error and quality spine

Use this spine when the task is about failure law, testing, docs, or engineering discipline.

- `error-patterns/INDEX.md`
- `quality/INDEX.md`
- `checklists/INDEX.md`
- `playbooks/INDEX.md`

This spine answers:
- how fallibility should be modeled
- how correctness is proved
- how refactor or migration should proceed safely

### 5. Repo-case and governance spine

Use this spine when you need donor-grade evidence or cleanup-safe canonization law.

- `repo-cases/INDEX.md`
- `repo-cases/case-study-governance.md`
- `governance/INDEX.md`
- `governance/source-reservoir-map.md`

This spine answers:
- how donor lessons become doctrine
- when a donor is replacement-grade
- how cleanup-safe navigation and provenance are preserved

---

## Recommended Reading Paths

### If you are starting a Rust task from scratch

1. `foundations/rust-foundations-ownership-memory-safety.md`
2. `architecture/rust-architecture-and-scaffolding.md`
3. then branch by the dominant pressure

### If the task is interop-heavy

1. `interop/INDEX.md`
2. `interop/rust-ffi-and-interop-overview.md`
3. `interop/boundary-activation-model.md` if lane selection is still unclear
4. then lane-specific doctrine
5. `interop/rust-cross-language-workflows.md` if the system spans multiple surfaces
6. `interop/rust-interop-testing-and-audit-discipline.md` when proof/audit is central

### If the task is performance or production-heavy

1. `production/INDEX.md`
2. `production/rust-production-patterns.md`
3. `production/rust-performance-patterns.md`
4. branch into observability or release-graph doctrine if needed

### If the task is debugging fallibility or error surfaces

1. `error-patterns/INDEX.md`
2. `error-patterns/rust-error-handling-patterns.md`
3. `error-patterns/rust-compiler-error-recovery-patterns.md` when compiler failures dominate
4. return to quality or playbooks if the task becomes corrective/migratory

### If the task is repo-scale architecture

1. `repo-cases/INDEX.md`
2. matching case-study extraction
3. `architecture/rust-architecture-and-scaffolding.md`
4. `governance/source-reservoir-map.md` if donor promotion/cleanup readiness matters

### If the task is about testing, docs, or engineering discipline

1. `quality/INDEX.md`
2. `quality/rust-quality-testing-benchmarking-documentation.md`
3. branch into testing, rustdoc, lint, or public API documentation discipline as needed

### If the task is exploratory crate selection or domain-specific Rust practice

1. `ecosystem/INDEX.md`
2. `ecosystem/rust-crate-ecosystem-navigator.md`
3. `ecosystem/rust-domain-specific-patterns.md` when domain pressure is the real differentiator

### If the task is learning-oriented

1. `learning-path/INDEX.md`
2. follow the chapter sequence in order
3. branch back into the canonical lane once the practical task becomes concrete

### If the task is about donor readiness, canonization, or cleanup safety

1. `governance/INDEX.md`
2. `governance/source-reservoir-map.md`
3. `repo-cases/case-study-governance.md` when repo donors are involved

---

## Root Navigation Questions

Before diving into a subpage, ask:

1. Is this primarily a **foundations** question, an **architecture** question, an **interop** question, a **production** question, or a **quality/error** question?
2. Is the real pressure about **system shape**, **runtime behavior**, **cross-language boundaries**, **release truth**, or **verification proof**?
3. Do I need the **root lane doctrine** first, or am I already certain which specialized page owns the problem?
4. Is this problem still local to Rust, or is it already crossing into another engine or runtime?

The doctrine is:
- the root index routes by problem pressure
- not by whichever filename looks familiar first

---

## Cross-Lane Rules

### Foundations before cleverness
If the problem smells foundational, start in `foundations/` before loading advanced doctrine.

### Architecture before imitation
If the problem is about structure, start in `architecture/` or `repo-cases/`, not by copying donor layouts blindly.

### Interop before tooling
If the task crosses a boundary, load `interop/` before making tool or packaging decisions.

### Production before optimization theater
If the task is operational, start in `production/` before treating it as isolated performance tweaking.

### Governance before cleanup
If the task is about replacement-grade doctrine or cleanup readiness, load `governance/` before making deletion or archival judgments.

---

## Cleanup-Safe Rule

The taxonomy above is canonical.
Historical root-level filenames or donor reservoir layouts are no longer the preferred reading surface.
Use the categorized tree instead.

Canonical navigation should point to:
- doctrine pages
- stable category indexes
- governance-aware reading paths

It should **not** depend on cleanup-candidate donor reservoir filesystem paths for normal reading flow.

---

## Final Rule

The reusable lesson is not:
> “the Rust engine has many reference folders.”

The reusable lesson is:
> “the Rust reference tree is a governed doctrinal system: use the root index to classify the dominant engineering pressure, route into the correct spine, and only then dive into specialized doctrine—so the engine behaves like a coherent knowledge system rather than a large directory of notes.”
