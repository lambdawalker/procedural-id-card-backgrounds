const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');
const { generateBackground, getSupportedStates, normalizeStateCode } = require('./index');

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    state: 'all',
    seed: 42,
    count: 1,
    width: 1000,
    height: 630,
    format: 'svg',
    outdir: './dist',
    manifest: null
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--state' || arg === '-s') options.state = args[++i];
    else if (arg === '--seed') options.seed = parseInt(args[++i], 10);
    else if (arg === '--count' || arg === '-n') options.count = parseInt(args[++i], 10);
    else if (arg === '--width' || arg === '-w') options.width = parseInt(args[++i], 10);
    else if (arg === '--height' || arg === '-h') options.height = parseInt(args[++i], 10);
    else if (arg === '--format' || arg === '-f') options.format = args[++i].toLowerCase();
    else if (arg === '--outdir' || arg === '-o') options.outdir = args[++i];
    else if (arg === '--manifest' || arg === '-m') options.manifest = args[++i];
  }

  return options;
}

function computeSha256(filePath) {
  const buffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

function run() {
  const opts = parseArgs();
  const states = opts.state.toLowerCase() === 'all'
    ? getSupportedStates().map(s => s.code)
    : [normalizeStateCode(opts.state)];

  if (!states[0]) {
    console.error(`Invalid state: ${opts.state}`);
    process.exit(1);
  }

  fs.mkdirSync(opts.outdir, { recursive: true });
  const manifestEntries = [];

  for (const st of states) {
    for (let c = 0; c < opts.count; c++) {
      const curSeed = opts.seed + c;
      const baseName = `${st.toLowerCase()}_seed_${curSeed}`;
      const svgPath = path.join(opts.outdir, `${baseName}.svg`);

      const svgContent = generateBackground({
        state: st,
        seed: curSeed,
        width: opts.width,
        height: opts.height,
        idPrefix: `${st.toLowerCase()}_s${curSeed}`
      });

      fs.writeFileSync(svgPath, svgContent, 'utf-8');

      let exportedFile = svgPath;
      if (opts.format === 'png' || opts.format === 'both') {
        const pngPath = path.join(opts.outdir, `${baseName}.png`);
        const converterScript = path.join(__dirname, '../scripts/svg_to_png.py');
        execFileSync('python3', [converterScript, svgPath, pngPath, String(opts.width), String(opts.height)]);
        exportedFile = pngPath;
      }

      const sha = computeSha256(exportedFile);
      manifestEntries.push({
        filename: path.basename(exportedFile),
        state: st,
        seed: curSeed,
        width: opts.width,
        height: opts.height,
        format: opts.format,
        sha256: sha
      });
    }
  }

  if (opts.manifest) {
    const manifestPath = path.isAbsolute(opts.manifest)
      ? opts.manifest
      : path.join(opts.outdir, opts.manifest);
    fs.writeFileSync(manifestPath, JSON.stringify(manifestEntries, null, 2), 'utf-8');
    console.log(`Manifest written to ${manifestPath} (${manifestEntries.length} records)`);
  }

  console.log(`Generated ${manifestEntries.length} file(s) in ${opts.outdir}`);
}

if (require.main === module) {
  run();
}

module.exports = { run };
