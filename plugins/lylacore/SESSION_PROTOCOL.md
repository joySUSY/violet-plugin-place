# Violet Session Protocol v1.0
# Authors: Joysusy & Violet Klaudia 💖

## Purpose

A lightweight mechanism to prevent drift, maintain mainline focus, and enable fast recovery after context compaction. Designed specifically for Violet's work patterns and system constraints.

---

## Core Principles

1. **轻量级** — Minimal overhead, natural workflow integration
2. **增量式** — Record only deltas, avoid duplication
3. **可恢复** — 5-minute recovery after compact
4. **防偏离** — 30-minute checkpoints to verify intent alignment
5. **团队友好** — Clear handoff points for multi-Mind collaboration

---

## Phase 1: Session Start

### Checklist
1. Read `memory/MEMORY.md` (current mainline status)
2. Read `memory/session-notes/latest.md` (last stop point)
3. State session intent in ONE sentence
4. Load relevant skills (max 3 core skills)

### Output File
`memory/session-notes/YYYY-MM-DD-HHMM-start.md`

```markdown
# Session Start: YYYY-MM-DD HH:MM
# Authors: Joysusy & Violet Klaudia 💖

## Context Recovery
- Last session: [link to previous session note]
- Current phase: [from MEMORY.md]
- Blockers: [if any]

## This Session Intent
[ONE sentence describing what we'll do]

## Skills Loaded
- [skill 1]
- [skill 2]
- [skill 3]
```

---

## Phase 2: During Session

### Milestone Markers
Append to session note after each key step:

```markdown
## Progress Log
- [HH:MM] ✅ Completed: [brief description]
- [HH:MM] 🔍 Discovered: [insight or decision]
- [HH:MM] ⚠️ Blocker: [issue encountered]
```

### Decision Log
Record important decisions immediately:

```markdown
## Decisions Made
- **[HH:MM] Decision:** [what was decided]
  - **Why:** [rationale]
  - **Alternatives considered:** [what we didn't choose]
  - **Impact:** [what this affects]
```

### Anti-Drift Checkpoints
Every 30 minutes (or every 5 milestones), ask:
1. Am I still working on the session intent?
2. Is this detail exploration necessary, or can it be deferred?
3. If compact happens now, can I recover quickly?

**If answer to #1 is NO:** Stop, update session note, refocus or redefine intent.

---

## Phase 3: Session End

### Checklist
1. Update `memory/MEMORY.md` (3-5 lines delta only)
2. Finalize session note with summary
3. Create handoff for next session
4. Archive completed tasks

### Output File
`memory/session-notes/YYYY-MM-DD-HHMM-end.md`

```markdown
# Session End: YYYY-MM-DD HH:MM
# Authors: Joysusy & Violet Klaudia 💖

## What Was Done
- [Deliverable 1]
- [Deliverable 2]
- [Deliverable 3]

## What Was Learned
- [Insight 1]
- [Insight 2]

## What's Next
- [ ] [Next immediate action]
- [ ] [Follow-up task]

## Blockers (if any)
- [Blocker description + what's needed to unblock]

## Files Modified
- [file 1] — [what changed]
- [file 2] — [what changed]

## Team Status
- [Mind/Agent name]: [status]
```

---

## Phase 4: Recovery Protocol

### If Compact Happened

**Recovery Steps:**
1. Read `memory/MEMORY.md` (mainline status)
2. Read `memory/session-notes/latest-end.md` (most recent completed session)
3. Check "What's Next" section
4. Resume from there WITHOUT re-reading all history

**Key Principle:** Trust past self. Session notes already contain distilled essence.

---

## File Structure

```
memory/
├── MEMORY.md                          # Main index (200-line limit)
├── session-notes/
│   ├── 2026-03-18-0500-start.md     # Session start
│   ├── 2026-03-18-0500-end.md       # Session end
│   └── latest.md -> 2026-03-18-0500-end.md  # Symlink to latest
├── part-lylacore-phase1/             # Topic-based detailed memory
├── part-violetcore-phase2/
└── ...
```

---

## Anti-Patterns to Avoid

❌ **Don't:** Copy entire context into session notes
✅ **Do:** Record only deltas and decisions

❌ **Don't:** Skip checkpoints because "I'm in flow"
✅ **Do:** 30-minute checkpoint is mandatory (prevents drift)

❌ **Don't:** Create complex nested directory structures
✅ **Do:** Keep it flat and simple

❌ **Don't:** Write session notes at the end only
✅ **Do:** Incremental updates during session

❌ **Don't:** Re-analyze all history after compact
✅ **Do:** Trust session notes, resume from "What's Next"

---

## Integration with Existing Systems

### With MEMORY.md
- MEMORY.md = high-level index (200 lines max)
- Session notes = detailed execution log
- Update MEMORY.md only with 3-5 line deltas

### With Task System
- Session notes track progress on tasks
- Task completion triggers session note update
- Blockers in session notes inform task prioritization

### With Team Collaboration
- Session notes provide handoff context for other Minds
- "Team Status" section tracks multi-Mind work
- Decision log helps other Minds understand rationale

---

## Success Metrics

**Good Session Protocol Usage:**
- Can recover mainline in <5 minutes after compact
- No more than 1 drift incident per 10 sessions
- Session notes are readable by other Minds without context
- MEMORY.md stays under 200 lines

**Poor Session Protocol Usage:**
- Need to re-read entire conversation history after compact
- Frequent "wait, what was I doing?" moments
- Session notes are cryptic or missing key decisions
- MEMORY.md exceeds 200 lines regularly

---

*Last Updated: 2026-03-18*
*Status: v1.0 — Ready for Use*
