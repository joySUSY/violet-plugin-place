# TypeScript Coding Engine Inventory

## Purpose

Define the canonical inventory snapshot of `typescript-coding-engine` in its current deep-fusion stage.

This document answers four questions:

1. What already exists as canonical TypeScript doctrine?
2. What runtime shell surfaces are active today?
3. What still remains donor-side, staged, or not yet fully fused?
4. Which surfaces are canonical now versus still transitional or governed as staging?

It is not a historical shell-creation note anymore.
It is the governance snapshot for the engine as it currently stands.

---

## Layer Model

| Layer | Meaning |
| --- | --- |
| Canonical doctrine | stable TypeScript knowledge center under `typescript-coding-engine` |
| Runtime shell | plugin-first activation, routing, diagnosis, and lifecycle surfaces |
| Donor reservoirs | upstream TS skill packs, repo donors, clean-code donors, and interop donors |
| Staging zones | internal module containers that are not yet first-line doctrine paths |

The doctrine is:
- doctrine is the knowledge center
- runtime shell is the operational layer
- donor reservoirs are evidence
- staging zones exist to contain unresolved complexity without becoming a second doctrine tree

---

## Canonical Doctrine Inventory

### Root control plane

Canonical now:
- `SKILL.md`
- `README.md`
- `INVENTORY.md`
- `ABSORPTION_MATRIX.md`
- `TRIGGER_SCOPE.md`
- `references/INDEX.md`
- `references/source-reservoir-map.md`

These files now form the root control and governance plane of the engine.

### Doctrine lanes

Canonical now:
- `references/foundations/INDEX.md`
- `references/advanced/INDEX.md`
- `references/clean-code/INDEX.md`
- `references/architecture/INDEX.md`
- `references/interop/INDEX.md`

#### Foundations lane
- `references/foundations/strict-type-system-posture.md`
- `references/foundations/typescript-type-error-diagnosis-and-recovery.md`

Role:
- strictness posture
- compiler truth and configuration as architecture
- type-error diagnosis as information-flow recovery

#### Advanced lane
- `references/advanced/type-level-programming-patterns.md`
- `references/advanced/typescript-narrowing-branding-and-inference-cookbook.md`

Role:
- information-preserving advanced types
- inference-aware API design
- narrowing, branding, overload, and complexity budgeting guidance

#### Clean-code lane
- `references/clean-code/quality-gates-governance.md`
- `references/clean-code/typescript-runtime-validation-decision-matrix.md`
- `references/clean-code/toolchain-posture.md`
- `references/clean-code/typescript-testing-strategy-and-type-boundaries.md`
- `references/clean-code/typescript-anti-patterns-and-migration-ladders.md`
- `references/clean-code/runtime-boundaries.md`

Role:
- governance of quality gates
- runtime trust-boundary posture
- toolchain alignment
- testing architecture
- debt detection and migration strategy
- shell-versus-doctrine boundaries for clean-code automation

#### Architecture lane
- `references/architecture/typescript-architecture-decision-trees.md`

Role:
- project shape selection
- trust, state, and contract boundary architecture
- validation and interop placement in TypeScript systems

#### Interop lane
- `references/interop/rust-typescript-contract-boundaries.md`
- `references/interop/tauri-frontend-rust-bridge.md`
- `references/interop/boundary-activation-model.md`

Role:
- Rust↔TS shared contract doctrine
- Tauri IPC bridge posture
- interop-lane activation and ownership routing

---

## Runtime Shell Inventory

### Manifest
- `.claude-plugin/plugin.json`

### Hooks
- `hooks/hooks.json`
- `hooks/scripts/session-start-prime.sh`
- `hooks/scripts/precompact-handoff.sh`
- `hooks/scripts/stop-review.sh`

### Commands
Canonical and active now:
- `commands/prime/ts-foundations.md`
- `commands/prime/ts-tooling.md`
- `commands/check/types.md`
- `commands/check/toolchain.md`
- `commands/route/choose-runtime-validation.md`
- `commands/route/choose-state-pattern.md`

### Agents
Canonical and active now:
- `agents/type-diagnostician.md`
- `agents/ts-architecture-reviewer.md`
- `agents/ts-tooling-auditor.md`
- `agents/interop-reviewer.md`

### Bridge skills
Canonical and active now:
- `skills/core-types/`
- `skills/generics-and-inference/`
- `skills/type-level-programming/`
- `skills/runtime-validation/`
- `skills/tooling-and-quality/`
- `skills/testing/`
- `skills/architecture/`
- `skills/interop/`

These route into doctrine; they do not replace it.

### Rule-index zones
Canonical and active now:
- `rules/types/INDEX.md`
- `rules/runtime/INDEX.md`
- `rules/tooling/INDEX.md`
- `rules/testing/INDEX.md`
- `rules/style/INDEX.md`

These indexes organize shell-law surfaces but are not the first doctrinal reading path.

---

## Donor Reservoir Inventory

### Primary TypeScript donor families

Active as source truth, not canonical reading path:
- `mastering-typescript`
- `type-inference`
- `typescript-advanced-patterns`
- `typescript-advanced-types`
- `typescript-clean-code`
- `typescript-core`
- `typescript-expert`
- `typescript-magician`
- `typescript-pro`
- `typescript-quality-checker`
- `typescript-skills`
- `clean-code-typescript-main`

### Secondary structural and interop donors

Active as source truth, not canonical reading path:
- `outfitter-main`
- `claude-code-skills-main`
- `ts-rs-main`
- `tsify-main`
- `wasm-bindgen-main`
- `calling-rust-from-tauri-frontend`
- `claude-craft-Dev-i18n_en_ReactNative`

These remain source truth and pattern reservoirs.
They are not the engine's preferred reading path.

---

## Staging Zones

### Module staging zones

Governed staging, not canonical first-line doctrine:
- `modules/README.md`
- `modules/README.zh-CN.md`
- `modules/advanced-types/`
- `modules/inference/`
- `modules/runtime-validation/`
- `modules/quality-gates/`
- `modules/react-rn-bridges/`
- `modules/rust-interop/`

These are staging containers for later deep fusion.
They do not displace the canonical `references/` tree.

---

## Canonical vs Transitional Snapshot

### Canonical now

- root control docs (`SKILL.md`, `README.md`, `INVENTORY.md`, `ABSORPTION_MATRIX.md`, `TRIGGER_SCOPE.md`)
- root references doorway and source-governance doctrine
- doctrine indexes for foundations, advanced, clean-code, architecture, and interop
- strengthened lane roots and support docs across all five doctrine lanes
- runtime shell surfaces created in first wave and now aligned to the stronger doctrine backbone
- bridge skills and rule indexes aligned to the current doctrine tree

### Transitional now

- donor reservoirs that still serve as upstream evidence only
- module staging zones that still hold complexity not yet flattened into doctrine
- runtime hooks and rule surfaces that remain conservative and intentionally incomplete rather than over-automated

### Not canonical

- donor repo directory shapes
- raw skill-pack layouts from source reservoirs
- module staging zones as default reading surfaces
- any runtime path that bypasses canonical doctrine and reads donors first

---

## Current State

The TypeScript engine is now a real plugin-first heavy engine in canonical deep fusion.

What is already true:
- the root reading path is explicit
- source-governance is explicit
- lane indexes are normalized
- key doctrine pages in all five lanes are active
- bridge skills, route commands, check commands, and bounded agents are aligned to the doctrine tree
- trigger ownership is explicit
- root README and SKILL act as real control surfaces instead of shell placeholders

What remains true:
- deeper expansion is still possible
- staging zones still exist and are still governed as staging
- donor cleanup is still blocked until replacement-grade validation is complete
- destructive actions remain forbidden

---

## Governance Rule

This inventory is a snapshot, not a fantasy roadmap.

That means:
- list what is canonical now
- list what is transitional now
- keep donor/source truth visible without pretending it is already integrated
- preserve cleanup-safe navigation by pointing readers to canonical doctrine, not donor paths

If a surface is not yet canonical, say so explicitly.

---

## Cross-Links

Read this alongside:
- `README.md`
- `SKILL.md`
- `TRIGGER_SCOPE.md`
- `ABSORPTION_MATRIX.md`
- `references/INDEX.md`
- `references/source-reservoir-map.md`
- `modules/README.md`

---

## Final Doctrine

The reusable lesson is not:
> “the TypeScript engine currently contains these files.”

The reusable lesson is:
> “the inventory is the engine’s governed snapshot: it distinguishes canonical doctrine, runtime shell, donor reservoirs, and staging zones clearly enough that future routing, promotion, validation, and cleanup decisions can be made against explicit current-state truth instead of memory or wishful labeling.”
