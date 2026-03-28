---
name: tdd-system
description: |
  Master engineer's guide to Test-Driven Development, verification-first delivery, regression prevention, and AI/codegen validation. Use when fixing bugs, writing new features through Red → Green → Refactor, designing test strategy, or proving that a refactor or generated implementation is correct before completion.
---

# 🧪 TDD & Evaluation Engine | 测试驱动与验证引擎

Comprehensive standards for high-velocity, verification-first software engineering. | 高速、验证优先的软件工程全面标准。

## 🔬 Research & Modernity (2026): Verification-First | 研究与现代性 (2026)：验证优先

- **Polyglot Test-Agent Orchestration**: Leveraging 2026 agentic engines to automatically synthesize cross-language test suites that ensure 100% boundary parity. | **多语言测试智能体编排**: 利用 2026 智能体引擎自动合成跨语言测试套件，确保 100% 的边界对齐。
- **Fixture-Driven Hydration**: Real-time generation of stateful test fixtures from production telemetry for high-fidelity edge-case replication. | **固件驱动水合**: 从生产遥测实时生成有状态测试固件，实现高保真边缘案例复制。
- **Verification Before Completion**: Use this engine when fixing bugs, preventing regressions, designing complex business logic schemas, or explicitly validating AI / CodeGen accuracy. | **完成前验证**: 当修复缺陷、防止回归、设计复杂业务逻辑或验证 AI / 代码生成结果时使用此引擎。

### 🔗 Cross-Engine Navigation — 跨引擎导航

| Engine | Relation | Reference |
|--------|----------|-----------|
| `developer-tool/ai-agent-memory` | Failure recall / continuity lane selection | [`developer-tool/ai-agent-memory/README.md`](../developer-tool/ai-agent-memory/README.md) |
| `refactor-dev` | Regression Testing | [`refactor-dev/SKILL.md`](../refactor-dev/SKILL.md) |
| `math-skill-system` | Formal Model Verification | [`math-skill-system/SKILL.md`](../math-skill-system/SKILL.md) |
| `dev-designer-utility` | UI & Theme Testing | [`dev-designer-utility/SKILL.md`](../dev-designer-utility/SKILL.md) |
| `error-handling` | Root Cause Analysis | [`error-handling/SKILL.md`](../error-handling/SKILL.md) |

---

# 🔄 TDD & Evaluation Engine: The Humanizer Approach

> "If it isn't tested, it's broken. If it isn't automated, it doesn't exist."

This engine consolidates testing and evaluation doctrine into a verification-first system. It shifts the engineer's mindset from "writing code that works" to "writing tests that prove the code cannot fail." It establishes the absolute requirement of proving a bug exists *before* fixing it.

## 🧭 Navigation Matrix (导航矩阵)

1. **[The TDD Workflow (Red-Green-Refactor)](references/tdd-workflow.md)**
   - The unbreakable loop of Test-Driven Development.
   - Writing tests that fail (Red), making them pass (Green), and cleaning up (Refactor).
2. **[Testing Tactics (Unit, Integration, E2E)](references/testing-tactics.md)**
   - The Testing Pyramid.
   - Mocking dependencies (Stubs vs Spies vs Mocks).
   - "Arrange, Act, Assert" (AAA) pattern.
3. **[Agentic Evaluation & Checklists](references/agent-evaluation.md)**
   - Pre-flight checklists for code completion.
   - Evaluating LLM/AI output mathematically (Verification Loops).
4. **[Regression Memory Loop](references/regression-memory-loop.md)**
   - Recall surfaced failures, decision trails, and history lanes before writing the red test.
   - Externalize reusable regression lessons only after the loop reveals a future-worthy continuity delta.

## 🎯 When to Trigger This Engine (触发场景)

- 🐛 **"Fix this bug in the calculating logic":** Load `tdd-workflow.md` to instantly write a failing test that reproduces the bug *before* writing any product code.
- 🔗 **"Test the database connection flow":** Load `testing-tactics.md` to understand how to mock the network layer, or spin up a local Docker Postgres for true integration tests.
- 🤖 **"Validate that the AI solved the problem":** Load `agent-evaluation.md` to run the strict Verification Loop constraint checklist.
- ♻️ **"This bug keeps coming back" / "Resume the interrupted fix":** Load `regression-memory-loop.md` to recover the exact failing context before touching the implementation.

## 🧠 Core Operating Directives (核心法则)

- **Verification Before Completion:** Never assume a refactor or feature is "done" because the code looks right. Tests must execute, and quality gates (Linters, Type Checkers) must pass. *(在所有验证门禁通过前，绝不能声称任务已完成。)*
- **Test Behaviors, Not Implementation Details:** If you rename an internal private variable and your test breaks, your test is badly written. Tests should only interact with public APIs. *(测试行为和结果，绝不测试内部实现细节。)*
- **The Red Phase is Mandatory:** If you write a test and it passes immediately, you have either tested the wrong thing or written an invalid test. You must witness the test fail first. *(必须先见证测试飘红，否则测试无效。)*
- **Recall Before Reproducing:** Before writing the failing test, inspect surfaced failures, decision trails, and history artifacts so the red test mirrors the real regression rather than a guessed variant. *(先回忆再复现，避免写出“猜测型红测”。)*
- **Continuity After the Loop:** If a TDD cycle uncovers a reusable pitfall or leaves an unfinished handoff, capture surfaced continuity instead of hiding the lesson in local context. *(循环结束后，把真正值得传承的坑和结论显式外化。)*

## Batch 2 Control-Baseline Integration (批次 2 控制基线接入)

Before non-trivial bug fixing or regression work, read through the canonical control path:

1. `../developer-tool/ai-agent-memory/README.md`
2. `../developer-tool/references/ai-agent-memory/recall-before-act.md`
3. `../developer-tool/references/ai-agent-memory/history-retrieval-patterns.md` when the failure source may live in sessions / git history / deleted artifacts
4. `../developer-tool/references/ai-agent-memory/continuity-control-plane.md` when the fix loop must recover interrupted state

Use `../plugins/violet-memory-lab/` only when the loop needs project-local surfaced continuity capture or recovery.
Do not turn the continuity plugin into the source of TDD doctrine.

---

## 📦 Phase 2 Absorbed Skills

> **Deep Synthesis Vault:** The operational and architectural mechanics of the following inherited skills have been structurally compressed into a dedicated reference to guarantee architectural equivalence.
> 👉 **Load `references/test-automation.md` for the test automation pyramid, Playwright vs Cypress strategies, and test flakiness eradication.**

| Skill | Origin | Integration Focus |
|-------|--------|-------------------|
| `test-automator-skill` | New for developer tool | Robust test frameworks (Playwright, Cypress, AI-driven testing) |
