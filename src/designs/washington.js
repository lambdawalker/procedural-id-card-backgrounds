// Washington Procedural ID Card Background
const { renderMountainRange } = require('../components/mountain');
const { generateConiferSilhouette } = require('../components/botanical');
const { generateWaveRibbonCluster } = require('../components/guilloche');
const { generateWarpedGrid } = require('../components/warpedGrid');

function generateWashington({ width = 1000, height = 630, idPrefix = 'wa_1', rng }) {
  const defs = `
    <linearGradient id="${idPrefix}_sky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0c4a6e" />
      <stop offset="45%" stop-color="#0284c7" />
      <stop offset="80%" stop-color="#bae6fd" />
      <stop offset="100%" stop-color="#f0f9ff" />
    </linearGradient>
  `;

  const bg = `<rect width="${width}" height="${height}" fill="url(#${idPrefix}_sky)" />`;
  const peakX = width * 0.52 + (rng.random() - 0.5) * 40;
  const rainier = renderMountainRange({
    startX: 0,
    endX: width,
    baseY: height * 0.65,
    peaks: [
      { x: peakX, y: height * 0.3, snowDrop: 0.45 }
    ],
    mountainColor: '#1e3a8a',
    shadowColor: '#172554',
    snowColor: '#ffffff',
    ridgeColor: '#e0f2fe',
    roughness: 0.48,
    idPrefix,
    rng
  });

  const trees = [];
  for (let i = 0; i < 11; i++) {
    const tx = width * 0.08 + (i / 10) * (width * 0.84) + (rng.random() - 0.5) * 15;
    const treeH = 40 + rng.random() * 25;
    trees.push(generateConiferSilhouette({
      x: tx,
      baseY: height * 0.66 + (rng.random() - 0.5) * 8,
      height: treeH,
      width: treeH * 0.42,
      fillColor: '#14532d',
      opacity: 0.4,
      tiers: 5
    }));
  }

  const marineWaves = [];
  for (let w = 0; w < 3; w++) {
    marineWaves.push(generateWaveRibbonCluster({
      startX: 0,
      endX: width,
      baseY: height * 0.76 + w * (height * 0.08),
      amplitude: 15 + w * 3,
      frequency: 0.007,
      numLines: 6,
      lineSpacing: 4.5,
      strokeColor: '#0284c7',
      strokeWidth: 0.7,
      opacity: 0.28 + w * 0.04,
      secondaryFreq: 0.016,
      secondaryAmp: 8
    }));
  }

  const grid = generateWarpedGrid({
    width,
    height,
    numH: 20,
    numV: 30,
    warpField: 'sine',
    amplitude: 15,
    strokeColor: '#0ea5e9',
    opacity: 0.12,
    strokeWidth: 0.5,
    rng
  });

  return {
    defs,
    content: `${bg}\n${rainier}\n${trees.join('\n')}\n${marineWaves.join('\n')}\n${grid}`
  };
}

module.exports = { generateWashington };
