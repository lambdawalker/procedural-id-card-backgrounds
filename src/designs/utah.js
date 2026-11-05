// Utah Procedural ID Card Background
// Inspired by Utah DLD REAL ID Specimen (https://thumbs.dreamstime.com/b/utah-usa-driver-license-specimen-card-showing-sample-personal-details-cartoon-photo-delicate-arch-background-real-id-star-not-468430993.jpg)
// Features Delicate Arch natural sandstone formation with negative window cutout,
// Beehive hexagonal security lattice, Wasatch peaks, and sego lily engraving.

const { generateDelicateArch, generateCanyonStrata } = require('../components/strata');
const { renderMountainRange } = require('../components/mountain');
const { generateFloralFlourish } = require('../components/botanical');
const { generateWarpedGrid } = require('../components/warpedGrid');
const { generateSecurityBorder, generateOVIMedallion, generateFineInkTexture } = require('../finishing');

function generateUtah({ width = 1000, height = 630, idPrefix = 'ut_1', rng }) {
  const defs = `
    <linearGradient id="${idPrefix}_sky" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#bae6fd" />
      <stop offset="42%" stop-color="#fed7aa" />
      <stop offset="100%" stop-color="#fef3c7" />
    </linearGradient>
  `;

  // 1. Split-fountain desert sky
  const bg = `<rect width="${width}" height="${height}" fill="url(#${idPrefix}_sky)" />`;

  // 2. Beehive State Hexagonal Security Lattice in upper-center sky
  const hexElements = [];
  const hexRadius = 18;
  const hexW = hexRadius * Math.sqrt(3);
  const hexH = hexRadius * 1.5;
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 6; col++) {
      const hx = width * 0.44 + col * hexW + (row % 2 === 1 ? hexW / 2 : 0);
      const hy = height * 0.16 + row * hexH;
      const pts = [];
      for (let a = 0; a < 6; a++) {
        const ang = (Math.PI / 6) + (a * Math.PI) / 3;
        pts.push(`${(hx + hexRadius * Math.cos(ang)).toFixed(1)},${(hy + hexRadius * Math.sin(ang)).toFixed(1)}`);
      }
      hexElements.push(`<polygon points="${pts.join(' ')}" fill="none" stroke="#d97706" stroke-width="0.55" stroke-opacity="0.22" />`);
    }
  }

  // 3. Distant Wasatch Range on left horizon with coupled snowcaps
  const wasatchPeaks = renderMountainRange({
    startX: 0,
    endX: width * 0.68,
    baseY: height * 0.54,
    peaks: [
      { x: width * 0.26, y: height * 0.30, snowDrop: 0.34 },
      { x: width * 0.50, y: height * 0.36, snowDrop: 0.28 }
    ],
    mountainColor: '#475569',
    shadowColor: '#334155',
    snowColor: '#ffffff',
    ridgeColor: '#cbd5e1',
    roughness: 0.52,
    idPrefix,
    rng
  });

  // 4. Layered Red Rock Canyon Strata across center and lower half
  const canyonStrata = generateCanyonStrata({
    startX: 0,
    endX: width,
    startY: height * 0.48,
    endY: height - 18,
    numLayers: 16,
    strokeColor: '#c2410c',
    strokeWidth: 0.75,
    opacity: 0.28,
    rng
  });

  // 5. Iconic Delicate Arch natural sandstone formation on right flank
  const archX = width * 0.66 + (rng.random() - 0.5) * 24;
  const delicateArch = generateDelicateArch({
    baseX: archX,
    baseY: height * 0.88,
    width: 185,
    height: 255,
    fillColor: '#9a3412',
    strokeColor: '#7c2d12',
    opacity: 0.52
  });

  // 6. Sego Lily (State Flower) 3-petal engraving & OVI Medallion
  const segoLily = generateFloralFlourish({
    cx: width * 0.14,
    cy: height * 0.78,
    radius: 38,
    numPetals: 6,
    strokeColor: '#c2410c',
    strokeWidth: 0.75,
    opacity: 0.32
  });

  const oviMedallion = generateOVIMedallion({
    cx: width * 0.48,
    cy: height * 0.80,
    radius: 50,
    primaryColor: '#c2410c',
    accentColor: '#d97706',
    opacity: 0.24
  });

  // 7. Warped security grid & banknote border
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

  const inkTexture = generateFineInkTexture({
    width,
    height,
    strokeColor: '#9a3412',
    opacity: 0.08,
    rng
  });

  const border = generateSecurityBorder({
    width,
    height,
    margin: 12,
    strokeColor: '#c2410c',
    secondaryColor: '#d97706',
    opacity: 0.26
  });

  return {
    defs,
    content: `${bg}\n${hexElements.join('\n')}\n${wasatchPeaks}\n${canyonStrata}\n${delicateArch}\n${segoLily}\n${oviMedallion}\n${grid}\n${inkTexture}\n${border}`
  };
}

module.exports = { generateUtah };
