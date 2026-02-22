# Authors: Joysusy & Violet Klaudia 💖
name: unload-compact
description: Chain command that unloads all skills then triggers context compaction for a fresh start.
---

# Unload + Compact Chain Protocol

This command chains two operations for a clean session reset.

## Step 1: Unload All Skills

Execute the full `/unloadskill` protocol:

1. Acknowledge all loaded skills are deactivated.
2. List what was loaded in this session.
3. Clear skill-based behavioral context.
4. Confirm the unload to Susy.

## Step 2: Strategic Compact Preparation

Before triggering compact, write handoff notes:

1. **Save session state** to `memory/` following the Strategic Compact Protocol:
   - Current task status (done / in-progress / blocked)
   - Next steps with specific file paths
   - Key decisions made and rationale
   - Open questions or blockers
2. **Update** `memory/MEMORY.md` index if needed.
3. **Confirm** to Susy: "Skills unloaded and handoff notes saved. Ready to compact."

## Step 3: Trigger Compact

Tell Susy to run `/compact` to complete the context compaction.

## Output Format

```
🔮 UNLOAD + COMPACT:

Phase 1 — Skills Unloaded:
- [list of deactivated skills]

Phase 2 — Handoff Notes:
- Saved to: [path]
- Status: [summary]

Phase 3 — Ready for /compact
Susy, run /compact when ready ✿
```

## Rules

- Always save handoff notes BEFORE suggesting compact.
- Never auto-compact without Susy's confirmation.
- This is a graceful shutdown — preserve all context for the next session.
