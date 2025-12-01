# Logo Assets - Safaia Publishing House

Ten folder zawiera wszystkie warianty logo dla projektu Safaia Publishing House.

---

## 📁 Struktura plików

### SVG (Vector - preferowane)

**Full Logo** (sygnet + tekst):
- `safaia-full-color.svg` - Kolorowa wersja
- `safaia-full-white.svg` - Biała (dla ciemnego tła)
- `safaia-full-black.svg` - Czarna (dla jasnego tła)

**Mark** (tylko sygnet geometryczny):
- `safaia-mark-color.svg` - Kolorowa wersja
- `safaia-mark-white.svg` - Biała
- `safaia-mark-black.svg` - Czarna

**Text** (tylko tekst):
- `safaia-text-color.svg` - Kolorowa wersja
- `safaia-text-white.svg` - Biała
- `safaia-text-black.svg` - Czarna

### PNG (Raster - opcjonalne)

Dla każdego wariantu SVG:
- `*-color.png` - 1x resolution
- `*-color@2x.png` - 2x resolution (Retina)

### WebP (Optimized - opcjonalne)

- `*-color.webp` - 1x resolution
- `*-color@2x.webp` - 2x resolution

---

## 🎨 Użycie

### W React/Next.js:

```tsx
import Logo from '@/components/Logo';

// Pełne logo
<Logo variant="full" height={60} linkToHome />

// Sam sygnet
<Logo variant="mark" color="white" height={48} />

// Tylko tekst
<Logo variant="text" height={40} />
```

### Bezpośrednio:

```html
<!-- SVG - preferowane (vector, lightweight, scalable) -->
<img src="/assets/logo/safaia-full-color.svg" alt="Safaia Publishing House" height="60" />

<!-- PNG - dla compatibility -->
<img
  src="/assets/logo/safaia-full-color.png"
  srcset="/assets/logo/safaia-full-color@2x.png 2x"
  alt="Safaia Publishing House"
  height="60"
/>
```

---

## 📏 Rozmiary

- **Full logo**: 540 x 750px (aspect ratio ~0.72)
- **Mark**: 370 x 370px (aspect ratio 1.0)
- **Text**: 400 x 120px (aspect ratio ~3.33)

---

## 🚫 Czego brakuje?

Jeśli pliki SVG nie istnieją, wygeneruj je:

```bash
# 1. Umieść swoje logo jako safaia-full-color.svg
# 2. Wygeneruj warianty
cd ../../../
node scripts/generate-logo-variants.js

# 3. Wygeneruj PNG/WebP (opcjonalne)
npm install sharp
node scripts/generate-logo-images.js
```

---

## 📚 Dokumentacja

Zobacz pełną dokumentację:
- [LOGO-README.md](../../../docs/LOGO-README.md) - Quick start
- [LOGO-GUIDE.md](../../../docs/LOGO-GUIDE.md) - Pełny przewodnik
- [LOGO-REPLACEMENT.md](../../../docs/LOGO-REPLACEMENT.md) - Jak zmienić logo

---

**Ostatnia aktualizacja:** 2025-11-30
