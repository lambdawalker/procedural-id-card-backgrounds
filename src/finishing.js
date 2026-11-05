// Rich Banknote & Security Document Finishing Engine
// Provides micro-linework, rainbow split-fountain underprints, border scroll frames,
// iridescent optically variable ink (OVI) medallions, and organic stipple textures.

function generateSecurityBorder({
  width = 1000,
  height = 630,
  margin = 14,
  strokeColor = '#1e3a8a',
  secondaryColor = '#d97706',
  opacity = 0.22
}) {
  const elements = [];
  const innerW = width - margin * 2;
  const innerH = height - margin * 2;

  elements.push(`<rect x="${margin}" y="${margin}" width="${innerW}" height="${innerH}" rx="18" fill="none" stroke="${strokeColor}" stroke-width="0.9" stroke-opacity="${opacity}" />`);
  elements.push(`<rect x="${margin + 4}" y="${margin + 4}" width="${innerW - 8}" height="${innerH - 8}" rx="15" fill="none" stroke="${secondaryColor}" stroke-width="0.5" stroke-opacity="${opacity * 0.85}" stroke-dasharray="8 3 2 3" />`);

  for (const bandY of [margin + 2, height - margin - 2]) {
    const pts1 = [];
    const pts2 = [];
    const steps = 160;
    for (let i = 0; i <= steps; i++) {
      const x = margin + 16 + (i / steps) * (innerW - 32);
      const w1 = Math.sin(i * 0.35) * 2.2;
      const w2 = Math.cos(i * 0.35) * 2.2;
      pts1.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${(bandY + w1).toFixed(1)}`);
      pts2.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${(bandY + w2).toFixed(1)}`);
    }
    elements.push(`<path d="${pts1.join(' ')}" fill="none" stroke="${strokeColor}" stroke-width="0.45" stroke-opacity="${opacity * 0.9}" />`);
    elements.push(`<path d="${pts2.join(' ')}" fill="none" stroke="${secondaryColor}" stroke-width="0.45" stroke-opacity="${opacity * 0.8}" />`);
  }

  return elements.join('\n');
}

function generateOVIMedallion({
  cx = 865,
  cy = 495,
  radius = 58,
  primaryColor = '#0284c7',
  accentColor = '#f59e0b',
  opacity = 0.24
}) {
  const elements = [];
  const rings = 3;

  for (let r = 1; r <= rings; r++) {
    const R = (r / rings) * radius;
    const rMinor = R * 0.28;
    const p = R * 0.22;
    const pts = [];
    const steps = 240;

    for (let i = 0; i <= steps; i++) {
      const theta = (i / steps) * Math.PI * 2 * 6;
      const x = cx + (R - rMinor) * Math.cos(theta) + p * Math.cos(((R - rMinor) / rMinor) * theta);
      const y = cy + (R - rMinor) * Math.sin(theta) - p * Math.sin(((R - rMinor) / rMinor) * theta);
      pts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    const color = r % 2 === 1 ? primaryColor : accentColor;
    elements.push(`<path d="${pts.join(' ')} Z" fill="none" stroke="${color}" stroke-width="0.5" stroke-opacity="${opacity}" />`);
  }

  elements.push(`<circle cx="${cx}" cy="${cy}" r="${(radius * 1.05).toFixed(1)}" fill="none" stroke="${primaryColor}" stroke-width="0.6" stroke-opacity="${opacity * 0.8}" stroke-dasharray="3 2" />`);
  elements.push(`<circle cx="${cx}" cy="${cy}" r="${(radius * 0.18).toFixed(1)}" fill="none" stroke="${accentColor}" stroke-width="0.7" stroke-opacity="${opacity}" />`);

  return elements.join('\n');
}

function generateFineInkTexture({
  width = 1000,
  height = 630,
  strokeColor = '#334155',
  opacity = 0.08,
  rng
}) {
  const elements = [];

  const cornerSize = 140;
  for (let i = 10; i < cornerSize; i += 6) {
    elements.push(`<line x1="16" y1="${16 + i}" x2="${16 + i}" y2="16" stroke="${strokeColor}" stroke-width="0.4" stroke-opacity="${opacity}" />`);
    elements.push(`<line x1="${width - 16}" y1="${height - 16 - i}" x2="${width - 16 - i}" y2="${height - 16}" stroke="${strokeColor}" stroke-width="0.4" stroke-opacity="${opacity}" />`);
  }

  const numDots = 80;
  for (let d = 0; d < numDots; d++) {
    const x = rng.range(30, width - 30);
    const band = d % 2 === 0 ? rng.range(24, 95) : rng.range(height - 95, height - 24);
    const r = rng.range(0.5, 1.3);
    elements.push(`<circle cx="${x.toFixed(1)}" cy="${band.toFixed(1)}" r="${r.toFixed(1)}" fill="${strokeColor}" fill-opacity="${(opacity * 1.3).toFixed(3)}" />`);
  }

  return elements.join('\n');
}

module.exports = {
  generateSecurityBorder,
  generateOVIMedallion,
  generateFineInkTexture
};
