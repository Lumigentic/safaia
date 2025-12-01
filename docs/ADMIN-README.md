# Admin CMS - Safaia Publishing House

Kompletny system administracyjny do zarządzania katalogiem książek, treściami strony i ustawieniami.

---

## 📦 Co zostało dostarczone

### 1. System autentykacji
- **[lib/auth.ts](../lib/auth.ts)** - Prosty system autentykacji z hasłem
- **[app/api/admin/login/route.ts](../app/api/admin/login/route.ts)** - Endpoint logowania
- **[app/api/admin/logout/route.ts](../app/api/admin/logout/route.ts)** - Endpoint wylogowania
- **[app/admin/login/page.tsx](../app/admin/login/page.tsx)** - Strona logowania

**Funkcje:**
- ✅ Autentykacja hasłem (environment variable)
- ✅ Haszowanie SHA-256 z solą
- ✅ Sesje oparte na ciasteczkach (24h)
- ✅ Ochrona wszystkich tras `/admin/*`

### 2. Panel administracyjny
- **[app/admin/layout.tsx](../app/admin/layout.tsx)** - Layout z ochroną autentykacji
- **[components/admin/AdminNav.tsx](../components/admin/AdminNav.tsx)** - Nawigacja
- **[app/admin/page.tsx](../app/admin/page.tsx)** - Dashboard ze statystykami

**Funkcje:**
- ✅ Dashboard z podglądem statystyk
- ✅ Responsywna nawigacja
- ✅ Przycisk wylogowania
- ✅ Link do strony głównej

### 3. CRUD dla książek
- **[lib/storage.ts](../lib/storage.ts)** - Lokalne storage (JSON)
- **[app/admin/books/page.tsx](../app/admin/books/page.tsx)** - Lista książek
- **[app/admin/books/new/page.tsx](../app/admin/books/new/page.tsx)** - Nowa książka
- **[app/admin/books/[slug]/edit/page.tsx](../app/admin/books/[slug]/edit/page.tsx)** - Edycja książki
- **[components/admin/BookForm.tsx](../components/admin/BookForm.tsx)** - Formularz
- **[components/admin/DeleteBookButton.tsx](../components/admin/DeleteBookButton.tsx)** - Usuwanie

**Funkcje:**
- ✅ Lista wszystkich książek z miniaturami
- ✅ Filtrowanie po statusach (wyróżnione, nowości, polecane)
- ✅ Formularz z wszystkimi polami (tytuł, autor, kategoria, opis, szczegóły)
- ✅ Auto-generowanie slug z tytułu
- ✅ Walidacja pól wymaganych
- ✅ Potwierdzenie przed usunięciem

### 4. API endpoints
- **[app/api/admin/books/route.ts](../app/api/admin/books/route.ts)** - GET all, POST new
- **[app/api/admin/books/[slug]/route.ts](../app/api/admin/books/[slug]/route.ts)** - GET, PUT, DELETE single

**Funkcje:**
- ✅ RESTful API dla wszystkich operacji CRUD
- ✅ Ochrona autentykacją (requireAuth)
- ✅ Obsługa błędów (404, 409, 500)
- ✅ Walidacja danych wejściowych

### 5. Export danych
- **[app/admin/export/page.tsx](../app/admin/export/page.tsx)** - Strona exportu
- **[components/admin/ExportButtons.tsx](../components/admin/ExportButtons.tsx)** - Przyciski exportu

**Funkcje:**
- ✅ Export do JSON (pełna struktura)
- ✅ Export do CSV (podstawowe pola)
- ✅ Kodowanie UTF-8 (polskie znaki)
- ✅ BOM dla Excel compatibility
- ✅ Nazwy plików z datą

### 6. Edytor ustawień
- **[lib/settings.ts](../lib/settings.ts)** - Storage dla ustawień
- **[app/admin/settings/page.tsx](../app/admin/settings/page.tsx)** - Strona ustawień
- **[components/admin/SettingsForm.tsx](../components/admin/SettingsForm.tsx)** - Formularz
- **[app/api/admin/settings/route.ts](../app/api/admin/settings/route.ts)** - API endpoint

**Funkcje:**
- ✅ Edycja strony "O nas"
- ✅ Edycja 4 wartości (ikona, tytuł, opis)
- ✅ Edycja danych kontaktowych
- ✅ Automatyczny zapis domyślnych wartości

---

## 🚀 Quick Start

### Krok 1: Ustaw hasło administratora

Utwórz plik `.env.local` w głównym katalogu projektu:

```bash
ADMIN_PASSWORD=twoje-bezpieczne-haslo
ADMIN_SALT=losowa-sol-do-haszowania
```

**Ważne:** Nigdy nie commituj `.env.local` do repozytorium!

Jeśli nie ustawisz hasła, domyślne to `safaia2024` (tylko dev mode).

### Krok 2: Uruchom projekt

```bash
npm run dev
```

### Krok 3: Zaloguj się do admina

1. Otwórz [http://localhost:3000/admin](http://localhost:3000/admin)
2. Zostaniesz przekierowany do `/admin/login`
3. Wprowadź hasło
4. Kliknij "Zaloguj się"

### Krok 4: Dodaj pierwszą książkę

1. W dashboardzie kliknij "Dodaj nową książkę"
2. Wypełnij formularz:
   - Tytuł: np. "Historia sztuki współczesnej"
   - Slug: automatycznie wygenerowany (możesz edytować)
   - Autor: Imię i nazwisko
   - Kategoria: Wybierz z listy
   - Opis krótki i pełny
   - Cena, ISBN, szczegóły
   - URL okładki: `/covers/nazwa-pliku.jpg`
3. Kliknij "Utwórz książkę"

---

## 📂 Struktura plików

```
safaia-publishing/
├── app/
│   ├── admin/
│   │   ├── layout.tsx              # Layout z ochroną auth
│   │   ├── page.tsx                # Dashboard
│   │   ├── login/
│   │   │   └── page.tsx            # Strona logowania
│   │   ├── books/
│   │   │   ├── page.tsx            # Lista książek
│   │   │   ├── new/
│   │   │   │   └── page.tsx        # Nowa książka
│   │   │   └── [slug]/
│   │   │       └── edit/
│   │   │           └── page.tsx    # Edycja książki
│   │   ├── settings/
│   │   │   └── page.tsx            # Ustawienia
│   │   └── export/
│   │       └── page.tsx            # Export danych
│   │
│   └── api/
│       └── admin/
│           ├── login/
│           │   └── route.ts        # POST login
│           ├── logout/
│           │   └── route.ts        # POST logout
│           ├── books/
│           │   ├── route.ts        # GET all, POST new
│           │   └── [slug]/
│           │       └── route.ts    # GET, PUT, DELETE single
│           └── settings/
│               └── route.ts        # PUT settings
│
├── components/
│   └── admin/
│       ├── AdminNav.tsx            # Nawigacja
│       ├── BookForm.tsx            # Formularz książki
│       ├── DeleteBookButton.tsx   # Przycisk usuwania
│       ├── ExportButtons.tsx      # Przyciski exportu
│       └── SettingsForm.tsx       # Formularz ustawień
│
├── lib/
│   ├── auth.ts                     # System autentykacji
│   ├── storage.ts                  # Storage książek
│   └── settings.ts                 # Storage ustawień
│
├── data/                            # Dane (JSON)
│   ├── books.json                  # Lista książek
│   └── settings.json               # Ustawienia
│
└── docs/
    ├── ADMIN-README.md             # Ten plik
    ├── ADMIN-IMAGE-UPLOAD.md       # Przewodnik upload obrazów
    ├── NETLIFY-CMS.md              # Migracja do Netlify CMS
    └── SANITY.md                   # Migracja do Sanity
```

---

## 🎯 Funkcje szczegółowo

### Autentykacja

#### Konfiguracja hasła

```bash
# .env.local
ADMIN_PASSWORD=moje-super-haslo
ADMIN_SALT=moja-losowa-sol-123
```

#### Haszowanie

```typescript
// lib/auth.ts
function hashPassword(password: string): string {
  return crypto
    .createHash('sha256')
    .update(password + process.env.ADMIN_SALT)
    .digest('hex');
}
```

#### Sesje

- Długość: 24 godziny
- Storage: Cookie `safaia_admin_session`
- Flagi: `httpOnly`, `secure` (prod), `sameSite: lax`

#### Ochrona tras

```typescript
// app/admin/layout.tsx
const authenticated = await isAuthenticated();
if (!authenticated) {
  redirect('/admin/login');
}
```

### Storage lokalny

#### Książki - data/books.json

```json
[
  {
    "title": "Historia sztuki współczesnej",
    "slug": "historia-sztuki-wspolczesnej",
    "author": {
      "name": "Jan Kowalski",
      "bio": "...",
      "photo": "/authors/jan-kowalski.jpg",
      "email": "jan@example.com"
    },
    "category": "Sztuka",
    "tags": ["sztuka współczesna", "historia"],
    "description": {
      "short": "Krótki opis...",
      "long": "Pełny opis..."
    },
    "excerpt": "Fragment...",
    "tableOfContents": [],
    "price": 89.99,
    "isbn": "978-83-XXXXX-XX-X",
    "details": {
      "dimensions": "21 × 29.7 cm",
      "pages": 320,
      "year": 2024,
      "binding": "Twarda",
      "weight": "800 g",
      "language": "Polski"
    },
    "cover": "/covers/historia-sztuki.jpg",
    "gallery": ["/gallery/img1.jpg", "/gallery/img2.jpg"],
    "purchaseLink": "https://sklep.example.com/ksiazka",
    "featured": true,
    "newRelease": true,
    "recommended": false
  }
]
```

#### Ustawienia - data/settings.json

```json
{
  "about": {
    "title": "O nas",
    "content": "Safaia Publishing House...",
    "mission": "Naszą misją..."
  },
  "values": [
    {
      "title": "Otwartość",
      "description": "Przyjmujemy różnorodność...",
      "icon": "🌍"
    }
  ],
  "contact": {
    "email": "kontakt@safaia.pl",
    "phone": "+48 123 456 789",
    "address": "ul. Przykładowa 1, Warszawa"
  }
}
```

### API Endpoints

#### Autentykacja

```bash
# Login
POST /api/admin/login
Content-Type: application/json

{
  "password": "haslo"
}

# Response: 200 OK
{
  "success": true,
  "message": "Zalogowano pomyślnie"
}
```

```bash
# Logout
POST /api/admin/logout

# Response: 200 OK
{
  "success": true,
  "message": "Wylogowano pomyślnie"
}
```

#### Książki

```bash
# List all books
GET /api/admin/books
Authorization: Cookie

# Response: 200 OK
{
  "books": [...]
}
```

```bash
# Create book
POST /api/admin/books
Content-Type: application/json

{
  "title": "Nowa książka",
  "slug": "nowa-ksiazka",
  "author": { "name": "Jan Kowalski" },
  ...
}

# Response: 201 Created
{
  "success": true,
  "book": {...}
}
```

```bash
# Get single book
GET /api/admin/books/nowa-ksiazka

# Update book
PUT /api/admin/books/nowa-ksiazka
Content-Type: application/json

{
  "title": "Zaktualizowany tytuł",
  ...
}

# Delete book
DELETE /api/admin/books/nowa-ksiazka

# Response: 200 OK
{
  "success": true,
  "message": "Książka została usunięta"
}
```

#### Ustawienia

```bash
# Update settings
PUT /api/admin/settings
Content-Type: application/json

{
  "about": {...},
  "values": [...],
  "contact": {...}
}

# Response: 200 OK
{
  "success": true,
  "message": "Ustawienia zostały zapisane"
}
```

### Export danych

#### JSON Export

```javascript
// Pobiera: safaia-books-2024-11-30.json
// Format: JSON (pretty-print, 2 spaces)
// Rozmiar: ~50-200 KB (zależnie od liczby książek)
```

#### CSV Export

```csv
Tytuł,Slug,Autor,Kategoria,Tagi,Opis krótki,Cena,ISBN,...
"Historia sztuki","historia-sztuki","Jan Kowalski","Sztuka","sztuka; historia","Opis...",89.99,"978-83-...",...
```

- Separator: przecinek (`,`)
- Kodowanie: UTF-8 z BOM (dla Excel)
- Escape: podwójne cudzysłowy dla wartości z przecinkami

---

## 🔒 Bezpieczeństwo

### Zalecenia produkcyjne

1. **Silne hasło administratora:**
   ```bash
   ADMIN_PASSWORD=XyZ9$kL2#mN8@pQ4!rT6
   ADMIN_SALT=aB3cD4eF5gH6iJ7kL8mN9
   ```

2. **HTTPS tylko w produkcji:**
   - Sesje ustawione na `secure: true` tylko w production
   - Wymaga HTTPS dla bezpiecznego przesyłania ciasteczek

3. **Rate limiting:**
   - Rozważ dodanie middleware do limitowania prób logowania
   - Przykład: max 5 prób na 15 minut

4. **Backup danych:**
   ```bash
   # Regularny backup data/
   cp -r data/ backups/data-$(date +%Y%m%d)/
   ```

5. **Environment variables:**
   - Nigdy nie commituj `.env.local`
   - Ustaw zmienne w panelu hostingu (Vercel, Netlify)

---

## 📊 Dane testowe

Możesz użyć następującego pliku `data/books.json` do testów:

```json
[
  {
    "title": "Sztuka minimalizmu",
    "slug": "sztuka-minimalizmu",
    "author": {
      "name": "Anna Nowak",
      "bio": "Kuratorka sztuki współczesnej",
      "photo": "/authors/anna-nowak.jpg",
      "email": "anna@example.com"
    },
    "category": "Sztuka",
    "tags": ["minimalizm", "sztuka współczesna"],
    "description": {
      "short": "Przewodnik po sztuce minimalistycznej XX wieku.",
      "long": "Szczegółowy przewodnik po historii i filozofii sztuki minimalistycznej..."
    },
    "excerpt": "\"Minimalizm to nie tylko estetyka, ale sposób myślenia...\"",
    "tableOfContents": [],
    "price": 79.99,
    "isbn": "978-83-12345-67-8",
    "details": {
      "dimensions": "21 × 29.7 cm",
      "pages": 280,
      "year": 2024,
      "binding": "Twarda",
      "weight": "750 g",
      "language": "Polski"
    },
    "cover": "/covers/sztuka-minimalizmu.jpg",
    "gallery": [],
    "purchaseLink": "https://sklep.example.com/sztuka-minimalizmu",
    "featured": true,
    "newRelease": true,
    "recommended": true
  }
]
```

---

## 🆘 Troubleshooting

### Nie mogę się zalogować

**Problem:** "Nieprawidłowe hasło"

**Rozwiązanie:**
1. Sprawdź `.env.local` - czy ustawiłeś `ADMIN_PASSWORD`?
2. Restart dev server po zmianie `.env.local`
3. W dev mode domyślne hasło to `safaia2024`

### Książka nie zapisuje się

**Problem:** Błąd 409 "already exists"

**Rozwiązanie:**
- Slug musi być unikalny
- Zmień slug na inny (np. dodaj `-2` na końcu)

### Okładka nie wyświetla się

**Problem:** 404 dla obrazu

**Rozwiązanie:**
1. Upewnij się że plik istnieje w `public/covers/`
2. URL w formularzu powinien być względny: `/covers/nazwa.jpg`
3. Zobacz [ADMIN-IMAGE-UPLOAD.md](./ADMIN-IMAGE-UPLOAD.md)

### Data nie tworzy się

**Problem:** Folder `data/` nie istnieje

**Rozwiązanie:**
```bash
mkdir -p data
echo "[]" > data/books.json
echo "{}" > data/settings.json
```

Storage automatycznie utworzy folder przy pierwszym zapisie.

---

## 📝 Dalsze kroki

### 1. Upload obrazów

Zobacz [ADMIN-IMAGE-UPLOAD.md](./ADMIN-IMAGE-UPLOAD.md) dla:
- Upload do `/public/covers` i `/public/authors`
- Integracja z cloudinary/uploadthing
- API endpoint dla uploadu

### 2. Migracja do Netlify CMS

Zobacz [NETLIFY-CMS.md](./NETLIFY-CMS.md) dla:
- Konfiguracja Netlify CMS
- Migracja z lokalnego JSON
- Git-based workflow

### 3. Migracja do Sanity

Zobacz [SANITY.md](./SANITY.md) dla:
- Setup Sanity Studio
- Schemat content
- Migracja danych

---

## 📞 Wsparcie

Pytania? Zobacz:
- [ADMIN-README.md](./ADMIN-README.md) - Ten plik
- [ADMIN-IMAGE-UPLOAD.md](./ADMIN-IMAGE-UPLOAD.md) - Upload obrazów
- [NETLIFY-CMS.md](./NETLIFY-CMS.md) - Netlify CMS
- [SANITY.md](./SANITY.md) - Sanity CMS

---

**Utworzono:** 2025-11-30
**Wersja:** 1.0.0
