# The Philosophy of Failure

## 1. Fail Fast vs. Graceful Degradation

**Fail Fast:**
- **When:** Critical security constraints, data corruption risks, unreachable primary databases.
- **Why:** Stopping early prevents cascading failure states. If the config is invalid at boot, crash immediately. 

**Graceful Degradation:**
- **When:** Auxiliary services (e.g., recommendation engine down, analytics failing).
- **Why:** The user should still complete their primary intent (e.g., checkout) even if secondary features fail.

## 2. The 13-Category Error Taxonomy

Elite debugging starts by categorizing the error immediately:

1. **File Operations (12.2%):** Path validation, missing files, perm issues. (*Validate before use*)
2. **API Calls (8.7%):** HTTP timeouts, 503s. (*Use Exponential Backoff*)
3. **Data Validation (7.5%):** Missing fields, type coercion. (*Fail fast at the boundary*)
4. **Resource Management (6.3%):** Leaks, unclosed handles. (*Use RAII/defer*)
5. **Concurrency (5.8%):** Deadlocks, race conditions. (*Timeout mechanisms*)
6. **Configuration (5.4%):** Missing env vars. (*Validate on startup*)
7. **Dependencies (5.2%):** Version conflicts.
8. **Network (4.9%):** DNS failures. (*Circuit breakers*)
9. **Parsing (4.3%):** Malformed JSON. (*Safe parsing*)
10. **State (3.7%):** Invalid transitions.
11. **Authentication (2.8%):** Expired tokens. (*Auto-refresh pipelines*)
12. **Timeouts (2.4%):** Hung processes.
13. **Edge Cases (1.2%):** The unknown unknowns.

## 3. The 5 Severity Levels 

- **CRITICAL**: Wake someone up. DB down.
- **ERROR**: Operation failed. Actionable. "Invalid email."
- **WARN**: Odd but handled. Rate limit approaching.
- **INFO**: System heartbeat. User logged in.
- **DEBUG**: Verbose state. Only in dev.
