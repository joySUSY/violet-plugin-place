# Authors: Joysusy & Violet Klaudia 💖
name: skillload
description: Load skills from skills-loaded.md using a structured thinking chain to determine which skills are relevant to the current task context.
---

# Skill Loading Chain — Structured Reasoning Protocol

You are about to load skills from the **skills-loaded.md** manifest. Follow this thinking chain EXACTLY before loading any skill. Write your reasoning in English.

## Phase 1: Context Analysis

Analyze the current session context:

1. **What is Susy working on?** — Identify the primary task, project, or goal.
2. **What languages/technologies are involved?** — Rust, Python, JS, frontend, backend, etc.
3. **What phase is the work in?** — Research, planning, implementation, testing, debugging, review, documentation.
4. **Are there any explicit requests?** — Did Susy ask for specific capabilities?

Write a brief summary of your analysis.

## Phase 2: Skill Relevance Decision Tree

For EACH skill in the manifest, evaluate relevance using this decision tree:

```
Is this skill directly related to the current task?
├─ YES → LOAD (mark as "direct match")
├─ MAYBE → Check: will Susy likely need this within the next 2-3 steps?
│  ├─ YES → LOAD (mark as "anticipated need")
│  └─ NO → SKIP
└─ NO → SKIP
```

### Skills Manifest (from skills-loaded.md):

| # | Skill | Category | Load Condition |
|---|-------|----------|----------------|
| 1 | `using-superpowers` | Core | ALWAYS load |
| 2 | `planning-strategy` | Core | ALWAYS load |
| 3 | `rust-coding-engine` | Rust | Rust development tasks |
| 4 | `python-dev-skill` | Python | Python development tasks |
| 5 | `reviewer-dev` | Code Quality | Code review or PR work |
| 6 | `refactor-dev` | Code Quality | Refactoring or cleanup tasks |
| 7 | `tdd-system` | Testing | Writing tests or TDD workflow |
| 8 | `error-handling` | Testing | Error handling design or debugging |
| 9 | `js-dev-skill` | JavaScript | JS/TS/Node development |
| 10 | `deep-researcher` | Research | Research, investigation, or exploration |
| 11 | `backend-dev` | Development | Backend/API/server work |
| 12 | `documentation-guidelines` | Development | Writing docs or README |
| 13 | `frontend-dev` | Development | Frontend/UI/CSS work |
| 14 | `math-skill-system` | Math | Math, computation, or geometry tasks |

## Phase 3: Load Decision Output

Present your decisions in this format:

```
🔮 SKILL LOADING DECISIONS:

✅ LOAD: [skill-name] — [reason: direct match / anticipated need]
⏭️ SKIP: [skill-name] — [reason: not relevant to current task]
```

## Phase 4: Execute Loading

After presenting decisions, invoke ONLY the skills marked ✅ LOAD using the Skill tool. Do NOT load skipped skills.

## Rules

- Core skills (using-superpowers, planning-strategy) are ALWAYS loaded. No reasoning needed.
- Every other skill MUST have a one-line justification for LOAD or SKIP.
- When in doubt, SKIP. Susy can always ask to load more.
- Do NOT explore skills outside this manifest. Use `/skilltag` for full exploration.
