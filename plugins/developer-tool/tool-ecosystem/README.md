# Tool Ecosystem Control Center

> A tool ecosystem becomes usable when shell laws, component selection, and runtime boundaries are governed before new surfaces are added.
> 只有当 shell laws、component selection 与 runtime boundaries 先被治理，再去增加新 surface，tool ecosystem 才真正可用。

## Purpose

This document is the root control-center for `developer-tool/tool-ecosystem/`.

It exists to provide a stable entrypoint for the part of `developer-tool` that governs:
- plugin shell laws
- component-model decisions
- command/hook/MCP/runtime surface boundaries
- plugin-local settings/state patterns
- validation and audit posture for shell-grade systems

This subtree is doctrine-heavy and governance-heavy.
It is not currently a subsystem with its own dedicated runtime shell.

## Core Rule

`tool-ecosystem` is a doctrine-first and governance-heavy subsystem.

That means:
- its canonical truth currently lives in `developer-tool/references/tool-ecosystem/`
- its root control job is to route shell-architecture questions into the correct doctrine slice
- `TRIGGER_SCOPE.md` now freezes first-owner routing for the subsystem
- `ABSORPTION_MATRIX.md` now governs donor promotion for the subsystem
- future staging may appear only if the doctrine cluster becomes too large to remain flat
- runtime behavior for this subsystem is still carried by the root `developer-tool` shell surfaces

The goal is not to create another shell inside the shell.
The goal is to keep shell architecture governable.

---

## Current Layer Model

### 1. Canonical doctrine
Location:
- `developer-tool/references/tool-ecosystem/*`

Owns:
- core shell patterns
- component model
- command surface design
- hook runtime patterns
- MCP leverage doctrine
- plugin settings/state patterns
- validation and audit posture

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
- future shell/staging boundary definition for this subsystem

### 3. Reserved staging zone
Location:
- `v3-expansion/`
- `v3-expansion/README.md`
- `v3-expansion/README.zh-CN.md`

Current status:
- reserved only
- not yet an active governed staging subsystem

### 4. Runtime shell
Current status:
- no dedicated subsystem runtime shell
- runtime-facing behavior is still carried by the root `developer-tool` shell surfaces

The doctrine is:
- this subtree governs shell architecture more than it produces its own shell

---

## Reading Order

1. `README.md`
2. `INVENTORY.md`
3. `TRIGGER_SCOPE.md`
4. `ABSORPTION_MATRIX.md`
5. `../../references/tool-ecosystem/INDEX.md`
6. Then enter the correct doctrine slice:
   - `core-shell-patterns.md`
   - `component-model.md`
   - `command-surface-patterns.md`
   - `hook-runtime-patterns.md`
   - `lifecycle-hook-posture.md`
   - `plugin-settings-local-state.md`
   - `mcp-leverage-model.md`
   - `validation-audit-patterns.md`

This keeps control first and architecture second.

---

## What This Subsystem Is For

Use this subtree when the question is about:
- what kind of shell surface a capability belongs in
- how a heavy engine shell should be structured
- what hooks should or should not own
- when MCP is actually worth adding
- how commands, agents, rules, and references should divide responsibility
- how plugin-local configuration and validation should be modeled

---

## What This Subsystem Is NOT

It is not:
- a replacement for specific domain doctrine
- a donor parking lot
- a subsystem with its own dedicated runtime shell today
- a place to dump every implementation pattern without governance

If the question is primarily about:
- memory / recall / continuity -> go to `../ai-agent-memory/README.md`
- agentic architecture and activation -> go to `../agentic-system-basis/README.md`
- shell safety or build/deploy specifics -> go to the corresponding doctrine cluster first

---

## Cross-Links

Read this alongside:
- `INVENTORY.md`
- `TRIGGER_SCOPE.md`
- `ABSORPTION_MATRIX.md`
- `v3-expansion/README.md`
- `v3-expansion/README.zh-CN.md`
- `../../references/tool-ecosystem/INDEX.md`
- `../../references/plugin-runtime-overview.md`
- `../../references/shell-and-terminal/INDEX.md`
- `../../references/build-and-deploy/INDEX.md`

---

## Final Doctrine

The reusable lesson is not:
> “tool-ecosystem is where the plugin/runtime docs live.”

The reusable lesson is:
> “`tool-ecosystem` is a doctrine-first subsystem that governs how shell surfaces should be selected, bounded, and composed before any future staging or shell-specific expansion is allowed to grow from it.”
