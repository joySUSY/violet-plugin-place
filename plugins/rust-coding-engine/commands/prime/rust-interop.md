---
description: Prime Rust interop before FFI, PyO3, NAPI-RS, Tauri, or WASM work
allowed-tools: Read, Grep, Glob, Bash(git:*)
---

# Prime Rust Interop

1. Read `references/interop/rust-ffi-and-interop-overview.md`.
2. Decide which interop lane the task belongs to:
   - C / C++ FFI
   - Python / PyO3 / Maturin
   - Node.js / NAPI-RS
   - WASM / wasm-bindgen / TS bridge
   - Tauri frontend/backend bridge
3. If the problem is deep boundary design, also read `references/interop/rust-ffi-mastery-c-cpp-deep-dive.md` or `references/interop/rust-pyo3-maturin-bindings.md` when appropriate.
4. State the interop lane, the primary safety contract, and the next exact reference to follow.
5. Do not start implementation until panic boundaries, ownership boundaries, and tooling boundaries are explicit.
