# CodeYourPCB Workspace Patterns

## Purpose

Capture the reusable architecture lessons from `codeyourpcb-main` as canonical doctrine inside `rust-coding-engine`.

This is a particularly important donor because it is not “just an ECS project” and not “just a Rust app.”
It is a **multi-surface, cross-language, workspace-scale system**.

## Source Provenance

- **Local donor path:** `New_part_ref/codeyourpcb-main/`
- **Verified repository:** `https://github.com/codeyourpcb/codeyourpcb`

This repository URL was verified from local donor metadata (`New_part_ref/codeyourpcb-main/Cargo.toml`) rather than inferred from memory.

This case study should also be treated as a Rust–TypeScript–WASM–Tauri donor, not merely an ECS reference.

---

## Why This Case Study Matters

`codeyourpcb-main` combines several architecture pressures at once:
- a large Rust Cargo workspace
- typed core geometry and domain vocabulary
- parser + AST synchronization
- ECS/world-model state management
- validation and export pipelines
- WASM rendering
- a TypeScript frontend
- Tauri desktop integration
- platform abstraction
- LSP/editor-facing tooling

That means it is valuable far beyond the fact that it uses Bevy ECS.
It is one of the strongest donor examples of **Rust + TypeScript + WASM + desktop/web coexistence** in one coherent system.

---

## Core Lesson

The most important reusable lesson is:

> when one system must serve many runtime surfaces and many architectural concerns, crate boundaries, typed core models, and platform boundaries must all be made explicit early.

This repo shows what that looks like when done seriously.

---

## Pattern 1 — A Shared Typed Core Vocabulary Is Worth It

A dedicated core crate for:
- units
- geometry
- coordinates
- domain primitives

is one of the most important lessons in the repo.

This matters because it gives the whole system:
- one shared technical language
- one place for unit safety
- one stable base for parser, renderer, validator, exporter, and frontend bridges to agree on

That is much stronger than letting every subsystem invent its own raw primitive assumptions.

---

## Pattern 2 — Parser, World Model, Validation, Rendering, Export, and LSP Deserve Distinct Homes

The crate graph is valuable because it separates genuinely different responsibilities:
- `core`
- `parser`
- `world`
- `drc`
- `render`
- `export`
- `router`
- `platform`
- `library`
- `lsp`
- utility crates

This is not arbitrary decomposition.
It is decomposition around **real domain and runtime boundaries**.

The lesson is not “always create many crates.”
The lesson is:
- when the domain surfaces are truly distinct, give them explicit architectural homes
- let the dependency graph reveal the system shape

---

## Pattern 3 — ECS / World Model Is Only One Part of the Story

Yes, the ECS/world model is important.
But treating this donor as “the Bevy ECS example” would undersell it badly.

What matters is that the ECS/world model acts as a **shared source of truth** for multiple consumers:
- DRC/validation
- rendering
- export
- routing
- future tooling and editor surfaces

That is the reusable architectural lesson:
- if many parts of the system need to query and derive behavior from the same evolving state, invest in a coherent shared model

The ECS angle matters, but it is not the whole donor.

---

## Pattern 4 — Cross-Language Boundary Is First-Class

This repo is also a Rust/TS interaction case study.

That matters because the architecture explicitly includes:
- Rust backend and render logic
- WASM bridge surfaces
- TypeScript UI/runtime concerns
- desktop Tauri shell

So yes: this is absolutely relevant as a **Rust ↔ TypeScript boundary project**, not just a Rust-only design.

The doctrinal lesson is:
- if TS/web/desktop are real target surfaces, the Rust system should acknowledge them architecturally from the start
- not bolt them on later as awkward wrappers

---

## Pattern 5 — Platform Abstraction Is a Real Architectural Boundary

A dedicated `platform` layer/crate is one of the repo's strongest moves.

It separates:
- native filesystem/storage/dialog/menu behavior
- web filesystem/storage behavior
- desktop-specific integration

That teaches an important systems lesson:
- platform differences are not just build flags
- they are boundary conditions that deserve explicit architecture

This is especially relevant when a Rust system targets:
- web + desktop
- CLI + web
- WASM + native

---

## Pattern 6 — Rendering Surface and Tooling Surface Both Matter

The donor is unusual in a good way because it is not only about core logic or runtime execution.
It also includes:
- rendering architecture
- export architecture
- LSP/tooling architecture
- library/component management

This means the system is teaching a bigger lesson:

> a mature Rust architecture does not stop at core logic; it also accounts for how users edit, inspect, validate, and export the system.

That is precisely why this donor is so valuable for `rust-coding-engine`.

---

## Pattern 7 — Workspace-Scale Systems Need Dependency Discipline, Not Crate Vanity

The donor shows that the real question is not:
- “how many crates do we have?”

The real questions are:
- are the crate boundaries meaningful?
- does the dependency graph stay legible?
- is the core vocabulary stable?
- do platform or UI concerns leak inward?
- does the workspace help understanding, or just spread complexity out?

This is the correct doctrine for teaching workspace-scale Rust architecture.

---

## Pattern 8 — What Must Survive Donor Cleanup

Because this donor is expected to become a cleanup candidate only after proper integration, the engine must preserve at least these lessons canonically:

1. a typed core vocabulary can anchor a large multi-surface system
2. parser/world/validation/render/export/tooling boundaries deserve distinct homes when they are truly different
3. ECS/world-model value is strongest when it acts as shared truth for many consumers
4. Rust/TS/WASM/desktop bridges must be designed as first-class architecture, not afterthoughts
5. platform abstraction can deserve its own crate/layer
6. workspace quality depends on meaningful dependency boundaries, not crate count performance art

If those lessons are not preserved, then deleting the donor later would damage the engine's architectural reach.

---

## Cross-Links

This case study should influence:
- `references/architecture/rust-architecture-and-scaffolding.md`
- `references/architecture/rust-axum-service-architecture-and-thin-adapters.md` (for boundary discipline, even though the web framework differs)
- `references/interop/rust-typescript-bridge-patterns.md`
- `modules/tauri/`
- `modules/wasm/`
- `modules/ecs/`
- `typescript-coding-engine` interop doctrine

---

## Final Doctrine

The reusable lesson is not:
> “this is a Bevy ECS Rust repo.”

The reusable lesson is:
> “this is a workspace-scale Rust system where typed core models, ECS/world truth, WASM rendering, TypeScript frontend boundaries, Tauri desktop packaging, export pipelines, and editor tooling are all forced to coexist coherently.”

That is why it is one of the most important cross-domain repo donors in the whole Rust intake.
