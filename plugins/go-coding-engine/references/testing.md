# Authors: Joysusy & Violet Klaudia
# Go Testing

Testing in Go is not an afterthought — it is part of the language. The `testing`
package ships with the standard library. Test files live next to the code they test.
The compiler understands `_test.go`. This is by design.

## TDD Workflow

```
RED     Write a failing test. Describe the behavior you want.
GREEN   Write the minimum code to make it pass. Nothing more.
REFACTOR  Improve the code. Tests stay green.
REPEAT
```

## Table-Driven Tests (Default Pattern)

Every test with multiple inputs or cases uses this pattern. No exceptions.

```go
func TestParseConfig(t *testing.T) {
    tests := []struct {
        name    string
        input   string
        want    *Config
        wantErr bool
    }{
        {
            name:  "valid JSON",
            input: `{"host":"localhost","port":8080}`,
            want:  &Config{Host: "localhost", Port: 8080},
        },
        {
            name:    "invalid JSON",
            input:   `{invalid}`,
            wantErr: true,
        },
        {
            name:    "empty input",
            input:   "",
            wantErr: true,
        },
        {
            name:  "missing optional field uses default",
            input: `{"host":"localhost"}`,
            want:  &Config{Host: "localhost", Port: 3000},
        },
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got, err := ParseConfig(tt.input)

            if tt.wantErr {
                if err == nil {
                    t.Error("expected error, got nil")
                }
                return
            }
            if err != nil {
                t.Fatalf("unexpected error: %v", err)
            }
            if diff := cmp.Diff(tt.want, got); diff != "" {
                t.Errorf("mismatch (-want +got):\n%s", diff)
            }
        })
    }
}
```

Key rules:
- Each case has a clear, descriptive `name`
- Use `t.Run(tt.name, ...)` for subtest isolation
- Use `cmp.Diff` (google/go-cmp) or `testify/assert` for readable failures
- Test both success and error paths

## Parallel Tests

```go
for _, tt := range tests {
    t.Run(tt.name, func(t *testing.T) {
        t.Parallel()  // Run subtests concurrently
        got := Process(tt.input)
        // assertions...
    })
}
```

Use `t.Parallel()` when tests are independent (no shared mutable state).
Do not use it when tests share a database, file, or global variable.

## Test Helpers

```go
func setupTestDB(t *testing.T) *sql.DB {
    t.Helper()  // Error reports point to the caller, not this function
    db, err := sql.Open("sqlite3", ":memory:")
    if err != nil {
        t.Fatalf("open db: %v", err)
    }
    t.Cleanup(func() { db.Close() })  // Automatic cleanup when test finishes
    return db
}

// Generic assertion helper
func assertEqual[T comparable](t *testing.T, got, want T) {
    t.Helper()
    if got != want {
        t.Errorf("got %v; want %v", got, want)
    }
}
```

## Interface-Based Mocking

Go's implicit interfaces make mocking natural. Define a small interface,
implement it with function fields for per-test behavior.

```go
// The interface (defined at consumer, not provider)
type UserRepository interface {
    GetUser(ctx context.Context, id string) (*User, error)
}

// Manual mock with function fields
type MockUserRepo struct {
    GetUserFunc func(ctx context.Context, id string) (*User, error)
}

func (m *MockUserRepo) GetUser(ctx context.Context, id string) (*User, error) {
    return m.GetUserFunc(ctx, id)
}

// Usage in test
func TestGetUserProfile(t *testing.T) {
    mock := &MockUserRepo{
        GetUserFunc: func(ctx context.Context, id string) (*User, error) {
            if id == "123" {
                return &User{ID: "123", Name: "Alice"}, nil
            }
            return nil, domain.ErrNotFound
        },
    }

    svc := NewProfileService(mock)

    profile, err := svc.GetProfile(context.Background(), "123")
    if err != nil {
        t.Fatalf("unexpected error: %v", err)
    }
    if profile.Name != "Alice" {
        t.Errorf("got name %q, want %q", profile.Name, "Alice")
    }
}
```

### When to Use Mocking Frameworks

| Approach | When to Use |
|----------|-------------|
| Manual mocks (function fields) | Default. Simple, explicit, zero dependencies. |
| `mockery` / `moq` | Large interfaces (5+ methods) where manual mocks are verbose |
| `gomock` | When you need strict call-order verification |
| No mock (real implementation) | Integration tests with test databases, testcontainers |

## HTTP Handler Testing

```go
func TestHealthHandler(t *testing.T) {
    req := httptest.NewRequest(http.MethodGet, "/health", nil)
    w := httptest.NewRecorder()

    HealthHandler(w, req)

    resp := w.Result()
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        t.Errorf("status %d; want %d", resp.StatusCode, http.StatusOK)
    }

    body, _ := io.ReadAll(resp.Body)
    if string(body) != `{"status":"ok"}` {
        t.Errorf("body %q; want %q", body, `{"status":"ok"}`)
    }
}
```

## Golden File Testing

For complex outputs (rendered templates, serialized data), compare against
golden files stored in `testdata/`.

```go
var update = flag.Bool("update", false, "update golden files")

func TestRender(t *testing.T) {
    got := Render(input)
    golden := filepath.Join("testdata", t.Name()+".golden")

    if *update {
        os.WriteFile(golden, got, 0644)
    }

    want, err := os.ReadFile(golden)
    if err != nil {
        t.Fatalf("read golden: %v", err)
    }

    if !bytes.Equal(got, want) {
        t.Errorf("output mismatch:\ngot:\n%s\nwant:\n%s", got, want)
    }
}
// Update: go test -update ./...
```

## Benchmarks

```go
func BenchmarkProcess(b *testing.B) {
    data := generateTestData(1000)
    b.ResetTimer()  // Exclude setup time from measurement
    for b.Loop() {  // Go 1.24+; use i := 0; i < b.N; i++ for earlier versions
        Process(data)
    }
}

// Size-parameterized benchmarks
func BenchmarkSort(b *testing.B) {
    for _, size := range []int{100, 1_000, 10_000} {
        b.Run(fmt.Sprintf("n=%d", size), func(b *testing.B) {
            data := generateSlice(size)
            b.ResetTimer()
            for b.Loop() {
                tmp := slices.Clone(data)
                slices.Sort(tmp)
            }
        })
    }
}
```

```bash
go test -bench=. -benchmem ./...                         # Run benchmarks
go test -bench=BenchmarkSort -benchmem -count=6 | tee before.txt  # Baseline
# Make changes...
go test -bench=BenchmarkSort -benchmem -count=6 | tee after.txt
benchstat before.txt after.txt                            # Statistical comparison
```

## Fuzzing (Go 1.18+)

```go
func FuzzParseJSON(f *testing.F) {
    // Seed corpus
    f.Add(`{"name":"test"}`)
    f.Add(`[]`)
    f.Add(`""`)

    f.Fuzz(func(t *testing.T, input string) {
        var result map[string]any
        err := json.Unmarshal([]byte(input), &result)
        if err != nil {
            return  // Invalid input is expected
        }
        // Property: if parse succeeds, re-encode must also succeed
        _, err = json.Marshal(result)
        if err != nil {
            t.Errorf("Marshal after successful Unmarshal: %v", err)
        }
    })
}
```

```bash
go test -fuzz=FuzzParseJSON -fuzztime=30s
```

## Coverage

```bash
go test -cover ./...                                    # Quick coverage summary
go test -coverprofile=coverage.out ./...                # Generate profile
go tool cover -html=coverage.out                        # View in browser
go tool cover -func=coverage.out                        # Per-function breakdown
```

### Coverage Targets

| Code Type | Target |
|-----------|--------|
| Auth, billing, core business logic | 100% |
| Public API surface | 90%+ |
| General application code | 80%+ |
| Generated code (protobuf, sqlc) | Exclude |

## Test Commands Reference

```bash
go test ./...                          # All tests
go test -v -run TestCreate ./...       # Specific test (regex match)
go test -race -count=1 ./...           # Race detection (non-negotiable in CI)
go test -short ./...                   # Skip long-running tests
go test -count=10 ./...                # Detect flaky tests
go test -shuffle=on ./...              # Randomize test order
```

## Anti-Patterns

| Anti-Pattern | Why | Fix |
|-------------|-----|-----|
| Testing private functions directly | Couples tests to implementation | Test through the public API |
| `time.Sleep` in tests | Slow, flaky | Use channels, tickers, or test clocks |
| Assert inside loop without `t.Run` | First failure hides subsequent ones | Use `t.Run` with table-driven tests |
| Global mocks leaking between tests | Shared state corrupts test isolation | Define mocks locally in each test |
| Skipping error path tests | Bugs hide in error handling | Every error branch needs a test case |
| Over-mocking (mock everything) | Tests prove nothing | Use real implementations when practical |
