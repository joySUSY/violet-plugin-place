const fs = require('fs');
const path = require('path');

const mindsDir = 'plugins/marketplaces/violet-plugin-place/plugins/violet-core/data/minds';
const files = fs.readdirSync(mindsDir).filter(f => f.endsWith('.json') && f !== 'minds-index.json').sort();

console.log('✨ Validating', files.length, 'Mind definitions...\n');

let allValid = true;
files.forEach(file => {
  try {
    const content = fs.readFileSync(path.join(mindsDir, file), 'utf8');
    const mind = JSON.parse(content);

    const required = ['name', 'version', 'role', 'traits'];
    const missing = required.filter(field => !mind[field]);

    if (missing.length > 0) {
      console.log('❌', file, '- Missing:', missing.join(', '));
      allValid = false;
    } else {
      const symbol = mind.symbol || '(no symbol)';
      console.log('✓', mind.name.padEnd(10), symbol, '—', mind.role.substring(0, 50));
    }
  } catch (err) {
    console.log('❌', file, '- Error:', err.message);
    allValid = false;
  }
});

console.log('\n' + (allValid ? '✅ All Mind definitions are valid!' : '⚠️ Some issues found'));
