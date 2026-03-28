# Regression Memory Loop (回归记忆闭环)

> A red test written from guesswork protects the wrong bug.
> 基于猜测写出的红测，只会保护错误的问题。

## Purpose (目的)

This reference tells `tdd-system` how to consume the Batch 1 control baseline before:

- reproducing a bug
- resuming an interrupted fix
- writing a regression test after a production failure
- validating whether a recurring defect is actually the same bug

## Use This Reference When… (以下情况加载本参考)

- the defect has appeared before
- the current work resumed after interruption, compaction, or branch drift
- the team already has surfaced failure notes, continuity snapshots, or historical rationale
- you must distinguish **same bug** from **similar symptom**

## Mandatory Pre-RED Retrieval Order (进入 RED 前强制检索顺序)

1. `../../developer-tool/ai-agent-memory/README.md`
2. `../../developer-tool/references/ai-agent-memory/recall-before-act.md`
3. `../../developer-tool/references/ai-agent-memory/history-retrieval-patterns.md`
4. `../../developer-tool/references/ai-agent-memory/continuity-control-plane.md` when the workstream was interrupted and needs recovery
5. relevant project-local surfaced continuity artifacts, if they exist

## The Loop (闭环)

### 1. Recover the Exact Failure Source
Do not start from intuition.
Recover the narrowest surfaced evidence available:

- failing payload
- failing branch / file / module
- prior failed attempt
- rationale for the last change in that area

### 2. Write the RED Test from Evidence
The red test should mirror the surfaced evidence trail:

- same edge case or payload
- same boundary condition
- same integration seam if the failure was not purely unit-level

If the test passes immediately, your reproduction is wrong or incomplete.

### 3. Go GREEN with the Smallest Valid Fix
Keep the implementation minimal.
Do not refactor while the regression is still unproven.

### 4. Refactor Under Protection
Once the regression is green:

- clean structure
- reduce duplication
- improve names
- keep the test green throughout

### 5. Externalize the Lesson if It Has Future Value
If the loop revealed a reusable pitfall, changed-file rationale, or a new blocker, hand off to the continuity shell after the technical loop is explicit.

## Required Output Blocks (输出必须包含)

```text
Regression source:
- ...

Failing proof:
- ...

Fix scope:
- ...

Future prevention:
- knowledge only | continuity snapshot needed
```

## Do NOT… (禁止事项)

1. do not write the red test from vague recollection alone
2. do not treat any recurring symptom as the same bug without a traced evidence link
3. do not bury a newly discovered pitfall in ad-hoc chat context
4. do not capture hidden reasoning when the surfaced failure lesson is enough
