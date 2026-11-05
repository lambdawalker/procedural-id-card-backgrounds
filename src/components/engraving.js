// Engraving component: banknote hatch patterns, diamond rosettes, and wind vectors.

function generateDiamondRosette({
  cx = 500,
  cy = 315,
  size = 140,
  rings = 5,
  strokeColor = '#059669',
  strokeWidth = 0.6,
  opacity = 0.28
}) {
  const elements = [];

  for (let r = 1; r <= rings; r++) {
    const radius = (r / rings) * size;
    const d1 = `M ${cx} ${cy - radius} L ${cx + radius} ${cy} L ${cx} ${cy + radius} L ${cx - radius} ${cy} Z`;
    elements.push(`<path d="${d1}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-opacity="${opacity}" />`);

    const diag = radius * 0.7071;
    const d2 = `M ${cx - diag} ${cy - diag} L ${cx + diag} ${cy - diag} L ${cx + diag} ${cy + diag} L ${cx - diag} ${cy + diag} Z`;
    elements.push(`<path d="${d2}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-opacity="${opacity * 0.85}" />`);
  }

  for (let a = 0; a < 8; a++) {
    const angle = (a / 8) * 2 * Math.PI;
    const x2 = cx + size * Math.cos(angle);
    const y2 = cy + size * Math.sin(angle);
    elements.push(`<line x1="${cx}" y1="${cy}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${strokeColor}" stroke-width="${strokeWidth * 0.8}" stroke-opacity="${opacity * 0.7}" />`);
  }

  return elements.join('\n');
}

function generateWindStreamlines({
  startX = 0,
  endX = 1000,
  startY = 180,
  endY = 460,
  numStreams = 18,
  strokeColor = '#d97706',
  strokeWidth = 0.5,
  opacity = 0.22,
  rng
}) {
  const elements = [];
  const spacing = (endY - startY) / numStreams;

  for (let i = 0; i <= numStreams; i++) {
    const baseY = startY + i * spacing;
    const points = [];
    const steps = 40;

    for (let s = 0; s <= steps; s++) {
      const x = startX + (s / steps) * (endX - startX);
      const gust = Math.sin(x * 0.005 + i * 0.4) * 8 + Math.cos(x * 0.012 + i * 0.8) * 4;
      points.push([Math.round(x * 10) / 10, Math.round((baseY + gust) * 10) / 10]);
    }

    const d = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ');
    elements.push(`<path d="${d}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-opacity="${opacity}" stroke-dasharray="14 6 4 6" />`);
  }

  return elements.join('\n');
}

module.exports = {
  generateDiamondRosette,
  generateWindStreamlines
};
