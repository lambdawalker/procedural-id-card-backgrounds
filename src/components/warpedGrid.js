// Smoothly expanding and contracting warped security grid component.
// Uses non-linear distortion fields to ensure continuous smooth frequency transitions.

function generateWarpedGrid({
  width = 1000,
  height = 630,
  numH = 24,
  numV = 36,
  warpField = 'sine',
  amplitude = 18,
  strokeColor = '#3b82f6',
  opacity = 0.15,
  strokeWidth = 0.75,
  rng
}) {
  const paths = [];

  function getDisplacement(x, y) {
    const nx = x / width;
    const ny = y / height;

    if (warpField === 'sine') {
      const dx = Math.sin(ny * Math.PI * 3 + (nx * 2)) * amplitude;
      const dy = Math.cos(nx * Math.PI * 2.5 + (ny * 1.5)) * amplitude;
      return { dx, dy };
    } else if (warpField === 'radial') {
      const cx = width * 0.5;
      const cy = height * 0.5;
      const dist = Math.hypot(x - cx, y - cy) / Math.hypot(cx, cy);
      const factor = Math.sin(dist * Math.PI * 2) * amplitude;
      return { dx: factor * (x - cx) / (dist * width + 1), dy: factor * (y - cy) / (dist * height + 1) };
    } else if (warpField === 'pinch') {
      const nxCenter = (nx - 0.5) * 2;
      const nyCenter = (ny - 0.5) * 2;
      const r = nxCenter * nxCenter + nyCenter * nyCenter;
      const warp = Math.exp(-r * 1.8) * amplitude * 1.5;
      return { dx: -nxCenter * warp, dy: -nyCenter * warp };
    } else {
      const dx = Math.sin(nx * 4) * Math.cos(ny * 3) * amplitude;
      const dy = Math.cos(nx * 3) * Math.sin(ny * 4) * amplitude;
      return { dx, dy };
    }
  }

  for (let i = 0; i <= numH; i++) {
    const v = i / numH;
    const smoothV = 0.5 * (1 - Math.cos(v * Math.PI));
    const baseProgress = 0.3 * v + 0.7 * smoothV;
    const baseY = baseProgress * height;

    const points = [];
    const steps = 60;
    for (let s = 0; s <= steps; s++) {
      const baseX = (s / steps) * width;
      const { dx, dy } = getDisplacement(baseX, baseY);
      points.push([Math.round((baseX + dx) * 10) / 10, Math.round((baseY + dy) * 10) / 10]);
    }

    const d = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ');
    paths.push(`<path d="${d}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-opacity="${opacity}" />`);
  }

  for (let j = 0; j <= numV; j++) {
    const u = j / numV;
    const smoothU = 0.5 * (1 - Math.cos(u * Math.PI));
    const baseProgress = 0.35 * u + 0.65 * smoothU;
    const baseX = baseProgress * width;

    const points = [];
    const steps = 50;
    for (let s = 0; s <= steps; s++) {
      const baseY = (s / steps) * height;
      const { dx, dy } = getDisplacement(baseX, baseY);
      points.push([Math.round((baseX + dx) * 10) / 10, Math.round((baseY + dy) * 10) / 10]);
    }

    const d = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ');
    paths.push(`<path d="${d}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-opacity="${opacity}" />`);
  }

  return paths.join('\n');
}

module.exports = { generateWarpedGrid };
