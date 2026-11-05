// Colorado Procedural ID Card Background
// Inspired by Iconic Colorado Mount Sneffels Specimen (https://abclegaldocs.com/blog-Colorado-Notary/wp-content/uploads/Colorado-drivers-license-design-400x250.jpg)
// Features Mount Sneffels multi-tier peaks with coupled snowcaps, 48-ray radial sunrise fan,
// Rocky Mountain columbine floral engraving, and alpine forest valley.

const { renderMountainRange } = require('../components/mountain');
const { generateRadialFan, generateWaveRibbonCluster } = require('../components/guilloche');
const { generateConiferSilhouette, generateFloralFlourish } = require('../components/botanical');
const { generateWarpedGrid } = require('../components/warpedGrid');
const { generateSecurityBorder, generateOVIMedallion, generateFineInkTexture } = require('../finishing');

function generateColorado({ width = 1000, height = 630, idPrefix = 'co_1', rng }) {
  const defs = `
    <linearGradient id="${idPrefix}_sky" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e3a8a" />
      <stop offset="38%" stop-color="#38bdf8" />
      <stop offset="72%" stop-color="#fed7aa" />
      <stop offset="100%" stop-color="#fef08a" />
    </linearGradient>
  `;

  // 1. Split-fountain alpine dawn sky
  const bg = `<rect width="${width}" height="${height}" fill="url(#${idPrefix}_sky)" />`;

  // 2. Radiant 48-ray solar fan behind Mount Sneffels summit
  const sunrise = generateRadialFan({
    cx: width * 0.48,
    cy: height * 0.36,
    innerRadius: 22,
    outerRadius: width * 0.45,
    numRays: 54,
    strokeColor: '#f59e0b',
    strokeWidth: 0.6,
    opacity: 0.22,
    waveModulation: 8
  });

  // 3. Distant San Juan Range & Foreground Mount Sneffels (14,158 ft) with coupled snowcaps
  const distantMountains = renderMountainRange({
    startX: 0,
    endX: width,
    baseY: height * 0.64,
    peaks: [
      { x: width * 0.24, y: height * 0.30, snowDrop: 0.36 },
      { x: width * 0.68, y: height * 0.32, snowDrop: 0.32 }
    ],
    mountainColor: '#475569',
    shadowColor: '#334155',
    snowColor: '#ffffff',
    ridgeColor: '#cbd5e1',
    roughness: 0.48,
    idPrefix: `${idPrefix}_dist`,
    rng
  });

  const sneffelsRange = renderMountainRange({
    startX: 0,
    endX: width,
    baseY: height * 0.78,
    peaks: [
      { x: width * 0.48, y: height * 0.38, snowDrop: 0.42 },
      { x: width * 0.80, y: height * 0.44, snowDrop: 0.36 },
      { x: width * 0.16, y: height * 0.46, snowDrop: 0.34 }
    ],
    mountainColor: '#1e293b',
    shadowColor: '#0f172a',
    snowColor: '#ffffff',
    ridgeColor: '#e2e8f0',
    roughness: 0.62,
    idPrefix: `${idPrefix}_fore`,
    rng
  });

  // 4. Spruce conifers & Sprague Lake / Alpine Valley contours
  const spruces = [];
  for (let i = 0; i < 8; i++) {
    const sx = width * 0.08 + i * (width * 0.11) + (rng.random() - 0.5) * 16;
    const sh = 34 + rng.random() * 20;
    spruces.push(generateConiferSilhouette({
      x: sx,
      baseY: height * 0.79 + (rng.random() - 0.5) * 6,
      height: sh,
      width: sh * 0.40,
      fillColor: '#14532d',
      opacity: 0.34,
      tiers: 5
    }));
  }

  const valleyMeadow = generateWaveRibbonCluster({
    startX: 0,
    endX: width,
    baseY: height * 0.86,
    amplitude: 12,
    frequency: 0.0055,
    numLines: 7,
    lineSpacing: 4,
    strokeColor: '#15803d',
    strokeWidth: 0.65,
    opacity: 0.25
  });

  // 5. Rocky Mountain Columbine (State Flower) & OVI Security Medallion
  const columbine = generateFloralFlourish({
    cx: width * 0.13,
    cy: height * 0.20,
    radius: 38,
    numPetals: 5,
    strokeColor: '#f59e0b',
    strokeWidth: 0.75,
    opacity: 0.32
  });

  const oviMedallion = generateOVIMedallion({
    cx: width * 0.86,
    cy: height * 0.80,
    radius: 54,
    primaryColor: '#0284c7',
    accentColor: '#f59e0b',
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
    strokeColor: '#0284c7',
    opacity: 0.12,
    strokeWidth: 0.5,
    rng
  });

  const inkTexture = generateFineInkTexture({
    width,
    height,
    strokeColor: '#1e3a8a',
    opacity: 0.08,
    rng
  });

  const border = generateSecurityBorder({
    width,
    height,
    margin: 12,
    strokeColor: '#1e3a8a',
    secondaryColor: '#f59e0b',
    opacity: 0.26
  });

  return {
    defs,
    content: `${bg}\n${sunrise}\n${distantMountains}\n${sneffelsRange}\n${spruces.join('\n')}\n${valleyMeadow}\n${columbine}\n${oviMedallion}\n${grid}\n${inkTexture}\n${border}`
  };
}

module.exports = { generateColorado };
