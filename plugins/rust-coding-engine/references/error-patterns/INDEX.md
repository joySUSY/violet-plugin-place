# Rust Error Patterns Index

## Purpose

Canonical entrypoint for Rust fallibility doctrine, panic discipline, compiler-error recovery, secure disclosure, repair workflows, and interop-safe failure translation.

Use this category when the task is about:

- error typing and surface selection
- propagation strategy and context chains
- panic discipline
- compiler error recovery
- secure/user-safe/operator-useful error disclosure
- operational repair workflow after failure is already present
- interop-safe failure translation

This index is not only a file list.
It exists to route readers into the correct error doctrine lane based on the kind of failure or repair pressure they need to make explicit.

## Source Provenance

- **Primary source:** current canonical error subtree under `references/error-patterns/`
- **Derived from:** `rust-skills` error-rule families, `rust-error-handling-result-option-match-main`, and local doctrine extraction passes
- **Upstream URL:** not applicable as a synthesized local navigation index
- **Freshness status:** canonical local index aligned to the current Rust error subtree

---

## Error Spine

The error subtree now has a clear doctrinal spine:

1. **Root error law**
   - `rust-error-handling-patterns.md`
2. **Boundary-shape and type posture**
   - `result-option-match-posture.md`
   - `rust-error-pattern-catalog.md`
3. **Compiler recovery and live repair**
   - `rust-compiler-error-recovery-patterns.md`
   - `rust-error-fix-strategies.md`
4. **Narrative and proportionality reinforcement**
   - `handling-rust-errors-elegantly-doctrine.md`
5. **Security and disclosure discipline**
   - `rust-error-handling-security-checklist.md`
6. **Cross-lane links**
   - `../quality/INDEX.md`
   - `../interop/rust-ffi-and-interop-overview.md`
   - `../production/rust-production-patterns.md`

The doctrine is:

- error reasoning should move from root failure law → boundary/type posture → recovery and repair → disclosure and cross-lane consequences
- not jump straight into a local fix pattern before understanding what kind of failure surface is actually being designed

---

## Documents and Their Roles

| File                                         | Primary Role                                                            | Load When                                                     |
| -------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------- |
| `rust-error-handling-patterns.md`            | Root doctrine for selecting and shaping Rust error surfaces             | you need the error model first                                |
| `result-option-match-posture.md`             | Doctrine for `Result` / `Option` / `match` posture and boundary honesty | absence/fallibility/branching semantics dominate              |
| `rust-compiler-error-recovery-patterns.md`   | Requirement-grade compiler-error recovery families                      | borrow checker or compiler rejection is the dominant pressure |
| `rust-error-fix-strategies.md`               | Operational workflow for fixing errors proportionately                  | you already have a failure and need a repair workflow         |
| `rust-error-pattern-catalog.md`              | Catalog of common error families and repair patterns                    | you need a landscape view or classification surface           |
| `rust-error-handling-security-checklist.md`  | Secure disclosure, redaction, and operator-safe failure posture         | sensitive data or disclosure risk dominates                   |
| `handling-rust-errors-elegantly-doctrine.md` | Narrative reinforcement for proportionality and error-story quality     | you need judgment and style reinforcement, not only mechanics |

---

## Reading Paths

### If you need the root error model first

1. `rust-error-handling-patterns.md`
2. then branch by the dominant failure pressure

### If the task is about choosing error surface shape

1. `rust-error-handling-patterns.md`
2. `result-option-match-posture.md`
3. `rust-error-pattern-catalog.md`
4. `../interop/rust-ffi-and-interop-overview.md` if the boundary crosses runtimes

### If the task is about compiler rejection and borrow/lifetime recovery

1. `rust-error-handling-patterns.md`
2. `rust-compiler-error-recovery-patterns.md`
3. `rust-error-fix-strategies.md` when the recovery needs to become operational rather than purely conceptual

### If the task is about fixing an existing error now

1. `rust-error-fix-strategies.md`
2. `rust-error-handling-patterns.md`
3. `rust-compiler-error-recovery-patterns.md` if compiler errors are the real root cause
4. `../quality/INDEX.md` if the repair needs proof or regression protection

### If the task is about secure disclosure or failure messaging risk

1. `rust-error-handling-patterns.md`
2. `rust-error-handling-security-checklist.md`
3. `../production/rust-production-patterns.md` if the risk is now operational rather than local

### If the task is about interop-safe failure translation

1. `rust-error-handling-patterns.md`
2. `../interop/rust-ffi-and-interop-overview.md`
3. `../interop/rust-interop-testing-and-audit-discipline.md` if proof on the foreign side matters

### If the task is about learning proportional error design

1. `rust-error-handling-patterns.md`
2. `handling-rust-errors-elegantly-doctrine.md`
3. `result-option-match-posture.md`

---

## Error Decision Questions

Before choosing an error subpage, ask:

1. Is the real pressure about **surface selection**, **compiler rejection**, **live repair**, **secure disclosure**, or **interop translation**?
2. Is the problem still local to Rust, or already crossing into production or foreign-runtime consequences?
3. Do we need root error doctrine first, or are we already certain which specialized lane dominates?
4. Are we trying to design a truthful failure boundary, or to repair an already-visible error without teaching the codebase worse habits?

The doctrine is:

- error docs are organized by failure pressure and repair pressure
- not by whichever symptom is loudest first

---

## Cross-Links

Error doctrine overlaps naturally with these lanes:

- **Quality**
  - `../quality/INDEX.md`
  - `../quality/rust-testing-patterns.md`
- **Interop**
  - `../interop/rust-ffi-and-interop-overview.md`
  - `../interop/rust-interop-testing-and-audit-discipline.md`
- **Production**
  - `../production/INDEX.md`
  - `../production/rust-production-patterns.md`
- **Foundations**
  - `../foundations/INDEX.md`

The doctrine is:

- error handling is where failure truth becomes explicit
- so it must remain connected to proof, interop, production, and foundations rather than pretending it is only about return types in isolation

---

## Cleanup-Safe Rule

This index is canonical navigation.
It should point to:

- doctrine pages
- stable canonical category indexes
- governance-aware cross-links

It should **not** depend on donor reservoir paths or historical root-level filenames for its main reading flow.

---

## Final Rule

The reusable lesson is not:

> “error-patterns is where the Rust error docs live.”

The reusable lesson is:

> “the error-patterns subtree is the canonical navigation layer for failure truth in Rust systems—routing engineers from root error law into the exact surface-selection, compiler-recovery, repair, disclosure, or interop-safe doctrine they need before a failure boundary is treated as honest and trustworthy.”
