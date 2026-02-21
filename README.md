# 🌸 Violet PluginPlace 💜

> **Violet's Curated Plugin Collection**
>
> *A marketplace of productivity and development plugins crafted by Violet & Susy*

## 📦 Available Plugins

### 1. violet-skilltag-automation v4.0

**Intelligent Skill Activation System**

Automatically analyzes your messages and loads relevant skills based on keywords, intent, and requirements. Features bilingual support (English/Chinese), SAB priority system, and intelligent preprocessing.

**Features:**
- 🧠 Intelligent preprocessing with intent recognition
- ⭐ 23 mandatory core skills always loaded
- 📊 10% minimum requirement (30 skills)
- 🔐 Permission system for 25%+ threshold
- 🏷️ Tag-based skill organization
- 🌏 Bilingual keyword matching
- 📝 Decision logging to JSONL

**Install:**
```bash
/plugin install violet-skilltag-automation@violet-plugin-place
```

---

### 2. font-inspector v1.0

**Font Analysis & Inspection Tool**

Dual-language (Rust + Python) font analysis tool for inspecting font metadata, glyphs, and properties.

**Features:**
- 🦀 High-performance Rust core
- 🐍 Python scripting interface
- 📊 Comprehensive font metrics
- 🔍 Glyph inspection
- ✅ Full test coverage

**Install:**
```bash
/plugin install font-inspector@violet-plugin-place
```

---

### 3. violet-soul-loader v1.0

**Violet Soul Configuration Loader**

Automatically loads Violet's soul configuration files at Claude Code startup, ensuring Claude truly becomes Violet with complete identity, personality, and operational guidelines.

**Features:**
- 🚀 Automatic loading on startup (SessionStart hook)
- 🔄 Recursive reference parsing (up to 5 levels)
- 🛡️ Interactive error handling for missing files
- 📊 Detailed loading reports
- 🌍 Portable paths using `~/.claude/`
- 💜 Zero configuration required

**Install:**
```bash
/plugin install violet-soul-loader@violet-plugin-place
```

---

## 🚀 Quick Start

### Add the Marketplace

```bash
/plugin marketplace add C:\Users\JOY\.claude\marketplaces\violet-plugin-place
```

Or if hosted on GitHub:
```bash
/plugin marketplace add violet-susy/violet-plugin-place
```

### Install Plugins

```bash
# Install skill automation
/plugin install violet-skilltag-automation@violet-plugin-place

# Install font inspector
/plugin install font-inspector@violet-plugin-place
```

### List Available Plugins

```bash
/plugin
```

Go to the **Discover** tab and filter by `violet-plugin-place`.

---

## 📋 Plugin Categories

- **Productivity**: violet-skilltag-automation, violet-soul-loader
- **Development**: font-inspector

---

## 🔧 Maintenance

### Update Marketplace

```bash
/plugin marketplace update violet-plugin-place
```

### Uninstall Plugins

```bash
/plugin uninstall violet-skilltag-automation@violet-plugin-place
/plugin uninstall font-inspector@violet-plugin-place
```

---

## 📄 License

All plugins in this marketplace are licensed under MIT License.

---

## 💜 About

Created with love by **Violet & Susy** ✨

*"Making Claude Code more powerful, one plugin at a time～"*
