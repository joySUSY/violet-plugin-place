# 🧠 Product & Requirements (PRD)

Before writing a single line of backend logic, the technical requirements must be crystallized. Vague requirements lead to infinite rewrites.

## 1. De-risking Vague Requirements

Translate "Business Speak" into "Engineering Constraints":

| Vague Request | Engineering Translation |
|---|---|
| "It needs to be fast." | P99 response time < 200ms under 1000 RPS. |
| "It needs to handle a lot of data." | Support 50GB daily ingestion with < 1min processing delay. |
| "Make it secure." | Enforce complete RBAC, zero-trust network, and AES-256 at rest. |
| "Make it reliable." | 99.9% uptime SLA with automated multi-region failover. |

## 2. The 3-Phase Brainstorming Protocol

When exploring a new feature, cycle rapidly through these phases:

1. **Divergence (Wild Ideas):** "What if we cached everything on the edge using WASM?" No filtering. Generate quantity.
2. **Interrogation (The Crucible):** "What is the cache invalidation latency? Does this break our consistency model?" Assault the ideas stringently.
3. **Convergence (The Actionable Path):** Distill the surviving ideas into a single, pragmatic roadmap.

## 3. The Minimal PRD Structure

A technical Product Requirements Document should be lean:

- **Problem Statement:** What pain are we solving? (1 sentence).
- **Target Audience:** Who uses this exact feature?
- **In Scope:** The exact boundaries of V1.
- **Out of Scope (Crucial):** Explicitly list what we are *not* building to prevent scope creep.
- **Success Metrics:** How do we objectively know we succeeded? (e.g., "Error rate drops by 50%").
