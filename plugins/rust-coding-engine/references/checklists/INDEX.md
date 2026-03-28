# Rust Checklists Index

## Purpose

Canonical entrypoint for audit, readiness, and quick-reference checklist surfaces inside `rust-coding-engine`.

Use this category when you need:

- a compact operational checklist before claiming work complete
- an expanded audit map for deeper review coverage
- a fast route from “I need to verify this Rust work” into the current doctrine tree
- a bridge from high-level doctrine into concrete review questions

This index is not only a file list.
It exists to route readers into the correct checklist surface based on the kind of verification pressure they need to make explicit.

## Source Provenance

- **Primary source:** current canonical checklist subtree under `references/checklists/`
- **Derived from:** the Rust rule-family audit surface and operational checklist canonization work
- **Upstream URL:** not applicable as a synthesized local navigation index
- **Freshness status:** canonical local index aligned to the current checklist subtree

---

## Checklist Spine

The checklist subtree now has a clear doctrinal spine:

1. **Compact execution gate**
   - `rust-engine-checklist.md`
2. **Expanded audit map**
   - `rust-engine-checklist-expanded.md`
3. **Cross-lane doctrine routes**
   - `../quality/INDEX.md`
   - `../production/INDEX.md`
   - `../interop/INDEX.md`
   - `../architecture/INDEX.md`

The doctrine is:
- checklist reasoning should move from compact operational gate → expanded family audit → lane-specific doctrine only where uncertainty remains
- not jump straight into giant doctrine trees when a bounded verification pass is enough

---

## Documents and Their Roles

| File | Primary Role | Load When |
| --- | --- | --- |
| `rust-engine-checklist.md` | Compact operational checklist for completion, review, merge, or release-readiness gates | you need a fast but serious verification pass |
| `rust-engine-checklist-expanded.md` | Expanded audit map organized by rule families and canonical doctrine entrypoints | you need broader review coverage, architecture-grade audit, or family-by-family routing |

---

## Reading Paths

### If you need a compact “ready to claim done” pass

1. `rust-engine-checklist.md`
2. follow linked doctrine only for items that are genuinely uncertain

### If you need broader audit coverage

1. `rust-engine-checklist-expanded.md`
2. open the canonical doctrine entrypoint for the relevant family
3. open the matching `rules/*/INDEX.md` only if narrower enforcement detail is still needed

### If the task is a code-review or merge gate

1. `rust-engine-checklist.md`
2. `rust-engine-checklist-expanded.md` if the change is cross-cutting or high risk
3. branch into:
   - `../quality/INDEX.md` when proof or docs are weak
   - `../error-patterns/INDEX.md` when failure posture is weak
   - `../interop/INDEX.md` when foreign-runtime boundaries are involved
   - `../production/INDEX.md` when operational or release consequences dominate

### If the task is architecture or system-shape audit

1. `rust-engine-checklist-expanded.md`
2. `../architecture/INDEX.md`
3. `../repo-cases/INDEX.md` when donor-scale structural evidence matters

### If the task is release or operational readiness

1. `rust-engine-checklist.md`
2. `../production/INDEX.md`
3. `rust-engine-checklist-expanded.md` if the release graph or trust boundaries need broader coverage

---

## Checklist Decision Questions

Before choosing a checklist surface, ask:

1. Do I need a **compact gate** or an **expanded audit map**?
2. Is the real pressure about **completion confidence**, **family-by-family audit coverage**, or **cross-lane uncertainty**?
3. Am I verifying a local Rust boundary, or something that already crosses into interop, production, or architecture concerns?
4. Do I need doctrine now, or only if a checklist item becomes uncertain?

The doctrine is:
- checklists are organized by verification pressure and audit scope
- not by who happens to be asking for a review

---

## Cross-Links

Checklist doctrine overlaps naturally with these lanes:

- **Quality**
  - `../quality/INDEX.md`
  - `../quality/rust-testing-patterns.md`
- **Production**
  - `../production/INDEX.md`
  - `../production/rust-production-patterns.md`
- **Interop**
  - `../interop/INDEX.md`
  - `../interop/rust-interop-testing-and-audit-discipline.md`
- **Architecture**
  - `../architecture/INDEX.md`
- **Governance**
  - `../governance/source-reservoir-map.md`

The doctrine is:
- checklists summarize doctrine and route into it
- they do not replace doctrine
- their value is operational speed plus consistency, not doctrinal shallowness

---

## Cleanup-Safe Rule

This index is canonical navigation.
It should point to:

- checklist doctrine pages
- stable canonical category indexes
- governance-aware cross-links

It should **not** depend on donor reservoir paths or historical root-level filenames for its main reading flow.

---

## Final Rule

The reusable lesson is not:
> “checklists is where the Rust review checklists live.”

The reusable lesson is:
> “the checklists subtree is the canonical navigation layer for fast, governed Rust verification—routing engineers from compact completion gates into expanded family audits and then into the exact doctrine lane needed, so operational review becomes faster without becoming shallow.”
