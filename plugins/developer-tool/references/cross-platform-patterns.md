# Cross-Platform Development Patterns

## Purpose

Provide a cleanup-safe bridge from the old top-level `cross-platform-patterns.md` entrypoint into the canonical `references/cross-platform-development/` lane.

This file is no longer the primary doctrine root for cross-platform strategy.
Its role is to preserve compatibility for older links while routing readers into the stronger canonical subtree.

## Source Provenance

- **Primary source:** current canonical `developer-tool` cross-platform-development lane
- **Derived from:** top-level legacy cross-platform summaries after lane canonization
- **Upstream URL:** not applicable as a synthesized local bridge note
- **Freshness status:** canonical bridge document aligned to the current `references/cross-platform-development/` subtree

---

## Canonical Reading Path

If the task is about platform compatibility, support tiers, or shared-core versus platform-shell design, read in this order:

1. `cross-platform-development/INDEX.md`
2. `cross-platform-development/cross-platform.md`
3. then route into:
   - `platform-infrastructure.md` if the real issue is organizational/platform governance
   - `build-and-deploy/build-deploy.md` if the real issue is release or packaging support claims
   - `shell-terminal-mastery.md` if environment portability is the real bottleneck

---

## Why This Bridge Exists

Historically, `developer-tool` carried broad absorbed summaries at the top level.
As the doctrine tree matured, cross-platform guidance was promoted into its own category lane with a dedicated `INDEX.md` entrypoint.

This bridge exists so that:
- older references do not break
- historical maps remain readable
- readers are redirected into the stronger canonical lane instead of the older summary shape

---

## Rule

Do not treat this top-level file as the cross-platform source of truth.
Treat it as a pointer.

The canonical doctrine now lives under:
- `references/cross-platform-development/INDEX.md`
- `references/cross-platform-development/cross-platform.md`
