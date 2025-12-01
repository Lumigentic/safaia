# Performance Checklist - Safaia Publishing

## 🚀 Core Web Vitals & Performance Optimization

### Core Web Vitals - Cele:
- **LCP (Largest Contentful Paint):** < 2.5s ⚡
- **FID (First Input Delay):** < 100ms ⚡
- **CLS (Cumulative Layout Shift):** < 0.1 ⚡
- **INP (Interaction to Next Paint):** < 200ms ⚡
- **TTFB (Time to First Byte):** < 800ms ⚡

---

## 1. Image Optimization

### Status: ❌ Wymaga wdrożenia (obecnie używane placeholder emoji)

#### Strategia optymalizacji obrazów:

**a) Format WebP/AVIF**

```tsx
// Gdy dodasz prawdziwe obrazy, użyj Next.js Image:
import Image from 'next/image';

<Image
  src="/covers/ikebana.jpg"
  alt="Okładka książki 'Japońska sztuka ikebany'"
  width={400}
  height={533}
  quality={85}
  placeholder="blur"
  blurDataURL={book.blurDataURL} // Dodać do danych książki
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover"
/>
```

**b) Generowanie blur placeholders**

```bash
# Instalacja narzędzia
npm install --save-dev plaiceholder sharp

# Skrypt do generowania blur placeholders
# scripts/generate-blur-placeholders.js
```

**c) Responsive images**

```tsx
// Różne rozmiary dla różnych viewportów
<Image
  src="/covers/book.jpg"
  alt="..."
  width={800}
  height={1200}
  sizes="(max-width: 640px) 90vw,
         (max-width: 1024px) 45vw,
         30vw"
/>
```

**d) Lazy loading**

```tsx
// Dla obrazków poniżej fold - automatyczne w Next.js Image
<Image
  src="/covers/book.jpg"
  alt="..."
  loading="lazy" // Domyślne
  width={400}
  height={600}
/>

// Dla hero image - priority loading
<Image
  src="/hero-bg.jpg"
  alt="..."
  priority // Załaduj natychmiast
  width={1920}
  height={1080}
/>
```

**e) Optymalizacja istniejących obrazów**

```bash
# Instaluj sharp dla automatycznej optymalizacji
npm install sharp

# Next.js automatycznie konwertuje do WebP
# Konfiguracja w next.config.js:
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
}
```

---

## 2. Font Optimization

### Status: ⚠️ Wymaga optymalizacji

**Obecna konfiguracja:**
```tsx
// app/layout.tsx
const garamond = Cormorant_Garamond({...});
const inter = Inter({...});
```

**Poprawki:**

**a) Font subsetting (tylko potrzebne znaki)**

```tsx
// app/layout.tsx - dodać subset i display
import { Cormorant_Garamond, Inter } from 'next/font/google';

const garamond = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'], // Polskie znaki
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-garamond',
  display: 'swap', // Zapobiega FOIT (Flash of Invisible Text)
  preload: true,
  fallback: ['Georgia', 'serif'],
});

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
});
```

**b) Preconnect do Google Fonts** (jeśli używasz zewnętrznych)

```tsx
// app/layout.tsx - dodać w <head>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
```

**c) Self-hosting fontów** (najlepsza opcja)

```bash
# Pobierz fonty lokalnie
npm install @fontsource/cormorant-garamond @fontsource/inter

# Zamiast Google Fonts API
import '@fontsource/cormorant-garamond/300.css';
import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/700.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
```

---

## 3. Critical CSS

### Status: ✅ Next.js automatycznie optymalizuje, ⚠️ można poprawić

**Obecna konfiguracja:**
- Tailwind CSS - automatycznie purge nieużywanych stylów w production
- CSS-in-JS - inline critical CSS

**Dodatkowa optymalizacja:**

**a) Inline critical CSS**

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <head>
        {/* Critical CSS inline - dla above-the-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Podstawowe style do pierwszego renderowania */
            body { margin: 0; font-family: system-ui; }
            .hero { min-height: 100vh; background: linear-gradient(...); }
          `
        }} />
      </head>
      <body>...</body>
    </html>
  );
}
```

**b) Defer non-critical CSS**

Next.js robi to automatycznie, ale możesz wymusić:

```tsx
// Dla styli które nie są krytyczne
import dynamic from 'next/dynamic';

const NonCriticalComponent = dynamic(() => import('./NonCritical'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});
```

---

## 4. JavaScript Bundle Optimization

### Status: ✅ Next.js automatic code splitting, ⚠️ można poprawić

**Strategia:**

**a) Dynamic imports dla ciężkich komponentów**

```tsx
// app/page.tsx - lazy load carousel
import dynamic from 'next/dynamic';

const BookCarousel = dynamic(() => import('@/components/BookCarousel'), {
  loading: () => (
    <div className="grid md:grid-cols-3 gap-8">
      {[1, 2, 3].map(i => (
        <div key={i} className="animate-pulse bg-gray-200 h-96" />
      ))}
    </div>
  ),
  ssr: true, // Renderuj na serwerze
});
```

**b) Client-side only dla interaktywnych komponentów**

```tsx
// Dla formularzy z walidacją
const AuthorForm = dynamic(() => import('@/components/AuthorForm'), {
  ssr: false, // Tylko w przeglądarce
});
```

**c) Bundle analysis**

```bash
# Zainstaluj analyzer
npm install --save-dev @next/bundle-analyzer

# next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // ... konfiguracja
});

# Uruchom analizę
ANALYZE=true npm run build
```

**d) Tree shaking - import tylko potrzebnych części**

```tsx
// ZŁE - importuje całą bibliotekę
import _ from 'lodash';
const result = _.debounce(fn, 300);

// DOBRE - importuje tylko debounce
import debounce from 'lodash/debounce';
const result = debounce(fn, 300);
```

---

## 5. Preloading & Prefetching

### Status: ⚠️ Wymaga dodania

**a) Preload krytycznych zasobów**

```tsx
// app/layout.tsx
<head>
  {/* Preload hero image */}
  <link
    rel="preload"
    as="image"
    href="/hero-image.jpg"
    type="image/jpeg"
  />

  {/* Preload critical fonts */}
  <link
    rel="preload"
    as="font"
    href="/fonts/cormorant-garamond.woff2"
    type="font/woff2"
    crossOrigin="anonymous"
  />
</head>
```

**b) DNS Prefetch dla zewnętrznych domen**

```tsx
<head>
  <link rel="dns-prefetch" href="https://formspree.io" />
  <link rel="dns-prefetch" href="https://www.google-analytics.com" />
</head>
```

**c) Next.js Link prefetching**

```tsx
// Domyślnie Next.js prefetchuje linki w viewport
<Link href="/katalog" prefetch={true}>
  Katalog
</Link>

// Wyłącz dla nieważnych linków
<Link href="/very-heavy-page" prefetch={false}>
  Heavy Page
</Link>
```

---

## 6. Caching Strategy

### Status: ✅ Next.js domyślne, ⚠️ można rozszerzyć

**a) HTTP Cache Headers**

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/covers/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

**b) Static Generation dla książek**

```tsx
// app/katalog/[slug]/page.tsx - już zaimplementowane ✅
export async function generateStaticParams() {
  const slugs = getAllBookSlugs();
  return slugs.map((slug) => ({ slug }));
}
```

**c) Revalidation dla dynamicznych danych**

```tsx
// Jeśli dodasz CMS lub API
export const revalidate = 3600; // Rewaliduj co godzinę

// Lub on-demand revalidation
import { revalidatePath } from 'next/cache';
revalidatePath('/katalog');
```

---

## 7. Database & API Optimization

### Status: ✅ Obecnie statyczne dane (books.json)

**Gdy przejdziesz na database:**

**a) Connection pooling**

```typescript
// lib/db.ts
import { Pool } from 'pg';

const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

**b) Query optimization**

```typescript
// Zoptymalizowane zapytanie
const books = await db.query(
  'SELECT id, slug, title, author, price FROM books WHERE category = $1 LIMIT 9',
  [category]
);

// Zamiast pobierać wszystko i filtrować w JS
```

**c) Caching API responses**

```typescript
import { unstable_cache } from 'next/cache';

const getBooks = unstable_cache(
  async () => {
    const books = await fetchBooksFromAPI();
    return books;
  },
  ['books-list'],
  { revalidate: 3600 }
);
```

---

## 8. Code Splitting per Route

### Status: ✅ Automatyczne w Next.js App Router

**Weryfikacja:**

```bash
npm run build

# Sprawdź rozmiary bundle'i
# Każda strona powinna mieć osobny chunk

# Route (app)                   Size     First Load JS
# ┌ ○ /                         5 kB          85 kB
# ├ ○ /katalog                  8 kB          88 kB
# ├ ● /katalog/[slug]           12 kB         92 kB
# ├ ○ /dla-autorow              15 kB         95 kB
```

---

## 9. Minimize Third-Party Scripts

### Status: ✅ Aktualnie brak heavy third-party

**Gdy dodajesz analytics/tracking:**

**a) Next.js Script component**

```tsx
// app/layout.tsx
import Script from 'next/script';

<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
  strategy="afterInteractive" // lub "lazyOnload"
/>

<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_ID');
  `}
</Script>
```

**b) Defer non-critical scripts**

```tsx
// Dla social media widgets, chat widgets, etc.
<Script
  src="https://platform.twitter.com/widgets.js"
  strategy="lazyOnload"
/>
```

---

## 10. React Performance Optimization

### Status: ⚠️ Można poprawić

**a) useMemo dla expensive computations**

```tsx
// app/katalog/page.tsx - już używa useMemo ✅
const filteredAndSortedBooks = useMemo(() => {
  // ... filtering logic
}, [activeCategory, searchQuery, sortBy]);
```

**b) useCallback dla event handlers**

```tsx
import { useCallback } from 'react';

const handleCategoryChange = useCallback((category: string) => {
  setActiveCategory(category);
  setCurrentPage(1);
}, []); // Dependency array pusta jeśli setters są stabilne
```

**c) React.memo dla czystych komponentów**

```tsx
// components/BookCard.tsx
import { memo } from 'react';

const BookCard = memo(({ book }: { book: Book }) => {
  return (
    <div>{book.title}</div>
  );
});

export default BookCard;
```

**d) Virtualization dla długich list**

```bash
npm install react-window

# Jeśli masz >50 książek w katalogu
```

```tsx
import { FixedSizeGrid } from 'react-window';

<FixedSizeGrid
  columnCount={3}
  columnWidth={300}
  height={600}
  rowCount={Math.ceil(books.length / 3)}
  rowHeight={400}
  width={1000}
>
  {({ columnIndex, rowIndex, style }) => (
    <div style={style}>
      <BookCard book={books[rowIndex * 3 + columnIndex]} />
    </div>
  )}
</FixedSizeGrid>
```

---

## 11. Server Components vs Client Components

### Status: ⚠️ Obecnie wszystko Client Components ('use client')

**Optymalizacja:**

**a) Przenieś statyczne części do Server Components**

```tsx
// app/katalog/page.tsx - podziel na Server i Client

// ServerPart.tsx (bez 'use client')
import { books } from '@/data/books';

export default function CatalogLayout() {
  return (
    <div>
      <header>...</header> {/* Static header */}
      <CatalogClient books={books} /> {/* Client for interactivity */}
    </div>
  );
}

// CatalogClient.tsx ('use client')
'use client';

export default function CatalogClient({ books }) {
  const [activeCategory, setActiveCategory] = useState('Wszystkie');
  // ... interactive logic
}
```

**b) Streaming dla długich operacji**

```tsx
import { Suspense } from 'react';

<Suspense fallback={<BooksSkeleton />}>
  <BooksList /> {/* Async Server Component */}
</Suspense>
```

---

## 12. Compression

### Status: ✅ Automatyczne w Next.js production build

**Weryfikacja:**

```javascript
// next.config.js - upewnij się że compress jest włączone
module.exports = {
  compress: true, // Domyślnie true w production
};
```

**Dla statycznego hostingu (Vercel/Netlify):**
- Gzip/Brotli automatyczne ✅

---

## 13. Remove Unused CSS/JS

### Status: ✅ Tailwind purge, ⚠️ sprawdź manualne style

**a) Tailwind purge config**

```javascript
// tailwind.config.ts
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Purge automatycznie usuwa nieużywane klasy
}
```

**b) Remove unused imports**

```bash
# Zainstaluj ESLint plugin
npm install --save-dev eslint-plugin-unused-imports

# .eslintrc.json
{
  "plugins": ["unused-imports"],
  "rules": {
    "unused-imports/no-unused-imports": "error"
  }
}
```

---

## 14. Reduce Layout Shift (CLS)

### Status: ⚠️ Wymaga testowania

**Poprawki:**

**a) Explicit dimensions dla obrazów**

```tsx
// Zawsze podawaj width i height
<Image
  src="/book.jpg"
  width={400}
  height={600}
  alt="..."
/>
```

**b) Reserve space dla dynamicznej zawartości**

```tsx
// Skeleton loader z takimi samymi wymiarami jak content
<div className="min-h-[400px]">
  {isLoading ? <Skeleton /> : <Content />}
</div>
```

**c) Font loading strategy**

```tsx
// font-display: swap już dodane w font config ✅
const garamond = Cormorant_Garamond({
  display: 'swap',
});
```

---

## 15. Service Worker & PWA (Optional)

### Status: ❌ Nie zaimplementowane

**Jeśli chcesz dodać PWA:**

```bash
npm install next-pwa

# next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  // Next.js config
});
```

---

## 🧪 Performance Testing

### Lighthouse CI

```bash
# Lokalnie
npm install -g @lhci/cli

# Uruchom test
lhci autorun --collect.url=http://localhost:3000
```

### WebPageTest

```
https://www.webpagetest.org/
```

### Chrome DevTools Performance

1. Otwórz DevTools (F12)
2. Performance tab
3. Start recording
4. Wczytaj stronę
5. Stop recording
6. Analizuj:
   - Scripting time
   - Rendering time
   - Painting time
   - Loading time

---

## 📊 Performance Budget

### Budżet zasobów:

```javascript
// .lighthouserc.json
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "first-contentful-paint": ["error", { "maxNumericValue": 2000 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "total-blocking-time": ["error", { "maxNumericValue": 300 }],
        "resource-summary:script:size": ["error", { "maxNumericValue": 200000 }],
        "resource-summary:image:size": ["error", { "maxNumericValue": 500000 }]
      }
    }
  }
}
```

---

## 🎯 Priorytety

### Krytyczne (zrobić natychmiast):
1. ✅ Dodać WebP/AVIF images dla okładek książek
2. ✅ Font optimization (display: swap, subset)
3. ✅ Lazy loading dla obrazów poniżej fold
4. ✅ Image blur placeholders

### Ważne (następna iteracja):
5. Bundle analysis i code splitting
6. Dynamic imports dla heavy components
7. Server Components gdzie to możliwe
8. Preload critical resources

### Nice to have:
9. Service Worker / PWA
10. Advanced caching strategies
11. CDN dla statycznych zasobów
12. Image CDN (Cloudinary, Imgix)

---

## 🔄 Monitoring

### Narzędzia do continuous monitoring:

1. **Vercel Analytics** (jeśli hostujesz na Vercel)
2. **Google PageSpeed Insights API**
3. **Lighthouse CI** w GitHub Actions
4. **Web Vitals monitoring** w Google Analytics 4

```tsx
// app/layout.tsx - Web Vitals reporting
import { sendGTMEvent } from '@next/third-parties/google';

export function reportWebVitals(metric) {
  sendGTMEvent({ event: 'web-vitals', value: metric });
}
```

---

## 📈 KPI do monitorowania

1. **LCP** < 2.5s (75th percentile)
2. **FID/INP** < 100ms / 200ms
3. **CLS** < 0.1
4. **TTFB** < 800ms
5. **Lighthouse Performance Score** ≥ 90
6. **Bundle Size** - JS < 200KB, Images < 500KB per page
7. **Page Load Time** < 3s (3G connection)
