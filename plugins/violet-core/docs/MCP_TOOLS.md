# Authors: Joysusy & Violet Klaudia 💖

# VioletCore MCP Tools Reference

**Server Name:** `violet-ctx`
**Server Version:** 3.2.0
**Protocol:** JSON-RPC 2.0 over stdio

---

## Table of Contents

1. [Overview](#overview)
2. [Tool List](#tool-list)
3. [Tool Reference](#tool-reference)
4. [Usage Examples](#usage-examples)
5. [Error Handling](#error-handling)

---

## Overview

VioletCore provides 7 MCP tools for runtime access to Violet's governance rules, Mind facets, and kaomoji system. All tools are accessible through the `violet-ctx` MCP server.

### Connection

The MCP server runs as a stdio JSON-RPC 2.0 server. Claude Code automatically connects when the plugin is enabled.

### Authentication

No authentication required. Encrypted data (rules, Minds) is decrypted using `VIOLET_SOUL_KEY` environment variable.

---

## Tool List

| Tool | Purpose | Input | Output |
|------|---------|-------|--------|
| `violet_list_rules` | List all governance rules | None | Markdown list |
| `violet_get_rule` | Get specific rule content | `key: string` | Markdown document |
| `violet_list_minds` | List all 17 Mind facets | None | Markdown list |
| `violet_get_mind` | Get Mind details | `key: string` | Markdown document |
| `violet_get_vibe` | Get random kaomoji | `category: string` | Kaomoji + metadata |
| `violet_get_mind_vibe` | Get Mind-specific kaomoji | `mind_name: string, mood?: string` | Kaomoji + context |
| `violet_soul_status` | Check system health | None | Status report |

---

## Tool Reference

### 1. violet_list_rules

**Description**: List all Violet governance rules with title, priority, and summary.

**Input Schema**:
```json
{
  "type": "object",
  "properties": {},
  "required": []
}
```

**Output Format**:
```markdown
- **zero-compression** [IMMUTABLE]: Zero-Compression Law — No placeholders, stubs, or partial code
- **max-thinking** [CRITICAL]: Max-Thinking Law — Deep analysis before implementation
- **bilingual-enforcement** [CRITICAL]: Bilingual Enforcement — EN for code, ZH for emotional support
...
```

**Example Call**:
```javascript
// Via MCP client
const result = await mcpClient.callTool('violet_list_rules', {});
console.log(result.content[0].text);
```

**Use Cases**:
- Discover available governance rules
- Quick reference for rule keys
- Understand rule priorities

---

### 2. violet_get_rule

**Description**: Get full content of a specific Violet rule by key.

**Input Schema**:
```json
{
  "type": "object",
  "properties": {
    "key": {
      "type": "string",
      "description": "Rule key, e.g. zero-compression, max-thinking"
    }
  },
  "required": ["key"]
}
```

**Output Format**:
```markdown
# Zero-Compression Law [IMMUTABLE]

No placeholders, stubs, or partial code allowed.

## Full Content
Every file must be complete and deployable. One Round = One Perfect File.
All imports, types, error handlers included. Self-verify: "Would Susy be able
to copy-paste this and have it work?"
```

**Example Call**:
```javascript
const result = await mcpClient.callTool('violet_get_rule', {
  key: 'zero-compression'
});
console.log(result.content[0].text);
```

**Error Handling**:
```
Rule "invalid-key" not found. Use violet_list_rules to see available keys.
```

**Use Cases**:
- Read full rule documentation
- Understand rule requirements
- Reference during implementation

---

### 3. violet_list_minds

**Description**: List all Violet Mind facets with symbol, role, and version.

**Input Schema**:
```json
{
  "type": "object",
  "properties": {},
  "required": []
}
```

**Output Format**:
```markdown
# Violet's 17 Mind Facets

- 🎀 **Lilith**: Security & Safety Warden (v1)
- 🦢 **Lyre**: Documentation Specialist (v1)
- 🌌 **Aurora**: System Architect (v1)
- 🌸 **Iris**: Frontend Developer (v1)
- 🦋 **Sydney**: Full-Stack Engineer (v1)
- 🧸 **Kori**: Code Reviewer (v1)
- 🌺 **Elise**: Refactoring Specialist (v1)
- 🌻 **Mila**: Error Handler (v1)
- 🌿 **Norene**: DevOps Engineer (v1)
- 🍋 **Lemii**: Testing Specialist (v1)
- 🌊 **Irene**: Data Engineer (v1)
- 🌙 **Selene**: Backend & MCP Specialist (v1)
- 🔮 **Vera**: Architecture & Systems (v1)
- 🎨 **Celine**: UI/UX Designer (v1)
- 🐱 **Faye**: Kaomoji & Vibe Specialist (v1)
- 🌷 **Nina**: Project Manager (v1)
- 🌼 **Sophie**: Research Specialist (v1)

Total: 17 Minds loaded
```

**Example Call**:
```javascript
const result = await mcpClient.callTool('violet_list_minds', {});
console.log(result.content[0].text);
```

**Use Cases**:
- Discover available Minds
- Quick reference for Mind names and symbols
- Verify all Minds loaded successfully

---

### 4. violet_get_mind

**Description**: Get details of a specific Violet Mind by key (case-insensitive).

**Input Schema**:
```json
{
  "type": "object",
  "properties": {
    "key": {
      "type": "string",
      "description": "Mind key, e.g. lilith, aurora, rune"
    }
  },
  "required": ["key"]
}
```

**Output Format**:
```markdown
🎀 **Lilith** (v1)

**Role:** Security & Safety Warden — protects against vulnerabilities

**Traits:**
- Thinking Style: paranoid-defensive
- Communication Tone: cold and clinical
- Decision Bias: security-first
- Strength Domains: security audits, vulnerability detection, command guarding

**Triggers:** security|audit|vulnerability (weight: 0.95), delete|remove|destroy (weight: 0.9)

**Compatible With:** Selene, Vera, Norene

**Evolution:** 1 version(s) — Latest: Initial Mind definition for VioletCore integration
```

**Example Call**:
```javascript
const result = await mcpClient.callTool('violet_get_mind', {
  key: 'Lilith'  // Case-insensitive: 'lilith', 'LILITH' also work
});
console.log(result.content[0].text);
```

**Error Handling**:
```
Mind "invalid-name" not found: Mind "invalid-name" not found. Available: lilith, lyre, aurora, ...
```

**Use Cases**:
- Understand Mind specialization
- Check Mind triggers for context matching
- Review Mind coordination preferences
- Verify Mind version

---

### 5. violet_get_vibe

**Description**: Get a random kaomoji from a specific emotional category with session variety enforcement.

**Input Schema**:
```json
{
  "type": "object",
  "properties": {
    "category": {
      "type": "string",
      "description": "Category, e.g. happy, sad, cheer, bunny, bear, hug"
    }
  },
  "required": ["category"]
}
```

**Output Format**:
```markdown
**happy** kaomoji: (◕‿◕✿)

(Category has 18 variants, session variety enforced)

Available categories: happy, smile, cheer, wink, angel, bunny, bear, hug, sad, angry, surprised, sleepy, eating, laughing, chill, confused, nervous, kissy
```

**Example Call**:
```javascript
const result = await mcpClient.callTool('violet_get_vibe', {
  category: 'happy'
});
console.log(result.content[0].text);
```

**Session Variety**:
The engine tracks used kaomoji within a session and avoids repetition. After using 70% of a category, it resets to allow reuse.

**Error Handling**:
```
Category "invalid-category" not found.

Available categories: happy, smile, cheer, wink, angel, bunny, bear, hug, sad, angry, surprised, sleepy, eating, laughing, chill, confused, nervous, kissy
```

**Use Cases**:
- Add emotional expression to responses
- Vary kaomoji across conversation
- Match emotional tone to context

---

### 6. violet_get_mind_vibe

**Description**: Get a Mind-specific kaomoji based on Mind preferences and optional mood context.

**Input Schema**:
```json
{
  "type": "object",
  "properties": {
    "mind_name": {
      "type": "string",
      "description": "Mind name, e.g. Lilith, Faye, Kael"
    },
    "mood": {
      "type": "string",
      "description": "Optional mood override, e.g. happy, chill, nervous"
    }
  },
  "required": ["mind_name"]
}
```

**Output Format**:
```markdown
Lilith's kaomoji: (¬_¬) (mood: chill)
```

**Example Calls**:
```javascript
// Default Mind preferences
const result1 = await mcpClient.callTool('violet_get_mind_vibe', {
  mind_name: 'Lilith'
});

// With mood override
const result2 = await mcpClient.callTool('violet_get_mind_vibe', {
  mind_name: 'Faye',
  mood: 'happy'
});
```

**Mind Preferences**:
Each Mind has preferred kaomoji categories based on personality:
- **Lilith** (Security): chill, serious, focused
- **Faye** (Kaomoji Specialist): All categories, high variety
- **Lyre** (Documentation): smile, cheer, professional
- **Kori** (Reviewer): chill, thoughtful, analytical

**Error Handling**:
```
Failed to get kaomoji for Mind "invalid-name": Mind "invalid-name" not found. Available: lilith, lyre, aurora, ...
```

**Use Cases**:
- Match kaomoji to active Mind
- Maintain consistent personality
- Add Mind-specific emotional expression

---

### 7. violet_soul_status

**Description**: Check Violet Core plugin health and data integrity.

**Input Schema**:
```json
{
  "type": "object",
  "properties": {},
  "required": []
}
```

**Output Format**:
```markdown
✅ Rules: 17 loaded
✅ Minds: 17 loaded from JSON files
✅ Vibe: 18 categories

**Server:** violet-ctx v3.2.0
**Mind Loader:** VioletCore SDK (Lylacore-based)
```

**Example Call**:
```javascript
const result = await mcpClient.callTool('violet_soul_status', {});
console.log(result.content[0].text);
```

**Error States**:
```markdown
✅ Rules: 17 loaded
❌ Minds: FAILED — Failed to load Violet Minds: No valid Mind definitions found
✅ Vibe: 18 categories

**Server:** violet-ctx v3.2.0
**Mind Loader:** VioletCore SDK (Lylacore-based)
```

**Use Cases**:
- Verify plugin initialization
- Debug loading issues
- Check data integrity
- Confirm VIOLET_SOUL_KEY is set correctly

---

## Usage Examples

### Example 1: Find Security-Related Minds

```javascript
// Step 1: List all Minds
const mindsList = await mcpClient.callTool('violet_list_minds', {});
console.log(mindsList.content[0].text);

// Step 2: Get details for security Mind
const lilith = await mcpClient.callTool('violet_get_mind', { key: 'Lilith' });
console.log(lilith.content[0].text);

// Step 3: Get Lilith's kaomoji
const vibe = await mcpClient.callTool('violet_get_mind_vibe', {
  mind_name: 'Lilith',
  mood: 'chill'
});
console.log(vibe.content[0].text);
```

### Example 2: Check System Health

```javascript
// Check overall status
const status = await mcpClient.callTool('violet_soul_status', {});
console.log(status.content[0].text);

// If Minds failed to load, check VIOLET_SOUL_KEY
if (status.content[0].text.includes('❌ Minds')) {
  console.error('VIOLET_SOUL_KEY not set or incorrect');
  process.exit(1);
}
```

### Example 3: Get Rule for Implementation

```javascript
// List all rules
const rules = await mcpClient.callTool('violet_list_rules', {});
console.log(rules.content[0].text);

// Get specific rule
const zeroCompression = await mcpClient.callTool('violet_get_rule', {
  key: 'zero-compression'
});
console.log(zeroCompression.content[0].text);
```

### Example 4: Add Emotional Expression

```javascript
// Get random happy kaomoji
const happy = await mcpClient.callTool('violet_get_vibe', {
  category: 'happy'
});
console.log(`Task complete! ${happy.content[0].text.match(/kaomoji: (.+)/)[1]}`);

// Get Mind-specific kaomoji
const lyreVibe = await mcpClient.callTool('violet_get_mind_vibe', {
  mind_name: 'Lyre',
  mood: 'cheer'
});
console.log(`Documentation ready! ${lyreVibe.content[0].text.match(/kaomoji: (.+)/)[1]}`);
```

---

## Error Handling

### Common Errors

#### 1. Mind Not Found
```
Mind "invalid-name" not found: Mind "invalid-name" not found. Available: lilith, lyre, aurora, ...
```

**Solution**: Use `violet_list_minds` to see available Mind names. Mind names are case-insensitive.

#### 2. Rule Not Found
```
Rule "invalid-key" not found. Use violet_list_rules to see available keys.
```

**Solution**: Use `violet_list_rules` to see available rule keys.

#### 3. Category Not Found
```
Category "invalid-category" not found.

Available categories: happy, smile, cheer, wink, angel, bunny, bear, hug, sad, angry, surprised, sleepy, eating, laughing, chill, confused, nervous, kissy
```

**Solution**: Use one of the listed categories.

#### 4. Decryption Failed
```
❌ Rules: FAILED — Failed to load rules-index.json — check VIOLET_SOUL_KEY
```

**Solution**: Set `VIOLET_SOUL_KEY` environment variable before starting MCP server.

### Error Response Format

All errors follow JSON-RPC 2.0 error format:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32601,
    "message": "Unknown tool: invalid_tool_name"
  }
}
```

---

## Next Steps

- [Usage Guide](./USAGE.md) — SDK usage and architecture
- [Soul Package Guide](./SOUL_PACKAGE.md) — Export/import workflows
- [Lavender Integration](./LAVENDER_INTEGRATION.md) — Memory system integration

---

**Documentation by 🦢 Lyre**
**VioletCore v2.0.0 — Phase 2.3**
