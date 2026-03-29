# Searchable Skill Distribution Patterns

## Purpose

Define the canonical doctrine for skill distribution systems that install structured knowledge into a project and make it searchable at runtime.

This document distills the strongest reusable lessons from donor systems that combine:
- portable skill bundles
- searchable data stores
- local scripts
- automatic config injection into coding environments

## Source Provenance

- **Primary source:** current `developer-tool` tool-ecosystem doctrine subtree
- **Derived from:** searchable-skill delivery, project-local installation, and retrieval-surface canonization work
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local skill-distribution doctrine aligned to the current developer-tool engine

---


---

## Core Rule

A skill distribution system is not only about content.
It is about delivery, retrieval, and activation inside the user's actual environment.

The most reusable value comes from the combination of:
- structured knowledge stores
- local search scripts
- environment-aware installation
- predictable workflow injection

---

## Pattern 1 — Install into the Project, Not into Abstraction Space

A good distribution system lands its knowledge inside the active project environment.

Examples of useful landing zones:
- `.claude/skills/`
- equivalent editor/runtime skill locations
- project-local config files that point the agent toward the installed skill set

This matters because project-local installation makes:
- the knowledge discoverable
- the activation local and explicit
- the system easy to inspect and remove

---

## Pattern 2 — Structured Searchable Knowledge Stores

Donor systems with CSV- or table-like knowledge stores reveal an important pattern:
- a skill does not have to be a monolithic prose blob
- it can be backed by structured knowledge stores plus search scripts

This supports:
- domain routing
- fast targeted retrieval
- architecture generation from multiple knowledge domains
- lower context cost than giant markdown manuals

That is a highly reusable doctrine lesson for `developer-tool`.

---

## Pattern 3 — Search Engine as Runtime Support, Not Doctrine Center

A local search engine can be a powerful runtime support surface.
But the search engine itself is not the doctrine center.

Correct model:
- structured data holds searchable entries
- search engine retrieves candidates
- doctrine explains how and when to use the results

This mirrors our general shell law:
- runtime support is not the same as canonical doctrine

---

## Pattern 4 — Domain Auto-Detection Is High-Leverage

A smart skill distribution system can infer:
- likely domain
- likely stack
- likely architecture lane

before exhaustive prompting begins.

This is valuable because it reduces friction.
But it should remain:
- transparent enough to inspect
- bounded enough to correct
- conservative enough not to misroute silently

---

## Pattern 5 — Architecture Generation from Multi-Domain Search

A particularly strong donor pattern is the ability to combine:
- patterns
- packages/crates
- error handling
- architecture models
- tooling recommendations

into one architecture recommendation surface.

This is not just “search and summarize”.
It is structured synthesis over multiple domains.

That is a useful control-plane lesson for `developer-tool`, especially for future init/scaffold or architecture-routing workflows.

---

## Pattern 6 — Cross-Platform Skill Delivery

A portable distribution system should not hard-bind itself to one editor or harness.

Instead it should:
- support multiple target platforms
- adapt installation layout to the host
- keep the core knowledge structure stable

This is a strong pattern for `developer-tool`, since it also operates across runtime/harness surfaces.

---

## Pattern 7 — Local Search Has a Cost Advantage

Local structured search avoids many of the costs of fully remote retrieval systems.

Advantages:
- offline usage
- low-latency retrieval
- easy project-local customization
- no mandatory API dependency for basic search

The doctrine lesson is not that remote systems are bad.
It is that local search is strategically attractive for some plugin shells.

---

## Why This Matters to `developer-tool`

This donor family strengthens the doctrine around:
- search-backed skill delivery
- project-local installation patterns
- local structured retrieval
- architecture generation from small composable knowledge stores

Those are all core concerns for a tooling control-plane engine.
