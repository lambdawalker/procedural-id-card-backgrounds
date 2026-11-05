// Botanical elements: procedural conifer / pine trees and floral petal curves.

function generateConiferSilhouette({
  x = 200,
  baseY = 400,
  height = 80,
  width = 30,
  fillColor = '#166534',
  opacity = 0.45,
  tiers = 4
}) {
  const elements = [];
  const topY = baseY - height;
  const tierHeight = height / tiers;

  for (let t = 0; t < tiers; t++) {
    const tProgress = t / tiers;
    const branchTopY = topY + t * (tierHeight * 0.75);
    const branchBottomY = branchTopY + tierHeight * 1.35;
    const branchWidth = (width * 0.35) + tProgress * (width * 0.65);

    const d = `M ${x} ${branchTopY.toFixed(1)} L ${x + branchWidth / 2} ${branchBottomY.toFixed(1)} Q ${x} ${(branchBottomY - 4).toFixed(1)} ${x - branchWidth / 2} ${branchBottomY.toFixed(1)} Z`;
    elements.push(`<path d="${d}" fill="${fillColor}" fill-opacity="${opacity}" />`);
  }

  return elements.join('\n');
}

function generateFloralFlourish({
  cx = 900,
  cy = 550,
  radius = 35,
  numPetals = 4,
  strokeColor = '#a855f7',
  strokeWidth = 0.7,
  opacity = 0.25
}) {
  const elements = [];

  for (let i = 0; i < numPetals; i++) {
    const angle = (i / numPetals) * 2 * Math.PI;
    const perpAngle = angle + Math.PI / 2;

    const tipX = cx + radius * Math.cos(angle);
    const tipY = cy + radius * Math.sin(angle);

    const spread = radius * 0.45;
    const c1x = cx + (radius * 0.5) * Math.cos(angle) + spread * Math.cos(perpAngle);
    const c1y = cy + (radius * 0.5) * Math.sin(angle) + spread * Math.sin(perpAngle);

    const c2x = cx + (radius * 0.5) * Math.cos(angle) - spread * Math.cos(perpAngle);
    const c2y = cy + (radius * 0.5) * Math.sin(angle) - spread * Math.sin(perpAngle);

    const d = `M ${cx} ${cy} Q ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${tipX.toFixed(1)} ${tipY.toFixed(1)} Q ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${cx} ${cy}`;
    elements.push(`<path d="${d}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-opacity="${opacity}" />`);
  }

  elements.push(`<circle cx="${cx}" cy="${cy}" r="${(radius * 0.15).toFixed(1)}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-opacity="${opacity * 1.5}" />`);

  return elements.join('\n');
}

module.exports = {
  generateConiferSilhouette,
  generateFloralFlourish
};
