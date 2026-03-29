# Canonical Runtime Patterns

## Purpose

Define the core runtime patterns that belong in the `developer-tool` shell after donor curation.

## Source Provenance

- **Primary source:** current `developer-tool` tool-ecosystem doctrine subtree
- **Derived from:** plugin-first shell architecture and runtime-pattern canonization work
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local runtime-pattern doctrine aligned to the current developer-tool engine

---


## Pattern 1 — Doctrine First, Runtime Second

The system must prefer:
1. canonical doctrine
2. runtime shell surface
3. donor reservoir only if needed

This prevents plugin shells from becoming confused donor mirrors.

## Pattern 2 — Prime / Route / Audit

The shell's first-wave commands should stay inside three classes:
- `prime`
- `route`
- `audit`

This is deliberate.
It keeps the shell operational without becoming bloated too early.

## Pattern 3 — Light Hooks, Heavy References

Hooks should stay light in wave 1.
Heavy complexity belongs in references and bounded agents, not in global lifecycle interception.

## Pattern 4 — Specialist Agents, Not Generalist Swamps

Agents should own narrow shell reasoning:
- plugin audit
- shell safety
- tooling integration
- memory diagnosis

If an agent starts trying to explain the whole engine, doctrine has not been curated enough.

## Pattern 5 — Optional MCP

MCP belongs only where it brings leverage.
It is not a badge of seriousness.
