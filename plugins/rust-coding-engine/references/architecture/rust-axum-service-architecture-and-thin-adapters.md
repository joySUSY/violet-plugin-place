# Rust Axum Service Architecture and Thin Adapters

## Purpose

Define the canonical posture for Axum-based service architecture inside `rust-coding-engine`.

This document distills the most reusable lessons from Axum and hexagonal-service donors without flattening them into framework worship.

---

## Source Provenance

- **Primary donor families:** `rust-axum-framework`, `implementing-hexagonal-axum`
- **Key local donor materials:**
  - `rust-axum-framework/README.md`
  - `rust-axum-framework/EXAMPLES.md`
  - `rust-axum-framework/SKILL.md`
  - `implementing-hexagonal-axum/implementing-hexagonal-axum/IMPLEMENTATION.md`
- **Upstream URL:** not yet verified from local artifacts in the current workspace
- **Freshness status:** local-snapshot doctrine; upstream freshness verification still pending

---


## Core Rule

Axum is valuable not just because it is ergonomic.
It is valuable because it lets Rust keep strong boundary discipline while still building practical web services.

The canonical lesson is:
- use Axum as a thin HTTP surface over real application logic
- keep routing, extraction, middleware, and response conversion explicit
- do not let transport concerns become the core of the system

---

## Pattern 1 — Router Is the Delivery Skeleton, Not the Domain

The router should define:
- path structure
- nesting/modular grouping
- middleware placement
- connection between HTTP shape and handler entrypoints

It should not become the place where business logic quietly accumulates.

This matters because Rust web systems stay healthier when the delivery skeleton remains visibly separate from the application core.

---

## Pattern 2 — Handlers Should Stay Thin

A strong donor pattern is that handlers act as thin wrappers around the real logic.

Handlers should primarily do these things:
- extract typed inputs
- load state or dependencies
- call application logic
- translate result into `IntoResponse`

Handlers should not become:
- domain-model factories full of business rules
- giant state machines
- hidden repositories of transport-specific branching

This is especially important in Axum because the framework makes thin handlers pleasant to write.
Use that advantage.

---

## Pattern 3 — Extractors Are Boundary Contracts

Axum extractors are more than convenience helpers.
They are type-safe boundary declarations.

That means a good Axum architecture treats:
- `Path`
- `Query`
- `Json`
- `State`
- custom extractors

as part of the API boundary design.

The deeper lesson is:
- extraction shape is architecture
- request parsing is not a random detail
- type-safe boundaries reduce runtime ambiguity early

---

## Pattern 4 — State Must Be Shared Deliberately

A mature Axum service does not treat shared state casually.

A good state model:
- is cloneable and explicit
- separates shared resources from domain logic
- makes concurrency implications visible
- avoids stuffing every resource into one meaningless grab-bag if the system grows large

This is why state design belongs in architecture doctrine, not only in code snippets.

---

## Pattern 5 — Middleware Should Encode Cross-Cutting Concerns Only

Middleware is powerful.
That is why it must stay disciplined.

Good middleware ownership:
- authentication/authorization boundaries
- tracing/logging
- compression
- timeout / rate limiting / request shaping
- error conversion layers when appropriate

Bad middleware ownership:
- hidden business logic
- request-specific domain branching
- accidental state coordination that belongs in application services

---

## Pattern 6 — Error Types Need HTTP Boundary Intent

A Rust Axum service should map domain/application failures into HTTP responses deliberately.

This means:
- typed errors matter
- `IntoResponse` is part of boundary design
- status code and response shape should reflect real failure classes
- handlers should not casually erase domain meaning into generic 500s unless the boundary truly justifies it

This aligns with the broader error doctrine of the engine.

---

## Pattern 7 — Hexagonal Axum Works When Boundaries Stay Honest

The best lesson from hexagonal Axum donors is not “always build four layers”.
It is:
- let Axum remain an outer adapter
- let application logic remain transport-agnostic
- let repositories and infrastructure stay behind ports/interfaces
- let inward dependency direction remain visible

That is what makes Axum a good delivery mechanism for clean or hexagonal designs.

---

## Pattern 8 — Production Service Concerns Are Part of the Architecture

A serious Axum service architecture must also reserve room for:
- health and readiness checks
- graceful shutdown
- structured logging/tracing
- security headers and CORS posture
- rate limiting and backpressure
- testing and deployment posture

These are not bolt-on extras.
They are part of what it means to design a real service.

---

## Why This Matters to `rust-coding-engine`

This doctrine strengthens the engine's ability to teach:
- Axum as delivery skeleton
- thin handler design
- typed extractors as contract surfaces
- middleware discipline
- clean/hexagonal integration with a modern Rust web stack
