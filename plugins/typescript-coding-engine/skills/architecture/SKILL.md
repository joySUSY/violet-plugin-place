---
name: architecture
description: Use when the task is about TypeScript project structure, layering, modularity, state-pattern selection, shared-core boundaries, or architecture-level trade-offs rather than local typing details.
---

# TypeScript Architecture

## Purpose

This bridge skill routes TypeScript work into the canonical architecture doctrine.

Use it when the task is about:

- project shape and module boundaries
- state blast radius and state-pattern selection
- runtime or platform shape decisions
- public contract shape with architectural consequences
- deciding whether the real issue is structure, runtime validation, interop, or clean-code governance

## Reading Path

1. Read `../../SKILL.md` for the engine boundary.
2. Read `../../references/architecture/INDEX.md`.
3. Read `../../references/architecture/typescript-architecture-decision-trees.md`.
4. If state, validation, or migration pressure is central, also read:
   - `../../references/clean-code/typescript-runtime-validation-decision-matrix.md`
   - `../../references/clean-code/typescript-anti-patterns-and-migration-ladders.md`
5. If interop or contract ownership is central, also read `../../references/interop/INDEX.md`.
6. If state or structure is still unclear, use `../../commands/route/choose-state-pattern.md`.

## Pressure Classification

Classify the architecture pressure first:

- project shape
- state blast radius
- trust-boundary architecture
- public contract shape
- runtime or platform constraints
- interop-driven system shape

Then name the dominant architectural question:

- what should be shared?
- what should be isolated?
- where should runtime truth be re-established?
- what boundary is too wide or too fuzzy?

## Output Contract

Return:

1. architecture class or recommended structure
2. main pressure class
3. strongest reason this structure fits
4. one trade-off to watch
5. the next exact doctrine file or runtime route to use

## Core Rule

Do not let TypeScript architecture collapse into “just frontend folders” or “just build config”.

Architecture is where type truth, runtime truth, and module boundaries become structural decisions.
Use the smallest structure that preserves clarity and leverage—then escalate only when the pressure is real.
