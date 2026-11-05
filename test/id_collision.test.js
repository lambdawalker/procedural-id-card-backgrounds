const assert = require('assert');
const { generateBackground, getSupportedStates } = require('../src/index');

console.log('Running SVG Definition ID Collision Test...');

const states = getSupportedStates();
const idOccurrences = {};

for (const s of states) {
  const svg = generateBackground({ state: s.code, seed: 42 });
  const idMatches = svg.matchAll(/id=["']([^"']+)["']/g);

  for (const match of idMatches) {
    const id = match[1];
    if (idOccurrences[id]) {
      idOccurrences[id].push(s.code);
    } else {
      idOccurrences[id] = [s.code];
    }
  }
}

let collisions = 0;
for (const [id, stateList] of Object.entries(idOccurrences)) {
  if (stateList.length > 1) {
    console.error(`ID Collision detected: '${id}' in states: ${stateList.join(', ')}`);
    collisions++;
  }
}

assert.strictEqual(collisions, 0, 'No SVG definition IDs must collide across different states');
console.log(`PASS: Checked ${Object.keys(idOccurrences).length} unique SVG definition IDs. Zero collisions detected.`);
