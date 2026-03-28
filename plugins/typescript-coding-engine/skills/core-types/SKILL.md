---
name: core-types
description: Use when the task needs TypeScript foundations: strict typing, widening vs narrowing, baseline type-system behavior, or first-line mental models.
---

# Core Types

## Purpose

This bridge skill routes TypeScript work into the canonical foundations lane.

Use it when the task is about:

- strictness posture
- baseline inference and narrowing
- widening loss
- first-line type correctness
- deciding whether the problem is foundational before escalating into advanced or runtime-boundary doctrine

## Reading Path

1. Read `../../SKILL.md` for the engine boundary.
2. Read `../../references/foundations/INDEX.md`.
3. Read `../../references/foundations/strict-type-system-posture.md`.
4. If the problem is a concrete type failure, also read `../../references/foundations/typescript-type-error-diagnosis-and-recovery.md`.
5. If the issue looks trust-boundary driven, also read `../../references/clean-code/typescript-runtime-validation-decision-matrix.md`.
6. If the issue clearly exceeds baseline strictness and inference, route upward into `../../references/advanced/INDEX.md`.

## Pressure Classification

Classify the problem first:

- strictness or compiler posture
- widening or narrowing baseline
- inference loss at ordinary API boundaries
- foundational type-error diagnosis
- trust-boundary leak masquerading as a type issue

## Output Contract

Return:

1. primary foundational class
2. why it belongs in foundations first
3. whether the issue should stay in foundations or escalate into advanced or clean-code
4. one anti-pattern to avoid
5. the next exact doctrine file to read

## Core Rule

Prefer foundational type reasoning over ad-hoc assertions.
If the problem can be explained by weak baseline truth, fix that before reaching for advanced machinery.
