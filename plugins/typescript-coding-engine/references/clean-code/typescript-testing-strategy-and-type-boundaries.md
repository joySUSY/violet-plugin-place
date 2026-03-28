# TypeScript Testing Strategy and Type Boundaries

## Purpose

Define the canonical testing doctrine for TypeScript systems inside `typescript-coding-engine`.

This document exists because TypeScript testing is not only about runtime correctness.
A mature TypeScript system must also respect:
- compile-time contracts
- runtime validation boundaries
- framework/environment boundaries
- CI quality gates
- shared and generated contract truth

The focused question is:

> what kind of confidence is this test supposed to provide, and which type/runtime/boundary surface must be exercised so the test proves something real instead of only looking active?

## Source Provenance

- **Primary source:** current `typescript-coding-engine` clean-code doctrine subtree
- **Derived from:** TypeScript testing, quality-checker, and boundary-validation canonization work inside the heavy-engine shell
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local testing doctrine aligned to the current TypeScript engine

---

## Core Rule

A TypeScript system is trustworthy only when its tests respect both:
1. **type-level truth**
2. **runtime behavior**

If tests ignore either side, they provide incomplete confidence.

The goal is not maximal test count.  
The goal is to prove the right truths at the right boundaries with the smallest honest test surface.

---

## Testing Surface Map

| Surface | What it proves |
|---|---|
| Type-level tests | inference, overload behavior, contract precision, branded/opaque constraints |
| Runtime unit tests | local logic and behavioral correctness |
| Boundary tests | parsing, validation, serialization, API/config/IPC seams |
| Integration tests | cooperation across modules/services/frameworks |
| Environment/framework tests | jsdom/node/browser/router/store/runtime assumptions |
| CI test posture | what must always be re-proven before merge or release |

The doctrine is:
- these surfaces answer different questions
- they should not be mentally collapsed into one vague “test suite”

---

## Pattern 1 — Distinguish Type Tests from Runtime Tests

TypeScript systems often need at least two mental lanes:

### Type-level confidence
- does inference preserve the right information?
- do overloads discriminate correctly?
- do branded/opaque types block misuse?
- do public contracts stay stable?

### Runtime confidence
- does the app actually behave correctly at execution time?
- does validation reject bad input?
- does integration with framework/environment behave as expected?

The doctrine is:
- do not pretend runtime tests prove type-system intent
- do not pretend type-level correctness removes the need for runtime boundary tests

Each lane protects a different kind of truth.

---

## Pattern 2 — Boundary Tests Matter More Than Happy-Path Vanity

A strong TypeScript testing posture gives special attention to boundaries such as:
- API services
- form validation
- parsing/serialization
- generated/shared contract consumption
- hooks/stores/state transitions
- framework integration boundaries
- IPC or cross-language seams

This is because the most expensive failures often occur where values, contracts, or environments change.

The doctrine is:
- boundary tests usually produce more architectural value than shallow happy-path component vanity tests

That does not make component tests useless; it makes boundary truth more urgent.

---

## Pattern 3 — Mocks and Fixtures Must Preserve Contract Shape

Mocks and factories are useful only when they preserve the important parts of the real contract.

The anti-pattern is lightweight fake data that silently differs from the real API shape and trains the suite to lie.

A good fixture posture prefers:
- typed factories
- realistic defaults
- boundary-aware mock data
- central test utilities instead of ad hoc inline object blobs everywhere

The doctrine is:
- fixtures should reduce repetition without teaching false reality

Contract-faithful fixtures are one of the highest-leverage habits in TS testing.

---

## Pattern 4 — Runtime Validation Should Be Tested at the Trust Boundary

If runtime validation exists, it should be tested where trust changes.

Examples:
- user input parsing
- API response parsing
- config loading
- IPC payload handling
- persisted-state rehydration

Do not assume a schema library is “obviously correct” without testing the actual failure and success surfaces your app depends on.

The doctrine is:
- runtime validation is boundary behavior and should be tested as such
- not treated as invisible infrastructure that magically stays correct forever

---

## Pattern 5 — Test Environment Is Part of the Architecture

Frontend-leaning TypeScript often depends on test environment shape:
- jsdom vs node
- router/query-client wrappers
- mock servers
- browser APIs
- timer behavior
- module system quirks

These are not incidental setup details.
They shape what a test can honestly prove.

The doctrine is:
- test environment is part of the testing architecture
- not just config boilerplate hidden in one file nobody revisits

A test that passes only because its environment lies is a broken test.

---

## Pattern 6 — Generated and Shared Contracts Need Their Own Test Attention

Where a system uses:
- generated clients
- shared DTO packages
- Rust↔TS contracts
- OpenAPI/JSON Schema outputs

then tests should prove more than just consumer behavior.
They should also prove:
- generated artifacts are current
- imports resolve correctly
- drift is detected early
- the boundary remains compatible enough for consumers

The doctrine is:
- shared/generate contract surfaces deserve explicit test attention
- not just hope that code generation means everything is fine

This is one of the biggest differences between app-local testing and boundary-aware testing.

---

## Pattern 7 — CI Test Posture Is Part of Testing Strategy

A good TypeScript testing strategy also answers:
- what must run locally?
- what must run in CI?
- what is fast enough for every commit?
- what is slower but still required before merge/release?
- which failures should block immediately vs be staged?

That means the testing story belongs close to:
- quality-gate governance
- toolchain posture
- runtime validation policy

The doctrine is:
- the test suite is not just a local developer tool
- it is part of the system's governance boundary

---

## Pattern 8 — Test the Shape That Actually Fails in Production

Useful TypeScript tests often focus on:
- malformed external input
- optional/null/undefined edge cases
- stale contract assumptions
- loading/error/success transitions
- integration with generated/shared types
- runtime boundary mismatches after refactors

The doctrine is:
- prefer tests that target actual failure shapes over shallow checkbox coverage

A suite that only proves the golden path is usually teaching false confidence.

---

## Pattern 9 — Testing Should Follow the Smallest Honest Confidence Surface

A healthy order of escalation is often:
1. type-level test or compile-time assertion if that alone proves the claim
2. local unit test if runtime behavior of one unit matters
3. boundary test if trust or serialization changes shape
4. integration test if cross-component cooperation matters
5. heavier framework/environment test only if the earlier surfaces cannot prove the claim honestly

The doctrine is:
- choose the smallest test surface that proves the important truth
- not the loudest or heaviest one by default

This keeps test suites fast, meaningful, and maintainable.

---

## Pattern 10 — Tests Should Help Localize Failure, Not Just Signal Red

A good TypeScript test posture helps answer:
- is this a type-level problem or a runtime problem?
- did the boundary validation fail or did internal logic fail?
- is the contract stale or is the consumer wrong?
- is the environment setup invalid or did the code regress?

The doctrine is:
- tests should reduce the next diagnostic question
- not merely announce failure without helping classify it

This is where testing and type-error diagnosis doctrine reinforce each other.

---

## Pattern 11 — Framework-Coupled Tests Must Not Pretend To Be Pure Logic Tests

React/Vue/Node/Tauri-adjacent TypeScript often uses tests that mix:
- state transitions
- effect timing
- framework wrappers
- transport mocks
- browser-like environment behavior

The doctrine is:
- label and structure these honestly
- do not pretend environment-heavy tests are simple unit tests

This makes the suite easier to reason about and prevents hidden environment assumptions from spreading.

---

## Pattern 12 — Testing Governance Should Tighten with the System's Support Burden

A small internal utility and a shared SDK do not deserve identical testing posture.

As support burden grows, the suite should usually grow in:
- contract tests
- compatibility checks
- boundary tests
- CI enforcement rigor
- fixture discipline

The doctrine is:
- testing strategy should scale with consumer count, runtime complexity, and contract importance
- not stay frozen at the level the project happened to start with

---

## Testing Checklist

Before calling a TypeScript testing posture healthy, ask:

- [ ] Are type-level and runtime confidence treated as distinct lanes?
- [ ] Are the system's highest-risk boundaries explicitly tested?
- [ ] Do fixtures preserve the real contract shape?
- [ ] Is runtime validation tested where trust actually changes?
- [ ] Is the test environment honest about what it is simulating?
- [ ] Are shared/generated contracts receiving explicit drift-detection attention?
- [ ] Does the test matrix align with CI and release posture?
- [ ] Do tests reduce the next diagnostic question rather than only going red?

---

## Anti-Patterns

- assuming runtime tests prove type-system intent
- assuming type correctness removes the need for boundary runtime tests
- fake mocks that do not match real contracts
- environment setup hidden so deeply nobody knows what tests really mean
- testing only components while ignoring service/contract/validation boundaries
- overusing heavyweight environment tests when smaller honesty-preserving tests would suffice
- treating shared/generated contracts as self-proving and therefore untestworthy

---

## Why This Matters to `typescript-coding-engine`

This doctrine strengthens the engine's ability to teach:
- how TS testing differs from plain JS testing
- why type and runtime confidence are different lanes
- how to place tests at the boundaries that matter
- why CI/testing posture is part of architecture
- how to build suites that protect contract truth instead of only reporting surface regressions

It is the main testing doctrine under the `clean-code/` lane.

---

## Cross-Links

Read this alongside:
- `INDEX.md`
- `quality-gates-governance.md`
- `toolchain-posture.md`
- `typescript-runtime-validation-decision-matrix.md`
- `../foundations/typescript-type-error-diagnosis-and-recovery.md`
- `../architecture/typescript-architecture-decision-trees.md`
- `../interop/rust-typescript-contract-boundaries.md`

---

## Final Doctrine

The reusable lesson is not:
> “TypeScript testing should distinguish type-level and runtime confidence, emphasize boundaries, and keep CI posture aligned.”

The reusable lesson is:
> “TypeScript testing is boundary-oriented confidence design: prove type truth and runtime truth in different lanes, put the strongest attention on places where trust or contracts change shape, keep environments and fixtures honest, and choose the smallest test surface that can still prove the claim without lying about what is being exercised.”
