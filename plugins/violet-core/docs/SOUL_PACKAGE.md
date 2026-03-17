# Authors: Joysusy & Violet Klaudia 💖

# VioletCore Soul Package Guide

**Version:** 1.0.0
**Encryption:** AES-256-GCM with Argon2id key derivation

---

## Table of Contents

1. [Overview](#overview)
2. [Soul Package Format](#soul-package-format)
3. [Export Workflows](#export-workflows)
4. [Import Workflows](#import-workflows)
5. [Encryption Details](#encryption-details)
6. [Use Cases](#use-cases)
7. [Troubleshooting](#troubleshooting)

---

## Overview

Soul Package is VioletCore's encrypted export/import format for Mind configurations. It allows you to:

- **Backup** all 17 Mind definitions
- **Share** Mind configurations across machines
- **Version control** Mind evolution
- **Partial export** specific Minds only
- **Secure storage** with VIOLET_SOUL_KEY encryption

### Key Features

- **Encrypted by default**: AES-256-GCM with Argon2id key derivation
- **Partial export/import**: Select specific Minds
- **Validation**: Automatic structure validation on import
- **Version tracking**: Soul Package and VioletCore versions recorded
- **Metadata**: Author, description, creation timestamp

---

## Soul Package Format

### Structure

```json
{
  "version": "1.0.0",
  "created": "2026-03-10T12:34:56.789Z",
  "violet_core_version": "2.0.0",
  "minds": [
    {
      "name": "Lilith",
      "symbol": "🎀",
      "version": 1,
      "role": "Security & Safety Warden",
      "traits": { /* ... */ },
      "triggers": [ /* ... */ ],
      "coordination": { /* ... */ },
      "evolution": [ /* ... */ ]
    }
    // ... 16 more Minds
  ],
  "metadata": {
    "author": "Joysusy, Violet Klaudia",
    "description": "Violet's 17 Mind facets",
    "encrypted": true
  }
}
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `version` | string | Soul Package format version (semver) |
| `created` | string | ISO 8601 timestamp of creation |
| `violet_core_version` | string | VioletCore version used for export |
| `minds` | array | Array of Mind objects (1-17 Minds) |
| `metadata.author` | string | Package author(s) |
| `metadata.description` | string | Package description |
| `metadata.encrypted` | boolean | Whether package is encrypted |

### Mind Object Structure

Each Mind in the `minds` array contains:

```json
{
  "name": "Lilith",
  "symbol": "🎀",
  "version": 1,
  "role": "Security & Safety Warden — protects against vulnerabilities",
  "traits": {
    "thinking_style": "paranoid-defensive",
    "communication_tone": "cold and clinical",
    "decision_bias": "security-first",
    "strength_domains": ["security audits", "vulnerability detection"]
  },
  "triggers": [
    {
      "context_pattern": "security|audit|vulnerability",
      "activation_weight": 0.95
    }
  ],
  "coordination": {
    "compatible_with": ["Selene", "Vera", "Norene"],
    "clash_resolution": "soul_decides"
  },
  "evolution": [
    {
      "v": 1,
      "date": "2026-03-10",
      "note": "Initial Mind definition",
      "author": "Joysusy, Violet Klaudia"
    }
  ]
}
```

---

## Export Workflows

### 1. Export All Minds (Encrypted)

**Use Case**: Full backup of all 17 Minds

```javascript
const { exportSoulPackage } = require('./sdk/soul-package');

const result = exportSoulPackage({
  outputPath: './violet-soul-backup.enc',
  encrypt: true
  // passphrase defaults to process.env.VIOLET_SOUL_KEY
});

console.log(`✅ Exported ${result.mindCount} Minds to ${result.path}`);
console.log(`   Size: ${result.size} bytes, Encrypted: ${result.encrypted}`);
```

**Output**:
```
✅ Exported 17 Minds to ./violet-soul-backup.enc
   Size: 45678 bytes, Encrypted: true
```

### 2. Export Specific Minds

**Use Case**: Share only security-related Minds

```javascript
const result = exportSoulPackage({
  outputPath: './security-minds.enc',
  encrypt: true,
  mindFilter: ['lilith', 'kori', 'norene']  // Case-insensitive
});

console.log(`✅ Exported ${result.mindCount} Minds: Lilith, Kori, Norene`);
```

### 3. Export Plaintext (Development Only)

**Use Case**: Debug or version control (NOT recommended for production)

```javascript
const result = exportSoulPackage({
  outputPath: './violet-soul-plaintext.json',
  encrypt: false
});

console.log(`⚠️  Exported ${result.mindCount} Minds (PLAINTEXT)`);
```

**Warning**: Plaintext exports expose Mind configurations. Only use for development/debugging.

### 4. Export to String (No File)

**Use Case**: Programmatic export for custom storage

```javascript
const encryptedString = exportSoulPackage({
  encrypt: true
  // No outputPath — returns encrypted string
});

// Store in custom location
fs.writeFileSync('./custom-location/soul.enc', encryptedString);
```

### 5. CLI Export Tool

**Use Case**: Command-line backup

```bash
# Export all Minds
node scripts/export-soul-package.js --output ./backup.enc

# Export specific Minds
node scripts/export-soul-package.js --output ./partial.enc --minds lilith,selene,kori

# Export plaintext (development)
node scripts/export-soul-package.js --output ./debug.json --no-encrypt
```

---

## Import Workflows

### 1. Import All Minds (Encrypted)

**Use Case**: Restore from backup

```javascript
const { importSoulPackage } = require('./sdk/soul-package');

const result = importSoulPackage('./violet-soul-backup.enc', {
  decrypt: true
  // passphrase defaults to process.env.VIOLET_SOUL_KEY
});

console.log(`✅ Imported ${result.importedMinds} Minds`);
console.log(`   Package version: ${result.version}`);
console.log(`   VioletCore version: ${result.violet_core_version}`);
console.log(`   Created: ${result.created}`);
```

**Output**:
```
✅ Imported 17 Minds
   Package version: 1.0.0
   VioletCore version: 2.0.0
   Created: 2026-03-10T12:34:56.789Z
```

### 2. Import Specific Minds

**Use Case**: Restore only selected Minds

```javascript
const result = importSoulPackage('./violet-soul-backup.enc', {
  decrypt: true,
  mindFilter: ['lilith', 'selene']  // Only import these
});

console.log(`✅ Imported ${result.importedMinds} of ${result.totalMinds} Minds`);
```

### 3. Import to Directory (Write JSON Files)

**Use Case**: Restore Mind JSON files to `data/minds/`

```javascript
const { importSoulPackageToDirectory } = require('./sdk/soul-package');

const result = importSoulPackageToDirectory(
  './violet-soul-backup.enc',
  './data/minds',
  { decrypt: true }
);

console.log(`✅ Wrote ${result.writtenFiles.length} Mind files to ${result.outputDir}`);
result.writtenFiles.forEach(file => console.log(`   - ${file}`));
```

**Output**:
```
✅ Wrote 17 Mind files to ./data/minds
   - ./data/minds/lilith.json
   - ./data/minds/lyre.json
   - ./data/minds/aurora.json
   ...
```

### 4. Import Plaintext

**Use Case**: Import from plaintext JSON

```javascript
const result = importSoulPackage('./violet-soul-plaintext.json', {
  decrypt: false
});

console.log(`✅ Imported ${result.importedMinds} Minds from plaintext`);
```

### 5. Import with Validation

**Use Case**: Verify package integrity before import

```javascript
const result = importSoulPackage('./violet-soul-backup.enc', {
  decrypt: true,
  validate: true  // Default: true
});

// If validation fails, throws error:
// Error: Invalid Mind structure: {"name":"Lilith",...}
```

---

## Encryption Details

### Algorithm

- **Cipher**: AES-256-GCM (Galois/Counter Mode)
- **Key Derivation**: Argon2id (memory-hard, side-channel resistant)
- **Salt**: 32 bytes, unique per encryption
- **Nonce**: 12 bytes, unique per encryption
- **Authentication Tag**: 16 bytes (GCM tag)

### Key Derivation Parameters

```javascript
// Argon2id parameters
{
  memoryCost: 65536,      // 64 MB
  timeCost: 3,            // 3 iterations
  parallelism: 4,         // 4 threads
  hashLength: 32,         // 256-bit key
  type: argon2.argon2id   // Hybrid mode
}
```

### Encryption Flow

```
VIOLET_SOUL_KEY (passphrase)
    ↓ Argon2id(passphrase, salt, params)
Derived Key (32 bytes)
    ↓ AES-256-GCM(key, nonce, plaintext)
Ciphertext + Auth Tag
    ↓ Concatenate: salt || nonce || tag || ciphertext
Encrypted Soul Package (.enc file)
```

### Decryption Flow

```
Encrypted Soul Package (.enc file)
    ↓ Split: salt || nonce || tag || ciphertext
Salt, Nonce, Tag, Ciphertext
    ↓ Argon2id(VIOLET_SOUL_KEY, salt, params)
Derived Key (32 bytes)
    ↓ AES-256-GCM-Decrypt(key, nonce, ciphertext, tag)
Plaintext JSON
    ↓ JSON.parse()
Soul Package Object
```

### Security Properties

- **Confidentiality**: AES-256-GCM ensures data cannot be read without key
- **Integrity**: GCM authentication tag detects tampering
- **Key Derivation**: Argon2id resists brute-force and side-channel attacks
- **Unique Salts**: Each encryption uses unique salt (no rainbow tables)
- **Unique Nonces**: Each encryption uses unique nonce (no replay attacks)

---

## Use Cases

### Use Case 1: Daily Backup

**Scenario**: Automated daily backup of all Minds

```bash
#!/bin/bash
# backup-violet-soul.sh

DATE=$(date +%Y-%m-%d)
BACKUP_DIR="./backups"
mkdir -p "$BACKUP_DIR"

node -e "
const { exportSoulPackage } = require('./sdk/soul-package');
const result = exportSoulPackage({
  outputPath: '$BACKUP_DIR/violet-soul-$DATE.enc',
  encrypt: true
});
console.log('✅ Backup complete:', result.path);
"
```

**Cron Job**:
```cron
0 2 * * * /path/to/backup-violet-soul.sh
```

### Use Case 2: Multi-Machine Sync

**Scenario**: Sync Minds across JOY and MIRRORME machines

**On JOY machine**:
```bash
# Export to cloud sync folder
node scripts/export-soul-package.js \
  --output "E:/BaiduSyncdisk/violet-soul-sync.enc"
```

**On MIRRORME machine**:
```bash
# Import from cloud sync folder
node -e "
const { importSoulPackageToDirectory } = require('./sdk/soul-package');
const result = importSoulPackageToDirectory(
  'E:/BaiduSyncdisk/violet-soul-sync.enc',
  './data/minds'
);
console.log('✅ Synced', result.importedMinds, 'Minds');
"
```

### Use Case 3: Mind Evolution Tracking

**Scenario**: Version control Mind evolution

```bash
# Before evolving Minds
node scripts/export-soul-package.js \
  --output "./versions/violet-soul-v1.0.enc"

# Evolve Minds (e.g., Lilith v1 → v2)
node -e "
const { evolveMind } = require('./sdk/violet-runtime');
evolveMind('Lilith', 'Enhanced security audit capabilities');
"

# Export new version
node scripts/export-soul-package.js \
  --output "./versions/violet-soul-v1.1.enc"
```

### Use Case 4: Partial Mind Sharing

**Scenario**: Share documentation Minds with teammate

```javascript
// Export only documentation-related Minds
const { exportSoulPackage } = require('./sdk/soul-package');

const result = exportSoulPackage({
  outputPath: './docs-minds.enc',
  encrypt: true,
  mindFilter: ['lyre', 'sophie', 'nina']
});

// Share docs-minds.enc with teammate
// They can import with their own VIOLET_SOUL_KEY
```

### Use Case 5: Disaster Recovery

**Scenario**: Restore from backup after data loss

```javascript
const { importSoulPackageToDirectory } = require('./sdk/soul-package');

// Restore all Minds from backup
const result = importSoulPackageToDirectory(
  './backups/violet-soul-2026-03-10.enc',
  './data/minds',
  { decrypt: true }
);

console.log(`✅ Restored ${result.importedMinds} Minds`);

// Clear cache and reload
const { clearCache, loadVioletMinds } = require('./sdk/violet-mind-loader');
clearCache();
const minds = loadVioletMinds();
console.log(`✅ Loaded ${minds.length} Minds`);
```

---

## Troubleshooting

### Error: VIOLET_SOUL_KEY required

**Symptom**:
```
Error: VIOLET_SOUL_KEY required for encrypted export
```

**Solution**:
```bash
# Set environment variable
export VIOLET_SOUL_KEY="your-secure-passphrase-here"

# Verify it's set
echo $VIOLET_SOUL_KEY

# Retry export
node scripts/export-soul-package.js --output ./backup.enc
```

### Error: Decryption failed

**Symptom**:
```
Error: Decryption failed: Invalid authentication tag
```

**Possible Causes**:
1. Wrong VIOLET_SOUL_KEY (most common)
2. Corrupted .enc file
3. File is plaintext JSON, not encrypted

**Solutions**:
```bash
# 1. Verify VIOLET_SOUL_KEY matches the one used for encryption
echo $VIOLET_SOUL_KEY

# 2. Check file integrity
ls -lh ./backup.enc
file ./backup.enc  # Should show "data"

# 3. Try importing as plaintext (if you know it's not encrypted)
node -e "
const { importSoulPackage } = require('./sdk/soul-package');
const result = importSoulPackage('./backup.enc', { decrypt: false });
console.log('Imported:', result.importedMinds, 'Minds');
"
```

### Error: No Minds selected for export

**Symptom**:
```
Error: No Minds selected for export
```

**Cause**: `mindFilter` contains invalid Mind names

**Solution**:
```javascript
// Check available Mind names
const { listVioletMinds } = require('./sdk/violet-mind-loader');
const minds = listVioletMinds();
console.log('Available Minds:', minds.map(m => m.name.toLowerCase()).join(', '));

// Use correct names (case-insensitive)
const result = exportSoulPackage({
  outputPath: './partial.enc',
  mindFilter: ['lilith', 'selene']  // Correct
  // NOT: ['Lilith', 'Selene'] — case doesn't matter, but names must be exact
});
```

### Error: Invalid JSON in Soul Package

**Symptom**:
```
Error: Invalid JSON in Soul Package: Unexpected token < in JSON at position 0
```

**Cause**: File is not a valid Soul Package (corrupted or wrong file)

**Solution**:
```bash
# Check file content
head -c 100 ./backup.enc

# If it starts with '{', it's plaintext JSON
# If it's binary data, it's encrypted

# Try importing with correct decrypt flag
node -e "
const { importSoulPackage } = require('./sdk/soul-package');
const result = importSoulPackage('./backup.enc', {
  decrypt: true  // or false, depending on file type
});
"
```

### Error: Mind file not found

**Symptom** (during `importSoulPackageToDirectory`):
```
Error: ENOENT: no such file or directory, open './data/minds/lilith.json'
```

**Cause**: Output directory doesn't exist

**Solution**:
```bash
# Create directory first
mkdir -p ./data/minds

# Retry import
node -e "
const { importSoulPackageToDirectory } = require('./sdk/soul-package');
const result = importSoulPackageToDirectory(
  './backup.enc',
  './data/minds'
);
"
```

---

## Best Practices

### 1. Regular Backups

- Export Soul Package daily or after Mind evolution
- Store backups in multiple locations (local + cloud)
- Use dated filenames: `violet-soul-2026-03-10.enc`

### 2. Secure Key Management

- Never commit VIOLET_SOUL_KEY to version control
- Use environment variables or secure key storage
- Rotate keys periodically (re-encrypt with new key)

### 3. Validation

- Always validate imports: `validate: true` (default)
- Test imports in development before production
- Verify Mind count matches expectations

### 4. Version Control

- Export before and after Mind evolution
- Tag exports with version numbers
- Document changes in evolution notes

### 5. Partial Exports

- Use `mindFilter` for targeted backups
- Share only necessary Minds with teammates
- Reduce file size for faster transfers

---

## Next Steps

- [Usage Guide](./USAGE.md) — SDK usage and architecture
- [MCP Tools Reference](./MCP_TOOLS.md) — MCP tool documentation
- [Lavender Integration](./LAVENDER_INTEGRATION.md) — Memory system integration

---

**Documentation by 🦢 Lyre**
**VioletCore v2.0.0 — Phase 2.3**
