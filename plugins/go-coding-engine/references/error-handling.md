# Authors: Joysusy & Violet Klaudia
# Go Error Handling

Go treats errors as values, not exceptions. There is no `try/catch`, no stack
unwinding, no hidden control flow. You return an error. You check it at the call
site. You wrap it with context. This explicitness is a feature, not a limitation.

## The Three Rules

1. **Errors are values.** Handle them like any other return value.
2. **Handle once.** Log OR return. Never both. Logging AND returning creates
   duplicate noise and confuses the reader about who owns the error.
3. **Add context when wrapping.** A bare `return err` at layer N gives the caller
   no idea where the failure occurred. Wrap with what you were trying to do.

## Error Wrapping

### With %w (Caller Can Inspect)

```go
func LoadConfig(path string) (*Config, error) {
    data, err := os.ReadFile(path)
    if err != nil {
        return nil, fmt.Errorf("load config %s: %w", path, err)
    }

    var cfg Config
    if err := json.Unmarshal(data, &cfg); err != nil {
        return nil, fmt.Errorf("parse config %s: %w", path, err)
    }

    return &cfg, nil
}
```

Use `%w` when callers may need to match the underlying error with `errors.Is`
or `errors.As`. The wrapped error remains part of the chain.

### With %v (Internal Detail)

```go
return fmt.Errorf("connect to cache: %v", err)
```

Use `%v` when the underlying error is an implementation detail that callers
should not match against. This breaks the chain intentionally.

## Error String Conventions

- **Lowercase first letter**: `"load config: %w"` not `"Load config: %w"`
- **No trailing punctuation**: `"open file"` not `"open file."`
- **Format**: `"verb noun context: %w"` — describes what was being attempted
- Errors chain left-to-right: `"create order: validate items: item price negative"`

## Sentinel Errors

Fixed, exported error values for common conditions callers need to match.

```go
var (
    ErrNotFound      = errors.New("not found")
    ErrAlreadyExists = errors.New("already exists")
    ErrUnauthorized  = errors.New("unauthorized")
)
```

Check with `errors.Is`:

```go
if errors.Is(err, domain.ErrNotFound) {
    w.WriteHeader(http.StatusNotFound)
    return
}
```

## Custom Error Types

When callers need structured error data beyond a message.

```go
type ValidationError struct {
    Field   string
    Message string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("validation: %s: %s", e.Field, e.Message)
}

// Usage
return &ValidationError{Field: "email", Message: "invalid format"}

// Checking
var valErr *ValidationError
if errors.As(err, &valErr) {
    slog.Warn("validation failed", "field", valErr.Field, "msg", valErr.Message)
}
```

## errors.Join (Go 1.20+)

When multiple independent operations can fail and you want to report all of them.

```go
func ValidateOrder(order *Order) error {
    var errs []error

    if order.CustomerID == "" {
        errs = append(errs, errors.New("customer ID required"))
    }
    if len(order.Items) == 0 {
        errs = append(errs, errors.New("at least one item required"))
    }
    for i, item := range order.Items {
        if item.Quantity <= 0 {
            errs = append(errs, fmt.Errorf("item %d: quantity must be positive", i))
        }
    }

    return errors.Join(errs...)  // Returns nil if no errors
}
```

## Decision Table: Which Error Type?

| Scenario | Use This |
|----------|----------|
| Caller matches specific error | Sentinel: `var ErrNotFound = errors.New(...)` |
| Caller needs structured details | Custom type: `type ValidationError struct{...}` |
| Just adding context to existing error | `fmt.Errorf("context: %w", err)` |
| Multiple independent errors | `errors.Join(err1, err2)` |
| Internal detail, callers won't match | `fmt.Errorf("context: %v", err)` |
| Truly unrecoverable (startup only) | `panic` — and only at application startup |

## The Handle Once Rule in Practice

```go
// WRONG: log AND return — the caller will probably log again
func fetchUser(ctx context.Context, id string) (*User, error) {
    user, err := db.FindUser(ctx, id)
    if err != nil {
        log.Printf("failed to fetch user %s: %v", id, err)  // Logged here
        return nil, err                                        // And again by caller
    }
    return user, nil
}

// CORRECT: wrap and return — let the caller decide how to handle
func fetchUser(ctx context.Context, id string) (*User, error) {
    user, err := db.FindUser(ctx, id)
    if err != nil {
        return nil, fmt.Errorf("fetch user %s: %w", id, err)
    }
    return user, nil
}

// ALSO CORRECT: handle completely and don't propagate
func fetchUser(ctx context.Context, id string) (*User, error) {
    user, err := db.FindUser(ctx, id)
    if err != nil {
        slog.Warn("user not in db, returning guest", "id", id, "err", err)
        return guestUser(), nil  // Handled here, not propagated
    }
    return user, nil
}
```

## Error Handling at Boundaries

### HTTP Handler Boundary

```go
func (h *Handler) Create(w http.ResponseWriter, r *http.Request) {
    order, err := h.svc.CreateOrder(r.Context(), req)
    if err != nil {
        switch {
        case errors.Is(err, domain.ErrInvalidInput):
            writeError(w, http.StatusBadRequest, err.Error())
        case errors.Is(err, domain.ErrNotFound):
            writeError(w, http.StatusNotFound, "resource not found")
        default:
            slog.Error("create order failed", "err", err)
            writeError(w, http.StatusInternalServerError, "internal error")
        }
        return
    }
    writeJSON(w, http.StatusCreated, order)
}
```

### Never Leak Internal Errors to Clients

```go
// WRONG: exposes internal structure
writeError(w, 500, err.Error())
// Output: "create order: save to postgres: connection refused"

// CORRECT: log internally, return generic message
slog.Error("create order failed", "err", err)
writeError(w, 500, "internal error")
```

## Panic: When and Only When

- **Acceptable**: Application startup (missing required config, cannot bind port)
- **Acceptable**: Programmer error that should never happen (impossible switch case)
- **Never**: Request handling. User input validation. I/O operations. Network calls.

```go
// Acceptable panic: startup
func mustParseTemplate(name string) *template.Template {
    t, err := template.ParseFiles(name)
    if err != nil {
        panic(fmt.Sprintf("parse template %s: %v", name, err))
    }
    return t
}

// Recovery middleware catches panics in HTTP handlers
func Recovery(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        defer func() {
            if err := recover(); err != nil {
                slog.Error("panic", "err", err, "stack", string(debug.Stack()))
                http.Error(w, "internal error", http.StatusInternalServerError)
            }
        }()
        next.ServeHTTP(w, r)
    })
}
```

## Anti-Patterns

| Anti-Pattern | Why | Fix |
|-------------|-----|-----|
| `result, _ := doSomething()` | Silent failure | Handle or propagate the error |
| `if err.Error() == "not found"` | String comparison is brittle | Use `errors.Is` or `errors.As` |
| Log AND return | Duplicate logs, confused ownership | Choose one: log or return |
| Bare `return err` | No context for debugging | Wrap: `fmt.Errorf("doing X: %w", err)` |
| `panic` in request handlers | Crashes or forces complex recover chains | Return errors |
| Error strings with capitals/periods | Breaks wrapping chains | Lowercase, no punctuation |
| Using `pkg/errors` | Deprecated | Use stdlib `errors` and `fmt.Errorf` |
