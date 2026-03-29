# Shell and Terminal Inventory

## Purpose

Define the canonical inventory of `developer-tool/shell-and-terminal` in its current maturity stage.

This document answers:

1. What already exists as canonical doctrine?
2. What exists as subtree control surfaces?
3. What already exists as subtree-local supporting skill bundles?
4. What is still reserved for future staging or runtime growth?

This subsystem is doctrine-first but operationally sensitive.

## Source Provenance

- **Primary source:** current `developer-tool` shell-and-terminal doctrine cluster and subtree-local skill bundles
- **Derived from:** shell-safety, terminal ergonomics, portable session, and runtime-boundary canonization work inside `developer-tool`
- **Upstream URL:** not applicable as a synthesized local governance note
- **Freshness status:** canonical local inventory aligned to the current shell-and-terminal subsystem

---

## Current Layer Model

| Layer                            | Meaning                                                                              |
| -------------------------------- | ------------------------------------------------------------------------------------ |
| Canonical doctrine               | stable shell/terminal doctrine under `developer-tool/references/shell-and-terminal/` |
| Root control plane               | subtree routing, trigger ownership, absorption governance, and maturity framing docs |
| Supporting subtree skill bundles | existing subtree-local skill packs, not yet formalized as staging                    |
| Runtime shell                    | not yet split into its own subsystem shell                                           |

---

## Root Control Plane

- `README.md`
- `INVENTORY.md`
- `TRIGGER_SCOPE.md`
- `ABSORPTION_MATRIX.md`

Role:

- route shell/terminal questions into the correct doctrine slice
- make the subsystem's current maturity explicit
- freeze first-owner trigger routing
- govern donor promotion
- prevent premature staging or shell inflation

---

## Canonical Doctrine Inventory

- `developer-tool/references/shell-and-terminal/INDEX.md`
- `developer-tool/references/shell-and-terminal/shell-terminal.md`
- `developer-tool/references/shell-and-terminal/runtime-shell-governance.md`
- `developer-tool/references/shell-and-terminal/portable-session-workflows.md`
- `developer-tool/references/shell-terminal-mastery.md`

Role:

- shell scripting doctrine
- terminal environment posture
- runtime-shell boundaries for shell work
- portable session and evidence workflows

---

## Supporting Subtree Skill Bundles

- `developer-tool/shell-and-terminal/bash-portability/`
- `developer-tool/shell-and-terminal/terminal/`
- `developer-tool/shell-and-terminal/terminal-env/`
- `developer-tool/shell-and-terminal/zsh-style-guide/`

Current role:

- subtree-local supporting skill packs
- not yet governed as a formal staging subsystem
- still subordinate to the canonical doctrine lane

This matters because the subtree already contains structured skill assets without yet requiring a separate staging control plane.

---

## Runtime Shell Status

Current status:

- no dedicated runtime shell under `developer-tool/shell-and-terminal/`
- runtime-facing behavior for this subsystem is still routed through the root `developer-tool` shell surfaces and related doctrine

This is a deliberate maturity boundary, not a missing feature.

---

## What Is Canonical vs Transitional

### Canonical now

- canonical doctrine under `references/shell-and-terminal/`
- root control docs for this subsystem

### Transitional now

- subtree-local skill bundles not yet formalized as a staging subsystem
- no dedicated subsystem runtime shell
- no subsystem-specific staging governance yet

This subsystem is mature as doctrine, but only partially structured below that doctrine layer.

---

## Status

- Subsystem: `developer-tool/shell-and-terminal`
- Stage: doctrine-mature, control-plane-bootstrapped, trigger-scope-frozen, absorption-governed, subtree-skill-bundles-present, staging/runtime reserved
- Destructive actions performed: **none**
