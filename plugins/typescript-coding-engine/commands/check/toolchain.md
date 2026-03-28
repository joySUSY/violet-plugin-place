---
description: Check the TypeScript toolchain and quality-gate side of a problem before applying fixes
allowed-tools: Read, Grep, Glob, Bash(git:*)
---

# Check Toolchain

1. Read `rules/tooling/INDEX.md`.
2. Read `references/clean-code/quality-gates-governance.md`, `references/clean-code/toolchain-posture.md`, and `references/clean-code/runtime-boundaries.md`.
3. If the issue shows recurring debt, also read `references/clean-code/typescript-anti-patterns-and-migration-ladders.md`.
4. If test posture is materially involved, also read `references/clean-code/typescript-testing-strategy-and-type-boundaries.md`.
5. Decide whether the issue is primarily about:
   - compiler config
   - lint or format policy
   - test setup
   - CI quality gates
   - runtime-boundary support versus doctrine placement
6. Read the matching reference index next.
7. Return the primary toolchain lane, the main failure mode, the strongest truth surface, one anti-pattern to avoid, and the next exact file to read.

## Output Contract

Your answer should explicitly identify:
1. which tool or gate is the primary owner
2. whether the issue is doctrinal, runtime-surface scoped, or CI-truth scoped
3. what should be checked or changed first
4. what weaker or noisier fix to avoid
