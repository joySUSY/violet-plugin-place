---
name: interop
description: Use when the task involves Rust FFI, PyO3, Maturin, NAPI-RS, ts-rs, tsify, wasm-bindgen, or Tauri frontend/backend bridging.
---

# Rust Interop

## Steps

1. Read `../../references/interop/INDEX.md`.
2. Read `../../references/interop/rust-ffi-and-interop-overview.md`.
3. Branch by lane: C/C++ -> `rust-ffi-mastery-c-cpp-deep-dive.md`; Python -> `rust-pyo3-maturin-bindings.md`; Node -> `rust-node-native-addon-posture.md`; Rust-TS/WASM -> `rust-typescript-bridge-patterns.md` + `wasm-bindgen-posture.md`; Tauri -> `rust-tauri-core-shell-and-ipc-boundaries.md`.
4. If the activation path itself is unclear, read `../../references/interop/boundary-activation-model.md`.
5. Explicitly identify the interop lane before implementation.
6. Name panic boundary, ownership boundary, and toolchain boundary.

## Core Rule

Interop is a boundary discipline problem first, not a binding syntax problem first.
