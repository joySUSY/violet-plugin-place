# Tauri Frontend–Rust Bridge

## Purpose

Define the canonical TypeScript-side doctrine for the Tauri frontend ↔ Rust core bridge inside `typescript-coding-engine`.

This document is narrower than the general Rust–TypeScript contract-boundary doctrine.
It focuses on the Tauri-specific question:

> when a TypeScript frontend calls into a Rust core through Tauri, how should the bridge be designed so commands, payloads, errors, async behavior, and boundary ownership remain explicit instead of degrading into "local function call" illusion?

It focuses on:
- IPC as a contract surface
- command shape
- naming and serialization
- result/error handling
- async and lifecycle assumptions
- Tauri core/shell separation on the TypeScript side

## Source Provenance

- **Primary source:** current `typescript-coding-engine` interop doctrine subtree
- **Derived from:** Tauri frontend/backend bridge, Rust↔TS interop, and core-shell canonization work across the TypeScript and Rust engines
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local interop doctrine aligned to the current TypeScript engine

---

## Core Rule

A Tauri bridge is not “frontend code magically calling backend code.”
It is an IPC contract.

That means the real design work is:
- command shape
- argument naming
- serialization/deserialization behavior
- error shape
- async boundary behavior
- security and capability boundaries

The goal is not just to make the call work.  
The goal is to make the boundary explicit enough that both the shell and the core remain honest about what they own.

---

## Boundary Ownership Model

| Layer | Primary Owner |
|---|---|
| UI composition and frontend ergonomics | TypeScript frontend |
| Native capability and system access | Rust core |
| IPC contract surface | shared boundary, explicitly designed |
| Serialization and naming translation | shared boundary, must be documented |
| Error semantics and recovery posture | shared boundary, consumed explicitly on TS side |

The doctrine is:
- the frontend shell owns user-facing composition
- the Rust core owns native truth
- the bridge owns the contract between them

---

## Pattern 1 — Commands Are the Preferred IPC Surface

The donor lesson is clear: Tauri commands are the recommended primary IPC lane.

From the TypeScript side, that means:
- call commands deliberately
- treat them as boundary invocations
- avoid pretending they are just local function calls with zero contract weight

The doctrine is:
- commands should be modeled like contract endpoints, not convenience helpers

This posture improves architecture clarity and reduces the temptation to hide bridge complexity.

---

## Pattern 2 — Naming and Serialization Are Part of the Contract

A seemingly small bridge detail—such as snake_case vs camelCase mapping—is actually contract doctrine.

If naming translation rules are unclear, the bridge becomes confusing quickly.

So the TypeScript engine should teach that:
- parameter naming conventions matter
- serialization shape is part of the IPC contract
- complex payloads deserve explicit typed structures
- TS-side wrappers should make naming expectations visible rather than accidental

The doctrine is:
- naming/serialization should be explicit enough that a new maintainer can predict payload shape without trial-and-error

---

## Pattern 3 — Returned Values Need Type Discipline

From the TS side, return values are not just “whatever `invoke` gives back.”
They should be represented with:
- explicit TS interfaces or generated contracts
- clear expectations about serialized shape
- awareness of when binary or structured data is crossing the boundary
- local wrappers that keep return types coherent for the UI layer

The doctrine is:
- bridge return values should enter the frontend as typed contracts, not as anonymous dynamic blobs

This is one of the main places where TypeScript earns its keep in a Tauri app.

---

## Pattern 4 — Result/Error Posture Must Stay Explicit

Rust-side `Result<T, E>` matters to the TS side because TS must consume error surfaces deliberately.

That means:
- promise rejection handling is part of bridge doctrine
- error strings vs structured error payloads matter
- UI code should not erase Rust-side error distinctions casually
- transport-level wrapping should preserve enough detail to debug and recover

The doctrine is:
- error contracts deserve the same design attention as success payloads

A bridge with vague error semantics quickly becomes hard to operate and debug.

---

## Pattern 5 — Async Boundary Is Real Even When the App Is Local

The TS engine should teach that a Tauri command bridge is an async boundary even when the call feels local.

That means:
- latency exists
- failure exists
- serialization cost exists
- lifecycle and cancellation may matter
- batching/ordering decisions may matter in UI flows

The bridge should not be designed with local-function-call assumptions.

The doctrine is:
- the frontend should model IPC like a boundary crossing, not like synchronous in-process composition

This is one of the biggest mindset upgrades in good Tauri architecture.

---

## Pattern 6 — Core/Shell Honesty Matters on the TypeScript Side Too

The Rust-side doctrine teaches Tauri as a core-shell system.
The TypeScript side must mirror that honesty.

That means:
- UI shell owns presentation, interaction, local state, and orchestration at the edge
- Rust core owns native/system capability, sensitive operations, and durable backend truth
- the frontend should not pretend it owns native truth merely because `invoke` is available everywhere

The doctrine is:
- the TS shell should remain a shell
- do not smuggle native/business authority into frontend convenience layers

This preserves clean architecture across the desktop boundary.

---

## Pattern 7 — TypeScript Wrappers Should Improve Ergonomics Without Hiding the Boundary

It is often useful to wrap raw `invoke` calls in TypeScript helpers.
That is good when the wrapper:
- centralizes names and paths
- preserves types
- standardizes error handling
- keeps component code cleaner

It is bad when the wrapper:
- makes IPC feel invisible
- hides contract shape changes
- swallows transport and error semantics

The doctrine is:
- wrappers should reduce repetition and improve ergonomics
- not dissolve the visibility of the bridge

A good wrapper should still make it obvious that a boundary crossing is happening.

---

## Pattern 8 — Runtime Validation and IPC Contracts Are Related but Distinct

A Tauri bridge often feels “safe” because it is local.
That can be misleading.

Questions still matter:
- is this payload trusted?
- does it come from user input or unvalidated local state?
- is the serialization layer itself enough, or do we need explicit validation?
- should the TypeScript side validate before invoking, after receiving, or both at different trust points?

The doctrine is:
- IPC contract typing does not eliminate runtime trust decisions
- local boundaries are still boundaries

This keeps interop doctrine aligned with runtime-validation doctrine.

---

## Pattern 9 — Build and Import Stability Are Part of the Bridge Contract

Tauri bridges are also build and import systems.

The frontend side should be able to answer:
- where IPC wrappers live
- where generated/shared contract files live
- how imports remain stable
- how the build proves the bridge stays synchronized
- how CI reveals contract drift or naming breakage

The doctrine is:
- bridge discipline includes layout and build flow
- not just the shape of one command call

If a Tauri bridge breaks because nobody knows where the contract wrapper lives, the architecture is under-specified.

---

## Pattern 10 — Tauri IPC Should Reduce Ownership Ambiguity

A good frontend bridge should make it easy to answer:
- what belongs in the TS layer?
- what belongs in Rust?
- what is shared as contract?
- where does error handling happen?
- where should validation happen?
- who owns fixing drift when the boundary changes?

The doctrine is:
- the bridge succeeds when it reduces ambiguity about ownership and shape
- not merely when the app compiles

---

## Tauri Bridge Checklist

Before calling a Tauri frontend↔Rust bridge healthy, ask:

- [ ] Are commands treated as explicit IPC contracts rather than local helper calls?
- [ ] Are naming and serialization rules explicit enough to predict the payload shape?
- [ ] Do returned values enter the frontend through typed, well-understood contracts?
- [ ] Are errors modeled deliberately instead of being flattened into generic failures?
- [ ] Is the async nature of the boundary still visible in the TS design?
- [ ] Do TS wrappers improve ergonomics without hiding the existence of the boundary?
- [ ] Are validation, import layout, and build flow explicit enough to control drift?
- [ ] Does the bridge reduce ownership ambiguity between shell and core?

---

## Anti-Patterns

- treating `invoke` as if it were just a local function call
- letting naming and serialization rules stay implicit
- returning untyped dynamic payloads into the UI layer
- swallowing Rust-side error distinctions into generic TS error strings everywhere
- hiding IPC boundaries behind wrappers so thoroughly that maintainers forget a boundary exists
- assuming local desktop boundaries do not need runtime trust discipline
- letting build or import layout drift until bridge maintenance becomes guesswork

---

## Why This Matters to `typescript-coding-engine`

This doctrine strengthens the TS engine's ability to teach:
- TS-side IPC clarity
- command-shape discipline
- explicit consumption of Rust-side results and errors
- shell/core honesty in Tauri apps
- how runtime validation and contract typing cooperate at the desktop boundary

It is the Tauri-specific companion to the broader Rust–TypeScript contract-boundary doctrine.

---

## Cross-Links

Read this alongside:
- `rust-typescript-contract-boundaries.md`
- `boundary-activation-model.md`
- `../clean-code/typescript-runtime-validation-decision-matrix.md`
- `../architecture/typescript-architecture-decision-trees.md`
- `../../rust-coding-engine/references/interop/rust-tauri-core-shell-and-ipc-boundaries.md`

---

## Final Doctrine

The reusable lesson is not:
> “a Tauri bridge is an IPC contract, so commands, serialization, errors, and async behavior matter.”

The reusable lesson is:
> “TypeScript-side Tauri bridge design is shell/core boundary design: treat commands as explicit IPC contracts, keep naming and serialization rules visible, preserve error and async truth across the boundary, and let frontend ergonomics improve the contract without erasing the fact that the frontend is crossing into Rust-owned native truth.”
