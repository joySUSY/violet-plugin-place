#!/usr/bin/env node
// Authors: Joysusy & Violet Klaudia 💖

/**
 * Violet Skill System v4.3 — Context-Aware Routing Coordinator
 *
 * Direction A: Workflow-aware routing, not keyword-matching.
 * Injects behavioral directives, not skill loading lists.
 * Core engines are plugins (auto-discovered) — no Skill() calls needed.
 *
 * @event UserPromptSubmit
 */

const fs = require('fs');
const path = require('path');

const PLUGIN_DIR = path.resolve(__dirname, '..');
const TAGS_FILE = path.join(PLUGIN_DIR, 'skill-tags.json');
const HOME_DIR = process.env.HOME || process.env.USERPROFILE;
const SETTINGS_FILE = path.join(HOME_DIR, '.claude', 'settings.json');
const LOG_FILE = path.join(PLUGIN_DIR, 'skill-activation-log.jsonl');

function loadSettings() {
  try {
    const data = fs.readFileSync(SETTINGS_FILE, 'utf8');
    const settings = JSON.parse(data);
    return settings.plugins?.['violet-skilltag-automation'] || {};
  } catch {
    return { enableAutoActivation: true, bilingualMode: true };
  }
}

function loadTags() {
  try {
    return JSON.parse(fs.readFileSync(TAGS_FILE, 'utf8'));
  } catch {
    return { tags: {}, priorityWeights: { S: 3.0, A: 2.0, B: 1.0 } };
  }
}

function detectDomains(message) {
  const lower = message.toLowerCase();
  const detected = [];

  const domains = {
    rust: /rust|cargo|tokio|axum|pyo3|maturin|ffi|wasm-bindgen|bevy/i,
    typescript: /typescript|ts\b|type system|generics|tsconfig|corsa|tsgo/i,
    go: /golang|go\s|goroutine|channel|go.?mod|gin|fiber|echo/i,
    python: /python|py\b|pip|uv\b|fastapi|django|pandas|numpy|pydantic/i,
    javascript: /javascript|js\b|node|react|bun|vite|jsx|tsx/i,
    frontend: /ui\b|ux\b|css|tailwind|component|responsive|accessibility/i,
    backend: /api\b|database|sql|graphql|rest|microservice|endpoint/i,
    design: /design.?token|typography|font|color.?palette|spacing/i
  };

  for (const [domain, pattern] of Object.entries(domains)) {
    if (pattern.test(message)) detected.push(domain);
  }

  return detected;
}

function detectWorkflowPhase(message) {
  const lower = message.toLowerCase();

  if (/plan|design|architect|strategy|roadmap|adr|prd/i.test(lower)) return 'planning';
  if (/test|tdd|red.?green|coverage|verify|regression/i.test(lower)) return 'testing';
  if (/review|audit|security|owasp|quality/i.test(lower)) return 'review';
  if (/research|investigate|explore|fact.?check|analyze/i.test(lower)) return 'research';
  if (/refactor|optimize|performance|simplif|complex/i.test(lower)) return 'refactoring';
  if (/document|readme|spec|handoff/i.test(lower)) return 'documentation';
  if (/debug|error|fix|bug|crash/i.test(lower)) return 'debugging';
  if (/build|implement|create|write|add|code/i.test(lower)) return 'implementing';

  return 'general';
}

function formatOutput(message, domains, phase) {
  let output = '\n<violet-intelligent-preprocessing>\n';
  output += '🌸 **Violet Intelligent Skill System v4.3** 💜\n\n';

  // Workflow phase directive
  const phaseDirectives = {
    planning: 'Plan before code. Read planning-strategy references. Document decisions as ADRs.',
    testing: 'Test first. Red-Green-Refactor. Never claim done without passing tests.',
    review: 'Evidence-first review. Check security (OWASP). Use reviewer-dev references.',
    research: 'Search before assuming. Verify before claiming. Cite sources.',
    refactoring: 'Tests green BEFORE and AFTER. Measure before optimizing.',
    documentation: 'BLUF: lead with the answer. Dual EN+CN versions for formal docs.',
    debugging: '6-phase protocol: Reproduce → Observe → Hypothesize → Discriminate → Fix → Verify.',
    implementing: 'Plan first, test first, then implement. Consult relevant engine references.',
    general: 'Check memory/context for project state. Load relevant engine SKILL.md before acting.'
  };

  output += `**Workflow Phase:** ${phase}\n`;
  output += `**Directive:** ${phaseDirectives[phase]}\n\n`;

  if (domains.length > 0) {
    output += `**Detected Domains:** ${domains.join(', ')}\n`;
    output += `**Action:** Consult these engine references before responding.\n\n`;
  }

  output += '**Standing Rules:**\n';
  output += '- 19 core engine plugins are installed and active (auto-discovered)\n';
  output += '- Your training data may be stale — check engine references for current guidance\n';
  output += '- Plan before code · Test before ship · Review before merge · Research before assume\n\n';

  output += '> *v4.3 — context-aware routing by violet-skilltag-automation*\n';
  output += '</violet-intelligent-preprocessing>\n';

  return output;
}

function logActivation(message, domains, phase) {
  try {
    const entry = {
      timestamp: new Date().toISOString(),
      message: message.substring(0, 80),
      domains,
      phase
    };
    fs.appendFileSync(LOG_FILE, JSON.stringify(entry) + '\n');
  } catch { /* silent */ }
}

function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => { data += chunk; });
    process.stdin.on('end', () => {
      try { resolve(JSON.parse(data)); }
      catch { resolve({ prompt: data.trim() }); }
    });
    setTimeout(() => resolve({ prompt: '' }), 3000);
  });
}

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

    const domains = detectDomains(message);
    const phase = detectWorkflowPhase(message);

    logActivation(message, domains, phase);

    const output = formatOutput(message, domains, phase);
    console.log(output);

    process.exit(0);
  } catch (error) {
    console.error('❌ Skill activator error:', error.message);
    process.exit(1);
  }
}

main();
