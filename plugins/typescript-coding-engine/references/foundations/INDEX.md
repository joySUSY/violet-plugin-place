# TypeScript Foundations Index

## Purpose

Canonical entrypoint for the foundations lane inside `typescript-coding-engine`.

Use this category when the task is about:

- strictness posture
- inference fundamentals
- widening and narrowing baselines
- first-line TypeScript correctness
- understanding what the type system is really allowed to claim
- diagnosing foundational type drift before it spreads into runtime or architecture debt

This index is not only a file list.
It exists to route readers into the correct foundations doctrine lane based on the kind of type-baseline pressure they need to make explicit.

## Source Provenance

- **Primary source:** current `typescript-coding-engine` foundations doctrine subtree
- **Derived from:** strict type-system, inference, and foundational TypeScript canonization work inside the heavy-engine shell
- **Upstream URL:** not applicable as a synthesized local navigation index
- **Freshness status:** canonical local index aligned to the current TypeScript foundations lane

---

## Foundations Spine

The foundations subtree now has a clear doctrinal spine:

1. **Strictness and compiler-truth law**
   - `strict-type-system-posture.md`
2. **Type-error diagnosis and recovery law**
   - `typescript-type-error-diagnosis-and-recovery.md`
3. **Cross-lane links**
   - `../advanced/INDEX.md`
   - `../clean-code/INDEX.md`
   - `../architecture/INDEX.md`

The doctrine is:

- foundations reasoning should move from strict compiler posture → diagnosis and recovery → escalation into advanced typing or runtime/architecture lanes only when needed
- not jump straight into advanced type tricks before the baseline truth posture is stable

---

## Documents and Their Roles

| File                                              | Primary Role                                                                                         | Load When                                                              |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `strict-type-system-posture.md`                   | Root doctrine for compiler truth, strictness, literal precision, and foundational TypeScript posture | you need the foundational type model first                             |
| `typescript-type-error-diagnosis-and-recovery.md` | Diagnostic doctrine for classifying and recovering from TypeScript type errors honestly              | the baseline is known, but the current problem is diagnosis and repair |

---

## Reading Paths

### If you need the foundational type model first

1. `strict-type-system-posture.md`
2. `typescript-type-error-diagnosis-and-recovery.md`
3. then branch by the dominant pressure

### If the task is about compiler strictness or tsconfig posture

1. `strict-type-system-posture.md`
2. `../clean-code/toolchain-posture.md` if the issue is really project-wide toolchain governance rather than foundational strictness alone

### If the task is about type errors and recovery

1. `typescript-type-error-diagnosis-and-recovery.md`
2. `strict-type-system-posture.md`
3. `../advanced/INDEX.md` only if the root issue is genuinely advanced narrowing, branding, or type-level composition

### If the task is about inference, narrowing, or precision loss

1. `strict-type-system-posture.md`
2. `typescript-type-error-diagnosis-and-recovery.md`
3. `../advanced/INDEX.md` when the issue has clearly crossed from baseline truth into advanced type-system pressure

### If the task is about runtime safety that starts from weak type truth

1. `strict-type-system-posture.md`
2. `../clean-code/INDEX.md`
3. treat foundations as the root cause and clean-code as the runtime consequence layer

---

## Foundations Decision Questions

Before choosing a subpage, ask:

1. Is the real pressure about **strictness posture**, **type-error diagnosis**, **inference precision**, or **baseline type truth**?
2. Is this still a foundational TypeScript question, or already an advanced, runtime-validation, or architecture question disguised as one?
3. Do we need the root strictness doctrine first, or are we already certain the issue is a concrete diagnosis/recovery problem?
4. Are we trying to strengthen the baseline, or to repair a symptom caused by a weak baseline?

The doctrine is:

- foundations docs are organized by baseline truth pressure and recovery pressure
- not by whichever compiler error code or syntax construct appears first

---

## Cross-Links

Foundations doctrine overlaps naturally with these lanes:

- **Advanced**
  - `../advanced/INDEX.md`
- **Clean code**
  - `../clean-code/INDEX.md`
  - `../clean-code/toolchain-posture.md`
- **Architecture**
  - `../architecture/INDEX.md`
- **Root references**
  - `../INDEX.md`

The doctrine is:

- foundations is where TypeScript truth becomes explicit at the compiler boundary
- so it must remain connected to advanced typing, runtime/toolchain governance, and architecture rather than pretending foundational correctness is separate from the rest of the system

---

## Cleanup-Safe Rule

This index is canonical navigation.
It should point to:

- doctrine pages
- stable canonical category indexes
- governance-aware cross-links

It should **not** depend on cleanup-candidate donor reservoir filesystem paths as its main reading flow.

---

## Final Rule

The reusable lesson is not:

> “foundations is where the strict TypeScript docs live.”

The reusable lesson is:

> “the foundations subtree is the canonical navigation layer for baseline TypeScript truth—routing engineers from strictness posture into the exact diagnosis, inference, or downstream runtime/advanced doctrine they need before weak type habits harden into system debt.”
