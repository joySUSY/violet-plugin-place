---
description: Prime the data-processing control plane inside developer-tool
allowed-tools: Read, Grep, Glob
---

# Prime Data Processing Surface

1. Read `skills/data-processing/SKILL.md`.
2. Then read `data-processing/README.md` to recover the subsystem's doctrine-first control model.
3. Read `data-processing/INVENTORY.md` if maturity or layer boundaries are still unclear.
4. Read `data-processing/TRIGGER_SCOPE.md` if first-owner routing is part of the problem.
5. Distinguish clearly between:
   - subtree control plane
   - canonical doctrine under `references/data-processing/`
   - root runtime surfaces in `developer-tool`
   - donor/source fallback
6. Route the task to one primary layer first.
7. Name the primary layer, one secondary layer if needed, and the next exact file to read.
8. Do not invent a dedicated subsystem runtime shell or active staging behavior unless doctrine/control-plane pressure explicitly justifies it.
