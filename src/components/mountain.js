// Mountain landscape component with mathematically coupled snowcaps, shading, and ridge lines.

const {
  generateRidgePolyline,
  deriveMountainComponents,
  polygonToPathData
} = require('../geometry');

function renderMountainRange({
  startX = 0,
  endX = 1000,
  baseY = 500,
  peaks = [
    { x: 500, y: 220, snowDrop: 0.35 }
  ],
  mountainColor = '#3d5a80',
  shadowColor = '#1d3557',
  snowColor = '#f8fafc',
  ridgeColor = '#94a3b8',
  roughness = 0.55,
  idPrefix = 'mtn',
  rng
}) {
  const elements = [];

  peaks.forEach((peakConfig) => {
    const peakX = peakConfig.x;
    const peakY = peakConfig.y;
    const snowDrop = peakConfig.snowDrop || 0.35;

    const { points, peakIndex } = generateRidgePolyline({
      startX,
      endX,
      baseY,
      peakX,
      peakY,
      segments: 50,
      roughness,
      rng
    });

    const {
      mountainPolygon,
      snowcapPolygon,
      shadowPolygon
    } = deriveMountainComponents({
      ridgePoints: points,
      peakIndex,
      baseY,
      snowDropFraction: snowDrop,
      rng
    });

    const mountainPath = polygonToPathData(mountainPolygon);
    const shadowPath = polygonToPathData(shadowPolygon);
    const snowcapPath = polygonToPathData(snowcapPolygon);

    const ridgeD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ');

    elements.push(`<path d="${mountainPath}" fill="${mountainColor}" fill-opacity="0.85" />`);
    elements.push(`<path d="${shadowPath}" fill="${shadowColor}" fill-opacity="0.3" />`);
    elements.push(`<path d="${snowcapPath}" fill="${snowColor}" fill-opacity="0.9" />`);
    elements.push(`<path d="${ridgeD}" fill="none" stroke="${ridgeColor}" stroke-width="1.2" stroke-opacity="0.65" />`);
  });

  return elements.join('\n');
}

module.exports = { renderMountainRange };
