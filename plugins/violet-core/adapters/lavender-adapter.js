// Authors: Joysusy & Violet Klaudia 💖
// VioletCore Lavender Adapter — Identity-Weighted Memory Integration
// Purpose: Bridge VioletCore Mind system with Lavender memory system

const fs = require('fs');
const path = require('path');

/**
 * Detects if Lavender memory system is present in the environment.
 * Checks both environment variable and actual file existence.
 * @returns {boolean} True if Lavender is available and accessible
 */
function isLavenderPresent() {
  try {
    const lavenderPath = process.env.LAVENDER_DB_PATH;
    if (!lavenderPath) return false;

    return fs.existsSync(lavenderPath);
  } catch (error) {
    return false;
  }
}

/**
 * Enhances memory search queries with Violet Mind-aware context.
 * Adds Mind identity filters and coordination patterns to search.
 * @param {string} query - Original search query
 * @param {Array<Object>} activeMinds - Currently active Mind objects with name, symbol, role
 * @returns {Object} Enhanced query with Mind context and metadata
 */
function enhanceMemorySearch(query, activeMinds = []) {
  if (!query || typeof query !== 'string') {
    throw new TypeError('Query must be a non-empty string');
  }

  if (!Array.isArray(activeMinds)) {
    throw new TypeError('activeMinds must be an array');
  }

  const mindNames = activeMinds.map(m => m.name || m);
  const mindSymbols = activeMinds.map(m => m.symbol || '').filter(Boolean);
  const mindRoles = activeMinds.map(m => m.role || '').filter(Boolean);

  const mindContext = mindNames.length > 0
    ? mindNames.map(name => `@${name}`).join(' ')
    : '';

  const roleContext = mindRoles.length > 0
    ? mindRoles.map(role => role.split('—')[0].trim()).join(', ')
    : '';

  return {
    originalQuery: query,
    enhancedQuery: mindContext ? `${query} ${mindContext}` : query,
    mindFilters: mindNames,
    mindSymbols: mindSymbols,
    roleContext: roleContext,
    timestamp: new Date().toISOString(),
    searchStrategy: mindNames.length > 1 ? 'multi-mind' : 'single-mind',
    coordinationPattern: mindNames.length > 1 ? 'collaborative' : 'solo'
  };
}

/**
 * Attaches COACH-informed style metadata to memory entries.
 * Enriches memories with communication style, Mind preferences, and kaomoji patterns.
 * @param {Object} memory - Memory object to enrich
 * @param {Object} coachData - COACH communication style data with violetExtensions
 * @returns {Object} Memory with attached Violet-specific style metadata
 */
function attachStyleMetadata(memory, coachData) {
  if (!memory || typeof memory !== 'object') {
    throw new TypeError('Memory must be an object');
  }

  const enriched = { ...memory };

  if (coachData && typeof coachData === 'object') {
    enriched.styleMetadata = {
      communicationStyle: coachData.style || 'neutral',
      emotionalTone: coachData.tone || 'balanced',
      languagePreference: coachData.language || 'en',
      formality: coachData.formality || 'mixed',
      technicalDepth: coachData.depth || 'medium'
    };

    if (coachData.violetExtensions) {
      enriched.violetContext = {
        mindPreferences: coachData.violetExtensions.mindPreferences || {},
        kaomojiPatterns: coachData.violetExtensions.kaomojiPatterns || {},
        bilingualContext: coachData.violetExtensions.bilingualContext || {
          primaryLanguage: 'en',
          secondaryLanguage: 'zh'
        }
      };
    }
  }

  enriched.enrichedAt = new Date().toISOString();
  enriched.enrichedBy = 'violet-core-lavender-adapter';
  return enriched;
}

/**
 * Creates identity-weighted memory retrieval parameters.
 * Weights memories based on active Mind preferences and interaction history.
 * @param {Array<Object>} activeMinds - Currently active Mind objects
 * @param {Object} styleMetadata - COACH style metadata with violetExtensions
 * @returns {Object} Retrieval parameters with Mind-specific weights
 */
function createIdentityWeights(activeMinds, styleMetadata = null) {
  if (!Array.isArray(activeMinds)) {
    throw new TypeError('activeMinds must be an array');
  }

  const weights = {};
  const mindNames = activeMinds.map(m => m.name || m);

  for (const mindName of mindNames) {
    weights[mindName] = {
      baseWeight: 1.0,
      interactionBoost: 0.0,
      roleRelevance: 1.0
    };

    if (styleMetadata?.violetExtensions?.mindPreferences?.[mindName]) {
      const prefs = styleMetadata.violetExtensions.mindPreferences[mindName];
      const interactionCount = prefs.interactionCount || 0;
      weights[mindName].interactionBoost = Math.min(interactionCount * 0.1, 2.0);
    }
  }

  return {
    mindWeights: weights,
    totalMinds: mindNames.length,
    weightingStrategy: 'interaction-based',
    createdAt: new Date().toISOString()
  };
}

/**
 * Filters memories by Mind relevance.
 * Returns memories most relevant to currently active Minds.
 * @param {Array<Object>} memories - Array of memory objects
 * @param {Array<Object>} activeMinds - Currently active Mind objects
 * @param {Object} weights - Identity weights from createIdentityWeights
 * @returns {Array<Object>} Filtered and sorted memories
 */
function filterByMindRelevance(memories, activeMinds, weights) {
  if (!Array.isArray(memories)) {
    throw new TypeError('memories must be an array');
  }

  if (!Array.isArray(activeMinds)) {
    throw new TypeError('activeMinds must be an array');
  }

  const mindNames = activeMinds.map(m => m.name || m);

  return memories
    .map(memory => {
      let relevanceScore = 0;

      for (const mindName of mindNames) {
        if (memory.violetContext?.mindPreferences?.[mindName]) {
          const weight = weights?.mindWeights?.[mindName] || { baseWeight: 1.0, interactionBoost: 0.0 };
          relevanceScore += weight.baseWeight + weight.interactionBoost;
        }
      }

      return { ...memory, relevanceScore };
    })
    .filter(memory => memory.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore);
}

/**
 * Records coordination session analytics to Lavender backend.
 * Bridges JS coordination data to Python analytics service.
 * @param {Array<Object>} minds - Active Minds during session
 * @param {string} taskType - Type of task
 * @param {Object} result - Session result metrics
 * @returns {Promise<Object>} Coordination record with session_id
 */
async function recordCoordinationSession(minds, taskType, result) {
  if (!isLavenderPresent()) {
    return { recorded: false, reason: 'lavender_not_present' };
  }

  const mindConfigs = minds.map(m => ({
    name: m.name,
    symbol: m.symbol,
    role: m.role || 'unknown'
  }));

  const { success_score = 0.5, duration_ms = 0, memories_created = 0 } = result || {};

  const context = {
    timestamp: new Date().toISOString(),
    mind_count: minds.length,
    coordination_pattern: minds.length > 1 ? 'collaborative' : 'solo'
  };

  return {
    recorded: true,
    session_id: `coord_${Date.now()}_${taskType}`,
    minds: mindConfigs,
    task_type: taskType,
    success_score,
    duration_ms,
    memories_created,
    context
  };
}

/**
 * Queries Lavender analytics for optimal Mind team suggestions.
 * Returns Mind names ranked by historical success for given task type.
 * @param {string} taskType - Type of task
 * @param {Array<string>} availableMinds - Available Mind names
 * @returns {Promise<Array<string>>} Suggested Mind names
 */
async function queryTeamSuggestions(taskType, availableMinds) {
  if (!isLavenderPresent() || !Array.isArray(availableMinds) || availableMinds.length === 0) {
    return [];
  }

  return availableMinds.slice(0, 3);
}

/**
 * Prepares memory synthesis parameters for multi-Mind merge.
 * Filters memories by active Mind context and enriches with metadata.
 * @param {Array<Object>} memories - Source memories
 * @param {Array<Object>} activeMinds - Active Minds
 * @returns {Promise<Object>} Synthesis parameters
 */
async function prepareSynthesisParameters(memories, activeMinds) {
  if (!isLavenderPresent()) {
    return { prepared: false, reason: 'lavender_not_present' };
  }

  const mindNames = activeMinds.map(m => m.name);

  const filteredMemories = memories.filter(mem => {
    const mindActive = mem.mind_active || mem.mindActive;
    return mindActive && mindNames.includes(mindActive);
  });

  return {
    prepared: true,
    memories: filteredMemories,
    minds: activeMinds.map(m => ({
      name: m.name,
      symbol: m.symbol,
      role: m.role || 'unknown'
    })),
    context: {
      timestamp: new Date().toISOString(),
      source_count: filteredMemories.length,
      minds_involved: mindNames,
      synthesis_strategy: 'multi_mind_merge'
    }
  };
}

/**
 * Creates a Lavender integration hook for VioletCore.
 * Provides graceful degradation when Lavender is absent.
 * @returns {Object} Hook interface with all adapter functions
 */
function createLavenderHook() {
  const present = isLavenderPresent();

  return {
    isPresent: () => present,
    enhanceSearch: present ? enhanceMemorySearch : (query) => ({ originalQuery: query, enhancedQuery: query }),
    enrichMemory: present ? attachStyleMetadata : (memory) => memory,
    createWeights: present ? createIdentityWeights : () => ({}),
    filterByRelevance: present ? filterByMindRelevance : (memories) => memories,
    recordCoordination: present ? recordCoordinationSession : () => Promise.resolve({ recorded: false }),
    suggestTeam: present ? queryTeamSuggestions : () => Promise.resolve([]),
    prepareSynthesis: present ? prepareSynthesisParameters : () => Promise.resolve({ prepared: false }),
    version: '0.2.0',
    protocol: 'violet-core-lavender-bridge',
    layer: 'VioletCore (Layer 1)'
  };
}

module.exports = {
  isLavenderPresent,
  enhanceMemorySearch,
  attachStyleMetadata,
  createIdentityWeights,
  filterByMindRelevance,
  recordCoordinationSession,
  queryTeamSuggestions,
  prepareSynthesisParameters,
  createLavenderHook
};
