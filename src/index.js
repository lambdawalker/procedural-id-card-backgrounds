// Procedural ID Card Background Generator
// Generates reproducible, high-resolution SVG background artwork for 10 US states.

const { PRNG } = require('./rng');
const { generateAlaska } = require('./designs/alaska');
const { generateArkansas } = require('./designs/arkansas');
const { generateColorado } = require('./designs/colorado');
const { generateIdaho } = require('./designs/idaho');
const { generateIllinois } = require('./designs/illinois');
const { generateLouisiana } = require('./designs/louisiana');
const { generateTennessee } = require('./designs/tennessee');
const { generateUtah } = require('./designs/utah');
const { generateWashington } = require('./designs/washington');
const { generateWyoming } = require('./designs/wyoming');

const STATE_GENERATORS = {
  AK: { name: 'Alaska', fn: generateAlaska },
  AR: { name: 'Arkansas', fn: generateArkansas },
  CO: { name: 'Colorado', fn: generateColorado },
  ID: { name: 'Idaho', fn: generateIdaho },
  IL: { name: 'Illinois', fn: generateIllinois },
  LA: { name: 'Louisiana', fn: generateLouisiana },
  TN: { name: 'Tennessee', fn: generateTennessee },
  UT: { name: 'Utah', fn: generateUtah },
  WA: { name: 'Washington', fn: generateWashington },
  WY: { name: 'Wyoming', fn: generateWyoming }
};

function normalizeStateCode(code) {
  if (!code || typeof code !== 'string') return null;
  const upper = code.trim().toUpperCase();
  if (STATE_GENERATORS[upper]) return upper;

  for (const [key, val] of Object.entries(STATE_GENERATORS)) {
    if (val.name.toUpperCase() === upper) return key;
  }
  return null;
}

function getSupportedStates() {
  return Object.keys(STATE_GENERATORS).map(code => ({
    code,
    name: STATE_GENERATORS[code].name
  }));
}

function generateBackground(options = {}) {
  const stateCode = normalizeStateCode(options.state);
  if (!stateCode) {
    throw new Error(`Unsupported or invalid state: '${options.state}'. Supported states: ${Object.keys(STATE_GENERATORS).join(', ')}`);
  }

  const seed = options.seed !== undefined ? options.seed : 42;
  const width = options.width && options.width > 0 ? options.width : 1000;
  const height = options.height && options.height > 0 ? options.height : 630;
  const idPrefix = options.idPrefix || `${stateCode.toLowerCase()}_${String(seed).replace(/[^a-zA-Z0-9]/g, '_')}`;

  const rng = new PRNG(seed);
  const generator = STATE_GENERATORS[stateCode].fn;
  const { defs, content } = generator({ width, height, idPrefix, rng });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" data-state="${stateCode}" data-seed="${seed}">
  <defs>
${defs}
  </defs>
  <g id="${idPrefix}_layer">
${content}
  </g>
</svg>`;
}

module.exports = {
  generateBackground,
  getSupportedStates,
  normalizeStateCode,
  STATE_GENERATORS
};
