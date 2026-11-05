// Wrought-iron balcony filigree and ornamental scrollwork component.

function generateBalconyFiligree({
  x = 20,
  y = 20,
  width = 300,
  height = 100,
  strokeColor = '#ca8a04',
  strokeWidth = 0.8,
  opacity = 0.3
}) {
  const elements = [];

  elements.push(`<line x1="${x}" y1="${y}" x2="${x + width}" y2="${y}" stroke="${strokeColor}" stroke-width="${strokeWidth * 1.5}" stroke-opacity="${opacity}" />`);
  elements.push(`<line x1="${x}" y1="${y + 10}" x2="${x + width}" y2="${y + 10}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-opacity="${opacity}" />`);
  elements.push(`<line x1="${x}" y1="${y + height - 10}" x2="${x + width}" y2="${y + height - 10}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-opacity="${opacity}" />`);
  elements.push(`<line x1="${x}" y1="${y + height}" x2="${x + width}" y2="${y + height}" stroke="${strokeColor}" stroke-width="${strokeWidth * 1.5}" stroke-opacity="${opacity}" />`);

  const numPanels = Math.floor(width / 45);
  const panelWidth = width / numPanels;

  for (let i = 0; i < numPanels; i++) {
    const px = x + i * panelWidth;
    const cx = px + panelWidth / 2;
    const topY = y + 10;
    const botY = y + height - 10;
    const midY = (topY + botY) / 2;

    elements.push(`<line x1="${px.toFixed(1)}" y1="${topY}" x2="${px.toFixed(1)}" y2="${botY}" stroke="${strokeColor}" stroke-width="${strokeWidth * 0.8}" stroke-opacity="${opacity * 0.8}" />`);

    const sCurve1 = `M ${cx} ${topY + 4} C ${px + 4} ${topY + 4}, ${px + 4} ${midY}, ${cx} ${midY} C ${px + panelWidth - 4} ${midY}, ${px + panelWidth - 4} ${botY - 4}, ${cx} ${botY - 4}`;
    const sCurve2 = `M ${cx} ${topY + 4} C ${px + panelWidth - 4} ${topY + 4}, ${px + panelWidth - 4} ${midY}, ${cx} ${midY} C ${px + 4} ${midY}, ${px + 4} ${botY - 4}, ${cx} ${botY - 4}`;

    elements.push(`<path d="${sCurve1}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-opacity="${opacity}" />`);
    elements.push(`<path d="${sCurve2}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-opacity="${opacity}" />`);
    elements.push(`<circle cx="${cx.toFixed(1)}" cy="${midY.toFixed(1)}" r="2.5" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-opacity="${opacity * 1.2}" />`);
  }

  return elements.join('\n');
}

module.exports = { generateBalconyFiligree };
