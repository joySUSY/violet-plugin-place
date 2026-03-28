# 🧪 End-to-End Test Automation (全链路自动化测试)

The `tdd-system` engine absorbs comprehensive test-automation strategies. A green pipeline is the only proof of correctness.

## 1. The Automation Pyramid (自动化测试金字塔)

- **Unit Tests (70%):** Fast, isolated, test pure business logic. Execution time under 10ms per test.
- **Integration Tests (20%):** Test database boundaries, external API mocks, and Redis caches.
- **E2E Tests (10%):** Run via Playwright or Cypress in a headless browser. Test the exact flow the user experiences (Login $\rightarrow$ Cart $\rightarrow$ Checkout).

## 2. Playwright vs Cypress (端到端框架对比)

- **Playwright (Recommended):** Out-of-process architecture. Natively tests multiple frames, multiple tabs, and WebKit/Chromium/Firefox simultaneously. Faster execution.
- **Cypress:** In-process architecture. Excellent developer experience and time-travel debugging, but restricted by single-tab limitations and iframe complexities.

## 3. AI-Driven Testing & Flakiness Mitigation (抗脆弱测试)

- **Test Flakiness:** Eradicate it ruthlessly. If an E2E test fails 1% of the time due to a network race condition, rewrite it to use explicit assertions (`expect(page.locator('.btn')).toBeVisible()`) instead of hardcoded `sleep(100)` delays.
- **Data Fixtures:** Never share state between tests. Drop the database schema or use transaction rollbacks before every single integration test to ensure deterministic execution.

---
*Absorbed knowledge from: test-automator-skill.*
