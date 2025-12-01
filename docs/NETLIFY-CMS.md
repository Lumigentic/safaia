# Netlify CMS - Migration Guide

Przewodnik migracji z lokalnego JSON storage do Netlify CMS (Git-based CMS).

---

## 🎯 Czym jest Netlify CMS?

**Netlify CMS** to open-source system zarządzania treścią oparty na Git:

**Zalety:**
- ✅ Bezpłatny i open-source
- ✅ Treści w repozytorium Git (markdown/JSON)
- ✅ Wersjonowanie automatyczne (Git commits)
- ✅ Prosty UI dla non-technical users
- ✅ Media library (upload obrazów)
- ✅ Editorial workflow (draft → review → publish)
- ✅ Nie wymaga bazy danych

**Wady:**
- ❌ Wolniejszy niż headless CMS (Git operations)
- ❌ Wymaga autentykacji przez GitHub/GitLab/Bitbucket
- ❌ Brak real-time collaboration
- ❌ Mniej funkcji niż Sanity/Contentful

**Idealny dla:**
- Small/medium publishing houses
- Static sites (Next.js SSG)
- Teams already using Git workflow

---

## 📦 Instalacja

### Krok 1: Install Netlify CMS

```bash
npm install netlify-cms-app
```

### Krok 2: Dodaj Netlify Identity (dla auth)

1. Załóż konto na [netlify.com](https://netlify.com)
2. Deploy swojej strony na Netlify
3. W dashboardzie Netlify:
   - Site Settings → Identity → Enable Identity
   - Registration preferences → Invite only
   - External providers → Add provider (GitHub)

### Krok 3: Dodaj Netlify Identity widget

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <head>
        {/* Netlify Identity Widget */}
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

## 🔧 Konfiguracja

### Krok 1: Utwórz folder admin

```bash
mkdir -p public/admin
```

### Krok 2: Utwórz public/admin/index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Admin - Safaia Publishing</title>
    <!-- Include the Netlify Identity script -->
    <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
  </head>
  <body>
    <!-- Include the Netlify CMS script -->
    <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>

    <!-- Initialize Netlify Identity -->
    <script>
      if (window.netlifyIdentity) {
        window.netlifyIdentity.on("init", user => {
          if (!user) {
            window.netlifyIdentity.on("login", () => {
              document.location.href = "/admin/";
            });
          }
        });
      }
    </script>
  </body>
</html>
```

### Krok 3: Utwórz public/admin/config.yml

```yaml
# Backend configuration
backend:
  name: git-gateway
  branch: main # Your production branch

# Media files
media_folder: "public/covers" # Where uploaded images will be stored
public_folder: "/covers" # Public URL path

# Collections
collections:
  # Books collection
  - name: "books"
    label: "Książki"
    folder: "content/books"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Tytuł", name: "title", widget: "string" }
      - { label: "Slug", name: "slug", widget: "string" }

      # Author
      - label: "Autor"
        name: "author"
        widget: "object"
        fields:
          - { label: "Imię i nazwisko", name: "name", widget: "string" }
          - { label: "Biografia", name: "bio", widget: "text", required: false }
          - { label: "Zdjęcie", name: "photo", widget: "image", required: false }
          - { label: "Email", name: "email", widget: "string", required: false }

      # Category
      - label: "Kategoria"
        name: "category"
        widget: "select"
        options:
          - { label: "Sztuka", value: "Sztuka" }
          - { label: "Moda", value: "Moda" }
          - { label: "Fotografia", value: "Fotografia" }
          - { label: "Kultura ludowa", value: "Kultura ludowa" }

      # Tags
      - label: "Tagi"
        name: "tags"
        widget: "list"
        required: false

      # Description
      - label: "Opis"
        name: "description"
        widget: "object"
        fields:
          - { label: "Krótki", name: "short", widget: "text" }
          - { label: "Pełny", name: "long", widget: "markdown" }

      # Excerpt
      - { label: "Fragment", name: "excerpt", widget: "markdown", required: false }

      # Table of Contents
      - label: "Spis treści"
        name: "tableOfContents"
        widget: "list"
        required: false
        fields:
          - { label: "Tytuł rozdziału", name: "title", widget: "string" }

      # Price and ISBN
      - { label: "Cena (PLN)", name: "price", widget: "number", value_type: "float" }
      - { label: "ISBN", name: "isbn", widget: "string", required: false }

      # Details
      - label: "Szczegóły"
        name: "details"
        widget: "object"
        fields:
          - { label: "Wymiary", name: "dimensions", widget: "string", required: false }
          - { label: "Liczba stron", name: "pages", widget: "number", value_type: "int" }
          - { label: "Rok wydania", name: "year", widget: "number", value_type: "int" }
          - label: "Oprawa"
            name: "binding"
            widget: "select"
            options: ["Twarda", "Miękka"]
          - { label: "Waga", name: "weight", widget: "string", required: false }
          - { label: "Język", name: "language", widget: "string", default: "Polski" }

      # Cover and Gallery
      - { label: "Okładka", name: "cover", widget: "image" }
      - label: "Galeria"
        name: "gallery"
        widget: "list"
        required: false
        field: { label: "Obraz", name: "image", widget: "image" }

      # Purchase Link
      - { label: "Link do zakupu", name: "purchaseLink", widget: "string", required: false }

      # Flags
      - { label: "Wyróżnione", name: "featured", widget: "boolean", default: false }
      - { label: "Nowość", name: "newRelease", widget: "boolean", default: false }
      - { label: "Polecane", name: "recommended", widget: "boolean", default: false }

  # Settings collection
  - name: "settings"
    label: "Ustawienia"
    files:
      - label: "O nas"
        name: "about"
        file: "content/settings/about.json"
        fields:
          - { label: "Tytuł", name: "title", widget: "string" }
          - { label: "Treść", name: "content", widget: "markdown" }
          - { label: "Misja", name: "mission", widget: "text" }

      - label: "Wartości"
        name: "values"
        file: "content/settings/values.json"
        fields:
          - label: "Wartości"
            name: "values"
            widget: "list"
            fields:
              - { label: "Ikona (emoji)", name: "icon", widget: "string" }
              - { label: "Tytuł", name: "title", widget: "string" }
              - { label: "Opis", name: "description", widget: "text" }

      - label: "Kontakt"
        name: "contact"
        file: "content/settings/contact.json"
        fields:
          - { label: "Email", name: "email", widget: "string" }
          - { label: "Telefon", name: "phone", widget: "string" }
          - { label: "Adres", name: "address", widget: "string" }
```

---

## 📂 Migracja danych

### Krok 1: Eksportuj dane z admin

1. Zaloguj się do `/admin`
2. Przejdź do `/admin/export`
3. Pobierz `safaia-books-YYYY-MM-DD.json`

### Krok 2: Utwórz folder content

```bash
mkdir -p content/books
mkdir -p content/settings
```

### Krok 3: Konwertuj JSON → Markdown

Utwórz skrypt `scripts/migrate-to-netlify-cms.js`:

```javascript
const fs = require('fs');
const path = require('path');

const booksData = require('../data/books.json');

// Convert book object to markdown frontmatter
function bookToMarkdown(book) {
  const frontmatter = `---
title: "${book.title}"
slug: "${book.slug}"
author:
  name: "${book.author.name}"
  bio: "${book.author.bio || ''}"
  photo: "${book.author.photo || ''}"
  email: "${book.author.email || ''}"
category: "${book.category}"
tags:
${book.tags.map(tag => `  - "${tag}"`).join('\n')}
description:
  short: "${book.description.short}"
  long: |
    ${book.description.long}
excerpt: |
  ${book.excerpt || ''}
price: ${book.price}
isbn: "${book.isbn || ''}"
details:
  dimensions: "${book.details.dimensions || ''}"
  pages: ${book.details.pages}
  year: ${book.details.year}
  binding: "${book.details.binding}"
  weight: "${book.details.weight || ''}"
  language: "${book.details.language}"
cover: "${book.cover}"
gallery:
${book.gallery.map(img => `  - "${img}"`).join('\n') || '  []'}
purchaseLink: "${book.purchaseLink || ''}"
featured: ${book.featured}
newRelease: ${book.newRelease}
recommended: ${book.recommended}
---

${book.description.long}
`;

  return frontmatter;
}

// Migrate all books
booksData.forEach((book) => {
  const markdown = bookToMarkdown(book);
  const filename = `content/books/${book.slug}.md`;

  fs.writeFileSync(filename, markdown);
  console.log(`✅ Created: ${filename}`);
});

console.log('\n✨ Migration complete!');
```

Uruchom:

```bash
node scripts/migrate-to-netlify-cms.js
```

### Krok 4: Commit i push

```bash
git add content/
git commit -m "Add book content for Netlify CMS"
git push origin main
```

---

## 🔄 Aktualizacja Next.js

### Krok 1: Utwórz content loader

```typescript
// lib/content.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Book } from '@/types/book';

const CONTENT_DIR = path.join(process.cwd(), 'content/books');

/**
 * Get all books from markdown files
 */
export async function getBooks(): Promise<Book[]> {
  const files = fs.readdirSync(CONTENT_DIR);

  const books = files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(CONTENT_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);

      return data as Book;
    });

  return books;
}

/**
 * Get book by slug
 */
export async function getBookBySlug(slug: string): Promise<Book | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(fileContent);

  return data as Book;
}
```

### Krok 2: Install gray-matter

```bash
npm install gray-matter
```

### Krok 3: Update pages

```tsx
// app/katalog/page.tsx
import { getBooks } from '@/lib/content'; // Changed from @/lib/storage

export default async function KatalogPage() {
  const books = await getBooks(); // Now reads from markdown
  // ... rest of code
}
```

---

## 🚀 Deployment

### Krok 1: Push to GitHub

```bash
git add .
git commit -m "Add Netlify CMS configuration"
git push origin main
```

### Krok 2: Deploy to Netlify

1. Login to [netlify.com](https://netlify.com)
2. New site from Git → Select repository
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Deploy site

### Krok 3: Enable Git Gateway

1. Site Settings → Identity → Enable Git Gateway
2. This allows Netlify CMS to commit to your repo

### Krok 4: Invite users

1. Site Settings → Identity → Invite users
2. Send invites to editors
3. They receive email to set password

---

## 📝 Użytkowanie

### Dostęp do CMS

```
https://your-site.netlify.app/admin
```

### Workflow

1. **Login** - Użytkownik loguje się przez Netlify Identity
2. **Edit** - Edytuje książkę w UI
3. **Save** - Netlify CMS commituje do Git
4. **Deploy** - Netlify automatycznie rebuilds site

### Editorial Workflow (opcjonalne)

W `config.yml` dodaj:

```yaml
publish_mode: editorial_workflow
```

Teraz masz 3 statusy:
- **Draft** - Work in progress
- **In Review** - Ready for review
- **Ready** - Approved, ready to publish

---

## ⚙️ Zaawansowane

### Custom widgets

```yaml
# public/admin/config.yml
collections:
  - name: "books"
    fields:
      # Custom color picker for category
      - label: "Kolor kategorii"
        name: "categoryColor"
        widget: "color"

      # Relation widget (link to author collection)
      - label: "Autor"
        name: "author"
        widget: "relation"
        collection: "authors"
        search_fields: ["name"]
        value_field: "name"
```

### Preview templates

Utwórz `public/admin/preview-templates.js`:

```javascript
// Custom preview for books
const BookPreview = createClass({
  render: function() {
    const entry = this.props.entry;

    return h('div', {},
      h('h1', {}, entry.getIn(['data', 'title'])),
      h('p', {}, entry.getIn(['data', 'description', 'short'])),
      h('img', { src: entry.getIn(['data', 'cover']) })
    );
  }
});

CMS.registerPreviewTemplate('books', BookPreview);
```

---

## 🆚 Netlify CMS vs Custom Admin

### Zachowaj custom admin jeśli:
- ✅ Chcesz pełną kontrolę nad UI
- ✅ Masz specyficzne wymagania biznesowe
- ✅ Potrzebujesz custom workflows
- ✅ Chcesz uniknąć vendor lock-in

### Użyj Netlify CMS jeśli:
- ✅ Chcesz Git-based workflow
- ✅ Potrzebujesz wersjonowania out-of-the-box
- ✅ Zespół jest przyzwyczajony do Git
- ✅ Nie chcesz budować UI od zera

### Możesz użyć obu!
- Custom admin dla zaawansowanych operacji
- Netlify CMS dla prostej edycji treści
- Oba mogą współistnieć (różne ścieżki)

---

## 📞 Wsparcie

Więcej informacji:
- [Netlify CMS Docs](https://www.netlifycms.org/docs/)
- [Configuration Options](https://www.netlifycms.org/docs/configuration-options/)
- [Widgets](https://www.netlifycms.org/docs/widgets/)
- [Editorial Workflow](https://www.netlifycms.org/docs/configuration-options/#publish-mode)

---

**Utworzono:** 2025-11-30
**Wersja:** 1.0.0
