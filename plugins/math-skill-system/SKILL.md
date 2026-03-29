---
name: math-skill-system
description: "Mathematical computation engine. Symbolic math (SymPy), statistics, data science, proofs, and numerical verification."
---

### 🔗 Cross-Engine Navigation — 跨引擎导航

| Engine | Relation | Reference |
|--------|----------|-----------|
| `python-dev-skill` | Scikit-learn & Plotting | [`python-dev-skill/SKILL.md`](../python-dev-skill/SKILL.md) |
| `rust-coding-engine` | High-perf Analytics | [`rust-coding-engine/SKILL.md`](../rust-coding-engine/SKILL.md) |
| `dev-designer-utility` | Visualizing Geometry | [`dev-designer-utility/SKILL.md`](../dev-designer-utility/SKILL.md) |
| `tdd-system` | Formal Verification | [`tdd-system/SKILL.md`](../tdd-system/SKILL.md) |

---

# 🧮 Math Skill System: The Humanizer Approach

> "An ounce of algebra is worth a ton of brute force." 
> *(一两代数胜过千斤蛮力。)*

This engine consolidates 11 scattered math, geometry, and data-science skills into an elite mathematical reasoning framework. It forces the system to stop writing `while(true)` loops for math problems and instead use symbolic logic, established theorems, and rigorous statistical analysis.

## 🧭 Navigation Matrix (导航矩阵)

1. **[Mathematical Intuition & Proofs](references/math-intuition.md)**
   - Propositional logic, De Morgan's Laws.
   - Reducing algorithmic complexity via mathematical theorems.
2. **[Symbolic Computation (SymPy)](references/symbolic-computation.md)**
   - Solving polynomials, calculus (limits/derivatives/integrals).
   - Using Python's `sympy` to verify bounds safely.
3. **[Data Science & Benchmarking](references/data-science-stats.md)**
   - Statistical significance (P-values), Normal vs Poisson distributions.
   - Designing robust benchmark suites (Standard Deviation, Outlier removal).

## 🎯 When to Trigger This Engine (触发场景)

- 🧐 **"How do I calculate the intersection of these two 3D planes?":** Load `math-intuition.md` to use linear algebra (cross products) instead of iterative guessing.
- 📐 **"We need to solve this system of equations in our script":** Load `symbolic-computation.md` to offload the heavy lifting to `SymPy` rather than writing raw floats.
- 📊 **"Is this new sorting algorithm actually faster?":** Load `data-science-stats.md` to run a proper benchmark that accounts for CPU variance and standard deviation.

## 🧠 Core Operating Directives (核心法则)

- **Formula Over Loop:** Before writing a `for` loop to sum consecutive numbers, use Gauss's formula `(n * (n+1))/2`. Always search for the mathematical constant. *(能用公式解决的，绝不用循环暴力破解。)*
- **Float Precision is Lava:** Never use standard generic `floats` for currency or exact mathematical logic. Use `BigInt`, `Decimal`, or fractional representations. (`0.1 + 0.2 != 0.3`). *(永远不要用普通浮点数处理货币或高精度算术。)*
- **Verify with Types:** If a function expects a Matrix, type it as a Matrix. Let the type system enforce mathematical constraints (e.g., preventing a scalar from being added to a 2D vector natively).

---

## 📦 Phase 2 Absorbed Skills

> **Deep Synthesis Vault:** The operational and architectural mechanics of the following inherited skills have been structurally compressed into a dedicated reference to guarantee architectural equivalence.
> 👉 **Load `references/applied-statistics.md` for statistical hypothesis testing, precision-safe arithmetic rules, and Boolean algebra simplifications.**

| Skill | Origin | Integration Focus |
|-------|--------|-------------------|
| `statistical-analysis` | all new skills | Statistical methods, hypothesis testing, confidence intervals |
| `safe-calculator` | all new skills | Precision-safe arithmetic, overflow prevention, Decimal handling |
| `propositional-logic` | all new skills | Logic gates, truth tables, Boolean algebra in code |
