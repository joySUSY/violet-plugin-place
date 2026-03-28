# Rust–TypeScript Contract Boundaries

## Purpose

Define the canonical TypeScript-side doctrine for Rust–TypeScript contract sharing inside `typescript-coding-engine`.

This document complements the Rust-side doctrine in `rust-coding-engine` and explains what the TypeScript engine owns on the consumer side of the boundary.

It answers a focused question:

> when Rust defines or generates the structural contract, how should TypeScript consume, wrap, validate, version, and test that contract without duplicating truth or degrading the boundary into fragile manual glue?

It focuses on:
- single-source contract ownership
- generated boundary truth
- TypeScript-side consumer ergonomics
- runtime validation placement
- build/import stability
- version and drift discipline

## Source Provenance

- **Primary source:** current `typescript-coding-engine` interop doctrine subtree
- **Derived from:** Rust↔TypeScript contract-generation, WASM/TS, and Tauri-boundary canonization work across the TypeScript and Rust engines
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local interop doctrine aligned to the current TypeScript engine

---

## Core Rule

If Rust defines or helps generate the underlying structural contract, TypeScript should consume that contract consciously rather than recreate it by hand.

The anti-pattern is duplicated parallel type hierarchies that drift silently.

The goal is not just to “share types.”  
The goal is to preserve one authoritative structural truth while still giving TypeScript enough ergonomic structure to be pleasant and safe to use.

---

## Boundary Ownership Model

| Layer | Primary Owner |
|---|---|
| Structural contract truth | Rust side when Rust defines or generates it |
| TypeScript consumption ergonomics | TypeScript side |
| Runtime validation at external trust boundaries | depends on boundary; often TypeScript side for consumer input handling |
| Build/export discipline for generated artifacts | shared boundary process, but Rust often initiates generation |
| Versioning and contract drift control | both sides, explicitly coordinated |

The doctrine is:
- Rust usually owns structural truth
- TypeScript owns consumer ergonomics
- both sides share responsibility for keeping the boundary explainable and stable

---

## Pattern 1 — Generated Contracts Deserve Respect

When Rust-driven tools such as `ts-rs`, `tsify`, or related generators produce TypeScript-facing artifacts, those artifacts should be treated as boundary truth inputs.

TypeScript still owns:
- local composition
- downstream ergonomics
- framework usage patterns
- consumer-side validation or wrapping where needed

But it should not casually fork the contract if the point of generation was single-source truth.

The doctrine is:
- generated contracts are not suggestions
- they are the closest thing the boundary has to shared structural truth

If the TypeScript side must diverge, that divergence should be explicit and justified.

---

## Pattern 2 — TypeScript Owns Consumer Ergonomics, Not Rust Truth

The TypeScript engine should teach:
- how to wrap generated types cleanly
- how to compose them into app architecture
- how to preserve frontend or consumer ergonomics
- how to model UI-facing helper types without redefining the contract source

This means TypeScript may add:
- convenience adapters
- branded/validated internal forms
- UI-layer view models
- richer helper abstractions

But it should not claim authority over the Rust-defined structural model.

The doctrine is:
- optimize local ergonomics without forking boundary truth

This is what prevents cross-engine drift.

---

## Pattern 3 — Generated Contracts and Runtime Validation Are Different Layers

Even with generated contract types, runtime boundaries may still need validation.

Examples:
- external network input reaches the TS app before Rust ever sees it
- user input is shaped locally in the frontend
- serialization/deserialization boundaries remain lossy or partially trusted
- WASM or IPC surfaces may still carry malformed or version-skewed payloads

Generated contracts reduce drift.
They do not magically eliminate runtime boundary work.

The doctrine is:
- contract generation answers “what shape do we agree on?”
- runtime validation answers “is this particular value actually trustworthy right now?”

Do not confuse the two.

---

## Pattern 4 — Import Layout and Build Flow Matter as Much as Types

Rust–TS contract sharing is not just a type problem.
It is also a build and file-layout problem.

The system should be able to answer:
- where generated files live
- how imports remain stable
- when generation runs
- how CI proves generated artifacts are current
- whether generated files are committed, checked, or regenerated on demand

If file layout is unstable, the contract pipeline becomes fragile even if the types are technically correct.

The doctrine is:
- interop discipline includes generation flow, not just the resulting interfaces

---

## Pattern 5 — One Source of Truth Beats Parallel Handwritten Mirrors

If the same contract exists in:
- Rust structs/enums
- generated TS types
- handwritten TS replicas
- ad hoc docs examples

then the system is paying a drift tax.

The doctrine is:
- prefer one authoritative structural source wherever practical
- let generated or derived artifacts flow from it
- keep handwritten local types clearly downstream of the source, not in silent competition with it

This is one of the most important economic arguments for generation.

---

## Pattern 6 — Schema Ownership and Versioning Must Be Explicit

The boundary should answer:
- who changes the contract first?
- how are breaking changes detected?
- how are consumers notified?
- what compatibility policy exists between Rust and TS releases?

Without this, teams often discover drift only when one side breaks.

The doctrine is:
- contract ownership is a versioning problem as much as a typing problem
- shared boundary artifacts should be treated like versioned API surfaces

---

## Pattern 7 — TypeScript May Refine Internal Meaning After Boundary Entry

Once a generated contract value is safely inside the TypeScript side, the local system may refine it.

Examples:
- convert plain string IDs into branded IDs
- lift generated DTOs into richer internal app models
- normalize optional/nullable shapes for UI consumption
- attach computed fields or view helpers

The doctrine is:
- refinement after entry is fine
- redefining the boundary source is not

This lets the TypeScript side remain ergonomic without dissolving the Rust-defined contract.

---

## Pattern 8 — Error Contracts Deserve the Same Respect as Success Contracts

Interop systems often pay too much attention to success payloads and too little to error payloads.

TypeScript should consume Rust-side error surfaces deliberately:
- promise rejection handling is part of the contract
- error strings vs structured error payloads matter
- UI code should not erase Rust-side error distinctions casually
- transport-layer wrapping should preserve enough detail to debug and recover

The doctrine is:
- error shape is part of the boundary contract, not incidental transport noise

This is especially important in Tauri, WASM, and RPC-like flows.

---

## Pattern 9 — Generated Types Should Be Easy to Audit in CI

A healthy interop pipeline should be able to prove:
- generation succeeded
- generated artifacts are current
- imports resolve correctly
- Rust-side structural changes propagate visibly
- TS consumers fail loudly when the contract changes incompatibly

The doctrine is:
- generated contracts should be testable and auditable artifacts
- not secret outputs of a local developer's environment

This is where interop doctrine connects directly to clean-code and build/deploy governance.

---

## Pattern 10 — Interop Boundaries Should Reduce Guesswork, Not Just Duplicate Safety Claims

A good Rust–TS boundary helps engineers answer:
- where does truth live?
- what is generated vs handwritten?
- where should validation happen?
- how should an import or adapter be structured?
- how do we detect drift?
- which engine owns which part of the fix?

The doctrine is:
- interop design succeeds when it reduces ownership ambiguity
- not when it merely adds another layer of type artifacts

---

## Contract Boundary Checklist

Before calling a Rust–TS boundary healthy, ask:

- [ ] Is there one clearly owned structural source of truth?
- [ ] Are generated contracts treated as real boundary artifacts rather than disposable helpers?
- [ ] Does TypeScript refine consumer ergonomics without forking the source contract?
- [ ] Are runtime validation and compile-time generation kept conceptually distinct?
- [ ] Are build paths, import layout, and generation timing explicit enough to reproduce?
- [ ] Are error contracts and versioning policies treated as boundary concerns too?
- [ ] Can CI and review surfaces detect drift early?

---

## Anti-Patterns

- parallel handwritten TS types drifting from Rust-owned contract truth
- assuming generated types eliminate the need for runtime trust decisions
- vague ownership over who changes the contract and how drift is detected
- unstable import/generation layout that breaks consumers unpredictably
- discarding Rust-side error structure and returning generic TS failures everywhere
- treating cross-language boundaries as ordinary local module imports

---

## Why This Matters to `typescript-coding-engine`

This doctrine strengthens the TypeScript engine's role in:
- consuming generated Rust contracts responsibly
- preserving a no-duplication posture
- keeping runtime validation distinct from compile-time generation
- integrating Rust-driven contracts into TS architecture sanely
- clarifying what TypeScript may refine locally without stealing boundary ownership

It is the main interop-lane statement for Rust-owned contract truth on the TypeScript side.

---

## Cross-Links

Read this alongside:
- `INDEX.md`
- `tauri-frontend-rust-bridge.md`
- `boundary-activation-model.md`
- `../clean-code/typescript-runtime-validation-decision-matrix.md`
- `../architecture/typescript-architecture-decision-trees.md`
- `../../rust-coding-engine/references/interop/rust-typescript-bridge-patterns.md`

---

## Final Doctrine

The reusable lesson is not:
> “if Rust generates the contract, TypeScript should consume it instead of duplicating it.”

The reusable lesson is:
> “Rust–TypeScript boundaries are governed contracts: let one side own structural truth, let the other side optimize consumer ergonomics without forking it, keep runtime validation separate from generation, and make build/import/version discipline explicit enough that drift becomes visible before it becomes architecture debt.”
