# Data Processing Control Center

> Data becomes trustworthy when extraction, validation, normalization, and output contracts are governed before orchestration grows around them.
> 只有当提取、校验、归一化与输出契约先被治理，再围绕它扩张编排时，数据处理才真正可信。

## Purpose

This document is the root control-center for `developer-tool/data-processing/`.

It exists to provide a stable entrypoint for the part of `developer-tool` that governs:

- tabular and document processing doctrine
- extraction / validation / normalization / transformation stages
- migration-oriented data shaping
- output contracts for structured outputs

This subtree is doctrine-first.
Its job is to keep data-processing deterministic and stage-aware instead of collapsing into improvised one-off transformations.

## Core Rule

`data-processing` is a doctrine-first subsystem.

That means:

- its canonical truth currently lives in `developer-tool/references/data-processing/`
- its root control job is to route data-processing questions into the correct doctrine slice before orchestration or automation grows around them
- `TRIGGER_SCOPE.md` now freezes first-owner routing for the subsystem
- `ABSORPTION_MATRIX.md` now governs donor promotion for the subsystem
- future staging or dedicated shell expansion may happen only if processing pressure becomes specific enough
- root `developer-tool` runtime surfaces still remain the default runtime layer when operational leverage is required

The goal is not to move bytes around quickly.
The goal is to make structure more trustworthy at each stage.

---

## Current Layer Model

### 1. Canonical doctrine

Location:

- `developer-tool/references/data-processing/*`

Owns:

- broad data-processing doctrine
- stage-based extraction/validation/normalization posture
- migration and transformation guidance
- output-contract discipline

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
- future trigger/absorption bootstrap for this subsystem

### 3. Runtime shell

Current status:

- no dedicated subsystem runtime shell
- runtime-facing behavior is still served by the root `developer-tool` commands, agents, hooks, and rules

The doctrine is:

- data-processing work stays doctrine-first and explicitly routed
- not silently converted into an automation shell before its contracts are clear

---

## Reading Order

1. `README.md`
2. `INVENTORY.md`
3. `TRIGGER_SCOPE.md`
4. `ABSORPTION_MATRIX.md`
5. `../../references/data-processing/INDEX.md`
6. Then enter the correct doctrine slice:
   - `data-processing.md`
7. Then route outward only if needed:
   - `../../references/data-agent-workflows.md` when orchestration or agent topology dominates
   - `../build-and-deploy/README.md` when migration/release posture dominates
   - `../tool-ecosystem/README.md` when runtime-surface law dominates

This keeps stage-truth first and automation second.

---

## What This Subsystem Is For

Use this subtree when the question is about:

- CSV / TSV / PDF / DOCX / PPTX processing
- detection / extraction / validation / normalization / transformation stages
- migration-oriented data shaping
- deterministic structured outputs
- output contracts that downstream systems can trust

---

## What This Subsystem Is NOT

It is not:

- a replacement for `build-and-deploy`
- a donor parking lot
- a generic multi-agent orchestration lane
- a place to hide messy data pipelines behind runtime magic

If the question is primarily about:

- orchestration, MCP, or multi-agent topology -> go to `../../references/data-agent-workflows.md`
- shell/runtime surface law -> go to `../tool-ecosystem/README.md`
- migration rollout and operational blast radius -> go to `../build-and-deploy/README.md`

---

## Cross-Links

Read this alongside:

- `INVENTORY.md`
- `TRIGGER_SCOPE.md`
- `ABSORPTION_MATRIX.md`
- `../../references/data-processing/INDEX.md`
- `../../references/data-processing/data-processing.md`
- `../../references/data-agent-workflows.md`
- `../build-and-deploy/README.md`
- `../tool-ecosystem/README.md`

---

## Final Doctrine

The reusable lesson is not:

> “data-processing is where the CSV/PDF docs live.”

The reusable lesson is:

> “`data-processing` is a doctrine-first subsystem that governs how messy input becomes interpretable, validated, and operationally useful structure—so downstream automation inherits trustworthy contracts instead of accidental transformations.”
