# Rust Interop Index
# Authors: Joysusy & Violet Klaudia 💖

## Purpose

Canonical entrypoint for Rust interop doctrine across C/C++, Python, Node.js, TypeScript/WASM, and Tauri boundary work.

Use this category when the task is about:
- FFI boundary design
- cross-language packaging and workflow coordination
- native addon or binding architecture
- WASM/TS contracts
- interop testing and audit discipline

## Source Provenance

- **Primary source:** `references/interop/` canonical subtree
- **Derived from:** Rust FFI, PyO3, NAPI-RS, wasm-bindgen, ts-rs/tsify, Tauri donor families plus local doctrine synthesis

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

## Reading Paths

**First time crossing a language boundary?** Start with the FFI overview, then the boundary activation model. These two build the mental scaffolding before you touch any specific lane.

**Know your target language already?** Jump straight to the lane-specific doc (see Problem-Pressure Routes below), then circle back to cross-language workflows when the system grows.

**Multi-surface system?** Overview → boundary model → each relevant lane doc → cross-language workflows → testing/audit discipline. That's the full arc.

---

## Problem-Pressure Routes

| You need to... | Start here |
|---|---|
| Call C/C++ from Rust (or expose Rust to C) | `rust-ffi-mastery-c-cpp-deep-dive.md` |
| Build a Python package with Rust internals | `rust-pyo3-maturin-bindings.md` |
| Ship a native Node.js addon | `rust-node-native-addon-posture.md` |
| Expose Rust logic to the browser via WASM | `wasm-bindgen-posture.md` |
| Generate TypeScript types from Rust structs | `rust-typescript-bridge-patterns.md` |
| Design a Tauri app's Rust/JS boundary | `rust-tauri-core-shell-and-ipc-boundaries.md` |
| Coordinate builds across multiple languages | `rust-cross-language-workflows.md` |
| Decide which interop lane to use at all | `boundary-activation-model.md` |
| Prove your FFI boundary is sound | `rust-interop-testing-and-audit-discipline.md` |

---

## Cross-Lane Links

- **Foundations** (`../foundations/`) — ownership rules don't stop at the FFI boundary; they get harder. Ground yourself there first if ownership is shaky.
- **Error Patterns** (`../error-patterns/`) — error propagation across language boundaries is its own discipline. Check error-patterns when your FFI error story feels fragile.
- **Architecture** (`../architecture/`) — crate-level structure decisions (workspace layout, feature flags) directly shape how interop crates are organized.
- **Quality** (`../quality/`) — interop code needs stricter audit discipline than pure Rust. The testing/audit doc lives here, but quality standards come from the quality lane.

---

## Cleanup-Safe Rule

The donor family names behind this subtree are provenance identifiers.
They are not a promise that any specific reservoir filesystem path will continue to exist after cleanup or archival.
