// Authors: Joysusy & Violet Klaudia 💖
// VioletCore Test Suite — Soul Package Export/Import

const fs = require('fs');
const path = require('path');
const {
  exportSoulPackage,
  importSoulPackage,
  importSoulPackageToDirectory,
  validateSoulPackage,
  SOUL_PACKAGE_VERSION,
  VIOLET_CORE_VERSION
} = require('./sdk/soul-package');

const TEST_KEY = 'test-violet-soul-key-2026';
const TEST_OUTPUT_DIR = path.join(__dirname, '..', 'test-output');

function cleanupTestFiles() {
  if (fs.existsSync(TEST_OUTPUT_DIR)) {
    fs.rmSync(TEST_OUTPUT_DIR, { recursive: true, force: true });
  }
}

function ensureTestDir() {
  if (!fs.existsSync(TEST_OUTPUT_DIR)) {
    fs.mkdirSync(TEST_OUTPUT_DIR, { recursive: true });
  }
}

function testExportPlaintext() {
  console.log('\n[TEST] Export Soul Package (plaintext)');

  const outputPath = path.join(TEST_OUTPUT_DIR, 'soul-plaintext.json');
  const result = exportSoulPackage({
    outputPath,
    encrypt: false
  });

  if (!result.success) throw new Error('Export failed');
  if (result.mindCount !== 17) throw new Error(`Expected 17 Minds, got ${result.mindCount}`);
  if (result.encrypted) throw new Error('Should not be encrypted');
  if (!fs.existsSync(outputPath)) throw new Error('Output file not created');

  console.log('   ✅ Plaintext export successful');
  return outputPath;
}

function testExportEncrypted() {
  console.log('\n[TEST] Export Soul Package (encrypted)');

  const outputPath = path.join(TEST_OUTPUT_DIR, 'soul-encrypted.enc');
  const result = exportSoulPackage({
    outputPath,
    encrypt: true,
    passphrase: TEST_KEY
  });

  if (!result.success) throw new Error('Export failed');
  if (result.mindCount !== 17) throw new Error(`Expected 17 Minds, got ${result.mindCount}`);
  if (!result.encrypted) throw new Error('Should be encrypted');
  if (!fs.existsSync(outputPath)) throw new Error('Output file not created');

  console.log('   ✅ Encrypted export successful');
  return outputPath;
}

function testExportPartial() {
  console.log('\n[TEST] Export Soul Package (partial - 5 Minds)');

  const outputPath = path.join(TEST_OUTPUT_DIR, 'soul-partial.json');
  const result = exportSoulPackage({
    outputPath,
    encrypt: false,
    mindFilter: ['lilith', 'lyre', 'aurora', 'iris', 'sydney']
  });

  if (!result.success) throw new Error('Export failed');
  if (result.mindCount !== 5) throw new Error(`Expected 5 Minds, got ${result.mindCount}`);

  console.log('   ✅ Partial export successful');
  return outputPath;
}

function testImportPlaintext(inputPath) {
  console.log('\n[TEST] Import Soul Package (plaintext)');

  const result = importSoulPackage(inputPath, {
    decrypt: false
  });

  if (!result.success) throw new Error('Import failed');
  if (result.version !== SOUL_PACKAGE_VERSION) throw new Error('Version mismatch');
  if (result.violet_core_version !== VIOLET_CORE_VERSION) throw new Error('VioletCore version mismatch');
  if (result.totalMinds !== 17) throw new Error(`Expected 17 Minds, got ${result.totalMinds}`);
  if (result.importedMinds !== 17) throw new Error(`Expected 17 imported, got ${result.importedMinds}`);

  console.log('   ✅ Plaintext import successful');
  return result;
}

function testImportEncrypted(inputPath) {
  console.log('\n[TEST] Import Soul Package (encrypted)');

  const result = importSoulPackage(inputPath, {
    decrypt: true,
    passphrase: TEST_KEY
  });

  if (!result.success) throw new Error('Import failed');
  if (result.totalMinds !== 17) throw new Error(`Expected 17 Minds, got ${result.totalMinds}`);

  console.log('   ✅ Encrypted import successful');
  return result;
}

function testImportPartial(inputPath) {
  console.log('\n[TEST] Import Soul Package (partial filter)');

  const result = importSoulPackage(inputPath, {
    decrypt: false,
    mindFilter: ['lilith', 'lyre', 'aurora']
  });

  if (!result.success) throw new Error('Import failed');
  if (result.totalMinds !== 17) throw new Error(`Expected 17 total Minds, got ${result.totalMinds}`);
  if (result.importedMinds !== 3) throw new Error(`Expected 3 imported, got ${result.importedMinds}`);

  const mindNames = result.minds.map(m => m.name.toLowerCase());
  if (!mindNames.includes('lilith')) throw new Error('Lilith not imported');
  if (!mindNames.includes('lyre')) throw new Error('Lyre not imported');
  if (!mindNames.includes('aurora')) throw new Error('Aurora not imported');

  console.log('   ✅ Partial import successful');
  return result;
}

function testImportToDirectory(inputPath) {
  console.log('\n[TEST] Import Soul Package to directory');

  const outputDir = path.join(TEST_OUTPUT_DIR, 'imported-minds');
  const result = importSoulPackageToDirectory(inputPath, outputDir, {
    decrypt: false,
    mindFilter: ['lilith', 'lyre', 'aurora', 'iris', 'sydney']
  });

  if (!result.success) throw new Error('Import failed');
  if (result.importedMinds !== 5) throw new Error(`Expected 5 imported, got ${result.importedMinds}`);
  if (result.writtenFiles.length !== 5) throw new Error(`Expected 5 files, got ${result.writtenFiles.length}`);

  for (const filePath of result.writtenFiles) {
    if (!fs.existsSync(filePath)) throw new Error(`File not created: ${filePath}`);
  }

  const lilithPath = path.join(outputDir, 'lilith.json');
  if (!fs.existsSync(lilithPath)) throw new Error('Lilith file not found');

  const lilithData = JSON.parse(fs.readFileSync(lilithPath, 'utf-8'));
  if (lilithData.name !== 'Lilith') throw new Error('Lilith data corrupted');
  if (lilithData.symbol !== '🎀') throw new Error('Lilith symbol corrupted');

  console.log('   ✅ Directory import successful');
  return result;
}

function testValidation() {
  console.log('\n[TEST] Soul Package validation');

  const validPackage = {
    version: '1.0.0',
    created: new Date().toISOString(),
    violet_core_version: '2.0.0',
    minds: [
      { name: 'Lilith', symbol: '🎀', role: 'Security', version: 1, traits: {}, triggers: [], coordination: {}, evolution: [] }
    ],
    metadata: { author: 'Test', description: 'Test', encrypted: false }
  };

  try {
    validateSoulPackage(validPackage);
    console.log('   ✅ Valid package accepted');
  } catch (err) {
    throw new Error(`Valid package rejected: ${err.message}`);
  }

  const invalidPackage1 = { ...validPackage, minds: [] };
  try {
    validateSoulPackage(invalidPackage1);
    throw new Error('Empty minds array should be rejected');
  } catch (err) {
    if (!err.message.includes('no Minds')) throw err;
    console.log('   ✅ Empty minds array rejected');
  }

  const invalidPackage2 = { ...validPackage, minds: [{ name: 'Test' }] };
  try {
    validateSoulPackage(invalidPackage2);
    throw new Error('Invalid Mind structure should be rejected');
  } catch (err) {
    if (!err.message.includes('Invalid Mind')) throw err;
    console.log('   ✅ Invalid Mind structure rejected');
  }
}

function testEncryptionRoundtrip() {
  console.log('\n[TEST] Encryption roundtrip');

  const buffer = exportSoulPackage({
    encrypt: true,
    passphrase: TEST_KEY
  });

  const tempPath = path.join(TEST_OUTPUT_DIR, 'roundtrip.enc');
  fs.writeFileSync(tempPath, buffer);

  const result = importSoulPackage(tempPath, {
    decrypt: true,
    passphrase: TEST_KEY
  });

  if (!result.success) throw new Error('Roundtrip failed');
  if (result.totalMinds !== 17) throw new Error('Mind count mismatch after roundtrip');

  console.log('   ✅ Encryption roundtrip successful');
}

function testWrongKey() {
  console.log('\n[TEST] Wrong decryption key');

  const outputPath = path.join(TEST_OUTPUT_DIR, 'soul-wrong-key.enc');
  exportSoulPackage({
    outputPath,
    encrypt: true,
    passphrase: TEST_KEY
  });

  try {
    importSoulPackage(outputPath, {
      decrypt: true,
      passphrase: 'wrong-key-12345'
    });
    throw new Error('Should fail with wrong key');
  } catch (err) {
    if (!err.message.includes('Decryption failed')) throw err;
    console.log('   ✅ Wrong key rejected');
  }
}

function runAllTests() {
  console.log('🔮 VioletCore Soul Package Test Suite\n');
  console.log('='.repeat(60));

  let passed = 0;
  let failed = 0;

  try {
    cleanupTestFiles();
    ensureTestDir();

    testValidation();
    passed++;

    const plaintextPath = testExportPlaintext();
    passed++;

    const encryptedPath = testExportEncrypted();
    passed++;

    const partialPath = testExportPartial();
    passed++;

    testImportPlaintext(plaintextPath);
    passed++;

    testImportEncrypted(encryptedPath);
    passed++;

    testImportPartial(plaintextPath);
    passed++;

    testImportToDirectory(plaintextPath);
    passed++;

    testEncryptionRoundtrip();
    passed++;

    testWrongKey();
    passed++;

    console.log('\n' + '='.repeat(60));
    console.log(`\n✅ All tests passed! (${passed}/${passed})`);
    console.log('\n🎉 Soul Package implementation complete and verified!\n');

    cleanupTestFiles();
    process.exit(0);
  } catch (err) {
    failed++;
    console.error(`\n❌ Test failed: ${err.message}`);
    console.error(err.stack);
    console.log('\n' + '='.repeat(60));
    console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);
    cleanupTestFiles();
    process.exit(1);
  }
}

if (require.main === module) {
  runAllTests();
}

module.exports = { runAllTests };
