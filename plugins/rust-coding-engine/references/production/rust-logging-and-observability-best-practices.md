# Rust Logging and Observability Best Practices

## Purpose

Define the canonical doctrine for logging, tracing, metrics, correlation, sanitization, and health surfaces in production Rust systems.

This document is the deep observability companion to:
- `rust-production-patterns.md`
- `rust-performance-patterns.md`

It should answer the practical question:

> how should a Rust service expose enough runtime truth for operators and maintainers without turning observability into noise, cost, or accidental data leakage?

---

## Source Provenance

- **Primary donor families:** `rust-skills` observability/logging guidance, `rust-skills-main` observability surface, `zero-to-production` production-doctrine reservoir
- **Key local donor materials:**
  - `rust-skills-main/README.md` (`rust-observability` references)
  - `rust-skills-main/CLAUDE_CODE_GUIDE.md` (`tracing`, `metrics`, `opentelemetry` posture)
  - `rust-error-handling-security-checklist.md`
  - `zero-to-production-backend-service-doctrine.md`
  - current production / architecture docs under `rust-coding-engine/references/`
- **Upstream URL:** not yet fully re-verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending

---

## Core Rule

Observability exists to make system behavior legible under real operational pressure.

That means a good Rust observability posture should help answer:
- what is the system doing?
- what request/task/job is this event part of?
- where is latency, contention, or failure concentrated?
- can we explain degraded behavior without guesswork?
- are we revealing too much sensitive information while trying to answer the above?

Observability is not just “add logs everywhere.”
It is structured runtime truth.

---

## Observability Surface Map

| Surface | Purpose |
|---|---|
| Structured logs | human + machine-readable event narrative |
| Tracing spans/events | causal context and timing across flows |
| Metrics | aggregate health, throughput, latency, saturation |
| Health/readiness checks | dependency and service lifecycle visibility |
| Error context | useful failure narratives without panic archaeology |

A strong production system usually needs more than one of these.
No single surface replaces the others.

---

## Pattern 1 — Prefer Structured Logging Over String Narratives

Rust production logging should prefer structured events over unstructured prose blobs.

Why:
- structured logs are easier to filter, aggregate, and correlate
- fields remain machine-usable
- important identifiers stop being buried in string formatting

Typical fields worth attaching intentionally:
- request or correlation ID
- operation or subsystem name
- user/session/tenant IDs where appropriate and safe
- duration or relevant counters
- error kind / error chain context

The point is not to maximize field count.
The point is to preserve the few pieces of context operators actually need.

---

## Pattern 2 — Use `tracing` as the Default Modern Service Posture

For modern Rust services and systems, `tracing` is usually the strongest default because it models:
- spans
- events
- structured fields
- subscriber layering
- async-aware context propagation

This makes it much better suited to production observability than flat string logging alone.

The doctrine is:
- prefer `tracing` for systems that need structured operational insight
- use simpler `log`-facade posture only where the system's needs are genuinely lighter

This aligns with the crate ecosystem navigator and production root doctrine.

---

## Pattern 3 — Spans Should Follow the Work, Not the File Layout

A good tracing strategy follows meaningful units of work.

Examples:
- request lifecycle
- background job execution
- message processing unit
- database interaction group
- external service call boundaries

Bad span posture often looks like:
- spans too tiny and noisy to be useful
- spans mirroring code organization instead of runtime meaning
- no stable span boundaries around the operations that actually matter in incidents

The deeper rule is:
- spans should reveal causal structure, not editorial decoration

---

## Pattern 4 — Metrics Should Track Operational Questions, Not Vanity

A metric is useful only if someone can explain what decision it supports.

High-value metric classes usually include:
- request/job throughput
- error rate by meaningful boundary
- latency distributions
- queue depth / backlog / saturation signals
- dependency health or failure counts

Poor metrics posture often includes:
- counters that nobody reads
- dimensions/labels that explode cardinality
- metrics that repeat what logs already explain without adding aggregation value

The doctrine is:
- metrics should answer operational questions at system scale
- logs/traces should answer instance- and flow-level questions

---

## Pattern 5 — Correlation IDs Must Survive Boundary Crossings

Correlation is one of the highest-value observability features.

A production-grade Rust system should decide how correlation flows across:
- HTTP requests
- async tasks
- message consumers
- background jobs
- inter-service boundaries

Without stable correlation/context propagation, a system can produce “lots of telemetry” while still being hard to debug.

The exact mechanism can vary, but the doctrine is stable:
- important work units should be traceable across boundaries

---

## Pattern 6 — Health and Readiness Are Distinct Signals

A production service should not collapse all health reporting into one boolean.

Useful distinctions often include:
- **liveness**: should the process be restarted?
- **readiness**: can it serve traffic/work correctly right now?
- **dependency health**: are DB/cache/queue/downstream services reachable enough?

The reason this matters is operational triage:
- restart decision
- traffic routing decision
- dependency incident diagnosis

A good readiness surface gives operators leverage, not just reassurance.

---

## Pattern 7 — Error Context and Observability Must Reinforce Each Other

Observability without meaningful error context becomes vague.
Error context without observability becomes isolated and harder to correlate.

A strong production posture aligns them:
- structured error fields
- useful context chains
- trace correlation
- stable error categories or kinds where appropriate

This is why logging/tracing doctrine and error doctrine should not diverge philosophically.
They are describing the same failures at different scopes.

---

## Pattern 8 — Sensitive Data Must Be Deliberately Redacted or Excluded

Operational visibility does not justify leaking secrets or personal data.

Examples of things that usually need extreme care:
- tokens, API keys, secrets
- full auth headers
- raw request bodies with sensitive fields
- credential-like configuration values
- personal or regulated data

The doctrine is:
- observability should improve diagnosis without turning logs into liabilities
- sanitization is part of observability design, not a compliance afterthought

---

## Pattern 9 — Observability Has a Cost Model

Telemetry is not free.
It costs:
- CPU
- allocation
- storage
- network bandwidth
- human attention

A strong observability posture therefore uses proportion:
- detailed debug/trace only where justified
- cardinality control in metrics
- event selection that favors signal over flood
- hot-path awareness when instrumenting performance-critical code

This does **not** mean “log less by default.”
It means “instrument intentionally.”

---

## Pattern 10 — Production Incidents Need Both Real-Time and Review-Time Surfaces

Good observability serves two different moments:

### Real-time operations
- alerts
- dashboards
- live traces/logs
- health/readiness views

### Post-incident review
- audit trail of important events
- enough structured context to reconstruct failure flow
- stable identifiers that let related records be joined later

This matters because some instrumentation is valuable for immediate detection, while other instrumentation is valuable for explanation after the fact.

---

## Pattern 11 — Async and Background Work Need Explicit Instrumentation

Async Rust systems often hide important work in spawned tasks, queue consumers, and background loops.

Those work units should not become invisible just because they are detached from the request path.

Useful questions:
- does this task/job have a traceable identity?
- are failures surfaced or only silently logged?
- can we tell if this background worker is lagging, failing, or saturating?
- do cancellation/shutdown events show up in telemetry?

Background systems without observability often look healthy until they fail at scale.

---

## Pattern 12 — Choose OpenTelemetry Only When Distributed Correlation Pressure Justifies It

OpenTelemetry is powerful, but it adds operational and conceptual weight.

Use it when the system truly benefits from:
- distributed tracing
- multi-service correlation
- richer telemetry export pipelines

Do not add it reflexively to a simple local-only service that does not need its complexity.

The doctrine is:
- modern Rust services often start well with `tracing`
- OpenTelemetry becomes worth it when distributed observability pressure is real

---

## Observability Checklist

Before calling a Rust service observability-ready, ask:

- [ ] are logs structured and correlation-aware?
- [ ] do traces/spans follow meaningful work boundaries?
- [ ] do metrics answer real operational questions?
- [ ] are health and readiness surfaces separated appropriately?
- [ ] are async/background tasks observable, not just fire-and-forget?
- [ ] is sensitive data redacted or excluded?
- [ ] is telemetry volume/cardinality under control?
- [ ] can incidents be explained after the fact with the available signals?

---

## Anti-Patterns

- giant unstructured log strings with buried key context
- no stable correlation identifiers
- tracing everything at random with no meaningful span structure
- dashboards/metrics with no operator decision value
- logging secrets or raw sensitive payloads
- background tasks that fail without clear operational visibility
- OpenTelemetry added for fashion rather than distributed need
- observability that is verbose but still not diagnostic

---

## What This Document Does Not Own

This observability doctrine does **not** fully own:
- production readiness as a whole -> `rust-production-patterns.md`
- performance engineering -> `rust-performance-patterns.md`
- multi-surface release coordination -> `rust-sdk-ci-and-multi-surface-release-pipelines.md`

This document owns the **runtime signal surface** specifically.

---

## Cross-Links

Read this alongside:
- `rust-production-patterns.md`
- `rust-performance-patterns.md`
- `rust-sdk-ci-and-multi-surface-release-pipelines.md`
- `../error-patterns/rust-error-handling-patterns.md`
- `../architecture/rust-axum-service-architecture-and-thin-adapters.md`
- `../ecosystem/rust-crate-ecosystem-navigator.md`

---

## Final Doctrine

The reusable lesson is not:
> “log enough and add tracing.”

The reusable lesson is:
> “design a Rust system so its runtime truth remains legible under load, failure, and incident pressure—through structured logs, meaningful spans, useful metrics, clear health surfaces, and disciplined redaction.”
