// Tennessee Procedural ID Card Background
const { generateFloralFlourish } = require('../components/botanical');
const { generateWaveRibbonCluster } = require('../components/guilloche');
const { generateWarpedGrid } = require('../components/warpedGrid');

function generateTennessee({ width = 1000, height = 630, idPrefix = 'tn_1', rng }) {
  const defs = `
    <linearGradient id="${idPrefix}_bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#312e81" />
      <stop offset="45%" stop-color="#4338ca" />
      <stop offset="75%" stop-color="#818cf8" />
      <stop offset="100%" stop-color="#e0e7ff" />
    </linearGradient>
  `;

  const bg = `<rect width="${width}" height="${height}" fill="url(#${idPrefix}_bg)" />`;
  const smokyRidges = [];
  for (let r = 0; r < 4; r++) {
    smokyRidges.push(generateWaveRibbonCluster({
      startX: 0,
      endX: width,
      baseY: height * 0.45 + r * (height * 0.1),
      amplitude: 22 - r * 3,
      frequency: 0.0035 + r * 0.0008,
      numLines: 6,
      lineSpacing: 4.5,
      strokeColor: '#c7d2fe',
      strokeWidth: 0.7,
      opacity: 0.22 + r * 0.08,
      secondaryFreq: 0.008,
      secondaryAmp: 7
    }));
  }

  const musicStaff = generateWaveRibbonCluster({
    startX: 0,
    endX: width,
    baseY: height * 0.32,
    amplitude: 18,
    frequency: 0.006,
    numLines: 5,
    lineSpacing: 6,
    strokeColor: '#fbbf24',
    strokeWidth: 0.8,
    opacity: 0.38,
    secondaryFreq: 0.014,
    secondaryAmp: 8
  });

  const flower1 = generateFloralFlourish({
    cx: 90,
    cy: height - 80,
    radius: 40,
    numPetals: 4,
    strokeColor: '#f472b6',
    strokeWidth: 0.75,
    opacity: 0.35
  });

  const flower2 = generateFloralFlourish({
    cx: width - 90,
    cy: height - 80,
    radius: 40,
    numPetals: 4,
    strokeColor: '#f472b6',
    strokeWidth: 0.75,
    opacity: 0.35
  });

  const grid = generateWarpedGrid({
    width,
    height,
    numH: 20,
    numV: 30,
    warpField: 'sine',
    amplitude: 14,
    strokeColor: '#818cf8',
    opacity: 0.12,
    strokeWidth: 0.5,
    rng
  });

  return {
    defs,
    content: `${bg}\n${smokyRidges.join('\n')}\n${musicStaff}\n${flower1}\n${flower2}\n${grid}`
  };
}

module.exports = { generateTennessee };
