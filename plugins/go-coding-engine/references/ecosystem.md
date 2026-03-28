# Authors: Joysusy & Violet Klaudia
# Go Ecosystem

Standard library first. Always. Go's stdlib is one of the best in any language.
Only reach for external packages when they provide clear, measurable value over
what ships with Go.

## Library Selection Philosophy

1. **Check stdlib first.** `net/http`, `encoding/json`, `log/slog`, `testing`,
   `database/sql` — they cover more than you think.
2. **Maturity over novelty.** Pick libraries with active maintenance, clear licenses,
   and production users.
3. **Count your dependencies.** More deps = more attack surface + more maintenance.
4. **A little copying is better than a little dependency.** Copy 20 lines rather
   than import a 2000-line utility package.

## Standard Library Highlights (Go 1.22+)

| Package | What It Does | Notes |
|---------|-------------|-------|
| `net/http` | HTTP client and server | Go 1.22: method+path routing in ServeMux |
| `encoding/json` | JSON encode/decode | Good enough for most use cases |
| `log/slog` | Structured logging | Go 1.21+. JSON and text handlers built in. |
| `testing` | Unit tests, benchmarks, fuzzing | Table-driven tests, `t.Run`, `t.Parallel` |
| `database/sql` | Database interface | Use with a driver (pgx, mysql) |
| `context` | Cancellation, timeouts, values | First param of every I/O function |
| `errors` | Error wrapping, Is, As, Join | Go 1.20+: `errors.Join` for multi-error |
| `slices` | Sort, Contains, Compact, etc. | Go 1.21+. Replaces sort.Slice |
| `maps` | Clone, Keys, Values | Go 1.21+ |
| `crypto/*` | TLS, AES, RSA, hashing | Production-grade crypto |
| `embed` | Embed files in binary | Templates, migrations, static assets |

## Recommended External Libraries

### Web Frameworks / Routers

| Library | When to Use |
|---------|-------------|
| `net/http` (stdlib) | Simple services, Go 1.22+ routing is solid |
| `labstack/echo` | Production REST APIs. Excellent middleware, binding, validation. |
| `gin-gonic/gin` | High-throughput APIs. Faster router, larger community. |
| `go-chi/chi` | Lightweight, compatible with `net/http`. Good middleware ecosystem. |

### Database

| Library | When to Use |
|---------|-------------|
| `database/sql` (stdlib) | Interface layer. Always use with a driver. |
| `jackc/pgx/v5` | PostgreSQL. Best driver: connection pooling, COPY, custom types. |
| `sqlc-dev/sqlc` | SQL-first. Generates type-safe Go from SQL queries. Preferred. |
| `jmoiron/sqlx` | Adds struct scanning to `database/sql`. Lightweight. |
| `go-gorm/gorm` | Full ORM. Use only if team prefers ActiveRecord style. |
| `golang-migrate/migrate` | Database migrations. CLI + Go library. |

### Testing

| Library | When to Use |
|---------|-------------|
| `testing` (stdlib) | Always the foundation |
| `stretchr/testify` | `assert`, `require` for readable assertions. `mock` for mocking. |
| `google/go-cmp` | Deep comparison with `cmp.Diff`. Better than `reflect.DeepEqual`. |
| `vektra/mockery` | Auto-generate mocks from interfaces |
| `testcontainers/testcontainers-go` | Spin up Docker containers for integration tests |

### Logging and Observability

| Library | When to Use |
|---------|-------------|
| `log/slog` (stdlib) | Default choice. Go 1.21+. |
| `go.uber.org/zap` | High-performance structured logging. Legacy choice. |
| `rs/zerolog` | Zero-allocation JSON logging |
| `prometheus/client_golang` | Metrics exposition |
| `open-telemetry/opentelemetry-go` | Distributed tracing + metrics |

### Concurrency and Sync

| Library | When to Use |
|---------|-------------|
| `golang.org/x/sync/errgroup` | Goroutine coordination with error propagation |
| `golang.org/x/sync/singleflight` | Deduplicate concurrent identical calls |
| `golang.org/x/sync/semaphore` | Weighted semaphore for resource limiting |
| `golang.org/x/time/rate` | Rate limiting |

### Configuration

| Library | When to Use |
|---------|-------------|
| `os.Getenv` (stdlib) | Simple env vars. Often sufficient. |
| `caarlos0/env` | Struct tags for env var parsing. Clean. |
| `spf13/viper` | Complex config (files + env + flags). Heavy but complete. |
| `knadh/koanf` | Lighter Viper alternative. Composable providers. |

### CLI

| Library | When to Use |
|---------|-------------|
| `flag` (stdlib) | Simple flags |
| `spf13/cobra` | Complex CLIs with subcommands. Industry standard. |
| `urfave/cli` | Simpler alternative to Cobra |

### gRPC

| Library | When to Use |
|---------|-------------|
| `google.golang.org/grpc` | gRPC server and client |
| `google.golang.org/protobuf` | Protocol Buffers |
| `bufbuild/buf` | Proto management, linting, breaking change detection |
| `grpc-ecosystem/go-grpc-middleware` | Interceptors: logging, auth, retry, recovery |

### Security

| Library | When to Use |
|---------|-------------|
| `crypto/*` (stdlib) | TLS, AES-GCM, hashing |
| `golang.org/x/crypto/argon2` | Password hashing (preferred over bcrypt) |
| `golang-jwt/jwt/v5` | JWT creation and validation |
| `go-playground/validator` | Struct validation with tags |

### HTTP Clients

| Library | When to Use |
|---------|-------------|
| `net/http` (stdlib) | Default. Configure Transport properly. |
| `hashicorp/go-retryablehttp` | HTTP client with automatic retry + backoff |
| `go-resty/resty` | Fluent HTTP client. Convenient for REST APIs. |

## MCP Server Generation in Go

Build Model Context Protocol servers using the official Go SDK.

### Project Structure

```
mcp-server/
  cmd/server/main.go
  tools/
    tool.go           Tool handler implementation
    registry.go       Tool registration
  config/
    config.go         Environment-based config
  go.mod
  go.sum
```

### Minimal MCP Server

```go
package main

import (
    "context"
    "log/slog"
    "os"
    "os/signal"
    "syscall"

    "github.com/modelcontextprotocol/go-sdk/mcp"
)

func main() {
    ctx, cancel := context.WithCancel(context.Background())
    defer cancel()

    sigCh := make(chan os.Signal, 1)
    signal.Notify(sigCh, os.Interrupt, syscall.SIGTERM)
    go func() {
        <-sigCh
        slog.Info("shutting down")
        cancel()
    }()

    server := mcp.NewServer(
        &mcp.Implementation{
            Name:    "my-mcp-server",
            Version: "1.0.0",
        },
        &mcp.Options{
            Capabilities: &mcp.ServerCapabilities{
                Tools: &mcp.ToolsCapability{},
            },
        },
    )

    registerTools(server)

    transport := &mcp.StdioTransport{}
    if err := server.Run(ctx, transport); err != nil {
        slog.Error("server error", "err", err)
        os.Exit(1)
    }
}
```

### Tool Registration Pattern

```go
type SearchInput struct {
    Query   string `json:"query" jsonschema:"required,description=Search query"`
    MaxResults int `json:"max_results,omitempty" jsonschema:"description=Maximum results to return"`
}

func searchHandler(ctx context.Context, req *mcp.CallToolRequest, input SearchInput) (*mcp.CallToolResult, error) {
    if input.Query == "" {
        return nil, errors.New("query is required")
    }
    if input.MaxResults == 0 {
        input.MaxResults = 10
    }

    results, err := doSearch(ctx, input.Query, input.MaxResults)
    if err != nil {
        return nil, fmt.Errorf("search: %w", err)
    }

    return &mcp.CallToolResult{
        Content: []mcp.Content{
            {Type: "text", Text: formatResults(results)},
        },
    }, nil
}

func registerTools(server *mcp.Server) {
    mcp.AddTool(server,
        &mcp.Tool{
            Name:        "search",
            Description: "Search the knowledge base",
        },
        searchHandler,
    )
}
```

## TS7 / Corsa Connection

Go is the compiler backend for TypeScript 7.0 (project Corsa). The TypeScript
compiler is being rewritten in Go for 10x performance improvement. When working
on TS tooling or the Corsa project:

- The Go architecture patterns from this engine apply to the compiler codebase
- Concurrency patterns (worker pools, pipelines) are used for parallel type checking
- Performance methodology (pprof, benchstat) is the profiling strategy
- Consult `typescript-coding-engine` for the TypeScript-side design

## Anti-Patterns

| Anti-Pattern | Fix |
|-------------|-----|
| Importing a utility library for one function | Copy the function. 20 lines > 1 dependency. |
| Using an ORM for simple queries | Use `sqlc` or raw `database/sql` |
| `fmt.Println` for logging | Use `log/slog` |
| Default `http.Client` without Transport config | Set `MaxIdleConnsPerHost`, timeouts |
| Picking the newest, trendiest library | Pick the most mature, well-maintained one |
