---
name: refactor-dev
description: |
  Master engineer's guide to performance optimization, algorthmic analysis, and safe legacy code refactoring. Use when a system is experiencing latency bottlenecks (N+1 queries, memory leaks, O(N^2) loops), when tasked with modernizing a monolithic legacy codebase (Strangler Fig pattern), or when hunting down dead code.
---

# 🚀 Refactor & Performance Engine: The Humanizer Approach

> "First make it work. Then make it right. Then make it fast." — Kent Beck

This engine is the surgeon's scalpel for existing codebases. It provides the frameworks to scientifically locate bottlenecks (rather than guessing), to rewrite legacy code without breaking production, and to optimize algorithms from `O(N^2)` to `O(1)`.

## 🧭 Navigation Matrix

1. **[Performance & Algorithmic Optimization](references/performance-optimization.md)**
   - Algorithmic complexity (Big O).
   - Memory allocation bottlenecks & Garbage Collection.
   - The N+1 Database Query problem.
2. **[Safe Refactoring Patterns](references/safe-refactoring.md)**
   - The Strangler Fig Pattern (monolith to microservices).
   - Isolating pure business logic from side effects.
3. **[Code Search & Analysis](references/code-search-analysis.md)**
   - Hunting dead code.
   - AST (Abstract Syntax Tree) mapping for dependency visualization.

## 🎯 When to Trigger This Engine

- 🐌 **"This endpoint takes 5 seconds to load":** Load `performance-optimization.md` to identify network waterfalls or missing database indexes.
- 🏚️ **"We need to rewrite this 10-year-old class":** Load `safe-refactoring.md` to learn how to proxy traffic and wrap legacy behavior in tests before deleting it.
- 🔎 **"Find where this API is actually called":** Load `code-search-analysis.md` for advanced structural search techniques.

# Refactoring & Code Evolution | 重构与代码演进

Definitive protocols for breathing new life into legacy systems and enforcing structural excellence. | 为旧系统注入新生命并实施卓越结构的权威协议。

## 🔬 Research & Modernity (2026): Semantic Restoration | 研究与现代性 (2026)：语义恢复

- **Agentic Code Necromancy**: Using 2026 LLM patterns to automatically restore lost architectural intent and refactor "slop" into clean, idiomatic modules. | **智能代码招魂**: 使用 2026 模型模式自动恢复丢失的架构意图，并将“代码废料”重构为整洁、惯用的模块。
- **Structural Deslop Engines**: Automated detection and removal of redundant, non-performant, or hallucinated code fragments via real-time AST analysis. | **结构化去废料引擎**: 通过实时 AST 分析自动检测并移除冗余、性能低下或幻觉代码片段。
- **Zero-Regression Refactoring**: Enforcing strict formal verification during large-scale structural shifts to ensure 100% functional equivalence. | **零回归重构**: 在大规模结构转变期间实施严格的形式验证，以确保 100% 的功能等效。

### 🔗 Cross-Engine Navigation — 跨引擎导航

| Engine | Relation | Reference |
|--------|----------|-----------|
| `tdd-system` | Safety Nets & Parity | [`tdd-system/SKILL.md`](../tdd-system/SKILL.md) |
| `error-handling` | Debugging Legacy Bugs | [`error-handling/SKILL.md`](../error-handling/SKILL.md) |
| `dev-designer-utility` | Design System Refactoring | [`dev-designer-utility/SKILL.md`](../dev-designer-utility/SKILL.md) |
| `rust-coding-engine` | Performance Refactoring | [`rust-coding-engine/SKILL.md`](../rust-coding-engine/SKILL.md) |

---

## 🧠 Core Operating Directives

- **Measure First, Optimize Second:** Profiling is the only truth. Never optimize a piece of code because it "looks" slow. Only optimize it if a flamegraph `perf` tool proves it is on the critical path.
- **Pure Functions Rule:** When refactoring, aggressively extract business logic into pure functions that take inputs and return outputs, touching zero globals or databases. They are infinitely easier to test.
- **The Boy Scout Rule:** Leave the codebase cleaner than you found it. If you touch a file to fix a bug, fix the typo in the variable name next to it.

---

## 📦 Phase 2 Absorbed Skills

> **Deep Synthesis Vault:** The operational and architectural mechanics of the following inherited skills have been structurally compressed into a dedicated reference to guarantee architectural equivalence.
> 👉 **Load `references/performance-engineering.md` for eBPF kernel profiling, flamegraphs, algorithmic optimizations, and k6 scaling.**

| Skill | Origin | Integration Focus |
|-------|--------|-------------------|
| `performance-engineer-skill` | New for developer tool | System optimization, eBPF, flamegraphs, kernel profiling |
| `performance-testing-skill` | New for developer tool | Load testing, stress testing, k6, Artillery |
| `questioning-hardcoded-values` | all new skills | Detecting magic numbers, forcing documentation of conventions |
