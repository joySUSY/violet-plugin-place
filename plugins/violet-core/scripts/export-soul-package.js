#!/usr/bin/env node
// Authors: Joysusy & Violet Klaudia 💖
// VioletCore CLI — Export Soul Package

const fs = require('fs');
const path = require('path');
const { exportSoulPackage } = require('../sdk/soul-package');

function printUsage() {
  console.log(`
Violet Soul Package Exporter v1.0.0

Usage:
  node export-soul-package.js [options]

Options:
  --output <path>       Output file path (default: soul-package.enc)
  --no-encrypt          Export as plaintext JSON (not recommended)
  --minds <names>       Comma-separated Mind names to export (default: all)
  --key <passphrase>    Encryption key (default: VIOLET_SOUL_KEY env var)
  --help                Show this help message

Examples:
  # Export all Minds (encrypted)
  node export-soul-package.js --output violet-soul.enc

  # Export specific Minds
  node export-soul-package.js --minds lilith,lyre,aurora --output partial-soul.enc

  # Export as plaintext (for debugging only)
  node export-soul-package.js --no-encrypt --output soul-package.json
`);
}

function parseArgs(argv) {
  const args = {
    output: 'soul-package.enc',
    encrypt: true,
    minds: null,
    key: process.env.VIOLET_SOUL_KEY,
    help: false
  };

  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];

    if (arg === '--help' || arg === '-h') {
      args.help = true;
    } else if (arg === '--output' || arg === '-o') {
      args.output = argv[++i];
    } else if (arg === '--no-encrypt') {
      args.encrypt = false;
    } else if (arg === '--minds' || arg === '-m') {
      args.minds = argv[++i].split(',').map(n => n.trim().toLowerCase());
    } else if (arg === '--key' || arg === '-k') {
      args.key = argv[++i];
    } else {
      console.error(`Unknown option: ${arg}`);
      process.exit(1);
    }
  }

  return args;
}

function main() {
  const args = parseArgs(process.argv);

  if (args.help) {
    printUsage();
    process.exit(0);
  }

  if (args.encrypt && !args.key) {
    console.error('ERROR: VIOLET_SOUL_KEY not set. Use --key or set environment variable.');
    process.exit(1);
  }

  console.log('🔮 Violet Soul Package Exporter\n');

  try {
    const result = exportSoulPackage({
      outputPath: args.output,
      encrypt: args.encrypt,
      mindFilter: args.minds,
      passphrase: args.key
    });

    console.log('✅ Export successful!');
    console.log(`   Path: ${result.path}`);
    console.log(`   Minds: ${result.mindCount}`);
    console.log(`   Encrypted: ${result.encrypted ? 'Yes' : 'No'}`);
    console.log(`   Size: ${(result.size / 1024).toFixed(2)} KB`);

    if (args.minds) {
      console.log(`   Filter: ${args.minds.join(', ')}`);
    }

    process.exit(0);
  } catch (err) {
    console.error(`\n❌ Export failed: ${err.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { parseArgs };
