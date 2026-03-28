# Authors: Joysusy & Violet Klaudia
# Go Toolchain

Go ships with a complete toolchain. The compiler, build system, test runner,
formatter, and static analyzer are all first-party tools. This is unusual
among languages and is a deliberate strength.

## Verification Pipeline

Run these in order after every meaningful change. This is the minimum.

```bash
# 1. Compile — catches type errors, missing imports
go build ./...

# 2. Static analysis — catches suspicious constructs
go vet ./...

# 3. Format and organize imports
goimports -w .

# 4. Lint suite — catches style, bugs, performance, security
golangci-lint run ./...

# 5. Test with race detection
go test -race -count=1 ./...
```

For deep analysis (code review, pre-release):

```bash
# 6. Vulnerability scanner (Go team official)
govulncheck ./...

# 7. Nil pointer analysis (Uber)
nilaway ./...

# 8. Dead code detection (Go team official)
deadcode ./...
```

## Core Tools

### go build

```bash
go build ./...                                    # Build everything
go build -o myapp ./cmd/myapp                     # Named output binary
CGO_ENABLED=0 go build -o myapp ./cmd/myapp       # Static binary (no C deps)
go build -ldflags "-X main.version=1.0.0" ./cmd/myapp  # Inject version at build
```

### go test

```bash
go test ./...                          # All tests
go test -v -run TestCreate ./...       # Specific test (regex)
go test -race -count=1 ./...           # Race detection
go test -cover -coverprofile=c.out ./...  # Coverage
go tool cover -html=c.out             # Coverage report in browser
go test -bench=. -benchmem ./...       # Benchmarks with memory stats
go test -fuzz=FuzzParse -fuzztime=30s  # Fuzz testing
go test -short ./...                   # Skip long tests
go test -count=10 ./...                # Detect flaky tests
go test -shuffle=on ./...              # Randomize order
```

### go vet

Built-in static analysis. Catches:
- Printf format string mismatches
- Unreachable code
- Shadowed variables
- Suspicious struct tags
- Incorrect lock usage

```bash
go vet ./...
```

### go mod

```bash
go mod init github.com/org/project    # Initialize module
go mod tidy                            # Clean unused deps, add missing
go mod verify                          # Verify checksums match
go mod download                        # Download all dependencies
go mod graph                           # Dependency graph
go get github.com/pkg@latest           # Update dependency
go get github.com/pkg@v1.2.3           # Pin specific version
```

## goimports

Formats code (like `gofmt`) AND manages imports. Use instead of `gofmt`.

```bash
go install golang.org/x/tools/cmd/goimports@latest
goimports -w .    # Format all files in place
```

## gopls (Language Server)

The official Go language server. Powers IDE features: completion, diagnostics,
hover info, code actions, rename, find references.

```bash
go install golang.org/x/tools/gopls@latest
```

## golangci-lint

The aggregated linter. Runs 50+ linters in a single pass.

### Installation

```bash
# Binary install (preferred)
curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/HEAD/install.sh | sh -s -- -b $(go env GOPATH)/bin

# Or via Go
go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
```

### Recommended Configuration (.golangci.yml)

```yaml
run:
  timeout: 5m

linters:
  enable:
    # Correctness
    - errcheck          # Unchecked errors
    - govet             # Suspicious constructs
    - staticcheck       # Advanced static analysis
    - ineffassign       # Useless assignments
    - unused            # Unused code

    # Style
    - gofmt             # Standard formatting
    - goimports         # Import organization
    - misspell          # Spelling mistakes in comments/strings
    - revive            # Style enforcement (replaces golint)

    # Performance
    - gocritic          # Opinionated code improvement suggestions
    - unconvert         # Unnecessary type conversions
    - unparam           # Unused function parameters
    - prealloc          # Suggest preallocations

    # Security
    - gosec             # Security issues

linters-settings:
  errcheck:
    check-type-assertions: true
  govet:
    check-shadowing: true
  revive:
    rules:
      - name: blank-imports
      - name: context-as-argument
      - name: context-keys-type
      - name: error-return
      - name: error-strings
      - name: error-naming
      - name: exported
      - name: increment-decrement
      - name: var-naming
      - name: package-comments
      - name: range
      - name: receiver-naming
      - name: indent-error-flow
      - name: superfluous-else
      - name: unreachable-code

issues:
  exclude-use-default: false
  max-issues-per-linter: 0
  max-same-issues: 0
```

### Suppressing Lints

```go
// Only when the lint is genuinely wrong or inapplicable:
//nolint:errcheck // error is logged and handled in deferred cleanup
defer file.Close()

// Never blanket-suppress:
//nolint  // BAD: suppresses everything, hides real issues
```

## Deep Analysis Tools

### govulncheck

Official Go vulnerability scanner. Checks your code AND your dependencies
against the Go vulnerability database.

```bash
go install golang.org/x/vuln/cmd/govulncheck@latest
govulncheck ./...
```

### nilaway

Detects nil pointer dereferences before runtime. Created by Uber.

```bash
go install go.uber.org/nilaway/cmd/nilaway@latest
nilaway ./...
```

### deadcode

Finds unreachable functions. Official Go team tool.

```bash
go install golang.org/x/tools/cmd/deadcode@latest
deadcode ./...
```

## Makefile Template

```makefile
.PHONY: build test lint clean

BINARY := myapp
MAIN := ./cmd/myapp

build:
	CGO_ENABLED=0 go build -o $(BINARY) $(MAIN)

test:
	go test -race -count=1 ./...

lint:
	golangci-lint run ./...

vet:
	go vet ./...

fmt:
	goimports -w .

coverage:
	go test -coverprofile=coverage.out ./...
	go tool cover -html=coverage.out

vuln:
	govulncheck ./...

verify: fmt vet lint test vuln
	@echo "All checks passed"

clean:
	rm -f $(BINARY) coverage.out
```

## CI Pipeline (GitHub Actions)

```yaml
name: Go CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-go@v5
        with:
          go-version: '1.22'

      - name: Build
        run: go build ./...

      - name: Vet
        run: go vet ./...

      - name: Lint
        uses: golangci/golangci-lint-action@v6
        with:
          version: latest

      - name: Test
        run: go test -race -count=1 -coverprofile=coverage.out ./...

      - name: Vulnerability Check
        run: |
          go install golang.org/x/vuln/cmd/govulncheck@latest
          govulncheck ./...
```

## Dockerfile (Multi-Stage)

```dockerfile
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o /myapp ./cmd/myapp

FROM alpine:3.19
RUN apk add --no-cache ca-certificates
COPY --from=builder /myapp /myapp
EXPOSE 8080
ENTRYPOINT ["/myapp"]
```

## Tool Installation Summary

```bash
# Essential
go install golang.org/x/tools/cmd/goimports@latest
go install golang.org/x/tools/gopls@latest

# Linting
# Install golangci-lint via binary (see above)

# Deep analysis
go install golang.org/x/vuln/cmd/govulncheck@latest
go install go.uber.org/nilaway/cmd/nilaway@latest
go install golang.org/x/tools/cmd/deadcode@latest

# Performance
go install golang.org/x/perf/cmd/benchstat@latest
go install golang.org/x/tools/go/analysis/passes/fieldalignment/cmd/fieldalignment@latest
```
