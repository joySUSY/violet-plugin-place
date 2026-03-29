# Infrastructure and Operations

## Purpose

Provide a cleanup-safe bridge from the old top-level `infrastructure-ops.md` entrypoint into the canonical `platform-infrastructure.md` and `build-and-deploy/` doctrine.

This file is no longer the primary source of truth for build systems, deployment pipelines, platform engineering, or network-operations posture.
Its job is to preserve compatibility for older links while routing readers into the stronger canonical lanes.

## Source Provenance

- **Primary source:** current canonical `developer-tool` platform and build/deploy doctrine
- **Derived from:** top-level legacy infrastructure/operations summaries after lane and root canonization
- **Upstream URL:** not applicable as a synthesized local bridge note
- **Freshness status:** canonical bridge document aligned to the current platform and build/deploy lanes

---

## Canonical Reading Path

If the task is about infrastructure, operations, platform engineering, or release/deployment machinery, read in this order:

1. `platform-infrastructure.md`
2. `build-and-deploy/INDEX.md`
3. `build-and-deploy/build-deploy.md`
4. then choose a focused support doctrine:
   - `devops-ci-cd.md`
   - `build-and-deploy/release-governance.md`
   - `build-and-deploy/deployment-orchestration-patterns.md`
   - `build-and-deploy/supply-chain-governance.md`

---

## Why This Bridge Exists

Historically, `developer-tool` carried broad infrastructure and operations summaries at the top level.
As the doctrine tree matured, platform-engineering concerns and build/deploy concerns were separated into stronger canonical surfaces.

This bridge exists so that:

- older links do not break
- historical maps remain readable
- readers are redirected into the stronger canonical lanes instead of the older summary surface

---

## Rule

Do not treat this top-level file as the infrastructure/operations source of truth.
Treat it as a pointer.

The canonical doctrine now lives primarily in:

- `references/platform-infrastructure.md`
- `references/build-and-deploy/INDEX.md`
- `references/build-and-deploy/build-deploy.md`
