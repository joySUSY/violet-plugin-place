---
name: tooling-and-quality
description: Use when the task involves tsconfig strictness, linting, formatting, CI quality gates, testing posture, or broader TypeScript code quality governance.
---

# Tooling and Quality

## Purpose

This bridge skill routes TypeScript work into the canonical clean-code and quality-governance lane.

Use it when the task is about:

- `tsconfig` strictness or compiler posture as team policy
- linting or formatting governance
- CI quality gates and reproducibility
- testing posture as governance rather than only local implementation
- anti-pattern debt and staged hardening
- deciding whether the real issue is toolchain, testing, runtime validation, or foundations drift

## Reading Path

1. Read `../../SKILL.md` for the engine boundary.
2. Read `../../references/clean-code/INDEX.md`.
3. Read `../../references/clean-code/quality-gates-governance.md`, `../../references/clean-code/toolchain-posture.md`, and `../../references/clean-code/runtime-boundaries.md`.
4. If testing or CI confidence is central, also read `../../references/clean-code/typescript-testing-strategy-and-type-boundaries.md`.
5. If the problem is migration or recurring debt, also read `../../references/clean-code/typescript-anti-patterns-and-migration-ladders.md`.
6. If the supposed tooling problem is really weak baseline type truth, route back to `../../references/foundations/INDEX.md`.
7. Use `../../rules/tooling/INDEX.md` only after the doctrine lane is clear.

## Pressure Classification

Determine whether the problem is mainly about:

- compiler or `tsconfig` posture
- lint or format governance
- CI or quality gates
- testing infrastructure or proof posture
- runtime-boundary support versus doctrine placement
- migration or debt hardening

## Output Contract

Return:

1. primary tooling or quality lane
2. key weakness or risk
3. strongest truth surface (`tsc`, lint, tests, CI, or doctrine)
4. one anti-pattern to avoid
5. the next exact doctrine file to read

## Core Rule

A weak TypeScript toolchain silently trains weak architecture.
Keep type safety, quality gates, testing posture, and runtime-boundary doctrine aligned instead of letting each surface drift into its own local habits.
