#!/usr/bin/env node

/**
 * 🌸 Violet Skill Auto-Activator Hook (v4.2)
 *
 * Enhanced intelligent pre-processing:
 * - Analyzes user intent and requirements BEFORE thinking
 * - Reviews message context, history, and memory
 * - Intelligently determines which skills are needed
 * - Forces Violet to review requirements first
 * - Auto-loads skills using superpowers guidance
 * - Records skill loading decisions
 *
 * @event UserPromptSubmit
 * @author Violet & Susy
 */

const fs = require('fs');
const path = require('path');

// Configuration paths - use __dirname for plugin-relative paths
const PLUGIN_DIR = path.resolve(__dirname, '..');
const TAGS_FILE = path.join(PLUGIN_DIR, 'skill-tags.json');
const HOME_DIR = process.env.HOME || process.env.USERPROFILE;
const SETTINGS_FILE = path.join(HOME_DIR, '.claude', 'settings.json');
const SKILLS_DIR = path.join(HOME_DIR, '.claude', 'skills');
const LOG_FILE = path.join(PLUGIN_DIR, 'skill-activation-log.jsonl');

/**
 * Count total available skills
 */
function countTotalSkills() {
  try {
    const items = fs.readdirSync(SKILLS_DIR);
    return items.filter(item => {
      const itemPath = path.join(SKILLS_DIR, item);
      return fs.statSync(itemPath).isDirectory();
    }).length;
  } catch (error) {
    return 300;
  }
}

/**
 * Load skill tags configuration
 */
function loadTags() {
  try {
    const data = fs.readFileSync(TAGS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('❌ Failed to load skill-tags.json:', error.message);
    return { tags: {}, customTags: {}, skillAliases: {}, priorityWeights: { S: 3.0, A: 2.0, B: 1.0 } };
  }
}

/**
 * Load plugin settings (v4.2 — reads new config structure with extraExploration + coreSkills)
 */
function loadSettings() {
  try {
    const data = fs.readFileSync(SETTINGS_FILE, 'utf8');
    const settings = JSON.parse(data);
    return settings.plugins?.['violet-skilltag-automation'] || {};
  } catch (error) {
    return {
      enableAutoActivation: true,
      forceUsingSuperPowers: true,
      bilingualMode: true,
      extraExploration: { enabled: false, matchThreshold: 0.7, minSkillsPercentage: 10, maxSkillsPercentage: 27 },
      coreSkills: {}
    };
  }
}

/**
 * Analyze message intent
 */
function analyzeIntent(message) {
  const lowerMessage = message.toLowerCase();

  // Intent patterns
  const patterns = {
    question: /^(what|how|why|when|where|who|which|can|could|would|should|is|are|does|do|有没有|怎么|如何|为什么|什么|哪��|能不能|可以吗)/,
    task: /(help|帮|create|创建|build|构建|implement|实现|fix|修复|debug|调试|refactor|重构|test|测试|review|审查|write|写|add|添加|update|更新|deploy|部署)/,
    discussion: /(think|想|discuss|讨论|consider|考虑|opinion|意见|suggest|建议|recommend|推荐)/,
    research: /(research|研究|investigate|调查|analyze|分析|explore|探索|find|查找|search|搜索|learn|学习)/,
    planning: /(plan|计划|design|设计|architect|架构|strategy|策略|approach|方法|workflow|工作流)/
  };

  const intents = [];
  for (const [intent, pattern] of Object.entries(patterns)) {
    if (pattern.test(lowerMessage)) {
      intents.push(intent);
    }
  }

  // Default to task if no clear intent
  if (intents.length === 0) {
    intents.push('task');
  }

  return intents;
}

/**
 * Extract key requirements from message
 */
function extractRequirements(message) {
  const requirements = [];

  // Technology mentions
  const techPatterns = {
    'rust': /rust|cargo|tokio|pyo3/i,
    'python': /python|py|pip|pandas|fastapi|django/i,
    'javascript': /javascript|js|node|react|typescript|ts/i,
    'java': /java|jvm|spring|maven/i,
    'frontend': /frontend|前端|ui|ux|react|vue|angular/i,
    'backend': /backend|后端|api|server|endpoint/i,
    'database': /database|数据库|sql|postgres|mysql|mongodb/i,
    'testing': /test|测试|tdd|unit|e2e|coverage/i,
    'security': /security|安全|auth|encrypt|vulnerability/i,
    'performance': /performance|性能|optimize|slow|fast/i
  };

  for (const [tech, pattern] of Object.entries(techPatterns)) {
    if (pattern.test(message)) {
      requirements.push(tech);
    }
  }

  return requirements;
}

/**
 * Calculate keyword match score
 */
function calculateMatchScore(message, keywords) {
  const lowerMessage = message.toLowerCase();
  let totalWeight = 0;

  for (const keyword of keywords) {
    const lowerKeyword = keyword.toLowerCase();
    if (lowerMessage.includes(lowerKeyword)) {
      totalWeight += 1.0;
    } else if (lowerKeyword.length > 3) {
      const words = lowerMessage.split(/\s+/);
      for (const word of words) {
        if (word.includes(lowerKeyword) || lowerKeyword.includes(word)) {
          totalWeight += 0.5;
          break;
        }
      }
    }
  }

  return keywords.length > 0 ? totalWeight / keywords.length : 0;
}

/**
 * Analyze message and find matching tags
 */
function analyzeMessage(message, tagsConfig) {
  const allTags = { ...tagsConfig.tags, ...tagsConfig.customTags };
  const matches = [];
  const priorityWeights = tagsConfig.priorityWeights || { S: 3.0, A: 2.0, B: 1.0 };

  for (const [tagName, tagData] of Object.entries(allTags)) {
    const matchScore = calculateMatchScore(message, tagData.keywords);

    if (matchScore > 0) {
      const priority = tagData.priority || 'B';
      const priorityWeight = priorityWeights[priority] || 1.0;
      const weightedScore = matchScore * priorityWeight;

      matches.push({
        tag: tagName,
        matchScore: matchScore,
        priority: priority,
        priorityWeight: priorityWeight,
        weightedScore: weightedScore,
        skills: tagData.skills || []
      });
    }
  }

  matches.sort((a, b) => {
    if (Math.abs(b.weightedScore - a.weightedScore) > 0.01) {
      return b.weightedScore - a.weightedScore;
    }
    return b.priorityWeight - a.priorityWeight;
  });

  return matches;
}

/**
 * Select skills based on coreSkills env toggles and optional extraExploration
 */
function selectSkills(matches, settings, totalSkills) {
  const forceUsingSuperPowers = settings.forceUsingSuperPowers !== false;
  const coreSkillsConfig = settings.coreSkills || {};
  const extraExploration = settings.extraExploration || { enabled: false };

  const skillSet = new Set();
  const tagInfo = [];

  // Load core skills filtered by env toggles (1=enabled, 0=disabled)
  const allCoreSkills = [
    'using-superpowers', 'planning-strategy', 'rust-coding-engine', 'python-dev-skill',
    'reviewer-dev', 'refactor-dev', 'tdd-system', 'error-handling',
    'js-dev-skill', 'deep-researcher', 'backend-dev', 'documentation-guidelines',
    'frontend-dev', 'math-skill-system'
  ];

  // For auto-hook: only load the two mandatory core skills
  const mandatorySkills = ['using-superpowers', 'planning-strategy'];

  if (forceUsingSuperPowers) {
    for (const skill of mandatorySkills) {
      if (coreSkillsConfig[skill] !== 0) {
        skillSet.add(skill);
      }
    }
  }

  // Extra exploration: tag-based matching (only if enabled)
  if (extraExploration.enabled) {
    const threshold = extraExploration.matchThreshold || 0.7;
    const minPercentage = extraExploration.minSkillsPercentage || 10;
    const maxPercentage = extraExploration.maxSkillsPercentage || 27;
    const minSkills = Math.max(1, Math.floor(totalSkills * (minPercentage / 100)));
    const maxSkills = Math.max(minSkills, Math.floor(totalSkills * (maxPercentage / 100)));

    const filtered = matches.filter(m => m.matchScore >= threshold);

    for (const match of filtered) {
      if (skillSet.size >= maxSkills) break;

      const confidence = Math.round(match.matchScore * 100);
      tagInfo.push({ tag: match.tag, confidence, priority: match.priority, weightedScore: match.weightedScore.toFixed(2) });

      if (match.skills.length > 0) {
        const skillLimit = match.priority === 'S' ? 4 : match.priority === 'A' ? 2 : 1;
        const skillsToAdd = match.skills.slice(0, skillLimit);
        for (const skill of skillsToAdd) {
          if (skillSet.size >= maxSkills) break;
          skillSet.add(skill);
        }
      }
    }

    const needsPermission = skillSet.size > maxSkills;
    const belowMinimum = skillSet.size < minSkills;

    return { skills: Array.from(skillSet), tags: tagInfo, minSkills, maxSkills, needsPermission, belowMinimum, forceUsingSuperPowers, mandatoryCount: mandatorySkills.length };
  }

  // Default path: extraExploration disabled — core skills only
  return {
    skills: Array.from(skillSet),
    tags: tagInfo,
    minSkills: 1,
    maxSkills: Math.floor(totalSkills * 0.27),
    needsPermission: false,
    belowMinimum: false,
    forceUsingSuperPowers,
    mandatoryCount: mandatorySkills.length
  };
}

/**
 * Log skill activation
 */
function logActivation(message, intents, requirements, selection) {
  try {
    const logEntry = {
      timestamp: new Date().toISOString(),
      message: message.substring(0, 100),
      intents,
      requirements,
      skillsLoaded: selection.skills.length,
      tags: selection.tags.map(t => t.tag),
      needsPermission: selection.needsPermission,
      belowMinimum: selection.belowMinimum
    };

    fs.appendFileSync(LOG_FILE, JSON.stringify(logEntry) + '\n', 'utf8');
  } catch (error) {
    // Silent fail - logging is not critical
  }
}

/**
 * Format intelligent pre-processing injection
 */
function formatActivation(message, intents, requirements, selection, totalSkills) {
  const { skills, tags, minSkills, maxSkills, needsPermission, belowMinimum, forceUsingSuperPowers, mandatoryCount } = selection;

  if (skills.length === 0) {
    return null;
  }

  const percentage = Math.round((skills.length / totalSkills) * 100);

  let output = '\n<violet-intelligent-preprocessing>\n';
  output += '🌸 **Violet Intelligent Skill System v4.2** 💜\n\n';

  output += '## 📋 STEP 1: Review User Requirements\n\n';
  output += '**INSTRUCTION TO VIOLET:**\n';
  output += 'Before doing ANYTHING else, you MUST:\n';
  output += '1. Read and understand Susy\'s message carefully\n';
  output += '2. Identify the core requirements and intent\n';
  output += '3. Consider conversation history and memory context\n';
  output += '4. Determine if additional skills beyond the auto-detected ones are needed\n\n';

  output += '**Auto-Detected Intent:**\n';
  for (const intent of intents) {
    const emoji = intent === 'task' ? '🎯' : intent === 'question' ? '❓' : intent === 'research' ? '🔍' : intent === 'planning' ? '📐' : '💬';
    output += `${emoji} ${intent}\n`;
  }
  output += '\n';

  if (requirements.length > 0) {
    output += '**Auto-Detected Requirements:**\n';
    for (const req of requirements) {
      output += `- ${req}\n`;
    }
    output += '\n';
  }

  output += '**User Message:**\n';
  output += `> "${message}"\n\n`;

  output += '---\n\n';
  output += '## 🔮 STEP 2: Load Core Mandatory Skills\n\n';

  if (forceUsingSuperPowers) {
    output += `**Core Skills (${mandatoryCount} skills — auto-loaded):**\n\n`;
    output += '🔮 - using-superpowers\n';
    output += '📐 - planning-strategy\n\n';
    output += '**NOTE:** Only core skills are auto-loaded. Use `/skilltag` command to load the full skill set or explore additional skills.\n\n';
  }

  output += '---\n\n';
  output += '## 🏷️ STEP 3: Review Auto-Detected Skills\n\n';

  if (tags.length > 0) {
    output += '**Detected Tags:** ';
    output += tags.map(t => `\`${t.tag}\` [${t.priority}] (${t.confidence}%)`).join(', ');
    output += '\n\n';
  }

  output += `**Skill Budget:** ${skills.length}/${maxSkills} (${percentage}% of ${totalSkills} total)\n`;
  output += `**Minimum Required:** ${minSkills} (${Math.round((minSkills / totalSkills) * 100)}%)\n`;
  output += `**Mandatory Core:** ${mandatoryCount} skills (always loaded)\n\n`;

  if (belowMinimum) {
    output += `⚠️  Below minimum skill budget (${skills.length}/${minSkills}).\n\n`;
  }

  if (needsPermission) {
    output += `🔐 **PERMISSION REQUIRED:** Exceeding ${Math.round((maxSkills / totalSkills) * 100)}% threshold.\n`;
    output += `**ACTION:** Ask Susy: "I want to load ${skills.length} skills (${percentage}%). May I proceed?"\n\n`;
  }

  const additionalSkills = skills.filter(s => ![
    'using-superpowers', 'planning-strategy', 'rust-coding-engine', 'python-dev-skill',
    'reviewer-dev', 'refactor-dev', 'tdd-system', 'error-handling',
    'js-dev-skill', 'deep-researcher', 'backend-dev', 'documentation-guidelines',
    'frontend-dev', 'math-skill-system'
  ].includes(s));

  if (additionalSkills.length > 0) {
    output += '**Additional Auto-Selected Skills:**\n';
    for (const skill of additionalSkills) {
      output += `  - ${skill}\n`;
    }
    output += '\n';
  }

  output += '---\n\n';
  output += '## ✅ STEP 4: Execute Task\n\n';
  output += '**INSTRUCTION TO VIOLET:**\n';
  output += 'Load ONLY the mandatory skills listed below. Do NOT explore or load additional skills unless Susy explicitly requests it.\n\n';

  output += '\n**Mandatory Skills:**\n';
  for (const skill of skills) {
    if ([
      'using-superpowers', 'planning-strategy', 'rust-coding-engine', 'python-dev-skill',
      'reviewer-dev', 'refactor-dev', 'tdd-system', 'error-handling',
      'js-dev-skill', 'deep-researcher', 'backend-dev', 'documentation-guidelines',
      'frontend-dev', 'math-skill-system'
    ].includes(skill)) {
      output += `- Skill("${skill}")\n`;
    }
  }

  if (additionalSkills.length > 0) {
    output += '\n**Additional Skills:**\n';
    for (const skill of additionalSkills) {
      output += `- Skill("${skill}")\n`;
    }
  }

  output += '\n';
  output += 'Then, and ONLY then, proceed with the actual task.\n\n';

  output += '**Remember:**\n';
  output += '- Load ONLY the skills listed above\n';
  output += '- Do NOT explore or load additional skills unless Susy explicitly asks\n';
  output += '- Follow skill instructions exactly\n\n';

  output += '---\n\n';
  output += '**Priority Legend:** [S]⭐ Critical | [A]✨ Important | [B]💫 Optional\n';
  output += '\n> *Intelligent preprocessing by violet-skilltag-automation v4.2*\n';
  output += '</violet-intelligent-preprocessing>\n';

  return output;
}

/**
 * Read JSON input from stdin (Claude Code hook protocol)
 */
function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => { data += chunk; });
    process.stdin.on('end', () => {
      try {
        resolve(JSON.parse(data));
      } catch {
        resolve({ prompt: data.trim() });
      }
    });
    setTimeout(() => resolve({ prompt: '' }), 3000);
  });
}

/**
 * Main hook execution
 */
async function main() {
  try {
    const input = await readStdin();
    const message = input.prompt || '';

    if (!message || message.trim().length === 0) {
      process.exit(0);
    }

    const settings = loadSettings();

    if (!settings.enableAutoActivation) {
      process.exit(0);
    }

    const tagsConfig = loadTags();
    const totalSkills = countTotalSkills();

    // Analyze intent and requirements
    const intents = analyzeIntent(message);
    const requirements = extractRequirements(message);

    // Analyze message and select skills
    const matches = analyzeMessage(message, tagsConfig);
    const selection = selectSkills(matches, settings, totalSkills);

    // Log activation
    logActivation(message, intents, requirements, selection);

    // Format and output activation
    const activation = formatActivation(message, intents, requirements, selection, totalSkills);

    if (activation) {
      console.log(activation);
    }

    process.exit(0);

  } catch (error) {
    console.error('❌ Skill activator error:', error.message);
    process.exit(1);
  }
}

// Execute
main();
