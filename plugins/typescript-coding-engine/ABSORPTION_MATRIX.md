# TypeScript Coding Engine Absorption Matrix

## Purpose

Define the canonical donor-to-doctrine absorption ledger for `typescript-coding-engine`.

This document is the promotion ledger of the engine.
It exists to answer a governance question:

> when a TypeScript donor family contributes useful patterns, where do those patterns land in the canonical doctrine tree, what runtime shell surfaces may expose them, what remains staged instead of prematurely flattened, and what conditions must be met before the donor can be treated as replacement-grade rather than merely present?

This matrix prevents:

- donor sprawl
- advanced-type flattening
- tooling drift
- interop confusion
- shell/doctrine duplication
- silent promotion into the wrong lane

## Source Provenance

- **Primary source:** current `typescript-coding-engine` donor-family intake and canonical doctrine tree
- **Derived from:** TypeScript donor routing, shell-creation decisions, and deep-fusion governance work inside the engine
- **Upstream URL:** not applicable as a synthesized local governance note
- **Freshness status:** canonical local absorption doctrine aligned to the current TypeScript engine

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

The allowed flow is:

`donor -> canonical doctrine/reference/module -> shell surface`

The forbidden flow is:

`donor -> shell runtime as direct mirror`

This ledger exists to keep that distinction operational and auditable.

---

## Promotion Ledger

| Donor Family                           | Canonical Doctrine Destination                                                  | Runtime Shell Destination                                                                                                     | Staging / Notes                                                                                |
| -------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `mastering-typescript`                 | `references/foundations/`, selective support for `references/clean-code/`       | `skills/core-types/`, `commands/prime/ts-foundations.md`                                                                      | broad foundational donor                                                                       |
| `typescript-core`                      | `references/foundations/`, `references/architecture/`, `references/clean-code/` | `skills/core-types/`, `skills/architecture/`, `commands/check/types.md`                                                       | baseline TS architecture, troubleshooting, runtime-validation pressure                         |
| `type-inference`                       | `references/advanced/`                                                          | `skills/generics-and-inference/`, `agents/type-diagnostician.md`                                                              | `modules/inference/` when richer examples accumulate                                           |
| `typescript-advanced-types`            | `references/advanced/`                                                          | `skills/type-level-programming/`, `agents/type-diagnostician.md`                                                              | `modules/advanced-types/` for deeper pattern staging                                           |
| `typescript-advanced-patterns`         | `references/advanced/`, `references/architecture/`                              | `skills/type-level-programming/`, `skills/architecture/`, `agents/ts-architecture-reviewer.md`                                | architecture-oriented advanced donor                                                           |
| `typescript-magician`                  | `references/advanced/`, `references/foundations/`, `rules/types/INDEX.md`       | `skills/type-level-programming/`, `skills/generics-and-inference/`, `commands/check/types.md`, `agents/type-diagnostician.md` | high-signal advanced typing and no-`any` donor                                                 |
| `typescript-expert`                    | `references/advanced/`                                                          | `skills/type-level-programming/`, `agents/type-diagnostician.md`                                                              | dense expert donor                                                                             |
| `typescript-pro`                       | `references/architecture/`, `references/clean-code/`                            | `skills/architecture/`, `skills/tooling-and-quality/`, `agents/ts-architecture-reviewer.md`                                   | production architecture donor                                                                  |
| `typescript-clean-code`                | `references/clean-code/`, `rules/style/INDEX.md`                                | `skills/tooling-and-quality/`, `skills/testing/`, `agents/ts-tooling-auditor.md`                                              | clean-code donor                                                                               |
| `typescript-quality-checker`           | `references/clean-code/`, `rules/tooling/INDEX.md`, `rules/testing/INDEX.md`    | `commands/check/toolchain.md`, `agents/ts-tooling-auditor.md`                                                                 | `modules/quality-gates/` for larger quality bundles                                            |
| `typescript-skills`                    | `references/clean-code/`, selective support for `references/advanced/`          | `skills/tooling-and-quality/`, `skills/testing/`                                                                              | shared tooling, testing, and security donor                                                    |
| `clean-code-typescript-main`           | `references/clean-code/`, `rules/style/INDEX.md`                                | none by default                                                                                                               | large textual clean-code donor; doctrine source, not shell source                              |
| `ts-rs-main`                           | `references/interop/`                                                           | `skills/interop/`, `agents/interop-reviewer.md`                                                                               | `modules/rust-interop/` for deeper generated-contract staging                                  |
| `tsify-main`                           | `references/interop/`                                                           | `skills/interop/`, `agents/interop-reviewer.md`                                                                               | WASM/TS bridge staging in `modules/rust-interop/`                                              |
| `wasm-bindgen-main`                    | `references/interop/`                                                           | `skills/interop/`, `agents/interop-reviewer.md`                                                                               | WASM/JS/TS interop donor                                                                       |
| `calling-rust-from-tauri-frontend`     | `references/interop/`                                                           | `skills/interop/`, `agents/interop-reviewer.md`                                                                               | Tauri bridge doctrine; may later feed `modules/react-rn-bridges/` only if breadth justifies it |
| `outfitter-main`                       | selected governance and shell-structure references where relevant               | future tooling/runtime surfaces only when justified                                                                           | plugin/tooling structure donor, not TS language truth                                          |
| `claude-code-skills-main`              | selected governance and shell-structure references where relevant               | future commands, skills, or agents only when bounded                                                                          | structure donor, not first-line TS doctrine                                                    |
| `claude-craft-Dev-i18n_en_ReactNative` | selective architecture and interop staging only                                 | none by default                                                                                                               | framework-side TS or React Native structure donor; not current main reading path               |

---

## By Canonical Lane

### `references/foundations/`

Absorbs and stabilizes:

- core TS mental model
- strict compiler posture
- widening versus narrowing baseline
- type-error diagnosis and recovery posture

### `references/advanced/`

Absorbs and stabilizes:

- generics and deep inference
- conditional, mapped, and template-literal types
- brand and opaque typing
- overload and information-preservation patterns

### `references/clean-code/`

Absorbs and stabilizes:

- quality gates
- runtime validation and trust-boundary posture
- toolchain and CI posture
- testing strategy
- migration and anti-pattern recovery
- shell-vs-doctrine boundaries for clean-code automation

### `references/architecture/`

Absorbs and stabilizes:

- project shape selection
- trust, state, and contract boundary architecture
- validation placement as architectural concern
- interoperability-aware TS system design

### `references/interop/`

Absorbs and stabilizes:

- Rust/TS contract ownership
- generated or shared boundary truth
- Tauri IPC bridge posture
- interop activation and ownership routing

### `modules/*`

Used only for large integrated bundles that are too rich to flatten immediately into one doctrine page.
Modules are staging zones, not donor mirrors and not the default reading path.

---

## Runtime Shell Destinations

### Bridge skills

Promoted doctrine may surface through:

- `skills/core-types/`
- `skills/generics-and-inference/`
- `skills/type-level-programming/`
- `skills/runtime-validation/`
- `skills/tooling-and-quality/`
- `skills/testing/`
- `skills/architecture/`
- `skills/interop/`

### Commands

Promoted doctrine may surface through:

- `commands/prime/ts-foundations.md`
- `commands/prime/ts-tooling.md`
- `commands/check/types.md`
- `commands/check/toolchain.md`
- `commands/route/choose-runtime-validation.md`
- `commands/route/choose-state-pattern.md`

### Agents

Promoted doctrine may surface through:

- `agents/type-diagnostician.md`
- `agents/ts-architecture-reviewer.md`
- `agents/ts-tooling-auditor.md`
- `agents/interop-reviewer.md`

### Rules

Stable shell law may surface through:

- `rules/types/INDEX.md`
- `rules/runtime/INDEX.md`
- `rules/tooling/INDEX.md`
- `rules/testing/INDEX.md`
- `rules/style/INDEX.md`

The doctrine is:

- runtime shell surfaces should consume curated doctrine
- not compete with it or bypass it

---

## Cross-Engine Ownership Rule

`typescript-coding-engine` owns:

- TS-side type truth
- runtime-validation posture on TS-owned boundaries
- consumer ergonomics for Rust-generated or Rust-owned contracts
- TypeScript architecture and quality governance

`rust-coding-engine` owns:

- Rust-side structural truth
- Rust-generated contract authority when Rust is the source
- Rust-side interop, release, and core-shell ownership law

`developer-tool` owns:

- broader runtime-shell, plugin, and cross-platform operational questions when the issue stops being TS-doctrinal

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

Before calling a donor family replacement-grade for the TypeScript engine, ask:

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
- flattening advanced-type donors into generic TS advice and losing semantic precision
- routing tooling donors directly into runtime surfaces without doctrinal curation
- treating interop donors as if they owned all TypeScript architecture
- preserving donor families only in `modules/*` without deciding what should become canonical doctrine
- using the shell as a direct donor mirror
- letting runtime surface convenience outrun doctrine ownership

---

## Cross-Links

Read this alongside:

- `references/source-reservoir-map.md`
- `references/INDEX.md`
- `INVENTORY.md`
- `TRIGGER_SCOPE.md`
- `modules/README.md`
- `rust-coding-engine/references/governance/source-reservoir-map.md`

---

## Status

- Engine: `typescript-coding-engine`
- Stage: canonical deep-fusion promotion ledger converged to the current backbone
- Destructive actions performed: **none**

---

## Final Doctrine

The reusable lesson is not:

> “these are the donors that fed the TypeScript engine.”

The reusable lesson is:

> “the absorption matrix is the engine's promotion ledger: it records how donor families are deliberately transformed into doctrine, staged modules, and bounded runtime surfaces while preserving cross-engine ownership, avoiding donor mirrors, and making future replacement-grade cleanup decisions auditable.”
