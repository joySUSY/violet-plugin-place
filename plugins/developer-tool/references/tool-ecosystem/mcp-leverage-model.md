# MCP Leverage Model

## Purpose

Define when MCP should be added to a heavy engine shell and when it should remain absent.

The goal is not “use MCP whenever possible”.
The goal is:

> use MCP when it meaningfully expands the engine's ability to act, search, inspect, or integrate.

## Source Provenance

- **Primary source:** current `developer-tool` tool-ecosystem doctrine subtree
- **Derived from:** MCP integration, optional-enhancement, and runtime-leverage canonization work
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local MCP doctrine aligned to the current developer-tool engine

---

---

## Core Rule

MCP is a leverage layer.
Not a prestige layer.

Add MCP only when at least one of these is true:

- the shell benefits from external structured search or retrieval
- the shell needs tool/data integration that plain files or scripts cannot provide cleanly
- the shell needs stable connection to a service boundary
- the shell needs diagram/design/doc/runtime interactions that are cumbersome otherwise

If none of the above is true, skip MCP.

---

## High-Leverage MCP Cases

### `developer-tool`

Strong candidates:

- docs/schema lookup
- history or memory indexing
- diagram generation
- structured external tooling bridges

### `deep-researcher`

Strong candidates:

- search backends
- documentation retrieval
- semantic search and evidence capture

### `dev-designer-utility`

Strong candidates:

- Figma/design extraction
- artifact generation
- visual pipeline integrations

### `rust-coding-engine`

Moderate candidates:

- crate/doc lookup
- repo introspection
- interop reference retrieval

### `typescript-coding-engine`

Moderate candidates:

- package/framework docs lookup
- config/schema analysis
- monorepo or toolchain introspection

---

## Low-Leverage MCP Cases

Do not introduce MCP just for:

- static doctrine pages
- simple internal guidance
- trivial routing that shell commands already cover
- problems that are already solved by stable references and bounded commands

---

## Shell Integration Rule

If MCP is introduced, it should sit as an **optional enhancement surface**.

Correct posture:

- shell still works without MCP
- doctrine remains readable without MCP
- commands and agents can optionally escalate into MCP

Incorrect posture:

- shell becomes unusable without MCP
- doctrine assumes MCP is always present
- users lose basic workflows when MCP is unavailable

---

## Decision Questions

Before adding MCP, answer:

1. What exact runtime capability does MCP unlock?
2. Is that capability central or merely convenient?
3. Can the same result be achieved with simpler shell surfaces?
4. Will MCP reduce cognitive load or increase it?
5. Can the shell degrade gracefully if MCP is unavailable?

If questions 1 and 5 are weak, defer MCP.

---

## Recommended Default

For wave 1 and wave 2:

- keep MCP optional in heavy-engine shells
- only add it where the payoff is obvious and repeated

This keeps the shell robust, portable, and conservative.
