# Rust Ecosystem Index

## Purpose

Canonical entrypoint for Rust ecosystem navigation, crate selection doctrine, and domain-specific Rust resource routing.

Use this category when the task is about:

- crate discovery
- dependency selection
- docs.rs and ecosystem navigation
- feature and dependency due diligence
- domain-specific Rust stack pressure
- deciding whether a crate choice is architectural, operational, or merely fashionable

This index is not only a file list.
It exists to route readers into the correct ecosystem doctrine lane based on the kind of selection pressure they need to make explicit.

## Source Provenance

- **Primary source:** current canonical ecosystem subtree under `references/ecosystem/`
- **Derived from:** ecosystem discovery, crate navigation, and domain-extension doctrine passes
- **Upstream URL:** not applicable as a synthesized local navigation index
- **Freshness status:** canonical local index aligned to the current ecosystem subtree

---

## Ecosystem Spine

The ecosystem subtree now has a clear doctrinal spine:

1. **Crate-family decision law**
   - `rust-crate-ecosystem-navigator.md`
2. **Operational discovery and adoption law**
   - `rust-ecosystem-discovery.md`
3. **Domain-pressure routing law**
   - `rust-domain-specific-patterns.md`
4. **Cross-lane architecture and operational links**
   - `../architecture/INDEX.md`
   - `../interop/INDEX.md`
   - `../production/INDEX.md`
   - `../governance/INDEX.md`

The doctrine is:
- ecosystem reasoning should move from crate-family selection → discovery and due diligence → domain-pressure refinement → cross-lane consequences
- not jump straight from “I heard of this crate” to adoption

---

## Documents and Their Roles

| File | Primary Role | Load When |
| --- | --- | --- |
| `rust-crate-ecosystem-navigator.md` | Root doctrine for selecting major Rust crate families by problem shape and trade-off profile | you need the crate-family decision model first |
| `rust-ecosystem-discovery.md` | Operational doctrine for finding, evaluating, and adopting real crates safely | you already know roughly what family you need, but must investigate candidates and adoption risk |
| `rust-domain-specific-patterns.md` | Domain-pressure router across CLI/backend/WASM/native/embedded/data-plane/networking/proc-macro Rust work | the domain label is known, but the real pressure profile still needs to be translated into architecture and crate choices |

---

## Reading Paths

### If you need the root crate-selection model first

1. `rust-crate-ecosystem-navigator.md`
2. then branch by discovery or domain pressure

### If the task is exploratory crate selection

1. `rust-crate-ecosystem-navigator.md`
2. `rust-ecosystem-discovery.md`
3. `../governance/source-reservoir-map.md` if adoption, provenance, or cleanup-readiness pressure matters

### If the task is domain-specific stack selection

1. `rust-domain-specific-patterns.md`
2. `rust-crate-ecosystem-navigator.md`
3. return to the owning lane:
   - `../architecture/INDEX.md` when the decision is structural
   - `../interop/INDEX.md` when the decision is boundary-driven
   - `../production/INDEX.md` when the decision is operational

### If the task is dependency due diligence before adoption

1. `rust-ecosystem-discovery.md`
2. `rust-crate-ecosystem-navigator.md`
3. `../production/rust-production-patterns.md` if trust, release, or runtime risk dominates
4. `../governance/INDEX.md` if replacement-grade or cleanup-safe claims matter

### If the task is about interop-family crate choices

1. `rust-crate-ecosystem-navigator.md`
2. `../interop/INDEX.md`
3. then the specific interop lane page

### If the task is about backend/service stack selection

1. `rust-domain-specific-patterns.md`
2. `rust-crate-ecosystem-navigator.md`
3. `../architecture/INDEX.md`
4. `../production/INDEX.md` if operational maturity is the real deciding force

### If the task is about WASM/frontend or desktop boundaries

1. `rust-domain-specific-patterns.md`
2. `../interop/INDEX.md`
3. then `wasm-bindgen-posture.md`, `rust-typescript-bridge-patterns.md`, or `rust-tauri-core-shell-and-ipc-boundaries.md` as appropriate

---

## Ecosystem Decision Questions

Before choosing an ecosystem subpage, ask:

1. Is the real pressure about **crate-family fit**, **candidate evaluation**, or **domain-specific architecture pressure**?
2. Is this still a Rust ecosystem choice, or already a production, interop, or architecture decision disguised as a crate question?
3. Do we need the root navigator first, or are we already sure the family is correct and only need due diligence?
4. Are we selecting for ergonomics, type safety, performance, compatibility, operator experience, or long-term maintenance cost?

The doctrine is:
- ecosystem docs are organized by selection pressure and adoption pressure
- not by crate-name familiarity

---

## Cross-Links

Ecosystem doctrine overlaps naturally with these lanes:

- **Architecture**
  - `../architecture/INDEX.md`
  - `../architecture/rust-architecture-decision-trees.md`
- **Interop**
  - `../interop/INDEX.md`
  - `../interop/rust-cross-language-workflows.md`
- **Production**
  - `../production/INDEX.md`
  - `../production/rust-production-patterns.md`
- **Governance**
  - `../governance/INDEX.md`
  - `../governance/source-reservoir-map.md`

The doctrine is:
- ecosystem work is where selection pressure becomes explicit
- so it must remain connected to architecture, interop, production, and governance rather than pretending crate choice is an isolated shopping task

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
> “ecosystem is where the crate recommendation docs live.”

The reusable lesson is:
> “the ecosystem subtree is the canonical navigation layer for crate-family selection, adoption due diligence, and domain-pressure routing in Rust systems—guiding engineers from high-level stack fit into the exact discovery, evaluation, or domain-specific doctrine they need before a dependency choice hardens into architecture.”
