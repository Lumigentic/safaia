# Logo Integration - Safaia Publishing House

Kompletny system integracji logo z dokumentacją, komponentami i skryptami automatyzującymi.

---

## 📦 Co zostało dostarczone

### 1. Komponent Logo

**[components/Logo.tsx](../components/Logo.tsx)** - Responsywny komponent React z wariantami:

```tsx
import Logo from '@/components/Logo';

// Pełne logo w header
<Logo variant="full" height={60} linkToHome />

// Sygnet w footer
<Logo variant="mark" color="white" height={48} />

// Responsywne logo (auto-sizing)
<ResponsiveLogo variant="full" linkToHome priority />
```

**Warianty:**
- `variant`: `full` | `mark` | `text`
- `color`: `color` | `white` | `black`
- `height`: wysokość w pikselach (auto-width)
- `linkToHome`: boolean (link do strony głównej)
- `priority`: boolean (priorytet ładowania)

---

### 2. CSS Styles

**[app/globals.css](../app/globals.css)** - Kompletne style logo (linie 387-579):

- Base styles
- Logo variants (full/mark/text)
- Color variants (color/white/black)
- Responsive behaviors
- Animations (entrance, hover, loading skeleton)
- Accessibility (focus states, screen readers)
- Print styles
- Dark mode support
- Reduced motion support

---

### 3. Skrypty automatyzacji

#### a) [scripts/generate-logo-variants.js](../scripts/generate-logo-variants.js)

Generuje białe i czarne wersje z kolorowego SVG:

```bash
node scripts/generate-logo-variants.js

# Lub custom input:
node scripts/generate-logo-variants.js --input=my-logo.svg
```

**Output:**
- `safaia-full-color.svg`
- `safaia-full-white.svg`
- `safaia-full-black.svg`
- (+ mark, text variants)

---

#### b) [scripts/generate-logo-images.js](../scripts/generate-logo-images.js)

Generuje PNG i WebP w 1x i 2x (Retina):

```bash
# Zainstaluj sharp
npm install sharp

# Generuj obrazki
node scripts/generate-logo-images.js

# Tylko PNG
node scripts/generate-logo-images.js --formats=png

# Tylko WebP
node scripts/generate-logo-images.js --formats=webp
```

**Output:**
- `safaia-full-color.png` (1x)
- `safaia-full-color@2x.png` (2x Retina)
- `safaia-full-color.webp`
- `safaia-full-color@2x.webp`
- (wszystkie 9 wariantów × 4 pliki = 36 obrazków)

---

#### c) [scripts/generate-favicons.js](../scripts/generate-favicons.js)

Generuje wszystkie formaty favicon i ikon:

```bash
npm install sharp
node scripts/generate-favicons.js
```

**Output:**
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png` (180x180)
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`
- `mstile-150x150.png` (Windows)
- `og-image.png` (1200x630 for social media)
- `manifest.json` (PWA)
- `browserconfig.xml` (Windows)

---

### 4. Dokumentacja

#### a) [docs/LOGO-GUIDE.md](./LOGO-GUIDE.md)

Kompletny przewodnik techniczny:
- Konwersja JPG → SVG (Illustrator, Inkscape, online)
- Optymalizacja SVG (SVGO)
- Generowanie wariantów kolorystycznych
- Generowanie PNG/WebP
- Favicon generation
- Użycie komponentu Logo
- CSS dla responsywnego logo
- Optymalizacja wydajności
- Specyfikacje techniczne

#### b) [docs/LOGO-REPLACEMENT.md](./LOGO-REPLACEMENT.md)

Quick guide krok-po-kroku:
- Jak wymienić logo
- Aktualizacja proporcji
- Aktualizacja kolorów
- Troubleshooting
- Checklist weryfikacji

---

## 🚀 Quick Start

### Krok 1: Przygotuj SVG logo

Masz plik `LOGO.jpg`. Opcje:

**A) Online (najszybsze):**
1. https://www.adobe.com/express/feature/image/convert/jpg-to-svg
2. Upload `LOGO.jpg`
3. Download SVG
4. Zapisz jako `safaia-full-color.svg`

**B) Illustrator/Inkscape (najlepsza jakość):**
- Zobacz szczegóły w [LOGO-GUIDE.md](./LOGO-GUIDE.md#krok-1-konwersja-jpg--svg)

---

### Krok 2: Umieść SVG w projekcie

```bash
# Skopiuj plik
cp LOGO.svg safaia-publishing/public/assets/logo/safaia-full-color.svg
```

---

### Krok 3: Wygeneruj warianty

```bash
cd safaia-publishing

# Wygeneruj białe i czarne wersje
node scripts/generate-logo-variants.js
```

**Output:**
```
✅ Generated: public/assets/logo/safaia-full-white.svg
✅ Generated: public/assets/logo/safaia-full-black.svg
✅ Copied: public/assets/logo/safaia-full-color.svg
```

---

### Krok 4: Rozdziel na sygnet i tekst (opcjonalne)

Jeśli chcesz osobno `mark` (sygnet) i `text`:

1. Otwórz `safaia-full-color.svg` w Illustrator/Inkscape
2. Zaznacz i skopiuj tylko geometryczny wzór (bez tekstu)
3. Zapisz jako `safaia-mark-color.svg`
4. Zaznacz i skopiuj tylko tekst "SAFAIA PUBLISHING HOUSE"
5. Zapisz jako `safaia-text-color.svg`
6. Uruchom ponownie:
   ```bash
   node scripts/generate-logo-variants.js
   ```

---

### Krok 5: Wygeneruj PNG/WebP (opcjonalne)

```bash
npm install sharp
node scripts/generate-logo-images.js
```

**Note:** Next.js automatycznie optymalizuje SVG, więc ten krok jest opcjonalny!

---

### Krok 6: Wygeneruj favicons

```bash
node scripts/generate-favicons.js
```

---

### Krok 7: Użyj komponentu Logo

```tsx
// W Header.tsx
import Logo from '@/components/Logo';

export default function Header() {
  return (
    <header className="bg-white py-4">
      <div className="container">
        <Logo variant="full" height={60} linkToHome priority />
      </div>
    </header>
  );
}
```

```tsx
// W Footer.tsx
import Logo from '@/components/Logo';

export default function Footer() {
  return (
    <footer className="bg-sapphire-900 text-white py-16">
      <div className="container">
        <Logo variant="mark" color="white" height={64} />
      </div>
    </footer>
  );
}
```

---

### Krok 8: Dodaj favicon do layout

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#334782" />

        {/* Open Graph */}
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

### Krok 9: Test

```bash
npm run dev
open http://localhost:3000
```

Sprawdź:
- ✅ Logo w header
- ✅ Logo w footer
- ✅ Favicon w tab
- ✅ Responsywność (mobile/tablet/desktop)

---

## 📂 Finalna struktura plików

```
safaia-publishing/
├── components/
│   └── Logo.tsx                           # Komponent Logo ✅
│
├── public/
│   ├── assets/
│   │   └── logo/
│   │       ├── safaia-full-color.svg      # SVG warianty ✅
│   │       ├── safaia-full-white.svg
│   │       ├── safaia-full-black.svg
│   │       ├── safaia-mark-color.svg
│   │       ├── safaia-mark-white.svg
│   │       ├── safaia-mark-black.svg
│   │       ├── safaia-text-color.svg
│   │       ├── safaia-text-white.svg
│   │       ├── safaia-text-black.svg
│   │       ├── safaia-full-color.png      # PNG 1x (opcjonalne)
│   │       ├── safaia-full-color@2x.png   # PNG 2x (opcjonalne)
│   │       ├── safaia-full-color.webp     # WebP (opcjonalne)
│   │       └── ...                        # Pozostałe formaty
│   │
│   ├── favicon-16x16.png                  # Favicons ✅
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── og-image.png
│   ├── manifest.json
│   └── browserconfig.xml
│
├── scripts/
│   ├── generate-logo-variants.js          # Generuj warianty SVG ✅
│   ├── generate-logo-images.js            # Generuj PNG/WebP ✅
│   └── generate-favicons.js               # Generuj favicons ✅
│
├── docs/
│   ├── LOGO-GUIDE.md                      # Pełny przewodnik ✅
│   ├── LOGO-REPLACEMENT.md                # Quick guide zamiana ✅
│   └── LOGO-README.md                     # Ten plik ✅
│
└── app/
    └── globals.css                        # Logo CSS (387-579) ✅
```

---

## 🎯 Przykładowe użycie

### Header z logo

```tsx
// components/Header.tsx
import Logo, { ResponsiveLogo } from '@/components/Logo';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container py-4 flex items-center justify-between">
        {/* Logo responsive */}
        <ResponsiveLogo variant="full" linkToHome priority />

        {/* Menu */}
        <nav className="hidden md:flex gap-6">
          <Link href="/katalog">Katalog</Link>
          <Link href="/o-nas">O nas</Link>
          <Link href="/kontakt">Kontakt</Link>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden">Menu</button>
      </div>
    </header>
  );
}
```

### Footer z sygnetem

```tsx
// components/Footer.tsx
import Logo from '@/components/Logo';

export default function Footer() {
  return (
    <footer className="bg-sapphire-900 text-white">
      <div className="container py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Logo column */}
          <div>
            <Logo variant="mark" color="white" height={80} className="mb-6" />
            <p className="text-white/80 text-sm">
              Odkrywamy klejnoty literatury faktu
            </p>
          </div>

          {/* Other columns... */}
        </div>
      </div>
    </footer>
  );
}
```

### Hero section

```tsx
// app/page.tsx
import Logo from '@/components/Logo';

export default function HomePage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-sapphire-900 to-violet-800 flex items-center justify-center text-white">
      <div className="text-center">
        <Logo
          variant="full"
          color="white"
          height={150}
          priority
          className="logo-animated mb-8"
        />
        <h1 className="text-5xl font-display mb-4">
          Odkryj klejnoty literatury faktu
        </h1>
        <p className="text-xl mb-8">
          Sztuka, moda, fotografia, kultura ludowa
        </p>
        <a href="/katalog" className="btn btn-primary btn-lg">
          Zobacz katalog
        </a>
      </div>
    </section>
  );
}
```

### Loading screen

```tsx
// app/loading.tsx
import Logo from '@/components/Logo';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center">
        <div className="animate-pulse mb-4">
          <Logo variant="mark" height={100} />
        </div>
        <p className="text-gray-600">Ładowanie...</p>
      </div>
    </div>
  );
}
```

---

## 🔧 Customization

### Zmiana proporcji logo

Jeśli Twoje logo ma inne proporcje:

```tsx
// components/Logo.tsx (linia ~94)
const aspectRatios = {
  full: 0.72,  // ← Zmień na width/height Twojego logo
  mark: 1,
  text: 3.33,
};
```

### Zmiana kolorów brand

```css
/* app/globals.css */
@theme {
  --color-sapphire-700: #334782;  /* ← Twój kolor */
}
```

### Dodanie animacji

```tsx
<Logo
  variant="full"
  height={60}
  className="logo-animated hover:scale-105 transition-transform"
/>
```

---

## 📊 Performance

### Rozmiary plików (target):

- SVG: 8-20 KB (zoptymalizowane)
- PNG 1x: 20-80 KB
- PNG 2x: 60-200 KB
- WebP 1x: 10-40 KB
- WebP 2x: 30-100 KB

### Next.js Image Optimization:

```tsx
// Next.js automatycznie:
// - Konwertuje do WebP
// - Generuje różne rozmiary
// - Lazy loading
// - Placeholder blur

<Logo variant="full" height={60} priority />
// priority - dla above-the-fold content
```

---

## ✅ Checklist przed deployment

- [ ] Wszystkie 9 wariantów SVG wygenerowane
- [ ] Favicon w `public/`
- [ ] `manifest.json` zaktualizowany
- [ ] Logo w header używa komponentu `<Logo />`
- [ ] Logo w footer używa `color="white"`
- [ ] Favicon dodany do `layout.tsx`
- [ ] Open Graph image wygenerowany
- [ ] Test w przeglądarce (desktop/mobile)
- [ ] Test kontrastu (WCAG AA)
- [ ] Test print (logo czarno-białe)
- [ ] Cache wyczyszczony (`rm -rf .next`)

---

## 🆘 Troubleshooting

Zobacz [LOGO-REPLACEMENT.md](./LOGO-REPLACEMENT.md#troubleshooting) dla rozwiązań problemów.

---

## 📞 Wsparcie

Pytania? Sprawdź:
1. [LOGO-GUIDE.md](./LOGO-GUIDE.md) - pełna dokumentacja techniczna
2. [LOGO-REPLACEMENT.md](./LOGO-REPLACEMENT.md) - quick guide
3. [components/Logo.tsx](../components/Logo.tsx) - kod źródłowy z komentarzami

---

**Utworzono:** 2025-11-30
**Wersja:** 1.0.0
