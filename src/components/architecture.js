// Classical architectural component for civic pillars, fluted columns, and capitals.

function generateClassicalColumn({
  x = 80,
  topY = 80,
  bottomY = 560,
  width = 65,
  numFlutes = 7,
  strokeColor = '#475569',
  strokeWidth = 0.7,
  opacity = 0.35,
  fillColor = '#cbd5e1'
}) {
  const elements = [];
  const capitalHeight = 24;
  const abacusWidth = width * 1.35;
  const abacusX = x - (abacusWidth - width) / 2;
  elements.push(`<rect x="${abacusX.toFixed(1)}" y="${topY.toFixed(1)}" width="${abacusWidth.toFixed(1)}" height="8" rx="2" fill="${fillColor}" fill-opacity="${opacity * 0.5}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-opacity="${opacity}" />`);

  const echinusY = topY + 8;
  const echinusD = `M ${abacusX} ${echinusY} Q ${x + width / 2} ${echinusY + 12} ${abacusX + abacusWidth} ${echinusY} L ${x + width} ${echinusY + capitalHeight - 8} L ${x} ${echinusY + capitalHeight - 8} Z`;
  elements.push(`<path d="${echinusD}" fill="${fillColor}" fill-opacity="${opacity * 0.4}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-opacity="${opacity}" />`);

  const voluteLeft = `M ${abacusX + 4} ${echinusY + 4} C ${abacusX - 6} ${echinusY + 4}, ${abacusX - 6} ${echinusY + 14}, ${abacusX + 6} ${echinusY + 14}`;
  const voluteRight = `M ${abacusX + abacusWidth - 4} ${echinusY + 4} C ${abacusX + abacusWidth + 6} ${echinusY + 4}, ${abacusX + abacusWidth + 6} ${echinusY + 14}, ${abacusX + abacusWidth - 6} ${echinusY + 14}`;
  elements.push(`<path d="${voluteLeft}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-opacity="${opacity * 0.9}" />`);
  elements.push(`<path d="${voluteRight}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-opacity="${opacity * 0.9}" />`);

  const shaftTopY = topY + capitalHeight;
  const shaftBottomY = bottomY - 18;
  elements.push(`<rect x="${x.toFixed(1)}" y="${shaftTopY.toFixed(1)}" width="${width.toFixed(1)}" height="${(shaftBottomY - shaftTopY).toFixed(1)}" fill="${fillColor}" fill-opacity="${opacity * 0.3}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-opacity="${opacity}" />`);

  for (let i = 1; i <= numFlutes; i++) {
    const theta = (i / (numFlutes + 1)) * Math.PI;
    const fluteX = x + (width / 2) * (1 - Math.cos(theta));
    elements.push(`<line x1="${fluteX.toFixed(1)}" y1="${(shaftTopY + 4).toFixed(1)}" x2="${fluteX.toFixed(1)}" y2="${(shaftBottomY - 4).toFixed(1)}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-opacity="${opacity * 0.75}" />`);
  }

  const plinthWidth = width * 1.3;
  const plinthX = x - (plinthWidth - width) / 2;
  const torusY = shaftBottomY;
  elements.push(`<rect x="${plinthX.toFixed(1)}" y="${torusY.toFixed(1)}" width="${plinthWidth.toFixed(1)}" height="8" rx="3" fill="${fillColor}" fill-opacity="${opacity * 0.5}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-opacity="${opacity}" />`);
  elements.push(`<rect x="${(plinthX - 4).toFixed(1)}" y="${(torusY + 8).toFixed(1)}" width="${(plinthWidth + 8).toFixed(1)}" height="10" fill="${fillColor}" fill-opacity="${opacity * 0.6}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-opacity="${opacity}" />`);

  return elements.join('\n');
}

module.exports = { generateClassicalColumn };
