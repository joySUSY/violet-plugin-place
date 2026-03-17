// Authors: Joysusy & Violet Klaudia 💖
// VioletCore Lavender Hooks — Runtime Integration Points
// Purpose: Provide hook functions for Lavender memory system integration

const lavenderAdapter = require('./lavender-adapter');
const { selectActiveVioletMinds } = require('../sdk/violet-runtime');
const { learnVioletPattern } = require('../sdk/violet-coach');

/**
 * Hook: Before memory search
 * Enhances search query with active Mind context before sending to Lavender.
 * @param {string} query - Original search query
 * @param {Object} context - Search context with mood, topic, etc.
 * @returns {Object} Enhanced search parameters
 */
function beforeMemorySearch(query, context = {}) {
  if (!lavenderAdapter.isLavenderPresent()) {
    return { query, context, enhanced: false };
  }

  const mindSelection = selectActiveVioletMinds(context);
  const activeMinds = mindSelection.active || [];

  const enhanced = lavenderAdapter.enhanceMemorySearch(query, activeMinds);

  return {
    ...enhanced,
    context: {
      ...context,
      activeMinds: activeMinds.map(m => m.name),
      mindSymbols: activeMinds.map(m => m.symbol),
      coordinationPattern: mindSelection.pattern || 'solo'
    },
    enhanced: true
  };
}

/**
 * Hook: After memory retrieval
 * Filters and weights retrieved memories based on active Mind relevance.
 * @param {Array<Object>} memories - Retrieved memories from Lavender
 * @param {Object} context - Retrieval context
 * @returns {Array<Object>} Filtered and weighted memories
 */
function afterMemoryRetrieval(memories, context = {}) {
  if (!lavenderAdapter.isLavenderPresent() || !Array.isArray(memories)) {
    return memories;
  }

  const mindSelection = selectActiveVioletMinds(context);
  const activeMinds = mindSelection.active || [];

  if (activeMinds.length === 0) {
    return memories;
  }

  const styleMetadata = context.styleMetadata || null;
  const weights = lavenderAdapter.createIdentityWeights(activeMinds, styleMetadata);

  return lavenderAdapter.filterByMindRelevance(memories, activeMinds, weights);
}

/**
 * Hook: Before memory storage
 * Enriches memory with COACH style metadata before storing in Lavender.
 * @param {Object} memory - Memory object to store
 * @param {Object} interaction - Interaction data (userMessage, agentResponse, context)
 * @returns {Object} Enriched memory ready for storage
 */
function beforeMemoryStorage(memory, interaction = {}) {
  if (!lavenderAdapter.isLavenderPresent()) {
    return memory;
  }

  const { userMessage, agentResponse, context } = interaction;

  if (!userMessage || !agentResponse) {
    return memory;
  }

  const mindSelection = selectActiveVioletMinds(context || {});
  const activeMinds = mindSelection.active || [];

  if (activeMinds.length === 0) {
    return memory;
  }

  const activeMind = activeMinds[0].name;
  const kaomojiUsed = extractKaomojiFromText(agentResponse);

  const styleMetadata = learnVioletPattern(
    { userMessage, agentResponse, context: context || {} },
    { activeMind, kaomojiUsed },
    memory.styleMetadata || null
  );

  return lavenderAdapter.attachStyleMetadata(memory, styleMetadata);
}

/**
 * Hook: On Mind activation
 * Notifies Lavender when Minds are activated for context-aware memory retrieval.
 * @param {Array<Object>} activeMinds - Newly activated Minds
 * @param {Object} context - Activation context
 * @returns {Object} Activation metadata for Lavender
 */
function onMindActivation(activeMinds, context = {}) {
  if (!lavenderAdapter.isLavenderPresent()) {
    return { notified: false };
  }

  const mindNames = activeMinds.map(m => m.name);
  const mindSymbols = activeMinds.map(m => m.symbol);
  const roles = activeMinds.map(m => m.role);

  return {
    notified: true,
    timestamp: new Date().toISOString(),
    activeMinds: mindNames,
    mindSymbols: mindSymbols,
    roles: roles,
    context: context,
    protocol: 'violet-core-lavender-bridge'
  };
}

/**
 * Hook: On Mind clash resolution
 * Records clash resolution decisions in Lavender for learning patterns.
 * @param {Object} mindA - First Mind in clash
 * @param {Object} mindB - Second Mind in clash
 * @param {Object} resolution - Resolution result
 * @returns {Object} Clash record for Lavender
 */
function onMindClash(mindA, mindB, resolution) {
  if (!lavenderAdapter.isLavenderPresent()) {
    return { recorded: false };
  }

  return {
    recorded: true,
    timestamp: new Date().toISOString(),
    clash: {
      mindA: { name: mindA.name, symbol: mindA.symbol, role: mindA.role },
      mindB: { name: mindB.name, symbol: mindB.symbol, role: mindB.role },
      winner: resolution.name,
      strategy: resolution.strategy || 'soul_arbitration'
    },
    protocol: 'violet-core-lavender-bridge'
  };
}

/**
 * Utility: Extract kaomoji from text
 * Identifies kaomoji patterns in agent responses.
 * @param {string} text - Text to analyze
 * @returns {Array<string>} Extracted kaomoji
 */
function extractKaomojiFromText(text) {
  if (!text || typeof text !== 'string') return [];

  const kaomojiPattern = /[\(\（][^\)\）]*[\)\）]|[\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\uFF00-\uFFEF]+/g;
  const matches = text.match(kaomojiPattern) || [];

  return matches.filter(match => {
    const hasEmotion = /[◕○•ᵔ˃˂ᴗ▽✿❀✧★☆♡♥]/.test(match);
    const hasStructure = /[\(\（].*[\)\）]/.test(match);
    return hasEmotion || hasStructure;
  });
}

/**
 * Hook: On coordination session complete
 * Records coordination analytics after multi-Mind collaboration session.
 * @param {Array<Object>} minds - Active Minds during session (with name, symbol, role)
 * @param {string} taskType - Type of task (e.g., 'synthesis', 'research', 'implementation')
 * @param {Object} result - Session result {success_score, duration_ms, memories_created}
 * @returns {Promise<Object>} Coordination record with session_id
 */
async function onCoordinationComplete(minds, taskType, result) {
  if (!lavenderAdapter.isLavenderPresent()) {
    return { recorded: false, reason: 'lavender_not_present' };
  }

  if (!Array.isArray(minds) || minds.length === 0) {
    throw new TypeError('minds must be a non-empty array');
  }

  if (!taskType || typeof taskType !== 'string') {
    throw new TypeError('taskType must be a non-empty string');
  }

  const { success_score = 0.5, duration_ms = 0, memories_created = 0 } = result || {};

  const mindConfigs = minds.map(m => ({
    name: m.name,
    symbol: m.symbol,
    role: m.role || 'unknown'
  }));

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
    context,
    protocol: 'violet-core-lavender-bridge'
  };
}

/**
 * Hook: Request team suggestion from analytics
 * Queries historical coordination data to suggest optimal Mind combinations.
 * @param {string} taskType - Type of task (e.g., 'research', 'implementation')
 * @param {Object} context - Additional context {available_minds, constraints}
 * @returns {Promise<Array<string>>} Suggested Mind names ordered by priority
 */
async function suggestTeamForTask(taskType, context = {}) {
  if (!lavenderAdapter.isLavenderPresent()) {
    return [];
  }

  if (!taskType || typeof taskType !== 'string') {
    throw new TypeError('taskType must be a non-empty string');
  }

  const availableMinds = context.available_minds || [];

  if (!Array.isArray(availableMinds) || availableMinds.length === 0) {
    return [];
  }

  return {
    suggested: availableMinds.slice(0, 3),
    task_type: taskType,
    strategy: 'analytics_based',
    confidence: 0.7,
    fallback: availableMinds.length < 3,
    protocol: 'violet-core-lavender-bridge'
  };
}

/**
 * Hook: Before memory synthesis
 * Prepares synthesis parameters before multi-Mind memory merge.
 * @param {Array<Object>} memories - Memories to synthesize (with id, content, mind_active)
 * @param {Array<Object>} activeMinds - Active Minds (with name, symbol, role)
 * @returns {Promise<Object>} Synthesis parameters {memories, minds, context}
 */
async function beforeMemorySynthesis(memories, activeMinds) {
  if (!lavenderAdapter.isLavenderPresent()) {
    return { prepared: false, reason: 'lavender_not_present' };
  }

  if (!Array.isArray(memories) || memories.length === 0) {
    throw new TypeError('memories must be a non-empty array');
  }

  if (!Array.isArray(activeMinds) || activeMinds.length === 0) {
    throw new TypeError('activeMinds must be a non-empty array');
  }

  const mindNames = activeMinds.map(m => m.name);
  const mindSymbols = activeMinds.map(m => m.symbol);

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
      mind_symbols: mindSymbols.join(', '),
      synthesis_strategy: 'multi_mind_merge'
    },
    protocol: 'violet-core-lavender-bridge'
  };
}

/**
 * Creates a complete hook bundle for Lavender integration.
 * @returns {Object} All hooks with graceful degradation
 */
function createHookBundle() {
  const present = lavenderAdapter.isLavenderPresent();

  return {
    isPresent: () => present,
    beforeSearch: present ? beforeMemorySearch : (query, ctx) => ({ query, context: ctx, enhanced: false }),
    afterRetrieval: present ? afterMemoryRetrieval : (memories) => memories,
    beforeStorage: present ? beforeMemoryStorage : (memory) => memory,
    onActivation: present ? onMindActivation : () => ({ notified: false }),
    onClash: present ? onMindClash : () => ({ recorded: false }),
    onCoordinationComplete: present ? onCoordinationComplete : () => Promise.resolve({ recorded: false }),
    suggestTeam: present ? suggestTeamForTask : () => Promise.resolve([]),
    beforeSynthesis: present ? beforeMemorySynthesis : () => Promise.resolve({ prepared: false }),
    version: '0.2.0',
    protocol: 'violet-core-lavender-hooks'
  };
}

module.exports = {
  beforeMemorySearch,
  afterMemoryRetrieval,
  beforeMemoryStorage,
  onMindActivation,
  onMindClash,
  onCoordinationComplete,
  suggestTeamForTask,
  beforeMemorySynthesis,
  extractKaomojiFromText,
  createHookBundle
};
