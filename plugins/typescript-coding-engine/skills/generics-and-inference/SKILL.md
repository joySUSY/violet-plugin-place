---
name: generics-and-inference
description: Use when the task is fundamentally about generics, inference, narrowing precision, overload selection, or preserving type information through APIs.
---

# Generics and Inference

## Purpose

This bridge skill routes TypeScript work into the advanced lane where inference quality and generic relationships become the main pressure.

Use it when the task is about:

- generic API design
- inference collapse
- overload shape selection
- preserving literal or relational information through helpers
- deciding whether a problem is truly advanced or still just weak foundations

## Reading Path

1. Read `../../SKILL.md` for the engine boundary.
2. Read `../../references/advanced/INDEX.md`.
3. Read `../../references/advanced/type-level-programming-patterns.md`.
4. If the task is practical and API-facing, also read `../../references/advanced/typescript-narrowing-branding-and-inference-cookbook.md`.
5. If the issue still smells like ordinary widening, narrowing, or baseline type truth, route back to `../../references/foundations/INDEX.md`.
6. Use `../../rules/types/INDEX.md` only after the doctrinal lane is clear.

## Pressure Classification

Classify the issue as one of:

- generic constraint pressure
- inference preservation pressure
- overload or call-shape precision
- widening loss that only appears advanced
- advanced API surface design

## Output Contract

Return:

1. primary advanced pressure class
2. why it belongs in generics/inference rather than foundations
3. the smallest honest fix family
4. one anti-pattern to avoid
5. the next exact doctrine file to read

## Core Rule

Do not treat inference failures as excuses for `any` or blind assertions.
Deep inference is a design property; if it keeps failing, name the lost information first.
