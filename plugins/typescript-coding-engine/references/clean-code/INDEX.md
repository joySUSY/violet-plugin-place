# TypeScript Clean Code and Quality Index

## Purpose

Canonical entrypoint for the clean-code lane inside `typescript-coding-engine`.

Use this category when the task is about:

- runtime validation
- toolchain posture
- quality gates and CI discipline
- testing strategy and type/runtime boundaries
- anti-pattern detection and migration guidance
- deciding where compile-time truth ends and runtime or review discipline must take over

This index is not only a file list.
It exists to route readers into the correct clean-code doctrine lane based on the kind of runtime, governance, or migration pressure they need to make explicit.

## Source Provenance

- **Primary source:** current `typescript-coding-engine` clean-code doctrine subtree
- **Derived from:** quality-gates, toolchain, runtime-validation, testing, and anti-pattern canonization work inside the heavy-engine shell
- **Upstream URL:** not applicable as a synthesized local navigation index
- **Freshness status:** canonical local index aligned to the current TypeScript clean-code lane

---

## Clean-Code Spine

The clean-code subtree now has a clear doctrinal spine:

1. **Quality-governance law**
   - `quality-gates-governance.md`
2. **Toolchain law**
   - `toolchain-posture.md`
3. **Runtime-boundary and validation law**
   - `typescript-runtime-validation-decision-matrix.md`
   - `runtime-boundaries.md`
4. **Testing and proof law**
   - `typescript-testing-strategy-and-type-boundaries.md`
5. **Migration and anti-pattern law**
   - `typescript-anti-patterns-and-migration-ladders.md`

The doctrine is:

- clean-code reasoning should move from quality governance → toolchain and boundary truth → testing and proof → migration ladders when debt already exists
- not jump straight into a local anti-pattern or test tweak before the quality model is clear

---

## Documents and Their Roles

| File                                                 | Primary Role                                                                                              | Load When                                                                              |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `quality-gates-governance.md`                        | Root doctrine for what must be true before TypeScript work is trusted, merged, or shipped                 | you need the quality model first                                                       |
| `toolchain-posture.md`                               | Doctrine for treating compiler, lint, formatter, tests, package manager, and CI as one coordinated system | the problem is toolchain coherence, reproducibility, or enforcement posture            |
| `typescript-runtime-validation-decision-matrix.md`   | Doctrine for deciding when runtime validation is required and where it belongs                            | the pressure is trust boundaries and runtime truth                                     |
| `runtime-boundaries.md`                              | Doctrine for what belongs at runtime edges versus in internal or compile-time surfaces                    | the task is about shell/runtime/boundary placement more than validation library choice |
| `typescript-testing-strategy-and-type-boundaries.md` | Doctrine for testing across type-level, runtime, environment, and contract boundaries                     | the pressure is proof rather than posture alone                                        |
| `typescript-anti-patterns-and-migration-ladders.md`  | Doctrine for staged recovery from recurring TypeScript design debt                                        | the codebase already drifted and needs repair guidance                                 |

---

## Reading Paths

### If you need the root quality model first

1. `quality-gates-governance.md`
2. `toolchain-posture.md`
3. then branch by the dominant clean-code pressure

### If the task is about runtime validation or trust boundaries

1. `typescript-runtime-validation-decision-matrix.md`
2. `runtime-boundaries.md`
3. `typescript-testing-strategy-and-type-boundaries.md` if the boundary must now be proven rather than only designed

### If the task is about tooling, CI, or reproducibility

1. `toolchain-posture.md`
2. `quality-gates-governance.md`
3. `typescript-testing-strategy-and-type-boundaries.md` if the real issue is which proofs must be enforced before merge or release

### If the task is about testing and confidence surfaces

1. `typescript-testing-strategy-and-type-boundaries.md`
2. `quality-gates-governance.md`
3. `typescript-runtime-validation-decision-matrix.md` if the weak point is really a trust-boundary gap rather than missing tests in general

### If the task is about anti-patterns or staged recovery

1. `typescript-anti-patterns-and-migration-ladders.md`
2. `quality-gates-governance.md`
3. `toolchain-posture.md`
4. return to runtime-validation or testing doctrine if the anti-pattern is really boundary- or proof-driven

### If the task is about compile-time truth leaking into runtime confusion

1. `../foundations/INDEX.md`
2. `typescript-runtime-validation-decision-matrix.md`
3. `runtime-boundaries.md`
4. treat foundations as the compile-time source of the problem and clean-code as the runtime/governance consequence layer

---

## Clean-Code Decision Questions

Before choosing a subpage, ask:

1. Is the real pressure about **quality gates**, **toolchain coherence**, **runtime validation**, **boundary placement**, **testing/proof**, or **anti-pattern recovery**?
2. Is this still a clean-code/runtime-governance question, or already a foundations, architecture, or interop question disguised as one?
3. Do we need the root quality-governance doctrine first, or are we already certain which specialized lane dominates?
4. Are we trying to establish trust, prove trust, or recover trust that has already drifted?

The doctrine is:

- clean-code docs are organized by runtime truth pressure, governance pressure, and recovery pressure
- not by whichever tool or migration trick is currently loudest

---

## Cross-Links

Clean-code doctrine overlaps naturally with these lanes:

- **Foundations**
  - `../foundations/INDEX.md`
  - `../foundations/strict-type-system-posture.md`
- **Architecture**
  - `../architecture/INDEX.md`
- **Interop**
  - `../interop/INDEX.md`
  - `../interop/rust-typescript-contract-boundaries.md`
- **Root references**
  - `../INDEX.md`

The doctrine is:

- clean-code is where TypeScript's runtime truth, governance, and migration discipline become explicit
- so it must remain connected to foundations, architecture, and interop rather than pretending quality work is separate from the system's deeper type and boundary truth

---

## Cleanup-Safe Rule

This index is canonical navigation.
It should point to:

- doctrine pages
- stable canonical category indexes
- governance-aware cross-links

It should **not** depend on cleanup-candidate donor reservoir paths as the main reading flow.

---

## Final Rule

The reusable lesson is not:

> “clean-code is where the TypeScript validation and tooling docs live.”

The reusable lesson is:

> “the clean-code subtree is the canonical navigation layer for runtime truth, quality governance, proof discipline, and staged recovery in TypeScript systems—routing engineers from root quality law into the exact toolchain, validation, testing, boundary, or migration doctrine they need before weak habits harden into architecture.”
