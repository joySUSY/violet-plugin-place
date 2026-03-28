---
description: "Prime the TDD engine — activate Red-Green-Refactor cycle with regression memory recall before writing any code."
allowed-tools: Read, Grep, Glob, Bash(git:*)
---

# Authors: Joysusy & Violet Klaudia 💖

## TDD Cycle Primer

> If it isn't tested, it's broken. If the test doesn't fail first, the test is invalid.
> 没测过就是坏的。测试不先飘红，就不是有效测试。

### Before You Write Code

1. **Recall**: Check for surfaced failures and prior regression context
   - `${CLAUDE_PLUGIN_ROOT}/references/regression-memory-loop.md`
2. **Red**: Write a test that fails — proving the bug exists or the feature is missing
   - `${CLAUDE_PLUGIN_ROOT}/references/tdd-workflow.md`
3. **Green**: Write minimal code to make the test pass
4. **Refactor**: Clean up without breaking the green state
5. **Verify**: Run full test suite — no regressions

### Classify Your Testing Need

```
IF bug fix       → Red test reproduces the exact bug first
IF new feature   → Red test defines the expected behavior first
IF refactor      → Green tests exist BEFORE touching code
IF AI validation → Run agent-evaluation checklist
IF regression    → Check regression-memory-loop for prior context
```

### Testing Tactics Quick Reference

- Unit: test one function, mock everything else
- Integration: test component boundaries, real dependencies
- E2E: test user-visible flows end-to-end
- Load `${CLAUDE_PLUGIN_ROOT}/references/testing-tactics.md` for details
