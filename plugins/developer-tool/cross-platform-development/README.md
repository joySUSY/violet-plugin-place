# Cross-Platform Development Control Center

> Portability becomes trustworthy when support claims, boundary choices, and platform-specific reality are governed before implementation enthusiasm takes over.
> 只有当支持范围、边界选择与平台现实先被治理，再进入实现热情时，可移植性才真正可信。

## Purpose

This document is the root control-center for `developer-tool/cross-platform-development/`.

It exists to provide a stable entrypoint for the part of `developer-tool` that governs:
- platform support tiers
- shared-core versus platform-shell boundaries
- runtime/path/capability differences across targets
- cross-platform release and testing posture
- subtree-local cross-platform skill bundles already living under this subtree

This subtree is doctrine-first, but it also mediates between multiple other high-leverage lanes such as shell, build/deploy, and tool ecosystem.
That makes its control plane strategically important.

## Core Rule

`cross-platform-development` is a doctrine-first subsystem.

That means:
- its canonical truth currently lives in `developer-tool/references/cross-platform-development/`
- its root control job is to route platform-support and portability questions into the correct doctrine slice before implementation or packaging claims
- `TRIGGER_SCOPE.md` now freezes first-owner routing for the subsystem
- `ABSORPTION_MATRIX.md` now governs donor promotion for the subsystem
- future staging or dedicated shell expansion may happen only if cross-platform pressure becomes specific enough
- root `developer-tool` runtime surfaces still remain the default runtime layer for cross-platform-facing operational work

The goal is not to claim broad portability by optimism.
The goal is to make supported-platform truth explicit and defensible.

---

## Current Layer Model

### 1. Canonical doctrine
Location:
- `developer-tool/references/cross-platform-development/*`

Owns:
- broad cross-platform doctrine
- support-tier strategy
- shared-core vs platform-shell design
- runtime/path/capability boundary truth
- testing and release implications of support claims

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
- `platform-support-cross-platform-compatibility/`
- `tauri-development/`
- `tauri2-react-rust/`

Current role:
- supporting skill packs already living under the subtree
- not yet formalized as a governed staging subsystem

### 4. Runtime shell
Current status:
- no dedicated subsystem runtime shell
- runtime-facing behavior is still served by the root `developer-tool` commands, agents, hooks, and rules

The doctrine is:
- cross-platform decisions stay doctrine-first and explicitly triggered
- not silently converted into a local automation shell

---

## Reading Order

1. `README.md`
2. `INVENTORY.md`
3. `TRIGGER_SCOPE.md`
4. `ABSORPTION_MATRIX.md`
5. `../../references/cross-platform-development/INDEX.md`
6. Then enter the correct doctrine slice:
   - `cross-platform.md`
   - `../../references/cross-platform-patterns.md`
7. Then route outward only if needed:
   - `../build-and-deploy/README.md` when release/test/support claims dominate
   - `../shell-and-terminal/README.md` when environment portability is the real bottleneck
   - `../tool-ecosystem/README.md` when shell/component boundaries dominate

This keeps support-truth first and implementation second.

---

## What This Subsystem Is For

Use this subtree when the question is about:
- what platforms are truly supported
- how much code or UX should be shared across targets
- where platform-specific behavior must remain isolated
- how path/env/runtime differences shape architecture
- how release/testing claims should match actual platform coverage
- how hybrid/native/shared-core strategies should be chosen

---

## What This Subsystem Is NOT

It is not:
- a replacement for `build-and-deploy`
- a donor parking lot
- a framework preference battleground
- a place to claim cross-platform support without evidence

If the question is primarily about:
- shell/component/runtime surface law -> go to `../tool-ecosystem/README.md`
- shell environment behavior -> go to `../shell-and-terminal/README.md`
- release orchestration or supply-chain posture -> go to `../build-and-deploy/README.md`

---

## Cross-Links

Read this alongside:
- `INVENTORY.md`
- `TRIGGER_SCOPE.md`
- `ABSORPTION_MATRIX.md`
- `../../references/cross-platform-development/INDEX.md`
- `../../references/cross-platform-patterns.md`
- `../build-and-deploy/README.md`
- `../shell-and-terminal/README.md`
- `../tool-ecosystem/README.md`

---

## Final Doctrine

The reusable lesson is not:
> “cross-platform-development is where the portability docs live.”

The reusable lesson is:
> “`cross-platform-development` is a doctrine-first subsystem that governs how support truth, shared-core boundaries, and platform-specific reality should be made explicit before any implementation or release claim is allowed to pretend the product is portable.”
