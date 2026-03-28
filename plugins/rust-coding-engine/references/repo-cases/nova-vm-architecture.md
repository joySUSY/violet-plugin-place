# Nova VM Architecture Patterns

## Purpose

Capture the reusable architecture lessons from `nova-main` as canonical doctrine inside `rust-coding-engine`.

This is not a repo mirror and not a generic “VM notes” page.
It is a **cross-domain runtime case study**.

## Source Provenance

- **Local donor path:** `New_part_ref/nova-main/`
- **Verified homepage:** `https://trynova.dev/`
- **Verified repository:** `https://github.com/trynova/nova/`

These URLs were verified from local donor metadata (`New_part_ref/nova-main/Cargo.toml`) rather than inferred from memory.

---

## Why This Case Study Matters

`nova-main` is important because it is not a normal CRUD/backend/business-software Rust project at all.
It is a **language runtime / VM-style system** with data-oriented design pressure, GC pressure, handle/reference validity pressure, and future concurrency pressure.

That means it teaches Rust lessons that are easy to miss if you only study:
- services
- APIs
- database-heavy applications
- ordinary library design

It belongs in the engine because it expands Rust architectural thinking into a different systems domain.

---

## Core Positioning

This donor should be treated as:
- a **runtime-engine case study**
- a **data-oriented / ECS-adjacent architecture reference**
- a **lifetime-and-validity design case study**
- a **cross-domain systems pattern source**

It should **not** be treated as:
- a direct template for normal backend service structure
- a generic “advanced Rust” curiosity piece
- something that only matters if the user is writing a JavaScript engine

The value is broader than the product domain.

---

## Pattern 1 — Data-Oriented Core Layout

The donor explicitly emphasizes data-oriented design.

That matters because it shifts the architecture conversation from:
- “what are my modules?”

to also include:
- “how is my data laid out?”
- “what access pattern is natural?”
- “where does locality or handle stability matter?”

This is highly relevant to:
- runtimes
- ECS-like systems
- simulation and game systems
- compilers and interpreters
- high-performance in-memory engines

The deeper doctrine is:
> in systems-heavy Rust, architecture is partly about memory topology, not just module topology.

---

## Pattern 2 — Lifetime Branding as Runtime Boundary Enforcement

One of the strongest lessons in Nova is the use of lifetimes as **brands** to prevent mixing data from incompatible runtime instances.

That is a profoundly Rust-native architecture technique.

Instead of relying on comments or discipline alone, the type system can encode:
- “this value belongs to this runtime instance”
- “these values must not mix across engine boundaries”

That idea is much bigger than VM design.
It is a reusable pattern for any Rust system where identity and validity are scoped by an owning runtime.

---

## Pattern 3 — Validity Scopes Should Be Visible in Types

Nova's generation-scoped value thinking points to another deep Rust idea:

- some references are only valid while GC or mutation is impossible
- some operations may invalidate entire families of values
- if the runtime has these dangers, the type system should help make them visible

This is the architectural version of “make illegal states unrepresentable.”

In this case:
- illegal usage = using runtime values outside the validity scope that protects them

That is a very high-value Rust lesson.

---

## Pattern 4 — Stable Handles vs Transient Values

The donor implicitly distinguishes between:
- lightweight, transient values that are cheap inside safe scopes
- more stable heap/stack-indirected handles needed across runtime transitions

This is important because many systems projects get this wrong by pretending every value/reference can be treated the same way.

The reusable doctrine is:
- short-lived scoped references can be efficient
- long-lived or mutation-surviving handles often need explicit indirection
- API surfaces should reveal which category a value belongs to

This matters in:
- GC runtimes
- ECS worlds
- graph engines
- handle-based game/editor systems
- foreign-resource wrappers

---

## Pattern 5 — RAII as Operational Boundary, Not Just Resource Cleanup

The `Agent` wrapper idea highlights a good Rust systems pattern:
- use RAII wrappers to enforce runtime conditions and ownership boundaries
- not just to free memory or close files

This is significant because it shows how Rust can move architectural safety into object lifetimes and wrapper structure itself.

That is one reason Rust is so strong in systems domains with subtle validity constraints.

---

## Pattern 6 — Concurrency Readiness Must Be Honest

The donor is explicit that the heap is not yet thread-safe enough for the intended future concurrency goal.
That honesty is part of its value.

The lesson is:
- do not fake concurrency readiness
- do not promise thread-safety through vague aspiration
- if future concurrency is a roadmap goal, prepare the architecture deliberately without lying about current guarantees

This is healthier than either:
- premature parallelism
- or rigid single-thread design with no growth path

---

## Pattern 7 — Cross-Domain Relevance

Why does this belong in `rust-coding-engine` if the reader is not building a JS engine?

Because it teaches patterns that transfer to other Rust-heavy domains:
- ECS and simulation engines
- Bevy/data-oriented systems
- graph or state-machine runtimes
- language tools and compilers
- high-performance heap/handle designs
- long-lived runtime processes with mutation-sensitive values

So yes: this is a **cross-domain** donor, not just a niche VM curiosity.

---

## What Must Survive Donor Cleanup

If the donor repository is cleaned up later, the engine must still preserve these lessons canonically:

1. data-oriented layout is architecture
2. lifetime branding can encode runtime ownership boundaries
3. validity scopes should be explicit when mutation/GC can invalidate values
4. stable handles and transient values are not the same design problem
5. concurrency roadmaps should be architecturally honest
6. systems-Rust doctrine must include non-service domains

If those lessons are lost, we would regress to a narrower and weaker idea of what Rust architecture means.

---

## Cross-Links

This case study should cross-link to:
- `references/architecture/rust-advanced-systems-and-tooling.md`
- `references/repo-cases/case-study-governance.md`
- `modules/vm-architecture/`
- `modules/ecs/`

It is especially relevant as a bridge between runtime-engine design and ECS/data-oriented design.

---

## Final Doctrine

The reusable lesson is not:
> “build a VM like Nova.”

The reusable lesson is:
> “when your Rust system has runtime-scoped validity, heap-sensitive design, and future concurrency pressure, make those constraints first-class in the architecture rather than hiding them in comments and hope.”
