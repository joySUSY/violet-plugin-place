---
description: Choose the correct developer-tool surface for the current task
allowed-tools: Read, Grep, Glob
---

Choose the correct `developer-tool` surface.

Use this routing logic:

- If the task is about recall, continuity, prior sessions, deleted-file recovery, or trigger ownership -> `skills/ai-agent-memory/`
- If the task is about Claude Code behavior, agent workflows, plugin architecture, or system coordination -> `skills/agentic-system-basis/`
- If the task is about CSV/PDF/DOCX/PPTX processing, ETL/ELT, schema validation, normalization, migration-oriented shaping, or deterministic structured outputs -> `skills/data-processing/`
- If the task is about C++ / Kotlin / Swift / Flutter / PHP / PowerShell specialist guidance, or deciding whether a language-adjacent task should stay in `developer-tool` -> `skills/language-specialists/`
- If the task is about shell usage, terminal behavior, bash portability, or runtime environment -> `skills/shell-and-terminal/`
- If the task is about CI/CD, release flow, build reproducibility, packaging, or deployment -> `skills/build-and-deploy/`
- If the task is about platform compatibility, desktop/mobile/web runtime differences, or cross-platform workflow -> `skills/cross-platform-development/`
- If the task is about plugin ecosystems, command frameworks, MCP/LSP/toolchain shape, or tool-runtime architecture -> `skills/tool-ecosystem/`

Return:

1. primary surface
2. secondary surfaces if any
3. whether the task is doctrine-first, staging-justified, or runtime-shell-justified
4. exact next file to read
5. one-sentence rationale

Rule: if the memory lane is chosen, `plugins/violet-memory-lab/` is never the first stop unless the problem is already explicitly push-based and operational.

Rule: if `agentic-system-basis` is chosen, the subtree is doctrine-first even though its control-plane quartet now exists. Start with `agentic-system-basis/README.md` or `commands/prime/agentic-system-surface.md`, and do not assume a dedicated subsystem runtime shell already exists.

Rule: if `tool-ecosystem` is chosen, the subtree is doctrine-first even though its control-plane quartet now exists. Start with `tool-ecosystem/README.md` or `commands/prime/tool-ecosystem-surface.md`, and do not assume a dedicated subsystem runtime shell already exists.

Rule: if `build-and-deploy` is chosen, the subtree is doctrine-first even though its control-plane quartet now exists. Start with `build-and-deploy/README.md` or `commands/prime/build-and-deploy-surface.md`, treat subtree-local skill bundles as support packs rather than staging, and do not assume a dedicated subsystem runtime shell already exists.

Rule: if `shell-and-terminal` is chosen, the subtree is doctrine-first even though its control-plane quartet and runtime-entry surfaces now exist. Start with `shell-and-terminal/README.md` or `commands/prime/shell-and-terminal-surface.md`, treat subtree-local skill bundles as support packs rather than staging, and do not assume a dedicated subsystem runtime shell already exists.

Rule: if `cross-platform-development` is chosen, the subtree is doctrine-first even though its control-plane quartet now exists. Start with `cross-platform-development/README.md` or `commands/prime/cross-platform-surface.md`, treat subtree-local skill bundles as support packs rather than staging, and do not assume a dedicated subsystem runtime shell already exists.

Rule: if `data-processing` is chosen, the subtree is doctrine-first even though its control-plane quartet now exists. Start with `data-processing/README.md` or `commands/prime/data-processing-surface.md`, keep stage boundaries explicit, and do not assume a dedicated subsystem runtime shell already exists.

Rule: if `language-specialists` is chosen, the subtree is doctrine-first and bridge-shaped even though its control-plane quartet now exists. Start with `language-specialists/README.md` or `commands/prime/language-specialists-surface.md`, route by problem shape rather than keyword alone, and do not assume a dedicated subsystem runtime shell already exists.
