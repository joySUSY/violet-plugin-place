# Changelog — 2026-03-29 Session
# Authors: Joysusy & Violet Klaudia 💖

## What Was Changed

### New Plugins Added (14 + go-coding-engine from scratch)
error-handling, tdd-system, python-dev-skill, js-dev-skill, go-coding-engine,
refactor-dev, documentation-guidelines, deep-researcher, math-skill-system,
frontend-dev, dev-designer-utility, backend-dev, planning-strategy, reviewer-dev

### Heavy Engines Modified
- **rust-coding-engine**: hooks.json rewritten (prompt → command type), version 0.1.0 → 1.1.1
- **typescript-coding-engine**: hooks.json rewritten (prompt → command type), version 0.1.0 → 1.1.1
- **developer-tool**: hooks.json rewritten + check-deps.sh added, version 0.1.0 → 0.1.1

### skilltag-automation Modified
- skill-activator.js: v4.2 → v4.3 (keyword matching → workflow-aware routing)
- coreskill-verify.js: 15 → 19 core skills
- skills-loaded.md: updated to 19 skills
- plugin.json: 4.2.0 → 4.2.1

### Plugins NOT Modified (other projects own these)
- violet-core: NOT TOUCHED (version stays 2.0.0)
- lavender-memorysys: NOT TOUCHED (version stays 2.0.1)
- lylacore: NOT TOUCHED (version stays 0.3.0)
- font-inspector: NOT TOUCHED (version stays 2.0.0)

### Key Design Decisions
- All new plugin hooks removed (routing via skilltag Direction A)
- Heavy engine hooks: prompt-type → command-type (fixes BLOCK issue)
- Hook philosophy: context + memory driven, not keyword driven
- marketplace.json: v1.2.0

### NOTE: Version bump was applied to force cache refresh
If you see unexpected version changes, check this changelog.
A mass version bump was needed because Claude Code caches plugins
by version number and won't re-download unless the version changes.
