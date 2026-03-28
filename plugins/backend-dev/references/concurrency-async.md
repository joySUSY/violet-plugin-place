# ⚡ Concurrency & Async Execution

Synchronous processing in a web server is a death sentence for throughput. A web request should aim to respond in `< 200ms`. 

## 1. The Rule of Background Jobs

If an HTTP request taking longer than 1 second to process, it belongs in a background queue.

- **Bad (Synchronous):** User uploads 10MB Video -> Server transcodes standard definitions for 30s -> Server returns `200 OK`. (Connection times out, server blocks other requests).
- **Good (Asynchronous):** User uploads 10MB Video to S3 -> Server creates a DB record with status `PROCESSING` -> Publisher sends message to Redis/SQS queue -> Server immediately returns `202 Accepted` to client.
  - A separate "Worker" node pulls from the queue, transcodes the video, and updates the DB to `COMPLETE`.

## 2. Dealing with Race Conditions

Concurrency breeds race conditions. Two requests try to claim the last concert ticket simultaneously.

- **Optimistic Concurrency Control (OCC):** Use a `version` integer column.
  ```sql
  -- Request 1 and 2 both read version 1
  -- Request 1 updates version to 2
  UPDATE tickets SET owner_id = 1, version = 2 WHERE id = 123 AND version = 1;

  -- Request 2 tries to update, but version 1 no longer exists. Fails safely.
  UPDATE tickets SET owner_id = 2, version = 2 WHERE id = 123 AND version = 1;
  ```

## 3. The `async/await` Pitfalls in JS/Python/Rust

- **The `Promise.all` Array Loop:** Wait for independent tasks concurrently, rather than sequentially.
  - *Bad:* `for user in users: await fetchUser(user.id);`
  - *Good:* `await Promise.all(users.map(u => fetchUser(u.id)));`
- **Beware the Thread Starvation:** In single-threaded event loops (Node.js, async Python), heavy CPU operations (like generating PDFs or hashing 1000 passwords) will completely freeze the server, blocking *all other HTTP requests*. Offload heavy CPU tasks to worker threads or separate microservices in languages like Go/Rust.

## 4. Connection Pool Exhaustion

Always configure database connection pooling explicitly (`PgBouncer` or Prisma's internal pool). 
If a server container spawns 50 child workers, and each opens 10 connections, your 500-limit Postgres DB will crash instantly. Use bounded connection pools that queue incoming queries rather than spawning infinite TCP connections.
