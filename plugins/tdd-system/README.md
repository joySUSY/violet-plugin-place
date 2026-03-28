# TDD & Verification Engine
# Authors: Joysusy & Violet Klaudia 💖

> If it isn't tested, it's broken. If it isn't automated, it doesn't exist.
> 没测试就是坏的。没自动化就不存在。

## What This Engine Owns

Cross-language test-driven development methodology, verification-first discipline, and regression prevention.
Not language-specific test frameworks — those belong to each language engine.
This engine owns the *thinking* behind testing: when to test, what to test, how to structure proof.

## Structure

```
tdd-system/
├── .claude-plugin/plugin.json
├── SKILL.md                          # Root navigation + TDD philosophy
├── README.md                         # This file
├── commands/prime/tdd-cycle.md       # Red-Green-Refactor primer
├── agents/verity.md                  # Verification Mind
├── hooks/hooks.json                  # UserPromptSubmit + Stop
└── references/
    ├── tdd-workflow.md               # Red-Green-Refactor loop
    ├── tdd-principles.md             # Core TDD principles
    ├── testing-tactics.md            # Unit/Integration/E2E tactics
    ├── agent-evaluation.md           # AI output validation
    ├── regression-memory-loop.md     # Failure recall + continuity
    ├── strategies.md                 # Testing strategy selection
    └── test-automation.md            # Automation pyramid + tools
```

## Cross-Engine Boundaries

| Responsibility | Owner |
|---|---|
| TDD methodology + verification discipline | **This engine** |
| Rust test patterns (#[test], proptest) | `rust-coding-engine` |
| Python test patterns (pytest, hypothesis) | `python-dev-skill` |
| Go test patterns (testing, testify) | `go-coding-engine` |
| JS/TS test patterns (vitest, jest) | `js-dev-skill` |
| Root-cause analysis methodology | `error-handling` |
| Refactoring after green phase | `refactor-dev` |
