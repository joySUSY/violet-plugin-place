# Developer Tool Inventory

## Purpose

Define the canonical inventory snapshot of the matured `developer-tool` engine.

This document is the governance inventory for the engine in its current deep-fusion stage.

It answers four questions:

1. What already exists as canonical doctrine?
2. What already exists as root governance?
3. What already exists as staging or bounded runtime shell?
4. What still remains donor-side, deferred, or not yet fully normalized?

---

## Layer Model

| Layer                   | Meaning                                                                                         |
| ----------------------- | ----------------------------------------------------------------------------------------------- |
| Canonical doctrine      | stable knowledge center under `developer-tool/references/` and matured subsystem doctrine trees |
| Root governance         | root docs that route, classify, freeze ownership, and govern promotion                          |
| Subtree control planes  | local governance quartets for matured subsystems                                                |
| Staging layers          | adapted complexity not yet cleanly flattened into canonical doctrine                            |
| Runtime shells          | bounded operational plugin surfaces                                                             |
| Donor/source reservoirs | upstream source families or preserved root candidates                                           |

This layer model matters because `developer-tool` is no longer a flat plugin shell.
It is a governed multi-subsystem heavy engine.

---

## Root Control Plane Inventory

### Root governance docs

Canonical now:

- `SKILL.md`
- `README.md`
- `INVENTORY.md`
- `TRIGGER_SCOPE.md`
- `ABSORPTION_MATRIX.md`
- `references/INDEX.md`
- `references/source-reservoir-map.md`
- `references/plugin-runtime-overview.md`
- `references/memory-systems-overview.md`

Role:

- root routing
- engine-wide layer model
- subsystem maturity framing
- trigger ownership
- donor, staging, and runtime promotion governance

These files now form the engine’s root control plane.

---

## Canonical Doctrine Inventory

### Root doctrine tree

Canonical now:

- `references/agentic-system-basis/INDEX.md`
- `references/ai-agent-memory/INDEX.md`
- `references/tool-ecosystem/INDEX.md`
- `references/shell-and-terminal/INDEX.md`
- `references/build-and-deploy/INDEX.md`
- `references/data-processing/INDEX.md`
- `references/cross-platform-development/INDEX.md`
- `references/language-specialists/INDEX.md`

### Major matured doctrine clusters

#### `ai-agent-memory/`

Control plane:

- `ai-agent-memory/README.md`
- `ai-agent-memory/INVENTORY.md`
- `ai-agent-memory/TRIGGER_SCOPE.md`
- `ai-agent-memory/ABSORPTION_MATRIX.md`

Canonical doctrine:

- `references/ai-agent-memory/*`
- `references/ai-agent-memory/INDEX.md`

Role:

- recall doctrine
- continuity doctrine
- retrieval-lane doctrine
- memory-specific source governance
- staged-module and runtime-shell governance for the memory subsystem

Current shape:

- doctrine-mature subsystem
- governed staging under `ai-agent-memory/v3-expansion/`
- bounded runtime shell under `plugins/violet-memory-lab/`

#### `agentic-system-basis/`

Control plane:

- `agentic-system-basis/README.md`
- `agentic-system-basis/INVENTORY.md`
- `agentic-system-basis/TRIGGER_SCOPE.md`
- `agentic-system-basis/ABSORPTION_MATRIX.md`

Canonical doctrine:

- `references/agentic-system-basis/*`
- `references/agentic-system-basis/INDEX.md`

Role:

- broad agentic-system architecture
- activation and runtime selection logic
- bootstrap and capability discovery
- ensemble and team governance
- autonomy and gate doctrine
- doctrine-first control plane for this subsystem

Current shape:

- doctrine-first subsystem with mature local governance
- reserved `v3-expansion/` formally defined but not active staging
- no dedicated subsystem runtime shell yet

#### `tool-ecosystem/`

Control plane:

- `tool-ecosystem/README.md`
- `tool-ecosystem/INVENTORY.md`
- `tool-ecosystem/TRIGGER_SCOPE.md`
- `tool-ecosystem/ABSORPTION_MATRIX.md`

Canonical doctrine:

- `references/tool-ecosystem/*`
- `references/tool-ecosystem/INDEX.md`

Role:

- shell architecture
- component model
- command, hook, MCP, LSP, and validation doctrine
- root control plane for shell-surface ownership

Current shape:

- doctrine-first subsystem with mature local governance
- reserved `v3-expansion/` formally defined but not active staging
- no dedicated subsystem runtime shell yet

#### `shell-and-terminal/`

Control plane:

- `shell-and-terminal/README.md`
- `shell-and-terminal/INVENTORY.md`
- `shell-and-terminal/TRIGGER_SCOPE.md`
- `shell-and-terminal/ABSORPTION_MATRIX.md`

Canonical doctrine:

- `references/shell-and-terminal/*`
- `references/shell-and-terminal/INDEX.md`

Role:

- shell discipline
- terminal posture
- runtime shell governance
- portable session and evidence-capture posture

Current shape:

- doctrine-first subsystem with mature local governance
- subtree-local support bundles exist, but no formal staging subsystem
- no dedicated subsystem runtime shell yet

#### `build-and-deploy/`

Control plane:

- `build-and-deploy/README.md`
- `build-and-deploy/INVENTORY.md`
- `build-and-deploy/TRIGGER_SCOPE.md`
- `build-and-deploy/ABSORPTION_MATRIX.md`

Canonical doctrine:

- `references/build-and-deploy/*`
- `references/build-and-deploy/INDEX.md`

Role:

- CI/CD, release, deployment, and supply-chain governance
- runtime boundaries for build/deploy behavior

Current shape:

- doctrine-first subsystem with mature local governance
- subtree-local support bundles exist, but no formal staging subsystem
- no dedicated subsystem runtime shell yet

#### `data-processing/`

Control plane:

- `data-processing/README.md`
- `data-processing/INVENTORY.md`
- `data-processing/TRIGGER_SCOPE.md`
- `data-processing/ABSORPTION_MATRIX.md`

Canonical doctrine:

- `references/data-processing/*`
- `references/data-processing/INDEX.md`

Role:

- deterministic extraction, validation, normalization, transformation, and output contracts
- route to orchestration only when topology becomes central

Current shape:

- doctrine-first subsystem with mature local governance
- stage-oriented doctrine remains primary over runtime convenience
- no dedicated subsystem runtime shell yet

#### `cross-platform-development/`

Control plane:

- `cross-platform-development/README.md`
- `cross-platform-development/INVENTORY.md`
- `cross-platform-development/TRIGGER_SCOPE.md`
- `cross-platform-development/ABSORPTION_MATRIX.md`

Canonical doctrine:

- `references/cross-platform-development/*`
- `references/cross-platform-development/INDEX.md`

Role:

- support tiers
- shared-core versus platform-shell boundaries
- portability and platform-runtime truth

Current shape:

- doctrine-first subsystem with mature local governance
- subtree-local support bundles exist, but no formal staging subsystem
- no dedicated subsystem runtime shell yet

#### `language-specialists/`

Control plane:

- `language-specialists/README.md`
- `language-specialists/INVENTORY.md`
- `language-specialists/TRIGGER_SCOPE.md`
- `language-specialists/ABSORPTION_MATRIX.md`

Canonical doctrine:

- `references/language-specialists/*`
- `references/language-specialists/INDEX.md`

Role:

- bridge-shaped specialist routing
- language-native truth without creating fake heavy engines
- explicit handoff to platform or dedicated engines when depth outgrows bridge doctrine

Current shape:

- doctrine-first bridge subsystem with mature local governance
- bridge-shaped, no formal staging subsystem
- no dedicated subsystem runtime shell yet

---

## Runtime Shell Inventory

### Root runtime surfaces

Canonical and active now:

- `commands/prime/tool-runtime.md`
- `commands/prime/agentic-system-surface.md`
- `commands/prime/memory-surface.md`
- `commands/prime/tool-ecosystem-surface.md`
- `commands/prime/shell-and-terminal-surface.md`
- `commands/prime/build-and-deploy-surface.md`
- `commands/prime/data-processing-surface.md`
- `commands/prime/cross-platform-surface.md`
- `commands/prime/language-specialists-surface.md`
- `commands/route/choose-tool-surface.md`
- `commands/audit/plugin-structure.md`

### Root bounded agents

Canonical and active now:

- `agents/memory-diagnostician.md`
- `agents/agentic-system-diagnostician.md`
- `agents/tool-ecosystem-diagnostician.md`
- `agents/shell-terminal-diagnostician.md`
- `agents/build-deploy-diagnostician.md`
- `agents/data-processing-diagnostician.md`
- `agents/cross-platform-diagnostician.md`
- `agents/language-specialists-diagnostician.md`
- `agents/plugin-auditor.md`
- `agents/tooling-integrator.md`
- `agents/shell-safety-reviewer.md`

### Root bridge skills

Canonical and active now:

- `skills/ai-agent-memory/SKILL.md`
- `skills/agentic-system-basis/SKILL.md`
- `skills/tool-ecosystem/SKILL.md`
- `skills/shell-and-terminal/SKILL.md`
- `skills/build-and-deploy/SKILL.md`
- `skills/data-processing/SKILL.md`
- `skills/cross-platform-development/SKILL.md`
- `skills/language-specialists/SKILL.md`

These route into doctrine; they do not replace it.

### Hooks and rules

Canonical and active now:

- `hooks/hooks.json`
- `hooks/scripts/session-start-prime.sh`
- `hooks/scripts/precompact-handoff.sh`
- `hooks/scripts/stop-review.sh`
- `rules/activation/engine-activation.md`
- `rules/plugin-architecture/core-shell-laws.md`
- `rules/runtime-selection/tool-surface-selection.md`
- `rules/shell-safety/non-destructive-defaults.md`

### Dedicated runtime shell

Canonical and active now:

- `plugins/violet-memory-lab/`

This is currently the only fully materialized bounded runtime shell inside the broader engine.

---

## Donor Reservoir Inventory

### Primary donor families

Active as source truth, not canonical reading path:

- `agent-skills-main`
- `agentup-main`
- `claude-code-skills-main`
- `claude-recall-main`
- `neural-memory-main`
- `neural-memory-main - Copy`
- `outfitter-main`
- `outfitter-main - Copy`
- `rust-self-learning-memory-main`
- `skill-system-router`

### Domain-specific and specialist donors

Active as source truth, not canonical reading path:

- shell, terminal, and portability donor packs
- build/deploy and supply-chain donor packs
- data extraction and document-processing donor packs
- cross-platform and language-specialist donor packs
- selected security, testing, and workflow donors

These remain source truth and pattern reservoirs.
They are not the engine’s preferred reading path.

---

## Staging Layers

### Governed staging now

- `ai-agent-memory/v3-expansion/` — active governed staging subsystem
- `agentic-system-basis/v3-expansion/` — reserved, explicitly non-active staging
- `tool-ecosystem/v3-expansion/` — reserved, explicitly non-active staging

### Subtree-local support bundles

These exist, but are not currently formal staging subsystems:

- support bundles under `shell-and-terminal/`
- support bundles under `build-and-deploy/`
- support bundles under `cross-platform-development/`

The doctrine is:

- explicit staging must stay named and governed
- support bundles must not quietly become staging by inertia

---

## Canonical vs Transitional Snapshot

### Canonical now

- root control docs (`SKILL.md`, `README.md`, `INVENTORY.md`, `TRIGGER_SCOPE.md`, `ABSORPTION_MATRIX.md`)
- root references doorway and source-governance doctrine
- mature doctrine indexes for all major subsystems
- mature subtree control planes for memory, agentic-system, tool-ecosystem, shell-and-terminal, build-and-deploy, data-processing, cross-platform-development, and language-specialists
- root runtime shell surfaces that now route into real doctrine rather than isolated notes
- one bounded dedicated runtime shell (`plugins/violet-memory-lab/`)

### Transitional now

- donor reservoirs that still serve as upstream evidence only
- staging layers or reserved staging surfaces that still hold complexity not yet flattened into doctrine
- subtree-local support bundles that have not yet been promoted into either canonical doctrine or formal staging governance

### Not canonical

- donor repo directory shapes
- raw skill-pack layouts from source reservoirs
- staging or support bundles as default reading surfaces
- any runtime path that bypasses canonical doctrine and reads donors first

---

## Current State

`developer-tool` is now a matured multi-subsystem heavy engine in canonical deep fusion.

What is already true:

- root references navigation is established
- major subsystem control centers are established
- memory, agentic-system, tool-ecosystem, shell-and-terminal, build-and-deploy, data-processing, cross-platform, and language-specialists all have active canonical support
- root governance and subsystem governance are explicit
- runtime shell surfaces exist and now route into real doctrine rather than isolated notes

What remains true:

- deeper expansion is still possible
- staging layers remain valid where complexity is not yet flattened
- donor cleanup is still blocked until replacement-grade validation is complete
- the engine is already coherent enough to behave as a real plugin-first heavy engine

---

## Governance Rule

This inventory is a snapshot, not a fantasy roadmap.

That means:

- list what is canonical now
- list what is transitional now
- keep donor and source truth visible without pretending it is already integrated
- preserve cleanup-safe navigation by pointing readers to canonical doctrine, not donor paths
- preserve truthful subsystem maturity framing even when different subsystems advance at different speeds

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
- subtree control planes (`*/README.md`, `*/INVENTORY.md`, `*/TRIGGER_SCOPE.md`, `*/ABSORPTION_MATRIX.md`)

---

## Final Doctrine

The reusable lesson is not:

> “the developer-tool engine currently contains these files.”

The reusable lesson is:

> “the inventory is the engine’s governed snapshot: it distinguishes canonical doctrine, root governance, subtree control planes, staging, runtime shells, and donor reservoirs clearly enough that future routing, promotion, validation, and cleanup decisions can be made against explicit current-state truth instead of memory or subsystem folklore.”
