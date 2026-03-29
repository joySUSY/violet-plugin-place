# Build and Deploy Runtime Boundaries

## Purpose

Clarify what `developer-tool` should own directly in build/deploy runtime surfaces and what should remain doctrine-only.

## Source Provenance

- **Primary source:** current `developer-tool` build-and-deploy doctrine subtree
- **Derived from:** runtime-boundary and shell-vs-doctrine separation work for build/deploy surfaces
- **Upstream URL:** not applicable as a synthesized local doctrine note
- **Freshness status:** canonical local boundary doctrine aligned to the current developer-tool engine

---


## Runtime-Shell Worthy

The shell may own:
- explicit audit commands for pipeline posture
- route commands that choose build or release surfaces
- lightweight lifecycle reminders about reproducibility and safety

## Doctrine-Only

The shell should not try to encode every CI/CD pattern into hook logic.
Most build/deploy knowledge should remain in references and doctrine files.

## Rule

When in doubt, prefer documentation and explicit command surfaces over automatic mutation.

## Why

Build/deploy systems are high-blast-radius domains.
A conservative runtime shell is better than an over-automated one.
