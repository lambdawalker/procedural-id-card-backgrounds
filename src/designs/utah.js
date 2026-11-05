// Utah Procedural ID Card Background
const { generateDelicateArch, generateCanyonStrata } = require('../components/strata');
const { renderMountainRange } = require('../components/mountain');
const { generateWarpedGrid } = require('../components/warpedGrid');

function generateUtah({ width = 1000, height = 630, idPrefix = 'ut_1', rng }) {
  const defs = `
    <linearGradient id="${idPrefix}_sky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1e3a8a" />
      <stop offset="40%" stop-color="#60a5fa" />
      <stop offset="70%" stop-color="#fed7aa" />
      <stop offset="100%" stop-color="#ffedd5" />
    </linearGradient>
  `;

  const bg = `<rect width="${width}" height="${height}" fill="url(#${idPrefix}_sky)" />`;
  const wasatchPeaks = renderMountainRange({
    startX: 0,
    endX: width * 0.65,
    baseY: height * 0.52,
    peaks: [
      { x: width * 0.28, y: height * 0.32, snowDrop: 0.28 }
    ],
    mountainColor: '#475569',
    shadowColor: '#334155',
    snowColor: '#ffffff',
    ridgeColor: '#94a3b8',
    roughness: 0.5,
    idPrefix,
    rng
  });

  const canyonStrata = generateCanyonStrata({
    startX: 0,
    endX: width,
    startY: height * 0.5,
    endY: height - 20,
    numLayers: 14,
    strokeColor: '#c2410c',
    strokeWidth: 0.75,
    opacity: 0.28,
    rng
  });

  const archX = width * 0.68 + (rng.random() - 0.5) * 30;
  const delicateArch = generateDelicateArch({
    baseX: archX,
    baseY: height * 0.88,
    width: 175,
    height: 245,
    fillColor: '#9a3412',
    strokeColor: '#7c2d12',
    opacity: 0.45
  });

  const grid = generateWarpedGrid({
    width,
    height,
    numH: 22,
    numV: 32,
    warpField: 'hyperbolic',
    amplitude: 15,
    strokeColor: '#ea580c',
    opacity: 0.12,
    strokeWidth: 0.5,
    rng
  });

  return {
    defs,
    content: `${bg}\n${wasatchPeaks}\n${canyonStrata}\n${delicateArch}\n${grid}`
  };
}

module.exports = { generateUtah };
