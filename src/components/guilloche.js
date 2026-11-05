// Mathematical guilloche generator for security patterns, rosettes, and harmonic ribbons.

function generateGuillocheRosette({
  cx = 500,
  cy = 315,
  R = 120,
  r = 35,
  p = 28,
  cycles = 12,
  steps = 720,
  strokeColor = '#4f46e5',
  strokeWidth = 0.6,
  opacity = 0.2
}) {
  const points = [];
  const totalAngle = 2 * Math.PI * cycles;

  for (let i = 0; i <= steps; i++) {
    const theta = (i / steps) * totalAngle;
    const x = cx + (R - r) * Math.cos(theta) + p * Math.cos(((R - r) / r) * theta);
    const y = cy + (R - r) * Math.sin(theta) - p * Math.sin(((R - r) / r) * theta);
    points.push([Math.round(x * 10) / 10, Math.round(y * 10) / 10]);
  }

  const d = points.map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${pt[0]} ${pt[1]}`).join(' ');
  return `<path d="${d}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-opacity="${opacity}" />`;
}

function generateWaveRibbonCluster({
  startX = 0,
  endX = 1000,
  baseY = 300,
  amplitude = 25,
  frequency = 0.006,
  numLines = 7,
  lineSpacing = 4,
  strokeColor = '#0284c7',
  strokeWidth = 0.5,
  opacity = 0.22,
  secondaryFreq = 0.015,
  secondaryAmp = 8
}) {
  const paths = [];
  const steps = 120;

  for (let l = 0; l < numLines; l++) {
    const offset = (l - (numLines - 1) / 2) * lineSpacing;
    const phaseShift = l * 0.15;
    const points = [];

    for (let s = 0; s <= steps; s++) {
      const x = startX + (s / steps) * (endX - startX);
      const wave1 = Math.sin(x * frequency + phaseShift) * amplitude;
      const wave2 = Math.cos(x * secondaryFreq + phaseShift * 1.5) * secondaryAmp;
      const y = baseY + offset + wave1 + wave2;
      points.push([Math.round(x * 10) / 10, Math.round(y * 10) / 10]);
    }

    const d = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ');
    paths.push(`<path d="${d}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-opacity="${opacity}" />`);
  }

  return paths.join('\n');
}

function generateRadialFan({
  cx = 500,
  cy = 300,
  innerRadius = 30,
  outerRadius = 240,
  numRays = 36,
  strokeColor = '#f59e0b',
  strokeWidth = 0.5,
  opacity = 0.18,
  waveModulation = 6
}) {
  const lines = [];

  for (let i = 0; i < numRays; i++) {
    const angle = (i / numRays) * 2 * Math.PI;
    const rayOuter = outerRadius + Math.sin(angle * waveModulation) * 15;
    const x1 = cx + innerRadius * Math.cos(angle);
    const y1 = cy + innerRadius * Math.sin(angle);
    const x2 = cx + rayOuter * Math.cos(angle);
    const y2 = cy + rayOuter * Math.sin(angle);

    lines.push(`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-opacity="${opacity}" />`);
  }

  return lines.join('\n');
}

module.exports = {
  generateGuillocheRosette,
  generateWaveRibbonCluster,
  generateRadialFan
};
