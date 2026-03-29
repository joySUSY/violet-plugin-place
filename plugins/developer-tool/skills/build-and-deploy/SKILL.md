---
name: build-and-deploy
description: Use when the task involves build reproducibility, CI/CD, release governance, deployment strategy, containerization, or supply-chain trust inside developer-tool.
---

# Build and Deploy

## Purpose

This bridge skill routes developer-tool work into the canonical build-and-deploy doctrine.

Use it when the task is about:

- build or CI posture
- release and versioning governance
- deployment orchestration and rollback posture
- supply-chain and dependency trust
- runtime-shell boundaries for delivery workflows

## Reading Path

1. Read `../../SKILL.md` for the engine boundary.
2. Read `../../build-and-deploy/README.md`.
3. Read `../../build-and-deploy/INVENTORY.md` and `../../build-and-deploy/TRIGGER_SCOPE.md` if maturity or first-owner routing is unclear.
4. Read `../../build-and-deploy/ABSORPTION_MATRIX.md` if promotion, support-pack placement, or governance scope is part of the problem.
5. Read `../../references/build-and-deploy/INDEX.md`.
6. Read `../../references/build-and-deploy/build-deploy.md`.
7. Then branch into `release-governance.md`, `deployment-orchestration-patterns.md`, `supply-chain-governance.md`, or `runtime-boundaries.md` as needed.

## Pressure Classification

Classify the delivery pressure first:

- build and CI confidence
- release governance
- rollout and blast radius
- supply-chain trust
- runtime-boundary placement

## Output Contract

Return:

1. primary build-and-deploy lane
2. why it belongs here first
3. strongest truth surface (doctrine, CI, release policy, or deployment review)
4. one anti-pattern to avoid
5. next exact doctrine file or runtime surface to use

## Core Rule

Delivery truth must be explicit before automation becomes powerful.
This bridge skill exists to keep build, release, deploy, and supply-chain questions routed through doctrine and governance before they harden into brittle scripts or unsafe shell flows.
