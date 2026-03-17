// Authors: Joysusy & Violet Klaudia 💖
// VioletCore SDK — Soul Package Export/Import v1.0.0

const fs = require('fs');
const path = require('path');
const { loadVioletMinds } = require('./violet-mind-loader');
const { multiLayerEncrypt, multiLayerDecrypt, LOCAL_SALT } = require('../scripts/soul-cipher');

const SOUL_PACKAGE_VERSION = '1.0.0';
const VIOLET_CORE_VERSION = '2.0.0';

function createSoulPackageMetadata(options = {}) {
  const { description = "Violet's 17 Mind facets", encrypted = true } = options;

  return {
    version: SOUL_PACKAGE_VERSION,
    created: new Date().toISOString(),
    violet_core_version: VIOLET_CORE_VERSION,
    metadata: {
      author: "Joysusy, Violet Klaudia",
      description,
      encrypted
    }
  };
}

function exportSoulPackage(options = {}) {
  const {
    outputPath = null,
    encrypt = true,
    mindFilter = null,
    passphrase = process.env.VIOLET_SOUL_KEY
  } = options;

  if (encrypt && !passphrase) {
    throw new Error('VIOLET_SOUL_KEY required for encrypted export');
  }

  const allMinds = loadVioletMinds();
  const selectedMinds = mindFilter
    ? allMinds.filter(m => mindFilter.includes(m.name.toLowerCase()))
    : allMinds;

  if (selectedMinds.length === 0) {
    throw new Error('No Minds selected for export');
  }

  const soulPackage = {
    ...createSoulPackageMetadata({ encrypted: encrypt }),
    minds: selectedMinds
  };

  const jsonContent = JSON.stringify(soulPackage, null, 2);

  if (!outputPath) {
    return encrypt
      ? multiLayerEncrypt(passphrase, LOCAL_SALT, jsonContent)
      : jsonContent;
  }

  if (encrypt) {
    const encrypted = multiLayerEncrypt(passphrase, LOCAL_SALT, jsonContent);
    fs.writeFileSync(outputPath, encrypted);
  } else {
    fs.writeFileSync(outputPath, jsonContent, 'utf-8');
  }

  return {
    success: true,
    path: outputPath,
    mindCount: selectedMinds.length,
    encrypted: encrypt,
    size: fs.statSync(outputPath).size
  };
}

function importSoulPackage(inputPath, options = {}) {
  const {
    decrypt = true,
    passphrase = process.env.VIOLET_SOUL_KEY,
    mindFilter = null,
    validate = true
  } = options;

  if (decrypt && !passphrase) {
    throw new Error('VIOLET_SOUL_KEY required for encrypted import');
  }

  const rawContent = fs.readFileSync(inputPath);

  let jsonContent;
  if (decrypt) {
    try {
      jsonContent = multiLayerDecrypt(passphrase, LOCAL_SALT, rawContent);
    } catch (err) {
      throw new Error(`Decryption failed: ${err.message}`);
    }
  } else {
    jsonContent = rawContent.toString('utf-8');
  }

  let soulPackage;
  try {
    soulPackage = JSON.parse(jsonContent);
  } catch (err) {
    throw new Error(`Invalid JSON in Soul Package: ${err.message}`);
  }

  if (validate) {
    validateSoulPackage(soulPackage);
  }

  const selectedMinds = mindFilter
    ? soulPackage.minds.filter(m => mindFilter.includes(m.name.toLowerCase()))
    : soulPackage.minds;

  return {
    success: true,
    version: soulPackage.version,
    violet_core_version: soulPackage.violet_core_version,
    created: soulPackage.created,
    metadata: soulPackage.metadata,
    minds: selectedMinds,
    totalMinds: soulPackage.minds.length,
    importedMinds: selectedMinds.length
  };
}

function validateSoulPackage(soulPackage) {
  if (!soulPackage.version) {
    throw new Error('Missing Soul Package version');
  }

  if (!soulPackage.minds || !Array.isArray(soulPackage.minds)) {
    throw new Error('Invalid or missing minds array');
  }

  if (soulPackage.minds.length === 0) {
    throw new Error('Soul Package contains no Minds');
  }

  for (const mind of soulPackage.minds) {
    if (!mind.name || !mind.symbol || !mind.role) {
      throw new Error(`Invalid Mind structure: ${JSON.stringify(mind).substring(0, 100)}`);
    }
  }

  return true;
}

function writeMindToFile(mind, outputDir) {
  const mindId = mind.name.toLowerCase();
  const fileName = `${mindId}.json`;
  const filePath = path.join(outputDir, fileName);

  fs.writeFileSync(filePath, JSON.stringify(mind, null, 2), 'utf-8');

  return filePath;
}

function importSoulPackageToDirectory(inputPath, outputDir, options = {}) {
  const importResult = importSoulPackage(inputPath, options);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const writtenFiles = [];
  for (const mind of importResult.minds) {
    const filePath = writeMindToFile(mind, outputDir);
    writtenFiles.push(filePath);
  }

  return {
    ...importResult,
    writtenFiles,
    outputDir
  };
}

module.exports = {
  exportSoulPackage,
  importSoulPackage,
  importSoulPackageToDirectory,
  validateSoulPackage,
  writeMindToFile,
  SOUL_PACKAGE_VERSION,
  VIOLET_CORE_VERSION
};
