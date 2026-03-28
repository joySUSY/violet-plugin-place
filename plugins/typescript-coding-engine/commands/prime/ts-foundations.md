---
description: Prime TypeScript foundations before implementation or review
allowed-tools: Read, Grep, Glob, Bash(git:*)
---

# Prime TypeScript Foundations

1. Read `SKILL.md` for the engine boundary.
2. Read `references/INDEX.md` and `references/foundations/INDEX.md`.
3. Read `references/foundations/strict-type-system-posture.md`.
4. If the task is an actual type failure, also read `references/foundations/typescript-type-error-diagnosis-and-recovery.md`.
5. If the problem appears boundary-driven, also read `references/clean-code/typescript-runtime-validation-decision-matrix.md`.
6. Classify the current TypeScript problem into one primary class:
   - core typing
   - generics and inference
   - type-level programming
   - runtime validation
   - architecture or tooling
7. State the chosen class, the strongest truth surface for it, and the next exact file to follow.
8. Do not start implementation until the primary TypeScript pressure is explicit.

## Return

Return:

1. primary TypeScript class
2. strongest truth surface (`compiler`, `runtime boundary`, `architecture lane`, or `tooling lane`)
3. one anti-pattern to avoid
4. next exact doctrine file to read
