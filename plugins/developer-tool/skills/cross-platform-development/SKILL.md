---
name: cross-platform-development
description: Use when the task involves platform support tiers, shared-core versus platform-shell boundaries, runtime differences, or compatibility claims inside developer-tool.
---

# Cross-Platform Development

## Purpose

This bridge skill routes developer-tool work into the canonical cross-platform doctrine.

Use it when the task is about:

- support tiers and portability targets
- shared-core versus platform-shell architecture
- runtime, path, or capability differences across platforms
- cross-platform build, test, and release posture
- deciding whether a platform question is really shell, build, or language-specific

## Reading Path

1. Read `../../SKILL.md` for the engine boundary.
2. Read `../../cross-platform-development/README.md`.
3. Read `../../cross-platform-development/INVENTORY.md` and `../../cross-platform-development/TRIGGER_SCOPE.md` if maturity or first-owner routing is unclear.
4. Read `../../cross-platform-development/ABSORPTION_MATRIX.md` if donor promotion or support-pack placement is part of the problem.
5. Read `../../references/cross-platform-development/INDEX.md`.
6. Read `../../references/cross-platform-development/cross-platform.md`.
7. Route outward to shell, build-and-deploy, or language-specialists if the real bottleneck is owned there.

## Pressure Classification

Classify the platform pressure first:

- support-tier definition
- shared-core boundary
- runtime or path behavior
- packaging and matrix truth
- language-specific implementation detail

## Output Contract

Return:

1. primary cross-platform lane
2. why it belongs here first
3. what should be shared versus isolated
4. one anti-pattern to avoid
5. next exact doctrine file or runtime surface to use

## Core Rule

Portability claims should be made through support-tier and boundary truth, not by framework enthusiasm.
This bridge skill exists to classify cross-platform work before implementation advice starts flattening platform reality.
