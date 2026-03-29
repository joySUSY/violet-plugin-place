# AI Agent Memory v3-Expansion Module Status Matrix

**Authors: Joysusy & Violet Klaudia**

## Purpose

This matrix classifies each top-level module under `developer-tool/ai-agent-memory/v3-expansion/`.

It exists to answer a practical staging question:

> for each preserved memory-related module, what is it currently for, when should it be opened, and what is its most likely long-term destination inside the memory lane?

This is the per-module companion to:
- `README.md` (staging governance)
- `INDEX.md` (cluster navigation)

## Source Provenance

- **Primary source:** current top-level modules under `developer-tool/ai-agent-memory/v3-expansion/`
- **Derived from:** ai-agent-memory staging governance and cluster classification work
- **Upstream URL:** not applicable as a synthesized local staging matrix
- **Freshness status:** canonical local staging matrix aligned to the current ai-agent-memory control plane

---

## Rule

This matrix does **not** make every module canonical.
It records their current staging role and expected future convergence path.

Use it only after:
1. `../README.md`
2. `../INVENTORY.md`
3. `../../references/ai-agent-memory/INDEX.md`
4. `INDEX.md`

If the canonical references already answer the question, stay out of the staged module pool.

---

## Module Status Matrix

| Module | Cluster | Current Status | Open It When | Likely Future Direction |
|---|---|---|---|---|
| `advanced-memory-skill-creator/` | Memory creation / shaping | staged creation toolset | you need to design or refine memory-oriented skill artifacts rather than answer ordinary recall questions | selective promotion into memory-creation references or remain as staging utility |
| `agent-memory-skills/` | Memory creation / shaping | staged skill-pack bundle | you need a high-level look at bundled memory-skill posture | likely partially absorbed into references, partly kept as bundle |
| `memory-systems/` | Memory creation / shaping | adapted memory-system module | you need implementation-flavored memory-system material beyond the canonical doctrine | selected pieces may promote into `references/ai-agent-memory/`; rest may remain staged |
| `memory-retrieval-learning/` | Memory creation / shaping | staged methodology pack | retrieval-learning method or evaluation logic is central | likely split into future evaluation/support refs |
| `cc-history/` | Session / history retrieval | staged retrieval utility | the canonical retrieval lane selected Claude Code session-history exploration | stays an operational retrieval utility; may gain tighter reference wrappers |
| `chat-history/` | Session / history retrieval | staged retrieval utility | exported or chat-style history extraction is the real task | stays retrieval support, not doctrine |
| `claude-code-history-files-finder/` | Session / history retrieval | staged recovery utility | deleted or overwritten file recovery from session traces is needed | stays operational utility with reference overlays |
| `code-history/` | Session / history retrieval | staged code-evolution utility | the real question is git/code evolution rather than chat history | stays support utility; doctrinal routing already lives in canonical refs |
| `history-insight/` | Session / history retrieval | staged summarization utility | session history exists but needs structured summarization | likely remains support utility behind retrieval doctrine |
| `remembering-conversations/` | Session / history retrieval | staged conversation-recall utility | the question is conversation recall rather than continuity or git evolution | likely remains support utility unless partially flattened |
| `cass-memory/` | Session / history retrieval | staged CASS-oriented support | indexed multi-session recall needs CASS-specific support behavior | likely tied to high-power retrieval support rather than flattened doctrine |
| `goodvibes-memory/` | Continuity / hygiene | staged support utility | schema/usage support and memory-usage hygiene are the real concern | some ideas may be absorbed into hygiene/continuity refs |
| `memory-hygiene/` | Continuity / hygiene | staged hygiene utility | memory cleanup, pruning, or hygiene discipline is central | likely future hygiene-focused canonical support docs |
| `memory-model/` | Continuity / hygiene | staged specialist reference utility | low-level memory-model concepts or specialist references are needed | likely remains niche support unless a clear doctrine lane emerges |
| `meta-cognition-parallel/` | Continuity / hygiene | staged meta-cognitive support module | parallel/meta-cognitive support patterns are directly relevant | uncertain; may stay staged longer due abstraction level |
| `coding_agent_session_search-main/` | Search substrate | heavy staged retrieval substrate | canonical retrieval doctrine explicitly requires indexed, cross-source, high-volume retrieval | should remain a substrate/runtime asset, not be flattened into a first-line doctrine lane |

---

## Interpretation Keys

### Current Status
- **staged creation toolset** -> useful for creating or reshaping artifacts, not default doctrine
- **staged retrieval utility** -> operational helper behind a canonical retrieval decision
- **staged hygiene utility** -> support module for cleanup/continuity maintenance tasks
- **heavy staged retrieval substrate** -> large indexed search substrate; keep behind doctrine routing

### Likely Future Direction
This is a governance forecast, not a promise.
It indicates which modules are more likely to:
- stay operational utilities
- be partially absorbed into canonical references
- remain staged because flattening would reduce clarity

---

## What This Matrix Prevents

This matrix exists to prevent:
- treating every staged module as equally important
- opening a support utility before choosing the correct canonical retrieval or continuity lane
- assuming a heavy substrate should be flattened just because it is large
- leaving module roles vague enough that future cleanup or promotion becomes guesswork

---

## Cross-Links

Read this alongside:
- `README.md`
- `README.zh-CN.md`
- `INDEX.md`
- `INDEX.zh-CN.md`
- `MEMORY_CREATION_SHAPING_CLUSTER.md`
- `SESSION_HISTORY_RETRIEVAL_CLUSTER.md`
- `CONTINUITY_HYGIENE_CLUSTER.md`
- `SEARCH_SUBSTRATE_CLUSTER.md`

- `../README.md`
- `../INVENTORY.md`
- `../../references/ai-agent-memory/INDEX.md`

---

## Final Doctrine

The reusable lesson is not:
> “these are the modules currently sitting inside v3-expansion.”

The reusable lesson is:
> “a staging layer becomes governable only when each preserved module has a declared current role, a clear opening condition, and an explicit likely convergence path—so future canonization or retention decisions stop being guesswork.”
