#!/usr/bin/env node

/**
 * Generate Favicons Script
 *
 * Generuje wszystkie potrzebne formaty favicon i ikon aplikacji
 *
 * Wymaga: npm install sharp
 *
 * Użycie:
 *   node scripts/generate-favicons.js
 *   node scripts/generate-favicons.js --source=custom-mark.svg
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Konfiguracja
const SOURCE_FILE = process.argv.find(arg => arg.startsWith('--source='))?.split('=')[1]
  || 'public/assets/logo/safaia-mark-color.svg';

const OUTPUT_DIR = 'public';

// Rozmiary favicon i ikon
const ICON_SIZES = {
  // Favicons
  'favicon-16x16.png': { width: 16, height: 16 },
  'favicon-32x32.png': { width: 32, height: 32 },

  // Apple Touch Icon
  'apple-touch-icon.png': { width: 180, height: 180 },

  // Android Chrome
  'android-chrome-192x192.png': { width: 192, height: 192 },
  'android-chrome-512x512.png': { width: 512, height: 512 },

  // Windows tile
  'mstile-150x150.png': { width: 150, height: 150 },

  // Safari pinned tab (wersja mono)
  'safari-pinned-tab.svg': null, // Kopiuj SVG
};

// Open Graph image (social media)
const OG_IMAGE = {
  'og-image.png': { width: 1200, height: 630 },
};

/**
 * Generuj favicon w różnych rozmiarach
 */
async function generateFavicon(sourcePath, fileName, dimensions) {
  const outputPath = path.join(OUTPUT_DIR, fileName);

  try {
    if (fileName.endsWith('.svg')) {
      // Kopiuj SVG (dla safari-pinned-tab)
      fs.copyFileSync(sourcePath, outputPath);
      console.log(`✅ Copied SVG: ${fileName}`);
      return;
    }

    await sharp(sourcePath)
      .resize(dimensions.width, dimensions.height, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png({ compressionLevel: 9 })
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`✅ ${fileName.padEnd(30)} ${dimensions.width}x${dimensions.height} → ${sizeKB} KB`);

  } catch (error) {
    console.error(`❌ Failed to generate ${fileName}:`, error.message);
  }
}

/**
 * Generuj Open Graph image
 */
async function generateOGImage(sourcePath) {
  const outputPath = path.join(OUTPUT_DIR, 'og-image.png');

  try {
    // Stwórz tło z kolorem brand
    const background = await sharp({
      create: {
        width: 1200,
        height: 630,
        channels: 4,
        background: { r: 51, g: 71, b: 130, alpha: 1 }, // Sapphire color
      }
    })
      .png()
      .toBuffer();

    // Załaduj logo i przeskaluj
    const logo = await sharp(sourcePath)
      .resize(400, 400, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer();

    // Skomponuj logo na tle (wyśrodkowane)
    await sharp(background)
      .composite([
        {
          input: logo,
          gravity: 'center',
        },
      ])
      .png({ quality: 90 })
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`✅ og-image.png                  1200x630 → ${sizeKB} KB`);

  } catch (error) {
    console.error(`❌ Failed to generate OG image:`, error.message);
  }
}

/**
 * Generuj favicon.ico (multi-size ICO)
 */
async function generateICO(sourcePath) {
  const outputPath = path.join(OUTPUT_DIR, 'favicon.ico');

  try {
    // Generuj PNG 32x32 i konwertuj do ICO
    // (sharp nie wspiera ICO bezpośrednio, więc tworzymy PNG)
    // Dla prawdziwego ICO użyj: npm install to-ico

    const png32 = await sharp(sourcePath)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();

    // Zapisz jako PNG (przeglądarka zaakceptuje)
    // Dla prawdziwego ICO zobacz: https://www.npmjs.com/package/to-ico
    fs.writeFileSync(outputPath.replace('.ico', '-temp.png'), png32);

    console.log(`⚠️  favicon.ico: Use online converter or 'to-ico' package for true ICO format`);
    console.log(`   Temporary PNG saved: favicon-temp.png`);
    console.log(`   Convert at: https://www.icoconverter.com/`);

  } catch (error) {
    console.error(`❌ Failed to generate ICO:`, error.message);
  }
}

/**
 * Generuj Web App Manifest (manifest.json)
 */
function generateManifest() {
  const manifest = {
    name: 'Safaia Publishing House',
    short_name: 'Safaia',
    description: 'Wydawnictwo o sztuce, modzie, fotografii i kulturze ludowej',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#334782',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };

  const manifestPath = path.join(OUTPUT_DIR, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`✅ manifest.json generated`);
}

/**
 * Generuj browserconfig.xml (dla Windows)
 */
function generateBrowserConfig() {
  const xml = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="/mstile-150x150.png"/>
      <TileColor>#334782</TileColor>
    </tile>
  </msapplication>
</browserconfig>`;

  const configPath = path.join(OUTPUT_DIR, 'browserconfig.xml');
  fs.writeFileSync(configPath, xml);
  console.log(`✅ browserconfig.xml generated`);
}

/**
 * Main
 */
async function main() {
  console.log('🎨 Generating favicons and app icons...\n');
  console.log(`Source: ${SOURCE_FILE}`);
  console.log(`Output: ${OUTPUT_DIR}\n`);

  // Sprawdź czy sharp jest zainstalowany
  try {
    require.resolve('sharp');
  } catch (e) {
    console.error('❌ Error: sharp is not installed');
    console.log('\n💡 Install sharp first:');
    console.log('   npm install sharp\n');
    process.exit(1);
  }

  // Sprawdź czy plik źródłowy istnieje
  if (!fs.existsSync(SOURCE_FILE)) {
    console.error(`❌ Error: Source file not found: ${SOURCE_FILE}`);
    console.log('\n💡 Make sure you have:');
    console.log('   public/assets/logo/safaia-mark-color.svg');
    console.log('\n   Or specify custom source:');
    console.log('   node scripts/generate-favicons.js --source=path/to/logo.svg\n');
    process.exit(1);
  }

  console.log('📝 Generating favicons...\n');

  // Generuj wszystkie rozmiary favicon
  for (const [fileName, dimensions] of Object.entries(ICON_SIZES)) {
    if (dimensions) {
      await generateFavicon(SOURCE_FILE, fileName, dimensions);
    } else {
      await generateFavicon(SOURCE_FILE, fileName, null);
    }
  }

  // Generuj Open Graph image
  console.log('\n📝 Generating Open Graph image...\n');
  await generateOGImage(SOURCE_FILE);

  // Generuj favicon.ico
  console.log('\n📝 Generating favicon.ico...\n');
  await generateICO(SOURCE_FILE);

  // Generuj manifest.json
  console.log('\n📝 Generating manifest and config files...\n');
  generateManifest();
  generateBrowserConfig();

  console.log('\n✨ Done! All favicons and icons generated.\n');
  console.log('📁 Generated files:');

  // Lista plików
  const files = [
    'favicon-16x16.png',
    'favicon-32x32.png',
    'apple-touch-icon.png',
    'android-chrome-192x192.png',
    'android-chrome-512x512.png',
    'mstile-150x150.png',
    'og-image.png',
    'manifest.json',
    'browserconfig.xml',
  ];

  files.forEach(file => {
    const filePath = path.join(OUTPUT_DIR, file);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      console.log(`   ${file.padEnd(30)} ${sizeKB.padStart(8)} KB`);
    }
  });

  console.log('\n💡 Add to <head> in app/layout.tsx:');
  console.log(`
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/manifest.json" />
  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#334782" />
  <meta name="theme-color" content="#334782" />
  <meta name="msapplication-TileColor" content="#334782" />
  <meta name="msapplication-config" content="/browserconfig.xml" />

  {/* Open Graph */}
  <meta property="og:image" content="/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  `);

  console.log('\n✅ All done!\n');
}

// Uruchom
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { generateFavicon, generateOGImage, generateManifest };
