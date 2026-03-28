---
description: "Prime the reviewer-dev engine — activate evidence-first review methodology with security audit checklists and quality gate standards."
allowed-tools: Read, Grep, Glob, Bash(git:*)
---

# Authors: Joysusy & Violet Klaudia 💖

## Review Foundations Primer

> A code review is not a test of obedience; it is a collaborative effort to catch bugs and share context.
> 代码审查不是服从性测试；它是发现错误和共享上下文的协作努力。

### Before You Review

1. **Context**: Understand what the change is trying to achieve and why
   - `${CLAUDE_PLUGIN_ROOT}/references/evidence-anchored-review.md`
2. **Architecture**: Check for logic bugs and design violations
   - `${CLAUDE_PLUGIN_ROOT}/references/code-review-excellence.md`
3. **Security**: Scan for OWASP vulnerabilities and secret leaks
   - `${CLAUDE_PLUGIN_ROOT}/references/security-audit.md`

### Classify Your Review Task

```
IF PR review          -> Architecture + logic first, formatting last (let the linter handle style)
IF security audit     -> OWASP top 10 checklist, secret detection, input validation
IF refactor review    -> Cyclomatic complexity reduction, early returns, DRY analysis
IF high-stakes area   -> Load evidence-anchored-review: recall ADRs and prior failures first
IF AI-generated code  -> Extra scrutiny on edge cases, hallucinated APIs, missing error handling
```

### Evidence-First Review Protocol

Every review finding must include three elements:

1. **Location** — exact file, line, and function
2. **Risk** — what breaks, who is affected, severity
3. **Fix** — concrete suggestion, not just "this is wrong"

### Review Anti-Patterns to Avoid

- Nitpicking formatting when a linter exists
- Requesting style changes that are personal preference
- Blocking on trivial issues while missing a logic bug
- Reviewing without understanding the intent of the change
- Leaving vague comments ("this feels wrong") without evidence

### Security Quick Checklist

- No hardcoded secrets, API keys, or credentials in code
- All user input validated and sanitized at the backend boundary
- SQL queries parameterized (no string concatenation)
- Auth checked at gateway/middleware, not deep in business logic
- Error messages do not leak internal state to clients
