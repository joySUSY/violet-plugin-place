# Rust ECS and Data-Oriented Architecture

## Purpose

Define the canonical Rust posture for ECS and data-oriented architecture inside `rust-coding-engine`.

This document distills reusable lessons from:
- Bevy-focused ECS donors
- general ECS donors
- cross-domain case-study lessons from runtime-scale systems

---
## Source Provenance

- **Primary donor families:** `bevy`, `bevy-ecs`, `bevy-ecs-expert`, `ecs`, `ecs (1)`
- **Key local donor materials:**
  - `bevy/bevy/SKILL.md`
  - `bevy-ecs/bevy-ecs/SKILL.md`
  - `bevy-ecs-expert/SKILL.md`
  - `ecs/ecs/SKILL.md`
  - `ecs (1)/ecs/SKILL.md`
- **Upstream URL:** not yet verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending

---



## Core Rule

ECS is not “object-oriented code with different syntax.”
It is a different architecture model built around:
- data locality
- decomposition into focused components
- systems as transformations
- explicit scheduling and query behavior

The doctrinal lesson is:
> in data-oriented Rust, architecture is shaped by memory layout, query patterns, and system boundaries—not by method ownership alone.

---

## Pattern 1 — Components Are Data, Systems Are Behavior

A strong donor lesson is the strict separation between:
- **components** as focused data
- **systems** as logic operating over queries
- **resources** as carefully bounded global state

This separation is what gives ECS its leverage.

The anti-pattern is trying to smuggle object-style behavior back into components, turning them into miniature classes with hidden logic.

---

## Pattern 2 — Keep Components Focused and Composable

Small, focused components are one of the most reusable ECS principles.

Why:
- they reduce wasted memory
- they improve composability
- they make queries more expressive
- they let entities carry only the data they actually need

The lesson is:
- prefer many small semantic components over monolithic stat bags
- let composition express capability

---

## Pattern 3 — Systems Need Explicit Ordering and Scheduling Intent

A mature ECS architecture does not assume the scheduler will magically understand business dependencies.

System design should answer:
- what depends on what
- what can run in parallel
- what must be chained or staged
- what should react only on change

This is why change detection, ordering, and schedule structure are architectural concerns—not just performance tweaks.

---

## Pattern 4 — Queries Encode Architecture Pressure

Queries are not merely retrieval APIs.
They reveal how the architecture is shaped.

A healthy ECS system asks:
- are we querying too broadly?
- are filters precise enough?
- are systems walking more entities than they need?
- are we relying on change detection and filtering effectively?

The deeper lesson is:
- query shape is part of architecture quality
- not just implementation detail

---

## Pattern 5 — Shared World Truth Can Be Powerful

Across the donor set, ECS/world-model systems are strongest when the world acts as a true shared source of truth for multiple consumers.

Examples of consumers:
- rendering
- validation
- AI/simulation
- networking sync
- export or serialization pipelines

This is why ECS is often more than a gameplay pattern.
It can become the architecture for any domain where many consumers need consistent, queryable state.

---

## Pattern 6 — Data-Oriented Architecture Has Cross-Domain Value

ECS/data-oriented architecture matters beyond games.
The donor set shows value for:
- simulations
- runtimes and VM-like systems
- sync-heavy worlds
- editor/tooling systems
- spatial or graph-like state systems

So the doctrine should not teach ECS as “only for game logic.”
It is a broader Rust systems pattern.

---

## Pattern 7 — Networked or Mirrored ECS Requires Boundary Discipline

The non-Bevy ECS donors show another important pattern:
- server and client worlds may both exist
- synchronization requires explicit serialization/configuration discipline
- entity/component boundaries must stay intelligible across the wire

That means ECS architecture is not finished when the world model works locally.
If the system is synchronized across processes or runtimes, serialization and sync become first-class architecture concerns.

---

## Pattern 8 — ECS and Data-Oriented Architecture Have a Cost Profile

The doctrine should also stay honest about the trade-offs.

ECS/data-oriented architecture helps when:
- many similar entities exist
- queries and parallelism matter
- shared world truth is valuable
- change detection and spatial locality matter

It is often not worth the complexity when:
- the domain has few entities
- state shape is simple and static
- object-style or service-style architecture is clearer
- query/scheduling overhead brings little benefit

The lesson is not “ECS is better.”
The lesson is “ECS is powerful under the right pressure profile.”

---

## Why This Matters to `rust-coding-engine`

This doctrine strengthens the engine's ability to teach:
- data-oriented decomposition
- ECS as architecture rather than syntax
- scheduling/query discipline
- shared world truth patterns
- when ECS is worth the cost and when it is not
