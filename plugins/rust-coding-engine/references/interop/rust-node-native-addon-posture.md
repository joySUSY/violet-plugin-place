# Rust Node Native Addon Posture

## Purpose

Define the canonical Rust-side posture for Node.js native bindings using `napi-rs`-style tooling.

This document exists to answer a production-grade interop question:

> when Rust is exposed as a Node-native addon, how should the JS-facing API, Rust-side contract truth, async model, packaging, TypeScript surface, and release verification be designed so the addon behaves like a real product surface instead of a thin demo wrapper?

This is not merely about calling Rust from JavaScript.
It is about designing a **native consumer boundary** with clear ownership, stable contract shapes, and cross-platform release discipline.

## Source Provenance

- **Primary donor family:** `napi-rs-node-bindings`
- **Key local donor materials:**
  - `napi-rs-node-bindings/napi-rs-node-bindings/SKILL.md`
  - `napi-rs-node-bindings/napi-rs-node-bindings/references/type-conversions.md`
  - `napi-rs-node-bindings/napi-rs-node-bindings/references/error-handling.md`
  - `napi-rs-node-bindings/napi-rs-node-bindings/references/async-patterns.md`
  - `napi-rs-node-bindings/napi-rs-node-bindings/references/build-publish.md`
- **Cross-linked doctrine inputs:**
  - `rust-cross-language-workflows.md`
  - `rust-sdk-ci-and-multi-surface-release-pipelines.md`
  - `rust-typescript-bridge-patterns.md`
- **Upstream URL:** not yet fully re-verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending for replacement-grade claims

---

## Core Rule

A Rust → Node binding is not just “FFI that happens to reach JavaScript.”
It is a **native addon surface** with its own:
- JS API ergonomics
- Rust-side contract ownership
- async/Promise expectations
- error semantics
- packaging and distribution law
- TypeScript consumption posture

That means the design work must answer:
1. what JS-visible surface should exist?
2. what structural truth does Rust own?
3. how do async Rust tasks feel Promise-native on the JS side?
4. how do errors and panics get contained at the boundary?
5. how are platform targets built, published, and verified?
6. how does the TypeScript consumer surface stay aligned with the native truth?

If those questions are unanswered, the addon is still underdesigned even if it loads successfully in Node.

---

## Native Addon Boundary Model

| Boundary Concern | Rust Owns | Node / TS Owns |
|---|---|---|
| Structural truth | native logic, invariants, memory safety, public core types | consumer ergonomics over that truth |
| Surface contract | exported native functions/classes and conversion rules | JS/TS naming, consumption patterns, wrapper helpers |
| Async behavior | execution model, thread safety, blocking boundaries | Promise expectations, cancellation ergonomics, event loop impact |
| Error truth | native error taxonomy and conversion posture | rejected Promise handling and app-side recovery UX |
| Distribution | binary builds, target matrix, addon artifacts | install surface, package-manager ergonomics, frontend integration |

The doctrine is:
- Rust owns native truth
- Node owns consumer ergonomics
- TypeScript may own additional static consumer ergonomics, but not Rust's structural reality

---

## Pattern 1 — Choose the Native Addon Lane Only When Node Is a Real Consumer

Use the Node addon lane when:
- Node.js is a real product runtime, not just a temporary glue layer
- the system benefits from native performance or native capabilities inside a JS application
- packaging native artifacts for Node consumers is acceptable operationally
- Rust should own the heavy or safety-critical logic

Do **not** choose this lane casually when:
- a CLI boundary would be simpler
- a service boundary would be simpler
- WASM would satisfy the consumer surface with lower operational burden
- Node only needs to shell out to an existing process

The doctrine is:
- native addons are justified by consumer shape and operational value
- not by novelty or performance vanity alone

---

## Pattern 2 — Expose a Deliberate JS Surface, Not Raw Rust Internals

A good native addon should not export Rust implementation shape blindly.

Instead, it should expose:
- a deliberate JS/TS-facing API
- stable constructors or functions
- explicit object/class or plain-object choices
- carefully chosen property and method names
- predictable serialization and return shapes

The deeper lesson is:
- Rust internals may be rich and domain-specific
- the addon surface should still feel coherent to Node consumers

The doctrine is:
- the addon API is a product surface
- not a transparent window into Rust internals

---

## Pattern 3 — Rust Core and Addon Wrapper Must Stay Distinct

A durable Node addon architecture usually has three layers:

1. **Rust core**
   - domain logic
   - algorithms
   - data structures
   - performance-sensitive internals

2. **Addon wrapper layer**
   - NAPI-facing exports
   - conversion logic
   - Promise bridging
   - error conversion
   - boundary-safe wrappers

3. **JS/TS package surface**
   - entrypoint exports
   - optional JS helpers
   - `.d.ts` generation or TS wrappers
   - package metadata and install ergonomics

The doctrine is:
- wrapper logic should stay thinner than core logic
- package ergonomics should stay thinner than wrapper logic

Without this separation, every JS concern leaks backward into the Rust core.

---

## Pattern 4 — Type Conversion Is Public Contract Design

Rust ↔ JS type conversion is not a detail.
It is part of the public API contract.

A serious addon must decide explicitly how it handles:
- primitive numeric types
- `i64/u64` vs JS `number` / `bigint`
- `Option<T>` vs `T | null | undefined`
- buffers and binary data
- classes vs plain objects
- nested collections and structural types
- enum-like shapes and tagged variants

The doctrine is:
- conversion rules are public law
- not hidden implementation trivia

This is why the addon lane belongs in canonical interop doctrine rather than just example snippets.

---

## Pattern 5 — Async Rust Must Feel Promise-Native on the JS Side

A strong native addon should make async Rust feel natural in Node.

That means the architecture should be explicit about:
- which operations return Promises
- which operations are synchronous by design
- where CPU-heavy work leaves async executors or uses background execution properly
- how cancellation or timeout posture is modeled
- how event-loop blocking is prevented

The doctrine is:
- async Rust is not automatically good Node ergonomics
- it becomes good ergonomics only when Promise-facing behavior is deliberately designed

If the JS side receives “technically async” behavior that still starves the event loop or hides latency ambiguities, the boundary is still weak.

---

## Pattern 6 — Error Conversion Needs Native and Consumer Semantics

A robust addon needs a deliberate error posture.

The design should answer:
- what Rust error taxonomy exists internally?
- how is that converted to addon-visible error shapes?
- what gets preserved versus collapsed into strings?
- what is recoverable at the boundary versus fatal?

Useful patterns include:
- `From<DomainError> for napi::Error`
- status/category mapping
- meaningful JS-visible messages
- Promise rejections that preserve enough semantic meaning to handle correctly upstream

The doctrine is:
- error conversion is API design
- not a late wrapper after the “real work” is already done

---

## Pattern 7 — Panic Containment and Thread Safety Still Matter

Even when a bridge library helps with boundary safety, the canonical posture should still be:
- avoid panic-driven behavior
- prefer explicit `Result` returns
- contain panic at native boundaries when needed
- treat cross-boundary panic escape as a design smell
- keep thread-safety and `Send`/`Sync` assumptions explicit where async or background tasks are involved

The doctrine is:
- native addon stability is part of the product promise
- not just a Rust implementation concern

---

## Pattern 8 — Packaging Is Part of the Boundary, Not an Afterthought

A native addon surface is inseparable from its build and distribution model.

That includes:
- `Cargo.toml` posture
- `package.json` posture
- artifact naming
- generated JS and `.d.ts` surfaces
- target triples and prebuild strategy
- install-time vs prebuilt artifact expectations

The doctrine is:
- packaging is part of addon architecture
- not something to bolt on after the exports already exist

If the addon cannot explain how consumers install it, it does not yet have a complete consumer boundary.

---

## Pattern 9 — Platform Matrix Is Product Truth

For native Node addons, the platform matrix is not a build detail.
It is part of what the package promises.

Questions that must be explicit:
- which OS/arch targets are first-class?
- which targets are best-effort or unsupported?
- what toolchain or cross-compilation strategy is used?
- how are binaries named and distributed?
- what post-build verification runs per target?

The doctrine is:
- platform support is a product claim
- native addon packaging must not bluff about it

This directly connects Node addon posture to the engine's multi-surface release doctrine.

---

## Pattern 10 — TypeScript Surface Is Part of Addon Experience

A modern native Node addon should not stop at runtime bindings.
It should also care about:
- generated `.d.ts`
- TS ergonomics for functions/classes/objects
- nullability and large-integer representation
- compatibility between native runtime shapes and TS-visible types

The doctrine is:
- the TypeScript surface is part of the consumer contract
- but Rust still owns the Rust-side structural truth

Cross-engine law:
- `rust-coding-engine` owns Rust-side contract generation and boundary safety
- `typescript-coding-engine` owns TS-side consumption ergonomics and TS-local validation posture

---

## Pattern 11 — Multi-Surface Release Graph Must Include Addon Realities

A Node native addon often participates in a broader release graph:
- crate publication
- npm/native addon publication
- GitHub release artifacts
- possibly TS declarations or generated contract output

The workflow must answer:
- what version truth coordinates crate and npm surfaces?
- what artifact truth exists for each target?
- what order do releases publish in?
- what happens if some platform artifacts fail to publish?
- what post-publish verification exists for install and load behavior?

The doctrine is:
- Node addon publishing is the Node-facing half of Rust multi-surface release law
- not a side quest outside production doctrine

---

## Pattern 12 — Verification Must Exercise the Consumer Boundary

A serious addon is not verified by Rust-side tests alone.
A real verification lattice often includes:
- Rust unit and integration tests
- JS/TS consumer smoke tests
- Promise/error-path tests
- install validation
- multi-platform packaging checks
- generated `.d.ts` drift checks where relevant

The doctrine is:
- if the consumer boundary is not exercised, the addon is not fully verified
- successful compile and link are necessary, not sufficient

---

## Pattern 13 — Native Addon Workflows Should Route by Pressure, Not Fandom

`napi-rs`, `wasm-bindgen`, `ts-rs`, and other tools solve different boundary problems.
The correct question is:
- what kind of consumer boundary are we maintaining?

not:
- which tool feels generally nicest?

The doctrine is:
- native addon tool selection is subordinate to boundary pressure
- not the result of ecosystem fandom

---

## Node Native Addon Checklist

Before calling a Node addon posture healthy, ask:

- [ ] Is Node actually the right consumer lane?
- [ ] Is the Rust core smaller and more stable than the wrapper?
- [ ] Are type conversion rules explicit, especially for large integers and nullability?
- [ ] Does async Rust feel Promise-native on the JS side?
- [ ] Is error conversion deliberate and recoverable?
- [ ] Is panic containment and thread-safety posture explicit?
- [ ] Is packaging/install posture explicit?
- [ ] Is the platform matrix treated as product truth?
- [ ] Is the TypeScript surface governed as part of the addon experience?
- [ ] Does release and verification exercise the real consumer boundary?

---

## Anti-Patterns

- exposing raw Rust internals as the JS contract
- deciding on native addons before identifying the real consumer lane
- treating type conversion as an implementation detail
- async exports that are technically valid but event-loop hostile
- stringifying all errors and calling the boundary “simple”
- pretending platform support exists without explicit matrix and verification
- shipping `.d.ts` that drift from runtime behavior
- separating addon packaging doctrine from release doctrine

---

## Cross-Links

Read this alongside:
- `rust-ffi-and-interop-overview.md`
- `rust-cross-language-workflows.md`
- `rust-typescript-bridge-patterns.md`
- `rust-sdk-ci-and-multi-surface-release-pipelines.md`
- `rust-interop-testing-and-audit-discipline.md`
- `../governance/source-reservoir-map.md`
- `../../typescript-coding-engine/references/interop/rust-typescript-contract-boundaries.md`

---

## Final Doctrine

The reusable lesson is not:
> “a Rust native addon lets Node call Rust code.”

The reusable lesson is:
> “a Rust Node native addon is a product-grade consumer boundary that must make JS-facing API shape, Rust-side contract truth, Promise semantics, conversion law, packaging, platform matrix, TypeScript ergonomics, release graphs, and verification explicit—otherwise the addon may work locally while still being architecturally unstable.”
