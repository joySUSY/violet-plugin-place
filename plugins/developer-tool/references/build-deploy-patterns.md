# Build and Deployment Patterns

## Purpose

Provide a cleanup-safe bridge from the old top-level `build-deploy-patterns.md` entrypoint into the canonical `references/build-and-deploy/` lane.

This file is no longer the primary doctrine root for build/deploy strategy.
Its job is to preserve compatibility for older links while routing readers into the current canonical subtree.

## Source Provenance

- **Primary source:** current canonical `developer-tool` build-and-deploy lane
- **Derived from:** top-level legacy build/deploy summaries after lane canonization
- **Upstream URL:** not applicable as a synthesized local bridge note
- **Freshness status:** canonical bridge document aligned to the current `references/build-and-deploy/` subtree

---

## Canonical Reading Path

If the task is about CI/CD, packaging, release, deployment, or supply-chain posture, read in this order:

1. `build-and-deploy/INDEX.md`
2. `build-and-deploy/build-deploy.md`
3. then choose the supporting focused doctrine:
   - `build-and-deploy/release-governance.md`
   - `build-and-deploy/deployment-orchestration-patterns.md`
   - `build-and-deploy/supply-chain-governance.md`
   - `devops-ci-cd.md` for a CI/CD gate-focused supporting posture

---

## Why This Bridge Exists

Historically, `developer-tool` carried broad absorbed summaries at the top level.
As the doctrine tree matured, build/deploy guidance was promoted into its own canonical lane with a dedicated `INDEX.md` entrypoint.

This bridge exists so that:

- older references do not break
- historical absorbed maps remain understandable
- readers are redirected into the stronger lane instead of the older summary surface

---

## Rule

Do not treat this top-level file as the build/deploy source of truth.
Treat it as a pointer.

The canonical doctrine now lives under:

- `references/build-and-deploy/INDEX.md`
- `references/build-and-deploy/build-deploy.md`
