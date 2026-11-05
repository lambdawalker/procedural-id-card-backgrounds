// Geological strata layers and sandstone arch geometry (for Utah canyon landscape).

function generateDelicateArch({
  baseX = 720,
  baseY = 560,
  width = 160,
  height = 240,
  fillColor = '#c2410c',
  strokeColor = '#9a3412',
  opacity = 0.55
}) {
  const elements = [];

  const leftBaseOuterX = baseX;
  const leftBaseInnerX = baseX + width * 0.28;
  const rightBaseInnerX = baseX + width * 0.65;
  const rightBaseOuterX = baseX + width;

  const topOuterY = baseY - height;
  const topInnerY = baseY - height * 0.72;

  const outerApexX = baseX + width * 0.45;
  const innerApexX = baseX + width * 0.46;

  const archD = [
    `M ${leftBaseOuterX} ${baseY}`,
    `C ${leftBaseOuterX - 15} ${baseY - height * 0.5}, ${outerApexX - width * 0.3} ${topOuterY - 10}, ${outerApexX} ${topOuterY}`,
    `C ${outerApexX + width * 0.3} ${topOuterY - 5}, ${rightBaseOuterX + 15} ${baseY - height * 0.5}, ${rightBaseOuterX} ${baseY}`,
    `L ${rightBaseInnerX} ${baseY}`,
    `C ${rightBaseInnerX} ${baseY - height * 0.4}, ${innerApexX + width * 0.15} ${topInnerY}, ${innerApexX} ${topInnerY}`,
    `C ${innerApexX - width * 0.15} ${topInnerY}, ${leftBaseInnerX} ${baseY - height * 0.4}, ${leftBaseInnerX} ${baseY}`,
    `Z`
  ].join(' ');

  elements.push(`<path d="${archD}" fill="${fillColor}" fill-opacity="${opacity}" stroke="${strokeColor}" stroke-width="1.0" stroke-opacity="${opacity * 1.2}" />`);

  const numArchStrata = 8;
  for (let s = 1; s <= numArchStrata; s++) {
    const sy = baseY - (s / (numArchStrata + 1)) * (height * 0.65);
    elements.push(`<line x1="${leftBaseOuterX}" y1="${sy.toFixed(1)}" x2="${leftBaseInnerX}" y2="${sy.toFixed(1)}" stroke="${strokeColor}" stroke-width="0.6" stroke-opacity="${opacity * 0.8}" />`);
    elements.push(`<line x1="${rightBaseInnerX}" y1="${sy.toFixed(1)}" x2="${rightBaseOuterX}" y2="${sy.toFixed(1)}" stroke="${strokeColor}" stroke-width="0.6" stroke-opacity="${opacity * 0.8}" />`);
  }

  return elements.join('\n');
}

function generateCanyonStrata({
  startX = 0,
  endX = 1000,
  startY = 350,
  endY = 620,
  numLayers = 14,
  strokeColor = '#b45309',
  strokeWidth = 0.7,
  opacity = 0.22,
  rng
}) {
  const elements = [];
  const layerHeight = (endY - startY) / numLayers;

  for (let i = 0; i <= numLayers; i++) {
    const baseY = startY + i * layerHeight;
    const points = [];
    const steps = 50;

    for (let s = 0; s <= steps; s++) {
      const x = startX + (s / steps) * (endX - startX);
      const wave = Math.sin(x * 0.008 + i * 0.7) * 6 + Math.cos(x * 0.02 + i) * 3;
      points.push([Math.round(x * 10) / 10, Math.round((baseY + wave) * 10) / 10]);
    }

    const d = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ');
    elements.push(`<path d="${d}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-opacity="${opacity}" />`);
  }

  return elements.join('\n');
}

module.exports = {
  generateDelicateArch,
  generateCanyonStrata
};
