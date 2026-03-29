# Test Generation

## Purpose

Define the canonical doctrine for synthesizing tests from interactions, behaviors, traces, and structured evidence inside `developer-tool`.

This document is not just about one browser tool generating Playwright code.
It exists to answer a broader engineering question:

> when a workflow exposes behavior worth preserving, how do we convert that behavior into a stable, reviewable, and maintainable test artifact instead of leaving it as transient manual knowledge?

It applies to:
- browser-driven test generation
- interaction capture to test conversion
- seed generation from traces or recordings
- turning reproductions into regression tests
- strengthening generated tests with assertions and contracts

## Source Provenance

- **Primary source:** current `developer-tool` execution / verification / browser-automation doctrine cluster
- **Derived from:** absorbed test-generation, browser recording, snapshot, and automation replay donor families
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local test-synthesis doctrine aligned to the current developer-tool engine

---

## Core Rule

Generated tests are most valuable when they preserve behavior without preserving accidental noise.

A strong test-generation posture should make these things explicit:
- what behavior is being captured
- what parts were generated vs hand-authored
- what the test is proving
- which assertions make the behavior meaningful
- what should be generalized, stabilized, or removed before the test is trusted long-term

The goal is not merely to produce test code automatically.
The goal is to turn useful evidence into trustworthy regression artifacts.

---

## Test Generation Surface Map

| Source Surface | Best Use |
|---|---|
| Direct interaction capture | generate initial UI/action skeletons |
| Trace artifact | reconstruct step order, waits, timing-sensitive transitions |
| Video or screenshot evidence | confirm visible flow worth asserting |
| Existing bug reproduction steps | convert human repro into regression test |
| Contract/schema/source model | strengthen assertions and expected outputs |

Good test generation often combines more than one source surface.

---

## Pattern 1 — Generate the Skeleton, Then Author the Meaning

Generated code is usually strongest as a starting skeleton:
- navigation
- interactions
- locators
- basic sequencing

But the meaning of the test lives in:
- assertions
- invariants
- expected state transitions
- explicit failure conditions

The doctrine is:
- generation captures structure
- humans or higher-level doctrine must still supply intent

A generated interaction flow without assertions is closer to a replay script than a trustworthy test.

---

## Pattern 2 — Capture Behavior at the Highest Stable Level

A good generated test should prefer stable behavior surfaces over brittle implementation details.

Examples:
- semantic locators over fragile CSS selectors
- user-visible outcomes over internal DOM trivia
- contract-level checks over incidental layout coincidences

The doctrine is:
- generate against the most stable interface the system exposes
- not the most convenient selector or trace artifact available

Generated tests that bind too tightly to implementation noise become expensive quickly.

---

## Pattern 3 — Generated Tests Should Be Promoted from Reproducers to Regressions

A lot of generated tests begin as:
- bug repro steps
- demo flows
- exploratory sequences
- captured sessions

To become real regression assets, they should usually be upgraded with:
- assertions
- fixture control
- mocking or session-state discipline where needed
- explicit setup/teardown assumptions

The doctrine is:
- reproduction is a useful seed
- regression value appears only after the test is stabilized and made intentional

---

## Pattern 4 — Assertions Should Reflect the Claim Being Preserved

Generated tests often underperform because they only preserve interactions, not claims.

Ask:
- what user-visible truth are we asserting?
- what state transition proves success?
- what output, route, or artifact must exist afterward?
- what negative path should be impossible?

The doctrine is:
- every important generated test should answer what claim it is defending
- not just what clicks and fills happened along the way

---

## Pattern 5 — Exploration Before Generation Improves Test Quality

Good generated tests come from understanding the surface before recording it.

Useful preparation includes:
- inspect the UI or API surface first
- identify stable locators
- understand what parts of the flow are deterministic
- know whether mocking/session state is needed

The doctrine is:
- generate from an understood flow
- not from blind interaction spam

This is why running-code, request-mocking, session-management, and tracing all strengthen test generation.

---

## Pattern 6 — Generated Tests Need the Right Evidence Inputs

Different evidence surfaces add different value.

### Interaction capture
Good for generating the initial action sequence.

### Trace
Good for reconstructing timing, network, and causal sequence.

### Request mocking
Good for stabilizing nondeterministic backend behavior.

### Session management
Good for reusing setup state or reproducing auth-sensitive flows.

### Video
Good for confirming that visible behavior is the thing worth asserting.

The doctrine is:
- generated tests are strongest when fed by the right evidence, not just the easiest one to collect

---

## Pattern 7 — Mocking and State Reuse Should Stabilize Tests, Not Lie About the System

Generated tests frequently need:
- mocked network responses
- saved auth state
- deterministic fixtures
- seeded databases or environment setup

These are good when they remove irrelevant noise.
They are bad when they make the generated test no longer represent the behavior you actually need confidence in.

The doctrine is:
- stabilize the test surface just enough to make it reliable
- do not over-isolate until the test becomes about a different system entirely

---

## Pattern 8 — Generation Belongs Close to Maintenance Discipline

A generated test is not done when it compiles.
It should also be reviewed for:
- locator stability
- naming clarity
- redundancy
- assertion quality
- setup/cleanup correctness
- whether the generated code should be refactored into helpers

The doctrine is:
- treat generated tests like real source code
- not as disposable output from a recorder

---

## Pattern 9 — Generated Tests Should Reduce Future Reproduction Cost

A useful generated test makes it easier for future engineers to answer:
- what behavior used to work?
- what exact user flow regressed?
- how do we prove the bug stays fixed?

This is why test generation matters.
It transforms ephemeral runtime behavior into durable proof.

The doctrine is:
- the best generated test lowers future debugging cost
- not just current recording effort

---

## Pattern 10 — Some Flows Should Stay as Scripts or Demos Instead of Tests

Not every recorded or generated flow should become a committed test.

Keep it as:
- a demo
- a repro script
- a documentation artifact
- an exploratory snippet

when:
- the flow is too unstable
- the value is communicative rather than regression-oriented
- assertions are unclear or not yet worth defending

The doctrine is:
- not every capture deserves promotion into the permanent test suite
- only the ones that defend meaningful behavior

---

## Test Generation Checklist

Before calling a generated test healthy, ask:

- [ ] What behavior claim does this test actually preserve?
- [ ] Are locators/interactions generated at the highest stable level available?
- [ ] Have assertions been added so the test means something beyond replay?
- [ ] Were mocking/session/trace inputs chosen to reduce noise without distorting truth?
- [ ] Has the generated code been reviewed like ordinary source code?
- [ ] Should this artifact be a committed test, or remain a script/demo/repro instead?

---

## Anti-Patterns

- treating raw recorded interaction code as a complete test
- generating selectors from fragile implementation details when semantic ones exist
- adding no assertions and calling the result a regression test
- over-mocking until the test no longer reflects the real system behavior
- checking in large generated flows with no refactoring or review
- promoting every captured flow into the permanent suite automatically

---

## Cross-Links

Read this alongside:
- `request-mocking.md`
- `running-code.md`
- `tracing.md`
- `video-recording.md`
- `session-management.md`
- `security-quality-testing.md`

---

## Final Doctrine

The reusable lesson is not:
> “test generation records actions and produces code you can copy into a test file.”

The reusable lesson is:
> “test generation is the discipline of turning observed behavior into durable proof: generate the interaction skeleton automatically where useful, then add the assertions, state controls, and review needed to make the artifact a trustworthy regression test instead of a fragile replay script.”
