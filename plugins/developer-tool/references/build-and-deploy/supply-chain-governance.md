# Supply Chain Governance

## Purpose

Define the canonical dependency and supply-chain posture for `developer-tool`.

This document focuses on:

- lockfile discipline
- audit posture
- SBOM generation
- dependency freshness
- release-traceability and registry trust

## Source Provenance

- **Primary source:** current `developer-tool` build-and-deploy doctrine subtree
- **Derived from:** dependency-governance, audit, and supply-chain canonization work inside the developer-tool engine
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local supply-chain doctrine aligned to the current developer-tool engine

---

---

## Core Rule

Dependencies are part of the product.
Treat them like production inputs, not invisible background noise.

A system with weak dependency governance accumulates hidden operational debt.

---

## Pattern 1 — Lockfiles Are Mandatory for Operational Surfaces

If a project ships binaries, apps, services, or runtime tooling, lockfiles should be committed and reviewed.

Why:

- reproducibility
- incident replay
- regression isolation
- supply-chain traceability

The exact lockfile differs by ecosystem, but the governing posture is the same.

---

## Pattern 2 — Audit in CI, Not Just Locally

Dependency checks should run in CI as part of release confidence, not just as occasional local hygiene.

Typical governance includes:

- known vulnerability scanning
- license compliance checking
- dependency freshness review
- registry/provenance review where supported

These do not replace code review.
They reduce invisible dependency risk.

---

## Pattern 3 — SBOM as Operational Memory

A Software Bill of Materials is not paperwork theater.
It is a machine-readable memory of what actually shipped.

A mature release posture should prefer:

- generated SBOM per release artifact
- stored or attached alongside release outputs
- auditable provenance where the ecosystem supports it

---

## Pattern 4 — Update Policy Must Be Explicit

A project should not discover its update policy by accident every week.

At minimum, define:

- patch update posture
- minor update posture
- major update posture
- emergency security update posture

Without this, dependency work becomes random and noisy.

---

## Pattern 5 — External Workflow Pins Matter

Supply-chain governance includes CI workflows and external actions too.

That means:

- pin important CI actions conservatively
- review external workflow dependencies
- avoid blind trust in mutable tags where the risk is material

Dependencies are broader than language package managers alone.

---

## Runtime Shell Relation

The shell may own:

- audit commands
- doctrine references
- release posture reminders

The shell should not own:

- broad automatic dependency updates
- silent version mutation on lifecycle events
- hidden registry or token assumptions

Governance must stay explicit.

---

## Practical Law

A project has healthy supply-chain governance when it can answer:

- what dependency state is actually shipped?
- how is that state reproduced?
- how are vulnerabilities reviewed?
- how are updates classified?
- how is release composition remembered?

If those answers are vague, governance is still immature.
