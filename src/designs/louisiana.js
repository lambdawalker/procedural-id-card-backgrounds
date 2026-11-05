// Louisiana Procedural ID Card Background
const { generateBalconyFiligree } = require('../components/filigree');
const { generateWaveRibbonCluster } = require('../components/guilloche');
const { generateWarpedGrid } = require('../components/warpedGrid');

function generateLouisiana({ width = 1000, height = 630, idPrefix = 'la_1', rng }) {
  const defs = `
    <linearGradient id="${idPrefix}_bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="50%" stop-color="#1e293b" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
  `;

  const bg = `<rect width="${width}" height="${height}" fill="url(#${idPrefix}_bg)" />`;
  const topFiligree = generateBalconyFiligree({
    x: 40,
    y: 30,
    width: width - 80,
    height: 75,
    strokeColor: '#eab308',
    strokeWidth: 0.75,
    opacity: 0.35
  });

  const waterways = [];
  for (let w = 0; w < 4; w++) {
    waterways.push(generateWaveRibbonCluster({
      startX: 0,
      endX: width,
      baseY: height * 0.38 + w * (height * 0.14),
      amplitude: 28 + w * 4,
      frequency: 0.004,
      numLines: 6,
      lineSpacing: 5,
      strokeColor: '#0ea5e9',
      strokeWidth: 0.65,
      opacity: 0.24 + w * 0.03,
      secondaryFreq: 0.01,
      secondaryAmp: 10
    }));
  }

  const rippleElements = [];
  const rx = width * 0.82;
  const ry = height * 0.8;
  for (let r = 1; r <= 8; r++) {
    rippleElements.push(`<circle cx="${rx}" cy="${ry}" r="${r * 18}" fill="none" stroke="#22c55e" stroke-width="0.6" stroke-opacity="0.2" />`);
  }

  const grid = generateWarpedGrid({
    width,
    height,
    numH: 22,
    numV: 32,
    warpField: 'sine',
    amplitude: 16,
    strokeColor: '#ca8a04',
    opacity: 0.12,
    strokeWidth: 0.5,
    rng
  });

  return {
    defs,
    content: `${bg}\n${topFiligree}\n${waterways.join('\n')}\n${rippleElements.join('\n')}\n${grid}`
  };
}

module.exports = { generateLouisiana };
