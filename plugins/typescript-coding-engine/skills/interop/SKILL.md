---
name: interop
description: Use when the task involves Rust/TS type sharing, WASM/TS bridges, Tauri boundaries, generated contracts, or TypeScript-facing cross-language ownership questions.
---

# TypeScript Interop

## Purpose

This bridge skill routes TypeScript work into the canonical interop lane.

Use it when the task is about:
- Rust-generated or Rust-owned contracts consumed in TS
- Tauri frontend↔Rust core IPC boundaries
- WASM or generated binding consumption from TypeScript
- contract drift, generated artifact alignment, or boundary ownership
- deciding whether the real owner is TypeScript interop, Rust interop, or runtime validation

## Reading Path

1. Read `../../SKILL.md` for the engine boundary.
2. Read `../../references/interop/INDEX.md`.
3. Read `../../references/interop/boundary-activation-model.md`.
4. Read `../../references/interop/rust-typescript-contract-boundaries.md`.
5. If the bridge is desktop or Tauri-facing, also read `../../references/interop/tauri-frontend-rust-bridge.md`.
6. If the contract source is clearly Rust-owned, inspect the Rust-side doctrine next only after ownership is explicit.
7. Use `../../agents/interop-reviewer.md` only when bounded review adds leverage.

## Pressure Classification

Classify the interop pressure first:
- contract ownership
- generated artifact drift
- Tauri or IPC boundary
- WASM consumer boundary
- TS-side runtime validation at the interop edge
- build/import alignment

## Output Contract

Return:
1. primary interop lane
2. structural truth owner
3. main contract or boundary risk
4. whether TS-side runtime validation is also needed
5. the next exact doctrine file to read

## Core Rule

Interop is a contract-discipline problem, not just a packaging problem.
Keep TypeScript-side convenience aligned with backend or bridge truth, and resolve ownership before implementation moves begin.
