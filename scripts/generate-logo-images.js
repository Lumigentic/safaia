#!/usr/bin/env node

/**
 * Generate Logo Images Script
 *
 * Generuje PNG i WebP w różnych rozmiarach z plików SVG
 *
 * Wymaga: npm install sharp
 *
 * Użycie:
 *   node scripts/generate-logo-images.js
 *   node scripts/generate-logo-images.js --formats=png,webp
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Konfiguracja
const LOGO_DIR = 'public/assets/logo';
const FORMATS = (process.argv.find(arg => arg.startsWith('--formats='))?.split('=')[1] || 'png,webp').split(',');

// Rozmiary dla różnych typów logo
const SIZES = {
  'safaia-full': { width: 540, height: 750 },   // Aspect 0.72
  'safaia-mark': { width: 370, height: 370 },   // Aspect 1.0
  'safaia-text': { width: 400, height: 120 },   // Aspect 3.33
};

const VARIANTS = ['color', 'white', 'black'];
const SCALES = [1, 2]; // 1x and 2x (Retina)

/**
 * Generuj obrazki dla jednego pliku SVG
 */
async function generateImages(svgPath, dimensions, variant, logoType) {
  const fileName = path.basename(svgPath, '.svg');

  for (const format of FORMATS) {
    for (const scale of SCALES) {
      const width = dimensions.width * scale;
      const height = dimensions.height * scale;
      const suffix = scale > 1 ? `@${scale}x` : '';
      const outputPath = path.join(LOGO_DIR, `${fileName}${suffix}.${format}`);

      try {
        await sharp(svgPath)
          .resize(width, height, {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 }, // Transparent background
          })
          [format]({
            quality: 90,
            ...(format === 'webp' && { lossless: false }),
            ...(format === 'png' && { compressionLevel: 9, palette: true }),
          })
          .toFile(outputPath);

        const stats = fs.statSync(outputPath);
        const sizeKB = (stats.size / 1024).toFixed(2);
        console.log(`   ✅ ${format.toUpperCase()} ${width}x${height} → ${sizeKB} KB`);

      } catch (error) {
        console.error(`   ❌ Failed to generate ${outputPath}:`, error.message);
      }
    }
  }
}

/**
 * Main
 */
async function main() {
  console.log('🖼️  Generating logo images from SVG...\n');
  console.log(`Directory: ${LOGO_DIR}`);
  console.log(`Formats: ${FORMATS.join(', ')}`);
  console.log(`Scales: ${SCALES.join('x, ')}x (Retina)\n`);

  // Sprawdź czy sharp jest zainstalowany
  try {
    require.resolve('sharp');
  } catch (e) {
    console.error('❌ Error: sharp is not installed');
    console.log('\n💡 Install sharp first:');
    console.log('   npm install sharp\n');
    process.exit(1);
  }

  // Sprawdź czy folder istnieje
  if (!fs.existsSync(LOGO_DIR)) {
    console.error(`❌ Error: Directory not found: ${LOGO_DIR}`);
    console.log('\n💡 Create the directory first:');
    console.log(`   mkdir -p ${LOGO_DIR}\n`);
    process.exit(1);
  }

  let processedCount = 0;

  // Przetwórz każdy typ logo
  for (const [logoType, dimensions] of Object.entries(SIZES)) {
    for (const variant of VARIANTS) {
      const svgPath = path.join(LOGO_DIR, `${logoType}-${variant}.svg`);

      if (!fs.existsSync(svgPath)) {
        console.log(`⚠️  Skipping ${logoType}-${variant} (SVG not found)`);
        continue;
      }

      console.log(`\n📝 Processing: ${logoType}-${variant}.svg`);
      await generateImages(svgPath, dimensions, variant, logoType);
      processedCount++;
    }
  }

  if (processedCount === 0) {
    console.log('\n⚠️  No SVG files found to process');
    console.log('\n💡 Expected files:');
    console.log('   public/assets/logo/safaia-full-color.svg');
    console.log('   public/assets/logo/safaia-full-white.svg');
    console.log('   public/assets/logo/safaia-full-black.svg');
    console.log('   public/assets/logo/safaia-mark-color.svg');
    console.log('   ... etc.\n');
    console.log('   Generate SVG variants first:');
    console.log('   node scripts/generate-logo-variants.js\n');
    process.exit(1);
  }

  console.log('\n✨ Done! Logo images generated successfully.\n');
  console.log('📁 Generated files:');

  // Lista wszystkich wygenerowanych plików
  const allFiles = fs.readdirSync(LOGO_DIR);
  const imageFiles = allFiles.filter(f => {
    const ext = path.extname(f).slice(1);
    return FORMATS.includes(ext);
  });

  imageFiles.forEach(file => {
    const filePath = path.join(LOGO_DIR, file);
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`   ${file.padEnd(40)} ${sizeKB.padStart(8)} KB`);
  });

  // Podsumowanie rozmiaru
  const totalSize = imageFiles.reduce((sum, file) => {
    const stats = fs.statSync(path.join(LOGO_DIR, file));
    return sum + stats.size;
  }, 0);

  console.log(`\n📊 Total size: ${(totalSize / 1024).toFixed(2)} KB (${imageFiles.length} files)`);

  console.log('\n💡 Next steps:');
  console.log('   1. Review the generated images');
  console.log('   2. Optimize further if needed (ImageOptim, TinyPNG)');
  console.log('   3. Generate favicons: node scripts/generate-favicons.js');
  console.log('   4. Test in browser\n');
}

// Uruchom
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { generateImages };
