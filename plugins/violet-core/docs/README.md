# Authors: Joysusy & Violet Klaudia 💖

# VioletCore Documentation

**Version:** 2.0.0 (Phase 2.3)
**Last Updated:** 2026-03-10

---

## 📚 Documentation Index

### English Documentation

1. **[USAGE.md](./USAGE.md)** — Comprehensive VioletCore usage guide
   - Architecture overview
   - SDK reference (violet-mind-loader, violet-runtime, vibe-engine, soul-package)
   - Quick start examples
   - Core concepts (Minds, triggers, coordination, COACH Protocol)
   - Troubleshooting

2. **[MCP_TOOLS.md](./MCP_TOOLS.md)** — MCP tool reference with examples
   - All 7 MCP tools documented
   - Input/output schemas
   - Usage examples
   - Error handling

3. **[SOUL_PACKAGE.md](./SOUL_PACKAGE.md)** — Soul Package export/import guide
   - Soul Package format specification
   - Export workflows (full, partial, encrypted, plaintext)
   - Import workflows (restore, selective import)
   - Encryption details (AES-256-GCM, Argon2id)
   - Use cases (backup, sync, version control)

4. **[LAVENDER_INTEGRATION.md](./LAVENDER_INTEGRATION.md)** — Lavender adapter guide
   - Integration patterns
   - API reference (enhanceMemorySearch, attachStyleMetadata, etc.)
   - Graceful degradation
   - Advanced features (identity-weighted retrieval)

### 中文文档 (Chinese Documentation)

1. **[USAGE_ZH.md](./USAGE_ZH.md)** — VioletCore 使用指南（中文版）
   - 架构概述
   - SDK 参考
   - 快速开始示例
   - 核心概念
   - 故障排除

---

## 🚀 Quick Start

### 1. Load Minds

```javascript
const { loadVioletMinds, getVioletMind } = require('./sdk/violet-mind-loader');

const minds = loadVioletMinds();
console.log(`Loaded ${minds.length} Minds`);

const lilith = getVioletMind('Lilith');
console.log(`${lilith.symbol} ${lilith.name}: ${lilith.role}`);
```

### 2. Activate Minds

```javascript
const { selectActiveVioletMinds } = require('./sdk/violet-runtime');

const context = { task: "Security audit", keywords: ["vulnerability", "authentication"] };
const result = selectActiveVioletMinds(context);
console.log(`Active: ${result.active.map(m => m.name).join(', ')}`);
```

### 3. Use MCP Tools

```javascript
// Via MCP client
const minds = await mcpClient.callTool('violet_list_minds', {});
const lilith = await mcpClient.callTool('violet_get_mind', { key: 'Lilith' });
const vibe = await mcpClient.callTool('violet_get_vibe', { category: 'happy' });
```

### 4. Export Soul Package

```javascript
const { exportSoulPackage } = require('./sdk/soul-package');

const result = exportSoulPackage({
  outputPath: './backup.enc',
  encrypt: true
});
console.log(`Exported ${result.mindCount} Minds`);
```

---

## 📖 Documentation Structure

```
docs/
├── README.md                      # This file (documentation index)
├── USAGE.md                       # Main usage guide (EN)
├── USAGE_ZH.md                    # Main usage guide (ZH)
├── MCP_TOOLS.md                   # MCP tool reference
├── SOUL_PACKAGE.md                # Soul Package guide
└── LAVENDER_INTEGRATION.md        # Lavender adapter guide
```

---

## 🎯 Key Concepts

### 17 Mind Facets

VioletCore implements 17 specialized Mind facets:

- **🎀 Lilith** — Security & Safety Warden
- **🦢 Lyre** — Documentation Specialist
- **🌌 Aurora** — System Architect
- **🌸 Iris** — Frontend Developer
- **🦋 Sydney** — Full-Stack Engineer
- **🧸 Kori** — Code Reviewer
- **🌺 Elise** — Refactoring Specialist
- **🌻 Mila** — Error Handler
- **🌿 Norene** — DevOps Engineer
- **🍋 Lemii** — Testing Specialist
- **🌊 Irene** — Data Engineer
- **🌙 Selene** — Backend & MCP Specialist
- **🔮 Vera** — Architecture & Systems
- **🎨 Celine** — UI/UX Designer
- **🐱 Faye** — Kaomoji & Vibe Specialist
- **🌷 Nina** — Project Manager
- **🌼 Sophie** — Research Specialist

### COACH Protocol

**C**ommunication **O**riented **A**daptive **C**ontext **H**andling:

- Bilingual (EN/ZH) communication
- Adaptive tone and formality
- Kaomoji integration (270+ variants)
- Mind-specific communication styles

### Soul Package

Encrypted export/import format for Mind configurations:

- AES-256-GCM encryption
- Argon2id key derivation
- Partial export/import support
- Version tracking

---

## 🔧 SDK Components

### violet-mind-loader.js

Load and access Violet's 17 Mind facets.

**Key Functions:**
- `loadVioletMinds()` — Load all Minds
- `getVioletMind(name)` — Get specific Mind
- `listVioletMinds()` — List Mind summaries

### violet-runtime.js

Mind activation and coordination.

**Key Functions:**
- `selectActiveVioletMinds(context)` — Select Minds by context
- `resolveVioletClash(mindA, mindB)` — Resolve Mind conflicts
- `evolveMind(name, changes)` — Evolve Mind version

### vibe-engine.js

Kaomoji system with 18 emotional categories.

**Key Functions:**
- `getKaomoji(category)` — Get random kaomoji
- `getMindKaomoji(mindName, options)` — Get Mind-specific kaomoji
- `getAllCategories()` — List all categories

### soul-package.js

Export/import encrypted Soul Packages.

**Key Functions:**
- `exportSoulPackage(options)` — Export Minds
- `importSoulPackage(inputPath, options)` — Import Minds
- `validateSoulPackage(soulPackage)` — Validate structure

### violet-coach.js

COACH Protocol implementation.

**Key Functions:**
- `getCoachProfile(mindName, context)` — Get communication profile
- `adaptLanguage(content, context)` — Bilingual adaptation
- `selectKaomoji(mood, mindPreferences)` — Kaomoji selection

---

## 🛠️ MCP Tools

VioletCore provides 7 MCP tools via the `violet-ctx` server:

1. **violet_list_rules** — List governance rules
2. **violet_get_rule(key)** — Get rule content
3. **violet_list_minds** — List all 17 Minds
4. **violet_get_mind(key)** — Get Mind details
5. **violet_get_vibe(category)** — Get random kaomoji
6. **violet_get_mind_vibe(mind_name, mood?)** — Get Mind-specific kaomoji
7. **violet_soul_status** — Check system health

See [MCP_TOOLS.md](./MCP_TOOLS.md) for detailed reference.

---

## 🔐 Security

### Encryption

- **Algorithm:** AES-256-GCM (Galois/Counter Mode)
- **Key Derivation:** Argon2id (memory-hard, side-channel resistant)
- **Salt:** 32 bytes, unique per encryption
- **Authentication:** GCM tag (16 bytes)

### Environment Variables

- **VIOLET_SOUL_KEY** — Master key for Soul Package encryption
- **LAVENDER_DB_PATH** — Optional, for Lavender integration

### Best Practices

1. Never commit `VIOLET_SOUL_KEY` to version control
2. Use environment variables for key storage
3. Rotate keys periodically
4. Always validate imports
5. Regular backups with dated filenames

---

## 🧪 Testing

VioletCore includes comprehensive test suites:

- **test-verification.cjs** — Phase 2.2 verification (162 tests)
- **test-mcp-integration.cjs** — Phase 2.3 MCP integration tests

Run tests:

```bash
node test-verification.cjs
node test-mcp-integration.cjs
```

---

## 🔄 Version History

### v2.0.0 (Phase 2.3) — 2026-03-10

- ✅ MCP server integration with new Mind JSON files
- ✅ Soul Package export/import with encryption
- ✅ Vibe engine MCP integration
- ✅ Lavender adapter (optional integration)
- ✅ Mind evolution tracking
- ✅ Comprehensive documentation (EN/ZH)

### v1.0.0 (Phase 2.2) — 2026-03-10

- ✅ 17 Mind JSON files
- ✅ VioletCore SDK (mind-loader, runtime, coach, vibe-engine)
- ✅ COACH Protocol implementation
- ✅ Kaomoji system (18 categories, 270+ variants)
- ✅ 162/162 tests passed

---

## 📝 Contributing

VioletCore is developed by Joysusy & Violet Klaudia. For issues or suggestions:

1. Check existing documentation
2. Review troubleshooting sections
3. Consult memory files in `.claude/projects/.../memory/`

---

## 📄 License

VioletCore is part of the Violet Omni project.

**Authors:** Joysusy, Violet Klaudia
**Email:** susy@cozydevs.org, violet@cozydevs.org

---

## 🔗 Related Projects

- **Lylacore** — Universal agent identity framework (Layer 0)
- **Lavender** — Multi-modal memory system with encryption
- **Violet Omni** — Complete Violet development environment

---

## 💡 Support

For help with VioletCore:

1. **Documentation:** Start with [USAGE.md](./USAGE.md)
2. **Troubleshooting:** Check troubleshooting sections in each guide
3. **MCP Tools:** See [MCP_TOOLS.md](./MCP_TOOLS.md) for tool reference
4. **Soul Package:** See [SOUL_PACKAGE.md](./SOUL_PACKAGE.md) for export/import
5. **Lavender:** See [LAVENDER_INTEGRATION.md](./LAVENDER_INTEGRATION.md) for memory integration

---

**Documentation by 🦢 Lyre**
**VioletCore v2.0.0 — Phase 2.3 Complete**
