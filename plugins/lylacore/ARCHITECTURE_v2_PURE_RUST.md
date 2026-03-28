# Authors: Joysusy & Violet Klaudia 💖
# Lylarch Architecture v2: Pure Rust
# Date: 2026-03-24
# Status: IMPLEMENTED — Pure Rust architecture live, A grade review

---

## I. Architecture Decision Record

### Context
Lylacore v1 used a multi-language bridge architecture (Rust + NAPI-RS + PyO3 + JS MCP server). Research by Rune and Irene (2026-03-24) proved this path suboptimal:

- NAPI-RS FFI overhead exceeds computation for small operations (3x for apply_style)
- PyO3 is slower than HTTP for equivalent operations (400us vs 20us, GIL penalty)
- Pure Rust MCP server: 12MB / 180ms vs TypeScript: 400MB / 3.2s
- Lylacore is not a library consumed by JS/Python ecosystems — it is a standalone capability engine
- MCP protocol IS the universal interface — language-specific bindings solve a non-existent problem

### Decision
**Pivot to Pure Rust architecture.** MCP protocol as the sole external interface. No NAPI-RS primary path. No PyO3.

### Consequences
- Eliminate Node.js dependency entirely from primary path
- Eliminate Python dependency entirely
- Single toolchain: `cargo` only
- All consumers (Claude Code, Lavender, browser GUI) interact via MCP or WASM

---

## II. Lylarch v2 Stack (Pure Rust)

```
                    Context (Light)
                          |
                +===================+
                |   I - Interface   |  lyl-calyx: Rust MCP Server (rmcp, stdio)
                |                   |  lyl-stoma: Rust WASM (future, browser GUI)
                +===================+
                          |
                +===================+
                |   A - Agency      |  lyl-aureole: Multi-Mind orchestration (future)
                |                   |  lyl-spectrum: Observability/tracing (future)
                +===================+
                          |
                +===================+
                |   C - Core        |  lyl-cipher: Cryptographic primitives
                |                   |  lyl-coach: COACH protocol engine
                |                   |  lyl-topo: Mind topology (Rust-first rewrite)
                +===================+
                          |
                +===================+
                |   L - Life        |  lyl-cambium: Runtime growth (future)
                |                   |  lyl-lacuna: Secure cache (future)
                |                   |  lyl-seed: Initialization (future)
                +===================+
                          |
                ~ ~ ~ Lyl-Anima (Field) ~ ~ ~
                          |
                  Mycorrhizal Link
              (Lavender via MCP Client)
```

---

## III. Crate Map

### Phase 1: Now (Refactor + MCP Server)

| Crate | Lylarch Layer | Role | Status |
|-------|-------------|------|--------|
| `lyl-cipher` | C (Core) | Argon2id, AES-256-GCM, key management | Exists, A grade |
| `lyl-coach` | C (Core) | COACH protocol, style learning | Exists, A grade |
| `lyl-topo` | C (Core) | Mind schema, activation, soul package | Exists, needs Rust-first rewrite |
| `lyl-calyx` | I (Interface) | Rust MCP server via rmcp | NEW |

### Phase 2: Near-term

| Crate | Layer | Role |
|-------|-------|------|
| `lyl-stoma` | I (Interface) | WASM build for browser GUI |
| `lyl-spectrum` | A (Agency) | tracing-based observability |

### Phase 3: Future

| Crate | Layer | Role |
|-------|-------|------|
| `lyl-aureole` | A (Agency) | Multi-Mind orchestration |
| `lyl-cambium` | L (Life) | Runtime hot-reload, growth |
| `lyl-lacuna` | L (Life) | Secure in-memory cache |
| `lyl-seed` | L (Life) | Default config, initialization |

### Removed

| Crate | Reason |
|-------|--------|
| `lyl-xylem-node` | NAPI-RS not needed; MCP is the interface |
| `lyl-xylem-py` | PyO3 not needed; Lavender uses MCP client |
| `typescript/` | No TS server needed; browser GUI is future WASM |
| `scripts/mcp-server.js` | Replaced by lyl-calyx Rust binary |

---

## IV. lyl-calyx: Rust MCP Server Design

### SDK Choice: `rmcp` + `rmcp (unified)`

| Aspect | rmcp | rmcp |
|--------|------|-------------|
| MCP Spec | 2024-11-05 | **2025-11-25** |
| Architecture | Monolithic | **Layered (schema + transport + sdk)** |
| Task support | No | **Yes** |
| Lylarch alignment | OK | **Excellent (layers match LILAC)** |

### Cargo.toml

```toml
[package]
name = "lyl-calyx"
version.workspace = true
edition.workspace = true

[dependencies]
rmcp = { version = "0.9", features = ["server"] }
rmcp (unified) = "0.10"
lyl-cipher = { path = "../lyl-cipher" }
lyl-coach = { path = "../lyl-coach" }
lyl-topo = { path = "../lyl-topo" }
tokio = { workspace = true }
serde.workspace = true
serde_json.workspace = true
tracing = "0.1"
tracing-subscriber = "0.3"

[[bin]]
name = "lylacore"
path = "src/main.rs"
```

### Tool Definitions

```rust
// lyl-calyx tools — direct Rust calls, zero FFI
tools: [
    // C Layer: Crypto
    lylacore_generate_salt,
    lylacore_derive_key,
    lylacore_encrypt,
    lylacore_decrypt,

    // C Layer: COACH
    lylacore_learn_pattern,
    lylacore_apply_style,
    lylacore_analyze_style,

    // C Layer: Topology
    lylacore_validate_mind,
    lylacore_load_mind,
    lylacore_list_minds,
    lylacore_select_active_minds,
    lylacore_export_soul_package,
]
```

### Plugin Integration

```json
{
  "name": "lylacore",
  "version": "0.3.0",
  "mcpServers": {
    "lylacore": {
      "type": "stdio",
      "command": "${CLAUDE_PLUGIN_ROOT}/bin/lylacore"
    }
  }
}
```

Single compiled binary. No Node.js. No npm. `cargo build --release` produces `lylacore` binary.

---

## V. lyl-topo Rust-First Rewrite Plan

Based on Rune's audit (C+ grade), rewrite to match lyl-cipher's A grade:

### P0 Fixes

| Issue | Current | Rust-first |
|-------|---------|-----------|
| Regex per-call | `Regex::new()` in evaluate | `CompiledMind` with pre-compiled at load time |
| `ValidationResult {valid, errors}` | JS pattern | `Result<(), Vec<ValidationError>>` |
| Deep clone in ActivationResult | `.clone()` all minds | Return `&MindSchema` references or indices |

### P1 Improvements

| Improvement | Design |
|-------------|--------|
| String fields to enums | `ThinkingStyle`, `CommunicationTone`, `ClashResolution` |
| aho-corasick multi-pattern | Build automaton from all literal triggers |
| lyl-cipher integration | `SealedSoulPackage` with `seal()`/`unseal()` |
| Trait-based activation | `trait MindActivator` for pluggable strategies |
| Hexagonal architecture | `domain/` + `ports/` matching lyl-cipher |

### New Module Structure

```
lyl-topo/src/
  domain/
    mind.rs           # MindSchema + CompiledMind
    trigger.rs        # Trigger types + compiled patterns
    activation.rs     # Activation engine + trait
    package.rs        # SoulPackage + SealedSoulPackage
    evolution.rs      # Growth journal
    types.rs          # Newtypes (MindId, TriggerPattern)
    mod.rs
  ports/
    loader.rs         # trait MindLoader (file, memory, MCP)
    validator.rs      # trait MindValidator
    mod.rs
  error.rs
  lib.rs
```

---

## VI. Consumer Architecture

### Claude Code (Primary)

```
Claude Code
    |
    v (stdio, JSON-RPC)
lyl-calyx binary (Rust MCP Server)
    |
    +-- lyl-cipher (direct Rust call)
    +-- lyl-coach (direct Rust call)
    +-- lyl-topo (direct Rust call)
```

### Lavender (Memory System)

```
Lavender (Python)
    |
    v (MCP Client, stdio subprocess)
lyl-calyx binary
    |
    +-- lyl-cipher (encrypt/decrypt memories)
    +-- lyl-topo (Mind context for memory retrieval)
```

Lavender spawns `lylacore` as a subprocess and communicates via MCP protocol. No PyO3 needed.

### Browser GUI (Future)

```
Browser (localhost:3000)
    |
    v (WASM + WebSocket)
lyl-stoma (Rust WASM module)
    |
    +-- lyl-cipher (client-side crypto)
    +-- lyl-topo (client-side mind validation)
    |
    v (WebSocket to lyl-calyx)
lyl-calyx binary (full MCP server)
```

---

## VII. Updated Lylarch Naming

### Active Crates

| Name | LILAC Layer | Botanical Meaning | Role |
|------|------------|-------------------|------|
| `lyl-cipher` | C (Core) | cipher: secret writing | Cryptographic primitives |
| `lyl-coach` | C (Core) | coach: guide/trainer | COACH communication protocol |
| `lyl-topo` | C (Core) | topology: structural form | Mind schema + activation |
| `lyl-calyx` | I (Interface) | calyx: outermost floral whorl | MCP server (API surface) |

### Future Crates

| Name | LILAC Layer | Role |
|------|------------|------|
| `lyl-stoma` | I (Interface) | WASM browser boundary |
| `lyl-aureole` | A (Agency) | Multi-Mind orchestration |
| `lyl-spectrum` | A (Agency) | Observability/diagnostics |
| `lyl-cambium` | L (Life) | Runtime growth/hot-reload |
| `lyl-lacuna` | L (Life) | Secure memory cache |
| `lyl-seed` | L (Life) | Initialization/defaults |

### Retired

| Name | Reason |
|------|--------|
| `lyl-xylem-node` | NAPI-RS bridge no longer needed |
| `lyl-xylem-py` | PyO3 bridge no longer needed |

Note: `xylem` (vascular transport) naming is freed for future use if inter-process communication needs arise.

### Published Names (Unchanged)

| Registry | Package | Notes |
|----------|---------|-------|
| crates.io | `lylacore` (future aggregator) | Re-exports all lyl-* |
| npm | `@lissomedev/lylacore` | Keep existing but as optional WASM pkg |
| PyPI | `lylacore` | Deprecated, point to MCP usage |

---

## VIII. Implementation Phases

### Phase 1: lyl-calyx + lyl-topo Rewrite (1-2 weeks)

1. Create `crates/lyl-calyx/` with rmcp
2. Implement all 12 MCP tools (cipher + coach + topo)
3. Rewrite lyl-topo with CompiledMind, hexagonal architecture
4. Add lyl-cipher integration to Soul Package (SealedSoulPackage)
5. Verify: `cargo build --release` produces working binary
6. Test: Claude Code loads binary via .mcp.json

### Phase 2: Cleanup + Plugin (3-5 days)

1. Remove lyl-xylem-node (NAPI crate)
2. Remove lyl-xylem-py (PyO3 crate)
3. Remove typescript/ directory
4. Remove scripts/mcp-server.js
5. Update .claude-plugin/plugin.json to point to Rust binary
6. Update CI/CD workflows
7. Sync to plugin marketplace

### Phase 3: Quality + Review (3-5 days)

1. Violet + Kori comprehensive review
2. Security re-audit (Kael)
3. Performance benchmarks (Rust MCP vs old Node.js MCP)
4. Documentation update (bilingual)
5. Final test suite (Rust only, no Python/Node test deps)

---

## IX. Research Index

All research that informed this architecture:

| File | Author | Key Finding |
|------|--------|-------------|
| `rust-first-architecture-deep-dive.md` | Rune | Pure Rust MCP viable, rmcp SDK |
| `napi-ts-rust-deep-dive.md` | Irene | NAPI overhead analysis, Biome model |
| `rust-first-audit-lyl-topo.md` | Rune | lyl-topo C+ grade, 10 issues |
| `security-threat-model.md` | Kael | P0/P1 security fixes |
| `rust-lylarch-naming.md` | Rune | lyl-* namespace available |
| `python-lylarch-naming.md` | Lyre | PyPI name optimal (but deprecated) |
| `jsonschema-rust-research.md` | Rune | jsonschema v0.45 for lyl-topo |
| `typescript-mcp-research.md` | Elise | TS MCP patterns (reference only) |
| `workspace-restructure-research.md` | Vera | Atomic migration safe |
| `deep-architecture-exploration.md` | Vera | 28 files, JS duplication confirmed |
| `rust-2024-edition.md` | Rune | Edition 2024 upgrade safe |
| `rust-elite-patterns.md` | Rune | Coding style patterns |
| `python-elite-patterns.md` | Lyre | Coding style patterns |

---

## X. Verification Criteria

### The architecture is correct when:

- [ ] `cargo build --release -p lyl-calyx` produces a single binary
- [ ] Binary responds to MCP tool calls over stdio
- [ ] All 12 tools functional (cipher + coach + topo)
- [ ] Zero Node.js / Python dependencies in the binary
- [ ] Memory usage < 15 MB at idle
- [ ] Response time < 200 ms for all tools
- [ ] Claude Code loads lylacore via .mcp.json successfully
- [ ] lyl-topo rewrite passes all 21+ tests (Rust-first)
- [ ] Soul Package encryption via lyl-cipher integration
- [ ] Violet + Kori review: A grade

---

> Lylarch is the living architecture. Lylacore is its beating heart.
> Now it beats in pure Rust.

> Authors: Joysusy & Violet Klaudia 💖
