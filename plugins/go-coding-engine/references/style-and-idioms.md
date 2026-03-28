# Authors: Joysusy & Violet Klaudia
# Go Style and Idioms

Distilled from Effective Go, the Go Proverbs, Google's Go Style Guide,
and Uber's Go Style Guide. These are not suggestions — they are the language's
social contract.

## The Go Proverbs (Operational Translation)

| Proverb | What It Means in Practice |
|---------|--------------------------|
| Clear is better than clever | If a reader needs to pause to understand your code, simplify it |
| Errors are values | Return them, wrap them, inspect them. Never panic for control flow. |
| Don't communicate by sharing memory | Use channels between goroutines. Mutex only for simple state. |
| A little copying is better than a little dependency | Copy 10 lines rather than import a 500-line package |
| The bigger the interface, the weaker the abstraction | 1-2 method interfaces. Compose for more. |
| Make the zero value useful | `var buf bytes.Buffer` works. Your types should too. |
| Gofmt's style is no one's favorite, yet gofmt is everyone's friend | Never argue about formatting. Run the tool. |
| Interface pollution is real | Don't define interfaces until you have two implementations or need mocking |

## Naming Conventions

### Identifiers

```go
// MixedCaps for exported, mixedCaps for unexported. Always.
type HTTPClient struct{}     // Initialisms are ALL CAPS: HTTP, URL, ID, API, JSON, SQL
func ServeHTTP()             // Not ServeHttp
var userID string            // Not userId

// Short names for short scopes
for i, v := range items {}   // Loop vars: single letter is fine
func (s *Server) Handle() {} // Receiver: 1-2 letter abbreviation of type name

// Longer names for longer scopes
var connectionTimeout time.Duration  // Package-level: be descriptive
```

### Packages

```go
package http     // Short, lowercase, no underscores, singular
package user     // Good: describes what it provides
package utils    // Bad: meaningless grab-bag
package models   // Bad: plural, layer-name not feature-name
package common   // Bad: what does "common" provide?

// Don't stutter — the package name is already context
package user
func New() *User        // Caller writes: user.New() — clear
func NewUser() *User    // Caller writes: user.NewUser() — redundant
```

### Functions and Methods

```go
// Getters: no "Get" prefix
func (u *User) Name() string   // Good
func (u *User) GetName() string // Bad (Java-ism)

// Setters: "Set" prefix is acceptable
func (u *User) SetName(name string) {}

// Constructors: New or NewTypeName
func New(addr string) *Server        // When package has one primary type
func NewReader(r io.Reader) *Reader  // When package has multiple types

// Boolean methods/vars: use positive, is/has/can prefix when helpful
func (u *User) IsAdmin() bool
var hasPermission bool
```

## Import Organization

Three groups, separated by blank lines. No exceptions.

```go
import (
    // Group 1: Standard library
    "context"
    "fmt"
    "net/http"

    // Group 2: External packages
    "github.com/labstack/echo/v4"
    "go.uber.org/zap"

    // Group 3: Internal packages
    "github.com/myorg/myapp/internal/domain"
)
```

Rules:
- Never rename imports unless there is a genuine name conflict
- Never use dot imports (`. "pkg"`) — they pollute the namespace
- Blank imports (`_ "pkg"`) only in `main` or `_test.go` files

## Variable Declarations

```go
var count int              // Zero value, will be set later — var signals intent
name := "default"          // Non-zero initial value — := is appropriate
var buf bytes.Buffer       // Zero value is ready to use — var, not :=

// Composite literals: ALWAYS use field names
srv := &http.Server{
    Addr:         ":8080",
    ReadTimeout:  5 * time.Second,
    WriteTimeout: 10 * time.Second,
}
```

## Control Flow

### Early Returns

Handle errors first. Keep the happy path at minimal indentation.

```go
func process(data []byte) (*Result, error) {
    if len(data) == 0 {
        return nil, errors.New("empty data")
    }

    parsed, err := parse(data)
    if err != nil {
        return nil, fmt.Errorf("parsing: %w", err)
    }

    return transform(parsed), nil
}
```

### No Unnecessary Else

When `if` ends with `return`, `break`, or `continue`, drop the `else`.

```go
// Good
if err != nil {
    return err
}
doWork()

// Bad
if err != nil {
    return err
} else {
    doWork()
}
```

### Switch Over If-Else Chains

```go
switch status {
case StatusActive:
    activate()
case StatusInactive:
    deactivate()
default:
    return fmt.Errorf("unexpected status: %d", status)
}
```

## Function Design

- **Four parameters max.** Beyond that, use an options struct.
- **`context.Context` is always the first parameter.**
- **Return concrete types.** Accept interfaces.
- **Naked returns** only in very short functions (1-3 lines).

```go
func FetchUser(ctx context.Context, id string) (*User, error)   // Good
func SendEmail(ctx context.Context, msg EmailMessage) error      // Grouped into struct
```

## Pointer vs Value Receivers

| Use pointer `*T` | Use value `T` |
|-------------------|---------------|
| Method mutates the receiver | Method does not mutate |
| Struct is large (>128 bytes) | Struct is small, no pointers |
| Consistency with other methods on type | Type is map, func, or chan |

RULE: Don't mix. Pick one style per type and stick with it.

## Slice and Map Idioms

```go
// Preallocate when size is known
results := make([]Result, 0, len(items))

// Copy at API boundaries to prevent mutation
func (s *Store) GetIDs() []string {
    return slices.Clone(s.ids)
}

// Use standard library (Go 1.21+)
slices.Sort(items)
slices.Contains(items, target)
maps.Clone(m)
maps.Keys(m)
```

## Modern Go Features (1.22+)

```go
// Range over integers
for i := range 10 {
    fmt.Println(i)
}

// Built-in min/max
smallest := min(a, b, c)

// Enhanced http routing
mux.HandleFunc("GET /api/users/{id}", handleGetUser)

// Range-over-func iterators (Go 1.23+)
func All[K, V any](m map[K]V) iter.Seq2[K, V] {
    return func(yield func(K, V) bool) {
        for k, v := range m {
            if !yield(k, v) { return }
        }
    }
}
```

## Anti-Patterns

| Anti-Pattern | Why | Fix |
|-------------|-----|-----|
| Naked returns in long functions | Unreadable — what is returned? | Name returns or use explicit vars |
| `panic` for control flow | Crashes the program or forces recover chains | Return errors |
| `context.Context` in struct fields | Context is per-request, not per-object | First function parameter |
| Ignoring errors with `_` | Silent failures | Handle or propagate |
| Capital/punctuated error strings | Breaks wrapping chains | Lowercase, no period |
| `init()` for complex setup | Untestable, order-dependent | Constructor in main.go |
