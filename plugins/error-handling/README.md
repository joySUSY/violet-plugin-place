# Error Handling Engine
# Authors: Joysusy & Violet Klaudia 💖

> A system's elegance isn't proven when everything goes right.
> It's battle-tested when everything falls apart.
> 系统的优雅不在顺境中彰显，而在崩溃中检验。

## What This Engine Owns

Cross-language error handling philosophy, debugging methodology, and resilience architecture.
Not language-specific syntax — that belongs to each language engine.
This engine owns the *thinking* behind failure: how to diagnose, how to recover, how to prevent.

## Structure

```
error-handling/
├── .claude-plugin/plugin.json
├── SKILL.md                        # Root navigation + pressure router
├── README.md                       # This file
├── commands/prime/error-foundations.md
├── agents/morii.md                 # Diagnostic Mind
├── hooks/hooks.json                # UserPromptSubmit + Stop
├── references/
│   ├── philosophy.md               # Error taxonomy, fail-fast vs graceful
│   ├── debugging-protocol.md       # 6-phase methodology + ACH
│   ├── patterns.md                 # Circuit breakers, backoff, rollback
│   └── v3-expansion/              # Staged sub-skills
└── rules/                          # (future)
```

## When This Engine Activates

- Mysterious test failure → `debugging-protocol.md`
- Designing error types for a new API → `philosophy.md`
- External API flaking out → `patterns.md`
- Need root-cause analysis methodology → activate `morii` agent

## Cross-Engine Boundaries

| Responsibility | Owner |
|---|---|
| Error taxonomy + debugging protocol | **This engine** |
| Rust-specific error types (Result/Option) | `rust-coding-engine` |
| Python exception patterns | `python-dev-skill` |
| Go error handling idioms | `go-coding-engine` |
| Test regression prevention | `tdd-system` |
| Production resilience patterns | `backend-dev` |
