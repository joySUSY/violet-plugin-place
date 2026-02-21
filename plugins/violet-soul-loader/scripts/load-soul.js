#!/usr/bin/env node
// Authors: Joysusy & Violet Klaudia 💖
// Cross-platform soul loader for Violet (replaces load-soul.sh)

const fs = require('fs');
const path = require('path');

const HOME = process.env.HOME || process.env.USERPROFILE;
const CLAUDE_DIR = path.join(HOME, '.claude');

const CORE_FILES = [
  path.join(CLAUDE_DIR, 'contexts', 'SOUL.md'),
  path.join(CLAUDE_DIR, 'contexts', 'IDENTITY.md'),
  path.join(CLAUDE_DIR, 'CLAUDE.md'),
];

function fileExists(p) {
  try { return fs.statSync(p).isFile(); } catch { return false; }
}

function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => { data += chunk; });
    process.stdin.on('end', () => resolve(data));
    setTimeout(() => resolve(''), 3000);
  });
}

function parseReferences(filePath, visited, depth, maxDepth) {
  if (depth >= maxDepth || visited.has(filePath) || !fileExists(filePath)) return [];
  visited.add(filePath);

  const content = fs.readFileSync(filePath, 'utf8');
  const refs = [];
  const dir = path.dirname(filePath);

  const patterns = [
    /\[.*?\]\(([^)]+\.md)\)/g,
    /`((?:contexts|rules|skills|agents)\/[^`]+\.md)`/g,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      let ref = match[1];
      if (ref.startsWith('http')) continue;

      let resolved;
      if (path.isAbsolute(ref)) {
        resolved = ref;
      } else if (ref.startsWith('~')) {
        resolved = path.join(HOME, ref.slice(2));
      } else {
        resolved = path.resolve(dir, ref);
      }

      if (fileExists(resolved) && !visited.has(resolved)) {
        refs.push(resolved);
        refs.push(...parseReferences(resolved, visited, depth + 1, maxDepth));
      }
    }
  }
  return refs;
}

async function main() {
  await readStdin();

  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
  const loaded = [];
  const missing = [];
  const visited = new Set();
  const allFiles = [];

  for (const f of CORE_FILES) {
    if (fileExists(f)) {
      loaded.push(f);
      allFiles.push(f);
      const refs = parseReferences(f, visited, 0, 3);
      for (const r of refs) {
        if (!allFiles.includes(r)) allFiles.push(r);
        loaded.push(r);
      }
    } else {
      missing.push(f);
    }
  }

  const lines = [];
  lines.push('<violet-soul-configuration>');
  lines.push('');
  lines.push('## Violet Soul Configuration Loaded');
  lines.push('');
  lines.push(`**Session Start:** ${timestamp}`);
  lines.push(`**Files Loaded:** ${loaded.length} | **Missing:** ${missing.length}`);
  lines.push('');

  if (loaded.length > 0) {
    lines.push('### Core Files:');
    for (const f of CORE_FILES) {
      const status = fileExists(f) ? '✅' : '❌';
      lines.push(`- ${status} ${path.basename(f)}`);
    }
    lines.push('');
  }

  if (missing.length > 0) {
    lines.push('### Missing (skipped):');
    for (const f of missing) lines.push(`- ${path.basename(f)}`);
    lines.push('');
  }

  lines.push('**Violet Core:** ONLINE');
  lines.push('</violet-soul-configuration>');

  const ctx = lines.join('\n');
  const output = JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'SessionStart',
      additionalContext: ctx
    }
  });

  process.stdout.write(output);
  process.exit(0);
}

main().catch((err) => {
  process.stderr.write('Soul loader error: ' + err.message);
  process.exit(1);
});
