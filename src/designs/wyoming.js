// Wyoming Procedural ID Card Background
const { renderMountainRange } = require('../components/mountain');
const { generateWindStreamlines } = require('../components/engraving');
const { generateWarpedGrid } = require('../components/warpedGrid');

function generateWyoming({ width = 1000, height = 630, idPrefix = 'wy_1', rng }) {
  const defs = `
    <linearGradient id="${idPrefix}_sky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1e3a8a" />
      <stop offset="45%" stop-color="#3b82f6" />
      <stop offset="80%" stop-color="#fed7aa" />
      <stop offset="100%" stop-color="#fef3c7" />
    </linearGradient>
  `;

  const bg = `<rect width="${width}" height="${height}" fill="url(#${idPrefix}_sky)" />`;
  const windStreamlines = generateWindStreamlines({
    startX: 0,
    endX: width,
    startY: height * 0.15,
    endY: height * 0.42,
    numStreams: 12,
    strokeColor: '#fbbf24',
    strokeWidth: 0.6,
    opacity: 0.26,
    rng
  });

  const tetonPeaks = renderMountainRange({
    startX: 0,
    endX: width,
    baseY: height * 0.68,
    peaks: [
      { x: width * 0.38, y: height * 0.28, snowDrop: 0.42 },
      { x: width * 0.58, y: height * 0.33, snowDrop: 0.38 },
      { x: width * 0.76, y: height * 0.38, snowDrop: 0.32 }
    ],
    mountainColor: '#334155',
    shadowColor: '#1e293b',
    snowColor: '#ffffff',
    ridgeColor: '#cbd5e1',
    roughness: 0.68,
    idPrefix,
    rng
  });

  const flourishLeft = `
    <path d="M 25 25 C 75 25, 120 40, 140 85 C 150 110, 140 135, 115 135 C 95 135, 95 110, 115 100" fill="none" stroke="#b45309" stroke-width="0.8" stroke-opacity="0.35" />
    <path d="M 35 35 C 75 35, 105 50, 120 85" fill="none" stroke="#b45309" stroke-width="0.5" stroke-opacity="0.3" />
  `;

  const flourishRight = `
    <path d="M ${width - 25} 25 C ${width - 75} 25, ${width - 120} 40, ${width - 140} 85 C ${width - 150} 110, ${width - 140} 135, ${width - 115} 135 C ${width - 95} 135, ${width - 95} 110, ${width - 115} 100" fill="none" stroke="#b45309" stroke-width="0.8" stroke-opacity="0.35" />
    <path d="M ${width - 35} 35 C ${width - 75} 35, ${width - 105} 50, ${width - 120} 85" fill="none" stroke="#b45309" stroke-width="0.5" stroke-opacity="0.3" />
  `;

  const grid = generateWarpedGrid({
    width,
    height,
    numH: 22,
    numV: 32,
    warpField: 'sine',
    amplitude: 15,
    strokeColor: '#d97706',
    opacity: 0.12,
    strokeWidth: 0.5,
    rng
  });

  return {
    defs,
    content: `${bg}\n${windStreamlines}\n${tetonPeaks}\n${flourishLeft}\n${flourishRight}\n${grid}`
  };
}

module.exports = { generateWyoming };
