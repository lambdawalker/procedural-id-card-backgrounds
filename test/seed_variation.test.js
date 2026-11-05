const assert = require('assert');
const crypto = require('crypto');
const { generateBackground, getSupportedStates } = require('../src/index');

console.log('Running Seed Variation Verification Test...');

function sha256(str) {
  return crypto.createHash('sha256').update(str).digest('hex');
}

const states = getSupportedStates();
for (const s of states) {
  const seeds = [42, 43, 44, 100];
  const hashes = new Set();

  for (const seed of seeds) {
    const render = generateBackground({ state: s.code, seed, width: 1000, height: 630 });
    const hash = sha256(render);
    hashes.add(hash);
  }

  assert.strictEqual(
    hashes.size,
    seeds.length,
    `State ${s.code} must produce distinct outputs across consecutive seeds [42, 43, 44, 100]`
  );
}

console.log(`PASS: Consecutive seeds produce distinct, meaningful variations across all ${states.length} states.`);
