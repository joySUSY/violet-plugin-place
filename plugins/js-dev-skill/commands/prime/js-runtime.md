---
description: "Prime the JS engine — load runtime patterns, React architecture, and toolchain guidance. Clarifies JS vs TS engine boundary."
allowed-tools: Read, Grep, Glob, Bash(git:*)
---

# Authors: Joysusy & Violet Klaudia 💖

## JS Runtime Primer

> JavaScript is a runtime language first. Types are a layer, not the foundation.
> JavaScript 首先是运行时语言。类型是一层覆盖，不是地基。

### This Engine vs TypeScript Engine

```
js-dev-skill owns:           typescript-coding-engine owns:
  ├── Event loop              ├── Type system posture
  ├── Async/await runtime     ├── Generics & inference
  ├── React component logic   ├── Strict config strategy
  ├── Node.js patterns        ├── Type-level programming
  ├── Bun/Vite/esbuild        ├── Interop boundaries
  └── ES2025+ features        └── Compiler-driven design
```

### By Task Pressure

```
IF React components    → references/react-architecture.md
IF Node.js backend     → references/advanced-node.md
IF tooling (Bun/Vite)  → references/eco-system-tooling.md
IF TS type questions   → ESCALATE to typescript-coding-engine
IF TS+Rust interop     → ESCALATE to typescript-coding-engine/references/interop/
```
