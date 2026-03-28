# Rust Ecosystem Discovery

## Purpose

Define the canonical operational doctrine for discovering, evaluating, and adopting crates in the Rust ecosystem.

This document is not the main crate-choice decision framework.
That role belongs to `rust-crate-ecosystem-navigator.md`.

This document exists for the next question after that:

> once you know roughly what kind of crate family you need, how do you investigate real candidates, validate their fit, and adopt them without importing ecosystem risk blindly?

---

## Source Provenance

- **Primary donor families:** `rust-skills` dependency/tooling rule families, broader ecosystem/reference reservoirs
- **Key local donor materials:**
  - `rust-skills` cargo/dependency investigation guidance
  - `rust-crate-ecosystem-navigator.md`
  - `rust-library-development-and-cargo-mastery.md`
  - `rust-sdk-ci-and-multi-surface-release-pipelines.md`
- **Upstream URL:** not yet fully re-verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending

---

## Core Rule

Crate adoption is an architectural decision under uncertainty.

That means ecosystem discovery should not stop at:
- “this crate exists”
- “it has many downloads”
- “someone online recommended it”

A strong discovery workflow asks:
1. does the crate solve the right problem shape?
2. is the maintenance and release posture healthy enough?
3. does the feature/dependency graph fit our system?
4. does the crate's API and docs make the contract trustworthy?
5. what risks or alignment groups come with adopting it?

The point is not to become afraid of dependencies.
The point is to stop importing them blindly.

---

## Discovery Workflow

### Step 1 — Check whether the standard library already covers the need
Rust's standard library keeps growing.
Do not reach for a dependency before confirming the need is real.

### Step 2 — Identify the crate family
Examples:
- async runtime
- HTTP client/server
- config loading
- time/date
- serialization
- logging/tracing
- testing/snapshots/property testing

This step is where the navigator document is strongest.

### Step 3 — Find real candidates
Useful surfaces include:
- crates.io
- docs.rs
- lib.rs or equivalent discovery indexes
- repository README / release notes / changelog

### Step 4 — Perform due diligence
Check:
- maintenance activity
- issue hygiene / last meaningful activity
- API clarity and examples
- dependency tree size and feature posture
- advisories/security posture
- compatibility with your Rust version / MSRV expectations

### Step 5 — Adopt conservatively
Document:
- why this crate won
- what features are enabled
- any version-alignment or release constraints
- what would trigger reevaluation later

---

## Pattern 1 — Downloads and Popularity Are Signals, Not Proof

High adoption can be a useful signal.
It is not the only signal.

A widely used crate may still be a poor fit if:
- it solves a broader problem than you actually have
- its dependency surface is too heavy for your use case
- it assumes a runtime or platform model that does not match your system

Likewise, a smaller crate may still be the better fit if:
- its scope is cleaner
- its surface is smaller and easier to audit
- its maintenance is healthy enough

The doctrine is:
- popularity can guide attention
- architecture must make the final decision

---

## Pattern 2 — docs.rs Quality Is Part of Trustworthiness

A crate with weak docs, weak examples, or hard-to-navigate API surfaces is more expensive to adopt than it first appears.

Good discovery should examine:
- docs quality
- examples
- feature-flag documentation
- top-level module guidance
- public contract clarity

This matters because the adoption cost is not just dependency bytes.
It is also engineer cognition and maintenance burden.

---

## Pattern 3 — Dependency Trees Are Architectural Weight

Every crate imports not just code, but also:
- dependency transitivity
- version constraints
- feature unification pressure
- build times
- security review surface

This is why discovery should include commands such as:
- `cargo tree`
- `cargo tree --duplicates`
- `cargo tree -e features -i <crate>`
- `cargo audit`
- `cargo deny`

A crate with a beautiful API can still be the wrong choice if its dependency weight badly mismatches the project's constraints.

---

## Pattern 4 — Version Alignment Groups Matter More Than They Look

Some ecosystem families behave like coupled groups.

Examples:
- WASM families
- tonic/prost ecosystems
- tracing ecosystem pieces
- tower ecosystem pieces
- Arrow/Parquet families

When one member is upgraded or chosen badly, the rest of the family may feel the impact.

The doctrine is:
- do not evaluate crates only in isolation
- evaluate them as members of compatibility clusters where relevant

---

## Pattern 5 — Feature Flags Are Part of the Adoption Decision

Crates often ship many optional features.
That means the real dependency you are adopting is not just the crate name—it is the crate plus its enabled feature surface.

Discovery should therefore ask:
- what does the default feature set bring in?
- do we need `default-features = false`?
- which features are additive and which widen the surface too much?
- what feature combinations should CI/test posture verify?

The deeper lesson is:
- feature selection is part of architecture, not a postscript to `Cargo.toml`

---

## Pattern 6 — Library and Application Adoption Criteria Differ

A library crate and an application crate do not evaluate dependencies the same way.

### Library posture
- dependency minimization matters more
- MSRV and public-contract stability matter more
- feature flag hygiene matters more
- runtime lock-in should be avoided unless justified

### Application posture
- delivery speed and operator ergonomics may matter more
- more concrete runtime/tooling choices are acceptable
- broader utility crates may be worth their cost

The doctrine is:
- adoption criteria must match the boundary you're building

---

## Pattern 7 — Security Review Starts at Adoption, Not Incident Time

Dependency security posture is not only about running `cargo audit` later.
It begins when a crate is chosen.

Useful questions:
- does this dependency pull in known risky areas unnecessarily?
- does it bring native bindings or platform-specific complexity?
- are there advisory histories or maintenance red flags?
- are secrets/auth/network assumptions hidden in “convenient” crates?

This does not mean avoid dependencies.
It means understand their risk shape before they become invisible infrastructure.

---

## Pattern 8 — Publishing and Release Surfaces Should Be Considered Early for Core Dependencies

For crates deeply tied to:
- release pipelines
- docs generation
- bindings generation
- build tooling
- artifact packaging

you should consider downstream release implications early.

This is especially relevant for:
- proc macros
- build tools
- codegen crates
- interop-oriented crates
- multi-surface publication families

A crate is not “just a library” if it changes how you ship the product.

---

## Pattern 9 — Domain Pressure Should Guide Ecosystem Search

Some problem domains change what “good ecosystem fit” means.

Examples:
- embedded -> memory, no_std, predictability
- cloud-native -> tracing, shutdown, operational maturity
- fintech -> precision, auditability, failure strictness
- ML/data -> layout, throughput, interoperability
- interop -> packaging, ABI, foreign-runtime ergonomics

This is why discovery and domain-specific patterns must stay linked.

---

## Pattern 10 — Re-Evaluation Should Be Expected

Crate choice is not forever.
A healthy ecosystem posture accepts that a crate may later need reevaluation because:
- maintenance slowed
- MSRV changed
- better alternatives appeared
- security or dependency pressure changed
- your system outgrew the original choice

Good adoption notes should make future reevaluation easier, not harder.

---

## Operational Discovery Checklist

When evaluating a crate for adoption, ask:

- [ ] Have we checked whether std already solves this well enough?
- [ ] Do we understand which crate family/problem shape this belongs to?
- [ ] Are docs/examples/features strong enough for trust?
- [ ] Is the dependency tree and feature surface acceptable?
- [ ] Are version-alignment groups relevant here?
- [ ] Does the library/application/domain boundary change the evaluation criteria?
- [ ] Have security and release implications been considered?
- [ ] Do we know what would make us reevaluate this choice later?

---

## Anti-Patterns

- choosing crates by popularity alone
- reading only the README and not the docs/features/dependency surface
- ignoring alignment groups in tightly coupled ecosystems
- enabling huge default feature surfaces without inspection
- importing runtime lock-in casually into libraries
- discovering crates without recording why the choice was made
- treating security review as something to do only after adoption

---

## Cross-Links

Read this alongside:
- `rust-crate-ecosystem-navigator.md`
- `rust-domain-specific-patterns.md`
- `../architecture/rust-library-development-and-cargo-mastery.md`
- `../production/rust-sdk-ci-and-multi-surface-release-pipelines.md`
- `../production/rust-production-patterns.md`

---

## Final Doctrine

The reusable lesson is not:
> “search crates.io and pick something popular.”

The reusable lesson is:
> “discover crates through an operational workflow that checks problem fit, docs/API trust, dependency weight, feature pressure, security posture, and release implications before adoption becomes invisible architecture.”
