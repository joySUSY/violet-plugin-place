# Rust Playbooks Index

## Purpose

Canonical entrypoint for migration, refactoring, anti-pattern recovery, and corrective strategy playbooks.

Use this category when the task is about:

- migrating code or architecture
- planning staged transitions
- fixing recurring failure classes
- refactoring with explicit guidance
- choosing a structured exit path from known anti-patterns
- preserving trust while changing system shape

This index is not only a file list.
It exists to route readers into the correct playbook based on the kind of transition or corrective pressure they need to make explicit.

## Source Provenance

- **Primary source:** current canonical playbooks subtree under `references/playbooks/`
- **Derived from:** migration, refactor, and anti-pattern doctrine passes
- **Upstream URL:** not applicable as a synthesized local navigation index
- **Freshness status:** canonical local index aligned to the current playbooks subtree

---

## Playbook Spine

The playbooks subtree now has a clear doctrinal spine:

1. **Migration and transition law**
   - `rust-migration-and-transition.md`
2. **Refactor workflow law**
   - `rust-refactor-toolkit.md`
3. **Anti-pattern detection and recovery law**
   - `rust-anti-pattern-detection-and-migration-ladders.md`
4. **Cross-lane doctrine links**
   - `../architecture/INDEX.md`
   - `../error-patterns/INDEX.md`
   - `../quality/INDEX.md`
   - `../governance/INDEX.md`

The doctrine is:

- playbook reasoning should move from transition intent → refactor or migration workflow → anti-pattern-specific recovery → cross-lane doctrine where needed
- not jump straight into scattered fixes without a transition model

---

## Documents and Their Roles

| File                                                   | Primary Role                                                                                   | Load When                                                                             |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `rust-migration-and-transition.md`                     | Root playbook doctrine for staged transitions, parity preservation, and migration risk control | the task is mainly about moving from one system state to another                      |
| `rust-refactor-toolkit.md`                             | Operational refactor workflow for improving structure without losing trust                     | the code basically works, but structure or boundaries need improvement                |
| `rust-anti-pattern-detection-and-migration-ladders.md` | Detect recurring Rust anti-patterns and choose structured migration ladders out of them        | the task starts from a smell or recurring bad pattern rather than a neutral migration |

---

## Reading Paths

### If you need the root transition model first

1. `rust-migration-and-transition.md`
2. then branch by the dominant corrective pressure

### If the task is a staged migration

1. `rust-migration-and-transition.md`
2. `rust-refactor-toolkit.md` if the transition also needs structural cleanup during the move
3. `../governance/INDEX.md` if replacement-grade or cleanup-safe claims now matter

### If the task is a refactor of already-working code

1. `rust-refactor-toolkit.md`
2. `rust-anti-pattern-detection-and-migration-ladders.md` if the refactor is triggered by a recurring smell
3. `../quality/INDEX.md` if the refactor needs proof, docs, or regression protection

### If the task starts from a known anti-pattern

1. `rust-anti-pattern-detection-and-migration-ladders.md`
2. `rust-refactor-toolkit.md`
3. route back to:
   - `../foundations/INDEX.md` if the smell is fundamentally about ownership or type modeling
   - `../error-patterns/INDEX.md` if the smell is about failure law or panic discipline
   - `../architecture/INDEX.md` if the smell is structural or boundary-related
   - `../async-concurrency/INDEX.md` if the smell is runtime coordination or lock/task design

### If the task is cross-language or boundary migration

1. `rust-migration-and-transition.md`
2. `../interop/INDEX.md`
3. `../quality/INDEX.md` or `../production/INDEX.md` depending on whether proof or release risk dominates

### If the task is cleanup-readiness after migration

1. `rust-migration-and-transition.md`
2. `../governance/INDEX.md`
3. `../repo-cases/INDEX.md` when donor-scale evidence or staged replacement is central

---

## Playbook Decision Questions

Before choosing a playbook subpage, ask:

1. Is the real pressure about **migration**, **refactor**, or **anti-pattern escape**?
2. Are we changing a stable system shape, or just repairing a local implementation habit?
3. Do we need a transition model first, or are we already sure the problem is an anti-pattern or refactor workflow?
4. Is the real risk semantic drift, architectural drift, operational risk, or proof deficit?

The doctrine is:

- playbooks are organized by corrective pressure and transition pressure
- not by whichever refactor technique happens to be top-of-mind

---

## Cross-Links

Playbook doctrine overlaps naturally with these lanes:

- **Architecture**
  - `../architecture/INDEX.md`
  - `../architecture/rust-architecture-and-scaffolding.md`
- **Error patterns**
  - `../error-patterns/INDEX.md`
  - `../error-patterns/rust-error-fix-strategies.md`
- **Quality**
  - `../quality/INDEX.md`
  - `../quality/rust-testing-patterns.md`
- **Interop**
  - `../interop/INDEX.md`
  - `../interop/rust-interop-testing-and-audit-discipline.md`
- **Governance**
  - `../governance/INDEX.md`
  - `../governance/source-reservoir-map.md`

The doctrine is:

- playbooks are where corrective intent becomes explicit process
- so they must remain connected to architecture, proof, interop, and governance rather than pretending repair work is isolated from the system's deeper truth

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

> “playbooks is where the migration and refactor notes live.”

The reusable lesson is:

> “the playbooks subtree is the canonical navigation layer for corrective Rust work—routing engineers from transition intent into the exact migration, refactor, or anti-pattern recovery doctrine they need before a change campaign hardens into more debt than it removes.”
