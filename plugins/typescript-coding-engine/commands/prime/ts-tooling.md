---
description: Prime TypeScript tooling and quality surfaces before changing toolchain or standards
allowed-tools: Read, Grep, Glob, Bash(git:*)
---

# Prime TypeScript Tooling

1. Read `references/clean-code/INDEX.md` and `rules/tooling/INDEX.md`.
2. Read `references/clean-code/quality-gates-governance.md`, `references/clean-code/toolchain-posture.md`, and `references/clean-code/runtime-boundaries.md`.
3. If testing or CI confidence is central, also read `references/clean-code/typescript-testing-strategy-and-type-boundaries.md`.
4. If debt removal or migration posture is central, also read `references/clean-code/typescript-anti-patterns-and-migration-ladders.md`.
5. Determine whether the task is primarily about:
   - tsconfig strictness
   - linting or formatting
   - CI or quality gates
   - testing infrastructure
   - runtime-boundary support versus doctrine placement
6. Route the task into one primary tooling lane.
7. State the lane, the key risk, the strongest truth surface, and the next exact file to read.

## Return

Return:

1. primary tooling lane
2. main failure mode or risk
3. strongest truth surface (`tsc`, lint, tests, CI, or doctrine)
4. one anti-pattern to avoid
5. next exact doctrine file to read
