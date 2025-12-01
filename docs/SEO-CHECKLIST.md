# SEO Checklist - Safaia Publishing

## ✅ 15 Najważniejszych Punktów SEO

### 1. Meta Title (Tytuł strony)
**Status:** ✅ Zaimplementowane
- Każda strona ma unikalny tytuł
- Format: `[Tytuł] | Safaia` (max 60 znaków)
- Książki: `[Tytuł książki] - [Autor] | Safaia`

**Lokalizacja:**
- `app/layout.tsx` - tytuł domyślny
- `app/katalog/[slug]/page.tsx:15-26` - dynamiczne tytuły dla książek

**Weryfikacja:**
```bash
# Sprawdź czy wszystkie strony mają tytuły
grep -r "title:" app/*/page.tsx
```

---

### 2. Meta Description
**Status:** ✅ Zaimplementowane dla książek, ⚠️ Wymaga dodania dla pozostałych stron

- Maksymalnie 155-160 znaków
- Unikalne dla każdej strony
- Zawiera główne słowa kluczowe

**Do zrobienia:**
- [ ] Dodać meta description dla strony głównej
- [ ] Dodać meta description dla strony "O nas"
- [ ] Dodać meta description dla katalogu
- [ ] Dodać meta description dla "Dla autorów"
- [ ] Dodać meta description dla kontaktu

**Przykład implementacji:**
```typescript
// app/page.tsx
export const metadata: Metadata = {
  title: 'Safaia - Wydawnictwo o sztuce, modzie i fotografii',
  description: 'Odkryj klejnoty literatury faktu o sztuce, modzie, fotografii i kulturze ludowej. Starannie wyselekcjonowane publikacje od niezależnego wydawnictwa Safaia.',
  keywords: ['wydawnictwo', 'sztuka', 'moda', 'fotografia', 'kultura ludowa', 'książki'],
}
```

---

### 3. Open Graph Tags (Facebook, LinkedIn)
**Status:** ✅ Zaimplementowane dla książek

- og:title
- og:description
- og:type (book)
- og:image (min. 1200x630px)
- og:url

**Lokalizacja:** `app/katalog/[slug]/page.tsx:21-33`

**Weryfikacja:**
- Test: https://developers.facebook.com/tools/debug/

---

### 4. Twitter Card Tags
**Status:** ✅ Zaimplementowane dla książek

- twitter:card (summary_large_image)
- twitter:title
- twitter:description
- twitter:image

**Lokalizacja:** `app/katalog/[slug]/page.tsx:34-39`

**Weryfikacja:**
- Test: https://cards-dev.twitter.com/validator

---

### 5. Structured Data (JSON-LD) dla książek
**Status:** ❌ Nie zaimplementowane

**Priorytet:** Wysoki

**Do zrobienia:**
Dodać schema.org structured data typu `Book` dla każdej książki:

```typescript
// app/katalog/[slug]/page.tsx - dodać w komponencie
const bookStructuredData = {
  "@context": "https://schema.org",
  "@type": "Book",
  "name": book.title,
  "author": {
    "@type": "Person",
    "name": book.author.name,
    "email": book.author.email
  },
  "isbn": book.isbn,
  "bookFormat": "https://schema.org/Hardcover",
  "inLanguage": "pl",
  "numberOfPages": book.pages,
  "publisher": {
    "@type": "Organization",
    "name": "Wydawnictwo Safaia"
  },
  "datePublished": book.publishedDate,
  "description": book.description,
  "aggregateRating": book.reviews.length > 0 ? {
    "@type": "AggregateRating",
    "ratingValue": (book.reviews.reduce((sum, r) => sum + r.rating, 0) / book.reviews.length).toFixed(1),
    "reviewCount": book.reviews.length,
    "bestRating": 5,
    "worstRating": 1
  } : undefined,
  "offers": {
    "@type": "Offer",
    "price": parseFloat(book.price.replace(' zł', '').replace(',', '.')),
    "priceCurrency": "PLN",
    "availability": "https://schema.org/InStock",
    "url": book.purchaseLink
  }
};

// Dodać w JSX:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(bookStructuredData) }}
/>
```

**Weryfikacja:**
- Test: https://search.google.com/test/rich-results

---

### 6. Canonical URLs
**Status:** ❌ Nie zaimplementowane

**Priorytet:** Średni

**Do zrobienia:**
Dodać canonical URL dla każdej strony:

```typescript
// app/layout.tsx lub każda strona
export const metadata: Metadata = {
  metadataBase: new URL('https://safaia.pl'),
  alternates: {
    canonical: './', // Relatywny do bieżącej strony
  },
}
```

---

### 7. Sitemap.xml
**Status:** ❌ Nie zaimplementowane

**Priorytet:** Wysoki

**Do zrobienia:**
Utworzyć plik `app/sitemap.ts`:

```typescript
import { MetadataRoute } from 'next';
import { getAllBookSlugs } from '@/data/books';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://safaia.pl';

  // Statyczne strony
  const staticPages = [
    '',
    '/o-nas',
    '/katalog',
    '/dla-autorow',
    '/aktualnosci',
    '/kontakt',
    '/polityka-prywatnosci',
    '/regulamin',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamiczne strony książek
  const bookSlugs = getAllBookSlugs();
  const bookPages = bookSlugs.map(slug => ({
    url: `${baseUrl}/katalog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...bookPages];
}
```

**Weryfikacja:**
```bash
curl http://localhost:3000/sitemap.xml
```

---

### 8. Robots.txt
**Status:** ❌ Nie zaimplementowane

**Priorytet:** Wysoki

**Do zrobienia:**
Utworzyć plik `app/robots.ts`:

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: 'https://safaia.pl/sitemap.xml',
  };
}
```

**Weryfikacja:**
```bash
curl http://localhost:3000/robots.txt
```

---

### 9. Semantic HTML & Heading Hierarchy
**Status:** ✅ Częściowo zaimplementowane

**Weryfikacja:**
- Każda strona ma tylko jeden `<h1>`
- Headingi w kolejności (h1 → h2 → h3)
- Używanie `<article>`, `<section>`, `<nav>`, `<aside>`

**Do sprawdzenia:**
```bash
# Sprawdź hierarchię headingów
grep -rn "<h[1-6]" app/
```

---

### 10. Alt Text dla wszystkich obrazów
**Status:** ⚠️ Wymaga weryfikacji

**Do zrobienia:**
- [ ] Sprawdzić czy wszystkie dekoracyjne SVG mają `aria-hidden="true"`
- [ ] Dodać znaczące alt text dla obrazów funkcjonalnych
- [ ] Użyć pustego alt="" dla obrazów czysto dekoracyjnych

**Przykład:**
```tsx
// Dekoracyjne
<svg aria-hidden="true">...</svg>

// Funkcjonalne
<Image
  src="/covers/book.jpg"
  alt="Okładka książki 'Japońska sztuka ikebany' autorstwa Anny Kowalskiej"
  width={400}
  height={600}
/>
```

---

### 11. Responsywne meta tagi
**Status:** ✅ Zaimplementowane

**Weryfikacja:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

**Lokalizacja:** Next.js dodaje automatycznie w `app/layout.tsx`

---

### 12. Language Declaration
**Status:** ❌ Nie zaimplementowane

**Priorytet:** Średni

**Do zrobienia:**
Dodać atrybut `lang` w `app/layout.tsx`:

```tsx
<html lang="pl">
```

---

### 13. Performance Metrics (Core Web Vitals)
**Status:** ⚠️ Wymaga optymalizacji

**Kluczowe metryki:**
- LCP (Largest Contentful Paint) < 2.5s
- FID (First Input Delay) < 100ms
- CLS (Cumulative Layout Shift) < 0.1

**Do zrobienia:**
- [ ] Optymalizacja obrazów (WebP, responsive images)
- [ ] Lazy loading dla obrazów poniżej fold
- [ ] Font optimization
- [ ] Code splitting

---

### 14. Internal Linking Structure
**Status:** ✅ Zaimplementowane

- Breadcrumbs na stronie książki
- Menu nawigacyjne w Footer
- Powiązane książki
- CTA z linkami wewnętrznymi

**Weryfikacja:**
Sprawdzić czy wszystkie ważne strony są dostępne w max. 3 kliknięciach od strony głównej.

---

### 15. HTTPS & Security Headers
**Status:** ⚠️ Zależy od hostingu

**Do zrobienia po wdrożeniu:**
- [ ] Wymuszenie HTTPS (redirect z HTTP)
- [ ] Dodanie security headers w `next.config.js`:

```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

---

## 📊 Narzędzia do weryfikacji

### Google Search Console
- Dodać i zweryfikować domenę
- Przesłać sitemap.xml
- Monitorować indeksowanie i błędy

### Google PageSpeed Insights
```
https://pagespeed.web.dev/
```

### Schema Markup Validator
```
https://validator.schema.org/
```

### SEO Spider Tools
- Screaming Frog SEO Spider
- Sitebulb
- Ahrefs Site Audit

---

## 🎯 Priorytety implementacji

### Wysoki priorytet (zrobić natychmiast):
1. Dodać meta descriptions dla wszystkich stron
2. Zaimplementować sitemap.xml
3. Zaimplementować robots.txt
4. Dodać structured data (JSON-LD) dla książek
5. Dodać lang="pl" w HTML

### Średni priorytet (zrobić w następnej kolejności):
6. Canonical URLs
7. Optymalizacja obrazów (WebP)
8. Security headers

### Niski priorytet (nice to have):
9. Breadcrumbs structured data
10. Organization structured data
11. FAQ schema (jeśli dodamy sekcję FAQ)

---

## 📈 KPI do monitorowania

1. **Pozycje w Google** - Top 10 dla kluczowych fraz
2. **Organic Traffic** - Wzrost ruchu organicznego o 30% miesięcznie
3. **CTR w wynikach wyszukiwania** - >3%
4. **Liczba zaindeksowanych stron** - 100% ważnych stron
5. **Core Web Vitals** - >90% URL w zielonym zakresie
6. **Mobile Usability** - Brak błędów w Google Search Console
