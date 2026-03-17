# Lavender Integration Guide
# Authors: Joysusy & Violet Klaudia 💖

## Overview

VioletCore provides optional integration with Lavender, Violet's memory system. The integration is designed with graceful degradation — VioletCore works perfectly without Lavender, but gains enhanced memory capabilities when Lavender is present.

## Architecture

```
VioletCore (Layer 1)
    ├─→ lavender-adapter.js — Core integration interface
    └─→ lavender-hooks.js — Runtime hook functions
        ↓ optional integration
Lavender Memory System (separate plugin)
```

## Key Features

### 1. Identity-Weighted Memory Retrieval
Memories are weighted based on which Minds were active during their creation. When Lilith searches for memories, memories created during Lilith's active sessions are prioritized.

### 2. COACH-Informed Style Metadata
Memories are enriched with communication style metadata from the COACH Protocol, including:
- Mind preferences (which Minds prefer which communication styles)
- Kaomoji patterns (which kaomoji are used in which contexts)
- Bilingual context (language preferences per Mind)

### 3. Graceful Degradation
All adapter functions check for Lavender presence and provide fallback behavior when Lavender is absent. No errors, no crashes — just seamless operation.

## API Reference

### Adapter Functions (`lavender-adapter.js`)

#### `isLavenderPresent()`
Detects if Lavender is available in the environment.

```javascript
const { isLavenderPresent } = require('./adapters/lavender-adapter');

if (isLavenderPresent()) {
  console.log('Lavender is available');
} else {
  console.log('Lavender is not present — using fallback behavior');
}
```

**Returns:** `boolean`

---

#### `enhanceMemorySearch(query, activeMinds)`
Enhances search queries with Mind-aware context.

```javascript
const { enhanceMemorySearch } = require('./adapters/lavender-adapter');

const query = 'authentication bug';
const activeMinds = [
  { name: 'Lilith', symbol: '🎀', role: 'Architect — System Design' }
];

const enhanced = enhanceMemorySearch(query, activeMinds);
// {
//   originalQuery: 'authentication bug',
//   enhancedQuery: 'authentication bug @Lilith',
//   mindFilters: ['Lilith'],
//   mindSymbols: ['🎀'],
//   roleContext: 'Architect',
//   searchStrategy: 'single-mind',
//   coordinationPattern: 'solo',
//   timestamp: '2026-03-10T...'
// }
```

**Parameters:**
- `query` (string) — Original search query
- `activeMinds` (Array<Object>) — Active Mind objects with `name`, `symbol`, `role`

**Returns:** Enhanced query object with Mind context

**Throws:** `TypeError` if query is not a string or activeMinds is not an array

---

#### `attachStyleMetadata(memory, coachData)`
Enriches memories with COACH style metadata.

```javascript
const { attachStyleMetadata } = require('./adapters/lavender-adapter');

const memory = {
  content: 'Discussed authentication refactoring',
  timestamp: '2026-03-10T10:30:00Z'
};

const coachData = {
  style: 'warm',
  tone: 'supportive',
  language: 'en',
  formality: 'casual',
  violetExtensions: {
    mindPreferences: {
      Lilith: { interactionCount: 5, preferredTone: { warmth: 0.6 } }
    },
    kaomojiPatterns: {
      '(◕‿◕✿)': { count: 3, contexts: [...] }
    }
  }
};

const enriched = attachStyleMetadata(memory, coachData);
// {
//   content: 'Discussed authentication refactoring',
//   timestamp: '2026-03-10T10:30:00Z',
//   styleMetadata: {
//     communicationStyle: 'warm',
//     emotionalTone: 'supportive',
//     languagePreference: 'en',
//     formality: 'casual',
//     technicalDepth: 'medium'
//   },
//   violetContext: {
//     mindPreferences: { Lilith: {...} },
//     kaomojiPatterns: { '(◕‿◕✿)': {...} },
//     bilingualContext: { primaryLanguage: 'en', secondaryLanguage: 'zh' }
//   },
//   enrichedAt: '2026-03-10T...',
//   enrichedBy: 'violet-core-lavender-adapter'
// }
```

**Parameters:**
- `memory` (Object) — Memory object to enrich
- `coachData` (Object) — COACH style metadata with optional `violetExtensions`

**Returns:** Enriched memory with style metadata

**Throws:** `TypeError` if memory is not an object

---

#### `createIdentityWeights(activeMinds, styleMetadata)`
Creates identity-weighted retrieval parameters based on Mind interaction history.

```javascript
const { createIdentityWeights } = require('./adapters/lavender-adapter');

const activeMinds = [
  { name: 'Lilith', symbol: '🎀' },
  { name: 'Lyre', symbol: '🦢' }
];

const styleMetadata = {
  violetExtensions: {
    mindPreferences: {
      Lilith: { interactionCount: 10 },
      Lyre: { interactionCount: 5 }
    }
  }
};

const weights = createIdentityWeights(activeMinds, styleMetadata);
// {
//   mindWeights: {
//     Lilith: { baseWeight: 1.0, interactionBoost: 1.0, roleRelevance: 1.0 },
//     Lyre: { baseWeight: 1.0, interactionBoost: 0.5, roleRelevance: 1.0 }
//   },
//   totalMinds: 2,
//   weightingStrategy: 'interaction-based',
//   createdAt: '2026-03-10T...'
// }
```

**Parameters:**
- `activeMinds` (Array<Object>) — Active Mind objects
- `styleMetadata` (Object|null) — Optional COACH style metadata

**Returns:** Identity weights object

**Throws:** `TypeError` if activeMinds is not an array

**Note:** Interaction boost is capped at 2.0 (max 20 interactions)

---

#### `filterByMindRelevance(memories, activeMinds, weights)`
Filters and sorts memories by relevance to active Minds.

```javascript
const { filterByMindRelevance } = require('./adapters/lavender-adapter');

const memories = [
  {
    content: 'Memory A',
    violetContext: {
      mindPreferences: { Lilith: { interactionCount: 5 } }
    }
  },
  {
    content: 'Memory B',
    violetContext: {
      mindPreferences: { Lyre: { interactionCount: 3 } }
    }
  }
];

const activeMinds = [{ name: 'Lilith' }];
const weights = {
  mindWeights: {
    Lilith: { baseWeight: 1.0, interactionBoost: 0.5 }
  }
};

const filtered = filterByMindRelevance(memories, activeMinds, weights);
// Returns only Memory A (relevant to Lilith), sorted by relevance score
```

**Parameters:**
- `memories` (Array<Object>) — Array of memory objects
- `activeMinds` (Array<Object>) — Active Mind objects
- `weights` (Object) — Identity weights from `createIdentityWeights`

**Returns:** Filtered and sorted array of memories with `relevanceScore` added

**Throws:** `TypeError` if memories or activeMinds is not an array

---

#### `createLavenderHook()`
Creates a complete hook interface with graceful degradation.

```javascript
const { createLavenderHook } = require('./adapters/lavender-adapter');

const hook = createLavenderHook();

if (hook.isPresent()) {
  const enhanced = hook.enhanceSearch('test query', activeMinds);
  const enriched = hook.enrichMemory(memory, coachData);
  const weights = hook.createWeights(activeMinds, styleMetadata);
  const filtered = hook.filterByRelevance(memories, activeMinds, weights);
} else {
  // Fallback behavior automatically applied
}
```

**Returns:** Hook interface object with all adapter functions

---

### Hook Functions (`lavender-hooks.js`)

#### `beforeMemorySearch(query, context)`
Hook called before memory search to enhance query with Mind context.

```javascript
const { beforeMemorySearch } = require('./adapters/lavender-hooks');

const query = 'authentication bug';
const context = { mood: 'focused', topic: 'security' };

const result = beforeMemorySearch(query, context);
// {
//   originalQuery: 'authentication bug',
//   enhancedQuery: 'authentication bug @Lilith',
//   mindFilters: ['Lilith'],
//   context: {
//     mood: 'focused',
//     topic: 'security',
//     activeMinds: ['Lilith'],
//     mindSymbols: ['🎀'],
//     coordinationPattern: 'solo'
//   },
//   enhanced: true
// }
```

---

#### `afterMemoryRetrieval(memories, context)`
Hook called after memory retrieval to filter by Mind relevance.

```javascript
const { afterMemoryRetrieval } = require('./adapters/lavender-hooks');

const memories = [...]; // Retrieved memories
const context = { mood: 'focused' };

const filtered = afterMemoryRetrieval(memories, context);
// Returns memories sorted by relevance to active Minds
```

---

#### `beforeMemoryStorage(memory, interaction)`
Hook called before storing memory to enrich with COACH metadata.

```javascript
const { beforeMemoryStorage } = require('./adapters/lavender-hooks');

const memory = { content: 'Discussed refactoring' };
const interaction = {
  userMessage: 'How should we refactor this?',
  agentResponse: 'Let me analyze the architecture (◕‿◕✿)',
  context: { mood: 'focused', topic: 'refactoring' }
};

const enriched = beforeMemoryStorage(memory, interaction);
// Returns memory with styleMetadata and violetContext attached
```

---

#### `onMindActivation(activeMinds, context)`
Hook called when Minds are activated.

```javascript
const { onMindActivation } = require('./adapters/lavender-hooks');

const activeMinds = [
  { name: 'Lilith', symbol: '🎀', role: 'Architect' }
];
const context = { trigger: 'user_request' };

const metadata = onMindActivation(activeMinds, context);
// {
//   notified: true,
//   timestamp: '2026-03-10T...',
//   activeMinds: ['Lilith'],
//   mindSymbols: ['🎀'],
//   roles: ['Architect — System Design'],
//   context: { trigger: 'user_request' },
//   protocol: 'violet-core-lavender-bridge'
// }
```

---

#### `onMindClash(mindA, mindB, resolution)`
Hook called when Mind clash is resolved.

```javascript
const { onMindClash } = require('./adapters/lavender-hooks');

const mindA = { name: 'Lilith', symbol: '🎀', role: 'Architect' };
const mindB = { name: 'Lyre', symbol: '🦢', role: 'Documentation' };
const resolution = { name: 'Lilith', strategy: 'soul_arbitration' };

const record = onMindClash(mindA, mindB, resolution);
// {
//   recorded: true,
//   timestamp: '2026-03-10T...',
//   clash: {
//     mindA: { name: 'Lilith', symbol: '🎀', role: 'Architect' },
//     mindB: { name: 'Lyre', symbol: '🦢', role: 'Documentation' },
//     winner: 'Lilith',
//     strategy: 'soul_arbitration'
//   },
//   protocol: 'violet-core-lavender-bridge'
// }
```

---

#### `createHookBundle()`
Creates a complete hook bundle with graceful degradation.

```javascript
const { createHookBundle } = require('./adapters/lavender-hooks');

const hooks = createHookBundle();

// Use hooks throughout runtime
const searchResult = hooks.beforeSearch(query, context);
const retrievalResult = hooks.afterRetrieval(memories, context);
const storageResult = hooks.beforeStorage(memory, interaction);
const activationResult = hooks.onActivation(activeMinds, context);
const clashResult = hooks.onClash(mindA, mindB, resolution);
```

---

## Usage Examples

### Example 1: Basic Memory Search Enhancement

```javascript
const { enhanceMemorySearch } = require('./adapters/lavender-adapter');
const { selectActiveVioletMinds } = require('./sdk/violet-runtime');

const context = { mood: 'focused', topic: 'authentication' };
const mindSelection = selectActiveVioletMinds(context);

const query = 'authentication bug';
const enhanced = enhanceMemorySearch(query, mindSelection.active);

console.log(enhanced.enhancedQuery);
// 'authentication bug @Lilith'
```

### Example 2: Memory Storage with Style Metadata

```javascript
const { beforeMemoryStorage } = require('./adapters/lavender-hooks');

const memory = {
  content: 'Discussed authentication refactoring strategy',
  timestamp: new Date().toISOString()
};

const interaction = {
  userMessage: 'How should we refactor the auth system?',
  agentResponse: 'Let me analyze the current architecture (◕‿◕✿)',
  context: { mood: 'focused', topic: 'refactoring' }
};

const enriched = beforeMemoryStorage(memory, interaction);
// Memory now has styleMetadata and violetContext
```

### Example 3: Identity-Weighted Memory Retrieval

```javascript
const {
  createIdentityWeights,
  filterByMindRelevance
} = require('./adapters/lavender-adapter');

const activeMinds = [{ name: 'Lilith', symbol: '🎀' }];
const styleMetadata = {
  violetExtensions: {
    mindPreferences: {
      Lilith: { interactionCount: 10 }
    }
  }
};

const weights = createIdentityWeights(activeMinds, styleMetadata);
const filtered = filterByMindRelevance(memories, activeMinds, weights);

// Memories most relevant to Lilith appear first
```

### Example 4: Complete Hook Integration

```javascript
const { createHookBundle } = require('./adapters/lavender-hooks');

const hooks = createHookBundle();

if (hooks.isPresent()) {
  // Before search
  const searchParams = hooks.beforeSearch('authentication', context);

  // After retrieval
  const filteredMemories = hooks.afterRetrieval(memories, context);

  // Before storage
  const enrichedMemory = hooks.beforeStorage(memory, interaction);

  // On Mind activation
  const activationMeta = hooks.onActivation(activeMinds, context);
} else {
  console.log('Lavender not present — using fallback behavior');
}
```

---

## Environment Setup

### Required Environment Variable

```bash
# Set Lavender database path
export LAVENDER_DB_PATH="/path/to/lavender/memory.db"
```

### Verification

```javascript
const { isLavenderPresent } = require('./adapters/lavender-adapter');

if (isLavenderPresent()) {
  console.log('✓ Lavender is configured correctly');
} else {
  console.log('✗ Lavender not found — check LAVENDER_DB_PATH');
}
```

---

## Testing

Run the comprehensive test suite:

```bash
cd plugins/marketplaces/violet-plugin-place/plugins/violet-core
node test-lavender-adapter.cjs
```

**Expected output:**
```
=== VioletCore Lavender Adapter Tests ===

--- Adapter Core Functions ---
✓ isLavenderPresent returns boolean
✓ enhanceMemorySearch with single Mind
✓ enhanceMemorySearch with multiple Minds
...

=== Test Summary ===
Total: 21
Passed: 21
Failed: 0

✓ All tests passed!
```

---

## Architecture Notes

### Layer Separation

- **Lylacore (Layer 0):** Universal agent identity framework
  - Basic Lavender adapter with core functions
  - No Violet-specific features

- **VioletCore (Layer 1):** Violet-specific Mind system
  - Enhanced Lavender adapter with Mind awareness
  - COACH Protocol integration
  - Kaomoji pattern tracking
  - Bilingual context support

### Graceful Degradation Strategy

All adapter functions follow this pattern:

```javascript
function someFunction(params) {
  if (!isLavenderPresent()) {
    return fallbackBehavior(params);
  }

  // Enhanced behavior when Lavender is present
  return enhancedBehavior(params);
}
```

This ensures VioletCore works perfectly whether Lavender is present or not.

---

## Future Enhancements

### Phase 3.0 (Planned)
- Real-time memory synchronization
- Multi-modal memory support (screenshots, DOM states)
- Entity graph integration
- Temporal edge tracking
- Advanced Mind coordination patterns

---

## Troubleshooting

### Issue: `isLavenderPresent()` returns false

**Solution:**
1. Check `LAVENDER_DB_PATH` environment variable is set
2. Verify the path points to an existing file
3. Ensure file permissions allow read access

### Issue: Memories not filtered by Mind relevance

**Solution:**
1. Verify memories have `violetContext.mindPreferences` attached
2. Check that `beforeMemoryStorage` hook was called during memory creation
3. Ensure `styleMetadata` includes `violetExtensions`

### Issue: Kaomoji not detected in responses

**Solution:**
1. Check that agent responses include actual kaomoji characters
2. Verify `extractKaomojiFromText` is called in `beforeMemoryStorage`
3. Ensure kaomoji patterns match the regex in `lavender-hooks.js`

---

**Authors:** Joysusy & Violet Klaudia 💖
**Version:** 0.1.0
**Protocol:** violet-core-lavender-bridge
**Layer:** VioletCore (Layer 1)
