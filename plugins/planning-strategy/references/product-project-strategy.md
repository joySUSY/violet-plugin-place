# 🗺️ Product & Project Strategy (产品与项目战略)

The `planning-strategy` engine absorbs 8 unique planning, product, and architectural skills. Code is the most expensive way to solve a problem.

## 1. Goal-Oriented Phased Planning (目标导向分阶段规划)

- **Phase 0: Architecture & Proving (The Spike):** Never start building a feature blindly. Timebox a technical spike (e.g., 4 hours) to prove the most critical/risky assumption. Document the outcome, throw away the code.
- **Phase 1: Interfaces First:** Define the API contracts (OpenAPI/GraphQL) and data schemas before touching the application layer. This unblocks parallel development.
- **Phase 2: Core Loop:** Implement the "happy path" end-to-end.
- **Phase 3: Edge Cases & Polish:** Error handling, rate limiting, and observability.

## 2. Product Management Discipline (产品管理准则)

- **The "Why" Document:** Every epic requires a PRD (Product Requirements Document) that explicitly defines the user pain point. If the pain point isn't measurable, reject the feature.
- **Feature Prioritization (RICE Framework):** Evaluate features by Reach, Impact, Confidence, and Effort.

## 3. Project Management & Risk Mitigation (项目管理与风险防范)

- **Risk Identification:** List the top 3 reasons a project will fail *before* it begins (The Pre-mortem).
- **Scope Creep:** The default answer to mid-sprint feature additions is "No, but we can add it to the next cycle." Protect the team's focus.

## 4. Enterprise Solution Architecture (企业级架构)

- **Trade-off Analysis:** Every architectural decision (e.g., Microservices vs Monolith) must be justified through a Trade-Off matrix. There are no silver bullets, only compromises.
- **TOGAF Principles:** Align technology architecture with business architecture (Data, Application, Technology domains).

---
*Absorbed knowledge from: code-plan, phased-planning, planning-goal, create-technical-spike, product-manager-skill, project-manager-skill, solution-architect-skill, risk-manager-skill.*
