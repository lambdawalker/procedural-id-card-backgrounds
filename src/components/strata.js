// Geological strata layers and Delicate Arch geometry (for Utah canyon landscape).
// Constructs authentic Arches National Park sandstone bowl, asymmetrical legs, and internal rock contours.

function generateDelicateArch({
  baseX = 680,
  baseY = 550,
  width = 210,
  height = 245,
  fillColor = '#c2410c',
  shadowColor = '#7c2d12',
  strokeColor = '#7c2d12',
  opacity = 0.58
}) {
  const elements = [];

  const bowlLeftX = baseX - 55;
  const bowlRightX = baseX + width + 45;
  const bowlBottomY = baseY + 25;
  const bowlD = [
    `M ${bowlLeftX} ${bowlBottomY}`,
    `Q ${baseX - 10} ${baseY - 12} ${baseX + width * 0.25} ${baseY - 4}`,
    `Q ${baseX + width * 0.52} ${baseY + 8} ${baseX + width * 0.78} ${baseY - 6}`,
    `Q ${baseX + width + 15} ${baseY - 14} ${bowlRightX} ${bowlBottomY}`,
    `Z`
  ].join(' ');
  elements.push(`<path d="${bowlD}" fill="${fillColor}" fill-opacity="${(opacity * 0.72).toFixed(2)}" stroke="${strokeColor}" stroke-width="0.8" stroke-opacity="${(opacity * 0.9).toFixed(2)}" />`);

  const leftAnkleOuterX = baseX + width * 0.04;
  const leftShoulderOuterX = baseX - width * 0.04;
  const leftCapX = baseX + width * 0.22;
  const rightCapX = baseX + width * 0.76;
  const rightShoulderOuterX = baseX + width * 0.96;
  const rightBaseOuterX = baseX + width * 0.92;

  const leftBaseInnerX = baseX + width * 0.32;
  const rightBaseInnerX = baseX + width * 0.68;

  const topOuterY = baseY - height;
  const capStepY = baseY - height * 0.88;
  const topInnerY = baseY - height * 0.66;
  const innerApexX = baseX + width * 0.52;

  const archD = [
    `M ${leftAnkleOuterX} ${baseY - 2}`,
    `C ${leftShoulderOuterX} ${baseY - height * 0.35}, ${leftShoulderOuterX} ${baseY - height * 0.68}, ${leftCapX - 14} ${capStepY}`,
    `L ${leftCapX} ${topOuterY + 6}`,
    `Q ${baseX + width * 0.48} ${topOuterY - 6} ${rightCapX} ${topOuterY + 10}`,
    `L ${rightCapX + 12} ${capStepY + 6}`,
    `C ${rightShoulderOuterX} ${baseY - height * 0.62}, ${rightShoulderOuterX + 4} ${baseY - height * 0.30}, ${rightBaseOuterX} ${baseY - 4}`,
    `L ${rightBaseInnerX} ${baseY - 4}`,
    `C ${rightBaseInnerX - 6} ${baseY - height * 0.32}, ${innerApexX + width * 0.18} ${topInnerY}, ${innerApexX} ${topInnerY}`,
    `C ${innerApexX - width * 0.20} ${topInnerY}, ${leftBaseInnerX - 10} ${baseY - height * 0.36}, ${leftBaseInnerX} ${baseY - 2}`,
    `Z`
  ].join(' ');

  elements.push(`<path d="${archD}" fill="${fillColor}" fill-opacity="${opacity}" stroke="${strokeColor}" stroke-width="1.1" stroke-opacity="${(opacity * 1.15).toFixed(2)}" />`);

  const shadowVaultD = [
    `M ${innerApexX} ${topInnerY}`,
    `C ${innerApexX + width * 0.18} ${topInnerY}, ${rightBaseInnerX - 6} ${baseY - height * 0.32}, ${rightBaseInnerX} ${baseY - 4}`,
    `L ${rightBaseInnerX + 14} ${baseY - 4}`,
    `C ${rightBaseInnerX + 8} ${baseY - height * 0.34}, ${innerApexX + width * 0.22} ${topInnerY - 12}, ${innerApexX} ${topInnerY - 10}`,
    `Z`
  ].join(' ');
  elements.push(`<path d="${shadowVaultD}" fill="${shadowColor}" fill-opacity="${(opacity * 0.55).toFixed(2)}" />`);

  const strataLevels = [0.18, 0.32, 0.46, 0.60, 0.74, 0.86];
  for (const frac of strataLevels) {
    const sy = baseY - height * frac;
    if (frac < 0.64) {
      const lx1 = leftAnkleOuterX - Math.sin(frac * Math.PI) * 12;
      const lx2 = leftBaseInnerX - Math.sin(frac * Math.PI) * 6;
      const rx1 = rightBaseInnerX + Math.sin(frac * Math.PI) * 4;
      const rx2 = rightBaseOuterX + Math.sin(frac * Math.PI) * 8;
      elements.push(`<path d="M ${lx1.toFixed(1)} ${sy.toFixed(1)} Q ${((lx1 + lx2) / 2).toFixed(1)} ${(sy - 3).toFixed(1)} ${lx2.toFixed(1)} ${sy.toFixed(1)}" fill="none" stroke="${strokeColor}" stroke-width="0.65" stroke-opacity="${(opacity * 0.85).toFixed(2)}" />`);
      elements.push(`<path d="M ${rx1.toFixed(1)} ${sy.toFixed(1)} Q ${((rx1 + rx2) / 2).toFixed(1)} ${(sy + 2).toFixed(1)} ${rx2.toFixed(1)} ${sy.toFixed(1)}" fill="none" stroke="${strokeColor}" stroke-width="0.65" stroke-opacity="${(opacity * 0.85).toFixed(2)}" />`);
    } else {
      const ux1 = leftCapX - (1 - frac) * 35;
      const ux2 = rightCapX + (1 - frac) * 35;
      elements.push(`<path d="M ${ux1.toFixed(1)} ${sy.toFixed(1)} Q ${innerApexX.toFixed(1)} ${(sy - 5).toFixed(1)} ${ux2.toFixed(1)} ${(sy + 2).toFixed(1)}" fill="none" stroke="${strokeColor}" stroke-width="0.75" stroke-opacity="${(opacity * 0.95).toFixed(2)}" />`);
    }
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
