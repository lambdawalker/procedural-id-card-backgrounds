// Tennessee Procedural ID Card Background
// Inspired by Tennessee TDOSHS Driver License Specimen (https://www.tn.gov/content/dam/tn/safety/images/driver-services/REGULAR_LICENSE_NOT_REALID.png)
// Features Great Smoky Mountains layered ridges with derived mist, 5-line musical staff waves,
// tri-star harmonic guilloche rosette, and iris/dogwood botanical flourishes.

const { renderMountainRange } = require('../components/mountain');
const { generateFloralFlourish } = require('../components/botanical');
const { generateWaveRibbonCluster, generateGuillocheRosette } = require('../components/guilloche');
const { generateWarpedGrid } = require('../components/warpedGrid');
const { generateSecurityBorder, generateOVIMedallion, generateFineInkTexture } = require('../finishing');

function generateTennessee({ width = 1000, height = 630, idPrefix = 'tn_1', rng }) {
  const defs = `
    <linearGradient id="${idPrefix}_bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e0e7ff" />
      <stop offset="48%" stop-color="#f8fafc" />
      <stop offset="100%" stop-color="#fef3c7" />
    </linearGradient>
  `;

  const bg = `<rect width="${width}" height="${height}" fill="url(#${idPrefix}_bg)" />`;

  // 1. Great Smoky Mountains silhouette range with coupled mist snow/haze caps
  const smokyMountains = renderMountainRange({
    startX: 0,
    endX: width,
    baseY: height * 0.68,
    peaks: [
      { x: width * 0.35, y: height * 0.36, snowDrop: 0.30 },
      { x: width * 0.72, y: height * 0.38, snowDrop: 0.28 }
    ],
    mountainColor: '#4338ca',
    shadowColor: '#312e81',
    snowColor: '#e0e7ff',
    ridgeColor: '#818cf8',
    roughness: 0.38, // Smooth rolling Blue Ridge / Smoky profile
    idPrefix,
    rng
  });

  // 2. Rolling Great Smoky Mountains multi-tier misty ridge waves
  const smokyRidges = [];
  for (let r = 0; r < 4; r++) {
    smokyRidges.push(generateWaveRibbonCluster({
      startX: 0,
      endX: width,
      baseY: height * 0.52 + r * (height * 0.095),
      amplitude: 20 - r * 3,
      frequency: 0.0036 + r * 0.0008,
      numLines: 6,
      lineSpacing: 4.2,
      strokeColor: '#4f46e5',
      strokeWidth: 0.65,
      opacity: 0.18 + r * 0.05,
      secondaryFreq: 0.008,
      secondaryAmp: 6
    }));
  }

  // 3. Undulating 5-line musical staff waves flowing across upper third (Music City heritage)
  const musicStaff = generateWaveRibbonCluster({
    startX: 0,
    endX: width,
    baseY: height * 0.24,
    amplitude: 18,
    frequency: 0.0058,
    numLines: 5,
    lineSpacing: 5.5,
    strokeColor: '#d97706',
    strokeWidth: 0.85,
    opacity: 0.38,
    secondaryFreq: 0.014,
    secondaryAmp: 7
  });

  // 4. Harmonic Guilloche Rosette & Iris / Dogwood Botanical Flourishes
  const centerRosette = generateGuillocheRosette({
    cx: width * 0.50,
    cy: height * 0.28,
    R: 85,
    r: 28,
    p: 22,
    cycles: 9,
    steps: 540,
    strokeColor: '#6366f1',
    strokeWidth: 0.55,
    opacity: 0.24
  });

  const flower1 = generateFloralFlourish({
    cx: 95,
    cy: height - 82,
    radius: 38,
    numPetals: 4,
    strokeColor: '#7c3aed',
    strokeWidth: 0.75,
    opacity: 0.34
  });

  const oviMedallion = generateOVIMedallion({
    cx: width * 0.86,
    cy: height * 0.80,
    radius: 52,
    primaryColor: '#4338ca',
    accentColor: '#d97706',
    opacity: 0.25
  });

  // 5. Warped security grid & banknote border
  const grid = generateWarpedGrid({
    width,
    height,
    numH: 20,
    numV: 30,
    warpField: 'sine',
    amplitude: 14,
    strokeColor: '#6366f1',
    opacity: 0.12,
    strokeWidth: 0.5,
    rng
  });

  const inkTexture = generateFineInkTexture({
    width,
    height,
    strokeColor: '#312e81',
    opacity: 0.08,
    rng
  });

  const border = generateSecurityBorder({
    width,
    height,
    margin: 12,
    strokeColor: '#4338ca',
    secondaryColor: '#d97706',
    opacity: 0.26
  });

  return {
    defs,
    content: `${bg}\n${centerRosette}\n${musicStaff}\n${smokyMountains}\n${smokyRidges.join('\n')}\n${flower1}\n${oviMedallion}\n${grid}\n${inkTexture}\n${border}`
  };
}

module.exports = { generateTennessee };
