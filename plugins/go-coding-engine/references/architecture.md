# Authors: Joysusy & Violet Klaudia
# Go Architecture

Clean Architecture in Go is not a framework — it is a dependency rule:
**inner layers know nothing about outer layers.** Go's implicit interfaces
make this natural. No annotations, no DI containers, no magic.

## The Dependency Rule

```
OUTER (adapters)  --->  MIDDLE (use cases)  --->  INNER (domain)

Imports flow inward only. Never the reverse.
```

- **Domain**: Pure business types and interfaces. Zero external imports.
- **Use Case**: Application-level orchestration. Depends only on domain.
- **Adapter**: HTTP handlers, database repos, message consumers. Depends on use case and domain.
- **main.go**: Composition root. Wires everything together.

## Standard Project Layout

```
myproject/
  cmd/
    myapp/
      main.go              Composition root. Creates deps, starts server.
    worker/
      main.go              Background job runner (separate binary)
  internal/
    domain/
      order.go             Entity: pure types, business rules
      order_repository.go  Interface: what the domain needs
      errors.go            Domain-specific sentinel errors
    usecase/
      order_service.go     Application logic: calls domain interfaces
      order_service_test.go
    adapter/
      handler/
        order_handler.go   HTTP handler: parse request -> call service -> respond
        middleware.go       Logging, auth, recovery, CORS
      repository/
        postgres/
          order_repo.go    Implements domain.OrderRepository with pgx
          migrations/      SQL migration files
      grpc/
        order_server.go    gRPC adapter (if applicable)
  pkg/
    httpclient/            Public reusable library (use sparingly)
  api/
    openapi.yaml           API specification
    proto/                 Protobuf definitions
  testdata/                Golden files, fixtures
  go.mod
  go.sum
  Makefile
  Dockerfile
```

## Domain Layer

The domain is the innermost ring. It defines entities and the interfaces
that the rest of the application must satisfy.

```go
// internal/domain/order.go
package domain

import "time"

type OrderStatus string

const (
    OrderStatusPending   OrderStatus = "pending"
    OrderStatusConfirmed OrderStatus = "confirmed"
    OrderStatusShipped   OrderStatus = "shipped"
)

type Order struct {
    ID        string
    CustomerID string
    Items     []OrderItem
    Status    OrderStatus
    CreatedAt time.Time
}

type OrderItem struct {
    ProductID string
    Quantity  int
    Price     int64  // cents
}

func (o *Order) Total() int64 {
    var total int64
    for _, item := range o.Items {
        total += item.Price * int64(item.Quantity)
    }
    return total
}
```

```go
// internal/domain/order_repository.go
package domain

import "context"

type OrderRepository interface {
    Save(ctx context.Context, order *Order) error
    FindByID(ctx context.Context, id string) (*Order, error)
    FindByCustomer(ctx context.Context, customerID string) ([]*Order, error)
}
```

```go
// internal/domain/errors.go
package domain

import "errors"

var (
    ErrNotFound      = errors.New("not found")
    ErrAlreadyExists = errors.New("already exists")
    ErrInvalidInput  = errors.New("invalid input")
)
```

## Use Case Layer

Orchestrates domain objects through the interfaces the domain defines.
No knowledge of HTTP, SQL, or any transport.

```go
// internal/usecase/order_service.go
package usecase

import (
    "context"
    "fmt"

    "myproject/internal/domain"
)

type Notifier interface {
    NotifyOrderCreated(ctx context.Context, order *domain.Order) error
}

type OrderService struct {
    repo   domain.OrderRepository
    notify Notifier
}

func NewOrderService(repo domain.OrderRepository, notify Notifier) *OrderService {
    return &OrderService{repo: repo, notify: notify}
}

func (s *OrderService) CreateOrder(ctx context.Context, customerID string, items []domain.OrderItem) (*domain.Order, error) {
    if len(items) == 0 {
        return nil, fmt.Errorf("create order: %w", domain.ErrInvalidInput)
    }

    order := &domain.Order{
        ID:         generateID(),
        CustomerID: customerID,
        Items:      items,
        Status:     domain.OrderStatusPending,
    }

    if err := s.repo.Save(ctx, order); err != nil {
        return nil, fmt.Errorf("save order: %w", err)
    }

    if err := s.notify.NotifyOrderCreated(ctx, order); err != nil {
        // Log but don't fail the order creation
        slog.Error("notification failed", "order_id", order.ID, "err", err)
    }

    return order, nil
}
```

## Adapter Layer

### HTTP Handler

Thin adapters. Parse request, call service, format response. No business logic.

```go
// internal/adapter/handler/order_handler.go
package handler

import (
    "encoding/json"
    "errors"
    "net/http"

    "myproject/internal/domain"
    "myproject/internal/usecase"
)

type OrderHandler struct {
    svc *usecase.OrderService
}

func NewOrderHandler(svc *usecase.OrderService) *OrderHandler {
    return &OrderHandler{svc: svc}
}

func (h *OrderHandler) Create(w http.ResponseWriter, r *http.Request) {
    var req CreateOrderRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        writeError(w, http.StatusBadRequest, "invalid request body")
        return
    }

    order, err := h.svc.CreateOrder(r.Context(), req.CustomerID, req.toItems())
    if err != nil {
        if errors.Is(err, domain.ErrInvalidInput) {
            writeError(w, http.StatusBadRequest, err.Error())
            return
        }
        writeError(w, http.StatusInternalServerError, "internal error")
        return
    }

    writeJSON(w, http.StatusCreated, order)
}
```

### Repository Implementation

```go
// internal/adapter/repository/postgres/order_repo.go
package postgres

import (
    "context"
    "fmt"

    "github.com/jackc/pgx/v5/pgxpool"
    "myproject/internal/domain"
)

type OrderRepo struct {
    pool *pgxpool.Pool
}

func NewOrderRepo(pool *pgxpool.Pool) *OrderRepo {
    return &OrderRepo{pool: pool}
}

func (r *OrderRepo) FindByID(ctx context.Context, id string) (*domain.Order, error) {
    row := r.pool.QueryRow(ctx,
        "SELECT id, customer_id, status, created_at FROM orders WHERE id = $1", id)

    var order domain.Order
    if err := row.Scan(&order.ID, &order.CustomerID, &order.Status, &order.CreatedAt); err != nil {
        return nil, fmt.Errorf("find order %s: %w", id, err)
    }
    return &order, nil
}
```

## Composition Root (main.go)

```go
// cmd/myapp/main.go
package main

import (
    "context"
    "log/slog"
    "net/http"
    "os"
    "os/signal"
    "syscall"
    "time"

    "github.com/jackc/pgx/v5/pgxpool"
    "myproject/internal/adapter/handler"
    "myproject/internal/adapter/repository/postgres"
    "myproject/internal/usecase"
)

func main() {
    logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
    slog.SetDefault(logger)

    pool, err := pgxpool.New(context.Background(), os.Getenv("DATABASE_URL"))
    if err != nil {
        slog.Error("database connection failed", "err", err)
        os.Exit(1)
    }
    defer pool.Close()

    repo := postgres.NewOrderRepo(pool)
    notifier := smtp.NewNotifier(os.Getenv("SMTP_ADDR"))
    svc := usecase.NewOrderService(repo, notifier)
    h := handler.NewOrderHandler(svc)

    mux := http.NewServeMux()
    mux.HandleFunc("POST /api/orders", h.Create)
    mux.HandleFunc("GET /api/orders/{id}", h.GetByID)
    mux.HandleFunc("GET /health", healthHandler(pool))

    srv := &http.Server{
        Addr:         ":8080",
        Handler:      middleware.Chain(mux, middleware.Logging, middleware.Recovery),
        ReadTimeout:  5 * time.Second,
        WriteTimeout: 10 * time.Second,
        IdleTimeout:  60 * time.Second,
    }

    go func() {
        slog.Info("server starting", "addr", srv.Addr)
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

## Middleware Pattern

```go
type Middleware func(http.Handler) http.Handler

func Chain(h http.Handler, middlewares ...Middleware) http.Handler {
    for i := len(middlewares) - 1; i >= 0; i-- {
        h = middlewares[i](h)
    }
    return h
}

func Logging(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next.ServeHTTP(w, r)
        slog.Info("request",
            "method", r.Method,
            "path", r.URL.Path,
            "duration", time.Since(start),
        )
    })
}

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

## Interface Design Principles

1. **Define interfaces where they are used** (consumer package), not where they are implemented.
2. **Keep interfaces small** — 1-2 methods. Compose for more.
3. **Compile-time verification**: `var _ domain.OrderRepository = (*OrderRepo)(nil)`
4. **Accept interfaces, return structs** — flexible input, concrete output.

## Anti-Patterns

| Anti-Pattern | Correct Approach |
|-------------|------------------|
| Global singleton `var db *sql.DB` | Inject via constructor |
| `init()` for complex wiring | Wire in main.go |
| Business logic in HTTP handler | Thin handler calls use case service |
| Domain importing adapter package | Domain defines interface, adapter implements |
| God service with 20 methods | Split by responsibility |
| `package controllers/services/` at root | Organize by feature, not by layer |
| Returning interfaces from constructors | Return concrete types |

## Reference Architectures

These open-source projects demonstrate Clean Architecture in Go:
- `bxcodec/go-clean-arch` — Classic clean arch example
- `evrone/go-clean-template` — Production-oriented template
- `ThreeDotsLabs/wild-workouts-go-ddd-example` — DDD + CQRS in Go
