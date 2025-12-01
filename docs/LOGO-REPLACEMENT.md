# Jak podmienić logo - Quick Guide

Prosty przewodnik krok po kroku jak zaktualizować logo w projekcie Safaia Publishing.

---

## 🚀 Szybka instrukcja

### Krok 1: Przygotuj pliki SVG (9 wariantów)

Potrzebujesz następujących plików:

```
✅ safaia-full-color.svg     (Pełne logo - kolorowe)
✅ safaia-full-white.svg     (Pełne logo - białe)
✅ safaia-full-black.svg     (Pełne logo - czarne)
✅ safaia-mark-color.svg     (Sygnet - kolorowy)
✅ safaia-mark-white.svg     (Sygnet - biały)
✅ safaia-mark-black.svg     (Sygnet - czarny)
✅ safaia-text-color.svg     (Tekst - kolorowy)
✅ safaia-text-white.svg     (Tekst - biały)
✅ safaia-text-black.svg     (Tekst - czarny)
```

**Jak je wygenerować?**

Zobacz szczegóły w [LOGO-GUIDE.md](./LOGO-GUIDE.md#krok-1-konwersja-jpg--svg)

Jeśli masz tylko jedno logo (`LOGO.jpg`):
1. Wektoryzuj w Illustrator/Inkscape → `safaia-full-color.svg`
2. Uruchom skrypt: `node scripts/generate-logo-variants.js`
3. Ręcznie rozdziel na sygnet i tekst (wytnij części w Illustrator/Inkscape)

---

### Krok 2: Umieść pliki w projekcie

```bash
# Skopiuj wszystkie SVG
cp ścieżka/do/twoich/svg/* safaia-publishing/public/assets/logo/

# Struktura powinna wyglądać tak:
safaia-publishing/
└── public/
    └── assets/
        └── logo/
            ├── safaia-full-color.svg
            ├── safaia-full-white.svg
            ├── safaia-full-black.svg
            ├── safaia-mark-color.svg
            ├── safaia-mark-white.svg
            ├── safaia-mark-black.svg
            ├── safaia-text-color.svg
            ├── safaia-text-white.svg
            └── safaia-text-black.svg
```

---

### Krok 3: Wygeneruj formaty PNG i WebP (opcjonalne)

```bash
cd safaia-publishing

# Zainstaluj Sharp (jeśli nie masz)
npm install sharp

# Utwórz skrypt generujący (jeśli nie istnieje)
# Zobacz LOGO-GUIDE.md#krok-4 dla pełnego kodu

# Uruchom generator
node scripts/generate-logo-images.js
```

**Lub pomiń ten krok** - Next.js Image automatycznie optymalizuje SVG!

---

### Krok 4: Wygeneruj favicons

```bash
# Opcja A: Online (szybkie)
# 1. Otwórz https://realfavicongenerator.net/
# 2. Upload safaia-mark-color.svg
# 3. Pobierz package
# 4. Rozpakuj do public/

# Opcja B: Skrypt (automatyczne)
node scripts/generate-favicons.js

# Favicons powinny być w:
public/
├── favicon.ico
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png
├── android-chrome-192x192.png
└── android-chrome-512x512.png
```

---

### Krok 5: Wyczyść cache Next.js

```bash
# Wyczyść build cache
rm -rf safaia-publishing/.next

# Wyczyść node_modules cache (opcjonalne)
rm -rf safaia-publishing/.next/cache
```

---

### Krok 6: Przetestuj

```bash
# Uruchom dev server
npm run dev

# Otwórz w przeglądarce
open http://localhost:3000

# Sprawdź:
# ✅ Logo w header
# ✅ Logo w footer
# ✅ Favicon w zakładce
# ✅ Wersje mobilne
# ✅ Wersje white/black na różnych tłach
```

---

### Krok 7: Zbuduj i deploy

```bash
# Build production
npm run build

# Test production build
npm run start

# Deploy (Vercel)
vercel --prod

# Lub Git push (jeśli masz auto-deploy)
git add public/assets/logo/
git commit -m "Update logo assets"
git push origin main
```

---

## 🎯 Checklist

Po zamianie logo sprawdź:

- [ ] **Header** - pełne logo wyświetla się poprawnie
- [ ] **Footer** - sygnet biały na ciemnym tle
- [ ] **Favicon** - ikona w zakładce przeglądarki
- [ ] **Mobile** - responsywne rozmiary
- [ ] **Dark mode** (jeśli dodany) - białe logo
- [ ] **Print** - czarno-białe logo
- [ ] **Apple devices** - apple-touch-icon
- [ ] **Android** - android-chrome icons
- [ ] **Open Graph** - og-image dla social media
- [ ] **Loading states** - placeholder nieломается

---

## 🔧 Aktualizacja proporcji logo

Jeśli Twoje nowe logo ma inne proporcje niż oryginalne:

### 1. Zmierz nowe logo

```bash
# W Illustrator/Inkscape sprawdź Artboard size
# Lub:
npm install -g svg-dimensions
svg-dimensions public/assets/logo/safaia-full-color.svg

# Przykładowy output:
# Width: 600px
# Height: 800px
# Aspect ratio: 0.75
```

### 2. Zaktualizuj komponent Logo

Edytuj `components/Logo.tsx`:

```typescript
// Znajdź linię ~94:
const aspectRatios = {
  full: 0.72,  // ← Zmień na swój aspect ratio (width/height)
  mark: 1,     // ← Jeśli sygnet nie jest kwadratowy, zmień
  text: 3.33,  // ← Proporcje tekstu
};
```

Przykład:
```typescript
// Jeśli Twoje logo full ma 600x800px:
const aspectRatios = {
  full: 600 / 800,  // = 0.75
  mark: 1,
  text: 3.33,
};
```

### 3. Przebuduj

```bash
rm -rf .next
npm run build
```

---

## 🎨 Aktualizacja kolorów

Jeśli kolorowa wersja używa innego koloru niż #334782:

### 1. Zaktualizuj CSS

Edytuj `app/globals.css`:

```css
/* Znajdź definicję koloru sapphire */
@theme {
  --color-sapphire: #334782;  /* ← Zmień na swój kolor */
  --color-sapphire-50: #f0f3fb;
  /* ... */
}
```

### 2. Zaktualizuj komponent

Jeśli logo używa CSS custom properties zamiast hardcoded colors:

```xml
<!-- W SVG zamień fill="#334782" na -->
<path fill="var(--color-sapphire)" />

<!-- LUB użyj currentColor dla sync z tekstem -->
<path fill="currentColor" />
```

---

## 🐛 Troubleshooting

### Logo się nie wyświetla

**Problem:** 404 Error na /assets/logo/safaia-full-color.svg

**Rozwiązanie:**
```bash
# Sprawdź czy plik istnieje
ls -la public/assets/logo/

# Sprawdź permissions
chmod 644 public/assets/logo/*.svg

# Restart dev server
# Ctrl+C → npm run dev
```

---

### Logo ma złe proporcje

**Problem:** Logo jest rozciągnięte lub ściśnięte

**Rozwiązanie:**
```typescript
// W Logo.tsx dodaj preserveAspectRatio do SVG
<Image
  {...props}
  style={{
    ...style,
    objectFit: 'contain',  // Dodaj to
  }}
/>
```

---

### Favicon się nie aktualizuje

**Problem:** Stary favicon nadal widoczny po zmianie

**Rozwiązanie:**
```bash
# 1. Wyczyść cache przeglądarki
# Chrome: Ctrl+Shift+Delete → Clear browsing data

# 2. Hard refresh
# Ctrl+Shift+R (Windows/Linux)
# Cmd+Shift+R (Mac)

# 3. Sprawdź czy nowy plik jest deployed
curl -I https://twoja-strona.com/favicon.ico

# 4. Zmień nazwę pliku (force cache bust)
# favicon.ico → favicon-v2.ico
# Zaktualizuj w app/layout.tsx
```

---

### Logo wygląda pixelated

**Problem:** Rozmyte/pixelowane logo

**Rozwiązanie:**
```bash
# Sprawdź czy używasz SVG (nie PNG)
# SVG = vector = zawsze ostry

# Jeśli musisz użyć PNG:
# 1. Wygeneruj w 2x rozdzielczości
# 2. Użyj srcSet z 2x:

<Image
  src="/assets/logo/safaia-full-color.png"
  srcSet="/assets/logo/safaia-full-color@2x.png 2x"
  alt="Safaia"
/>
```

---

## 📦 Pliki do backupu przed zmianą

```bash
# Backup starych plików
mkdir backup-logo-$(date +%Y%m%d)
cp -r public/assets/logo/* backup-logo-$(date +%Y%m%d)/
cp components/Logo.tsx backup-logo-$(date +%Y%m%d)/

# Jeśli coś pójdzie nie tak, przywróć:
# cp -r backup-logo-YYYYMMDD/* public/assets/logo/
```

---

## ✅ Finalna weryfikacja

Po wszystkich zmianach:

```bash
# 1. Build bez błędów
npm run build
# Powinno zakończyć się: ✓ Compiled successfully

# 2. Lighthouse test
npm run test:lighthouse
# Logo powinno mieć proper alt text

# 3. Visual check
npm run start
open http://localhost:3000

# 4. Mobile check
# Otwórz DevTools → Toggle device toolbar
# Sprawdź różne rozmiary ekranu

# 5. Accessibility check
npm run test:a11y
# Sprawdź czy alt text jest OK
```

---

## 🆘 Pomoc

Jeśli napotkasz problemy:

1. Sprawdź [LOGO-GUIDE.md](./LOGO-GUIDE.md) dla szczegółów technicznych
2. Sprawdź console w przeglądarce (F12) dla błędów JavaScript
3. Sprawdź Network tab - czy pliki SVG się ładują (Status 200)
4. Porównaj ze starą wersją w backup

---

**Ostatnia aktualizacja:** 2025-11-30
