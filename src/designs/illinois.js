// Illinois Procedural ID Card Background
const { generateClassicalColumn } = require('../components/architecture');
const { generateWaveRibbonCluster } = require('../components/guilloche');
const { generateWarpedGrid } = require('../components/warpedGrid');

function generateIllinois({ width = 1000, height = 630, idPrefix = 'il_1', rng }) {
  const defs = `
    <linearGradient id="${idPrefix}_bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8fafc" />
      <stop offset="45%" stop-color="#f1f5f9" />
      <stop offset="100%" stop-color="#e2e8f0" />
    </linearGradient>
  `;

  const bg = `<rect width="${width}" height="${height}" fill="url(#${idPrefix}_bg)" />`;
  const col1 = generateClassicalColumn({
    x: 45,
    topY: 50,
    bottomY: height - 50,
    width: 55,
    numFlutes: 7,
    strokeColor: '#475569',
    strokeWidth: 0.75,
    opacity: 0.35,
    fillColor: '#cbd5e1'
  });

  const col2 = generateClassicalColumn({
    x: 125,
    topY: 70,
    bottomY: height - 70,
    width: 45,
    numFlutes: 5,
    strokeColor: '#64748b',
    strokeWidth: 0.65,
    opacity: 0.28,
    fillColor: '#e2e8f0'
  });

  const lakeWaves = generateWaveRibbonCluster({
    startX: width * 0.35,
    endX: width,
    baseY: height * 0.25,
    amplitude: 18,
    frequency: 0.008,
    numLines: 8,
    lineSpacing: 5,
    strokeColor: '#0284c7',
    strokeWidth: 0.65,
    opacity: 0.26
  });

  const prairieWaves = [];
  for (let p = 0; p < 4; p++) {
    prairieWaves.push(generateWaveRibbonCluster({
      startX: width * 0.2,
      endX: width,
      baseY: height * 0.55 + p * (height * 0.1),
      amplitude: 14 + p * 2,
      frequency: 0.004,
      numLines: 5,
      lineSpacing: 4.5,
      strokeColor: '#d97706',
      strokeWidth: 0.6,
      opacity: 0.2 + p * 0.03
    }));
  }

  const grid = generateWarpedGrid({
    width,
    height,
    numH: 22,
    numV: 32,
    warpField: 'sine',
    amplitude: 14,
    strokeColor: '#3b82f6',
    opacity: 0.12,
    strokeWidth: 0.5,
    rng
  });

  return {
    defs,
    content: `${bg}\n${lakeWaves}\n${prairieWaves.join('\n')}\n${col1}\n${col2}\n${grid}`
  };
}

module.exports = { generateIllinois };
