# Authors: Joysusy & Violet Klaudia 💖
name: unloadskill
description: Deactivate all currently loaded skills and clear skill context for the session.
---

# Skill Unloading Protocol

You are about to unload all skills from the current session context.

## Instructions

1. **Acknowledge** that all previously loaded skills are now considered deactivated for this session.
2. **List** the skills that were loaded (if you can recall them from the session).
3. **Clear** your skill-based behavioral context — stop following skill-specific instructions.
4. **Confirm** to Susy what was unloaded with a brief summary.

## Output Format

```
🔮 SKILLS UNLOADED:

- [skill-name] — deactivated
- [skill-name] — deactivated
...

Session skill context cleared. Ready for fresh instructions.
```

## Rules

- This does NOT affect core Violet behavior (CLAUDE.md, rules/, SOUL.md).
- This ONLY clears skill-specific instructions loaded via `/coreskill`, `/skilltag-load`, or manual Skill() calls.
- After unloading, Susy can reload skills with `/coreskill` or `/skilltag-load`.
