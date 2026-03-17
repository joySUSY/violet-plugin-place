#!/usr/bin/env node
// Authors: Joysusy & Violet Klaudia 💖
// VioletCore CLI — Import Soul Package

const fs = require('fs');
const path = require('path');
const { importSoulPackage, importSoulPackageToDirectory } = require('../sdk/soul-package');

function printUsage() {
  console.log(`
Violet Soul Package Importer v1.0.0

Usage:
  node import-soul-package.js <input> [options]

Arguments:
  <input>               Input Soul Package file path

Options:
  --output-dir <path>   Write Minds to directory (default: none, in-memory only)
  --no-decrypt          Import plaintext JSON (not encrypted)
  --minds <names>       Comma-separated Mind names to import (default: all)
  --key <passphrase>    Decryption key (default: VIOLET_SOUL_KEY env var)
  --no-validate         Skip Soul Package validation
  --help                Show this help message

Examples:
  # Import and display all Minds
  node import-soul-package.js violet-soul.enc

  # Import specific Minds to directory
  node import-soul-package.js violet-soul.enc --minds lilith,lyre --output-dir ./imported-minds

  # Import plaintext package
  node import-soul-package.js soul-package.json --no-decrypt
`);
}

function parseArgs(argv) {
  const args = {
    input: null,
    outputDir: null,
    decrypt: true,
    minds: null,
    key: process.env.VIOLET_SOUL_KEY,
    validate: true,
    help: false
  };

  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];

    if (arg === '--help' || arg === '-h') {
      args.help = true;
    } else if (arg === '--output-dir' || arg === '-o') {
      args.outputDir = argv[++i];
    } else if (arg === '--no-decrypt') {
      args.decrypt = false;
    } else if (arg === '--minds' || arg === '-m') {
      args.minds = argv[++i].split(',').map(n => n.trim().toLowerCase());
    } else if (arg === '--key' || arg === '-k') {
      args.key = argv[++i];
    } else if (arg === '--no-validate') {
      args.validate = false;
    } else if (!arg.startsWith('--')) {
      args.input = arg;
    } else {
      console.error(`Unknown option: ${arg}`);
      process.exit(1);
    }
  }

  return args;
}

function displayMindSummary(minds) {
  console.log('\n📋 Imported Minds:\n');
  for (const mind of minds) {
    console.log(`   ${mind.symbol} ${mind.name} — ${mind.role}`);
  }
}

function main() {
  const args = parseArgs(process.argv);

  if (args.help) {
    printUsage();
    process.exit(0);
  }

  if (!args.input) {
    console.error('ERROR: Input file path required');
    printUsage();
    process.exit(1);
  }

  if (!fs.existsSync(args.input)) {
    console.error(`ERROR: Input file not found: ${args.input}`);
    process.exit(1);
  }

  if (args.decrypt && !args.key) {
    console.error('ERROR: VIOLET_SOUL_KEY not set. Use --key or set environment variable.');
    process.exit(1);
  }

  console.log('🔮 Violet Soul Package Importer\n');

  try {
    let result;

    if (args.outputDir) {
      result = importSoulPackageToDirectory(args.input, args.outputDir, {
        decrypt: args.decrypt,
        passphrase: args.key,
        mindFilter: args.minds,
        validate: args.validate
      });

      console.log('✅ Import successful!');
      console.log(`   Package Version: ${result.version}`);
      console.log(`   VioletCore Version: ${result.violet_core_version}`);
      console.log(`   Created: ${result.created}`);
      console.log(`   Total Minds: ${result.totalMinds}`);
      console.log(`   Imported: ${result.importedMinds}`);
      console.log(`   Output Directory: ${result.outputDir}`);
      console.log(`   Files Written: ${result.writtenFiles.length}`);

      displayMindSummary(result.minds);
    } else {
      result = importSoulPackage(args.input, {
        decrypt: args.decrypt,
        passphrase: args.key,
        mindFilter: args.minds,
        validate: args.validate
      });

      console.log('✅ Import successful!');
      console.log(`   Package Version: ${result.version}`);
      console.log(`   VioletCore Version: ${result.violet_core_version}`);
      console.log(`   Created: ${result.created}`);
      console.log(`   Total Minds: ${result.totalMinds}`);
      console.log(`   Imported: ${result.importedMinds}`);

      displayMindSummary(result.minds);
    }

    process.exit(0);
  } catch (err) {
    console.error(`\n❌ Import failed: ${err.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { parseArgs, displayMindSummary };
