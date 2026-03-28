---
name: error-handling
description: "Cross-language error handling, debugging protocol, and resilience architecture. Use when debugging failures, designing error types, building circuit breakers, or root-causing production bugs. Evidence-based ACH methodology + 6-phase fix protocol."
version: "1.0.0"
---

### 🔗 Cross-Engine Navigation — 跨引擎导航

| Engine | Relation | Reference |
|--------|----------|-----------|
| `tdd-system` | Regression Isolation | [`tdd-system/SKILL.md`](../tdd-system/SKILL.md) |
| `refactor-dev` | Code Hygiene & Deslop | [`refactor-dev/SKILL.md`](../refactor-dev/SKILL.md) |
| `dev-designer-utility` | UI Accessibility & Layout | [`dev-designer-utility/SKILL.md`](../dev-designer-utility/SKILL.md) |
| `backend-dev` | System Resilience | [`backend-dev/SKILL.md`](../backend-dev/SKILL.md) |

---

# 🛡️ Error Handling Engine: The Humanizer Approach

> "A system's elegance isn't proven when everything goes right; it is battle-tested when everything falls apart."

This engine consolidates the mindset of elite debuggers, preventing "trial and error" coding. It enforces evidence-based root cause analysis across all major languages (Rust, Python, Go, JS/TS, Java).

## 🧭 Navigation Matrix

1. **[The Philosophy of Failure](references/philosophy.md)**
   - Fail Fast vs. Graceful Degradation.
   - The 13-Category Error Taxonomy (Know thy enemy).
2. **[The Debugging Protocol](references/debugging-protocol.md)**
   - The 6-Phase Systematic Fix Methodology (Evidence -> Fix -> Validate).
   - Analysis of Competing Hypotheses (ACH).
3. **[Recovery Architectures & Patterns](references/patterns.md)**
   - Circuit Breakers, Exponential Backoff, Transaction Rollbacks.

## 🎯 When to Trigger This Engine

- 🚨 **A test is failing mysteriously:** Stop guessing. Open `references/debugging-protocol.md`.
- 🏗️ **Designing a new API/Module:** How should we structure our `Result` or `Exceptions`? Read `references/philosophy.md`.
- 🔌 **External API integration:** Network flakes? You need `references/patterns.md`.

## 🧠 Core Operating Directives

- **DO NOT fix the symptom:** "Let me just wrap this in a try/catch." ❌ Instead, find out *why* the data is malformed.
- **Run the test FIRST:** Never modify code before reproducing the exact failure stack trace.
- **Fix ALL occurrences:** If an assertion pattern is wrong here, grep the codebase to fix it everywhere.
- **Sanitize by default:** Internal stack traces belong in logs, NEVER in user payload.

## 📂 Legacy Records
*(Original source files are preserved under `references/legacy/` for historical context without polluting active context.)*
