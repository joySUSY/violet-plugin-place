# Rust Foundations Index
# Authors: Joysusy & Violet Klaudia 💖

## Purpose

Canonical entrypoint for the foundational Rust doctrine — ownership, borrowing, lifetimes, idiomatic style, and the mental models that everything else builds on.

Use this category when the task is about:
- ownership, borrowing, lifetimes
- idiomatic style and naming
- baseline type ergonomics
- first-principles Rust mental models
- smart pointer selection and shared-state design

## Source Provenance

- **Primary source:** `references/foundations/` canonical subtree
- **Derived from:** ownership/type/style donor families and foundations doctrine canonization passes

---

## Documents

| File | Role |
|---|---|
| `rust-foundations-ownership-memory-safety.md` | Core ownership, borrowing, memory safety, smart pointer selection |
| `rust-idiomatic-style-and-patterns.md` | Idiomatic naming, API style, ergonomics, readable Rust posture |
| `rust-ownership-cookbook.md` | Ownership decision matrix, borrowing patterns, shared-state choices, compiler-error recovery cues |

---

## Reading Paths

**First time here?** Start with ownership-memory-safety, then idiomatic-style, then the cookbook. That's the full foundation arc.

**Under time pressure?** Go straight to the cookbook — it has decision matrices and compiler-error recovery cues that solve most immediate problems.

**Building a mental model?** Ownership-memory-safety is the one to sit with. Read it slowly; it rewires how you think about Rust.

---

## Reading Order

1. `rust-foundations-ownership-memory-safety.md`
2. `rust-idiomatic-style-and-patterns.md`
3. `rust-ownership-cookbook.md`

Use this category before branching into architecture, async, interop, or error doctrine.

---

## Problem-Pressure Routes

| You're struggling with... | Start here |
|---|---|
| Ownership confusion, borrow checker fights | `rust-ownership-cookbook.md` — decision matrices + compiler-error cues |
| "What's the Rusty way to write this?" | `rust-idiomatic-style-and-patterns.md` — naming, API shape, ergonomics |
| Mental model of how Rust memory actually works | `rust-foundations-ownership-memory-safety.md` — first principles |
| `Arc` vs `Rc` vs `Box` — which smart pointer? | `rust-foundations-ownership-memory-safety.md` §Smart Pointer Selection |
| Shared mutable state across threads | `rust-ownership-cookbook.md` §Shared-State Choices |

---

## Cross-Lane Links

Foundations feeds into everything. When you're ready to go deeper:

- **Architecture** (`../architecture/`) — how ownership principles scale into module and crate design
- **Error Patterns** (`../error-patterns/`) — error types are deeply shaped by ownership (who owns the error context?)
- **Quality** (`../quality/`) — idiomatic style is the first quality gate; foundations doctrine sets the bar
- **Async/Concurrency** (`../async-concurrency/`) — ownership across `.await` boundaries is a foundations problem that lives in the async lane
