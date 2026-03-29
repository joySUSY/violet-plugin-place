# Component Model

## Purpose

Decide the correct component type for a capability inside a plugin-first heavy engine.

This document prevents a common anti-pattern:

> stuffing every new idea into the wrong shell surface

## Source Provenance

- **Primary source:** current `developer-tool` tool-ecosystem doctrine subtree
- **Derived from:** component-selection and plugin-surface-boundary canonization work
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local component-model doctrine aligned to the current developer-tool engine

---

---

## Core Rule

Choose the smallest surface that preserves the capability correctly.

Do not default everything to:

- a skill
- a command
- an agent
- a hook
- an MCP server

Each surface owns a different kind of behavior.

---

## Surface Selection Table

| Surface         | Use When                                                             | Avoid When                                                            |
| --------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `skills/`       | knowledge must be loadable, reusable, and the first routing step     | the capability is mainly lifecycle automation or explicit user action |
| `commands/`     | user needs a named, explicit workflow entrypoint                     | the capability is only background doctrine                            |
| `agents/`       | specialized isolated reasoning is useful                             | the capability is just a doc or a simple explicit workflow            |
| `hooks/`        | lifecycle timing materially improves correctness or continuity       | the capability can be handled by explicit commands or bridge skills   |
| `rules/`        | the behavior must be fixed, deterministic, and non-negotiable        | the content is exploratory or example-heavy                           |
| `references/`   | the content is deep, explanatory, or too large for a bridge skill    | the capability needs active runtime behavior                          |
| `modules/`      | the bundle is too rich for one page and deserves a curated subdomain | the material is small enough to live in one doctrine doc              |
| `optional-mcp/` | external tool/data/service leverage is real and repeated             | the need is rare, speculative, or already handled by simpler surfaces |

---

## Decision Heuristics

### Choose `skills/` when

- the engine needs a reusable bridge into a doctrinal lane
- the capability is primarily pull-based
- it should be easy for the agent to load deliberately
- it helps classify a task before action begins

### Choose `commands/` when

- the user is likely to invoke the behavior explicitly
- the workflow benefits from a named operational entrypoint
- the behavior should be repeatable and discoverable

Examples:

- `prime/*`
- `route/*`
- `audit/*`

### Choose `agents/` when

- the reasoning is specialist and bounded
- isolated context helps more than it hurts
- the output is a diagnosis, review, or targeted recommendation

### Choose `hooks/` when

- timing matters more than explicit invocation
- the shell must prime, preserve, or review automatically
- the automation can be kept narrow and conservative

### Choose `rules/` when

- a shell law must be frozen
- a pattern must be treated as deterministic guidance
- the system needs a stable constraint reference

### Choose `references/` when

- the content is too large or nuanced for bridge skills
- the material is explanatory or case-study heavy
- the runtime surface only needs to point into it

### Choose `modules/` when

- multiple donors collapse into one coherent subdomain
- a single page would become unmanageable
- the material needs staged integration rather than immediate flattening

### Choose `optional-mcp/` when

- the shell would repeatedly benefit from external retrieval or structured tool/data access
- the capability materially improves runtime behavior
- graceful degradation is still possible without MCP

---

## Wrong Mappings

### Wrong: everything becomes a skill

This creates passivity, bloated `SKILL.md` files, and poor runtime discoverability.

### Wrong: everything becomes a command

This creates command sprawl and moves doctrine into operational surfaces.

### Wrong: everything becomes a hook

This creates noise, hidden automation, and unpredictable lifecycle behavior.

### Wrong: every repo gets its own module immediately

This recreates donor sprawl inside the runtime shell.

---

## Correct Pattern for Heavy Engines

The healthy default for a heavy engine is:

- `skills/` for routing and reusable loadable knowledge
- `commands/` for explicit operations
- `agents/` for specialist reasoning
- `hooks/` for conservative lifecycle support
- `rules/` for frozen shell laws
- `references/` for deep doctrine
- `modules/` only when the subdomain truly needs a larger container

This balance is what keeps plugin-first from becoming chaos-first.
