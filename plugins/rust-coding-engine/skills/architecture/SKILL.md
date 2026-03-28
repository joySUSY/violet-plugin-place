---
name: architecture
description: Use when the task is about Rust project shape, workspace design, Axum or Tauri structure, clean/hexagonal patterns, modularity, or large-repo case-study reasoning.
---

# Rust Architecture

## Steps

1. Read `../../references/architecture/INDEX.md`.
2. Read `../../references/architecture/rust-architecture-decision-trees.md` before proposing a shape.
3. Read `../../references/architecture/rust-architecture-and-scaffolding.md` for concrete structure patterns.
4. If the task is web/service-heavy, read `../../references/architecture/rust-axum-service-architecture-and-thin-adapters.md`.
5. If the task is repo-scale or case-study driven, read `../../references/repo-cases/INDEX.md`.
6. Classify the target system as script, mini-app, service, or system-scale before proposing crate/module/workspace structure.

## Core Rule

Do not over-architect small Rust projects, and do not under-structure large Rust systems.
