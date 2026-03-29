---
name: tool-ecosystem
description: Use when the task involves plugin-shell law, component-model selection, command/hook/MCP/runtime surface boundaries, or cross-tool integration inside developer-tool.
---

# Tool Ecosystem

## Purpose

This bridge skill routes developer-tool work into the canonical tool-ecosystem doctrine.

Use it when the task is about:

- plugin shell design
- component-model or surface selection
- command, hook, MCP, or rule ownership
- plugin-local settings or state
- validation and audit posture for runtime shells

## Reading Path

1. Read `../../SKILL.md` for the engine boundary.
2. Read `../../tool-ecosystem/README.md`.
3. Read `../../tool-ecosystem/INVENTORY.md` and `../../tool-ecosystem/TRIGGER_SCOPE.md` if maturity or first-owner routing is unclear.
4. Read `../../tool-ecosystem/ABSORPTION_MATRIX.md` if promotion, staging, or shell-surface placement is part of the problem.
5. Read `../../references/tool-ecosystem/INDEX.md`.
6. Read `../../references/tool-ecosystem/core-shell-patterns.md` and `../../references/tool-ecosystem/component-model.md`.
7. If runtime shell boundaries are central, also read `../../references/plugin-runtime-overview.md`.

## Pressure Classification

Classify the problem first:

- shell boundary law
- component selection
- command or workflow surface
- hook or lifecycle posture
- MCP leverage
- plugin-local state or validation

## Output Contract

Return:

1. primary tool-ecosystem lane
2. why it belongs here first
3. smallest justified surface
4. one anti-pattern to avoid
5. next exact doctrine file or runtime surface to use

## Core Rule

Choose the smallest shell surface that preserves the capability correctly.
The tool-ecosystem lane exists to prevent plugin-grade design from collapsing into component familiarity or donor-shaped runtime sprawl.
