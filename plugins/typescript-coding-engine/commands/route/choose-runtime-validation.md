---
description: Choose the correct TypeScript runtime-validation path before implementation
allowed-tools: Read, Grep, Glob, Bash(git:*)
---

# Choose Runtime Validation

Use the TypeScript engine shell to select the correct runtime-validation path before implementing.

## Reading Path

1. Read `references/clean-code/INDEX.md`.
2. Read `references/clean-code/typescript-runtime-validation-decision-matrix.md`.
3. Read `references/clean-code/runtime-boundaries.md`.
4. If the boundary affects system shape or shell placement, also read `references/architecture/INDEX.md` and `references/architecture/typescript-architecture-decision-trees.md`.
5. If the boundary is Rust/Tauri/WASM-facing, also read `references/interop/INDEX.md` and `references/interop/boundary-activation-model.md`.

## Pressure Classification

Classify the boundary before choosing a posture:

- **API or webhook input** — runtime validation almost always required
- **Form or user input** — runtime validation required
- **Config or env loading** — runtime validation strongly recommended
- **Storage or rehydration** — runtime validation usually required
- **IPC or cross-language payload** — trust depends on boundary strength
- **Generated contract with single-source ownership** — lighter runtime checks may be justified internally

## Choose One Primary Posture

| Posture                       | Use When                                                                      |
| ----------------------------- | ----------------------------------------------------------------------------- |
| Compile-time types sufficient | Fully internal trusted flow with no external trust boundary                   |
| Boundary validation needed    | User, API, form, config, storage, or IPC data enters the system               |
| Strict schema-driven workflow | High-risk external data, versioning risk, or complex error-shape requirements |
| Serialization or IPC contract | Generated artifacts, contract drift risk, or multi-runtime payloads           |

## Return

1. Primary validation posture with one-line rationale
2. Why the boundary warrants this posture
3. Whether the issue is architectural, operational, or interop-boundary driven
4. What anti-pattern to avoid at this boundary
5. Next exact file to read before writing code

## Core Rule

Validate where trust changes.
Do not validate indiscriminately.
Do not skip validation at real trust boundaries because compile-time types feel safe.
