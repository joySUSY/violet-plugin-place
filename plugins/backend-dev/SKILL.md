---
name: backend-dev
description: |
  Master engineer's guide to system backend architecture, API design, database schemas, and concurrency. Use when building or refactoring REST/GraphQL APIs, designing Postgres/Prisma schemas, writing async event-loop logic, or implementing auth/security middlewares. Enforces high-performance, stateless architectures with strict data invariants.
---

# Backend Development & Infrastructure | 后端开发与基础设施

Comprehensive standards for scalable, high-performance, and resilient backend systems. | 构建可扩展、高性能且有韧性的后端系统的全面标准。

## 🔬 Research & Modernity (2026): Agentic Orchestration | 研究与现代性 (2026)：智能编排

- **Agentic API Orchestration**: Using 2026 supervisor patterns to automatically synthesize and manage complex microservice mesh architectures. | **智能体 API 编排**: 使用 2026 主管模式自动合成并管理复杂的微服务网格架构。
- **Real-Time Schema Synthesis**: Automated extraction and alignment of database schemas across polyglot backend layers via 2026 `schema-hub` engines. | **实时架构合成**: 通过 2026 `schema-hub` 引擎自动提取并对齐多语言后端层之间的数据库架构。
- **Zero-Latency Infra Bridging**: Leveraging hardware-native proxies to eliminate network-layer overhead in high-throughput cloud environments. | **零延迟基础设施桥接**: 利用硬件原生代理消除高吞吐量云环境中的网络层开销。

### 🔗 Cross-Engine Navigation — 跨引擎导航

| Engine | Relation | Reference |
|--------|----------|-----------|
| `rust-coding-engine` | Performance Infrastructure | [`rust-coding-engine/SKILL.md`](../rust-coding-engine/SKILL.md) |
| `error-handling` | System Resilience & Recovery | [`error-handling/SKILL.md`](../error-handling/SKILL.md) |
| `dev-designer-utility` | Schema Visuals & Icons | [`dev-designer-utility/SKILL.md`](../dev-designer-utility/SKILL.md) |
| `python-dev-skill` | API Implementation (FastAPI) | [`python-dev-skill/SKILL.md`](../python-dev-skill/SKILL.md) |
| `go-coding-engine` | Go Backend Services | [`go-coding-engine/SKILL.md`](../go-coding-engine/SKILL.md) |
| `typescript-coding-engine` | TS API Types | [`typescript-coding-engine/SKILL.md`](../typescript-coding-engine/SKILL.md) |

---

# ⚙️ Backend Developer Engine: The Humanizer Approach

> "The frontend is a reflection of the backend's data structures. Get the schema wrong, and the entire stack suffers."

This engine replaces 16 disparate backend and database tutorials with a single, aggressive, high-signal architecture manual. It focuses heavily on Data Modeling (Postgres/Prisma), API Contract Design, and Concurrency.

## 🧭 Navigation Matrix

1. **[Database Architecture (Postgres/Prisma)](references/database-architecture.md)**
   - Designing normalized schemas.
   - Indexing strategies (B-Tree vs Hash vs GIN).
   - Managing connection pools and transaction boundaries.
2. **[API Contract Design](references/api-design.md)**
   - RESTful resource modeling vs GraphQL.
   - Idempotency keys & Pagination standards.
   - Authentication (JWT vs Sessions) and RBAC.
3. **[Concurrency & Async Patterns](references/concurrency-async.md)**
   - Event loops, background workers (Redis/Celery/Bull).
   - Connection pool exhaustion & Race condition prevention.

## 🎯 When to Trigger This Engine

- 🗄️ **"Design the database schema for this feature":** Load `database-architecture.md` to ensure constraints and indexes are established *before* ORM generation.
- 🛣️ **"Create the routes for the User module":** Load `api-design.md` to enforce standard REST verbs, HTTP status codes, and security.
- ⚡ **"This data processing job is timing out":** Load `concurrency-async.md` to refactor synchronous blockers into async background queues.

## 🧠 Core Operating Directives

- **Database First:** Do not write a single web route until the ERD (Entity Relationship Diagram) is sound and normalized. Data outlives code.
- **Fail Closed:** By default, all endpoints deny access. Authentication must be verified at the gateway/middleware layer, not deep inside the business logic.
- **Idempotency is Mandatory:** Any `POST`, `PUT`, or `DELETE` mutation must be safe to retry on network failure. 
- **Fat Models, Thin Controllers:** Controllers should only parse HTTP transport layers, pass to a Domain Service, and format the HTTP response. Keep business logic out of the router.

---

## 📦 Phase 2 Absorbed Skills

> **Deep Synthesis Vault:** The operational and architectural mechanics of the following inherited skills have been structurally compressed into a dedicated reference to guarantee architectural equivalence.
> 👉 **Load `references/database-systems.md` for advanced schema design, PostgreSQL tuning, vector engineering, and data migration patterns.**

| Skill | Origin | Integration Focus |
|-------|--------|-------------------|
| `database-design-patterns` | all new skills | Schema design patterns, normalization strategies |
| `database-anti-patterns` | all new skills | What NOT to do in database design |
| `relational-databases` | all new skills | 20 RDBMS deep operational guide (PostgreSQL tuning, WAL, partitioning) |
| `implementing-database-caching` | all new skills | Caching layer architecture (Redis, Memcached) |
| `data-migration` | all new skills | Schema migration strategies |
| `migration-patterns` | all new skills | Migration orchestration (Blue-Green, Strangler, Trickle) |
| `turso-db` | all new skills | Turso/libSQL — in-process SQLite-compatible engine in Rust |
| `sqlx` | all new skills | Rust async SQL toolkit (compile-time checked queries) — *cross-ref: `rust-coding-engine`* |
| `rusqlite` | all new skills | SQLite Rust bindings — *cross-ref: `rust-coding-engine`* |
| `database-administrator-skill` | New for developer tool | DBA expertise, PostgreSQL/MySQL/MongoDB — *cross-ref: `developer-tool`* |
| `sql-pro-skill` | New for developer tool | SQL development, query optimization, performance tuning |
| `vector-database-engineer` | all new skills | Vector DB (Pinecone, Weaviate, Qdrant, pgvector) for RAG |
| `fontstock-db` | all new skills | Specialized font database |
| `everyrow-sdk` | all new skills | Data SDK patterns |
| `analyzing-capacity-planning` | all new skills | Capacity planning for backend systems |
| `substreams-dev` | all new skills | Blockchain data processing backends |
| `solidity-function-audit-team` | all new skills | Blockchain smart contract audit — *cross-ref: `reviewer-dev`* |
