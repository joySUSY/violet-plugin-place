# Request Mocking

## Purpose

Define the canonical doctrine for intercepting, mocking, modifying, and blocking network requests inside `developer-tool` workflows.

This document is not only about one browser automation tool's route API.
It exists to answer a broader operational question:

> when a workflow needs to control network behavior, how do we choose the right level of mocking so tests, diagnostics, and reproductions become more trustworthy instead of less realistic?

It applies to:
- API/UI testing
- browser automation
- failure simulation
- conditional response shaping
- integration isolation during debugging

## Source Provenance

- **Primary source:** current `developer-tool` execution / verification / browser-automation doctrine cluster
- **Derived from:** absorbed request-mocking, browser-testing, and automation-control donor families
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local network-mocking doctrine aligned to the current developer-tool engine

---

## Core Rule

Request mocking is a control surface for network truth.

A strong mocking posture should make these things explicit:
- what request pattern is being intercepted
- whether the response is synthetic, modified, delayed, or aborted
- whether the goal is isolation, reproduction, simulation, or exploration
- how far the mock diverges from real system behavior
- how the workflow will return to unmocked reality afterward

The goal is not just to "fake the network."  
The goal is to control the right network variable without introducing new ambiguity.

---

## Mocking Surface Map

| Mocking Mode | Best For |
|---|---|
| Static fulfill/mock | simple deterministic UI or API tests |
| Conditional response | request-dependent behavior and scenario branching |
| Response modification | patching a real upstream response for focused experiments |
| Failure simulation | offline/timeouts/reset/refusal cases |
| Delayed response | loading-state and timeout-path validation |
| Header/request mutation | auth/cookie/feature-flag boundary testing |

Different testing goals need different mock shapes.

---

## Pattern 1 — Mocking Should Start With the Risk or Question

The first question is not:
> how do we intercept this request?

The first question is:
> what uncertainty or dependency are we trying to control?

Examples:
- isolate the UI from unstable backend behavior
- reproduce one edge-case response reliably
- simulate network failure paths
- remove auth/session headers to test boundary handling
- compare behavior under two server variants

If the goal is unclear, the mock is likely to become misleading.

---

## Pattern 2 — Use the Smallest Mock That Preserves the Test Truth

A good mock should remove unnecessary variability without destroying the behavior you actually need to verify.

Examples:
- static body/status for simple rendering tests
- conditional response for logic branching
- patch real upstream response when total replacement would hide important behavior

The doctrine is:
- mock only as much as needed to make the test or diagnosis trustworthy
- avoid over-mocking that turns the system into a different product

---

## Pattern 3 — Request Pattern Matching Is Part of the Contract

A mock is only as good as the request pattern that activates it.

Important questions:
- is the pattern too broad?
- is it accidentally catching unrelated routes?
- does it match path only, or query/headers too?
- is this one endpoint, one file class, one domain, or everything?

The doctrine is:
- request matchers should be explicit enough to avoid accidental interception spillover
- broad wildcards raise realism risk quickly

---

## Pattern 4 — Static Responses Are Good for Deterministic UI/UX States

A static mocked response is often strongest when you need:
- deterministic rendering
- stable fixtures for visual or interaction tests
- repeatable component/page state
- fast local verification without backend dependence

Static mocking is weak when you actually need to test server-side branching, timing, or negotiation behavior.

The doctrine is:
- use static mocks when you need stable state
- not when the behavior under test depends on real response variation

---

## Pattern 5 — Conditional Mocks Are for Branching Logic, Not for Rebuilding the Whole Backend

Conditional response logic is useful when response shape should vary by:
- request body
- method
- header presence
- user role or test fixture
- query parameters

But once conditional mocking starts imitating a large amount of backend behavior, ask whether:
- a dedicated fake service
- a contract test
- or a narrower integration setup

would be clearer.

The doctrine is:
- conditional mocks are good for targeted branching
- they are bad as invisible miniature backends no one can reason about later

---

## Pattern 6 — Response Mutation Is Strongest When You Want Real Upstream Context with One Controlled Difference

Sometimes the best test is not a fully synthetic response.
It is a real response with one controlled mutation.

Examples:
- toggle one feature flag in the payload
- change premium tier state
- remove one field to test fallback rendering
- simulate a boundary-case value while keeping the rest real

The doctrine is:
- response mutation is useful when total replacement would throw away too much real-world shape

This often gives higher trust than fully synthetic mocks in complex systems.

---

## Pattern 7 — Failure Simulation Is a First-Class Verification Surface

Mocking is not only for success paths.
It is especially valuable for:
- timeout behavior
- connection reset/refusal
- offline state
- partial failure
- unavailable dependency simulation

A system that is only tested against successful mocked responses is not well verified.

The doctrine is:
- failure simulation should be deliberate and named
- not just a byproduct of flaky infrastructure during tests

---

## Pattern 8 — Delays and Timing Mocks Should Test User-Visible or Retry-Sensitive Behavior

Artificial delay is useful when validating:
- loading states
- spinners/skeletons
- timeout thresholds
- retries/backoff behavior
- race-sensitive UI transitions

Delay should not be added merely to make tests feel realistic.
It should validate a concrete timing claim.

The doctrine is:
- if you introduce latency in the mock, know what behavior that latency is supposed to prove

---

## Pattern 9 — Request Mocking Must Be Easy to Remove and Clean Up

A mocking setup should make it obvious:
- what is currently intercepted
- how to list active mocks/routes
- how to remove one route
- how to clear all routes
- when the system has returned to real network behavior

This matters because stale mocks are one of the easiest ways to create false confidence in testing or diagnosis.

The doctrine is:
- mocked state is temporary state
- temporary state needs explicit cleanup discipline

---

## Pattern 10 — Mocking Must Not Obscure Whether the Test Is Unit-Like, Integration-Like, or Exploratory

A mocked network workflow can serve very different purposes:
- UI state verification
- frontend contract stabilization
- reproduction of one bug
- exploratory probing
- deterministic regression testing

The doctrine is:
- name the purpose of the mocked run clearly
- do not let mocked workflows masquerade as stronger integration coverage than they really provide

This is especially important when sharing results with others.

---

## Pattern 11 — Evidence Matters in Mocked Diagnostic Runs

If request mocking is used for diagnosis, preserve enough evidence to explain:
- what request pattern was intercepted
- what was returned or modified
- what the observed downstream behavior was
- whether the issue disappears or changes under the mock

This turns mocking from a hack into an investigative instrument.

The doctrine is:
- important mocks should leave a reasoning trail, not just a working screen

---

## Request Mocking Checklist

Before calling a mocking workflow healthy, ask:

- [ ] Is the question or risk being controlled explicit?
- [ ] Is the request matcher narrow enough to avoid accidental interception bleed?
- [ ] Is the chosen mock shape the smallest one that preserves the test truth?
- [ ] If delay/failure is introduced, what exact behavior is being validated?
- [ ] Can the mocked state be listed, removed, and cleaned up clearly?
- [ ] Would another surface (fake service, contract test, real integration) be more honest here?

---

## Anti-Patterns

- broad wildcard mocks with unclear blast radius
- fully synthetic mocks where a small response mutation would preserve more truth
- conditional mock logic that silently becomes a fake backend
- success-path-only mocking with no failure simulation
- leaving stale route interception active across workflows
- presenting mocked verification as if it proved unmocked integration behavior

---

## Cross-Links

Read this alongside:
- `running-code.md`
- `security-quality-testing.md`
- `session-management.md`
- `hypothesis-testing.md`

---

## Final Doctrine

The reusable lesson is not:
> “request mocking lets you intercept and fake network calls.”

The reusable lesson is:
> “request mocking is a network-control surface: choose the narrowest mock that answers the real question, make divergence from reality explicit, validate success and failure paths intentionally, and keep mocked state temporary and legible so the workflow remains trustworthy.”
