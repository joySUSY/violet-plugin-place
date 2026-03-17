# Authors: Joysusy & Violet Klaudia 💖

# Coordination Usage Examples

Practical examples demonstrating Multi-Mind coordination features in real-world scenarios.

## Table of Contents

1. [Basic Multi-Mind Synthesis](#basic-multi-mind-synthesis)
2. [Semantic Memory Linking](#semantic-memory-linking)
3. [Memory Graph Exploration](#memory-graph-exploration)
4. [Session Analytics Tracking](#session-analytics-tracking)
5. [Team Optimization](#team-optimization)
6. [Advanced Workflows](#advanced-workflows)

---

## Basic Multi-Mind Synthesis

### Scenario: Architecture + Documentation Review

Two Minds collaborate on a feature design — Vera focuses on architecture, Lyre on documentation standards.

```python
from memory.manager import MemoryManager
from storage.sqlite_store import SQLiteStore

# Initialize
store = SQLiteStore("~/.violet/lavender/lavender.db")
await store.initialize()
manager = MemoryManager(store=store)

# Vera's architectural insight
vera_memory_id = await manager.store(
    title="Layered architecture for coordination engine",
    content="Use DDD layers: Domain (coordination.py) → Application (manager.py) → Infrastructure (sqlite_store.py). Keep domain logic pure, no database imports.",
    mind_active="Vera",
    tags=["architecture", "ddd", "coordination", "layers"],
    importance=9
)

# Lyre's documentation note
lyre_memory_id = await manager.store(
    title="Bilingual API documentation standard",
    content="All public APIs must have English docstrings with Chinese summaries. Use Google-style docstrings with Args/Returns/Raises sections.",
    mind_active="Lyre",
    tags=["documentation", "standards", "bilingual", "api"],
    importance=8
)

# Synthesize both perspectives
synthesis_id = await manager.synthesize_multi_mind_memory(
    source_memory_ids=[vera_memory_id, lyre_memory_id],
    active_minds=["Vera", "Lyre"],
    synthesis_content="""
🔮 **Vera** emphasized layered architecture with strict DDD boundaries:
- Domain layer (coordination.py) contains pure business logic
- Application layer (manager.py) orchestrates domain + infrastructure
- Infrastructure layer (sqlite_store.py) handles database operations

🦢 **Lyre** added bilingual documentation standards:
- English docstrings for all public APIs
- Chinese summaries for user-facing features
- Google-style format with Args/Returns/Raises sections
""",
    title="Coordination Engine: Architecture + Documentation Standards",
    category="synthesis"
)

print(f"Synthesis created: {synthesis_id}")

# Retrieve the synthesis
synthesis = await manager.recall(synthesis_id)
print(f"Minds involved: {synthesis['mind_context']['minds_involved']}")
print(f"Source count: {synthesis['mind_context']['source_count']}")
```

**Output**:
```
Synthesis created: mem_syn_abc123
Minds involved: ['Vera', 'Lyre']
Source count: 2
```

---

## Semantic Memory Linking

### Scenario: Discovering Related Python Async Patterns

Multiple memories about Python async programming are stored separately. Automatically link them based on tag overlap.

```python
# Store related memories
mem1_id = await manager.store(
    title="Python asyncio event loop patterns",
    content="Use asyncio.run() for top-level entry. Never block the event loop with time.sleep() — use await asyncio.sleep() instead.",
    tags=["python", "async", "asyncio", "performance", "patterns"],
    importance=7
)

mem2_id = await manager.store(
    title="Async database connections with asyncpg",
    content="Use connection pools for async PostgreSQL. Create pool once at startup, reuse across requests. Always use async with for connection context.",
    tags=["python", "async", "database", "asyncpg", "performance"],
    importance=8
)

mem3_id = await manager.store(
    title="Testing async code with pytest-asyncio",
    content="Mark async tests with @pytest.mark.asyncio. Use async fixtures with @pytest.fixture(scope='function'). Clean up resources in fixture teardown.",
    tags=["python", "async", "testing", "pytest", "asyncio"],
    importance=7
)

# Automatically link related memories
links_created = await manager.link_related_memories(
    memory_ids=[mem1_id, mem2_id, mem3_id],
    min_strength=0.3  # 30% tag overlap threshold
)

print(f"Created {links_created} semantic links")

# Verify links
links = await manager._store.get_memory_links(mem1_id)
for link in links:
    target_id = link["target_id"] if link["source_id"] == mem1_id else link["source_id"]
    print(f"Linked to {target_id} with strength {link['strength']:.2f}")
```

**Output**:
```
Created 3 semantic links
Linked to mem_def456 with strength 0.40
Linked to mem_ghi789 with strength 0.60
```

**Explanation**:
- mem1 ↔ mem2: Share ["python", "async", "performance"] = 3/5 = 0.60 strength
- mem1 ↔ mem3: Share ["python", "async", "asyncio"] = 3/5 = 0.60 strength
- mem2 ↔ mem3: Share ["python", "async"] = 2/5 = 0.40 strength

---

## Memory Graph Exploration

### Scenario: Visualizing Knowledge Network

Explore how memories are connected across Mind contexts.

```python
# Start from a root memory
root_id = "mem_abc123"  # "Layered architecture for coordination engine"

# Build graph with depth 2
graph = await manager.get_mind_memory_graph(
    memory_id=root_id,
    depth=2
)

print(f"Graph Statistics:")
print(f"  Total nodes: {graph['total_nodes']}")
print(f"  Total edges: {graph['total_edges']}")
print(f"  Minds involved: {', '.join(graph['minds_involved'])}")
print(f"  Depth: {graph['depth']}")

# Explore nodes
print("\nMemories in graph:")
for mem_id, mem_data in graph["nodes"].items():
    mind = mem_data.get("mind_active", "Unknown")
    title = mem_data.get("title", "Untitled")
    print(f"  [{mind}] {title}")

# Explore edges
print("\nConnections:")
for edge in graph["edges"]:
    print(f"  {edge['source']} --[{edge['type']}, strength={edge['strength']:.2f}]--> {edge['target']}")
```

**Output**:
```
Graph Statistics:
  Total nodes: 5
  Total edges: 6
  Minds involved: Iris, Lyre, Vera
  Depth: 2

Memories in graph:
  [Vera] Layered architecture for coordination engine
  [Lyre] Bilingual API documentation standard
  [Vera] DDD tactical patterns for domain services
  [Iris] Testing strategy for async Python code
  [Lyre] Documentation generation with Sphinx

Connections:
  mem_abc123 --[synthesis, strength=1.00]--> mem_def456
  mem_abc123 --[coordination, strength=0.45]--> mem_ghi789
  mem_def456 --[coordination, strength=0.60]--> mem_jkl012
  mem_ghi789 --[continuation, strength=1.00]--> mem_mno345
  mem_jkl012 --[coordination, strength=0.35]--> mem_pqr678
  mem_mno345 --[synthesis, strength=1.00]--> mem_abc123
```

---

## Session Analytics Tracking

### Scenario: Recording Feature Implementation Session

Track a coordination session where three Minds collaborate on implementing a feature.

```python
import time

# Start session
start_time = time.time()

# Simulate feature implementation
# ... (Minds collaborate, create memories, write code)

# End session
end_time = time.time()
duration_ms = int((end_time - start_time) * 1000)

# Record session
session_id = await manager.record_coordination_session(
    minds=["Vera", "Lyre", "Iris"],
    task_type="feature-implementation",
    success_score=0.92,  # 92% success (tests passed, code reviewed)
    duration_ms=duration_ms,
    memories_created=5,
    context={
        "feature": "coordination-engine",
        "complexity": "high",
        "tests_passed": 129,
        "tests_total": 129
    }
)

print(f"Session recorded: {session_id}")
print(f"Duration: {duration_ms}ms")
```

**Output**:
```
Session recorded: session_xyz789
Duration: 3500ms
```

---

## Team Optimization

### Scenario: Finding Best Mind Combinations

Query historical data to find the most effective Mind teams for different task types.

```python
# Query best teams for feature implementation
best_teams = await manager.get_best_mind_combinations(
    task_type="feature-implementation",
    limit=5
)

print("Top 5 Mind combinations for feature implementation:")
for i, team in enumerate(best_teams, 1):
    minds = ", ".join(team["minds"])
    score = team["success_score"]
    sessions = team["session_count"]
    print(f"{i}. [{minds}] - Success: {score:.2f} ({sessions} sessions)")

# Get individual Mind effectiveness
print("\nIndividual Mind effectiveness:")
for mind_name in ["Vera", "Lyre", "Iris", "Aurora"]:
    metrics = await manager.get_mind_effectiveness(mind_name=mind_name)
    print(f"{mind_name}:")
    print(f"  Avg success: {metrics['avg_success_score']:.2f}")
    print(f"  Success rate: {metrics['success_rate']:.1%}")
    print(f"  Total sessions: {metrics['total_sessions']}")
    print(f"  Avg duration: {metrics['avg_duration_ms']}ms")

# Get team suggestion for a new task
suggested_team = await manager.suggest_team_for_task(
    task_type="architecture-design",
    context={"priority": "high", "complexity": "medium"}
)

print(f"\nSuggested team for architecture design: {', '.join(suggested_team)}")
```

**Output**:
```
Top 5 Mind combinations for feature implementation:
1. [Vera, Lyre, Iris] - Success: 0.92 (3 sessions)
2. [Vera, Aurora] - Success: 0.88 (2 sessions)
3. [Lyre, Iris] - Success: 0.85 (4 sessions)
4. [Vera, Lyre] - Success: 0.82 (5 sessions)
5. [Iris, Aurora, Sydney] - Success: 0.78 (2 sessions)

Individual Mind effectiveness:
Vera:
  Avg success: 0.87
  Success rate: 85.0%
  Total sessions: 12
  Avg duration: 3200ms
Lyre:
  Avg success: 0.84
  Success rate: 80.0%
  Total sessions: 10
  Avg duration: 2800ms
Iris:
  Avg success: 0.81
  Success rate: 75.0%
  Total sessions: 8
  Avg duration: 3500ms
Aurora:
  Avg success: 0.79
  Success rate: 70.0%
  Total sessions: 6
  Avg duration: 4000ms

Suggested team for architecture design: Vera, Lyre
```

---

## Advanced Workflows

### Scenario: Complete Coordination Workflow

End-to-end workflow combining synthesis, linking, analytics, and graph exploration.

```python
async def coordinate_feature_development(
    feature_name: str,
    minds: list[str],
    task_type: str
) -> dict:
    """
    Complete coordination workflow for feature development.

    Returns summary with synthesis_id, links_created, session_id, graph.
    """
    start_time = time.time()
    memory_ids = []

    # Step 1: Each Mind contributes insights
    for mind in minds:
        mem_id = await manager.store(
            title=f"{mind}'s insight on {feature_name}",
            content=f"[{mind}'s contribution to {feature_name} implementation]",
            mind_active=mind,
            tags=[feature_name, "feature", "implementation", mind.lower()],
            importance=8
        )
        memory_ids.append(mem_id)

    # Step 2: Synthesize all perspectives
    synthesis_content = "\n\n".join([
        f"**{mind}** contributed: [summary of {mind}'s insight]"
        for mind in minds
    ])

    synthesis_id = await manager.synthesize_multi_mind_memory(
        source_memory_ids=memory_ids,
        active_minds=minds,
        synthesis_content=synthesis_content,
        title=f"{feature_name}: Multi-Mind Synthesis"
    )

    # Step 3: Link related memories
    links_created = await manager.link_related_memories(
        memory_ids=memory_ids + [synthesis_id],
        min_strength=0.3
    )

    # Step 4: Record session
    end_time = time.time()
    duration_ms = int((end_time - start_time) * 1000)

    session_id = await manager.record_coordination_session(
        minds=minds,
        task_type=task_type,
        success_score=0.90,
        duration_ms=duration_ms,
        memories_created=len(memory_ids) + 1,  # +1 for synthesis
        context={"feature": feature_name}
    )

    # Step 5: Build memory graph
    graph = await manager.get_mind_memory_graph(
        memory_id=synthesis_id,
        depth=2
    )

    return {
        "synthesis_id": synthesis_id,
        "memory_ids": memory_ids,
        "links_created": links_created,
        "session_id": session_id,
        "graph": graph,
        "duration_ms": duration_ms
    }

# Execute workflow
result = await coordinate_feature_development(
    feature_name="coordination-analytics",
    minds=["Vera", "Lyre", "Iris"],
    task_type="feature-implementation"
)

print(f"Workflow completed:")
print(f"  Synthesis: {result['synthesis_id']}")
print(f"  Memories created: {len(result['memory_ids']) + 1}")
print(f"  Links created: {result['links_created']}")
print(f"  Session: {result['session_id']}")
print(f"  Graph nodes: {result['graph']['total_nodes']}")
print(f"  Duration: {result['duration_ms']}ms")
```

**Output**:
```
Workflow completed:
  Synthesis: mem_syn_abc123
  Memories created: 4
  Links created: 6
  Session: session_xyz789
  Graph nodes: 7
  Duration: 2800ms
```

---

## Integration with MCP Tools

### Scenario: Using Coordination via MCP Server

Access coordination features through the MCP server interface.

```python
# MCP tool calls (from Claude Code)

# Store memories via MCP
await mcp_client.call_tool("lavender_store", {
    "title": "Vera's architectural insight",
    "content": "Use layered architecture...",
    "mind_active": "Vera",
    "tags": ["architecture", "ddd"]
})

# Synthesize via MCP (future enhancement)
await mcp_client.call_tool("lavender_synthesize", {
    "source_memory_ids": ["mem_abc123", "mem_def456"],
    "active_minds": ["Vera", "Lyre"],
    "synthesis_content": "Combined insights...",
    "title": "Architecture Synthesis"
})

# Query analytics via MCP (future enhancement)
result = await mcp_client.call_tool("lavender_analytics", {
    "operation": "best_combinations",
    "task_type": "feature-implementation",
    "limit": 5
})
```

---

## Best Practices Summary

### Multi-Mind Synthesis
✅ **DO**:
- Include Mind symbols (🔮, 🦢, etc.) in synthesis content
- Use descriptive titles that capture the synthesis theme
- Store synthesis memories with `category="synthesis"`
- Link back to all source memories for traceability

❌ **DON'T**:
- Create synthesis without attribution to source Minds
- Synthesize from empty or single memory lists
- Forget to validate source memory IDs exist

### Semantic Linking
✅ **DO**:
- Start with `min_strength=0.3` as a reasonable threshold
- Use consistent tagging across related memories
- Link memories after batch creation for efficiency

❌ **DON'T**:
- Set threshold too low (< 0.2) — creates noise
- Set threshold too high (> 0.7) — misses valid connections
- Link memories without sufficient tag overlap

### Analytics
✅ **DO**:
- Record sessions immediately after completion
- Use consistent `task_type` values for comparisons
- Include rich context metadata for future analysis
- Track both successful and failed sessions

❌ **DON'T**:
- Record sessions with incomplete data
- Use inconsistent task_type naming
- Forget to track duration and memory counts

### Graph Exploration
✅ **DO**:
- Limit depth to 2-3 for interactive queries
- Cache graph results for repeated queries
- Use graphs for visualization and context discovery

❌ **DON'T**:
- Use excessive depth (> 5) without caching
- Traverse graphs without checking node count first
- Ignore Mind attribution in graph nodes

---

> Authors: Joysusy & Violet Klaudia 💖
