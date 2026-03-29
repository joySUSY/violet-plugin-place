# Result-First Multi-Surface Handlers

## Purpose

Define the canonical doctrine for tool runtimes that separate pure handler logic from CLI/MCP/API adapters and prefer `Result`-first execution over exception-driven opacity.

This document distills one of the strongest tooling architecture patterns in the donor set.

## Source Provenance

- **Primary source:** current `developer-tool` tool-ecosystem doctrine subtree
- **Derived from:** transport-agnostic handler, result-first execution, and multi-surface adapter canonization work
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local handler doctrine aligned to the current developer-tool engine

---

---

## Core Rule

Domain logic should not care whether it is being invoked from:

- a CLI
- an MCP tool
- an HTTP API
- another runtime surface

That logic should live in a handler or equivalent unit that remains transport-agnostic.

Adapters then become thin translation layers.

---

## Pattern 1 — One Handler, Many Surfaces

The most powerful donor pattern here is:

- write the core handler once
- expose it through multiple surfaces
- keep each surface thin

This creates three major benefits:

1. less duplication
2. more consistent behavior across surfaces
3. easier testing of the actual logic

For a tooling control plane, this is gold.

---

## Pattern 2 — Result Over Exceptions

A `Result`-first posture makes failure explicit.

Why this matters:

- CLI surfaces need exit-code mapping
- MCP surfaces need structured tool errors
- HTTP/API surfaces need typed status behavior
- logging/audit layers need predictable failure envelopes

If failure is implicit and exception-driven, each adapter becomes noisier and more fragile.

---

## Pattern 3 — Tagged Error Taxonomy

A strong runtime system gives errors machine-meaningful categories.

That supports:

- better exit-code mapping
- better HTTP status mapping
- more deterministic audit behavior
- easier shell and command ergonomics

The important lesson is not the exact implementation syntax.
The lesson is that error taxonomy should be explicit and adapter-friendly.

---

## Pattern 4 — Tiered Package Architecture

The donor pattern of:

- foundation layer
- runtime layer
- tooling layer

is highly reusable.

It keeps:

- stable contracts low in the stack
- more volatile runtime surfaces in the middle
- scaffolding and developer-facing tooling at the top

That same tiering logic can guide future `developer-tool` module structuring.

---

## Pattern 5 — Runtime Surfaces Need Shared Contracts

If multiple surfaces wrap the same handler, they need shared contracts for:

- success shape
- error shape
- input parsing
- hints or metadata
- logging or tracing boundaries

Without shared contracts, a multi-surface system slowly forks itself.

This is exactly the kind of fragmentation `developer-tool` must prevent.

---

## Pattern 6 — Thin Adapters, Rich Core

Adapters should handle:

- input extraction
- output formatting
- transport-specific envelopes
- boundary-specific metadata

They should not own:

- domain decisions
- business logic
- deep orchestration logic

That belongs in the handler/core layer.

---

## Pattern 7 — Human and Agent Both Matter

The donor runtime is explicitly trying to serve:

- humans
- machine consumers
- multiple runtime surfaces

That is a crucial doctrine lesson.

A tooling system meant for agents still benefits from:

- predictable outputs
- structured error surfaces
- explicit modes
- transport-agnostic logic

This is not agent-first **versus** human-friendly.
It is agent-ready **and** human-usable.

---

## Why This Matters to `developer-tool`

This donor family strengthens `developer-tool` in four places:

- CLI/command doctrine
- MCP integration doctrine
- error and result surface doctrine
- future modular runtime package boundaries

It is one of the best examples of how a heavy engine can support many surfaces without collapsing into transport-specific duplication.
