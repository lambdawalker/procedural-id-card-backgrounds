// Arkansas Procedural ID Card Background
// Inspired by Arkansas DFA REAL ID Specimen (https://www.dfa.arkansas.gov/wp-content/uploads/AR-Real-ID-Web-Banner-2048x819-2.jpg)
// Features Crater of Diamonds multi-ring faceted diamond guilloche, Ozark highlands,
// loblolly pine botanical silhouettes, and Arkansas River basin curves.

const { generateDiamondRosette } = require('../components/engraving');
const { generateWaveRibbonCluster, generateGuillocheRosette } = require('../components/guilloche');
const { generateConiferSilhouette, generateFloralFlourish } = require('../components/botanical');
const { generateWarpedGrid } = require('../components/warpedGrid');
const { generateSecurityBorder, generateOVIMedallion, generateFineInkTexture } = require('../finishing');

function generateArkansas({ width = 1000, height = 630, idPrefix = 'ar_1', rng }) {
  const defs = `
    <linearGradient id="${idPrefix}_bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ecfdf5" />
      <stop offset="45%" stop-color="#fefce8" />
      <stop offset="100%" stop-color="#e0f2fe" />
    </linearGradient>
  `;

  const bg = `<rect width="${width}" height="${height}" fill="url(#${idPrefix}_bg)" />`;

  // 1. Primary & Secondary Diamond Guilloche Rosettes (Natural State Diamond Heritage)
  const mainRosette = generateDiamondRosette({
    cx: width * 0.50,
    cy: height * 0.45,
    size: 175 + (rng.random() - 0.5) * 20,
    rings: 9,
    strokeColor: '#059669',
    strokeWidth: 0.65,
    opacity: 0.30
  });

  const innerGuilloche = generateGuillocheRosette({
    cx: width * 0.50,
    cy: height * 0.45,
    R: 115,
    r: 28,
    p: 24,
    cycles: 14,
    steps: 600,
    strokeColor: '#d97706',
    strokeWidth: 0.5,
    opacity: 0.22
  });

  // 2. Rolling Ozark & Ouachita Highland Contours
  const ozarkHills = [];
  for (let t = 0; t < 4; t++) {
    const hillY = height * 0.50 + t * (height * 0.09);
    ozarkHills.push(generateWaveRibbonCluster({
      startX: 0,
      endX: width,
      baseY: hillY,
      amplitude: 24 - t * 3,
      frequency: 0.0038 + t * 0.0009,
      numLines: 5,
      lineSpacing: 3.8,
      strokeColor: '#047857',
      strokeWidth: 0.6,
      opacity: 0.19 + t * 0.03
    }));
  }

  // 3. Loblolly Pine (State Tree) silhouettes & Apple Blossom (State Flower) engraving
  const pines = [];
  for (let i = 0; i < 7; i++) {
    const px = width * 0.12 + i * (width * 0.12) + (rng.random() - 0.5) * 18;
    const ph = 36 + rng.random() * 20;
    pines.push(generateConiferSilhouette({
      x: px,
      baseY: height * 0.78 + (rng.random() - 0.5) * 8,
      height: ph,
      width: ph * 0.42,
      fillColor: '#065f46',
      opacity: 0.28,
      tiers: 4
    }));
  }

  const appleBlossom = generateFloralFlourish({
    cx: width * 0.14,
    cy: height * 0.22,
    radius: 36,
    numPetals: 5,
    strokeColor: '#d97706',
    strokeWidth: 0.75,
    opacity: 0.30
  });

  // 4. Arkansas River Basin hydraulic curves
  const river = generateWaveRibbonCluster({
    startX: 0,
    endX: width,
    baseY: height * 0.88,
    amplitude: 15,
    frequency: 0.0062,
    numLines: 9,
    lineSpacing: 4.2,
    strokeColor: '#0284c7',
    strokeWidth: 0.65,
    opacity: 0.26
  });

  // 5. OVI Medallion, Warped Grid, and Security Border
  const oviMedallion = generateOVIMedallion({
    cx: width * 0.85,
    cy: height * 0.78,
    radius: 52,
    primaryColor: '#059669',
    accentColor: '#d97706',
    opacity: 0.24
  });

  const grid = generateWarpedGrid({
    width,
    height,
    numH: 22,
    numV: 32,
    warpField: 'pinch',
    amplitude: 16,
    strokeColor: '#10b981',
    opacity: 0.12,
    strokeWidth: 0.5,
    rng
  });

  const inkTexture = generateFineInkTexture({
    width,
    height,
    strokeColor: '#065f46',
    opacity: 0.08,
    rng
  });

  const border = generateSecurityBorder({
    width,
    height,
    margin: 12,
    strokeColor: '#059669',
    secondaryColor: '#d97706',
    opacity: 0.25
  });

  return {
    defs,
    content: `${bg}\n${mainRosette}\n${innerGuilloche}\n${ozarkHills.join('\n')}\n${pines.join('\n')}\n${appleBlossom}\n${river}\n${oviMedallion}\n${grid}\n${inkTexture}\n${border}`
  };
}

module.exports = { generateArkansas };
