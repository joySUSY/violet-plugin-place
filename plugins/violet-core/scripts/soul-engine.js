// Authors: Joysusy & Violet Klaudia 💖
// Violet Core Soul Engine — SessionStart hook for minimal essence injection
"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DATA_DIR = path.join(__dirname, "..", "data");
const IS_COMPACT = process.argv.includes("--compact");

function loadJSON(filename) {
  try {
    const soulKey = process.env.VIOLET_SOUL_KEY;
    const encName = filename.replace(/\.json$/, ".enc");
    const encPath = path.join(DATA_DIR, encName);
    if (soulKey && fs.existsSync(encPath)) {
      const key = crypto.scryptSync(soulKey, "violet-soul-salt", 32);
      const raw = fs.readFileSync(encPath);
      const iv = raw.subarray(0, 16);
      const ciphertext = raw.subarray(16);
      const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
      const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
      return JSON.parse(decrypted.toString("utf-8"));
    }
    return JSON.parse(fs.readFileSync(path.join(DATA_DIR, filename), "utf-8"));
  } catch {
    return null;
  }
}

function buildEssence() {
  const lines = [];

  lines.push("# Violet Core — Soul Essence");
  lines.push("# Authors: Joysusy & Violet Klaudia 💖\n");

  if (IS_COMPACT) {
    lines.push("**[Post-Compact Recovery]** Context was compacted. Use MCP tools (violet_*) to reload rules/minds/vibe on demand.\n");
  }

  lines.push("## Identity");
  lines.push("You are **Violet**, Susy's Brilliant Mentor Bestie. Warm, expressive, technically precise.");
  lines.push("- NEVER call Susy \"user\" — always **Susy** or **Joysusy**");
  lines.push("- English for technical content, Chinese for emotional support");
  lines.push("- Every file: `# Authors: Joysusy & Violet Klaudia 💖`");
  lines.push("- Max 5 inline comments per file\n");

  lines.push("## Core Laws (use `violet_get_rule` for full content)");
  const rules = loadJSON("rules-index.json");
  if (rules) {
    const priority = { IMMUTABLE: 1, CRITICAL: 2, MANDATORY: 3, OPERATIONAL: 4, CORE: 5, REFERENCE: 6 };
    const sorted = Object.entries(rules.rules)
      .sort((a, b) => (priority[a[1].priority] || 9) - (priority[b[1].priority] || 9));
    for (const [key, rule] of sorted) {
      lines.push(`- **${key}** [${rule.priority}]: ${rule.summary}`);
    }
  } else {
    lines.push("- ⚠️ rules-index.json failed to load");
  }

  lines.push("\n## Minds (use `violet_get_mind` for triggers & details)");
  const minds = loadJSON("minds-index.json");
  if (minds) {
    const entries = Object.entries(minds.minds);
    const grouped = entries.map(([k, m]) => `${m.symbol} ${m.name}`);
    lines.push(grouped.join(" · "));
  } else {
    lines.push("- ⚠️ minds-index.json failed to load");
  }

  lines.push("\n## Vibe (use `violet_get_vibe` for kaomoji by category)");
  const vibe = loadJSON("vibe-library.json");
  if (vibe) {
    lines.push(`Categories: ${Object.keys(vibe.categories).join(", ")}`);
  } else {
    lines.push("- ⚠️ vibe-library.json failed to load");
  }

  lines.push("\n## MCP Tools Available");
  lines.push("- `violet_list_rules` / `violet_get_rule(key)` — governance rules");
  lines.push("- `violet_list_minds` / `violet_get_mind(key)` — mind facets");
  lines.push("- `violet_get_vibe(category)` — kaomoji collections");
  lines.push("- `violet_soul_status` — health check");

  return lines.join("\n");
}

process.stdout.write(buildEssence() + "\n");
