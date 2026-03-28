# Rust Architecture Index

## Purpose

Canonical entrypoint for Rust project structure and large-system architecture doctrine.

Use this category when the task is about:

- project scaffolding
- workspace and crate boundaries
- library versus app structure
- service and adapter boundaries
- production architecture shape
- systems/tooling architecture at scale
- using repo-scale donor evidence without mirroring donor trees

This index is not only a file list.
It exists to route readers into the correct architecture doctrine lane based on the kind of structural pressure they need to resolve.

## Source Provenance

- **Primary source:** current canonical architecture subtree under `references/architecture/`
- **Derived from:** project-structure, library/workspace, service-boundary, ECS/data-oriented, and architecture doctrine canonization passes
- **Upstream URL:** not applicable as a synthesized local navigation index
- **Freshness status:** canonical local index aligned to the current architecture subtree

---

## Architecture Spine

The architecture subtree now has a clear doctrinal spine:

1. **Root structural law**
   - `rust-architecture-and-scaffolding.md`
2. **API/crate/public-surface law**
   - `rust-library-development-and-cargo-mastery.md`
3. **Requirement-grade architecture routing**
   - `rust-architecture-decision-trees.md`
4. **Specialized architecture lanes**
   - `rust-axum-service-architecture-and-thin-adapters.md`
   - `rust-ecs-and-data-oriented-architecture.md`
   - `rust-advanced-systems-and-tooling.md`
5. **Repo-scale structural evidence**
   - `../repo-cases/INDEX.md`

The doctrine is:

- architecture reasoning should move from general shape → boundary choice → specialized structural pattern → repo-grade evidence when needed
- not jump straight into donor layouts or framework-specific detail before the structural pressure is understood

---

## Documents and Their Roles

| File | Primary Role | Load When |
| --- | --- | --- |
| `rust-architecture-and-scaffolding.md` | Root doctrine for scaling structure proportionately | you need the architecture model first |
| `rust-library-development-and-cargo-mastery.md` | Library/package/public-surface doctrine | crate API, library shape, workspace publishing posture dominate |
| `rust-architecture-decision-trees.md` | Requirement-grade architecture routing and decision ladders | you need architecture choices explained by problem pressure |
| `rust-axum-service-architecture-and-thin-adapters.md` | Service boundaries, thin handlers, hexagonal/web adapter posture | HTTP/service delivery architecture dominates |
| `rust-ecs-and-data-oriented-architecture.md` | ECS and data-oriented system shape | shared-world, schedule/query, ECS, simulation, or data-oriented pressure dominates |
| `rust-advanced-systems-and-tooling.md` | Systems/tooling-heavy architecture with production relevance | runtime/tooling complexity is architectural rather than feature-local |

---

## Reading Paths

### If you need the root architecture model first

1. `rust-architecture-and-scaffolding.md`
2. `rust-library-development-and-cargo-mastery.md`
3. `rust-architecture-decision-trees.md`
4. then branch by specialized pressure

### If the main pressure is project scale or workspace shape

1. `rust-architecture-and-scaffolding.md`
2. `rust-architecture-decision-trees.md`
3. `../repo-cases/INDEX.md` if real repo-scale evidence is needed

### If the main pressure is service or web delivery shape

1. `rust-architecture-and-scaffolding.md`
2. `rust-axum-service-architecture-and-thin-adapters.md`
3. `../production/rust-production-patterns.md` if operational truth already dominates the structural decision

### If the main pressure is library/public API shape

1. `rust-library-development-and-cargo-mastery.md`
2. `rust-architecture-decision-trees.md`
3. `../quality/rust-public-api-documentation-and-trait-surface-discipline.md` if API quality or docs are the real follow-on concern

### If the main pressure is ECS/data-oriented design

1. `rust-ecs-and-data-oriented-architecture.md`
2. `rust-architecture-decision-trees.md`
3. `../repo-cases/INDEX.md` when donor-scale ECS or shared-world evidence matters

### If the main pressure is advanced runtime/tooling/system shape

1. `rust-advanced-systems-and-tooling.md`
2. `rust-architecture-decision-trees.md`
3. `../production/INDEX.md` if the real issue is now operational rather than structural

### If the main pressure is repo-scale case-study extraction

1. `../repo-cases/INDEX.md`
2. matching case-study extraction
3. route the extracted lesson back into:
   - `architecture/` when the lesson is structural
   - `interop/` when the lesson is boundary-driven
   - `production/` when the lesson is operational
   - `governance/` when promotion/cleanup-readiness is the real issue

---

## Architecture Decision Questions

Before choosing an architecture subpage, ask:

1. Is the real pressure about **scale**, **boundary shape**, **delivery surface**, **public API**, or **systems complexity**?
2. Is this still a general Rust architecture question, or already a production/interop concern disguised as architecture?
3. Do we need first-principles structural law first, or are we already certain which specialized lane dominates?
4. Are we trying to design a reusable pattern, or extract a lesson from a concrete repo-scale case?

The doctrine is:

- architecture docs are organized by structural pressure
- not by cargo cult pattern names alone

---

## Cross-Links

Architecture doctrine overlaps naturally with these lanes:

- **Foundations**
  - `../foundations/INDEX.md`
  - `../foundations/rust-foundations-ownership-memory-safety.md`
- **Production**
  - `../production/INDEX.md`
  - `../production/rust-production-patterns.md`
- **Interop**
  - `../interop/INDEX.md`
  - `../interop/rust-cross-language-workflows.md`
- **Repo cases**
  - `../repo-cases/INDEX.md`
  - `../repo-cases/case-study-governance.md`
- **Governance**
  - `../governance/source-reservoir-map.md`

The doctrine is:

- architecture is where structural truth becomes explicit
- so it must remain connected to foundations, interop, production, repo evidence, and governance rather than pretending they are separate worlds

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
> “architecture is where the Rust structure docs live.”

The reusable lesson is:
> “the architecture subtree is the canonical navigation layer for structural truth in Rust systems—routing engineers from proportional scaffolding law into the exact library, service, ECS, systems, or repo-case doctrine they need before the system's boundaries are allowed to harden.”
