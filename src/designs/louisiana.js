// Louisiana Procedural ID Card Background
// Inspired by Louisiana OMV REAL ID Specimen (https://expresslane.la.gov/omv/media/zomdwng4/real-id.jpg)
// Features French Quarter wrought-iron balcony filigree, southern magnolia blossom engraving,
// meandering Mississippi delta waterways, and cypress swamp concentric ripples.

const { generateBalconyFiligree } = require('../components/filigree');
const { generateWaveRibbonCluster, generateGuillocheRosette } = require('../components/guilloche');
const { generateFloralFlourish } = require('../components/botanical');
const { generateWarpedGrid } = require('../components/warpedGrid');
const { generateSecurityBorder, generateOVIMedallion, generateFineInkTexture } = require('../finishing');

function generateLouisiana({ width = 1000, height = 630, idPrefix = 'la_1', rng }) {
  const defs = `
    <linearGradient id="${idPrefix}_bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f0f9ff" />
      <stop offset="45%" stop-color="#fefce8" />
      <stop offset="100%" stop-color="#ecfdf5" />
    </linearGradient>
  `;

  // 1. Warm split-fountain gulf coast sky & parchment base
  const bg = `<rect width="${width}" height="${height}" fill="url(#${idPrefix}_bg)" />`;

  // 2. French Quarter Wrought-Iron Balcony Filigree across upper header & lower border
  const topFiligree = generateBalconyFiligree({
    x: 32,
    y: 26,
    width: width - 64,
    height: 72,
    strokeColor: '#b45309',
    strokeWidth: 0.85,
    opacity: 0.38
  });

  // 3. Southern Magnolia (State Flower) 8-petal botanical engraving
  const magnoliaMain = generateFloralFlourish({
    cx: width * 0.68,
    cy: height * 0.42,
    radius: 75,
    numPetals: 8,
    strokeColor: '#0f766e',
    strokeWidth: 0.8,
    opacity: 0.28
  });

  const magnoliaInner = generateFloralFlourish({
    cx: width * 0.68,
    cy: height * 0.42,
    radius: 42,
    numPetals: 8,
    strokeColor: '#b45309',
    strokeWidth: 0.65,
    opacity: 0.32
  });

  // 4. Meandering Mississippi Delta waterway ribbons flowing diagonally
  const waterways = [];
  for (let w = 0; w < 4; w++) {
    waterways.push(generateWaveRibbonCluster({
      startX: 0,
      endX: width,
      baseY: height * 0.40 + w * (height * 0.13),
      amplitude: 28 + w * 4,
      frequency: 0.0042,
      numLines: 7,
      lineSpacing: 4.5,
      strokeColor: '#0284c7',
      strokeWidth: 0.65,
      opacity: 0.24 + w * 0.03,
      secondaryFreq: 0.011,
      secondaryAmp: 9
    }));
  }

  // 5. Cypress swamp concentric ripple rings & OVI Medallion
  const rippleElements = [];
  const rx = width * 0.20;
  const ry = height * 0.78;
  for (let r = 1; r <= 7; r++) {
    rippleElements.push(`<circle cx="${rx}" cy="${ry}" r="${r * 16}" fill="none" stroke="#15803d" stroke-width="0.6" stroke-opacity="0.22" />`);
  }

  const oviMedallion = generateOVIMedallion({
    cx: width * 0.86,
    cy: height * 0.80,
    radius: 54,
    primaryColor: '#b45309',
    accentColor: '#0f766e',
    opacity: 0.25
  });

  // 6. Warped security grid & banknote border
  const grid = generateWarpedGrid({
    width,
    height,
    numH: 22,
    numV: 32,
    warpField: 'sine',
    amplitude: 16,
    strokeColor: '#0284c7',
    opacity: 0.11,
    strokeWidth: 0.5,
    rng
  });

  const inkTexture = generateFineInkTexture({
    width,
    height,
    strokeColor: '#b45309',
    opacity: 0.08,
    rng
  });

  const border = generateSecurityBorder({
    width,
    height,
    margin: 12,
    strokeColor: '#0f766e',
    secondaryColor: '#b45309',
    opacity: 0.26
  });

  return {
    defs,
    content: `${bg}\n${topFiligree}\n${magnoliaMain}\n${magnoliaInner}\n${waterways.join('\n')}\n${rippleElements.join('\n')}\n${oviMedallion}\n${grid}\n${inkTexture}\n${border}`
  };
}

module.exports = { generateLouisiana };
