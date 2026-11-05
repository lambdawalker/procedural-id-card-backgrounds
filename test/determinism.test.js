const assert = require('assert');
const crypto = require('crypto');
const { generateBackground, getSupportedStates } = require('../src/index');

console.log('Running Determinism Verification Test...');

function sha256(str) {
  return crypto.createHash('sha256').update(str).digest('hex');
}

const states = getSupportedStates();
for (const s of states) {
  const render1 = generateBackground({ state: s.code, seed: 100, width: 1000, height: 630 });
  const render2 = generateBackground({ state: s.code, seed: 100, width: 1000, height: 630 });

  const hash1 = sha256(render1);
  const hash2 = sha256(render2);

  assert.strictEqual(render1, render2, `State ${s.code} must produce byte-identical SVG for identical seed`);
  assert.strictEqual(hash1, hash2, `State ${s.code} must produce identical SHA256 hash`);
}

console.log(`PASS: All ${states.length} states are 100% deterministic with identical seeds.`);
