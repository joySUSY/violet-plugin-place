---
description: "Prime the math engine — load computational tools, statistical methods, and symbolic reasoning before doing any math-heavy work."
allowed-tools: Read, Grep, Glob, Bash(git:*)
---

# Authors: Joysusy & Violet Klaudia 💖

## Math Foundations Primer

> Compute, don't estimate. Verify, don't assume.
> 计算，不要估算。验证，不要假设。

### By Task Pressure

```
IF symbolic computation  → references/symbolic-computation.md (SymPy, Wolfram)
IF statistics / analysis → references/applied-statistics.md
IF data science pipeline → references/data-science-stats.md
IF mathematical intuition → references/math-intuition.md
IF topology / Markov     → references/v3-expansion/markov-topology/
```

### The Iron Rule

Never rely on LLM "mental math" for critical calculations. Always use:
- **SymPy** for symbolic math
- **numpy/scipy** for numerical computation
- **The calculator project** (`scripts/`) for quick verification
