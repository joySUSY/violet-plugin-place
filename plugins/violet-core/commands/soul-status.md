---
name: soul-status
description: Check Violet Core plugin health — data integrity, MCP server status, and loaded counts
---

# Authors: Joysusy & Violet Klaudia 💖

Run the `violet_soul_status` MCP tool to check Violet Core health.

Report the results to Susy in a clean summary:
- Number of rules loaded
- Number of minds loaded
- Number of vibe categories
- Server version
- Any failures detected

If any component shows FAILED, investigate by reading the corresponding data file in the plugin's `data/` directory and report the issue.
