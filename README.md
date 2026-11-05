# Procedural ID Card Backgrounds

Procedural SVG and PNG background generator for synthetic identification-card datasets across 10 distinct US states. Generates 100% original algorithmic vector artwork inspired by inspected public state driver license specimens, featuring coupled mountain-snow geometry, non-linear warped security grids, guilloche rosettes, architectural fluting, and banknote engraving.

---

## Render Samples (Pass 8 Production Renders)

Each preview below is rendered from the procedural vector code (Seed: 42, CR80 standard 1000x630 aspect ratio):

| State | Render Sample | Composition, Motifs & Palette |
| :--- | :---: | :--- |
| **Alaska (AK)** | <img src="previews/samples/ak.svg" alt="Alaska Procedural Background" width="380" /> | **Motifs**: Denali massif with derived snowcaps, Aurora Borealis curtain waves, braided glacial river.<br>**Palette**: Glacier cyan (`#a8dadc`), ice blue (`#457b9d`), deep arctic navy (`#1d3557`), aurora emerald (`#34d399`). |
| **Arkansas (AR)** | <img src="previews/samples/ar.svg" alt="Arkansas Procedural Background" width="380" /> | **Motifs**: 8-point geometric diamond rosette guilloche (Crater of Diamonds), rolling Ozark contours, Arkansas River curves.<br>**Palette**: Diamond emerald (`#059669`), mint green (`#52b788`), warm parchment (`#fefae0`), river bronze (`#d4a373`). |
| **Colorado (CO)** | <img src="previews/samples/co.svg" alt="Colorado Procedural Background" width="380" /> | **Motifs**: Multi-tier Rocky Mountains with coupled snowcaps and shadow facets, 48-ray radial sunrise fan, alpine valley grid.<br>**Palette**: Mountain slate (`#3d5a80`), alpine cyan (`#98c1d9`), sunrise amber (`#f59e0b`), snow white. |
| **Idaho (ID)** | <img src="previews/samples/id.svg" alt="Idaho Procedural Background" width="380" /> | **Motifs**: Sawtooth mountain range with coupled snowcaps, conifer fractals, Snake River agricultural field furrows.<br>**Palette**: Sage olive (`#606c38`), earth ochre (`#dda15e`), river cobalt (`#2b6cb0`), sky azure (`#e0f2fe`). |
| **Illinois (IL)** | <img src="previews/samples/il.svg" alt="Illinois Procedural Background" width="380" /> | **Motifs**: Classical architectural fluted columns with Ionic capitals, Lake Michigan wave ribbons, rolling prairie striations.<br>**Palette**: Limestone gray (`#cbd5e1`), Lake Michigan blue (`#0077b6`), cornflower blue (`#3a86ff`), prairie gold (`#d4a373`). |
| **Louisiana (LA)** | <img src="previews/samples/la.svg" alt="Louisiana Procedural Background" width="380" /> | **Motifs**: French Quarter wrought-iron balcony filigree, meandering Mississippi delta waterways, cypress swamp ripples.<br>**Palette**: Bayou indigo (`#0f172a`), wrought-iron brass (`#ca8a04`), warm gold (`#eab308`), cypress moss (`#3f6212`). |
| **Tennessee (TN)** | <img src="previews/samples/tn.svg" alt="Tennessee Procedural Background" width="380" /> | **Motifs**: Great Smoky Mountains misty ridges, 5-line musical staff waves in gold, dogwood floral petal flourishes.<br>**Palette**: Smoky twilight violet (`#4338ca`), slate lavender (`#64748b`), music gold (`#fbbf24`), dogwood pink (`#f472b6`). |
| **Utah (UT)** | <img src="previews/samples/ut.svg" alt="Utah Procedural Background" width="380" /> | **Motifs**: Delicate Arch natural sandstone formation with window cutout, horizontal red rock canyon strata, Wasatch alpine peaks.<br>**Palette**: Terracotta red (`#9c4221`), canyon rust (`#c2410c`), sandstone amber (`#d97706`), desert sky (`#1e3a8a`). |
| **Washington (WA)** | <img src="previews/samples/wa.svg" alt="Washington Procedural Background" width="380" /> | **Motifs**: Mount Rainier volcanic cone with coupled glacier tongues, coastal conifers, Puget Sound maritime wave guilloche.<br>**Palette**: Pacific evergreen (`#14532d`), marine blue (`#1e40af`), Puget sky (`#0284c7`), glacial frost (`#e0f2fe`). |
| **Wyoming (WY)** | <img src="previews/samples/wy.svg" alt="Wyoming Procedural Background" width="380" /> | **Motifs**: Grand Teton jagged peaks with coupled shadow facets, High Plains wind streamline vectors, western engraved corner flourishes.<br>**Palette**: Teton slate (`#334155`), prairie gold (`#d97706`), western ochre (`#b45309`), sky cobalt (`#1d4ed8`). |

---

## Key Technical Requirements & Design Architecture

### 1. Geometry Containment Engine (`src/geometry.js`)
Snowcaps, mountain peaks, shading, and engraving derive from the exact same underlying ridge geometry vertices. Rather than overlaying independent triangles by eye, the snowcap polygon traces the actual mountain silhouette ridge vertices and connects them via an internal snowline path strictly contained within the mountain boundaries:
- **100% Mathematical Containment**: Verified by automated regression tests sampling 5,122 points across 50 random seeds with zero border overshoot.
- **Shared Sunward / Leeward Ridge Shading**: Mountain facets split cleanly along the true peak summit coordinates.

### 2. Smoothly Warped Security Grids (`src/components/warpedGrid.js`)
Implements continuous, non-linear coordinate grids with variable-frequency spacing across horizontal and vertical axes:
- Non-linear sinusoidal, radial, and hyperbolic warp functions ensure grid spacing expands and contracts smoothly across the card without harsh frequency jumps.
- Calibrated line weights (0.5px) and opacities (0.11 - 0.14) provide authentic security texture while maintaining legibility for text and photo overlays.

### 3. Collision-Proof Definition Scoping
Every generated SVG dynamically prefixes all gradient, pattern, and clip-path IDs using `${stateCode}_${seed}` (e.g. `co_s42_sky`), guaranteeing zero ID collisions when multiple state designs are embedded together in a single document or web page.

### 4. Deterministic Seeds & Meaningful Variation
- Mulberry32 pseudo-random number generator (`src/rng.js`) ensures exact bitwise repeatability for any given seed.
- Consecutive seeds (e.g. seed 42 vs. 43) produce distinct physical variations (peak displacement, ridge roughness, river flow paths) while strictly preserving composition identity and geometric containment.

---

## CLI & Batch Generation Usage

### Generate All State Backgrounds (SVG & PNG)
```sh
# Generate standard CR80 resolution (1000x630) with production seed 42
node src/cli.js --state all --seed 42 --format both --outdir dist --manifest manifest.json
```

### Generate a Single State with Custom Dimensions
```sh
# Generate Colorado with high-res dimensions (2024x1276)
node src/cli.js --state CO --seed 100 --width 2024 --height 1276 --format png --outdir output
```

### Batch Export with Consecutive Seeds
```sh
# Export 20 consecutive seed variations for Alaska
node src/cli.js --state AK --seed 1000 --count 20 --format svg --outdir dist/alaska_batch
```

---

## Automated Verification Suite

Run the full automated test suite:
```sh
npm test
```

Includes 5 test suites:
1. `test/geometry.test.js`: Mountain and snowcap polygon containment (5,122 checks across 50 seeds, 100% passed).
2. `test/determinism.test.js`: Deterministic repeatability across all 10 states (identical SHA256 hashes).
3. `test/seed_variation.test.js`: Variation check across consecutive seeds (distinct hashes).
4. `test/id_collision.test.js`: SVG definition ID collision check (22 IDs checked, 0 collisions).
5. `test/dimensions.test.js`: Custom dimensions, viewBox scaling, and invalid input boundary validation.

---

## Review Passes Documentation
The eight review-and-render passes are recorded in [`docs/reviews/`](docs/reviews/):
- [`PASS_1.md`](docs/reviews/PASS_1.md): Initial layout composition and reference baseline
- [`PASS_2.md`](docs/reviews/PASS_2.md): Harmonic flow ribbons and contrast balancing
- [`PASS_3.md`](docs/reviews/PASS_3.md): Geometric mountain and snowcap ridge alignment audit
- [`PASS_4.md`](docs/reviews/PASS_4.md): Regional cultural, architectural, and botanical motif execution
- [`PASS_5.md`](docs/reviews/PASS_5.md): Non-linear warped security grid dynamics and smooth spacing
- [`PASS_6.md`](docs/reviews/PASS_6.md): Banknote engraving strokes, micro-texture, and line quality
- [`PASS_7.md`](docs/reviews/PASS_7.md): Multi-seed variation (seed 42 vs 43) and dimension stress testing
- [`PASS_8.md`](docs/reviews/PASS_8.md): Final production acceptance, CR80 resolution batch, and checksum manifest verification
