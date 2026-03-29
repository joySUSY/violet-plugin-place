# Security, Quality, and Testing Engineering

## Purpose

Define the canonical doctrine for verification and assurance work inside `developer-tool`.

This document is not the same as code-quality analysis.
That sibling doctrine is about investigating and diagnosing systems.

This document is about a different question:

> once a system, feature, or release candidate exists, how do we verify that it is secure enough, accessible enough, reliable enough, and performant enough to trust?

It focuses on active verification surfaces such as:
- security testing
- accessibility auditing
- error and incident triage
- performance validation
- evidence-based quality signoff

## Source Provenance

- **Primary source:** current `developer-tool` security / quality / testing doctrine cluster
- **Derived from:** absorbed penetration-tester, accessibility-tester, error-detector, error-coordinator, performance-testing, performance-engineer, and related QA-oriented donor families
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local verification doctrine aligned to the current developer-tool engine

---

## Core Rule

Quality claims must be verified from the right adversarial or operational angle.

A build passing does not prove security.  
A unit test passing does not prove accessibility.  
A green deploy does not prove performance resilience.  
A lint-clean codebase does not prove incident readiness.

A strong verification posture chooses the right testing surface for the right risk.

---

## Verification Surface Map

| Surface | What it is trying to prove |
|---|---|
| Security testing | attackers cannot exploit common weakness classes cheaply |
| Accessibility auditing | humans using assistive and constrained interaction modes can still operate the system |
| Error/incident triage | failures can be classified, reproduced, routed, and fixed systematically |
| Performance testing | the system behaves acceptably under expected and stress conditions |
| Exploratory quality review | the gaps between automated checks and real usage are reduced |

These surfaces are different.  
Treating them as the same kind of “QA” weakens all of them.

---

## Pattern 1 — Security Testing Is Risk-Driven, Not Tool-Driven

Security verification should start with threat shape, not with favorite scanners.

Good questions:
- what are the high-value assets?
- which trust boundaries matter?
- what attacker capabilities are realistic?
- what failure would be catastrophic vs merely noisy?

Tools are useful, but tools are not the methodology.

The doctrine is:
- use tools to support threat-driven verification
- not as a substitute for threat thinking

This is why security testing should always lead with vulnerability classes, impact, and remediation—not just scan output.

---

## Pattern 2 — Accessibility Is a Product Contract, Not a Cosmetic Check

Accessibility testing is about whether real users with different interaction modes can actually use the system.

Strong accessibility verification usually combines:
- automated checks
- keyboard navigation testing
- screen-reader validation
- zoom/contrast/readability checks
- manual review of interaction flow

Automation is valuable, but partial.
Manual testing remains necessary for the parts that require real user flow judgment.

The doctrine is:
- accessibility must be tested as interaction quality
- not only as DOM-rule compliance

---

## Pattern 3 — Error Detection Must Become Routed Triage

When failures occur, verification work should convert symptoms into actionable categories.

Useful questions:
- is this a compile/lint error, runtime fault, logic bug, integration break, or performance failure?
- is the issue local, systemic, or environmental?
- what is the smallest reproducible unit of the problem?
- what evidence would falsify our current hypothesis?

This is why incident/error testing should stay close to hypothesis-driven debugging and code-quality analysis.

The doctrine is:
- finding an error is only step one
- classification and routing are part of verification itself

---

## Pattern 4 — Performance Validation Must Reflect Real Load Shapes

Performance testing is useful only when it approximates meaningful operating conditions.

Important distinctions include:
- load vs stress vs spike vs soak
- throughput vs tail latency
- single-request timing vs sustained system behavior
- CPU-bound vs memory-bound vs I/O-bound bottlenecks

The doctrine is:
- choose the load test shape that matches the system claim you are trying to prove
- not the one that merely produces the prettiest chart

A performance test is a contract probe, not a ritual.

---

## Pattern 5 — Exploratory Verification Bridges Automation Gaps

Automated checks are essential, but they do not cover everything.

Exploratory verification is valuable when:
- interaction surfaces are subtle
- integration states are difficult to enumerate exhaustively
- there are many possible failure modes not yet encoded in automated suites
- operator workflows need to be rehearsed

This kind of verification is stronger when it is still structured:
- scoped objective
- explicit evidence expectations
- documented findings

The doctrine is:
- exploratory does not mean random
- it means structured investigation beyond the current automation net

---

## Pattern 6 — Evidence and Severity Matter More Than Assertion Volume

A good verification result should communicate:
- what was tested
- what was observed
- how severe the finding is
- what the likely impact is
- what remediation is recommended

This matters because the output of verification is not just confidence.
It is decision support.

A report without evidence is hand-waving.  
A report without severity is hard to prioritize.  
A report without remediation is incomplete.

---

## Pattern 7 — Quality Gates Should Match Risk, Not Habit

Not every project needs the same release gate.
But every serious project needs gates that match its risk profile.

Examples:
- a security-sensitive service needs stronger security checks before release
- a consumer-facing UI needs stronger accessibility review
- a performance-critical tool needs benchmark/load confidence
- an internal prototype may have narrower gates, but still needs some honest boundary

The doctrine is:
- verification depth should scale with risk and impact
- not be blindly identical across all systems

---

## Pattern 8 — Verification Should Improve Organizational Memory

The output of testing and audits should improve future work, not disappear after one ticket.

Useful outcomes include:
- repeatable runbooks
- updated checklists
- reusable test scenarios
- severity calibration norms
- better automation coverage where exploratory checks found blind spots

The best verification programs do not only catch today's issue.  
They reduce tomorrow's uncertainty.

---

## Pattern 9 — Quality Engineering Must Stay Connected to Release and Platform Governance

Security, quality, and testing are not isolated domains.
They interact directly with:
- CI/CD and release gates
- platform defaults and golden paths
- dependency/supply-chain governance
- code-quality analysis and refactor decisions

This is why quality doctrine should route naturally into build/deploy, scaffolding, and platform doctrine.

The point is not to create one giant document.
The point is to keep the verification system aligned with the delivery system.

---

## Verification Checklist

Before calling a verification posture healthy, ask:

- [ ] Are we testing the real risk surface, not just running favorite tools?
- [ ] Is accessibility being validated as interaction quality, not only as static compliance?
- [ ] Are errors/failures being classified and routed systematically?
- [ ] Do performance tests match the real load shape we care about?
- [ ] Are findings evidenced, prioritized, and actionable?
- [ ] Do the verification results improve future organizational memory?

---

## Anti-Patterns

- treating scan output as the entire security methodology
- relying on accessibility automation alone
- finding bugs without a triage/routing model
- benchmarking or load testing without a claim being tested
- shipping reports with no evidence, severity, or remediation
- verification gates inherited by habit rather than chosen by risk

---

## Cross-Links

Read this alongside:
- `code-quality-analysis.md`
- `hypothesis-testing.md`
- `test-generation.md`
- `platform-infrastructure.md`
- `build-and-deploy/build-deploy.md`

---

## Final Doctrine

The reusable lesson is not:
> “run security checks, accessibility tools, and load tests.”

The reusable lesson is:
> “verification engineering means choosing the right adversarial and operational testing surfaces for the risks that matter, then turning evidence into clear routing, prioritization, and organizational trust.”
