# Rust Public API Documentation and Trait Surface Discipline

## Purpose

Define the canonical posture for public API documentation, common trait exposure, and docs-as-contract discipline in Rust.

This document distills reusable lessons from:
- public-item documentation rules
- module-level doc rules
- intra-doc link rules
- common trait derivation guidance
- rustdoc / CLI-doc help surfaces

---
## Source Provenance

- **Primary donor families:** `rust-skills` documentation/API rule family, `rustdoc-clap-4.5.60`
- **Key local donor materials:**
  - `rust-skills/rules/doc-all-public.md`
  - `rust-skills/rules/doc-module-inner.md`
  - `rust-skills/rules/doc-link-types.md`
  - `rust-skills/rules/api-common-traits.md`
- **Upstream URL:** not yet verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending

---



## Core Rule

A public API in Rust is not complete when the types compile.
It is complete when a consumer can:
- discover it
- read it
- understand the contract
- use it correctly
- debug misuse with reasonable support from the docs and type surface

That makes documentation and trait ergonomics part of the API surface itself.

---

## Pattern 1 — Public Items Need Real Documentation

A good Rust public surface should prefer documentation on:
- public structs and enums
- public trait contracts
- public functions and methods
- public constants and aliases where meaning is non-obvious

The lesson is not “write words for everything.”
The lesson is:
- if the item is part of the public contract, it should not require source archaeology to understand its intended use

---

## Pattern 2 — Module Docs Matter Too

Module-level documentation is one of the easiest things to skip and one of the most important things for navigation.

Good module docs explain:
- what this module is for
- what kinds of items live here
- how it fits the rest of the system
- where the reader should go next

That means `//!`-style module posture belongs in canonical quality doctrine, not just in local style notes.

---

## Pattern 3 — Intra-Doc Links Improve Contract Navigation

A doc surface becomes dramatically more useful when related items are linked and navigable.

The lesson from donor rules is simple:
- clickable, checked links are better than loose textual references
- doc surfaces should help readers move between related types/functions/modules
- docs become more resilient when renamed items are link-checked by the tooling

So link discipline is not just polish. It is maintainability.

---

## Pattern 4 — Common Traits Are Part of API Ergonomics

The donor guidance on deriving common traits reveals an important truth:
- traits like `Debug`, `Clone`, `PartialEq`, `Eq`, `Hash`, or `Default` are not merely convenience sugar
- they shape how usable the public type is across the ecosystem

The engine should therefore teach:
- choose trait derivations deliberately
- keep them aligned with type meaning
- avoid exposing types that are needlessly awkward to inspect, compare, or use

This is API ergonomics, not just code decoration.

---

## Pattern 5 — Examples Are Executable Contract Evidence

Public API docs are strongest when they include examples that:
- demonstrate normal use
- show meaningful edge cases where appropriate
- align with the actual error and result model
- can ideally be checked mechanically through rustdoc/doc-test culture

This matters because examples teach usage faster than prose alone.

The deeper doctrine is:
- examples are one of the most important parts of the public contract
- not a nice extra when someone has time

---

## Pattern 6 — CLI / Help Surfaces Are Also Public API

The presence of donor material around `clap` and rustdoc reminds us of a broader lesson:
- public API is not only library API
- command-line help surfaces and generated docs are also user contracts

So a mature Rust engine should treat:
- CLI help quality
- argument naming
- subcommand discoverability
- generated docs and help output

as part of overall API documentation discipline.

---

## Pattern 7 — Docs and Trait Surfaces Reduce Support Burden

A codebase with strong docs and ergonomic public traits gives consumers:
- fewer reasons to inspect implementation internals
- fewer reasons to guess usage
- more stable onboarding and integration experience
- more leverage from the Rust toolchain itself

That is why this topic belongs in canonical doctrine.
It reduces long-term friction for both library and tool consumers.

---

## Why This Matters to `rust-coding-engine`

This doctrine strengthens the engine's ability to teach:
- public API docs as contract surfaces
- module docs as navigation surfaces
- intra-doc links as maintainability tools
- trait derivation as ergonomic design
- CLI/help output as part of public API quality

That makes it a necessary bridge between style, docs, tooling, and real consumer experience.
