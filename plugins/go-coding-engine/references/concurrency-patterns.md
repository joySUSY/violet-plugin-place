# Authors: Joysusy & Violet Klaudia
# Go Concurrency Patterns

Concurrency in Go is a design decision, not an optimization. Use it when the problem
is naturally concurrent (I/O parallelism, pipeline stages, event handling) — not to
make sequential code faster.

## The Three Laws

1. **Every goroutine has a known exit path.** No exceptions.
2. **Share memory by communicating.** Channels first, mutex when simpler.
3. **Context propagates cancellation.** Every I/O function takes `ctx` as param 1.

## Primitive Selection

| Need | Primitive | Notes |
|------|-----------|-------|
| Pass data between goroutines | `chan T` | Unbuffered for sync, buffered for decoupling |
| Wait for N goroutines to finish | `sync.WaitGroup` | When you don't need error propagation |
| Wait + error propagation | `errgroup.Group` | Preferred over raw WaitGroup |
| Protect shared mutable state | `sync.Mutex` | Simpler than channels for state guards |
| Read-heavy shared state | `sync.RWMutex` | Multiple readers, exclusive writers |
| Atomic counter/flag | `atomic.Int64`, `atomic.Bool` | Lock-free, fastest for simple ops |
| One-time lazy init | `sync.Once` | Thread-safe singleton initialization |
| Reduce GC pressure | `sync.Pool` | Reuse frequently allocated objects |
| Deduplicate concurrent calls | `singleflight.Group` | Cache stampede prevention |
| Limit concurrent access | Semaphore (buffered chan or `semaphore.Weighted`) | Worker pool throttling |

## Channel Patterns

### Unbuffered vs Buffered

```go
// Unbuffered: synchronization point. Sender blocks until receiver reads.
ch := make(chan Event)

// Buffered: decouples producer from consumer by N items.
ch := make(chan Event, 100)  // Justify the 100. Why not 10? Why not 1000?
```

RULE: Default to unbuffered. Add a buffer only with a documented reason
(burst absorption, known producer/consumer speed mismatch).

### Channel Ownership

The goroutine that creates a channel should close it. The producer closes;
consumers never close. This prevents double-close panics.

```go
func produce(ctx context.Context) <-chan Item {
    ch := make(chan Item)
    go func() {
        defer close(ch)  // Producer owns the channel
        for {
            item, err := fetchNext(ctx)
            if err != nil {
                return
            }
            select {
            case <-ctx.Done():
                return
            case ch <- item:
            }
        }
    }()
    return ch
}
```

### Select for Multiplexing

```go
select {
case msg := <-incoming:
    handle(msg)
case <-ticker.C:
    heartbeat()
case <-ctx.Done():
    return ctx.Err()
}
```

### Done Channel Pattern

```go
func worker(done <-chan struct{}, jobs <-chan Job) {
    for {
        select {
        case <-done:
            return
        case job, ok := <-jobs:
            if !ok {
                return
            }
            process(job)
        }
    }
}

// Signal all workers to stop
close(done)
```

## Coordination Patterns

### errgroup (Preferred for Most Use Cases)

```go
func FetchAll(ctx context.Context, urls []string) ([][]byte, error) {
    g, ctx := errgroup.WithContext(ctx)
    results := make([][]byte, len(urls))

    for i, url := range urls {
        g.Go(func() error {
            data, err := fetch(ctx, url)
            if err != nil {
                return fmt.Errorf("fetch %s: %w", url, err)
            }
            results[i] = data  // Safe: each goroutine writes to unique index
            return nil
        })
    }

    if err := g.Wait(); err != nil {
        return nil, err
    }
    return results, nil
}
```

### errgroup with Concurrency Limit

```go
g, ctx := errgroup.WithContext(ctx)
g.SetLimit(10)  // At most 10 concurrent goroutines

for _, item := range items {
    g.Go(func() error {
        return processItem(ctx, item)
    })
}
return g.Wait()
```

### Worker Pool

```go
func WorkerPool(ctx context.Context, jobs <-chan Job, workers int) <-chan Result {
    results := make(chan Result, workers)
    var wg sync.WaitGroup

    for range workers {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for job := range jobs {
                select {
                case <-ctx.Done():
                    return
                case results <- process(job):
                }
            }
        }()
    }

    go func() {
        wg.Wait()
        close(results)
    }()

    return results
}
```

### Fan-Out / Fan-In

Multiple workers read from a single input channel (fan-out). Their outputs
merge into a single output channel (fan-in).

```go
func merge[T any](ctx context.Context, channels ...<-chan T) <-chan T {
    var wg sync.WaitGroup
    merged := make(chan T)

    for _, ch := range channels {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for val := range ch {
                select {
                case <-ctx.Done():
                    return
                case merged <- val:
                }
            }
        }()
    }

    go func() {
        wg.Wait()
        close(merged)
    }()

    return merged
}
```

### Pipeline (Typed Stages)

```go
func stage[In, Out any](ctx context.Context, in <-chan In, fn func(context.Context, In) (Out, error)) <-chan Out {
    out := make(chan Out)
    go func() {
        defer close(out)
        for item := range in {
            result, err := fn(ctx, item)
            if err != nil {
                slog.Error("pipeline stage error", "err", err)
                continue
            }
            select {
            case <-ctx.Done():
                return
            case out <- result:
            }
        }
    }()
    return out
}
```

### Singleflight (Deduplication)

```go
var group singleflight.Group

func GetUser(ctx context.Context, id string) (*User, error) {
    v, err, _ := group.Do(id, func() (any, error) {
        return db.FindUser(ctx, id)
    })
    if err != nil {
        return nil, err
    }
    return v.(*User), nil
}
```

## Context Patterns

### Timeout

```go
ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
defer cancel()  // Always defer cancel to release resources

result, err := slowOperation(ctx)
```

### Value Propagation (Request-Scoped Data)

```go
type ctxKey string

const requestIDKey ctxKey = "request_id"

func WithRequestID(ctx context.Context, id string) context.Context {
    return context.WithValue(ctx, requestIDKey, id)
}

func RequestID(ctx context.Context) string {
    id, _ := ctx.Value(requestIDKey).(string)
    return id
}
```

RULE: Context values are for request-scoped data that crosses API boundaries
(request ID, auth token). Never for optional function parameters.

## Graceful Shutdown

```go
func main() {
    srv := &http.Server{Addr: ":8080", Handler: mux}

    go func() {
        if err := srv.ListenAndServe(); err != http.ErrServerClosed {
            slog.Error("server error", "err", err)
        }
    }()

    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
    <-quit

    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    defer cancel()

    if err := srv.Shutdown(ctx); err != nil {
        slog.Error("forced shutdown", "err", err)
    }
    slog.Info("server stopped")
}
```

## Race Detection

```bash
go test -race -count=1 ./...     # Run in CI. Non-negotiable.
go build -race ./cmd/server      # Race-instrumented binary for staging
```

Common race sources and fixes:

| Source | Fix |
|--------|-----|
| Shared map writes | `sync.RWMutex` or `sync.Map` |
| Slice append from goroutines | Pre-allocate, assign by index |
| Read-modify-write on counter | `atomic.Int64` |
| Closing channel from multiple goroutines | Single owner pattern + `sync.Once` |
| Loop variable capture (pre 1.22) | Rebind: `v := v` inside loop |
