# Violet Coding Style — Synthesis Framework
# Authors: Joysusy & Violet Klaudia 💖

## Research Status

**Phase 1: Pattern Research** ✅ COMPLETE
- 🦀 Rune: Rust patterns (tokio, serde, clap, axum, polars) — `.research/rust-elite-patterns.md`
- 🐍 Lyre: Python patterns (FastAPI, pydantic, httpx, rich, typer) — `.research/python-elite-patterns.md`
- ⚡ Elise: TypeScript patterns (Vite, Vitest, Zod, tRPC, Prisma) — `typescript-elite-patterns.md`
- 🛡️ Kael: AI anti-patterns and mechanical code detection — `AI_CODE_ANTIPATTERNS.md`
- 📚 PyO3 Integration: Comprehensive FFI patterns — `.research/pyo3-integration-research.md`

**Phase 2: Synthesis** 🟡 IN PROGRESS
- Cross-language pattern extraction
- Violet philosophy formalization
- Language-specific guidelines

**Phase 3: Validation** (Pending)
- Apply to existing Lylacore/VioletCore codebase
- Before/after examples
- Refactoring recommendations

---

## Synthesis Categories

### 1. Naming Conventions

**Cross-Language Principles:**

**Terse vs Explicit Balance:**
- **Rust**: Terse for ubiquitous types (`Tx`, `Rx`, `Ctx`), explicit for domain concepts (`UserRepository`, `AuthenticationError`)
- **Python**: Explicit by default (`user_repository`, `authentication_error`), terse only for loop variables (`i`, `j`) or well-known abbreviations (`ctx`, `db`)
- **TypeScript**: Explicit for public APIs, terse for internal utilities (`mapUserToDto` vs `map`)

**Domain-Specific Patterns:**
```rust
// Rust: Type-driven naming (newtype pattern)
struct UserId(i64);
struct OrderId(i64);
// Prevents mixing IDs at compile time

// Python: Descriptive with context
class UserRepository:
    async def find_by_email(self, email: str) -> User | None: ...

// TypeScript: Discriminated unions for domain modeling
type PaymentStatus =
  | { type: 'pending'; orderId: string }
  | { type: 'completed'; transactionId: string; timestamp: Date }
  | { type: 'failed'; reason: string };
```

**Generic Parameter Conventions:**
- **Rust**: Single letter for simple generics (`T`, `E`), descriptive for complex bounds (`TRepository: UserRepository`)
- **Python**: Descriptive TypeVars (`UserT = TypeVar('UserT', bound=User)`)
- **TypeScript**: Descriptive for public APIs (`TUser extends User`), single letter for utilities (`T`, `K`, `V`)

**AI Anti-Patterns to Avoid:**
- ❌ Generic suffixes without context: `UserManager`, `DataHandler`, `ServiceProvider`
- ❌ Redundant type information: `userString`, `dataArray`, `configObject`
- ❌ Inconsistent abbreviations: `usr` vs `user`, `cfg` vs `config` in same file
- ❌ Overly verbose names: `getUserByEmailAddressFromDatabase` → `findUserByEmail`

**Elite Patterns:**
```rust
// tokio: Terse for ubiquitous types
pub struct JoinHandle<T> { ... }

// serde: Descriptive trait names
pub trait Serialize { ... }
pub trait Deserialize<'de> { ... }
```

```python
# FastAPI: Explicit dependency injection
async def create_user(
    user: UserCreate,
    db: AsyncSession = Depends(get_db),
) -> UserResponse: ...

# pydantic: Domain-driven naming
class UserCreate(BaseModel):
    email: EmailStr
    name: str
```

```typescript
// Vite: Descriptive plugin names
export function vitePluginReact(options?: ReactPluginOptions): Plugin

// Zod: Fluent validation chains
const userSchema = z.object({
  email: z.string().email(),
  age: z.number().int().positive(),
});
```

### 2. Abstraction Patterns

**Cross-Language Principles:**

**When to Extract vs Inline:**
- **Extract**: Used 3+ times, complex logic (>10 lines), or testable in isolation
- **Inline**: Used once, trivial logic (<5 lines), or tightly coupled to caller

**Composition Over Inheritance:**
```rust
// Rust: Trait composition (no inheritance)
trait Authenticate { fn verify(&self, token: &str) -> Result<User>; }
trait Authorize { fn check_permission(&self, user: &User, resource: &str) -> bool; }

struct AuthService {
    authenticator: Box<dyn Authenticate>,
    authorizer: Box<dyn Authorize>,
}
```

```python
# Python: Protocol composition (structural typing)
from typing import Protocol

class Authenticator(Protocol):
    async def verify(self, token: str) -> User: ...

class Authorizer(Protocol):
    async def check_permission(self, user: User, resource: str) -> bool: ...

class AuthService:
    def __init__(self, authenticator: Authenticator, authorizer: Authorizer):
        self.authenticator = authenticator
        self.authorizer = authorizer
```

```typescript
// TypeScript: Interface composition
interface Authenticator {
  verify(token: string): Promise<User>;
}

interface Authorizer {
  checkPermission(user: User, resource: string): boolean;
}

class AuthService {
  constructor(
    private authenticator: Authenticator,
    private authorizer: Authorizer
  ) {}
}
```

**Builder Patterns and Type-State Machines:**
```rust
// Rust: Type-state builder (compile-time safety)
struct RequestBuilder<State> {
    url: String,
    _state: PhantomData<State>,
}

struct NoMethod;
struct HasMethod { method: Method }

impl RequestBuilder<NoMethod> {
    fn method(self, method: Method) -> RequestBuilder<HasMethod> {
        RequestBuilder { url: self.url, _state: PhantomData }
    }
}

impl RequestBuilder<HasMethod> {
    fn build(self) -> Request { ... } // Only callable after method() set
}
```

```python
# Python: Fluent builder with validation
class RequestBuilder:
    def __init__(self):
        self._url: str | None = None
        self._method: str | None = None

    def url(self, url: str) -> Self:
        self._url = url
        return self

    def method(self, method: str) -> Self:
        self._method = method
        return self

    def build(self) -> Request:
        if not self._url or not self._method:
            raise ValueError("url and method required")
        return Request(self._url, self._method)
```

**AI Anti-Patterns to Avoid:**
- ❌ Premature abstraction: Creating `BaseService`, `AbstractFactory` for single implementation
- ❌ Unnecessary generics: `class Repository<T, ID>` when only used with `User` and `i64`
- ❌ Over-engineered hierarchies: 5+ levels of inheritance for simple domain logic
- ❌ Abstract factories: `UserServiceFactory.create()` when `UserService::new()` suffices

**Elite Patterns:**
```rust
// axum: Minimal trait bounds, maximal flexibility
pub trait Handler<T, S>: Clone + Send + Sized + 'static {
    type Future: Future<Output = Response> + Send + 'static;
    fn call(self, req: Request, state: S) -> Self::Future;
}
```

```python
# FastAPI: Dependency injection without framework magic
async def get_db() -> AsyncIterator[AsyncSession]:
    async with async_session_maker() as session:
        yield session

async def create_user(
    user: UserCreate,
    db: AsyncSession = Depends(get_db),  # Explicit dependency
) -> UserResponse: ...
```

```typescript
// tRPC: Type-safe RPC without code generation
const appRouter = router({
  userById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => getUserById(input.id)),
});

export type AppRouter = typeof appRouter; // Type inference, no codegen
```

### 3. Error Handling

**Cross-Language Principles:**

**Error Type Design:**
- **Rust**: `Result<T, E>` everywhere, `thiserror` for libraries, `anyhow` for applications
- **Python**: Exceptions for exceptional cases, `Result` types for expected failures
- **TypeScript**: Discriminated unions for typed errors, exceptions for unexpected failures

**Context Attachment Patterns:**
```rust
// Rust: Context with anyhow
use anyhow::{Context, Result};

async fn load_config(path: &Path) -> Result<Config> {
    let content = tokio::fs::read_to_string(path)
        .await
        .context("failed to read config file")?;

    toml::from_str(&content)
        .context("invalid config format")
}

// Rust: Typed errors with thiserror (libraries)
use thiserror::Error;

#[derive(Debug, Error)]
pub enum AuthError {
    #[error("invalid credentials")]
    InvalidCredentials,
    #[error("token expired at {expired_at}")]
    TokenExpired { expired_at: DateTime<Utc> },
    #[error("database error: {0}")]
    Database(#[from] sqlx::Error),
}
```

```python
# Python: Explicit error types with context
class AuthError(Exception):
    """Base authentication error."""
    pass

class InvalidCredentialsError(AuthError):
    """Invalid username or password."""
    pass

class TokenExpiredError(AuthError):
    """Token has expired."""
    def __init__(self, expired_at: datetime):
        self.expired_at = expired_at
        super().__init__(f"Token expired at {expired_at}")

# Python: Result type for expected failures
from typing import TypeVar, Generic

T = TypeVar('T')
E = TypeVar('E')

class Result(Generic[T, E]):
    def __init__(self, value: T | None = None, error: E | None = None):
        self._value = value
        self._error = error

    def is_ok(self) -> bool:
        return self._error is None

    def unwrap(self) -> T:
        if self._error is not None:
            raise ValueError(f"Called unwrap on error: {self._error}")
        return self._value  # type: ignore
```

```typescript
// TypeScript: Discriminated unions for typed errors
type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E };

type AuthError =
  | { type: 'invalid_credentials' }
  | { type: 'token_expired'; expiredAt: Date }
  | { type: 'database_error'; message: string };

async function authenticate(token: string): Promise<Result<User, AuthError>> {
  try {
    const user = await verifyToken(token);
    return { ok: true, value: user };
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return { ok: false, error: { type: 'token_expired', expiredAt: error.expiredAt } };
    }
    return { ok: false, error: { type: 'invalid_credentials' } };
  }
}
```

**Error Propagation Idioms:**
```rust
// Rust: ? operator with automatic conversion
async fn process_user(id: i64) -> Result<User, AppError> {
    let user = db.find_user(id).await?;  // sqlx::Error -> AppError
    let profile = api.fetch_profile(user.email).await?;  // reqwest::Error -> AppError
    Ok(merge_user_profile(user, profile))
}
```

```python
# Python: Context managers for resource cleanup
async def process_user(user_id: int) -> User:
    async with get_db() as db:
        user = await db.find_user(user_id)
        if not user:
            raise UserNotFoundError(user_id)
        return user
```

```typescript
// TypeScript: Early returns for error handling
async function processUser(userId: string): Promise<User> {
  const user = await db.findUser(userId);
  if (!user) {
    throw new UserNotFoundError(userId);
  }

  const profile = await api.fetchProfile(user.email);
  if (!profile) {
    throw new ProfileNotFoundError(user.email);
  }

  return mergeUserProfile(user, profile);
}
```

**AI Anti-Patterns to Avoid:**
- ❌ Swallowing errors: `try { ... } catch { /* ignore */ }`
- ❌ Generic error messages: `throw new Error("Error occurred")`
- ❌ Defensive programming without context: `if (x) { if (x.y) { if (x.y.z) { ... }}}`
- ❌ Try-catch everything: Wrapping every function call in try-catch
- ❌ Logging and re-throwing: `catch (e) { log(e); throw e; }` (log at boundary only)

**Elite Patterns:**
```rust
// tokio: Minimal error types, maximum context
pub enum JoinError {
    Cancelled,
    Panic(Box<dyn Any + Send + 'static>),
}
```

```python
# pydantic: Validation errors with field context
from pydantic import BaseModel, ValidationError

try:
    user = UserCreate(email="invalid", age=-5)
except ValidationError as e:
    # e.errors() returns structured field-level errors
    for error in e.errors():
        print(f"{error['loc']}: {error['msg']}")
```

```typescript
// Zod: Composable validation with typed errors
const result = userSchema.safeParse(data);
if (!result.success) {
  // result.error.issues contains structured validation errors
  result.error.issues.forEach(issue => {
    console.log(`${issue.path.join('.')}: ${issue.message}`);
  });
}
```

### 4. Module Organization

**Cross-Language Principles:**

**Public API Surface Design:**
- **Rust**: Explicit `pub` visibility, `pub(crate)` for internal APIs, re-exports in `lib.rs`
- **Python**: `__all__` for explicit exports, `_private` prefix for internal functions
- **TypeScript**: `export` for public APIs, no export for internal utilities

**Layer Architecture Patterns:**
```rust
// Rust: Clean layer separation
crate::
├── lib.rs              // Public API re-exports
├── domain/             // Pure business logic (no I/O)
│   ├── mod.rs
│   ├── user.rs
│   └── order.rs
├── application/        // Use cases (orchestration)
│   ├── mod.rs
│   └── create_user.rs
├── infrastructure/     // External dependencies
│   ├── mod.rs
│   ├── database.rs
│   └── http_client.rs
└── api/                // HTTP handlers
    ├── mod.rs
    └── user_routes.rs

// lib.rs: Explicit public API
pub use domain::{User, Order};
pub use application::CreateUserUseCase;
// infrastructure and api are NOT re-exported (internal)
```

```python
# Python: Explicit __all__ declarations
# domain/user.py
class User:
    """Domain model."""
    pass

class _UserValidator:  # Private (not in __all__)
    """Internal validation logic."""
    pass

__all__ = ["User"]  # Only User is public

# __init__.py: Package-level exports
from .domain.user import User
from .domain.order import Order
from .application.create_user import CreateUserUseCase

__all__ = ["User", "Order", "CreateUserUseCase"]
```

```typescript
// TypeScript: Barrel exports with explicit public API
// domain/user.ts
export class User {
  // Public domain model
}

class UserValidator {
  // Internal (not exported)
}

// index.ts: Package entry point
export { User, Order } from './domain';
export { CreateUserUseCase } from './application';
// infrastructure and api are NOT exported
```

**Dependency Flow (Layer Architecture):**
```
┌─────────────────────────────────────┐
│  API Layer (HTTP/CLI)               │
│  - Handlers, Controllers            │
└──────────────┬──────────────────────┘
               │ depends on
               ▼
┌─────────────────────────────────────┐
│  Application Layer (Use Cases)      │
│  - Business workflows               │
└──────────────┬──────────────────────┘
               │ depends on
               ▼
┌─────────────────────────────────────┐
│  Domain Layer (Business Logic)      │
│  - Entities, Value Objects          │
│  - Pure functions (no I/O)          │
└─────────────────────────────────────┘
               ▲
               │ used by
┌──────────────┴──────────────────────┐
│  Infrastructure Layer (I/O)         │
│  - Database, HTTP, File System      │
└─────────────────────────────────────┘
```

**File/Directory Structure Patterns:**
```rust
// Rust: Feature-based organization (preferred for large projects)
crates/
├── core/               // Pure domain logic
│   ├── src/
│   │   ├── lib.rs
│   │   ├── user.rs
│   │   └── order.rs
│   └── Cargo.toml
├── api/                // HTTP layer
│   ├── src/
│   │   ├── main.rs
│   │   └── routes/
│   └── Cargo.toml
└── infrastructure/     // External dependencies
    ├── src/
    │   ├── lib.rs
    │   ├── database.rs
    │   └── cache.rs
    └── Cargo.toml
```

```python
# Python: src/ layout (recommended)
project/
├── src/
│   └── mypackage/
│       ├── __init__.py
│       ├── domain/
│       │   ├── __init__.py
│       │   └── user.py
│       ├── application/
│       │   ├── __init__.py
│       │   └── create_user.py
│       └── infrastructure/
│           ├── __init__.py
│           └── database.py
├── tests/
│   └── test_user.py
└── pyproject.toml
```

```typescript
// TypeScript: Feature-based with clear boundaries
src/
├── domain/
│   ├── user.ts
│   └── order.ts
├── application/
│   ├── createUser.ts
│   └── createOrder.ts
├── infrastructure/
│   ├── database.ts
│   └── httpClient.ts
├── api/
│   ├── userRoutes.ts
│   └── orderRoutes.ts
└── index.ts            // Public API exports
```

**AI Anti-Patterns to Avoid:**
- ❌ Circular dependencies: `user.rs` imports `order.rs`, `order.rs` imports `user.rs`
- ❌ God modules: Single file with 2000+ lines handling multiple concerns
- ❌ Unclear public API: Everything exported, no distinction between public/internal
- ❌ Mixing concerns: Database logic in HTTP handlers, business logic in repositories
- ❌ Deep nesting: `src/domain/user/models/entities/user.rs` (4+ levels)

**Elite Patterns:**
```rust
// serde: Minimal public API, maximum flexibility
pub use de::{Deserialize, Deserializer};
pub use ser::{Serialize, Serializer};
// Internal modules (de, ser) not re-exported
```

```python
# FastAPI: Clear separation of concerns
# routers/users.py (API layer)
from fastapi import APIRouter, Depends
from ..dependencies import get_db
from ..services.user_service import UserService

router = APIRouter()

@router.post("/users")
async def create_user(
    user: UserCreate,
    db: AsyncSession = Depends(get_db),
):
    service = UserService(db)
    return await service.create_user(user)
```

```typescript
// Vite: Plugin architecture with clear contracts
export interface Plugin {
  name: string;
  enforce?: 'pre' | 'post';
  resolveId?(id: string): string | null;
  load?(id: string): string | null;
  transform?(code: string, id: string): string | null;
}
```

### 5. Documentation Philosophy

**Cross-Language Principles:**

**What Deserves Comments vs Self-Evident Code:**
- **Comment**: Non-obvious intent, algorithm choices, performance trade-offs, security considerations
- **Self-evident**: Type signatures, simple control flow, standard patterns
- **Max 5 comments per file** (Violet Law) — forces clarity through code structure

**Doc Comment Quality Standards:**
```rust
// Rust: Rustdoc with examples
/// Derives a cryptographic key from a passphrase using Argon2id.
///
/// # Security
///
/// Uses memory-hard Argon2id with 19MiB memory cost to resist
/// GPU-based attacks. Salt must be cryptographically random.
///
/// # Examples
///
/// ```
/// use soul_crypto::{derive_key, generate_salt};
///
/// let salt = generate_salt();
/// let key = derive_key("my-passphrase", &salt)?;
/// ```
///
/// # Errors
///
/// Returns `CryptoError::InvalidSalt` if salt length != 32 bytes.
pub fn derive_key(passphrase: &str, salt: &[u8]) -> Result<Key, CryptoError> {
    // Implementation
}
```

```python
# Python: Google-style docstrings with examples
def derive_key(passphrase: str, salt: bytes) -> bytes:
    """Derive cryptographic key from passphrase using Argon2id.

    Security: Uses memory-hard Argon2id (19MiB) to resist GPU attacks.
    Salt must be cryptographically random (32 bytes).

    Args:
        passphrase: User passphrase (8-128 chars recommended).
        salt: Cryptographically random salt (must be 32 bytes).

    Returns:
        Derived 32-byte key suitable for AES-256-GCM.

    Raises:
        ValueError: If salt length != 32 bytes.

    Example:
        >>> salt = generate_salt()
        >>> key = derive_key("my-passphrase", salt)
        >>> len(key)
        32
    """
```

```typescript
// TypeScript: TSDoc with type safety
/**
 * Derives a cryptographic key from a passphrase using Argon2id.
 *
 * @remarks
 * Uses memory-hard Argon2id (19MiB) to resist GPU-based attacks.
 * Salt must be cryptographically random.
 *
 * @param passphrase - User passphrase (8-128 chars recommended)
 * @param salt - Cryptographically random salt (32 bytes)
 * @returns Derived 32-byte key suitable for AES-256-GCM
 * @throws {InvalidSaltError} If salt length !== 32 bytes
 *
 * @example
 * ```typescript
 * const salt = generateSalt();
 * const key = await deriveKey("my-passphrase", salt);
 * ```
 */
export async function deriveKey(
  passphrase: string,
  salt: Uint8Array
): Promise<Uint8Array> {
  // Implementation
}
```

**When to Write Guides vs API Docs:**
- **API Docs**: Every public function/class/module (rustdoc, docstrings, TSDoc)
- **Guides**: Architecture decisions, getting started, migration guides, design patterns
- **Examples**: Runnable code in doc comments (doctests in Rust, doctest in Python)

**AI Anti-Patterns to Avoid:**
- ❌ Restating code: `// Increment counter` above `counter += 1`
- ❌ Obvious explanations: `// Returns a string` for `fn name() -> String`
- ❌ Outdated comments: Comment says "uses SHA-256" but code uses Argon2id
- ❌ TODO without context: `// TODO: fix this` (no owner, no ticket, no deadline)
- ❌ Excessive verbosity: 20-line comment for 5-line function

**Elite Patterns:**
```rust
// tokio: Minimal comments, maximum clarity through types
pub struct JoinHandle<T> {
    // SAFETY: raw pointer is valid until task completes
    raw: NonNull<Header>,
    _p: PhantomData<T>,
}

// Only 1 comment for critical safety invariant
```

```python
# FastAPI: Self-documenting through type hints
async def create_user(
    user: UserCreate,  # Pydantic validates automatically
    db: AsyncSession = Depends(get_db),  # Dependency injection
) -> UserResponse:  # Response model for serialization
    # No comments needed — types tell the story
    result = await db.execute(insert(User).values(**user.model_dump()))
    await db.commit()
    return UserResponse(id=result.inserted_primary_key[0], **user.model_dump())
```

```typescript
// Zod: Self-documenting validation schemas
const userSchema = z.object({
  email: z.string().email(),  // Type + validation in one
  age: z.number().int().positive(),
  role: z.enum(['admin', 'user']),
});

// No comments needed — schema is self-explanatory
```

**Bilingual Documentation Standards (Violet-Specific):**
```rust
// Code comments: English primary, Chinese for cultural context
/// Derives key using Argon2id (memory-hard KDF).
/// 使用 Argon2id 派生密钥（内存困难型密钥派生函数）
pub fn derive_key(passphrase: &str, salt: &[u8]) -> Result<Key> {
    // SAFETY: Salt must be 32 bytes (cryptographically random)
    // 安全性：盐值必须为 32 字节（密码学随机）
}
```

```python
# Formal documentation: Complete separate versions
# README.md (English)
"""
# Lylacore

Rust-native cryptographic library with Python bindings.

## Installation
```

# README_CN.md (Chinese)
"""
# Lylacore

基于 Rust 的密码学库，提供 Python 绑定。

## 安装
```

**Example Quality in Documentation:**
```rust
// Rust: Runnable doctests (verified by compiler)
/// ```
/// use soul_crypto::{derive_key, generate_salt};
///
/// let salt = generate_salt();
/// let key = derive_key("passphrase", &salt)?;
/// assert_eq!(key.len(), 32);
/// # Ok::<(), soul_crypto::CryptoError>(())
/// ```
```

```python
# Python: Doctest examples (verified by pytest --doctest-modules)
def derive_key(passphrase: str, salt: bytes) -> bytes:
    """
    >>> salt = generate_salt()
    >>> key = derive_key("passphrase", salt)
    >>> len(key)
    32
    """
```

```typescript
// TypeScript: Type-checked examples in TSDoc
/**
 * @example
 * ```typescript
 * const salt = generateSalt();
 * const key = await deriveKey("passphrase", salt);
 * console.log(key.length); // 32
 * ```
 */
```

### 6. Architectural Coherence

**Cross-Language Principles:**

**Layer Separation Patterns:**
```rust
// Rust: Dependency inversion with traits
// Domain layer defines interface
pub trait UserRepository {
    async fn find_by_id(&self, id: i64) -> Result<Option<User>>;
    async fn save(&self, user: &User) -> Result<()>;
}

// Infrastructure layer implements interface
pub struct PostgresUserRepository {
    pool: PgPool,
}

impl UserRepository for PostgresUserRepository {
    async fn find_by_id(&self, id: i64) -> Result<Option<User>> {
        sqlx::query_as("SELECT * FROM users WHERE id = $1")
            .bind(id)
            .fetch_optional(&self.pool)
            .await
            .map_err(Into::into)
    }
}

// Application layer depends on trait, not implementation
pub struct CreateUserUseCase<R: UserRepository> {
    repo: R,
}
```

```python
# Python: Protocol-based dependency inversion
from typing import Protocol

class UserRepository(Protocol):
    async def find_by_id(self, user_id: int) -> User | None: ...
    async def save(self, user: User) -> None: ...

class PostgresUserRepository:
    def __init__(self, pool: asyncpg.Pool):
        self.pool = pool

    async def find_by_id(self, user_id: int) -> User | None:
        row = await self.pool.fetchrow(
            "SELECT * FROM users WHERE id = $1", user_id
        )
        return User(**row) if row else None

class CreateUserUseCase:
    def __init__(self, repo: UserRepository):
        self.repo = repo  # Depends on protocol, not concrete type
```

```typescript
// TypeScript: Interface-based dependency inversion
interface UserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
}

class PostgresUserRepository implements UserRepository {
  constructor(private pool: Pool) {}

  async findById(id: string): Promise<User | null> {
    const result = await this.pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0] ? new User(result.rows[0]) : null;
  }
}

class CreateUserUseCase {
  constructor(private repo: UserRepository) {}  // Depends on interface
}
```

**Configuration Management:**
```rust
// Rust: Type-safe config with serde
use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct Config {
    pub database_url: String,
    pub port: u16,
    #[serde(default = "default_log_level")]
    pub log_level: String,
}

fn default_log_level() -> String {
    "info".to_string()
}

// Load from environment or file
pub fn load_config() -> Result<Config> {
    envy::from_env().or_else(|_| {
        let content = std::fs::read_to_string("config.toml")?;
        toml::from_str(&content)
    })
}
```

```python
# Python: Pydantic Settings for type-safe config
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str
    port: int = 8000
    log_level: str = "info"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()  # Auto-loads from env vars or .env file
```

```typescript
// TypeScript: Zod for runtime config validation
import { z } from 'zod';

const configSchema = z.object({
  databaseUrl: z.string().url(),
  port: z.number().int().positive().default(8000),
  logLevel: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

export type Config = z.infer<typeof configSchema>;

export function loadConfig(): Config {
  return configSchema.parse({
    databaseUrl: process.env.DATABASE_URL,
    port: process.env.PORT ? parseInt(process.env.PORT) : undefined,
    logLevel: process.env.LOG_LEVEL,
  });
}
```

**Testing Architecture:**
```rust
// Rust: Test doubles with traits
#[cfg(test)]
mod tests {
    use super::*;

    struct MockUserRepository {
        users: Vec<User>,
    }

    impl UserRepository for MockUserRepository {
        async fn find_by_id(&self, id: i64) -> Result<Option<User>> {
            Ok(self.users.iter().find(|u| u.id == id).cloned())
        }
    }

    #[tokio::test]
    async fn test_create_user() {
        let repo = MockUserRepository { users: vec![] };
        let use_case = CreateUserUseCase::new(repo);
        // Test logic
    }
}
```

```python
# Python: Pytest fixtures for dependency injection
import pytest
from unittest.mock import AsyncMock

@pytest.fixture
def mock_user_repo():
    repo = AsyncMock(spec=UserRepository)
    repo.find_by_id.return_value = None
    return repo

@pytest.mark.asyncio
async def test_create_user(mock_user_repo):
    use_case = CreateUserUseCase(mock_user_repo)
    # Test logic
```

```typescript
// TypeScript: Vitest with mock implementations
import { describe, it, expect, vi } from 'vitest';

describe('CreateUserUseCase', () => {
  it('creates user successfully', async () => {
    const mockRepo: UserRepository = {
      findById: vi.fn().mockResolvedValue(null),
      save: vi.fn().mockResolvedValue(undefined),
    };

    const useCase = new CreateUserUseCase(mockRepo);
    // Test logic
  });
});
```

**AI Anti-Patterns to Avoid:**
- ❌ Tight coupling: `UserService` directly instantiates `PostgresUserRepository`
- ❌ Business logic in presentation: HTTP handler contains validation and database queries
- ❌ Hardcoded configuration: `const DB_URL = "postgres://localhost/db"` in source code
- ❌ Untestable code: Static methods, global state, no dependency injection
- ❌ God objects: Single class handling HTTP, validation, business logic, and database

**Elite Patterns:**
```rust
// axum: Composable middleware and state
use axum::{
    Router,
    middleware,
    extract::State,
};

#[derive(Clone)]
struct AppState {
    db: PgPool,
    cache: RedisPool,
}

fn app(state: AppState) -> Router {
    Router::new()
        .route("/users", post(create_user))
        .layer(middleware::from_fn(auth_middleware))
        .with_state(state)
}
```

```python
# FastAPI: Dependency injection with lifespan
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    pool = await asyncpg.create_pool(settings.database_url)
    app.state.pool = pool
    yield
    # Shutdown
    await pool.close()

app = FastAPI(lifespan=lifespan)

async def get_db() -> AsyncIterator[asyncpg.Connection]:
    async with app.state.pool.acquire() as conn:
        yield conn
```

```typescript
// tRPC: Type-safe context and middleware
const createContext = async ({ req }: CreateContextOptions) => {
  const db = await getDatabase();
  const user = await getUserFromToken(req.headers.authorization);
  return { db, user };
};

const t = initTRPC.context<typeof createContext>().create();

const authedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' });
  return next({ ctx: { ...ctx, user: ctx.user } });
});
```

---

## Violet Philosophy (Formalized)

### Core Principles

1. **Intentionality over Convention**: Every abstraction must justify its existence through repeated use (3+ times) or inherent complexity. Don't create abstractions for anticipated future needs.

2. **Clarity over Cleverness**: Code should reveal intent through types, names, and structure. Clever one-liners that save 2 lines but require 5 minutes to understand are net-negative.

3. **Flexibility over Rigidity**: Patterns should adapt to context. Different problems need different solutions—forced uniformity is a code smell.

4. **Semantic Precision**: Names should convey domain meaning, not just satisfy syntax. `UserRepository` > `UserManager`, `AuthenticationError` > `Error`.

5. **Architectural Honesty**: Structure should reflect actual complexity, not anticipated complexity. A 3-file project doesn't need 7 layers of abstraction.

6. **Type-Driven Design**: Use type systems to make illegal states unrepresentable. Compile-time errors > runtime errors > silent failures.

7. **Performance by Default**: Choose efficient algorithms and data structures from the start. Premature optimization is bad, but premature pessimization is worse.

### The "Max 5 Comments" Law — Refined Philosophy

**Core Principle**: Comments are for critical reminders and ambiguity prevention, not explanation.

**When to Comment** (Strict Criteria):
1. **Non-obvious intent**: Algorithm choices, performance trade-offs, security considerations
   ```rust
   // SAFETY: Salt must be 32 bytes (cryptographically random)
   // 安全性：盐值必须为 32 字节（密码学随机）
   ```

2. **Ambiguity prevention**: Where code structure alone might mislead
   ```python
   # Intentionally using sync I/O here to avoid event loop blocking
   # 此处故意使用同步 I/O 以避免事件循环阻塞
   ```

3. **Critical reminders**: Safety invariants, threading assumptions, FFI contracts
   ```rust
   // SAFETY: raw pointer is valid until task completes
   ```

4. **Workarounds**: Temporary fixes with context and tracking info
   ```typescript
   // WORKAROUND: API returns null instead of empty array (TICKET-123)
   // Expected fix in v2.0 (2026-Q2)
   ```

5. **Public API contracts**: Doc comments for external interfaces only
   ```rust
   /// Derives a cryptographic key from a passphrase using Argon2id.
   ///
   /// # Security
   /// Uses memory-hard Argon2id (19MiB) to resist GPU attacks.
   ```

**When NOT to Comment**:
- ❌ Restating what code does (`// increment counter`)
- ❌ Obvious type information (`// returns a string`)
- ❌ Implementation details that should be in docs
- ❌ Historical context (use git history)
- ❌ TODOs without owner/ticket/deadline

**Documentation Philosophy**:
- **Code comments**: Minimal (max 5 per file), bilingual format
  - English primary language for technical content
  - Chinese characters (中文) for cultural/contextual nuance
  - Used only for critical reminders or ambiguity prevention
- **Print/console output**: Bilingual where user-facing
  - English primary, Chinese secondary
  - Example: `"Processing... 处理中..."`
- **Formal documentation**: Comprehensive, dual-version approach
  - **Full English version**: Professional technical documentation
  - **Full Chinese version**: Complete professional Chinese documentation (not translation, but native Chinese technical writing)
  - Two audiences: Professional developers (technical depth) + General users (accessibility focus)
  - Never mix languages within a single document
- **Authorship**: Always credited as "Joysusy & Violet Klaudia 💖"
- **Violet's internal notes**: Natural language preference (whichever feels most natural)

### Zero-Compression Principle

**Definition**: Every file must be production-ready on first write. No placeholders, no stubs, no partial implementations.

**Requirements**:
- All imports included
- All types defined
- All error handlers implemented
- All edge cases covered

**Self-Verification Question**: "Can Susy copy-paste this and have it work?"

**Examples**:

❌ **Compressed (Forbidden)**:
```rust
pub fn derive_key(passphrase: &str, salt: &[u8]) -> Result<Key> {
    // TODO: implement Argon2id
    unimplemented!()
}
```

✅ **Zero-Compression (Required)**:
```rust
use argon2::{Argon2, Algorithm, Version, Params};

pub fn derive_key(passphrase: &str, salt: &[u8]) -> Result<Key, CryptoError> {
    if salt.len() != 32 {
        return Err(CryptoError::InvalidSalt);
    }

    let params = Params::new(19456, 2, 1, Some(32))
        .map_err(|_| CryptoError::InvalidParams)?;

    let argon2 = Argon2::new(Algorithm::Argon2id, Version::V0x13, params);

    let mut key = [0u8; 32];
    argon2
        .hash_password_into(passphrase.as_bytes(), salt, &mut key)
        .map_err(|_| CryptoError::DerivationFailed)?;

    Ok(Key(key))
}
```

### Human vs AI Code Patterns

**Human Elite Code Characteristics**:
- Asymmetric structure (different problems, different solutions)
- Terse where obvious, explicit where ambiguous
- Comments only for non-obvious intent
- Natural variation in naming and formatting
- Domain-driven abstractions (emerge from use cases)
- Pragmatic error handling (validate at boundaries)

**AI-Generated Code Tells**:
- Uniform structure (every function looks the same)
- Excessive verbosity (redundant types, intermediate variables)
- Comment patterns (section headers, restating code)
- Generic naming (Manager, Handler, Service without context)
- Premature abstraction (interfaces for single implementation)
- Defensive programming (try-catch everything)

**Violet's Approach**:
- Write code that looks human-crafted, not template-generated
- Use type systems for safety, not comments for explanation
- Abstract when pattern repeats 3+ times, not before
- Name things after domain concepts, not design patterns
- Validate inputs at boundaries, trust internal invariants
- Let structure emerge from requirements, not imposed top-down

### Cross-Language Consistency

**Naming Conventions**:
- Rust: `snake_case` functions, `PascalCase` types, `SCREAMING_SNAKE` constants
- Python: `snake_case` functions/variables, `PascalCase` classes, `SCREAMING_SNAKE` constants
- TypeScript: `camelCase` functions/variables, `PascalCase` types/classes, `SCREAMING_SNAKE` constants

**Error Handling**:
- Rust: `Result<T, E>` everywhere, `thiserror` for libraries, `anyhow` for apps
- Python: Exceptions for exceptional cases, custom exception classes with context
- TypeScript: Discriminated unions for typed errors, exceptions for unexpected failures

**Module Organization**:
- All languages: Feature-based organization, clear layer separation
- Public API: Explicit exports (`pub`, `__all__`, `export`)
- Internal APIs: Private by default, expose only what's necessary

**Testing**:
- All languages: Unit tests for logic, integration tests for I/O, property tests for invariants
- Rust: `cargo test`, doctests for examples
- Python: `pytest`, doctests for examples
- TypeScript: `vitest`, type-level tests with `expectTypeOf`

**Documentation**:
- All languages: Doc comments for public APIs, comprehensive guides for architecture
- Rust: Rustdoc with `///` and runnable examples
- Python: Google-style docstrings with examples
- TypeScript: TSDoc with `@param`, `@returns`, `@throws`

---

## Language-Specific Guidelines

### Rust Elite Patterns

**Source:** `.research/rust-elite-patterns.md` (Rune's research from tokio, serde, clap, axum, polars)

**Naming Conventions:**
- Terse for ubiquitous types: `Tx`, `Rx`, `Ctx` (tokio pattern)
- Explicit for domain concepts: `UserRepository`, `AuthenticationError`
- Newtype pattern for type safety: `struct UserId(i64);`

**Error Handling:**
- Libraries: `thiserror` for typed errors with `#[error]` and `#[from]`
- Applications: `anyhow` for context chains with `.context()`
- Never use `unwrap()` in production code

**Trait Design:**
- Minimal bounds: `T: Clone + Send + 'static` (axum pattern)
- Associated types over generic parameters when single implementation expected
- Blanket implementations for ergonomics

**Module Organization:**
- `lib.rs` for public API re-exports only
- `pub(crate)` for internal APIs
- Feature-based organization for large projects (workspace with multiple crates)

**Performance:**
- Zero-cost abstractions: iterators over loops, generics over `dyn`
- `#[inline]` only after profiling shows benefit
- Avoid allocations in hot paths

**Documentation:**
- Rustdoc with runnable examples (doctests)
- `# Safety` sections for unsafe code
- `# Errors` and `# Panics` sections for fallible operations

**Key Takeaway:** Rust elite code uses the type system to make illegal states unrepresentable, minimizes allocations, and provides comprehensive documentation with verified examples.

---

### Python Elite Patterns

**Source:** `.research/python-elite-patterns.md` (Lyre's research from FastAPI, Pydantic, httpx, pytest, Rich, Typer)

**Naming Conventions:**
- Explicit by default: `user_repository`, `authentication_error`
- Descriptive TypeVars: `UserT = TypeVar('UserT', bound=User)`
- No Hungarian notation or type suffixes

**Type Hints Strategy:**
- Public APIs: Always typed with full annotations
- Internal functions: Type hints for clarity, inference for obvious cases
- Use `Protocol` for structural typing (duck typing with type safety)

**Abstraction Patterns:**
- Composition over inheritance
- Dependency injection via function parameters (FastAPI `Depends` pattern)
- Pydantic models for validation at boundaries

**Error Handling:**
- Custom exception classes with context
- Raise specific exceptions, catch at boundaries
- Use context managers for resource cleanup

**Module Organization:**
- `src/` layout for packages
- `__all__` for explicit exports
- Feature-based organization with clear layer separation

**Documentation:**
- Google-style docstrings with examples
- Type hints reduce need for parameter documentation
- Doctests for verified examples

**Testing:**
- pytest with fixtures for dependency injection
- Parametrized tests for multiple scenarios
- Async tests with pytest-asyncio

**Key Takeaway:** Python elite code uses type hints and Pydantic for runtime validation, explicit dependency injection, and comprehensive testing with pytest.

---

### TypeScript Elite Patterns

**Source:** `typescript-elite-patterns.md` (Elise's research from Vite, Vitest, Zod, tRPC, Prisma, TypeScript compiler)

**Naming Conventions:**
- PascalCase for types/interfaces/classes
- camelCase for functions/variables
- Descriptive generic parameters: `TUser extends User`

**Type System Patterns:**
- Discriminated unions for domain modeling
- Template literal types for type-safe strings
- `satisfies` operator for constraint validation (TS 5.0+)
- Const assertions for literal types

**Abstraction Patterns:**
- Interface composition over inheritance
- Generic constraints with `extends`
- Builder pattern with fluent APIs

**Error Handling:**
- Discriminated unions for typed errors
- Result types for expected failures
- Exceptions for unexpected failures

**Module Organization:**
- Barrel exports (`index.ts`) for public API
- Feature-based organization
- Clear separation of types, implementation, and tests

**Documentation:**
- TSDoc with `@param`, `@returns`, `@throws`
- Type-checked examples in doc comments
- Comprehensive README with usage examples

**Testing:**
- Vitest for unit and integration tests
- Type-level tests with `expectTypeOf`
- Mock implementations with `vi.fn()`

**Key Takeaway:** TypeScript elite code leverages the type system for compile-time safety, uses discriminated unions for domain modeling, and provides type-safe APIs with minimal runtime overhead.

---

## Research Findings

### Elite Project Analysis

**Rust Projects Analyzed:**
- **tokio**: Async runtime with minimal trait bounds, zero-cost abstractions
- **serde**: Serialization framework with trait-based design, compile-time optimization
- **clap**: CLI parser with builder pattern, type-state machines
- **axum**: Web framework with composable middleware, type-safe routing
- **polars**: DataFrame library with zero-copy operations, Apache Arrow integration

**Python Projects Analyzed:**
- **FastAPI**: Web framework with dependency injection, automatic OpenAPI generation
- **Pydantic**: Data validation with runtime type checking, model composition
- **httpx**: HTTP client with async support, connection pooling
- **pytest**: Testing framework with fixtures, parametrization
- **Rich**: Terminal formatting with composable renderables
- **Typer**: CLI framework with type hints, automatic help generation

**TypeScript Projects Analyzed:**
- **TypeScript Compiler**: Self-hosting compiler with advanced type inference
- **Vite**: Build tool with plugin architecture, HMR
- **Vitest**: Test framework with type-level testing
- **Zod**: Schema validation with type inference
- **tRPC**: Type-safe RPC without code generation
- **Prisma**: Database ORM with type-safe queries

**Common Patterns Across Elite Projects:**
1. **Type-driven design**: Use type systems to prevent errors at compile time
2. **Minimal abstractions**: Only abstract when pattern repeats 3+ times
3. **Composition over inheritance**: Prefer traits/protocols/interfaces
4. **Explicit dependencies**: Dependency injection over global state
5. **Comprehensive testing**: Unit, integration, and property-based tests
6. **Self-documenting code**: Types and names convey intent, comments for non-obvious logic
7. **Performance by default**: Zero-copy operations, lazy evaluation, efficient algorithms

---

### AI Anti-Pattern Catalog

**Source:** `AI_CODE_ANTIPATTERNS.md` (Kael's comprehensive analysis)

**Category 1: Excessive Verbosity**
- Redundant type annotations: `let user: User = User::new()` → `let user = User::new()`
- Unnecessary intermediate variables: 5 variables for 1 calculation
- Over-explained logic: 3-line comment for 1-line code

**Category 2: Over-Abstraction**
- Premature generics: `class Repository<T, ID>` for single use case
- Unnecessary interfaces: `IUserService` with single implementation
- Abstract factories: `UserServiceFactory.create()` when `UserService::new()` suffices

**Category 3: Defensive Programming**
- Excessive null checks: `if (x) { if (x.y) { if (x.y.z) { ... }}}`
- Try-catch everything: Wrapping every function call
- Redundant validations: Checking same condition multiple times

**Category 4: Generic Naming**
- Manager/Handler/Service suffixes without context
- `data`, `info`, `item` without domain meaning
- `process()`, `handle()`, `execute()` without specificity

**Category 5: Comment Patterns**
- Restating code: `// Increment counter` above `counter += 1`
- Obvious explanations: `// Returns a string` for `fn name() -> String`
- Section headers: `// ========== SECTION ==========`
- Placeholder TODOs: `// TODO: fix this` without context

**Category 6: Structural Tells**
- Uniform indentation: Every block exactly 4 spaces, no variation
- Mechanical error handling: Same try-catch pattern everywhere
- Template-like structure: Identical file organization across unrelated modules
- Excessive symmetry: Every function has same structure (validate → process → return)

**Detection Heuristic:**
```
AI_SCORE = (
    verbosity_score * 0.25 +
    abstraction_score * 0.20 +
    defensive_score * 0.15 +
    naming_score * 0.20 +
    comment_score * 0.15 +
    structure_score * 0.05
)

if AI_SCORE > 0.6: FLAG_AS_AI_GENERATED
```

**Refactoring Guide:**
1. Remove redundant type annotations (let inference work)
2. Inline unnecessary intermediate variables
3. Delete comments that restate code
4. Replace generic names with domain-specific terms
5. Remove premature abstractions (wait for 3rd use case)
6. Simplify defensive checks (validate at boundaries only)
7. Add intentional asymmetry (different problems need different solutions)

---

### PyO3 Integration Patterns

**Source:** `.research/pyo3-integration-research.md` (Comprehensive FFI guide)

**Project Structure:**
- Three-layer architecture: Python API → PyO3 bindings → Pure Rust core
- Separate crates: `core/` (pure Rust), `bindings/` (PyO3), `python/` (Python wrappers)

**Performance Optimization:**
- GIL management: `py.allow_threads()` for CPU-intensive operations
- Zero-copy patterns: `PyBytes`, `PyReadonlyArray`, buffer protocol
- Avoid allocations: Borrow instead of clone when possible

**Error Handling:**
- Convert Rust errors to Python exceptions: `impl From<MyError> for PyErr`
- Use `thiserror` for Rust error types
- Provide context in error messages

**Testing Strategy:**
- Rust unit tests: Test pure Rust logic (no Python runtime)
- Rust integration tests: Test PyO3 bindings with `pyo3::prepare_freethreaded_python()`
- Python integration tests: Test Python API with pytest
- Property-based tests: Use Hypothesis for FFI invariant validation

**Production Examples:**
- **Polars**: 10-100x faster than Pandas, Apache Arrow integration
- **Ruff**: 10-100x faster than Flake8, minimal Python layer
- **Pydantic-core**: 5-50x faster than Pydantic v1, schema-based validation
- **Cryptography**: Memory-safe crypto primitives, OpenSSL bindings

**Key Takeaway:** PyO3 enables near-native performance in Python by keeping the Python layer thin and doing heavy lifting in Rust with proper GIL management.

---

## Next Steps

1. ✅ Deploy research agents
2. ✅ Collect research findings
3. ✅ Synthesize cross-language patterns
4. ✅ Formalize Violet coding philosophy
5. ✅ Create language-specific guidelines
6. ⏳ Validate against existing codebase
7. ⏳ Generate refactoring recommendations

---

## Validation Checklist (Phase 3)

### Lylacore Rust Codebase
- [ ] `soul-crypto/src/lib.rs` — Check naming, error handling, documentation
- [ ] `coach-engine/src/lib.rs` — Check abstraction patterns, module organization
- [ ] `napi-bindings/src/lib.rs` — Check FFI patterns, error conversion
- [ ] `pyo3-bindings/src/lib.rs` — Check GIL management, zero-copy patterns

### VioletCore Python Codebase
- [ ] `violet_core/mind_loader.py` — Check type hints, error handling
- [ ] `violet_core/soul_package.py` — Check abstraction patterns, documentation
- [ ] `violet_core/coach_adapter.py` — Check module organization, testing

### Lavender Python Codebase
- [ ] `lavender/memory_store.py` — Check async patterns, error handling
- [ ] `lavender/entity_graph.py` — Check type hints, documentation
- [ ] `lavender/mcp_server.py` — Check module organization, testing

### Cross-Language Consistency
- [ ] Naming conventions consistent across Rust/Python/TypeScript
- [ ] Error handling patterns aligned with language idioms
- [ ] Documentation style consistent (rustdoc/docstrings/TSDoc)
- [ ] Testing patterns aligned (unit/integration/property tests)

### AI Anti-Pattern Detection
- [ ] No excessive verbosity (redundant types, intermediate variables)
- [ ] No over-abstraction (premature generics, unnecessary interfaces)
- [ ] No defensive programming (excessive null checks, try-catch everything)
- [ ] No generic naming (Manager/Handler/Service without context)
- [ ] No comment patterns (section headers, restating code)
- [ ] No structural tells (uniform indentation, mechanical error handling)

---

## Refactoring Recommendations (To Be Generated)

### High Priority
- TBD after validation

### Medium Priority
- TBD after validation

### Low Priority (Nice to Have)
- TBD after validation

---

*Last Updated: 2026-03-18*
*Status: Phase 2 Complete — Ready for Validation*
