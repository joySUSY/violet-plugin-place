# Authors: Joysusy & Violet Klaudia 💖
# Lylarch Naming & Architecture System — Consolidated v1.0
# Date: 2026-03-24
# Status: APPROVED — Canonical reference for all Lylacore development

## I. Core Design Principles

This system unifies three dimensions:

1. **Structural clarity (engineering)**
2. **Semantic coherence (system design)**
3. **Poetic identity (LILAC encoding)**

### 1. Dual-Encoding Naming

Each layer simultaneously encodes:
- Technical function (API, runtime, orchestration, etc.)
- Botanical metaphor (flower, stem, root, etc.)
- Letter structure (L-I-L-A-C)

### 2. LILAC as a Vertical Expression

LILAC is a stacked semantic gradient:

| Letter | Meaning   | System Role             |
|--------|-----------|-------------------------|
| L      | Life      | Runtime, growth, memory |
| I      | Interface | Boundaries, APIs        |
| L      | Lumen     | Flow, transport         |
| A      | Agency    | Orchestration, intent   |
| C      | Core      | Primitives, structure   |

### 3. Anima as a Field (Not a Layer)

Lyl-Anima is NOT a layer. It is a pervasive field:
- Contextual
- Personalizing
- Saturating the entire stack

> "Anima = Field, not Layer"

---

## II. Lylarch Stack (Refined Architecture)

```
                    Context (Light)
                          |
                +===================+
                |   I - Interface   |
                +===================+
                | lyl-calyx         |  (API / MCP)
                | lyl-stoma         |  (WASM / boundary)
                +===================+
                          |
                +===================+
                |   L - Lumen       |
                +===================+
                | lyl-xylem         |  (upward flow)
                | lyl-phloem        |  (downward/context flow)
                |   -node / -py     |
                +===================+
                          |
                +===================+
                |   A - Agency      |
                +===================+
                | lyl-aureole       |  (orchestration)
                | lyl-spectrum      |  (observability)
                | lyl-vector        |  (semantic flow / embeddings)
                +===================+
                          |
                +===================+
                |   C - Core        |
                +===================+
                | lyl-cipher        |  (primitives / security)
                | lyl-coach         |  (control / policy)
                | lyl-topo          |  (structure)
                +===================+
                          |
                +===================+
                |   L - Life        |
                +===================+
                | lyl-cambium       |  (runtime growth)
                | lyl-lacuna        |  (cache / storage)
                | lyl-seed          |  (state origin / initialization)
                +===================+
                          |
        ~ ~ ~ Lyl-Anima (Field) ~ ~ ~
                          |
              Mycorrhizal Link (Lavender)
```

---

## III. Naming RFC (v0.1)

### 1. Core Grammar
```
lyl-<domain>-<unit>[-<variant>]
```

### 2. Domain Mapping (Mandatory)

| Layer | Letter    | Domain Meaning   |
|-------|-----------|------------------|
| L     | life      | runtime / memory |
| I     | interface | API / boundary   |
| L     | lumen     | transport        |
| A     | agency    | orchestration    |
| C     | core      | primitives       |

### 3. Module Naming Rules
```
lyl-<botanical-term>
```
Requirements:
- Must be a real biological/botanical term (preferred)
- Must metaphorically map to function
- Avoid arbitrary invented words

### 4. Semantic Mapping

| Function       | Naming Strategy  | Example       |
|----------------|------------------|---------------|
| API            | protection       | calyx         |
| IO boundary    | respiration      | stoma         |
| data flow      | vascular system  | xylem, phloem |
| orchestration  | light / guidance | aureole       |
| observability  | spectrum         | spectrum      |
| security       | root / base      | cipher        |
| structure      | canopy           | topo          |
| runtime        | growth layer     | cambium       |
| cache          | cavity           | lacuna        |
| initialization | seed             | seed          |

### 5. Constraints
- 12 characters or fewer preferred
- Phonetically smooth
- Avoid ambiguous/generic words
- Prefer rare but precise biological terms

---

## IV. Subsystem Naming Syntax

### 1. Standard
```
<module>.<capability>
```

### 2. Examples
```
lyl-xylem.bridge
lyl-xylem.node
lyl-xylem.python

lyl-aureole.scheduler
lyl-aureole.graph

lyl-calyx.http
lyl-calyx.mcp
```

### 3. Deep Structure (Optional)
```
<module>.<capability>.<role>
```
Examples:
```
lyl-spectrum.trace.collector
lyl-spectrum.trace.exporter

lyl-coach.policy.guard
lyl-coach.policy.adaptive
```

### 4. Semantic Hierarchy

| Level      | Meaning       |
|------------|---------------|
| module     | organ         |
| capability | function      |
| role       | cell behavior |

---

## V. Plugin Naming

### 1. Standard
```
lyl-<host>-<plugin>
```
Examples:
```
lyl-calyx-openai
lyl-xylem-rust
lyl-spectrum-prometheus
```

### 2. Third-Party Plugins
```
lyl-<module>-ext-<name>
```
Examples:
```
lyl-calyx-ext-stripe
lyl-aureole-ext-airflow
```

### 3. Plugin Tiers

| Type         | Prefix | Example               |
|--------------|--------|-----------------------|
| Official     | none   | lyl-xylem-node        |
| Community    | ext    | lyl-xylem-ext-deno    |
| Experimental | lab    | lyl-aureole-lab-agent |

### 4. Reserved Names
```
anima, lilac, lylarch, cambium, xylem, phloem, calyx
```

---

## VI. Data Flow Model (Bi-Directional)

```
        ^ xylem (execution / output)
        v phloem (context / feedback)
```

Full flow:
```
User Input
   v
Calyx (API)
   v
Stoma (Boundary)
   v
Phloem v (context injection)
   v
Aureole (orchestration)
   v
Core (decision)
   v
Xylem ^ (execution output)
   v
Response
```

> Lylarch operates on a biological bidirectional flow model.

---

## VII. LILAC Animation Logic (for localhost GUI)

### Phase 1 -- Germination (L)
- Anima field ripples
- Cambium glows
- System "comes alive"

### Phase 2 -- Flow (L)
- Xylem pulses upward (violet)
- Phloem flows downward (blue)

### Phase 3 -- Agency (A)
- Aureole rotates (halo effect)
- Spectrum refracts into light bands

### Phase 4 -- Interface (I)
- Calyx blooms open
- Stoma breathes (expand/contract)

### Phase 5 -- LILAC Reveal
Each layer lights up sequentially:
```
L   I   L   A   C
|   |   |   |   |
```
Final frame: "Lylarch — A Living Architecture"

---

## VIII. Brand Expressions

Primary:
> "Lylarch is a living architecture where context flows like sap and intelligence grows like a plant."

Technical:
> "A biologically-inspired LILAC stack for contextual AI systems."

---

## IX. Poetic Layer (Advanced Branding)

| Technical | Poetic Variant |
|-----------|----------------|
| Life      | Growth         |
| Interface | Boundary       |
| Lumen     | Flow           |
| Agency    | Intent         |
| Core      | Kernel         |

---

## X. Final Positioning

**Lylarch** (Lylac-Architecture) is the complete living architecture — the full LILAC stack encompassing all layers from Life to Interface. It is the whole system.

**Lylacore** is the engine at the heart of Lylarch — the scheduler, planner, and capability kernel. Persona-agnostic, user-agnostic, universally composable.

**Lyl-Anima** is the cross-cutting identity field that saturates the stack. VioletCore is one instance of Anima; any agent can define its own.

**Lavender** is an optional peer system. When present, it reactively connects to Lylarch, enabling memory-augmented cognition — but neither depends on the other.

```
Lylarch (the architecture)
  |-- Lyl-Anima (identity field, cross-cutting)
  |-- LILAC stack layers (Interface, Lumen, Agency, Core, Life)
  |-- Lylacore (engine / scheduler / planner)
  +-- [Optional] Lavender MemorySys Reactive Connection
```

> Lylarch is the living architecture. Lylacore is its beating heart.

---

> Authors: Joysusy & Violet Klaudia 💖
