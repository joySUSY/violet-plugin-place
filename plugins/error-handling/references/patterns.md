# 🧱 Resilient System Patterns

When building robust systems, implement these foundational architectures rather than ad-hoc `try/catch` blocks.

## 1. Retry with Exponential Backoff
*Best for: Network flakes, API limits, database lock contention.*

```typescript
async function retry<T>(op: () => Promise<T>, max = 3, delayMs = 1000): Promise<T> {
  let attempt = 0;
  while (true) {
    try {
      return await op();
    } catch (e) {
      if (++attempt >= max) throw e;
      await new Promise(r => setTimeout(r, delayMs * Math.pow(2, attempt - 1)));
    }
  }
}
```

## 2. The Circuit Breaker
*Best for: Preventing your system from DDOSing a failing downstream service and causing cascading cluster death.*

- **CLOSED:** Normal operation. Requests flow.
- **OPEN:** The downstream service failed too many times. Fast-fail all new requests immediately.
- **HALF-OPEN:** After a timeout, let *one* request through. If it succeeds, CLOSE. If it fails, OPEN.

## 3. Transactional Rollback
*Best for: Multi-step DB operations.*

```typescript
const trx = await db.begin();
try {
  await debit(accA, 100, trx);
  await credit(accB, 100, trx);
  await trx.commit();
} catch (e) {
  await trx.rollback(); // The system remains in a pristine state
  logger.error("Transfer failed", { error: e });
  throw new TransferFailedError();
}
```

## 4. Custom Domain Errors
*Best for: Expressive code flow.*

Don't just throw `Error("bad data")`. Use typed, domain-specific failures:

```rust
#[derive(Debug, thiserror::Error)]
pub enum OrderError {
    #[error("Insufficient stock for item {0}")]
    OutOfStock(String),
    #[error("Payment declined: {0}")]
    PaymentFailed(String),
}
```

## 5. Security & Sanitization
**NEVER** expose stack traces or internal DB paths to external actors.
```json
// GOOD: Client-facing response
{ "error": "Internal Server Error", "request_id": "req_xyz123" }

// 🔒 LOGS: Internal secure logging (CloudWatch, ELK)
{ "level": "ERROR", "trace": "...", "query": "SELECT...", "request_id": "req_xyz123" }
```
