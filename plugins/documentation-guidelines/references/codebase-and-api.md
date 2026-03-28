# 🏗️ APIs & Codebase Architecture

## 1. Documenting APIs (REST / GraphQL)

A missing detail in an API doc is an hour of someone else's life wasted. Every endpoint must clearly define:

1. **Endpoint & Method:** `POST /api/v1/orders`
2. **Authentication:** Bearer token? API Key? Required scopes/roles?
3. **Parameters:** Path vs. Query vs. Body. Mark `[Required]` or `[Optional]`.
4. **Body Schema:** Provide a precise, realistic JSON example. Not `{ "id": "string" }`, but `{ "order_id": "ord_9182xyz" }`.
5. **Success Response (2xx):** What does success look like?
6. **Error Responses (4xx/5xx):** What are the exact error codes (`INSUFFICIENT_FUNDS`) the client needs to handle?

*Pro-tip: If using OpenAPI/Swagger, generate the specs from the code types to avoid drift.*

## 2. Codebase Architecture (Project Roots)

Every non-trivial repository needs a heavy-hitting `README.md` and an `ARCHITECTURE.md`.

### The `README.md`
- **One sentence pitch:** What is this repo?
- **Quickstart:** 3 bash commands max from `git clone` to `server running`.
- **Environment Setup:** What `.env` files, Docker containers, or secrets are required?

### The `ARCHITECTURE.md`
- **System Diagram:** Use a Mermaid diagram. 
- **Directory Structure:** A `<tree>` view showing where the handlers, domain logic, and repositories live.
- **Invariants:** What are the hard rules? (e.g., *“The `domain` layer must never import from the `transport` layer.”*)

## 3. Code-Level Documentation (Docstrings)

When writing language-level docs (JSDoc, Rustdoc, Python Docstrings), follow the community standard, but enforce quality:

- Detail what inputs cause what **exceptions/panics**.
- For pure functions, detail edge cases.
- Provide a 1-2 line code snippet showing usage if it's a public interface.
