// Alaska Procedural ID Card Background
// Inspired by Alaska DMV Polycarbonate REAL ID Specimen (https://dmv.alaska.gov/media/zcqpjpkz/newdl.png)
// Features Denali massif with derived snowcaps, Aurora Borealis vertical curtains,
// forget-me-not botanical engraving, and braided glacial river channels.

const { renderMountainRange } = require('../components/mountain');
const { generateWaveRibbonCluster, generateGuillocheRosette } = require('../components/guilloche');
const { generateWarpedGrid } = require('../components/warpedGrid');
const { generateFloralFlourish } = require('../components/botanical');
const { generateSecurityBorder, generateOVIMedallion, generateFineInkTexture } = require('../finishing');

function generateAlaska({ width = 1000, height = 630, idPrefix = 'ak_1', rng }) {
  const defs = `
    <linearGradient id="${idPrefix}_sky" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="38%" stop-color="#1e3a8a" />
      <stop offset="72%" stop-color="#bae6fd" />
      <stop offset="100%" stop-color="#f0fdf4" />
    </linearGradient>
    <linearGradient id="${idPrefix}_aurora_curtain" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.05" />
      <stop offset="30%" stop-color="#34d399" stop-opacity="0.28" />
      <stop offset="65%" stop-color="#38bdf8" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#818cf8" stop-opacity="0.05" />
    </linearGradient>
  `;

  // 1. Rainbow split-fountain arctic sky
  const bg = `<rect width="${width}" height="${height}" fill="url(#${idPrefix}_sky)" />`;

  // 2. Aurora Borealis vertical light curtains & undulating wave ribbons
  const auroraWaves = generateWaveRibbonCluster({
    startX: 0,
    endX: width,
    baseY: height * 0.20,
    amplitude: 38,
    frequency: 0.0052,
    numLines: 12,
    lineSpacing: 5,
    strokeColor: '#34d399',
    strokeWidth: 0.85,
    opacity: 0.34,
    secondaryFreq: 0.013,
    secondaryAmp: 12
  });

  const auroraSecondary = generateWaveRibbonCluster({
    startX: 0,
    endX: width,
    baseY: height * 0.28,
    amplitude: 26,
    frequency: 0.0065,
    numLines: 8,
    lineSpacing: 4.5,
    strokeColor: '#38bdf8',
    strokeWidth: 0.65,
    opacity: 0.28,
    secondaryFreq: 0.016,
    secondaryAmp: 9
  });

  // 3. Denali massif & Alaska Range with unified ridge geometry, snowcaps, and rock contours
  const peakX = width * 0.42 + (rng.random() - 0.5) * 45;
  const peakY = height * 0.34 + (rng.random() - 0.5) * 18;

  const mountains = renderMountainRange({
    startX: 0,
    endX: width,
    baseY: height * 0.76,
    peaks: [
      { x: peakX, y: peakY, snowDrop: 0.42 },
      { x: peakX + 275, y: peakY + 42, snowDrop: 0.36 },
      { x: peakX - 240, y: peakY + 65, snowDrop: 0.30 }
    ],
    mountainColor: '#1e293b',
    shadowColor: '#0f172a',
    snowColor: '#f8fafc',
    ridgeColor: '#93c5fd',
    roughness: 0.54,
    idPrefix,
    rng
  });

  // 4. Braided glacial meltwater river channels
  const glacialRiver = generateWaveRibbonCluster({
    startX: 0,
    endX: width,
    baseY: height * 0.85,
    amplitude: 16,
    frequency: 0.0075,
    numLines: 11,
    lineSpacing: 3.8,
    strokeColor: '#0284c7',
    strokeWidth: 0.7,
    opacity: 0.30,
    secondaryFreq: 0.018,
    secondaryAmp: 7
  });

  // 5. Forget-Me-Not (State Flower) 5-petal botanical engraving & security rosette
  const forgetMeNot = generateFloralFlourish({
    cx: width * 0.14,
    cy: height * 0.84,
    radius: 38,
    numPetals: 5,
    strokeColor: '#0284c7',
    strokeWidth: 0.8,
    opacity: 0.32
  });

  const oviMedallion = generateOVIMedallion({
    cx: width * 0.86,
    cy: height * 0.80,
    radius: 54,
    primaryColor: '#0284c7',
    accentColor: '#10b981',
    opacity: 0.25
  });

  // 6. Warped security grid & banknote border finishing
  const grid = generateWarpedGrid({
    width,
    height,
    numH: 20,
    numV: 30,
    warpField: 'sine',
    amplitude: 14,
    strokeColor: '#38bdf8',
    opacity: 0.12,
    strokeWidth: 0.5,
    rng
  });

  const inkTexture = generateFineInkTexture({
    width,
    height,
    strokeColor: '#bae6fd',
    opacity: 0.10,
    rng
  });

  const border = generateSecurityBorder({
    width,
    height,
    margin: 12,
    strokeColor: '#38bdf8',
    secondaryColor: '#34d399',
    opacity: 0.26
  });

  return {
    defs,
    content: `${bg}\n${auroraWaves}\n${auroraSecondary}\n${mountains}\n${glacialRiver}\n${forgetMeNot}\n${oviMedallion}\n${grid}\n${inkTexture}\n${border}`
  };
}

module.exports = { generateAlaska };
