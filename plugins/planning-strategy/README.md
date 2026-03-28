# Planning Strategy Engine
# Authors: Joysusy & Violet Klaudia 💖

> Weeks of coding can save you hours of planning.
> 几周的代码编写往往可以通过几小时的规划来避免。

## What This Engine Owns

Planning methodology: architecture decisions, requirements engineering, task decomposition, and recall-governed reasoning. Not implementation — that belongs to the language and backend engines. This engine owns the *thinking* before code: how to scope, how to decide, how to decompose, how to remember.

## Structure

```
planning-strategy/
├── .claude-plugin/plugin.json
├── SKILL.md                                  # Root navigation + planning philosophy
├── README.md                                 # This file
├── commands/prime/planning-foundations.md     # Plan-before-code primer + ADR template
├── agents/lumen.md                           # Strategic Planning Mind
├── hooks/hooks.json                          # UserPromptSubmit + Stop
└── references/
    ├── product-requirements.md               # PRD frameworks, testable constraints
    ├── architecture-decisions.md             # ADR format, trade-off analysis
    ├── task-coordination.md                  # Dependency graphs, critical paths
    ├── agent-reasoning.md                    # Sequential thinking, CoT
    ├── lattice-coordination.md               # Decentralized agent cycles
    ├── recall-governed-planning.md           # History-first planning
    └── product-project-strategy.md           # Phased planning, RICE, spikes
```

## When This Engine Activates

- Starting a new project or feature -> `product-requirements.md` + `architecture-decisions.md`
- Making a technology choice -> `architecture-decisions.md` (write an ADR)
- Breaking an epic into tasks -> `task-coordination.md`
- Planning with prior context -> `recall-governed-planning.md`
- Need strategic decomposition -> activate `lumen` agent

## Cross-Engine Boundaries

| Responsibility | Owner |
|---|---|
| Planning methodology + ADRs + task decomposition | **This engine** |
| Backend implementation after plan is set | `backend-dev` |
| Frontend implementation after plan is set | `frontend-dev` |
| Language-specific implementation | Language engines |
| Review of the plan or code | `reviewer-dev` |
| Infrastructure and deployment planning | `developer-tool` |
| Documentation standards | `documentation-guidelines` |
