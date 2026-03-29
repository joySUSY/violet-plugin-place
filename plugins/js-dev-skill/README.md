# JavaScript Development Engine
# Authors: Joysusy & Violet Klaudia 💖

> JavaScript is a runtime language first. Understand the event loop before touching a framework.
> JavaScript 首先是运行时语言。先理解事件循环，再碰框架。

## What This Engine Owns

JS runtime patterns, async/event-loop mastery, React component architecture, Node.js/Bun design, and modern toolchain (Vite, esbuild, Bun).

**Boundary with TypeScript engine**: This engine owns JS **runtime** behavior. TypeScript's **type system**, compiler posture, and type-level programming belong to `typescript-coding-engine`.

## Structure

```
js-dev-skill/
├── .claude-plugin/plugin.json
├── SKILL.md                           # Root navigation
├── README.md                          # This file
├── commands/prime/js-runtime.md       # Runtime primer + TS boundary
├── agents/fika.md                     # JS Runtime Mind
├── references/
│   ├── react-architecture.md          # React patterns, hooks, server components
│   ├── advanced-node.md               # Node.js design patterns
│   ├── eco-system-tooling.md          # Bun, Vite, esbuild, bundlers
│   └── typescript-patterns.md         # JS-side TS usage (not type-level)
└── v3-expansion/                      # Staged sub-skills (JSONLogic etc.)
```

## Cross-Engine Boundaries

| Responsibility | Owner |
|---|---|
| JS runtime + event loop + async | **This engine** |
| React component patterns | **This engine** |
| TypeScript type system + generics | `typescript-coding-engine` |
| TS7/Corsa (Go compiler) | `typescript-coding-engine` + `go-coding-engine` |
| Frontend UI/UX design | `frontend-dev` |
| Node.js native addons (N-API) | `rust-coding-engine` (Rust side) |
| Testing methodology | `tdd-system` |
