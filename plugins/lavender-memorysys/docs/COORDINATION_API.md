# Authors: Joysusy & Violet Klaudia 💖

# Coordination API Reference

Multi-Mind coordination features for synthesizing insights, linking memories, and analyzing collaboration patterns.

## Overview

The Coordination API enables:
- **Multi-Mind Synthesis**: Merge perspectives from multiple Minds with attribution
- **Semantic Linking**: Automatically discover and link related memories
- **Memory Graphs**: Traverse Mind-aware memory networks
- **Analytics**: Track and optimize Mind collaboration effectiveness

## Core Methods

### `synthesize_multi_mind_memory()`

Merge perspectives from multiple Minds into a unified synthesis memory.

**Signature**:
```python
async def synthesize_multi_mind_memory(
    source_memory_ids: list[str],
    active_minds: list[str],
    synthesis_content: str,
    title: str,
    category: str = "synthesis",
    project: str = "violet"
) -> str
```

**Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `source_memory_ids` | `list[str]` | Yes | IDs of source memories to synthesize |
| `active_minds` | `list[str]` | Yes | Names of Minds that participated (e.g., `["Vera", "Lyre"]`) |
| `synthesis_content` | `str` | Yes | Unified content with Mind attribution |
| `title` | `str` | Yes | Descriptive title for the synthesis |
| `category` | `str` | No | Memory category (default: `"synthesis"`) |
| `project` | `str` | No | Project scope (default: `"violet"`) |

**Returns**: `str` - ID of the created synthesis memory

**Example**:
```python
synthesis_id = await manager.synthesize_multi_mind_memory(
    source_memory_ids=["mem_abc123", "mem_def456"],
    active_minds=["Vera", "Lyre"],
    synthesis_content="🔮 Vera emphasized layered architecture, 🦢 Lyre added bilingual documentation standards",
    title="Architecture + Documentation Synthesis"
)
```

**Behavior**:
- Creates a new synthesis memory with `coordination_pattern="synthesis"`
- Automatically creates `synthesis` links from synthesis memory back to all source memories
- Stores Mind attribution in `mind_context` metadata
- Validates that all source memories exist before creating synthesis

**Errors**:
- `ValueError`: If `source_memory_ids` is empty
- `ValueError`: If `active_minds` is empty
- `ValueError`: If any source memory ID does not exist

---

### `link_related_memories()`

Automatically discover and create links between semantically related memories.

**Signature**:
```python
async def link_related_memories(
    memory_ids: list[str],
    min_strength: float = 0.3
) -> int
```

**Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `memory_ids` | `list[str]` | Yes | IDs of memories to analyze for linking |
| `min_strength` | `float` | No | Minimum similarity threshold (0.0-1.0, default: 0.3) |

**Returns**: `int` - Number of links created

**Example**:
```python
links_created = await manager.link_related_memories(
    memory_ids=["mem_abc123", "mem_def456", "mem_ghi789"],
    min_strength=0.3
)
print(f"Created {links_created} semantic links")
```

**Algorithm**:
1. For each pair of memories, extract tags
2. Calculate tag overlap: `strength = len(overlap) / max(len(tags_a), len(tags_b))`
3. If `strength >= min_strength`, create a `coordination` link
4. Store overlap count in link context metadata

**Behavior**:
- Only creates links between distinct memories (no self-links)
- Skips pairs that already have links
- Rounds strength scores to 2 decimal places
- Links are bidirectional (can be traversed in both directions)

**Errors**:
- `ValueError`: If any memory ID does not exist

---

### `get_mind_memory_graph()`

Traverse memory links to build a Mind-aware memory graph.

**Signature**:
```python
async def get_mind_memory_graph(
    memory_id: str,
    depth: int = 2
) -> dict
```

**Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `memory_id` | `str` | Yes | Starting memory ID for graph traversal |
| `depth` | `int` | No | Maximum traversal depth (default: 2) |

**Returns**: `dict` with structure:
```python
{
    "root": str,                    # Starting memory ID
    "nodes": dict[str, dict],       # Memory ID -> memory data
    "edges": list[dict],            # Link data with source/target/type/strength
    "minds_involved": list[str],    # Sorted list of Mind names
    "depth": int,                   # Requested depth
    "total_nodes": int,             # Number of memories in graph
    "total_edges": int              # Number of links in graph
}
```

**Example**:
```python
graph = await manager.get_mind_memory_graph(
    memory_id="mem_abc123",
    depth=2
)

print(f"Graph contains {graph['total_nodes']} memories")
print(f"Minds involved: {', '.join(graph['minds_involved'])}")

for edge in graph["edges"]:
    print(f"{edge['source']} --[{edge['type']}]--> {edge['target']}")
```

**Behavior**:
- Performs breadth-first traversal starting from root memory
- Collects all linked memories up to specified depth
- Tracks which Minds are associated with each memory
- Returns both nodes (memories) and edges (links) for visualization

**Errors**:
- `ValueError`: If root memory ID does not exist

---

## Analytics Methods

### `record_coordination_session()`

Record a coordination session for analytics tracking.

**Signature**:
```python
async def record_coordination_session(
    minds: list[str],
    task_type: str,
    success_score: float,
    duration_ms: int,
    memories_created: int,
    context: dict | None = None
) -> str
```

**Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `minds` | `list[str]` | Yes | Names of Minds that participated |
| `task_type` | `str` | Yes | Type of task (e.g., `"feature-implementation"`) |
| `success_score` | `float` | Yes | Success rating (0.0-1.0) |
| `duration_ms` | `int` | Yes | Session duration in milliseconds |
| `memories_created` | `int` | Yes | Number of memories created during session |
| `context` | `dict` | No | Additional context metadata |

**Returns**: `str` - ID of the created session record

**Example**:
```python
session_id = await manager.record_coordination_session(
    minds=["Vera", "Lyre", "Iris"],
    task_type="feature-implementation",
    success_score=0.92,
    duration_ms=3500,
    memories_created=5,
    context={"feature": "coordination-engine", "complexity": "high"}
)
```

---

### `get_best_mind_combinations()`

Query the best-performing Mind combinations for a task type.

**Signature**:
```python
async def get_best_mind_combinations(
    task_type: str,
    limit: int = 5
) -> list[dict]
```

**Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `task_type` | `str` | Yes | Type of task to query |
| `limit` | `int` | No | Maximum results to return (default: 5) |

**Returns**: `list[dict]` - Sorted by success score (descending)

**Example**:
```python
best_teams = await manager.get_best_mind_combinations(
    task_type="feature-implementation",
    limit=5
)

for team in best_teams:
    print(f"Minds: {team['minds']}, Success: {team['success_score']:.2f}")
```

---

### `get_mind_effectiveness()`

Get effectiveness metrics for a specific Mind.

**Signature**:
```python
async def get_mind_effectiveness(
    mind_name: str
) -> dict
```

**Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `mind_name` | `str` | Yes | Name of the Mind to analyze |

**Returns**: `dict` with structure:
```python
{
    "avg_success_score": float,  # Average success across all sessions
    "total_sessions": int,       # Total sessions participated in
    "success_rate": float,       # Percentage of sessions with score >= 0.7
    "avg_duration_ms": int       # Average session duration
}
```

**Example**:
```python
metrics = await manager.get_mind_effectiveness(mind_name="Vera")
print(f"Vera's average success: {metrics['avg_success_score']:.2f}")
print(f"Success rate: {metrics['success_rate']:.1%}")
```

---

### `suggest_team_for_task()`

Get team suggestions based on historical performance.

**Signature**:
```python
async def suggest_team_for_task(
    task_type: str,
    context: dict | None = None
) -> list[str]
```

**Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `task_type` | `str` | Yes | Type of task |
| `context` | `dict` | No | Additional context for suggestion |

**Returns**: `list[str]` - Suggested Mind names, prioritized by historical success

**Example**:
```python
suggested_team = await manager.suggest_team_for_task(
    task_type="architecture-design",
    context={"priority": "high"}
)
print(f"Suggested team: {', '.join(suggested_team)}")
```

---

## Link Types

The coordination system uses the following link types:

| Type | Description | Use Case |
|------|-------------|----------|
| `coordination` | Semantic relationship between memories | Automatic linking via tag overlap |
| `synthesis` | Synthesis memory → source memory | Multi-Mind synthesis attribution |
| `continuation` | Sequential relationship | Memory chains and workflows |
| `contradiction` | Conflicting information | Tracking disagreements or revisions |

---

## Performance Characteristics

| Operation | Complexity | Notes |
|-----------|-----------|-------|
| `synthesize_multi_mind_memory()` | O(n) | n = number of source memories |
| `link_related_memories()` | O(n²) | n = number of memories; pairwise comparison |
| `get_mind_memory_graph()` | O(d × e) | d = depth, e = average edges per node |
| `record_coordination_session()` | O(1) | Single database insert |
| `get_best_mind_combinations()` | O(log n) | Indexed query with sort |
| `get_mind_effectiveness()` | O(log n) | Indexed aggregation |
| `suggest_team_for_task()` | O(log n) | Indexed query with ranking |

---

## Database Schema

### `coordination_sessions` Table

```sql
CREATE TABLE coordination_sessions (
    id TEXT PRIMARY KEY,
    minds TEXT NOT NULL,              -- JSON array of Mind names
    task_type TEXT NOT NULL,
    success_score REAL NOT NULL,
    duration_ms INTEGER NOT NULL,
    memories_created INTEGER NOT NULL,
    context TEXT,                     -- JSON object
    created_at TEXT NOT NULL
);

CREATE INDEX idx_sessions_task_type ON coordination_sessions(task_type);
CREATE INDEX idx_sessions_success ON coordination_sessions(success_score DESC);
```

### `memory_links` Table

```sql
CREATE TABLE memory_links (
    id TEXT PRIMARY KEY,
    source_id TEXT NOT NULL,
    target_id TEXT NOT NULL,
    link_type TEXT NOT NULL CHECK(link_type IN ('coordination', 'continuation', 'contradiction', 'synthesis')),
    strength REAL DEFAULT 1.0,
    minds_involved TEXT,              -- JSON array of Mind names
    context TEXT,                     -- JSON object
    created_at TEXT NOT NULL,
    FOREIGN KEY (source_id) REFERENCES memories(id),
    FOREIGN KEY (target_id) REFERENCES memories(id)
);

CREATE INDEX idx_links_source ON memory_links(source_id);
CREATE INDEX idx_links_target ON memory_links(target_id);
CREATE INDEX idx_links_type ON memory_links(link_type);
```

---

## Error Handling

All coordination methods follow consistent error handling:

**Validation Errors** (`ValueError`):
- Empty required lists (`source_memory_ids`, `active_minds`)
- Nonexistent memory IDs
- Invalid strength thresholds (< 0.0 or > 1.0)

**Database Errors** (`sqlite3.Error`):
- Constraint violations (e.g., invalid link_type)
- Foreign key violations (referencing deleted memories)

**Example Error Handling**:
```python
try:
    synthesis_id = await manager.synthesize_multi_mind_memory(
        source_memory_ids=["mem_abc123"],
        active_minds=[],  # Invalid: empty list
        synthesis_content="...",
        title="..."
    )
except ValueError as e:
    print(f"Validation error: {e}")
```

---

## Best Practices

### Multi-Mind Synthesis
- Always include Mind symbols in synthesis content for visual attribution
- Use descriptive titles that capture the synthesis theme
- Link back to source memories for traceability

### Memory Linking
- Start with `min_strength=0.3` (30% overlap) as a reasonable threshold
- Higher thresholds (0.5-0.7) for stricter semantic similarity
- Lower thresholds (0.1-0.2) for exploratory linking

### Analytics
- Record sessions immediately after completion for accurate metrics
- Use consistent `task_type` values for meaningful comparisons
- Include rich context metadata for future analysis

### Graph Traversal
- Limit depth to 2-3 for interactive queries (performance)
- Use depth 4-5 for comprehensive analysis (slower)
- Cache graph results for repeated queries

---

> Authors: Joysusy & Violet Klaudia 💖
