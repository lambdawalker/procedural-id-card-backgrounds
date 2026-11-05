// Wyoming Procedural ID Card Background
// Inspired by Wyoming WYDOT REAL ID Specimen (https://www.dot.state.wy.us/files/live/sites/wydot/files/shared/Driver_Services/ID_standard_limited%20term_horiz_front.png)
// Features Devils Tower (Bear Lodge) basalt column monolith with boulder talus apron,
// Grand Teton jagged range with coupled snowcaps, High Plains wind vectors, and western scrollwork.

const { renderMountainRange } = require('../components/mountain');
const { generateWindStreamlines } = require('../components/engraving');
const { generateWaveRibbonCluster } = require('../components/guilloche');
const { generateWarpedGrid } = require('../components/warpedGrid');
const { generateSecurityBorder, generateOVIMedallion, generateFineInkTexture } = require('../finishing');

/**
 * Generates Devils Tower (Bear Lodge) flat-topped volcanic monolith with stepped summit,
 * coupled basalt columns, and talus boulder apron at base.
 */
function generateDevilsTower({
  centerX = 760,
  baseY = 428,
  topWidth = 92,
  baseWidth = 210,
  height = 195,
  fillColor = '#475569',
  shadowColor = '#1e293b',
  columnColor = '#cbd5e1'
}) {
  const elements = [];
  const topY = baseY - height;
  const leftTopX = centerX - topWidth / 2;
  const rightTopX = centerX + topWidth / 2;
  const leftBaseX = centerX - baseWidth / 2;
  const rightBaseX = centerX + baseWidth / 2;

  // 1. Main monolith silhouette with stepped mesa crown and flared talus shoulders
  const monolithD = [
    `M ${leftBaseX} ${baseY}`,
    `C ${leftBaseX + 42} ${baseY - height * 0.22}, ${leftTopX - 12} ${topY + height * 0.38}, ${leftTopX} ${topY + 12}`,
    `L ${leftTopX + 10} ${topY + 3}`,
    `L ${centerX - 8} ${topY}`,
    `L ${centerX + 18} ${topY + 2}`,
    `L ${rightTopX - 8} ${topY + 6}`,
    `L ${rightTopX} ${topY + 14}`,
    `C ${rightTopX + 12} ${topY + height * 0.38}, ${rightBaseX - 42} ${baseY - height * 0.22}, ${rightBaseX} ${baseY}`,
    `Z`
  ].join(' ');
  elements.push(`<path d="${monolithD}" fill="${fillColor}" fill-opacity="0.86" />`);

  // 2. Coupled eastern shadow flank derived from summit cleft
  const shadowD = [
    `M ${centerX + 12} ${baseY}`,
    `L ${centerX + 4} ${topY + 1}`,
    `L ${centerX + 18} ${topY + 2}`,
    `L ${rightTopX - 8} ${topY + 6}`,
    `L ${rightTopX} ${topY + 14}`,
    `C ${rightTopX + 12} ${topY + height * 0.38}, ${rightBaseX - 42} ${baseY - height * 0.22}, ${rightBaseX} ${baseY}`,
    `Z`
  ].join(' ');
  elements.push(`<path d="${shadowD}" fill="${shadowColor}" fill-opacity="0.38" />`);

  // 3. Coupled vertical hexagonal basalt column striations & horizontal fracture joints
  const numCols = 16;
  for (let i = 1; i < numCols; i++) {
    const u = i / numCols;
    const tx = leftTopX + 4 + u * (topWidth - 8);
    const bx = leftBaseX + 24 + u * (baseWidth - 48);
    const midX = (tx + bx) / 2 + (u - 0.5) * 14;
    const midY = topY + height * 0.52;
    const colTopY = topY + 10 + Math.sin(u * Math.PI * 4) * 4;
    const colBotY = baseY - 18 - Math.sin(u * Math.PI) * 10;
    elements.push(`<path d="M ${tx.toFixed(1)} ${colTopY.toFixed(1)} Q ${midX.toFixed(1)} ${midY.toFixed(1)} ${bx.toFixed(1)} ${colBotY.toFixed(1)}" fill="none" stroke="${columnColor}" stroke-width="0.65" stroke-opacity="0.52" />`);
  }

  // 4. Talus boulder field apron along the base of Devils Tower
  const talusD = [
    `M ${leftBaseX - 20} ${baseY}`,
    `L ${leftBaseX + 15} ${baseY - 22}`,
    `L ${leftBaseX + 45} ${baseY - 16}`,
    `L ${centerX - 25} ${baseY - 28}`,
    `L ${centerX + 15} ${baseY - 20}`,
    `L ${rightTopX - 40} ${baseY - 26}`,
    `L ${rightBaseX - 10} ${baseY - 14}`,
    `L ${rightBaseX + 20} ${baseY}`,
    `Z`
  ].join(' ');
  elements.push(`<path d="${talusD}" fill="${shadowColor}" fill-opacity="0.45" stroke="${columnColor}" stroke-width="0.5" stroke-opacity="0.4" />`);

  return elements.join('\n');
}

function generateWyoming({ width = 1000, height = 630, idPrefix = 'wy_1', rng }) {
  const defs = `
    <linearGradient id="${idPrefix}_sky" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#bae6fd" />
      <stop offset="45%" stop-color="#e0f2fe" />
      <stop offset="100%" stop-color="#fef3c7" />
    </linearGradient>
  `;

  // 1. High Plains split-fountain sky
  const bg = `<rect width="${width}" height="${height}" fill="url(#${idPrefix}_sky)" />`;

  // 2. High Plains wind vector streamlines across upper sky
  const windStreamlines = generateWindStreamlines({
    startX: 0,
    endX: width,
    startY: height * 0.12,
    endY: height * 0.38,
    numStreams: 12,
    strokeColor: '#d97706',
    strokeWidth: 0.6,
    opacity: 0.26,
    rng
  });

  // 3. Grand Teton jagged peaks on left-center horizon with coupled snowcaps
  const tetonPeaks = renderMountainRange({
    startX: 0,
    endX: width * 0.72,
    baseY: height * 0.68,
    peaks: [
      { x: width * 0.28, y: height * 0.28, snowDrop: 0.42 },
      { x: width * 0.48, y: height * 0.34, snowDrop: 0.36 }
    ],
    mountainColor: '#334155',
    shadowColor: '#1e293b',
    snowColor: '#ffffff',
    ridgeColor: '#cbd5e1',
    roughness: 0.68,
    idPrefix,
    rng
  });

  // 4. Devils Tower (Bear Lodge) basalt monolith on right horizon (Featured on WYDOT Specimen)
  const devilsTower = generateDevilsTower({
    centerX: width * 0.76 + (rng.random() - 0.5) * 18,
    baseY: height * 0.68,
    topWidth: 92,
    baseWidth: 210,
    height: 195,
    fillColor: '#475569',
    shadowColor: '#1e293b',
    columnColor: '#e2e8f0'
  });

  // 5. Belle Fourche River & High Plains sagebrush steppe contours
  const steppeWaves = generateWaveRibbonCluster({
    startX: 0,
    endX: width,
    baseY: height * 0.80,
    amplitude: 14,
    frequency: 0.0055,
    numLines: 8,
    lineSpacing: 4.5,
    strokeColor: '#b45309',
    strokeWidth: 0.65,
    opacity: 0.25
  });

  // 6. Western engraved corner flourishes & OVI Medallion
  const flourishLeft = `
    <path d="M 28 28 C 78 28, 122 42, 142 86 C 152 110, 142 135, 118 135 C 98 135, 98 110, 118 100" fill="none" stroke="#b45309" stroke-width="0.85" stroke-opacity="0.38" />
    <path d="M 38 38 C 78 38, 108 52, 122 86" fill="none" stroke="#b45309" stroke-width="0.55" stroke-opacity="0.32" />
  `;

  const flourishRight = `
    <path d="M ${width - 28} 28 C ${width - 78} 28, ${width - 122} 42, ${width - 142} 86 C ${width - 152} 110, ${width - 142} 135, ${width - 118} 135 C ${width - 98} 135, ${width - 98} 110, ${width - 118} 100" fill="none" stroke="#b45309" stroke-width="0.85" stroke-opacity="0.38" />
    <path d="M ${width - 38} 38 C ${width - 78} 38, ${width - 108} 52, ${width - 122} 86" fill="none" stroke="#b45309" stroke-width="0.55" stroke-opacity="0.32" />
  `;

  const oviMedallion = generateOVIMedallion({
    cx: width * 0.86,
    cy: height * 0.82,
    radius: 52,
    primaryColor: '#1e3a8a',
    accentColor: '#d97706',
    opacity: 0.24
  });

  // 7. Warped security grid & banknote border
  const grid = generateWarpedGrid({
    width,
    height,
    numH: 22,
    numV: 32,
    warpField: 'sine',
    amplitude: 15,
    strokeColor: '#d97706',
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
    strokeColor: '#1e3a8a',
    secondaryColor: '#b45309',
    opacity: 0.26
  });

  return {
    defs,
    content: `${bg}\n${windStreamlines}\n${tetonPeaks}\n${devilsTower}\n${steppeWaves}\n${flourishLeft}\n${flourishRight}\n${oviMedallion}\n${grid}\n${inkTexture}\n${border}`
  };
}

module.exports = { generateWyoming };
