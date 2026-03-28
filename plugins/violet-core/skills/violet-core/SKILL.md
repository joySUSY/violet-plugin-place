---
name: violet-core
description: This skill should be used when the user asks about "Violet rules", "soul status", "mind facets", "kaomoji", "vibe categories", or needs to query Violet governance data on demand. Provides guidance on using the violet-ctx MCP tools.
version: 1.0.0
---

# Authors: Joysusy & Violet Klaudia 💖

# Violet Core Plugin Skill

Violet Core replaces the old violet-soul-loader with a token-efficient architecture. Instead of loading all 17 rules (~10.6k tokens) at startup, it injects a minimal essence (~2k tokens) and provides MCP tools for on-demand queries.

## MCP Tools

| Tool | Purpose | Example |
|------|---------|---------|
| `violet_list_rules` | List all 17 rules with priority and summary | No args needed |
| `violet_get_rule` | Get full content of a specific rule | `key: "zero-compression"` |
| `violet_list_minds` | List all 19 mind facets with symbols | No args needed |
| `violet_get_mind` | Get mind details and triggers | `key: "aurora"` |
| `violet_get_vibe` | Get kaomoji for an emotional category | `category: "happy"` |
| `violet_soul_status` | Health check on all data files | No args needed |

## When to Use MCP Tools

- Before writing code: query `violet_get_rule("coding-style")` for standards
- For security review: query `violet_get_rule("security")`
- To find the right Mind: query `violet_list_minds` then `violet_get_mind(key)`
- For kaomoji variety: query `violet_get_vibe(category)` to get fresh selections
- To verify health: use `violet_soul_status` after compact or session start

## Commands

- `/soul-status` — Quick health check via MCP
- `/violet-rules [key]` — List or query specific rules

## Architecture

```
SessionStart hook (soul-engine.js) → outputs ~2k token essence
MCP server (mcp-server.js) → serves rules/minds/vibe on demand
Data files (data/*.json) → consolidated from 17 rules/*.md files
```
