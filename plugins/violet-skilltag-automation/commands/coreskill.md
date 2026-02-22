# Authors: Joysusy & Violet Klaudia 💖
name: coreskill
description: Load core skills from the manifest using env toggles in settings.json. Uses a structured thinking chain to determine which skills are relevant.
---

# Core Skill Loading Chain — Structured Reasoning Protocol

You are about to load core skills from the **skills-loaded.md** manifest, filtered by env toggles in `settings.json → plugins.violet-skilltag-automation.coreSkills`. Follow this thinking chain EXACTLY before loading any skill.

## Phase 1: Read Env Toggles

Read `~/.claude/settings.json` and extract the `coreSkills` map from `plugins.violet-skilltag-automation.coreSkills`.

Skills with value `0` are DISABLED — do NOT load them.
Skills with value `1` are ENABLED — evaluate them in Phase 2.

## Phase 2: Context Analysis

Analyze the current session context:

1. **What is Susy working on?** — Identify the primary task, project, or goal.
2. **What languages/technologies are involved?** — Rust, Python, JS, frontend, backend, etc.
3. **What phase is the work in?** — Research, planning, implementation, testing, debugging, review, documentation.
4. **Are there any explicit requests?** — Did Susy ask for specific capabilities?

Write a brief summary of your analysis.

## Phase 3: Skill Relevance Decision Tree

For EACH ENABLED skill (toggle = 1), evaluate relevance:

```
Is this skill directly related to the current task?
├─ YES → LOAD (mark as "direct match")
├─ MAYBE → Check: will Susy likely need this within the next 2-3 steps?
│  ├─ YES → LOAD (mark as "anticipated need")
│  └─ NO → SKIP
└─ NO → SKIP
```

### Core Skills Manifest:

| # | Skill | Category | Load Condition |
|---|-------|----------|----------------|
| 1 | `using-superpowers` | Core | ALWAYS load (if enabled) |
| 2 | `planning-strategy` | Core | ALWAYS load (if enabled) |
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

## Phase 4: Load Decision Output

Present your decisions:

```
🔮 CORE SKILL LOADING DECISIONS:

✅ LOAD: [skill-name] — [reason: direct match / anticipated need]
⏭️ SKIP: [skill-name] — [reason: not relevant / disabled by toggle]
🚫 DISABLED: [skill-name] — [toggle = 0 in settings]
```

## Phase 5: Execute Loading

Invoke ONLY the skills marked ✅ LOAD using the Skill tool.

## Rules

- Core skills (using-superpowers, planning-strategy) are ALWAYS loaded if their toggle is 1.
- Every other skill MUST have a one-line justification for LOAD or SKIP.
- Skills with toggle = 0 are NEVER loaded, regardless of relevance.
- When in doubt, SKIP. Susy can always ask to load more.
- Use `/skilltag-load` for tag-based exploration beyond core skills.
