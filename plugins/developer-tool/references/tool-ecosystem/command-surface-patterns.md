# Command Surface Patterns

## Purpose

Define the canonical command design posture for heavy engine shells.

This document answers:

- what kinds of commands should exist early
- what commands should own
- what commands should not become

---

## Source Provenance

- **Primary source:** current `developer-tool` tool-ecosystem doctrine subtree
- **Derived from:** command-surface, explicit-workflow, and shell-operational-entrypoint canonization work
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local command doctrine aligned to the current developer-tool engine

---

## Core Rule

A command should be an explicit operational doorway.
Not a doctrine dump.
Not a hidden automation script.

---

## The Three Foundational Families

### 1. `prime/`

Use when the engine needs to establish the correct doctrinal posture before work begins.

Examples:

- `prime/tool-runtime`
- `prime/memory-surface`
- `prime/rust-foundations`
- `prime/ts-foundations`

**Owns:**

- startup posture
- doctrinal lane selection
- pre-action context framing

### 2. `route/`

Use when the current task must be classified into one correct lane.

Examples:

- `route/choose-tool-surface`
- `route/choose-concurrency-pattern`
- `route/choose-runtime-validation`

**Owns:**

- explicit routing choices
- selection logic
- narrowing a problem into a doctrinal lane

### 3. `audit/` or `diagnose/`

Use when the system needs inspection instead of immediate action.

Examples:

- `audit/plugin-structure`
- `diagnose/borrow-checker`

**Owns:**

- bounded diagnosis
- bounded review
- operational checks against shell laws

---

## What Commands Should Not Do

### Not full doctrine

If the content is long-lived conceptual truth, it belongs in `references/` or `rules/`, not in commands.

### Not giant workflows by default

A command may orchestrate a workflow, but if it becomes a sprawling pseudo-manual, the shell is mixing command and doctrine roles.

### Not hidden hooks in disguise

If the command should really be lifecycle-triggered, make that explicit in hooks instead of pretending the command is just a note.

---

## Good Command Qualities

A good shell command is:

- explicit
- repeatable
- bounded
- easy to name
- easy to discover
- clearly mapped to one primary surface

A good command says:

- what it primes/routes/audits
- what it needs next
- what it refuses to do prematurely

---

## Heavy Engine Rule

For heavy engines, do not start with dozens of commands.
Start with the minimum stable operational triangle:

- `prime`
- `route`
- `audit` / `diagnose`

Expand later only after real repeated patterns emerge.

---

## Integration Rule

Commands should usually point into:

- a bridge skill
- a doctrine page
- a bounded specialist agent

They should not bypass those layers casually.

That is how the shell stays coherent as it grows.
