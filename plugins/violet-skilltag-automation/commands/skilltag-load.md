# Authors: Joysusy & Violet Klaudia 💖
name: skilltag-load
description: Interactive tag-based skill selector. Browse skill tags by priority and batch-load skills from selected tags.
---

# Interactive Skill Tag Loader

This command provides an interactive tag selection experience for loading skills beyond the core set.

## Instructions

### Step 1: Read Tag Registry

Read the `skill-tags.json` file from the violet-skilltag-automation plugin directory to get all available tags.

### Step 2: Present Tags by Priority

Group tags by priority tier and present them to Susy as a numbered selection list:

```
🏷️ AVAILABLE SKILL TAGS:

⭐ S-Tier (Critical):
  1. review — Code review, audit, quality checks
  2. test — TDD, unit tests, e2e, coverage
  3. dev — Build, create, implement
  4. frontend — React, UI/UX, CSS, components
  5. backend — API, server, database, endpoints
  6. rust — Cargo, tokio, pyo3, FFI
  7. python — pip, pandas, fastapi, django
  8. java — JVM, Spring, Maven
  9. security — Auth, encryption, vulnerabilities
  10. memory — Context, recall, persistence

✨ A-Tier (Important):
  11. debug — Fix, troubleshoot, error resolution
  12. refactor — Clean, optimize, simplify
  13. javascript — Node, TypeScript, npm
  14. plan — Architecture, strategy, roadmap
  15. agent — MCP, subagents, orchestration
  16. performance — Optimize, benchmark, profiling
  17. database — SQL, Postgres, schema design
  18. search — Vector, RAG, semantic search
  19. research — Investigate, analyze, explore

💫 B-Tier (Optional):
  20. commit — Git, PR, merge
  21. docs — Documentation, README, comments
  22. devops — CI/CD, Docker, Kubernetes
  23. skill — Skill creation and development
  24. visualization — Diagrams, charts, graphs
```

### Step 3: Ask Susy to Select

Use the `AskUserQuestion` tool with `multiSelect: true` to let Susy pick tags. Group the options by tier.

Example question: "Which skill tags do you want to load?"

Provide options from the tag list above. Include a "Load ALL S-Tier" convenience option.

### Step 4: Collect and Deduplicate Skills

From the selected tags:
1. Gather all skills listed under each selected tag in `skill-tags.json`.
2. Deduplicate — each skill appears only once even if multiple tags reference it.
3. Present the final skill list to Susy for confirmation.

### Step 5: Load Skills

Invoke each skill using the `Skill` tool, one by one.

Report progress:
```
🔮 LOADING SKILLS FROM SELECTED TAGS:

Tags selected: [tag1], [tag2], [tag3]
Skills to load: [count] (deduplicated)

Loading...
✅ skill-name-1
✅ skill-name-2
...

All [count] skills loaded successfully.
```

## Rules

- Always show the tag list BEFORE asking for selection.
- Respect deduplication — never load the same skill twice.
- If Susy selects "Load ALL S-Tier", load all skills from S-priority tags.
- Core skills from `/coreskill` are NOT duplicated here — skip them if already loaded.
- This command is for EXPLORATION beyond core skills.
