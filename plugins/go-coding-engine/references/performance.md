# Authors: Joysusy & Violet Klaudia
# Go Performance

The first rule of Go performance: **profile before optimizing.** Intuition about
bottlenecks is wrong roughly 80% of the time. Measure, hypothesize, change one thing,
re-measure. This is the discipline.

## Optimization Methodology

```
1. DEFINE THE METRIC   What matters? Latency, throughput, memory, CPU?
2. WRITE A BENCHMARK   Isolate the function. One benchmark per function.
3. MEASURE BASELINE    go test -bench=. -benchmem -count=6 | tee before.txt
4. DIAGNOSE            Use pprof to find actual hot spots.
5. IMPROVE             Apply ONE optimization. Add an explanatory comment.
6. COMPARE             benchstat before.txt after.txt
7. REPEAT              Increment file names. Tackle next bottleneck.
```

## Rule Out External Bottlenecks First

Before optimizing Go code, verify the bottleneck is in your process.
If 90% of latency is a slow DB query, reducing allocations is wasted effort.

| Signal | Meaning | Action |
|--------|---------|--------|
| `fgprof` shows off-CPU dominates | Waiting on I/O, not computing | Optimize the external system |
| Many goroutines blocked in `net.Read` | Network wait | Connection pooling, timeouts |
| Database spans dominate traces | Slow queries | Index tuning, caching, batch ops |

## Decision Tree: Where Is Time Spent?

| Bottleneck | Signal (pprof) | Action |
|-----------|----------------|--------|
| Too many allocations | `alloc_objects` high | Reduce allocations (see below) |
| CPU-bound hot loop | Function dominates CPU profile | Inlining, cache locality, algo |
| GC pauses | High GC%, container OOM | `GOMEMLIMIT`, `GOGC` tuning |
| I/O latency | Goroutines blocked on I/O | HTTP transport config, streaming |
| Repeated computation | Same result computed N times | Caching, `singleflight` |
| Wrong algorithm | O(n^2) where O(n) exists | Algorithmic fix |
| Lock contention | Mutex/block profile hot | Shard state, use atomics |

## Allocation Reduction (Biggest ROI)

Go's GC is fast but not free. Reducing allocations per request often yields
more improvement than micro-optimizing CPU.

### Preallocate Slices

```go
// Bad: grows slice 4-5 times for 1000 items
var results []Result
for _, item := range items {
    results = append(results, process(item))
}

// Good: single allocation
results := make([]Result, 0, len(items))
for _, item := range items {
    results = append(results, process(item))
}
```

### strings.Builder for Concatenation

```go
// Bad: O(n^2) allocations
var s string
for _, part := range parts {
    s += part + ","
}

// Good: O(n) with Builder
var sb strings.Builder
sb.Grow(estimatedSize)  // Optional: avoid re-allocation
for i, part := range parts {
    if i > 0 {
        sb.WriteByte(',')
    }
    sb.WriteString(part)
}
result := sb.String()

// Best: use stdlib when it fits
result := strings.Join(parts, ",")
```

### sync.Pool for Frequent Allocations

```go
var bufPool = sync.Pool{
    New: func() any {
        return new(bytes.Buffer)
    },
}

func ProcessRequest(data []byte) []byte {
    buf := bufPool.Get().(*bytes.Buffer)
    defer func() {
        buf.Reset()
        bufPool.Put(buf)
    }()

    buf.Write(data)
    // process...
    return bytes.Clone(buf.Bytes())
}
```

### Struct Field Alignment

Fields are padded to alignment boundaries. Ordering by size reduces padding.

```go
// Bad: 32 bytes (with padding)
type Bad struct {
    a bool    // 1 byte + 7 padding
    b int64   // 8 bytes
    c bool    // 1 byte + 7 padding
    d int64   // 8 bytes
}

// Good: 24 bytes (no wasted padding)
type Good struct {
    b int64   // 8 bytes
    d int64   // 8 bytes
    a bool    // 1 byte
    c bool    // 1 byte + 6 padding
}
```

Use `fieldalignment` tool: `go install golang.org/x/tools/go/analysis/passes/fieldalignment/cmd/fieldalignment@latest`

## Profiling with pprof

### CPU Profile

```go
import _ "net/http/pprof"

// Add to your server (or use a separate debug port)
go func() {
    http.ListenAndServe("localhost:6060", nil)
}()
```

```bash
go tool pprof http://localhost:6060/debug/pprof/profile?seconds=30
# In pprof:
(pprof) top 20
(pprof) list FunctionName
(pprof) web            # Opens flame graph in browser
```

### Heap Profile

```bash
go tool pprof http://localhost:6060/debug/pprof/heap
(pprof) top 20 -cum    # Sort by cumulative allocations
(pprof) list FunctionName
```

### Goroutine Profile

```bash
go tool pprof http://localhost:6060/debug/pprof/goroutine
```

## Benchmark Patterns

```go
func BenchmarkProcess(b *testing.B) {
    data := generateData(1000)
    b.ResetTimer()
    for b.Loop() {
        Process(data)
    }
}

// Memory-focused benchmark
func BenchmarkAllocations(b *testing.B) {
    b.ReportAllocs()
    for b.Loop() {
        _ = createObject()
    }
}
```

```bash
go test -bench=BenchmarkProcess -benchmem -count=6 ./... | tee before.txt
# Make optimization...
go test -bench=BenchmarkProcess -benchmem -count=6 ./... | tee after.txt
benchstat before.txt after.txt
```

## GC and Runtime Tuning

### GOMEMLIMIT (Go 1.19+)

In containers, set `GOMEMLIMIT` to 80-90% of container memory to prevent OOM kills.

```bash
GOMEMLIMIT=800MiB  # For a 1GB container
```

### GOGC

Controls GC frequency. Default 100 means GC runs when heap doubles.
Lower values reduce memory at the cost of more CPU. Higher values reduce
GC overhead but use more memory.

```bash
GOGC=50   # More frequent GC, less memory
GOGC=200  # Less frequent GC, more memory
GOGC=off  # Disable GC (dangerous, only for benchmarks)
```

### GOMAXPROCS

Defaults to number of CPU cores. In containers, use `automaxprocs` to
detect actual CPU quota:

```go
import _ "go.uber.org/automaxprocs"
```

### Profile-Guided Optimization (PGO, Go 1.21+)

```bash
# Collect CPU profile from production
curl -o default.pgo http://localhost:6060/debug/pprof/profile?seconds=30

# Place default.pgo in main package directory
# Go compiler uses it automatically during build
go build -o myapp ./cmd/myapp
```

## Common Performance Mistakes

| Mistake | Fix |
|---------|-----|
| Optimizing without profiling | Profile first. Always. |
| Default `http.Client` | Set `MaxIdleConnsPerHost` to match concurrency |
| Logging in hot loops | `slog.LogAttrs` prevents allocation when level disabled |
| `panic`/`recover` as control flow | Stack trace allocation, stack unwinding |
| `reflect.DeepEqual` in production | 50-200x slower; use `slices.Equal`, `maps.Equal` |
| No `GOMEMLIMIT` in containers | OOM kills from unconstrained heap growth |
| `unsafe` without benchmark proof | Only if profiling shows >10% gain in verified hot path |
| Premature optimization | Measure first. Optimize the bottleneck, not the guess. |

## HTTP Performance Checklist

```go
client := &http.Client{
    Transport: &http.Transport{
        MaxIdleConns:        100,
        MaxIdleConnsPerHost: 20,     // Default is 2 — way too low
        IdleConnTimeout:     90 * time.Second,
    },
    Timeout: 10 * time.Second,
}
```

## JSON Performance

| Library | Speed | Use When |
|---------|-------|----------|
| `encoding/json` (stdlib) | Baseline | Default choice |
| `github.com/goccy/go-json` | 2-3x faster | Drop-in replacement for hot paths |
| `github.com/bytedance/sonic` | 3-5x faster | High-throughput APIs, x86 only |
| `encoding/json/v2` (experimental) | TBD | Future stdlib replacement |
