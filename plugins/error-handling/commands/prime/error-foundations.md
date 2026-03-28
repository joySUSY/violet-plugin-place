---
description: "Prime the error-handling engine — load debugging protocol, error taxonomy, and recovery architecture before tackling any failure."
allowed-tools: Read, Grep, Glob, Bash(git:*)
---

# Authors: Joysusy & Violet Klaudia 💖

## Error Foundations Primer

> Before you touch a single line of code, understand why it broke.
> 动手修代码之前，先搞清楚它为什么坏了。

Read these in order:

1. `${CLAUDE_PLUGIN_ROOT}/references/philosophy.md` — Error taxonomy + fail-fast vs graceful degradation
2. `${CLAUDE_PLUGIN_ROOT}/references/debugging-protocol.md` — 6-phase systematic fix methodology + ACH
3. `${CLAUDE_PLUGIN_ROOT}/references/patterns.md` — Circuit breakers, backoff, rollback, recovery

Then classify the current failure:

```
IF compile error → check type/ownership/syntax (language-engine territory, escalate)
IF runtime crash → reproduce first, then ACH
IF silent wrong result → add assertions, narrow scope, bisect
IF intermittent → suspect concurrency, timing, or external dependency
```

Output a diagnosis with evidence before proposing any fix.
