# TypeScript Interop Boundary Activation Model

## Purpose

Define the canonical activation doctrine for interop work inside `typescript-coding-engine`.

This document is the interop-lane bridge between broad doctrine and runtime usage.
It answers a focused question:

> when a task touches Rust↔TypeScript, Tauri, WASM, or generated-contract boundaries, how should the TypeScript engine activate the right interop knowledge and runtime support without flooding the session or prematurely escalating into tool-heavy workflows?

It focuses on:

- lane detection
- interop task classification
- bridge → doctrine → runtime sequencing
- bounded activation for Rust/TS, Tauri, and WASM edges
- cross-engine ownership routing
- conservative escalation into commands, agents, or donor inspection

## Source Provenance

- **Primary source:** current `typescript-coding-engine` interop doctrine subtree
- **Derived from:** interop activation and boundary canonization work for Rust↔TypeScript, Tauri-style bridges, and generated-contract workflows
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local activation doctrine aligned to the current TypeScript engine

---

## Core Rule

Interop activation should be selective, boundary-first, and contract-aware.

A strong interop activation model should answer:

- is this really an interop problem, or only a normal TypeScript problem with foreign nouns in it?
- which interop lane is active?
- what is the smallest doctrinal slice needed to orient the task?
- which engine owns structural truth?
- when does runtime support add leverage, and when is doctrine reading enough?

The goal is not maximum activation.
The goal is correct activation at the boundary where ownership becomes ambiguous.

---

## Activation Order

When the task belongs to the interop lane, prefer this order:

1. detect the interop lane
2. route through `skills/interop`
3. read canonical interop references
4. decide cross-engine ownership
5. use command or agent only if bounded decision support is needed
6. open donor reservoirs only if canonical guidance is insufficient

This order matters because interop work becomes messy quickly when tools or donor material are opened before ownership and boundary shape are understood.

---

## Interop Lanes

| Lane                          | Question Shape                                                                          |
| ----------------------------- | --------------------------------------------------------------------------------------- |
| Rust↔TS shared contracts      | who owns structural truth, how generated contracts are consumed, how drift is prevented |
| Tauri frontend/backend bridge | how TS shell calls Rust core through explicit IPC contracts                             |
| WASM and generated bindings   | how TypeScript consumes boundary artifacts from WASM or bridge generators               |
| Build/import alignment        | how generated artifacts live, update, and stay reproducible                             |

The doctrine is:

- interop is not one monolithic topic
- classify the boundary family before loading doctrine or invoking runtime support

---

## Ownership Routing Model

| Question Shape                                      | Primary Owner                           | Secondary Owner                                                       |
| --------------------------------------------------- | --------------------------------------- | --------------------------------------------------------------------- |
| Rust defines or generates the contract              | Rust-side doctrine for structural truth | TypeScript-side doctrine for consumer ergonomics                      |
| TypeScript consumes and refines generated artifacts | TypeScript interop lane                 | Rust interop lane only if ownership or generation behavior is unclear |
| Tauri shell behavior and TS wrappers                | TypeScript interop lane                 | Rust Tauri doctrine for core ownership and IPC law                    |
| Runtime validation at TypeScript trust boundaries   | TypeScript clean-code lane              | Interop lane if the trust boundary is contract-sensitive              |
| Build/import drift of generated artifacts           | shared boundary concern                 | whichever side owns generation first                                  |

The doctrine is:

- activation should clarify who owns the next decision
- not merely load multiple adjacent docs and hope the ownership resolves itself

---

## Pattern 1 — Detect Boundary Pressure, Not Just Tool Names

The system should not activate interop doctrine just because the prompt mentions:

- Rust
- WASM
- Tauri
- generated types

Useful signals include:

- contract ownership confusion
- build or generation drift concerns
- TS-side wrapper design for a foreign core
- IPC or serialization boundaries
- versioning or compatibility concerns across runtimes
- uncertainty about where validation should happen

The doctrine is:

- activate on real boundary pressure
- not on keyword coincidence

This prevents interop from colonizing tasks that are really just local TypeScript questions.

---

## Pattern 2 — Bridge First, Doctrine Second, Runtime Third

Interop activation should prefer:

`bridge -> doctrine -> runtime`

### Bridge

A light routing surface decides whether the task is actually interop-shaped.

### Doctrine

The relevant boundary doc is loaded so ownership, contract truth, and validation posture become explicit.

### Runtime

Commands or agents enter only when they reduce ambiguity more than another round of reading or reasoning would.

The doctrine is:

- the shell should not lead with runtime action on boundary questions that are still doctrinally unclear

This preserves both clarity and context efficiency.

---

## Pattern 3 — Load the Smallest Relevant Interop Slice

A mature activation model does not dump the whole interop subtree into every boundary question.

Prefer:

- `rust-typescript-contract-boundaries.md` when structural contract truth is central
- `tauri-frontend-rust-bridge.md` when IPC behavior and shell/core ownership are central
- build/import alignment questions routed into the relevant contract or bridge doc first
- Rust-side doctrine only when TS-side doctrine is insufficient for the decision being made

The doctrine is:

- interop activation succeeds when it narrows the boundary question quickly
- not when it floods the session with every adjacent cross-language concept

---

## Pattern 4 — Cross-Engine Ownership Should Be Resolved Before Runtime Escalation

Interop tasks often touch both:

- `typescript-coding-engine`
- `rust-coding-engine`

That means activation should quickly decide:

- is TS consuming a Rust-owned contract?
- is Rust the structural source of truth?
- is TypeScript refining only consumer ergonomics?
- is this primarily a Rust-side or TS-side boundary problem?

The doctrine is:

- interop activation should clarify engine ownership before implementation moves begin
- runtime escalation is weaker if ownership is still fuzzy

This is one of the highest-value contributions of the activation layer.

---

## Pattern 5 — Runtime Support Is for Bounded Leverage, Not Default Activation

Interop activation should escalate into commands or agents only when they materially help with:

- route choice
- contract review
- architecture review
- build or toolchain diagnosis
- interop-specific auditing
- shell/core review at a Tauri boundary

Weak reasons to escalate:

- the boundary sounds complicated
- the agent wants to look active
- the docs have not yet been read
- the system is using runtime surfaces as a substitute for classification

The doctrine is:

- runtime interop support should be explicit, bounded, and justified by decision leverage
- not used as decoration

---

## Pattern 6 — Tauri Activation Should Preserve Core/Shell Honesty

When the task is Tauri-shaped, activation should orient toward:

- TS shell ergonomics
- Rust core ownership
- IPC contract design
- error and async behavior at the boundary
- local validation posture on the TS side

It should not default to:

- frontend-only mental models
- “just call invoke” advice
- local-function-call illusions
- wrapper design that hides the fact a boundary exists

The doctrine is:

- Tauri activation should foreground IPC and ownership, not UI convenience alone

This is how the TypeScript engine stays architecturally honest at desktop boundaries.

---

## Pattern 7 — Generated Contracts and Runtime Validation Must Both Be Considered

Interop activation should help the system distinguish:

- generated or shared contract truth
- runtime validation needs at trust boundaries

A weak interop activation model loads only generation doctrine and forgets validation.
A different weak model loads only validation posture and ignores structural contract ownership.

The doctrine is:

- interop activation should make both compile-time contract truth and runtime trust posture visible when both matter

This is especially important for:

- Rust↔TS generated types
- Tauri payloads
- WASM-facing values

---

## Pattern 8 — Donor Reservoirs Are Fallback Evidence, Not Default Reading Surfaces

If the canonical interop docs answer the question, do not jump into:

- donor READMEs
- raw package layouts
- integration repos
- example projects as first-line truth

The doctrine is:

- donor reservoirs are fallback evidence only
- default interop activation should stay within canonical doctrine and root routing docs

This keeps the interop lane cleanup-safe and coherent.

---

## Pattern 9 — Interop Activation Should Leave Room for Other Lanes

An interop task may start as a boundary question and later shift into:

- runtime validation doctrine
- architecture decisions
- toolchain or build alignment
- Rust-side ownership doctrine
- clean-code migration or testing strategy

The activation layer should help the task move there without friction.

The doctrine is:

- interop activation should orient the boundary question strongly
- but not trap the task in the interop lane once another lane has become the true bottleneck

---

## Pattern 10 — Activation Quality Is Measured by Reduced Ownership Ambiguity

A successful activation should make it easier to answer:

- where truth lives
- who owns the contract
- where validation happens
- which engine should lead the next action
- whether a runtime surface is actually needed

The doctrine is:

- activation quality is not “did it load a lot of material?”
- it is “did it reduce the next ownership mistake?”

That is the main failure mode of interop work, and the activation layer should target it directly.

---

## Interop Activation Checklist

Before activating runtime support in the TypeScript interop lane, ask:

- [ ] Is this genuinely an interop boundary problem?
- [ ] Which boundary family is active?
- [ ] What is the smallest relevant doctrine slice?
- [ ] Which engine owns structural truth here?
- [ ] Do runtime surfaces add leverage now, or is doctrine enough?
- [ ] Is donor inspection actually necessary, or just tempting?
- [ ] Has runtime validation placement been considered alongside shared contract truth?

---

## Anti-Patterns

- activating interop because Rust, Tauri, or WASM was merely mentioned
- loading both Rust and TypeScript doctrine indiscriminately before ownership is resolved
- escalating into commands or agents before doctrinal classification is complete
- treating generated types as if they removed all runtime-trust decisions
- hiding Tauri or WASM boundaries behind wrapper convenience until ownership becomes unclear
- using donor repositories as the default activation surface

---

## Cross-Links

Read this alongside:

- `INDEX.md`
- `rust-typescript-contract-boundaries.md`
- `tauri-frontend-rust-bridge.md`
- `../clean-code/typescript-runtime-validation-decision-matrix.md`
- `../architecture/typescript-architecture-decision-trees.md`
- `../../rust-coding-engine/references/interop/INDEX.md`
- `../../rust-coding-engine/references/interop/rust-typescript-bridge-patterns.md`
- `../../rust-coding-engine/references/interop/rust-tauri-core-shell-and-ipc-boundaries.md`

---

## Final Doctrine

The reusable lesson is not:

> “activate TypeScript interop when Rust, WASM, or Tauri is mentioned.”

The reusable lesson is:

> “activate the TypeScript interop lane only when boundary pressure is real, load the smallest doctrine slice that clarifies ownership, resolve cross-engine truth before runtime escalation, and let activation reduce the next ownership mistake rather than merely increasing the amount of context in the session.”
