# Rust Anti-Pattern Detection and Migration Ladders

## Purpose

Provide a canonical playbook for identifying common Rust anti-patterns and choosing structured migration paths out of them.

This is requirement-grade doctrine: the engine must not only teach “what good looks like,” but also how to recognize and escape recurring bad patterns.

## Source Provenance

- **Primary donor families:** `RUST_COMPREHENSIVE_REQUIREMENTS` synthesis, `clean-code-principles`, `rust-skills`
- **Key local donor materials:**
  - `RUST_COMPREHENSIVE_REQUIREMENTS.md`
  - `VIOLET_RUST_NEEDS_ANALYSIS.md`
  - `clean-code-principles` rule family
  - `rust-skills` anti/own/api/err rule families
- **Upstream URL:** not yet verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending

---


---

## Core Rule

An anti-pattern is not just ugly code.
It is a **repeated design choice** that creates avoidable cost in:
- correctness
- maintainability
- performance
- explainability
- future evolution

The goal is not purity theater.
The goal is to detect when a local convenience is becoming system-wide debt.

---

## Anti-Pattern 1 — Clone Spam

### Signal
- repeated `.clone()` to make ownership pain disappear
- values cloned without clear semantic reason
- clone-heavy hot paths or API flows

### Why it matters
- hides the real ownership model
- may allocate repeatedly
- can silently turn architecture weakness into runtime cost

### Migration ladder
1. confirm whether cloning is actually cheap and correct
2. if not, replace with borrowing where possible
3. if multiple owners are real, redesign around explicit shared ownership
4. if the system keeps needing copies, redesign the boundary and ownership flow

---

## Anti-Pattern 2 — `Arc<Mutex<T>>` as the Universal Answer

### Signal
- shared mutable state used everywhere
- locks introduced before workload analysis
- lock-based design where ownership transfer or messages would be clearer

### Why it matters
- introduces contention and mental overhead
- often hides weak subsystem boundaries
- becomes especially dangerous in async systems

### Migration ladder
1. ask whether shared mutable state is truly necessary
2. split state or ownership if possible
3. move to channel/actor model when coordination is the real problem
4. reserve `Arc<Mutex<T>>` for genuinely shared mutable state that survives scrutiny

---

## Anti-Pattern 3 — Holding Locks Across `.await`

### Signal
- borrowed or locked state spans an async suspension point
- `await_holding_lock`-style issues or deadlock pressure

### Why it matters
- deadlock and starvation risk
- hidden lifecycle coupling
- runtime behavior becomes brittle under load

### Migration ladder
1. shrink lock scope
2. separate mutation phase from async phase
3. move data out before `.await`
4. redesign around message passing if lock-heavy async structure keeps recurring

---

## Anti-Pattern 4 — Over-Abstraction / Ports with One Justificationless Implementation

### Signal
- traits, adapters, or layers exist without real boundary pressure
- abstractions appear because they seem architecturally mature, not because they solve a problem

### Why it matters
- hides the system's true shape
- increases indirection cost
- makes onboarding and change harder

### Migration ladder
1. ask what pressure the abstraction is serving now
2. collapse needless abstraction if it has no current boundary value
3. preserve clean boundary doctrine only where replacement, testing, or multi-surface delivery truly justify it
4. reintroduce abstraction later when real pressure appears

---

## Anti-Pattern 5 — Under-Abstraction / God Modules

### Signal
- one module owns parsing, domain logic, transport logic, and persistence behavior
- file and function sizes keep growing
- changes in one concern force edits everywhere

### Why it matters
- review and testing become noisy
- boundaries blur
- architectural evolution becomes harder

### Migration ladder
1. identify the actual responsibilities mixed together
2. split by boundary, not by arbitrary line count
3. introduce modules/services/repositories/adapters where the seams are real
4. if the splits become stable and many, consider workspace or crate boundaries

---

## Anti-Pattern 6 — Lifetime Annotation Overuse

### Signal
- adding more lifetime parameters to silence errors without clearer design
- explicit lifetimes everywhere even when elision or owned values would be simpler

### Why it matters
- code becomes harder to read
- lifetime complexity leaks into APIs unnecessarily
- often masks an ownership model problem

### Migration ladder
1. remove needless explicit lifetimes where elision is enough
2. redesign API to borrow more simply or own more honestly
3. use owned return values when references do not make boundary sense
4. reserve explicit lifetimes for real structural relationships

---

## Anti-Pattern 7 — Error Handling Anti-Patterns

### Signal
- `unwrap`/`expect` in production paths
- error contexts that are too vague or too noisy
- collapsing all failures into one blob too early

### Why it matters
- weak failure surfaces
- poor observability
- brittle user/operator experience

### Migration ladder
1. replace panic-driven control flow with `Result`
2. choose error type appropriate to the boundary (`thiserror`, `anyhow`, richer reporting where justified)
3. add context deliberately
4. preserve typed meaning until the boundary that truly needs simplification

---

## Anti-Pattern 8 — Framework-Led Architecture

### Signal
- project shape mirrors framework docs more than system needs
- handlers/controllers/routers quietly become business-logic homes

### Why it matters
- architecture becomes accidental
- transport concerns leak inward
- changing delivery surface becomes expensive

### Migration ladder
1. identify what is actually transport-specific
2. extract business logic into services/use-cases/core modules
3. keep delivery layer thin
4. if boundary pressure grows, move toward clean/hexagonal discipline

---

## Anti-Pattern 9 — Premature Workspace Explosion

### Signal
- tiny projects split into many crates for prestige
- workspace overhead exceeds actual domain separation

### Why it matters
- coordination cost rises without matching value
- changes require unnecessary cross-crate movement
- readability gets worse, not better

### Migration ladder
1. collapse to a simpler modular structure if the domains are not actually independent
2. preserve only the boundaries that matter
3. reintroduce workspace structure when scale and delivery surfaces justify it

---

## Migration Ladder by Project Maturity

### Level 1 → Level 2
From single-file or tiny utility:
- introduce modules
- typed errors
- baseline tests

### Level 2 → Level 3
From multi-module sync app:
- explicit shared-state or message-passing decisions
- thread/concurrency model
- stronger ownership design

### Level 3 → Level 4
From sync/concurrent app:
- async runtime only when I/O pressure justifies it
- async boundary discipline
- cancellation/shutdown thinking

### Level 4 → Level 5
From async app:
- observability
- config discipline
- thin delivery adapters
- production release/deployment posture
- explicit architecture choice

This ladder should be used to avoid both overbuilding and underbuilding.

---

## How to Use This Playbook

When you encounter a Rust code smell:
1. identify which anti-pattern family it belongs to
2. explain why it is costly
3. choose the migration ladder that fits the project's current maturity
4. propose the smallest migration that reduces debt without inventing new debt

---

## Why This Matters to `rust-coding-engine`

This is one of the remaining core requirement-grade doctrine pieces because it teaches:
- how to detect recurring Rust design failures
- how to migrate with proportion instead of ritual
- how to connect code smells to architectural maturity

It should work together with:
- ownership cookbook
- concurrency decision matrix
- compiler error recovery patterns
- architecture decision trees

so the engine can teach both **good design** and **how to escape bad design**.
