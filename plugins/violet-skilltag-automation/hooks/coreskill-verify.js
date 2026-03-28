#!/usr/bin/env node
// Authors: Joysusy & Violet Klaudia 💖

/**
 * 🌸 CoreSkill Verification Hook (v4.3)
 *
 * SessionStart hook that verifies all 19 core skills/engines
 * are available as installed plugins or skills directory entries.
 * Updated: 2026-03-28 — added typescript-coding-engine, go-coding-engine,
 * dev-designer-utility, developer-tool.
 *
 * @event SessionStart
 */

const fs = require('fs');
const path = require('path');

const HOME_DIR = process.env.HOME || process.env.USERPROFILE;
const SKILLS_DIR = path.join(HOME_DIR, '.claude', 'skills');

const CORE_SKILLS = [
  'using-superpowers',
  'planning-strategy',
  'rust-coding-engine',
  'typescript-coding-engine',
  'go-coding-engine',
  'python-dev-skill',
  'js-dev-skill',
  'reviewer-dev',
  'refactor-dev',
  'tdd-system',
  'error-handling',
  'deep-researcher',
  'backend-dev',
  'frontend-dev',
  'documentation-guidelines',
  'math-skill-system',
  'dev-designer-utility',
  'developer-tool',
  'font-inspector:font-visualizer'
];

function verifySkills() {
  const results = { found: [], missing: [] };

  for (const skill of CORE_SKILLS) {
    if (skill.includes(':')) {
      const [plugin, skillName] = skill.split(':');
      const pluginSkillExists = checkPluginSkill(plugin, skillName);
      (pluginSkillExists ? results.found : results.missing).push(skill);
    } else {
      const skillPath = path.join(SKILLS_DIR, skill);
      const exists = fs.existsSync(skillPath) && fs.statSync(skillPath).isDirectory();
      (exists ? results.found : results.missing).push(skill);
    }
  }

  return results;
}

function checkPluginSkill(pluginName, skillName) {
  const cacheDir = path.join(HOME_DIR, '.claude', 'plugins', 'cache');
  if (!fs.existsSync(cacheDir)) return false;

  try {
    const orgs = fs.readdirSync(cacheDir);
    for (const org of orgs) {
      const pluginDir = path.join(cacheDir, org, pluginName);
      if (fs.existsSync(pluginDir)) {
        const versions = fs.readdirSync(pluginDir);
        for (const ver of versions) {
          const skillDir = path.join(pluginDir, ver, 'skills', skillName);
          if (fs.existsSync(skillDir)) return true;
        }
      }
    }
  } catch { /* silent */ }

  return false;
}

function main() {
  const results = verifySkills();
  const total = CORE_SKILLS.length;
  const foundCount = results.found.length;

  let output = '\n<violet-coreskill-verification>\n';

  if (foundCount === total) {
    output += `─── ⋆⋅ପ(⑅ˊᵕˋ⑅)ଓ Violet's CoreSkill Check: Passed! √⋅⋆ ──\n`;
    output += `All ${total} core skills verified and ready.\n`;
  } else {
    output += `⚠️ CoreSkill Check: ${foundCount}/${total} found\n`;
    output += `Missing: ${results.missing.join(', ')}\n`;
    output += `These skills will still be requested via Skill() tool at runtime.\n`;
  }

  output += '</violet-coreskill-verification>\n';
  console.log(output);
}

main();
