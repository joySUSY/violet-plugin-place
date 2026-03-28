# 🔬 Symbolic Computation (SymPy)

Writing code to approximate answers with floating-point math often introduces cumulative rounding errors. Symbolic computation tools (like Python's `sympy`) calculate exact analytical answers before evaluating them to floats.

## 1. When to Use SymPy (何时使用符号计算)

Whenever a problem can be expressed as a clean mathematical equation, offload it to SymPy. Do not write iterative loops to guess the bounds of a function.

- Use for: Finding intersections of curves, optimizing bounds (min/max), calculating limits for edge cases, or integrating/differentiating physical properties (velocity/acceleration).

```python
import sympy as sp

x = sp.Symbol('x')
y = sp.Symbol('y')

# The Problem: Where do these two curves intersect?
eq1 = sp.Eq(y, x**2 - 4)
eq2 = sp.Eq(y, 2*x + 4)

# The Solution: Exact analytical calculation, not guessing.
intersections = sp.solve((eq1, eq2), (x, y))
# Returns: [(-2, 0), (4, 12)]
```

## 2. Limits & Edge Cases (处理边界情况)

When designing a function that approaches zero or infinity, an engineer might hardcode a fallback `if (n === 0) return 0.0001`. A mathematician evaluates the limit.

```python
import sympy as sp
n = sp.Symbol('n')

# Problem: What happens to sin(x)/x when x approaches 0?
# A computer using standard floats would throw a DivisionByZero error.
expression = sp.sin(n) / n
limit_at_zero = sp.limit(expression, n, 0)
# Returns: 1 (The exact mathematical truth).
```

## 3. The Danger of Floating Point Math (浮点数毒药)

Standard floating-point numbers (`IEEE 754`) cannot accurately represent decimals like `0.1`. If you loop `amount += 0.1` ten times, the result will be `0.9999999999999999`.

- **Rules for Currency:**
  - Never use `float`.
  - Store currency in the database as integers (cents): `$10.50` -> `1050`. Multiply/divide by 100 purely at the display edge.
- **Rules for High-Precision Scientific Math:**
  - Use `sympy.Rational` or Python's `decimal` module to perform arbitrary-precision arithmetic.
  
  ```python
  from decimal import Decimal
  
  # Bad
  print(0.1 + 0.2) # 0.30000000000000004
  
  # Elite
  print(Decimal('0.1') + Decimal('0.2')) # 0.3
  ```
