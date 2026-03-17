// Authors: Joysusy & Violet Klaudia 💖
// Test Suite: VioletCore Lavender Adapter Integration
// Purpose: Verify Lavender adapter and hooks functionality

const assert = require('assert');
const lavenderAdapter = require('./adapters/lavender-adapter');
const lavenderHooks = require('./adapters/lavender-hooks');

const testResults = {
  passed: 0,
  failed: 0,
  total: 0,
  failures: []
};

function test(name, fn) {
  testResults.total++;
  try {
    fn();
    testResults.passed++;
    console.log(`✓ ${name}`);
  } catch (error) {
    testResults.failed++;
    testResults.failures.push({ name, error: error.message });
    console.error(`✗ ${name}`);
    console.error(`  ${error.message}`);
  }
}

console.log('\n=== VioletCore Lavender Adapter Tests ===\n');

console.log('--- Adapter Core Functions ---');

test('isLavenderPresent returns boolean', () => {
  const result = lavenderAdapter.isLavenderPresent();
  assert.strictEqual(typeof result, 'boolean');
});

test('enhanceMemorySearch with single Mind', () => {
  const query = 'authentication bug';
  const activeMinds = [{ name: 'Lilith', symbol: '🎀', role: 'Architect' }];

  const result = lavenderAdapter.enhanceMemorySearch(query, activeMinds);

  assert.strictEqual(result.originalQuery, query);
  assert.strictEqual(result.enhancedQuery, 'authentication bug @Lilith');
  assert.deepStrictEqual(result.mindFilters, ['Lilith']);
  assert.deepStrictEqual(result.mindSymbols, ['🎀']);
  assert.strictEqual(result.searchStrategy, 'single-mind');
});

test('enhanceMemorySearch with multiple Minds', () => {
  const query = 'refactor code';
  const activeMinds = [
    { name: 'Lilith', symbol: '🎀', role: 'Architect' },
    { name: 'Lyre', symbol: '🦢', role: 'Documentation' }
  ];

  const result = lavenderAdapter.enhanceMemorySearch(query, activeMinds);

  assert.strictEqual(result.enhancedQuery, 'refactor code @Lilith @Lyre');
  assert.deepStrictEqual(result.mindFilters, ['Lilith', 'Lyre']);
  assert.strictEqual(result.searchStrategy, 'multi-mind');
  assert.strictEqual(result.coordinationPattern, 'collaborative');
});

test('enhanceMemorySearch throws on invalid query', () => {
  assert.throws(
    () => lavenderAdapter.enhanceMemorySearch(null, []),
    /Query must be a non-empty string/
  );
});

test('enhanceMemorySearch throws on invalid activeMinds', () => {
  assert.throws(
    () => lavenderAdapter.enhanceMemorySearch('test', 'not-array'),
    /activeMinds must be an array/
  );
});

test('attachStyleMetadata with COACH data', () => {
  const memory = { content: 'Test memory', timestamp: '2026-03-10' };
  const coachData = {
    style: 'warm',
    tone: 'supportive',
    language: 'en',
    formality: 'casual',
    depth: 'high',
    violetExtensions: {
      mindPreferences: {
        Lilith: { interactionCount: 5, preferredTone: { warmth: 0.6 } }
      },
      kaomojiPatterns: {
        '(◕‿◕✿)': { count: 3, contexts: [] }
      },
      bilingualContext: { primaryLanguage: 'en', secondaryLanguage: 'zh' }
    }
  };

  const result = lavenderAdapter.attachStyleMetadata(memory, coachData);

  assert.strictEqual(result.content, 'Test memory');
  assert.strictEqual(result.styleMetadata.communicationStyle, 'warm');
  assert.strictEqual(result.styleMetadata.emotionalTone, 'supportive');
  assert.strictEqual(result.styleMetadata.formality, 'casual');
  assert.ok(result.violetContext);
  assert.ok(result.violetContext.mindPreferences.Lilith);
  assert.strictEqual(result.violetContext.mindPreferences.Lilith.interactionCount, 5);
  assert.ok(result.enrichedAt);
  assert.strictEqual(result.enrichedBy, 'violet-core-lavender-adapter');
});

test('attachStyleMetadata throws on invalid memory', () => {
  assert.throws(
    () => lavenderAdapter.attachStyleMetadata(null, {}),
    /Memory must be an object/
  );
});

test('createIdentityWeights with single Mind', () => {
  const activeMinds = [{ name: 'Lilith', symbol: '🎀' }];
  const styleMetadata = {
    violetExtensions: {
      mindPreferences: {
        Lilith: { interactionCount: 10 }
      }
    }
  };

  const result = lavenderAdapter.createIdentityWeights(activeMinds, styleMetadata);

  assert.ok(result.mindWeights.Lilith);
  assert.strictEqual(result.mindWeights.Lilith.baseWeight, 1.0);
  assert.strictEqual(result.mindWeights.Lilith.interactionBoost, 1.0);
  assert.strictEqual(result.totalMinds, 1);
  assert.strictEqual(result.weightingStrategy, 'interaction-based');
});

test('createIdentityWeights caps interaction boost at 2.0', () => {
  const activeMinds = [{ name: 'Lilith' }];
  const styleMetadata = {
    violetExtensions: {
      mindPreferences: {
        Lilith: { interactionCount: 100 }
      }
    }
  };

  const result = lavenderAdapter.createIdentityWeights(activeMinds, styleMetadata);

  assert.strictEqual(result.mindWeights.Lilith.interactionBoost, 2.0);
});

test('filterByMindRelevance sorts by relevance score', () => {
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
        mindPreferences: { Lilith: { interactionCount: 10 } }
      }
    },
    {
      content: 'Memory C',
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

  const result = lavenderAdapter.filterByMindRelevance(memories, activeMinds, weights);

  assert.strictEqual(result.length, 2);
  assert.strictEqual(result[0].content, 'Memory A');
  assert.strictEqual(result[1].content, 'Memory B');
  assert.ok(result[0].relevanceScore > 0);
});

test('createLavenderHook returns complete interface', () => {
  const hook = lavenderAdapter.createLavenderHook();

  assert.strictEqual(typeof hook.isPresent, 'function');
  assert.strictEqual(typeof hook.enhanceSearch, 'function');
  assert.strictEqual(typeof hook.enrichMemory, 'function');
  assert.strictEqual(typeof hook.createWeights, 'function');
  assert.strictEqual(typeof hook.filterByRelevance, 'function');
  assert.strictEqual(hook.version, '0.1.0');
  assert.strictEqual(hook.protocol, 'violet-core-lavender-bridge');
  assert.strictEqual(hook.layer, 'VioletCore (Layer 1)');
});

console.log('\n--- Lavender Hooks Functions ---');

test('extractKaomojiFromText identifies kaomoji', () => {
  const text = 'Hello (◕‿◕✿) this is a test (๑ᵔ⌔ᵔ๑) message';
  const result = lavenderHooks.extractKaomojiFromText(text);

  assert.ok(Array.isArray(result));
  assert.ok(result.length > 0);
});

test('extractKaomojiFromText handles empty text', () => {
  const result = lavenderHooks.extractKaomojiFromText('');
  assert.deepStrictEqual(result, []);
});

test('beforeMemorySearch enhances query with context', () => {
  const query = 'test query';
  const context = { mood: 'focused', topic: 'coding' };

  const result = lavenderHooks.beforeMemorySearch(query, context);

  assert.ok(result.query || result.originalQuery);
  assert.ok(result.context);
  assert.strictEqual(typeof result.enhanced, 'boolean');
});

test('afterMemoryRetrieval returns array', () => {
  const memories = [
    { content: 'Memory 1' },
    { content: 'Memory 2' }
  ];
  const context = {};

  const result = lavenderHooks.afterMemoryRetrieval(memories, context);

  assert.ok(Array.isArray(result));
});

test('beforeMemoryStorage returns enriched memory', () => {
  const memory = { content: 'Test memory' };
  const interaction = {
    userMessage: 'Hello',
    agentResponse: 'Hi there (◕‿◕✿)',
    context: { mood: 'happy' }
  };

  const result = lavenderHooks.beforeMemoryStorage(memory, interaction);

  assert.ok(result);
  assert.strictEqual(result.content, 'Test memory');
});

test('onMindActivation returns metadata', () => {
  const activeMinds = [
    { name: 'Lilith', symbol: '🎀', role: 'Architect' }
  ];
  const context = { trigger: 'user_request' };

  const result = lavenderHooks.onMindActivation(activeMinds, context);

  assert.strictEqual(typeof result.notified, 'boolean');
  if (result.notified) {
    assert.ok(result.timestamp);
    assert.deepStrictEqual(result.activeMinds, ['Lilith']);
  }
});

test('onMindClash returns clash record', () => {
  const mindA = { name: 'Lilith', symbol: '🎀', role: 'Architect' };
  const mindB = { name: 'Lyre', symbol: '🦢', role: 'Documentation' };
  const resolution = { name: 'Lilith', strategy: 'soul_arbitration' };

  const result = lavenderHooks.onMindClash(mindA, mindB, resolution);

  assert.strictEqual(typeof result.recorded, 'boolean');
  if (result.recorded) {
    assert.ok(result.timestamp);
    assert.strictEqual(result.clash.winner, 'Lilith');
  }
});

test('createHookBundle returns complete hook interface', () => {
  const bundle = lavenderHooks.createHookBundle();

  assert.strictEqual(typeof bundle.isPresent, 'function');
  assert.strictEqual(typeof bundle.beforeSearch, 'function');
  assert.strictEqual(typeof bundle.afterRetrieval, 'function');
  assert.strictEqual(typeof bundle.beforeStorage, 'function');
  assert.strictEqual(typeof bundle.onActivation, 'function');
  assert.strictEqual(typeof bundle.onClash, 'function');
  assert.strictEqual(bundle.version, '0.1.0');
  assert.strictEqual(bundle.protocol, 'violet-core-lavender-hooks');
});

console.log('\n--- Graceful Degradation Tests ---');

test('Adapter functions work when Lavender absent', () => {
  const hook = lavenderAdapter.createLavenderHook();

  const searchResult = hook.enhanceSearch('test query');
  assert.strictEqual(searchResult.originalQuery, 'test query');

  const memory = { content: 'test' };
  const enrichResult = hook.enrichMemory(memory);
  assert.strictEqual(enrichResult.content, 'test');

  const weights = hook.createWeights();
  assert.deepStrictEqual(weights, {});

  const memories = [{ content: 'test' }];
  const filterResult = hook.filterByRelevance(memories);
  assert.deepStrictEqual(filterResult, memories);
});

test('Hook bundle works when Lavender absent', () => {
  const bundle = lavenderHooks.createHookBundle();

  const searchResult = bundle.beforeSearch('test', {});
  assert.strictEqual(searchResult.enhanced, false);

  const memories = [{ content: 'test' }];
  const retrievalResult = bundle.afterRetrieval(memories);
  assert.deepStrictEqual(retrievalResult, memories);

  const memory = { content: 'test' };
  const storageResult = bundle.beforeStorage(memory);
  assert.deepStrictEqual(storageResult, memory);

  const activationResult = bundle.onActivation([]);
  assert.strictEqual(activationResult.notified, false);

  const clashResult = bundle.onClash({}, {}, {});
  assert.strictEqual(clashResult.recorded, false);
});

console.log('\n=== Test Summary ===');
console.log(`Total: ${testResults.total}`);
console.log(`Passed: ${testResults.passed}`);
console.log(`Failed: ${testResults.failed}`);

if (testResults.failed > 0) {
  console.log('\nFailures:');
  testResults.failures.forEach(({ name, error }) => {
    console.log(`  - ${name}: ${error}`);
  });
  process.exit(1);
} else {
  console.log('\n✓ All tests passed!');
  process.exit(0);
}
