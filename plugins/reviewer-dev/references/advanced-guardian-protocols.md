# 🛡️ Advanced Guardian Protocols & Verification

A Senior Reviewer does not just look for syntax errors; they evaluate the meta-structure of the code, its logical confidence, and its documentation quality.

## 1. The Quality Guardian Mindset (代码质量守卫者)

A codebase rots exactly at the speed of its worst accepted Pull Request.
> *代码库腐化的速度，恰恰等同于被合并的最差PR的速度。*

- **The "No Broken Windows" Rule:** If you see a commented-out block of old code, a misleading variable name, or a missing error type, you must fix it or insist the author fixes it. Never merge a PR that leaves the codebase dirtier than it was found.
- **Design by Contract (DbC):** Verify that functions explicitly state their preconditions (inputs must be X) and postconditions (outputs will definitely be Y). If a PR adds a function that tacitly assumes an array isn't empty without checking it, reject the PR.

## 2. Code Logic & Confidence Checks (逻辑置信度层级)

When reviewing, group your confidence in the code's logic into strict tiers.

- **High Confidence (L1):** Isolated pure functions with 100% mathematical test coverage. (e.g., A password hashing utility).
- **Medium Confidence (L2):** Integration logic connecting to a database or 3rd party API. Requires defensive programming (Timeouts, Retries, Circuit Breakers). If the PR lacks timeouts, reject it.
- **Low Confidence (L3):** Concurrent, asynchronous logic manipulating shared state. This requires mathematical proofs or extremely heavy race-condition testing.

*Reviewer Question:* "What happens if this API takes 30 seconds to respond?" If the code doesn't handle the timeout gracefully, it is a structural failure.

## 3. The Verification Loop (验证闭环)

Never accept "It works on my machine" as a valid verification state.
> *永远不要接受“在我的机器上能跑”作为验证状态。*

- **Double-Check Side Effects:** If a PR modifies a database schema, ensure it also includes the corresponding rollback migration.
- **Log Review:** A feature is not complete unless you can monitor it in production. Check that the PR adds structured logs (e.g., `logger.info("payment_success", { user_id })`) instead of raw `console.log` statements.

## 4. API Docs & Empathy (API文档与开发者同理心)

Public APIs (REST, GraphQL, or exported SDK functions) are the UI for other developers.
- **Self-Documenting implies Failure:** Do not assume the code is self-documenting. If an endpoint takes a `status` string, the documentation *must* list the exact Enum values allowed.
- **Provide Curl Examples:** Every API PR should include an updated `curl` command or Postman collection in the description showing exactly how to trigger the happy path and the sad path.
