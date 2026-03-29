# Release Governance

## Purpose

Define the canonical release posture for heavy engine shells and their surrounding ecosystems.

This document turns release work into a governed, auditable process instead of a heroic manual ritual.

## Source Provenance

- **Primary source:** current `developer-tool` build-and-deploy doctrine subtree
- **Derived from:** release/versioning/artifact-governance canonization work inside the developer-tool engine
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local release doctrine aligned to the current developer-tool engine

---

---

## Core Rule

A release is not just a publish action.
It is a coordinated state transition.

That transition should make version, artifact, changelog, and verification all agree with each other.

---

## Pattern 1 — One Version Truth

Use one authoritative source of version truth whenever possible.

Examples:

- `Cargo.toml`
- package manifest
- release config source

Downstream version fields should be synchronized from that source.

The opposite is dangerous:

- multiple files drifting
- one registry published with a different version than another
- docs lagging behind artifacts

---

## Pattern 2 — Semantic Versioning Is an Operational Contract

Use semantic versioning as an execution rule, not just as a labeling convention.

### Meaning

- MAJOR -> breaking change
- MINOR -> additive feature or meaningful non-breaking expansion
- PATCH -> fixes, polish, narrow safe corrections

### Consequence

Version changes should match actual compatibility impact.
If the version lies, all downstream consumers pay for it.

---

## Pattern 3 — Release Checklist Discipline

A healthy release process should require at minimum:

- tests passing
- quality gates passing
- security checks clean enough for release posture
- changelog generated or updated
- version synchronized
- artifacts publishable
- post-publish verification performed

If these are optional, release discipline is weak.

---

## Pattern 4 — Signed, Traceable Release Artifacts

Where the ecosystem supports it, prefer:

- signed tags
- signed releases
- SBOM attached or generated
- traceable build provenance

Not every project needs the full stack immediately.
But the governing posture should assume traceability is valuable.

---

## Pattern 5 — Release Automation Over Manual Heroics

Manual release steps scale badly.
Automation should own:

- version bump propagation
- changelog generation
- artifact publication
- release note generation
- post-release verification where possible

Humans should still review the release.
But humans should not manually stitch every step together by memory.

---

## Pattern 6 — Multi-Platform / Multi-Binding Coordination

When a system has multiple bindings or outputs:

- Rust crate
- Python package
- npm package
- binary release

release governance must answer:

- are they version-locked?
- are they released together?
- if not, what is the compatibility policy?

A mature system cannot answer this ad hoc every release.

---

## Runtime Shell Relation

The shell may own:

- audit commands for release posture
- route commands for choosing the right build/deploy lane
- conservative stop-time reminders about release discipline

The shell should not own:

- all release doctrine as hook logic
- automatic publishing without explicit control
- opaque version mutation at lifecycle boundaries

---

## Practical Law

A release process is mature when a future operator can answer:

- what version is being released?
- why that version is correct?
- what artifacts belong to it?
- what checks passed?
- how to verify it after publish?

If those answers live only in somebody's head, the process is still fragile.
