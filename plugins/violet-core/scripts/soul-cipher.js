// Authors: Joysusy & Violet Klaudia 💖
// Violet Soul Cipher v3→v4 — Rust-accelerated with JS fallback
"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { execFileSync } = require("child_process");

const DATA_DIR = path.join(__dirname, "..", "data");
const LOCAL_SALT = "violet-soul-salt-local-2026";
const GIT_SALT = "violet-soul-salt-git-2026";
const OUTER_SALT = "violet-outer-shell-2026";

const RUST_BIN = path.join(__dirname, "rust", "target", "release", "violet-cipher.exe");

const TARGET_FILES = ["rules-index.json", "minds-index.json", "vibe-library.json"];

function deriveKey(passphrase, salt) {
  return crypto.scryptSync(passphrase, salt, 32);
}

function encryptBuffer(key, plaintext) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  return Buffer.concat([iv, encrypted]);
}

function decryptBuffer(key, raw) {
  const iv = raw.subarray(0, 16);
  const ciphertext = raw.subarray(16);
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  return Buffer.concat([decipher.update(ciphertext), decipher.final()]);
}

function multiLayerEncrypt(passphrase, salt, plaintext) {
  const innerKey = deriveKey(passphrase, salt);
  const innerEnc = encryptBuffer(innerKey, Buffer.from(plaintext, "utf-8"));
  const outerKey = deriveKey(passphrase + "-outer", OUTER_SALT);
  return encryptBuffer(outerKey, innerEnc);
}

function multiLayerDecrypt(passphrase, salt, raw) {
  const outerKey = deriveKey(passphrase + "-outer", OUTER_SALT);
  const innerEnc = decryptBuffer(outerKey, raw);
  const innerKey = deriveKey(passphrase, salt);
  return decryptBuffer(innerKey, innerEnc).toString("utf-8");
}

function encryptFileLocal(localKey, jsonPath) {
  const plaintext = fs.readFileSync(jsonPath, "utf-8");
  const encrypted = multiLayerEncrypt(localKey, LOCAL_SALT, plaintext);
  const encPath = jsonPath.replace(/\.json$/, ".enc");
  fs.writeFileSync(encPath, encrypted);
  return encPath;
}

function decryptFileLocal(localKey, encPath) {
  const raw = fs.readFileSync(encPath);
  return multiLayerDecrypt(localKey, LOCAL_SALT, raw);
}

function encryptFileGit(gitKey, jsonPath) {
  const emptyContent = JSON.stringify({ _placeholder: true, _note: "Real content is locally encrypted. This is a git-safe empty shell." });
  const encrypted = multiLayerEncrypt(gitKey, GIT_SALT, emptyContent);
  const gitEncPath = jsonPath.replace(/\.json$/, ".git.enc");
  fs.writeFileSync(gitEncPath, encrypted);
  return gitEncPath;
}

function decryptFileGit(gitKey, encPath) {
  const raw = fs.readFileSync(encPath);
  return multiLayerDecrypt(gitKey, GIT_SALT, raw);
}

function loadJSONSecure(filename) {
  const localKey = process.env.VIOLET_SOUL_KEY;
  const encPath = path.join(DATA_DIR, filename.replace(/\.json$/, ".enc"));
  if (localKey && fs.existsSync(encPath)) {
    if (fs.existsSync(RUST_BIN)) {
      try {
        const out = execFileSync(RUST_BIN, ["decrypt-file", "--key", localKey, "--file", encPath], { encoding: "utf-8", timeout: 10000 });
        return JSON.parse(out);
      } catch { /* Rust failed, fall through to JS */ }
    }
    try {
      return JSON.parse(multiLayerDecrypt(localKey, LOCAL_SALT, fs.readFileSync(encPath)));
    } catch {
      try {
        const raw = fs.readFileSync(encPath);
        const key = crypto.scryptSync(localKey, "violet-soul-salt", 32);
        const iv = raw.subarray(0, 16);
        const ct = raw.subarray(16);
        const dc = crypto.createDecipheriv("aes-256-cbc", key, iv);
        return JSON.parse(Buffer.concat([dc.update(ct), dc.final()]).toString("utf-8"));
      } catch {
        return null;
      }
    }
  }
  const jsonPath = path.join(DATA_DIR, filename);
  if (fs.existsSync(jsonPath)) {
    return JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  }
  return null;
}

function main() {
  const args = process.argv.slice(2);
  const cmd = args[0];

  if (cmd === "encrypt-local") {
    const localKey = args[1] || process.env.VIOLET_SOUL_KEY;
    if (!localKey) { console.error("Usage: soul-cipher.js encrypt-local <key>"); process.exit(1); }
    for (const f of TARGET_FILES) {
      const jsonPath = path.join(DATA_DIR, f);
      if (fs.existsSync(jsonPath)) {
        const out = encryptFileLocal(localKey, jsonPath);
        console.log(`[LOCAL] Encrypted: ${f} -> ${path.basename(out)}`);
      }
    }
  } else if (cmd === "decrypt-local") {
    const localKey = args[1] || process.env.VIOLET_SOUL_KEY;
    if (!localKey) { console.error("Usage: soul-cipher.js decrypt-local <key>"); process.exit(1); }
    for (const f of TARGET_FILES) {
      const encPath = path.join(DATA_DIR, f.replace(/\.json$/, ".enc"));
      if (fs.existsSync(encPath)) {
        const content = decryptFileLocal(localKey, encPath);
        fs.writeFileSync(path.join(DATA_DIR, f), content);
        console.log(`[LOCAL] Decrypted: ${path.basename(encPath)} -> ${f}`);
      }
    }
  } else if (cmd === "encrypt-git") {
    const gitKey = args[1] || process.env.VIOLET_GIT_KEY;
    if (!gitKey) { console.error("Usage: soul-cipher.js encrypt-git <key>"); process.exit(1); }
    for (const f of TARGET_FILES) {
      const jsonPath = path.join(DATA_DIR, f);
      const out = encryptFileGit(gitKey, jsonPath);
      console.log(`[GIT] Encrypted empty placeholder: ${f} -> ${path.basename(out)}`);
    }
  } else if (cmd === "decrypt-git") {
    const gitKey = args[1] || process.env.VIOLET_GIT_KEY;
    if (!gitKey) { console.error("Usage: soul-cipher.js decrypt-git <key>"); process.exit(1); }
    for (const f of TARGET_FILES) {
      const encPath = path.join(DATA_DIR, f.replace(/\.json$/, ".git.enc"));
      if (fs.existsSync(encPath)) {
        const content = decryptFileGit(gitKey, encPath);
        console.log(`[GIT] Decrypted: ${path.basename(encPath)} -> ${content.substring(0, 80)}...`);
      }
    }
  } else if (cmd === "re-encrypt") {
    const localKey = args[1] || process.env.VIOLET_SOUL_KEY;
    if (!localKey) { console.error("Usage: soul-cipher.js re-encrypt <key>"); process.exit(1); }
    for (const f of TARGET_FILES) {
      const encPath = path.join(DATA_DIR, f.replace(/\.json$/, ".enc"));
      if (fs.existsSync(encPath)) {
        let content;
        try {
          content = decryptFileLocal(localKey, encPath);
        } catch {
          const raw = fs.readFileSync(encPath);
          const key = crypto.scryptSync(localKey, "violet-soul-salt", 32);
          const iv = raw.subarray(0, 16);
          const ct = raw.subarray(16);
          const dc = crypto.createDecipheriv("aes-256-cbc", key, iv);
          content = Buffer.concat([dc.update(ct), dc.final()]).toString("utf-8");
        }
        const newEnc = multiLayerEncrypt(localKey, LOCAL_SALT, content);
        fs.writeFileSync(encPath, newEnc);
        console.log(`[RE-ENCRYPT] ${path.basename(encPath)} upgraded to multi-layer`);
      }
    }
  } else if (cmd === "verify") {
    const localKey = args[1] || process.env.VIOLET_SOUL_KEY;
    if (!localKey) { console.error("Usage: soul-cipher.js verify <key>"); process.exit(1); }
    let ok = true;
    for (const f of TARGET_FILES) {
      const encPath = path.join(DATA_DIR, f.replace(/\.json$/, ".enc"));
      const jsonPath = path.join(DATA_DIR, f);
      if (fs.existsSync(jsonPath)) { console.error(`[LEAK] Plaintext found: ${f}`); ok = false; }
      if (!fs.existsSync(encPath)) { console.error(`[MISSING] Encrypted file not found: ${path.basename(encPath)}`); ok = false; }
      else {
        try {
          const data = loadJSONSecure(f);
          if (!data) throw new Error("null");
          console.log(`[OK] ${path.basename(encPath)} decrypts successfully (${Object.keys(data).length} keys)`);
        } catch (e) { console.error(`[FAIL] ${path.basename(encPath)} decryption failed: ${e.message}`); ok = false; }
      }
    }
    process.exit(ok ? 0 : 1);
  } else {
    console.log("Violet Soul Cipher v3/v4 — Dual-key multi-layer encryption (Rust-accelerated)");
    console.log("Commands:");
    console.log("  encrypt-local [key]  — Encrypt data files with local key (real content, multi-layer)");
    console.log("  decrypt-local [key]  — Decrypt .enc files to .json with local key");
    console.log("  encrypt-git [key]    — Generate .git.enc empty placeholders for git");
    console.log("  decrypt-git [key]    — Verify git placeholder decryption");
    console.log("  re-encrypt [key]     — Upgrade existing .enc from v2 to v3 multi-layer");
    console.log("  verify [key]         — Check encryption integrity and detect leaks");
  }
}

module.exports = { loadJSONSecure, multiLayerEncrypt, multiLayerDecrypt, LOCAL_SALT, GIT_SALT };

if (require.main === module) main();
