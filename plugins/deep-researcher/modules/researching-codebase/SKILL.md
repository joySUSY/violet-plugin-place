---
name: strategic-technical-discovery
description: |
  # Strategic Technical Discovery | 战略技术探索

  Systematic exploration of codebase structures and dependencies. | 代码库结构和依赖项的系统性探索。

  ## 🔬 Research & Modernity (2026): Adaptive Mapping | 研究与现代性 (2026)：自适应映射

  - **Heuristic Context Injection**: Proactively identifying and reading "Context Anchors" (e.g., `mod.rs`, `Cargo.toml`, `settings.json`) before deep-diving into implementation. | **启发式上下文注入**: 在深入实施之前，主动识别并阅读“上下文锚点”（例如 `mod.rs`、`Cargo.toml`、`settings.json`）。
  - **Hallucination-Resistant Verification**: Cross-referencing found code blocks with the unified knowledge base to ensure architectural consistency. | **抗幻觉验证**: 将找到的代码块与统一知识库进行交叉引用，以确保架构的一致性。
  Use before any non-trivial implementation task to gather context in isolation.
compatibility: Designed for Claude Code
metadata:
  allowed-tools: Read, Grep, Glob
  argument-hint: [topic-or-question]
  context: fork
  agent: Explore
---

# Codebase Research (ACE-FCA)

**Query**: $ARGUMENTS

Gathers codebase context **in isolation** before planning. Prevents search
artifacts from polluting main context.

## Core Principles

1. **Documentation-only** - Describe what exists, where, and how it works
2. **No evaluations** - Never suggest improvements or critique implementation
3. **Evidence-based** - Provide file paths, line numbers, and code references
4. **Isolation** - Research runs in fork context; return only distilled findings

## When to Use

- Before planning non-trivial implementations
- When unfamiliar with relevant codebase areas
- Before architectural decisions

## Workflow

1. **Read mentioned files first** - If specific files mentioned, read completely before exploring
2. **Decompose the question** - Break query into researchable components
3. **Explore codebase** - Investigate architecture, patterns, constraints
4. **Identify scope** - Determine relevant areas based on findings
5. **Distill** - Return structured summary using output format below

## Output Format

Follow ACE-FCA quality equation: **Correct + Complete + Minimal noise**

```markdown
---
research_query: "<original question>"
timestamp: "<ISO 8601>"
files_examined: <count>
---

## Key Files

| File | Purpose | Key Lines |
|------|---------|-----------|
| `path/to/file.ext` | Brief purpose | L42-58 |

## Patterns

- **Pattern name**: Description with file reference (`path:line`)

## Constraints

- Constraint with evidence (`path:line`)

```

## Evidence Requirements

Every claim must include:

- **File path**: Exact location (`src/auth/login.ts`)
- **Line numbers**: Specific lines (`L42-58` or `L127`)
- **Code reference**: Function/class name when relevant

**Bad**: "Authentication uses JWT tokens"
**Good**: "Authentication uses JWT tokens (`src/auth/jwt.ts:L23-45`, `verifyToken` function)"

## References

See `references/context-management.md` and `references/core-principles.md`.
