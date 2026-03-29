---
name: data-processing
description: Use when the task involves deterministic extraction, validation, normalization, transformation, migration-oriented data shaping, or structured output contracts inside developer-tool.
---

# Data Processing

## Purpose

This bridge skill routes developer-tool work into the canonical data-processing doctrine.

Use it when the task is about:

- tabular or document extraction
- schema validation and normalization
- ETL or ELT style transformations
- migration-oriented data shaping
- structured output contracts
- deciding whether the real issue is pipeline-stage design or orchestration above it

## Reading Path

1. Read `../../SKILL.md` for the engine boundary.
2. Read `../../data-processing/README.md`.
3. Read `../../data-processing/INVENTORY.md` and `../../data-processing/TRIGGER_SCOPE.md` if maturity or first-owner routing is unclear.
4. Read `../../data-processing/ABSORPTION_MATRIX.md` if donor promotion or boundary placement is part of the problem.
5. Read `../../references/data-processing/INDEX.md`.
6. Read `../../references/data-processing/data-processing.md`.
7. If orchestration or topology becomes central, also read `../../references/data-agent-workflows.md`.

## Pressure Classification

Classify the primary pipeline pressure first:

- detect
- extract
- validate
- normalize
- transform
- emit
- migrate
- orchestrate

## Output Contract

Return:

1. primary data-processing stage or lane
2. why it belongs here first
3. whether orchestration should remain secondary or become primary
4. one anti-pattern to avoid
5. next exact doctrine file or runtime surface to use

## Core Rule

Stage truth comes before orchestration convenience.
This bridge skill exists to keep data-processing work routed through deterministic pipeline law and output contracts before runtime topology or agentic orchestration starts to dominate the task prematurely.
