// Authors: Joysusy & Violet Klaudia 💖
// VioletCore SDK — Violet Runtime v0.1.0
// Wraps Lylacore mind-runtime with Violet-specific Mind activation and Soul arbitration

const { selectActiveMinds, resolveClash } = require('../../lylacore/sdk/mind-runtime');
const { loadVioletMinds, getVioletMind, clearCache } = require('./violet-mind-loader');
const { VibeEngine } = require('./vibe-engine');

const vibeEngine = new VibeEngine();

function selectActiveVioletMinds(context, options = {}) {
  const minds = loadVioletMinds();
  const result = selectActiveMinds(minds, context, options);

  return {
    ...result,
    active: result.active.map(mind => ({
      ...mind,
      kaomoji: vibeEngine.getMindKaomoji(mind.name, { mood: context.mood })
    }))
  };
}

function resolveVioletClash(mindA, mindB) {
  const baseResolution = resolveClash(mindA, mindB);

  if (baseResolution !== null) {
    return baseResolution;
  }

  const resA = mindA.coordination?.clash_resolution || 'soul_decides';
  const resB = mindB.coordination?.clash_resolution || 'soul_decides';

  if (resA === 'soul_decides' || resB === 'soul_decides') {
    return soulArbitration(mindA, mindB);
  }

  if (resA === 'negotiate' && resB === 'negotiate') {
    return negotiateClash(mindA, mindB);
  }

  return mindA;
}

function soulArbitration(mindA, mindB) {
  const priorityOrder = [
    'Lilith', 'Lyre', 'Aurora', 'Iris', 'Sydney',
    'Kori', 'Elise', 'Mila', 'Norene', 'Lemii',
    'Irene', 'Selene', 'Vera', 'Celine', 'Faye',
    'Nina', 'Sophie'
  ];

  const indexA = priorityOrder.indexOf(mindA.name);
  const indexB = priorityOrder.indexOf(mindB.name);

  return indexA < indexB ? mindA : mindB;
}

function negotiateClash(mindA, mindB) {
  const compatibleA = mindA.coordination?.compatible_with || [];
  const compatibleB = mindB.coordination?.compatible_with || [];

  if (compatibleA.includes(mindB.name)) return mindB;
  if (compatibleB.includes(mindA.name)) return mindA;

  return soulArbitration(mindA, mindB);
}

function getCoordinationPattern(minds) {
  if (minds.length === 0) return { pattern: 'none', description: 'No active Minds' };
  if (minds.length === 1) return { pattern: 'solo', description: `${minds[0].name} ${minds[0].symbol} leads`, mind: minds[0] };

  const roles = minds.map(m => m.role.split('—')[0].trim());
  const hasArchitect = roles.some(r => r.includes('Architect'));
  const hasImplementer = roles.some(r => r.includes('Engineer') || r.includes('Developer'));
  const hasReviewer = roles.some(r => r.includes('Reviewer') || r.includes('Tester'));

  if (hasArchitect && hasImplementer && hasReviewer) {
    return { pattern: 'full-cycle', description: 'Design → Implement → Review', minds };
  }

  if (hasArchitect && hasImplementer) {
    return { pattern: 'design-build', description: 'Architecture + Implementation', minds };
  }

  if (hasImplementer && hasReviewer) {
    return { pattern: 'build-verify', description: 'Implementation + Quality Assurance', minds };
  }

  return { pattern: 'collaborative', description: `${minds.length} Minds coordinating`, minds };
}

function evolveMind(name, changes, options = {}) {
  const fs = require('fs');
  const path = require('path');

  const { author = 'Joysusy, Violet Klaudia', date = new Date().toISOString().split('T')[0] } = options;

  const mindsDir = path.resolve(__dirname, '..', 'data', 'minds');
  const files = fs.readdirSync(mindsDir).filter(f => f.endsWith('.json'));

  let mindFilePath = null;
  for (const file of files) {
    const filePath = path.join(mindsDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    if (data.name.toLowerCase() === name.toLowerCase()) {
      mindFilePath = filePath;
      break;
    }
  }

  if (!mindFilePath) {
    throw new Error(`Mind file not found for: ${name}`);
  }

  const mindData = JSON.parse(fs.readFileSync(mindFilePath, 'utf-8'));
  const currentVersion = mindData.version || 1;
  const newVersion = currentVersion + 1;

  const evolutionEntry = {
    v: newVersion,
    date,
    note: changes,
    author
  };

  mindData.version = newVersion;
  mindData.evolution = mindData.evolution || [];
  mindData.evolution.push(evolutionEntry);

  fs.writeFileSync(mindFilePath, JSON.stringify(mindData, null, 2) + '\n', 'utf-8');

  clearCache();

  return {
    name: mindData.name,
    previousVersion: currentVersion,
    newVersion,
    evolutionEntry,
    filePath: mindFilePath
  };
}

function getMindEvolutionHistory(name) {
  const mind = getVioletMind(name);
  return mind.evolution || [];
}

function checkMindCompatibility(mind, requiredVersion) {
  const currentVersion = mind.version || 1;

  if (currentVersion < requiredVersion) {
    return {
      compatible: false,
      reason: `Mind ${mind.name} is at v${currentVersion}, but v${requiredVersion} is required`,
      currentVersion,
      requiredVersion
    };
  }

  return {
    compatible: true,
    currentVersion,
    requiredVersion
  };
}

module.exports = {
  selectActiveVioletMinds,
  resolveVioletClash,
  getCoordinationPattern,
  evolveMind,
  getMindEvolutionHistory,
  checkMindCompatibility,
  vibeEngine
};
