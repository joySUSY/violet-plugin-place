# Rustdoc Mastery

## Purpose

Define the canonical doctrine for how Rust documentation should be written, organized, linked, rendered, and maintained so that the public surface of a crate remains discoverable and trustworthy over time.

This document is the rustdoc-focused deep doctrine in the quality lane.
It complements, but does not replace:
- `rust-quality-testing-benchmarking-documentation.md`
- `rust-testing-patterns.md`
- `rust-doc-examples-discipline.md`
- `rust-public-api-documentation-and-trait-surface-discipline.md`

Its job is more specific:

> to teach how Rustdoc itself becomes a high-quality contract surface rather than a byproduct of comments.

---

## Source Provenance

- **Primary donor families:** `rust-skills` documentation-rule family, `rustdoc-clap-4.5.60`
- **Key local donor materials:**
  - `rust-skills/rules/doc-all-public.md`
  - `rust-skills/rules/doc-examples-section.md`
  - `rust-skills/rules/doc-intra-links.md`
  - `rust-skills/rules/doc-module-inner.md`
  - `rust-skills/rules/doc-errors-section.md`
  - `rust-skills/rules/doc-panics-section.md`
- **Upstream URL:** not yet fully re-verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending

---

## Core Rule

Rustdoc should make the public contract easier to discover, navigate, and trust.

That means documentation is not merely “some comments above public items.”
A strong rustdoc posture uses:
- clear summaries
- structure-aware sections
- working intra-doc links
- executable examples where possible
- module- and crate-level narratives
- docs.rs-friendly presentation

The output should help a reader succeed without needing source archaeology for normal use.

---

## Rustdoc Surface Model

| Surface | What it does |
|---|---|
| Item docs (`///`) | explain a public item's purpose and contract |
| Module docs (`//!`) | orient the reader to a subsystem or category |
| Crate root docs | provide entrypoint narrative, quick start, and navigation |
| Intra-doc links | connect the public graph into a browsable contract |
| Doctests/examples | prove usage remains real |
| docs.rs metadata/attrs | improve hosted rendering and discoverability |

A strong crate usually needs all of these at different scopes.

---

## Pattern 1 — Summaries Should Explain the Item's Job, Not Restate Its Name

The first sentence of a doc comment matters disproportionately.
It becomes the short description and often the first thing readers scan.

Good summary posture:
- say what the item is for
- avoid repeating the type name mechanically
- favor one clear sentence over paragraph noise

Poor summary posture:
- vague filler
- tautologies like “Represents a widget” when the type name is already `Widget`
- implementation details before purpose

The summary should answer:
> why does this item exist in the API?

---

## Pattern 2 — Use Section Headers Only When They Clarify the Contract

Useful rustdoc sections include:
- `# Arguments`
- `# Errors`
- `# Panics`
- `# Safety`
- `# Examples`

Not every item needs every section.

The doctrine is:
- add sections when they improve contract legibility
- do not turn every small function into a template-filled wall of headings

Examples:
- tiny pure helpers may need only a summary and example
- fallible public functions usually need `# Errors`
- panicking APIs should say so explicitly
- unsafe APIs must justify their `# Safety` contract

Section presence should follow the real boundary, not habit.

---

## Pattern 3 — `# Examples` Should Teach Real Usage, Not Just Compile

Examples are some of the highest-value part of Rustdoc because they bridge:
- abstract signatures
- practical usage
- continuous verification via doctests

A strong example should:
- show the happy path clearly
- include hidden setup only when necessary
- use `?` / real fallible flow where appropriate
- expose relevant edge or error behavior when useful

Examples are best when they are both:
- instructive to humans
- checkable by tooling

This is why `rust-doc-examples-discipline.md` exists as a deeper companion.

---

## Pattern 4 — Intra-Doc Links Turn Docs into a Navigable Contract Graph

Intra-doc links are one of Rustdoc's greatest strengths.

They let documentation behave more like a typed navigation graph than static prose.

Good link posture:
- link relevant types and traits
- link associated methods/constructors when they are the natural next step
- use module links to help readers move through the crate
- prefer real links over vague “see X” text

The deeper rule is:
- if the reader is likely to ask “where do I go next?”, a link is usually better than a plain reference

Broken link detection also gives maintainers a quality feedback loop when refactors happen.

---

## Pattern 5 — Module Docs Should Explain the Shape of the Area

Module-level docs (`//!`) help readers understand:
- what belongs here
- what the major concepts are
- what order to read things in
- how the module fits the broader architecture

This is especially important in larger crates where item-level docs alone are not enough.

A strong module doc often includes:
- short purpose statement
- notable types/functions/modules
- examples or navigation pointers
- feature-flag notes if relevant

Without module docs, readers often understand pieces but not the space those pieces inhabit.

---

## Pattern 6 — Crate Root Docs Are a Product Landing Page

The crate root (`lib.rs` docs) should usually act like the main landing page for the crate.

Useful contents:
- what the crate is for
- quick-start example
- major modules or entrypoints
- high-level feature flag notes if relevant
- guidance on where to go next

A healthy crate root helps both:
- first-time users
- future maintainers returning after time away

The root docs should answer:
> if I know nothing except the crate name, how do I start correctly?

---

## Pattern 7 — Public Fallibility and Panic Behavior Must Be Documented Honestly

If a public function can fail, panic, or require safety invariants, Rustdoc should say so.

### `# Errors`
Use when callers need to understand recoverable failure conditions.

### `# Panics`
Use when a function may panic under documented conditions.

### `# Safety`
Use for unsafe APIs to describe what the caller must uphold.

The doctrine is:
- these sections are not bureaucratic extras
- they are part of the public contract of the item

A caller who cannot see the failure/panic/safety model in the docs is being asked to guess.

---

## Pattern 8 — docs.rs and Attribute Posture Matter for Real Consumers

Rustdoc quality is not just about local `cargo doc` output.
For published crates, docs.rs behavior matters too.

Useful posture includes:
- docs.rs-friendly feature configuration
- `doc(cfg)` for feature-gated items where appropriate
- `#[doc(alias = ...)]` where it genuinely improves discoverability
- `#[doc(hidden)]` for things that should not define the public face
- `#[doc(inline)]` when re-export presentation benefits from it

The key lesson is:
- presentation on docs.rs is part of how the crate is actually consumed

---

## Pattern 9 — Rustdoc Should Work With Testing, Not Against It

Rustdoc becomes much stronger when it participates in the quality loop.

Examples:
- doctests catch stale examples
- broken intra-doc links can fail CI
- crate/module docs can become navigation contracts for maintainers

This is why rustdoc mastery is not isolated from testing or lint doctrine.
It is part of the same trust-preservation system.

---

## Pattern 10 — Good Rustdoc Reduces Support and Source-Diving Pressure

The operational value of strong docs is easy to underestimate.

Well-designed rustdoc reduces:
- basic usage questions
- copy-paste misuse
- confusion around error conditions
- need to inspect implementation details for normal consumption

That means rustdoc quality has a direct effect on:
- onboarding
- maintenance burden
- library adoption
- correctness of downstream usage

So this is not documentation vanity.
It is a real engineering quality lever.

---

## Rustdoc Checklist

Before calling a Rustdoc surface healthy, ask:

- [ ] Do public items have meaningful summaries?
- [ ] Are `# Errors`, `# Panics`, or `# Safety` sections present where needed?
- [ ] Do examples teach realistic use and compile where possible?
- [ ] Are intra-doc links used to connect the contract graph?
- [ ] Do modules have `//!` docs when readers need orientation?
- [ ] Does the crate root work as a real landing page?
- [ ] Are docs.rs-oriented attributes and feature-gated presentation handled intentionally?

---

## Anti-Patterns

- summaries that merely echo the item name
- giant heading templates on trivial APIs
- public fallibility or panic conditions hidden from docs
- examples that look nice but are not maintained
- plain text references where links would reduce navigation friction
- module trees with no `//!` orientation docs
- crate roots that provide no useful quick-start or navigation story

---

## What This Document Does Not Own

This rustdoc doctrine does **not** fully own:
- broader quality integration -> `rust-quality-testing-benchmarking-documentation.md`
- testing ladder and benchmark boundaries -> `rust-testing-patterns.md`
- focused example doctrine -> `rust-doc-examples-discipline.md`
- public-item and trait-surface ergonomics at large -> `rust-public-api-documentation-and-trait-surface-discipline.md`
- style/lint enforcement policy -> `rust-style-and-lint-governance.md`

This separation is intentional.
Rustdoc mastery is about making documentation surfaces structurally strong.

---

## Cross-Links

Read this alongside:
- `rust-quality-testing-benchmarking-documentation.md`
- `rust-testing-patterns.md`
- `rust-doc-examples-discipline.md`
- `rust-public-api-documentation-and-trait-surface-discipline.md`
- `rust-style-and-lint-governance.md`

---

## Final Doctrine

The reusable lesson is not:
> “write doc comments and examples.”

The reusable lesson is:
> “use rustdoc to turn the crate's public surface into a navigable, executable, and honest contract—one that readers can learn from and maintainers can keep true as the code evolves.”
