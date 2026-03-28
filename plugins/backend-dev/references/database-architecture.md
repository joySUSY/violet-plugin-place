# 🗄️ Database Architecture (Postgres & ORMs)

The most expensive mistakes in software engineering happen here. A bad API can be rewritten in a day; migrating a bad database schema with 1TB of production data takes weeks.

## 1. Schema Design (Normalization vs Denormalization)

- **Default to 3NF (Third Normal Form):** Every non-key column must depend *only* on the primary key. Do not duplicate user emails in the `Orders` table. Use Joins.
- **When to Denormalize:** Only when read-performance testing proves 3NF is too slow. (e.g., Caching a `comment_count` integer on a `Post` table instead of doing `COUNT()` on 1 million rows every request).

## 2. The Law of Indexes

A missing index on a foreign key will take down your database at scale.
- **Primary Keys:** Auto-indexed (`id`). Use `UUIDv4` or `CUID`, not auto-incrementing integers (which leak table size to attackers).
- **Foreign Keys:** EVERY foreign key must have an explicit B-Tree index. `user_id` on `Orders`? Index it. 
- **Search:** Use `GIN` (Generalized Inverted Index) for full-text search or JSONB querying in Postgres.

## 3. Designing with Prisma (or equivalent ORMs)

ORMs are powerful but dangerous if used naively. 

- **The N+1 Problem:** Never loop over an array and execute a database query inside the loop. 
  - *Bad:* `users.map(u => prisma.post.findMany({ where: { userId: u.id } }))`
  - *Good:* `prisma.post.findMany({ where: { userId: { in: userIds } } })`
- **Soft Deletes vs Hard Deletes:** Use soft deletes (`deletedAt DateTime?`) for entities with financial or legal compliance needs. Hard delete temporary data (sessions, tokens).

## 4. Transaction Boundaries

Database transitions must be atomic (ACID). If you update a User's balance and insert a new Order, they must happen in the exact same transaction. 

```typescript
// If `createOrder` fails, `updateBalance` is automatically rolled back. 
await prisma.$transaction([
  prisma.user.update({ data: { balance: newBalance } }),
  prisma.order.create({ data: { total: amount } })
])
```
