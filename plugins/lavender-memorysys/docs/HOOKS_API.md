# Authors: Joysusy & Violet Klaudia 💖
# VioletCore Hooks API Reference

**Version:** 0.1.0
**Protocol:** `violet-core-lavender-bridge`
**Language**: Node.js (VioletCore) ↔ Python (Lavender)

---

## Table of Contents

1. [Overview](#overview)
2. [Hook Functions](#hook-functions)
3. [Adapter Functions](#adapter-functions)
4. [Python Bridge API](#python-bridge-api)
5. [Data Structures](#data-structures)
6. [Error Handling](#error-handling)
7. [Testing](#testing)

---

## Overview

The VioletCore Hooks API provides **five lifecycle hooks** for Mind-aware memory integration:

| Hook | Trigger | Purpose |
|------|---------|---------|
| `beforeMemorySearch` | Before search | Enhance query with Mind context |
| `afterMemoryRetrieval` | After retrieval | Filter by Mind relevance |
| `beforeMemoryStorage` | Before storage | Enrich with COACH metadata |
| `onMindActivation` | Mind activates | Notify Lavender |
| `onMindClash` | Mind clash | Record resolution |

---

## Hook Functions

### `beforeMemorySearch(query, context)`

Enhances search query with active Mind context before sending to Lavender.

**Location**: `violet-core/adapters/lavender-hooks.js`

**Parameters**:

```typescript
query: string          // Original search query
context: {
  mood?: string        // Current mood (e.g., "focused", "playful")
  topic?: string       // Current topic (e.g., "security", "ux")
  [key: string]: any   // Additional context
}
```

**Returns**:

```typescript
{
  query: string                    // Enhanced query with Mind filters
  context: {
    activeMinds: string[]          // Active Mind names
    mindSymbols: string[]          // Mind symbols (e.g., ["🛡️", "🌙"])
    coordinationPattern: string    // "solo" | "collaborative" | "parallel"
    ...originalContext
  }
  enhanced: boolean                // True if enhancement succeeded
}
```

**Example**:

```javascript
const result = beforeMemorySearch("authentication bug", {
  mood: "focused",
  topic: "security"
});

// result = {
//   query: "authentication bug @Kael",
//   context: {
//     activeMinds: ["Kael"],
//     mindSymbols: ["🛡️"],
//     coordinationPattern: "solo",
//     mood: "focused",
//     topic: "security"
//   },
//   enhanced: true
// }
```

**Behavior**:
1. Calls `selectActiveVioletMinds(context)` to determine active Minds
2. Enhances query via `lavenderAdapter.enhanceMemorySearch()`
3. Returns enhanced parameters with Mind context

**Graceful Degradation**:
- If Lavender not present: Returns `{ query, context, enhanced: false }`
- If no Minds selected: Returns original query unchanged

---

### `afterMemoryRetrieval(memories, context)`

Filters and weights retrieved memories based on active Mind relevance.

**Location**: `violet-core/adapters/lavender-hooks.js`

**Parameters**:

```typescript
memories: Array<{
  id: string
  title: string
  content: string
  mind_active?: string
  violetContext?: {
    mindPreferences?: Record<string, any>
  }
  [key: string]: any
}>

context: {
  activeMinds?: Array<{name: string, symbol: string, role: string}>
  styleMetadata?: object
  [key: string]: any
}
```

**Returns**:

```typescript
Array<Memory>  // Filtered and sorted by relevance score
```

**Example**:

```javascript
const filtered = afterMemoryRetrieval(
  [
    { id: "1", title: "Auth Bug", mind_active: "Kael" },
    { id: "2", title: "UX Design", mind_active: "Faye" },
    { id: "3", title: "API Integration", mind_active: "Selene" }
  ],
  {
    activeMinds: [{ name: "Kael", symbol: "🛡️", role: "Security Specialist" }]
  }
);

// filtered = [
//   { id: "1", title: "Auth Bug", mind_active: "Kael", relevanceScore: 2.5 }
// ]
```

**Behavior**:
1. Calls `selectActiveVioletMinds(context)` to get active Minds
2. Creates identity weights via `lavenderAdapter.createIdentityWeights()`
3. Filters memories via `lavenderAdapter.filterByMindRelevance()`
4. Returns sorted results (highest relevance first)

**Graceful Degradation**:
- If Lavender not present: Returns memories unchanged
- If no active Minds: Returns memories unchanged

---

### `beforeMemoryStorage(memory, interaction)`

Enriches memory with COACH style metadata before storing in Lavender.

**Location**: `violet-core/adapters/lavender-hooks.js`

**Parameters**:

```typescript
memory: {
  title: string
  content: string
  category?: string
  project?: string
  tags?: string[]
  importance?: number
  mind_active?: string
  styleMetadata?: object
  [key: string]: any
}

interaction: {
  userMessage: string
  agentResponse: string
  context?: {
    mood?: string
    topic?: string
    activeMinds?: Array<Mind>
  }
}
```

**Returns**:

```typescript
{
  ...memory,
  styleMetadata: {
    communicationStyle: string
    emotionalTone: string
    languagePreference: string
    formality: string
    technicalDepth: string
  },
  violetContext: {
    mindPreferences: Record<string, any>
    kaomojiPatterns: Record<string, any>
    bilingualContext: {
      primaryLanguage: string
      secondaryLanguage: string
    }
  }
}
```

**Example**:

```javascript
const enriched = beforeMemoryStorage(
  {
    title: "Bug Fix",
    content: "Fixed authentication timeout",
    mind_active: "Kael"
  },
  {
    userMessage: "Fix the timeout",
    agentResponse: "Fixed! (◕‿◕✿)",
    context: { mood: "focused", topic: "bugfix" }
  }
);

// enriched.styleMetadata = {
//   communicationStyle: "technical",
//   emotionalTone: "focused",
//   languagePreference: "en",
//   formality: "mixed",
//   technicalDepth: "medium"
// }
// enriched.violetContext.kaomojiPatterns = { "Kael": ["(◕‿◕✿)"] }
```

**Behavior**:
1. Extracts kaomoji from `agentResponse` via `extractKaomojiFromText()`
2. Learns COACH pattern via `learnVioletPattern()`
3. Attaches style metadata via `lavenderAdapter.attachStyleMetadata()`
4. Returns enriched memory

**Graceful Degradation**:
- If Lavender not present: Returns memory unchanged
- If no interaction data: Returns memory unchanged

---

### `onMindActivation(activeMinds, context)`

Notifies Lavender when Minds are activated for context-aware memory retrieval.

**Location**: `violet-core/adapters/lavender-hooks.js`

**Parameters**:

```typescript
activeMinds: Array<{
  name: string
  symbol: string
  role: string
}>

context: {
  trigger?: string
  project?: string
  [key: string]: any
}
```

**Returns**:

```typescript
{
  notified: boolean
  timestamp: string
  activeMinds: string[]
  mindSymbols: string[]
  roles: string[]
  context: object
  protocol: "violet-core-lavender-bridge"
}
```

**Example**:

```javascript
const result = onMindActivation(
  [
    { name: "Kael", symbol: "🛡️", role: "Security Specialist" },
    { name: "Selene", symbol: "🌙", role: "Integration Architect" }
  ],
  { trigger: "security_review", project: "violet" }
);

// result = {
//   notified: true,
//   timestamp: "2026-03-10T15:30:00Z",
//   activeMinds: ["Kael", "Selene"],
//   mindSymbols: ["🛡️", "🌙"],
//   roles: ["Security Specialist", "Integration Architect"],
//   context: { trigger: "security_review", project: "violet" },
//   protocol: "violet-core-lavender-bridge"
// }
```

**Behavior**:
1. Extracts Mind names, symbols, and roles
2. Creates activation metadata
3. Returns notification result

**Graceful Degradation**:
- If Lavender not present: Returns `{ notified: false }`

---

### `onMindClash(mindA, mindB, resolution)`

Records clash resolution decisions in Lavender for learning patterns.

**Location**: `violet-core/adapters/lavender-hooks.js`

**Parameters**:

```typescript
mindA: {
  name: string
  symbol: string
  role: string
}

mindB: {
  name: string
  symbol: string
  role: string
}

resolution: {
  name: string           // Winner Mind name
  strategy?: string      // "soul_arbitration" | "compromise" | "sequential"
  reason?: string
  compromise?: string
}
```

**Returns**:

```typescript
{
  recorded: boolean
  timestamp: string
  clash: {
    mindA: { name, symbol, role }
    mindB: { name, symbol, role }
    winner: string
    strategy: string
  }
  protocol: "violet-core-lavender-bridge"
}
```

**Example**:

```javascript
const result = onMindClash(
  { name: "Kael", symbol: "🛡️", role: "Security Specialist" },
  { name: "Faye", symbol: "🔮", role: "UX Designer" },
  {
    name: "Kael",
    strategy: "soul_arbitration",
    reason: "Security takes precedence for authentication",
    compromise: "Faye's UX suggestions applied to non-critical flows"
  }
);

// result = {
//   recorded: true,
//   timestamp: "2026-03-10T15:30:00Z",
//   clash: {
//     mindA: { name: "Kael", symbol: "🛡️", role: "Security Specialist" },
//     mindB: { name: "Faye", symbol: "🔮", role: "UX Designer" },
//     winner: "Kael",
//     strategy: "soul_arbitration"
//   },
//   protocol: "violet-core-lavender-bridge"
// }
```

**Behavior**:
1. Extracts clash details
2. Creates clash record
3. Returns recording result

**Graceful Degradation**:
- If Lavender not present: Returns `{ recorded: false }`

---

## Adapter Functions

### `isLavenderPresent()`

Detects if Lavender memory system is present in the environment.

**Location**: `violet-core/adapters/lavender-adapter.js`

**Returns**: `boolean`

**Example**:

```javascript
const adapter = require('./lavender-adapter');

if (adapter.isLavenderPresent()) {
  console.log("Lavender is available");
} else {
  console.log("Lavender not found, using graceful degradation");
}
```

**Behavior**:
1. Checks `process.env.LAVENDER_DB_PATH`
2. Verifies file exists at that path
3. Returns `true` if both conditions met

---

### `enhanceMemorySearch(query, activeMinds)`

Enhances memory search queries with Violet Mind-aware context.

**Location**: `violet-core/adapters/lavender-adapter.js`

**Parameters**:

```typescript
query: string
activeMinds: Array<{name: string, symbol?: string, role?: string}>
```

**Returns**:

```typescript
{
  originalQuery: string
  enhancedQuery: string
  mindFilters: string[]
  mindSymbols: string[]
  roleContext: string
  timestamp: string
  searchStrategy: "single-mind" | "multi-mind"
  coordinationPattern: "solo" | "collaborative"
}
```

**Example**:

```javascript
const enhanced = adapter.enhanceMemorySearch(
  "authentication bug",
  [
    { name: "Kael", symbol: "🛡️", role: "Security Specialist" },
    { name: "Selene", symbol: "🌙", role: "Integration Architect" }
  ]
);

// enhanced = {
//   originalQuery: "authentication bug",
//   enhancedQuery: "authentication bug @Kael @Selene",
//   mindFilters: ["Kael", "Selene"],
//   mindSymbols: ["🛡️", "🌙"],
//   roleContext: "Security Specialist, Integration Architect",
//   timestamp: "2026-03-10T15:30:00Z",
//   searchStrategy: "multi-mind",
//   coordinationPattern: "collaborative"
// }
```

**Throws**:
- `TypeError` if `query` is not a string
- `TypeError` if `activeMinds` is not an array

---

### `attachStyleMetadata(memory, coachData)`

Attaches COACH-informed style metadata to memory entries.

**Location**: `violet-core/adapters/lavender-adapter.js`

**Parameters**:

```typescript
memory: object
coachData: {
  style?: string
  tone?: string
  language?: string
  formality?: string
  depth?: string
  violetExtensions?: {
    mindPreferences?: object
    kaomojiPatterns?: object
    bilingualContext?: object
  }
}
```

**Returns**:

```typescript
{
  ...memory,
  styleMetadata: object
  violetContext?: object
  enrichedAt: string
  enrichedBy: "violet-core-lavender-adapter"
}
```

**Example**:

```javascript
const enriched = adapter.attachStyleMetadata(
  { title: "Bug Fix", content: "..." },
  {
    style: "technical",
    tone: "focused",
    language: "en",
    formality: "mixed",
    depth: "medium",
    violetExtensions: {
      mindPreferences: { "Kael": { interactionCount: 5 } },
      kaomojiPatterns: { "Kael": ["(◕‿◕✿)"] }
    }
  }
);
```

**Throws**:
- `TypeError` if `memory` is not an object

---

### `createIdentityWeights(activeMinds, styleMetadata)`

Creates identity-weighted memory retrieval parameters.

**Location**: `violet-core/adapters/lavender-adapter.js`

**Parameters**:

```typescript
activeMinds: Array<{name: string}>
styleMetadata: {
  violetExtensions?: {
    mindPreferences?: Record<string, {interactionCount?: number}>
  }
} | null
```

**Returns**:

```typescript
{
  mindWeights: Record<string, {
    baseWeight: number
    interactionBoost: number
    roleRelevance: number
  }>
  totalMinds: number
  weightingStrategy: "interaction-based"
  createdAt: string
}
```

**Example**:

```javascript
const weights = adapter.createIdentityWeights(
  [{ name: "Kael" }, { name: "Selene" }],
  {
    violetExtensions: {
      mindPreferences: {
        "Kael": { interactionCount: 10 },
        "Selene": { interactionCount: 5 }
      }
    }
  }
);

// weights = {
//   mindWeights: {
//     "Kael": { baseWeight: 1.0, interactionBoost: 1.0, roleRelevance: 1.0 },
//     "Selene": { baseWeight: 1.0, interactionBoost: 0.5, roleRelevance: 1.0 }
//   },
//   totalMinds: 2,
//   weightingStrategy: "interaction-based",
//   createdAt: "2026-03-10T15:30:00Z"
// }
```

**Throws**:
- `TypeError` if `activeMinds` is not an array

---

### `filterByMindRelevance(memories, activeMinds, weights)`

Filters memories by Mind relevance.

**Location**: `violet-core/adapters/lavender-adapter.js`

**Parameters**:

```typescript
memories: Array<object>
activeMinds: Array<{name: string}>
weights: {
  mindWeights?: Record<string, {baseWeight: number, interactionBoost: number}>
}
```

**Returns**:

```typescript
Array<{...memory, relevanceScore: number}>  // Sorted by relevance (descending)
```

**Example**:

```javascript
const filtered = adapter.filterByMindRelevance(
  [
    { id: "1", title: "Auth Bug", violetContext: { mindPreferences: { "Kael": {} } } },
    { id: "2", title: "UX Design", violetContext: { mindPreferences: { "Faye": {} } } }
  ],
  [{ name: "Kael" }],
  {
    mindWeights: {
      "Kael": { baseWeight: 1.0, interactionBoost: 0.5 }
    }
  }
);

// filtered = [
//   { id: "1", title: "Auth Bug", relevanceScore: 1.5, ... }
// ]
```

**Throws**:
- `TypeError` if `memories` is not an array
- `TypeError` if `activeMinds` is not an array

---

## Python Bridge API

### `VioletBridge`

Subprocess bridge to execute VioletCore Node.js hooks from Python.

**Location**: `lavender-memorysys/src/integrations/violet_bridge.py`

#### `__init__(violet_core_path=None)`

Initialize the bridge.

**Parameters**:
- `violet_core_path` (Path | None): Explicit path to VioletCore (auto-detected if None)

**Example**:

```python
from pathlib import Path
from integrations.violet_bridge import VioletBridge

# Auto-detect
bridge = VioletBridge()

# Explicit path
bridge = VioletBridge(Path("/path/to/violet-core"))
```

#### `is_available() -> bool`

Check if VioletCore hooks are available.

**Returns**: `bool`

**Example**:

```python
if bridge.is_available():
    print("VioletCore hooks ready")
else:
    print("VioletCore not found")
```

#### `call_hook(hook_name, *args) -> dict`

Execute a VioletCore hook function.

**Parameters**:
- `hook_name` (str): Hook function name
- `*args`: Arguments to pass to hook

**Returns**:

```python
{
  "success": bool,
  "data": Any,        # If success=True
  "error": str,       # If success=False
  "stdout": str,      # If error occurred
}
```

**Example**:

```python
result = bridge.call_hook("beforeMemorySearch", "authentication", {"mood": "focused"})

if result["success"]:
    enhanced = result["data"]
    print(f"Enhanced query: {enhanced['query']}")
else:
    print(f"Hook failed: {result['error']}")
```

**Timeout**: 5 seconds (configurable in source)

**Error Handling**:
- Returns `{"success": False, "error": "VioletCore not available"}` if bridge unavailable
- Returns `{"success": False, "error": "timeout"}` if hook times out
- Returns `{"success": False, "error": "invalid_json"}` if hook returns malformed JSON

---

### `VioletHooks`

High-level Python interface for VioletCore hooks.

**Location**: `lavender-memorysys/src/integrations/violet_hooks.py`

#### `__init__(bridge=None)`

Initialize hooks wrapper.

**Parameters**:
- `bridge` (VioletBridge | None): Bridge instance (auto-created if None)

**Example**:

```python
from integrations.violet_hooks import VioletHooks

hooks = VioletHooks()
```

#### `is_available() -> bool`

Check if VioletCore is available.

**Returns**: `bool`

#### `before_search(query, context) -> dict`

Call `beforeMemorySearch` hook.

**Parameters**:
- `query` (str): Search query
- `context` (dict | None): Search context

**Returns**: Enhanced search parameters (see hook documentation)

**Example**:

```python
enhanced = hooks.before_search("authentication", {"mood": "focused"})
print(enhanced["query"])  # "authentication @Kael"
```

#### `after_retrieval(memories, context) -> list[dict]`

Call `afterMemoryRetrieval` hook.

**Parameters**:
- `memories` (list[dict]): Retrieved memories
- `context` (dict | None): Retrieval context

**Returns**: Filtered and sorted memories

**Example**:

```python
filtered = hooks.after_retrieval(memories, {"activeMinds": [{"name": "Kael"}]})
```

#### `before_storage(memory, interaction) -> dict`

Call `beforeMemoryStorage` hook.

**Parameters**:
- `memory` (dict): Memory to store
- `interaction` (dict | None): User-agent interaction

**Returns**: Enriched memory

**Example**:

```python
enriched = hooks.before_storage(
    {"title": "Bug Fix", "content": "..."},
    {"userMessage": "Fix it", "agentResponse": "Done! (◕‿◕✿)"}
)
```

#### `on_activation(active_minds, context) -> dict`

Call `onMindActivation` hook.

**Parameters**:
- `active_minds` (list[dict]): Active Minds
- `context` (dict | None): Activation context

**Returns**: Activation metadata

**Example**:

```python
result = hooks.on_activation(
    [{"name": "Kael", "symbol": "🛡️"}],
    {"trigger": "security_review"}
)
print(result["notified"])  # True
```

#### `on_clash(mind_a, mind_b, resolution) -> dict`

Call `onMindClash` hook.

**Parameters**:
- `mind_a` (dict): First Mind
- `mind_b` (dict): Second Mind
- `resolution` (dict): Resolution details

**Returns**: Clash record

**Example**:

```python
result = hooks.on_clash(
    {"name": "Kael", "symbol": "🛡️"},
    {"name": "Faye", "symbol": "🔮"},
    {"name": "Kael", "strategy": "soul_arbitration"}
)
print(result["recorded"])  # True
```

---

## Data Structures

### Mind Object

```typescript
{
  name: string          // Mind name (e.g., "Kael")
  symbol: string        // Visual symbol (e.g., "🛡️")
  role: string          // Primary role (e.g., "Security Specialist")
  weight?: number       // Relevance weight (default: 1.0)
}
```

### Context Object

```typescript
{
  mood?: string                    // Current mood
  topic?: string                   // Current topic
  activeMinds?: Array<Mind>        // Active Minds
  coordinationPattern?: string     // Coordination pattern
  channelWeights?: {               // Search channel weights
    bm25?: number
    vector?: number
    metadata?: number
    mind?: number
  }
  [key: string]: any               // Additional context
}
```

### Interaction Object

```typescript
{
  userMessage: string              // User's message
  agentResponse: string            // Agent's response
  context?: Context                // Interaction context
}
```

### Style Metadata

```typescript
{
  communicationStyle: string       // "technical" | "casual" | "formal"
  emotionalTone: string            // "focused" | "playful" | "serious"
  languagePreference: string       // "en" | "zh" | "bilingual"
  formality: string                // "formal" | "casual" | "mixed"
  technicalDepth: string           // "shallow" | "medium" | "deep"
}
```

### Violet Context

```typescript
{
  mindPreferences: Record<string, {
    interactionCount?: number
    preferredKaomoji?: string[]
    topicAffinity?: string
  }>
  kaomojiPatterns: Record<string, string[]>
  bilingualContext: {
    primaryLanguage: string
    secondaryLanguage: string
  }
}
```

---

## Error Handling

### Hook Execution Errors

All hooks use **graceful degradation** — errors never throw, always return safe defaults.

**Error Types**:

| Error | Cause | Return Value |
|-------|-------|--------------|
| `VioletCore not available` | Bridge unavailable | Pass-through (no enhancement) |
| `timeout` | Hook execution >5s | Pass-through |
| `invalid_json` | Malformed hook output | Pass-through |
| `empty_output` | Hook returned nothing | Pass-through |

**Example**:

```python
# Hook fails gracefully
result = hooks.before_search("query", context)

# result["enhanced"] = False if hook failed
# result["query"] = original query (unchanged)
```

### Validation Errors

Adapter functions throw `TypeError` for invalid inputs.

**Example**:

```javascript
try {
  adapter.enhanceMemorySearch(123, []);  // Invalid: query must be string
} catch (error) {
  console.error(error.message);  // "Query must be a non-empty string"
}
```

### Logging

All errors are logged at appropriate levels:

```python
import logging

log = logging.getLogger("lavender.violet_hooks")

# Warning: Hook failed but operation continues
log.warning("beforeMemorySearch hook failed: %s", result.get("error"))

# Error: Critical failure
log.error("VioletCore hook %s execution failed: %s", hook_name, exc)
```

---

## Testing

### Unit Tests (Node.js)

```javascript
// Test hook functions
const hooks = require('./lavender-hooks');

describe('beforeMemorySearch', () => {
  it('enhances query with Mind context', () => {
    const result = hooks.beforeMemorySearch("auth bug", {
      mood: "focused"
    });

    expect(result.enhanced).toBe(true);
    expect(result.context.activeMinds).toBeDefined();
  });

  it('handles missing context gracefully', () => {
    const result = hooks.beforeMemorySearch("query", null);
    expect(result.query).toBe("query");
  });
});
```

### Integration Tests (Python)

```python
import pytest
from integrations.violet_hooks import VioletHooks

@pytest.mark.asyncio
async def test_before_search_integration():
    hooks = VioletHooks()

    if not hooks.is_available():
        pytest.skip("VioletCore not available")

    result = hooks.before_search("authentication", {"mood": "focused"})

    assert result["enhanced"] is True
    assert "activeMinds" in result["context"]
    assert len(result["context"]["activeMinds"]) > 0

@pytest.mark.asyncio
async def test_graceful_degradation():
    # Simulate VioletCore unavailable
    hooks = VioletHooks(bridge=None)

    result = hooks.before_search("query", {})

    assert result["enhanced"] is False
    assert result["query"] == "query"
```

### End-to-End Tests

```python
@pytest.mark.asyncio
async def test_mind_aware_memory_flow():
    # Setup
    manager = MemoryManager(store, violet_hooks=hooks)
    await manager.initialize_mind_events()

    # Store with Mind context
    mem_id = await manager.store(
        title="Test Memory",
        content="Test content",
        mind_active="Kael",
        interaction={
            "userMessage": "Test",
            "agentResponse": "Done! (◕‿◕✿)",
            "context": {"mood": "focused"}
        }
    )

    # Search with Mind context
    results = await manager.search(
        "Test",
        context={"activeMinds": [{"name": "Kael"}]}
    )

    # Verify
    assert len(results) > 0
    assert results[0]["id"] == mem_id
    assert results[0]["mind_active"] == "Kael"
```

---

## 中文 API 参考 (Chinese API Reference)

### 核心 Hook 函数

1. **beforeMemorySearch(query, context)** — 搜索前增强查询
2. **afterMemoryRetrieval(memories, context)** — 检索后按 Mind 相关性过滤
3. **beforeMemoryStorage(memory, interaction)** — 存储前附加 COACH 元数据
4. **onMindActivation(activeMinds, context)** — Mind 激活时通知 Lavender
5. **onMindClash(mindA, mindB, resolution)** — 记录 Mind 冲突解决

### Python 桥接 API

```python
from integrations.violet_hooks import VioletHooks

hooks = VioletHooks()

# 检查可用性
if hooks.is_available():
    # 搜索前增强
    enhanced = hooks.before_search("认证", {"mood": "focused"})

    # 检索后过滤
    filtered = hooks.after_retrieval(memories, context)

    # 存储前丰富
    enriched = hooks.before_storage(memory, interaction)

    # Mind 激活通知
    result = hooks.on_activation(active_minds, context)

    # Mind 冲突记录
    result = hooks.on_clash(mind_a, mind_b, resolution)
```

### 错误处理

所有 Hook 使用**优雅降级**：
- VioletCore 不可用 → 返回原始值（无增强）
- Hook 超时 → 返回原始值
- JSON 解析失败 → 返回原始值

---

**Related Documentation**:
- [VIOLET_INTEGRATION.md](./VIOLET_INTEGRATION.md) — Integration architecture
- [MIND_AWARE_MEMORY.md](./MIND_AWARE_MEMORY.md) — Usage guide with examples