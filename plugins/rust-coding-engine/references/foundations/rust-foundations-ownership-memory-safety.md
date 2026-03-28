# Rust Foundations: Ownership and Memory Safety

## Purpose

Define the canonical foundation-level doctrine for ownership, borrowing, lifetimes, and memory-safety reasoning inside `rust-coding-engine`.

This document is the first-principles layer beneath the rest of the Rust engine.
It should answer the deepest recurring question in Rust work:

> what ownership and memory model is this system actually trying to express?

It is not a full cookbook of every fix.
That role belongs to `rust-ownership-cookbook.md`.
This document exists to stabilize the underlying mental model.

---

## Source Provenance

- **Primary donor families:** `rust-skills`, `flow-skills-rust`, `rust-guide`
- **Key local donor materials:**
  - `rust-skills/SKILL.md`
  - `rust-skills/rules/own-borrow-over-clone.md`
  - `rust-skills/rules/own-arc-shared.md`
  - `rust-skills/rules/own-rc-single-thread.md`
  - `rust-skills/rules/own-refcell-interior.md`
  - `rust-skills/rules/own-mutex-interior.md`
  - `rust-skills/rules/own-rwlock-readers.md`
  - `rust-skills/rules/own-cow-conditional.md`
  - `rust-skills/rules/own-copy-small.md`
  - `rust-skills/rules/own-slice-over-vec.md`
  - `rust-skills/rules/own-lifetime-elision.md`
  - `rust-skills/rules/mem-zero-copy.md`
  - `RUST_COMPREHENSIVE_REQUIREMENTS.md`
  - `VIOLET_RUST_NEEDS_ANALYSIS.md`
- **Upstream URL:** not yet fully re-verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending

---

## Core Rule

Ownership is not just a Rust language mechanism.
It is an architectural truth.

When the ownership model is honest:
- APIs become clearer
- mutation becomes easier to reason about
- concurrency choices become more deliberate
- compiler errors become design feedback instead of constant friction

When the ownership model is dishonest:
- clone spam appears
- shared-state choices become muddy
- lifetime annotations spread without real clarity
- the borrow checker feels “annoying” because it is correctly rejecting an unclear design

---

## The Foundational Ownership Laws

### Law 1 — One owner at a time
At the value level, Rust assumes one clear owner at any given time unless you explicitly choose a shared-ownership structure.

### Law 2 — Borrow instead of transfer when ownership is not needed
If a function only needs access, not control, it should usually borrow.

### Law 3 — Mutation must be exclusive or explicitly mediated
Mutation requires:
- exclusive mutable access
- or an explicit interior/shared mutability strategy

### Law 4 — References are promises about validity duration
A reference is only meaningful while its owner remains valid.
Lifetimes exist to keep that promise coherent.

### Law 5 — Shared ownership is never free conceptually
Even when clones of handles are cheap, shared ownership changes the architecture and should be chosen intentionally.

---

## Ownership Decision Matrix

| Need | Default Choice | Why |
|---|---|---|
| inspect without owning | `&T` | zero-cost read access |
| mutate with exclusive access | `&mut T` | explicit mutation boundary |
| transfer control | `T` | honest ownership handoff |
| maybe borrow, maybe own | `Cow<'a, T>` | avoid unnecessary copies |
| small, trivially copied value | `Copy` type | ergonomic duplication without ownership friction |
| shared ownership, one thread | `Rc<T>` / `Rc<RefCell<T>>` | shared owner without thread-safe overhead |
| shared ownership, many threads | `Arc<T>` / `Arc<Mutex<T>>` / `Arc<RwLock<T>>` | explicit synchronized sharing |

This matrix is not about syntax preference.
It is about preserving the real meaning of the data.

---

## Borrowing as the Default API Posture

A strong Rust API usually accepts the most general borrowed view that matches the true requirement.

Examples:
- `&str` instead of `&String`
- `&[T]` instead of `&Vec<T>`
- `&Path` instead of `&PathBuf`

Why this matters:
- callers retain flexibility
- unnecessary allocation pressure is reduced
- the function reveals what it actually needs

This is one of the simplest ways to make Rust APIs feel inevitable rather than fussy.

---

## Clone Is Not Evil, but It Is a Decision

Cloning is sometimes the right answer.
But it should be a conscious answer.

### Good clone reasons
- the boundary truly needs owned data
- duplication is semantically correct
- the value is cheap enough and the simplicity gain is worth it
- a task/thread/runtime boundary requires owned data

### Bad clone reasons
- avoiding understanding of ownership flow
- repeated “temporary relief” in hot or central paths
- compensating for an API that should borrow instead

The doctrine is:
- **borrow first**
- **clone deliberately**
- **redesign if cloning becomes the default patch**

---

## Shared Ownership Families

### `Rc<T>`
Use when:
- ownership must be shared
- execution is single-threaded
- mutation is not required through shared references

### `Rc<RefCell<T>>`
Use when:
- shared ownership is needed in single-threaded code
- interior mutation is semantically real
- graph/tree/cache/observer-style structures need it

### `Arc<T>`
Use when:
- ownership must be shared across threads
- the shared state itself is read-only or externally synchronized

### `Arc<Mutex<T>>` / `Arc<RwLock<T>>`
Use when:
- shared mutable state across threads is truly the model
- lock semantics match the real access pattern

The key lesson is not “which type fixes the compiler error?”
It is “which shared-ownership family matches the real runtime semantics?”

---

## Interior Mutability

Interior mutability exists because some systems are naturally easier to model when mutation happens behind a shared reference.

### `Cell<T>`
Best for:
- `Copy` data
- tiny local interior state
- no borrowing of the inner value required

### `RefCell<T>`
Best for:
- single-threaded dynamic borrow checking
- caches, observer graphs, tree mutations, lazy setup patterns

### `Mutex<T>` / `RwLock<T>`
Best for:
- cross-thread shared mutation
- explicit synchronization as part of the design

Interior mutability is valid when it reflects the real domain.
It is a bad smell when it only exists to silence the borrow checker without clarifying the model.

---

## Lifetimes: Meaning, Not Decoration

A lifetime is not “extra syntax Rust forces on you.”
It is a statement about how long a reference relationship is valid.

### Elide when obvious
If elision rules already express the relationship clearly, prefer them.

### Write explicit lifetimes when they explain a real relationship
Examples:
- structs storing references
- functions relating two or more input borrows to one output borrow
- advanced trait or iterator relationships

### Red flag
If you keep adding lifetimes everywhere hoping the error disappears, the ownership shape is probably wrong.

Lifetimes should reveal a relationship, not serve as noise.

---

## Smart Pointer Selection

```text
Need heap indirection or dynamic size?
├── Single owner -> Box<T>
└── Shared owner?
    ├── Single-thread -> Rc<T>
    │   └── Need interior mutation -> Rc<RefCell<T>>
    └── Multi-thread -> Arc<T>
        └── Need mutation -> Arc<Mutex<T>> or Arc<RwLock<T>>
```

This selection is about semantics first and performance second.
The performance implications still matter, but only after the ownership truth is correct.

---

## Zero-Copy and Data Borrowing

Rust's memory-safety story becomes especially powerful when combined with zero-copy thinking.

Useful defaults:
- work with slices and string slices where possible
- return borrowed views when lifetime and ownership allow
- use owned values only when the boundary genuinely requires independent storage or mutation
- use `Cow` when conditional ownership makes the most sense

This matters because the ownership model and the performance model are often aligned in Rust.
A good ownership design is frequently also a good memory design.

---

## Foundation-Level Anti-Patterns

- `&String` and `&Vec<T>` in APIs that should accept `&str` / `&[T]`
- clone spam instead of ownership reasoning
- `Arc<Mutex<T>>` everywhere without proving shared mutation is necessary
- `RefCell` used as a generic escape hatch
- lifetime annotation overuse where elision or owned returns would be clearer
- designing APIs without first deciding who owns the data

---

## Relationship to Other Canonical Docs

This document is the first-principles layer.
Use these next depending on pressure:

- `rust-ownership-cookbook.md` -> practical fix families and usage patterns
- `rust-compiler-error-recovery-patterns.md` -> error-code-specific diagnosis
- `rust-concurrency-decision-matrix.md` -> when ownership becomes concurrency architecture
- `rust-idiomatic-style-and-patterns.md` -> idiomatic API and naming consequences of good ownership design

---

## Final Doctrine

The reusable lesson is not:
> “Rust has owners, borrows, and lifetimes.”

The reusable lesson is:
> “Rust asks you to make ownership, mutation, and validity relationships explicit—and when you do, the compiler stops being a nuisance and starts becoming an architectural ally.”
