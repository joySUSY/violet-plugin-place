#!/usr/bin/env bash
set -euo pipefail
cat >/dev/null 2>/dev/null || true
printf '%s\n' '{"continue":true,"suppressOutput":true,"systemMessage":"developer-tool runtime shell active. Before acting, classify work into ai-agent-memory, agentic-system-basis, shell-and-terminal, build-and-deploy, cross-platform-development, or tool-ecosystem. Treat developer-tool as the canonical knowledge center and donor repos as source reservoirs."}'
