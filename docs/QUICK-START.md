# Quick Start - Testowanie Performance & Accessibility

## Problem z wieloma instancjami Next.js

Jeśli widzisz błąd "Unable to acquire lock" oznacza to, że działa już inna instancja Next.js.

### Rozwiązanie 1: Zbuduj i uruchom production server

```bash
# 1. Zatrzymaj wszystkie dev servery (Ctrl+C)

# 2. Zbuduj projekt
cd safaia-publishing
npm run build

# 3. Uruchom production server
npm run start

# 4. W nowym terminalu - uruchom testy
npm run test:lighthouse
npm run test:a11y
```

### Rozwiązanie 2: Wyczyść lock i uruchom dev server

```bash
# 1. Zabij wszystkie procesy Next.js
pkill -f "next dev"

# 2. Usuń lock file
rm -rf safaia-publishing/.next/dev/lock

# 3. Wyczyść cache
rm -rf safaia-publishing/.next

# 4. Uruchom dev server na nowo
npm run dev

# 5. Poczekaj aż server w pełni wystartuje (sprawdź http://localhost:3000)

# 6. W nowym terminalu - uruchom testy
TEST_URL=http://localhost:3000 npm run test:lighthouse
```

### Rozwiązanie 3: Użyj produkcyjnej strony

Jeśli masz wdrożoną stronę na Vercel/Netlify:

```bash
# Test produkcyjnej strony
TEST_URL=https://twoja-domena.vercel.app npm run test:lighthouse
TEST_URL=https://twoja-domena.vercel.app npm run test:a11y
```

---

## Testowanie krok po kroku

### 1. Build production

```bash
cd safaia-publishing

# Zatrzym wszystkie dev servery
# Naciśnij Ctrl+C w każdym terminalu gdzie działa npm run dev

# Zbuduj projekt
npm run build
```

Oczekiwany output:
```
  ✓ Compiled successfully
  ✓ Linting and checking validity of types
  ✓ Collecting page data
  ✓ Generating static pages (7/7)
  ✓ Collecting build traces
  ✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    5 kB          85 kB
├ ○ /katalog                             8 kB          88 kB
├ ● /katalog/[slug]                      12 kB         92 kB
├ ○ /dla-autorow                         15 kB         95 kB
└ ...
```

### 2. Uruchom production server

```bash
npm run start
```

Powinieneś zobaczyć:
```
▲ Next.js 16.0.6
- Local:         http://localhost:3000
```

### 3. Sprawdź czy działa

Otwórz w przeglądarce: http://localhost:3000

Lub sprawdź curl:
```bash
curl http://localhost:3000
```

Powinieneś zobaczyć HTML strony.

### 4. Uruchom testy

W **NOWYM TERMINALU** (nie zamykaj tego z `npm run start`):

```bash
cd safaia-publishing

# Test Lighthouse
npm run test:lighthouse

# Test Accessibility
npm run test:a11y

# Oba testy
npm run test:performance
```

---

## Oczekiwane wyniki

### Lighthouse

```
================================================================================
📊 Homepage (Desktop)
================================================================================

📈 Scores:
  🟢 performance         94/100
  🟢 accessibility       98/100
  🟢 bestPractices       95/100
  🟢 seo                 97/100

⚡ Core Web Vitals:
  FCP: 1523ms
  LCP: 2134ms ✅
  CLS: 0.045 ✅
  TBT: 187ms ✅
  SI: 2987ms

✅ Wszystkie metryki w budżecie!
```

Raporty w: `lighthouse-reports/`

### Accessibility (axe-core)

```
================================================================================
📄 Homepage
================================================================================

📊 Summary:
  ✅ Passed: 47 rules
  ❌ Violations: 3-5 issues (expected)
  ⚠️  Incomplete: 2 issues (need manual review)

❌ Violations by Severity:
  🟡 MODERATE: 2-3
  ⚠️  MINOR: 1-2
```

Raporty w: `a11y-reports/accessibility-report.html`

---

## Troubleshooting

### "CHROME_INTERSTITIAL_ERROR"

Oznacza że Chrome nie może połączyć się ze stroną. Sprawdź:
1. Czy server działa: `curl http://localhost:3000`
2. Czy port jest prawidłowy: `lsof -i :3000`
3. Czy firewall nie blokuje połączenia

### "lighthouse is not a function"

Oznacza problem z importem. Powinno być naprawione w aktualnej wersji skryptu.

### "Port already in use"

Inna aplikacja używa portu 3000. Rozwiązania:
```bash
# Zabij proces na porcie 3000
lsof -ti:3000 | xargs kill -9

# Lub użyj innego portu
PORT=3001 npm run start
TEST_URL=http://localhost:3001 npm run test:lighthouse
```

### "Unable to acquire lock"

```bash
# Wyczyść lock
rm -rf .next/dev/lock
rm -rf .next

# Zabij wszystkie procesy Next
pkill -f "next dev"
pkill -f "next start"

# Uruchom na nowo
npm run build
npm run start
```

---

## Następne kroki

Po pomyślnych testach:

1. **Przejrzyj raporty HTML**
   ```bash
   open lighthouse-reports/homepage-desktop-2025-11-30.html
   open a11y-reports/accessibility-report.html
   ```

2. **Sprawdź checklisty**
   - [SEO-CHECKLIST.md](./SEO-CHECKLIST.md)
   - [ACCESSIBILITY-CHECKLIST.md](./ACCESSIBILITY-CHECKLIST.md)
   - [PERFORMANCE-CHECKLIST.md](./PERFORMANCE-CHECKLIST.md)

3. **Zaimplementuj poprawki** według priorytetów w SUMMARY.md

4. **Uruchom testy ponownie** aby sprawdzić postęp

5. **Setup GitHub Actions** dla automatycznych testów w CI/CD

---

## Szybki test bez instalacji

Jeśli chcesz szybko przetestować bez instalacji dependencies:

### Online narzędzia:

**Google PageSpeed Insights:**
https://pagespeed.web.dev/
(wpisz URL swojej strony)

**WebAIM WAVE:**
https://wave.webaim.org/
(wpisz URL swojej strony)

**Google Lighthouse DevTools:**
1. Otwórz stronę w Chrome
2. F12 → Lighthouse tab
3. Kliknij "Analyze page load"

---

## Pomoc

Jeśli nadal masz problemy:
1. Sprawdź [TESTING-GUIDE.md](./TESTING-GUIDE.md)
2. Sprawdź logi serwera
3. Sprawdź czy dependencies są zainstalowane: `npm list lighthouse @axe-core/puppeteer`
