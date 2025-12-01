# Logo Integration Guide - Safaia Publishing House

Przewodnik po integracji, optymalizacji i zarządzaniu logo w projekcie.

---

## 📁 Struktura plików logo

```
public/assets/logo/
├── safaia-full-color.svg          # Pełne logo - kolorowe
├── safaia-full-white.svg          # Pełne logo - białe (ciemne tło)
├── safaia-full-black.svg          # Pełne logo - czarne (jasne tło)
├── safaia-mark-color.svg          # Sygnet - kolorowy
├── safaia-mark-white.svg          # Sygnet - biały
├── safaia-mark-black.svg          # Sygnet - czarny
├── safaia-text-color.svg          # Tekst - kolorowy
├── safaia-text-white.svg          # Tekst - biały
├── safaia-text-black.svg          # Tekst - czarny
├── favicon.ico                    # Favicon 32x32
├── favicon-16x16.png              # Favicon 16x16
├── favicon-32x32.png              # Favicon 32x32
├── apple-touch-icon.png           # Apple touch icon 180x180
├── android-chrome-192x192.png     # Android icon 192x192
├── android-chrome-512x512.png     # Android icon 512x512
└── og-image.png                   # Open Graph image 1200x630
```

---

## 🎨 Warianty logo

### 1. **Full** (Pełne logo)
- Zawiera: Sygnet + tekst "SAFAIA PUBLISHING HOUSE"
- Proporcje: ~0.72:1 (540x750px)
- Użycie: Header, footer, splash screen
- **Wersje kolorystyczne:**
  - `safaia-full-color.svg` - czarny tekst + kolorowy sygnet
  - `safaia-full-white.svg` - białe na ciemnym tle
  - `safaia-full-black.svg` - czarne na jasnym tle

### 2. **Mark** (Sygnet)
- Zawiera: Tylko geometryczny wzór safiru
- Proporcje: 1:1 (370x370px)
- Użycie: Favicon, social media avatar, watermark
- **Wersje kolorystyczne:**
  - `safaia-mark-color.svg` - kolorowy
  - `safaia-mark-white.svg` - biały
  - `safaia-mark-black.svg` - czarny

### 3. **Text** (Tekst)
- Zawiera: Tylko napis "SAFAIA PUBLISHING HOUSE"
- Proporcje: ~3.33:1 (400x120px)
- Użycie: Nagłówki, stopki z mniejszym logo
- **Wersje kolorystyczne:**
  - `safaia-text-color.svg` - czarny
  - `safaia-text-white.svg` - biały
  - `safaia-text-black.svg` - czarny

---

## 🔧 Przygotowanie plików logo

### Krok 1: Konwersja JPG → SVG

Masz plik `LOGO.jpg`. Zalecane narzędzia do wektoryzacji:

**Opcja A: Adobe Illustrator (profesjonalne)**
```
1. Otwórz LOGO.jpg w Illustrator
2. Object → Image Trace → Make
3. Expand result
4. Usuń tło (white background)
5. Wyczyść niepotrzebne punkty (Object → Path → Simplify)
6. File → Save As → SVG
7. Opcje SVG:
   - Styling: Presentation Attributes
   - Font: Convert to outlines
   - Images: Embed
   - Decimal places: 2
   - Minify: Yes
```

**Opcja B: Inkscape (darmowe)**
```
1. Zainstaluj Inkscape: https://inkscape.org/
2. Otwórz LOGO.jpg
3. Path → Trace Bitmap
4. Wybierz "Brightness cutoff" lub "Edge detection"
5. Adjust threshold
6. Click "OK"
7. Usuń oryginalny obrazek bitmap
8. Path → Simplify (Ctrl+L)
9. File → Save As → Optimized SVG
```

**Opcja C: Online (szybkie)**
```
Użyj: https://www.adobe.com/express/feature/image/convert/jpg-to-svg
lub: https://convertio.co/jpg-svg/

UWAGA: Jakość może być niższa, zalecane dla drafts
```

---

### Krok 2: Optymalizacja SVG

Po utworzeniu SVG, zoptymalizuj plik:

```bash
# Instalacja SVGO
npm install -g svgo

# Optymalizacja pojedynczego pliku
svgo safaia-full-color.svg -o safaia-full-color-optimized.svg

# Optymalizacja całego folderu
svgo -f public/assets/logo -o public/assets/logo-optimized

# Opcje optymalizacji
svgo --config svgo.config.js safaia-full-color.svg
```

**svgo.config.js:**
```javascript
module.exports = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // Zachowaj viewBox dla responsywności
          removeViewBox: false,
          // Usuń komentarze
          removeComments: true,
          // Usuń metadata
          removeMetadata: true,
          // Zaokrąglij liczby do 2 miejsc
          cleanupNumericValues: {
            floatPrecision: 2
          },
        },
      },
    },
    // Dodatkowe optymalizacje
    'removeDoctype',
    'removeXMLProcInst',
    'removeTitle',
    'removeDesc',
    'removeUselessDefs',
    'cleanupIDs',
  ],
};
```

---

### Krok 3: Tworzenie wariantów kolorystycznych

#### A. Wersja biała (white)

```xml
<!-- safaia-full-white.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 750">
  <!-- Zamień wszystkie kolory na #FFFFFF -->
  <path fill="#FFFFFF" d="..."/>
  <path stroke="#FFFFFF" d="..."/>
</svg>
```

#### B. Wersja czarna (black)

```xml
<!-- safaia-full-black.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 750">
  <!-- Zamień wszystkie kolory na #000000 -->
  <path fill="#000000" d="..."/>
  <path stroke="#000000" d="..."/>
</svg>
```

#### Skrypt automatyczny (Node.js):

```javascript
// scripts/generate-logo-variants.js
const fs = require('fs');

const logoPath = 'public/assets/logo/safaia-full-color.svg';
const logoSvg = fs.readFileSync(logoPath, 'utf8');

// Wersja biała
const whiteLogo = logoSvg
  .replace(/fill="#[0-9A-Fa-f]{6}"/g, 'fill="#FFFFFF"')
  .replace(/stroke="#[0-9A-Fa-f]{6}"/g, 'stroke="#FFFFFF"');

fs.writeFileSync('public/assets/logo/safaia-full-white.svg', whiteLogo);

// Wersja czarna
const blackLogo = logoSvg
  .replace(/fill="#[0-9A-Fa-f]{6}"/g, 'fill="#000000"')
  .replace(/stroke="#[0-9A-Fa-f]{6}"/g, 'stroke="#000000"');

fs.writeFileSync('public/assets/logo/safaia-full-black.svg', blackLogo);

console.log('✅ Wygenerowano warianty logo');
```

Uruchom:
```bash
node scripts/generate-logo-variants.js
```

---

### Krok 4: Generowanie PNG (2x) i WebP

**Użyj Sharp (automatyzacja):**

```javascript
// scripts/generate-logo-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = {
  full: { width: 540, height: 750 },
  mark: { width: 370, height: 370 },
  text: { width: 400, height: 120 },
};

const variants = ['color', 'white', 'black'];
const formats = ['png', 'webp'];

async function generateImages() {
  for (const [type, dimensions] of Object.entries(sizes)) {
    for (const variant of variants) {
      const svgPath = `public/assets/logo/safaia-${type}-${variant}.svg`;

      if (!fs.existsSync(svgPath)) {
        console.log(`⚠️  Brak pliku: ${svgPath}`);
        continue;
      }

      for (const format of formats) {
        // 1x
        await sharp(svgPath)
          .resize(dimensions.width, dimensions.height)
          [format]({ quality: 90 })
          .toFile(`public/assets/logo/safaia-${type}-${variant}.${format}`);

        // 2x (Retina)
        await sharp(svgPath)
          .resize(dimensions.width * 2, dimensions.height * 2)
          [format]({ quality: 90 })
          .toFile(`public/assets/logo/safaia-${type}-${variant}@2x.${format}`);

        console.log(`✅ ${type}-${variant}.${format} (1x & 2x)`);
      }
    }
  }
}

generateImages().catch(console.error);
```

Uruchom:
```bash
npm install sharp
node scripts/generate-logo-images.js
```

**Ręcznie (Figma/Photoshop):**

1. Otwórz SVG w Figma
2. Zaznacz całe logo
3. Export → PNG
   - 1x: 540x750px
   - 2x: 1080x1500px (dla Retina)
4. Export → WebP
   - Quality: 90%
   - Same sizes

---

### Krok 5: Generowanie Favicon i ikon

**Użyj narzędzia online:**
```
https://realfavicongenerator.net/

Upload: safaia-mark-color.svg
Download: Wszystkie potrzebne formaty
```

**Lub Sharp:**

```javascript
// scripts/generate-favicons.js
const sharp = require('sharp');

const markSvg = 'public/assets/logo/safaia-mark-color.svg';

async function generateFavicons() {
  // Favicon 32x32
  await sharp(markSvg)
    .resize(32, 32)
    .png()
    .toFile('public/favicon-32x32.png');

  // Favicon 16x16
  await sharp(markSvg)
    .resize(16, 16)
    .png()
    .toFile('public/favicon-16x16.png');

  // Apple Touch Icon 180x180
  await sharp(markSvg)
    .resize(180, 180)
    .png()
    .toFile('public/apple-touch-icon.png');

  // Android Chrome 192x192
  await sharp(markSvg)
    .resize(192, 192)
    .png()
    .toFile('public/android-chrome-192x192.png');

  // Android Chrome 512x512
  await sharp(markSvg)
    .resize(512, 512)
    .png()
    .toFile('public/android-chrome-512x512.png');

  console.log('✅ Favicon i ikony wygenerowane');
}

generateFavicons().catch(console.error);
```

---

## 💻 Użycie komponentu Logo

### Podstawowe użycie

```tsx
import Logo from '@/components/Logo';

// W header - pełne logo jako link
<Logo variant="full" height={60} linkToHome />

// W footer - biały sygnet
<Logo variant="mark" color="white" height={48} />

// W hero - duże logo z priorytetem ładowania
<Logo variant="full" color="white" height={120} priority />
```

### Responsywne logo

```tsx
import { ResponsiveLogo } from '@/components/Logo';

// Automatycznie dostosowuje rozmiar:
// Mobile: 40px, Tablet: 56px, Desktop: 64px
<ResponsiveLogo variant="full" linkToHome />
```

### Przykłady użycia

**Header:**
```tsx
// components/Header.tsx
import Logo from '@/components/Logo';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container py-4 flex items-center justify-between">
        <Logo variant="full" height={56} linkToHome priority />
        <nav>{/* ... */}</nav>
      </div>
    </header>
  );
}
```

**Footer (ciemne tło):**
```tsx
// components/Footer.tsx
import Logo from '@/components/Logo';

export default function Footer() {
  return (
    <footer className="bg-sapphire-900 text-white">
      <div className="container py-16">
        <Logo variant="mark" color="white" height={64} />
        {/* ... */}
      </div>
    </footer>
  );
}
```

**Loading/Splash:**
```tsx
// app/loading.tsx
import Logo from '@/components/Logo';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="animate-pulse">
        <Logo variant="full" height={150} />
      </div>
    </div>
  );
}
```

---

## 🎨 CSS dla responsywnego logo

Dodatkowe style w `app/globals.css`:

```css
/* Logo base styles */
.logo {
  display: inline-block;
  vertical-align: middle;
}

/* Smooth transitions */
.logo-link {
  display: inline-block;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.logo-link:hover {
  opacity: 0.8;
}

.logo-link:active {
  transform: scale(0.98);
}

/* Responsive logo container */
.logo-responsive {
  display: inline-block;
  height: auto;
}

/* Logo variants */
.logo--full {
  /* Pełne logo */
}

.logo--mark {
  /* Sam sygnet */
  border-radius: 50%; /* Opcjonalnie: okrągłe tło dla sygnetu */
}

.logo--text {
  /* Tylko tekst */
}

/* Print styles - zawsze czarne */
@media print {
  .logo {
    filter: grayscale(100%);
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .logo--color {
    /* Opcjonalnie: automatyczna zmiana na wersję white w dark mode */
  }
}

/* Skeleton loader podczas ładowania */
.logo-skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
```

---

## 📊 Optymalizacja wydajności

### 1. Lazy loading dla logo w footer

```tsx
<Logo
  variant="mark"
  color="white"
  height={48}
  loading="lazy" // Dodaj do Image component
/>
```

### 2. Preload krytycznego logo

W `app/layout.tsx`:

```tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <link
          rel="preload"
          as="image"
          href="/assets/logo/safaia-full-color.svg"
          type="image/svg+xml"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 3. WebP z SVG fallback

```tsx
<picture>
  <source
    srcSet="/assets/logo/safaia-full-color.webp 1x, /assets/logo/safaia-full-color@2x.webp 2x"
    type="image/webp"
  />
  <source
    srcSet="/assets/logo/safaia-full-color.svg"
    type="image/svg+xml"
  />
  <img
    src="/assets/logo/safaia-full-color.png"
    alt="Safaia Publishing House"
    width={540}
    height={750}
  />
</picture>
```

---

## 🔄 Podmiana logo (Update Instructions)

Zobacz [LOGO-REPLACEMENT.md](./LOGO-REPLACEMENT.md) dla szczegółowych instrukcji.

**Szybki przegląd:**

1. Przygotuj nowe pliki SVG (9 wariantów)
2. Umieść w `public/assets/logo/`
3. Wygeneruj PNG/WebP: `node scripts/generate-logo-images.js`
4. Wygeneruj favicons: `node scripts/generate-favicons.js`
5. Usuń cache: `rm -rf .next`
6. Zbuduj ponownie: `npm run build`

---

## 📏 Specyfikacje techniczne

### Rozmiary plików (docelowe):

```
safaia-full-color.svg       ~15-20 KB
safaia-mark-color.svg       ~8-12 KB
safaia-text-color.svg       ~5-8 KB

safaia-full-color.png       ~50-80 KB (1x)
safaia-full-color@2x.png    ~150-200 KB (2x)

safaia-full-color.webp      ~20-40 KB (1x)
safaia-full-color@2x.webp   ~60-100 KB (2x)
```

### Wymiary (px):

```
Full logo:   540 x 750   (aspect 0.72:1)
Mark:        370 x 370   (aspect 1:1)
Text:        400 x 120   (aspect 3.33:1)

Favicon:     32 x 32
Apple icon:  180 x 180
Android:     192 x 192, 512 x 512
OG image:    1200 x 630
```

### Kolory:

```
Główny kolor sygnetu: #334782 (Sapphire)
Tekst: #000000 (Black) / #FFFFFF (White)
Tło: Transparent
```

---

## 🧪 Testowanie logo

### Visual regression testing

```bash
# Sprawdź czy logo renderuje się poprawnie
npm run build
npm run start

# Otwórz w przeglądarce
open http://localhost:3000

# Sprawdź wszystkie warianty
# - Header (full, color)
# - Footer (mark, white)
# - Mobile header (responsive)
```

### Accessibility testing

```bash
# Sprawdź czy alt text jest obecny
npm run test:a11y

# Ręcznie:
# 1. Right-click na logo → Inspect
# 2. Sprawdź czy <img> ma atrybut alt
# 3. Sprawdź czy kontrast jest wystarczający
```

---

## 📚 Dodatkowe zasoby

- [SVG Optimization Guide](https://web.dev/optimize-svgs/)
- [Real Favicon Generator](https://realfavicongenerator.net/)
- [SVGO Documentation](https://github.com/svg/svgo)
- [Sharp Documentation](https://sharp.pixelplumbing.com/)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)

---

**Utworzono:** 2025-11-30
**Autor:** Claude Code Assistant
