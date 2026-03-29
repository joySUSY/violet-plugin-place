---
description: Prime the developer-tool runtime surface before acting
allowed-tools: Read, Grep, Glob, Bash(git:*)
---

Prime the `developer-tool` engine before acting.

1. Classify the current task into exactly one primary surface:
   - `ai-agent-memory`
   - `agentic-system-basis`
   - `data-processing`
   - `language-specialists`
   - `shell-and-terminal`
   - `build-and-deploy`
   - `cross-platform-development`
   - `tool-ecosystem`
2. Read the matching bridge skill under `skills/` first.
3. Follow that skill into the canonical subtree or reference path.
4. If the primary surface is `ai-agent-memory`, distinguish doctrine, staging, runtime shell, and donor/source fallback before proceeding.
5. If the primary surface is `agentic-system-basis`, distinguish subtree control plane, canonical doctrine, root runtime surfaces, reserved staging, and donor/source fallback before proceeding.
6. Treat `agentic-system-basis` as doctrine-first even though it now has a full subtree control-plane quartet.
7. If the primary surface is `data-processing`, distinguish subtree control plane, canonical doctrine, root runtime surfaces, and donor/source fallback before proceeding.
8. Treat `data-processing` as doctrine-first even though it now has a full subtree control-plane quartet.
9. If the primary surface is `language-specialists`, distinguish subtree control plane, canonical doctrine, root runtime surfaces, and donor/source fallback before proceeding.
10. Treat `language-specialists` as doctrine-first and bridge-shaped even though it now has a full subtree control-plane quartet.
11. If the primary surface is `tool-ecosystem`, distinguish subtree control plane, canonical doctrine, root runtime surfaces, reserved staging, and donor/source fallback before proceeding.
12. Treat `tool-ecosystem` as doctrine-first even though it now has a full subtree control-plane quartet.
13. If the primary surface is `build-and-deploy`, distinguish subtree control plane, canonical doctrine, subtree-local support packs, root runtime surfaces, and donor/source fallback before proceeding.
14. Treat `build-and-deploy` as doctrine-first even though it now has a full subtree control-plane quartet.
15. If the primary surface is `shell-and-terminal`, distinguish subtree control plane, canonical doctrine, subtree-local support packs, root runtime surfaces, and donor/source fallback before proceeding.
16. Treat `shell-and-terminal` as doctrine-first even though it now has a full subtree control-plane quartet.
17. If the primary surface is `cross-platform-development`, distinguish subtree control plane, canonical doctrine, subtree-local support packs, root runtime surfaces, and donor/source fallback before proceeding.
18. Treat `cross-platform-development` as doctrine-first even though it now has a full subtree control-plane quartet.
19. Only enter `plugins/violet-memory-lab/` after doctrine and staging have already clarified that the task is truly push-based and operational.
20. Do not invent a dedicated runtime shell for `agentic-system-basis`, `data-processing`, `language-specialists`, `tool-ecosystem`, `build-and-deploy`, `shell-and-terminal`, or `cross-platform-development`; use their subtree prime/diagnostician surfaces when explicit runtime leverage is needed there.
21. State the chosen surface, the reason it was chosen, and the non-goals.
22. If the task also touches plugin structure, read `rules/plugin-architecture/core-shell-laws.md` before proceeding.
23. Do not start implementation until the surface selection is explicit.
