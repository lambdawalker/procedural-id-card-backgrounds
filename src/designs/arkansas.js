// Arkansas Procedural ID Card Background
const { generateDiamondRosette } = require('../components/engraving');
const { generateWaveRibbonCluster } = require('../components/guilloche');
const { generateWarpedGrid } = require('../components/warpedGrid');

function generateArkansas({ width = 1000, height = 630, idPrefix = 'ar_1', rng }) {
  const defs = `
    <linearGradient id="${idPrefix}_bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ecfdf5" />
      <stop offset="50%" stop-color="#fefce8" />
      <stop offset="100%" stop-color="#f0fdf4" />
    </linearGradient>
  `;

  const bg = `<rect width="${width}" height="${height}" fill="url(#${idPrefix}_bg)" />`;
  const rosette = generateDiamondRosette({
    cx: width * 0.5,
    cy: height * 0.48,
    size: 160 + (rng.random() - 0.5) * 20,
    rings: 7,
    strokeColor: '#059669',
    strokeWidth: 0.65,
    opacity: 0.32
  });

  const ozarkHills = [];
  for (let t = 0; t < 3; t++) {
    const hillY = height * 0.55 + t * (height * 0.12);
    ozarkHills.push(generateWaveRibbonCluster({
      startX: 0,
      endX: width,
      baseY: hillY,
      amplitude: 22 - t * 4,
      frequency: 0.0035 + t * 0.001,
      numLines: 4,
      lineSpacing: 4,
      strokeColor: '#047857',
      strokeWidth: 0.6,
      opacity: 0.2 + t * 0.04
    }));
  }

  const river = generateWaveRibbonCluster({
    startX: 0,
    endX: width,
    baseY: height * 0.88,
    amplitude: 14,
    frequency: 0.006,
    numLines: 7,
    lineSpacing: 5,
    strokeColor: '#0284c7',
    strokeWidth: 0.7,
    opacity: 0.25
  });

  const grid = generateWarpedGrid({
    width,
    height,
    numH: 22,
    numV: 32,
    warpField: 'pinch',
    amplitude: 16,
    strokeColor: '#10b981',
    opacity: 0.13,
    strokeWidth: 0.5,
    rng
  });

  return {
    defs,
    content: `${bg}\n${rosette}\n${ozarkHills.join('\n')}\n${river}\n${grid}`
  };
}

module.exports = { generateArkansas };
