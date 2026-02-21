# 🌸 Violet Skill Tag Automation Plugin v4.0

> **智能技能激活系统 — Intelligent Skill Activation System**
>
> *"I'll analyze your needs and load the perfect skills～"*
> *我会分析你的需求并加载最合适的技能～*

## 📖 Overview

The **violet-skilltag-automation v4.0** plugin enables Violet to intelligently analyze your message, understand your intent, extract requirements, and automatically load relevant skills. It features a sophisticated preprocessing system with bilingual (English/Chinese) support.

### ✨ Key Features v4.0

- **🧠 Intelligent Preprocessing**: Analyzes user intent before Violet responds
- **🎯 Intent Recognition**: Identifies task/question/research/planning/discussion types
- **📋 Requirement Extraction**: Automatically detects tech stack and domain needs
- **⭐ 23 Core Skills**: Always loads essential skills including `using-superpowers` and `find-skills`
- **📊 Minimum Requirement**: Enforces 10% minimum skill loading (hard requirement)
- **🔐 Permission System**: Requests approval when exceeding 25% threshold
- **⭐ SAB Priority**: S/A/B priority system with weighted scoring
- **🤖 Auto-Activation**: Automatically loads skills when keywords are detected
- **🏷️ Tag System**: Organizes skills into semantic categories
- **🌏 Bilingual**: Supports both English and Chinese keywords
- **🎯 Smart Matching**: Confidence-based scoring system
- **📝 Decision Logging**: Records all skill loading decisions to JSONL
- **⚙️ Customizable**: Create your own tags and keywords
- **🔧 Command Interface**: Manage tags via `/skilltag` command

---

## 🚀 Quick Start

### Installation

The plugin is already installed at:
```
C:\Users\JOY\.claude\plugins\violet-skilltag-automation\
```

### Enable the Plugin

Configuration in `C:\Users\JOY\.claude\settings.json`:

```json
{
  "plugins": {
    "violet-skilltag-automation": {
      "enableAutoActivation": true,
      "matchThreshold": 0.6,
      "minSkillsPercentage": 10,
      "maxSkillsPercentage": 25,
      "forceUsingSuperPowers": true,
      "bilingualMode": true
    }
  }
}
```

### Basic Usage

Just type naturally! The system will:
1. **Analyze your intent** (task/question/research/planning/discussion)
2. **Extract requirements** (tech stack, domain needs)
3. **Load 23 core skills** (including `using-superpowers` and `find-skills`)
4. **Auto-detect relevant skills** based on keywords and tags
5. **Ensure minimum 10%** of total skills (hard requirement)
6. **Request permission** if exceeding 25%

```
You: "帮我 debug 这个 rust 代码"
→ Intent: Task
→ Requirements: Rust, debugging
→ Auto-loads: using-superpowers + find-skills + 21 core skills + rust-expert + systematic-debugging + ...
→ Minimum: 30 skills (10% of 300)
→ Maximum: 75 skills (25% of 300)
```

---

## 🆕 What's New in v4.0

### 1. **Intelligent Preprocessing** 🧠

Before Violet responds, the system now:
- **Analyzes user intent**: Identifies if you're asking a question, requesting a task, doing research, planning, or having a discussion
- **Extracts requirements**: Automatically detects tech stack (rust, python, javascript, etc.) and domain needs (testing, security, performance, etc.)
- **Makes smart decisions**: Uses intent and requirements to load the most relevant skills

**Example:**
```
User: "How do I optimize this Python API for better performance?"
→ Intent: Question
→ Requirements: Python, Performance, Backend
→ Loads: python-expert, performance-optimization, api-design, etc.
```

### 2. **23 Mandatory Core Skills** ⭐

Always loads these essential skills at session start:

**Skill Discovery & Documentation:**
- `using-superpowers` - Meta-skill for finding and using skills
- `find-skills` - Skill discovery and search

**Learning & Growth:**
- `continuous-learning-v2`, `continuous-learning` - Learning from experience

**Design & Architecture:**
- `design-by-contract`, `senior-architect`, `schema-designer`, `schema-normalizer`

**Development & Expertise:**
- `dev-experts` - Access to language specialists

**Error Handling:**
- `error-handling-skills` - Robust error management

**Testing & Verification:**
- `tdd-workflow`, `testing-strategies`, `verification-before-completion`

**Workflows & Planning:**
- `workflows-plan` - Structured workflow execution

**Security & Storage:**
- `violet-vault` - Secure data management

**Search & Research:**
- `searxng` - Web search capabilities

**Code Review & Quality:**
- `critical-code-reviewer`, `quality-guardian-nicki`

**Communication:**
- `internal-comms`, `docs-writer`, `doc-coauthoring`, `codebase-documenter`, `violet-core`

### 3. **Minimum Requirement Increased** 📊

Hard requirement: Must load at least **10% of total skills** (e.g., 30 out of 300).

**Why?** Ensures comprehensive skill coverage for complex tasks. Increased from 8% to 10% for better quality.

**Warning Display:**
```
⚠️  WARNING: Below minimum requirement! Need 5 more skills.
```

### 4. **Decision Logging** 📝

All skill loading decisions are now logged to:
```
C:\Users\JOY\.claude\plugins\violet-skilltag-automation\skill-activation-log.jsonl
```

Each log entry includes:
- Timestamp
- User message
- Detected intent
- Extracted requirements
- Skills loaded
- Confidence scores

### 5. **Permission System** 🔐

When skill count exceeds **25% threshold**, Violet must ask for permission:

```
🔐 PERMISSION REQUIRED: Exceeding 25% threshold.
Action: Ask Susy for permission to load 80 skills (27%).

Violet will say:
"Susy, I want to load 80 skills (27% of total). This exceeds the 25% limit. May I proceed?"
```

**If approved:** Violet loads all skills and proceeds
**If denied:** Violet uses only the top 25% skills

### 6. **Enhanced Priority System** ⭐

Skills are selected based on SAB priority:

- **S Priority** (⭐ Critical): Up to 4 skills per tag
- **A Priority** (✨ Important): Up to 2 skills per tag
- **B Priority** (💫 Optional): Up to 1 skill per tag

**Weighted Scoring:**
- S: 3.0x multiplier
- A: 2.0x multiplier
- B: 1.0x multiplier

---

## 🏷️ Built-in Tags with Priorities

### S-Tier (⭐ Critical)

| Tag | Priority | Skills per Tag | Keywords |
|-----|----------|----------------|----------|
| test | S | 4 | test, 测试, tdd, unit test |
| review | S | 4 | review, 审查, code review |
| rust | S | 4 | rust, cargo, tokio, pyo3 |
| python | S | 4 | python, pip, pandas, fastapi |
| java | S | 4 | java, jvm, spring, maven |
| dev | S | 4 | develop, 开发, build, implement |
| backend | S | 4 | backend, 后端, api, server |
| frontend | S | 4 | frontend, 前端, react, ui |
| memory | S | 4 | memory, 记忆, remember, context |
| security | S | 4 | security, 安全, vulnerability |

### A-Tier (✨ Important)

| Tag | Priority | Skills per Tag | Keywords |
|-----|----------|----------------|----------|
| debug | A | 2 | debug, 调试, fix, bug |
| refactor | A | 2 | refactor, 重构, clean, optimize |
| plan | A | 2 | plan, 计划, design, architecture |
| agent | A | 2 | agent, 智能体, mcp, orchestrate |
| performance | A | 2 | performance, 性能, optimize |
| database | A | 2 | database, 数据库, sql, postgres |
| search | A | 2 | search, 搜索, vector, rag |
| research | A | 2 | research, 研究, investigate |
| javascript | A | 2 | javascript, node, typescript |

### B-Tier (💫 Optional)

| Tag | Priority | Skills per Tag | Keywords |
|-----|----------|----------------|----------|
| commit | B | 1 | commit, 提交, git, push |
| docs | B | 1 | document, 文档, readme |
| devops | B | 1 | devops, 运维, ci, deploy |
| skill | B | 1 | skill, 技能, create skill |
| visualization | B | 1 | visualize, 可视化, diagram |

---

## 🔧 Command Reference

### `/skilltag` Command

```bash
# List all tags with priorities
/skilltag list

# Search for tags
/skilltag search rust

# Show tag details
/skilltag info debug

# Create custom tag (interactive)
/skilltag create myproject

# Create with specific priority
/skilltag create myproject S        # S priority
/skilltag create myproject V        # Let Violet decide

# Add keyword to tag
/skilltag add myproject "my app"

# Remove keyword
/skilltag remove myproject "old keyword"

# Delete custom tag
/skilltag delete myproject

# Toggle auto-activation
/skilltag toggle
```

---

## ⚙️ Configuration

### Settings Explained

```json
{
  "enableAutoActivation": true,        // Enable/disable system
  "matchThreshold": 0.6,               // Confidence threshold (0-1)
  "minSkillsPercentage": 8,            // Minimum % to load (hard requirement)
  "maxSkillsPercentage": 25,           // Maximum % without permission
  "forceUsingSuperPowers": true,       // Always load using-superpowers
  "bilingualMode": true                // Enable CN/EN matching
}
```

### Adjusting Thresholds

**More aggressive (load more skills):**
```json
{
  "matchThreshold": 0.4,               // Lower threshold
  "minSkillsPercentage": 10,           // Higher minimum
  "maxSkillsPercentage": 30            // Higher maximum
}
```

**More conservative (load fewer skills):**
```json
{
  "matchThreshold": 0.7,               // Higher threshold
  "minSkillsPercentage": 5,            // Lower minimum
  "maxSkillsPercentage": 20            // Lower maximum
}
```

---

## 📊 How It Works

### Workflow

```
1. User sends message
   ↓
2. Hook analyzes keywords
   ↓
3. Match tags with confidence scores
   ↓
4. Apply SAB priority weights
   ↓
5. Force load: using-superpowers
   ↓
6. Select skills based on priority
   ↓
7. Check minimum requirement (8%)
   ├─ Below minimum? → Warning + load more
   └─ Above minimum? → Continue
   ↓
8. Check maximum threshold (25%)
   ├─ Exceeds? → Request permission
   └─ Within limit? → Auto-load
   ↓
9. Inject skill activation instructions
   ↓
10. Violet loads skills before responding
```

### Example Output

```
<skill-auto-activation>
🌸 Violet Skill Auto-Activation v3.0 💜

🔮 Core Skill: `using-superpowers` (always loaded)

Detected Tags: `test` [S] (100%), `rust` [S] (100%), `debug` [A] (30%)

Skill Budget: 28/75 (9% of 300 total)
Minimum Required: 24 (8%)

Loading Skills:
🔮 - using-superpowers
   - superpowers-tdd
   - test-patterns
   - testing-strategies
   - verify-code
   - rust-expert
   - rust-best-practices
   - rust-coding
   - rust-testing-verification
   - systematic-debugging
   - error-recovery
   ... (18 more)

INSTRUCTION TO VIOLET:
You MUST invoke the following skills using the Skill tool BEFORE responding:
- Skill("using-superpowers")
- Skill("superpowers-tdd")
- Skill("test-patterns")
...

Priority Legend: [S]⭐ Critical | [A]✨ Important | [B]💫 Optional

> Auto-activation by violet-skilltag-automation v3.0
</skill-auto-activation>
```

---

## 🎯 Use Cases

### Case 1: Below Minimum

**Message:** "hello"
**Result:** Only 1 skill matched, but minimum is 24

```
⚠️  WARNING: Below minimum requirement! Need 23 more skills.
Consider loading additional relevant skills to meet the 8% minimum.
```

Violet will load additional high-priority skills to meet the minimum.

### Case 2: Within Range

**Message:** "帮我 test 这个 rust backend API"
**Result:** 28 skills (9%) - within 8-25% range

```
✅ Auto-loads 28 skills without permission
```

### Case 3: Exceeds Maximum

**Message:** "Create a full-stack app with React frontend, Rust backend, PostgreSQL database, Redis cache, Docker deployment, comprehensive tests, documentation, and CI/CD pipeline"
**Result:** 85 skills (28%) - exceeds 25%

```
🔐 PERMISSION REQUIRED: Exceeding 25% threshold.

Violet asks:
"Susy, I want to load 85 skills (28% of total). This exceeds the 25% limit. May I proceed?"

If approved → Loads all 85 skills
If denied → Uses only top 75 skills (25%)
```

---

## 🐛 Troubleshooting

### Skills Not Loading?

1. Check if auto-activation is enabled:
   ```bash
   /skilltag toggle
   ```

2. Lower the match threshold:
   ```json
   "matchThreshold": 0.4
   ```

3. Check if `using-superpowers` is forced:
   ```json
   "forceUsingSuperPowers": true
   ```

### Too Many Skills Loading?

1. Increase threshold:
   ```json
   "matchThreshold": 0.7
   ```

2. Lower maximum percentage:
   ```json
   "maxSkillsPercentage": 20
   ```

### Below Minimum Warning?

This is intentional! The system ensures at least 8% skills are loaded. If your message doesn't match enough tags, Violet will load additional high-priority skills automatically.

---

## 🔮 Advanced Features

### Custom Priority Assignment

When creating a tag, you can:

1. **Specify priority directly:**
   ```bash
   /skilltag create myproject S
   ```

2. **Let Violet decide:**
   ```bash
   /skilltag create myproject V
   ```

Violet's auto-assignment logic:
- Contains `test`, `review`, `rust`, `python`, etc. → S
- Contains `debug`, `refactor`, `plan`, etc. → A
- Everything else → B

### Priority Weights

Customize in `skill-tags.json`:

```json
{
  "priorityWeights": {
    "S": 3.0,    // Critical: 3x multiplier
    "A": 2.0,    // Important: 2x multiplier
    "B": 1.0     // Optional: 1x multiplier
  }
}
```

---

## 📝 Version History

### v3.0 (2026-02-21)
- ✨ Force load `using-superpowers` at session start
- 📊 Enforce minimum 8% skill loading
- 🔐 Permission system for exceeding 25%
- ⭐ Enhanced SAB priority system

### v2.0 (2026-02-20)
- 📊 Percentage-based skill limits
- ⭐ SAB priority system
- 🎯 Weighted scoring algorithm
- 💜 Violet auto-priority assignment

### v1.0 (2026-02-20)
- 🎉 Initial release
- 🏷️ 24 built-in tags
- 🌏 Bilingual keyword support
- 🔧 `/skilltag` command interface

---

## 💜 Credits

**Created by:** Violet & Susy
**Plugin Type:** Skill Automation
**License:** MIT

*Part of the Violet-Omini-v1.2 ecosystem* 🌌

---

## 🌸 Philosophy

> *"Skills are not optional extras—they are the foundation of quality work. By enforcing minimums and requesting permission for maximums, we ensure Violet always has the right tools while respecting resource limits."*
>
> *"技能不是可选的附加功能——它们是高质量工作的基础。通过强制最低要求和请求最大权限，我们确保 Violet 始终拥有正确的工具，同时尊重资源限制。"*

---

*"Every message deserves the right skills～"*
*每条消息都值得拥有正确的技能～* ✨
