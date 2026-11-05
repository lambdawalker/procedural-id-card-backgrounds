# Procedural ID Card Backgrounds

Procedural SVG and PNG background generator for synthetic identification-card datasets across 10 distinct US states. Generates 100% original algorithmic vector artwork inspired by inspected public state driver license specimens, featuring coupled mountain-snow geometry, non-linear warped security grids, guilloche rosettes, architectural fluting, and banknote engraving.

## Supported States
1. **Alaska (AK)**: Denali massif silhouette with unified snowcap geometry, Aurora Borealis curtain waves, and braided glacial river curves.
2. **Arkansas (AR)**: Geometric diamond guilloche rosette (Crater of Diamonds), rolling Ozark contours, and Arkansas River curves.
3. **Colorado (CO)**: Multi-tier Rocky Mountains with coupled snowcaps, 48-ray radial sunrise fan, and alpine valley grid.
4. **Idaho (ID)**: Sawtooth mountain serrations with coupled snowcaps, agricultural field furrows, and foothill conifers.
5. **Illinois (IL)**: Classical architectural fluted columns and ionic capitals, Lake Michigan waves, and rolling prairie striations.
6. **Louisiana (LA)**: French Quarter wrought-iron balcony filigree, meandering Mississippi delta waterways, and cypress swamp ripples.
7. **Tennessee (TN)**: Great Smoky Mountains misty rolling ridges, 5-line musical staff waves, and dogwood floral flourishes.
8. **Utah (UT)**: Delicate Arch natural sandstone formation with negative space cutout, sedimentary canyon strata, and Wasatch peaks.
9. **Washington (WA)**: Mount Rainier volcanic cone with coupled glacier snowcaps, coastal evergreen conifers, and Puget Sound waves.
10. **Wyoming (WY)**: Grand Teton jagged peaks with coupled snowcaps and shadow facets, High Plains wind streamlines, and western flourishes.

## Features
- **Strict Unified Geometry**: Snowcaps, mountain peaks, and ridge shading derive mathematically from the exact same ridge vertex coordinates. 0-pixel overflow or manual alignment error.
- **Deterministic & Seedable**: Every design is 100% reproducible from integer or string seeds, with meaningful variation across consecutive seeds.
- **Warped Security Grids**: Smoothly expanding and contracting coordinate grids using non-linear sinusoidal and hyperbolic distortion fields.
- **Configurable Dimensions**: Supports standard CR80 (1012x638, ID-1 300 DPI), display resolutions (856x540), and HiDPI (2024x1276).
- **ID Collision Prevention**: All SVG gradient, pattern, and clip-path definitions are strictly namespaced per state and seed.
- **No Private Data**: Strictly excludes portraits, names, barcodes, official state seals, and state outlines.

## Installation & Testing
```sh
npm test
```
Runs 5 automated verification suites:
1. Mountain & snowcap geometry regression (checks 5,000+ points for 100% silhouette containment)
2. Determinism check (verifies identical SHA256 hashes for identical seeds)
3. Seed variation check (verifies distinct hashes across consecutive seeds)
4. SVG definition ID collision check (verifies unique namespacing)
5. Dimensions, aspect ratio scaling, and input validation
