# Tool Surface Selection

## Primary Surface Matrix

| Need | Primary Surface |
|------|-----------------|
| Recall, continuity, prior session, deleted-file history | `skills/ai-agent-memory/` |
| Agent workflow, plugin structure, Claude Code runtime behavior | `skills/agentic-system-basis/` |
| Shell scripting, terminal behavior, bash portability | `skills/shell-and-terminal/` |
| CI/CD, build reproducibility, release flows, deployment | `skills/build-and-deploy/` |
| Desktop/mobile/web runtime differences, compatibility tiers | `skills/cross-platform-development/` |
| CLI/MCP/LSP/toolchain architecture and integration | `skills/tool-ecosystem/` |

## Selection Rule

Choose exactly one **primary** surface first.
Secondary surfaces may assist, but no task should start with six active surfaces and no owner.

## Escalation Rule

Escalate from a skill surface to:
- `commands/` when the workflow should become explicit and repeatable
- `agents/` when isolated specialist reasoning is needed
- `hooks/` when lifecycle automation is truly beneficial
- optional `mcp/` only when external tool/data leverage is clear
