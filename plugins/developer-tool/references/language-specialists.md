# Language Specialist Patterns

## Purpose

Provide a cleanup-safe bridge from the old top-level `language-specialists.md` entrypoint into the canonical `references/language-specialists/` lane.

This file is no longer the primary doctrine root for cross-language specialist guidance.
Its job is to preserve compatibility for older links while routing readers into the new canonical subtree.

## Source Provenance

- **Primary source:** current canonical `developer-tool` language-specialists lane
- **Derived from:** top-level legacy language-specialist summaries after lane canonization
- **Upstream URL:** not applicable as a synthesized local bridge note
- **Freshness status:** canonical bridge document aligned to the current `references/language-specialists/` subtree

---

## Canonical Reading Path

If your task is about language-specific work outside the dedicated heavy engines, read in this order:

1. `language-specialists/INDEX.md`
2. `language-specialists/language-specialists.md`
3. then route into:
   - `cross-platform-development/INDEX.md` if the real issue is platform/support strategy
   - `platform-infrastructure.md` if the real issue is workflow/tooling/platform governance
   - `rust-coding-engine/SKILL.md` or `typescript-coding-engine/SKILL.md` if the task is actually heavy-engine core work

---

## Why This Bridge Exists

Historically, `developer-tool` carried broad absorbed summaries at the top level.
As the doctrine tree matured, several topics were promoted into category lanes with their own `INDEX.md` entrypoints.

`language-specialists/` is now one of those lanes.

This bridge exists so that:
- older references do not break
- historical maps in `SKILL.md` remain readable
- readers are redirected into the stronger canonical lane instead of the older top-level summary shape

---

## Rule

Do not treat this top-level file as the language-specialist source of truth.
Treat it as a pointer.

The canonical doctrine now lives under:
- `references/language-specialists/INDEX.md`
- `references/language-specialists/language-specialists.md`
