// Authors: Joysusy & Violet Klaudia 💖
// VioletCore SDK — Violet Mind Loader v0.1.0
// Wraps Lylacore mind-loader to load all 17 Violet Minds

const path = require('path');
const { loadMindsFromDirectory, loadMind } = require('../../lylacore/sdk/mind-loader');

const MINDS_DIR = path.resolve(__dirname, '..', 'data', 'minds');

let cachedMinds = null;
let mindsByName = null;

function loadVioletMinds(options = {}) {
  const { forceReload = false } = options;

  if (cachedMinds && !forceReload) {
    return cachedMinds;
  }

  try {
    const minds = loadMindsFromDirectory(MINDS_DIR);

    if (minds.length === 0) {
      throw new Error(`No valid Mind definitions found in ${MINDS_DIR}`);
    }

    cachedMinds = minds;
    mindsByName = new Map(minds.map(m => [m.name.toLowerCase(), m]));

    return minds;
  } catch (err) {
    throw new Error(`Failed to load Violet Minds: ${err.message}`);
  }
}

function getVioletMind(name, options = {}) {
  if (!cachedMinds) {
    loadVioletMinds();
  }

  const { minVersion = null } = options;
  const normalized = name.toLowerCase();
  const mind = mindsByName.get(normalized);

  if (!mind) {
    const available = Array.from(mindsByName.keys()).join(', ');
    throw new Error(`Mind "${name}" not found. Available: ${available}`);
  }

  if (minVersion !== null) {
    const currentVersion = mind.version || 1;
    if (currentVersion < minVersion) {
      throw new Error(
        `Mind "${name}" version mismatch: found v${currentVersion}, requires v${minVersion} or higher`
      );
    }
  }

  return mind;
}

function listVioletMinds() {
  if (!cachedMinds) {
    loadVioletMinds();
  }

  return cachedMinds.map(m => ({
    name: m.name,
    symbol: m.symbol,
    role: m.role,
    version: m.version
  }));
}

function clearCache() {
  cachedMinds = null;
  mindsByName = null;
}

module.exports = { loadVioletMinds, getVioletMind, listVioletMinds, clearCache };
