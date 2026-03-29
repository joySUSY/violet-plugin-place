# Directory Structure Laws

## Purpose

Freeze the filesystem laws for plugin-first heavy engines.

The point is not aesthetic tidiness.
The point is to preserve runtime clarity, doctrine clarity, and portability.

## Source Provenance

- **Primary source:** current `developer-tool` tool-ecosystem doctrine subtree
- **Derived from:** plugin-directory, manifest-placement, and cleanup-safe shell-structure canonization work
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local directory-law doctrine aligned to the current developer-tool engine

---

---

## Law 1 — Manifest Lives Under `.claude-plugin/`

`plugin.json` belongs in:

```text
.claude-plugin/plugin.json
```

Not at root.
Not in `config/`.
Not duplicated elsewhere.

---

## Law 2 — Runtime Component Directories Live at Plugin Root

The primary runtime component directories should live at root level:

```text
commands/
agents/
skills/
hooks/
rules/
references/
modules/
```

This keeps discovery and maintenance straightforward.

---

## Law 3 — Doctrine and Runtime Must Be Separable by Path

A person or future agent should be able to tell by path whether a file is:

- doctrine
- runtime
- donor
- transitional staging

If the path layout hides this distinction, the shell is already drifting.

---

## Law 4 — `skills/` Use Subdirectories, Not Flat Blobs

Heavy engines should prefer:

```text
skills/domain-name/SKILL.md
```

rather than a flat pile of many unrelated markdown files.

This helps preserve:

- topic boundaries
- future expansion room
- reference adjacency

---

## Law 5 — Hooks Need Their Own Script Space

If hooks use command scripts, keep them under:

```text
hooks/scripts/
```

This makes lifecycle logic:

- discoverable
- replaceable
- auditable

---

## Law 6 — `references/` Must Be Curated, Not Dumped

`references/` is the doctrine reservoir inside the shell.
It must contain:

- curated doctrine
- extracted case-study lessons
- stable deep-dive docs

It must not become:

- a raw donor repo clone
- a random attachment pile
- an unindexed graveyard

---

## Law 7 — `modules/` Are for Heavy Subdomains, Not Every Topic

Use `modules/` when a subdomain is too large for one flat doctrine page.
Do not create modules preemptively for tiny capabilities.

Good reasons:

- large repo case-study synthesis
- interop family
- ecosystem family
- framework family

Bad reasons:

- “maybe this will grow later”
- “the donor repo had a folder so we made one too”

---

## Law 8 — Optional MCP Must Stay Optional by Structure

If MCP is introduced, keep it visibly optional:

```text
optional-mcp/
```

or equivalent clearly bounded location.

Do not bury MCP assumptions so deeply that the shell becomes unusable without it.

---

## Law 9 — Use `${CLAUDE_PLUGIN_ROOT}` for Runtime Paths

All shell runtime path references should behave as relocatable infrastructure.
This is especially important for:

- hook commands
- script references
- local shell actions

---

## Law 10 — Donor Trees Stay Upstream

If a donor repo still exists, it should stay clearly upstream.
A heavy engine shell should absorb **lessons**, not mirror **trees**.

That means:

- source repo kept as reservoir
- doctrine rewritten into references/modules/rules
- runtime shell only exposes curated surfaces

---

## Practical Test

A shell passes the directory-structure test if:

- you can explain each top-level directory in one sentence
- you can tell doctrine from runtime from donors by path alone
- you can remove donor access temporarily and the shell still makes sense

If not, the structure is still muddy.
