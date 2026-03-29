# Build and Deploy Index

## Purpose

Canonical navigation entrypoint for build, release, deployment, and supply-chain doctrine inside `developer-tool`.

Use this category when the task is about:

- CI/CD pipeline structure
- build reproducibility
- containerization and OCI posture
- release process and semantic versioning
- deployment strategy selection
- rollout verification and rollback posture
- supply-chain governance
- where build/deploy logic belongs in runtime shell versus doctrine

This index is not only a document list.
It exists to route readers into the correct build-and-deploy doctrine lane based on the kind of delivery or release pressure they need to resolve.

## Source Provenance

- **Primary source:** current `developer-tool` build-and-deploy doctrine subtree
- **Derived from:** build, deploy, release, runtime-boundary, and supply-chain canonization work inside the developer-tool engine
- **Upstream URL:** not applicable as a synthesized local navigation index
- **Freshness status:** canonical local index aligned to the current `build-and-deploy` lane

---

## Build-and-Deploy Spine

The `build-and-deploy` subtree now has a clear doctrinal spine:

1. **Broad delivery law**
   - `build-deploy.md`
   - `../build-deploy-patterns.md`
2. **Runtime boundary law**
   - `runtime-boundaries.md`
3. **Release governance law**
   - `release-governance.md`
4. **Deployment orchestration law**
   - `deployment-orchestration-patterns.md`
5. **Supply-chain and dependency trust law**
   - `supply-chain-governance.md`

The doctrine is:
- build-and-deploy reasoning should move from broad delivery law → runtime and release boundaries → rollout strategy → supply-chain trust
- not jump straight into pipelines, tags, or rollout scripts before the delivery model is explicit

---

## Documents and Their Roles

| File | Primary Role | Load When |
| --- | --- | --- |
| `build-deploy.md` | Broad doctrine for CI/CD, packaging, artifacts, and deploy-time trust | you need the delivery model first |
| `../build-deploy-patterns.md` | Concise strategic patterns for deployment and release posture | you need a quick strategic overview before deeper doctrine |
| `runtime-boundaries.md` | Doctrine for what build/deploy behavior belongs in runtime shell versus doctrine-only | the question is about commands/hooks/runtime boundaries for delivery work |
| `release-governance.md` | Doctrine for version truth, changelog, publishing, and release verification | the problem is specifically about release discipline |
| `deployment-orchestration-patterns.md` | Doctrine for rollout strategies, blast radius, and post-deploy verification | the problem is rollout style or deployment risk |
| `supply-chain-governance.md` | Doctrine for lockfiles, audits, SBOM, dependency trust, and registry posture | the problem is dependency, artifact, or registry trust |

---

## Reading Paths

### If you need the broad model first

1. `build-deploy.md`
2. `../build-deploy-patterns.md`
3. `runtime-boundaries.md`
4. then branch by the actual delivery pressure

### If the task is about build or CI posture

1. `build-deploy.md`
2. `runtime-boundaries.md`
3. `supply-chain-governance.md` if reproducibility or dependency trust is central

### If the task is about release/versioning discipline

1. `release-governance.md`
2. `build-deploy.md`
3. `supply-chain-governance.md` if release trust or provenance becomes the bottleneck

### If the task is about deployment strategy or rollout risk

1. `deployment-orchestration-patterns.md`
2. `build-deploy.md`
3. `release-governance.md` if version/artifact coordination is the real constraint

### If the task is about supply-chain, lockfiles, or dependency trust

1. `supply-chain-governance.md`
2. `build-deploy.md`
3. `release-governance.md` if the trust question extends into publication and release posture

### If the task is about commands/hooks/runtime-shell boundaries for build/deploy

1. `runtime-boundaries.md`
2. `../tool-ecosystem/INDEX.md`
3. then return to the specific build/deploy doctrine page being operationalized

---

## Build-and-Deploy Decision Questions

Before choosing a subpage, ask:

1. Is the real pressure about **broad delivery architecture**, **runtime boundaries**, **release governance**, **deployment strategy**, or **supply-chain trust**?
2. Is this still a doctrine-first delivery question, or already a runtime-shell/tool-ecosystem question disguised as one?
3. Do we need the broad delivery law first, or are we already certain which specialized lane dominates?
4. Are we trying to build, to release, to roll out, or to trust what is being shipped?

The doctrine is:
- build-and-deploy docs are organized by delivery pressure and trust pressure
- not by whichever CI tool or container surface is most visible first

---

## Cross-Links

Build-and-deploy doctrine overlaps naturally with these lanes:

- **Tool ecosystem**
  - `../tool-ecosystem/INDEX.md`
  - `../tool-ecosystem/command-surface-patterns.md`
  - `../tool-ecosystem/hook-runtime-patterns.md`
- **Shell and terminal**
  - `../shell-and-terminal/INDEX.md`
- **Cross-platform development**
  - `../cross-platform-development/INDEX.md`
- **Root references**
  - `../INDEX.md`
- **Root runtime shell**
  - `../../commands/prime/tool-runtime.md`
  - `../../commands/prime/build-and-deploy-surface.md`
  - `../../agents/build-deploy-diagnostician.md`

The doctrine is:
- build-and-deploy is where delivery truth becomes explicit inside `developer-tool`
- so it must remain connected to runtime-shell architecture, shell execution, platform strategy, and root routing rather than pretending release and deployment are isolated ops chores

---

## Cleanup-Safe Rule

This index is canonical navigation.
It should point to:

- doctrine pages
- stable canonical category indexes
- runtime-aware and governance-aware cross-links

It should **not** depend on donor skill bundles or legacy build notes for its main reading flow.

---

## Final Rule

The reusable lesson is not:
> “build-and-deploy is where the CI/CD docs live.”

The reusable lesson is:
> “the `build-and-deploy` subtree is the canonical navigation layer for delivery truth inside `developer-tool`—routing engineers from broad build/deploy law into the exact runtime-boundary, release-governance, rollout, or supply-chain doctrine they need before pipeline behavior is allowed to harden.”
