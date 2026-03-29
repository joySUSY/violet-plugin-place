---
name: js-dev-skill
description: "JavaScript and Node.js runtime engine. ES2025+, React architecture, Bun/Vite toolchain, and async/event-loop mastery."
---

### 🔗 Cross-Engine Navigation — 跨引擎导航

| Engine | Relation | Reference |
|--------|----------|-----------|
| `rust-coding-engine` | Native addons (NAPI-RS) | [`rust-coding-engine/SKILL.md`](../rust-coding-engine/SKILL.md) |
| `frontend-dev` | UI Implementation & Frameworks | [`frontend-dev/SKILL.md`](../frontend-dev/SKILL.md) |
| `dev-designer-utility` | UI Components & Design | [`dev-designer-utility/SKILL.md`](../dev-designer-utility/SKILL.md) |
| `developer-tool` | CI/CD & Browser Automation | [`developer-tool/SKILL.md`](../developer-tool/SKILL.md) |
| `typescript-coding-engine` | TS Type System | [`typescript-coding-engine/SKILL.md`](../typescript-coding-engine/SKILL.md) |
| `go-coding-engine` | TS7/Corsa Backend | [`go-coding-engine/SKILL.md`](../go-coding-engine/SKILL.md) |

---

# ⚡ JS/TS & React Engine: The Humanizer Approach

> "JavaScript gives you the rope to hang yourself. TypeScript provides the safety net. React scales the operation."
> *(JS 予你绳索，TS 予你安全网，React 助你扩张。)*

This engine consolidates 11 tutorials into an elite, highly opinionated playbook for modern web engineering. It aggressively deprecates outdated React patterns (component lifecycles, global Redux) in favor of Server Components, immutable data flows, and mathematical type safety.

## 🧭 Navigation Matrix (导航矩阵)

1. **[Elite TypeScript Patterns](references/typescript-patterns.md)**
   - Discriminated Unions (The `type` guard).
   - Runtime Validation (Zod) vs Compile-time (`interface`).
   - Null safety and `Omit`/`Pick`.
2. **[React & Next.js Architecture](references/react-architecture.md)**
   - Server Components (RSC) vs Client Components (`"use client"`).
   - Hook invariants and the Death of `useEffect`.
   - Vercel deployment optimizations.
3. **[Ecosystem Tooling (Bun & Vite)](references/eco-system-tooling.md)**
   - Replacing NPM/Yarn with Bun for CI/CD speed.
   - Vite for lightning-fast HMR.

## 🎯 When to Trigger This Engine (触发场景)

- 🔒 **"Write a deeply typed utility function":** Load `typescript-patterns.md` to ensure zero `any` usage and exhaustive switch cases.
- ⚛️ **"Refactor this React component":** Load `react-architecture.md` to purge unnecessary `useEffect` calls and utilize derived state.
- 🐇 **"Setup a new JS project":** Load `eco-system-tooling.md` to scaffold a modern, blazingly fast `Bun` + `Vite` architecture.

## 🧠 Core Operating Directives (核心法则)

- **Zero `any` Tolerance:** The `any` type is a deliberate security vulnerability in logic. If you don't know the shape, use `unknown` and validate it with a Type Guard or Zod. *(对 any 零容忍。不知道数据结构时，用 unknown 并进行验证。)*
- **Data > DOM:** React is a state machine, not a jQuery wrapper. Never manipulate the DOM directly (`document.getElementById`). Mutate the data, and let React calculate the diff. *(React 是状态机，变更多据而非 DOM。)*
- **Derive, Don't Sync:** If State `C` can be calculated from State `A` and `B`, do not put `C` in `useState` and update it in a `useEffect`. Calculate it on the fly during render. *(能通过计算推导出的状态，绝不用 useState 存储。)*

---

## 📦 Phase 2 Absorbed Skills

> **Deep Synthesis Vault:** The operational and architectural mechanics of the following inherited skills have been structurally compressed into a dedicated reference to guarantee architectural equivalence.
> 👉 **Load `references/advanced-node.md` for template literal type mastery, NAPI-RS Rust bindings, and high-performance vector DB integration.**

| Skill | Origin | Integration Focus |
|-------|--------|-------------------|
| `typescript-pro-skill` | New for developer tool | Advanced TypeScript patterns, utility types, template literals |
| `ruvector` | all new skills | Node.js vector database with Rust NAPI backend |
| `ruvector-core-pkg` | all new skills | Core vector DB package (embeddings, KNN) |
| `ruvectorcore` | all new skills | Rust core implementation for ruvector |
| `ruvectornode` | all new skills | Node.js NAPI bindings for ruvector — *cross-ref: `rust-coding-engine`* |
