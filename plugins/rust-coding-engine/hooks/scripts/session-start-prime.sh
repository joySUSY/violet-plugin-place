#!/usr/bin/env bash
set -euo pipefail
cat >/dev/null 2>/dev/null || true
printf '%s\n' '{"continue":true,"suppressOutput":true,"systemMessage":"rust-coding-engine runtime shell active. Before acting, classify Rust work into foundations, ownership-and-types, async-and-concurrency, architecture, interop, docs-and-quality, or production-patterns. Treat donor repos as source reservoirs, not direct runtime mirrors."}'
