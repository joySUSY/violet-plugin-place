---
description: Choose the correct TypeScript state or structure pattern before architecture or state work
allowed-tools: Read, Grep, Glob, Bash(git:*)
---

# Choose State Pattern

Use the TypeScript engine shell to select the correct state or architecture pattern before implementing.

## Reading Path

1. Read `references/architecture/INDEX.md`.
2. Read `references/architecture/typescript-architecture-decision-trees.md`.
3. If validation, trust-boundary, or migration debt is central, also read:
   - `references/clean-code/typescript-runtime-validation-decision-matrix.md`
   - `references/clean-code/typescript-anti-patterns-and-migration-ladders.md`
4. If the structure affects testing or toolchain posture, also read:
   - `references/clean-code/typescript-testing-strategy-and-type-boundaries.md`
   - `references/clean-code/toolchain-posture.md`
5. If interop or IPC contract ownership is part of the decision, also read `references/interop/INDEX.md`.

## Pressure Classification

Classify the architecture or state pressure before choosing a pattern:

- **State blast radius** — how many components or layers are affected by this state?
- **Trust boundary** — does the state cross runtime or external boundaries?
- **Contract shape** — is the state really a shared contract or a local concern?
- **Migration or debt** — is the current state pattern already causing structural debt?
- **Interop shape** — does state cross Rust, Tauri, IPC, or WASM boundaries?

## Choose One Primary Path

| Pattern                                   | Use When                                                                |
| ----------------------------------------- | ----------------------------------------------------------------------- |
| Local state                               | Isolated to one component or module, no shared blast radius             |
| Subtree or feature-scoped state           | Shared within a feature or subtree, not globally needed                 |
| Global state or explicit store            | App-wide coordination where prop-threading becomes untenable            |
| Schema-driven state boundary              | State must be validated, versioned, or explicitly typed at a boundary   |
| Type-level state machine or branded-state | Impossible states must be structurally prevented, not caught at runtime |

## Return

1. Chosen state pattern with one-line rationale
2. Why it fits the dominant pressure
3. Main boundary pressure class (state blast radius, trust, contract, migration, or interop)
4. One trade-off to watch
5. Next exact file to read before writing code

## Core Rule

State decisions are architecture decisions.
Do not pick a state solution before knowing the blast radius, trust level, and contract shape.
Use the smallest state model that preserves clarity—then escalate only when the real pressure demands it.
