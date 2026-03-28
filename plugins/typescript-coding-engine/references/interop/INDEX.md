# TypeScript Interop Index

## Purpose

Canonical entrypoint for the interop lane inside `typescript-coding-engine`.

Use this category when the task is about:

- Rust↔TypeScript contracts
- Tauri, WASM, or hybrid-shell boundaries
- activation decisions at cross-language edges
- deciding what TypeScript owns on the consumer side of a generated or bridged contract
- keeping runtime validation, contract drift control, and consumer ergonomics aligned across boundaries

This index is not only a file list.
It exists to route readers into the correct interop doctrine lane based on the kind of cross-language or cross-runtime pressure they need to make explicit.

## Source Provenance

- **Primary source:** current `typescript-coding-engine` interop doctrine subtree
- **Derived from:** Rust/TypeScript bridge, Tauri boundary, and cross-language interop canonization work inside the heavy-engine shell
- **Upstream URL:** not applicable as a synthesized local navigation index
- **Freshness status:** canonical local index aligned to the current TypeScript interop lane

---

## Interop Spine

The interop subtree now has a clear doctrinal spine:

1. **Boundary activation law**
   - `boundary-activation-model.md`
2. **Rust/TS contract-consumption law**
   - `rust-typescript-contract-boundaries.md`
3. **Tauri frontend bridge law**
   - `tauri-frontend-rust-bridge.md`
4. **Cross-engine ownership links**
   - `../../rust-coding-engine/references/interop/INDEX.md`
   - `../clean-code/typescript-runtime-validation-decision-matrix.md`

The doctrine is:

- interop reasoning should move from boundary activation → structural ownership and contract truth → runtime or shell-specific bridge doctrine → cross-engine coordination
- not jump straight into consumer wrappers or local type duplicates before ownership is explicit

---

## Documents and Their Roles

| File                                     | Primary Role                                                                                    | Load When                                                                        |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `boundary-activation-model.md`           | Doctrine for deciding when and how TypeScript interop work should activate                      | the lane is still ambiguous or needs routing discipline                          |
| `rust-typescript-contract-boundaries.md` | Root TypeScript-side doctrine for consuming Rust-defined or Rust-generated structural contracts | the task is about contract ownership, drift control, or generated boundary truth |
| `tauri-frontend-rust-bridge.md`          | TypeScript-side doctrine for Tauri frontend↔Rust core IPC boundaries                            | the task is specifically about desktop shell / Tauri IPC behavior                |

---

## Reading Paths

### If you need the interop activation model first

1. `boundary-activation-model.md`
2. then branch by the dominant boundary pressure

### If the task is about Rust-generated or shared TS contracts

1. `rust-typescript-contract-boundaries.md`
2. `../clean-code/typescript-runtime-validation-decision-matrix.md` if the question becomes where trust must be re-established at runtime
3. `../../rust-coding-engine/references/interop/rust-typescript-bridge-patterns.md` if Rust-side ownership must be inspected directly

### If the task is about Tauri frontend/backend boundaries

1. `tauri-frontend-rust-bridge.md`
2. `boundary-activation-model.md`
3. `../../rust-coding-engine/references/interop/rust-tauri-core-shell-and-ipc-boundaries.md` if Rust-side ownership or IPC law becomes central

### If the task is about WASM or hybrid-shell expectations

1. `boundary-activation-model.md`
2. `rust-typescript-contract-boundaries.md`
3. route to Rust-side `wasm-bindgen` or hybrid-shell doctrine when the structural source of truth lives there

### If the task is about runtime validation across interop boundaries

1. `rust-typescript-contract-boundaries.md`
2. `../clean-code/typescript-runtime-validation-decision-matrix.md`
3. `tauri-frontend-rust-bridge.md` if the boundary is Tauri/IPC specific

---

## Interop Decision Questions

Before choosing an interop subpage, ask:

1. Is the real pressure about **activation/routing**, **contract ownership**, **generated artifacts**, **runtime validation**, or **Tauri/hybrid bridge behavior**?
2. Is this still a TypeScript-side interop question, or already a Rust-side ownership question that should escalate to `rust-coding-engine`?
3. Do we need activation doctrine first, or are we already certain which boundary family dominates?
4. Are we trying to consume truth, refine truth, validate truth, or coordinate across an IPC boundary?

The doctrine is:

- interop docs are organized by cross-language ownership pressure and runtime-boundary pressure
- not by whichever tool or bridge library is most visible first

---

## Cross-Links

Interop doctrine overlaps naturally with these lanes:

- **Rust-side interop doctrine**
  - `../../rust-coding-engine/references/interop/INDEX.md`
  - `../../rust-coding-engine/references/interop/rust-typescript-bridge-patterns.md`
  - `../../rust-coding-engine/references/interop/rust-tauri-core-shell-and-ipc-boundaries.md`
- **Clean code**
  - `../clean-code/INDEX.md`
  - `../clean-code/typescript-runtime-validation-decision-matrix.md`
- **Architecture**
  - `../architecture/INDEX.md`
- **Root references**
  - `../INDEX.md`

The doctrine is:

- interop is where TypeScript's consumer-side boundary truth becomes explicit
- so it must remain connected to Rust-side ownership, runtime validation, and architecture rather than pretending TypeScript can locally define all cross-language truth by itself

---

## Cleanup-Safe Rule

This index is canonical navigation.
It should point to:

- doctrine pages
- stable canonical category indexes
- cross-engine and governance-aware links

It should **not** treat cleanup-candidate donor reservoir filesystem paths as the canonical interop reading path.

---

## Final Rule

The reusable lesson is not:

> “interop is where the Rust↔TS and Tauri docs live.”

The reusable lesson is:

> “the interop subtree is the canonical navigation layer for TypeScript-side boundary truth—routing engineers from activation and ownership doctrine into the exact Rust-contract, runtime-validation, or Tauri-bridge guidance they need before cross-language assumptions harden into duplicated or drifting contracts.”
