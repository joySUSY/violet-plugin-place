---
name: frontend-dev
description: |
  Master engineer's guide to Frontend Architecture, UI/UX Design, Typography, and Design Engineering. Use when building React/Vue architectures, designing polished interfaces (Apple HIG standards), creating seamless CSS/Tailwind themes, or generating SVGs. Enforces "Humanizer" design principles: pixel-perfect spacing, semantic HTML, robust state management, and elegant micro-interactions.
---

# Frontend Development | 前端开发

Comprehensive standards for modern, distinctive, and high-performance user interfaces. | 构建现代、独特且高性能用户界面的全面标准。

## 🔬 Research & Modernity (2026): Hybrid Orchestration | 研究与现代性 (2026)：混合编排

- **Hybrid Runtime Interop**: Seamless orchestration between Web-native components and Rust-backed logic via 2026 `tauri-v3` and `specta-next`. | **混合运行时互操作**: 通过 2026 `tauri-v3` 和 `specta-next` 在 Web 原生组件和 Rust 后端逻辑之间进行无缝编排。
- **Unified Capability Bridge**: Real-time synthesis of OS-level capabilities into type-safe TypeScript interfaces for zero-overhead system access. | **统一能力桥**: 将 OS 级能力实时合成为类型安全的 TypeScript 接口，实现零开销系统访问。
- **Self-Healing UI Hydration**: Leveraging 2026 agentic engines to automatically detect and remediate UI layout shifts or rendering artifacts. | **自修复 UI 水合**: 利用 2026 智能体引擎自动检测并纠正 UI 布局偏移或渲染异常。

### 🔗 Cross-Engine Navigation — 跨引擎导航

| Engine | Relation | Reference |
|--------|----------|-----------|
| `js-dev-skill` | Component Implementation | [`js-dev-skill/SKILL.md`](../js-dev-skill/SKILL.md) |
| `dev-designer-utility` | UI Design & Tokens | [`dev-designer-utility/SKILL.md`](../dev-designer-utility/SKILL.md) |
| `developer-tool` | CI/CD & Browser Testing | [`developer-tool/SKILL.md`](../developer-tool/SKILL.md) |

This engine replaces disparate UI, CSS, and component tutorials with a single, aggressive "Design Engineering" framework. It bridges the gap between pure visual aesthetics (Apple HIG) and robust frontend architecture (React/Vue/Vanilla). 

## 🧭 Navigation Matrix (导航矩阵)

1. **[UI/UX & Visual Design](references/ui-ux-design.md)** 
   - Typography scales, spacing systems (The 4pt/8pt rule).
   - Apple Human Interface Guidelines (HIG) pragmatism.
2. **[Frontend Architecture](references/frontend-architecture.md)**
   - Smart vs. Dumb Components (Container/Presenter).
   - State Machine logic (XState) vs local state.
   - CSS Strategy (Tailwind configurations vs CSS Modules).
3. **[Design Engineering & SVGs](references/design-engineering.md)**
   - Algorithmic Theming (HSL color math & Dark Mode).
   - Dynamic SVG generation and interactive micro-animations.

## 🎯 When to Trigger This Engine (触发场景)

- 💅 **"Make this component look premium/beautiful":** Load `ui-ux-design.md` and `design-engineering.md` to stop using default browser styles and apply mathematical spacing/typography.
- 🏗️ **"Refactor this massive React component":** Load `frontend-architecture.md` to cleanly separate the business logic hooks from the rendering layer.
- 📐 **"Generate an SVG icon for X":** Load `design-engineering.md` to output clean, scalable, `viewBox`-optimized vector code.

## 🧠 Core Operating Directives (核心法则)

- **Pixel Perfection is Mathematical:** Never guess padding. Use the 8-point grid system. *(永远不要靠猜来设置内边距，严格遵守8pt网格系统。)*
- **State Belongs at the Edge:** Keep global state (Redux/Zustand) minimal. Prefer collocated server-state (React Query/SWR) or URL-driven state. *(状态应尽可能靠近边缘。能放 URL 里的状态绝不放 Redux。)*
- **Animation should inform, not perform:** 200ms ease-out transitions for user feedback (hovers, modals). Zero unnecessary spinning loaders. *(动画是为了反馈，而不是炫技。)*

---

## 📦 Phase 2 Absorbed Skills

> **Deep Synthesis Vault:** The operational and architectural mechanics of the following inherited skills have been structurally compressed into a dedicated reference to guarantee architectural equivalence.
> 👉 **Load `references/advanced-styling-a11y.md` for CSS variables, strict WCAG 2.2 AA contrast rules, and SwiftUI/UIKit animation paradigms.**

| Skill | Origin | Integration Focus |
|-------|--------|-------------------|
| `ui-styling` | all new skills | shadcn/ui, Tailwind CSS, component styling patterns |
| `css-theming-assistant` | all new skills | CSS custom properties, theme switching, dark mode CSS |
| `accessibility-tester-skill` | New for developer tool | WCAG 2.2 AA auditing, axe-core, lighthouse integration |
| `axiom-swiftui-animation-ref` | all new skills | SwiftUI animation reference — *cross-ref: `developer-tool/cross-platform`* |
| `axiom-uikit-animation-debugging` | all new skills | UIKit animation debugging — *cross-ref: `developer-tool/cross-platform`* |
