# TypeScript Architecture Index

## Purpose

Canonical entrypoint for the architecture lane inside `typescript-coding-engine`.

Use this category when the task is about:

- architectural decision trees
- module or state pattern selection
- higher-level TypeScript system design choices
- deciding how a TypeScript system should scale in structure and runtime shape
- choosing the right amount of architecture for the real pressure, not the most fashionable pattern

This index is not only a file list.
It exists to route readers into the correct architecture doctrine lane based on the kind of structural pressure they need to resolve.

## Source Provenance

- **Primary source:** current `typescript-coding-engine` architecture doctrine subtree
- **Derived from:** TypeScript architecture, state-pattern, and design-decision canonization work inside the heavy-engine shell
- **Upstream URL:** not applicable as a synthesized local navigation index
- **Freshness status:** canonical local index aligned to the current TypeScript architecture lane

---

## Architecture Spine

The architecture subtree now has a clear doctrinal spine:

1. **Architecture decision law**
   - `typescript-architecture-decision-trees.md`
2. **Cross-lane architecture consequences**
   - `../clean-code/INDEX.md`
   - `../foundations/INDEX.md`
   - `../interop/INDEX.md`

The doctrine is:

- architecture reasoning should move from system-shape selection → clean-code/runtime consequences → interop or foundational consequences where relevant
- not jump straight into framework or state-library preference before structural pressure is explicit

---

## Documents and Their Roles

| File                                                              | Primary Role                                                                                                        | Load When                                                               |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `typescript-architecture-decision-trees.md`                       | Root doctrine for architecture-first decision frameworks, project shape, state blast radius, and complexity ladders | you need the architecture model first                                   |
| `../clean-code/typescript-anti-patterns-and-migration-ladders.md` | Recovery doctrine when architecture drift or structural debt is already visible                                     | the architecture problem is already corrective rather than greenfield   |
| `../clean-code/toolchain-posture.md`                              | Toolchain consequence doctrine when structural choices affect reproducibility and CI coherence                      | the architecture choice is really a toolchain- or workflow-shape choice |
| `../clean-code/typescript-runtime-validation-decision-matrix.md`  | Runtime-boundary doctrine when architecture pressure is really trust-boundary pressure                              | the system shape is driven by validation and runtime truth              |

---

## Reading Paths

### If you need the architecture model first

1. `typescript-architecture-decision-trees.md`
2. then branch by the dominant structural pressure

### If the task is about project or module shape

1. `typescript-architecture-decision-trees.md`
2. `../foundations/INDEX.md` if the “architecture” problem is really weak type-baseline modeling
3. `../clean-code/INDEX.md` if runtime truth or governance pressure is actually driving the structure

### If the task is about state architecture or blast radius

1. `typescript-architecture-decision-trees.md`
2. `../clean-code/typescript-runtime-validation-decision-matrix.md` if the state problem is really about trust boundaries
3. `../interop/INDEX.md` if state crosses Rust/Tauri/IPC boundaries

### If the task is about correcting architecture drift

1. `../clean-code/typescript-anti-patterns-and-migration-ladders.md`
2. `typescript-architecture-decision-trees.md`
3. `../clean-code/toolchain-posture.md` if the drift is coupled to monorepo or CI/tooling structure

### If the task is about interop-heavy architecture

1. `typescript-architecture-decision-trees.md`
2. `../interop/INDEX.md`
3. then return to architecture once the contract or shell ownership is explicit

---

## Architecture Decision Questions

Before choosing an architecture subpage, ask:

1. Is the real pressure about **project shape**, **state blast radius**, **trust boundaries**, **public contract shape**, or **runtime/platform constraints**?
2. Is this still a TypeScript architecture question, or already a clean-code/runtime or interop question disguised as one?
3. Do we need the root architecture doctrine first, or are we already certain the issue is really migration, runtime validation, or interop?
4. Are we trying to design a proportional system shape, or to repair one that already drifted?

The doctrine is:

- architecture docs are organized by structural pressure
- not by cargo-cult patterns or whichever framework family is loudest first

---

## Cross-Links

Architecture doctrine overlaps naturally with these lanes:

- **Foundations**
  - `../foundations/INDEX.md`
- **Clean code**
  - `../clean-code/INDEX.md`
  - `../clean-code/toolchain-posture.md`
- **Interop**
  - `../interop/INDEX.md`
- **Root references**
  - `../INDEX.md`

The doctrine is:

- architecture is where TypeScript system shape becomes explicit
- so it must remain connected to foundations, runtime governance, and interop rather than pretending structure can be chosen without boundary and trust consequences

---

## Cleanup-Safe Rule

This index is canonical navigation.
It should point to:

- doctrine pages
- stable canonical category indexes
- governance-aware cross-links

It should **not** depend on cleanup-candidate donor reservoir paths as its main reading flow.

---

## Final Rule

The reusable lesson is not:

> “architecture is where the TypeScript design docs live.”

The reusable lesson is:

> “the architecture subtree is the canonical navigation layer for TypeScript system shape—routing engineers from architecture decision law into the exact foundations, clean-code, or interop doctrine they need before structural choices harden into runtime and maintenance consequences.”
