# 🗄️ Database Systems & Operations (数据库系统与运维)

The `backend-dev` engine absorbs 17 dedicated database and backend skills, unified here. Databases outlive application code. 

## 1. Schema Design Patterns & Anti-Patterns (架构设计)

### Architectural Invariants
- **NEVER use auto-increment integers as primary keys for external APIs.** Always use UUIDv7 (time-ordered, index-friendly) or KSUID.
- **NEVER use soft deletes (`deleted_at`) as a boolean query filter.** It corrupts index cardinality. Move deleted rows to an archive table or partition.
- **NEVER store arbitrary JSON in RDBMS unless schema is genuinely fluid.** Extract high-frequency query fields into dedicated columns.

### Pattern: Polymorphic Associations (The Right Way)
Use exclusive belongs-to (Exclusive Arc) or a join table, never a `(taggable_id, taggable_type)` anti-pattern.

```sql
-- Join table approach (Strong referential integrity)
CREATE TABLE comment_users (
    comment_id uuid REFERENCES comments(id),
    user_id uuid REFERENCES users(id),
    PRIMARY KEY (comment_id, user_id)
);
```

## 2. Advanced Relational DB Operations (PostgreSQL Tuning) (高级关系型数据库运维)

- **Write-Ahead Log (WAL):** Tune `wal_level` to `logical` for Change Data Capture (CDC).
- **Partitioning:** Partition massive tables by time (e.g., `PARTITION BY RANGE (created_at)`). Do not partition until table exceeds 50GB.
- **Vacuum:** Aggressive `autovacuum` tuning is required for write-heavy workloads to prevent bloat. `autovacuum_vacuum_scale_factor = 0.05`.

## 3. Rust-Specific Database Tooling (Rust专属数据库工具)

### SQLx (Compile-time verified queries)
```rust
// SQLx enforces query validity at compile time against the active DB
let user = sqlx::query_as!(
    User,
    "SELECT id, email FROM users WHERE id = $1",
    user_id
).fetch_one(&pool).await?;
```

### Turso / libSQL (Edge SQLite)
- **Architecture:** SQLite fork optimized for edge distribution, replication, and vector search.
- **Use Case:** Multi-tenant edge applications where each tenant gets a dedicated SQLite file replicated globally via Turso.

### Rusqlite (N-Tier SQLite Bindings)
High-performance synchronous bindings. Wrap in `tokio::task::spawn_blocking` when used in async Rust servers.

## 4. Vector & Specialized Databases (向量数据库与特种数据库)

- **Vector Engineering (pgvector, Qdrant):** Normalize vectors before insertion for fast `Inner Product` distance, which is significantly faster than `Cosine Distance`.
- **fontstock-db:** Specialized entity-component model mapping typographic dimensions (x-height, ascender ratios) to vector representations.

## 5. Capacity Planning & Migrations (容量规划与迁移)

### Migration Strategies
- **Big Bang:** Only for offline/local scripts.
- **Blue-Green:** Use for major version upgrades.
- **Strangler:** Default for microservice extraction.
- **Trickle:** Dual-write to new table, backfill old data, switch read path, drop old table. Zero downtime.

### Substreams (Blockchain Data)
- Extract blockchain state (Solidity contracts) using Rust-based Substreams.
- Pipe massive on-chain data changes directly into PostgreSQL sinks via logical replication patterns.

---
*Absorbed knowledge from: database-design-patterns, database-anti-patterns, relational-databases, turso-db, sqlx, rusqlite, sql-pro-skill, vector-database-engineer, fontstock-db, substreams-dev, analyzing-capacity-planning.*
