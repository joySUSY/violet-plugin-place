#!/usr/bin/env node

/**
 * 🌸 Violet Skill Tag Manager Command
 *
 * Manage skill tags: add, remove, list, search, and configure auto-activation.
 *
 * Usage:
 *   /skilltag list                    - List all tags
 *   /skilltag search <keyword>        - Search tags by keyword
 *   /skilltag add <tag> <keyword>     - Add keyword to tag
 *   /skilltag remove <tag> <keyword>  - Remove keyword from tag
 *   /skilltag create <tag>            - Create new custom tag
 *   /skilltag delete <tag>            - Delete custom tag
 *   /skilltag info <tag>              - Show tag details
 *   /skilltag toggle                  - Toggle auto-activation on/off
 *
 * @author Violet & Susy
 */

const fs = require('fs');
const path = require('path');

// Configuration paths - use __dirname for plugin-relative paths
const PLUGIN_DIR = path.resolve(__dirname, '..');
const TAGS_FILE = path.join(PLUGIN_DIR, 'skill-tags.json');
const HOME_DIR = process.env.HOME || process.env.USERPROFILE;
const SETTINGS_FILE = path.join(HOME_DIR, '.claude', 'settings.json');

/**
 * Load skill tags configuration
 */
function loadTags() {
  try {
    const data = fs.readFileSync(TAGS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('❌ Failed to load skill-tags.json:', error.message);
    process.exit(1);
  }
}

/**
 * Save skill tags configuration
 */
function saveTags(tagsConfig) {
  try {
    fs.writeFileSync(TAGS_FILE, JSON.stringify(tagsConfig, null, 2), 'utf8');
    console.log('✅ Tags saved successfully');
  } catch (error) {
    console.error('❌ Failed to save tags:', error.message);
    process.exit(1);
  }
}

/**
 * Load settings
 */
function loadSettings() {
  try {
    const data = fs.readFileSync(SETTINGS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { plugins: {} };
  }
}

/**
 * Save settings
 */
function saveSettings(settings) {
  try {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf8');
    console.log('✅ Settings saved successfully');
  } catch (error) {
    console.error('❌ Failed to save settings:', error.message);
    process.exit(1);
  }
}

/**
 * List all tags
 */
function listTags(tagsConfig) {
  console.log('\n🌸 **Violet Skill Tags** 💜\n');

  const allTags = { ...tagsConfig.tags, ...tagsConfig.customTags };
  const tagNames = Object.keys(allTags).sort();

  if (tagNames.length === 0) {
    console.log('No tags found.');
    return;
  }

  console.log(`Total: ${tagNames.length} tags\n`);

  for (const tagName of tagNames) {
    const tagData = allTags[tagName];
    const isCustom = tagsConfig.customTags[tagName] ? '🔧' : '📦';
    const keywordCount = tagData.keywords?.length || 0;
    const skillCount = tagData.skills?.length || 0;
    const priority = tagData.priority || 'B';
    const priorityEmoji = priority === 'S' ? '⭐' : priority === 'A' ? '✨' : '💫';

    console.log(`${isCustom} **${tagName}** [${priority}] ${priorityEmoji}`);
    console.log(`   Keywords: ${keywordCount} | Skills: ${skillCount}`);

    if (keywordCount > 0) {
      const preview = tagData.keywords.slice(0, 5).join(', ');
      console.log(`   Preview: ${preview}${keywordCount > 5 ? '...' : ''}`);
    }
    console.log('');
  }

  console.log('Legend: 📦 Built-in | 🔧 Custom | [S]⭐ Critical | [A]✨ Important | [B]💫 Optional\n');
}

/**
 * Show tag details
 */
function showTagInfo(tagsConfig, tagName) {
  const allTags = { ...tagsConfig.tags, ...tagsConfig.customTags };
  const tagData = allTags[tagName.toLowerCase()];

  if (!tagData) {
    console.error(`❌ Tag "${tagName}" not found`);
    process.exit(1);
  }

  const isCustom = tagsConfig.customTags[tagName.toLowerCase()] ? 'Custom' : 'Built-in';
  const priority = tagData.priority || 'B';
  const priorityEmoji = priority === 'S' ? '⭐' : priority === 'A' ? '✨' : '💫';

  console.log(`\n🌸 **Tag: ${tagName}** (${isCustom}) [${priority}] ${priorityEmoji} 💜\n`);

  console.log('**Keywords:**');
  if (tagData.keywords && tagData.keywords.length > 0) {
    tagData.keywords.forEach(kw => console.log(`  - ${kw}`));
  } else {
    console.log('  (none)');
  }

  console.log('\n**Associated Skills:**');
  if (tagData.skills && tagData.skills.length > 0) {
    tagData.skills.forEach(skill => console.log(`  - ${skill}`));
  } else {
    console.log('  (none)');
  }

  console.log('');
}

/**
 * Search tags by keyword
 */
function searchTags(tagsConfig, query) {
  const lowerQuery = query.toLowerCase();
  const allTags = { ...tagsConfig.tags, ...tagsConfig.customTags };
  const matches = [];

  for (const [tagName, tagData] of Object.entries(allTags)) {
    // Search in tag name
    if (tagName.toLowerCase().includes(lowerQuery)) {
      matches.push({ tag: tagName, reason: 'tag name', data: tagData });
      continue;
    }

    // Search in keywords
    if (tagData.keywords) {
      for (const keyword of tagData.keywords) {
        if (keyword.toLowerCase().includes(lowerQuery)) {
          matches.push({ tag: tagName, reason: `keyword: ${keyword}`, data: tagData });
          break;
        }
      }
    }
  }

  console.log(`\n🔍 Search results for "${query}":\n`);

  if (matches.length === 0) {
    console.log('No matches found.\n');
    return;
  }

  for (const match of matches) {
    console.log(`✨ **${match.tag}** (matched: ${match.reason})`);
    console.log(`   Keywords: ${match.data.keywords?.length || 0} | Skills: ${match.data.skills?.length || 0}`);
    console.log('');
  }
}

/**
 * Prompt for priority selection
 */
function promptPriority() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    console.log('\n🌸 Select priority for this tag:\n');
    console.log('  [S] Critical - Highest priority (e.g., test, review, core languages)');
    console.log('  [A] Important - Medium priority (e.g., debug, refactor, planning)');
    console.log('  [B] Optional - Lower priority (e.g., docs, visualization, git)');
    console.log('  [V] Violet decides - Let Violet auto-assign based on tag name\n');

    rl.question('Enter priority (S/A/B/V): ', (answer) => {
      rl.close();
      const priority = answer.trim().toUpperCase();

      if (['S', 'A', 'B', 'V'].includes(priority)) {
        resolve(priority);
      } else {
        console.log('⚠️  Invalid input, defaulting to [B]');
        resolve('B');
      }
    });
  });
}

/**
 * Auto-assign priority based on tag name (Violet's intelligence)
 */
function autoAssignPriority(tagName) {
  const lowerTag = tagName.toLowerCase();

  // S-tier keywords: core development, testing, major languages
  const sTierKeywords = ['test', 'review', 'rust', 'python', 'java', 'dev', 'backend', 'frontend', 'memory', 'security'];

  // A-tier keywords: important but not critical
  const aTierKeywords = ['debug', 'refactor', 'plan', 'agent', 'performance', 'database', 'search', 'research', 'javascript'];

  // Check for S-tier
  for (const keyword of sTierKeywords) {
    if (lowerTag.includes(keyword)) {
      return 'S';
    }
  }

  // Check for A-tier
  for (const keyword of aTierKeywords) {
    if (lowerTag.includes(keyword)) {
      return 'A';
    }
  }

  // Default to B-tier
  return 'B';
}

/**
 * Create new custom tag
 */
async function createTag(tagsConfig, tagName, priorityArg) {
  const lowerTag = tagName.toLowerCase();

  if (tagsConfig.tags[lowerTag] || tagsConfig.customTags[lowerTag]) {
    console.error(`❌ Tag "${tagName}" already exists`);
    process.exit(1);
  }

  let priority;

  if (priorityArg) {
    // Priority provided as argument
    priority = priorityArg.toUpperCase();
    if (!['S', 'A', 'B', 'V'].includes(priority)) {
      console.error('❌ Invalid priority. Use S, A, B, or V');
      process.exit(1);
    }
  } else {
    // Interactive prompt
    priority = await promptPriority();
  }

  // If Violet decides, auto-assign
  if (priority === 'V') {
    priority = autoAssignPriority(tagName);
    console.log(`\n💜 Violet assigned priority: [${priority}]`);
  }

  tagsConfig.customTags[lowerTag] = {
    keywords: [],
    skills: [],
    priority: priority
  };

  saveTags(tagsConfig);
  console.log(`✅ Created custom tag: ${tagName} with priority [${priority}]`);
}

/**
 * Delete custom tag
 */
function deleteTag(tagsConfig, tagName) {
  const lowerTag = tagName.toLowerCase();

  if (tagsConfig.tags[lowerTag]) {
    console.error(`❌ Cannot delete built-in tag "${tagName}"`);
    process.exit(1);
  }

  if (!tagsConfig.customTags[lowerTag]) {
    console.error(`❌ Custom tag "${tagName}" not found`);
    process.exit(1);
  }

  delete tagsConfig.customTags[lowerTag];
  saveTags(tagsConfig);
  console.log(`✅ Deleted custom tag: ${tagName}`);
}

/**
 * Add keyword to tag
 */
function addKeyword(tagsConfig, tagName, keyword) {
  const lowerTag = tagName.toLowerCase();
  let tagData = tagsConfig.customTags[lowerTag];

  if (!tagData) {
    if (tagsConfig.tags[lowerTag]) {
      console.error(`❌ Cannot modify built-in tag "${tagName}". Create a custom tag instead.`);
      process.exit(1);
    }
    console.error(`❌ Tag "${tagName}" not found. Use "create" first.`);
    process.exit(1);
  }

  if (!tagData.keywords) {
    tagData.keywords = [];
  }

  if (tagData.keywords.includes(keyword)) {
    console.log(`⚠️  Keyword "${keyword}" already exists in tag "${tagName}"`);
    return;
  }

  tagData.keywords.push(keyword);
  saveTags(tagsConfig);
  console.log(`✅ Added keyword "${keyword}" to tag "${tagName}"`);
}

/**
 * Remove keyword from tag
 */
function removeKeyword(tagsConfig, tagName, keyword) {
  const lowerTag = tagName.toLowerCase();
  let tagData = tagsConfig.customTags[lowerTag];

  if (!tagData) {
    console.error(`❌ Custom tag "${tagName}" not found`);
    process.exit(1);
  }

  if (!tagData.keywords || !tagData.keywords.includes(keyword)) {
    console.error(`❌ Keyword "${keyword}" not found in tag "${tagName}"`);
    process.exit(1);
  }

  tagData.keywords = tagData.keywords.filter(kw => kw !== keyword);
  saveTags(tagsConfig);
  console.log(`✅ Removed keyword "${keyword}" from tag "${tagName}"`);
}

/**
 * Toggle auto-activation
 */
function toggleAutoActivation() {
  const settings = loadSettings();

  if (!settings.plugins) {
    settings.plugins = {};
  }

  if (!settings.plugins['violet-skilltag-automation']) {
    settings.plugins['violet-skilltag-automation'] = {};
  }

  const pluginSettings = settings.plugins['violet-skilltag-automation'];
  const currentState = pluginSettings.enableAutoActivation !== false;
  const newState = !currentState;

  pluginSettings.enableAutoActivation = newState;
  saveSettings(settings);

  console.log(`\n🌸 Auto-activation is now: ${newState ? '✅ ENABLED' : '❌ DISABLED'} 💜\n`);
}

/**
 * Show help
 */
function showHelp() {
  console.log(`
🌸 **Violet Skill Tag Manager v2.0** 💜

**Usage:**
  /skilltag list                       - List all tags with priorities
  /skilltag search <keyword>           - Search tags by keyword
  /skilltag info <tag>                 - Show tag details
  /skilltag create <tag> [priority]    - Create new custom tag (prompts for priority if not provided)
  /skilltag delete <tag>               - Delete custom tag
  /skilltag add <tag> <keyword>        - Add keyword to tag
  /skilltag remove <tag> <keyword>     - Remove keyword from tag
  /skilltag toggle                     - Toggle auto-activation on/off

**Priority Levels:**
  [S] ⭐ Critical   - Highest priority (test, review, core languages, memory)
  [A] ✨ Important  - Medium priority (debug, refactor, planning)
  [B] 💫 Optional   - Lower priority (docs, visualization, git)
  [V] 💜 Violet decides - Auto-assign based on tag name

**Examples:**
  /skilltag list
  /skilltag search rust
  /skilltag info debug
  /skilltag create myproject          # Interactive priority selection
  /skilltag create myproject S        # Create with S priority
  /skilltag create myproject V        # Let Violet decide
  /skilltag add myproject "my app"
  /skilltag toggle

**Notes:**
  - Tag names are case-insensitive
  - Built-in tags cannot be modified (create custom tags instead)
  - Keywords support both English and Chinese (中英文)
  - Priority affects skill selection when limit is reached
  - S-priority tags get up to 4 skills, A gets 2, B gets 1
`);
}

/**
 * Main command execution
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    showHelp();
    process.exit(0);
  }

  const command = args[0].toLowerCase();
  const tagsConfig = loadTags();

  switch (command) {
    case 'list':
      listTags(tagsConfig);
      break;

    case 'info':
      if (args.length < 2) {
        console.error('❌ Usage: /skilltag info <tag>');
        process.exit(1);
      }
      showTagInfo(tagsConfig, args[1]);
      break;

    case 'search':
      if (args.length < 2) {
        console.error('❌ Usage: /skilltag search <keyword>');
        process.exit(1);
      }
      searchTags(tagsConfig, args[1]);
      break;

    case 'create':
      if (args.length < 2) {
        console.error('❌ Usage: /skilltag create <tag> [priority]');
        process.exit(1);
      }
      await createTag(tagsConfig, args[1], args[2]);
      break;

    case 'delete':
      if (args.length < 2) {
        console.error('❌ Usage: /skilltag delete <tag>');
        process.exit(1);
      }
      deleteTag(tagsConfig, args[1]);
      break;

    case 'add':
      if (args.length < 3) {
        console.error('❌ Usage: /skilltag add <tag> <keyword>');
        process.exit(1);
      }
      addKeyword(tagsConfig, args[1], args.slice(2).join(' '));
      break;

    case 'remove':
      if (args.length < 3) {
        console.error('❌ Usage: /skilltag remove <tag> <keyword>');
        process.exit(1);
      }
      removeKeyword(tagsConfig, args[1], args.slice(2).join(' '));
      break;

    case 'toggle':
      toggleAutoActivation();
      break;

    case 'help':
    case '--help':
    case '-h':
      showHelp();
      break;

    default:
      console.error(`❌ Unknown command: ${command}`);
      showHelp();
      process.exit(1);
  }
}

// Execute
main();
