// Mathematical geometry primitives and unified mountain/layered silhouette engine.
// Guarantees that snowcaps, mountain peaks, and shading derive strictly from shared geometry.

function pointInPolygon(point, polygon, epsilon = 0.5) {
  const [px, py] = point;
  const n = polygon.length;

  for (let i = 0, j = n - 1; i < n; j = i++) {
    const [x1, y1] = polygon[j];
    const [x2, y2] = polygon[i];

    if (Math.hypot(px - x1, py - y1) <= epsilon) return true;
    if (Math.hypot(px - x2, py - y2) <= epsilon) return true;

    const dx = x2 - x1;
    const dy = y2 - y1;
    const lenSq = dx * dx + dy * dy;
    if (lenSq > 0) {
      const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / lenSq));
      const projX = x1 + t * dx;
      const projY = y1 + t * dy;
      if (Math.hypot(px - projX, py - projY) <= epsilon) {
        return true;
      }
    }
  }

  let inside = false;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];

    const intersect = ((yi > py) !== (yj > py)) &&
      (px < (xj - xi) * (py - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

function lerpPoint(p1, p2, t) {
  return [
    p1[0] + (p2[0] - p1[0]) * t,
    p1[1] + (p2[1] - p1[1]) * t,
  ];
}

function distance(p1, p2) {
  const dx = p2[0] - p1[0];
  const dy = p2[1] - p1[1];
  return Math.hypot(dx, dy);
}

function generateRidgePolyline({
  startX,
  endX,
  baseY,
  peakX,
  peakY,
  segments = 56,
  roughness = 0.5,
  rng
}) {
  const points = [];
  const totalSteps = segments;
  const phase1 = rng.range(0, Math.PI * 2);
  const phase2 = rng.range(0, Math.PI * 2);

  for (let i = 0; i <= totalSteps; i++) {
    const t = i / totalSteps;
    const x = startX + t * (endX - startX);
    let y;

    if (x <= peakX) {
      const u = (x - startX) / Math.max(1, peakX - startX);
      const profile = Math.pow(u, 1.35);
      y = baseY - (baseY - peakY) * profile;
    } else {
      const u = (x - peakX) / Math.max(1, endX - peakX);
      const profile = Math.pow(1 - u, 1.35);
      y = baseY - (baseY - peakY) * profile;
    }

    const distFromPeak = Math.abs(x - peakX) / Math.max(1, (endX - startX) * 0.5);
    const edgeEnvelope = Math.sin(t * Math.PI);
    const peakZeroEnvelope = Math.min(1, distFromPeak * 3.5);

    if (i !== 0 && i !== totalSteps && Math.abs(x - peakX) > 12) {
      const crag1 = Math.sin(t * Math.PI * 7 + phase1) * roughness * 18;
      const crag2 = Math.cos(t * Math.PI * 15 + phase2) * roughness * 9;
      const micro = (rng.random() - 0.5) * roughness * 14;
      y += (crag1 + crag2 + micro) * edgeEnvelope * peakZeroEnvelope;
      y = Math.max(peakY + 2, Math.min(baseY - 2, y));
    }

    points.push([Math.round(x * 10) / 10, Math.round(y * 10) / 10]);
  }

  let closestIdx = 1;
  let minDx = Infinity;
  for (let i = 1; i < points.length - 1; i++) {
    const dx = Math.abs(points[i][0] - peakX);
    if (dx < minDx) {
      minDx = dx;
      closestIdx = i;
    }
  }
  points[closestIdx] = [Math.round(peakX * 10) / 10, Math.round(peakY * 10) / 10];

  return { points, peakIndex: closestIdx };
}

function deriveMountainComponents({
  ridgePoints,
  peakIndex,
  baseY,
  snowDropFraction = 0.35,
  rng
}) {
  const n = ridgePoints.length;
  const peak = ridgePoints[peakIndex];
  const peakY = peak[1];
  const mountainHeight = baseY - peakY;
  const targetSnowY = peakY + mountainHeight * snowDropFraction;

  const startX = ridgePoints[0][0];
  const endX = ridgePoints[n - 1][0];
  const mountainPolygon = [
    [startX, baseY],
    ...ridgePoints,
    [endX, baseY]
  ];

  let leftSnowIdx = peakIndex;
  while (leftSnowIdx > 0 && ridgePoints[leftSnowIdx][1] < targetSnowY) {
    leftSnowIdx--;
  }

  let rightSnowIdx = peakIndex;
  while (rightSnowIdx < n - 1 && ridgePoints[rightSnowIdx][1] < targetSnowY) {
    rightSnowIdx++;
  }

  const upperSnowRidge = ridgePoints.slice(leftSnowIdx, rightSnowIdx + 1);

  const lowerSnowBorder = [];
  const innerSteps = 16;
  const pLeft = ridgePoints[leftSnowIdx];
  const pRight = ridgePoints[rightSnowIdx];

  for (let i = innerSteps; i >= 0; i--) {
    const t = i / innerSteps;
    const curX = pLeft[0] + t * (pRight[0] - pLeft[0]);

    let localRidgeY = peakY;
    for (let j = leftSnowIdx; j < rightSnowIdx; j++) {
      if (curX >= ridgePoints[j][0] && curX <= ridgePoints[j + 1][0]) {
        const u = (curX - ridgePoints[j][0]) / Math.max(0.001, ridgePoints[j + 1][0] - ridgePoints[j][0]);
        localRidgeY = ridgePoints[j][1] + u * (ridgePoints[j + 1][1] - ridgePoints[j][1]);
        break;
      }
    }

    const centerWeight = Math.sin(t * Math.PI);
    const couloirFinger = Math.sin(t * Math.PI * 5) * (mountainHeight * 0.08) * centerWeight;
    const randomJagged = (rng.random() - 0.35) * (mountainHeight * 0.07) * centerWeight;
    const desiredY = pLeft[1] + t * (pRight[1] - pLeft[1]) + (mountainHeight * 0.12 * centerWeight) + couloirFinger + randomJagged;

    const snowBaseY = Math.min(baseY - 6, Math.max(localRidgeY + 2.5, desiredY));
    lowerSnowBorder.push([Math.round(curX * 10) / 10, Math.round(snowBaseY * 10) / 10]);
  }

  const snowcapPolygon = [
    ...upperSnowRidge,
    ...lowerSnowBorder
  ];

  const shadowRidge = ridgePoints.slice(peakIndex);
  const aretePoints = [];
  const areteSteps = 8;
  for (let s = areteSteps; s >= 1; s--) {
    const v = s / areteSteps;
    const ay = peak[1] + v * (baseY - peak[1]);
    const ax = peak[0] + Math.sin(v * Math.PI * 2) * 18 * v;
    aretePoints.push([Math.round(ax * 10) / 10, Math.round(ay * 10) / 10]);
  }

  const shadowPolygon = [
    ...aretePoints,
    ...shadowRidge,
    [endX, baseY]
  ];

  return {
    mountainPolygon,
    snowcapPolygon,
    shadowPolygon
  };
}

function polygonToPathData(polygon) {
  if (!polygon || polygon.length === 0) return '';
  const d = polygon.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ');
  return `${d} Z`;
}

module.exports = {
  pointInPolygon,
  lerpPoint,
  distance,
  generateRidgePolyline,
  deriveMountainComponents,
  polygonToPathData
};
