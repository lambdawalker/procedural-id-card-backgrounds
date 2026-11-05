// Colorado Procedural ID Card Background
const { renderMountainRange } = require('../components/mountain');
const { generateRadialFan } = require('../components/guilloche');
const { generateWarpedGrid } = require('../components/warpedGrid');

function generateColorado({ width = 1000, height = 630, idPrefix = 'co_1', rng }) {
  const defs = `
    <linearGradient id="${idPrefix}_sky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1e3a8a" />
      <stop offset="40%" stop-color="#38bdf8" />
      <stop offset="70%" stop-color="#fed7aa" />
      <stop offset="100%" stop-color="#ffedd5" />
    </linearGradient>
  `;

  const bg = `<rect width="${width}" height="${height}" fill="url(#${idPrefix}_sky)" />`;
  const sunrise = generateRadialFan({
    cx: width * 0.48,
    cy: height * 0.38,
    innerRadius: 25,
    outerRadius: width * 0.42,
    numRays: 48,
    strokeColor: '#f59e0b',
    strokeWidth: 0.65,
    opacity: 0.28,
    waveModulation: 8
  });

  const distantMountains = renderMountainRange({
    startX: 0,
    endX: width,
    baseY: height * 0.65,
    peaks: [
      { x: width * 0.25, y: height * 0.32, snowDrop: 0.35 },
      { x: width * 0.65, y: height * 0.34, snowDrop: 0.3 }
    ],
    mountainColor: '#64748b',
    shadowColor: '#475569',
    snowColor: '#ffffff',
    ridgeColor: '#cbd5e1',
    roughness: 0.45,
    idPrefix: `${idPrefix}_dist`,
    rng
  });

  const foreMountains = renderMountainRange({
    startX: 0,
    endX: width,
    baseY: height * 0.8,
    peaks: [
      { x: width * 0.48, y: height * 0.42, snowDrop: 0.4 },
      { x: width * 0.82, y: height * 0.46, snowDrop: 0.35 }
    ],
    mountainColor: '#1e293b',
    shadowColor: '#0f172a',
    snowColor: '#ffffff',
    ridgeColor: '#e2e8f0',
    roughness: 0.6,
    idPrefix: `${idPrefix}_fore`,
    rng
  });

  const grid = generateWarpedGrid({
    width,
    height,
    numH: 20,
    numV: 30,
    warpField: 'sine',
    amplitude: 15,
    strokeColor: '#0284c7',
    opacity: 0.12,
    strokeWidth: 0.5,
    rng
  });

  return {
    defs,
    content: `${bg}\n${sunrise}\n${distantMountains}\n${foreMountains}\n${grid}`
  };
}

module.exports = { generateColorado };
