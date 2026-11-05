// Illinois Procedural ID Card Background
// Inspired by Illinois SOS REAL ID Specimen (https://s7d1.scene7.com/is/image/isp/services_sos_id?ts=1626825328171)
// Features neoclassical civic architecture (fluted columns & State Capitol dome rotunda),
// Lake Michigan wave guilloche, rolling golden prairie, and violet floral engraving.

const { generateClassicalColumn } = require('../components/architecture');
const { generateWaveRibbonCluster, generateRadialFan } = require('../components/guilloche');
const { generateFloralFlourish } = require('../components/botanical');
const { generateWarpedGrid } = require('../components/warpedGrid');
const { generateSecurityBorder, generateOVIMedallion, generateFineInkTexture } = require('../finishing');

function generateIllinois({ width = 1000, height = 630, idPrefix = 'il_1', rng }) {
  const defs = `
    <linearGradient id="${idPrefix}_bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8fafc" />
      <stop offset="45%" stop-color="#e0f2fe" />
      <stop offset="100%" stop-color="#fef3c7" />
    </linearGradient>
  `;

  const bg = `<rect width="${width}" height="${height}" fill="url(#${idPrefix}_bg)" />`;

  // 1. Neoclassical Fluted Civic Columns on left margin
  const col1 = generateClassicalColumn({
    x: 42,
    topY: 48,
    bottomY: height - 48,
    width: 56,
    numFlutes: 7,
    strokeColor: '#334155',
    strokeWidth: 0.75,
    opacity: 0.36,
    fillColor: '#cbd5e1'
  });

  const col2 = generateClassicalColumn({
    x: 120,
    topY: 68,
    bottomY: height - 68,
    width: 46,
    numFlutes: 5,
    strokeColor: '#475569',
    strokeWidth: 0.65,
    opacity: 0.28,
    fillColor: '#e2e8f0'
  });

  // 2. Engraved State Capitol Dome & Rotunda Archway in center-right background
  const domeCx = width * 0.60;
  const domeBaseY = height * 0.52;
  const domeRadius = 110;
  const capitolDome = `
    <path d="M ${domeCx - domeRadius} ${domeBaseY} A ${domeRadius} ${domeRadius * 1.15} 0 0 1 ${domeCx + domeRadius} ${domeBaseY} Z" fill="#cbd5e1" fill-opacity="0.22" stroke="#475569" stroke-width="0.8" stroke-opacity="0.35" />
    <rect x="${domeCx - domeRadius * 1.12}" y="${domeBaseY}" width="${domeRadius * 2.24}" height="28" fill="#cbd5e1" fill-opacity="0.18" stroke="#475569" stroke-width="0.7" stroke-opacity="0.32" />
    <line x1="${domeCx}" y1="${domeBaseY - domeRadius * 1.15}" x2="${domeCx}" y2="${domeBaseY - domeRadius * 1.42}" stroke="#475569" stroke-width="1.1" stroke-opacity="0.4" />
  `;

  const domeRibs = generateRadialFan({
    cx: domeCx,
    cy: domeBaseY,
    innerRadius: 20,
    outerRadius: domeRadius,
    numRays: 24,
    strokeColor: '#475569',
    strokeWidth: 0.5,
    opacity: 0.18,
    waveModulation: 4
  });

  // 3. Lake Michigan water wave ribbons in upper right
  const lakeWaves = generateWaveRibbonCluster({
    startX: width * 0.30,
    endX: width,
    baseY: height * 0.22,
    amplitude: 18,
    frequency: 0.008,
    numLines: 9,
    lineSpacing: 4.8,
    strokeColor: '#0284c7',
    strokeWidth: 0.65,
    opacity: 0.28
  });

  // 4. Rolling Golden Prairie Horizon waves across lower half
  const prairieWaves = [];
  for (let p = 0; p < 4; p++) {
    prairieWaves.push(generateWaveRibbonCluster({
      startX: width * 0.18,
      endX: width,
      baseY: height * 0.56 + p * (height * 0.095),
      amplitude: 14 + p * 2,
      frequency: 0.0042,
      numLines: 6,
      lineSpacing: 4.2,
      strokeColor: '#d97706',
      strokeWidth: 0.6,
      opacity: 0.22 + p * 0.03
    }));
  }

  // 5. Purple Violet (State Flower) engraving & OVI Medallion
  const violetFlower = generateFloralFlourish({
    cx: width * 0.26,
    cy: height * 0.82,
    radius: 35,
    numPetals: 5,
    strokeColor: '#6366f1',
    strokeWidth: 0.75,
    opacity: 0.32
  });

  const oviMedallion = generateOVIMedallion({
    cx: width * 0.86,
    cy: height * 0.80,
    radius: 52,
    primaryColor: '#0284c7',
    accentColor: '#d97706',
    opacity: 0.24
  });

  // 6. Warped security grid & banknote border
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

  const inkTexture = generateFineInkTexture({
    width,
    height,
    strokeColor: '#334155',
    opacity: 0.08,
    rng
  });

  const border = generateSecurityBorder({
    width,
    height,
    margin: 12,
    strokeColor: '#0284c7',
    secondaryColor: '#d97706',
    opacity: 0.25
  });

  return {
    defs,
    content: `${bg}\n${capitolDome}\n${domeRibs}\n${lakeWaves}\n${prairieWaves.join('\n')}\n${col1}\n${col2}\n${violetFlower}\n${oviMedallion}\n${grid}\n${inkTexture}\n${border}`
  };
}

module.exports = { generateIllinois };
