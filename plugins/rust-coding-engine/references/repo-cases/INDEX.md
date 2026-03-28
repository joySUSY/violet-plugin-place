# Rust Repo Case Studies Index

## Purpose

Canonical entrypoint for repo-scale donor case studies that have been distilled into reusable Rust architecture doctrine.

Use this category when the task is about:
- learning from large real Rust repositories
- repo-scale architectural boundaries
- workspace decomposition at real scale
- extracting donor lessons without mirroring donor trees into runtime

## Source Provenance

- **Primary source:** large Rust donor repositories present in the workspace and their extracted canonical case-study docs
- **Derived from:** repo-family analysis and subsequent case-study doctrine passes
- **Upstream URL:** not applicable as a synthesized local navigation index
- **Freshness status:** canonical local index aligned to the current repo-cases subtree; individual case studies may still record local-snapshot freshness separately

---

## High-Value Repo Donor Families

- `nova-main`
- `codeyourpcb-main`
- `clean-architecture-with-rust-master`
- `rust-agentic-skills-main`
- `rust-self-learning-memory-main` (secondary, memory-first elsewhere)

## Canonical Case-Study Extractions

| File | Why it matters |
|---|---|
| `nova-vm-architecture.md` | Cross-domain runtime-engine doctrine: data-oriented design, lifetime branding, validity scopes, handle design |
| `codeyourpcb-workspace-patterns.md` | Workspace-scale Rust system with ECS/world truth, Rust–TS/WASM bridge, Tauri/web/desktop coexistence |
| `clean-hexagonal-workspace-rust.md` | Dependency rule, thin adapters, architectural circles, clean/hexagonal boundary discipline |

---

## Intended Role

These repos provide:
- real architectural boundaries
- workspace and crate decomposition
- runtime/tooling structure
- examples of actual scale and complexity

They should be distilled into:
- `references/architecture/*`
- `modules/*`
- shell commands/agents/rules only where justified

Never mirror their trees directly into runtime.

---

## Reading Order

1. `case-study-governance.md`
2. select the matching case-study extraction
3. route the extracted lesson back into the matching canonical doctrine lane (architecture / interop / production / quality)

---

## Cleanup-Safe Rule

This index names donor families, not cleanup-sensitive storage paths.
Local reservoir locations belong in provenance/governance notes, not in the primary reading path.
