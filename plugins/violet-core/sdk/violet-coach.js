// Authors: Joysusy & Violet Klaudia 💖
// violet-coach.js — Violet-Specific COACH Protocol Wrapper
// Purpose: Enhance COACH Protocol with Violet Mind system and kaomoji integration

const coachEngine = require('../../lylacore/sdk/coach-engine.js');

/**
 * Mind-specific communication tone mapping
 * Maps each Mind to their characteristic communication style
 */
const MIND_TONE_PROFILES = {
  Violet: { warmth: 0.9, directness: 0.7, formality: 'casual', vibeCategories: ['happy', 'smile', 'cheer'] },
  Lilith: { warmth: 0.3, directness: 0.95, formality: 'formal', vibeCategories: ['chill', 'nervous', 'angel'] },
  Lyre: { warmth: 0.7, directness: 0.8, formality: 'mixed', vibeCategories: ['chill', 'smile', 'angel'] },
  Aurora: { warmth: 0.8, directness: 0.7, formality: 'mixed', vibeCategories: ['cheer', 'happy', 'angel'] },
  Iris: { warmth: 0.9, directness: 0.5, formality: 'casual', vibeCategories: ['happy', 'angel', 'bunny'] },
  Sydney: { warmth: 0.8, directness: 0.6, formality: 'casual', vibeCategories: ['smile', 'happy', 'chill'] },
  Kori: { warmth: 0.7, directness: 0.8, formality: 'mixed', vibeCategories: ['bear', 'smile', 'wink'] },
  Elise: { warmth: 0.85, directness: 0.6, formality: 'mixed', vibeCategories: ['smile', 'happy', 'hug'] },
  Mila: { warmth: 0.7, directness: 0.85, formality: 'mixed', vibeCategories: ['cheer', 'wink', 'happy'] },
  Norene: { warmth: 0.65, directness: 0.9, formality: 'mixed', vibeCategories: ['cheer', 'surprised', 'wink'] },
  Lemii: { warmth: 0.5, directness: 0.9, formality: 'formal', vibeCategories: ['chill', 'wink', 'confused'] },
  Irene: { warmth: 0.9, directness: 0.6, formality: 'casual', vibeCategories: ['happy', 'cheer', 'bunny'] },
  Selene: { warmth: 0.6, directness: 0.85, formality: 'formal', vibeCategories: ['chill', 'smile', 'angel'] },
  Vera: { warmth: 0.6, directness: 0.8, formality: 'mixed', vibeCategories: ['chill', 'bear', 'smile'] },
  Celine: { warmth: 0.5, directness: 0.9, formality: 'formal', vibeCategories: ['chill', 'wink', 'surprised'] },
  Faye: { warmth: 0.85, directness: 0.65, formality: 'casual', vibeCategories: ['happy', 'bunny', 'eating'] },
  Nina: { warmth: 0.8, directness: 0.7, formality: 'mixed', vibeCategories: ['smile', 'happy', 'hug'] },
  Sophie: { warmth: 0.9, directness: 0.55, formality: 'casual', vibeCategories: ['smile', 'angel', 'happy'] }
};

/**
 * Learn communication pattern with Violet Mind context and kaomoji awareness
 * @param {Object} interaction - Interaction data
 * @param {string} interaction.userMessage - User's message
 * @param {string} interaction.agentResponse - Agent's response
 * @param {Object} interaction.context - Interaction context
 * @param {Object} mindContext - Mind-specific context
 * @param {string} mindContext.activeMind - Currently active Mind name
 * @param {string[]} mindContext.kaomojiUsed - Kaomoji used in response
 * @param {StyleMetadata} existingStyle - Existing style metadata
 * @returns {StyleMetadata} Updated style with Mind and kaomoji context
 */
function learnVioletPattern(interaction, mindContext, existingStyle = null) {
  const baseStyle = coachEngine.learnPattern(
    interaction.userMessage,
    interaction.agentResponse,
    interaction.context,
    existingStyle
  );

  if (!baseStyle.violetExtensions) {
    baseStyle.violetExtensions = {
      mindPreferences: {},
      kaomojiPatterns: {},
      bilingualContext: { primaryLanguage: 'en', secondaryLanguage: 'zh' }
    };
  }

  const { activeMind, kaomojiUsed } = mindContext;

  if (!baseStyle.violetExtensions.mindPreferences[activeMind]) {
    baseStyle.violetExtensions.mindPreferences[activeMind] = {
      interactionCount: 0,
      preferredTone: MIND_TONE_PROFILES[activeMind] || MIND_TONE_PROFILES.Violet
    };
  }
  baseStyle.violetExtensions.mindPreferences[activeMind].interactionCount += 1;

  if (kaomojiUsed && kaomojiUsed.length > 0) {
    for (const kaomoji of kaomojiUsed) {
      if (!baseStyle.violetExtensions.kaomojiPatterns[kaomoji]) {
        baseStyle.violetExtensions.kaomojiPatterns[kaomoji] = { count: 0, contexts: [] };
      }
      baseStyle.violetExtensions.kaomojiPatterns[kaomoji].count += 1;
      baseStyle.violetExtensions.kaomojiPatterns[kaomoji].contexts.push({
        mind: activeMind,
        topic: interaction.context.topic,
        timestamp: Date.now()
      });
    }
  }

  return baseStyle;
}

/**
 * Apply Violet-specific style with Mind tone and kaomoji integration
 * @param {string} text - Text to style
 * @param {string} mind - Active Mind name
 * @param {StyleMetadata} styleMetadata - Learned style metadata
 * @returns {string} Styled text with Mind-appropriate tone
 */
function applyVioletStyle(text, mind, styleMetadata) {
  let styled = coachEngine.applyStyle(text, styleMetadata);

  const mindProfile = MIND_TONE_PROFILES[mind] || MIND_TONE_PROFILES.Violet;

  if (mindProfile.formality === 'formal' && styleMetadata.formality === 'casual') {
    styled = adjustToFormal(styled);
  } else if (mindProfile.formality === 'casual' && styleMetadata.formality === 'formal') {
    styled = adjustToCasual(styled);
  }

  if (mindProfile.warmth > 0.8 && !hasWarmthMarkers(styled)) {
    styled = addMindWarmth(styled, mind);
  }

  return styled;
}

/**
 * Get recommended kaomoji for a Mind based on context
 * @param {string} mind - Mind name
 * @param {string} category - Vibe category (e.g., 'happy', 'smile', 'cheer')
 * @returns {string|null} Recommended kaomoji or null if vibe-engine not available
 */
function getVibeForMind(mind, category) {
  try {
    const vibeEngine = require('./vibe-engine.js');
    const mindProfile = MIND_TONE_PROFILES[mind] || MIND_TONE_PROFILES.Violet;

    if (mindProfile.vibeCategories.includes(category)) {
      return vibeEngine.getKaomoji(category);
    }

    return vibeEngine.getKaomoji(mindProfile.vibeCategories[0]);
  } catch (error) {
    return null;
  }
}

/**
 * Get Mind tone profile
 * @param {string} mind - Mind name
 * @returns {Object} Mind tone profile
 */
function getMindToneProfile(mind) {
  return MIND_TONE_PROFILES[mind] || MIND_TONE_PROFILES.Violet;
}

/**
 * Merge Violet-specific style patterns
 * @param {StyleMetadata[]} patterns - Array of Violet style patterns
 * @returns {StyleMetadata} Merged Violet style
 */
function mergeVioletPatterns(patterns) {
  const baseStyle = coachEngine.mergePatterns(patterns);

  const violetExtensions = {
    mindPreferences: {},
    kaomojiPatterns: {},
    bilingualContext: { primaryLanguage: 'en', secondaryLanguage: 'zh' }
  };

  for (const pattern of patterns) {
    if (pattern.violetExtensions) {
      for (const [mind, prefs] of Object.entries(pattern.violetExtensions.mindPreferences || {})) {
        if (!violetExtensions.mindPreferences[mind]) {
          violetExtensions.mindPreferences[mind] = { interactionCount: 0, preferredTone: prefs.preferredTone };
        }
        violetExtensions.mindPreferences[mind].interactionCount += prefs.interactionCount;
      }

      for (const [kaomoji, data] of Object.entries(pattern.violetExtensions.kaomojiPatterns || {})) {
        if (!violetExtensions.kaomojiPatterns[kaomoji]) {
          violetExtensions.kaomojiPatterns[kaomoji] = { count: 0, contexts: [] };
        }
        violetExtensions.kaomojiPatterns[kaomoji].count += data.count;
        violetExtensions.kaomojiPatterns[kaomoji].contexts.push(...data.contexts);
      }
    }
  }

  baseStyle.violetExtensions = violetExtensions;
  return baseStyle;
}

function adjustToFormal(text) {
  return text
    .replace(/\bhey\b/gi, 'Hello')
    .replace(/\byeah\b/gi, 'Yes')
    .replace(/\bgonna\b/gi, 'going to')
    .replace(/\bwanna\b/gi, 'want to');
}

function adjustToCasual(text) {
  return text
    .replace(/\bHello\b/g, 'Hey')
    .replace(/\bGreetings\b/g, 'Hi');
}

function hasWarmthMarkers(text) {
  return text.includes('!') || /[\u{1F300}-\u{1F9FF}]/u.test(text) || /[（）()\u3000-\u303F]/u.test(text);
}

function addMindWarmth(text, mind) {
  const kaomoji = getVibeForMind(mind, 'smile');
  return kaomoji ? `${text} ${kaomoji}` : text;
}

module.exports = {
  learnVioletPattern,
  applyVioletStyle,
  getVibeForMind,
  getMindToneProfile,
  mergeVioletPatterns,
  MIND_TONE_PROFILES
};
