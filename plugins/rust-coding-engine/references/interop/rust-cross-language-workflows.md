# Rust Cross-Language Workflow Doctrine

## Purpose

Define the canonical workflow doctrine for Rust systems that must coexist with other language or runtime surfaces.

This document is not a grab-bag of interop snippets.
It exists to answer a harder engineering question:

> once a Rust system crosses a language boundary, how should the work be organized so contract truth, wrapper boundaries, packaging, verification, and release coordination remain explicit instead of drifting across ecosystems?

It applies to combinations such as:
- Rust + Python
- Rust + Node.js / TypeScript
- Rust + WASM + browser runtime
- Rust + desktop shell + web frontend
- Rust + an existing non-Rust implementation that must remain behaviorally aligned
- Rust + multiple publication surfaces released together

## Source Provenance

- **Primary donor families:** `napi-rs-node-bindings`, `wasm-bindgen-main`, `ts-rs-main`, `tsify-main`, `flow-skills-pyo3`, `calling-rust-from-tauri-frontend`, `understanding-tauri-architecture`, `rust-sdk-ci`
- **Key local donor materials:**
  - `napi-rs-node-bindings/napi-rs-node-bindings/SKILL.md`
  - `wasm-bindgen-main/README.md`
  - `ts-rs-main/README.md`
  - `tsify-main/README.md`
  - `flow-skills-pyo3/skills/pyo3/SKILL.md`
  - `calling-rust-from-tauri-frontend/SKILL.md`
  - `understanding-tauri-architecture/SKILL.md`
  - `rust-sdk-ci/rust-sdk-ci/skill.md`
- **Upstream URL:** not yet fully re-verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending for replacement-grade claims

---

## Core Rule

A cross-language Rust workflow is not just a binding choice.
It is a **coordination problem across contract ownership, wrapper boundaries, packaging, verification, and release graphs**.

A serious workflow must answer these questions explicitly:
1. which side owns the structural truth?
2. which consumer lane is primary?
3. how do wrappers stay thinner than the Rust core?
4. how do generated or mirrored artifacts stay in sync?
5. how is the boundary verified from both sides?
6. how are releases coordinated when more than one surface ships?

If those questions are unanswered, the workflow is still underdesigned even if the code compiles.

---

## Workflow Taxonomy

| Workflow Family | Typical Shape | Primary Risks |
|---|---|---|
| Rust as native accelerator for another runtime | Rust core + Python/Node/WASM-facing surface | contract drift, packaging complexity, API overexposure |
| Rust as canonical contract source | Rust models generate TS/types/schema outputs | stale generated artifacts, wrong ownership assumptions |
| Rust and another language must stay behaviorally aligned | mirrored logic, fixtures, or compatibility outputs | parity drift, semantic divergence, noisy maintenance |
| Rust core inside multi-surface product | desktop/web/backend/tooling all depend on shared Rust truth | platform leakage, fuzzy ownership, fragmented release graphs |
| Rust project publishing through multiple registries | crate + wheel + npm/native addon + release bundles | version drift, publish-order failure, incomplete verification |

The doctrine is:
- identify which workflow family is active first
- do not collapse all interop work into one undifferentiated “bindings” category

---

## Pattern 1 — Choose the Primary Consumer Lane Before Choosing Tools

Do not start by asking “which library do we like?”
Start by asking “who is the primary consumer?”

Examples:
- Python package consumer -> PyO3 / Maturin lane
- Node native consumer -> NAPI-RS lane
- browser consumer -> WASM lane
- TypeScript contract consumer -> generated-contract lane (`ts-rs`, `tsify`, or equivalent)
- desktop shell calling backend -> Tauri IPC lane

A system may use more than one lane.
But each boundary still needs a primary consumer lane.

This matters because different consumers imply different:
- packaging expectations
- install surfaces
- error shapes
- async models
- contract ergonomics
- release verification needs

The doctrine is:
- consumer-lane selection comes before tool selection
- tool choice is downstream of workflow shape, not the other way around

---

## Pattern 2 — Keep the Rust Core Smaller and More Stable Than Its Wrappers

A durable cross-language system keeps the Rust core smaller and more stable than the wrappers around it.

That usually means:
- core logic and domain types stay in Rust-native crates/modules
- language-specific wrappers sit at explicit outer layers
- foreign-facing API shape is chosen deliberately, not leaked from internals
- serialization and boundary structs are treated as contract surfaces, not as incidental byproducts

Without this separation:
- consumer constraints start mutating Rust internals directly
- the Rust core becomes packaging-aware in the wrong places
- each new language consumer increases core complexity instead of wrapper complexity

The doctrine is:
- let the Rust core own correctness, invariants, and performance discipline
- let wrappers own foreign-runtime ergonomics

---

## Pattern 3 — Decide the Contract Sync Model Consciously

There are only a few healthy sync models.

### Model A — Generated contract model
Rust owns the structural truth and exports artifacts outward.

Examples:
- Rust types -> TS declarations
- Rust types -> C headers
- Rust types -> schema artifacts

### Model B — Boundary validation model
Both sides may own shapes, but runtime validation and tests hold the contract together.

### Model C — Behavioral parity model
Two implementations exist in different languages and must preserve behavior under shared tests, fixtures, or checklists.

The doctrine is:
- choose one sync model consciously
- document it explicitly
- do not let sync happen through tribal memory

If nobody can explain which sync model the system uses, drift has already begun.

---

## Pattern 4 — Release Graphs Are Part of the Workflow, Not a Deployment Detail

A cross-language workflow is incomplete if it describes coding and binding, but not release coordination.

Once Rust ships through more than one surface, the workflow must answer:
- what version is shared across surfaces?
- what artifact is authoritative for each consumer lane?
- what order do publications happen in?
- what happens if one surface publishes and another fails?
- what post-publish verification exists per surface?

Examples of release-graph nodes:
- crates.io publication
- Python wheels
- npm/native addon packages
- WASM packages or web bundles
- desktop shell packaging
- GitHub release artifacts

The doctrine is:
- multi-surface release is architecture, not release-script trivia
- release graphs should be explicit in cross-language workflows

---

## Pattern 5 — Verification Must Cross the Boundary Too

A serious cross-language workflow verifies more than the Rust side.

A trustworthy verification lattice often includes:
- Rust-side unit and integration tests
- consumer-side smoke or acceptance tests
- generated artifact drift checks
- packaging and install validation
- parity checks where mirrored implementations coexist
- fixture-based boundary verification for serialization-sensitive systems

This is where `rust-interop-testing-and-audit-discipline.md` becomes essential.

The workflow is only trustworthy when the boundary is exercised from both directions where relevant.

The doctrine is:
- a boundary is not verified just because Rust tests pass
- the consumer experience must be probed too

---

## Pattern 6 — Multi-Surface Systems Need Ownership Maps

When one Rust system feeds many surfaces at once, it helps to think in ownership maps.

For each surface, answer:
- what does this surface own?
- what does Rust still own centrally?
- what must never be duplicated by hand?
- what is generated vs wrapped vs manually composed?
- which side owns behavioral guarantees versus presentation ergonomics?

This matters especially for:
- Rust + TS + WASM combinations
- Tauri/web coexistence
- data-model-heavy products
- systems that expose CLI + API + bindings simultaneously

The doctrine is:
- ownership maps reduce fuzzy boundaries
- fuzzy boundaries are the birthplace of cross-language drift

---

## Pattern 7 — Parity Workflows Need Explicit Drift Control

Sometimes Rust is not the only implementation.
A Python or JS version may continue to exist.

In that case, the workflow must decide:
- what behavior is the parity target?
- which tests or fixtures define equivalence?
- which parts are intentionally allowed to diverge?
- who approves a change that breaks parity?
- whether parity is temporary migration scaffolding or a long-term requirement

Without this, parity work becomes vague, expensive, and emotionally noisy.

The doctrine is:
- parity must have a drift policy
- otherwise parity becomes mythology instead of engineering

---

## Pattern 8 — Packaging Is a First-Class Workflow Stage

A cross-language workflow must include packaging as a core stage, not an afterthought.

Examples:
- wheel build/install for Python
- npm/native matrix for Node
- wasm artifact generation and import surface for browser use
- desktop shell packaging for Tauri

This is why an interop workflow is never only about code.
It is also about:
- artifact layout
- install surfaces
- CI and release orchestration
- consumer runtime compatibility
- generated asset placement

The doctrine is:
- packaging pressure is part of boundary design
- not something to bolt on once bindings already exist

---

## Pattern 9 — Generated Artifacts Need Explicit Drift Control

Whenever Rust generates artifacts for another ecosystem, the workflow must make artifact governance explicit.

Examples:
- `.d.ts` or TS type output
- C headers
- schema or manifest output
- generated binding glue

The workflow should answer:
- where generated artifacts live
- when regeneration happens
- what checks fail if they drift
- whether generated artifacts are committed or ephemeral
- who owns regeneration failures in CI

The doctrine is:
- generated artifacts are part of the workflow contract
- not incidental build debris

---

## Pattern 10 — Cross-Engine Ownership Must Be Explicit

Interop work often crosses engine boundaries.
That does **not** mean ownership is ambiguous.

Default law:
- `rust-coding-engine` owns Rust-side structural truth
- `typescript-coding-engine` owns TS-side consumer ergonomics and TS-local validation posture
- `python-dev-skill` owns Python-side consumer ergonomics where appropriate
- `cross-platform-development` owns broader support-tier and platform-boundary truth
- `developer-tool` owns broader runtime-surface and shell-law questions when the issue becomes operational rather than Rust-doctrinal

The doctrine is:
- the Rust engine must preserve Rust-side truth
- it must not claim ownership of every foreign-runtime concern just because Rust is involved

---

## Pattern 11 — Shell Escalation Must Remain Bounded

This workflow doctrine should govern when the runtime shell gets involved.

Use shell surfaces when:
- the active boundary is already clear
- the user needs an explicit prime or route workflow
- a bounded specialist diagnosis is needed

Do not escalate to shell when:
- the problem is still primarily doctrinal
- the primary consumer lane is still unclear
- canonical doctrine already answers the question cleanly

The doctrine is:
- shell surfaces should make cross-language work more navigable
- not replace doctrinal reasoning with convenience-first execution

---

## Workflow Checklist

For any non-trivial cross-language workflow, confirm:

- [ ] primary consumer/runtime lane identified
- [ ] Rust-core vs wrapper boundary explicit
- [ ] contract sync model chosen (generated / validated / parity)
- [ ] ownership map documented for multi-surface systems
- [ ] packaging and release graph defined
- [ ] consumer-side verification exists where relevant
- [ ] drift control strategy documented
- [ ] cross-engine ownership boundaries explicit

---

## Anti-Patterns

- choosing tooling before identifying the primary boundary owner
- exposing Rust internals directly as the foreign contract
- relying on manual sync for generated-contract-worthy systems
- no consumer-side validation
- mixing crate discovery or benchmarking into workflow doctrine until the page loses its coordination focus
- keeping mirrored implementations without an explicit parity policy
- treating multi-surface releases as one-dimensional publish steps
- letting wrappers accumulate product logic that belongs in the Rust core

---

## Cross-Links

This doctrine should be read alongside:
- `boundary-activation-model.md`
- `rust-ffi-and-interop-overview.md`
- `rust-pyo3-maturin-bindings.md`
- `rust-node-native-addon-posture.md`
- `rust-typescript-bridge-patterns.md`
- `wasm-bindgen-posture.md`
- `rust-tauri-core-shell-and-ipc-boundaries.md`
- `rust-interop-testing-and-audit-discipline.md`
- `../production/rust-sdk-ci-and-multi-surface-release-pipelines.md`
- `../governance/source-reservoir-map.md`
- `../ecosystem/rust-crate-ecosystem-navigator.md`

---

## Final Doctrine

The reusable lesson is not:
> “Rust can talk to many languages.”

The reusable lesson is:
> “a cross-language Rust system needs explicit workflow law for consumer-lane selection, contract ownership, wrapper boundaries, packaging, release graphs, verification, and cross-engine routing; otherwise the boundary will drift even when every local piece appears to work.”
