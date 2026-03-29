# Core Shell Patterns

## Purpose

Define the canonical plugin-shell patterns that `developer-tool` considers correct for heavy engines.

This document synthesizes the lessons implied by:
- plugin runtime donors
- plugin structure best practices
- hook and command design patterns
- agent-first shell ergonomics

It is the doctrinal source behind the plugin-first move for heavy engines.

## Source Provenance

- **Primary source:** current `developer-tool` tool-ecosystem doctrine subtree
- **Derived from:** heavy-engine shell law and surface-separation canonization work
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local core-shell doctrine aligned to the current developer-tool engine

---


---

## Pattern 1 — One Engine, One Shell

A heavy engine should have one coherent plugin shell.

Correct:
- one core engine
- one plugin shell
- many internal surfaces (`skills`, `agents`, `hooks`, `commands`, `rules`, `references`, `modules`)

Incorrect:
- one donor repo becomes one plugin
- many mini-plugins splintering one engine domain
- one flat `SKILL.md` pretending to hold an entire runtime system

---

## Pattern 2 — Doctrine First, Runtime Second

A plugin shell is not the doctrine center.
It is the runtime shell around the doctrine center.

Correct flow:

`source reservoir -> curated doctrine/reference -> runtime shell surface`

This ensures:
- the shell stays lightweight enough to navigate
- the doctrine stays stable enough to teach
- donor repositories remain upstream evidence, not runtime truth

---

## Pattern 3 — Surface Separation

Every shell surface must justify its existence.

| Surface | Owns |
|------|------|
| `skills/` | first routing and reusable loadable knowledge |
| `agents/` | bounded specialist reasoning |
| `hooks/` | lifecycle-triggered runtime behavior |
| `commands/` | explicit user-triggered workflows |
| `rules/` | shell laws and deterministic constraints |
| `references/` | deep support material |
| `modules/` | large integrated subdomains |

A good shell is one where a task naturally falls into the right surface quickly.

---

## Pattern 4 — Prime / Route / Audit

For first-wave heavy engines, the shell should focus on three command families:

1. `prime`
   - establish the right doctrinal posture before action
2. `route`
   - choose the correct lane or architectural path
3. `audit`
   - inspect structure, boundaries, or runtime surface quality

This is the minimal stable operational triangle.
It provides leverage without building a command jungle too early.

---

## Pattern 5 — Light Hooks, Heavy References

Hooks are powerful, but expensive to misuse.

Wave-1 shell posture should be:
- lightweight `SessionStart`
- lightweight `PreCompact`
- lightweight `Stop`

Hooks should remind, prime, preserve, or validate boundaries.
They should not:
- crawl donors
- mutate large state
- replace doctrine
- block huge classes of work by default

---

## Pattern 6 — Specialist Agents, Not Generalist Swamps

Agents are for bounded shell reasoning.

Good agent roles:
- diagnose
- audit
- route
- review
- integrate

Bad agent roles:
- “explain the whole engine”
- “do everything related to tooling”
- “summarize the entire donor universe”

If an agent starts doing all of that, doctrine is not organized enough.

---

## Pattern 7 — Donor Complexity Determines Containment Pressure

The richer the donor structure, the more likely a plain skill is too weak a final container.

Signals of high containment pressure:
- repo donor with multiple runtime surfaces
- docs + commands + hooks + agents + config all present
- framework/runtime/toolchain boundaries intertwined
- lifecycle or environment behavior encoded in the source

When these signals stack up, the correct destination is typically a plugin shell for a heavy engine.

---

## Pattern 8 — Optional MCP, Not Mandatory MCP

MCP is not required to justify plugin-first.

Use MCP when it creates leverage through:
- external tools
- structured retrieval
- searchable indexes
- diagram generation
- design/doc/runtime integration

Do not use MCP because it feels sophisticated.

---

## Pattern 9 — Shell Quality Test

A shell is high quality when:
- the correct surface is easy to choose
- the doctrine remains canonical
- donors do not leak directly into runtime
- hooks stay conservative
- commands remain legible
- agents remain bounded
- later deep fusion becomes easier, not harder

---

## Immediate Application

This pattern set should guide:
- `developer-tool`
- `rust-coding-engine`
- `typescript-coding-engine`

and any future heavy engine that crosses the same containment threshold.
