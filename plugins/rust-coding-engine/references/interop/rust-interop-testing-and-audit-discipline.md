# Rust Interop Testing and Audit Discipline

## Purpose

Define the canonical testing and audit posture for Rust interop surfaces inside `rust-coding-engine`.

This document exists because cross-language boundaries are not trustworthy merely because they compile.
They require explicit verification of:
- ABI and representation assumptions
- ownership and lifetime contracts
- error and panic translation behavior
- generated artifact drift
- packaging and installation behavior
- real consumer behavior on the far side of the boundary

This doctrine is the verification-side companion to:
- `boundary-activation-model.md`
- `rust-cross-language-workflows.md`
- the lane-specific boundary pages for Python, Node, TypeScript, WASM, and Tauri

Its job is to answer a stricter question:

> once an interop boundary is designed, what must be tested and audited so the engine can claim the bridge is trustworthy rather than merely runnable?

## Source Provenance

- **Primary donor families:** `rust-interop`, `flow-skills-pyo3`, `napi-rs-node-bindings`, `wasm-bindgen-main`, `understanding-tauri-architecture`, `calling-rust-from-tauri-frontend`, `rust-sdk-ci`
- **Key local donor materials:**
  - `rust-interop/README.md`
  - `rust-pyo3-maturin-bindings.md`
  - `rust-cross-language-workflows.md`
  - `rust-node-native-addon-posture.md`
  - `rust-typescript-bridge-patterns.md`
  - `rust-tauri-core-shell-and-ipc-boundaries.md`
  - `wasm-bindgen-posture.md`
  - `../production/rust-sdk-ci-and-multi-surface-release-pipelines.md`
- **Upstream URL:** not yet fully re-verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending for replacement-grade claims

---

## Core Rule

Interop must be tested at the boundary where trust changes.

A strong interop posture does **not** stop at:
- unit tests inside Rust only
- successful local compilation
- generated bindings that look plausible
- one successful consumer demo

A serious interop posture asks:
1. does the foreign side actually consume the boundary correctly?
2. are ownership, lifetime, and resource-release rules respected under realistic use?
3. do panic/error paths remain safe and meaningful across the boundary?
4. do generated artifacts stay in sync and remain reviewable?
5. do packaging and release workflows preserve the intended behavior across platforms?
6. can the team audit the boundary without relying on memory or donor repos?

The doctrine is:
- boundary verification is part of the architecture
- not an optional QA layer added after the bridge exists

---

## Verification Lattice

Interop verification should be understood as a lattice, not a single test pass.

A mature lattice usually includes several distinct layers:

1. **Rust-internal verification**
   - unit tests
   - integration tests
   - invariants and safety helpers

2. **Boundary-shape verification**
   - exported symbol or command shape
   - serialization and representation checks
   - generated artifact drift checks

3. **Consumer-side verification**
   - import/load/install behavior
   - foreign-runtime usage
   - error and async behavior on the consumer side

4. **Release-surface verification**
   - packaging correctness
   - platform matrix validity
   - artifact existence and installability

5. **Governance-grade auditability**
   - provenance visibility
   - explicit ownership maps
   - replacement-grade cleanup safety

The doctrine is:
- if one layer is missing, the interop story is still incomplete

---

## Audit Dimensions

| Dimension | What to verify |
|---|---|
| ABI / representation | `repr` assumptions, calling conventions, symbol exposure, integer/nullability semantics |
| Ownership | who allocates, who frees, who may retain handles, who owns long-lived state |
| Error boundary | panic containment, translated errors, Promise rejection or exception semantics |
| Generated artifacts | headers, declarations, glue code, path/layout discipline, drift detection |
| Build / package | wheels, npm/native artifacts, wasm bundles, desktop packages, command/import layout |
| Consumer behavior | Python, Node, browser, TS frontend, Tauri shell, or C/C++ side actually using the surface |
| Release graph | version truth, artifact truth, publish ordering, post-publish verification |

The doctrine is:
- audit dimensions are contract dimensions
- not separate paperwork categories

---

## Pattern 1 — Test on Both Sides of the Boundary

A language bridge is never fully validated by tests on only one side.

Examples:
- Rust-side tests confirm invariants and safety wrappers
- consumer-side tests confirm the exposed API shape behaves as expected
- release-side checks confirm the package/install/build story still works

This matters because many interop failures are visible only when:
- serialization meets real consumer input
- generated types hit real call sites
- packaging artifacts load in the target runtime
- runtime behavior meets event loops, GIL, browser, or shell realities

The doctrine is:
- a bridge is not proven unless both producer and consumer experience are exercised

---

## Pattern 2 — Boundary-Level Tests Beat Internal Happy-Path Proofs

A Rust interop layer should have tests that exercise the **real exposed surface** where practical.

Examples:
- call exported `extern "C"` functions through C-facing harnesses or smoke tests
- run Python tests against a built PyO3 wheel/module
- run Node/TS tests against the built addon package
- run browser/JS tests against the wasm artifact
- run Tauri/desktop-facing command or IPC smoke paths
- validate generated TS declarations against real consumer imports

The doctrine is:
- boundary tests are not optional luxury for interop
- they are part of contract proof

A system that only tests internal Rust logic has not tested the bridge. It has tested only one side of it.

---

## Pattern 3 — Panic and Error Paths Need Explicit Verification

A serious interop surface must test not only success, but also failure behavior.

Questions to verify:
- what happens if Rust logic panics?
- what error shape reaches the foreign side?
- is the foreign runtime given a meaningful and safe failure contract?
- are resources still freed or left consistent when failure occurs?
- does transport-layer wrapping preserve enough signal for recovery and debugging?

The doctrine is:
- “works on success” is not enough to call an interop layer production-grade
- the failure path is part of the contract surface

---

## Pattern 4 — Ownership Contracts Should Be Visible Through Tests and Docs

Interop testing should verify the explicit ownership story.

That includes:
- who owns allocated memory
- which side calls the free/release function
- whether nullability rules are documented and enforced
- whether long-lived handles survive only as long as promised
- what stateful objects may cross the boundary and under what lifetime assumptions

A useful audit mindset is:
> could an unfamiliar maintainer read the tests and deduce the ownership contract?

If not, the interop surface is still underdocumented.

The doctrine is:
- ownership law should be recoverable from the verification system itself
- not from oral tradition

---

## Pattern 5 — Generated Artifacts Are Audit Surfaces, Not Build Noise

When interop involves generated artifacts:
- headers
- TS declarations
- WASM JS glue
- schema outputs
- package metadata derived from build steps

these should be treated as testable outputs.

Good posture:
- generation is deterministic
- output location is explicit
- changes are reviewable
- CI catches unexpected drift
- generated files can be reproduced from documented steps

The doctrine is:
- generated artifacts are contract evidence
- not disposable build debris

This is what lets a multi-language boundary stay stable across teams and releases.

---

## Pattern 6 — Packaging Is a Test Surface Too

Interop doctrine should test build/package reality, not just source code.

Examples:
- wheel builds/install for PyO3
- npm/native addon package shape and loading behavior
- wasm artifact generation and import shape
- headers or generated contract outputs
- desktop shell packaging assumptions for Tauri-like bridges
- platform-specific artifact availability checks

This matters because many production failures in interop land are distribution failures, not logic failures.

The doctrine is:
- packaging is a verification dimension
- not a deploy-team afterthought

---

## Pattern 7 — Verification Must Follow the Release Graph

Interop verification should align with the release graph, not sit outside it.

That means:
- pre-publish artifact sanity checks
- per-surface installability validation
- drift checks before publish
- partial-release failure scenarios accounted for in verification design
- platform-matrix verification tied to the actual release promise

If the boundary ships through multiple surfaces, then verification must acknowledge:
- version truth
- artifact truth
- publish ordering
- post-publish consumer confidence

The doctrine is:
- release verification is part of boundary verification
- especially for Python / Node / WASM / desktop artifacts

---

## Pattern 8 — Different Lanes Need Different Audit Focus

### C / C++ FFI
Focus on:
- ABI/layout
- ownership/free rules
- pointer validity
- panic containment

### PyO3 / Maturin
Focus on:
- module/class/function ergonomics
- Python-side exceptions and docs/examples
- wheel/install/package correctness
- GIL-sensitive behavior

### Node native addons
Focus on:
- Promise/async behavior
- JS-visible error shapes
- addon loading and package matrix correctness
- TS-facing type surface when relevant

### Rust–TS / generated contracts
Focus on:
- declaration drift
- generated artifact repeatability
- serialization compatibility
- release-time contract synchronization

### WASM
Focus on:
- export surface minimization
- JS module usage
- bundle/toolchain expectations
- browser/runtime consumer validation

### Tauri / desktop-web IPC
Focus on:
- command/event contracts
- serialization and error behavior
- frontend/backend shell split
- desktop packaging/runtime assumptions

The doctrine is:
- each lane shares the same verification lattice
- but each lane stresses different audit dimensions hardest

---

## Pattern 9 — Cross-Engine Ownership Determines Who Verifies What

Interop auditing becomes noisy when ownership is vague.
Make verification ownership explicit.

Default law:
- `rust-coding-engine` verifies Rust-side structural truth, safety, contract generation, and native packaging posture
- `typescript-coding-engine` verifies TS-side consumer ergonomics, wrapper discipline, and TS-local validation behavior
- `python-dev-skill` verifies Python-side consumer ergonomics and Python-native packaging/runtime expectations where appropriate
- `cross-platform-development` verifies broader platform-boundary promises when support-tier truth dominates
- `developer-tool` verifies broader shell/build/runtime-surface orchestration when the issue becomes operational rather than Rust-doctrinal

The doctrine is:
- cross-engine boundaries should reduce duplicated verification responsibility
- not create verification gaps where each side assumes the other checked it

---

## Pattern 10 — Replacement-Grade Interop Doctrine Needs Auditability, Not Just Coverage

A lane is not replacement-grade merely because many tests exist.
It becomes replacement-grade when:
- the contract truth is canonized
- the verification lattice maps clearly onto the contract
- provenance and freshness are explicit enough for cleanup decisions
- generated artifacts and release surfaces are reviewable
- no common consumer path still depends on donor-repo browsing to understand the boundary

The doctrine is:
- auditability is part of replacement quality
- raw coverage volume is not enough

---

## Interop Verification Checklist

Before calling an interop boundary healthy, ask:

- [ ] Is the real exposed surface tested, not just the Rust internals?
- [ ] Are success and failure paths both verified across the boundary?
- [ ] Is the ownership contract visible from tests and docs?
- [ ] Are generated artifacts deterministic, reviewable, and drift-checked?
- [ ] Is packaging/install behavior tested for the important surfaces?
- [ ] Does verification align with the release graph and platform matrix?
- [ ] Are cross-engine verification responsibilities explicit?
- [ ] Would a future cleanup still leave enough canonical evidence to understand why the bridge is trustworthy?

---

## Anti-Patterns

- testing only Rust internals and claiming interop is verified
- no failure-path testing at the foreign boundary
- undocumented allocation/free ownership assumptions
- generated artifact drift with no reviewable output discipline
- packaging treated as somebody else's problem
- overexposed interop surfaces that are hard to audit
- verification steps that exist only in maintainer memory and not in CI or doctrine

---

## Cross-Links

Read this alongside:
- `boundary-activation-model.md`
- `rust-cross-language-workflows.md`
- `rust-node-native-addon-posture.md`
- `rust-pyo3-maturin-bindings.md`
- `rust-typescript-bridge-patterns.md`
- `rust-tauri-core-shell-and-ipc-boundaries.md`
- `wasm-bindgen-posture.md`
- `../production/rust-sdk-ci-and-multi-surface-release-pipelines.md`
- `../governance/source-reservoir-map.md`

---

## Final Doctrine

The reusable lesson is not:
> “interop must be tested from both sides.”

The reusable lesson is:
> “a Rust interop boundary is trustworthy only when its verification lattice covers structural truth, ownership law, generated artifact drift, packaging/install reality, failure-path semantics, release-graph consequences, and explicit cross-engine audit ownership—so the bridge can be audited as a product surface instead of merely exercised as a local demo.”
