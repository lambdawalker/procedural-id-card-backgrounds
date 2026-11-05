// Washington Procedural ID Card Background
// Inspired by Washington DOL Enhanced Driver License Specimen (https://dol.wa.gov/media/77)
// Features Mount Rainier volcanic cone with coupled glacier snowcaps, western hemlock conifers,
// coast rhododendron engraving, and Puget Sound maritime wave guilloche.

const { renderMountainRange } = require('../components/mountain');
const { generateConiferSilhouette, generateFloralFlourish } = require('../components/botanical');
const { generateWaveRibbonCluster } = require('../components/guilloche');
const { generateWarpedGrid } = require('../components/warpedGrid');
const { generateSecurityBorder, generateOVIMedallion, generateFineInkTexture } = require('../finishing');

function generateWashington({ width = 1000, height = 630, idPrefix = 'wa_1', rng }) {
  const defs = `
    <linearGradient id="${idPrefix}_sky" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#bae6fd" />
      <stop offset="48%" stop-color="#e0f2fe" />
      <stop offset="100%" stop-color="#dcfce7" />
    </linearGradient>
  `;

  // 1. Pacific Northwest marine sky & emerald mist base
  const bg = `<rect width="${width}" height="${height}" fill="url(#${idPrefix}_sky)" />`;

  // 2. Mount Rainier volcanic massif & Cascade foothills with coupled glacier snowcaps
  const peakX = width * 0.54 + (rng.random() - 0.5) * 35;
  const rainier = renderMountainRange({
    startX: 0,
    endX: width,
    baseY: height * 0.65,
    peaks: [
      { x: peakX, y: height * 0.28, snowDrop: 0.46 },
      { x: width * 0.22, y: height * 0.42, snowDrop: 0.32 }
    ],
    mountainColor: '#1e3a8a',
    shadowColor: '#172554',
    snowColor: '#ffffff',
    ridgeColor: '#bae6fd',
    roughness: 0.46,
    idPrefix,
    rng
  });

  // 3. Staggered coastal evergreen conifers (Western Hemlock - State Tree)
  const trees = [];
  for (let i = 0; i < 12; i++) {
    const tx = width * 0.06 + (i / 11) * (width * 0.88) + (rng.random() - 0.5) * 14;
    const treeH = 42 + rng.random() * 24;
    trees.push(generateConiferSilhouette({
      x: tx,
      baseY: height * 0.66 + (rng.random() - 0.5) * 8,
      height: treeH,
      width: treeH * 0.42,
      fillColor: '#14532d',
      opacity: 0.42,
      tiers: 5
    }));
  }

  // 4. Puget Sound maritime wave guilloche ribbons in foreground
  const marineWaves = [];
  for (let w = 0; w < 3; w++) {
    marineWaves.push(generateWaveRibbonCluster({
      startX: 0,
      endX: width,
      baseY: height * 0.74 + w * (height * 0.08),
      amplitude: 15 + w * 3,
      frequency: 0.0068,
      numLines: 7,
      lineSpacing: 4.2,
      strokeColor: '#0284c7',
      strokeWidth: 0.7,
      opacity: 0.26 + w * 0.04,
      secondaryFreq: 0.016,
      secondaryAmp: 7
    }));
  }

  // 5. Coast Rhododendron (State Flower) engraving & OVI Medallion
  const rhododendron = generateFloralFlourish({
    cx: width * 0.14,
    cy: height * 0.20,
    radius: 38,
    numPetals: 6,
    strokeColor: '#15803d',
    strokeWidth: 0.75,
    opacity: 0.32
  });

  const oviMedallion = generateOVIMedallion({
    cx: width * 0.86,
    cy: height * 0.80,
    radius: 52,
    primaryColor: '#14532d',
    accentColor: '#0284c7',
    opacity: 0.24
  });

  // 6. Warped security grid & banknote border
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

  const inkTexture = generateFineInkTexture({
    width,
    height,
    strokeColor: '#14532d',
    opacity: 0.08,
    rng
  });

  const border = generateSecurityBorder({
    width,
    height,
    margin: 12,
    strokeColor: '#14532d',
    secondaryColor: '#0284c7',
    opacity: 0.26
  });

  return {
    defs,
    content: `${bg}\n${rainier}\n${trees.join('\n')}\n${marineWaves.join('\n')}\n${rhododendron}\n${oviMedallion}\n${grid}\n${inkTexture}\n${border}`
  };
}

module.exports = { generateWashington };
