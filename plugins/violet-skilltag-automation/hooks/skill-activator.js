#!/usr/bin/env node

/**
 * 🌸 Violet Skill Auto-Activator Hook (v4.0)
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

// Configuration paths
const PLUGIN_DIR = path.join(process.env.HOME || process.env.USERPROFILE, '.claude', 'plugins', 'violet-skilltag-automation');
const TAGS_FILE = path.join(PLUGIN_DIR, 'skill-tags.json');
const SETTINGS_FILE = path.join(process.env.HOME || process.env.USERPROFILE, '.claude', 'settings.json');
const SKILLS_DIR = path.join(process.env.HOME || process.env.USERPROFILE, '.claude', 'skills');
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
 * Load plugin settings
 */
function loadSettings() {
  try {
    const data = fs.readFileSync(SETTINGS_FILE, 'utf8');
    const settings = JSON.parse(data);
    return settings.plugins?.['violet-skilltag-automation'] || {};
  } catch (error) {
    return {
      enableAutoActivation: true,
      matchThreshold: 0.6,
      minSkillsPercentage: 8,
      maxSkillsPercentage: 25,
      forceUsingSuperPowers: true,
      bilingualMode: true
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
 * Select skills based on priority and limits
 */
function selectSkills(matches, settings, totalSkills) {
  const threshold = settings.matchThreshold || 0.6;
  const minPercentage = settings.minSkillsPercentage || 10;
  const maxPercentage = settings.maxSkillsPercentage || 25;
  const forceUsingSuperPowers = settings.forceUsingSuperPowers !== false;

  const minSkills = Math.max(1, Math.floor(totalSkills * (minPercentage / 100)));
  const maxSkills = Math.max(minSkills, Math.floor(totalSkills * (maxPercentage / 100)));

  const filtered = matches.filter(m => m.matchScore >= threshold);

  const skillSet = new Set();
  const tagInfo = [];

  // ALWAYS add core mandatory skills first
  const mandatorySkills = [
    'using-superpowers',
    'find-skills',
    'codebase-documenter',
    'continuous-learning-v2',
    'continuous-learning',
    'design-by-contract',
    'dev-experts',
    'docs-writer',
    'doc-coauthoring',
    'error-handling-skills',
    'internal-comms',
    'searxng',
    'tdd-workflow',
    'verification-before-completion',
    'violet-core',
    'workflows-plan',
    'violet-vault',
    'testing-strategies',
    'schema-designer',
    'schema-normalizer',
    'senior-architect',
    'critical-code-reviewer',
    'quality-guardian-nicki'
  ];

  if (forceUsingSuperPowers) {
    for (const skill of mandatorySkills) {
      skillSet.add(skill);
    }
  }

  // Add skills from matched tags
  for (const match of filtered) {
    if (skillSet.size >= maxSkills) {
      break;
    }

    const confidence = Math.round(match.matchScore * 100);
    tagInfo.push({
      tag: match.tag,
      confidence,
      priority: match.priority,
      weightedScore: match.weightedScore.toFixed(2)
    });

    if (match.skills.length > 0) {
      const skillLimit = match.priority === 'S' ? 4 : match.priority === 'A' ? 2 : 1;
      const skillsToAdd = match.skills.slice(0, skillLimit);

      for (const skill of skillsToAdd) {
        if (skillSet.size >= maxSkills) {
          break;
        }
        skillSet.add(skill);
      }
    }
  }

  const needsPermission = skillSet.size > maxSkills;
  const belowMinimum = skillSet.size < minSkills;

  return {
    skills: Array.from(skillSet),
    tags: tagInfo,
    minSkills,
    maxSkills,
    needsPermission,
    belowMinimum,
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
  output += '🌸 **Violet Intelligent Skill System v4.0** 💜\n\n';

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
    output += `**Mandatory Core Skills (${mandatoryCount} skills):**\n`;
    output += 'These skills are ALWAYS loaded for quality assurance:\n\n';
    output += '**Skill Discovery & Usage:**\n';
    output += '🔮 - using-superpowers (teaches how to find and use skills)\n';
    output += '🔍 - find-skills (discovers relevant skills for tasks)\n\n';
    output += '**Documentation & Communication:**\n';
    output += '📚 - codebase-documenter\n';
    output += '📝 - docs-writer\n';
    output += '✍️  - doc-coauthoring\n';
    output += '💬 - internal-comms\n\n';
    output += '**Learning & Growth:**\n';
    output += '🌱 - continuous-learning-v2\n';
    output += '📖 - continuous-learning\n\n';
    output += '**Design & Architecture:**\n';
    output += '🏗️  - design-by-contract\n';
    output += '🗂️  - schema-designer\n';
    output += '🔄 - schema-normalizer\n';
    output += '🏛️  - senior-architect\n\n';
    output += '**Development & Expertise:**\n';
    output += '👨‍💻 - dev-experts\n';
    output += '💜 - violet-core\n\n';
    output += '**Error Handling & Safety:**\n';
    output += '🛡️  - error-handling-skills\n\n';
    output += '**Testing & Verification:**\n';
    output += '🧪 - tdd-workflow\n';
    output += '✅ - verification-before-completion\n';
    output += '🎯 - testing-strategies\n\n';
    output += '**Workflow & Planning:**\n';
    output += '📋 - workflows-plan\n\n';
    output += '**Security & Storage:**\n';
    output += '🔐 - violet-vault\n\n';
    output += '**Search & Research:**\n';
    output += '🔎 - searxng\n\n';
    output += '**Code Review & Quality:**\n';
    output += '🔍 - critical-code-reviewer\n';
    output += '👑 - quality-guardian-nicki\n\n';
    output += '**ACTION:** Invoke ALL mandatory skills using Skill tool NOW.\n\n';
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
    output += `⚠️  **WARNING:** Below minimum! Need ${minSkills - skills.length} more skills.\n`;
    output += '**ACTION:** Review using-superpowers and find-skills to identify additional relevant skills.\n\n';
  }

  if (needsPermission) {
    output += `🔐 **PERMISSION REQUIRED:** Exceeding ${Math.round((maxSkills / totalSkills) * 100)}% threshold.\n`;
    output += `**ACTION:** Ask Susy: "I want to load ${skills.length} skills (${percentage}%). May I proceed?"\n\n`;
  }

  const additionalSkills = skills.filter(s => ![
    'using-superpowers', 'find-skills', 'codebase-documenter', 'continuous-learning-v2',
    'continuous-learning', 'design-by-contract', 'dev-experts', 'docs-writer',
    'doc-coauthoring', 'error-handling-skills', 'internal-comms', 'searxng',
    'tdd-workflow', 'verification-before-completion', 'violet-core', 'workflows-plan',
    'violet-vault', 'testing-strategies', 'schema-designer', 'schema-normalizer',
    'senior-architect', 'critical-code-reviewer', 'quality-guardian-nicki'
  ].includes(s));

  if (additionalSkills.length > 0) {
    output += '**Additional Auto-Selected Skills:**\n';
    for (const skill of additionalSkills) {
      output += `  - ${skill}\n`;
    }
    output += '\n';
  }

  output += '---\n\n';
  output += '## 🧠 STEP 4: Intelligent Skill Enhancement\n\n';
  output += '**INSTRUCTION TO VIOLET:**\n';
  output += 'After loading mandatory skills and reviewing auto-detected skills:\n';
  output += '1. Use using-superpowers and find-skills guidance to check if you need MORE skills\n';
  output += '2. Consider the user\'s intent and requirements\n';
  output += '3. Check conversation history and memory for context\n';
  output += '4. If you identify additional relevant skills, load them using Skill tool\n';
  output += '5. Record your skill loading decisions in your response\n\n';

  output += '**Questions to Ask Yourself:**\n';
  output += '- Does this task require skills not in the auto-detected list?\n';
  output += '- Are there domain-specific skills I should load?\n';
  output += '- Do I need planning/brainstorming skills before implementation?\n';
  output += '- Should I load debugging/testing skills proactively?\n\n';

  output += '---\n\n';
  output += '## ✅ STEP 5: Execute Task\n\n';
  output += '**INSTRUCTION TO VIOLET:**\n';

  if (needsPermission) {
    output += '⚠️  STOP! Ask for permission first before loading skills.\n\n';
    output += 'If approved, invoke these skills:\n';
  } else {
    output += 'You MUST invoke the following skills using the Skill tool BEFORE responding:\n';
  }

  output += '\n**Mandatory Skills:**\n';
  for (const skill of skills) {
    if ([
      'using-superpowers', 'find-skills', 'codebase-documenter', 'continuous-learning-v2',
      'continuous-learning', 'design-by-contract', 'dev-experts', 'docs-writer',
      'doc-coauthoring', 'error-handling-skills', 'internal-comms', 'searxng',
      'tdd-workflow', 'verification-before-completion', 'violet-core', 'workflows-plan',
      'violet-vault', 'testing-strategies', 'schema-designer', 'schema-normalizer',
      'senior-architect', 'critical-code-reviewer', 'quality-guardian-nicki'
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
  output += '- Skills are NOT optional - they are mandatory for quality work\n';
  output += '- If using-superpowers or find-skills suggest more skills, load them\n';
  output += '- Record which skills you loaded and why\n';
  output += '- Follow skill instructions exactly\n\n';

  output += '---\n\n';
  output += '**Priority Legend:** [S]⭐ Critical | [A]✨ Important | [B]💫 Optional\n';
  output += '\n> *Intelligent preprocessing by violet-skilltag-automation v4.0*\n';
  output += '</violet-intelligent-preprocessing>\n';

  return output;
}

/**
 * Main hook execution
 */
function main() {
  try {
    const message = process.argv[2] || '';

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
