# Secure Encryption Implementation Guide for Node.js
# Authors: Joysusy & Violet Klaudia 💖

## Executive Summary

This guide provides security-first best practices for implementing encryption in Node.js applications, focusing on Argon2id key derivation and AES-256-GCM authenticated encryption.

## 1. Argon2id vs scrypt Comparison

### Why Argon2id is Preferred

**Argon2id** is the winner of the 2015 Password Hashing Competition and is OWASP's primary recommendation for password hashing and key derivation.

**Security Advantages:**
- **Hybrid design**: Combines Argon2i (side-channel resistant) and Argon2d (GPU-attack resistant)
- **Memory-hard**: Requires significant RAM, making parallel attacks expensive
- **Configurable**: Three independent parameters (memory, iterations, parallelism) for flexible security/performance tradeoffs
- **Modern**: Designed with current attack vectors in mind

**scrypt Comparison:**
- scrypt is OWASP's fallback recommendation "when Argon2id is not available"
- Also memory-hard, but older design (2009 vs 2015)
- Less flexible parameter tuning
- No hybrid protection against both GPU and side-channel attacks

### Performance Characteristics

| Algorithm | Memory Cost | Time Cost | Parallelism | Typical Duration |
|-----------|-------------|-----------|-------------|------------------|
| Argon2id  | 19-64 MiB   | 2-4 iterations | 1-4 threads | 100-500ms |
| scrypt    | 16-32 MiB   | N=2^14-2^16 | r=8, p=1 | 100-300ms |

**Key Insight**: Both are intentionally slow to resist brute-force attacks. The goal is to make each derivation expensive enough to deter attackers while remaining acceptable for legitimate users.

### Node.js Implementation Libraries

**Recommended: `argon2` npm package**

```bash
npm install argon2
```

**Features:**
- Native bindings (C implementation)
- Prebuilt binaries for major platforms
- TypeScript support included
- Actively maintained
- Supports all three variants (Argon2i, Argon2d, Argon2id)

**Alternative: `@node-rs/argon2`**
- Rust-based implementation
- Slightly different API
- Good performance

### Memory-Hard KDF Parameters

**OWASP Minimum Recommendations:**
- Memory cost: 19 MiB (19456 KiB)
- Iterations (time cost): 2
- Parallelism: 1
- Hash length: 32 bytes (for AES-256)

**Production Recommendations:**
```javascript
const argon2 = require('argon2');

const KDF_OPTIONS = {
  type: argon2.argon2id,
  memoryCost: 65536,  // 64 MiB
  timeCost: 3,        // 3 iterations
  parallelism: 4,     // 4 threads
  hashLength: 32      // 256 bits for AES-256
};
```

**Tuning Strategy:**
1. Start with OWASP minimums
2. Increase memory cost until it uses 50-75% of available RAM per operation
3. Increase time cost until derivation takes 200-500ms
4. Set parallelism to number of CPU cores (typically 1-4)
5. Test under load to ensure acceptable performance

## 2. AES-256-GCM vs AES-256-CBC

### Why GCM is Preferred

**AES-256-GCM (Galois/Counter Mode)** provides **authenticated encryption with associated data (AEAD)**.

**Critical Advantages:**

1. **Authentication Built-In**
   - Produces an authentication tag that proves data integrity
   - Detects tampering, corruption, or wrong decryption key
   - No need for separate HMAC

2. **Padding Oracle Attack Immunity**
   - CBC mode is vulnerable to padding oracle attacks
   - GCM uses counter mode (no padding required)
   - Eliminates entire class of vulnerabilities

3. **Additional Authenticated Data (AAD)**
   - Can authenticate metadata without encrypting it
   - Useful for versioning, headers, identifiers

4. **Performance**
   - Parallelizable (faster on modern CPUs)
   - Hardware acceleration available (AES-NI)

**CBC Disadvantages:**
- Requires separate authentication (HMAC)
- Vulnerable to padding oracle attacks if not implemented correctly
- Sequential processing (slower)
- Easy to misuse (encrypt-then-MAC vs MAC-then-encrypt)

### Migration Path from CBC to GCM

**Strategy: Versioned Blob Format**

```javascript
// Blob format with version header
const BLOB_VERSION = {
  CBC_V1: 0x01,  // Legacy
  GCM_V1: 0x02   // Current
};

async function encryptBlob(plaintext, key) {
  const version = BLOB_VERSION.GCM_V1;
  const salt = crypto.randomBytes(32);
  const nonce = crypto.randomBytes(12);

  const derivedKey = await argon2.hash(key, {
    salt,
    raw: true,
    ...KDF_OPTIONS
  });

  const cipher = crypto.createCipheriv('aes-256-gcm', derivedKey, nonce);
  const ciphertext = Buffer.concat([
    cipher.update(plaintext),
    cipher.final()
  ]);
  const authTag = cipher.getAuthTag();

  // Format: [version:1][salt:32][nonce:12][authTag:16][ciphertext:*]
  return Buffer.concat([
    Buffer.from([version]),
    salt,
    nonce,
    authTag,
    ciphertext
  ]);
}

async function decryptBlob(blob, key) {
  const version = blob[0];

  if (version === BLOB_VERSION.CBC_V1) {
    return decryptCBC(blob, key);  // Legacy path
  } else if (version === BLOB_VERSION.GCM_V1) {
    return decryptGCM(blob, key);  // Current path
  } else {
    throw new Error(`Unsupported blob version: ${version}`);
  }
}

async function decryptGCM(blob, key) {
  const salt = blob.subarray(1, 33);
  const nonce = blob.subarray(33, 45);
  const authTag = blob.subarray(45, 61);
  const ciphertext = blob.subarray(61);

  const derivedKey = await argon2.hash(key, {
    salt,
    raw: true,
    ...KDF_OPTIONS
  });

  const decipher = crypto.createDecipheriv('aes-256-gcm', derivedKey, nonce);
  decipher.setAuthTag(authTag);

  return Buffer.concat([
    decipher.update(ciphertext),
    decipher.final()
  ]);
}
```

**Migration Steps:**
1. Deploy code that can read both CBC and GCM formats
2. Update encryption to always use GCM
3. Implement background job to re-encrypt CBC blobs to GCM
4. Monitor until all blobs are GCM
5. Remove CBC decryption code after grace period

### How to Properly Use GCM

**Critical Rules:**

1. **Never Reuse Nonce with Same Key**
   - Catastrophic security failure
   - Reveals plaintext XOR
   - Generate fresh random nonce for every encryption

2. **Always Verify Authentication Tag**
   - Call `decipher.setAuthTag()` before `decipher.final()`
   - If `decipher.final()` throws, discard plaintext
   - Never return partially decrypted data

3. **Store Nonce and Tag with Ciphertext**
   - Nonce doesn't need to be secret
   - Tag must be transmitted/stored intact
   - Both required for decryption

**Complete Implementation:**

```javascript
const crypto = require('crypto');
const argon2 = require('argon2');

class SecureEncryption {
  constructor(masterKey) {
    this.masterKey = masterKey;
  }

  async encrypt(plaintext) {
    const salt = crypto.randomBytes(32);
    const nonce = crypto.randomBytes(12);  // 96 bits for GCM

    const key = await argon2.hash(this.masterKey, {
      type: argon2.argon2id,
      memoryCost: 65536,
      timeCost: 3,
      parallelism: 4,
      hashLength: 32,
      salt,
      raw: true
    });

    const cipher = crypto.createCipheriv('aes-256-gcm', key, nonce);

    const ciphertext = Buffer.concat([
      cipher.update(plaintext, 'utf8'),
      cipher.final()
    ]);

    const authTag = cipher.getAuthTag();

    return {
      salt: salt.toString('base64'),
      nonce: nonce.toString('base64'),
      authTag: authTag.toString('base64'),
      ciphertext: ciphertext.toString('base64')
    };
  }

  async decrypt(encrypted) {
    const salt = Buffer.from(encrypted.salt, 'base64');
    const nonce = Buffer.from(encrypted.nonce, 'base64');
    const authTag = Buffer.from(encrypted.authTag, 'base64');
    const ciphertext = Buffer.from(encrypted.ciphertext, 'base64');

    const key = await argon2.hash(this.masterKey, {
      type: argon2.argon2id,
      memoryCost: 65536,
      timeCost: 3,
      parallelism: 4,
      hashLength: 32,
      salt,
      raw: true
    });

    const decipher = crypto.createDecipheriv('aes-256-gcm', key, nonce);
    decipher.setAuthTag(authTag);

    try {
      const plaintext = Buffer.concat([
        decipher.update(ciphertext),
        decipher.final()
      ]);
      return plaintext.toString('utf8');
    } catch (err) {
      throw new Error('Authentication failed: data corrupted or wrong key');
    }
  }
}
```

## 3. Per-Blob Salt Generation

### Best Practices

**Rule: One Salt Per Blob**

Each encrypted blob must have its own unique salt. Never reuse salts across different data.

**Why:**
- Prevents rainbow table attacks
- Ensures identical plaintexts produce different ciphertexts
- Isolates compromise (one leaked key doesn't affect other blobs)

**Implementation:**

```javascript
function generateSalt() {
  return crypto.randomBytes(32);  // 256 bits
}

async function encryptWithUniqueSalt(plaintext, masterKey) {
  const salt = generateSalt();  // Fresh salt every time

  const derivedKey = await argon2.hash(masterKey, {
    salt,
    raw: true,
    type: argon2.argon2id,
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 4,
    hashLength: 32
  });

  // ... rest of encryption
}
```

### Salt Storage Patterns

**Pattern 1: Inline Storage (Recommended)**

Store salt with the encrypted blob:

```
[version:1][salt:32][nonce:12][authTag:16][ciphertext:*]
```

**Advantages:**
- Self-contained
- No separate database column needed
- Atomic operations

**Pattern 2: Separate Column**

```sql
CREATE TABLE encrypted_data (
  id INTEGER PRIMARY KEY,
  salt BLOB NOT NULL,
  nonce BLOB NOT NULL,
  auth_tag BLOB NOT NULL,
  ciphertext BLOB NOT NULL
);
```

**Advantages:**
- Easier to query metadata
- Can index on salt (though rarely useful)

**Pattern 3: JSON Envelope**

```json
{
  "version": 2,
  "salt": "base64...",
  "nonce": "base64...",
  "authTag": "base64...",
  "ciphertext": "base64..."
}
```

**Advantages:**
- Human-readable
- Easy to extend with metadata
- Works with document databases

### Salt Size Recommendations

**Standard: 32 bytes (256 bits)**

This matches the key size for AES-256 and provides ample entropy.

**Minimum: 16 bytes (128 bits)**

Acceptable for less critical applications, but 32 bytes is preferred.

**Why Not Smaller:**
- Birthday paradox: collision probability increases with smaller salts
- Future-proofing: quantum computers may reduce effective entropy
- Storage cost is negligible (32 bytes per blob)

**Generation:**

```javascript
const crypto = require('crypto');

const salt = crypto.randomBytes(32);
```

**Critical:** Always use `crypto.randomBytes()` (cryptographically secure PRNG), never `Math.random()`.

## 4. Key Rotation Protocols

### Safe Key Rotation Without Data Loss

**Strategy: Dual-Key Transition Period**

```javascript
class KeyRotationManager {
  constructor(currentKey, previousKey = null) {
    this.currentKey = currentKey;
    this.previousKey = previousKey;
  }

  async encrypt(plaintext) {
    return this.encryptWithKey(plaintext, this.currentKey, 'current');
  }

  async decrypt(blob) {
    const metadata = this.parseMetadata(blob);

    if (metadata.keyVersion === 'current') {
      try {
        return await this.decryptWithKey(blob, this.currentKey);
      } catch (err) {
        if (this.previousKey) {
          return await this.decryptWithKey(blob, this.previousKey);
        }
        throw err;
      }
    } else if (metadata.keyVersion === 'previous' && this.previousKey) {
      return await this.decryptWithKey(blob, this.previousKey);
    } else {
      throw new Error(`Unknown key version: ${metadata.keyVersion}`);
    }
  }

  async reEncrypt(oldBlob) {
    const plaintext = await this.decrypt(oldBlob);
    return await this.encrypt(plaintext);
  }
}
```

**Rotation Steps:**

1. **Preparation**
   - Generate new key
   - Deploy code with both old and new keys
   - New key encrypts, both keys decrypt

2. **Migration**
   - Background job re-encrypts all blobs
   - Track progress in database
   - Handle failures gracefully

3. **Verification**
   - Confirm all blobs use new key
   - Test decryption with new key only
   - Monitor error rates

4. **Cleanup**
   - Remove old key from configuration
   - Deploy code with new key only
   - Securely destroy old key

### Versioning Encrypted Blobs

**Blob Format with Version Header:**

```javascript
const ENCRYPTION_VERSION = {
  V1_CBC: 0x01,
  V2_GCM: 0x02,
  V3_GCM_COMPRESSED: 0x03
};

function createVersionedBlob(version, salt, nonce, authTag, ciphertext) {
  return Buffer.concat([
    Buffer.from([version]),
    salt,
    nonce,
    authTag,
    ciphertext
  ]);
}

function parseVersionedBlob(blob) {
  const version = blob[0];

  switch (version) {
    case ENCRYPTION_VERSION.V1_CBC:
      return {
        version,
        salt: blob.subarray(1, 33),
        iv: blob.subarray(33, 49),
        ciphertext: blob.subarray(49)
      };

    case ENCRYPTION_VERSION.V2_GCM:
      return {
        version,
        salt: blob.subarray(1, 33),
        nonce: blob.subarray(33, 45),
        authTag: blob.subarray(45, 61),
        ciphertext: blob.subarray(61)
      };

    case ENCRYPTION_VERSION.V3_GCM_COMPRESSED:
      return {
        version,
        salt: blob.subarray(1, 33),
        nonce: blob.subarray(33, 45),
        authTag: blob.subarray(45, 61),
        compressionFlag: blob[61],
        ciphertext: blob.subarray(62)
      };

    default:
      throw new Error(`Unsupported encryption version: ${version}`);
  }
}
```

### Backward Compatibility Strategies

**Strategy 1: Version Detection**

```javascript
async function decrypt(blob, keys) {
  const version = blob[0];

  if (version === 0x01) {
    return decryptV1(blob, keys.v1);
  } else if (version === 0x02) {
    return decryptV2(blob, keys.v2);
  } else {
    throw new Error('Unsupported version');
  }
}
```

**Strategy 2: Lazy Migration**

```javascript
async function readAndMigrate(id, keys) {
  const blob = await db.read(id);
  const plaintext = await decrypt(blob, keys);

  if (blob[0] !== CURRENT_VERSION) {
    const newBlob = await encrypt(plaintext, keys.current);
    await db.update(id, newBlob);
  }

  return plaintext;
}
```

**Strategy 3: Batch Migration**

```javascript
async function migrateAllBlobs(keys) {
  const oldBlobs = await db.findByVersion(OLD_VERSION);

  for (const { id, blob } of oldBlobs) {
    try {
      const plaintext = await decrypt(blob, keys.old);
      const newBlob = await encrypt(plaintext, keys.new);
      await db.update(id, newBlob);
      console.log(`Migrated blob ${id}`);
    } catch (err) {
      console.error(`Failed to migrate blob ${id}:`, err);
    }
  }
}
```

## 5. Complete Production Example

```javascript
const crypto = require('crypto');
const argon2 = require('argon2');

const BLOB_VERSION = 0x02;
const SALT_SIZE = 32;
const NONCE_SIZE = 12;
const AUTH_TAG_SIZE = 16;

const KDF_OPTIONS = {
  type: argon2.argon2id,
  memoryCost: 65536,
  timeCost: 3,
  parallelism: 4,
  hashLength: 32
};

class ProductionEncryption {
  constructor(masterKey) {
    if (!masterKey || masterKey.length < 32) {
      throw new Error('Master key must be at least 32 bytes');
    }
    this.masterKey = masterKey;
  }

  async encrypt(plaintext) {
    const salt = crypto.randomBytes(SALT_SIZE);
    const nonce = crypto.randomBytes(NONCE_SIZE);

    const derivedKey = await argon2.hash(this.masterKey, {
      ...KDF_OPTIONS,
      salt,
      raw: true
    });

    const cipher = crypto.createCipheriv('aes-256-gcm', derivedKey, nonce);
    const ciphertext = Buffer.concat([
      cipher.update(Buffer.from(plaintext, 'utf8')),
      cipher.final()
    ]);
    const authTag = cipher.getAuthTag();

    return Buffer.concat([
      Buffer.from([BLOB_VERSION]),
      salt,
      nonce,
      authTag,
      ciphertext
    ]);
  }

  async decrypt(blob) {
    if (blob[0] !== BLOB_VERSION) {
      throw new Error(`Unsupported blob version: ${blob[0]}`);
    }

    const salt = blob.subarray(1, 1 + SALT_SIZE);
    const nonce = blob.subarray(1 + SALT_SIZE, 1 + SALT_SIZE + NONCE_SIZE);
    const authTag = blob.subarray(
      1 + SALT_SIZE + NONCE_SIZE,
      1 + SALT_SIZE + NONCE_SIZE + AUTH_TAG_SIZE
    );
    const ciphertext = blob.subarray(1 + SALT_SIZE + NONCE_SIZE + AUTH_TAG_SIZE);

    const derivedKey = await argon2.hash(this.masterKey, {
      ...KDF_OPTIONS,
      salt,
      raw: true
    });

    const decipher = crypto.createDecipheriv('aes-256-gcm', derivedKey, nonce);
    decipher.setAuthTag(authTag);

    try {
      const plaintext = Buffer.concat([
        decipher.update(ciphertext),
        decipher.final()
      ]);
      return plaintext.toString('utf8');
    } catch (err) {
      throw new Error('Decryption failed: authentication error or wrong key');
    }
  }
}

module.exports = { ProductionEncryption };
```

## 6. Security Checklist

- [ ] Use Argon2id (not bcrypt, PBKDF2, or plain scrypt)
- [ ] Memory cost ≥ 19 MiB (prefer 64 MiB)
- [ ] Time cost ≥ 2 iterations (prefer 3)
- [ ] Use AES-256-GCM (not CBC)
- [ ] Generate unique 32-byte salt per blob
- [ ] Generate unique 12-byte nonce per encryption
- [ ] Store salt, nonce, and auth tag with ciphertext
- [ ] Verify auth tag during decryption
- [ ] Never reuse nonce with same key
- [ ] Use `crypto.randomBytes()` for all random generation
- [ ] Master key stored in environment variable only
- [ ] Master key ≥ 32 bytes of entropy
- [ ] Implement versioned blob format
- [ ] Plan key rotation strategy
- [ ] Test decryption failure handling
- [ ] Never log keys, salts, or plaintext
- [ ] Use constant-time comparison for auth tags (built into GCM)

## 7. Common Pitfalls to Avoid

1. **Nonce Reuse**: Catastrophic failure in GCM mode
2. **Ignoring Auth Tag**: Defeats purpose of authenticated encryption
3. **Weak Master Key**: Use cryptographically random keys, not passwords
4. **Insufficient KDF Parameters**: Don't use defaults without testing
5. **Storing Keys in Code**: Always use environment variables
6. **No Version Header**: Makes migration impossible
7. **Synchronous Crypto**: Use async APIs to avoid blocking event loop
8. **Error Message Leakage**: Don't reveal whether key or data was wrong

## Sources

- [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [node-argon2 GitHub Repository](https://github.com/ranisalt/node-argon2)
- [Node.js Crypto Documentation](https://nodejs.org/api/crypto.html)
- NIST SP 800-38D (GCM Specification)
- RFC 9106 (Argon2 Specification)

---

**Last Updated**: 2026-03-04
**Maintained by**: Violet & Susy
