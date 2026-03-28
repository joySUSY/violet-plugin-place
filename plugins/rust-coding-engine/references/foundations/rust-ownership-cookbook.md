# Rust Ownership Cookbook

## Purpose

Provide a canonical, architecture-oriented cookbook for Rust ownership and borrowing decisions.

This document exists because ownership is not just a language feature in Rust.
It is one of the core architectural design surfaces.

---
## Source Provenance

- **Primary donor families:** `rust-skills`, `flow-skills-rust`, `rust-guide`
- **Key local donor materials:**
  - `rust-skills/SKILL.md`
  - `flow-skills-rust/skills/rust/SKILL.md`
  - `RUST_COMPREHENSIVE_REQUIREMENTS.md`
  - `VIOLET_RUST_NEEDS_ANALYSIS.md`
- **Upstream URL:** not yet verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending

---



## Core Rule

When ownership feels painful, the first question should not be:
> how do I silence the borrow checker?

It should be:
> what ownership model is this system actually trying to express?

The cookbook below exists to answer that question with practical patterns.

---

## Decision Matrix

| Situation | Prefer | Why |
|---|---|---|
| Temporary read-only access | `&T` | Zero-cost, no ownership transfer |
| Temporary mutable access | `&mut T` | Clear exclusive mutation |
| Need to transfer ownership | `T` | Honest ownership handoff |
| Shared immutable ownership (single-thread) | `Rc<T>` | Shared owner without thread safety overhead |
| Shared mutable ownership (single-thread) | `Rc<RefCell<T>>` | Interior mutability when graph-like sharing is real |
| Shared immutable ownership (multi-thread) | `Arc<T>` | Thread-safe shared ownership |
| Shared mutable ownership (multi-thread) | `Arc<Mutex<T>>` or `Arc<RwLock<T>>` | Shared state under explicit synchronization |
| Conditional cloning or borrowed return | `Cow<'a, T>` | Clone only when mutation or ownership is needed |
| Small copyable values | `Copy` types | Cheap duplication, no ownership drama |
| Stable external handle instead of direct value | newtype/handle wrapper | Make ownership and validity explicit |

---

## Pattern 1 — Borrow by Default, Own with Intent

If a function only needs to inspect data, prefer borrowing.

Good examples:
- `&str` instead of `&String`
- `&[T]` instead of `&Vec<T>`
- `&Path` instead of `&PathBuf`

The point is not style purity.
The point is to make the function accept the most general non-owning view that matches its true needs.

---

## Pattern 2 — Clone Is a Decision, Not a Reflex

A clone is sometimes correct.
But it is never free conceptually, and often not free operationally.

Ask:
1. Is the clone cheap and semantically honest?
2. Would borrowing express intent better?
3. Is shared ownership actually the real model?
4. Is the API shape forcing this clone unnecessarily?

Correct use:
- clone when duplication is truly the simplest honest boundary
- redesign when clone spam is compensating for a weak ownership model

---

## Pattern 3 — Shared Ownership Should Match Reality

Do not choose `Rc`, `Arc`, `Mutex`, `RwLock`, or `RefCell` only because the borrow checker complained.
Choose them because the system really needs:
- multiple owners
- mutation through shared references
- thread safety
- read-heavy vs write-heavy access

The wrong choice here creates architectural debt, not just syntax debt.

---

## Pattern 4 — Interior Mutability Is a Real Tool, Not a Cheat Code

Interior mutability is appropriate when:
- graph or tree structures need shared mutation
- state is naturally shared but not thread-safe
- caching or lazy initialization needs a controlled mutable interior

It is a bad sign when used simply to bypass thinking about ownership.

The doctrine is:
- use it when the domain really has shared mutable semantics
- not when you are trying to avoid redesigning flow

---

## Pattern 5 — Scoped Mutation Prevents Borrow Friction

Many borrow problems are actually scope problems.

Useful technique:
- narrow the mutable scope
- finish the mutation
- drop the guard or mutable borrow before the next phase

This is especially important before:
- `.await`
- expensive reads
- handing values into other abstractions

Often the fix is not a new type.
It is a better-scoped mutation window.

---

## Pattern 6 — Newtypes Encode Semantic Ownership

Newtypes are valuable when raw primitives hide meaning.

Examples:
- `UserId`
- `OrderId`
- `SessionHandle`
- `BufferIndex`

These strengthen ownership and boundary design because they stop accidental substitution across semantically distinct values.

That is one of Rust's most important ownership-adjacent architectural tools.

---

## Pattern 7 — Typestate and Phantom Markers Encode Lifecycle Ownership

Some systems need more than “who owns this data?”
They need:
- which lifecycle state owns this capability?
- which operations are legal in this state?

That is where typestate and phantom markers matter.

They let ownership interact with:
- lifecycle
- capability exposure
- validity state

This is especially important in protocols, connections, runtimes, and state-machine-heavy systems.

---

## Pattern 8 — Handle vs Value Is a Real Design Choice

In systems code, sometimes you should not pass the real value around directly.
Sometimes the correct abstraction is:
- a stable handle
- a shadow-stack slot
- an index
- a generational token

The question is not just “can I borrow this?”
The question is:
- should the caller have direct value access at all?
- or should they operate through a controlled handle?

This is one of the most important lessons from runtime/VM-like Rust systems.

---

## Pattern 9 — Async Changes Ownership Cost

Async Rust increases ownership pressure because values may need to survive:
- task movement
- `.await` suspension
- Send/Sync boundaries
- lifetime extension beyond local scopes

That means ownership design in async systems must ask:
- does this future need owned data?
- can this borrow survive across await?
- should work be restructured before `.await`?
- is shared state truly necessary, or just convenient?

Async ownership pain is often an architectural signal.

---

## Pattern 10 — Cookbook for Common Error Classes

### E0382 — moved value
Consider:
- borrow instead of move
- clone if cheap and correct
- redesign ownership handoff
- shared owner type if multiple owners are real

### E0597 — borrowed value does not live long enough
Consider:
- extend owner scope
- return or store owned value instead
- reduce borrow lifetime
- move the allocation/owner outward

### E0506 — cannot assign while borrowed
Consider:
- shrink the borrow scope
- separate read and write phases
- use interior mutability if shared mutation is genuinely the model

### E0507 / E0515 / E0716
These typically point to:
- ownership model mismatch
- returning references where ownership should be transferred
- temporary-value lifetime mistakes
- missing stable storage strategy

---

## Anti-Patterns

- clone spam as default bug spray
- `Arc<Mutex<T>>` everywhere without shared-state justification
- `RefCell` used to avoid redesigning flow
- borrowing APIs that should really own
- owning APIs that should really borrow
- hiding semantic identity in raw primitives
- keeping mutable borrows alive longer than necessary

---

## Why This Matters to `rust-coding-engine`

This cookbook is one of the core requirement-grade Rust doctrine pieces because it teaches:
- ownership as architecture
- borrowing as API design
- handle design as a systems pattern
- mutation scope as a design variable
- common compiler errors as ownership-model signals

It should become one of the first documents the engine reaches for in real Rust work.
