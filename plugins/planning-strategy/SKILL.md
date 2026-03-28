---
name: planning-strategy
description: |
  Master engineer's guide to system architecture, feature planning, and task coordination. Use when starting a new project, writing Technical Specifications, creating Architecture Decision Records (ADRs), brainstorming product requirements, or breaking down epics into parallelizable tasks (`task.md`). Prevents "coding first, thinking later" by enforcing a structured 90% Planning / 10% Execution methodology.
---

# 🗺️ Planning Strategy Engine | 规划策略引擎

> "Weeks of coding can save you hours of planning."
> "几周的代码编写往往可以通过几小时的规划来避免。"

## 🔬 Research & Modernity (2026): Adaptive Orchestration | 研究与现代性 (2026)：自适应编排

- **Agentic Lattice Planning**: Utilizing 2026 decentralized coordination patterns to enable autonomous, self-healing project lifecycles. | **智能体晶格规划**: 利用 2026 分布式协作模式，实现自主、自愈的项目生命周期。
- **Semantic Constraint Synthesis**: Real-time transformation of natural language intent into deterministic architectural constraints via 2026 `plan-v3` engines. | **语义约束合成**: 通过 2026 `plan-v3` 引擎将自然语言意图实时转换为确定性的架构约束。
- **L0-L3 Complexity Hydration**: Automated scaling of project structure and documentation depth based on predicted system complexity. | **L0-L3 复杂度水合**: 根据预测的系统复杂度，自动调整项目结构和文档深度。

### 🔗 Cross-Engine Navigation — 跨引擎导航

| Engine | Relation | Reference |
|--------|----------|-----------|
| `developer-tool` | Execution & CI/CD | [`developer-tool/SKILL.md`](../developer-tool/SKILL.md) |
| `developer-tool/ai-agent-memory` | Recall / history / continuity control baseline | [`developer-tool/ai-agent-memory/README.md`](../developer-tool/ai-agent-memory/README.md) |
| `reviewer-dev` | Quality Gate Enforcement | [`reviewer-dev/SKILL.md`](../reviewer-dev/SKILL.md) |
| `dev-designer-utility` | Visual Strategy & Ident | [`dev-designer-utility/SKILL.md`](../dev-designer-utility/SKILL.md) |
| `documentation-guidelines` | Knowledge Synthesis | [`documentation-guidelines/SKILL.md`](../documentation-guidelines/SKILL.md) |

## 🧭 Navigation Matrix

1. **[Product & Requirements (PRD)](references/product-requirements.md)**
   - Brainstorming frameworks.
   - Transforming vague ideas ("Make it fast") into testable constraints ("P99 latency < 200ms").
2. **[Architecture & Tech Specs (ADR)](references/architecture-decisions.md)**
   - Writing pristine Technical Specifications.
   - The ADR (Architecture Decision Record) format.
   - Evaluating trade-offs (Build vs. Buy, SQL vs. NoSQL).
3. **[Task Coordination & Execution](references/task-coordination.md)**
   - Creating the ultimate `task.md`.
   - Identifying critical paths and unblocking parallel feature development.
4. **[Agent Reasoning & Reflective Thinking](references/agent-reasoning.md)**
   - Sequential Thinking (CoT) and hypothesis verification.
   - Dynamic adjustment and revision patterns.
5. **[Autonomous Lattice Planning](references/lattice-coordination.md)**
   - Founding anchor documents (Commission, Architecture, Conventions).
   - Decentralized agent work cycles and context stability.
6. **[Recall-Governed Planning](references/recall-governed-planning.md)**
   - Load the canonical memory / history baseline before writing ADRs, PRDs, or task plans.
   - Hand off surfaced planning deltas to the continuity shell only after the plan is explicit.

## 🎯 When to Trigger This Engine

- 🏗️ **"I want to build a new App. Where do we start?":** Load `product-requirements.md` and `architecture-decisions.md`. Do not write code yet.
- ⚖️ **"Should we use Postgres or MongoDB for this feature?":** Load `architecture-decisions.md` to draft an ADR and weigh the actual trade-offs.
- 📋 **"Break this feature down into steps":** Load `task-coordination.md` to generate a dependency-aware checklist.
- 🧠 **"We tried something like this before" / "Why are we planning it this way?":** Load `recall-governed-planning.md` to recall the relevant continuity lane before shaping a new ADR or execution plan.

## 🧠 Core Operating Directives

- **90% Planning, 10% Execution:** Code is a liability. Only write it once the data models, system boundaries, and user flows are conceptually proven.
- **Document Decisions, Not Just Outcomes:** An ADR must capture the _rejected_ alternatives. Future engineers need to know _why_ you didn't choose the obvious path.
- **Dependencies First:** When breaking down tasks, always build the interfaces/mocks first so front-end and back-end teams can work in parallel.
- **Recall Before Planning:** Before writing a PRD, ADR, or execution checklist, inspect the relevant memory / history lane first. Planning without prior failures and prior decisions is just expensive amnesia.
- **Continuity After Planning:** If a planning cycle creates a handoff-worthy delta (decision, blocker, changed direction, partial execution state), externalize that surfaced continuity instead of assuming the next session will reconstruct it.

## Batch 2 Control-Baseline Integration (批次 2 控制基线接入)

Start from the canonical control center, not from donor reservoirs:

1. `../developer-tool/ai-agent-memory/README.md`
2. `../developer-tool/references/ai-agent-memory/recall-before-act.md`
3. `../developer-tool/references/ai-agent-memory/history-retrieval-patterns.md` when historical rationale matters
4. `../developer-tool/references/ai-agent-memory/memory-trigger-matrix.md` when deciding whether a planning result should stay in doctrine or be captured as project-local continuity

Use `../plugins/violet-memory-lab/` only when the planning output must become a surfaced continuity artifact.
Do not turn the plugin shell into the planning doctrine.

---

## 📦 Phase 2 Absorbed Skills

> **Deep Synthesis Vault:** The operational and architectural mechanics of the following inherited skills have been structurally compressed into a dedicated reference to guarantee architectural equivalence.
> 👉 **Load `references/product-project-strategy.md` for phased planning, Technical Spikes, RICE priorization, and enterprise solution architecture.**

| Skill                      | Origin                 | Integration Focus                                     |
| -------------------------- | ---------------------- | ----------------------------------------------------- |
| `code-plan`                | all new skills         | Structured code planning methodology                  |
| `phased-planning`          | all new skills         | Multi-phase implementation planning                   |
| `planning-goal`            | all new skills         | Goal-oriented planning frameworks                     |
| `create-technical-spike`   | all new skills         | Technical spike design and execution                  |
| `product-manager-skill`    | New for developer tool | Product strategy, roadmaps, feature prioritization    |
| `project-manager-skill`    | New for developer tool | Project execution, monitoring, closure                |
| `solution-architect-skill` | New for developer tool | Enterprise solution design, TOGAF, trade-off analysis |
| `risk-manager-skill`       | New for developer tool | Risk assessment, mitigation strategies                |

## 📦 Phase 3 Absorbed Skills

| Skill                              | Category      | Integration Focus                                           |
| ---------------------------------- | ------------- | ----------------------------------------------------------- |
| `sequential-thinking`              | Reasoning     | Reflection, revision, and hypothesis-driven logic           |
| `lattice-planning`                 | Coordination  | Foundational project documents and decentralized cycles     |
| `plan-hard`                        | Strategy      | Rigorous planning enforcement and verification              |
| `agent-selection-usage-guidelines` | Selection     | Choosing the right model/agent for specific reasoning tasks |
| `idea-shortlist-curator`           | Brainstorming | Filtering and prioritizing high-signal product ideas        |
