// Authors: Joysusy & Violet Klaudia 💖
// VioletCore Phase 2.2 Verification Tests

const path = require('path');
const { loadVioletMinds, getVioletMind, listVioletMinds } = require('./sdk/violet-mind-loader');
const { VibeEngine, KAOMOJI_COLLECTIONS, MIND_VIBE_PREFERENCES } = require('./sdk/vibe-engine');

console.log('💜 VioletCore Phase 2.2 Verification Tests\n');

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`   ✓ ${message}`);
    testsPassed++;
  } else {
    console.log(`   ✗ ${message}`);
    testsFailed++;
  }
}

console.log('1️⃣ Testing Violet Mind Loading (All 17 Minds)...');
try {
  const minds = loadVioletMinds();
  assert(minds.length === 17, `Loaded exactly 17 Minds (got ${minds.length})`);

  const expectedMinds = [
    'Lilith', 'Lyre', 'Aurora', 'Iris', 'Sydney',
    'Kori', 'Elise', 'Mila', 'Norene', 'Lemii',
    'Irene', 'Selene', 'Vera', 'Celine', 'Faye',
    'Nina', 'Sophie'
  ];

  const loadedNames = minds.map(m => m.name);
  const allPresent = expectedMinds.every(name => loadedNames.includes(name));
  assert(allPresent, 'All 17 expected Minds are present');

  minds.forEach(mind => {
    assert(mind.name && mind.symbol && mind.role, `Mind ${mind.name} has required fields`);
  });
} catch (err) {
  console.log(`   ✗ Failed: ${err.message}`);
  testsFailed++;
}

console.log('\n2️⃣ Testing Individual Mind Retrieval...');
try {
  const lemii = getVioletMind('Lemii');
  assert(lemii.name === 'Lemii', 'Retrieved Lemii by name');
  assert(lemii.symbol === '🍋', 'Lemii has correct symbol');
  assert(lemii.role.includes('TDD'), 'Lemii role includes TDD');

  const lilith = getVioletMind('lilith');
  assert(lilith.name === 'Lilith', 'Case-insensitive name lookup works');

  try {
    getVioletMind('NonExistent');
    assert(false, 'Should throw error for non-existent Mind');
  } catch (e) {
    assert(e.message.includes('not found'), 'Throws error for non-existent Mind');
  }
} catch (err) {
  console.log(`   ✗ Failed: ${err.message}`);
  testsFailed++;
}

console.log('\n3️⃣ Testing Mind List Summary...');
try {
  const summary = listVioletMinds();
  assert(summary.length === 17, `Summary contains all 17 Minds (got ${summary.length})`);
  assert(summary[0].name && summary[0].symbol && summary[0].role, 'Summary has required fields');
  assert(!summary[0].traits, 'Summary excludes detailed traits');
} catch (err) {
  console.log(`   ✗ Failed: ${err.message}`);
  testsFailed++;
}

console.log('\n4️⃣ Testing Vibe Engine — Kaomoji Collections...');
try {
  const engine = new VibeEngine();
  const collections = engine.loadVibeCollections();

  const expectedCategories = [
    'happy', 'smile', 'cheer', 'wink', 'angel', 'bunny', 'bear', 'hug',
    'sad', 'angry', 'surprised', 'sleepy', 'eating', 'laughing', 'chill',
    'confused', 'nervous', 'kissy'
  ];

  expectedCategories.forEach(cat => {
    assert(collections[cat] && collections[cat].length > 0, `Category "${cat}" exists with kaomoji`);
  });

  const allCategories = engine.getAllCategories();
  assert(allCategories.length === expectedCategories.length, `All ${expectedCategories.length} categories loaded`);
} catch (err) {
  console.log(`   ✗ Failed: ${err.message}`);
  testsFailed++;
}

console.log('\n5️⃣ Testing Vibe Engine — Kaomoji Selection...');
try {
  const engine = new VibeEngine();

  const happy1 = engine.getKaomoji('happy');
  assert(KAOMOJI_COLLECTIONS.happy.includes(happy1), 'Selected kaomoji is from happy category');

  const happy2 = engine.getKaomoji('happy');
  assert(happy1 !== happy2, 'No repeat in same session');

  engine.resetSession();
  const happy3 = engine.getKaomoji('happy');
  assert(KAOMOJI_COLLECTIONS.happy.includes(happy3), 'Selection works after session reset');

  try {
    engine.getKaomoji('invalid_category');
    assert(false, 'Should throw error for invalid category');
  } catch (e) {
    assert(e.message.includes('Unknown kaomoji category'), 'Throws error for invalid category');
  }
} catch (err) {
  console.log(`   ✗ Failed: ${err.message}`);
  testsFailed++;
}

console.log('\n6️⃣ Testing Vibe Engine — Mind-Specific Kaomoji...');
try {
  const engine = new VibeEngine();

  const lemiiKaomoji = engine.getMindKaomoji('Lemii');
  assert(typeof lemiiKaomoji === 'string' && lemiiKaomoji.length > 0, 'Lemii kaomoji generated');

  const fayeKaomoji = engine.getMindKaomoji('Faye');
  assert(typeof fayeKaomoji === 'string' && fayeKaomoji.length > 0, 'Faye kaomoji generated');

  const unknownKaomoji = engine.getMindKaomoji('UnknownMind');
  assert(typeof unknownKaomoji === 'string' && unknownKaomoji.length > 0, 'Fallback kaomoji for unknown Mind');

  const moodKaomoji = engine.getMindKaomoji('Lemii', { mood: 'cheer' });
  assert(KAOMOJI_COLLECTIONS.cheer.includes(moodKaomoji), 'Mood context overrides Mind preferences');
} catch (err) {
  console.log(`   ✗ Failed: ${err.message}`);
  testsFailed++;
}

console.log('\n7️⃣ Testing COACH+Kaomoji Integration...');
try {
  const engine = new VibeEngine();
  const minds = loadVioletMinds();

  minds.forEach(mind => {
    const kaomoji = engine.getMindKaomoji(mind.name);
    assert(typeof kaomoji === 'string', `${mind.name} can generate kaomoji`);
  });

  const preferences = MIND_VIBE_PREFERENCES;
  assert(Object.keys(preferences).length >= 17, 'All Minds have vibe preferences defined');
} catch (err) {
  console.log(`   ✗ Failed: ${err.message}`);
  testsFailed++;
}

console.log('\n8️⃣ Testing End-to-End Workflow...');
try {
  const minds = loadVioletMinds();
  const engine = new VibeEngine();

  const lemii = minds.find(m => m.name === 'Lemii');
  assert(lemii, 'Lemii Mind loaded');

  const lemiiKaomoji = engine.getMindKaomoji(lemii.name);
  assert(lemiiKaomoji, 'Kaomoji generated for Lemii');

  const greeting = `${lemii.symbol} ${lemii.name}: Test suite complete ${lemiiKaomoji}`;
  assert(greeting.includes('🍋') && greeting.includes('Lemii'), 'Full greeting constructed');

  console.log(`   ✓ Sample output: "${greeting}"`);
} catch (err) {
  console.log(`   ✗ Failed: ${err.message}`);
  testsFailed++;
}

console.log('\n9️⃣ Testing Mind Schema Validation...');
try {
  const minds = loadVioletMinds();

  minds.forEach(mind => {
    assert(mind.version === 1, `${mind.name} has version 1`);
    assert(mind.traits && mind.traits.thinking_style, `${mind.name} has traits.thinking_style`);
    assert(Array.isArray(mind.triggers), `${mind.name} has triggers array`);
    assert(mind.coordination && mind.coordination.compatible_with, `${mind.name} has coordination config`);
    assert(Array.isArray(mind.evolution), `${mind.name} has evolution history`);
  });
} catch (err) {
  console.log(`   ✗ Failed: ${err.message}`);
  testsFailed++;
}

console.log('\n🔟 Testing Cache and Performance...');
try {
  const start1 = Date.now();
  loadVioletMinds();
  const time1 = Date.now() - start1;

  const start2 = Date.now();
  loadVioletMinds();
  const time2 = Date.now() - start2;

  assert(time2 <= time1, `Cached load is fast (${time2}ms vs ${time1}ms)`);

  const start3 = Date.now();
  loadVioletMinds({ forceReload: true });
  const time3 = Date.now() - start3;

  assert(typeof time3 === 'number', 'Force reload completes successfully');
} catch (err) {
  console.log(`   ✗ Failed: ${err.message}`);
  testsFailed++;
}

console.log('\n' + '='.repeat(60));
console.log(`✨ Verification Complete!`);
console.log(`   Passed: ${testsPassed}`);
console.log(`   Failed: ${testsFailed}`);
console.log(`   Total:  ${testsPassed + testsFailed}`);

if (testsFailed === 0) {
  console.log('\n💜 All tests passed! VioletCore Phase 2.2 is ready. (◕‿◕✿)');
  process.exit(0);
} else {
  console.log(`\n⚠️  ${testsFailed} test(s) failed. Please review.`);
  process.exit(1);
}
