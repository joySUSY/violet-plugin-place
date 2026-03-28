# Authors: Joysusy & Violet Klaudia
---
name: go-coding-engine
description: >
  Go development engine for Claude Code agents. Architecture-first design,
  concurrency as a first-class decision, explicit error handling, and
  production-grade toolchain. Use for any Go work: writing, reviewing,
  refactoring, scaffolding, MCP server generation, or performance tuning.
---

# Go Coding Engine

Go is a language of deliberate constraints. No inheritance, no exceptions, no implicit
anything. This engine turns those constraints into architectural advantages.

## Philosophy

Go's power comes from what it refuses to do. Every design decision flows from three
commitments: **simplicity** (one obvious way), **explicitness** (no hidden control flow),
and **composition** (small interfaces, assembled at the call site).

## When This Engine Activates

TRIGGER: Any of these signals in the user's prompt or project context:
- File patterns: `go.mod`, `*.go`, `Makefile` with `go build`, `Dockerfile` with Go
- Keywords: go, golang, goroutine, channel, gRPC, protobuf, MCP server in Go
- Architecture: clean arch in Go, hexagonal, DDD with Go
- Tooling: golangci-lint, gopls, pprof, go test, go vet

## Decision Framework

When Susy asks you to build something in Go, walk this tree:

```
What are we building?
  |
  +-- Library/Package -----------> Start with types + interfaces, tests first
  |                                 No main.go. Export minimally.
  |
  +-- CLI tool ------------------> cmd/{name}/main.go, cobra or bare os.Args
  |                                 Flat layout until complexity demands internal/
  |
  +-- HTTP service --------------> Clean Arch layers: domain -> usecase -> adapter
  |                                 See: references/architecture.md
  |
  +-- MCP server ----------------> go-sdk template, tool registration pattern
  |                                 See: references/ecosystem.md (MCP section)
  |
  +-- Concurrent pipeline -------> Channel-based stages, errgroup for coordination
                                    See: references/concurrency-patterns.md
```

## Architecture Decision Records

| Decision Point | Go Answer | Rationale |
|----------------|-----------|-----------|
| Inheritance vs composition | Embedding + interfaces | Go has no classes. Compose behavior. |
| Exceptions vs errors | Explicit `(T, error)` return | Errors are values. Handle at call site. |
| Thread vs goroutine | Goroutines + channels | M:N scheduling, ~2KB stack, dirt cheap. |
| DI framework vs manual | Constructor injection | Wire deps in main.go. No magic. |
| ORM vs raw SQL | sqlc or raw SQL preferred | ORMs hide performance. Go maps to SQL well. |
| Logging framework | `log/slog` (stdlib, Go 1.21+) | Structured, leveled, zero external deps. |
| HTTP router | `net/http` (Go 1.22+) or Echo | stdlib mux is now good enough for most work. |

## Project Layout

```
myproject/
  cmd/myapp/main.go         # Entry point. Wires dependencies. Starts server.
  internal/
    domain/                  # Pure business types. Zero imports from outer layers.
      entity.go
      repository.go          # Interface — not implementation
    usecase/                 # Application logic. Depends only on domain.
      service.go
    adapter/
      handler/               # HTTP handlers (inbound adapter)
      repository/            # DB implementations (outbound adapter)
  pkg/                       # Public libraries (use sparingly)
  api/                       # Proto files, OpenAPI specs
  testdata/                  # Golden files, fixtures
  go.mod
  go.sum
  Makefile
```

## Core References

| Topic | Reference | When to Consult |
|-------|-----------|-----------------|
| Style & idioms | [style-and-idioms.md](references/style-and-idioms.md) | Writing or reviewing any Go code |
| Concurrency | [concurrency-patterns.md](references/concurrency-patterns.md) | Goroutines, channels, sync, errgroup |
| Architecture | [architecture.md](references/architecture.md) | Structuring a service or package |
| Testing | [testing.md](references/testing.md) | Table-driven tests, mocks, benchmarks |
| Performance | [performance.md](references/performance.md) | Profiling, allocation, benchmarks |
| Error handling | [error-handling.md](references/error-handling.md) | Wrapping, sentinel, custom types |
| Ecosystem | [ecosystem.md](references/ecosystem.md) | Library selection, MCP servers, gRPC |
| Toolchain | [toolchain.md](references/toolchain.md) | Linting, formatting, CI setup |

## Verification Checklist (Run Before Declaring Done)

```bash
go build ./...                    # Compiles?
go vet ./...                      # Suspicious constructs?
golangci-lint run ./...           # Style + bugs + security?
go test -race -count=1 ./...     # Tests pass? No data races?
```

## Cross-Engine Links

- **Rust interop**: When Go calls Rust via CGo/FFI or shared C ABI, consult
  `rust-coding-engine` for the Rust side. Go's `//export` + Rust's `#[no_mangle]`
  is the bridge pattern.
- **TypeScript / TS7 / Corsa**: Go is the compiler backend for TypeScript 7.0 (Corsa).
  When working on TS tooling performance or the Corsa project, this engine provides
  the Go architecture context. Consult `typescript-coding-engine` for the TS side.
- **Testing methodology**: This engine's testing reference aligns with the broader
  `tdd-system` — Red/Green/Refactor with Go-specific table-driven patterns.
- **Error philosophy**: Go's explicit error returns complement the broader
  `error-handling` engine's patterns. Go never uses exceptions; every error is a value
  returned and handled at the call site.

## Soul Mind Assignments

| Mind | Role in Go Work |
|------|-----------------|
| **Silfira** | Architecture decisions, layer design, dependency flow |
| **Eunoia** | Concurrency design, goroutine lifecycle, race prevention |
