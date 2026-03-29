# Deployment Orchestration Patterns

## Purpose

Define the canonical deployment strategy patterns for `developer-tool`.

This document focuses on how deployments should be chosen, sequenced, and validated — especially when blast radius matters.

## Source Provenance

- **Primary source:** current `developer-tool` build-and-deploy doctrine subtree
- **Derived from:** deployment-strategy, rollout, and blast-radius canonization work inside the developer-tool engine
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local deployment doctrine aligned to the current developer-tool engine

---


---

## Core Rule

Deployment is not a binary action.
It is a controlled rollout strategy.

The strategy should match:
- system criticality
- rollback speed requirements
- statefulness
- observability quality
- team/operator maturity

---

## Pattern 1 — Strategy Selection

### Choose the simplest safe deployment strategy

| Situation | Preferred Strategy |
|------|--------------------|
| low complexity, non-critical | rolling update |
| stateless service, fast rollback needed | blue-green |
| need gradual confidence under real load | canary |
| high-state database migrations | controlled maintenance window or phased migration |

The wrong strategy is usually either:
- too weak for the blast radius
- too complex for the team to operate safely

---

## Pattern 2 — Verification Is Part of Deployment

A deployment is not complete when bits reach production.
It is complete when post-deploy verification confirms:
- health endpoints respond
- core workflows succeed
- error rate and latency remain acceptable
- no major regression or schema drift is visible

This means deployment patterns should always reserve room for:
- smoke tests
- health checks
- rollback triggers

---

## Pattern 3 — Build and Deploy Must Stay Separable

The build system produces a releasable artifact.
The deployment system decides how that artifact is rolled out.

Do not collapse these concerns into one opaque pipeline blob.

Why:
- build reproducibility and rollout strategy are different concerns
- one may change without the other
- audit and rollback clarity improves when the distinction is explicit

---

## Pattern 4 — Blast Radius Awareness

Every deployment path should answer:
- what can break?
- how fast can we detect it?
- how fast can we reverse it?

If rollback is slow, rollout must be more conservative.
If observability is weak, rollout must be more conservative.
If state is hard to unwind, rollout must be more conservative.

---

## Pattern 5 — Container and Platform Integration

Containerization choices and deployment strategy are related but not identical.

Container doctrine should answer:
- image size
- base image trust
- runtime user permissions
- healthcheck posture
- secret handling

Deployment doctrine should answer:
- rollout style
- validation gates
- rollback path
- environment promotion order

Keep both linked, but distinct.

---

## Runtime Shell Relation

The shell may own:
- route commands that help classify deployment strategy
- audit surfaces that review pipeline posture
- conservative lifecycle reminders about rollout discipline

The shell should not own:
- automatic broad production rollout behavior
- unsafe deployment mutation hidden in startup or stop hooks

---

## Practical Law

A deployment strategy is mature when:
- the chosen rollout method is explicit
- rollback posture is explicit
- post-deploy verification is explicit
- the blast radius is understood before rollout begins

If deployment starts before those are clear, the orchestration is immature.
