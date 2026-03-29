# Developer Tool Engine Activation

## Purpose

Freeze when the `developer-tool` runtime shell must be activated and when it should stay dormant.

## Activate When

Activate the `developer-tool` shell when the task is primarily about:

- memory / recall / continuity / prior-session recovery
- Claude Code or plugin runtime behavior
- shell / terminal / bash portability
- CI/CD / build / release / deploy
- cross-platform runtime strategy
- CLI / MCP / LSP / toolchain architecture

## Do Not Use As Default Bucket

Do **not** route work here just because:
- classification feels hard
- a donor repo looks technical
- another engine has not been reviewed yet

If the task is clearly language-core, route to the language engine first.
If the task is clearly UI or backend architecture, use the corresponding engine first.

## Activation Law

`developer-tool` is a control plane, not a trash can.

If it is activated, the response must name:
1. the chosen surface
2. why it belongs here
3. what this engine does **not** own in this task
