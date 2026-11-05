const assert = require('assert');
const { PRNG } = require('../src/rng');
const {
  pointInPolygon,
  generateRidgePolyline,
  deriveMountainComponents
} = require('../src/geometry');

console.log('Running Mountain/Snowcap Geometry Regression Test...');

let totalChecks = 0;
let passes = 0;

for (let seed = 1; seed <= 50; seed++) {
  const localRng = new PRNG(seed);
  const startX = 0;
  const endX = 1000;
  const baseY = 600;
  const peakX = localRng.range(300, 700);
  const peakY = localRng.range(150, 300);

  const { points, peakIndex } = generateRidgePolyline({
    startX,
    endX,
    baseY,
    peakX,
    peakY,
    segments: 50,
    roughness: 0.6,
    rng: localRng
  });

  const { mountainPolygon, snowcapPolygon } = deriveMountainComponents({
    ridgePoints: points,
    peakIndex,
    baseY,
    snowDropFraction: 0.35,
    rng: localRng
  });

  for (const vertex of snowcapPolygon) {
    totalChecks++;
    const isInside = pointInPolygon(vertex, mountainPolygon);
    assert(isInside, `Snow vertex [${vertex}] must be inside mountain silhouette for seed ${seed}`);
    passes++;
  }

  const minSnowX = Math.min(...snowcapPolygon.map(p => p[0]));
  const maxSnowX = Math.max(...snowcapPolygon.map(p => p[0]));

  for (let s = 1; s <= 20; s++) {
    const sampleX = minSnowX + (s / 21) * (maxSnowX - minSnowX);

    let ridgeY = null;
    for (let j = 0; j < points.length - 1; j++) {
      if (sampleX >= points[j][0] && sampleX <= points[j + 1][0]) {
        const u = (sampleX - points[j][0]) / Math.max(0.001, points[j + 1][0] - points[j][0]);
        ridgeY = points[j][1] + u * (points[j + 1][1] - points[j][1]);
        break;
      }
    }

    if (ridgeY !== null) {
      for (let t = 0.2; t <= 0.8; t += 0.3) {
        const sampleY = ridgeY + t * 25;
        if (sampleY < baseY) {
          totalChecks++;
          const isInside = pointInPolygon([sampleX, sampleY], mountainPolygon);
          assert(isInside, `Interior snow sample [${sampleX}, ${sampleY}] must be inside mountain silhouette`);
          passes++;
        }
      }
    }
  }
}

console.log(`PASS: ${passes}/${totalChecks} geometry regression checks verified with 100% containment.`);
