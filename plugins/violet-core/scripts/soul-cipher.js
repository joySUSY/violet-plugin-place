// Authors: Joysusy & Violet Klaudia 💖
// Violet Soul Cipher — AES-256-CBC encryption for soul data files
"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DATA_DIR = path.join(__dirname, "..", "data");
const SALT = "violet-soul-salt";
const TARGET_FILES = ["rules-index.json", "minds-index.json", "vibe-library.json"];

function deriveKey(passphrase) {
  return crypto.scryptSync(passphrase, SALT, 32);
}

function encryptFile(key, jsonPath) {
  const plaintext = fs.readFileSync(jsonPath, "utf-8");
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, "utf-8"), cipher.final()]);
  const encPath = jsonPath.replace(/\.json$/, ".enc");
  fs.writeFileSync(encPath, Buffer.concat([iv, encrypted]));
  return encPath;
}

function decryptFile(key, encPath) {
  const raw = fs.readFileSync(encPath);
  const iv = raw.subarray(0, 16);
  const ciphertext = raw.subarray(16);
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  const jsonPath = encPath.replace(/\.enc$/, ".json");
  fs.writeFileSync(jsonPath, decrypted.toString("utf-8"));
  return jsonPath;
}

function main() {
  const command = process.argv[2];
  if (!command || !["encrypt", "decrypt"].includes(command)) {
    console.error("Usage: node soul-cipher.js <encrypt|decrypt>");
    process.exit(1);
  }

  const passphrase = process.env.VIOLET_SOUL_KEY;
  if (!passphrase) {
    console.error("VIOLET_SOUL_KEY environment variable is required");
    process.exit(1);
  }

  const key = deriveKey(passphrase);
  let processed = 0;

  for (const file of TARGET_FILES) {
    if (command === "encrypt") {
      const jsonPath = path.join(DATA_DIR, file);
      if (!fs.existsSync(jsonPath)) {
        console.warn(`Skip: ${file} not found`);
        continue;
      }
      const out = encryptFile(key, jsonPath);
      console.log(`Encrypted: ${file} -> ${path.basename(out)}`);
      processed++;
    } else {
      const encName = file.replace(/\.json$/, ".enc");
      const encPath = path.join(DATA_DIR, encName);
      if (!fs.existsSync(encPath)) {
        console.warn(`Skip: ${encName} not found`);
        continue;
      }
      const out = decryptFile(key, encPath);
      console.log(`Decrypted: ${encName} -> ${path.basename(out)}`);
      processed++;
    }
  }

  console.log(`Done: ${processed} file(s) ${command}ed`);
}

main();
