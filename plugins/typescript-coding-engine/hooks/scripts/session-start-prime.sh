#!/usr/bin/env bash
set -euo pipefail
cat >/dev/null 2>/dev/null || true
printf '%s\n' '{"continue":true,"suppressOutput":true,"systemMessage":"typescript-coding-engine runtime shell active. Before acting, classify TypeScript work into core-types, generics-and-inference, type-level-programming, runtime-validation, tooling-and-quality, testing, architecture, or interop. Treat donor sources as reservoirs, not runtime mirrors."}'
