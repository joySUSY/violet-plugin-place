# Identity-Weighted Memory Retrieval
# Authors: Joysusy & Violet Klaudia 💖

## Overview

Identity-weighted memory retrieval enhances Lavender's hybrid search by incorporating Mind context into the ranking algorithm. This allows memories associated with currently active Minds to be prioritized in search results.

## Architecture

### Components

1. **Mind Relevance Channel** (`hybrid_search.py`)
   - New search channel in RRF fusion
   - Queries memories by active Mind names
   - Calculates relevance scores based on Mind weights

2. **Identity Weights** (`hybrid_search.py`)
   - Configurable channel weights per Mind context
   - Applied during RRF fusion
   - Default: `mind` channel weighted 1.5x

3. **Hook Integration** (`manager.py`)
   - `beforeSearch` hook enhances queries with Mind context
   - `afterRetrieval` hook filters results by Mind relevance
   - Graceful degradation when VioletCore unavailable

4. **Storage Layer** (`sqlite_store.py`)
   - `search_by_mind_context()` queries by `mind_active` field
   - Efficient SQL with IN clause for multiple Minds

## Usage

### Basic Search with Mind Context

```python
from memory.manager import MemoryManager

manager = MemoryManager(store, embedding_provider, encryption)

context = {
    "activeMinds": [
        {"name": "Faye", "weight": 1.5},
        {"name": "Kael", "weight": 1.2},
    ],
    "channelWeights": {
        "bm25": 1.0,
        "vector": 1.0,
        "metadata": 1.0,
        "mind": 2.0,
    },
}

results = await manager.hybrid_search(
    query="security patterns",
    limit=10,
    project="violet",
    context=context,
)
```

### Mind Context Schema

```typescript
interface MindContext {
  activeMinds: Array<{
    name: string;
    weight: number;  // Relevance multiplier (default: 1.0)
  }>;
  channelWeights?: {
    bm25?: number;
    vector?: number;
    metadata?: number;
    mind?: number;
  };
}
```

### Hook Integration

The `beforeSearch` hook from VioletCore can inject Mind context:

```javascript
// In violet-core/adapters/lavender-hooks.js
function beforeMemorySearch(query, context) {
  const activeMinds = getActiveMinds();
  return {
    query: enhanceQuery(query, activeMinds),
    mindContext: {
      activeMinds: activeMinds.map(m => ({
        name: m.name,
        weight: m.relevanceWeight || 1.0,
      })),
      channelWeights: {
        mind: 1.5,
      },
    },
    context,
  };
}
```

## Implementation Details

### Mind Relevance Scoring

```python
def _calculate_mind_relevance(memory, active_minds):
    mem_mind = memory.get("mind_active")
    if not mem_mind:
        return 0.0

    for mind in active_minds:
        if mind.get("name") == mem_mind:
            return mind.get("weight", 1.0)

    return 0.3  # Partial match for related Minds
```

### RRF Fusion with Identity Weights

```python
def _reciprocal_rank_fusion(channels, identity_weights):
    for channel_name, ranked_list in channels:
        channel_weight = identity_weights.get(channel_name, 1.0)
        for rank, (mem_id, _) in enumerate(ranked_list):
            rrf_contrib = (1.0 / (k + rank + 1)) * channel_weight
            scores[mem_id] += rrf_contrib
```

## Performance Characteristics

- **Mind relevance search**: O(n) where n = memories with matching `mind_active`
- **RRF fusion**: O(m log m) where m = total candidates across channels
- **SQL query**: Indexed on `mind_active` field for efficient lookups

## Testing

Run tests with:

```bash
uv run pytest tests/test_identity_weighted_retrieval.py -v
```

Test coverage:
- Mind relevance search
- Identity-weighted RRF fusion
- Manager hook integration
- Graceful degradation

## Integration Points

### VioletCore → Lavender

1. VioletCore calls `beforeMemorySearch` hook
2. Hook injects `mindContext` with active Minds
3. Lavender applies identity weights during search
4. Results prioritize memories from active Minds

### Lavender → VioletCore

1. Lavender calls `afterMemoryRetrieval` hook
2. Hook filters results by Mind relevance
3. VioletCore can apply additional Mind-specific logic
4. Final results returned to caller

## Configuration

Default channel weights:

```python
DEFAULT_WEIGHTS = {
    "bm25": 1.0,
    "vector": 1.0,
    "metadata": 1.0,
    "mind": 1.5,
}
```

Adjust weights in Mind context to prioritize different channels.

## Future Enhancements

- Mind collaboration scoring (multiple Minds on same memory)
- Temporal decay for Mind relevance
- Mind-specific embedding spaces
- Cross-Mind memory linking
