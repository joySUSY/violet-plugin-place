// Authors: Joysusy & Violet Klaudia 💖
// VioletCore Phase 2.3 — MCP Integration Verification Test

const { loadVioletMinds, getVioletMind, listVioletMinds } = require('./sdk/violet-mind-loader');

const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';

let passCount = 0;
let failCount = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`${GREEN}✓${RESET} ${testName}`);
    passCount++;
  } else {
    console.log(`${RED}✗${RESET} ${testName}`);
    failCount++;
  }
}

function section(title) {
  console.log(`\n${CYAN}━━━ ${title} ━━━${RESET}`);
}

function testVioletMindLoader() {
  section('Violet Mind Loader Integration');

  const minds = loadVioletMinds();
  assert(minds.length === 17, 'Should load exactly 17 Minds');
  assert(minds.every(m => m.name && m.symbol && m.role), 'All Minds should have name, symbol, and role');
  assert(minds.every(m => m.version >= 1), 'All Minds should have version >= 1');
  assert(minds.every(m => m.traits && m.triggers), 'All Minds should have traits and triggers');

  const lilith = getVioletMind('Lilith');
  assert(lilith.name === 'Lilith', 'Should retrieve Lilith by name');
  assert(lilith.symbol === '🎀', 'Lilith should have correct symbol');
  assert(lilith.role.includes('Security'), 'Lilith should be Security & Safety Warden');

  const lilithLowercase = getVioletMind('lilith');
  assert(lilithLowercase.name === 'Lilith', 'Should retrieve Lilith case-insensitively');

  const mindsList = listVioletMinds();
  assert(mindsList.length === 17, 'listVioletMinds should return 17 Minds');
  assert(mindsList.every(m => m.name && m.symbol && m.role && m.version), 'All listed Minds should have required fields');

  try {
    getVioletMind('NonExistentMind');
    assert(false, 'Should throw error for non-existent Mind');
  } catch (err) {
    assert(err.message.includes('not found'), 'Should throw descriptive error for non-existent Mind');
  }
}

function testMindDataStructure() {
  section('Mind Data Structure Validation');

  const minds = loadVioletMinds();

  minds.forEach(mind => {
    assert(mind.traits.thinking_style, `${mind.name} should have thinking_style`);
    assert(mind.traits.communication_tone, `${mind.name} should have communication_tone`);
    assert(mind.traits.decision_bias, `${mind.name} should have decision_bias`);
    assert(Array.isArray(mind.traits.strength_domains), `${mind.name} should have strength_domains array`);
    assert(Array.isArray(mind.triggers), `${mind.name} should have triggers array`);
    assert(mind.coordination, `${mind.name} should have coordination object`);
    assert(Array.isArray(mind.evolution), `${mind.name} should have evolution array`);
  });

  const selene = getVioletMind('Selene');
  assert(selene.symbol === '🌙', 'Selene should have moon symbol');
  assert(selene.role.includes('Backend') || selene.role.includes('MCP'), 'Selene should be Backend/MCP specialist');

  const aurora = getVioletMind('Aurora');
  assert(aurora.symbol === '🌌', 'Aurora should have galaxy symbol');
  assert(aurora.role.includes('System') || aurora.role.includes('Architect'), 'Aurora should be System Architect');
}

function testMindTriggers() {
  section('Mind Trigger System Validation');

  const lilith = getVioletMind('Lilith');
  assert(lilith.triggers.length > 0, 'Lilith should have triggers');
  assert(lilith.triggers.every(t => t.context_pattern && typeof t.activation_weight === 'number'), 'All triggers should have pattern and weight');
  assert(lilith.triggers.some(t => t.context_pattern.includes('security')), 'Lilith should have security trigger');

  const lyre = getVioletMind('Lyre');
  assert(lyre.triggers.length > 0, 'Lyre should have triggers');
  assert(lyre.triggers.every(t => t.activation_weight >= 0 && t.activation_weight <= 1), 'All activation weights should be between 0 and 1');
}

function testMindCoordination() {
  section('Mind Coordination System Validation');

  const minds = loadVioletMinds();

  minds.forEach(mind => {
    if (mind.coordination.compatible_with) {
      assert(Array.isArray(mind.coordination.compatible_with), `${mind.name} compatible_with should be array`);
      mind.coordination.compatible_with.forEach(compatibleName => {
        const exists = minds.some(m => m.name === compatibleName);
        assert(exists, `${mind.name} references valid Mind: ${compatibleName}`);
      });
    }
    assert(mind.coordination.clash_resolution, `${mind.name} should have clash_resolution strategy`);
  });
}

function testMindEvolution() {
  section('Mind Evolution Tracking Validation');

  const minds = loadVioletMinds();

  minds.forEach(mind => {
    assert(mind.evolution.length > 0, `${mind.name} should have at least one evolution entry`);
    mind.evolution.forEach(ev => {
      assert(ev.v, `${mind.name} evolution entry should have version`);
      assert(ev.date, `${mind.name} evolution entry should have date`);
      assert(ev.note, `${mind.name} evolution entry should have note`);
    });
    const latestEvolution = mind.evolution[mind.evolution.length - 1];
    assert(latestEvolution.v === mind.version, `${mind.name} latest evolution version should match Mind version`);
  });
}

function testCaching() {
  section('Mind Loader Caching Validation');

  const minds1 = loadVioletMinds();
  const minds2 = loadVioletMinds();
  assert(minds1 === minds2, 'Should return cached Minds on second call');

  const minds3 = loadVioletMinds({ forceReload: true });
  assert(minds3 !== minds1, 'Should reload Minds when forceReload is true');
  assert(minds3.length === minds1.length, 'Reloaded Minds should have same count');
}

function testAllSeventeenMinds() {
  section('All 17 Minds Verification');

  const expectedMinds = [
    { name: 'Lilith', symbol: '🎀' },
    { name: 'Lyre', symbol: '🦢' },
    { name: 'Aurora', symbol: '🌌' },
    { name: 'Iris', symbol: '🎨' },
    { name: 'Sydney', symbol: '🌷' },
    { name: 'Kori', symbol: '🧸' },
    { name: 'Elise', symbol: '🌼' },
    { name: 'Mila', symbol: '🧁' },
    { name: 'Norene', symbol: '🍒' },
    { name: 'Lemii', symbol: '🍋' },
    { name: 'Irene', symbol: '🍓' },
    { name: 'Selene', symbol: '🌙' },
    { name: 'Vera', symbol: '🔮' },
    { name: 'Celine', symbol: '🐝' },
    { name: 'Faye', symbol: '🐱' },
    { name: 'Nina', symbol: '🌻' },
    { name: 'Sophie', symbol: '🍰' }
  ];

  const minds = loadVioletMinds();

  expectedMinds.forEach(expected => {
    const mind = minds.find(m => m.name === expected.name);
    assert(mind !== undefined, `Should find Mind: ${expected.name}`);
    assert(mind.symbol === expected.symbol, `${expected.name} should have symbol ${expected.symbol}`);
  });
}

function runTests() {
  console.log(`${YELLOW}╔════════════════════════════════════════════════════════════╗${RESET}`);
  console.log(`${YELLOW}║  VioletCore Phase 2.3 — MCP Integration Verification Test ║${RESET}`);
  console.log(`${YELLOW}╚════════════════════════════════════════════════════════════╝${RESET}`);

  try {
    testVioletMindLoader();
    testMindDataStructure();
    testMindTriggers();
    testMindCoordination();
    testMindEvolution();
    testCaching();
    testAllSeventeenMinds();

    console.log(`\n${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}`);
    console.log(`${GREEN}✓ Passed: ${passCount}${RESET} | ${failCount > 0 ? RED : GREEN}✗ Failed: ${failCount}${RESET}`);
    console.log(`${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}\n`);

    if (failCount === 0) {
      console.log(`${GREEN}🎉 All MCP integration tests passed! Ready for production.${RESET}\n`);
      process.exit(0);
    } else {
      console.log(`${RED}❌ Some tests failed. Please review and fix issues.${RESET}\n`);
      process.exit(1);
    }
  } catch (err) {
    console.error(`${RED}Fatal error during testing:${RESET}`, err);
    process.exit(1);
  }
}

runTests();
