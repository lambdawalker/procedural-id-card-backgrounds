// Idaho Procedural ID Card Background
const { renderMountainRange } = require('../components/mountain');
const { generateConiferSilhouette } = require('../components/botanical');
const { generateWaveRibbonCluster } = require('../components/guilloche');
const { generateWarpedGrid } = require('../components/warpedGrid');

function generateIdaho({ width = 1000, height = 630, idPrefix = 'id_1', rng }) {
  const defs = `
    <linearGradient id="${idPrefix}_sky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#bae6fd" />
      <stop offset="50%" stop-color="#e0f2fe" />
      <stop offset="100%" stop-color="#fef3c7" />
    </linearGradient>
  `;

  const bg = `<rect width="${width}" height="${height}" fill="url(#${idPrefix}_sky)" />`;
  const sawtooth = renderMountainRange({
    startX: 0,
    endX: width,
    baseY: height * 0.58,
    peaks: [
      { x: width * 0.35 + (rng.random() - 0.5) * 40, y: height * 0.32, snowDrop: 0.35 },
      { x: width * 0.72 + (rng.random() - 0.5) * 40, y: height * 0.36, snowDrop: 0.3 }
    ],
    mountainColor: '#334155',
    shadowColor: '#1e293b',
    snowColor: '#ffffff',
    ridgeColor: '#cbd5e1',
    roughness: 0.65,
    idPrefix,
    rng
  });

  const conifers = [];
  for (let i = 0; i < 9; i++) {
    const tx = width * 0.1 + (i / 8) * (width * 0.8) + (rng.random() - 0.5) * 20;
    const treeH = 35 + rng.random() * 25;
    conifers.push(generateConiferSilhouette({
      x: tx,
      baseY: height * 0.6 + (rng.random() - 0.5) * 10,
      height: treeH,
      width: treeH * 0.4,
      fillColor: '#166534',
      opacity: 0.35,
      tiers: 4
    }));
  }

  const furrows = [];
  for (let f = 0; f < 3; f++) {
    furrows.push(generateWaveRibbonCluster({
      startX: 0,
      endX: width,
      baseY: height * 0.68 + f * (height * 0.09),
      amplitude: 10 + f * 3,
      frequency: 0.005,
      numLines: 5,
      lineSpacing: 4,
      strokeColor: '#65a30d',
      strokeWidth: 0.6,
      opacity: 0.22 + f * 0.03
    }));
  }

  const grid = generateWarpedGrid({
    width,
    height,
    numH: 20,
    numV: 30,
    warpField: 'hyperbolic',
    amplitude: 15,
    strokeColor: '#0284c7',
    opacity: 0.12,
    strokeWidth: 0.5,
    rng
  });

  return {
    defs,
    content: `${bg}\n${sawtooth}\n${conifers.join('\n')}\n${furrows.join('\n')}\n${grid}`
  };
}

module.exports = { generateIdaho };
