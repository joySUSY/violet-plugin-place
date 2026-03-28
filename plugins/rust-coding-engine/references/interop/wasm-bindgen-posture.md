# wasm-bindgen Posture

## Purpose

Define the canonical Rust-side doctrine for `wasm-bindgen`-style interop.

This document exists to answer a product-grade browser/runtime boundary question:

> when Rust is exposed through WebAssembly to JavaScript or TypeScript consumers, how should export surfaces, generated glue, module structure, serialization, runtime validation, packaging, release coordination, and cross-engine ownership be designed so the boundary remains explicit instead of becoming a pile of generated magic?

This lane applies when Rust must serve JS/TS consumers through surfaces such as:
- browser-facing WASM modules
- JS/TS package integrations around generated glue
- Rust models exported through WASM-facing contract surfaces
- mixed Rust/TS systems where the WASM artifact is one node in a larger release graph

## Source Provenance

- **Primary donor family:** `wasm-bindgen-main`
- **Key local donor materials:**
  - `wasm-bindgen-main/README.md`
  - `wasm-bindgen-main/guide/`
- **Cross-linked doctrine inputs:**
  - `rust-cross-language-workflows.md`
  - `rust-typescript-bridge-patterns.md`
  - `rust-sdk-ci-and-multi-surface-release-pipelines.md`
  - `../../typescript-coding-engine/references/interop/rust-typescript-contract-boundaries.md`
- **Upstream URL:** not yet fully re-verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending for replacement-grade claims

---

## Core Rule

`wasm-bindgen` is not just a convenience layer.
It is a **boundary tool** for expressing high-level interactions between Rust/Wasm and JavaScript.

That means the real design work is:
1. deciding what crosses the boundary
2. deciding how much glue is acceptable
3. deciding how stable the exported surface should be
4. deciding what structural truth Rust still owns
5. deciding how JS/TS consumers experience the artifact
6. deciding how drift and packaging are governed across release workflows

The doctrine is:
- `wasm-bindgen` is the bridge mechanism
- it is not the whole architecture

If the bridge cannot explain who owns structural truth, what is generated, and how the artifact is verified, it is still underdesigned even if the module loads in the browser.

---

## WASM Boundary Ownership Model

| Boundary Concern | Rust Owns | JS/TS Owns |
|---|---|---|
| Structural truth | core models, invariants, export decisions, native memory/logic discipline | consumer ergonomics, wrapper APIs, UI/runtime integration |
| Glue generation | exported functions/types, generated bindings, artifact truth | package consumption ergonomics, bundler integration, local wrappers |
| Runtime validation | Rust-side trust boundaries it actually receives | UI/browser-side validation for external/user input before values become trustworthy |
| Packaging | wasm artifact generation, module layout truth, release coordination when Rust initiates the artifact | downstream bundler/import ergonomics, app-side integration posture |

The doctrine is:
- Rust owns the WASM module's structural truth
- JS/TS owns the consumer-side ergonomics
- generated glue sits between them as boundary mechanism, not product doctrine by itself

---

## Pattern 1 — Export Only What the Surface Needs

A strong donor lesson is that generated glue should remain lightweight.

Only export:
- the Rust functions the JS side actually needs
- the JS imports the Rust side actually needs
- the smallest stable structural boundary that serves the product surface

Do **not** design the boundary as if every internal capability must be exposed.

This keeps the boundary:
- smaller
- cheaper
- easier to reason about
- easier to version and verify

The doctrine is:
- export minimization is architecture
- not premature austerity

---

## Pattern 2 — Treat WASM Artifacts as Module-Facing Products

The bridge is strongest when it fits naturally into modern JS/TS module workflows.

That means:
- think in module boundaries, not just generated files
- treat Rust/Wasm artifacts as part of a module-facing system
- make the JS side feel explicit and predictable
- decide whether the WASM surface is raw, wrapped, or adapted for downstream consumers

This matters because a WASM artifact is rarely consumed in isolation.
It usually enters:
- browser apps
- bundlers
- frontend frameworks
- TS contracts and wrappers

The doctrine is:
- a WASM artifact is a consumer-facing module boundary
- not just a compiled binary blob

---

## Pattern 3 — wasm-bindgen Is Not the Whole Contract Story

`wasm-bindgen` helps build the JS/Wasm bridge.
But it does not replace:
- overall contract design
- Rust-side structural ownership
- TS declaration strategy
- state and lifecycle reasoning across the boundary
- runtime validation decisions
- release graph design

In other words:
- use it as the bridge mechanism
- do not mistake it for the whole architecture

The doctrine is:
- the tooling layer may be generated
- the boundary law still needs to be designed

---

## Pattern 4 — Toolchain and Module Layout Are Part of Boundary Truth

Interop doctrine must include:
- CLI/tool installation/runtime implications
- build pipeline considerations
- MSRV/tooling constraints
- package/module layout consequences
- generated wrapper placement
- how consumers import and cache the module

Boundary tools are only healthy when their build and layout posture is understood.

The doctrine is:
- module layout is part of boundary law
- not just a bundler implementation detail

---

## Pattern 5 — wasm-bindgen Often Works Best Inside a Tool Family

In serious Rust–TS systems, `wasm-bindgen` often works alongside:
- `ts-rs`
- `tsify`
- frontend build tooling
- TypeScript-side contract doctrine
- runtime validation on the consumer side

The correct question is:
- what kind of boundary are we maintaining?

not:
- whether `wasm-bindgen` alone is enough to explain the whole system

The doctrine is:
- WASM lane design should stay coordinated with Rust–TS contract doctrine
- not become an isolated tool fandom note

---

## Pattern 6 — Serialization and Representation Choices Must Be Explicit

A serious WASM boundary still has representational choices:
- string vs structured object
- binary/buffer representation
- bigint/number expectations
- nullable/optional semantics
- enum/tagged representation
- manual wrapper conversion vs direct exported shape

The doctrine is:
- representation choices are contract law
- not incidental details of generated JS glue

If the consumer side cannot predict how values cross the boundary, the bridge is brittle even if generation succeeds.

---

## Pattern 7 — Generated Glue Needs Drift Control

A healthy `wasm-bindgen` workflow must decide:
- where generated JS/TS/WASM artifacts live
- when generation runs
- whether outputs are committed or ephemeral
- how CI proves generated artifacts are current
- what breaks when drift is detected
- whether bundler/runtime integration is verified against the same artifact truth

The doctrine is:
- generated glue is a release artifact
- not disposable local build noise

A WASM bridge without drift control is just a delayed failure.

---

## Pattern 8 — Runtime Validation and Generated Glue Solve Different Problems

A WASM boundary often feels safer than it is because generation exists.
That can be misleading.

Generated glue answers:
- how Rust and JS call each other structurally
- what exported/imported signatures exist

Runtime validation answers:
- whether values are trustworthy at this point in the app
- whether browser/UI input, network payloads, or stateful consumer values should be accepted
- whether version-skewed payloads still need defensive handling

The doctrine is:
- generation reduces mechanical drift
- it does not eliminate runtime trust decisions

Do not confuse the two.

---

## Pattern 9 — WASM Belongs in the Release Graph

A WASM artifact is part of a multi-surface release graph whenever Rust and frontend surfaces ship together.

The workflow must answer:
- what version truth coordinates Rust and JS/TS consumers?
- what artifact truth exists for the `.wasm` binary and generated JS wrappers?
- what order does publication/build happen in?
- what post-build and post-publish verification exists?
- how are browser/bundler compatibility expectations tested?

The doctrine is:
- a WASM artifact is not “just another build output”
- it is a first-class release artifact in multi-surface systems

This connects directly to `rust-sdk-ci-and-multi-surface-release-pipelines.md`.

---

## Pattern 10 — Cross-Engine Ownership Must Stay Explicit

WASM boundaries naturally span engines.
That does **not** make ownership ambiguous.

Default law:
- `rust-coding-engine` owns Rust-side structural truth and export discipline
- `typescript-coding-engine` owns TS-side consumer ergonomics, wrappers, and runtime-validation posture where TS is the consumer
- `cross-platform-development` owns broader support-tier and platform-boundary truth if desktop/web coexistence becomes dominant
- `developer-tool` owns broader build/runtime-surface orchestration when the problem becomes operational rather than Rust-doctrinal

The doctrine is:
- WASM boundary design succeeds when ownership is explicit across engines
- not when generated glue hides who owns what

---

## Pattern 11 — Verification Must Exercise the Real Consumer Surface

A WASM bridge is not verified by Rust tests alone.
A serious verification lattice often includes:
- Rust unit and integration tests
- generated artifact drift checks
- JS/TS import or smoke tests
- browser/runtime behavior checks where relevant
- packaging and bundler integration validation
- version compatibility checks across release artifacts

The doctrine is:
- if the consumer side is not exercised, the bridge is not fully verified
- compile success is necessary, not sufficient

---

## wasm-bindgen Checklist

Before calling a `wasm-bindgen` posture healthy, ask:

- [ ] Is the export surface smaller than the full Rust internals?
- [ ] Is the WASM artifact treated as a module-facing product surface?
- [ ] Are representation choices explicit (bigint/nullability/object shapes/binary data)?
- [ ] Are generated glue artifacts governed for drift?
- [ ] Are runtime validation and generation kept conceptually separate?
- [ ] Is the WASM artifact part of the release graph rather than an afterthought?
- [ ] Are cross-engine ownership boundaries explicit?
- [ ] Does verification exercise the actual JS/TS/browser consumer surface?

---

## Anti-Patterns

- exporting every internal Rust capability because generation makes it easy
- treating generated glue as if it explains the whole boundary
- letting bundler or import-path conventions emerge accidentally
- assuming generated wrappers remove the need for runtime validation
- treating `.wasm` output as build debris instead of artifact truth
- hiding cross-engine ownership behind the convenience of generated JS
- using `wasm-bindgen` as a brand answer instead of a boundary-specific tool

---

## Cross-Links

Read this alongside:
- `rust-cross-language-workflows.md`
- `rust-typescript-bridge-patterns.md`
- `boundary-activation-model.md`
- `rust-sdk-ci-and-multi-surface-release-pipelines.md`
- `../../typescript-coding-engine/references/interop/rust-typescript-contract-boundaries.md`
- `../governance/source-reservoir-map.md`

---

## Final Doctrine

The reusable lesson is not:
> “`wasm-bindgen` helps Rust talk to JavaScript.”

The reusable lesson is:
> “a `wasm-bindgen` boundary is a product-grade WASM module surface that must make export law, structural ownership, representation choices, generated-glue governance, runtime validation placement, release-graph coordination, and cross-engine ownership explicit—otherwise the module may build successfully while remaining architecturally unstable for real JS/TS consumers.”
