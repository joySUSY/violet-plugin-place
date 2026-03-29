# Agentic System Basis Control Center

> An agentic system becomes legible when activation, orchestration, and runtime behavior are governed before they are expanded.
> 只有当激活、编排与运行时行为先被治理，再被扩展时，agentic system 才真正可读。

## Purpose

This document is the root control-center for `developer-tool/agentic-system-basis/`.

It exists to provide a stable entrypoint for the part of `developer-tool` that governs:
- system-level activation
- bootstrap and capability detection
- multi-agent or ensemble coordination
- runtime activation patterns
- pipeline autonomy and gating models

This subtree is not yet as operationally deep as `ai-agent-memory`, but it is now large enough to deserve its own root control surface instead of being treated only as a references folder.

## Core Rule

`agentic-system-basis` is a doctrine-first subsystem.

That means:
- its canonical truth currently lives in `developer-tool/references/agentic-system-basis/`
- its root control job is to route questions into the correct doctrine slice
- `TRIGGER_SCOPE.md` now freezes first-owner routing for the subsystem
- `ABSORPTION_MATRIX.md` now governs donor promotion for the subsystem
- future staging or runtime shells may grow from here, but only after ownership becomes clear

The goal is not to create another shell immediately.
The goal is to keep this lane governable as it matures.

---

## Current Layer Model

### 1. Canonical doctrine
Location:
- `developer-tool/references/agentic-system-basis/*`

Owns:
- broad agentic-system architecture
- activation model
- runtime activation patterns
- bootstrap capability detection
- ensemble/team governance
- factory/autonomy/gate models

### 2. Root control plane
Location:
- `README.md`
- `INVENTORY.md`
- `TRIGGER_SCOPE.md`
- `ABSORPTION_MATRIX.md`

Owns:
- root routing
- maturity framing
- trigger ownership
- donor promotion governance
- future staging/runtime boundary definition for this subsystem

### 3. Reserved staging zone
Location:
- `v3-expansion/`
- `v3-expansion/README.zh-CN.md`

- `v3-expansion/README.md`

Owns:
- currently reserved only
- future adapted complexity if the subsystem grows beyond flat doctrine

### 4. Runtime shell
Current status:
- none yet as a dedicated subsystem shell
- runtime-facing behavior still routes through root `developer-tool` shell surfaces when needed

The doctrine is:
- do not invent a runtime shell here before the doctrine and control-plane pressure truly justify it

---

## Reading Order

1. `README.md`
2. `INVENTORY.md`
3. `TRIGGER_SCOPE.md`
4. `ABSORPTION_MATRIX.md`
5. `../../references/agentic-system-basis/INDEX.md`
6. Then enter the correct doctrine slice:
   - `agentic-systems.md`
   - `activation-model.md`
   - `runtime-activation-patterns.md`
   - `bootstrap-capability-detection.md`
   - `ensemble-team-governance.md`
   - `factory-pipeline-autonomy-and-gate-model.md`

This keeps control first and details second.

---

## What This Subsystem Is For

Use this subtree when the question is about:
- what makes an agentic system structurally governed rather than merely interactive
- how runtime activation should be selective, layered, and reversible
- how to bootstrap the right workflow by discovering environment and capability first
- how to choose team topology, coordinator behavior, and ensemble governance
- how to structure agent-autonomous pipelines under explicit gates

---

## What This Subsystem Is NOT

It is not:
- the memory lane
- the plugin shell itself
- the place to implement execution surfaces before doctrine exists
- a generic documentation bucket for all agent-related ideas

If the question is primarily about:
- recall / continuity / history retrieval -> go to `../ai-agent-memory/README.md`
- plugin structure / command/hook/MCP surfaces -> go to `../../references/tool-ecosystem/INDEX.md`
- concrete runtime shell usage -> use the relevant root runtime surface after doctrine routing

---

## Cross-Links

Read this alongside:
- `INVENTORY.md`
- `TRIGGER_SCOPE.md`
- `ABSORPTION_MATRIX.md`
- `../../references/agentic-system-basis/INDEX.md`
- `v3-expansion/README.md`
- `../../references/tool-ecosystem/INDEX.md`
- `../../references/plugin-runtime-overview.md`
- `../ai-agent-memory/README.md`

---

## Final Doctrine

The reusable lesson is not:
> “agentic-system-basis is the place where the agentic-system docs live.”

The reusable lesson is:
> “`agentic-system-basis` is a doctrine-first subsystem: it governs how agentic architectures should be activated, coordinated, and bounded before any future staging or runtime shell expansion is allowed to emerge from it.”
