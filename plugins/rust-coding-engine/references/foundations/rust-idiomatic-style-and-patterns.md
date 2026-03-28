# Rust Idiomatic Style and Patterns

## Purpose

Define the canonical foundation-level doctrine for writing Rust that is not only correct, but *idiomatic*—code that communicates intent, cost, boundaries, and invariants clearly to both the compiler and human readers.

This document is not the full style-governance policy.
That role belongs to:
- `../quality/rust-style-and-lint-governance.md`
- `../quality/rust-public-api-documentation-and-trait-surface-discipline.md`

This document exists one layer lower, at the level of:
- naming semantics
- API ergonomics
- type modeling posture
- idiomatic control flow
- what “feels like Rust” versus what merely compiles

---

## Source Provenance

- **Primary donor families:** `rust-skills`, `rust-style` variants, `rust-style-guidelines`, `rust-style-lint`
- **Key local donor materials:**
  - `rust-skills/rules/name-no-get-prefix.md`
  - `rust-skills/rules/name-is-has-bool.md`
  - `rust-skills/rules/name-to-expensive.md`
  - `rust-skills/rules/type-enum-states.md`
  - `rust-skills/rules/type-newtype-ids.md`
  - `rust-skills/rules/api-builder-pattern.md`
  - `rust-skills/rules/api-common-traits.md`
  - `rust-skills/rules/anti-stringly-typed.md`
  - `rust-skills/rules/type-no-stringly.md`
  - `rust-style (1)/rust-style/style-guide.md`
  - `rust-style (1)/rust-style/examples.md`
- **Upstream URL:** not yet fully re-verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending

---

## Core Rule

Idiomatic Rust is not about memorizing surface conventions.
It is about making the code's meaning, ownership, cost, and state transitions *obvious*.

Good Rust style should usually make these things easy to answer:
- what does this value represent?
- who owns it?
- is this operation cheap or expensive?
- what states are legal?
- what guarantees does this API actually make?

That is why style and type modeling are deeply connected in Rust.

---

## Pattern 1 — Naming Should Communicate Semantics, Not Just Category

Rust naming conventions are valuable because they signal behavior and cost.

### Getter posture
For simple accessors, omit `get_`.

Prefer:
- `name()`
- `age()`
- `len()`

Use `get_` only when the method is more than trivial field access, such as:
- a lookup
- bounds-checked retrieval
- a transformation with branchy behavior

This is not an aesthetic preference.
It keeps the common case concise and makes unusual access patterns stand out.

### Boolean posture
Boolean-returning methods should read like questions.

Prefer:
- `is_ready()`
- `has_children()`
- `can_write()`
- `should_retry()`

This matters because callers should not need docs just to know whether a method is a check or an action.

### Conversion posture
Use naming to reveal cost and ownership:
- `as_` -> cheap borrowed/reinterpreted view
- `to_` -> allocates or computes a new owned value
- `into_` -> consumes ownership and converts

If the cost model and the name disagree, the API is misleading.

---

## Pattern 2 — Borrowed Inputs Make APIs More Idiomatic

An idiomatic Rust function usually accepts the most general borrowed input that matches its true need.

Examples:
- `&str` instead of `&String`
- `&[T]` instead of `&Vec<T>`
- `&Path` instead of `&PathBuf`

This helps because:
- callers retain flexibility
- ownership stays with the caller when ownership is unnecessary
- the API describes what it actually needs, not the specific storage type someone happened to use

Borrow-friendly APIs are one of the easiest markers of “this code respects Rust.”

---

## Pattern 3 — Enums Are the Default Model for Exclusive States

If a thing can be in exactly one of several states, an enum is usually more idiomatic than multiple booleans or loosely coupled optional fields.

Prefer:
- `enum Status { Pending, Active, Failed(Error) }`

Avoid:
- `is_pending: bool`
- `is_failed: bool`
- `error: Option<E>`

Why:
- enums make illegal states harder or impossible to represent
- pattern matching becomes exhaustive
- the state model becomes visible in the type itself

This is one of the signature Rust moves: use the type system to eliminate ambiguous or contradictory states.

---

## Pattern 4 — Newtypes Beat Raw Primitives for Meaningful Domain Values

Raw `u64`, `String`, and `usize` values are often too weak at important boundaries.

Prefer small semantic wrappers when the meaning matters:
- `UserId(u64)`
- `PostId(u64)`
- `SessionId(String)`
- validated wrappers like `Email(String)`

This improves:
- API clarity
- misuse resistance
- trait customization
- domain readability

Idiomatic Rust often gets *simpler* by adding tiny semantic types, because the surrounding code stops needing explanation.

---

## Pattern 5 — Parse at Boundaries, Use Strong Types Inside

Stringly typed inputs often exist at the edges of the system.
That is normal.
What matters is what happens next.

An idiomatic posture is:
- accept loose external input at the boundary
- parse/validate once
- use enums/newtypes/validated values internally

This keeps the weakly typed world outside and the strongly modeled world inside.

That is more Rust-like than letting strings, raw IDs, and unchecked values drift through the whole codebase.

---

## Pattern 6 — Builders Are for Construction Clarity, Not Ceremony

The builder pattern is useful when construction is:
- multi-parameter
- order-sensitive
- option-heavy
- validation-heavy

A builder is not automatically more idiomatic than a constructor.
It is more idiomatic **only when it improves call-site clarity and makes invariants easier to enforce**.

Good builder posture often includes:
- `#[must_use]`
- clear setter methods
- `build()` as the validation/assembly boundary
- sensible defaults where appropriate

Bad builder posture appears when:
- a two-argument constructor becomes a 50-line builder for style points
- the builder duplicates trivial construction with no gain

---

## Pattern 7 — Common Trait Derives Are Part of API Ergonomics

Idiomatic public Rust types should usually expose the common traits that match their semantic role.

Common useful derives include:
- `Debug`
- `Clone`
- `PartialEq`
- `Eq`
- `Hash`
- `Default`
- `Copy` for genuinely small/simple value types

The point is not to derive everything blindly.
The point is that a public type should not feel awkward to use in basic ecosystem workflows unless there is a reason.

A type that should obviously be comparable, hashable, printable, or copyable should usually say so explicitly.

---

## Pattern 8 — Control Flow Should Be Explicit Without Becoming Ceremony

Idiomatic Rust values explicit branching, but not unnecessary verbosity.

Good tools include:
- `match` for real variant/state branching
- `if let` / `while let` when only one pattern matters
- `let-else` for guard-like early exits
- early returns over excessive nesting
- combinators when they clarify the chain of meaning rather than obscure it

The doctrine is:
- make the branch structure visible
- but do not force maximal verbosity when a smaller construct states the same truth clearly

---

## Pattern 9 — Cost Should Be Legible in the Surface

Rust APIs are strongest when callers can often infer cost from naming and type shape.

Examples:
- `as_str()` feels cheap
- `to_string()` feels allocative
- `into_inner()` feels ownership-consuming
- `Cow<'a, str>` communicates conditional ownership/copy behavior

Idiomatic Rust therefore tries to align:
- semantic naming
- ownership behavior
- performance expectations

This does not replace profiling, but it dramatically improves readability and caller trust.

---

## Pattern 10 — Avoid Stringly and Placeholder Semantics

Idiomatic Rust should resist “just use a string” for known concepts.

Prefer:
- enums for fixed sets of legal values
- newtypes for semantically distinct identifiers
- structured configuration types over loose string maps where practical
- explicit domain vocabulary over placeholder names

This is not type maximalism.
It is meaning preservation.

---

## Pattern 11 — Small Semantic Types Often Beat Large OO Shapes

Rust style tends to reward:
- small focused structs
- enums with meaningful variants
- composition
- trait-based extension at the right boundary

It tends to punish:
- giant god types
- boolean-heavy pseudo-state machines
- inheritance-like thinking forced through traits where composition would be clearer

Idiomatic Rust often feels “smaller” in each piece but “stronger” in how the pieces fit.

---

## Pattern 12 — Idiomatic Rust Is Not Cleverness Theater

Rust can support very dense abstractions.
That does not mean dense abstractions are automatically idiomatic.

Avoid:
- advanced type/system tricks when simpler named concepts would be clearer
- chained iterator/combinator expressions that hide the story
- abstractions that impress the author but make maintenance harder

Idiomatic Rust should feel inevitable, not performative.

---

## What This Document Does Not Own

This document does not try to fully own:
- lint severity and tooling policy -> `../quality/rust-style-and-lint-governance.md`
- public API docs and trait-surface detail -> `../quality/rust-public-api-documentation-and-trait-surface-discipline.md`
- ownership-model deep reasoning -> `rust-foundations-ownership-memory-safety.md`, `rust-ownership-cookbook.md`
- error surface selection -> `../error-patterns/rust-error-handling-patterns.md`

This separation is intentional.
The engine is stronger when each document has a clear job.

---

## Anti-Patterns

- `get_` prefixes on trivial accessors
- boolean methods without `is_/has_/can_/should_` semantics
- `&String` / `&Vec<T>` where borrowed general forms should be used
- flag bundles instead of enums
- raw primitive IDs everywhere
- stringly typed internal domain values
- builders with no clarity payoff
- public types missing obvious useful traits
- “clever” code that hides intent instead of exposing it

---

## Cross-Links

Read this alongside:
- `rust-foundations-ownership-memory-safety.md`
- `rust-ownership-cookbook.md`
- `../quality/rust-style-and-lint-governance.md`
- `../quality/rust-public-api-documentation-and-trait-surface-discipline.md`
- `../error-patterns/rust-error-handling-patterns.md`

---

## Final Doctrine

The reusable lesson is not:
> “Rust has some conventions for names and patterns.”

The reusable lesson is:
> “Idiomatic Rust uses names, borrowed inputs, strong types, explicit states, and ergonomic public surfaces to make the program's meaning as clear as the compiler makes its guarantees.”
