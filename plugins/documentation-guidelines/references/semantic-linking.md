# Semantic Linking & Cross-Referencing | 语义链接与交叉引用

Principles for building a unified knowledge graph across documentation components (Skill -> Module -> Reference). | 在文档组件（技能 -> 模块 -> 参考）之间构建统一知识图谱的原则。

## 🔬 Research & Modernity (2026): Unified Reference Systems | 研究与现代性 (2026)：统一引用系统

- **Semantic Reference IDs**: Use stable, content-addressable IDs for cross-skill linking to prevent broken links during refactors. | **语义引用 ID**: 为跨技能链接使用稳定的、内容寻址的 ID，以防止在重构过程中发生链接断开。
- **Bidirectional Traceability**: Ensure every design decision in `DESIGN.md` can be traced to a specific sub-module implementation. | **双向可追溯性**: 确保 `DESIGN.md` 中的每个设计决策都可以追溯到特定的子模块实现。

## Linkification Strategy | 链接化策略

### 1. External Asset Linking | 外部资产链接

Use absolute paths or workspace-relative markers for assets to ensure AI agents can locate them instantly. | 为资产使用绝对路径或工作区相对标记，以确保 AI 智能体可以立即找到它们。

### 2. The Dependency Declaration Hook | 依赖声明钩子

Mandatory inclusion of a `Dependencies` section in sub-module `SKILL.md` to declare architectural hierarchy. | 在子模块 `SKILL.md` 中强制包含 `依赖项` 部分，以声明架构层级。
