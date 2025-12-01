#!/usr/bin/env node

/**
 * Generate Logo Variants Script
 *
 * Generuje białe i czarne wersje logo na podstawie kolorowej wersji SVG
 *
 * Użycie:
 *   node scripts/generate-logo-variants.js
 *   node scripts/generate-logo-variants.js --input=custom-logo.svg
 */

const fs = require('fs');
const path = require('path');

// Konfiguracja
const INPUT_FILE = process.argv.find(arg => arg.startsWith('--input='))?.split('=')[1]
  || 'public/assets/logo/safaia-full-color.svg';

const OUTPUT_DIR = 'public/assets/logo';

// Upewnij się że folder istnieje
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Zamienia kolory w SVG
 */
function replaceColors(svgContent, targetColor) {
  // Zamień wszystkie fill colors
  let result = svgContent.replace(/fill="#[0-9A-Fa-f]{6}"/g, `fill="${targetColor}"`);
  result = result.replace(/fill='#[0-9A-Fa-f]{6}'/g, `fill='${targetColor}'`);

  // Zamień wszystkie stroke colors
  result = result.replace(/stroke="#[0-9A-Fa-f]{6}"/g, `stroke="${targetColor}"`);
  result = result.replace(/stroke='#[0-9A-Fa-f]{6}'/g, `stroke='${targetColor}'`);

  // Zamień fill="rgb(...)"
  result = result.replace(/fill="rgb\([^)]+\)"/g, `fill="${targetColor}"`);
  result = result.replace(/fill='rgb\([^)]+\)'/g, `fill='${targetColor}'`);

  // Zamień style="fill:..."
  result = result.replace(/style="([^"]*?)fill:\s*#[0-9A-Fa-f]{6}/g, `style="$1fill:${targetColor}`);
  result = result.replace(/style='([^']*?)fill:\s*#[0-9A-Fa-f]{6}/g, `style='$1fill:${targetColor}`);

  return result;
}

/**
 * Generuje warianty dla danego typu logo
 */
function generateVariants(inputPath, baseName) {
  console.log(`\n📝 Processing: ${inputPath}`);

  if (!fs.existsSync(inputPath)) {
    console.log(`⚠️  File not found: ${inputPath}`);
    return;
  }

  const svgContent = fs.readFileSync(inputPath, 'utf8');

  // Wersja biała
  const whiteLogo = replaceColors(svgContent, '#FFFFFF');
  const whitePath = path.join(OUTPUT_DIR, `${baseName}-white.svg`);
  fs.writeFileSync(whitePath, whiteLogo);
  console.log(`✅ Generated: ${whitePath}`);

  // Wersja czarna
  const blackLogo = replaceColors(svgContent, '#000000');
  const blackPath = path.join(OUTPUT_DIR, `${baseName}-black.svg`);
  fs.writeFileSync(blackPath, blackLogo);
  console.log(`✅ Generated: ${blackPath}`);

  // Kopiuj oryginalną wersję kolorową (jeśli nie istnieje)
  const colorPath = path.join(OUTPUT_DIR, `${baseName}-color.svg`);
  if (!fs.existsSync(colorPath) || inputPath !== colorPath) {
    fs.copyFileSync(inputPath, colorPath);
    console.log(`✅ Copied: ${colorPath}`);
  }
}

/**
 * Main
 */
function main() {
  console.log('🎨 Generating logo variants...\n');
  console.log(`Input file: ${INPUT_FILE}`);
  console.log(`Output directory: ${OUTPUT_DIR}\n`);

  // Sprawdź czy plik wejściowy istnieje
  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`❌ Error: Input file not found: ${INPUT_FILE}`);
    console.log('\n💡 Tip: Place your logo SVG in public/assets/logo/ and name it safaia-full-color.svg');
    console.log('   Or specify custom input: --input=path/to/your/logo.svg\n');
    process.exit(1);
  }

  // Wykryj typ logo z nazwy pliku
  const fileName = path.basename(INPUT_FILE, '.svg');
  const baseName = fileName.replace(/-color$/, '');

  // Generuj warianty
  generateVariants(INPUT_FILE, baseName);

  // Jeśli masz inne typy logo (mark, text), możesz je też przetworzyć
  const logoTypes = ['safaia-full', 'safaia-mark', 'safaia-text'];

  logoTypes.forEach(type => {
    const colorPath = path.join(OUTPUT_DIR, `${type}-color.svg`);

    if (fs.existsSync(colorPath) && colorPath !== INPUT_FILE) {
      generateVariants(colorPath, type);
    }
  });

  console.log('\n✨ Done! Logo variants generated successfully.\n');
  console.log('📁 Files created:');

  // Lista wygenerowanych plików
  const files = fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.svg'));
  files.forEach(file => {
    const filePath = path.join(OUTPUT_DIR, file);
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`   ${file.padEnd(30)} ${sizeKB.padStart(8)} KB`);
  });

  console.log('\n💡 Next steps:');
  console.log('   1. Review the generated SVG files');
  console.log('   2. Optimize them: npm install -g svgo && svgo -f public/assets/logo');
  console.log('   3. Generate PNG/WebP: node scripts/generate-logo-images.js');
  console.log('   4. Generate favicons: node scripts/generate-favicons.js\n');
}

// Uruchom
if (require.main === module) {
  main();
}

module.exports = { replaceColors, generateVariants };
