# 🛣️ API Contract Design 

An API is a binding contract between the server and the client. When you break the contract, you break production.

## 1. RESTful Design Principles 

- **URLs are Nouns, Not Verbs:**
  - *Bad:* `POST /api/createNewUser`
  - *Good:* `POST /api/users`
- **Use HTTP Verbs Correctly:**
  - `GET`: Read (Idempotent)
  - `POST`: Create (Not Idempotent)
  - `PUT`: Full Replace (Idempotent)
  - `PATCH`: Partial Update (Idempotent)
  - `DELETE`: Remove (Idempotent)

## 2. Idempotency Keys 

If a client sends a `POST /checkout` request, but their Wi-Fi drops before receiving the `200 OK`, they *will* retry it. Without an idempotency key, you will charge their credit card twice.

- The client must generate a UUID client-side and send it as a header: `X-Idempotency-Key: abd12-xyz`.
- The backend checks if `abd12-xyz` exists in the database. If it does, return the cached result. If not, process the payment and save the key.

## 3. Pagination & Cursors

Never return `SELECT * FROM table`. It will crash the server when the table hits 1 million rows.

- **Offset Pagination:** Standard (`page=1&limit=50`). Flawed at scale because queries like `OFFSET 500000 LIMIT 50` require the DB to scan 500,000 rows just to discard them.
- **Cursor-Based Pagination:** The elite standard (`cursor=uuid123&limit=50`). Uses database indexes (`WHERE id > cursor`) for constant `O(1)` query times regardless of dataset size.

## 4. Security & Authentication

- Do not roll your own cryptography. Use established JWTs (JSON Web Tokens) or standard Session Cookies (`HttpOnly`, `Secure`, `SameSite=Lax`).
- **RBAC (Role Based Access Control):** Every authenticated endpoint must explicitly confirm the user's role.
  - *Bad:* Checking if `user_id` exists in the token.
  - *Good:* Checking if `user_id` owns the `org_id` requested in the path `/orgs/:org_id`.
- **Rate-Limiting:** Public endpoints (especially `/login` and `/reset-password`) must have IP-based rate limiting to prevent brute force attacks.
