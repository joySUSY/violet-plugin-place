# Rust Reference Governance Index

## Purpose

Canonical entrypoint for governance documents that explain how the Rust reference system itself is maintained.

Use this category when the task is about:

- source reservoir boundaries
- donor-to-doctrine governance
- reference promotion rules
- replacement-grade canonization
- cleanup-safe navigation discipline
- provenance and freshness expectations
- cross-engine ownership boundaries for canonized donor families

This index is not only a file list.
It exists to route readers into the correct governance doctrine based on the kind of canonization or cleanup pressure they need to make explicit.

## Source Provenance

- **Primary source:** current canonical governance subtree under `references/governance/`
- **Derived from:** source-reservoir mapping, case-study governance, and reference-system governance work
- **Upstream URL:** not applicable as a synthesized local navigation index
- **Freshness status:** canonical local index aligned to the current governance subtree

---

## Governance Spine

The governance subtree now has a clear doctrinal spine:

1. **Source-reservoir governance**
   - `source-reservoir-map.md`
2. **Repo-case governance companion**
   - `../repo-cases/case-study-governance.md`
3. **Root navigation cross-link**
   - `../INDEX.md`

The doctrine is:
- governance reasoning should move from donor-family classification → canonical landing zones → replacement-grade and cleanup-safe consequences
- not jump straight into deletion, archival, or promotion judgments without making donor ownership explicit first

---

## Documents and Their Roles

| File | Primary Role | Load When |
| --- | --- | --- |
| `source-reservoir-map.md` | Root governance doctrine for donor-family classification, canonical landing zones, runtime implications, and replacement-grade / cleanup-safe promotion law | you need the governance model first |
| `../repo-cases/case-study-governance.md` | Repo-scale donor governance for case-study extraction, freshness qualification, and cleanup-readiness discipline | repo donors or large case-study reservoirs are central |

---

## Reading Paths

### If you need the root governance model first

1. `source-reservoir-map.md`
2. then branch by donor or cleanup pressure

### If the task is about donor-family ownership

1. `source-reservoir-map.md`
2. `../INDEX.md` to return to the owning doctrine lane once ownership is clear

### If the task is about repo-scale donor readiness

1. `source-reservoir-map.md`
2. `../repo-cases/case-study-governance.md`
3. route back into:
   - `../architecture/INDEX.md` when the lesson is structural
   - `../interop/INDEX.md` when the lesson is boundary-driven
   - `../production/INDEX.md` when the lesson is operational
   - `../quality/INDEX.md` when the lesson is testing/docs/lint oriented

### If the task is about replacement-grade or cleanup-safe judgment

1. `source-reservoir-map.md`
2. `../repo-cases/case-study-governance.md` if repo donors are involved
3. `../INDEX.md` to verify the destination doctrine is now strong enough to stand without donor browsing

### If the task is about cross-engine ownership on interop-heavy donors

1. `source-reservoir-map.md`
2. `../interop/INDEX.md`
3. route to the Rust-side or foreign-engine-side doctrine only after ownership is explicit

---

## Governance Decision Questions

Before choosing a governance subpage, ask:

1. Is the real pressure about **donor classification**, **landing-zone selection**, **replacement-grade promotion**, **cleanup readiness**, or **cross-engine ownership**?
2. Is the task about a small doctrinal donor, or a repo-scale reservoir that needs case-study governance?
3. Are we deciding where knowledge belongs, or whether existing doctrine is strong enough to survive cleanup?
4. Do we need the root governance doctrine first, or are we already certain the question is repo-case-specific?

The doctrine is:
- governance docs are organized by canonization pressure and cleanup pressure
- not by whichever donor family is loudest in the moment

---

## Cross-Links

Governance doctrine overlaps naturally with these lanes:

- **Repo cases**
  - `../repo-cases/INDEX.md`
  - `../repo-cases/case-study-governance.md`
- **Root references**
  - `../INDEX.md`
- **Interop**
  - `../interop/INDEX.md`
- **Production**
  - `../production/INDEX.md`
- **Architecture**
  - `../architecture/INDEX.md`

The doctrine is:
- governance is where donor truth becomes canonization truth
- so it must remain connected to the doctrine lanes that actually absorb the lessons rather than becoming a detached metadata bucket

---

## Cleanup-Safe Rule

Governance docs are meta-layer docs, not first-line problem-solving docs.

They should point to:

- donor-family identifiers
- canonical doctrine destinations
- provenance and freshness expectations
- cleanup-safe routing logic

They should **not** depend on cleanup-candidate reservoir filesystem paths as the main reading flow for normal doctrine consumption.

---

## Final Rule

The reusable lesson is not:
> “governance is where the donor map lives.”

The reusable lesson is:
> “the governance subtree is the canonical navigation layer for deciding how donor knowledge becomes stable doctrine—routing engineers from donor-family classification into landing-zone selection, repo-case governance, and replacement-grade / cleanup-safe judgment before the engine claims it can stand without the reservoir.”
