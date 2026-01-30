/**
 * Build script for generating icon templates
 */

const fs = require('fs');
const path = require('path');

const LOTTIE_DIR = path.join(__dirname, '..', 'lottie-json');
const OUTPUT_FILE = path.join(__dirname, '..', 'src-v2', 'icons', 'index.ts');

function buildIcons() {
  const files = fs.readdirSync(LOTTIE_DIR).filter(f => f.endsWith('.json'));

  const icons = {};
  const metadata = [];

  files.forEach(file => {
    const name = file.replace('.json', '');
    const content = fs.readFileSync(path.join(LOTTIE_DIR, file), 'utf8');
    icons[name] = JSON.parse(content);

    // Determine category from name
    let category = 'misc';
    if (name.startsWith('weather')) category = 'weather';
    else if (name.includes('alert')) category = 'alerts';
    else if (name.includes('sofa') || name.includes('home')) category = 'home';

    metadata.push({
      name,
      category,
      keywords: name.split('-')
    });
  });

  const output = `/**
 * Studio Icons v2.0 - Icon Templates
 * Auto-generated - Do not edit manually
 */

import type { LottieAnimationData, IconMetadata } from '../types';

export const iconTemplates: Record<string, LottieAnimationData> = ${JSON.stringify(icons, null, 2)};

export const iconMetadata: IconMetadata[] = ${JSON.stringify(metadata, null, 2)};

export const iconNames = Object.keys(iconTemplates);

export const iconCount = iconNames.length;
`;

  // Ensure directory exists
  const dir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, output);

  console.log(`Generated ${files.length} icons to ${OUTPUT_FILE}`);
}

buildIcons();
