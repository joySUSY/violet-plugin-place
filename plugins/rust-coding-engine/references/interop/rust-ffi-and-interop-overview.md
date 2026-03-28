# Rust FFI and Interop Overview

## Purpose

Define the canonical top-level doctrine for Rust interop work inside `rust-coding-engine`.

This document is the entrypoint for deciding:
- what kind of cross-language or cross-runtime boundary exists
- what the primary ownership and safety contract is
- which specialized doctrine lane should be loaded next
- how workflow, release, and verification obligations change once the boundary is real

It is **not** meant to replace the deeper interop references.
It exists to prevent interop work from collapsing into vague advice such as:
- “all interop is just FFI”
- “all language bridges are packaging problems”
- “Rust can just expose everything and the other side will figure it out”
- “if the bindings compile, the boundary is fine”

## Source Provenance

- **Primary donor families:** `rust-interop`, `flow-skills-pyo3`, `napi-rs-node-bindings`, `wasm-bindgen-main`, `ts-rs-main`, `tsify-main`, `understanding-tauri-architecture`, `calling-rust-from-tauri-frontend`, `rust-sdk-ci`
- **Key local donor materials:**
  - `rust-interop/README.md`
  - `flow-skills-pyo3/skills/pyo3/SKILL.md`
  - `napi-rs-node-bindings/napi-rs-node-bindings/SKILL.md`
  - `wasm-bindgen-main/README.md`
  - `ts-rs-main/README.md`
  - `tsify-main/README.md`
  - `understanding-tauri-architecture/SKILL.md`
  - `calling-rust-from-tauri-frontend/SKILL.md`
  - `rust-sdk-ci/rust-sdk-ci/skill.md`
- **Upstream URL:** not yet fully re-verified from all local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending for replacement-grade claims

---

## Core Rule

Interop is a **boundary-discipline problem first**.

Before choosing tooling, a serious Rust interop design must answer:
1. what truth crosses the boundary?
2. who owns structural truth?
3. who owns consumer ergonomics?
4. what allocation, borrowing, and release rules apply?
5. what failure shape can safely cross?
6. what generated artifacts or package surfaces must stay in sync?
7. what release and verification obligations now exist?

Only after those questions are explicit should you choose the bridge mechanism.

The doctrine is:
- tool choice is downstream of boundary law
- not the starting point of boundary law

---

## Interop Lane Taxonomy

| Lane | Primary Pressure | Canonical Next Reads |
|---|---|---|
| C / C++ FFI | ABI safety, ownership transfer, panic boundaries, `repr` correctness | `rust-ffi-mastery-c-cpp-deep-dive.md` |
| Python / PyO3 / Maturin | Python consumer boundary, GIL discipline, wheels, package ergonomics | `rust-pyo3-maturin-bindings.md` |
| Node native addon | JS-facing API shape, Promise/async contract, native packaging matrix | `rust-node-native-addon-posture.md` |
| Rust–TypeScript contract generation | structural ownership, generated declarations, schema drift prevention | `rust-typescript-bridge-patterns.md` |
| WASM / JS bridge | module-facing artifact truth, export minimization, generated glue discipline | `wasm-bindgen-posture.md` |
| Tauri frontend/backend | IPC contract law, native capability ownership, desktop/web shell split | `rust-tauri-core-shell-and-ipc-boundaries.md` |
| Multi-surface cross-language workflow | ownership maps, contract sync, packaging and release coordination across lanes | `rust-cross-language-workflows.md` |
| Interop proof / audit | cross-boundary verification lattice, generated artifact drift, consumer-side proof | `rust-interop-testing-and-audit-discipline.md` |

When lane selection is still unclear, load:
- `boundary-activation-model.md`

---

## The Seven Boundary Questions

Every interop task should be able to answer these seven questions before it is considered mature.

### 1. Structural truth
- where does the canonical contract live?
- Rust side, foreign side, or explicitly shared process?

### 2. Consumer lane
- who is the primary consumer?
- Python, Node, TS/WASM, desktop shell, C/C++, or several at once?

### 3. Ownership law
- who allocates?
- who borrows?
- who frees?
- who retains long-lived handles or objects?

### 4. Error law
- what error shape crosses the boundary?
- are panic and fatal conditions contained properly?

### 5. Representation law
- what serialization/layout/representation choices matter?
- bigint/number, nullability, tagged enums, buffers, `repr(C)`, etc.

### 6. Artifact law
- what generated or packaged artifacts embody the boundary?
- headers, wheels, `.d.ts`, wasm glue, desktop artifacts, native addon bundles?

### 7. Verification law
- how is the boundary actually proven from both sides?
- who owns the audit if something drifts?

If these are unspecified, the bridge is still underdesigned.

---

## The Interop Spine

The interop subtree now has a clear doctrinal spine:

1. **Overview** — this document
2. **Activation** — `boundary-activation-model.md`
3. **Lane doctrine**
   - C/C++ FFI
   - Python
   - Node
   - Rust⇄TS
   - WASM
   - Tauri
4. **Workflow doctrine** — `rust-cross-language-workflows.md`
5. **Production release doctrine** — `../production/rust-sdk-ci-and-multi-surface-release-pipelines.md`
6. **Verification doctrine** — `rust-interop-testing-and-audit-discipline.md`
7. **Governance** — `../governance/source-reservoir-map.md`

The doctrine is:
- a mature interop system is not one page
- it is a layered reference spine that routes from classification → lane → workflow → release → verification → governance

---

## Pattern 1 — Start Narrow, Then Add Surfaces Deliberately

A mature Rust interop surface should expose the smallest useful boundary first.

Why:
- smaller surfaces are easier to audit
- smaller surfaces drift less
- smaller surfaces are easier to version
- smaller surfaces are easier to prove with consumer-side tests

This is as true for `extern "C"` as it is for PyO3 classes, NAPI-RS exports, WASM modules, generated TS contracts, or Tauri commands.

The doctrine is:
- expand surface area only when consumer reality justifies it
- not because the tool can generate more of it

---

## Pattern 2 — Rust Owns Rust-Side Truth

The Rust side should usually own:
- authoritative structural models
- native invariants
- serialization or conversion truth on the Rust boundary
- exported artifact discipline

Other runtimes may add wrappers or ergonomic refinements.
They should not silently replace Rust-owned truth.

The doctrine is:
- Rust owns Rust-side truth
- foreign runtimes own foreign-runtime ergonomics
- the boundary must make that split visible

This is what keeps interop from devolving into duplicated half-models.

---

## Pattern 3 — Packaging Is Part of Architecture

Interop does not end when the code compiles.
It also includes:
- wheel generation
- npm package layout
- wasm artifact layout
- desktop/web app packaging
- headers and generated bindings
- release artifact ordering

The doctrine is:
- packaging belongs inside boundary design
- not after it

This is why interop doctrine must stay close to production doctrine.

---

## Pattern 4 — Generated Contracts Beat Hand-Maintained Drift When Truth Is Clear

When two runtimes must share shapes, generated contract paths are often healthier than parallel hand-maintained definitions.

Examples:
- Rust → TS type generation
- Rust → C header generation
- Rust → schema outputs
- Rust-generated JS/WASM glue

The point is not “generate everything blindly.”
The point is:
- reduce drift where one side clearly owns truth
- make generated artifacts deterministic, reviewable, and release-aware

---

## Pattern 5 — Runtime Choice Changes the Correct Design

A good design for:
- CPython
is not automatically a good design for:
- Node native addons

and neither is the same as:
- WASM/browser consumers
- Tauri IPC boundaries
- C/C++ ABI contracts

This is why the lane taxonomy exists.

The doctrine is:
- runtime and consumer shape change the right boundary design
- reuse the spine, not the same answer

---

## Pattern 6 — Cross-Language Workflow and Release Graphs Belong in the Same Story

A boundary becomes production-grade only when it can explain:
- how contract truth stays in sync
- how wrappers stay thinner than the Rust core
- how generated artifacts drift or stay aligned
- how releases coordinate across more than one surface
- what happens when one surface fails while another succeeds

The doctrine is:
- cross-language workflow and release graph design are not optional “later layers”
- they are part of the boundary itself once the bridge becomes a real product surface

---

## Pattern 7 — Interop Must Be Proven, Not Just Implemented

A bridge is not done when:
- it compiles
- bindings are generated
- one demo works

A bridge is done when:
- the consumer side is exercised
- the failure paths are exercised
- generated artifacts are drift-checked
- packaging/install behavior is tested
- ownership law is auditable

The doctrine is:
- interop proof belongs in the verification lattice
- not in maintainer confidence alone

See:
- `rust-interop-testing-and-audit-discipline.md`

---

## Quick Activation Workflow

When given an interop problem:

1. identify the lane
2. state the primary ownership contract
3. state the primary safety or representation contract
4. state the packaging/release implications
5. load the lane-specific doctrine
6. only then design or modify the bridge
7. verify using the interop testing/audit discipline

This keeps interop routing disciplined, explicit, and architecture-first.

---

## Anti-Patterns

- treating all interop as raw FFI
- ignoring panic/error boundaries
- unclear ownership of allocation/freeing or contract truth
- exposing too much of the Rust side directly
- assuming generated artifacts remove the need for runtime validation
- solving a packaging problem with only API-level thinking
- solving an API problem with only packaging-level thinking
- skipping consumer-side verification because the Rust side already passes tests

---

## Cross-Links

Read this alongside:
- `INDEX.md`
- `boundary-activation-model.md`
- `rust-cross-language-workflows.md`
- `rust-interop-testing-and-audit-discipline.md`
- `../production/rust-sdk-ci-and-multi-surface-release-pipelines.md`
- `../governance/source-reservoir-map.md`

Lane-specific doctrine:
- `rust-ffi-mastery-c-cpp-deep-dive.md`
- `rust-pyo3-maturin-bindings.md`
- `rust-node-native-addon-posture.md`
- `rust-typescript-bridge-patterns.md`
- `wasm-bindgen-posture.md`
- `rust-tauri-core-shell-and-ipc-boundaries.md`

---

## Final Doctrine

The reusable lesson is not:
> “Rust can interoperate with many languages and runtimes.”

The reusable lesson is:
> “Rust interop is a governed boundary system: classify the lane, preserve Rust-side truth, choose consumer-aware bridge law, make packaging and release obligations explicit, and prove the boundary through verification—otherwise the engine risks building many bridges that compile while very few remain trustworthy.”
