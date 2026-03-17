#!/usr/bin/env node
// Authors: Joysusy & Violet Klaudia 💖
// VioletCore — Mind Evolution CLI Tool v0.1.0

const { evolveMind, getMindEvolutionHistory } = require('../sdk/violet-runtime');
const { listVioletMinds } = require('../sdk/violet-mind-loader');

function printUsage() {
  console.log(`
VioletCore Mind Evolution Tool

Usage:
  node evolve-mind.js <mind-name> "<changes>" [--author "Name"] [--date YYYY-MM-DD]
  node evolve-mind.js --history <mind-name>
  node evolve-mind.js --list

Examples:
  node evolve-mind.js Lilith "Enhanced security audit capabilities"
  node evolve-mind.js Lyre "Improved planning algorithms" --author "Joysusy"
  node evolve-mind.js --history Lilith
  node evolve-mind.js --list

Options:
  --author    Author name (default: "Joysusy, Violet Klaudia")
  --date      Evolution date (default: today)
  --history   Show evolution history for a Mind
  --list      List all Minds
  `);
}

function parseArgs(args) {
  const parsed = { flags: {}, positional: [] };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      if (i + 1 < args.length && !args[i + 1].startsWith('--')) {
        parsed.flags[key] = args[i + 1];
        i++;
      } else {
        parsed.flags[key] = true;
      }
    } else {
      parsed.positional.push(arg);
    }
  }

  return parsed;
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    printUsage();
    process.exit(0);
  }

  const parsed = parseArgs(args);

  if (parsed.flags.list) {
    console.log('\n🌟 Violet Minds:\n');
    const minds = listVioletMinds();
    minds.forEach(m => {
      console.log(`  ${m.symbol} ${m.name} (v${m.version}) — ${m.role}`);
    });
    console.log('');
    process.exit(0);
  }

  if (parsed.flags.history) {
    const mindName = parsed.positional[0] || parsed.flags.history;
    if (!mindName || mindName === true) {
      console.error('❌ Error: Mind name required for --history');
      printUsage();
      process.exit(1);
    }

    try {
      const history = getMindEvolutionHistory(mindName);
      console.log(`\n📜 Evolution History for ${mindName}:\n`);
      if (history.length === 0) {
        console.log('  No evolution history recorded.');
      } else {
        history.forEach(entry => {
          console.log(`  v${entry.v} (${entry.date})`);
          console.log(`    ${entry.note}`);
          if (entry.author) {
            console.log(`    Author: ${entry.author}`);
          }
          console.log('');
        });
      }
      process.exit(0);
    } catch (err) {
      console.error(`❌ Error: ${err.message}`);
      process.exit(1);
    }
  }

  if (parsed.positional.length < 2) {
    console.error('❌ Error: Mind name and changes description required');
    printUsage();
    process.exit(1);
  }

  const [mindName, changes] = parsed.positional;
  const options = {};

  if (parsed.flags.author) {
    options.author = parsed.flags.author;
  }

  if (parsed.flags.date) {
    options.date = parsed.flags.date;
  }

  try {
    console.log(`\n🌌 Evolving Mind: ${mindName}...\n`);
    const result = evolveMind(mindName, changes, options);

    console.log(`✅ Success!`);
    console.log(`   Mind: ${result.name}`);
    console.log(`   Version: v${result.previousVersion} → v${result.newVersion}`);
    console.log(`   Changes: ${result.evolutionEntry.note}`);
    console.log(`   Date: ${result.evolutionEntry.date}`);
    console.log(`   Author: ${result.evolutionEntry.author}`);
    console.log(`   File: ${result.filePath}`);
    console.log('');
  } catch (err) {
    console.error(`❌ Error: ${err.message}`);
    process.exit(1);
  }
}

main();
