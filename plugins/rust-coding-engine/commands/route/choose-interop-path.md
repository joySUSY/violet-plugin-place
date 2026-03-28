---
description: Choose the correct Rust interop path before designing bindings or bridges
allowed-tools: Read, Grep, Glob, Bash(git:*)
---

# Choose Interop Path

Use the Rust interop doctrine to classify the current integration task.

1. Read `references/interop/INDEX.md`.
2. Read `references/interop/rust-ffi-and-interop-overview.md`.

Primary routes:
- `bindgen` / manual `extern "C"` for C intake
- `cbindgen` for Rust-to-C export
- `cxx` for Rust/C++ bridge
- `PyO3 + Maturin` for Python bindings
- `NAPI-RS` for Node.js native addons
- `wasm-bindgen` / `tsify` / `ts-rs` for WASM and TS bridges
- Tauri bridge patterns for frontend/backend integration

Return:
1. primary interop route
2. safety contract to enforce first
3. tooling boundary to respect
4. next exact file to read
