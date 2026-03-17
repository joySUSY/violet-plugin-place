#!/usr/bin/env node
// Authors: Joysusy & Violet Klaudia 💖
// VioletCore — Mind Evolution Test Suite v0.1.0

const { evolveMind, getMindEvolutionHistory, checkMindCompatibility } = require('../sdk/violet-runtime');
const { getVioletMind, clearCache } = require('../sdk/violet-mind-loader');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
    passed++;
  } catch (err) {
    console.error(`❌ ${name}`);
    console.error(`   ${err.message}`);
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

console.log('\n🧪 VioletCore Mind Evolution Test Suite\n');

test('getMindEvolutionHistory returns array', () => {
  const history = getMindEvolutionHistory('Lilith');
  assert(Array.isArray(history), 'History should be an array');
  assert(history.length >= 1, 'Lilith should have at least 1 evolution entry');
});

test('getMindEvolutionHistory includes v2 entry', () => {
  const history = getMindEvolutionHistory('Lilith');
  const v2Entry = history.find(e => e.v === 2);
  assert(v2Entry !== undefined, 'Should have v2 entry');
  assert(v2Entry.note.includes('Enhanced security'), 'v2 note should mention enhanced security');
  assert(v2Entry.author === 'Joysusy, Violet Klaudia', 'v2 should have correct author');
});

test('checkMindCompatibility accepts compatible version', () => {
  const lilith = getVioletMind('Lilith');
  const result = checkMindCompatibility(lilith, 1);
  assert(result.compatible === true, 'Lilith v2 should be compatible with v1 requirement');
  assert(result.currentVersion === 2, 'Current version should be 2');
  assert(result.requiredVersion === 1, 'Required version should be 1');
});

test('checkMindCompatibility accepts exact version', () => {
  const lilith = getVioletMind('Lilith');
  const result = checkMindCompatibility(lilith, 2);
  assert(result.compatible === true, 'Lilith v2 should be compatible with v2 requirement');
});

test('checkMindCompatibility rejects incompatible version', () => {
  const lyre = getVioletMind('Lyre');
  const result = checkMindCompatibility(lyre, 5);
  assert(result.compatible === false, 'Lyre v1 should not be compatible with v5 requirement');
  assert(result.reason.includes('v1'), 'Reason should mention current version');
  assert(result.reason.includes('v5'), 'Reason should mention required version');
});

test('getVioletMind with minVersion accepts compatible Mind', () => {
  const lilith = getVioletMind('Lilith', { minVersion: 1 });
  assert(lilith.name === 'Lilith', 'Should return Lilith');
  assert(lilith.version === 2, 'Should be v2');
});

test('getVioletMind with minVersion rejects incompatible Mind', () => {
  let errorThrown = false;
  try {
    getVioletMind('Lyre', { minVersion: 5 });
  } catch (err) {
    errorThrown = true;
    assert(err.message.includes('version mismatch'), 'Error should mention version mismatch');
    assert(err.message.includes('v1'), 'Error should mention current version');
    assert(err.message.includes('v5'), 'Error should mention required version');
  }
  assert(errorThrown, 'Should throw error for incompatible version');
});

test('evolveMind increments version correctly', () => {
  const lyre = getVioletMind('Lyre');
  const currentVersion = lyre.version;

  const result = evolveMind('Lyre', 'Test evolution for automated testing', {
    author: 'Test Suite',
    date: '2026-03-10'
  });

  assert(result.previousVersion === currentVersion, 'Previous version should match');
  assert(result.newVersion === currentVersion + 1, 'New version should be incremented');
  assert(result.name === 'Lyre', 'Name should be Lyre');

  clearCache();
  const updatedLyre = getVioletMind('Lyre');
  assert(updatedLyre.version === currentVersion + 1, 'Cached Mind should be updated');

  const history = getMindEvolutionHistory('Lyre');
  const lastEntry = history[history.length - 1];
  assert(lastEntry.v === currentVersion + 1, 'Last evolution entry should have new version');
  assert(lastEntry.note === 'Test evolution for automated testing', 'Note should match');
  assert(lastEntry.author === 'Test Suite', 'Author should match');
});

test('clearCache forces reload', () => {
  const before = getVioletMind('Lilith');
  clearCache();
  const after = getVioletMind('Lilith');
  assert(after.name === before.name, 'Mind should still load after cache clear');
  assert(after.version === before.version, 'Version should be consistent');
});

console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);

if (failed > 0) {
  process.exit(1);
}
