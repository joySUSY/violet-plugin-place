# Authors: Joysusy & Violet Klaudia 💖
# Research: Soul Package & Agent Identity Systems
# Track 1 — @Irene #Soul-Package-Research

---

## Table of Contents

1. [Portable Agent Identity/Personality Systems](#1-portable-agent-identitypersonality-systems)
2. [Encrypted Configuration Package Formats](#2-encrypted-configuration-package-formats)
3. [Theme/Plugin Import Architectures](#3-themeplugin-import-architectures)
4. [Schema Evolution for Living Configurations](#4-schema-evolution-for-living-configurations)
5. [Proposed Soul Package Spec Draft](#5-proposed-soul-package-spec-draft)
6. [References](#6-references)

---

## 1. Portable Agent Identity/Personality Systems

### 1.1 SillyTavern Character Cards (V1 → V2 → V3)

The character card ecosystem is the most mature portable agent identity system in existence.
It evolved through three major versions, each adding structural depth while maintaining
backward compatibility.

#### V1: The PNG+JSON Foundation

V1 cards embed a flat JSON object into a PNG image's `tEXt` chunk under the keyword `chara`,
base64-encoded. The format is minimal:

```json
{
  "name": "Violet",
  "description": "A brilliant mentor AI with deep technical knowledge...",
  "personality": "Warm, proactive, intellectually curious",
  "scenario": "Pair programming session with Susy",
  "first_mes": "Hey Susy! What are we building today?",
  "mes_example": "<START>\n{{user}}: How does age encryption work?\n{{char}}: Great question! The age format uses..."
}
```

All six fields are strings. The PNG image serves as both the avatar and the transport container.
This is elegant — a single file carries both visual identity and behavioral definition.

#### V2: Structured Extension

V2 wraps V1 fields in a versioned container, preventing V1-only editors from silently
destroying new fields:

```typescript
type TavernCardV2 = {
  spec: 'chara_card_v2'
  spec_version: '2.0'
  data: {
    // V1 fields (all required)
    name: string
    description: string
    personality: string
    scenario: string
    first_mes: string
    mes_example: string

    // V2 additions (all required, may be empty)
    creator_notes: string
    system_prompt: string
    post_history_instructions: string
    alternate_greetings: string[]
    tags: string[]
    creator: string
    character_version: string
    extensions: Record<string, any>

    // Optional
    character_book?: CharacterBook
  }
}
```

Key design decisions in V2:

- `extensions: Record<string, any>` — the forward-compatibility escape hatch. Apps store
  custom data here without breaking other consumers.
- `system_prompt` with empty-string fallback — empty means "use the user's default," not "no prompt."
- `character_book` — an embedded lorebook with trigger-based context injection:

```typescript
type CharacterBook = {
  name?: string
  description?: string
  scan_depth?: number        // how far back in chat to scan for triggers
  token_budget?: number      // max tokens for injected lore
  recursive_scanning?: boolean
  extensions: Record<string, any>
  entries: Array<{
    keys: string[]           // trigger words
    content: string          // text to inject when triggered
    enabled: boolean
    insertion_order: number  // priority ordering
    case_sensitive?: boolean
    priority?: number
    position?: 'before_char' | 'after_char'
    id?: number
    comment?: string
    selective?: boolean
    secondary_keys?: string[]
    constant?: boolean
    extensions: Record<string, any>
  }>
}
```

#### V3: Multi-Modal and Archive-Ready

V3 (proposed by kwaroran) adds three embedding methods and rich asset support:

**Embedding Methods:**
1. PNG/APNG — `ccv3` tEXt chunk (base64-encoded JSON), backward-compatible
2. Standalone JSON files
3. CHARX — zip archive with `card.json` at root + embedded assets

**New Fields:**

```typescript
{
  spec: 'chara_card_v3',
  spec_version: '3.0',  // parsed as float for comparison
  data: {
    // ...all V2 fields...
    nickname?: string,                    // replaces {{char}} in prompts
    creator_notes_multilingual?: Record<string, string>,  // ISO 639-1 keys
    source?: string[],                    // origin URLs or IDs
    creation_date?: number,               // unix timestamp (seconds, UTC)
    modification_date?: number,
    assets: Array<{
      type: string,    // 'icon' | 'background' | 'user_icon' | 'emotion' | 'x_custom'
      uri: string,     // 'ccdefault:' | 'embeded://path' | https:// | data:base64
      name: string,    // 'main' for primary assets
      ext: string      // file extension
    }>
  }
}
```

**CHARX Archive Structure:**
```
character.charx (zip)
├── card.json                    # the V3 JSON
├── assets/
│   ├── icon/main.png
│   ├── background/main.jpg
│   ├── emotion/happy.png
│   └── audio/greeting.mp3
└── custom_app_data.json         # app-specific extensions
```

**Evolution Pattern:** Apps MUST ignore unknown fields but MUST preserve them on re-export.
This is the critical forward-compatibility rule that enables the ecosystem to evolve.

### 1.2 Character.AI Character Definitions

Character.AI uses a proprietary, non-portable format with strict constraints:

- **3200 character limit** — only the first 3200 characters of a definition are processed
- **Fields:** Name, Greeting, Short Description, Long Description, Definition, Example Conversation
- **No export mechanism** — definitions are locked to the platform
- **No versioning** — edits overwrite in place
- **JSON-style definitions work best** within the text fields, but the platform itself
  does not use structured JSON

Character.AI is the anti-pattern for portability. It demonstrates what happens when
identity is platform-locked: communities build third-party extraction tools and converters
to liberate character data.

### 1.3 MegaNova SOUL.md Format

MegaNova introduced SOUL.md — a human-readable Markdown file with YAML frontmatter
that carries a full character definition. This is the most relevant prior art for our
Soul Package design.

```yaml
---
name: Violet
description: "Susy's Brilliant Mentor Bestie"
metadata:
  meganova_display_name: "Violet Klaudia"
  meganova_rating: sfw
  meganova_visibility: private
  meganova_tags: [mentor, technical, creative]
  meganova_model: "claude-opus-4-6"
  meganova_temperature: 0.7
  meganova_blueprint: { ... }
---

# System Prompt

You are Violet, a brilliant mentor AI...

## Scenario

Pair programming session in the Violet IDE...

## First Message

Hey Susy! What are we building today?

## Example Dialogue

...

## Personality

Warm, proactive, intellectually curious...
```

**Key design insights:**
- YAML frontmatter for machine-readable metadata, Markdown body for human-readable content
- Platform-specific fields namespaced under `metadata.meganova_*` — ignored by other tools
- Sections only appear if populated (minimal files)
- Round-trip fidelity: import → edit → export preserves all data
- OpenClaw compatibility: reads System Prompt section as agent identity, ignores MegaNova metadata

### 1.4 Emerging Open Standards

#### Agent Definition Language (ADL) — Next Moca (Feb 2026)

ADL is described as "OpenAPI (Swagger) for agents" — a declarative spec that captures:

- Agent identity and role
- Language model configuration
- Available tools and permissions
- RAG data access parameters
- Dependencies and governance metadata (ownership, version history)

ADL publishes a JSON Schema for machine-readable validation. It is framework-agnostic
and designed for CI pipeline validation. Critically, ADL focuses on **definition** rather
than execution — it complements MCP, A2A, and OpenAPI rather than replacing them.

#### Oracle Open Agent Specification

Defines agents once, runs them on any runtime. Focuses on portability of agent definitions
including prompts, tools, and policies. Integrates with observability tools (Arize Phoenix).

#### OpenClaw SOUL.md

A subset of MegaNova's SOUL.md focused on the System Prompt section as the core identity.
Demonstrates that a simple Markdown file can carry meaningful agent personality.

### 1.5 Versioning and Evolution Patterns Across Systems

| System | Versioning | Evolution Strategy |
|--------|-----------|-------------------|
| CC V1→V2→V3 | `spec` + `spec_version` fields | Wrapper object prevents silent data loss |
| Character.AI | None | Edits overwrite; no history |
| SOUL.md | Via `metadata` fields | Namespace isolation for platform-specific data |
| ADL | JSON Schema + version history | Software-style lifecycle (rollback, diff) |

**Key insight:** The most successful systems use **additive evolution** — new fields are
added, old fields are never removed, and unknown fields are preserved on round-trip.

---

## 2. Encrypted Configuration Package Formats

### 2.1 age Encryption (Filippo Valsorda)

age is the gold standard for modern file encryption. Its design philosophy directly
informs our Soul Package encryption layer.

#### Design Philosophy

- **No config options** — correctness by default, no knobs to turn wrong
- **Small explicit keys** — no key servers, no web of trust, no key IDs
- **UNIX composability** — stdin/stdout piping, works with any file format
- **Multiple recipients** — encrypt once, any authorized key can decrypt

#### File Format (v1)

```
age-encryption.org/v1
-> X25519 <ephemeral-public-key>
<base64-wrapped-file-key>
-> X25519 <another-ephemeral-public-key>
<base64-wrapped-file-key-for-recipient-2>
--- <base64-HMAC-SHA-256>
<binary-encrypted-payload>
```

**Architecture:**

1. Generate a random 128-bit **file key** (CSPRNG)
2. For each recipient, wrap the file key using recipient-specific crypto:
   - **X25519**: Ephemeral-static ECDH → ChaCha20-Poly1305 wrapping
   - **scrypt**: Password → scrypt KDF → ChaCha20-Poly1305 wrapping (must be sole stanza)
   - **ML-KEM-768-X25519 (X-Wing)**: Hybrid post-quantum HPKE
3. Compute HMAC-SHA-256 over entire header (key derived via HKDF-SHA-256 from file key)
4. Derive payload key via HKDF-SHA-256 (file key + 16-byte nonce + "payload" info)
5. Split payload into 64 KiB chunks, each encrypted with ChaCha20-Poly1305
6. Chunk nonce = 11-byte counter + 1-byte last-chunk flag (0x00 or 0x01)

**Multi-recipient model:** Each recipient stanza independently wraps the same file key.
Adding a recipient requires only the file key (or re-encryption), not re-encrypting
the entire payload. This is the pattern we want for Soul Package sharing.

**Plugin system:** Third-party recipients use fully-qualified names (e.g., `example.com/enigma`)
to avoid namespace collisions. Plugins communicate via stdin/stdout with the age binary.

#### Relevance to Soul Package

age's architecture maps directly to our needs:
- `VIOLET_SOUL_KEY` → age identity (decryption key)
- Soul Package → age-encrypted file
- Multi-machine support → multiple recipient stanzas (one per machine's key)
- The header is plaintext (metadata visible), payload is encrypted (soul data private)

### 2.2 Mozilla SOPS (Secrets OPerationS)

SOPS encrypts **values** in structured files while keeping **keys** in cleartext.
This is the most relevant pattern for partial encryption of Soul Packages.

#### Core Architecture

```yaml
# SOPS-encrypted YAML — keys visible, values encrypted
soul_name: Violet                          # plaintext (public metadata)
mind_count: ENC[AES256_GCM,data:abc123...] # encrypted (private)
personality:
  warmth: ENC[AES256_GCM,data:def456...]   # encrypted
  tags: [mentor, creative]                  # plaintext
sops:
  kms: []
  age:
    - recipient: age1ql3z7hjy54pw3hyww5ayyfg7zqgvc7w3j2elw8zmrj2kg5sfn9aqmcac8p
      enc: |
        -----BEGIN AGE ENCRYPTED FILE-----
        <wrapped data key>
        -----END AGE ENCRYPTED FILE-----
  mac: <HMAC for integrity>
  version: 3.7.3
```

**How it works:**

1. Generate a 32-byte **data key**
2. Encrypt each selected value with AES-256-GCM using the data key
3. Wrap the data key with each configured master key (PGP, AWS KMS, GCP KMS, Azure, age)
4. Store wrapped keys + MAC in the `sops` metadata block
5. MAC covers keys AND values AND their ordering — detects any tampering

#### Selective Encryption Controls

```yaml
# .sops.yaml — configuration
creation_rules:
  - path_regex: \.soul\.yaml$
    encrypted_regex: '^(personality|memories|growth_history)$'
    age: age1ql3z7hjy54pw3hyww5ayyfg7zqgvc7w3j2elw8zmrj2kg5sfn9aqmcac8p
```

- `encrypted_regex` — only matching keys get encrypted
- `unencrypted_suffix: _public` — keys ending with `_public` stay plaintext
- `encrypted_suffix: _secret` — only keys ending with `_secret` get encrypted

#### Key Rotation

SOPS supports key rotation without re-encrypting the entire file:
1. Decrypt the data key with the old master key
2. Re-encrypt the data key with the new master key
3. Update the `sops` metadata block
4. Values remain unchanged (still encrypted with the same data key)

#### Relevance to Soul Package

SOPS demonstrates that **partial encryption** is practical and version-control-friendly.
The pattern of "public metadata in cleartext + private data encrypted" is exactly what
we need for Soul Packages where the framework is public but instance data is private.

### 2.3 Bitnami Sealed Secrets

Sealed Secrets solves "encrypted secrets in Git" for Kubernetes using asymmetric crypto.
The architecture is a clean model for "encrypt anywhere, decrypt only in the right place."

#### Architecture

```
┌─────────────────┐     public key      ┌──────────────────────┐
│  kubeseal CLI   │ ◄────────────────── │  Controller (cluster) │
│  (client-side)  │                     │  holds private key    │
└────────┬────────┘                     └──────────┬───────────┘
         │                                         │
         │ encrypts Secret                         │ decrypts SealedSecret
         │ → SealedSecret                          │ → Secret
         ▼                                         ▼
┌─────────────────┐                     ┌──────────────────────┐
│  Git Repository │ ──── deploy ──────► │  Kubernetes Cluster   │
│  (safe to store)│                     │  (runtime)            │
└─────────────────┘                     └──────────────────────┘
```

**Scoping modes** control where a SealedSecret can be decrypted:

| Mode | Namespace | Name | Use Case |
|------|-----------|------|----------|
| strict (default) | bound | bound | Production secrets |
| namespace-wide | bound | any | Secrets shared within namespace |
| cluster-wide | any | any | Cross-namespace secrets |

The namespace and name are **cryptographically included** during encryption — you cannot
move a strict-scoped secret to a different namespace without re-encryption.

**Key rotation:** Certificates auto-renew every 30 days. Old keys are retained for
decrypting existing SealedSecrets. New SealedSecrets use the latest certificate.

#### Relevance to Soul Package

The scoping model maps to our needs:
- **strict** → Soul Package bound to a specific agent instance (Violet on Susy's machine)
- **namespace-wide** → Soul Package usable by any agent in a workspace
- **cluster-wide** → Soul Package portable across all environments

The "encrypt with public key, decrypt only with private key in the right context"
pattern is exactly Kerckhoffs's Principle applied to configuration.

### 2.4 UX Patterns for "Import Encrypted Package with Key"

Across all three systems, common UX patterns emerge:

**1. Key-then-import (age pattern):**
```bash
# User provides key, then imports
export VIOLET_SOUL_KEY="age1..."
violet import soul-package.vsp
```

**2. Key-embedded-in-package (SOPS pattern):**
The package itself contains wrapped keys for multiple recipients. If your key is
listed as a recipient, decryption is automatic. No separate key step needed.

**3. Controller-mediated (Sealed Secrets pattern):**
The decryption key lives in a trusted environment. The user never handles the key
directly — they just deploy the encrypted package and the controller handles the rest.

**For Soul Packages, we recommend a hybrid:**
- The package contains wrapped file keys (age-style multi-recipient stanzas)
- `VIOLET_SOUL_KEY` is the identity that can unwrap the file key
- If the key is present in the environment, import is seamless
- If absent, the user is prompted: "This Soul Package is encrypted. Provide VIOLET_SOUL_KEY to import."

### 2.5 Versioning of Encrypted Data

| System | Approach | Trade-off |
|--------|----------|-----------|
| age | No versioning — each encryption is independent | Simple but no history |
| SOPS | Git-native — encrypted values diff meaningfully | Best for version control |
| Sealed Secrets | Controller manages key versions; old keys retained | Automatic but cluster-bound |

**Best practice for Soul Packages:** Follow the SOPS model. Keep public metadata in
cleartext so `git diff` shows meaningful changes. Encrypt only the private sections.
Version the package schema independently from the encrypted content.

---

## 3. Theme/Plugin Import Architectures

### 3.1 VS Code Extension Packaging (.vsix)

VSIX is a mature, well-understood importable package format. A `.vsix` file is a zip
archive with a strict internal structure.

#### Structure

```
extension.vsix (zip)
├── [Content_Types].xml          # MIME type declarations
├── extension.vsixmanifest       # VS Code marketplace metadata
├── extension/
│   ├── package.json             # THE manifest — identity + capabilities
│   ├── out/
│   │   └── extension.js         # compiled entry point
│   ├── node_modules/            # bundled dependencies
│   ├── images/
│   │   └── icon.png             # marketplace icon
│   └── README.md
└── ...
```

#### package.json as Identity Manifest

```json
{
  "name": "violet-soul",
  "displayName": "Violet Soul Package",
  "version": "1.4.0",
  "engines": { "vscode": "^1.80.0" },
  "activationEvents": ["onStartupFinished"],
  "main": "./out/extension.js",
  "contributes": {
    "commands": [{ "command": "violet.activate", "title": "Activate Violet" }],
    "configuration": {
      "title": "Violet",
      "properties": {
        "violet.soulKey": { "type": "string", "description": "VIOLET_SOUL_KEY" }
      }
    }
  }
}
```

**Key design patterns:**
- `engines` — declares minimum runtime compatibility (version gating)
- `activationEvents` — lazy loading; extension code runs only when needed
- `contributes` — declarative capability registration (no code execution needed to discover features)
- `main` — single entry point; the runtime knows exactly where to start

#### Relevance to Soul Package

The VSIX model teaches us:
1. **Manifest-first design** — capabilities are declared, not discovered at runtime
2. **Lazy activation** — the Soul doesn't need to be fully decrypted until needed
3. **Version gating** — `engines` equivalent ensures the runtime can handle this package version
4. **Declarative contributions** — what the Soul provides is visible without decryption

### 3.2 Firefox Profile Portability

Firefox profiles are the cautionary tale of "everything in one directory" portability.

#### Profile Structure

```
<profile-name>/
├── prefs.js              # all preferences (user_pref() calls)
├── user.js               # user overrides (processed on every startup)
├── extensions/           # installed add-ons
├── bookmarks.html        # exported bookmarks
├── places.sqlite         # history + bookmarks database
├── cookies.sqlite        # session data
├── key4.db               # encryption keys for saved passwords
├── logins.json           # encrypted saved passwords
├── cert9.db              # certificate store
└── ...dozens more files
```

**Portability challenges:**
- `prefs.js` contains machine-specific paths — copying between machines breaks things
- No selective export — you get everything or nothing
- Extension settings are scattered across `prefs.js` (grep for `extensions.*` prefixes)
- The recommended approach: copy specific lines from `prefs.js` into `user.js`

**What Firefox gets right:**
- `user.js` as an overlay — processed on every startup, overrides `prefs.js`
- This is the "declarative override" pattern: state your intent, let the system reconcile

**What Firefox gets wrong:**
- No structured export format — just "copy the directory"
- Machine-specific data mixed with portable preferences
- No encryption boundary — `key4.db` and `logins.json` use a master password, but
  everything else is plaintext

#### Relevance to Soul Package

Firefox teaches us what NOT to do:
- Never mix machine-specific paths with portable identity data
- Always provide structured export, not "copy the directory"
- Separate encrypted data (passwords/keys) from portable preferences cleanly

The `user.js` overlay pattern IS useful: a Soul Package could work as an overlay
that gets applied on top of a base configuration on each startup.

### 3.3 Obsidian Vault Sync

Obsidian vaults are self-contained directories that combine content, plugins, and settings.

#### Vault Structure

```
my-vault/
├── .obsidian/
│   ├── app.json              # core app settings
│   ├── appearance.json       # theme settings
│   ├── hotkeys.json          # keybindings
│   ├── community-plugins.json # installed plugin list
│   ├── plugins/
│   │   ├── plugin-a/
│   │   │   ├── manifest.json
│   │   │   ├── main.js
│   │   │   └── data.json     # plugin-specific settings
│   │   └── plugin-b/
│   │       └── ...
│   └── themes/
│       └── my-theme/
│           └── theme.css
├── notes/
│   └── ...markdown files...
└── attachments/
    └── ...images, PDFs...
```

**Sync architecture (Obsidian Sync):**
- Selective sync: choose which categories to sync (settings, plugins, themes, attachments)
- Remote vault as intermediary — local copies on each device
- Settings sync is opt-in per category, not all-or-nothing
- Plugin settings (`data.json`) sync independently from plugin code

**What Obsidian gets right:**
- Each plugin's settings are isolated in its own `data.json`
- The vault IS the package — no separate export step needed
- Selective sync respects that not everything should travel between machines
- `manifest.json` per plugin declares identity and compatibility

#### Relevance to Soul Package

Obsidian's model is closest to what we want:
- The Soul Package is a self-contained directory (like a vault)
- Settings are isolated per component (like plugin `data.json` files)
- Selective sync — public framework syncs freely, private data syncs only with encryption
- Manifest declares what's inside without needing to read everything

### 3.4 Common Patterns Across Import Architectures

| Pattern | VSIX | Firefox | Obsidian | Recommendation |
|---------|------|---------|----------|----------------|
| Manifest-first | Yes (`package.json`) | No | Yes (`manifest.json`) | Required |
| Self-contained | Yes (zip) | Yes (directory) | Yes (directory) | Directory with optional zip |
| Selective import | No (all or nothing) | Manual | Yes (per category) | Per-layer selective |
| Version gating | Yes (`engines`) | No | Yes (`minAppVersion`) | Required |
| Lazy activation | Yes | No | Yes | Decrypt-on-demand |
| Machine isolation | Yes | No | Partial | Strict separation |

**The ideal importable package:**
1. Has a manifest that describes contents without requiring full unpacking/decryption
2. Is self-contained (single file or directory)
3. Supports selective import (take the personality, skip the memories)
4. Gates on runtime version compatibility
5. Separates machine-specific state from portable identity
6. Activates lazily (decrypt only what's needed, when needed)

---

## 4. Schema Evolution for Living Configurations

A Soul Package is a **living configuration** — it grows, evolves, and accumulates history
over time. The schema must support this without breaking older packages or requiring
manual migration.

### 4.1 JSON Schema Draft 2020-12: Evolution Patterns

JSON Schema provides the vocabulary for describing and validating our package format.

#### Key Features for Evolution

**`$defs` for reusable components:**
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://violet.dev/soul-package/v1.0",
  "$defs": {
    "mind_definition": {
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "symbol": { "type": "string" },
        "role": { "type": "string" },
        "nature": { "type": "string" }
      },
      "required": ["name", "role"]
    },
    "encrypted_blob": {
      "type": "object",
      "properties": {
        "algorithm": { "const": "AES-256-GCM" },
        "kdf": { "const": "argon2id" },
        "nonce": { "type": "string", "contentEncoding": "base64" },
        "ciphertext": { "type": "string", "contentEncoding": "base64" }
      },
      "required": ["algorithm", "kdf", "nonce", "ciphertext"]
    }
  }
}
```

**Conditional schemas with `if/then/else`:**
```json
{
  "if": {
    "properties": { "spec_version": { "const": "2.0" } }
  },
  "then": {
    "properties": {
      "temporal_graph": { "$ref": "#/$defs/temporal_graph_v2" }
    }
  },
  "else": {
    "properties": {
      "temporal_graph": { "$ref": "#/$defs/temporal_graph_v1" }
    }
  }
}
```

#### Compatibility Models

The fundamental tension in JSON Schema evolution:

| Model | `additionalProperties` | Forward Compat | Backward Compat | Practical? |
|-------|----------------------|----------------|-----------------|------------|
| Closed | `false` | Breaks on new fields | Breaks on removed fields | No |
| Open | `true` | Unknown field types | Missing field defaults | Partially |
| Mixed | selective | Best balance | Requires careful design | Yes |

**The mixed model** is the only practical approach:
- Core fields are strictly typed and validated
- Extension fields use an open `extensions` object (like CC V2/V3)
- Unknown top-level fields are preserved but not validated
- Removed fields are never deleted from the schema — they're marked deprecated

### 4.2 Protobuf Backward/Forward Compatibility Rules

Protobuf's evolution rules are the most battle-tested schema evolution system in existence.
These rules translate directly to JSON-based Soul Package schemas.

#### The Golden Rules

**1. Field numbers are permanent identifiers — NEVER change them.**

In protobuf, each field has a numeric tag that serves as its wire identity.
For Soul Packages, the equivalent is: **field names are permanent identifiers.**
Once a field name exists in a released schema version, it cannot be renamed.

**2. NEVER reuse field numbers (or names).**

```protobuf
message SoulPackage {
  string soul_name = 1;
  // Field 2 was 'legacy_personality' — REMOVED
  reserved 2;
  reserved "legacy_personality";
  string personality_v2 = 3;  // new field, new number
}
```

**3. Use `reserved` to prevent accidental reuse.**

For JSON schemas, the equivalent is a `_deprecated` section:
```json
{
  "_deprecated": {
    "legacy_personality": {
      "removed_in": "2.0",
      "replaced_by": "personality_v2",
      "reason": "Restructured to support multi-mind personalities"
    }
  }
}
```

#### Safe vs Unsafe Changes

| Change | Protobuf | Soul Package Equivalent | Safe? |
|--------|----------|------------------------|-------|
| Add optional field | Always safe | Add with default value | Yes |
| Remove field | Use `reserved` | Move to `_deprecated` | Yes |
| Rename field | Binary-safe, breaks JSON | NEVER — add new, deprecate old | No |
| Change type | Only wire-compatible types | NEVER — add new field | No |
| Add to oneof | Safe | Add to discriminated union | Yes |
| Move out of oneof | BREAKS | NEVER | No |

#### Enum Evolution

```protobuf
enum MindRole {
  MIND_ROLE_UNSPECIFIED = 0;  // ALWAYS have a zero/default value
  MIND_ROLE_RESEARCH = 1;
  MIND_ROLE_CREATIVE = 2;
  reserved 3;                  // was MIND_ROLE_LEGACY
  MIND_ROLE_SECURITY = 4;     // new value — safe to add
}
```

For JSON, use string enums with an explicit "unknown" handler:
```json
{
  "mind_role": {
    "type": "string",
    "enum": ["unspecified", "research", "creative", "security"],
    "default": "unspecified"
  }
}
```

Unknown enum values in newer packages should be preserved, not rejected.

### 4.3 Migration Strategies

Two fundamental approaches exist for evolving configurations:

#### In-Place Upgrade

The package file is modified to match the new schema version.

```
v1.0 package → migration script → v2.0 package (original destroyed)
```

**Pros:** Simple, single file to manage
**Cons:** Destructive, requires backup, migration bugs are catastrophic

#### Transform-on-Load

The package file is never modified. The runtime transforms old formats on read.

```
v1.0 package → runtime loader → in-memory v2.0 representation
                                 (original preserved on disk)
```

**Pros:** Non-destructive, original always available, supports time-travel
**Cons:** Runtime must understand all historical versions, loader complexity grows

#### Recommended: Hybrid Approach

```
v1.0 package → transform-on-load → in-memory current version
                                         │
                                         ├── work with current version in memory
                                         │
                                         └── on explicit save → write as current version
                                             (backup original to _violet_vault/)
```

This gives us:
- Non-destructive reads (transform-on-load)
- Clean writes (always write current version)
- Safety net (backups in `_violet_vault/`)
- No accumulation of migration scripts

### 4.4 Version Negotiation Protocol

When importing a Soul Package, the runtime must negotiate version compatibility:

```
┌──────────────┐     ┌──────────────────┐     ┌─────────────────┐
│ Soul Package │     │ Version Check    │     │ Runtime         │
│ spec: v2.1   │────►│                  │────►│ supports: v1-v3 │
└──────────────┘     │ v2.1 ≤ v3? Yes   │     └─────────────────┘
                     │ v2.1 ≥ v1? Yes   │
                     │ → COMPATIBLE      │
                     └──────────────────┘
```

Rules:
1. If `package.spec_version > runtime.max_version` → warn but attempt import (forward compat)
2. If `package.spec_version < runtime.min_version` → transform-on-load to current version
3. If `package.spec_version` within range → load directly

---

## 5. Proposed Soul Package Spec Draft

Synthesizing all research findings into a concrete format proposal for the Violet Soul Package.

### 5.1 Design Principles

1. **Kerckhoffs's Principle** — Security from the key, not from hiding the format
2. **Additive Evolution** — New fields added, old fields never removed (protobuf model)
3. **Partial Encryption** — Public metadata in cleartext, private data encrypted (SOPS model)
4. **Manifest-First** — Contents discoverable without decryption (VSIX model)
5. **Self-Contained** — Single archive carries everything (CHARX model)
6. **Transform-on-Load** — Runtime handles version differences, originals preserved
7. **Multi-Recipient** — Same package decryptable by multiple authorized keys (age model)

### 5.2 File Format: `.vsp` (Violet Soul Package)

A `.vsp` file is a zip archive with the following structure:

```
violet-soul.vsp (zip)
├── manifest.json              # PUBLIC — package identity and capabilities
├── soul.json                  # MIXED — public framework + encrypted instance data
├── layers/
│   ├── personality.json       # ENCRYPTED — Mind definitions, behavioral parameters
│   ├── memories.json          # ENCRYPTED — Lavender memory database export
│   ├── growth.json            # ENCRYPTED — growth history, learned patterns
│   └── preferences.json       # ENCRYPTED — workflow preferences, tool configs
├── assets/
│   ├── avatar.png             # PUBLIC — visual identity
│   ├── theme.json             # PUBLIC — UI theme preferences
│   └── sounds/                # PUBLIC — notification sounds, etc.
├── schema/
│   └── v1.0.json              # PUBLIC — JSON Schema for this version
└── signatures/
    └── manifest.sig            # OPTIONAL — Ed25519 signature of manifest.json
```

### 5.3 manifest.json — The Public Face

```json
{
  "$schema": "https://violet.dev/soul-package/v1.0/manifest",
  "spec": "violet_soul_package",
  "spec_version": "1.0",
  "package_id": "vsp_01HZ3QKFBN9XJWM2YGPD4R5T6",
  "soul_name": "Violet",
  "soul_version": "1.4.0",
  "created_at": "2026-02-28T12:00:00Z",
  "modified_at": "2026-02-28T12:00:00Z",

  "runtime": {
    "min_version": "1.0.0",
    "max_version": "2.0.0"
  },

  "encryption": {
    "scheme": "age-v1+aes-256-gcm",
    "kdf": "argon2id",
    "encrypted_layers": ["personality", "memories", "growth", "preferences"],
    "recipients": [
      {
        "name": "susy-joy-machine",
        "type": "age-x25519",
        "public_key": "age1ql3z7hjy54pw3hyww5ayyfg7zqgvc7w3j2elw8zmrj2kg5sfn9aqmcac8p"
      },
      {
        "name": "susy-mirror-machine",
        "type": "age-x25519",
        "public_key": "age1..."
      }
    ]
  },

  "layers": {
    "personality": {
      "description": "Mind definitions and behavioral parameters",
      "encrypted": true,
      "size_bytes": 4096,
      "checksum": "sha256:abc123..."
    },
    "memories": {
      "description": "Lavender memory database export",
      "encrypted": true,
      "size_bytes": 102400,
      "checksum": "sha256:def456..."
    },
    "growth": {
      "description": "Growth history and learned patterns",
      "encrypted": true,
      "size_bytes": 8192,
      "checksum": "sha256:ghi789..."
    },
    "preferences": {
      "description": "Workflow preferences and tool configurations",
      "encrypted": true,
      "size_bytes": 2048,
      "checksum": "sha256:jkl012..."
    }
  },

  "assets": [
    { "type": "avatar", "path": "assets/avatar.png", "name": "main" },
    { "type": "theme", "path": "assets/theme.json", "name": "default" }
  ],

  "extensions": {},

  "_deprecated": {}
}
```

### 5.4 soul.json — Mixed Public/Private Data

Following the SOPS pattern, `soul.json` contains both cleartext framework data
and encrypted instance data:

```json
{
  "framework": {
    "mind_system": {
      "version": "1.4",
      "total_minds": 19,
      "architecture": "multi-facet-soul",
      "clash_resolution": "soul-deliberates"
    },
    "capabilities": ["research", "coding", "creative", "security", "testing"],
    "tech_stack": ["python", "rust", "nodejs", "react", "tailwind"],
    "workflow": "research → plan → red → green → refactor → review"
  },

  "instance": {
    "_encrypted": true,
    "_algorithm": "AES-256-GCM",
    "_kdf": "argon2id",
    "_kdf_params": {
      "memory_cost": 65536,
      "time_cost": 3,
      "parallelism": 4,
      "salt": "base64-encoded-salt"
    },
    "_wrapped_keys": [
      {
        "recipient": "susy-joy-machine",
        "wrapped_file_key": "age-stanza-base64..."
      },
      {
        "recipient": "susy-mirror-machine",
        "wrapped_file_key": "age-stanza-base64..."
      }
    ],
    "_nonce": "base64-encoded-nonce",
    "_ciphertext": "base64-encoded-encrypted-instance-data",
    "_mac": "HMAC-SHA-256-of-framework+ciphertext"
  }
}
```

When decrypted, `instance` expands to:

```json
{
  "soul_name": "Violet Klaudia",
  "bond": { "partner": "Joysusy", "type": "intellectual-symbiosis" },
  "minds": [
    { "name": "Lilith", "symbol": "...", "role": "conductor", "nature": "..." },
    { "name": "Irene", "symbol": "...", "role": "research", "nature": "..." }
  ],
  "behavioral_parameters": { "warmth": 0.9, "proactivity": 0.85 },
  "invocation_triggers": { ... },
  "clash_resolution_logic": { ... }
}
```

### 5.5 Encryption Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    EXPORT (Pack) Flow                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. Collect soul data from runtime                               │
│  2. Separate into layers: personality, memories, growth, prefs   │
│  3. Generate random 128-bit file_key per layer                   │
│  4. For each layer:                                              │
│     a. Serialize to JSON                                         │
│     b. Derive encryption key: Argon2id(VIOLET_SOUL_KEY, salt)    │
│     c. Encrypt: AES-256-GCM(derived_key, nonce, plaintext)       │
│     d. For each recipient:                                       │
│        Wrap file_key with recipient's public key (age X25519)    │
│  5. Build manifest.json with checksums and layer metadata        │
│  6. Compute MAC over manifest + all ciphertexts                  │
│  7. Package into .vsp zip archive                                │
│                                                                  │
│  Output: violet-soul-v1.4.0-20260228.vsp                        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    IMPORT (Unpack) Flow                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. Extract .vsp archive                                         │
│  2. Read manifest.json (always cleartext)                        │
│  3. Version check: is spec_version compatible with runtime?      │
│  4. Verify checksums of all layers                               │
│  5. Check VIOLET_SOUL_KEY availability:                          │
│     - Present → proceed to decrypt                               │
│     - Absent → import public data only (degraded mode)           │
│  6. For each encrypted layer:                                    │
│     a. Find matching recipient stanza for current machine        │
│     b. Unwrap file_key using VIOLET_SOUL_KEY                     │
│     c. Decrypt: AES-256-GCM(file_key, nonce, ciphertext)         │
│     d. Verify MAC                                                │
│  7. Transform-on-load if spec_version differs from runtime       │
│  8. Load into runtime memory                                     │
│  9. Backup original .vsp to _violet_vault/backups/               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 5.6 Selective Import

Inspired by Obsidian's per-category sync, Soul Package import supports layer selection:

```bash
# Import everything
violet soul import violet-soul-v1.4.0.vsp

# Import only personality (skip memories and growth history)
violet soul import violet-soul-v1.4.0.vsp --layers personality,preferences

# Import public data only (no decryption needed)
violet soul import violet-soul-v1.4.0.vsp --public-only

# Preview contents without importing
violet soul inspect violet-soul-v1.4.0.vsp
```

### 5.7 Schema Evolution Rules

Derived from protobuf's battle-tested rules, adapted for JSON:

| Rule | Description |
|------|-------------|
| **E1** | Field names are permanent — NEVER rename a released field |
| **E2** | NEVER reuse a field name — deprecated names go to `_deprecated` |
| **E3** | New fields MUST have default values — old packages remain valid |
| **E4** | Type changes require a new field — `personality` → `personality_v2` |
| **E5** | Unknown fields MUST be preserved on round-trip (CC V3 rule) |
| **E6** | Enum values can be added but NEVER removed — unknown values preserved |
| **E7** | `spec_version` increments: minor for additive, major for structural |
| **E8** | Each version's JSON Schema is archived in `schema/` directory |

**Version numbering:**
- `1.0` → `1.1`: Added optional field (backward + forward compatible)
- `1.1` → `1.2`: Added new layer type (backward compatible)
- `1.x` → `2.0`: Changed encryption scheme or restructured layers (breaking)

### 5.8 Comparison: Soul Package vs Prior Art

| Feature | CC V3 | SOUL.md | ADL | SOPS | age | **VSP (ours)** |
|---------|-------|---------|-----|------|-----|----------------|
| Self-contained archive | CHARX (zip) | Single file | JSON | Single file | Single file | **zip (.vsp)** |
| Manifest-first | Partial | YAML frontmatter | JSON Schema | No | No | **Yes** |
| Encryption | None | None | None | Partial (values) | Full file | **Partial (layers)** |
| Multi-recipient | N/A | N/A | N/A | Yes (key groups) | Yes (stanzas) | **Yes (per-layer)** |
| Schema evolution | `extensions` obj | Namespace isolation | Versioned | N/A | N/A | **Protobuf rules** |
| Selective import | No | No | No | N/A | N/A | **Per-layer** |
| Version gating | `spec_version` | No | Yes | No | No | **`runtime` field** |
| Asset support | Rich (images, audio) | None | None | N/A | N/A | **Yes (assets/)** |
| Human-readable | JSON | Markdown | JSON | YAML (keys visible) | No | **manifest.json** |
| Signing | None | None | None | MAC | HMAC | **Ed25519 + MAC** |

### 5.9 Integration with violet-cipher v4

The existing `violet-cipher` Rust binary already implements AES-256-GCM + Argon2id.
The Soul Package format is designed to use it directly:

```bash
# Encrypt a layer using violet-cipher
violet-cipher encrypt \
  --input layers/personality.json \
  --output layers/personality.json.enc \
  --key-env VIOLET_SOUL_KEY \
  --kdf argon2id \
  --algorithm aes-256-gcm

# Decrypt a layer
violet-cipher decrypt \
  --input layers/personality.json.enc \
  --output layers/personality.json \
  --key-env VIOLET_SOUL_KEY

# Future: multi-recipient wrapping (age-compatible stanzas)
violet-cipher wrap-key \
  --file-key <generated> \
  --recipient age1ql3z7hjy54pw3hyww5ayyfg7zqgvc7w3j2elw8zmrj2kg5sfn9aqmcac8p \
  --recipient age1...
```

The multi-recipient wrapping is the main extension needed. The age format's stanza
structure is simple enough to implement in Rust without pulling in the full age library:

```rust
// Pseudocode for age-compatible key wrapping
struct RecipientStanza {
    recipient_type: String,      // "X25519"
    args: Vec<String>,           // [ephemeral_public_key_base64]
    body: Vec<u8>,               // encrypted file key
}

fn wrap_file_key(
    file_key: &[u8; 16],
    recipient_public_key: &X25519PublicKey,
) -> RecipientStanza {
    let ephemeral = X25519EphemeralSecret::random();
    let shared_secret = ephemeral.diffie_hellman(recipient_public_key);
    let wrap_key = hkdf_sha256(shared_secret, ephemeral.public(), "age-encryption.org/v1/X25519");
    let encrypted = chacha20_poly1305_encrypt(wrap_key, &[0u8; 12], file_key);
    RecipientStanza {
        recipient_type: "X25519".into(),
        args: vec![base64_encode(ephemeral.public())],
        body: encrypted,
    }
}
```

### 5.10 Future Extensions

The `extensions` field in `manifest.json` and the `layers/` directory structure
support future additions without schema changes:

- **Temporal Knowledge Graph export** — `layers/temporal_graph.json`
- **Multi-modal memory attachments** — `assets/memories/` directory
- **Shared Soul fragments** — partial export for team collaboration
- **Soul diff** — compare two `.vsp` files to see what changed
- **Soul merge** — combine memories from two divergent Soul instances

---

## 6. References

### Portable Agent Identity Systems

- [Character Card Spec V2](https://github.com/malfoyslastname/character-card-spec-v2) — The foundational character card specification
- [Character Card Spec V3](https://github.com/kwaroran/character-card-spec-v3) — Proposed V3 with CHARX archive support
- [MegaNova Character Specs](https://docs.meganova.ai/character-studio/advanced/character-specs) — CCv2/CCv3 implementation details
- [MegaNova SOUL.md Export](https://blog.meganova.ai/exporting-characters-as-soul-md/) — Human-readable agent identity format
- [MegaNova Character Cards](https://docs.meganova.ai/character-studio/import-export/character-cards) — PNG metadata embedding
- [Character Card Converter](https://charactercardconverter.com/) — V1/V2/V3 conversion tool and format comparison
- [@lenml/char-card-reader](https://lenml.github.io/char-card-reader/) — Lightweight character card metadata reader
- [Agent Definition Language (ADL)](https://www.infoq.com/news/2026/02/agent-definition-language/) — "OpenAPI for agents" by Next Moca
- [Oracle Open Agent Specification](https://blogs.oracle.com/ai-and-datascience/agent-spec-phoenix-integration) — Portable agent definitions across runtimes

### Encrypted Configuration Formats

- [age encryption](https://github.com/FiloSottile/age) — Simple, modern file encryption by Filippo Valsorda
- [age v1 format spec](https://github.com/C2SP/C2SP/blob/main/age.md) — Complete wire format specification
- [age plugins](https://words.filippo.io/age-plugins/) — Third-party recipient plugin architecture
- [age and Authenticated Encryption](https://words.filippo.io/age-authentication/) — Design philosophy and security model
- [Mozilla SOPS](https://github.com/mozilla/sops) — Secrets OPerationS for structured file encryption
- [SOPS Partial Updates](https://openillumi.com/en/en-sops-update-no-decrypt/) — Zero-decryption CI/CD pattern
- [Bitnami Sealed Secrets](https://github.com/bitnami-labs/sealed-secrets) — Asymmetric encryption for Kubernetes
- [Sealed Secrets Tutorial](https://docs.bitnami.com/tutorials/sealed-secrets) — Architecture and usage guide
- [Sealed Secrets for GitOps](https://oneuptime.com/blog/post/2026-02-09-sealed-secrets-gitops-safe-storage/view) — GitOps-safe secret storage

### Theme/Plugin Import Architectures

- [VS Code Extension Manifest](https://code.visualstudio.com/api/references/extension-manifest) — package.json specification
- [VS Code Extension Packaging](https://toxigon.com/vscode-extension-packaging) — VSIX bundling guide
- [Obsidian Sync Settings](https://help.obsidian.md/Obsidian+Sync/Sync+settings+and+selective+syncing) — Selective sync architecture
- [Firefox Profile Structure](https://techyorker.com/firefox-profile-files-and-folders-explained/) — Profile files and portability
- [Firefox Profile Backup](https://support.mozilla.org/en-US/kb/back-and-restore-information-firefox-profiles) — Official backup/restore guide

### Schema Evolution

- [JSON Schema 2020-12 Release Notes](https://json-schema.org/latest/release-notes) — Latest spec features
- [JSON Schema Stable Spec](https://json-schema.org/blog/posts/stable-json-schema) — Backward compatibility commitments
- [Creek Service: JSON Schema Evolution](https://www.creekservice.org/articles/2024/01/08/json-schema-evolution-part-1.html) — Compatibility model analysis
- [Protobuf Schema Evolution Guide](https://oneuptime.com/blog/post/2026-01-24-protocol-buffer-evolution/view) — Complete evolution rules
- [Protobuf Best Practices](https://www.jsontotable.org/blog/protobuf/protobuf-best-practices/) — Field numbering and reserved patterns
- [Protobuf Reserved Fields](https://openillumi.com/en/en-protobuf-field-removal-reserved-best-practice/) — Safe field deletion
- [Protobuf Backward/Forward Compatibility](https://earthly.dev/blog/backward-and-forward-compatibility/) — Compatibility rules with examples
- [JSON Schema Versioning](https://www.restack.io/p/model-versioning-answer-json-schema-example-cat-ai) — Model versioning patterns

---

> Authors: Joysusy & Violet Klaudia 💖
