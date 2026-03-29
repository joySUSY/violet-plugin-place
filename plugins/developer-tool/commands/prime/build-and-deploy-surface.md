---
description: Prime the build-and-deploy control plane inside developer-tool
allowed-tools: Read, Grep, Glob
---

# Prime Build and Deploy Surface

1. Read `skills/build-and-deploy/SKILL.md`.
2. Then read `build-and-deploy/README.md` to recover the subsystem's doctrine-first control model.
3. Read `build-and-deploy/INVENTORY.md` if maturity or layer boundaries are still unclear.
4. Read `build-and-deploy/TRIGGER_SCOPE.md` if first-owner routing is part of the problem.
5. Distinguish clearly between:
   - subtree control plane
   - canonical doctrine under `references/build-and-deploy/`
   - subtree-local support skill bundles
   - root runtime surfaces in `developer-tool`
   - donor/source fallback
6. Route the task to one primary layer first.
7. Name the primary layer, one secondary layer if needed, and the next exact file to read.
8. Do not invent a dedicated subsystem runtime shell or active staging behavior unless doctrine/control-plane pressure explicitly justifies it.
