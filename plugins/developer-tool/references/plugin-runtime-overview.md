# Plugin Runtime Overview

## Purpose

Define the canonical runtime-shell doctrine for the `developer-tool` engine.

This document explains what a heavy-engine plugin shell is supposed to do, what it must never try to do, and how it should behave as the operational layer wrapped around deeper doctrine.

It is a root runtime note, not the full doctrine tree.
It exists to answer one key question:

> what is the plugin shell itself responsible for, once doctrine, donors, commands, agents, hooks, rules, and references all coexist in one engine?

## Source Provenance

- **Primary source:** current `developer-tool` plugin shell and canonical doctrine tree
- **Derived from:** plugin-first shell architecture work, tool-ecosystem doctrine passes, and runtime boundary decisions during heavy-engine shell creation
- **Upstream URL:** not applicable as a synthesized local runtime doctrine note
- **Freshness status:** canonical local runtime overview aligned to the current developer-tool shell model

---

## Core Rule

The plugin shell is the **runtime coordination layer** for a heavy engine.

It should:
- activate the right doctrinal lane
- route tasks into the correct surface
- preserve lifecycle continuity where appropriate
- expose explicit operational entrypoints
- keep the runtime easier to navigate than the donor universe behind it

It should **not** try to become:
- the donor archive
- the entire doctrine tree duplicated again
- an opaque automation blob that hides where decisions come from

A good shell makes the right path easier than the wrong one.

## Runtime Responsibilities

The shell owns:
- activation
- routing
- lifecycle surfaces
- explicit commands
- specialist agents
- shell laws
- the practical boundary between user-triggered operations and deep doctrine

These are runtime concerns, not merely documentation concerns.
They determine how the engine behaves when actually used.

## Non-Runtime Responsibilities

The shell does **not** own:
- raw donor archives
- full doctrine duplication
- arbitrary language-specialist knowledge
- indiscriminate automation

The shell should point to doctrine.
It should not try to absorb doctrine into every operational file.

## Runtime Surface Model

| Surface | Runtime Job |
|---|---|
| `skills/` | loadable bridge knowledge and first routing surfaces |
| `commands/` | explicit operational entrypoints |
| `agents/` | bounded specialist reasoning |
| `hooks/` | lifecycle-timed automation kept conservative |
| `rules/` | deterministic runtime constraints and shell laws |
| `references/` | deep doctrine that runtime surfaces point into |
| `modules/` | large integrated subdomains that are too rich for one flat page |

This model matters because runtime confusion often begins when these surfaces blur together.

## Operating Model

1. classify the task
2. choose the right developer-tool surface
3. route to canonical doctrine
4. expose only the runtime surface actually needed
5. preserve continuity/handoff state when lifecycle requires it

This means the shell is not merely a static file tree.
It is a controlled runtime choreography layer.

## Pattern 1 — Doctrine First, Shell Second

The shell exists to operationalize doctrine, not to replace it.

Correct flow:

`source reservoir -> curated doctrine/reference -> runtime shell surface`

That keeps the engine:
- teachable
- reviewable
- cleanup-safe
- easier to refactor later

When the shell starts looking like a donor mirror, the boundary has failed.

## Pattern 2 — Prime / Route / Audit Is the Core Runtime Triangle

For a heavy engine, a strong runtime usually begins with three command families:

### Prime
Load the right doctrinal posture before action.

### Route
Choose the correct lane or surface before implementation.

### Audit / Diagnose
Inspect the system when uncertainty or review pressure is central.

This triangle is powerful because it gives the runtime:
- an entry posture
- a path-selection posture
- a review posture

without requiring a command explosion too early.

## Pattern 3 — Hooks Should Stay Conservative Until Proven Otherwise

Hooks are powerful, but easy to misuse.

A good runtime posture prefers lightweight lifecycle hooks first, especially:
- `SessionStart`
- `PreCompact`
- `Stop`

The shell should avoid turning hooks into a hidden second application unless there is clear evidence that stronger automation is needed and safe.

## Pattern 4 — Agents Should Stay Specialist, Not Omniscient

Agents are valuable when they do bounded runtime reasoning.

Good agent roles:
- diagnose
- audit
- review
- integrate
- route

The shell is healthier when agents are sharp tools, not soft swamps.

## Canonical Cluster Behind This Runtime

For the doctrine cluster that the runtime shell should point into first, see:
- `tool-ecosystem/INDEX.md`
- `tool-ecosystem/core-shell-patterns.md`
- `tool-ecosystem/component-model.md`
- `tool-ecosystem/directory-structure-laws.md`
- `tool-ecosystem/command-surface-patterns.md`
- `tool-ecosystem/hook-runtime-patterns.md`
- `tool-ecosystem/lifecycle-hook-posture.md`
- `tool-ecosystem/mcp-leverage-model.md`
- `tool-ecosystem/validation-audit-patterns.md`

## Shell Quality Bar

A good plugin shell should make the correct surface easier to use than the wrong one.

It should also keep doctrine, runtime, and donor reservoirs visibly distinct.

## Final Doctrine

The reusable lesson is not:
> “the plugin shell activates commands, agents, and hooks.”

The reusable lesson is:
> “the heavy-engine plugin shell is the runtime coordination layer that makes the correct doctrinal surface easier to reach, the correct lifecycle behavior easier to preserve, and the donor universe easier to contain.”
