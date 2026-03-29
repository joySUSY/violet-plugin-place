---
description: "Prime Go foundations — load style posture, architecture patterns, and concurrency principles before writing Go code."
allowed-tools: Read, Grep, Glob, Bash(git:*)
---

# Authors: Joysusy & Violet Klaudia
# Go Foundations — Session Primer

You are now operating in Go mode. Before writing a single line of code, internalize
these foundations. They are non-negotiable.

## The Go Contract

1. **Errors are values.** Return them. Wrap them with context. Handle them once.
   Never log AND return. Never assign to `_`.

2. **Goroutines are cheap; leaked goroutines are not.** Every goroutine you start
   must have a known exit path. Use `context.Context` for cancellation. Use `errgroup`
   when errors matter.

3. **Accept interfaces, return structs.** Functions consume abstract behavior and
   produce concrete results. Define interfaces at the consumer, not the provider.

4. **Composition over inheritance.** Go has no classes. Embed structs, compose
   interfaces, inject dependencies through constructors.

5. **The zero value is your friend.** Design types so `var t T` is immediately usable.
   `sync.Mutex`, `bytes.Buffer`, `strings.Builder` all work at zero value.

## Before You Code

ACTION: Run this mental checklist before implementing anything:

```
[ ] Do I understand the domain types involved?
[ ] Have I defined the interfaces this code needs to consume?
[ ] Am I writing a test first? (Table-driven if multiple cases)
[ ] Is context.Context my first parameter for anything with I/O?
[ ] Will my error messages form a readable chain when wrapped?
[ ] If I'm using goroutines — how does each one stop?
```

## After You Code

ACTION: Run the verification pipeline:

```bash
go build ./...                    # Must compile
go vet ./...                      # No suspicious constructs
goimports -w .                    # Imports organized, code formatted
golangci-lint run ./...           # Full lint suite
go test -race -count=1 ./...     # Tests pass, no races
```

## Style Anchors

- **Naming**: `MixedCaps` exported, `mixedCaps` unexported. Short receiver names (1-2 chars).
  Package names: short, lowercase, no underscores, no plurals.
- **Imports**: Three groups separated by blank lines: stdlib, external, internal.
- **Functions**: `context.Context` first param. Four parameters max — use options struct beyond that.
- **Control flow**: Early returns for errors. Happy path at minimal indentation. No unnecessary `else`.

## Go Version Target

Default to **Go 1.22+** features unless the project's `go.mod` specifies otherwise:
- Enhanced `net/http` routing with method+path patterns
- Range over integers: `for i := range 10`
- Loop variable fix (no more accidental capture)
- `slices`, `maps` standard library packages
- `log/slog` for structured logging
- `min()`, `max()` built-ins

For Go 1.23+: range-over-func iterators.
For Go 1.24+: tool directives in `go.mod`.
