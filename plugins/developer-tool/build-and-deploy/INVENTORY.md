# Build and Deploy Inventory

## Purpose

Define the canonical inventory of `developer-tool/build-and-deploy` in its current maturity stage.

This document answers:

1. What already exists as canonical doctrine?
2. What exists as subtree control surfaces?
3. What already exists as subtree-local supporting skill bundles?
4. What is still reserved for future staging or runtime growth?

This subsystem is doctrine-first but operationally sensitive.

## Source Provenance

- **Primary source:** current `developer-tool` build-and-deploy doctrine cluster and subtree-local skill bundles
- **Derived from:** build/release/deploy/supply-chain canonization work inside `developer-tool`
- **Upstream URL:** not applicable as a synthesized local governance note
- **Freshness status:** canonical local inventory aligned to the current build-and-deploy subsystem

---

## Current Layer Model

| Layer                            | Meaning                                                                          |
| -------------------------------- | -------------------------------------------------------------------------------- |
| Canonical doctrine               | stable build/deploy doctrine under `developer-tool/references/build-and-deploy/` |
| Root control plane               | subtree routing, trigger ownership, absorption governance, and maturity framing docs |
| Supporting subtree skill bundles | existing subtree-local skill packs, not yet formalized as staging                |
| Runtime shell                    | not yet split into its own subsystem shell                                       |

---

## Root Control Plane

- `README.md`
- `INVENTORY.md`
- `TRIGGER_SCOPE.md`
- `ABSORPTION_MATRIX.md`

Role:

- route build/deploy questions into the correct doctrine slice
- make the subsystem's current maturity explicit
- freeze first-owner trigger routing
- govern donor promotion
- prevent premature staging or shell inflation

---

## Canonical Doctrine Inventory

- `developer-tool/references/build-and-deploy/INDEX.md`
- `developer-tool/references/build-and-deploy/build-deploy.md`
- `developer-tool/references/build-and-deploy/runtime-boundaries.md`
- `developer-tool/references/build-and-deploy/release-governance.md`
- `developer-tool/references/build-and-deploy/deployment-orchestration-patterns.md`
- `developer-tool/references/build-and-deploy/supply-chain-governance.md`
- `developer-tool/references/build-deploy-patterns.md`

Role:

- build reproducibility and CI/CD posture
- runtime-boundary doctrine for build/deploy work
- release discipline
- deployment strategy doctrine
- supply-chain trust posture

---

## Supporting Subtree Skill Bundles

- `developer-tool/build-and-deploy/ci-cd-multi-platform-matrix/`
- `developer-tool/build-and-deploy/containerization-docker-standards/`
- `developer-tool/build-and-deploy/release-and-deployment-processes/`

Current role:

- subtree-local supporting skill packs
- not yet governed as a formal staging subsystem
- still subordinate to the canonical doctrine lane

This matters because the subtree already contains structured skill assets without yet requiring a separate staging control plane.

---

## Runtime Shell Status

Current status:

- no dedicated runtime shell under `developer-tool/build-and-deploy/`
- runtime-facing behavior for this subsystem is still routed through the root `developer-tool` shell surfaces and related doctrine

This is a deliberate maturity boundary, not a missing feature.

---

## What Is Canonical vs Transitional

### Canonical now

- canonical doctrine under `references/build-and-deploy/`
- root control docs for this subsystem

### Transitional now

- subtree-local skill bundles not yet formalized as a staging subsystem
- no dedicated subsystem runtime shell
- no subsystem-specific staging governance yet

This subsystem is mature as doctrine, but only partially structured below that doctrine layer.

---

## Status

- Subsystem: `developer-tool/build-and-deploy`
- Stage: doctrine-mature, control-plane-bootstrapped, trigger-scope-frozen, absorption-governed, subtree-skill-bundles-present, staging/runtime reserved
- Destructive actions performed: **none**
