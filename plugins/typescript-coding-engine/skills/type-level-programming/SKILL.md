---
name: type-level-programming
description: Use when the task involves conditional types, mapped types, template literal types, infer patterns, opaque or brand types, or advanced type-level composition.
---

# Type-Level Programming

## Purpose

This bridge skill routes TypeScript work into the advanced doctrine for information-preserving type-level programming.

Use it when the task is about:

- conditional, mapped, or template-literal types
- branded or opaque typing
- advanced contract transformation
- deciding whether a type-level construction is justified or merely clever
- selecting the right advanced pattern under real pressure

## Reading Path

1. Read `../../SKILL.md` for the engine boundary.
2. Read `../../references/advanced/INDEX.md`.
3. Read `../../references/advanced/type-level-programming-patterns.md`.
4. If narrowing, branding, or overload choice is central, also read `../../references/advanced/typescript-narrowing-branding-and-inference-cookbook.md`.
5. If the problem is really about trust boundaries or runtime data, also read `../../references/clean-code/INDEX.md`.
6. Use `../../rules/types/INDEX.md` only when exact doctrine routing is needed after the lane is clear.

## Pressure Classification

Classify the advanced pressure first:

- contract transformation
- branded or semantic separation
- template-literal protocol shaping
- inference-preserving composition
- complexity-budget question

## Output Contract

Return:

1. primary advanced type-level pattern family
2. why it is justified here
3. what simpler pattern to reject first
4. one anti-pattern to avoid
5. the next exact doctrine file to read

## Core Rule

Advanced TypeScript should clarify architecture and contracts, not hide them behind wizardry.
If the pattern does not preserve meaningful truth, it is probably too expensive.
