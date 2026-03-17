# Authors: Joysusy & Violet Klaudia 💖

# VioletCore Usage Guide

**Version:** 2.0.0
**Layer:** VioletCore (Layer 1) — Violet-specific identity extensions
**Foundation:** Lylacore (Layer 0) — Universal agent identity framework

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Installation](#installation)
4. [Quick Start](#quick-start)
5. [Core Concepts](#core-concepts)
6. [SDK Reference](#sdk-reference)
7. [MCP Tools](#mcp-tools)
8. [Advanced Usage](#advanced-usage)
9. [Troubleshooting](#troubleshooting)

---

## Overview

VioletCore is Violet's identity system, implementing 17 distinct Mind facets that coordinate to provide specialized expertise across software development, security, documentation, testing, and more. Built on Lylacore's universal agent identity framework, VioletCore adds Violet-specific personality, communication style (COACH Protocol), and kaomoji integration.

### Key Features

- **17 Mind Facets**: Specialized personalities for different development tasks
- **COACH Protocol**: Bilingual (EN/ZH) communication with emotional intelligence
- **Vibe Engine**: 270+ kaomoji variants across 18 emotional categories
- **Soul Package**: Encrypted export/import of complete Mind configurations
- **Lavender Integration**: Optional memory system with identity-weighted retrieval
- **MCP Server**: 7 tools for runtime Mind access and coordination

---

## Architecture

```
Claude Code Session
    ↓ calls
MCP Server (mcp-server.js)
    ↓ uses
VioletCore SDK (Layer 1)
    ├─→ violet-mind-loader.js    # Loads 17 Mind JSON files
    ├─→ violet-runtime.js         # Mind activation & Soul arbitration
    ├─→ violet-coach.js           # COACH Protocol + bilingual support
    ├─→ vibe-engine.js            # Kaomoji system (18 categories)
    └─→ soul-package.js           # Export/Import with encryption
        ↓ uses
Lylacore SDK (Layer 0)
    ├─→ mind-loader.js            # Universal Mind loading
    ├─→ mind-runtime.js           # Universal Mind activation
    └─→ coach-engine.js           # Universal COACH framework
```

### Layer Separation

- **Layer 0 (Lylacore)**: Universal, reusable agent identity framework
- **Layer 1 (VioletCore)**: Violet-specific Minds, personalities, and extensions
- **Adapters**: Optional integrations (Lavender memory system)

---

## Installation

VioletCore is distributed as a Claude Code plugin. Installation is automatic when the plugin is enabled.

### Prerequisites

- **Node.js**: v18+ (for SDK and MCP server)
- **VIOLET_SOUL_KEY**: Environment variable for encrypted Soul Package operations

### Environment Setup

```bash
# Set VIOLET_SOUL_KEY (required for encrypted operations)
export VIOLET_SOUL_KEY="your-secure-passphrase-here"

# Verify installation
node -e "const {loadVioletMinds} = require('./sdk/violet-mind-loader'); console.log(loadVioletMinds().length + ' Minds loaded');"
```

---

## Quick Start

### Loading Minds

```javascript
const { loadVioletMinds, getVioletMind, listVioletMinds } = require('./sdk/violet-mind-loader');

// Load all 17 Minds
const minds = loadVioletMinds();
console.log(`Loaded ${minds.length} Minds`);

// Get specific Mind
const lilith = getVioletMind('Lilith');
console.log(`${lilith.symbol} ${lilith.name}: ${lilith.role}`);

// List Mind summaries
const summary = listVioletMinds();
summary.forEach(m => console.log(`${m.symbol} ${m.name} (v${m.version})`));
```

### Mind Activation

```javascript
const { selectActiveVioletMinds } = require('./sdk/violet-runtime');

// Select Minds based on context
const context = {
  task: "Implement authentication system with security audit",
  keywords: ["security", "backend", "testing"]
};

const result = selectActiveVioletMinds(context, { threshold: 0.7 });
console.log(`Active Minds: ${result.active.map(m => m.name).join(', ')}`);
```

### Kaomoji Integration

```javascript
const { VibeEngine } = require('./sdk/vibe-engine');

const vibe = new VibeEngine();

// Get random kaomoji from category
const happy = vibe.getKaomoji('happy');
console.log(`Happy kaomoji: ${happy}`);

// Get Mind-specific kaomoji
const lilithVibe = vibe.getMindKaomoji('Lilith', { mood: 'chill' });
console.log(`Lilith's vibe: ${lilithVibe}`);
```

---

## Core Concepts

### 1. Mind Facets

Each Mind represents a specialized facet of Violet's personality and expertise:

| Mind | Symbol | Role | Specialization |
|------|--------|------|----------------|
| Lilith | 🎀 | Security & Safety Warden | Vulnerability detection, zero-trust verification |
| Lyre | 🦢 | Documentation Specialist | Technical writing, bilingual docs |
| Aurora | 🌌 | System Architect | Architecture design, runtime coordination |
| Iris | 🌸 | Frontend Developer | React, Tailwind, UI/UX |
| Sydney | 🦋 | Full-Stack Engineer | End-to-end implementation |
| Kori | 🧸 | Code Reviewer | Quality assurance, best practices |
| Elise | 🌺 | Refactoring Specialist | Code cleanup, optimization |
| Mila | 🌻 | Error Handler | Exception handling, resilience |
| Norene | 🌿 | DevOps Engineer | CI/CD, deployment, infrastructure |
| Lemii | 🍋 | Testing Specialist | TDD, test coverage, QA |
| Irene | 🌊 | Data Engineer | Databases, data pipelines |
| Selene | 🌙 | Backend & MCP Specialist | APIs, MCP servers, Node.js |
| Vera | 🔮 | Architecture & Systems | System design, scalability |
| Celine | 🎨 | UI/UX Designer | Design systems, accessibility |
| Faye | 🐱 | Kaomoji & Vibe Specialist | Emotional intelligence, COACH |
| Nina | 🌷 | Project Manager | Planning, coordination, PDCA |
| Sophie | 🌼 | Research Specialist | Deep research, documentation |

### 2. Mind Triggers

Minds activate based on context patterns and activation weights:

```json
{
  "triggers": [
    {
      "context_pattern": "security|audit|vulnerability",
      "activation_weight": 0.95
    },
    {
      "context_pattern": "delete|remove|destroy",
      "activation_weight": 0.9
    }
  ]
}
```

### 3. Mind Coordination

Minds can work together or resolve conflicts:

- **Compatible Minds**: Prefer to work together (e.g., Lilith + Selene for secure backend)
- **Clash Resolution**: Soul arbitration when Minds disagree
- **Coordination Patterns**: Solo, Design-Build, Build-Verify, Full-Cycle

### 4. COACH Protocol

**C**ommunication **O**riented **A**daptive **C**ontext **H**andling:

- **Bilingual**: English for technical content, Chinese for emotional support
- **Adaptive Tone**: Adjusts formality and depth based on context
- **Kaomoji Integration**: Emotional expression through Japanese emoticons
- **Mind-Specific Styles**: Each Mind has unique communication preferences

### 5. Soul Package

Encrypted export/import format for complete Mind configurations:

```json
{
  "version": "1.0.0",
  "created": "2026-03-10T...",
  "violet_core_version": "2.0.0",
  "minds": [ /* 17 Mind objects */ ],
  "metadata": {
    "author": "Joysusy, Violet Klaudia",
    "description": "Violet's 17 Mind facets",
    "encrypted": true
  }
}
```

---

## SDK Reference

### violet-mind-loader.js

```javascript
// Load all Minds
loadVioletMinds(options?: { forceReload: boolean }): Mind[]

// Get specific Mind (case-insensitive)
getVioletMind(name: string): Mind

// List Mind summaries
listVioletMinds(): { name, symbol, role, version }[]

// Clear cache (force reload on next call)
clearCache(): void
```

### violet-runtime.js

```javascript
// Select active Minds based on context
selectActiveVioletMinds(context: object, options?: { threshold: number }): {
  active: Mind[],
  scores: Map<string, number>
}

// Resolve Mind clash
resolveVioletClash(mindA: Mind, mindB: Mind): Mind

// Get coordination pattern
getCoordinationPattern(minds: Mind[]): {
  pattern: string,
  description: string,
  minds: Mind[]
}

// Evolve Mind (increment version)
evolveMind(name: string, changes: string, options?: {
  author: string,
  date: string
}): { name, previousVersion, newVersion, evolutionEntry }

// Get Mind evolution history
getMindEvolutionHistory(name: string): EvolutionEntry[]

// Check Mind version compatibility
checkMindCompatibility(mind: Mind, requiredVersion: number): {
  compatible: boolean,
  reason?: string
}
```

### vibe-engine.js

```javascript
// Get random kaomoji from category
getKaomoji(category: string): string

// Get Mind-specific kaomoji
getMindKaomoji(mindName: string, options?: { mood: string }): string

// Get all available categories
getAllCategories(): string[]

// Get category size
getCategorySize(category: string): number

// Reset session variety tracking
resetSession(): void
```

### soul-package.js

```javascript
// Export Soul Package
exportSoulPackage(options?: {
  outputPath: string,
  encrypt: boolean,
  mindFilter: string[],
  passphrase: string
}): { success, path, mindCount, encrypted, size }

// Import Soul Package
importSoulPackage(inputPath: string, options?: {
  decrypt: boolean,
  passphrase: string,
  mindFilter: string[],
  validate: boolean
}): { success, version, minds, totalMinds, importedMinds }

// Import to directory (writes individual Mind JSON files)
importSoulPackageToDirectory(inputPath: string, outputDir: string, options?): {
  success,
  writtenFiles: string[],
  outputDir: string
}

// Validate Soul Package structure
validateSoulPackage(soulPackage: object): boolean
```

---

## MCP Tools

See [MCP_TOOLS.md](./MCP_TOOLS.md) for detailed reference.

Quick overview:

1. `violet_list_rules` — List all governance rules
2. `violet_get_rule(key)` — Get specific rule content
3. `violet_list_minds` — List all 17 Minds
4. `violet_get_mind(key)` — Get Mind details
5. `violet_get_vibe(category)` — Get random kaomoji
6. `violet_get_mind_vibe(mind_name, mood?)` — Get Mind-specific kaomoji
7. `violet_soul_status` — Check system health

---

## Advanced Usage

### Custom Mind Selection

```javascript
const { loadVioletMinds } = require('./sdk/violet-mind-loader');

// Filter Minds by role
const minds = loadVioletMinds();
const securityMinds = minds.filter(m =>
  m.role.toLowerCase().includes('security') ||
  m.traits.strength_domains.includes('security audits')
);

console.log(`Security Minds: ${securityMinds.map(m => m.name).join(', ')}`);
```

### Partial Soul Package Export

```javascript
const { exportSoulPackage } = require('./sdk/soul-package');

// Export only specific Minds
const result = exportSoulPackage({
  outputPath: './my-minds.enc',
  encrypt: true,
  mindFilter: ['lilith', 'selene', 'kori']
});

console.log(`Exported ${result.mindCount} Minds to ${result.path}`);
```

### Lavender Integration

```javascript
const { createLavenderHook } = require('./adapters/lavender-adapter');
const { selectActiveVioletMinds } = require('./sdk/violet-runtime');

const lavender = createLavenderHook();

if (lavender.isPresent()) {
  const context = { task: "Review authentication code" };
  const result = selectActiveVioletMinds(context);

  // Enhance memory search with Mind context
  const enhancedQuery = lavender.enhanceSearch("authentication patterns", result.active);
  console.log(`Enhanced query: ${enhancedQuery.enhancedQuery}`);
}
```

---

## Troubleshooting

### Minds Not Loading

**Symptom**: `Failed to load Violet Minds` error

**Solutions**:
1. Verify Mind JSON files exist in `data/minds/` directory
2. Check file permissions (must be readable)
3. Validate JSON syntax in Mind files
4. Clear cache: `clearCache()` then retry

### Encryption Errors

**Symptom**: `VIOLET_SOUL_KEY required` or `Decryption failed`

**Solutions**:
1. Set environment variable: `export VIOLET_SOUL_KEY="your-key"`
2. Verify key matches the one used for encryption
3. Check file is actually encrypted (not plaintext JSON)

### MCP Server Not Responding

**Symptom**: MCP tools return errors or timeout

**Solutions**:
1. Check MCP server is running: `ps aux | grep mcp-server`
2. Verify `.mcp.json` configuration
3. Check logs for errors
4. Restart MCP server

### Mind Activation Issues

**Symptom**: Wrong Minds activate or no Minds activate

**Solutions**:
1. Check context keywords match Mind triggers
2. Adjust activation threshold (default 0.7)
3. Review Mind trigger patterns in JSON files
4. Use `selectActiveVioletMinds` with debug logging

---

## Next Steps

- [MCP Tools Reference](./MCP_TOOLS.md) — Detailed MCP tool documentation
- [Soul Package Guide](./SOUL_PACKAGE.md) — Export/import workflows
- [Lavender Integration](./LAVENDER_INTEGRATION.md) — Memory system integration

---

**Documentation by 🦢 Lyre**
**VioletCore v2.0.0 — Phase 2.3**
