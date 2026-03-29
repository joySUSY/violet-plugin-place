# Build and Deploy Control Center

> Delivery becomes trustworthy when build, release, and deploy logic are governed before automation scales.
> 只有当构建、发布与部署逻辑先被治理，再去扩大自动化时，交付系统才真正可信。

## Purpose

This document is the root control-center for `developer-tool/build-and-deploy/`.

It exists to provide a stable entrypoint for the part of `developer-tool` that governs:

- CI/CD and build reproducibility
- release discipline and version truth
- deployment strategy and rollout posture
- supply-chain governance
- subtree-local build/deploy skill bundles already living under this subtree

This subtree is doctrine-first, but it also touches a high-blast-radius operational domain.
That makes its control plane strategically important.

## Core Rule

`build-and-deploy` is a doctrine-first subsystem with high operational blast radius.

That means:

- its canonical truth currently lives in `developer-tool/references/build-and-deploy/`
- its root control job is to route build/release/deploy questions into the correct doctrine slice before automation or mutation
- `TRIGGER_SCOPE.md` now freezes first-owner routing for the subsystem
- `ABSORPTION_MATRIX.md` now governs donor promotion for the subsystem
- future staging or dedicated shell expansion may happen only if operational pressure becomes specific enough
- root `developer-tool` runtime surfaces still remain the default runtime layer for build/deploy-facing operations

The goal is not to turn delivery logic into opaque automation.
The goal is to make the safe release path easier than the risky shortcut.

---

## Current Layer Model

### 1. Canonical doctrine

Location:

- `developer-tool/references/build-and-deploy/*`

Owns:

- broad build/deploy doctrine
- runtime-boundary doctrine for build/deploy surfaces
- release governance
- deployment orchestration
- supply-chain governance

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

### 3. Existing subtree skill bundles

Location:

- `ci-cd-multi-platform-matrix/`
- `containerization-docker-standards/`
- `release-and-deployment-processes/`

Current role:

- supporting skill packs already living under the subtree
- not yet formalized as a governed staging subsystem

### 4. Runtime shell

Current status:

- no dedicated subsystem runtime shell
- runtime-facing behavior is still served by the root `developer-tool` commands, agents, hooks, and rules

The doctrine is:

- build/deploy operations stay doctrine-first and explicitly triggered
- not silently converted into a local automation shell

---

## Reading Order

1. `README.md`
2. `INVENTORY.md`
3. `TRIGGER_SCOPE.md`
4. `ABSORPTION_MATRIX.md`
5. `../../references/build-and-deploy/INDEX.md`
6. Then enter the correct doctrine slice:
   - `build-deploy.md`
   - `runtime-boundaries.md`
   - `release-governance.md`
   - `deployment-orchestration-patterns.md`
   - `supply-chain-governance.md`
   - `../build-deploy-patterns.md`
7. Only then use root runtime surfaces if the task becomes operational

This keeps control first and execution second.

---

## What This Subsystem Is For

Use this subtree when the question is about:

- CI/CD pipeline posture
- build reproducibility and packaging
- release/version/changelog discipline
- deployment strategy selection and rollout safety
- supply-chain governance and dependency trust
- whether build/deploy behavior belongs in doctrine, commands, hooks, or rules

---

## What This Subsystem Is NOT

It is not:

- a replacement for `tool-ecosystem`
- a donor parking lot
- a hidden automation shell for release or deploy mutation
- a place to normalize risky production automation into convenience

If the question is primarily about:

- shell/runtime law -> go to `../tool-ecosystem/README.md`
- shell scripting posture -> go to `../shell-and-terminal/README.md`
- memory continuity -> go to `../ai-agent-memory/README.md`

---

## Cross-Links

Read this alongside:

- `INVENTORY.md`
- `TRIGGER_SCOPE.md`
- `ABSORPTION_MATRIX.md`
- `../../references/build-and-deploy/INDEX.md`
- `../../references/tool-ecosystem/INDEX.md`
- `../../references/plugin-runtime-overview.md`
- `../tool-ecosystem/README.md`

---

## Final Doctrine

The reusable lesson is not:

> “build-and-deploy is where the CI/CD docs live.”

The reusable lesson is:

> “`build-and-deploy` is a doctrine-first subsystem that governs how source becomes trusted runtime reality, so runtime shell surfaces can support delivery work without normalizing opaque or high-blast-radius automation into casual defaults.”
