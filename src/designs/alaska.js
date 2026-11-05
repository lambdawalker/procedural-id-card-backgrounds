// Alaska Procedural ID Card Background (Refined Pass 2)
const { renderMountainRange } = require('../components/mountain');
const { generateWaveRibbonCluster } = require('../components/guilloche');
const { generateWarpedGrid } = require('../components/warpedGrid');

function generateAlaska({ width = 1000, height = 630, idPrefix = 'ak_1', rng }) {
  const defs = `
    <linearGradient id="${idPrefix}_sky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="45%" stop-color="#1e3a8a" />
      <stop offset="85%" stop-color="#e0f2fe" />
      <stop offset="100%" stop-color="#f8fafc" />
    </linearGradient>
    <linearGradient id="${idPrefix}_aurora" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#059669" stop-opacity="0" />
      <stop offset="35%" stop-color="#10b981" stop-opacity="0.35" />
      <stop offset="70%" stop-color="#06b6d4" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#3b82f6" stop-opacity="0" />
    </linearGradient>
  `;

  const bg = `<rect width="${width}" height="${height}" fill="url(#${idPrefix}_sky)" />`;
  const auroraWaves = generateWaveRibbonCluster({
    startX: 0,
    endX: width,
    baseY: height * 0.22,
    amplitude: 36,
    frequency: 0.0052,
    numLines: 9,
    lineSpacing: 5.5,
    strokeColor: '#34d399',
    strokeWidth: 0.75,
    opacity: 0.32,
    secondaryFreq: 0.013,
    secondaryAmp: 11
  });

  const peakX = width * 0.42 + (rng.random() - 0.5) * 45;
  const peakY = height * 0.38 + (rng.random() - 0.5) * 20;

  const mountains = renderMountainRange({
    startX: 0,
    endX: width,
    baseY: height * 0.76,
    peaks: [
      { x: peakX, y: peakY, snowDrop: 0.38 },
      { x: peakX + 280, y: peakY + 45, snowDrop: 0.32 }
    ],
    mountainColor: '#1e293b',
    shadowColor: '#0f172a',
    snowColor: '#ffffff',
    ridgeColor: '#93c5fd',
    roughness: 0.52,
    idPrefix,
    rng
  });

  const glacialRiver = generateWaveRibbonCluster({
    startX: 0,
    endX: width,
    baseY: height * 0.86,
    amplitude: 16,
    frequency: 0.0075,
    numLines: 9,
    lineSpacing: 4.2,
    strokeColor: '#0284c7',
    strokeWidth: 0.65,
    opacity: 0.26,
    secondaryFreq: 0.018,
    secondaryAmp: 6
  });

  const grid = generateWarpedGrid({
    width,
    height,
    numH: 18,
    numV: 28,
    warpField: 'sine',
    amplitude: 14,
    strokeColor: '#38bdf8',
    opacity: 0.12,
    strokeWidth: 0.5,
    rng
  });

  return {
    defs,
    content: `${bg}\n${auroraWaves}\n${mountains}\n${glacialRiver}\n${grid}`
  };
}

module.exports = { generateAlaska };
