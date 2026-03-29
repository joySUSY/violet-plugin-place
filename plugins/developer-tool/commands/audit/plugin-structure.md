---
description: Audit a plugin or plugin-like repo against developer-tool shell laws
allowed-tools: Read, Grep, Glob
argument-hint: [plugin-path]
---

Audit `$ARGUMENTS` against the developer-tool plugin-shell rules.

1. Verify whether the target follows plugin-grade containment:
   - `.claude-plugin/plugin.json`
   - `commands/`
   - `agents/`
   - `skills/`
   - `hooks/`
   - optional `mcp/` or equivalent integration surface
2. Identify whether the target is:
   - a canonical runtime shell
   - a donor reservoir
   - an ambiguous hybrid
3. Report three things only:
   - what should be preserved
   - what should be absorbed into doctrine
   - what should become runtime shell surface
4. Use `rules/plugin-architecture/core-shell-laws.md` as the audit baseline.
