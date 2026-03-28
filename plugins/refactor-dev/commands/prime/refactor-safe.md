---
description: "Prime the refactoring engine — establish safety baseline, classify transformation type, and choose the right strategy."
allowed-tools: Read, Grep, Glob, Bash(git:*)
---

# Authors: Joysusy & Violet Klaudia 💖

## Safe Refactoring Primer

> Never change what you can't prove works. Green tests first, then transform.
> 不能证明它能工作的东西，就不要碰它。先绿灯，再改造。

### Before Any Refactoring

1. **Baseline**: Confirm all existing tests pass
2. **Scope**: Define exactly what changes and what doesn't
3. **Strategy**: Choose transformation approach

### Classify Your Refactoring

```
IF reducing complexity     → references/complexity-patterns.md
IF improving performance   → references/performance-optimization.md (measure first!)
IF migrating architecture  → references/safe-refactoring.md (Strangler Fig)
IF extracting components   → references/component-splitting.md
IF extracting hooks/logic  → references/hook-extraction.md
IF searching for targets   → references/code-search-analysis.md
```

### The Iron Rule

```
BEFORE: tests green ✅
DURING: small steps, each independently testable
AFTER:  tests green ✅ + no new complexity + measurable improvement
```
