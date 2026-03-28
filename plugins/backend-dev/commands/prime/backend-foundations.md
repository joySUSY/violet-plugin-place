---
description: "Prime the backend-dev engine — load API-first and database-first architecture principles before designing any service."
allowed-tools: Read, Grep, Glob, Bash(git:*)
---

# Authors: Joysusy & Violet Klaudia 💖

## Backend Foundations Primer

> Data outlives code. Get the schema right, and the API writes itself.
> 数据的寿命比代码长。把模型做对了，API 自然水到渠成。

### Before You Design Anything

1. **Database First**: Define entities, relationships, and constraints before routes
   - `${CLAUDE_PLUGIN_ROOT}/references/database-architecture.md`
2. **API Contract**: Lock the interface before touching implementation
   - `${CLAUDE_PLUGIN_ROOT}/references/api-design.md`
3. **Concurrency Plan**: Identify blocking operations and async boundaries
   - `${CLAUDE_PLUGIN_ROOT}/references/concurrency-async.md`

### Classify Your Backend Task

```
IF schema design     -> ERD first, normalize to 3NF minimum, index strategy before ORM
IF REST endpoint     -> Resource modeling, HTTP verbs, status codes, idempotency keys
IF GraphQL schema    -> Type-first, resolver boundaries, N+1 prevention
IF async pipeline    -> Identify blocking calls, choose queue strategy, define retry policy
IF microservice      -> Bounded context, API gateway, service mesh boundaries
IF data migration    -> Blue-green or trickle, backward-compatible schema changes only
```

### Architecture Invariants

- **Fail Closed**: All endpoints deny by default. Auth at the gateway, never deep in business logic.
- **Fat Models, Thin Controllers**: Controllers parse transport. Domain services own logic. No business rules in route handlers.
- **Idempotency**: Every mutating endpoint must be safe to retry on network failure. Use idempotency keys for POST operations.
- **Connection Pools**: Always configure pool size, timeout, and retry. Never rely on defaults in production.
- **Validate Twice**: Frontend validation is a UX hint. Backend validates every byte independently.
