---
name: runtime-validation
description: Use when the task involves trust boundaries, schema posture, parsing external input, IPC/config/storage validation, or deciding when TypeScript's compile-time guarantees are not enough.
---

# Runtime Validation

## Purpose

This bridge skill routes TypeScript work into the canonical runtime-validation and boundary-truth doctrine.

Use it when the task is about:

- external input or payload trust
- config, env, form, API, storage, or IPC validation
- deciding whether compile-time types are sufficient
- schema or validator choice pressure
- clarifying whether the issue is really runtime validation, architecture, or interop

## Reading Path

1. Read `../../SKILL.md` for the engine boundary.
2. Read `../../references/clean-code/INDEX.md`.
3. Read `../../references/clean-code/typescript-runtime-validation-decision-matrix.md`.
4. Read `../../references/clean-code/runtime-boundaries.md`.
5. If the boundary affects system shape, also read `../../references/architecture/INDEX.md` and `../../references/architecture/typescript-architecture-decision-trees.md`.
6. If the boundary is Rust/Tauri/WASM-facing, also read `../../references/interop/INDEX.md`.
7. If posture is still unclear, use `../../commands/route/choose-runtime-validation.md`.

## Pressure Classification

Classify the boundary first:

- API or webhook input
- form or user input
- config or env loading
- storage or rehydration
- IPC or cross-language payload
- generated/shared contract with remaining runtime trust risk

Then name the dominant pressure:

- trust establishment
- schema ownership
- runtime error shape
- architectural boundary placement
- interop boundary coordination

## Output Contract

Return:

1. primary validation posture
2. why it fits
3. whether the issue is architectural, operational, or interop-driven
4. what anti-pattern to avoid
5. the next exact doctrine file to read or runtime surface to use

## Core Rule

TypeScript is compile-time power.
Boundary trust still needs runtime discipline.

Do not turn every boundary into heavyweight schema theater.
Do not let compile-time confidence pretend to be runtime proof.
The right move is to validate exactly where trust changes, then let stronger internal types carry the rest.
