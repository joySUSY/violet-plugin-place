# Language Specialists Control Center

> Specialist guidance should preserve native ecosystem truth without pretending every language needs a full engine immediately.
> 专家型语言指导应保留各自生态的真实边界，而不是假装每种语言都需要立刻拥有完整引擎。

## Purpose

This document is the root control-center for `developer-tool/language-specialists/`.

It exists to provide a stable entrypoint for the part of `developer-tool` that governs:

- language-specific idioms for ecosystems not covered by dedicated heavy engines
- framework and toolchain posture where language truth materially matters
- interop and routing boundaries between specialist guidance and other doctrine lanes
- when a task should stay inside `developer-tool` versus route to another engine

This subtree is doctrine-first and bridge-shaped.
Its job is to preserve specialist truth without turning `developer-tool` into five separate partial engines.

## Core Rule

`language-specialists` is a doctrine-first, bridge-shaped subsystem.

That means:

- its canonical truth currently lives in `developer-tool/references/language-specialists/`
- its root control job is to route language-specific work into the correct doctrine slice before implementation detail or donor richness takes over
- `TRIGGER_SCOPE.md` now freezes first-owner routing for the subsystem
- `ABSORPTION_MATRIX.md` now governs donor promotion for the subsystem
- future staging or dedicated shell expansion may happen only if specialist pressure becomes specific enough
- root `developer-tool` runtime surfaces still remain the default runtime layer when operational leverage is required

The goal is not to flatten every language into generic tool advice.
The goal is to preserve ecosystem-specific truth while routing outward when the problem is really platform-, runtime-, or interop-driven.

---

## Current Layer Model

### 1. Canonical doctrine

Location:

- `developer-tool/references/language-specialists/*`

Owns:

- broad language-specialist doctrine
- language-specific idiom and toolchain posture
- routing guidance for interop/platform/runtime adjacency
- bridge-shaped specialist framing inside `developer-tool`

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

- specialist work stays doctrine-first and explicitly routed
- not silently converted into a shell just because the language is concrete

---

## Reading Order

1. `README.md`
2. `INVENTORY.md`
3. `TRIGGER_SCOPE.md`
4. `ABSORPTION_MATRIX.md`
5. `../../references/language-specialists/INDEX.md`
6. Then enter the correct doctrine slice:
   - `language-specialists.md`
7. Then route outward only if needed:
   - `../cross-platform-development/README.md` when support tiers or platform boundaries dominate
   - `../../rust-coding-engine/README.md` when the task is truly Rust-core
   - `../../typescript-coding-engine/README.md` when the task is truly TypeScript-core

This keeps specialist truth first and engine-routing second.

---

## What This Subsystem Is For

Use this subtree when the question is about:

- C++ / Kotlin / Swift / Flutter / PHP / PowerShell specialist guidance
- language-specific idioms and toolchain reality for ecosystems not covered by dedicated heavy engines
- whether a task should remain in `developer-tool` or route to a heavier engine/lane
- interop-adjacent language advice that still needs specialist framing

---

## What This Subsystem Is NOT

It is not:

- a replacement for dedicated heavy engines
- a donor parking lot
- a fake universal language academy
- a place to discuss languages without their runtime/toolchain consequences

If the question is primarily about:

- cross-platform support truth -> go to `../cross-platform-development/README.md`
- shell/runtime surface law -> go to `../tool-ecosystem/README.md`
- Rust or TypeScript core engineering -> route to the dedicated heavy engine

---

## Cross-Links

Read this alongside:

- `INVENTORY.md`
- `TRIGGER_SCOPE.md`
- `ABSORPTION_MATRIX.md`
- `../../references/language-specialists/INDEX.md`
- `../../references/language-specialists/language-specialists.md`
- `../cross-platform-development/README.md`
- `../../rust-coding-engine/README.md`
- `../../typescript-coding-engine/README.md`

---

## Final Doctrine

The reusable lesson is not:

> “language-specialists is where the remaining language notes live.”

The reusable lesson is:

> “`language-specialists` is a doctrine-first bridge subsystem that preserves ecosystem-specific truth while routing deeper runtime, interop, and platform pressure to the right broader lane or dedicated engine—so `developer-tool` stays sharp instead of collapsing into generic multi-language sprawl.”
