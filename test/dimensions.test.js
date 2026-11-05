const assert = require('assert');
const { generateBackground, getSupportedStates } = require('../src/index');

console.log('Running Dimensions, Batch, and Error Handling Test...');

const dimensionSets = [
  { width: 1012, height: 638 },
  { width: 856, height: 540 },
  { width: 2024, height: 1276 },
  { width: 600, height: 600 }
];

for (const dims of dimensionSets) {
  const svg = generateBackground({ state: 'CO', seed: 42, width: dims.width, height: dims.height });
  assert(svg.includes(`width="${dims.width}"`), `SVG must include width="${dims.width}"`);
  assert(svg.includes(`height="${dims.height}"`), `SVG must include height="${dims.height}"`);
  assert(svg.includes(`viewBox="0 0 ${dims.width} ${dims.height}"`), `SVG must include viewBox matching dimensions`);
}

assert.throws(() => {
  generateBackground({ state: 'XYZ', seed: 42 });
}, /Unsupported or invalid state/, 'Should throw descriptive error for invalid state');

assert.throws(() => {
  generateBackground({ state: null });
}, /Unsupported or invalid state/, 'Should throw descriptive error for null state');

console.log('PASS: Dimensions, viewBox scaling, and invalid input validation verified.');
