# TypeScript Coding Engine References Index

## Purpose

Canonical navigation entrypoint for the `typescript-coding-engine/references` doctrine tree.

This index exists so the TypeScript engine can be read by doctrinal responsibility rather than by donor memory, isolated subtree browsing, or scattered type-system folklore.

Use this index first when the task is about:

- core TypeScript foundations and strictness posture
- advanced types, narrowing, branding, and inference
- runtime validation and clean-code governance
- TypeScript architecture decisions
- Rust/TypeScript or Tauri-style interop boundaries
- choosing whether the pressure is fundamentally type-system, runtime, tooling, architecture, or interop-driven

This page exists to answer a routing question:

> given a real TypeScript task, which doctrinal lane should be loaded first, which supporting lanes usually follow, and how do the engine's foundations, advanced typing, clean-code/runtime, architecture, and interop layers fit together as one system?

## Source Provenance

- **Primary source:** current canonical `typescript-coding-engine/references/` tree
- **Derived from:** TypeScript donor intake and plugin-first heavy-engine canonization work
- **Upstream URL:** not applicable as a synthesized local navigation index
- **Freshness status:** canonical local index aligned to the current TypeScript doctrine tree

---

## Taxonomy

| Category | Purpose | Load When |
| --- | --- | --- |
| `foundations/` | strict type-system posture, type-error diagnosis, inference fundamentals | you need the TypeScript mental model or first-line correctness posture |
| `advanced/` | narrowing, branding, inference cookbooks, type-level patterns | the task goes beyond baseline strictness into expressive typing pressure |
| `clean-code/` | runtime validation, quality gates, toolchain posture, anti-patterns, testing boundaries | the pressure is about runtime truth, discipline, or maintainable TS engineering |
| `architecture/` | design-decision trees and architectural shape selection | module/state/runtime shape is the real design question |
| `interop/` | Rust/TypeScript, Tauri, WASM, and boundary activation guidance | the task crosses language/runtime boundaries |
| top-level governance docs | donor source mapping and engine-level reading posture | provenance, donor ownership, and cleanup-safe reading matter |

---

## Reference Spines

The TypeScript reference tree is not just a set of categories.
It now has several clear doctrinal spines.

### 1. Foundations spine

Use this spine when you need the strict TypeScript baseline before solving a concrete advanced or architectural problem.

- `foundations/INDEX.md`
- `foundations/strict-type-system-posture.md`
- `foundations/typescript-type-error-diagnosis-and-recovery.md`

This spine answers:
- how TypeScript should be configured to tell the truth
- how type errors should be interpreted and repaired
- how strictness and inference shape the baseline mental model

### 2. Advanced type-system spine

Use this spine when the task is about expressive typing rather than basic correctness.

- `advanced/INDEX.md`
- `advanced/type-level-programming-patterns.md`
- `advanced/typescript-narrowing-branding-and-inference-cookbook.md`

This spine answers:
- how to preserve narrowing and branding truth
- when type-level programming is justified
- how advanced typing should remain practical rather than performative

### 3. Clean-code and runtime spine

Use this spine when runtime truth, validation, testing, toolchain, or anti-pattern discipline dominate.

- `clean-code/INDEX.md`
- `clean-code/typescript-runtime-validation-decision-matrix.md`
- `clean-code/quality-gates-governance.md`
- `clean-code/toolchain-posture.md`
- `clean-code/typescript-testing-strategy-and-type-boundaries.md`
- `clean-code/typescript-anti-patterns-and-migration-ladders.md`

This spine answers:
- how TypeScript code proves both type truth and runtime truth
- how toolchain posture and quality gates shape trust
- how to exit recurring TypeScript anti-patterns systematically

### 4. Architecture spine

Use this spine when system shape, module boundaries, or state/runtime architecture dominate.

- `architecture/INDEX.md`
- `architecture/typescript-architecture-decision-trees.md`

This spine answers:
- how architecture choices should follow pressure rather than framework fandom
- how TypeScript systems scale in module and runtime shape

### 5. Interop spine

Use this spine when TypeScript is consuming or negotiating a cross-language/runtime boundary.

- `interop/INDEX.md`
- `interop/boundary-activation-model.md`
- `interop/rust-typescript-contract-boundaries.md`
- `interop/tauri-frontend-rust-bridge.md`

This spine answers:
- when TypeScript owns consumer ergonomics vs structural truth
- how Rust/TS contract boundaries should stay stable
- how Tauri and adjacent hybrid boundaries should be reasoned about

---

## Recommended Reading Paths

### If you are starting from the TypeScript engine root

1. `source-reservoir-map.md`
2. `foundations/INDEX.md`
3. then branch by the actual pressure of the task

### If the task is about core TypeScript correctness

1. `foundations/INDEX.md`
2. `foundations/strict-type-system-posture.md`
3. `foundations/typescript-type-error-diagnosis-and-recovery.md`

### If the task is about advanced typing or inference

1. `advanced/INDEX.md`
2. `advanced/typescript-narrowing-branding-and-inference-cookbook.md`
3. `advanced/type-level-programming-patterns.md`
4. return to foundations if the “advanced” issue is really a weak baseline strictness posture

### If the task is about runtime validation, tooling, or clean-code discipline

1. `clean-code/INDEX.md`
2. `clean-code/typescript-runtime-validation-decision-matrix.md`
3. `clean-code/quality-gates-governance.md`
4. `clean-code/toolchain-posture.md`
5. branch into testing or anti-pattern recovery if needed

### If the task is about architecture decisions

1. `architecture/INDEX.md`
2. `architecture/typescript-architecture-decision-trees.md`
3. return to clean-code or foundations if the real issue is runtime truth or strictness rather than shape

### If the task is about interop or cross-language boundaries

1. `interop/INDEX.md`
2. `interop/boundary-activation-model.md`
3. `interop/rust-typescript-contract-boundaries.md`
4. `interop/tauri-frontend-rust-bridge.md` when desktop shell or Tauri IPC dominates

---

## Root Navigation Questions

Before diving into a subpage, ask:

1. Is this primarily a **foundations** question, an **advanced type-system** question, a **clean-code/runtime** question, an **architecture** question, or an **interop** question?
2. Is the real pressure about **type truth**, **runtime truth**, **module/system shape**, **toolchain discipline**, or **cross-language boundaries**?
3. Do I need the root lane doctrine first, or am I already certain which specialized page owns the problem?
4. Is this still local to TypeScript, or is it already crossing into Rust, Tauri, or other engine boundaries?

The doctrine is:
- the root index routes by problem pressure
- not by whichever TypeScript trick or framework name feels familiar first

---

## Cross-Lane Rules

### Foundations before type cleverness
If the problem smells like weak strictness, weak inference, or recurring basic type errors, start in `foundations/` before loading advanced doctrine.

### Runtime truth before type theater
If the system still needs runtime validation, testing strategy, or quality gates, start in `clean-code/` before celebrating complex type-level tricks.

### Architecture before framework hype
If the task is about system shape, module boundaries, or state/runtime architecture, start in `architecture/` before letting framework preferences dominate.

### Interop before contract improvisation
If the task crosses Rust, Tauri, WASM, or contract-generation boundaries, load `interop/` before inventing local wrappers or duplicate models.

---

## Rule

The categorized tree is canonical.
Donor repositories remain evidence reservoirs, but they are not the preferred first reading surface.

Canonical navigation should point to:
- doctrine pages
- stable subtree indexes
- governance-aware cross-links

It should **not** depend on cleanup-candidate donor reservoir filesystem paths for its main reading flow.

---

## Final Rule

The reusable lesson is not:
> “the TypeScript engine has several reference folders.”

The reusable lesson is:
> “the `typescript-coding-engine` reference tree is a governed doctrinal system: use the root index to classify the dominant type, runtime, architecture, or interop pressure, route into the correct spine, and only then dive into specialized doctrine—so the engine behaves like a coherent TypeScript knowledge system rather than a bundle of advanced type notes.”
