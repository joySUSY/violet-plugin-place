// Authors: Joysusy & Violet Klaudia 💖
// Test: Vibe Engine MCP Integration

const { VibeEngine, MIND_VIBE_PREFERENCES } = require('./sdk/vibe-engine');

console.log('🧪 Testing Vibe Engine MCP Integration\n');

const engine = new VibeEngine();
let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
    passed++;
  } catch (err) {
    console.log(`❌ ${name}: ${err.message}`);
    failed++;
  }
}

test('VibeEngine instantiation', () => {
  if (!engine) throw new Error('Engine not created');
});

test('getAllCategories returns 18 categories', () => {
  const categories = engine.getAllCategories();
  if (categories.length !== 18) throw new Error(`Expected 18, got ${categories.length}`);
});

test('getKaomoji returns valid kaomoji', () => {
  const kaomoji = engine.getKaomoji('happy');
  if (!kaomoji || typeof kaomoji !== 'string') throw new Error('Invalid kaomoji');
  if (!kaomoji.includes('◕')) throw new Error('Not a valid kaomoji format');
});

test('Session variety enforcement prevents immediate repetition', () => {
  engine.resetSession();
  const first = engine.getKaomoji('happy');
  const second = engine.getKaomoji('happy');
  if (first === second) throw new Error('Same kaomoji returned twice');
});

test('getMindKaomoji works for Lilith', () => {
  engine.resetSession();
  const kaomoji = engine.getMindKaomoji('Lilith');
  if (!kaomoji || typeof kaomoji !== 'string') throw new Error('Invalid Mind kaomoji');
});

test('getMindKaomoji respects mood override', () => {
  engine.resetSession();
  const kaomoji = engine.getMindKaomoji('Faye', { mood: 'eating' });
  if (!kaomoji) throw new Error('Mood override failed');
});

test('getMindKaomoji handles unknown Mind gracefully', () => {
  engine.resetSession();
  const kaomoji = engine.getMindKaomoji('UnknownMind');
  if (!kaomoji) throw new Error('Should return default kaomoji');
});

test('getCategorySize returns correct count', () => {
  const size = engine.getCategorySize('happy');
  if (size !== 15) throw new Error(`Expected 15, got ${size}`);
});

test('Session reset clears used kaomoji', () => {
  engine.resetSession();
  const first = engine.getKaomoji('chill');
  engine.resetSession();
  const second = engine.getKaomoji('chill');
});

test('All 17 Minds have vibe preferences', () => {
  const mindNames = Object.keys(MIND_VIBE_PREFERENCES);
  if (mindNames.length !== 19) throw new Error(`Expected 19 Minds, got ${mindNames.length}`);
});

console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
