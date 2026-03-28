# 🔍 The 6-Phase Debugging Protocol 

> **Axiom:** Guesswork is the enemy of engineering. Evidence is the only currency.

Whenever you encounter a bug or a failing test, execute this protocol sequentially. **No shortcuts.**

## Phase 1: Evidence Collection
**DO NOT** modify code yet. Run tests with maximum verbosity.
- *Command:* `uv run pytest <test.py> -vv` or `npm test -- --verbose`
- Capture the *exact* error message, type, and full stack trace.

## Phase 2: Root Cause Analysis (ACH)
Use the **Analysis of Competing Hypotheses**. It is one of:
1. **Test Setup:** Bad mock, wrong fixture scope.
2. **Business Logic:** Off-by-one, bad algorithm. 
3. **Integration:** System missing env var, DB unreachable.

## Phase 3: High-Precision Locating
Pin down the coordinates: `File : Line : Function`.
- Is this a pattern? `grep -r "bad_pattern" src/`
- Identify **ALL** occurrences.

## Phase 4: Systematic Fix
- If it's a test setup issue, correct the mock. 
- Fix **ALL** instances simultaneously using `MultiEdit`. Do not patch just the first one you see.

## Phase 5: The Validation Loop
- Re-run the exact failing test. Does it pass?
- Run the **entire** test suite to guarantee zero regressions.

## Phase 6: Quality Gates
Did you leave debug prints? Is the code compliant with linting?
- Run `pyright`, `eslint`, `cargo clippy`, etc.

## ⚠️ Anti-Patterns (Immediate Failure)
- ❌ Assuming the error is unrelated without tracing it.
- ❌ Fixing only the first occurrence.
- ❌ Running `sed` blindly instead of understanding the AST/logic.
- ❌ Swallowing an error with a blank `catch (e) {}` to silence tests.
