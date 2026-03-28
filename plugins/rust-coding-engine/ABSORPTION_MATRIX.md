# Rust Coding Engine Absorption Matrix

## Purpose

Define the canonical donor-to-doctrine absorption ledger for `rust-coding-engine`.

This document is the promotion ledger of the engine.
It exists to answer a governance question:

> when a Rust donor family contributes useful patterns, where do those patterns land in the canonical doctrine tree, what runtime shell surfaces may expose them, what remains staged instead of prematurely flattened, and what conditions must be met before the donor can be treated as replacement-grade rather than merely present?

This matrix prevents:

- repo mirroring
- rule-dump chaos
- interop confusion
- shell/doctrine duplication
- silent promotion into the wrong lane
- staged complexity lingering without ownership

## Source Provenance

- **Primary source:** current `rust-coding-engine` donor-family intake and canonical doctrine tree
- **Derived from:** Rust donor routing, shell-creation decisions, repo-case extraction, and deep-fusion governance work inside the engine
- **Upstream URL:** not applicable as a synthesized local governance note
- **Freshness status:** canonical local absorption doctrine aligned to the current Rust engine

---

## Core Rule

Donors do not become canonical merely by existing in the workspace.

A donor pattern becomes part of the engine only when it is deliberately promoted into one or more of:

- `references/` doctrine
- `skills/` bridge surfaces
- `commands/` explicit operational workflows
- `agents/` bounded specialist reasoning
- `rules/` shell laws
- `modules/` staging zones when immediate flattening would be premature
- `references/repo-cases/` when the lesson still needs donor-scale framing

The allowed flow is:

`donor -> canonical doctrine/reference/module -> shell surface`

The forbidden flow is:

`donor -> shell runtime as direct mirror`

This ledger exists to keep that distinction operational and auditable.

---

## Promotion Ledger

| Donor Family                                      | Canonical Doctrine Destination                                                                                | Runtime Shell Destination                                              | Staging / Notes                                         |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------- |
| `rust-skills`                                     | `references/*` + rule-index-based doctrine routing                                                            | `rules/*/INDEX.md`, bridge skills, commands                            | 179-rule doctrinal base                                 |
| `rust-skills-main`                                | `references/repo-cases/`, `references/governance/*`                                                           | shell precedent only where justified                                   | pluginized Rust donor; absorb structure, not raw layout |
| `rust-skills-main2`                               | `references/repo-cases/`, shell-governance lessons                                                            | hook, agent, and command precedent only                                | shell precedent donor, not direct runtime mirror        |
| `rust` / `rust (1)`                               | `references/foundations/*`, selected learning-path support                                                    | `skills/foundations/`, `commands/prime/rust-foundations.md`            | baseline Rust doctrine donors                           |
| `rust-guide`                                      | `references/foundations/*`, learning-path and support docs                                                    | none by default                                                        | roadmap and learning donor                              |
| `rust-style*` donors                              | `references/foundations/rust-idiomatic-style-and-patterns.md`, `references/quality/*`, `rules/style/INDEX.md` | no direct runtime shell by default                                     | style, lint, and docs discipline                        |
| `flow-skills-rust`                                | `references/foundations/*`                                                                                    | `skills/foundations/`, `skills/ownership-and-types/`                   | compressed Rust workflow donor                          |
| `rust-axum-framework` / `axum-rust-template`      | `references/architecture/*`, selected `references/production/*`                                               | `skills/architecture/`, `agents/rust-architecture-reviewer.md`         | service and web structure donors                        |
| `rust-fullstack`                                  | `references/architecture/*`, `references/production/*`                                                        | none by default                                                        | broader architecture donor                              |
| `clean-architecture-with-rust-master`             | `references/repo-cases/*`, selected `references/architecture/*`                                               | architecture reviewer and route commands indirectly                    | repo-grade architecture donor                           |
| `codeyourpcb-main`                                | `references/repo-cases/*`, selected `modules/tauri/`, `modules/large-repo-case-studies/`                      | architecture and interop diagnostic surfaces indirectly                | complex multi-crate case-study donor                    |
| `nova-main`                                       | `references/repo-cases/*`, `modules/vm-architecture/`                                                         | architecture reviewer indirectly                                       | VM architecture donor                                   |
| `implementing-hexagonal-axum`                     | `references/architecture/*`, `modules/axum/`                                                                  | route decisions and architecture review                                | explicit hexagonal Rust donor                           |
| `bevy*` / `ecs*`                                  | `references/architecture/rust-ecs-and-data-oriented-architecture.md`, selected `references/error-patterns/*`  | architecture reviewer and future commands                              | ECS and data-oriented architecture donors               |
| `flow-skills-pyo3`                                | `references/interop/*`, selected `modules/ffi/`                                                               | `commands/prime/rust-interop.md`, `agents/ffi-interop-scout.md`        | Python/Rust boundary donor                              |
| `napi-*` donors                                   | `references/interop/*`, selected `modules/ffi/`                                                               | `commands/route/choose-interop-path.md`, `agents/ffi-interop-scout.md` | Node/Rust boundary donors                               |
| `ts-rs-main` / `tsify-main` / `wasm-bindgen-main` | `references/interop/*`, selected `modules/wasm/`                                                              | interop route command + interop agent                                  | TS/WASM bridge donors                                   |
| `calling-rust-from-tauri-frontend`                | `references/interop/*`, selected `modules/tauri/`                                                             | interop route command + interop agent                                  | Tauri bridge donor                                      |
| `understanding-tauri-architecture`                | `references/architecture/*`, `references/interop/*`, selected `modules/tauri/`                                | architecture reviewer + interop routing                                | Tauri architecture donor                                |
| `Handling Rust errors elegantly.html`             | `references/error-patterns/handling-rust-errors-elegantly-doctrine.md`                                        | none by default                                                        | narrative error donor                                   |
| Rust PDF books                                    | `references/books/*`, selected `references/production/*`                                                      | none by default                                                        | long-form backend and production donors                 |

---

## By Canonical Lane

### `references/foundations/`

Absorbs and stabilizes:

- baseline Rust mental model
- ownership, borrowing, and lifetime doctrine
- foundational patterns from smaller Rust donors
- idiomatic style and type honesty

### `references/architecture/`

Absorbs and stabilizes:

- project scale decisions
- module and workspace structure
- service and library architecture
- systems/tooling and ECS/data-oriented structure

### `references/async-concurrency/`

Absorbs and stabilizes:

- workload-first concurrency selection
- runtime, channels, shared-state, cancellation, and backpressure doctrine

### `references/error-patterns/`

Absorbs and stabilizes:

- error surface selection
- recoverable versus unrecoverable boundary law
- compiler-guided recovery
- narrative error judgment and secure disclosure

### `references/production/`

Absorbs and stabilizes:

- runtime honesty under operational pressure
- performance and observability
- release graph and multi-surface delivery discipline

### `references/quality/`

Absorbs and stabilizes:

- testing, docs, rustdoc, lint, and public API quality
- proof surfaces and engineering discipline

### `references/ecosystem/`

Absorbs and stabilizes:

- crate-family selection
- dependency due diligence
- domain-pressure ecosystem routing

### `references/interop/`

Absorbs and stabilizes:

- C/C++ FFI
- Python bindings
- Node bindings
- WASM bridges
- Tauri core-shell boundaries
- Rust↔TS generated contract discipline

### `references/repo-cases/`

Absorbs and stabilizes:

- repo-scale architecture lessons
- donor-specific case-study framing
- cleanup-safe case-study extraction before full doctrinal diffusion

### `modules/*`

Used only for large integrated bundles that are too rich to flatten immediately into one doctrine page.
Modules are staging zones, not donor mirrors and not the default reading path.

---

## Runtime Shell Destinations

### Bridge skills

Promoted doctrine may surface through:

- `skills/foundations/`
- `skills/ownership-and-types/`
- `skills/async-and-concurrency/`
- `skills/architecture/`
- `skills/interop/`
- `skills/docs-and-quality/`
- `skills/production-patterns/`

### Commands

Promoted doctrine may surface through:

- `commands/prime/rust-foundations.md`
- `commands/prime/rust-interop.md`
- `commands/diagnose/borrow-checker.md`
- `commands/route/choose-concurrency-pattern.md`
- `commands/route/choose-interop-path.md`

### Agents

Promoted doctrine may surface through:

- `agents/borrow-checker-diagnostician.md`
- `agents/rust-architecture-reviewer.md`
- `agents/ffi-interop-scout.md`
- `agents/performance-surgeon.md`

### Rules

Stable shell law may surface through:

- `rules/ownership/INDEX.md`
- `rules/async/INDEX.md`
- `rules/api/INDEX.md`
- `rules/error/INDEX.md`
- `rules/testing/INDEX.md`
- `rules/perf/INDEX.md`
- `rules/style/INDEX.md`

The doctrine is:

- runtime shell surfaces should consume curated doctrine
- not compete with it or bypass it

---

## Cross-Engine Ownership Rule

`rust-coding-engine` owns:

- Rust-side structural truth
- ownership law and native/runtime boundary design
- Rust-generated contract authority when Rust is the source
- Rust-side interop, release, and production truth

`typescript-coding-engine` owns:

- TypeScript-side consumer ergonomics
- TS-local runtime validation posture when TypeScript consumes Rust-owned contracts

`python-dev-skill` owns:

- Python-side consumer ergonomics when Python is the consumer

`developer-tool` owns:

- broader runtime-shell, plugin, and cross-platform operational questions when the issue stops being Rust-doctrinal

The doctrine is:

- donor promotion must preserve these engine boundaries explicitly
- not let shared technologies blur ownership silently

---

## Staging Discipline

Promotion into `modules/*` is allowed when:

- the donor family contains a large coherent cluster of patterns
- immediate flattening would create unreadable mega-docs
- the staging zone remains clearly subordinate to the canonical lane

Promotion into `modules/*` is not allowed when it would:

- preserve donor directory shape as active doctrine
- become the preferred reading path for ordinary tasks
- create a second doctrine center parallel to `references/`

The doctrine is:

- staging exists to buy integration time, not to postpone architectural decisions forever

---

## Replacement-Grade Criteria

Before calling a donor family replacement-grade for the Rust engine, ask:

- [ ] Has the family been mapped into the correct doctrinal lane?
- [ ] Are runtime shell surfaces consuming canonical docs rather than donor material directly?
- [ ] Are staged modules clearly marked as staging, not source of truth?
- [ ] Has the shell/doctrine distinction remained visible?
- [ ] Is donor dependence shrinking rather than spreading?
- [ ] Can future cleanup or archival of the donor leave the engine readable and usable?
- [ ] Are cross-engine ownership boundaries explicit enough that the wrong engine will not claim the lesson later?

Replacement-grade means the engine can stand on the canonized lesson without needing the donor as a default surface.

---

## Anti-Patterns

- promoting donors by directory resemblance instead of by knowledge role
- flattening advanced or interop donors into generic Rust advice and losing semantic precision
- routing tooling or structure donors directly into runtime surfaces without doctrinal curation
- treating interop donors as if they owned all Rust architecture or production law
- preserving donor families only in `modules/*` without deciding what should become canonical doctrine
- using the shell as a direct donor mirror
- letting runtime surface convenience outrun doctrine ownership

---

## Cross-Links

Read this alongside:

- `references/governance/source-reservoir-map.md`
- `references/INDEX.md`
- `INVENTORY.md`
- `TRIGGER_SCOPE.md`
- `README.md`
- `SKILL.md`

---

## Status

- Engine: `rust-coding-engine`
- Stage: canonical deep-fusion promotion ledger aligned to the current heavy-engine standard
- Destructive actions performed: **none**

---

## Final Doctrine

The reusable lesson is not:

> “these are the donors that fed the Rust engine.”

The reusable lesson is:

> “the absorption matrix is the engine’s promotion ledger: it records how donor families are deliberately transformed into doctrine, staged modules, and bounded runtime surfaces while preserving cross-engine ownership, avoiding donor mirrors, and making future replacement-grade cleanup decisions auditable.”
