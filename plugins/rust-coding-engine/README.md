# Rust Coding Engine Plugin Shell

Canonical runtime shell and doctrine control center for the `rust-coding-engine`.

## Purpose

This document is the root operational overview for the Rust engine.

It explains:

- what the engine is for
- what its runtime shell owns
- how to enter the doctrine tree correctly
- how the shell relates to donor reservoirs and neighboring engines
- how Rust-heavy work should be routed by the real pressure of the task

Use `references/INDEX.md` for the main doctrinal reading path.

This engine is the active Rust doctrine system for:

- ownership, borrowing, and type-surface honesty
- project structure and architecture decisions
- async, concurrency, and workload-shape routing
- error handling and compiler-guided recovery
- performance, observability, and production posture
- FFI, PyO3, NAPI-RS, WASM, Tauri, and Rust↔TypeScript boundaries

It does **not** replace:

- preserved donor reservoirs or later archival source stores
- broader shell/runtime/tooling doctrine owned by `developer-tool`
- Python or TypeScript consumer ergonomics owned by their respective engines when Rust is not the consumer-side owner

---

## Root Reading Path

1. `references/INDEX.md`
2. `references/governance/source-reservoir-map.md`
3. then branch into the correct doctrinal lane:
   - `references/foundations/INDEX.md`
   - `references/architecture/INDEX.md`
   - `references/async-concurrency/INDEX.md`
   - `references/error-patterns/INDEX.md`
   - `references/production/INDEX.md`
   - `references/quality/INDEX.md`
   - `references/ecosystem/INDEX.md`
   - `references/interop/INDEX.md`
4. use `references/repo-cases/INDEX.md`, `references/books/INDEX.md`, `references/checklists/INDEX.md`, `references/playbooks/INDEX.md`, or `references/learning-path/INDEX.md` only when their specific pressure becomes the real bottleneck

The doctrine is:

- references own the stable Rust knowledge center
- the shell exists to make the correct doctrine easier to reach than the wrong donor or runtime shortcut

---

## Runtime Surface Map

### Skills

Bridge skills load the smallest useful slice of Rust doctrine:

- `skills/foundations/SKILL.md`
- `skills/ownership-and-types/SKILL.md`
- `skills/async-and-concurrency/SKILL.md`
- `skills/architecture/SKILL.md`
- `skills/interop/SKILL.md`
- `skills/docs-and-quality/SKILL.md`
- `skills/production-patterns/SKILL.md`

### Commands

Commands own explicit operational workflows:

- `commands/prime/rust-foundations.md`
- `commands/prime/rust-interop.md`
- `commands/diagnose/borrow-checker.md`
- `commands/route/choose-concurrency-pattern.md`
- `commands/route/choose-interop-path.md`

### Agents

Agents own bounded specialist reasoning:

- `agents/borrow-checker-diagnostician.md`
- `agents/rust-architecture-reviewer.md`
- `agents/ffi-interop-scout.md`
- `agents/performance-surgeon.md`

### Hooks

Hooks remain conservative lifecycle surfaces:

- `hooks/hooks.json`
- `hooks/scripts/session-start-prime.sh`
- `hooks/scripts/precompact-handoff.sh`
- `hooks/scripts/stop-review.sh`

### Rules

Rules freeze stable shell law for:

- `rules/ownership/INDEX.md`
- `rules/async/INDEX.md`
- `rules/api/INDEX.md`
- `rules/error/INDEX.md`
- `rules/testing/INDEX.md`
- `rules/perf/INDEX.md`
- `rules/style/INDEX.md`

The doctrine is:

- skills classify and bridge
- commands operationalize
- agents diagnose and review
- hooks preserve lifecycle continuity
- rules freeze mature law

---

## Doctrine Backbone

### Foundations lane

- `references/foundations/rust-foundations-ownership-memory-safety.md`
- `references/foundations/rust-idiomatic-style-and-patterns.md`
- `references/foundations/rust-ownership-cookbook.md`

### Architecture lane

- `references/architecture/rust-architecture-and-scaffolding.md`
- `references/architecture/rust-library-development-and-cargo-mastery.md`
- `references/architecture/rust-architecture-decision-trees.md`

### Async and concurrency lane

- `references/async-concurrency/rust-concurrency-decision-matrix.md`
- `references/async-concurrency/rust-async-concurrency-deep-patterns.md`

### Error-patterns lane

- `references/error-patterns/rust-error-handling-patterns.md`
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

### Ecosystem lane

- `references/ecosystem/rust-crate-ecosystem-navigator.md`
- `references/ecosystem/rust-ecosystem-discovery.md`
- `references/ecosystem/rust-domain-specific-patterns.md`

### Interop lane

- `references/interop/rust-ffi-and-interop-overview.md`
- `references/interop/boundary-activation-model.md`
- `references/interop/rust-cross-language-workflows.md`
- `references/interop/rust-interop-testing-and-audit-discipline.md`

This backbone is the primary Rust doctrine surface.
If the shell cannot route into these pages cleanly, it is not doing its job.

---

## Pressure Router

Use this quick mapping when deciding what to load first:

| Pressure                                                    | First Owner                             |
| ----------------------------------------------------------- | --------------------------------------- |
| Ownership, borrowing, baseline idiom, type honesty          | `references/foundations/INDEX.md`       |
| Project shape, boundaries, workspace structure              | `references/architecture/INDEX.md`      |
| Async runtime, channels, shared-state, cancellation         | `references/async-concurrency/INDEX.md` |
| Fallibility, compiler errors, repair strategy               | `references/error-patterns/INDEX.md`    |
| Performance, observability, release graph, trust boundaries | `references/production/INDEX.md`        |
| Testing, docs, lint, public API quality                     | `references/quality/INDEX.md`           |
| Crate choice, domain-specific ecosystem pressure            | `references/ecosystem/INDEX.md`         |
| FFI, bindings, WASM, Tauri, Rust↔TS contracts               | `references/interop/INDEX.md`           |

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

## Boundary

| Layer              | Owner                                             | Role                                                 |
| ------------------ | ------------------------------------------------- | ---------------------------------------------------- |
| Canonical doctrine | this engine's references tree                     | stable Rust knowledge center                         |
| Runtime shell      | this plugin shell                                 | activation, routing, diagnostics, lifecycle surfaces |
| Donor reservoirs   | preserved donor families or later source archives | upstream pattern supply, not direct runtime UX       |

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
