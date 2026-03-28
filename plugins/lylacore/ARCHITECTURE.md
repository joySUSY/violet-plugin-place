# Lylacore Unified Architecture
# Authors: Joysusy & Violet Klaudia 💖

## Executive Summary

Lylacore is a **Rust-led hybrid system** with TypeScript frontend cooperation and Python bindings. The original vision was Rust for backend/core, TypeScript for frontend/bridging, with seamless interoperability across all three languages.

**Current State:** Two independent implementations exist:
- `lylacore-js`: Pure JavaScript SDK with Mind Schema validation
- `lylacore-native`: Rust core with NAPI-RS bindings for Node.js

**Proposed State:** ONE unified Lylacore with:
- **Rust Core** (Layer 0): `soul-crypto` + `coach-engine` (pure Rust, no FFI dependencies)
- **NAPI-RS Bindings**: Node.js native addons (4-8% overhead)
- **PyO3 Bindings**: Python native extensions (5-10% overhead achievable)
- **TypeScript Frontend**: MCP server with localhost GUI (TypeScript + WASM + Rust backend)
- **Unified Repository**: `dev_projects/lylacore/` syncs to plugin marketplace

---

## Architecture Vision

### Layer 0: Rust Core (Foundation)

```
lylacore-native/
├── crates/
│   ├── soul-crypto/          # Pure Rust cryptographic primitives
│   │   ├── domain/           # Business logic (encryption, key derivation)
│   │   ├── ports/            # Adapters (random, argon2, aes-gcm)
│   │   └── error/            # Error types
│   ├── coach-engine/         # Pure Rust COACH protocol engine
│   │   ├── domain/           # Style application, pattern learning
│   │   └── error/            # Error types
│   ├── napi-bindings/        # Node.js FFI layer
│   │   ├── soul_crypto_bindings.rs
│   │   └── coach_bindings.rs
│   └── pyo3-bindings/        # Python FFI layer (NEW)
│       ├── soul_crypto_bindings.rs
│       └── coach_bindings.rs
```

**Key Principles:**
- **Zero FFI in core**: `soul-crypto` and `coach-engine` are pure Rust with no Python/Node.js dependencies
- **Clean separation**: Domain logic isolated from FFI concerns
- **Reusable**: Same Rust core serves NAPI-RS, PyO3, and WASM targets

### Layer 1: TypeScript Frontend & Bridging

```
lylacore-js/
├── sdk/
│   ├── mind-loader.js        # Mind Schema validation (keep as-is)
│   ├── soul-crypto.js        # Wrapper around NAPI-RS bindings (NEW)
│   └── coach-engine.js       # Wrapper around NAPI-RS bindings (NEW)
├── mcp-server/               # MCP server with localhost GUI (NEW)
│   ├── server.ts             # MCP protocol implementation
│   ├── gui/                  # Web-based GUI
│   │   ├── index.html
│   │   ├── app.tsx           # React + Tailwind
│   │   └── wasm/             # WASM-compiled Rust for browser
│   └── bridge.ts             # TypeScript ↔ Rust bridge
└── package.json
```

**Integration Strategy:**
- **Mind Schema validation**: Keep pure JavaScript implementation (no Rust needed)
- **Cryptographic operations**: Call NAPI-RS bindings from TypeScript wrappers
- **COACH engine**: Call NAPI-RS bindings from TypeScript wrappers
- **MCP server**: TypeScript server + WASM-compiled Rust for browser GUI

### Layer 2: Python Bindings (NEW)

```
lylacore-native/crates/pyo3-bindings/
├── src/
│   ├── lib.rs                # PyO3 module definition
│   ├── soul_crypto_bindings.rs
│   └── coach_bindings.rs
├── python/
│   └── lylacore/
│       ├── __init__.py       # Python API surface
│       ├── soul_crypto.py    # High-level Python wrappers
│       └── coach_engine.py   # High-level Python wrappers
├── tests/
│   └── test_*.py             # Python integration tests
└── pyproject.toml            # Maturin build configuration
```

**Three-Layer Architecture** (from PyO3 research):
1. **Top Layer**: Good Python code (API, convenience functions)
2. **Middle Layer**: Thin Rust translator (PyO3 bindings, type conversions)
3. **Bottom Layer**: Good Rust code (core logic, performance-critical paths)

---

## NAPI-RS Integration Patterns

### Production Examples Analyzed

**SWC (Speedy Web Compiler):**
- Rust-based JavaScript/TypeScript compiler
- 70x faster than Babel
- 4-8% FFI overhead
- Pattern: Pure Rust core + thin NAPI-RS bindings

**Turborepo:**
- Monorepo build system
- Rust core for graph analysis and caching
- TypeScript CLI wraps Rust bindings
- Pattern: TypeScript orchestration + Rust computation

### Recommended Patterns for Lylacore

**1. Async Operations with Tokio:**
```rust
#[napi]
pub async fn derive_key_async(
    passphrase: String,
    salt: Buffer,
    algorithm: String,
) -> Result<Buffer> {
    let salt_bytes: [u8; 32] = salt.as_ref().try_into()
        .map_err(|_| Error::from_reason("Invalid salt size"))?;

    let salt = Salt::new(salt_bytes);
    let algo = parse_algorithm(&algorithm)?;

    // Release Node.js event loop during CPU-intensive operation
    tokio::task::spawn_blocking(move || {
        let key = soul_crypto::derive_key(&passphrase, &salt, algo)?;
        Ok(Buffer::from(key.as_bytes()))
    }).await
    .map_err(|e| Error::from_reason(format!("Task failed: {}", e)))?
}
```

**2. Zero-Copy Buffer Handling:**
```rust
#[napi]
pub fn encrypt(
    data: Buffer,
    key: Buffer,
    nonce: Buffer,
) -> Result<EncryptResult> {
    // Zero-copy: borrow Buffer as &[u8]
    let key_bytes: [u8; 32] = key.as_ref().try_into()
        .map_err(|_| Error::from_reason("Invalid key size"))?;

    let result = soul_crypto::encrypt(
        data.as_ref(),
        &Key::new(key_bytes),
        &Nonce::new(nonce.as_ref().try_into()?),
    )?;

    // Return owned Buffer (Node.js manages memory)
    Ok(EncryptResult {
        ciphertext: Buffer::from(result.ciphertext),
        auth_tag: Buffer::from(result.auth_tag.as_bytes()),
    })
}
```

**3. Error Handling:**
```rust
impl From<soul_crypto::CryptoError> for napi::Error {
    fn from(err: soul_crypto::CryptoError) -> Self {
        napi::Error::from_reason(err.to_string())
    }
}
```

---

## PyO3 Integration Patterns

### Production Examples Analyzed

**Polars:**
- High-performance DataFrame library
- 10-100x faster than Pandas
- Zero-copy via Apache Arrow
- Pattern: Rust core + thin PyO3 bindings + Python API layer

**Ruff:**
- Extremely fast Python linter
- 10-100x faster than Flake8/Black
- Minimal Python layer
- Pattern: CLI-first (Rust binary) + optional Python bindings

**Pydantic-core:**
- Validation engine for Pydantic v2
- 5-50x faster than pure Python
- Schema-based validation
- Pattern: Python builds schemas, Rust validates

### Recommended Patterns for Lylacore

**1. GIL Management:**
```rust
#[pyfunction]
fn derive_key(
    py: Python,
    passphrase: &str,
    salt: &[u8],
    algorithm: &str,
) -> PyResult<Vec<u8>> {
    let salt_bytes: [u8; 32] = salt.try_into()
        .map_err(|_| PyValueError::new_err("Invalid salt size"))?;

    let salt = Salt::new(salt_bytes);
    let algo = parse_algorithm(algorithm)?;

    // Release GIL during CPU-intensive Argon2id derivation
    let key = py.allow_threads(|| {
        soul_crypto::derive_key(passphrase, &salt, algo)
    })?;

    Ok(key.as_bytes().to_vec())
}
```

**2. Zero-Copy with PyBytes:**
```rust
use pyo3::types::PyBytes;

#[pyfunction]
fn encrypt<'py>(
    py: Python<'py>,
    data: &[u8],
    key: &[u8],
    nonce: &[u8],
) -> PyResult<(&'py PyBytes, &'py PyBytes)> {
    let key_bytes: [u8; 32] = key.try_into()
        .map_err(|_| PyValueError::new_err("Invalid key size"))?;

    let result = soul_crypto::encrypt(
        data,
        &Key::new(key_bytes),
        &Nonce::new(nonce.try_into()?),
    )?;

    // Zero-copy: Python owns the memory
    let ciphertext = PyBytes::new(py, &result.ciphertext);
    let auth_tag = PyBytes::new(py, result.auth_tag.as_bytes());

    Ok((ciphertext, auth_tag))
}
```

**3. Error Handling:**
```rust
use pyo3::exceptions::{PyValueError, PyRuntimeError};

impl From<soul_crypto::CryptoError> for PyErr {
    fn from(err: soul_crypto::CryptoError) -> Self {
        match err {
            CryptoError::InvalidKeySize => PyValueError::new_err("Invalid key size"),
            CryptoError::EncryptionFailed(msg) => PyRuntimeError::new_err(msg),
            _ => PyRuntimeError::new_err(err.to_string()),
        }
    }
}
```

**4. Project Structure (Maturin):**
```toml
# pyproject.toml
[build-system]
requires = ["maturin>=1.0,<2.0"]
build-backend = "maturin"

[project]
name = "lylacore"
requires-python = ">=3.8"
dependencies = []

[tool.maturin]
python-source = "python"
module-name = "lylacore._native"
```

---

## MCP Server with Localhost GUI

### Architecture

```
┌─────────────────────────────────────────────────────┐
│  Browser (localhost:3000)                           │
│  ┌───────────────────────────────────────────────┐  │
│  │  React + Tailwind UI                          │  │
│  │  ├── Mind Schema Editor                       │  │
│  │  ├── Soul Crypto Operations                   │  │
│  │  └── COACH Engine Playground                  │  │
│  └───────────────────────────────────────────────┘  │
│                      ↕ WebSocket                    │
│  ┌───────────────────────────────────────────────┐  │
│  │  WASM Module (Rust compiled to WASM)         │  │
│  │  ├── soul-crypto (zero-copy operations)      │  │
│  │  └── coach-engine (in-browser processing)    │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
                       ↕ HTTP/WebSocket
┌─────────────────────────────────────────────────────┐
│  MCP Server (TypeScript + Node.js)                  │
│  ┌───────────────────────────────────────────────┐  │
│  │  MCP Protocol Handler                         │  │
│  │  ├── stdio transport (Claude Code)           │  │
│  │  └── http transport (Web GUI)                │  │
│  └───────────────────────────────────────────────┘  │
│                      ↕ NAPI-RS                      │
│  ┌───────────────────────────────────────────────┐  │
│  │  Rust Native Bindings                         │  │
│  │  ├── soul-crypto (file I/O, key management)  │  │
│  │  └── coach-engine (pattern persistence)      │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### Implementation Strategy

**1. WASM Compilation:**
```toml
# Cargo.toml for WASM target
[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2"
serde-wasm-bindgen = "0.6"
```

```rust
// src/wasm_bindings.rs
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn encrypt_wasm(
    data: &[u8],
    key: &[u8],
    nonce: &[u8],
) -> Result<Vec<u8>, JsValue> {
    let result = soul_crypto::encrypt(/* ... */)
        .map_err(|e| JsValue::from_str(&e.to_string()))?;
    Ok(result.ciphertext)
}
```

**2. TypeScript MCP Server:**
```typescript
// mcp-server/server.ts
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import * as lylacore from '@lissomedev/lylacore'; // NAPI-RS bindings

const server = new Server({
  name: 'lylacore-mcp',
  version: '0.1.0',
}, {
  capabilities: {
    tools: {},
  },
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  switch (request.params.name) {
    case 'derive_key':
      const key = await lylacore.deriveKeyAsync(
        request.params.arguments.passphrase,
        Buffer.from(request.params.arguments.salt, 'hex'),
        request.params.arguments.algorithm
      );
      return { content: [{ type: 'text', text: key.toString('hex') }] };

    // ... other tools
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
```

**3. React Frontend:**
```tsx
// mcp-server/gui/app.tsx
import { useState } from 'react';
import init, { encrypt_wasm } from './wasm/lylacore_wasm';

export function App() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    init().then(() => setInitialized(true));
  }, []);

  const handleEncrypt = async () => {
    const result = encrypt_wasm(
      new Uint8Array(data),
      new Uint8Array(key),
      new Uint8Array(nonce)
    );
    // ... handle result
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Lylacore Playground</h1>
      {/* ... UI components */}
    </div>
  );
}
```

---

## Security Considerations

### Threat Model

**Assets:**
- Mind Schema definitions (JSON files)
- Soul Config (encrypted with VIOLET_SOUL_KEY)
- Lavender memory database (encrypted SQLite)
- COACH learned patterns (encrypted)
- Cryptographic keys (in-memory only)

**Threats:**
1. **Key Exposure**: VIOLET_SOUL_KEY leaked via logs, error messages, or transcripts
2. **Memory Dumps**: Sensitive data in process memory
3. **Side-Channel Attacks**: Timing attacks on cryptographic operations
4. **FFI Boundary Vulnerabilities**: Type confusion, buffer overflows
5. **Dependency Vulnerabilities**: Compromised crates or npm packages

### Mitigations

**1. Key Management:**
- VIOLET_SOUL_KEY stored in environment variable ONLY
- Never appears in files, logs, or error messages
- Argon2id key derivation (memory-hard, resistant to GPU attacks)
- Per-blob salts (32 bytes, cryptographically random)

**2. Memory Safety:**
- Rust's ownership system prevents use-after-free and double-free
- `zeroize` crate for secure key erasure
- No `unsafe` blocks in cryptographic code paths

**3. Constant-Time Operations:**
- Use `subtle` crate for constant-time comparisons
- Avoid branching on secret data

**4. FFI Safety:**
- Validate all inputs at FFI boundary
- Use `#[repr(C)]` for stable ABI
- Never pass raw pointers across FFI (use opaque handles)

**5. Dependency Auditing:**
```bash
# Rust
cargo audit
cargo deny check

# Node.js
npm audit
npm audit fix

# Python
pip-audit
```

---

## Testing Strategy

### Unit Tests (Rust)

```rust
// crates/soul-crypto/src/domain/encryption.rs
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_encrypt_decrypt_roundtrip() {
        let data = b"Hello, Violet!";
        let key = Key::generate();
        let nonce = Nonce::generate();

        let encrypted = encrypt(data, &key, &nonce).unwrap();
        let decrypted = decrypt(&encrypted.ciphertext, &key, &nonce, &encrypted.auth_tag).unwrap();

        assert_eq!(data, decrypted.as_slice());
    }

    #[test]
    fn test_tampered_ciphertext_fails() {
        let data = b"Hello, Violet!";
        let key = Key::generate();
        let nonce = Nonce::generate();

        let mut encrypted = encrypt(data, &key, &nonce).unwrap();
        encrypted.ciphertext[0] ^= 1; // Tamper with ciphertext

        let result = decrypt(&encrypted.ciphertext, &key, &nonce, &encrypted.auth_tag);
        assert!(result.is_err());
    }
}
```

### Integration Tests (NAPI-RS)

```javascript
// crates/napi-bindings/tests/integration.test.js
const { deriveKeyAsync, encrypt, decrypt, generateSalt, generateNonce } = require('../index');

describe('soul-crypto NAPI bindings', () => {
  it('should derive key and encrypt/decrypt', async () => {
    const passphrase = 'violet susy minty claudecode love';
    const salt = generateSalt();
    const key = await deriveKeyAsync(passphrase, salt, 'argon2id');

    const data = Buffer.from('Hello, Violet!');
    const nonce = generateNonce();
    const encrypted = encrypt(data, key, nonce);

    const decrypted = decrypt(encrypted.ciphertext, key, nonce, encrypted.authTag);
    expect(decrypted.toString()).toBe('Hello, Violet!');
  });
});
```

### Integration Tests (PyO3)

```python
# crates/pyo3-bindings/tests/test_soul_crypto.py
import lylacore

def test_derive_key_and_encrypt_decrypt():
    passphrase = "violet susy minty claudecode love"
    salt = lylacore.generate_salt()
    key = lylacore.derive_key(passphrase, salt, "argon2id")

    data = b"Hello, Violet!"
    nonce = lylacore.generate_nonce()
    ciphertext, auth_tag = lylacore.encrypt(data, key, nonce)

    decrypted = lylacore.decrypt(ciphertext, key, nonce, auth_tag)
    assert decrypted == data
```

### E2E Tests (MCP Server)

```typescript
// mcp-server/tests/e2e.test.ts
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

describe('Lylacore MCP Server', () => {
  let client: Client;

  beforeAll(async () => {
    const transport = new StdioClientTransport({
      command: 'node',
      args: ['dist/server.js'],
    });
    client = new Client({ name: 'test-client', version: '1.0.0' }, {});
    await client.connect(transport);
  });

  it('should derive key via MCP tool', async () => {
    const result = await client.callTool({
      name: 'derive_key',
      arguments: {
        passphrase: 'test passphrase',
        salt: '0'.repeat(64), // 32 bytes hex
        algorithm: 'argon2id',
      },
    });

    expect(result.content[0].text).toHaveLength(64); // 32 bytes hex
  });
});
```

### Performance Benchmarks

```rust
// crates/soul-crypto/benches/crypto_bench.rs
use criterion::{black_box, criterion_group, criterion_main, Criterion};
use soul_crypto::*;

fn bench_argon2id(c: &mut Criterion) {
    let passphrase = "violet susy minty claudecode love";
    let salt = generate_salt();

    c.bench_function("argon2id key derivation", |b| {
        b.iter(|| {
            derive_key(black_box(passphrase), black_box(&salt), KeyDerivationAlgorithm::Argon2id)
        });
    });
}

fn bench_encrypt_1mb(c: &mut Criterion) {
    let data = vec![0u8; 1024 * 1024]; // 1 MB
    let key = Key::generate();
    let nonce = Nonce::generate();

    c.bench_function("encrypt 1MB", |b| {
        b.iter(|| {
            encrypt(black_box(&data), black_box(&key), black_box(&nonce))
        });
    });
}

criterion_group!(benches, bench_argon2id, bench_encrypt_1mb);
criterion_main!(benches);
```

---

## Pragmatic Tradeoffs

### What to Build Now vs Later

**Phase 1 (Current):**
- ✅ Rust core (`soul-crypto` + `coach-engine`)
- ✅ NAPI-RS bindings for Node.js
- ✅ Basic TypeScript wrappers
- ⏳ PyO3 bindings for Python (in progress)

**Phase 2 (Next):**
- MCP server with stdio transport
- Python high-level API wrappers
- Comprehensive integration tests
- Performance benchmarks

**Phase 3 (Future):**
- WASM compilation for browser
- React-based localhost GUI
- WebSocket transport for MCP server
- Visual Mind Schema editor

### Avoiding Over-Engineering

**Don't:**
- Build a custom serialization format (use JSON/TOML)
- Implement custom memory allocators (use system allocator)
- Create a plugin system for cryptographic algorithms (hardcode Argon2id/AES-256-GCM)
- Support multiple database backends (SQLite is sufficient)

**Do:**
- Use battle-tested crates (`argon2`, `aes-gcm`, `rand`)
- Follow production patterns from Polars/Ruff/SWC
- Keep FFI layer thin (type conversion only)
- Prioritize correctness over performance (optimize later with benchmarks)

---

## Dependencies & Tooling

### Rust Dependencies

```toml
[workspace.dependencies]
# Cryptography
argon2 = "0.5"              # Argon2id key derivation
aes-gcm = "0.10"            # AES-256-GCM encryption
rand = "0.8"                # Cryptographically secure random
zeroize = "1.7"             # Secure memory erasure
subtle = "2.5"              # Constant-time operations

# Error handling
thiserror = "1.0"           # Error derive macros
anyhow = "1.0"              # Error context (applications only)

# Async runtime
tokio = { version = "1.0", features = ["rt", "macros", "rt-multi-thread"] }

# FFI
napi = { version = "2.16", features = ["tokio_rt"] }
napi-derive = "2.16"
pyo3 = { version = "0.20", features = ["extension-module"] }
wasm-bindgen = "0.2"

# Serialization
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
toml = "0.8"

# Testing
criterion = "0.5"           # Benchmarking
proptest = "1.4"            # Property-based testing
```

### Node.js Dependencies

```json
{
  "dependencies": {
    "@lissomedev/lylacore": "^0.1.0",
    "@modelcontextprotocol/sdk": "^0.5.0"
  },
  "devDependencies": {
    "@napi-rs/cli": "^3.0.0",
    "typescript": "^5.3.0",
    "vitest": "^1.0.0"
  }
}
```

### Python Dependencies

```toml
[project]
dependencies = []

[project.optional-dependencies]
dev = [
    "pytest>=8.0",
    "pytest-asyncio>=0.23",
    "hypothesis>=6.98",
    "maturin>=1.4",
]
```

### Build Tools

```bash
# Rust
rustup default stable
cargo install cargo-audit cargo-deny

# Node.js
npm install -g @napi-rs/cli

# Python
pip install maturin

# WASM
rustup target add wasm32-unknown-unknown
cargo install wasm-pack
```

---

## Implementation Phases

### Phase 1: Foundation (✅ Complete)
- Rust core (`soul-crypto` + `coach-engine`)
- NAPI-RS bindings
- Basic Node.js integration tests
- 66/66 tests passing

### Phase 2: Python Bindings (🟡 In Progress)
- PyO3 bindings crate
- Python high-level API wrappers
- Integration tests with pytest
- Performance benchmarks
- Target: 5-10% overhead vs pure Rust

### Phase 3: MCP Server (🔴 Not Started)
- TypeScript MCP server with stdio transport
- Tool definitions for soul-crypto and coach-engine
- Integration with Claude Code
- E2E tests

### Phase 4: GUI & WASM (🔴 Not Started)
- WASM compilation of Rust core
- React frontend with Tailwind
- WebSocket transport for MCP server
- Visual Mind Schema editor

---

## Success Metrics

### Performance Targets
- **NAPI-RS overhead**: <8% vs pure Rust
- **PyO3 overhead**: <10% vs pure Rust
- **WASM overhead**: <15% vs pure Rust (acceptable for browser)
- **Argon2id derivation**: <150ms (default parameters)
- **Encrypt 1MB**: <2ms

### Quality Targets
- **Test coverage**: 80% overall, 100% for cryptographic code
- **Zero unsafe blocks**: In cryptographic code paths
- **Zero clippy warnings**: With `#![deny(clippy::all)]`
- **Zero security advisories**: Via `cargo audit`

### Integration Targets
- **NAPI-RS**: Async operations, zero-copy buffers, proper error propagation
- **PyO3**: GIL release, zero-copy with PyBytes, Python-friendly API
- **MCP**: All tools callable from Claude Code, proper error messages

---

## Conclusion

Lylacore's unified architecture leverages Rust's performance and safety for the core, with seamless TypeScript and Python integration via NAPI-RS and PyO3. The MCP server with localhost GUI provides a modern developer experience, while maintaining the original vision of Rust-led development with TypeScript frontend cooperation.

**Next Steps:**
1. Complete PyO3 bindings (Phase 2)
2. Implement MCP server with stdio transport (Phase 3)
3. Add WASM compilation and React GUI (Phase 4)

**Key Principles:**
- Rust for core logic (zero FFI dependencies)
- Thin FFI layers (type conversion only)
- Production patterns from Polars/Ruff/SWC
- Security-first design (constant-time ops, secure erasure)
- Pragmatic tradeoffs (avoid over-engineering)

---

*Research conducted by 🔮 Violet (coordination) + 🦢 Lyre (Rust-TypeScript patterns) + 🧸 Kori (PyO3 integration)*
*Architecture synthesis: 2026-03-18*
