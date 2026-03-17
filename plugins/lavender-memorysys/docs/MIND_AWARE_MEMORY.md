# Authors: Joysusy & Violet Klaudia 💖
# Mind-Aware Memory — Usage Guide

**Version:** 0.1.0
**Audience:** Developers integrating VioletCore with Lavender
**Prerequisites**: VioletCore installed, Lavender-MemorySys configured

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Core Concepts](#core-concepts)
3. [Usage Examples](#usage-examples)
4. [Advanced Patterns](#advanced-patterns)
5. [Best Practices](#best-practices)
6. [API Reference](#api-reference)

---

## Quick Start

### Installation

```bash
# Ensure VioletCore and Lavender are in the same plugin marketplace
cd plugins/marketplaces/violet-plugin-place/plugins/

# Verify structure
ls violet-core/adapters/lavender-hooks.js
ls lavender-memorysys/src/integrations/violet_bridge.py
```

### Basic Setup

```python
from pathlib import Path
from storage.sqlite_store import SQLiteStore
from memory.manager import MemoryManager
from integrations.violet_hooks import VioletHooks

# Initialize storage
db_path = Path("~/.violet/lavender.db").expanduser()
store = SQLiteStore(db_path)
await store.initialize()

# Create manager with VioletCore hooks
hooks = VioletHooks()
manager = MemoryManager(store, violet_hooks=hooks)

# Initialize Mind events tracking
await manager.initialize_mind_events()

# Verify integration
print(f"VioletCore available: {hooks.is_available()}")
```

### First Mind-Aware Memory

```python
# Store a memory with Mind context
memory_id = await manager.store(
    title="Authentication Bug Fix",
    content="Fixed JWT token validation in login endpoint",
    category="bugfix",
    project="violet",
    tags=["security", "authentication"],
    importance=8,
    mind_active="Kael",  # Security Specialist Mind
    interaction={
        "userMessage": "Fix the auth bug",
        "agentResponse": "Fixed! (◕‿◕✿)",
        "context": {
            "mood": "focused",
            "topic": "security"
        }
    }
)

print(f"Stored: {memory_id}")
```

### Search with Mind Context

```python
# Search with active Mind context
results = await manager.search(
    query="authentication",
    limit=10,
    context={
        "mood": "focused",
        "topic": "security",
        "activeMinds": [
            {"name": "Kael", "symbol": "🛡️", "role": "Security Specialist"}
        ]
    }
)

for mem in results:
    print(f"{mem['title']} (Mind: {mem.get('mind_active', 'N/A')})")
```

---

## Core Concepts

### 1. Mind Context

**Definition**: Metadata about which Violet Minds are active during memory operations.

**Structure**:
```python
mind_context = {
    "activeMinds": [
        {
            "name": "Kael",           # Mind name
            "symbol": "🛡️",           # Visual symbol
            "role": "Security Specialist",  # Primary role
            "weight": 1.5             # Relevance weight (optional)
        }
    ],
    "coordinationPattern": "solo",    # solo | collaborative | parallel
    "mood": "focused",                # Current emotional context
    "topic": "security"               # Current topic
}
```

### 2. Style Metadata

**Definition**: COACH-learned communication style attached to memories.

**Structure**:
```python
style_metadata = {
    "communicationStyle": "technical",  # technical | casual | formal
    "emotionalTone": "focused",         # focused | playful | serious
    "languagePreference": "en",         # en | zh | bilingual
    "formality": "mixed",               # formal | casual | mixed
    "technicalDepth": "deep"            # shallow | medium | deep
}
```

### 3. Identity Weights

**Definition**: Numerical weights determining memory relevance to active Minds.

**Calculation**:
```javascript
weight = baseWeight + interactionBoost + roleRelevance

// Example:
// Kael has interacted 10 times → interactionBoost = 1.0
// Role matches "security" topic → roleRelevance = 1.5
// Total weight = 1.0 + 1.0 + 1.5 = 3.5
```

### 4. Mind Events

**Definition**: Tracked events for Mind activation, coordination, and clashes.

**Event Types**:
- `activation`: Mind becomes active
- `coordination`: Multiple Minds work together
- `clash`: Two Minds conflict, Soul arbitrates

---

## Usage Examples

### Example 1: Single Mind Storage

```python
# Kael (Security Specialist) fixes a vulnerability
memory_id = await manager.store(
    title="SQL Injection Vulnerability Fixed",
    content="Sanitized user input in search endpoint using parameterized queries",
    category="security",
    project="violet",
    tags=["security", "sql", "vulnerability"],
    importance=9,
    mind_active="Kael",
    interaction={
        "userMessage": "There's a SQL injection risk in the search",
        "agentResponse": "Fixed with parameterized queries! (๑•̀ㅂ•́)و✧",
        "context": {
            "mood": "alert",
            "topic": "security"
        }
    }
)
```

### Example 2: Multi-Mind Collaboration

```python
# Selene (Integration) + Vera (Data) collaborate on API design
memory_id = await manager.store(
    title="REST API Design for Memory Export",
    content="Designed /api/v1/memories/export endpoint with pagination and filtering",
    category="design",
    project="lavender",
    tags=["api", "rest", "export"],
    importance=7,
    mind_active="Selene",  # Primary Mind
    interaction={
        "userMessage": "Design an export API",
        "agentResponse": "Designed with Vera's input on data formats (◕‿◕✿)",
        "context": {
            "mood": "collaborative",
            "topic": "api-design",
            "activeMinds": [
                {"name": "Selene", "symbol": "🌙", "role": "Integration Architect"},
                {"name": "Vera", "symbol": "📊", "role": "Data Specialist"}
            ],
            "coordinationPattern": "collaborative"
        }
    }
)

# Track coordination event
await manager.track_mind_coordination(
    minds=[
        {"name": "Selene", "symbol": "🌙", "role": "Integration Architect"},
        {"name": "Vera", "symbol": "📊", "role": "Data Specialist"}
    ],
    pattern="collaborative",
    context={"task": "API design", "outcome": "success"}
)
```

### Example 3: Mind-Filtered Search

```python
# Search for Kael's security-related memories
results = await manager.hybrid_search(
    query="vulnerability authentication",
    limit=10,
    category="security",
    min_importance=7,
    context={
        "activeMinds": [
            {"name": "Kael", "symbol": "🛡️", "role": "Security Specialist", "weight": 2.0}
        ],
        "mood": "focused",
        "topic": "security"
    }
)

for result in results:
    print(f"[{result.score:.3f}] {result.title}")
    print(f"  Mind: {result.memory.get('mind_active')}")
    print(f"  Sources: {', '.join(result.sources)}")
    print()
```

### Example 4: Mind Activation Tracking

```python
# Track when Kael activates for security review
event_id = await manager.track_mind_activation(
    active_minds=[
        {"name": "Kael", "symbol": "🛡️", "role": "Security Specialist"}
    ],
    context={
        "trigger": "security_review_requested",
        "project": "violet",
        "severity": "high"
    }
)

# Later: Retrieve activation history
history = await manager.get_mind_activation_history(
    mind_name="Kael",
    limit=20
)

for event in history:
    print(f"{event['created_at']}: {event['mind_name']} activated")
    print(f"  Context: {event['context']}")
```

### Example 5: Mind Clash Resolution

```python
# Kael (Security) vs Faye (UX) clash on authentication flow
event_id = await manager.track_mind_clash(
    mind_a={"name": "Kael", "symbol": "🛡️", "role": "Security Specialist"},
    mind_b={"name": "Faye", "symbol": "🔮", "role": "UX Designer"},
    resolution={
        "name": "Kael",
        "strategy": "soul_arbitration",
        "reason": "Security takes precedence for authentication",
        "compromise": "Faye's UX suggestions applied to non-critical flows"
    }
)

# Retrieve clash history
clashes = await manager.get_mind_clash_history(limit=10)
for clash in clashes:
    minds = json.loads(clash['minds_involved'])
    resolution = json.loads(clash['clash_resolution'])
    print(f"{minds[0]} vs {minds[1]} → Winner: {resolution['name']}")
```

### Example 6: Context Pack for Prompt Injection

```python
# Pack relevant memories into token budget for LLM context
pack = await manager.context_pack(
    query="authentication security best practices",
    token_budget=4000,
    category="security",
    min_importance=7,
    tags=["authentication", "security"]
)

print(f"Packed {pack['memories_packed']} memories")
print(f"Token usage: {pack['tokens_used']}/{pack['token_budget']}")

# Inject into LLM prompt
context_text = "\n\n".join([
    f"## {mem['title']}\n{mem['content']}"
    for mem in pack['memories']
])

prompt = f"""You are Kael, Violet's Security Specialist.

Relevant memories:
{context_text}

User question: How should we implement 2FA?
"""
```

---

## Advanced Patterns

### Pattern 1: Dynamic Mind Selection

```python
def select_minds_for_task(task_type: str, context: dict) -> list[dict]:
    """Dynamically select Minds based on task type."""
    mind_map = {
        "security": [{"name": "Kael", "symbol": "🛡️", "role": "Security Specialist"}],
        "integration": [{"name": "Selene", "symbol": "🌙", "role": "Integration Architect"}],
        "data": [{"name": "Vera", "symbol": "📊", "role": "Data Specialist"}],
        "ux": [{"name": "Faye", "symbol": "🔮", "role": "UX Designer"}],
    }

    minds = mind_map.get(task_type, [])

    # Add weight based on recent interactions
    for mind in minds:
        stats = await manager.get_mind_stats(mind["name"])
        mind["weight"] = 1.0 + (stats["activations"] * 0.1)

    return minds

# Usage
minds = select_minds_for_task("security", {"severity": "high"})
results = await manager.search("vulnerability", context={"activeMinds": minds})
```

### Pattern 2: Mind Preference Learning

```python
async def learn_mind_preferences(mind_name: str, interaction: dict):
    """Learn and update Mind preferences from interactions."""
    # Extract kaomoji used
    kaomoji = extract_kaomoji(interaction["agentResponse"])

    # Update style metadata
    style_metadata = {
        "communicationStyle": detect_style(interaction["agentResponse"]),
        "emotionalTone": detect_tone(interaction["agentResponse"]),
        "violetExtensions": {
            "mindPreferences": {
                mind_name: {
                    "interactionCount": await get_interaction_count(mind_name) + 1,
                    "preferredKaomoji": kaomoji,
                    "topicAffinity": interaction["context"].get("topic")
                }
            }
        }
    }

    return style_metadata

# Usage
interaction = {
    "userMessage": "Fix the bug",
    "agentResponse": "Fixed! (◕‿◕✿)",
    "context": {"mood": "focused", "topic": "bugfix"}
}

style_meta = await learn_mind_preferences("Kael", interaction)
await manager.store(
    title="Bug Fix",
    content="...",
    mind_active="Kael",
    interaction=interaction
)
```

### Pattern 3: Mind Coordination Patterns

```python
async def detect_coordination_pattern(active_minds: list[dict]) -> str:
    """Detect coordination pattern from active Minds."""
    if len(active_minds) == 1:
        return "solo"

    # Check if Minds have complementary roles
    roles = [m["role"] for m in active_minds]

    if "Security Specialist" in roles and "Integration Architect" in roles:
        return "security-integration"
    elif "Data Specialist" in roles and "UX Designer" in roles:
        return "data-ux"
    else:
        return "collaborative"

# Usage
minds = [
    {"name": "Kael", "role": "Security Specialist"},
    {"name": "Selene", "role": "Integration Architect"}
]

pattern = await detect_coordination_pattern(minds)
await manager.track_mind_coordination(minds, pattern, context={})
```

### Pattern 4: Identity-Weighted Hybrid Search

```python
async def smart_search(query: str, task_context: dict) -> list:
    """Search with automatic Mind selection and weighting."""
    # Select Minds based on task
    minds = select_minds_for_task(task_context["type"], task_context)

    # Create identity weights
    weights = {
        "bm25": 1.0,      # Text relevance
        "vector": 1.2,    # Semantic similarity
        "metadata": 0.8,  # Importance/category
        "mind": 2.0       # Mind relevance (highest weight)
    }

    # Search with Mind context
    results = await manager.hybrid_search(
        query=query,
        limit=20,
        context={
            "activeMinds": minds,
            "channelWeights": weights,
            "mood": task_context.get("mood", "neutral"),
            "topic": task_context.get("topic")
        }
    )

    return results

# Usage
results = await smart_search(
    "authentication vulnerability",
    {"type": "security", "mood": "alert", "topic": "security"}
)
```

---

## Best Practices

### 1. Always Provide Mind Context

```python
# ❌ Bad: No Mind context
await manager.store(title="Bug Fix", content="Fixed it")

# ✅ Good: Full Mind context
await manager.store(
    title="Bug Fix",
    content="Fixed authentication timeout",
    mind_active="Kael",
    interaction={
        "userMessage": "Fix the timeout",
        "agentResponse": "Fixed! (◕‿◕✿)",
        "context": {"mood": "focused", "topic": "bugfix"}
    }
)
```

### 2. Use Hybrid Search for Complex Queries

```python
# ❌ Bad: Simple search (BM25 only)
results = await manager.search("authentication")

# ✅ Good: Hybrid search (BM25 + Vector + Metadata + Mind)
results = await manager.hybrid_search(
    query="authentication",
    category="security",
    min_importance=7,
    context={"activeMinds": [{"name": "Kael"}]}
)
```

### 3. Track Mind Events for Learning

```python
# ✅ Always track activation
await manager.track_mind_activation(active_minds, context)

# ✅ Track coordination for multi-Mind tasks
await manager.track_mind_coordination(minds, pattern, context)

# ✅ Track clashes for conflict resolution learning
await manager.track_mind_clash(mind_a, mind_b, resolution)
```

### 4. Use Context Packs for LLM Injection

```python
# ✅ Pack memories within token budget
pack = await manager.context_pack(
    query="relevant topic",
    token_budget=4000,
    min_importance=7
)

# Inject into prompt
context = "\n\n".join([f"## {m['title']}\n{m['content']}" for m in pack['memories']])
```

### 5. Handle Graceful Degradation

```python
# ✅ Check if VioletCore is available
if hooks.is_available():
    # Use Mind-aware features
    enhanced = hooks.before_search(query, context)
else:
    # Fall back to standard search
    enhanced = {"query": query, "context": context}
```

---

## API Reference

### MemoryManager

#### `store(title, content, ..., mind_active, interaction)`

Store a memory with Mind context.

**Parameters**:
- `title` (str): Memory title
- `content` (str): Memory content
- `category` (str): Category (default: "discovery")
- `project` (str): Project name (default: "violet")
- `tags` (list[str]): Tags
- `importance` (int): 1-10 importance score
- `mind_active` (str): Active Mind name
- `interaction` (dict): User-agent interaction with context

**Returns**: `str` — Memory ID

#### `search(query, limit, context)`

Search memories with Mind context.

**Parameters**:
- `query` (str): Search query
- `limit` (int): Max results (default: 20)
- `project` (str): Filter by project
- `context` (dict): Mind context with activeMinds

**Returns**: `list[dict]` — Matching memories

#### `hybrid_search(query, limit, context, ...)`

Hybrid search with BM25 + Vector + Metadata + Mind channels.

**Parameters**:
- `query` (str): Search query
- `limit` (int): Max results (default: 10)
- `project` (str): Filter by project
- `category` (str): Filter by category
- `memory_type` (str): Filter by type
- `min_importance` (int): Minimum importance
- `tags` (list[str]): Filter by tags
- `context` (dict): Mind context with activeMinds and channelWeights

**Returns**: `list[SearchResult]` — Ranked results with scores

#### `track_mind_activation(active_minds, context)`

Track Mind activation event.

**Parameters**:
- `active_minds` (list[dict]): Active Mind objects
- `context` (dict): Activation context

**Returns**: `str` — Event ID

#### `track_mind_coordination(minds, pattern, context)`

Track Mind coordination pattern.

**Parameters**:
- `minds` (list[dict]): Coordinating Minds
- `pattern` (str): Coordination pattern
- `context` (dict): Coordination context

**Returns**: `str` — Event ID

#### `track_mind_clash(mind_a, mind_b, resolution)`

Track Mind clash resolution.

**Parameters**:
- `mind_a` (dict): First Mind
- `mind_b` (dict): Second Mind
- `resolution` (dict): Resolution details

**Returns**: `str` — Event ID

#### `get_mind_activation_history(mind_name, limit)`

Retrieve Mind activation history.

**Parameters**:
- `mind_name` (str): Mind name (optional)
- `limit` (int): Max results (default: 50)

**Returns**: `list[dict]` — Activation events

#### `get_mind_stats(mind_name)`

Get statistics for a specific Mind.

**Parameters**:
- `mind_name` (str): Mind name

**Returns**: `dict` — Stats with activations, coordinations, clashes

---

## 中文使用指南 (Chinese Usage Guide)

### 快速开始

```python
# 初始化 Mind-aware 记忆管理器
from memory.manager import MemoryManager
from integrations.violet_hooks import VioletHooks

hooks = VioletHooks()
manager = MemoryManager(store, violet_hooks=hooks)
await manager.initialize_mind_events()

# 存储带 Mind 上下文的记忆
memory_id = await manager.store(
    title="认证漏洞修复",
    content="修复了登录端点的 JWT 令牌验证",
    category="security",
    mind_active="Kael",  # 安全专家 Mind
    interaction={
        "userMessage": "修复认证漏洞",
        "agentResponse": "已修复！(◕‿◕✿)",
        "context": {"mood": "focused", "topic": "security"}
    }
)

# 使用 Mind 上下文搜索
results = await manager.search(
    query="认证",
    context={
        "activeMinds": [{"name": "Kael", "symbol": "🛡️"}]
    }
)
```

### 核心概念

1. **Mind 上下文**：记录哪些 Violet Mind 在记忆操作时处于活跃状态
2. **风格元数据**：COACH 学习的沟通风格，附加到记忆中
3. **身份权重**：根据活跃 Mind 计算记忆相关性的数值权重
4. **Mind 事件**：追踪 Mind 激活、协作和冲突事件

### 最佳实践

1. 始终提供 Mind 上下文
2. 使用混合搜索处理复杂查询
3. 追踪 Mind 事件以支持学习
4. 使用 context_pack 进行 LLM 提示注入
5. 处理优雅降级（VioletCore 不可用时）

---

**Next Steps**: See [HOOKS_API.md](./HOOKS_API.md) for complete hook reference and [VIOLET_INTEGRATION.md](./VIOLET_INTEGRATION.md) for architecture details.