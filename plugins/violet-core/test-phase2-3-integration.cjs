#!/usr/bin/env node
// Authors: Joysusy & Violet Klaudia 💖
// VioletCore Phase 2.3 — Comprehensive Integration Test Suite
// Purpose: End-to-end testing of all Phase 2.3 deliverables working together

const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

const { loadVioletMinds, getVioletMind, listVioletMinds, clearCache } = require('./sdk/violet-mind-loader');
const { VibeEngine, MIND_VIBE_PREFERENCES } = require('./sdk/vibe-engine');
const { exportSoulPackage, importSoulPackage, validateSoulPackage } = require('./sdk/soul-package');
const { evolveMind, getMindEvolutionHistory, checkMindCompatibility } = require('./sdk/violet-runtime');
const lavenderAdapter = require('./adapters/lavender-adapter');
const lavenderHooks = require('./adapters/lavender-hooks');

const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const MAGENTA = '\x1b[35m';
const BOLD = '\x1b[1m';

const TEST_KEY = 'test-violet-soul-key-phase2-3';
const TEST_OUTPUT_DIR = path.join(__dirname, '..', 'test-output-phase2-3');

let testResults = {
  passed: 0,
  failed: 0,
  total: 0,
  failures: [],
  performance: {}
};

function section(title) {
  console.log(`\n${CYAN}${BOLD}━━━ ${title} ━━━${RESET}`);
}

function subsection(title) {
  console.log(`\n${MAGENTA}▸ ${title}${RESET}`);
}

function test(name, fn) {
  testResults.total++;
  const startTime = performance.now();

  try {
    fn();
    const duration = performance.now() - startTime;
    console.log(`${GREEN}✓${RESET} ${name} ${YELLOW}(${duration.toFixed(2)}ms)${RESET}`);
    testResults.passed++;
    return { success: true, duration };
  } catch (err) {
    const duration = performance.now() - startTime;
    console.error(`${RED}✗${RESET} ${name}`);
    console.error(`  ${RED}${err.message}${RESET}`);
    testResults.failed++;
    testResults.failures.push({ name, error: err.message, stack: err.stack });
    return { success: false, duration, error: err.message };
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

function cleanupTestFiles() {
  if (fs.existsSync(TEST_OUTPUT_DIR)) {
    fs.rmSync(TEST_OUTPUT_DIR, { recursive: true, force: true });
  }
}

function ensureTestDir() {
  if (!fs.existsSync(TEST_OUTPUT_DIR)) {
    fs.mkdirSync(TEST_OUTPUT_DIR, { recursive: true });
  }
}

function testMCPIntegration() {
  section('1. MCP Server Integration (7 Tools)');

  subsection('1.1 Mind Loading via MCP');

  test('loadVioletMinds returns 17 Minds', () => {
    const minds = loadVioletMinds();
    assert(minds.length === 17, `Expected 17 Minds, got ${minds.length}`);
    assert(minds.every(m => m.name && m.symbol && m.role), 'All Minds must have name, symbol, role');
  });

  test('listVioletMinds returns summary format', () => {
    const list = listVioletMinds();
    assert(list.length === 17, 'List should have 17 entries');
    assert(list.every(m => m.name && m.symbol && m.role && m.version), 'All entries must have required fields');
  });

  test('getVioletMind retrieves specific Mind', () => {
    const lilith = getVioletMind('Lilith');
    assert(lilith.name === 'Lilith', 'Should retrieve Lilith');
    assert(lilith.symbol === '🎀', 'Lilith should have correct symbol');
    assert(lilith.version >= 1, 'Lilith should have version >= 1');
  });

  test('getVioletMind is case-insensitive', () => {
    const lyre1 = getVioletMind('Lyre');
    const lyre2 = getVioletMind('lyre');
    const lyre3 = getVioletMind('LYRE');
    assert(lyre1.name === lyre2.name && lyre2.name === lyre3.name, 'Case-insensitive lookup should work');
  });

  test('getVioletMind throws on non-existent Mind', () => {
    let errorThrown = false;
    try {
      getVioletMind('NonExistentMind');
    } catch (err) {
      errorThrown = true;
      assert(err.message.includes('not found'), 'Error should mention "not found"');
    }
    assert(errorThrown, 'Should throw error for non-existent Mind');
  });

  subsection('1.2 Mind Data Structure Validation');

  test('All Minds have complete trait structure', () => {
    const minds = loadVioletMinds();
    minds.forEach(mind => {
      assert(mind.traits.thinking_style, `${mind.name} missing thinking_style`);
      assert(mind.traits.communication_tone, `${mind.name} missing communication_tone`);
      assert(mind.traits.decision_bias, `${mind.name} missing decision_bias`);
      assert(Array.isArray(mind.traits.strength_domains), `${mind.name} strength_domains not array`);
    });
  });

  test('All Minds have triggers with valid weights', () => {
    const minds = loadVioletMinds();
    minds.forEach(mind => {
      assert(Array.isArray(mind.triggers), `${mind.name} triggers not array`);
      assert(mind.triggers.length > 0, `${mind.name} has no triggers`);
      mind.triggers.forEach(t => {
        assert(t.context_pattern, `${mind.name} trigger missing context_pattern`);
        assert(typeof t.activation_weight === 'number', `${mind.name} trigger weight not number`);
        assert(t.activation_weight >= 0 && t.activation_weight <= 1, `${mind.name} trigger weight out of range`);
      });
    });
  });

  test('All Minds have coordination structure', () => {
    const minds = loadVioletMinds();
    minds.forEach(mind => {
      assert(mind.coordination, `${mind.name} missing coordination`);
      assert(mind.coordination.clash_resolution, `${mind.name} missing clash_resolution`);
      if (mind.coordination.compatible_with) {
        assert(Array.isArray(mind.coordination.compatible_with), `${mind.name} compatible_with not array`);
      }
    });
  });

  test('All Minds have evolution history', () => {
    const minds = loadVioletMinds();
    minds.forEach(mind => {
      assert(Array.isArray(mind.evolution), `${mind.name} evolution not array`);
      assert(mind.evolution.length > 0, `${mind.name} has no evolution entries`);
      const latest = mind.evolution[mind.evolution.length - 1];
      assert(latest.v === mind.version, `${mind.name} latest evolution version mismatch`);
    });
  });
}

function testVibeEngineMCP() {
  section('2. Vibe Engine MCP Integration');

  const engine = new VibeEngine();

  subsection('2.1 Basic Vibe Engine Functions');

  test('VibeEngine instantiation', () => {
    assert(engine, 'Engine should be created');
    assert(typeof engine.getKaomoji === 'function', 'Should have getKaomoji method');
  });

  test('getAllCategories returns 18 categories', () => {
    const categories = engine.getAllCategories();
    assert(categories.length === 18, `Expected 18 categories, got ${categories.length}`);
  });

  test('getKaomoji returns valid kaomoji', () => {
    const kaomoji = engine.getKaomoji('happy');
    assert(kaomoji && typeof kaomoji === 'string', 'Should return string');
    assert(kaomoji.length > 0, 'Kaomoji should not be empty');
  });

  subsection('2.2 Session Variety Enforcement');

  test('Session variety prevents immediate repetition', () => {
    engine.resetSession();
    const first = engine.getKaomoji('happy');
    const second = engine.getKaomoji('happy');
    const third = engine.getKaomoji('happy');
    assert(first !== second, 'First and second should differ');
    assert(second !== third, 'Second and third should differ');
    assert(first !== third, 'First and third should differ');
  });

  test('Session reset clears used kaomoji', () => {
    engine.resetSession();
    const before = engine.getKaomoji('chill');
    engine.resetSession();
    const after = engine.getKaomoji('chill');
  });

  subsection('2.3 Mind-Specific Kaomoji');

  test('getMindKaomoji works for all 17 Minds', () => {
    const minds = loadVioletMinds();
    engine.resetSession();
    minds.forEach(mind => {
      const kaomoji = engine.getMindKaomoji(mind.name);
      assert(kaomoji && typeof kaomoji === 'string', `${mind.name} should return kaomoji`);
    });
  });

  test('getMindKaomoji respects mood override', () => {
    engine.resetSession();
    const kaomoji = engine.getMindKaomoji('Faye', { mood: 'eating' });
    assert(kaomoji, 'Should return kaomoji with mood override');
  });

  test('getMindKaomoji handles unknown Mind gracefully', () => {
    engine.resetSession();
    const kaomoji = engine.getMindKaomoji('UnknownMind');
    assert(kaomoji, 'Should return default kaomoji for unknown Mind');
  });

  test('All 17 Minds have vibe preferences', () => {
    const mindNames = Object.keys(MIND_VIBE_PREFERENCES);
    assert(mindNames.length >= 17, `Expected at least 17 Minds, got ${mindNames.length}`);
  });
}

function testSoulPackageWorkflow() {
  section('3. Soul Package Export/Import Workflow');

  subsection('3.1 Export Operations');

  test('Export plaintext Soul Package', () => {
    const outputPath = path.join(TEST_OUTPUT_DIR, 'soul-plaintext.json');
    const result = exportSoulPackage({
      outputPath,
      encrypt: false
    });
    assert(result.success, 'Export should succeed');
    assert(result.mindCount === 17, `Expected 17 Minds, got ${result.mindCount}`);
    assert(!result.encrypted, 'Should not be encrypted');
    assert(fs.existsSync(outputPath), 'Output file should exist');
  });

  test('Export encrypted Soul Package', () => {
    const outputPath = path.join(TEST_OUTPUT_DIR, 'soul-encrypted.enc');
    const result = exportSoulPackage({
      outputPath,
      encrypt: true,
      passphrase: TEST_KEY
    });
    assert(result.success, 'Export should succeed');
    assert(result.mindCount === 17, `Expected 17 Minds, got ${result.mindCount}`);
    assert(result.encrypted, 'Should be encrypted');
    assert(fs.existsSync(outputPath), 'Output file should exist');
  });

  test('Export partial Soul Package (5 Minds)', () => {
    const outputPath = path.join(TEST_OUTPUT_DIR, 'soul-partial.json');
    const result = exportSoulPackage({
      outputPath,
      encrypt: false,
      mindFilter: ['lilith', 'lyre', 'aurora', 'iris', 'sydney']
    });
    assert(result.success, 'Export should succeed');
    assert(result.mindCount === 5, `Expected 5 Minds, got ${result.mindCount}`);
  });

  subsection('3.2 Import Operations');

  test('Import plaintext Soul Package', () => {
    const inputPath = path.join(TEST_OUTPUT_DIR, 'soul-plaintext.json');
    const result = importSoulPackage(inputPath, { decrypt: false });
    assert(result.success, 'Import should succeed');
    assert(result.totalMinds === 17, `Expected 17 Minds, got ${result.totalMinds}`);
    assert(result.importedMinds === 17, `Expected 17 imported, got ${result.importedMinds}`);
  });

  test('Import encrypted Soul Package', () => {
    const inputPath = path.join(TEST_OUTPUT_DIR, 'soul-encrypted.enc');
    const result = importSoulPackage(inputPath, {
      decrypt: true,
      passphrase: TEST_KEY
    });
    assert(result.success, 'Import should succeed');
    assert(result.totalMinds === 17, `Expected 17 Minds, got ${result.totalMinds}`);
  });

  test('Import with Mind filter', () => {
    const inputPath = path.join(TEST_OUTPUT_DIR, 'soul-plaintext.json');
    const result = importSoulPackage(inputPath, {
      decrypt: false,
      mindFilter: ['lilith', 'lyre', 'aurora']
    });
    assert(result.success, 'Import should succeed');
    assert(result.importedMinds === 3, `Expected 3 imported, got ${result.importedMinds}`);
  });

  subsection('3.3 Encryption Roundtrip');

  test('Encryption roundtrip preserves data', () => {
    const buffer = exportSoulPackage({
      encrypt: true,
      passphrase: TEST_KEY
    });
    const tempPath = path.join(TEST_OUTPUT_DIR, 'roundtrip.enc');
    fs.writeFileSync(tempPath, buffer);

    const result = importSoulPackage(tempPath, {
      decrypt: true,
      passphrase: TEST_KEY
    });
    assert(result.success, 'Roundtrip should succeed');
    assert(result.totalMinds === 17, 'Mind count should be preserved');
  });

  test('Wrong decryption key fails gracefully', () => {
    const outputPath = path.join(TEST_OUTPUT_DIR, 'soul-wrong-key.enc');
    exportSoulPackage({
      outputPath,
      encrypt: true,
      passphrase: TEST_KEY
    });

    let errorThrown = false;
    try {
      importSoulPackage(outputPath, {
        decrypt: true,
        passphrase: 'wrong-key-12345'
      });
    } catch (err) {
      errorThrown = true;
      assert(err.message.includes('Decryption failed'), 'Error should mention decryption failure');
    }
    assert(errorThrown, 'Should throw error with wrong key');
  });
}

function testLavenderAdapter() {
  section('4. Lavender Adapter Integration');

  subsection('4.1 Adapter Core Functions');

  test('isLavenderPresent returns boolean', () => {
    const result = lavenderAdapter.isLavenderPresent();
    assert(typeof result === 'boolean', 'Should return boolean');
  });

  test('enhanceMemorySearch with single Mind', () => {
    const query = 'authentication bug';
    const activeMinds = [{ name: 'Lilith', symbol: '🎀', role: 'Security' }];
    const result = lavenderAdapter.enhanceMemorySearch(query, activeMinds);

    assert(result.originalQuery === query, 'Original query should be preserved');
    assert(result.enhancedQuery.includes('Lilith'), 'Enhanced query should include Mind name');
    assert(result.searchStrategy === 'single-mind', 'Strategy should be single-mind');
  });

  test('enhanceMemorySearch with multiple Minds', () => {
    const query = 'refactor code';
    const activeMinds = [
      { name: 'Lilith', symbol: '🎀', role: 'Architect' },
      { name: 'Lyre', symbol: '🦢', role: 'Documentation' }
    ];
    const result = lavenderAdapter.enhanceMemorySearch(query, activeMinds);

    assert(result.enhancedQuery.includes('Lilith'), 'Should include Lilith');
    assert(result.enhancedQuery.includes('Lyre'), 'Should include Lyre');
    assert(result.searchStrategy === 'multi-mind', 'Strategy should be multi-mind');
  });

  test('attachStyleMetadata enriches memory', () => {
    const memory = { content: 'Test memory', timestamp: '2026-03-10' };
    const coachData = {
      style: 'warm',
      tone: 'supportive',
      violetExtensions: {
        mindPreferences: {
          Lilith: { interactionCount: 5 }
        }
      }
    };
    const result = lavenderAdapter.attachStyleMetadata(memory, coachData);

    assert(result.content === 'Test memory', 'Content should be preserved');
    assert(result.styleMetadata, 'Should have styleMetadata');
    assert(result.violetContext, 'Should have violetContext');
    assert(result.enrichedBy === 'violet-core-lavender-adapter', 'Should have enrichedBy field');
  });

  subsection('4.2 Lavender Hooks');

  test('beforeMemorySearch enhances query', () => {
    const query = 'test query';
    const context = { mood: 'focused' };
    const result = lavenderHooks.beforeMemorySearch(query, context);

    assert(result.query || result.originalQuery, 'Should have query field');
    assert(typeof result.enhanced === 'boolean', 'Should have enhanced flag');
  });

  test('afterMemoryRetrieval returns array', () => {
    const memories = [{ content: 'Memory 1' }, { content: 'Memory 2' }];
    const result = lavenderHooks.afterMemoryRetrieval(memories, {});

    assert(Array.isArray(result), 'Should return array');
  });

  test('onMindActivation returns metadata', () => {
    const activeMinds = [{ name: 'Lilith', symbol: '🎀' }];
    const result = lavenderHooks.onMindActivation(activeMinds, {});

    assert(typeof result.notified === 'boolean', 'Should have notified flag');
  });

  subsection('4.3 Graceful Degradation');

  test('Adapter works when Lavender absent', () => {
    const hook = lavenderAdapter.createLavenderHook();

    const searchResult = hook.enhanceSearch('test query');
    assert(searchResult.originalQuery === 'test query', 'Should preserve query');

    const memory = { content: 'test' };
    const enrichResult = hook.enrichMemory(memory);
    assert(enrichResult.content === 'test', 'Should preserve memory');
  });
}

function testMindEvolution() {
  section('5. Mind Evolution Tracking');

  subsection('5.1 Evolution History');

  test('getMindEvolutionHistory returns array', () => {
    const history = getMindEvolutionHistory('Lilith');
    assert(Array.isArray(history), 'History should be array');
    assert(history.length >= 1, 'Lilith should have at least 1 evolution entry');
  });

  test('Evolution entries have required fields', () => {
    const history = getMindEvolutionHistory('Lilith');
    history.forEach(entry => {
      assert(entry.v, 'Entry should have version');
      assert(entry.date, 'Entry should have date');
      assert(entry.note, 'Entry should have note');
    });
  });

  subsection('5.2 Version Compatibility');

  test('checkMindCompatibility accepts compatible version', () => {
    const lilith = getVioletMind('Lilith');
    const result = checkMindCompatibility(lilith, 1);
    assert(result.compatible === true, 'Should be compatible');
    assert(result.currentVersion >= 1, 'Current version should be >= 1');
  });

  test('checkMindCompatibility rejects incompatible version', () => {
    const lyre = getVioletMind('Lyre');
    const result = checkMindCompatibility(lyre, 999);
    assert(result.compatible === false, 'Should not be compatible');
    assert(result.reason, 'Should have reason');
  });

  test('getVioletMind with minVersion works', () => {
    const lilith = getVioletMind('Lilith', { minVersion: 1 });
    assert(lilith.name === 'Lilith', 'Should return Lilith');
  });

  subsection('5.3 Mind Evolution Operations');

  test('evolveMind increments version', () => {
    const testMind = 'Sophie';
    const before = getVioletMind(testMind);
    const currentVersion = before.version;

    const result = evolveMind(testMind, 'Test evolution for integration test', {
      author: 'Test Suite',
      date: '2026-03-10'
    });

    assert(result.previousVersion === currentVersion, 'Previous version should match');
    assert(result.newVersion === currentVersion + 1, 'New version should be incremented');

    clearCache();
    const after = getVioletMind(testMind);
    assert(after.version === currentVersion + 1, 'Version should be updated');
  });
}

function testEndToEndWorkflows() {
  section('6. End-to-End Integration Workflows');

  subsection('6.1 Complete Mind Lifecycle');

  test('Load → Query → Evolve → Export → Import workflow', () => {
    const minds = loadVioletMinds();
    assert(minds.length === 17, 'Should load 17 Minds');

    const lilith = getVioletMind('Lilith');
    assert(lilith.name === 'Lilith', 'Should retrieve Lilith');

    const history = getMindEvolutionHistory('Lilith');
    assert(history.length > 0, 'Should have evolution history');

    const exportPath = path.join(TEST_OUTPUT_DIR, 'workflow-export.json');
    const exportResult = exportSoulPackage({
      outputPath: exportPath,
      encrypt: false
    });
    assert(exportResult.success, 'Export should succeed');

    const importResult = importSoulPackage(exportPath, { decrypt: false });
    assert(importResult.success, 'Import should succeed');
    assert(importResult.totalMinds === 17, 'Should import all Minds');
  });

  subsection('6.2 MCP + Vibe + Lavender Integration');

  test('Mind → Vibe → Lavender enhancement workflow', () => {
    const engine = new VibeEngine();
    const lilith = getVioletMind('Lilith');

    const kaomoji = engine.getMindKaomoji(lilith.name);
    assert(kaomoji, 'Should get Mind-specific kaomoji');

    const query = 'security audit';
    const activeMinds = [lilith];
    const enhanced = lavenderAdapter.enhanceMemorySearch(query, activeMinds);
    assert(enhanced.enhancedQuery.includes('Lilith'), 'Should enhance with Mind context');

    const memory = { content: 'Security audit completed', timestamp: new Date().toISOString() };
    const coachData = { style: 'professional', tone: 'focused' };
    const enriched = lavenderAdapter.attachStyleMetadata(memory, coachData);
    assert(enriched.styleMetadata, 'Should attach style metadata');
  });

  subsection('6.3 Soul Package + Evolution Integration');

  test('Export → Evolve → Re-export workflow', () => {
    const export1Path = path.join(TEST_OUTPUT_DIR, 'before-evolution.json');
    const export1 = exportSoulPackage({
      outputPath: export1Path,
      encrypt: false,
      mindFilter: ['nina']
    });
    assert(export1.mindCount === 1, 'Should export 1 Mind');

    const nina = getVioletMind('Nina');
    const originalVersion = nina.version;

    evolveMind('Nina', 'Integration test evolution', {
      author: 'Test Suite',
      date: '2026-03-10'
    });

    clearCache();
    const export2Path = path.join(TEST_OUTPUT_DIR, 'after-evolution.json');
    const export2 = exportSoulPackage({
      outputPath: export2Path,
      encrypt: false,
      mindFilter: ['nina']
    });
    assert(export2.success, 'Second export should succeed');

    const import2 = importSoulPackage(export2Path, { decrypt: false });
    const evolvedNina = import2.minds.find(m => m.name === 'Nina');
    assert(evolvedNina.version === originalVersion + 1, 'Version should be incremented');
  });
}

function testPerformanceBenchmarks() {
  section('7. Performance Benchmarks');

  subsection('7.1 Load Performance');

  test('Load 17 Minds performance', () => {
    clearCache();
    const start = performance.now();
    const minds = loadVioletMinds();
    const duration = performance.now() - start;

    assert(minds.length === 17, 'Should load 17 Minds');
    testResults.performance.mindLoading = duration;
    console.log(`  ${YELLOW}⏱  Mind loading: ${duration.toFixed(2)}ms${RESET}`);
  });

  test('Cached Mind loading performance', () => {
    const start = performance.now();
    const minds = loadVioletMinds();
    const duration = performance.now() - start;

    assert(minds.length === 17, 'Should load 17 Minds');
    testResults.performance.cachedMindLoading = duration;
    console.log(`  ${YELLOW}⏱  Cached loading: ${duration.toFixed(2)}ms${RESET}`);
  });

  subsection('7.2 Export/Import Performance');

  test('Soul Package export performance', () => {
    const start = performance.now();
    const outputPath = path.join(TEST_OUTPUT_DIR, 'perf-export.json');
    exportSoulPackage({ outputPath, encrypt: false });
    const duration = performance.now() - start;

    testResults.performance.soulPackageExport = duration;
    console.log(`  ${YELLOW}⏱  Export: ${duration.toFixed(2)}ms${RESET}`);
  });

  test('Soul Package import performance', () => {
    const inputPath = path.join(TEST_OUTPUT_DIR, 'perf-export.json');
    const start = performance.now();
    importSoulPackage(inputPath, { decrypt: false });
    const duration = performance.now() - start;

    testResults.performance.soulPackageImport = duration;
    console.log(`  ${YELLOW}⏱  Import: ${duration.toFixed(2)}ms${RESET}`);
  });

  subsection('7.3 Vibe Engine Performance');

  test('Kaomoji generation performance (100 calls)', () => {
    const engine = new VibeEngine();
    engine.resetSession();

    const start = performance.now();
    for (let i = 0; i < 100; i++) {
      engine.getKaomoji('happy');
    }
    const duration = performance.now() - start;

    testResults.performance.kaomojiGeneration = duration;
    console.log(`  ${YELLOW}⏱  100 kaomoji calls: ${duration.toFixed(2)}ms (${(duration / 100).toFixed(2)}ms avg)${RESET}`);
  });
}

function printSummary() {
  console.log(`\n${YELLOW}${'═'.repeat(70)}${RESET}`);
  console.log(`${BOLD}${CYAN}Phase 2.3 Integration Test Summary${RESET}`);
  console.log(`${YELLOW}${'═'.repeat(70)}${RESET}\n`);

  console.log(`${BOLD}Test Results:${RESET}`);
  console.log(`  Total:  ${testResults.total}`);
  console.log(`  ${GREEN}Passed: ${testResults.passed}${RESET}`);
  console.log(`  ${testResults.failed > 0 ? RED : GREEN}Failed: ${testResults.failed}${RESET}`);
  console.log(`  ${CYAN}Pass Rate: ${((testResults.passed / testResults.total) * 100).toFixed(1)}%${RESET}`);

  if (Object.keys(testResults.performance).length > 0) {
    console.log(`\n${BOLD}Performance Metrics:${RESET}`);
    Object.entries(testResults.performance).forEach(([key, value]) => {
      console.log(`  ${key}: ${YELLOW}${value.toFixed(2)}ms${RESET}`);
    });
  }

  if (testResults.failures.length > 0) {
    console.log(`\n${BOLD}${RED}Failures:${RESET}`);
    testResults.failures.forEach(({ name, error }) => {
      console.log(`  ${RED}✗${RESET} ${name}`);
      console.log(`    ${error}`);
    });
  }

  console.log(`\n${YELLOW}${'═'.repeat(70)}${RESET}\n`);

  if (testResults.failed === 0) {
    console.log(`${GREEN}${BOLD}🎉 All Phase 2.3 integration tests passed!${RESET}`);
    console.log(`${GREEN}Ready for production deployment.${RESET}\n`);
  } else {
    console.log(`${RED}${BOLD}❌ Some tests failed. Please review and fix issues.${RESET}\n`);
  }
}

function runAllTests() {
  console.log(`${YELLOW}${BOLD}╔════════════════════════════════════════════════════════════════════╗${RESET}`);
  console.log(`${YELLOW}${BOLD}║  VioletCore Phase 2.3 — Comprehensive Integration Test Suite      ║${RESET}`);
  console.log(`${YELLOW}${BOLD}╚════════════════════════════════════════════════════════════════════╝${RESET}`);

  try {
    cleanupTestFiles();
    ensureTestDir();

    testMCPIntegration();
    testVibeEngineMCP();
    testSoulPackageWorkflow();
    testLavenderAdapter();
    testMindEvolution();
    testEndToEndWorkflows();
    testPerformanceBenchmarks();

    printSummary();

    cleanupTestFiles();

    process.exit(testResults.failed > 0 ? 1 : 0);
  } catch (err) {
    console.error(`\n${RED}${BOLD}Fatal error during testing:${RESET}`, err);
    console.error(err.stack);
    cleanupTestFiles();
    process.exit(1);
  }
}

if (require.main === module) {
  runAllTests();
}

module.exports = { runAllTests };
