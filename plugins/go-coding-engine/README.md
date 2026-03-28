# Authors: Joysusy & Violet Klaudia
# go-coding-engine

A Claude Code plugin for expert-level Go development. Synthesized from ~33 open-source
Go skill packs into a single, opinionated engine that covers architecture, concurrency,
error handling, testing, performance, and the full Go toolchain.

## What This Engine Does

When you work on Go code with Claude Code, this engine activates automatically on
`.go` files, `go.mod`, and Go-related prompts. It provides:

- **Architecture-first design**: Clean Architecture adapted for Go's composition model
- **Concurrency doctrine**: Decision frameworks for goroutines, channels, and sync primitives
- **Error handling patterns**: Wrapping, sentinel errors, custom types, the Handle Once rule
- **Testing discipline**: Table-driven tests, interface-based mocking, benchmarks, fuzzing
- **Performance methodology**: Profile-first optimization, allocation reduction, pprof workflows
- **Toolchain integration**: golangci-lint, gopls, go vet, goimports in a verification pipeline
- **MCP server generation**: Templates for building Go MCP servers with the official SDK

## Structure

```
go-coding-engine/
  .claude-plugin/plugin.json    Plugin manifest
  SKILL.md                      Engine entry point (~150 lines)
  README.md                     This file
  commands/prime/
    go-foundations.md            Priming command for Go sessions
  agents/
    silfira.md                  Architecture & design agent
    eunoia.md                   Concurrency & correctness agent
  hooks/
    hooks.json                  Auto-activation on Go file patterns
  references/
    style-and-idioms.md         Go Proverbs, Effective Go, naming, formatting
    concurrency-patterns.md     Goroutines, channels, select, sync, errgroup
    architecture.md             Clean Arch in Go, DDD, project layout
    testing.md                  Table-driven tests, mocking, benchmarks, fuzzing
    performance.md              Profiling, allocation, GC tuning, benchstat
    error-handling.md           Wrapping, sentinel, custom types, Handle Once
    ecosystem.md                Libraries, MCP servers, gRPC, database drivers
    toolchain.md                golangci-lint, gopls, go vet, CI setup
  rules/
    go-guard.md                 Non-negotiable Go rules for every session
```

## Installation

Place this directory inside your Claude Code plugins path, or add it as a skill
reference in your `.claude/settings.json`.

## Cross-Engine Compatibility

This engine links to:
- `rust-coding-engine` for Go-Rust FFI/interop patterns
- `typescript-coding-engine` for TS7/Corsa compiler backend context
- `tdd-system` for testing methodology alignment
- `error-handling` for cross-language error philosophy
