# Sanity CMS - Migration Guide

Przewodnik migracji z lokalnego JSON storage do Sanity (Headless CMS).

---

## 🎯 Czym jest Sanity?

**Sanity** to nowoczesny headless CMS z real-time capabilities:

**Zalety:**
- ✅ Real-time collaboration (multiplayer editing)
- ✅ Potężny query language (GROQ)
- ✅ Customizable Studio (React-based)
- ✅ Image CDN z transformacjami
- ✅ Versioning i draft system
- ✅ GraphQL API (optional)
- ✅ Świetne DX (developer experience)

**Wady:**
- ❌ Paid (free tier: 3 users, 10k documents, 5GB assets)
- ❌ Wymaga backend (Sanity Cloud)
- ❌ Bardziej złożony setup niż Netlify CMS
- ❌ Vendor lock-in

**Idealny dla:**
- Medium/large publishing houses
- Teams współpracujące real-time
- Apps z dużą ilością treści
- Projekty wymagające custom workflows

**Pricing:**
- Free: 3 users, 10k docs, 5GB
- Growth: $99/mo - 15 users, unlimited docs, 50GB
- Enterprise: Custom pricing

---

## 📦 Instalacja

### Krok 1: Create Sanity project

```bash
npm create sanity@latest
```

Odpowiedz na pytania:
- Project name: `safaia-publishing`
- Dataset: `production`
- Output path: `studio` (w głównym katalogu projektu)
- Template: Clean project

### Krok 2: Install dependencies

```bash
cd studio
npm install
```

### Krok 3: Install Sanity client

W głównym projekcie Next.js:

```bash
npm install next-sanity @sanity/image-url
```

---

## 🔧 Konfiguracja

### Krok 1: Sanity schema - Book

Utwórz `studio/schemas/book.ts`:

```typescript
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'book',
  title: 'Książka',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'object',
      fields: [
        { name: 'name', type: 'string', title: 'Imię i nazwisko', validation: (Rule) => Rule.required() },
        { name: 'bio', type: 'text', title: 'Biografia' },
        { name: 'photo', type: 'image', title: 'Zdjęcie', options: { hotspot: true } },
        { name: 'email', type: 'string', title: 'Email' },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Kategoria',
      type: 'string',
      options: {
        list: [
          { title: 'Sztuka', value: 'Sztuka' },
          { title: 'Moda', value: 'Moda' },
          { title: 'Fotografia', value: 'Fotografia' },
          { title: 'Kultura ludowa', value: 'Kultura ludowa' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tagi',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'object',
      fields: [
        { name: 'short', type: 'text', title: 'Krótki', validation: (Rule) => Rule.required() },
        { name: 'long', type: 'text', title: 'Pełny', validation: (Rule) => Rule.required() },
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Fragment',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'tableOfContents',
      title: 'Spis treści',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [{ name: 'title', type: 'string', title: 'Tytuł rozdziału' }],
        },
      ],
    }),
    defineField({
      name: 'price',
      title: 'Cena (PLN)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'isbn',
      title: 'ISBN',
      type: 'string',
    }),
    defineField({
      name: 'details',
      title: 'Szczegóły',
      type: 'object',
      fields: [
        { name: 'dimensions', type: 'string', title: 'Wymiary' },
        { name: 'pages', type: 'number', title: 'Liczba stron' },
        { name: 'year', type: 'number', title: 'Rok wydania' },
        {
          name: 'binding',
          type: 'string',
          title: 'Oprawa',
          options: {
            list: ['Twarda', 'Miękka'],
          },
        },
        { name: 'weight', type: 'string', title: 'Waga' },
        { name: 'language', type: 'string', title: 'Język', initialValue: 'Polski' },
      ],
    }),
    defineField({
      name: 'cover',
      title: 'Okładka',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Galeria',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'purchaseLink',
      title: 'Link do zakupu',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: 'Wyróżnione',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'newRelease',
      title: 'Nowość',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'recommended',
      title: 'Polecane',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'cover',
      category: 'category',
    },
    prepare(selection) {
      const { title, author, category, media } = selection;
      return {
        title,
        subtitle: `${author} • ${category}`,
        media,
      };
    },
  },
});
```

### Krok 2: Sanity schema - Settings

Utwórz `studio/schemas/settings.ts`:

```typescript
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'settings',
  title: 'Ustawienia',
  type: 'document',
  fields: [
    defineField({
      name: 'about',
      title: 'O nas',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Tytuł' },
        { name: 'content', type: 'text', title: 'Treść' },
        { name: 'mission', type: 'text', title: 'Misja' },
      ],
    }),
    defineField({
      name: 'values',
      title: 'Wartości',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', type: 'string', title: 'Ikona (emoji)' },
            { name: 'title', type: 'string', title: 'Tytuł' },
            { name: 'description', type: 'text', title: 'Opis' },
          ],
        },
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Kontakt',
      type: 'object',
      fields: [
        { name: 'email', type: 'string', title: 'Email' },
        { name: 'phone', type: 'string', title: 'Telefon' },
        { name: 'address', type: 'string', title: 'Adres' },
      ],
    }),
  ],
});
```

### Krok 3: Register schemas

Utwórz `studio/schemas/index.ts`:

```typescript
import book from './book';
import settings from './settings';

export const schemaTypes = [book, settings];
```

W `studio/sanity.config.ts`:

```typescript
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'default',
  title: 'Safaia Publishing',

  projectId: 'your-project-id', // Find in manage.sanity.io
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
```

---

## 📂 Migracja danych

### Krok 1: Export z admin

1. Zaloguj się do `/admin`
2. Przejdź do `/admin/export`
3. Pobierz `safaia-books-YYYY-MM-DD.json`

### Krok 2: Install Sanity CLI

```bash
npm install -g @sanity/cli
sanity login
```

### Krok 3: Create migration script

Utwórz `scripts/migrate-to-sanity.js`:

```javascript
const fs = require('fs');
const sanityClient = require('@sanity/client');

const client = sanityClient({
  projectId: 'your-project-id',
  dataset: 'production',
  token: 'your-write-token', // Get from manage.sanity.io
  useCdn: false,
});

const booksData = require('../data/books.json');

async function uploadImage(imageUrl) {
  // If using local images, upload to Sanity
  // If using URLs, you can keep them or upload
  // For now, return a placeholder reference
  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: 'image-placeholder', // Replace with actual asset ID
    },
  };
}

async function migrateBook(book) {
  const sanityBook = {
    _type: 'book',
    title: book.title,
    slug: {
      _type: 'slug',
      current: book.slug,
    },
    author: {
      name: book.author.name,
      bio: book.author.bio,
      email: book.author.email,
      // photo: await uploadImage(book.author.photo),
    },
    category: book.category,
    tags: book.tags,
    description: {
      short: book.description.short,
      long: book.description.long,
    },
    excerpt: book.excerpt,
    tableOfContents: book.tableOfContents || [],
    price: book.price,
    isbn: book.isbn,
    details: {
      dimensions: book.details.dimensions,
      pages: book.details.pages,
      year: book.details.year,
      binding: book.details.binding,
      weight: book.details.weight,
      language: book.details.language,
    },
    // cover: await uploadImage(book.cover),
    // gallery: await Promise.all(book.gallery.map(uploadImage)),
    purchaseLink: book.purchaseLink,
    featured: book.featured,
    newRelease: book.newRelease,
    recommended: book.recommended,
  };

  return client.create(sanityBook);
}

async function migrate() {
  console.log('🚀 Starting migration...\n');

  for (const book of booksData) {
    try {
      await migrateBook(book);
      console.log(`✅ Migrated: ${book.title}`);
    } catch (error) {
      console.error(`❌ Failed: ${book.title}`, error);
    }
  }

  console.log('\n✨ Migration complete!');
}

migrate();
```

Uruchom:

```bash
node scripts/migrate-to-sanity.js
```

---

## 🔄 Aktualizacja Next.js

### Krok 1: Create Sanity client

Utwórz `lib/sanity.ts`:

```typescript
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
});

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
```

### Krok 2: Add environment variables

W `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-read-token
```

### Krok 3: Create queries

Utwórz `lib/sanity-queries.ts`:

```typescript
import { client } from './sanity';
import type { Book } from '@/types/book';

/**
 * Get all books
 */
export async function getBooks(): Promise<Book[]> {
  const query = `*[_type == "book"] | order(_createdAt desc) {
    title,
    "slug": slug.current,
    author {
      name,
      bio,
      "photo": photo.asset->url,
      email
    },
    category,
    tags,
    description {
      short,
      long
    },
    excerpt,
    tableOfContents,
    price,
    isbn,
    details {
      dimensions,
      pages,
      year,
      binding,
      weight,
      language
    },
    "cover": cover.asset->url,
    "gallery": gallery[].asset->url,
    purchaseLink,
    featured,
    newRelease,
    recommended
  }`;

  return client.fetch(query);
}

/**
 * Get book by slug
 */
export async function getBookBySlug(slug: string): Promise<Book | null> {
  const query = `*[_type == "book" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    author {
      name,
      bio,
      "photo": photo.asset->url,
      email
    },
    category,
    tags,
    description {
      short,
      long
    },
    excerpt,
    tableOfContents,
    price,
    isbn,
    details {
      dimensions,
      pages,
      year,
      binding,
      weight,
      language
    },
    "cover": cover.asset->url,
    "gallery": gallery[].asset->url,
    purchaseLink,
    featured,
    newRelease,
    recommended
  }`;

  return client.fetch(query, { slug });
}

/**
 * Get featured books
 */
export async function getFeaturedBooks(): Promise<Book[]> {
  const query = `*[_type == "book" && featured == true] | order(_createdAt desc) {
    title,
    "slug": slug.current,
    "cover": cover.asset->url,
    description {
      short
    },
    price
  }`;

  return client.fetch(query);
}

/**
 * Get books by category
 */
export async function getBooksByCategory(category: string): Promise<Book[]> {
  const query = `*[_type == "book" && category == $category] | order(_createdAt desc) {
    title,
    "slug": slug.current,
    author {
      name
    },
    "cover": cover.asset->url,
    description {
      short
    },
    price
  }`;

  return client.fetch(query, { category });
}
```

### Krok 4: Update pages

```tsx
// app/katalog/page.tsx
import { getBooks } from '@/lib/sanity-queries'; // Changed from @/lib/storage

export default async function KatalogPage() {
  const books = await getBooks(); // Now fetches from Sanity
  // ... rest of code
}
```

---

## 🚀 Deployment

### Krok 1: Deploy Sanity Studio

```bash
cd studio
sanity deploy
```

Wybierz subdomain: `safaia-publishing.sanity.studio`

Studio będzie dostępny pod: `https://safaia-publishing.sanity.studio`

### Krok 2: Deploy Next.js

Na Vercel/Netlify, dodaj environment variables:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=xxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=xxx
```

### Krok 3: Setup CORS

W Sanity dashboard → API → CORS:
- Add origin: `https://your-site.com`
- Allow credentials: Yes

### Krok 4: Setup webhooks (optional)

Dla ISR (Incremental Static Regeneration):

1. Sanity dashboard → API → Webhooks
2. Add webhook:
   - URL: `https://your-site.com/api/revalidate`
   - Dataset: `production`
   - Trigger on: Create, Update, Delete

Utwórz `app/api/revalidate/route.ts`:

```typescript
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  // Verify secret
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    // Revalidate all book pages
    revalidatePath('/katalog');
    revalidatePath('/katalog/[slug]');

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
```

---

## 📝 Użytkowanie Sanity Studio

### Dostęp do Studio

```
https://safaia-publishing.sanity.studio
```

Lub lokalnie:

```bash
cd studio
npm run dev
# Open http://localhost:3333
```

### Tworzenie książki

1. Login do Studio
2. Kliknij "Book" → Create
3. Wypełnij pola
4. Upload cover (drag & drop)
5. Publish

### Real-time collaboration

- Widzisz kursor innych użytkowników
- Live updates (bez refresh)
- Draft system (auto-save)

### Vision tool

- Test GROQ queries live
- Dostępne w Studio → Vision
- Przykład query:

```groq
*[_type == "book" && featured == true] {
  title,
  "slug": slug.current,
  "coverUrl": cover.asset->url
}
```

---

## ⚙️ Zaawansowane

### Customizing Studio

W `studio/sanity.config.ts`:

```typescript
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';

export default defineConfig({
  // ... config

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Treści')
          .items([
            // Books section
            S.listItem()
              .title('Książki')
              .child(
                S.documentTypeList('book')
                  .title('Wszystkie książki')
                  .filter('_type == "book"')
              ),

            // Divider
            S.divider(),

            // Settings (singleton)
            S.listItem()
              .title('Ustawienia')
              .child(
                S.document()
                  .schemaType('settings')
                  .documentId('settings')
              ),
          ]),
    }),
  ],
});
```

### Image transformations

```typescript
import { urlFor } from '@/lib/sanity';

// Generate optimized image URL
const imageUrl = urlFor(book.cover)
  .width(400)
  .height(600)
  .fit('crop')
  .format('webp')
  .quality(80)
  .url();
```

### GraphQL API (optional)

Enable in Sanity dashboard → API → GraphQL

Query example:

```graphql
query {
  allBook(where: { featured: { eq: true } }) {
    title
    slug {
      current
    }
    cover {
      asset {
        url
      }
    }
  }
}
```

---

## 💰 Koszty

### Free tier limits:
- 3 admin users
- 10,000 documents
- 5GB assets
- 100k API CDN requests/month

### When to upgrade?
- More than 3 editors
- More than 10k books (unlikely)
- More than 5GB images
- High traffic (>100k requests/month)

### Growth plan ($99/mo):
- 15 users
- Unlimited documents
- 50GB assets
- 1M API requests/month

---

## 🆚 Sanity vs Netlify CMS vs Custom

### Użyj Sanity jeśli:
- ✅ Potrzebujesz real-time collaboration
- ✅ Masz budget ($99/mo+)
- ✅ Chcesz potężny query language (GROQ)
- ✅ Potrzebujesz image CDN
- ✅ Zespół chce nowoczesny UX

### Użyj Netlify CMS jeśli:
- ✅ Chcesz Git-based workflow
- ✅ Bezpłatne rozwiązanie
- ✅ Mniejszy zespół (1-3 osoby)
- ✅ Static site generation

### Zachowaj custom admin jeśli:
- ✅ Potrzebujesz pełnej kontroli
- ✅ Specyficzne wymagania
- ✅ Nie chcesz vendor lock-in
- ✅ Chcesz uniknąć kosztów

---

## 📞 Wsparcie

Więcej informacji:
- [Sanity Docs](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Schema Types](https://www.sanity.io/docs/schema-types)
- [Image API](https://www.sanity.io/docs/image-url)

---

**Utworzono:** 2025-11-30
**Wersja:** 1.0.0
