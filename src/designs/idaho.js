// Idaho Procedural ID Card Background
// Inspired by Idaho ITD Star Card REAL ID Specimen (https://itd.idaho.gov/wp-content/uploads/2025/08/Star-Card-featured-image-1020x680.jpg)
// Features Sawtooth Mountain Range with coupled snowcaps, western white pine forest,
// syringa state flower engraving, and Snake River Plain agricultural furrows.

const { renderMountainRange } = require('../components/mountain');
const { generateConiferSilhouette, generateFloralFlourish } = require('../components/botanical');
const { generateWaveRibbonCluster } = require('../components/guilloche');
const { generateWarpedGrid } = require('../components/warpedGrid');
const { generateSecurityBorder, generateOVIMedallion, generateFineInkTexture } = require('../finishing');

function generateIdaho({ width = 1000, height = 630, idPrefix = 'id_1', rng }) {
  const defs = `
    <linearGradient id="${idPrefix}_sky" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#bae6fd" />
      <stop offset="48%" stop-color="#e0f2fe" />
      <stop offset="100%" stop-color="#fef3c7" />
    </linearGradient>
  `;

  const bg = `<rect width="${width}" height="${height}" fill="url(#${idPrefix}_sky)" />`;

  // 1. Sawtooth Mountain Range with coupled snowcaps and rock contour lines
  const sawtooth = renderMountainRange({
    startX: 0,
    endX: width,
    baseY: height * 0.58,
    peaks: [
      { x: width * 0.34 + (rng.random() - 0.5) * 35, y: height * 0.28, snowDrop: 0.38 },
      { x: width * 0.68 + (rng.random() - 0.5) * 35, y: height * 0.32, snowDrop: 0.34 },
      { x: width * 0.15, y: height * 0.38, snowDrop: 0.28 }
    ],
    mountainColor: '#334155',
    shadowColor: '#1e293b',
    snowColor: '#ffffff',
    ridgeColor: '#cbd5e1',
    roughness: 0.66,
    idPrefix,
    rng
  });

  // 2. Western White Pine (State Tree) foothill forest
  const conifers = [];
  for (let i = 0; i < 11; i++) {
    const tx = width * 0.08 + (i / 10) * (width * 0.84) + (rng.random() - 0.5) * 18;
    const treeH = 38 + rng.random() * 24;
    conifers.push(generateConiferSilhouette({
      x: tx,
      baseY: height * 0.59 + (rng.random() - 0.5) * 8,
      height: treeH,
      width: treeH * 0.40,
      fillColor: '#166534',
      opacity: 0.38,
      tiers: 4
    }));
  }

  // 3. Snake River Plain agricultural furrow arcs & river canyon contours
  const furrows = [];
  for (let f = 0; f < 4; f++) {
    furrows.push(generateWaveRibbonCluster({
      startX: 0,
      endX: width,
      baseY: height * 0.66 + f * (height * 0.075),
      amplitude: 11 + f * 2.5,
      frequency: 0.0052,
      numLines: 6,
      lineSpacing: 3.8,
      strokeColor: f === 3 ? '#0284c7' : '#65a30d',
      strokeWidth: 0.65,
      opacity: 0.23 + f * 0.03
    }));
  }

  // 4. Syringa (Mock Orange - State Flower) 4-petal engraving & OVI Medallion
  const syringa = generateFloralFlourish({
    cx: width * 0.14,
    cy: height * 0.20,
    radius: 36,
    numPetals: 4,
    strokeColor: '#0284c7',
    strokeWidth: 0.75,
    opacity: 0.30
  });

  const oviMedallion = generateOVIMedallion({
    cx: width * 0.86,
    cy: height * 0.80,
    radius: 52,
    primaryColor: '#166534',
    accentColor: '#0284c7',
    opacity: 0.24
  });

  // 5. Warped security grid & banknote border
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

  const inkTexture = generateFineInkTexture({
    width,
    height,
    strokeColor: '#1e293b',
    opacity: 0.08,
    rng
  });

  const border = generateSecurityBorder({
    width,
    height,
    margin: 12,
    strokeColor: '#166534',
    secondaryColor: '#0284c7',
    opacity: 0.25
  });

  return {
    defs,
    content: `${bg}\n${sawtooth}\n${conifers.join('\n')}\n${furrows.join('\n')}\n${syringa}\n${oviMedallion}\n${grid}\n${inkTexture}\n${border}`
  };
}

module.exports = { generateIdaho };
