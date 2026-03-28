# TypeScript Coding Engine Plugin Shell

Canonical runtime shell and doctrine control center for the `typescript-coding-engine`.

## Purpose

This document is the root operational overview for the TypeScript engine.

It explains:

- what the engine is for
- what its runtime shell owns
- how to enter the doctrine tree correctly
- how the shell relates to donor reservoirs and other engine surfaces
- how TypeScript-heavy work should be routed by the real pressure of the task

Use `references/INDEX.md` for the main doctrinal reading path.

This engine is the active TypeScript doctrine system for:

- strictness posture and compiler-guided design
- type error diagnosis and recovery
- advanced typing, narrowing, branding, and inference
- runtime validation and trust-boundary decisions
- toolchain, quality gates, testing, and migration discipline
- Rust↔TypeScript, Tauri, and other interop boundaries

It does **not** replace:

- preserved donor reservoirs or later archival source stores
- the JS runtime layer owned elsewhere unless the TypeScript boundary itself is the real issue
- broader runtime-shell, plugin, or cross-platform doctrine when those lanes own the question more directly

---

## Root Reading Path

1. `references/INDEX.md`
2. `references/source-reservoir-map.md`
3. then branch into the correct doctrinal lane:
   - `references/foundations/INDEX.md`
   - `references/advanced/INDEX.md`
   - `references/clean-code/INDEX.md`
   - `references/architecture/INDEX.md`
   - `references/interop/INDEX.md`
4. use `modules/README.md` only when a staged module is explicitly needed beyond the canonical references tree

The doctrine is:

- references own the stable TypeScript knowledge center
- the shell exists to make the correct doctrine easier to reach than the wrong one

---

## Runtime Surface Map

### Skills

Bridge skills load the smallest useful slice of doctrine:

- `skills/core-types/SKILL.md`
- `skills/generics-and-inference/SKILL.md`
- `skills/type-level-programming/SKILL.md`
- `skills/runtime-validation/SKILL.md`
- `skills/tooling-and-quality/SKILL.md`
- `skills/testing/SKILL.md`
- `skills/architecture/SKILL.md`
- `skills/interop/SKILL.md`

### Commands

Commands own explicit operational workflows:

- `commands/prime/ts-foundations.md`
- `commands/prime/ts-tooling.md`
- `commands/check/types.md`
- `commands/check/toolchain.md`
- `commands/route/choose-runtime-validation.md`
- `commands/route/choose-state-pattern.md`

### Agents

Agents own bounded specialist reasoning:

- `agents/type-diagnostician.md`
- `agents/ts-architecture-reviewer.md`
- `agents/ts-tooling-auditor.md`
- `agents/interop-reviewer.md`

### Hooks

Hooks remain conservative lifecycle surfaces:

- `hooks/hooks.json`
- `hooks/scripts/session-start-prime.sh`
- `hooks/scripts/precompact-handoff.sh`
- `hooks/scripts/stop-review.sh`

### Rules

Rules freeze stable shell law for:

- `rules/types/INDEX.md`
- `rules/runtime/INDEX.md`
- `rules/tooling/INDEX.md`
- `rules/testing/INDEX.md`
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

- `references/foundations/strict-type-system-posture.md`
- `references/foundations/typescript-type-error-diagnosis-and-recovery.md`

### Advanced lane

- `references/advanced/type-level-programming-patterns.md`
- `references/advanced/typescript-narrowing-branding-and-inference-cookbook.md`

### Clean-code lane

- `references/clean-code/quality-gates-governance.md`
- `references/clean-code/typescript-runtime-validation-decision-matrix.md`
- `references/clean-code/toolchain-posture.md`
- `references/clean-code/typescript-testing-strategy-and-type-boundaries.md`
- `references/clean-code/typescript-anti-patterns-and-migration-ladders.md`
- `references/clean-code/runtime-boundaries.md`

### Architecture lane

- `references/architecture/typescript-architecture-decision-trees.md`

### Interop lane

- `references/interop/rust-typescript-contract-boundaries.md`
- `references/interop/tauri-frontend-rust-bridge.md`
- `references/interop/boundary-activation-model.md`

This backbone is the primary TypeScript doctrine surface.
If the shell cannot route into these pages cleanly, it is not doing its job.

---

## Pressure Router

Use this quick mapping when deciding what to load first:

| Pressure                                                         | First Owner                        |
| ---------------------------------------------------------------- | ---------------------------------- |
| Baseline strictness, inference basics, type-error diagnosis      | `references/foundations/INDEX.md`  |
| Narrowing, branding, advanced generics, type-level transforms    | `references/advanced/INDEX.md`     |
| Runtime validation, toolchain, testing, migration, quality gates | `references/clean-code/INDEX.md`   |
| System shape, module boundaries, state blast radius              | `references/architecture/INDEX.md` |
| Rust/Tauri/WASM/generated-contract boundaries                    | `references/interop/INDEX.md`      |

If two lanes appear relevant, choose the one that owns the earliest or most expensive boundary mistake.

---

## Operating Rule

When the task is TypeScript-heavy:

1. choose the correct TypeScript lane first
2. route into the correct doctrinal reading path
3. use bridge skills to load only the smallest useful slice
4. use runtime surfaces only when explicit leverage is needed
5. treat donor reservoirs as fallback evidence, never as runtime mirrors
6. keep TypeScript distinct from generic JavaScript runtime advice

The engine exists to make TypeScript reasoning active, structured, and hard to ignore.

---

## Boundary

| Layer              | Owner                                             | Role                                                 |
| ------------------ | ------------------------------------------------- | ---------------------------------------------------- |
| Canonical doctrine | this engine's references tree                     | stable TypeScript knowledge center                   |
| Runtime shell      | this plugin shell                                 | activation, routing, diagnostics, lifecycle surfaces |
| Donor reservoirs   | preserved donor families or later source archives | upstream pattern supply, not direct runtime UX       |

The shell must point to doctrine.
It must not become a donor mirror or a second doctrine tree.

---

## Cross-Engine Relation

The TypeScript engine often meets neighboring systems.
Default ownership law:

- this engine owns TypeScript-side type truth, runtime-boundary decisions, and consumer ergonomics
- `rust-coding-engine` owns Rust-side structural truth when Rust defines or generates the contract
- `developer-tool` owns broader runtime-shell, plugin-surface, and cross-platform operational questions when the issue stops being TypeScript-doctrinal

The doctrine is:

- do not keep a task here if the real bottleneck belongs to another engine
- route outward once ownership becomes clearer than convenience

---

## Current State

The TypeScript engine is now in canonical deep fusion.

What is already true:

- root references doorway exists
- subtree indexes are normalized
- source-governance is explicit
- foundations, advanced, clean-code, architecture, and interop lanes all have active canonical support
- runtime boundary doctrine and trigger ownership doctrine are explicit
- the shell can now route into a real doctrine backbone instead of isolated reference notes

What remains true:

- deeper expansion is still possible
- staged module governance remains active in `modules/README.md` and `modules/README.zh-CN.md`
- module staging zones are still staging zones, not the main reading path
- the engine is already coherent enough to behave as a real plugin-first heavy engine

---

## Conservative Posture

This shell intentionally stays conservative:

- no destructive automation
- no broad type-blocking hooks
- no donor repo mirroring
- no mandatory MCP dependency
- no runtime behavior that replaces compiler, CI, or doctrine judgment

The shell is the operational layer.
The doctrine tree remains the main source of truth.

---

## Final Rule

The reusable lesson is not:

> “this plugin helps with TypeScript.”

The reusable lesson is:

> “the `typescript-coding-engine` shell is a doctrine-first control center: it routes by real type, runtime, architecture, and interop pressure; keeps runtime surfaces bounded; preserves the references tree as the primary knowledge center; and prevents donor abundance or automation enthusiasm from replacing TypeScript judgment.”
