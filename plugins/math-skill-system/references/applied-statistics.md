# 📊 Applied Statistics & Formal Logic (应用统计学与形式逻辑)

The `math-skill-system` engine absorbs 3 advanced analytical disciplines. Math in programming must transcend floating-point errors to achieve formal correctness.

## 1. Statistical Analysis & Confidence Intervals (统计分析)

- **Hypothesis Testing (A/B Tests):** Do not declare a winner based on raw averages. Calculate the P-value. If $P > 0.05$, the outcome is statistically insignificant. A 2% gain in revenue might just be sampling noise.
- **Outlier Mitigation:** In system benchmarking, remove the top and bottom 5% of samples (truncation) or use Median (P50) rather than Mean to represent central tendency.

## 2. Precision-Safe Arithmetic (高精度安全算术)

- **Overflow Prevention:** Rust catches integer overflow in debug mode but wraps in release mode. For financial logic, explicitly use `.checked_add()` or `.saturating_add()`.
- **The Decimal Mandate:** Floating-point numbers (`f32`, `f64`) suffer from base-2 representation errors ($0.1 + 0.2 \neq 0.3$). **NEVER** use them for currency. Use libraries mapped to IEEE 754 decimal types (`rust_decimal` or Python's `decimal.Decimal`).

## 3. Propositional Logic & Boolean Algebra (命题逻辑与布尔代数)

- **De Morgan's Laws:** Simplify complex conditional gates. 
  - `!(A && B) == !A || !B`
  - `!(A || B) == !A && !B`
- **Truth Tables:** Before writing a 6-branch `if/else if` monolith, draw a Truth Table. Often, 3 variables result in 8 states, and Karnaugh maps can reduce the logic into a single bitwise operation or deterministic early returns.

---
*Absorbed knowledge from: statistical-analysis, safe-calculator, propositional-logic.*
