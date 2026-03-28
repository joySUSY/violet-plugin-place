# 🏗️ Testing Tactics (Unit, Integration, E2E)

You cannot test an entire application with just unit tests. You cannot test an entire application with just E2E tests. You must use the Pyramid.

## 1. The Testing Pyramid (测试金字塔)

- **Unit Tests (70%):** Fast (milliseconds). Tests pure functions, utilities, and isolated components. Zero I/O (no real databases, no network requests).
- **Integration Tests (20%):** Medium speed (seconds). Tests the boundary between your code and external systems. Use a real, ephemeral database (e.g., Testcontainers, SQLite in-memory) instead of mocking the DB driver.
- **End-to-End E2E (10%):** Slow (minutes), brittle. Drives a real browser (Playwright, Cypress) across the full stack. Tests the critical user journeys (Login, Checkout, Password Reset).

## 2. Mocking Strategy (Mock的艺术)

Mocking is a powerful tool that is frequently abused. Over-mocking leads to "Echo Chamber Tests," where your tests look green but production is broken.

- **Stubs:** Provide canned answers to calls made during the test. (e.g., A stub `PaymentGateway` always returns `true`).
- **Spies:** Record information about how they were called. (e.g., Did the code call `emailService.send()` exactly once with `"user@example.com"`?).
- **Mocks:** Objects pre-programmed with expectations.

*The Golden Rule of Mocking:* **Do not mock what you do not own.** 
If you use Axios to fetch an API, do not mock Axios (`jest.mock('axios')`). Instead, mock the network layer itself using tools like `msw` (Mock Service Worker) or `nock`. This ensures your code works regardless of the HTTP library used.

## 3. Design By Contract (契约式设计)

Before writing tests, explicitly define the boundaries of your APIs or modules.
- **Pre-conditions:** What must be true when a function is called? (e.g., `amount > 0`). If violated, throw an error immediately (`ArgumentError`).
- **Post-conditions:** What state is guaranteed when the function finishes? (e.g., `user.balance` is updated).
- **Invariants:** What rules must remain true throughout the entire lifecycle of an object?

Tests should specifically target these contract boundaries.
