# Backend Development Engine
# Authors: Joysusy & Violet Klaudia 💖

> Data outlives code. The frontend is a reflection of the backend's data structures.
> 数据比代码长寿。前端是后端数据结构的倒影。

## What This Engine Owns

Backend architecture methodology: API contract design, database modeling, concurrency patterns, messaging systems, and service topology. Not language-specific backend code — that belongs to each language engine. This engine owns the *thinking* behind backend systems: how to model data, how to design contracts, how to handle scale.

## Structure

```
backend-dev/
├── .claude-plugin/plugin.json
├── SKILL.md                             # Root navigation + pressure router
├── README.md                            # This file
├── commands/prime/backend-foundations.md # API-first + DB-first primer
├── agents/seren.md                      # Backend Architecture Mind
├── hooks/hooks.json                     # UserPromptSubmit + Stop
└── references/
    ├── database-architecture.md         # Schemas, indexes, migrations
    ├── api-design.md                    # REST/GraphQL contracts
    ├── concurrency-async.md             # Event loops, workers, pools
    ├── database-systems.md              # Advanced DB operations
    └── ...
```

## When This Engine Activates

- Designing a new database schema -> `database-architecture.md`
- Creating REST or GraphQL endpoints -> `api-design.md`
- Performance issues with async operations -> `concurrency-async.md`
- Need a full backend architecture -> activate `seren` agent

## Cross-Engine Boundaries

| Responsibility | Owner |
|---|---|
| API contract design + database modeling | **This engine** |
| Rust backend implementation (Axum, Actix) | `rust-coding-engine` |
| Python backend implementation (FastAPI, Django) | `python-dev-skill` |
| JS/TS backend implementation (Express, Nest) | `js-dev-skill` |
| Infrastructure, CI/CD, deployment | `developer-tool` |
| Architecture decisions and planning | `planning-strategy` |
| Security audit of API design | `reviewer-dev` |
| Error handling and resilience patterns | `error-handling` |
