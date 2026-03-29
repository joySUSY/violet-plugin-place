# Cross-Platform Development Inventory

## Purpose

Define the canonical inventory of `developer-tool/cross-platform-development` in its current maturity stage.

This document answers:
1. What already exists as canonical doctrine?
2. What exists as subtree control surfaces?
3. What already exists as subtree-local supporting skill bundles?
4. What is still reserved for future staging or runtime growth?

This subsystem is doctrine-first but boundary-sensitive across multiple platforms.

## Source Provenance

- **Primary source:** current `developer-tool` cross-platform doctrine cluster and subtree-local skill bundles
- **Derived from:** cross-platform compatibility, shared-core strategy, Tauri/runtime bridge, and support-tier canonization work inside `developer-tool`
- **Upstream URL:** not applicable as a synthesized local governance note
- **Freshness status:** canonical local inventory aligned to the current cross-platform subsystem

---

## Current Layer Model

| Layer | Meaning |
|---|---|
| Canonical doctrine | stable cross-platform doctrine under `developer-tool/references/cross-platform-development/` |
| Root control plane | subtree routing, trigger ownership, absorption governance, and maturity framing docs |
| Supporting subtree skill bundles | existing subtree-local skill packs, not yet formalized as staging |
| Runtime shell | not yet split into its own subsystem shell |

---

## Root Control Plane

- `README.md`
- `INVENTORY.md`
- `TRIGGER_SCOPE.md`
- `ABSORPTION_MATRIX.md`

Role:
- route cross-platform questions into the correct doctrine slice
- make the subsystem's current maturity explicit
- freeze first-owner trigger routing
- govern donor promotion
- prevent premature staging or shell inflation

---

## Canonical Doctrine Inventory

- `developer-tool/references/cross-platform-development/INDEX.md`
- `developer-tool/references/cross-platform-development/cross-platform.md`
- `developer-tool/references/cross-platform-patterns.md`

Role:
- support-tier doctrine
- shared-core vs platform-shell posture
- runtime/path/capability boundary doctrine
- cross-platform strategy bridge guidance

---

## Supporting Subtree Skill Bundles

- `developer-tool/cross-platform-development/platform-support-cross-platform-compatibility/`
- `developer-tool/cross-platform-development/tauri-development/`
- `developer-tool/cross-platform-development/tauri2-react-rust/`

Current role:
- subtree-local supporting skill packs
- not yet governed as a formal staging subsystem
- still subordinate to the canonical doctrine lane

This matters because the subtree already contains focused implementation-oriented skill assets without yet requiring a separate staging control plane.

---

## Runtime Shell Status

Current status:
- no dedicated runtime shell under `developer-tool/cross-platform-development/`
- runtime-facing behavior for this subsystem is still routed through the root `developer-tool` shell surfaces and related doctrine

This is a deliberate maturity boundary, not a missing feature.

---

## What Is Canonical vs Transitional

### Canonical now
- canonical doctrine under `references/cross-platform-development/`
- root control docs for this subsystem

### Transitional now
- subtree-local skill bundles not yet formalized as a staging subsystem
- no dedicated subsystem runtime shell
- no subsystem-specific staging governance yet

This subsystem is mature as doctrine, but only partially structured below that doctrine layer.

---

## Status

- Subsystem: `developer-tool/cross-platform-development`
- Stage: doctrine-mature, control-plane-bootstrapped, trigger-scope-frozen, absorption-governed, subtree-skill-bundles-present, staging/runtime reserved
- Destructive actions performed: **none**
