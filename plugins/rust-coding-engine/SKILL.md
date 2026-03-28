---
name: rust-coding-engine
description: >
  Plugin-first Rust doctrine and runtime engine for ownership and type honesty, architecture decisions, async and concurrency, error handling, production posture, quality discipline, ecosystem selection, and FFI/PyO3/NAPI-RS/WASM/Tauri interop. 适用于 Rust 所有权、架构、并发、错误处理、生产级模式与跨语言互操作场景。
metadata:
  model: opus
  version: "3.0"
  absorbs:
    - analyze-rust-ffi-crate-surface
    - build-rust
    - build-rust-performance
    - exploring-rust-crates
    - gen-rust
    - gtars
    - handling-rust-errors
    - port-c-module
    - pyo3-maturin-bindings
    - rs-crate-search
    - run-rust-benchmarks
    - rust-ffi
    - minimize-rust-ffi-crate-surface
    - opensrc
    - review-rust-docs
    - rig-migrate
    - rs-crate-search
    - rust-cargo-assistant
    - rust-ecosystem
    - rust-learner
    - rust-quality
    - ruvectornode
    - search-rust-doc
    - setup-maturin-lib
    - use-facet-crates
    - dependency
    - deps-sync-crates
    - engine-content
    - lang-rust-docs-dev
    - lang-rust-library-dev
    - librarian
---

# Rust Coding Engine

> Rust that reads like it was written by someone who respects the borrow checker, not fights it.
> 写出与借用检查器共舞的 Rust，而非与之对抗。

## Purpose

This is the canonical runtime shell and doctrine control center for `rust-coding-engine`.

It is no longer just a first-wave shell description.
It now serves as the main control surface for routing Rust-heavy work into a stronger doctrine backbone.

Use this engine when the task is primarily about:
- ownership, borrowing, and type-surface honesty
- project structure and architecture decisions
- async, concurrency, and workload-shape routing
- error handling and compiler-guided recovery
- performance, observability, and production posture
- crate selection and ecosystem trade-offs
- FFI, PyO3, NAPI-RS, WASM, Tauri, and Rust↔TypeScript boundaries

---

## Root Navigation

### Root doctrine entrypoints
- `references/INDEX.md`
- `references/governance/INDEX.md`
- `references/governance/source-reservoir-map.md`

### Primary doctrine lanes
- `references/foundations/INDEX.md`
- `references/architecture/INDEX.md`
- `references/async-concurrency/INDEX.md`
- `references/error-patterns/INDEX.md`
- `references/production/INDEX.md`
- `references/quality/INDEX.md`
- `references/ecosystem/INDEX.md`
- `references/interop/INDEX.md`

### Supporting doctrine lanes
- `references/repo-cases/INDEX.md`
- `references/checklists/INDEX.md`
- `references/playbooks/INDEX.md`
- `references/books/INDEX.md`
- `references/learning-path/INDEX.md`
- `references/cross-language/INDEX.md`

### Bridge skills
- `skills/foundations/SKILL.md`
- `skills/ownership-and-types/SKILL.md`
- `skills/async-and-concurrency/SKILL.md`
- `skills/architecture/SKILL.md`
- `skills/interop/SKILL.md`
- `skills/docs-and-quality/SKILL.md`
- `skills/production-patterns/SKILL.md`

### Runtime surfaces
- `commands/prime/rust-foundations.md`
- `commands/prime/rust-interop.md`
- `commands/diagnose/borrow-checker.md`
- `commands/route/choose-concurrency-pattern.md`
- `commands/route/choose-interop-path.md`

### Bounded specialist agents
- `agents/borrow-checker-diagnostician.md`
- `agents/rust-architecture-reviewer.md`
- `agents/ffi-interop-scout.md`
- `agents/performance-surgeon.md`

---

## Doctrine Spine

### Foundations lane
- `references/foundations/rust-foundations-ownership-memory-safety.md`
- `references/foundations/rust-idiomatic-style-and-patterns.md`
- `references/foundations/rust-ownership-cookbook.md`

### Architecture lane
- `references/architecture/rust-architecture-and-scaffolding.md`
- `references/architecture/rust-library-development-and-cargo-mastery.md`
- `references/architecture/rust-architecture-decision-trees.md`
- `references/architecture/rust-advanced-systems-and-tooling.md`

### Async and concurrency lane
- `references/async-concurrency/rust-concurrency-decision-matrix.md`
- `references/async-concurrency/rust-async-concurrency-deep-patterns.md`

### Error-patterns lane
- `references/error-patterns/rust-error-handling-patterns.md`
- `references/error-patterns/result-option-match-posture.md`
- `references/error-patterns/rust-compiler-error-recovery-patterns.md`
- `references/error-patterns/rust-error-fix-strategies.md`

### Production lane
- `references/production/rust-production-patterns.md`
- `references/production/rust-performance-patterns.md`
- `references/production/rust-logging-and-observability-best-practices.md`
- `references/production/rust-sdk-ci-and-multi-surface-release-pipelines.md`

### Quality lane
- `references/quality/rust-quality-testing-benchmarking-documentation.md`
- `references/quality/rust-testing-patterns.md`
- `references/quality/rustdoc-mastery.md`
- `references/quality/rust-style-and-lint-governance.md`

### Ecosystem lane
- `references/ecosystem/rust-crate-ecosystem-navigator.md`
- `references/ecosystem/rust-ecosystem-discovery.md`
- `references/ecosystem/rust-domain-specific-patterns.md`

### Interop lane
- `references/interop/rust-ffi-and-interop-overview.md`
- `references/interop/boundary-activation-model.md`
- `references/interop/rust-cross-language-workflows.md`
- `references/interop/rust-interop-testing-and-audit-discipline.md`
- `references/interop/rust-typescript-bridge-patterns.md`

This backbone is the primary Rust doctrine surface.
If the shell cannot route into these pages cleanly, it is not doing its job.

---

## Pressure Router

Use this quick mapping when deciding what to load first:

| Pressure | First Owner |
| --- | --- |
| Ownership, borrowing, baseline idiom, type honesty | `references/foundations/INDEX.md` |
| Project shape, workspace structure, service boundaries | `references/architecture/INDEX.md` |
| Async runtime, channels, shared-state, cancellation | `references/async-concurrency/INDEX.md` |
| Fallibility, compiler errors, repair strategy | `references/error-patterns/INDEX.md` |
| Performance, observability, release graph, trust boundaries | `references/production/INDEX.md` |
| Testing, docs, lint, public API quality | `references/quality/INDEX.md` |
| Crate choice and domain-specific ecosystem pressure | `references/ecosystem/INDEX.md` |
| FFI, bindings, WASM, Tauri, Rust↔TS contracts | `references/interop/INDEX.md` |
| Repo-scale evidence and case-study extraction | `references/repo-cases/INDEX.md` |
| Fast verification or review gates | `references/checklists/INDEX.md` |
| Migration, refactor, or anti-pattern recovery | `references/playbooks/INDEX.md` |
| Narrative reinforcement or long-form doctrine | `references/books/INDEX.md` |
| Progressive study or onboarding | `references/learning-path/INDEX.md` |

If two lanes appear relevant, choose the one that owns the earliest or most expensive boundary mistake.

---

## Operating Rule

When the task is Rust-heavy:

1. choose the correct Rust lane first
2. route into the correct doctrinal reading path
3. use bridge skills to load only the smallest useful slice
4. use commands or agents only when explicit runtime leverage is needed
5. treat donor reservoirs as fallback evidence, never as runtime mirrors
6. keep Rust distinct from generic system-language heroics or cargo-cult low-level complexity

The engine exists to make Rust reasoning active, structured, and hard to ignore.

---

## Runtime Surface Map

### Skills
Bridge skills classify and route into doctrine.
They should not duplicate the doctrine tree.

### Commands
Commands own explicit priming, routing, and bounded diagnosis.
They should not become giant doctrine documents in disguise.

### Agents
Agents own bounded specialist reasoning and review.
They should not replace the engine's doctrine center.

### Hooks
Hooks remain conservative lifecycle surfaces:
- startup priming
- precompact handoff preservation
- stop-time review reminders

### Rules
Rules freeze mature shell law for ownership, async, API, error, testing, performance, and style.
They should be used after doctrine is clear, not as a substitute for doctrine.

---

## Boundary

| Layer | Owner | Role |
| --- | --- | --- |
| Canonical doctrine | this engine's references tree | stable Rust knowledge center |
| Runtime shell | this plugin shell | activation, routing, diagnostics, lifecycle surfaces |
| Donor reservoirs | preserved donor families or later source archives | upstream pattern supply, not direct runtime UX |

The shell must point to doctrine.
It must not become a donor mirror or a second doctrine tree.

---

## Cross-Engine Relation

The Rust engine often meets neighboring systems.
Default ownership law:
- this engine owns Rust-side structural truth, ownership law, and native/runtime boundary design
- `typescript-coding-engine` owns TypeScript-side consumer ergonomics and TS-local runtime validation posture when TypeScript is the consumer
- `python-dev-skill` owns Python-side consumer ergonomics when Python is the consumer
- `developer-tool` owns broader runtime-shell, plugin, and cross-platform operational questions when the issue stops being Rust-doctrinal

The doctrine is:
- do not keep a task here if the real bottleneck belongs to another engine
- route outward once cross-engine ownership becomes clearer than convenience

---

## Current State

The Rust engine is now in canonical deep fusion.

What is already true:
- root references doorway exists
- the main reference taxonomy is established and normalized
- governance, repo-case, and cleanup-safe reading rules are explicit
- foundations, architecture, async, error, production, quality, ecosystem, interop, and supporting navigation layers are active
- the shell can route into a real doctrine backbone instead of isolated donor summaries

What remains true:
- deeper expansion is still possible
- module staging and repo-case extraction remain active where complexity is still being absorbed
- the engine is already coherent enough to behave as a real plugin-first heavy engine

---

## Conservative Posture

This shell intentionally stays conservative:
- no destructive automation
- no broad anti-pattern blocking hooks
- no donor repo mirroring
- no mandatory MCP dependency
- no runtime behavior that replaces compiler, tests, benchmarking, or doctrine judgment

The shell is the operational layer.
The doctrine tree remains the main source of truth.

---

## Final Rule

The reusable lesson is not:
> “this plugin helps with Rust.”

The reusable lesson is:
> “the `rust-coding-engine` shell is a doctrine-first control center: it routes by real ownership, runtime, architecture, production, and interop pressure; keeps runtime surfaces bounded; preserves the references tree as the primary knowledge center; and prevents donor abundance or low-level automation enthusiasm from replacing Rust judgment.”
