# Rust Error Handling Security Checklist

## Purpose

Define the canonical doctrine for keeping Rust error surfaces, logs, traces, and failure disclosures security-aware.

This document is not the root of error design.
It is the security-focused companion to:
- `rust-error-handling-patterns.md`
- `rust-logging-and-observability-best-practices.md`

It exists to answer a specific operational question:

> when Rust errors are surfaced to users, operators, logs, or foreign runtimes, how do we preserve enough truth for diagnosis without turning failures into disclosure channels?

---

## Source Provenance

- **Primary donor families:** local legacy security-checklist reservoir, `rust-skills` error/doc rule families, observability doctrine reservoir
- **Key local donor materials:**
  - current `rust-error-handling-patterns.md`
  - current `rust-logging-and-observability-best-practices.md`
  - `rust-skills/rules/err-context-chain.md`
  - `rust-skills/rules/err-result-over-panic.md`
  - `rust-skills/rules/doc-errors-section.md`
- **Upstream URL:** not yet fully re-verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending

---

## Core Rule

A secure Rust error surface must separate:
- what the user or foreign consumer is allowed to know
- what operators and maintainers need to know
- what must never leave protected telemetry or internal state

Security-aware error handling is therefore a boundary-design problem, not just a logging style problem.

A weak posture usually fails in one of two ways:
- it leaks implementation detail, secrets, or sensitive context
- or it becomes so generic that operators cannot diagnose real failures

The right doctrine is to preserve operational truth **without accidental disclosure**.

---

## Security Surface Map

| Surface | Security Question |
|---|---|
| User-facing error response | what is safe and useful for the end user to see? |
| Internal logs/traces | what context is needed for diagnosis, and what must be redacted? |
| CLI/operator diagnostics | what detail helps humans without revealing secrets or unstable internals casually? |
| Interop/foreign runtime error translation | what failure shape can cross safely into Python/JS/C/etc.? |
| Stored or exported artifacts | what sensitive values must be excluded, redacted, or replaced? |

Security-aware error handling must reason about each of these separately.

---

## Pattern 1 — User-Facing Messages Must Be Safer Than Internal Narratives

A user does not need your:
- stack traces
- internal file paths
- query text
- dependency versions
- secret-bearing configuration values
- low-level network or storage internals

A user usually needs:
- a stable error category or code
- a high-level message
- sometimes a correlation/request ID
- a next action, when helpful

The doctrine is:
- user-facing errors should be intentionally narrower than internal failure narratives

This is not about lying.
It is about disclosing only what the audience should safely use.

---

## Pattern 2 — Internal Logs and Traces Still Need Discipline

Internal telemetry may contain more detail, but not everything belongs there either.

Dangerous items often include:
- raw secrets, tokens, API keys
- full auth headers
- credential-bearing URLs or DSNs
- raw request bodies containing regulated or private data
- unredacted personal identifiers where they are not operationally necessary

The doctrine is:
- internal observability should be rich enough for diagnosis
- but sensitive content must be redacted, omitted, or normalized deliberately

This aligns strongly with the observability doctrine.

---

## Pattern 3 — Correlation IDs Are Safer Than Dumping Detail Everywhere

One of the healthiest patterns is to give users or downstream consumers:
- a request ID
- correlation ID
- incident reference

while keeping the richer internal story in logs/traces.

This lets support or operators connect:
- public-safe failure surfaces
with
- internal diagnostic context

without stuffing internal detail into the public response itself.

---

## Pattern 4 — Authentication and Authorization Failures Need Non-Enumerating Responses

Security-sensitive boundaries should avoid helping attackers distinguish too much.

Examples of risky disclosure:
- "user does not exist"
- "password incorrect"
- "token valid but missing role X"
- different timing/error surfaces that reveal resource existence or auth state too precisely

The doctrine is:
- where enumeration or probing risk is real, keep the external failure story intentionally uniform
- log the richer distinction internally if it matters operationally

This is especially relevant for:
- login flows
- invite/account recovery flows
- secret/token verification
- access-control gates

---

## Pattern 5 — Panic and Debug-Only Assumptions Must Not Leak Through Public Boundaries

Security-aware error handling must be especially strict about panic boundaries in:
- library APIs
- services exposed to external clients
- FFI / PyO3 / NAPI / WASM / Tauri boundaries

A panic that escapes a public boundary can become:
- a reliability failure
- a disclosure channel
- a denial-of-service vector
- an undefined or consumer-hostile interop state

The doctrine is:
- internal invariants may still panic narrowly when justified
- but exposed boundaries need translated, controlled failure surfaces instead

---

## Pattern 6 — Context Should Be Added Selectively, Not as a Secret Spill

Adding context improves diagnosis, but it can also accidentally leak:
- usernames/emails that should not be widely logged
- exact paths of sensitive files
- internal database naming
- raw query fragments
- hostnames, internal addresses, or account identifiers

When adding context, ask:
- does this context help diagnosis meaningfully?
- does it increase disclosure risk?
- does it belong in user response, operator logs, or nowhere at all?

The doctrine is:
- context is good when it clarifies the operation
- context is bad when it exposes sensitive internals without operational need

---

## Pattern 7 — Foreign Runtime Translation Must Preserve Safety, Not Raw Detail

When Rust errors cross into other runtimes, translate them deliberately.

Examples:
- Python exceptions
- JS/Promise rejections
- C ABI status/result channels
- WASM consumer-facing errors

The foreign consumer usually needs:
- a safe category/message
- perhaps a stable code
- maybe a correlation ID

They usually do **not** need:
- raw internal backtraces
- panic payloads
- unstable internal type names
- unredacted lower-level messages copied blindly from internals

Interop-safe translation is part of security-aware error posture, not just interoperability etiquette.

---

## Pattern 8 — Logs and Diagnostics Need a Redaction Model, Not Just Good Intentions

Security-aware systems should define how redaction works.

Common redaction targets:
- bearer tokens / API keys
- passwords / secrets
- connection strings with credentials
- PII-rich payload fragments
- highly sensitive environment/config values

A good posture often includes one or more of:
- centralized error sanitization helpers
- structured fields with known redaction rules
- wrappers/newtypes for sensitive data
- review rules for logging and error formatting

Do not depend on every call site remembering to "be careful." That is too fragile.

---

## Pattern 9 — Operator-Facing Detail Should Still Stay Proportionate

Security-aware error handling does not mean turning all internal tooling into vague nonsense.

Operator-facing surfaces may need:
- enough context to diagnose root cause
- stable categories and failure kinds
- correlations across logs/traces/metrics
- explicit note of sanitization where some details were withheld

The key is proportionality:
- enough detail to act
- not so much detail that telemetry becomes a liability store

---

## Pattern 10 — Review Error Surfaces as Security Surfaces

Error surfaces should be reviewed like other security-relevant interfaces.

Ask:
- does this response reveal internals that attackers should not learn?
- does this log contain secrets or high-sensitivity fields?
- does this foreign/runtime boundary leak raw Rust detail?
- does this auth failure reveal too much?
- does this correlation strategy help support without exposing internals publicly?

This checklist should be part of ordinary code review for sensitive systems.

---

## Security Checklist

Before calling a Rust error surface security-aware, ask:

- [ ] Are user-facing messages narrower and safer than internal narratives?
- [ ] Are logs/traces useful but redacted where needed?
- [ ] Are correlation/request IDs used instead of public over-disclosure?
- [ ] Do auth/access failures avoid obvious enumeration cues where appropriate?
- [ ] Do public/interop boundaries prevent raw panic or internal detail leakage?
- [ ] Is context added selectively rather than dumping sensitive internals?
- [ ] Is there a redaction/sanitization model rather than ad hoc caution?

---

## Anti-Patterns

- returning raw internal error strings to users
- logging secrets or credential-bearing values directly
- exposing file paths, DSNs, SQL, stack traces, or internal hostnames casually
- auth responses that reveal too much about resource existence or account state
- raw panic or backtrace information escaping through interop/public boundaries
- context enrichment that improves diagnosis but quietly creates disclosure risk

---

## Cross-Links

Read this alongside:
- `rust-error-handling-patterns.md`
- `rust-error-pattern-catalog.md`
- `rust-logging-and-observability-best-practices.md`
- `../interop/rust-ffi-and-interop-overview.md`
- `../interop/rust-interop-testing-and-audit-discipline.md`

---

## Final Doctrine

The reusable lesson is not:
> “hide internal details from users.”

The reusable lesson is:
> “design Rust error surfaces so each audience—user, operator, or foreign runtime—receives the safest useful level of truth, with redaction and correlation used deliberately to balance diagnosis against disclosure.”
