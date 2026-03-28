# Rust–TypeScript Bridge Patterns

## Purpose

Define the canonical Rust-side doctrine for generating, maintaining, and governing Rust–TypeScript contract boundaries.

This document is not just about tool usage.
It exists to answer a harder boundary question:

> when Rust and TypeScript share data contracts, how should Rust own structural truth, how should generated artifacts be governed, and how should contract drift be prevented across build, packaging, runtime validation, and multi-surface release workflows?

This lane applies when Rust must serve TypeScript consumers through surfaces such as:

- generated `.d.ts` or TS declarations
- WASM-facing TS contracts
- Tauri frontend/backend bridges
- shared models across backend + frontend + CLI tools
- mixed Rust/TS systems with coordinated release graphs

## Source Provenance

- **Primary donor families:** `ts-rs-main`, `tsify-main`, `wasm-bindgen-main`
- **Key local donor materials:**
  - `ts-rs-main/README.md`
  - `tsify-main/README.md`
  - `wasm-bindgen-main/README.md`
- **Cross-linked doctrine inputs:**
  - `rust-cross-language-workflows.md`
  - `boundary-activation-model.md`
  - `rust-sdk-ci-and-multi-surface-release-pipelines.md`
  - `../../typescript-coding-engine/references/interop/rust-typescript-contract-boundaries.md`
- **Upstream URL:** not yet fully re-verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending for replacement-grade claims

---

## Core Rule

If Rust and TypeScript share structural contracts, there should be one authoritative Rust-side definition and a deterministic way to derive the TypeScript side from it.

The anti-pattern is hand-maintained duplicated contract models drifting over time.

A serious Rust–TypeScript boundary must answer:

1. who owns structural truth?
2. what artifact is generated versus handwritten?
3. how do serialization rules shape the TS boundary?
4. how are generated artifacts kept in sync?
5. where does runtime validation still belong?
6. how is release coordination handled when Rust and TypeScript ship together?

If those questions are not explicit, the bridge is still underdesigned even if type generation currently “works.”

---

## Boundary Ownership Model

| Boundary Concern          | Rust Owns                                                                                         | TypeScript Owns                                                                    |
| ------------------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Structural contract truth | native data model, serialization truth, canonical structural definitions                          | consumer ergonomics over the generated contract                                    |
| Artifact generation       | generation discipline, output truth, drift detection triggers                                     | consumption ergonomics, import stability, local wrapping patterns                  |
| Runtime validation        | Rust-side trust boundaries it actually receives                                                   | TS-side validation for external/user/browser/UI input before values can be trusted |
| Packaging                 | Rust-side artifact generation, build graph, release coordination when Rust initiates the contract | TS-side package/bundle/import ergonomics                                           |

The doctrine is:

- Rust usually owns structural truth
- TypeScript owns consumer ergonomics
- both sides share responsibility for keeping the boundary explainable and stable

---

## Pattern 1 — Rust Owns the Canonical Structural Model

When the bridge is Rust-driven, `rust-coding-engine` should teach that Rust owns:

- the authoritative structural model
- the serialization contract truth
- the export discipline
- the release-time drift checks for generated boundary artifacts

The TypeScript engine then cross-links from the TS side.

This avoids ambiguity about where the real contract source lives.

The doctrine is:

- if Rust is the producer of truth, Rust must remain the source of truth
- TypeScript must not silently fork that truth just because generation exists

---

## Pattern 2 — Generate TS from Rust Types Deliberately

`ts-rs`, `tsify`, and related tools demonstrate a high-value doctrine pattern:

- define the types in Rust
- derive TS declarations from those Rust types
- export them as deterministic build/test artifacts
- make the output location explicit

This keeps:

- backend truth centralized
- frontend contracts synchronized
- schema drift lower than handwritten duplication
- generated boundary artifacts auditable in CI

The doctrine is:

- generation is not convenience frosting
- it is the contract-distribution mechanism of the boundary

---

## Pattern 3 — Different Bridge Tools Serve Different Boundary Shapes

Use doctrine, not tool fandom.

Examples:

- `ts-rs` for declaration generation from Rust-side structural truth
- `tsify` for TS conversion patterns closer to WASM/browser-facing surfaces
- `wasm-bindgen` when the boundary includes JS/WASM invocation and module glue

The correct question is:

- what kind of boundary are we maintaining?

not:

- which tool is generally coolest?

The doctrine is:

- tool choice is downstream of boundary shape
- not a brand choice

---

## Pattern 4 — Serialization Rules Are Part of the Contract, Not an Implementation Detail

If Rust serialization attributes influence the produced TS contract, boundary discipline must account for that.

That includes:

- field naming rules
- renaming rules
- tag/content enum shapes
- `flatten`
- `default`
- omission vs null semantics

The lesson is:

- TS bridge generation is not just syntax generation
- it is contract generation grounded in real serialization behavior

The doctrine is:

- the boundary must be explained in terms of serialization truth
- not only in terms of generated type syntax

---

## Pattern 5 — Large Integer, Nullability, and Format Choices Must Be Explicit

Bridge tools often need configuration for:

- export directory
- import extension or module path
- large integer representation
- enum formatting
- nullable and optional shapes

These choices should not be left implicit in a serious system.

Why:

- frontend runtime assumptions vary
- `bigint` vs `number` is not a trivial difference
- `undefined` vs `null` vs omitted field is a real semantic difference
- file-layout choices affect downstream imports, bundlers, and review surfaces

The doctrine is:

- representational choices are part of boundary law
- not small local preferences

---

## Pattern 6 — Generated Artifacts Need Explicit Drift Control

A healthy Rust–TS boundary must decide:

- where generated files live
- when generation runs
- whether generated files are committed or ephemeral
- how CI proves they are current
- what breaks when drift is detected

Useful drift controls include:

- regenerate during CI and compare outputs
- fail if generated artifacts diverge from committed state
- keep explicit output directories under version-aware paths
- make generation rerunnable by humans without hidden setup

The doctrine is:

- generated contracts are first-class release artifacts
- not disposable side effects of one developer's machine

---

## Pattern 7 — Runtime Validation and Generated Contracts Solve Different Problems

Even with generated contract types, runtime boundaries may still need validation.

Examples:

- external network input reaches the TS app before Rust ever sees it
- browser/UI input is formed locally on the TS side
- IPC or WASM payloads may still arrive malformed or version-skewed
- user-controlled values can satisfy compile-time expectations while violating runtime trust requirements

The doctrine is:

- contract generation answers “what shape do we agree on?”
- runtime validation answers “is this particular value trustworthy right now?”

Do not confuse the two.
A boundary that skips validation because “types are generated” is still fragile.

---

## Pattern 8 — Release Graphs Must Include Contract Artifacts

Once Rust and TypeScript ship together, the contract bridge becomes part of a release graph.

The workflow must answer:

- what version truth coordinates Rust and TS surfaces?
- what artifact truth exists for generated declarations?
- what surface publishes first?
- how are TS consumers notified of breaking Rust-side contract changes?
- what happens if generation succeeds but downstream packaging fails?

The doctrine is:

- Rust–TS contract generation belongs inside multi-surface release law
- not outside it as a tooling convenience

This is where the bridge doctrine links directly to `rust-sdk-ci-and-multi-surface-release-pipelines.md`.

---

## Pattern 9 — TypeScript Owns Consumer Ergonomics, Not Rust Truth

The TypeScript side should still own:

- local composition
- framework-facing wrappers
- TS-specific view models or adapter types
- runtime validation for TS-local trust boundaries
- consumer-side ergonomics around the contract

But it should not casually fork the Rust-owned structural source.

The doctrine is:

- TypeScript may refine local meaning after boundary entry
- it must not redefine Rust-owned truth silently

This is the cleanest way to preserve both single-source structural law and strong TS ergonomics.

---

## Pattern 10 — Multi-Surface Rust/TS Systems Need Ownership Maps

When Rust and TypeScript interact across more than one surface—web, desktop, WASM, CLI helpers, shared schemas—the system needs explicit ownership maps.

For each surface, answer:

- what Rust still owns centrally?
- what TS refines locally?
- what is generated vs handwritten?
- what must never be duplicated by hand?
- what is a release artifact versus a local build byproduct?

The doctrine is:

- ownership maps reduce contract ambiguity
- contract ambiguity is the birthplace of cross-language drift

This matters especially for:

- Rust + TS + WASM combinations
- Tauri/web coexistence
- systems where TS consumers differ between browser and desktop contexts

---

## Pattern 11 — Error Contracts Deserve the Same Respect as Success Contracts

Boundary discipline often focuses too much on success payloads and too little on error payloads.

A serious Rust–TS contract system should decide:

- are Rust errors flattened or structured on the TS side?
- what error taxonomy crosses the boundary?
- how are Promise rejections or IPC failures represented?
- what detail is preserved for recovery versus debugging?

The doctrine is:

- error shape is part of the contract boundary
- not incidental transport noise

This is especially important for Tauri, WASM, and RPC-like flows.

---

## Pattern 12 — Verification Must Exercise Consumer Boundaries Too

A healthy bridge should be able to prove:

- generation succeeded
- generated artifacts are current
- imports resolve correctly
- TS consumers fail loudly when the contract changes incompatibly
- runtime validation still behaves correctly at trust boundaries
- release or packaging steps see the same artifact truth developers saw locally

The doctrine is:

- contract artifacts should be testable and auditable
- not secret outputs of a local environment

A bridge that compiles but cannot prove consumer-side correctness is not yet strong enough.

---

## Rust–TypeScript Boundary Checklist

Before calling a Rust–TS boundary healthy, ask:

- [ ] Is there one clearly owned structural source of truth?
- [ ] Are generated contracts treated as real boundary artifacts rather than disposable helpers?
- [ ] Does serialization behavior shape the contract explicitly?
- [ ] Are large integers, nullability, and path/layout decisions explicit?
- [ ] Are runtime validation and compile-time generation kept conceptually distinct?
- [ ] Is drift control part of CI and release law?
- [ ] Are TypeScript consumer ergonomics strong without forking Rust-owned truth?
- [ ] Are error contracts and release graphs treated as part of the same boundary system?

---

## Anti-Patterns

- parallel handwritten TS types drifting from Rust-owned contract truth
- generation that runs locally but has no CI drift control
- treating serialization attributes as implementation details instead of boundary law
- using one bridge tool for every TS-facing surface regardless of boundary type
- letting consumer ergonomics redefine structural truth silently
- assuming generated contracts remove the need for runtime validation
- shipping Rust/TS surfaces without an explicit multi-surface release story

---

## Cross-Links

Read this alongside:

- `boundary-activation-model.md`
- `rust-cross-language-workflows.md`
- `rust-node-native-addon-posture.md`
- `wasm-bindgen-posture.md`
- `rust-tauri-core-shell-and-ipc-boundaries.md`
- `../production/rust-sdk-ci-and-multi-surface-release-pipelines.md`
- `../../typescript-coding-engine/references/interop/rust-typescript-contract-boundaries.md`
- `../governance/source-reservoir-map.md`

---

## Final Doctrine

The reusable lesson is not:

> “Rust can generate TypeScript types.”

The reusable lesson is:

> “a Rust–TypeScript boundary needs explicit law for structural ownership, serialization-aware generation, representational choices, drift control, consumer ergonomics, runtime validation placement, and release coordination—otherwise generated types merely create the appearance of shared truth while real contract drift continues underneath.”
