# Build and Deploy Infrastructure

## Purpose

Define the canonical doctrine for build, packaging, CI/CD, and deploy-time trust inside `developer-tool`.

This document is the broad foundation for the build/deploy subtree.
It should answer the key question:

> how should a tool or platform turn source code into a trustworthy, reproducible, releasable, and operable artifact without relying on manual heroics?

It is not only about CI syntax.
It is about the architecture of the delivery system around the codebase.

## Source Provenance

- **Primary source:** current `developer-tool` build/deploy doctrine cluster
- **Derived from:** absorbed build-engineer, deployment-engineer, platform-engineer, and dependency-manager donor families plus ongoing canonicalization passes
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local build/deploy doctrine aligned to the current developer-tool engine

---

## Core Rule

Build and deploy infrastructure is the system that converts code into trusted runtime reality.

A mature delivery system should make these things explicit:
- what is built
- how it is verified
- how it is packaged
- how it is released
- how it is deployed
- how operators know that the deployment is safe enough to trust

Manual deployment is not just inefficient.
It is hidden state and untracked risk.

---

## Delivery Surface Map

| Surface | What it must guarantee |
|---|---|
| Build pipeline | reproducible artifact creation |
| Test/verification stage | sufficient confidence before release |
| Packaging layer | usable, portable, and inspectable artifacts |
| Release layer | traceable versioned publication |
| Deployment layer | controlled rollout and verification |
| Supply-chain layer | dependency and artifact trust |

These are different concerns.
A healthy delivery system keeps them connected but distinct.

---

## Pattern 1 — Separate Build Confidence from Deployment Confidence

A build pipeline answering “can we produce a valid artifact?” is not the same as a deployment pipeline answering “can we safely roll this artifact into runtime?”

This distinction matters because:
- builds can be green while deployment posture is still immature
- rollout strategy can change without changing compilation logic
- artifacts should remain inspectable outside the deployment mechanism

The doctrine is:
- build and deploy are linked stages
- but they should not collapse into one opaque blob

---

## Pattern 2 — CI/CD Is a Verification Architecture, Not Just Automation Glue

A CI/CD system should be treated as a quality and trust architecture.

Its job is not merely to run commands.
Its job is to enforce the project's minimum truth before release or deployment.

Typical stages may include:
- formatting/lint/type checks
- unit/integration tests
- security checks
- package/build steps
- artifact publication
- post-deploy verification

The right stages depend on the project, but the governing principle is stable:
- every stage should justify what risk it reduces

---

## Pattern 3 — Reproducibility Is a First-Class Requirement

A mature build/deploy system should be able to answer:
- can we rebuild the same artifact deterministically enough?
- what inputs affect the build?
- are dependencies pinned and auditable?
- is the environment controlled enough to trust the output?

This is why lockfiles, pinned actions, controlled toolchains, and explicit configuration matter.

A build that “usually works on CI” is weaker than a build that is intentionally reproducible.

---

## Pattern 4 — Artifact Design Matters

The thing produced by the build system is part of the product contract.

That means the delivery system should care about:
- artifact naming
- platform targeting
- packaging format
- container shape
- metadata and version traceability
- post-build inspectability

An artifact should not be a mystery lump emitted by a pipeline no one understands.

---

## Pattern 5 — Containerization Is Packaging Discipline, Not Automatic Maturity

Containers can be useful, but they are not maturity by themselves.

Good container posture includes:
- minimal runtime images where practical
- clean build/runtime separation
- explicit health/runtime assumptions
- non-root or safer runtime user posture where relevant
- smaller attack surface and dependency clarity

The doctrine is:
- use containers as disciplined packaging surfaces
- not as a way to hide unstructured build systems

---

## Pattern 6 — Build Speed Matters, But Trust Matters More

Caching, parallelization, and build optimization are valuable because they reduce friction.
But they should not undermine correctness or traceability.

A strong build system balances:
- speed
- reproducibility
- observability of failures
- portability of artifacts

Optimization is good when it preserves trust.
Optimization is bad when it creates a fast but opaque pipeline that few people can debug.

---

## Pattern 7 — Release Readiness Is a Governed State Transition

Release is not “tag and pray.”
Release is the moment the system claims:
- this version is intentional
- these artifacts belong to it
- these checks passed
- downstream consumers can trust what was shipped

That is why release discipline deserves its own deeper doctrine.
This broad build/deploy doc should route into it rather than trying to absorb everything.

---

## Pattern 8 — Deployment Is About Blast Radius, Not Just Mechanics

A deployment process should make explicit:
- what is being changed
- how it is rolled out
- how it is verified after rollout
- how it is rolled back if needed
- what operational signals matter immediately afterward

This is where deployment stops being a script and becomes operational engineering.

A deployment system is mature when the blast radius is understood before rollout begins.

---

## Pattern 9 — Supply Chain Is Part of Delivery, Not an External Appendix

Dependencies, registries, CI actions, generated artifacts, and SBOM/provenance concerns all participate in the delivery system.

That means supply-chain security is not a separate universe.
It is part of build/deploy trust.

A delivery system that ignores supply chain posture is missing one of its most important risk layers.

---

## Pattern 10 — Golden Paths Are High-Leverage Platform Infrastructure

For teams or ecosystems, one of the highest-value delivery patterns is the golden path:
- a standard scaffold
- standard CI
- standard release posture
- standard observability/deploy expectations

Golden paths reduce decision fatigue and make quality easier to inherit.
They are especially valuable for tool ecosystems and platform-like codebases.

This is where scaffolding doctrine and build/deploy doctrine reinforce each other strongly.

---

## Pattern 11 — Build and Deploy Systems Should Reduce Operator Guesswork

The best delivery systems reduce these questions:
- what command do I run?
- which branch/tag/build produced this?
- where did the artifact go?
- what checks ran?
- what should I verify after deployment?
- what is the rollback path?

If the answer to these lives in tribal memory, the infrastructure is still immature.

---

## Build and Deploy Checklist

Before calling a build/deploy posture healthy, ask:

- [ ] Are build and deployment concerns separated clearly enough?
- [ ] Does CI reduce meaningful project risks instead of only running commands mechanically?
- [ ] Are artifacts reproducible and traceable enough to trust?
- [ ] Is packaging/container posture disciplined rather than default cargo cult?
- [ ] Are release and deployment governed as explicit state transitions?
- [ ] Is supply-chain posture integrated into delivery confidence?
- [ ] Does the system reduce operator guesswork instead of increasing it?

---

## Anti-Patterns

- manual release or deployment steps as primary workflow
- green CI with no clear statement of what it actually guarantees
- monolithic pipeline blobs that hide build vs release vs deploy stages
- containers used as a substitute for architecture discipline
- fast pipelines that are too opaque to debug or trust
- release/version/artifact relationships that drift out of sync
- deployment with no blast-radius or rollback thinking

---

## What This Document Does Not Own

This broad build/deploy doctrine does **not** fully own:
- release/version/changelog specifics -> `release-governance.md`
- rollout strategy specifics -> `deployment-orchestration-patterns.md`
- supply-chain specifics -> `supply-chain-governance.md`
- runtime shell boundary questions -> `runtime-boundaries.md`

This separation is intentional.
The root document defines the delivery system; the supporting docs specialize it.

---

## Cross-Links

Read this alongside:
- `INDEX.md`
- `release-governance.md`
- `deployment-orchestration-patterns.md`
- `supply-chain-governance.md`
- `runtime-boundaries.md`
- `../project-scaffolding.md`

---

## Final Doctrine

The reusable lesson is not:
> “build and deploy means CI plus Docker plus release scripts.”

The reusable lesson is:
> “build and deploy infrastructure is the trust system around code delivery: it must make artifact creation, verification, release, rollout, and supply-chain risk explicit enough that the software can be shipped and operated without guesswork.”
