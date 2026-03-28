# Rust SDK CI and Multi-Surface Release Pipelines

## Purpose

Define the canonical doctrine for Rust systems that publish not only a Rust crate, but also related SDKs, bindings, or runtime artifacts across multiple surfaces.

This document exists to answer a production-grade question:

> once a Rust system ships through more than one registry, package format, or consumer surface, how should CI confidence, release coordination, artifact ownership, verification, and failure handling be designed so the release process remains explicit instead of becoming a heroic manual ritual?

This doctrine is especially relevant when a Rust project publishes through combinations such as:
- crates.io
- Python wheels
- npm/native addon packages
- WASM/browser bundles
- GitHub release binaries
- Homebrew or other downstream distribution surfaces

## Source Provenance

- **Primary donor family:** `rust-sdk-ci`
- **Key local donor material:**
  - `rust-sdk-ci/rust-sdk-ci/skill.md`
- **Secondary donor family:** `napi-rs-node-bindings` (for native addon distribution pressure)
- **Cross-linked doctrine inputs:**
  - `../interop/rust-cross-language-workflows.md`
  - `../governance/source-reservoir-map.md`
  - `rust-production-patterns.md`
- **Upstream URL:** not yet fully re-verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending for replacement-grade release claims

---

## Core Rule

A multi-surface release pipeline is not just “CI plus publish.”
It is a **coordinated release graph**.

That graph must make explicit:
1. what version truth is authoritative
2. what artifact truth is authoritative per surface
3. what order surfaces publish in
4. what verification gates apply before and after publish
5. what happens when one surface succeeds and another fails
6. which secrets and registries are involved

If those answers live only in maintainer memory, the release system is still immature.

---

## Release Graph Model

A serious multi-surface Rust release should be understood as a graph with distinct node types:

- **Confidence nodes**
  - lint
  - tests
  - build checks
  - packaging rehearsals
  - artifact sanity checks

- **Coordination nodes**
  - version resolution
  - changelog or notes generation
  - tag selection
  - publish-order decisions

- **Publication nodes**
  - crates.io
  - PyPI wheels
  - npm/native addons
  - release artifacts
  - downstream taps or package repos

- **Verification nodes**
  - registry existence
  - installability
  - hash or artifact checks
  - smoke validation per surface

The doctrine is:
- treat each of these as a real stage with explicit responsibility
- not as one opaque “release.yml” blob

---

## Pattern 1 — Separate CI Confidence from Release Orchestration

Donor pipelines consistently show the value of separating:
- CI correctness checks
- release execution and publication orchestration

This matters because these are different jobs.

### CI confidence owns
- formatting
- linting
- tests
- baseline build correctness
- pre-release artifact confidence

### Release orchestration owns
- version resolution
- tag-driven publication
- surface coordination
- registry/token usage
- post-publish verification

The doctrine is:
- CI produces confidence
- release workflows consume that confidence to perform coordinated publication

Do not collapse both jobs into one unstructured file when they serve different lifecycle stages.

---

## Pattern 2 — One Coordinating Version Truth Is Mandatory

A multi-surface system must answer:
- what version are all surfaces tied to?
- if versions diverge, what is the compatibility policy?
- which file or tag is authoritative?
- how do downstream surfaces learn that truth?

Potential version truth anchors:
- `Cargo.toml`
- workspace manifest versioning
- release config source
- tag-based release source of truth

The doctrine is:
- multi-surface publication must have one coordinating truth
- or an explicitly documented split-version policy

The anti-pattern is silent drift:
- crate version changed
- wheel version not updated
- npm package uses a different semantic meaning
- release notes describe a different artifact state than what was actually published

---

## Pattern 3 — Artifact Truth Must Be Surface-Specific and Explicit

The project may produce different artifact types:
- source crate
- compiled wheel
- native Node addon bundle
- WASM package
- standalone binary
- release archive

Each surface needs explicit artifact truth:
- what file is published?
- for which target(s)?
- what metadata accompanies it?
- what install path or consumer workflow is assumed?

The doctrine is:
- version truth may be shared
- artifact truth is still surface-specific and must be tracked explicitly

Without this, a project claims a release happened, but nobody can answer what actually shipped to each consumer lane.

---

## Pattern 4 — Publish Ordering Must Be Intentional

Once more than one publication node exists, the workflow must specify order.

Examples:
- crate first, then bindings
- generated contracts first, then consuming packages
- GitHub artifacts first, registries second
- package registries first, release notes and downstream taps last

Questions to answer:
- what surface must publish first because others depend on it?
- what surface is allowed to lag?
- what surface should block the rest if it fails?
- what surface can be retried independently?

The doctrine is:
- publish ordering is architecture
- not a detail to improvise release by release

---

## Pattern 5 — Failure Handling Must Be Graph-Aware

A coordinated release graph needs explicit failure posture.

Failure cases include:
- crate published, wheel failed
- npm addon published for only some targets
- GitHub release created, but registry publish failed
- generated artifacts differ from committed state
- release notes generated against the wrong version

The workflow must decide:
- what counts as a partial release?
- what is rolled back versus what is compensated forward?
- when is the correct action retry, rollback, or follow-up release?
- who is allowed to approve a partial success?

The doctrine is:
- partial-release behavior must be designed before failure happens
- not discovered during incident response

---

## Pattern 6 — Workspace and Repository Topology Are Part of Release Truth

Many Rust packages live inside:
- workspaces
- mono-repos
- mixed-language repositories
- repositories with package-local vs workspace-global build roots

That means release doctrine must account for:
- where commands actually run
- package-local vs workspace-global paths
- subdirectory packaging surfaces
- generated assets that live outside the Rust crate root
- cross-surface output directories and publish contexts

The doctrine is:
- release pipelines must reflect the real repository topology
- not the idealized topology in someone's head

This is especially important when Rust coordinates with Python, Node, or Tauri surfaces inside the same repo.

---

## Pattern 7 — Platform Matrixing Belongs to the Release Design

When native SDKs or bindings are published, the platform matrix is not an implementation detail.
It is part of release doctrine.

Important questions:
- which OS/arch targets are first-class?
- which targets are best-effort or experimental?
- what toolchain or cross-compilation strategy is used?
- how are artifacts named, signed, and published?
- what verification is required per target?

The doctrine is:
- the platform matrix is part of the product promise
- not just a CI implementation concern

This is one reason multi-surface release pipelines deserve their own canonical production page.

---

## Pattern 8 — Registry and Secret Boundaries Are Architectural Risk

A production-grade multi-surface release touches multiple trust boundaries:
- crates.io token
- npm token
- PyPI token
- GitHub release credentials
- downstream tap or package repository credentials

The release system must make explicit:
- which secret is used where
- which publication node consumes which secret
- which environments may access each secret
- which releases are blocked when a secret is unavailable

The doctrine is:
- publication secrets are part of architecture risk
- release automation must not hide those dependencies conceptually

A release graph that ignores registry boundaries is not trustworthy enough for real operations.

---

## Pattern 9 — Post-Publish Verification Is Part of Release Completion

A release is not complete when upload commands succeed.
A multi-surface release should usually include some combination of:
- registry existence verification
- installability verification
- artifact checksum or existence verification
- smoke validation per surface
- release-note and changelog generation
- downstream package or tap sanity checks

Examples:
- crate install dry check
- wheel install and import smoke test
- npm install and addon load smoke test
- binary launch or `--version` probe

The doctrine is:
- publication without verification is transport, not release confidence

---

## Pattern 10 — Cross-Language Workflows Must Share Release Law, Not Just Code

This doctrine intersects directly with:
- `../interop/rust-cross-language-workflows.md`
- `rust-node-native-addon-posture.md`
- `rust-pyo3-maturin-bindings.md`
- `rust-typescript-bridge-patterns.md`

Once a Rust system ships through foreign consumer surfaces, release law must answer:
- how generated contracts stay in sync before publish
- how consumer packages align with Rust version truth
- how cross-language drift is detected in CI
- how release notes explain multi-surface compatibility

The doctrine is:
- multi-surface release is the production-side half of cross-language workflow doctrine
- the other half is boundary ownership and packaging discipline

---

## Pattern 11 — Release Pipelines Are Part of Maintainer Experience

A Rust project's CI/release posture influences:
- contributor confidence
- maintainer workload
- downstream trust
- how safely bindings and SDKs evolve together
- whether incidents become recoverable or chaotic

That means pipeline architecture is not only ops.
It is part of the product experience for maintainers and integrators.

The doctrine is:
- pipeline clarity reduces cognitive load
- opaque release logic creates operational debt even when it technically works

---

## Release Graph Checklist

Before calling a multi-surface Rust release healthy, ask:

- [ ] Is there one coordinating version truth or an explicit split-version policy?
- [ ] Does each surface have explicit artifact truth?
- [ ] Is publish ordering intentional and documented?
- [ ] Is partial-failure behavior defined?
- [ ] Does the workflow reflect real workspace/repo topology?
- [ ] Is the platform matrix treated as product truth?
- [ ] Are registry/secret boundaries explicit?
- [ ] Does post-publish verification exist per important surface?
- [ ] Are cross-language consumers aligned before publish?

---

## Anti-Patterns

- one opaque workflow that mixes CI confidence and release orchestration without stage boundaries
- assuming one registry's success implies the whole release succeeded
- silent version drift across crate / wheel / npm / release artifacts
- platform matrices treated as incidental instead of contractual
- release notes generated without artifact-state verification
- packaging treated as a late add-on to already-shipped bindings
- secrets hidden in CI plumbing without conceptual documentation

---

## Cross-Links

Read this alongside:
- `rust-production-patterns.md`
- `rust-performance-patterns.md`
- `rust-logging-and-observability-best-practices.md`
- `../interop/rust-cross-language-workflows.md`
- `../interop/rust-node-native-addon-posture.md`
- `../interop/rust-pyo3-maturin-bindings.md`
- `../governance/source-reservoir-map.md`

---

## Final Doctrine

The reusable lesson is not:
> “a Rust project can publish to multiple registries.”

The reusable lesson is:
> “a Rust system that ships through multiple surfaces needs an explicit release graph with coordinating version truth, surface-specific artifact truth, publish ordering, failure policy, platform-matrix law, registry-boundary discipline, and post-publish verification—otherwise multi-surface shipping remains operationally fragile no matter how good the code is.”
