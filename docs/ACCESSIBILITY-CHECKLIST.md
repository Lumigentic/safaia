# Accessibility Checklist - Safaia Publishing

## ✅ WCAG 2.1 AA/AAA Compliance

### 1. ARIA Labels & Roles
**Status:** ⚠️ Wymaga poprawy

#### Obecne braki:
- [ ] Brak aria-label dla przycisków z ikonami bez tekstu
- [ ] Brak aria-label dla pól wyszukiwania
- [ ] Brak aria-live dla dynamicznych komunikatów (błędy formularza, sukces)
- [ ] Brak aria-expanded dla rozwijanego menu mobilnego (jeśli istnieje)

#### Poprawki do wdrożenia:

**Katalog - przycisk wyszukiwania:**
```tsx
// app/katalog/page.tsx:94-109
<div className="relative">
  <input
    type="search"
    placeholder="Szukaj po tytule, autorze lub tagu..."
    value={searchQuery}
    onChange={(e) => handleSearchChange(e.target.value)}
    aria-label="Wyszukaj książki po tytule, autorze lub tagu"
    className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 focus:border-sapphire focus:outline-none transition-colors text-lg"
  />
  <svg
    className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
</div>
```

**Przyciski nawigacji karuzeli:**
```tsx
// app/page.tsx - dodać aria-label
<button
  onClick={prevSlide}
  aria-label="Poprzednia strona wyróżnionych książek"
  className="w-12 h-12 bg-sapphire text-white hover:bg-sapphire-800 transition-colors flex items-center justify-center"
>
  <svg aria-hidden="true">...</svg>
</button>
```

**Komunikaty dynamiczne (live regions):**
```tsx
// app/dla-autorow/page.tsx - dodać aria-live
{errors.firstName && (
  <p className="text-red-600 text-sm mt-1" role="alert">
    {errors.firstName}
  </p>
)}

// Dla komunikatu sukcesu
<div role="status" aria-live="polite" className="sr-only">
  {submitStatus === 'success' ? 'Formularz został pomyślnie wysłany' : ''}
</div>
```

**Przyciski social media:**
```tsx
// components/Footer.tsx:16-26 - wszystkie już mają aria-label ✅
<a
  href="https://facebook.com"
  target="_blank"
  rel="noopener noreferrer"
  className="w-10 h-10 bg-white/10 hover:bg-white hover:text-sapphire rounded-full flex items-center justify-center transition-all"
  aria-label="Facebook"
>
```

---

### 2. Kontrast kolorów (WCAG AA: 4.5:1 dla tekstu, 3:1 dla elementów UI)
**Status:** ✅ Większość spełnia, ⚠️ wymaga weryfikacji

#### Do sprawdzenia:

**Tekst na ciemnym tle:**
- ✅ Biały tekst (#FFFFFF) na sapphire-900 (#1e293b) - kontrast ~14:1
- ✅ Tekst gray-700 (#374151) na białym - kontrast ~10:1

**Potencjalne problemy:**
- ⚠️ Tekst white/80 (rgba(255,255,255,0.8)) na sapphire-900
- ⚠️ Placeholder text (text-gray-400) - może być poniżej 4.5:1

**Narzędzie do sprawdzenia:**
```bash
# Użyć online: https://webaim.org/resources/contrastchecker/
# Lub zainstalować:
npm install --save-dev axe-core
```

**Poprawki jeśli potrzebne:**
```css
/* Jeśli text-white/80 nie przechodzi, zmienić na text-white/90 lub text-white */
.text-white\/80 {
  color: rgba(255, 255, 255, 0.9); /* Zwiększyć opacity */
}
```

---

### 3. Skip Link (Pomiń nawigację)
**Status:** ❌ Nie zaimplementowane

**Priorytet:** Wysoki

**Do zrobienia:**
Dodać "skip to main content" link jako pierwszy element w layoutcie:

```tsx
// app/layout.tsx - dodać jako pierwszy element w <body>
<body className={`${garamond.variable} ${inter.variable} antialiased`}>
  {/* Skip Link - widoczny tylko po focus */}
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-sapphire focus:text-white focus:font-medium focus:shadow-xl"
  >
    Przejdź do głównej treści
  </a>

  <Header />
  <main id="main-content">
    {children}
  </main>
  <Footer />
</body>
```

**CSS pomocniczy (dodać do globals.css):**
```css
/* Screen reader only - ukryty wizualnie, ale dostępny dla czytników ekranu */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.focus\:not-sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  padding: revert;
  margin: revert;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

---

### 4. Focus States (widoczne dla nawigacji klawiaturą)
**Status:** ⚠️ Częściowo zaimplementowane

**Obecne:**
- ✅ Focus states dla inputów (focus:border-sapphire)
- ✅ Focus dla linków (hover:text-sapphire)

**Brakuje:**
- [ ] Outline focus dla buttonów bez tła
- [ ] Focus visible dla interaktywnych kart książek
- [ ] Focus trap w modalach (jeśli będą dodane)

**Poprawki:**

```tsx
// Dodać focus-visible do wszystkich interaktywnych elementów

// Przyciski kategorii - app/katalog/page.tsx:115-127
<button
  className={`
    px-6 py-3 font-medium transition-all rounded-sm
    focus:outline-none focus-visible:ring-2 focus-visible:ring-sapphire focus-visible:ring-offset-2
    ${activeCategory === category
      ? 'bg-sapphire text-white shadow-lg'
      : 'bg-white text-sapphire border-2 border-sapphire hover:bg-sapphire hover:text-white'
    }
  `}
>
  {category}
</button>

// Karty książek - app/katalog/page.tsx:165-231
<Link
  href={`/katalog/${book.slug}`}
  className="group bg-white border border-gray-200 hover:shadow-2xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sapphire focus-visible:ring-offset-2"
>
```

**Globalne style focus (dodać do globals.css):**
```css
/* Focus styles dla lepszej accessibility */
:focus-visible {
  outline: 2px solid var(--color-sapphire);
  outline-offset: 2px;
}

/* Usunąć domyślny outline dla myszy, zachować dla klawiatury */
:focus:not(:focus-visible) {
  outline: none;
}
```

---

### 5. Keyboard Navigation
**Status:** ⚠️ Wymaga testowania

#### Checklist do testowania:

- [ ] **Tab** - przechodzi przez wszystkie interaktywne elementy w logicznej kolejności
- [ ] **Shift+Tab** - cofa się w nawigacji
- [ ] **Enter/Space** - aktywuje przyciski i linki
- [ ] **Escape** - zamyka modale/dropdowny
- [ ] **Arrow keys** - nawigacja w karuzeli (jeśli dodane)
- [ ] Brak "keyboard trap" - można wyjść z każdego elementu

**Do zaimplementowania - Karuzela z obsługą klawiatury:**

```tsx
// app/page.tsx - dodać obsługę klawiszy strzałek
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'ArrowLeft') {
    prevSlide();
  } else if (e.key === 'ArrowRight') {
    nextSlide();
  }
};

<div
  className="relative"
  onKeyDown={handleKeyDown}
  role="region"
  aria-label="Karuzela wyróżnionych książek"
  tabIndex={0}
>
  {/* Carousel content */}
</div>
```

**Form navigation:**
```tsx
// Upewnić się, że formularze mają logiczny tabindex (domyślnie OK w HTML)
// Dodać możliwość submit przez Enter

<form onSubmit={handleSubmit}>
  <input type="text" name="firstName" />
  <input type="text" name="lastName" />
  <button type="submit">Wyślij</button>
</form>
```

---

### 6. Alt Text dla obrazów
**Status:** ⚠️ Wymaga poprawy

#### Obecny stan:
- ❌ Brak prawdziwych obrazów - używane są placeholder emoji 📖
- ⚠️ SVG ikony bez aria-hidden

**Poprawki:**

```tsx
// Dekoracyjne SVG - dodać aria-hidden="true"
<svg
  className="w-12 h-12 text-gray-400"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
  aria-hidden="true"
>
  <path ... />
</svg>

// Gdy dodasz prawdziwe obrazy okładek:
<Image
  src={book.coverImage}
  alt={`Okładka książki "${book.title}" autorstwa ${book.author.name}`}
  width={400}
  height={600}
  priority={index < 3} // LCP optimization dla pierwszych 3
/>

// Dekoracyjne tła gradientowe - nie wymagają alt, ale emoji wymaga:
<span role="img" aria-label="Ikona książki" className="text-white/40 text-9xl">
  📖
</span>

// LUB lepiej - zamienić na dekoracyjne:
<span aria-hidden="true" className="text-white/40 text-9xl">
  📖
</span>
```

---

### 7. Form Labels & Error Handling
**Status:** ✅ Dobrze zaimplementowane, ⚠️ drobne poprawki

#### Obecne:
- ✅ Wszystkie inputy mają `<label>` z `htmlFor`
- ✅ Wymagane pola mają `required`
- ✅ Komunikaty błędów są wyświetlane

**Poprawki:**

```tsx
// app/dla-autorow/page.tsx - dodać aria-describedby dla błędów

<div>
  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
    Imię <span className="text-red-500">*</span>
  </label>
  <input
    type="text"
    id="firstName"
    name="firstName"
    required
    aria-required="true"
    aria-invalid={errors.firstName ? 'true' : 'false'}
    aria-describedby={errors.firstName ? 'firstName-error' : undefined}
    className={`w-full px-4 py-3 border-2 ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:border-sapphire focus:outline-none transition-colors`}
  />
  {errors.firstName && (
    <p id="firstName-error" className="text-red-600 text-sm mt-1" role="alert">
      {errors.firstName}
    </p>
  )}
</div>

// Checkbox dla zgody RODO
<div className="flex items-start gap-3">
  <input
    type="checkbox"
    id="consent"
    name="consent"
    required
    aria-required="true"
    aria-describedby="consent-description"
    className="mt-1 w-5 h-5 text-sapphire focus:ring-sapphire focus:ring-2"
  />
  <label htmlFor="consent" id="consent-description" className="text-sm text-gray-700">
    Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z{' '}
    <Link href="/polityka-prywatnosci" className="text-sapphire underline">
      polityką prywatności
    </Link>
    <span className="text-red-500">*</span>
  </label>
</div>
```

---

### 8. Headings Hierarchy
**Status:** ✅ Większość OK, ⚠️ wymaga weryfikacji

**Zasady:**
- Jedna `<h1>` na stronę (tytuł główny)
- Nie pomijać poziomów (h1 → h2 → h3, nie h1 → h3)
- Użycie headingów dla struktury, nie stylizacji

**Weryfikacja automatyczna:**
```bash
# Zainstaluj narzędzie do sprawdzania
npm install -D @axe-core/cli

# Sprawdź strukturę headingów
npx axe http://localhost:3000 --tags wcag2a,wcag2aa
```

**Poprawki w razie problemów:**
```tsx
// Jeśli element wygląda jak heading ale nim nie jest:
// ZŁE:
<p className="text-2xl font-bold">Tytuł sekcji</p>

// DOBRE:
<h2 className="text-2xl font-bold">Tytuł sekcji</h2>

// Jeśli heading musi wyglądać inaczej niż jego poziom semantyczny:
<h3 className="text-4xl font-display">Wizualnie duży, semantycznie h3</h3>
```

---

### 9. Color Independence (nie tylko kolor jako wskaźnik)
**Status:** ✅ Dobrze zaimplementowane

**Przykłady poprawnego użycia:**
- ✅ Błędy formularza - czerwony kolor + ikona + tekst
- ✅ Wymagane pola - gwiazdka + kolor + aria-required
- ✅ Przyciski aktywne - kolor + shadow + tekst

**Sprawdź czy nie ma:**
- ❌ "Wypełnij pola zaznaczone na czerwono" bez innego wskaźnika
- ❌ Linki odróżnione tylko kolorem (powinny mieć underline lub icon)

---

### 10. Responsive Text & Zoom
**Status:** ✅ Zaimplementowane

- ✅ Relatywne jednostki (rem, em) zamiast px dla tekstu
- ✅ Text skaluje się do 200% bez utraty funkcjonalności
- ✅ Brak horizontal scroll przy zoom

**Test:**
```
1. Otwórz stronę w przeglądarce
2. Ctrl/Cmd + (+) do powiększenia do 200%
3. Sprawdź czy:
   - Tekst jest czytelny
   - Brak horizontal scroll
   - Wszystkie funkcje działają
```

---

### 11. Touch Targets (min. 44x44px)
**Status:** ✅ Większość OK, ⚠️ sprawdzić małe ikony

**WCAG 2.1 Level AAA:** Wszystkie interaktywne elementy min. 44x44px

**Do sprawdzenia:**
- ✅ Przyciski nawigacji - 48x48px (w-12 h-12) ✓
- ✅ Social media icons - 40x40px (w-10 h-10) - można zwiększyć do 44px
- ⚠️ Tagi - mogą być zbyt małe dla touch

**Poprawki:**
```tsx
// components/Footer.tsx - zwiększyć social icons
<a
  href="https://facebook.com"
  className="w-11 h-11 bg-white/10 ..." // Zmienić z w-10 h-10
>

// Tagi - dodać większy padding
<span className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-full min-h-[44px] inline-flex items-center">
  #{tag}
</span>
```

---

### 12. Language & Semantics
**Status:** ❌ Brak lang attribute

**Do zrobienia:**

```tsx
// app/layout.tsx
<html lang="pl">
  <body>...</body>
</html>

// Jeśli są fragmenty w innym języku:
<blockquote lang="en">
  "Quote in English"
</blockquote>
```

---

### 13. Page Titles (unikalne i opisowe)
**Status:** ✅ Zaimplementowane dla książek

**Weryfikacja:** Każda strona musi mieć unikalny `<title>`

---

### 14. Loading States & Spinners
**Status:** ⚠️ Wymaga dodania aria-live

**Poprawki:**

```tsx
// app/dla-autorow/page.tsx - loading state
{isSubmitting && (
  <div
    role="status"
    aria-live="polite"
    aria-label="Wysyłanie formularza"
    className="mt-6"
  >
    <div className="w-full bg-gray-200 h-2 relative overflow-hidden">
      <div
        className="absolute top-0 left-0 h-full bg-sapphire transition-all duration-300"
        style={{ width: `${uploadProgress}%` }}
      ></div>
    </div>
    <p className="text-sm text-gray-600 mt-2 text-center">
      Wysyłanie... {uploadProgress}%
    </p>
  </div>
)}
```

---

### 15. Landmarks & Regions
**Status:** ⚠️ Wymaga dodania ARIA landmarks

**Do zrobienia:**

```tsx
// app/layout.tsx
<body>
  <a href="#main-content">Skip to main</a>

  <header role="banner">
    <nav role="navigation" aria-label="Główna nawigacja">
      {/* Menu */}
    </nav>
  </header>

  <main id="main-content" role="main">
    {children}
  </main>

  <footer role="contentinfo">
    {/* Footer content */}
  </footer>
</body>

// Na stronie głównej - sekcje
<section aria-labelledby="featured-books-heading">
  <h2 id="featured-books-heading">Wyróżnione tytuły</h2>
  {/* Content */}
</section>
```

---

## 🧪 Testy automatyczne

### Narzędzia:

1. **axe DevTools** (rozszerzenie przeglądarki)
   - Chrome: https://chrome.google.com/webstore/detail/axe-devtools
   - Firefox: https://addons.mozilla.org/en-US/firefox/addon/axe-devtools/

2. **WAVE** (rozszerzenie)
   - https://wave.webaim.org/extension/

3. **Lighthouse** (wbudowane w Chrome DevTools)
   ```bash
   # Lub CLI:
   npm install -g @lhci/cli
   lhci autorun
   ```

4. **axe-core** (programatyczne testy)
   ```bash
   npm install --save-dev @axe-core/cli
   npx axe http://localhost:3000
   ```

---

## 📋 Manualne testy

### Test nawigacji klawiaturowej:
1. Użyj tylko klawiatury (Tab, Shift+Tab, Enter, Escape, Strzałki)
2. Sprawdź czy focus jest widoczny
3. Sprawdź logiczną kolejność elementów
4. Upewnij się, że nie ma keyboard traps

### Test czytnika ekranu:
**macOS:**
```bash
# Włącz VoiceOver
Cmd + F5
```

**Windows:**
- NVDA (darmowy): https://www.nvaccess.org/download/
- JAWS (komercyjny): https://www.freedomscientific.com/products/software/jaws/

**Sprawdź:**
- Czy wszystkie interaktywne elementy są ogłaszane
- Czy struktura strony jest zrozumiała
- Czy formularze są łatwe do wypełnienia

### Test kontrastu:
- Użyj: https://webaim.org/resources/contrastchecker/
- Sprawdź wszystkie kombinacje kolorów tekstu/tła

### Test przy powiększeniu:
- Zoom 200%
- Zoom 400% (dla Level AAA)
- Sprawdź reflow i czytelność

---

## 🎯 Priorytety

### Krytyczne (Level A - wymaga natychmiastowej poprawy):
1. ✅ Dodać lang="pl" w HTML
2. ✅ Dodać Skip Link
3. ✅ Poprawić aria-labels dla buttonów bez tekstu
4. ✅ Dodać aria-hidden dla dekoracyjnych SVG
5. ✅ Focus states dla wszystkich interaktywnych elementów

### Ważne (Level AA - standardowe wymagania):
6. Sprawdzić i poprawić kontrast kolorów
7. Dodać aria-live dla komunikatów dynamicznych
8. Zwiększyć touch targets do min 44x44px
9. Dodać ARIA landmarks (role)
10. Keyboard navigation dla karuzeli

### Nice to have (Level AAA - najwyższe standardy):
11. Touch targets 48x48px
12. Enhanced error handling
13. Pomocnicze opisy dla complex interactions

---

## 📊 Metryki sukcesu

- **0 błędów krytycznych** w axe-core
- **Lighthouse Accessibility score** ≥ 95
- **WAVE errors** = 0
- **Manual keyboard test** - 100% nawigacji działa
- **Screen reader test** - wszystkie funkcje dostępne
