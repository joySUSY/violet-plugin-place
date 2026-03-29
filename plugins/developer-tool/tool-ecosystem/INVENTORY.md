# Tool Ecosystem Inventory

## Purpose

Define the canonical inventory of `developer-tool/tool-ecosystem` in its current maturity stage.

This document answers:
1. What already exists as canonical doctrine?
2. What exists as subtree control surfaces?
3. What is still reserved for future staging or runtime growth?

This subsystem is currently more doctrine-heavy than runtime-heavy.

## Source Provenance

- **Primary source:** current `developer-tool` tool-ecosystem doctrine cluster
- **Derived from:** plugin-shell, component-model, hook, MCP, and runtime-surface canonization work inside `developer-tool`
- **Upstream URL:** not applicable as a synthesized local governance note
- **Freshness status:** canonical local inventory aligned to the current tool-ecosystem subsystem

---

## Current Layer Model

| Layer | Meaning |
|---|---|
| Canonical doctrine | stable shell-architecture doctrine under `developer-tool/references/tool-ecosystem/` |
| Root control plane | subtree routing, trigger ownership, absorption governance, and maturity framing docs |
| Reserved staging | future adapted complexity container, not yet active |
| Runtime shell | not yet split into its own subsystem shell |

---

## Root Control Plane

- `README.md`
- `INVENTORY.md`
- `TRIGGER_SCOPE.md`
- `ABSORPTION_MATRIX.md`

Role:
- route shell-architecture questions into the correct doctrine slice
- make the subsystem's current maturity explicit
- freeze first-owner trigger routing
- govern donor promotion
- prevent premature staging or shell inflation

---

## Canonical Doctrine Inventory

- `developer-tool/references/tool-ecosystem/INDEX.md`
- `developer-tool/references/tool-ecosystem/core-shell-patterns.md`
- `developer-tool/references/tool-ecosystem/component-model.md`
- `developer-tool/references/tool-ecosystem/directory-structure-laws.md`
- `developer-tool/references/tool-ecosystem/command-surface-patterns.md`
- `developer-tool/references/tool-ecosystem/hook-runtime-patterns.md`
- `developer-tool/references/tool-ecosystem/lifecycle-hook-posture.md`
- `developer-tool/references/tool-ecosystem/plugin-settings-local-state.md`
- `developer-tool/references/tool-ecosystem/mcp-leverage-model.md`
- `developer-tool/references/tool-ecosystem/validation-audit-patterns.md`
- `developer-tool/references/tool-ecosystem/searchable-skill-distribution-patterns.md`
- `developer-tool/references/tool-ecosystem/result-first-multi-surface-handlers.md`
- `developer-tool/references/tool-ecosystem/skill-router-and-surface-selection-design.md`
- `developer-tool/references/tool-ecosystem/canonical-runtime-patterns.md`
- `developer-tool/references/tool-ecosystem/claude-code-plugin-shell-patterns.md`

Role:
- heavy-engine shell laws
- surface selection doctrine
- command / hook / MCP / settings / validation posture

---

## Reserved Staging Zone

- `developer-tool/tool-ecosystem/v3-expansion/`
- `developer-tool/tool-ecosystem/v3-expansion/README.md`
- `developer-tool/tool-ecosystem/v3-expansion/README.zh-CN.md`

Current role:
- reserved only
- not yet a governed staging subsystem

This matters because the subtree is already broad, but still flattenable enough to remain doctrine-first today.

---

## Runtime Shell Status

Current status:
- no dedicated runtime shell under `developer-tool/tool-ecosystem/`
- runtime-facing behavior for this subsystem is still routed through the root `developer-tool` shell surfaces and related doctrine

This is a deliberate maturity boundary, not a missing feature.

---

## What Is Canonical vs Transitional

### Canonical now
- canonical doctrine under `references/tool-ecosystem/`
- root control docs for this subsystem

### Transitional now
- `v3-expansion/` reserved but not yet meaningfully structured
- no dedicated subsystem runtime shell
- no subsystem-specific staging governance yet

This subsystem is mature as doctrine, but not yet mature as an independent runtime/staging ecosystem.

---

## Status

- Subsystem: `developer-tool/tool-ecosystem`
- Stage: doctrine-mature, control-plane-bootstrapped, trigger-scope-frozen, absorption-governed, staging/runtime reserved
- Destructive actions performed: **none**
