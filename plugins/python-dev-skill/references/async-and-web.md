# Async Patterns & Web Frameworks
# 异步模式与Web框架

---

## 1. Async Fundamentals — 异步基础

### When Async Wins

```
async shines at:                    sync is fine for:
├── Database queries                ├── CPU-bound computation
├── HTTP API calls                  ├── Simple scripts
├── File I/O                        ├── Legacy codebases
├── WebSocket connections           ├── Blocking-only libraries
└── Concurrent request handling     └── Quick prototypes
```

### Core Patterns

```python
import asyncio
import httpx

# Concurrent I/O — the whole point of async
async def fetch_all(urls: list[str]) -> list[dict]:
    async with httpx.AsyncClient() as client:
        tasks = [client.get(url) for url in urls]
        responses = await asyncio.gather(*tasks)
        return [r.json() for r in responses]

# Streaming — memory-efficient large data
from collections.abc import AsyncIterator
import aiofiles

async def stream_file(path: str) -> AsyncIterator[bytes]:
    async with aiofiles.open(path, "rb") as f:
        async for chunk in f:
            yield chunk

# Context manager — resource lifecycle
from contextlib import asynccontextmanager

@asynccontextmanager
async def get_db_session():
    session = AsyncSession(engine)
    try:
        yield session
        await session.commit()
    except Exception:
        await session.rollback()
        raise
    finally:
        await session.close()
```

### Async Library Map

| Need | Library | Notes |
|------|---------|-------|
| HTTP client | `httpx` | Drop-in requests replacement, async native |
| PostgreSQL | `asyncpg` | Fastest async PG driver |
| MySQL | `aiomysql` | Async MySQL |
| Redis | `redis` (async) | Built-in async support since v4.2 |
| File I/O | `aiofiles` | Async file operations |
| ORM | SQLAlchemy 2.0+ | Full async session support |
| MongoDB | `motor` / `beanie` | Async MongoDB ODM |

### The Golden Rules

```
1. Never call sync I/O inside async functions
   → Use run_in_executor() for unavoidable sync libs

2. Never use asyncio.sleep() as a retry mechanism
   → Use tenacity with async support

3. Always use async context managers for resources
   → async with httpx.AsyncClient() as client:

4. Gather for concurrent tasks, not sequential awaits
   → results = await asyncio.gather(*tasks)
   → NOT: for t in tasks: await t
```

---

## 2. FastAPI — Production Patterns

### Application Structure

```python
# main.py — thin, just wiring
from contextlib import asynccontextmanager
from fastapi import FastAPI

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: init DB pool, cache, etc.
    await init_db()
    yield
    # Shutdown: cleanup
    await close_db()

app = FastAPI(
    title="My API",
    version="1.0.0",
    lifespan=lifespan,
)

# Mount routers
from .api import users, orders
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(orders.router, prefix="/orders", tags=["orders"])
```

### Pydantic Models — API Contracts

```python
from pydantic import BaseModel, Field, EmailStr
from datetime import datetime

# Input model — what clients send
class UserCreate(BaseModel):
    email: EmailStr
    name: str = Field(min_length=1, max_length=100)
    role: str = "member"

# Output model — what clients receive
class UserResponse(BaseModel):
    id: int
    email: str
    name: str
    created_at: datetime

    model_config = {"from_attributes": True}  # ORM mode

# Update model — partial updates
class UserUpdate(BaseModel):
    name: str | None = None
    role: str | None = None
```

### Dependency Injection

```python
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

# DB session dependency with cleanup
async def get_db() -> AsyncIterator[AsyncSession]:
    async with AsyncSession(engine) as session:
        yield session

# Auth dependency
async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db),
) -> User:
    payload = decode_jwt(token)
    user = await db.get(User, payload["sub"])
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")
    return user

# Role-based access
def require_role(role: str):
    async def check(user: User = Depends(get_current_user)) -> User:
        if user.role != role:
            raise HTTPException(status_code=403, detail="Insufficient permissions")
        return user
    return check

# Usage in routes
@router.get("/admin")
async def admin_panel(user: User = Depends(require_role("admin"))):
    ...
```

### Route Patterns

```python
from fastapi import APIRouter, HTTPException, Query, Path

router = APIRouter()

@router.get("/", response_model=list[UserResponse])
async def list_users(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
) -> list[UserResponse]:
    result = await db.execute(
        select(User).offset(skip).limit(limit)
    )
    return result.scalars().all()

@router.get("/{user_id}", response_model=UserResponse)
async def get_user(
    user_id: int = Path(gt=0),
    db: AsyncSession = Depends(get_db),
) -> UserResponse:
    user = await db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/", response_model=UserResponse, status_code=201)
async def create_user(
    data: UserCreate,
    db: AsyncSession = Depends(get_db),
) -> UserResponse:
    user = User(**data.model_dump())
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user
```

### async def vs def in FastAPI

```
async def → runs on event loop, use for async I/O
def       → runs in threadpool, use for sync/blocking code

FastAPI handles both correctly. Choose based on what the handler does.
```

### Error Handling

```python
# Domain exceptions
class AppError(Exception):
    def __init__(self, code: str, message: str, status: int = 400):
        self.code = code
        self.message = message
        self.status = status

class NotFoundError(AppError):
    def __init__(self, resource: str, id: int):
        super().__init__(
            code="NOT_FOUND",
            message=f"{resource} {id} not found",
            status=404,
        )

# Global handler
@app.exception_handler(AppError)
async def handle_app_error(request, exc: AppError):
    return JSONResponse(
        status_code=exc.status,
        content={"error": exc.code, "message": exc.message},
    )
```

### Authentication — JWT + OAuth2

```python
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from datetime import datetime, timedelta

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

def create_access_token(user_id: int, expires_delta: timedelta = timedelta(hours=1)) -> str:
    payload = {
        "sub": str(user_id),
        "exp": datetime.utcnow() + expires_delta,
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

def decode_jwt(token: str) -> dict:
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
```

### WebSocket

```python
from fastapi import WebSocket, WebSocketDisconnect

class ConnectionManager:
    def __init__(self):
        self.connections: list[WebSocket] = []

    async def connect(self, ws: WebSocket):
        await ws.accept()
        self.connections.append(ws)

    def disconnect(self, ws: WebSocket):
        self.connections.remove(ws)

    async def broadcast(self, message: str):
        for conn in self.connections:
            await conn.send_text(message)

manager = ConnectionManager()

@app.websocket("/ws")
async def websocket_endpoint(ws: WebSocket):
    await manager.connect(ws)
    try:
        while True:
            data = await ws.receive_text()
            await manager.broadcast(data)
    except WebSocketDisconnect:
        manager.disconnect(ws)
```

### Configuration with Pydantic Settings

```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str
    redis_url: str = "redis://localhost:6379"
    secret_key: str
    debug: bool = False

    model_config = {"env_file": ".env"}

settings = Settings()
```

### Background Tasks

```python
from fastapi import BackgroundTasks

# Simple — in-process, fire-and-forget
@router.post("/notify")
async def send_notification(
    data: NotifyRequest,
    background: BackgroundTasks,
):
    background.add_task(send_email, data.email, data.message)
    return {"status": "queued"}

# For persistent/distributed tasks → Celery or ARQ
# BackgroundTasks: quick, no persistence, same process
# Celery/ARQ: long-running, retry logic, distributed workers
```

---

## 3. SQLAlchemy 2.0 Async — Database Layer

```python
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

engine = create_async_engine("postgresql+asyncpg://user:pass@localhost/db")

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(unique=True)
    name: Mapped[str]

# Queries
async def get_users(db: AsyncSession) -> list[User]:
    result = await db.execute(
        select(User)
        .where(User.active == True)
        .options(selectinload(User.orders))  # prevent N+1
        .limit(20)
    )
    return result.scalars().all()
```

**N+1 prevention:**
- `selectinload()` for collections (M2M, one-to-many)
- `joinedload()` for single relations (FK)
- `.only()` to select specific columns

---

## 4. Django Patterns (5.0+)

### Async Views

```python
# Django supports async views natively
async def user_list(request):
    users = [u async for u in User.objects.all()]
    return JsonResponse({"users": users})
```

### Best Practices

```
Models:
├── Fat models, thin views
├── Custom managers for common queries
├── Abstract base classes for shared fields

Queries:
├── select_related() for FK joins
├── prefetch_related() for M2M
├── .only() for specific fields
├── Avoid N+1 — always

Views:
├── Class-based for complex CRUD
├── Function-based for simple endpoints
├── DRF ViewSets for API
```

### When Django over FastAPI

```
Choose Django when:
├── Need admin interface (built-in)
├── Full-stack with templates
├── Existing Django codebase
├── Team knows Django well
└── Need batteries-included (auth, ORM, admin, forms)

Choose FastAPI when:
├── API-only service
├── Async-first architecture
├── Microservices
├── Need maximum performance
└── Modern Python patterns (Pydantic, type hints)
```

---

## 5. Deployment — 部署

### Uvicorn + Gunicorn (production)

```bash
# Development
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Production
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Docker

```dockerfile
FROM python:3.12-slim
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

WORKDIR /app
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev

COPY . .
CMD ["uv", "run", "gunicorn", "app.main:app", "-w", "4", "-k", "uvicorn.workers.UvicornWorker"]
```

### Observability

```python
# Structured logging — use structlog or loguru
import structlog

logger = structlog.get_logger()
logger.info("user_created", user_id=42, email="a@b.com")

# Health check endpoint
@app.get("/health")
async def health():
    return {"status": "ok"}

# Request ID tracking via middleware
```

---

## 6. API Design Checklist

```
□ Pydantic models for all request/response bodies
□ Proper HTTP status codes (201 for create, 204 for delete)
□ Pagination for list endpoints (offset/limit or cursor)
□ Consistent error response format {error, message, details}
□ Input validation via Pydantic (not manual checks)
□ Auth on all non-public endpoints
□ Rate limiting for public APIs
□ CORS configured for frontend origins
□ OpenAPI docs auto-generated (FastAPI default)
□ Versioning strategy (URL prefix or header)
```
