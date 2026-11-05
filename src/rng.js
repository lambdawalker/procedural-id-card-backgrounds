// Deterministic pseudo-random number generator (Mulberry32)
// Ensures reproducible output from numeric or string seeds.

class PRNG {
  constructor(seed = 1) {
    this.seed = this._normalizeSeed(seed);
    this.state = this.seed >>> 0;
  }

  _normalizeSeed(seed) {
    if (typeof seed === 'number') {
      return (seed >>> 0) || 1;
    }
    if (typeof seed === 'string') {
      let hash = 0;
      for (let i = 0; i < seed.length; i++) {
        hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
      }
      return (hash >>> 0) || 1;
    }
    return 1;
  }

  // Returns float in [0, 1)
  random() {
    let t = (this.state += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  // Float in [min, max)
  range(min, max) {
    return min + (max - min) * this.random();
  }

  // Integer in [min, max]
  rangeInt(min, max) {
    return Math.floor(this.range(min, max + 1));
  }

  // Pick random item from array
  pick(arr) {
    if (!arr || arr.length === 0) return null;
    return arr[Math.floor(this.random() * arr.length)];
  }

  // Normal distribution around mean with given stdDev (Box-Muller)
  gaussian(mean = 0, stdDev = 1) {
    const u1 = Math.max(1e-10, this.random());
    const u2 = this.random();
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    return mean + z0 * stdDev;
  }
}

module.exports = { PRNG };
