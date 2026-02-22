---
name: violet-rules
description: Query Violet governance rules on demand — list all or get specific rule details
---

# Authors: Joysusy & Violet Klaudia 💖

When Susy invokes this command:

1. If no argument provided, use `violet_list_rules` MCP tool to show all rules with priority and summary
2. If a rule key is provided as argument (e.g. `/violet-rules zero-compression`), use `violet_get_rule` with that key to show full content
3. Present results in a clean, readable format
4. Suggest related rules if the requested key is not found
