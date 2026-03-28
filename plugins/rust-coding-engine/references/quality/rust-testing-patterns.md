# Rust Testing Patterns

## Purpose

Define the canonical doctrine for testing Rust systems across unit, integration, async, property-based, snapshot, and benchmark boundaries.

This document is the deep testing doctrine inside the quality lane.
It should answer the practical question:

> how should a Rust codebase prove correctness and maintain confidence as the system evolves?

It is not merely a catalog of test macros.
It is about what each testing layer is *for*, what it proves, and where it should live.

---

## Source Provenance

- **Primary donor family:** `rust-skills` testing rule family
- **Key local donor materials:**
  - `rust-skills/rules/test-cfg-test-module.md`
  - `rust-skills/rules/test-integration-dir.md`
  - `rust-skills/rules/test-tokio-async.md`
  - `rust-skills/rules/test-proptest-properties.md`
  - `rust-skills/rules/test-criterion-bench.md`
  - `rust-skills/rules/test-fixture-raii.md`
  - `rust-skills/rules/test-doctest-examples.md`
  - `rust-skills/rules/test-mock-traits.md`
  - `rust-skills/rules/test-descriptive-names.md`
  - `rust-skills/rules/test-arrange-act-assert.md`
- **Upstream URL:** not yet fully re-verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending

---

## Core Rule

Tests should prove behavior at the correct boundary.

A good Rust testing posture distinguishes clearly between:
- correctness of internal logic
- correctness of public contracts
- correctness under async/runtime pressure
- correctness across broad input spaces
- stability of rendered or serialized outputs
- performance regression checks

If all tests collapse into one undifferentiated pile, the codebase may still have many tests while proving very little.

---

## Rust Testing Ladder

| Layer | Primary Goal | Typical Location |
|---|---|---|
| Unit tests | verify local logic and private behavior | `#[cfg(test)] mod tests` in module files |
| Integration tests | verify public API from outside the crate | `tests/` |
| Async/runtime tests | verify async behavior and coordination semantics | `#[tokio::test]` or equivalent async harness |
| Property-based tests | verify invariants across wide input space | proptest-driven test modules |
| Snapshot/doctest layers | verify human-facing outputs and docs/examples stay true | `insta`, rustdoc doctests |
| Benchmarks | detect performance behavior and regressions | `benches/` with Criterion |

These layers are complementary.
No single one replaces the others.

---

## Pattern 1 — Unit Tests Belong Near the Logic They Prove

Rust's idiomatic unit test posture is to colocate them with the code under test using:

```rust
#[cfg(test)]
mod tests {
    use super::*;
}
```

Why this is strong:
- tests stay close to the behavior they describe
- private helpers can be tested when that is useful
- module-local refactors are easier to maintain alongside their tests

Unit tests are best for:
- local logic
- parser helpers
- edge cases in pure functions
- small internal invariants

They are not the right place to pretend you are testing the full external contract.

---

## Pattern 2 — Integration Tests Should Exercise the Public API Like a Consumer

Integration tests in `tests/` are valuable because they compile as separate crates and therefore test what external users can actually access.

This matters because it reveals:
- accidental reliance on internals
- weak public ergonomics
- missing or awkward exports
- boundary mismatches between what the crate intends and what it really exposes

If a behavior matters to users of the crate, it should usually have at least some coverage from outside the crate boundary.

---

## Pattern 3 — Async Tests Need the Right Runtime Story

Async tests are not just syntax with `#[tokio::test]` attached.
They also encode a runtime model.

Questions to ask:
- should the test use current-thread or multi-thread flavor?
- are you testing async logic, channel coordination, timeout behavior, or cancellation?
- is the runtime configuration itself part of what the test is proving?

A correct async testing posture treats runtime shape as part of the test boundary, not just hidden infrastructure.

---

## Pattern 4 — Property-Based Tests Prove Invariants Better Than Example Lists Alone

Property-based testing is valuable when the interesting truth is broader than a few sample inputs.

Good candidates:
- roundtrip guarantees
- idempotence
- associativity/commutativity where relevant
- parser/serializer coherence
- invariants that should survive many generated inputs

Property-based tests do not replace example-based tests.
They complement them by exploring a larger input space and surfacing edge cases humans often forget.

---

## Pattern 5 — Snapshot Tests Are for Stable Human-Facing Surfaces

Snapshot testing is strongest when the output shape matters and is expensive to specify manually in many assertions.

Useful examples:
- rendered text or templates
- CLI output
- generated JSON/text artifacts where the full structure matters

Snapshot tests are weak when they become:
- lazy substitutes for thinking
- massive blobs that nobody reviews meaningfully

The doctrine is:
- snapshot only when the output stability itself is what matters
- keep review of snapshot changes deliberate

---

## Pattern 6 — Doctests Turn Documentation into Executable Contract Evidence

Rust documentation can be unusually powerful because examples can compile and run.

That makes doctests a bridge between:
- documentation quality
- API confidence
- example freshness

A public API with good doctests is easier to trust because its usage examples are continuously verified.

This is one of Rust's best quality loops and should not be treated as optional decoration.

---

## Pattern 7 — Benchmarks Are Not Just Faster Tests

Benchmarks have a different job from correctness tests.

Use Criterion or equivalent benchmark tooling for:
- statistically meaningful measurement
- regression comparison
- comparing implementations
- measuring hot-path behavior under controlled conditions

Do not confuse:
- unit test assertions
with
- performance evidence

Benchmarking belongs in its own lane with its own discipline.

---

## Pattern 8 — Fixtures and Cleanup Should Be Safe and Composable

Tests often need setup and teardown:
- temp files
- temp directories
- ephemeral databases
- environment variables
- background services

Rust's RAII posture makes it natural to encode cleanup in guards and drop behavior.
That is stronger than manual cleanup logic scattered after assertions, because cleanup still happens even if the test panics.

This is one of the most idiomatic parts of Rust testing ergonomics.

---

## Pattern 9 — Mocks Belong Behind Meaningful Trait Boundaries

Mocking in Rust works best when the boundary is already architecturally meaningful.

Good reasons to mock:
- external systems
- repositories
- HTTP/database/client traits
- side-effecting dependencies

Bad reasons to mock:
- because the design is over-abstracted and every object became a trait automatically
- because the test is trying to assert implementation trivia instead of behavior

The doctrine is:
- introduce mockable trait boundaries where boundaries genuinely exist
- do not create abstraction theater purely for test tooling

---

## Pattern 10 — Test Names Should Explain Broken Behavior Immediately

A good test name should make a failure self-explanatory.

Prefer names like:
- `parse_returns_error_for_empty_input`
- `expired_token_is_rejected`
- `roundtrip_serialization_preserves_unicode`

Avoid names like:
- `test1`
- `it_works`
- `test_parser`

This matters because test output is part of the debugging surface.
A good test name is a form of runtime communication to future maintainers.

---

## Pattern 11 — Arrange / Act / Assert Is a Readability Tool, Not Ritual

The AAA pattern is useful because it helps humans see:
- setup
- action
- verification

This is especially helpful in tests with more than one or two moving parts.

Do not force heavy AAA comment blocks into every tiny test if they make the test noisier than clearer.
But do use the discipline of:
- obvious setup
- obvious action
- obvious assertion boundary

The principle matters more than ceremonial formatting.

---

## Pattern 12 — Different Tests Should Catch Different Failure Families

A mature test suite is stronger when different layers catch different kinds of failure.

| Failure Family | Best Test Layers |
|---|---|
| local logic bug | unit tests |
| public API regression | integration tests |
| async coordination bug | async/runtime tests |
| hidden edge cases | property-based tests |
| output drift | snapshot/doctest layers |
| performance regression | benchmarks |

This prevents over-reliance on any one testing style.

---

## Pattern 13 — Fast Feedback Still Matters

A great test suite that no one runs quickly is less useful than it looks.

Healthy posture includes:
- fast unit/integration checks for normal development loops
- heavier property/benchmark/doctest/snapshot review where justified
- clear separation between quick feedback and slower verification layers

This keeps quality from turning into a morale tax.

---

## Audit Checklist

Before calling a Rust testing posture healthy, ask:

- [ ] Are unit tests colocated and actually focused on local logic?
- [ ] Do integration tests prove the public API from outside the crate?
- [ ] Are async tests using the right runtime assumptions?
- [ ] Are invariants broad enough to justify property-based tests where useful?
- [ ] Are docs/examples executable where they should be?
- [ ] Are snapshot tests reviewing real output contracts, not laziness?
- [ ] Are benchmarks isolated in a measurement lane rather than mixed with correctness claims?
- [ ] Do fixtures/cleanup use safe RAII-style patterns when resources are involved?

---

## Anti-Patterns

- using only unit tests and assuming the public crate boundary is therefore proven
- placing integration-style logic inside internal unit tests
- async tests with no thought about runtime flavor or timeout/cancellation semantics
- property-based tests absent from systems that claim strong invariants
- snapshot sprawl with no meaningful review discipline
- benchmarks treated like ordinary tests
- mocks everywhere because the design is over-abstracted
- vague test names that hide what actually broke

---

## Cross-Links

Read this alongside:
- `rust-quality-testing-benchmarking-documentation.md`
- `rust-performance-patterns.md`
- `rustdoc-mastery.md`
- `rust-doc-examples-discipline.md`
- `rust-workspace-lint-pipeline-discipline.md`

---

## Final Doctrine

The reusable lesson is not:
> “Rust has unit tests, integration tests, proptest, insta, and Criterion.”

The reusable lesson is:
> “Use each Rust testing layer to prove the right boundary: local logic, public API, async behavior, broad invariants, documentation truth, output stability, and performance regressions should each be verified where they are actually visible.”
