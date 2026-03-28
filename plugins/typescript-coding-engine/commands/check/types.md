---
description: Check the type-system side of a TypeScript problem before applying fixes
allowed-tools: Read, Grep, Glob, Bash(git:*)
argument-hint: [error-or-snippet]
---

# Check Types

Check the TypeScript issue represented by `$ARGUMENTS`.

1. Classify the problem into one primary type class:
   - widening or narrowing loss
   - generic constraint issue
   - inference issue
   - mapped, conditional, or template-literal issue
   - overloaded signature issue
   - `any` or unsafe cast issue
2. Read `references/foundations/strict-type-system-posture.md` and `references/foundations/typescript-type-error-diagnosis-and-recovery.md` first.
3. If needed, also read `references/advanced/typescript-narrowing-branding-and-inference-cookbook.md`.
4. If the issue looks boundary-driven, also read `references/clean-code/typescript-runtime-validation-decision-matrix.md`.
5. Return:
   - problem class
   - likely root cause
   - preferred doctrinal fix family
   - whether the issue is compile-time or trust-boundary driven
   - anti-pattern to avoid
   - next exact read path
6. Do not jump straight to assertion spam or `as any`.

## Output Contract

Your answer should explicitly identify:

1. where truth was lost
2. what the smallest honest recovery is
3. whether the problem stays in foundations or escalates into advanced, clean-code, architecture, or interop
