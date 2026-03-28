# Refactoring & Performance Engine
# Authors: Joysusy & Violet Klaudia 💖

> Never change what you can't prove works. Measure, then optimize.
> 不能证明它能工作的东西不要碰。先测量，再优化。

## What This Engine Owns

Cross-language refactoring methodology, complexity analysis, performance profiling strategy, and safe migration patterns (Strangler Fig, component extraction, hook extraction).

## Structure

```
refactor-dev/
├── .claude-plugin/plugin.json
├── SKILL.md
├── README.md
├── commands/prime/refactor-safe.md
├── agents/clarity.md                  # Transformation Mind
├── hooks/hooks.json
└── references/
    ├── safe-refactoring.md
    ├── complexity-patterns.md
    ├── performance-engineering.md
    ├── performance-optimization.md
    ├── code-search-analysis.md
    ├── component-splitting.md
    └── hook-extraction.md
```

## Cross-Engine Boundaries

| Responsibility | Owner |
|---|---|
| Refactoring methodology + safe transformation | **This engine** |
| Test baseline establishment | `tdd-system` |
| Architecture-level redesign | `planning-strategy` |
| Code review of refactored code | `reviewer-dev` |
| Language-specific refactoring idioms | Each language engine |
