// Authors: Joysusy & Violet Klaudia 💖
// Violet Core MCP Server — zero-dependency stdio JSON-RPC 2.0
"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DATA_DIR = path.join(__dirname, "..", "data");
const SERVER_NAME = "violet-ctx";
const SERVER_VERSION = "2.0.0";

function loadJSON(filename) {
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
}

let rulesData = null;
let mindsData = null;
let vibeData = null;

function getRules() {
  if (!rulesData) rulesData = loadJSON("rules-index.json");
  return rulesData;
}
function getMinds() {
  if (!mindsData) mindsData = loadJSON("minds-index.json");
  return mindsData;
}
function getVibe() {
  if (!vibeData) vibeData = loadJSON("vibe-library.json");
  return vibeData;
}

const TOOLS = [
  {
    name: "violet_list_rules",
    description: "List all Violet governance rules with title, priority, and summary",
    inputSchema: { type: "object", properties: {}, required: [] }
  },
  {
    name: "violet_get_rule",
    description: "Get full content of a specific Violet rule by key",
    inputSchema: {
      type: "object",
      properties: { key: { type: "string", description: "Rule key, e.g. zero-compression, max-thinking" } },
      required: ["key"]
    }
  },
  {
    name: "violet_list_minds",
    description: "List all Violet Mind facets with symbol, role, and nature",
    inputSchema: { type: "object", properties: {}, required: [] }
  },
  {
    name: "violet_get_mind",
    description: "Get details of a specific Violet Mind by key",
    inputSchema: {
      type: "object",
      properties: { key: { type: "string", description: "Mind key, e.g. lilith, aurora, rune" } },
      required: ["key"]
    }
  },
  {
    name: "violet_get_vibe",
    description: "Get kaomoji collection for a specific emotional category",
    inputSchema: {
      type: "object",
      properties: { category: { type: "string", description: "Category, e.g. happy, sad, cheer, bunny" } },
      required: ["category"]
    }
  },
  {
    name: "violet_soul_status",
    description: "Check Violet Core plugin health and data integrity",
    inputSchema: { type: "object", properties: {}, required: [] }
  }
];

function handleTool(name, args) {
  switch (name) {
    case "violet_list_rules": {
      const rules = getRules().rules;
      const rows = Object.entries(rules).map(([k, v]) =>
        `- **${k}** [${v.priority}]: ${v.title} — ${v.summary}`
      );
      return rows.join("\n");
    }
    case "violet_get_rule": {
      const rules = getRules().rules;
      const rule = rules[args.key];
      if (!rule) return `Rule "${args.key}" not found. Use violet_list_rules to see available keys.`;
      return `# ${rule.title} [${rule.priority}]\n\n${rule.summary}\n\n${rule.content}`;
    }
    case "violet_list_minds": {
      const minds = getMinds().minds;
      const rows = Object.entries(minds).map(([k, v]) =>
        `- ${v.symbol} **${v.name}** (${k}): ${v.role} — ${v.nature}`
      );
      return rows.join("\n");
    }
    case "violet_get_mind": {
      const minds = getMinds().minds;
      const mind = minds[args.key];
      if (!mind) return `Mind "${args.key}" not found. Use violet_list_minds to see available keys.`;
      return `${mind.symbol} **${mind.name}**\nRole: ${mind.role}\nNature: ${mind.nature}\nTriggers: ${mind.triggers.join(", ")}`;
    }
    case "violet_get_vibe": {
      const cats = getVibe().categories;
      const cat = cats[args.category];
      if (!cat) return `Category "${args.category}" not found. Available: ${Object.keys(cats).join(", ")}`;
      return `**${args.category}** kaomoji (${cat.length}):\n${cat.join("  ")}`;
    }
    case "violet_soul_status": {
      const status = [];
      try { const r = getRules(); status.push(`Rules: ${Object.keys(r.rules).length} loaded`); } catch { status.push("Rules: FAILED"); }
      try { const m = getMinds(); status.push(`Minds: ${Object.keys(m.minds).length} loaded`); } catch { status.push("Minds: FAILED"); }
      try { const v = getVibe(); status.push(`Vibe: ${Object.keys(v.categories).length} categories`); } catch { status.push("Vibe: FAILED"); }
      status.push(`Server: ${SERVER_NAME} v${SERVER_VERSION}`);
      return status.join("\n");
    }
    default:
      return null;
  }
}

function jsonrpc(id, result) {
  return JSON.stringify({ jsonrpc: "2.0", id, result });
}

function jsonrpcError(id, code, message) {
  return JSON.stringify({ jsonrpc: "2.0", id, error: { code, message } });
}

function handleRequest(req) {
  const { id, method, params } = req;

  switch (method) {
    case "initialize":
      return jsonrpc(id, {
        protocolVersion: "2024-11-05",
        capabilities: { tools: {} },
        serverInfo: { name: SERVER_NAME, version: SERVER_VERSION }
      });

    case "notifications/initialized":
      return null;

    case "tools/list":
      return jsonrpc(id, { tools: TOOLS });

    case "tools/call": {
      const { name, arguments: args } = params || {};
      const result = handleTool(name, args || {});
      if (result === null) return jsonrpcError(id, -32601, `Unknown tool: ${name}`);
      return jsonrpc(id, { content: [{ type: "text", text: result }] });
    }

    default:
      if (method && method.startsWith("notifications/")) return null;
      return jsonrpcError(id, -32601, `Method not found: ${method}`);
  }
}

let buffer = "";

process.stdin.setEncoding("utf-8");
process.stdin.on("data", (chunk) => {
  buffer += chunk;
  const lines = buffer.split("\n");
  buffer = lines.pop();
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    try {
      const req = JSON.parse(trimmed);
      const response = handleRequest(req);
      if (response !== null) {
        process.stdout.write(response + "\n");
      }
    } catch (e) {
      process.stdout.write(jsonrpcError(null, -32700, "Parse error") + "\n");
    }
  }
});

process.stdin.on("end", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));
process.on("SIGINT", () => process.exit(0));
