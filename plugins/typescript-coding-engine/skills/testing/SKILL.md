---
name: testing
description: Use when the task involves TypeScript testing strategy, type tests, runtime tests, environment/framework test boundaries, CI confidence, or deciding what kind of proof the system actually needs.
---

# TypeScript Testing

## Purpose

This bridge skill routes TypeScript work into the canonical testing and proof doctrine.

Use it when the task is about:

- deciding what a test should prove
- type-level versus runtime test boundaries
- framework or environment-specific testing
- boundary tests, contract tests, or generated-artifact tests
- CI test posture and merge confidence
- determining whether the real issue is testing, validation, tooling, or architecture

## Reading Path

1. Read `../../SKILL.md` for the engine boundary.
2. Read `../../references/clean-code/INDEX.md`.
3. Read `../../references/clean-code/typescript-testing-strategy-and-type-boundaries.md`.
4. Read `../../references/clean-code/quality-gates-governance.md`.
5. If runtime trust boundaries are involved, also read `../../references/clean-code/typescript-runtime-validation-decision-matrix.md`.
6. If architecture or interop boundaries dominate, route outward to `../../references/architecture/INDEX.md` or `../../references/interop/INDEX.md`.
7. Use `../../rules/testing/INDEX.md` for exact rule routing only after the doctrine lane is clear.

## Pressure Classification

Classify the testing pressure first:

- type-level contract confidence
- runtime unit or integration confidence
- boundary or parsing confidence
- framework or environment confidence
- generated or shared contract drift confidence
- CI gate or release confidence

Then name what is actually missing:

- proof
- realism
- fixture truth
- environment fidelity
- gate discipline

## Output Contract

Return:

1. primary testing surface
2. what it should prove
3. what weaker or misleading test surface to avoid
4. whether the issue is really validation, tooling, or architecture driven
5. the next exact doctrine file or runtime surface to use

## Core Rule

Type-safe systems need test strategy that respects both compile-time and runtime boundaries.

Do not collapse all testing into one vague suite.
Choose the smallest honest confidence surface that proves the truth you actually need.
