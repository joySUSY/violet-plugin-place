# Build and Deploy Trigger Scope

> Choose the release posture before choosing the deployment action.
> 先选对交付姿态，再决定要不要执行部署动作。

## Purpose

Define the canonical trigger-ownership doctrine for `developer-tool/build-and-deploy`.

This document answers a subsystem control-plane question:

> when a build-, release-, or deployment-related event appears, which layer should respond first—subtree control docs, canonical doctrine, subtree-local skill bundles, root runtime surfaces, or donor/source fallback—and how do we keep this subsystem doctrine-first while still respecting that delivery work has high operational blast radius?

## Source Provenance

- **Primary source:** current `developer-tool` build-and-deploy doctrine cluster, subtree control plane, and subtree-local skill bundles
- **Derived from:** CI/CD, release governance, deployment orchestration, supply-chain canonization, and build/deploy runtime-boundary work inside `developer-tool`
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local trigger-ownership doctrine aligned to the current build-and-deploy subsystem

---

## Core Rule

`build-and-deploy` is doctrine-first, but delivery questions are high-blast-radius.

That means a trigger in this subsystem should usually resolve through:

1. subtree control plane
2. canonical doctrine
3. subtree-local skill bundles only when they add focused leverage
4. root runtime surfaces only if explicit operational leverage is required
5. donor/source reservoirs only if doctrine is still insufficient

The goal is not to turn release or deployment work into ambient automation.
The goal is to make the safe and explicit delivery path easier than the risky shortcut.

---

## Ownership Layers

### 1. Root control plane

Owned by:

- `README.md`
- `INVENTORY.md`
- `TRIGGER_SCOPE.md`

Use when:

- the question is still about subsystem framing
- the user or agent needs to know what this subtree currently is and is not
- routing remains ambiguous

### 2. Canonical doctrine

Owned by:

- `../../references/build-and-deploy/*`

Use when the question is actually about:

- CI/CD structure
- build reproducibility
- runtime-boundary doctrine for build/deploy surfaces
- release governance
- deployment strategy
- supply-chain posture

### 3. Subtree-local skill bundles

Owned by:

- `ci-cd-multi-platform-matrix/`
- `containerization-docker-standards/`
- `release-and-deployment-processes/`

Use only when:

- the doctrinal lane is already clear
- a more focused subtree-local skill pack adds real leverage
- the skill pack clarifies a narrow build/deploy concern better than the broad doctrine page alone

These are not a staging subsystem.
They are support packs under a doctrine-first subtree.

### 4. Root runtime surfaces

Owned by root `developer-tool` shell surfaces such as:

- `../../commands/prime/tool-runtime.md`
- `../../commands/route/choose-tool-surface.md`
- `../../agents/plugin-auditor.md`

Use only when:

- the problem has already been routed correctly
- an explicit runtime action or bounded review adds leverage
- the question is no longer purely doctrinal

### 5. Source reservoir fallback

Owned by preserved donor families and upstream references.

Use only when:

- canonical doctrine is insufficient
- no rooted runtime surface can answer the operational question
- missing patterns need upstream validation

---

## First-Owner Trigger Matrix

| Trigger Shape                                                    | First Owner                              | Why                                         |
| ---------------------------------------------------------------- | ---------------------------------------- | ------------------------------------------- |
| “How should this CI/CD pipeline be structured?”                  | canonical doctrine                       | build/deploy doctrine question              |
| “How should we version and release this?”                        | canonical doctrine                       | release-governance question                 |
| “Which deployment strategy fits this blast radius?”              | canonical doctrine                       | deployment-orchestration question           |
| “Which subtree-local build/deploy skill pack is relevant?”       | subtree control plane, then skill bundle | routing before specialization               |
| “Should this behavior live in doctrine, command, hook, or rule?” | canonical doctrine                       | runtime-boundary question                   |
| “Which root runtime surface should I use right now?”             | root runtime route/prime/audit surface   | operational routing after doctrinal framing |
| “The doctrine is insufficient; we need upstream validation”      | donor/source fallback                    | last resort only                            |

---

## Trigger Law

### Doctrine-first law

If the question is:

- educational
- architectural
- release-governance-shaped
- deployment-strategy-shaped
- supply-chain-shaped

then the first owner is doctrine, not runtime.

### Runtime-second law

Only use root runtime surfaces when:

- the doctrinal lane is already clear
- a concrete operational action or bounded review is needed
- the problem is no longer “what is the correct build/deploy law?” but “what should the shell do next?”

### No-ambient-automation law

Because build/deploy work has high blast radius:

- do not let subtree-local skill packs masquerade as deployment automation
- do not bypass doctrine just because root runtime commands exist
- do not turn release/reproducibility questions into execution decisions too early

---

## Hook / Lifecycle Consequence

At the current maturity level, this subsystem does not justify subtree-specific lifecycle hooks.

If lifecycle behavior is being considered, route first through:

- root runtime doctrine under `developer-tool`
- `../../references/build-and-deploy/runtime-boundaries.md`
- `../../references/tool-ecosystem/hook-runtime-patterns.md`

The doctrine is:

- build/deploy-facing lifecycle automation should stay conservative and root-owned
- not sprout a subtree-local hook layer casually

---

## Cross-Links

Read this alongside:

- `README.md`
- `INVENTORY.md`
- `../../references/build-and-deploy/INDEX.md`
- `../../references/build-and-deploy/runtime-boundaries.md`
- `../../references/build-and-deploy/release-governance.md`
- `../../references/build-and-deploy/deployment-orchestration-patterns.md`
- `../../references/build-and-deploy/supply-chain-governance.md`
- `../../commands/prime/tool-runtime.md`

---

## Final Doctrine

The reusable lesson is not:

> “build-and-deploy now has trigger scope rules too.”

The reusable lesson is:

> “`build-and-deploy` is a doctrine-first subsystem whose trigger model should keep delivery reasoning explicit and bounded before it becomes operational, so reproducible and auditable release posture remains easier to choose than risky deployment shortcuts under pressure.”
