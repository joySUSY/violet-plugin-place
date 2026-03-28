# Rust Interop Index

## Purpose

Canonical entrypoint for Rust interop doctrine across C/C++, Python, Node.js, TypeScript/WASM, and Tauri boundary work.

Use this category when the task is about:
- FFI boundary design
- cross-language packaging and workflow coordination
- native addon or binding architecture
- WASM/TS contracts
- interop testing and audit discipline

## Source Provenance

- **Primary source:** current canonical interop subtree under `references/interop/`
- **Derived from:** major interop donor families (Rust FFI, PyO3, NAPI-RS, wasm-bindgen, ts-rs/tsify, Tauri) plus local doctrine synthesis
- **Upstream URL:** not applicable as a synthesized local navigation index
- **Freshness status:** canonical local index aligned to the current Rust interop subtree

---

## Core Canonical Sources

- `rust-ffi-and-interop-overview.md`
- `rust-ffi-mastery-c-cpp-deep-dive.md`
- `rust-pyo3-maturin-bindings.md`
- `rust-cross-language-workflows.md`
- `boundary-activation-model.md`
- `rust-typescript-bridge-patterns.md`
- `rust-node-native-addon-posture.md`
- `rust-tauri-core-shell-and-ipc-boundaries.md`
- `wasm-bindgen-posture.md`
- `rust-interop-testing-and-audit-discipline.md`

---

## Intended Role

This zone owns the interop taxonomy and safety routing for:
- C / C++
- Python
- Node.js
- TypeScript / WASM
- Tauri frontend/backend bridges

This index also owns interop testing and audit discipline for all of these lanes.

---

## Reading Order

1. `rust-ffi-and-interop-overview.md`
2. `boundary-activation-model.md` if the lane is still unclear
3. then lane-specific doctrine:
   - C/C++ -> `rust-ffi-mastery-c-cpp-deep-dive.md`
   - Python -> `rust-pyo3-maturin-bindings.md`
   - Node -> `rust-node-native-addon-posture.md`
   - TS/WASM -> `rust-typescript-bridge-patterns.md`, `wasm-bindgen-posture.md`
   - Tauri -> `rust-tauri-core-shell-and-ipc-boundaries.md`
4. `rust-cross-language-workflows.md` when the system spans multiple surfaces
5. `rust-interop-testing-and-audit-discipline.md` when proof/audit is central

---

## Cleanup-Safe Rule

The donor family names behind this subtree are provenance identifiers.
They are not a promise that any specific reservoir filesystem path will continue to exist after cleanup or archival.
