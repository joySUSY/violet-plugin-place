# Clean and Hexagonal Workspace Rust Patterns

## Purpose

Capture the reusable architecture lessons from clean/hexagonal Rust donors such as:
- `clean-architecture-with-rust-master`
- `implementing-hexagonal-axum`

This document is intentionally written as **replacement-grade doctrine** rather than a quick repo summary, because the donor repositories are expected to become cleanup candidates only after their knowledge is fully absorbed.

## Source Provenance

- **Primary local donor path:** `New_part_ref/clean-architecture-with-rust-master/`
- **Secondary local donor path:** `New_part_ref/implementing-hexagonal-axum/implementing-hexagonal-axum/`
- **Upstream URL:** not yet verified from local artifacts in the current workspace

### Why this section exists

If the donor reservoir is cleaned up later, this doctrine must still preserve where the source came from and whether the upstream origin was fully verified.

When upstream metadata is not present in local artifacts, do not invent it.
Record the local donor path explicitly and mark the upstream URL as unverified until confirmed.

---

## Why This Case Study Matters

This donor family is important because it demonstrates a Rust system that tries to keep three things true at once:

1. **inward dependency discipline**
2. **multi-surface delivery**
3. **separate crates for real architectural circles**

That makes it far more valuable than a toy example of ports-and-adapters.
It is a living example of what happens when clean architecture is pushed into:
- CLI delivery
- web delivery
- desktop delivery
- storage adapters
- JSON/API boundaries

---

## Core Rule

The most important invariant is the dependency rule:

> source dependencies point inward

That means:
- domain does not know infrastructure
- application/use-case logic does not depend on delivery technology
- adapters and outer systems translate inward, not the reverse

This rule matters more than the exact crate names.

---

## Architectural Shape Extracted from the Donor

The donor organizes circles roughly like this:
- `domain`
- `application`
- `adapter`
  - `json-boundary`
- `infrastructure`
  - `cli`
  - `db`
  - `desktop-egui`
  - `web`
    - `web-app`
    - `web-server-warp`

The reusable lesson is not that every project must use these exact names.
The lesson is:
- make circles visible
- make dependency direction inspectable
- separate transport/storage concerns from business meaning

---

## Pattern 1 — Architectural Circles Can Justify Separate Crates

For small systems, separate crates for every circle may be too heavy.
For larger systems, they can be extremely useful because they make the dependency rule more explicit.

A mature Rust engine should therefore teach:

### Use separate crates when
- multiple outer delivery surfaces exist
- infrastructure complexity is real
- domain/application purity is a long-term goal
- tests and replacement of adapters matter

### Avoid full circle-per-crate ceremony when
- the system is still small
- there is only one delivery surface
- boundaries are not yet under real pressure
- the architectural cost exceeds the actual complexity

The donor is valuable because it shows the **upper-bound pattern**, not because it should be cloned into every service.

---

## Pattern 2 — Delivery Surfaces Must Stay Thin

A recurring strength of this donor family is that outer layers act as:
- controllers
- handlers
- presenters
- boundary mappers
- transport wrappers

Their role is translation.
Not business invention.

This matters because many projects claim “clean architecture” while quietly placing business decisions in:
- HTTP handlers
- DB repositories
- serialization models
- GUI callbacks

The donor reminds us that if the outer layer is making core decisions, the circles are already broken.

---

## Pattern 3 — Boundary Models Are Worth Their Own Layer

The donor uses boundary-focused translation layers such as JSON-facing models and presenter logic.
That is an important Rust lesson:

- transport models are not domain models
- persistence rows are not domain entities
- UI view models are not business truth

Rust benefits from this separation because the type system makes those transitions explicit and reviewable.

This is especially valuable when:
- serialization shapes drift
- API contracts change
- UI-facing representation differs from domain language
- infra models contain noise that should not leak inward

---

## Pattern 4 — Multi-Surface Delivery Is a Real Stress Test

This donor family is strong because it is not just “hexagonal in theory”.
It shows what happens when the same core must serve:
- CLI
- web server
- desktop UI
- web app/browser surface
- storage backends

That is exactly where architectural slogans are usually exposed.

A useful doctrine lesson is:
- if your architecture cannot survive multiple delivery surfaces, it was probably only clean on paper

---

## Pattern 5 — Infrastructure Variants Belong Outside the Core

The donor uses separate infrastructure surfaces for:
- DB
- CLI
- desktop
- web

This teaches an important idea for Rust systems:

> infrastructure variance is a feature of the outside world, not a property of the domain.

That means a good core should not need to know:
- whether data came from Warp or Axum or CLI args
- whether it was persisted in-memory or in files or in a database
- whether the UI is desktop or browser-facing

That is the whole point of the circles.

---

## Pattern 6 — Clean Architecture Has a Cost Profile

The donor is valuable partly because it makes the cost visible.
A clean/hexagonal Rust system usually adds:
- more crates/modules
- more translation layers
- more explicit interfaces
- more type duplication at boundaries

Those costs are not bugs.
They are trade-offs.

The doctrine should therefore teach:
- use this architecture when boundary pressure justifies it
- do not cargo-cult the full structure into small systems
- keep the dependency rule, even if the layering is lighter in simpler projects

In other words:
- **copy the principle first**
- **copy the crate granularity only when scale deserves it**

---

## Pattern 7 — Hexagonal Axum Is a Practical Bridge Pattern

The `implementing-hexagonal-axum` donor is especially valuable because it turns the abstract clean-architecture idea into an Axum-era Rust service pattern.

That gives us a practical bridge:
- HTTP boundary stays thin
- use cases orchestrate behavior
- repositories stay behind traits/ports
- infrastructure adapters remain outer

This is one of the best ways to teach clean/hexagonal architecture to Rust developers who are building real services, not studying architecture in a vacuum.

---

## Pattern 8 — What Must Survive Donor Cleanup

Because these donors are intended to become cleanup candidates later, the engine must retain at least these lessons canonically:

1. **Dependency rule** is the true invariant
2. **Crate-per-circle** is an option, not a mandatory religion
3. **Thin delivery adapters** are non-negotiable in real clean architecture
4. **Boundary models** deserve their own layer when transport/storage/UI shapes diverge
5. **Multi-surface stress** is where architecture proves itself
6. **Architecture cost must be proportional to system pressure**

If those lessons are not preserved, then deleting the donor repos later would create a knowledge regression.

---

## Anti-Patterns This Case Study Helps Prevent

- calling any layered project “clean architecture” even when dependencies point outward
- putting domain decisions in HTTP or DB adapters
- forcing crate-per-circle structure on tiny utilities
- reusing transport or persistence models as domain truth
- hiding architecture debt behind framework glue

---

## Cross-Links

This case study should influence:
- `references/architecture/rust-architecture-and-scaffolding.md`
- `references/architecture/rust-axum-service-architecture-and-thin-adapters.md`
- `backend-dev`
- `planning-strategy`

It is also a bridge document between abstract architecture doctrine and concrete Axum-era implementation structure.

---

## Final Doctrine

The reusable lesson is not:
> “make four crates because the repo did.”

The reusable lesson is:
> “make dependency direction, boundary ownership, and delivery thinness mechanically obvious enough that the architecture remains honest under real delivery pressure.”
