# Safaia - Wydawnictwo

Strona internetowa niezależnego wydawnictwa specjalizującego się w literaturze faktu o sztuce, modzie, fotografii i kulturze ludowej.

## 📚 O projekcie

Safaia to elegancka, responsywna strona wydawnictwa zbudowana z wykorzystaniem najnowszych technologii webowych. Projekt łączy premium editorial design z nowoczesnym stackiem technologicznym.

### Główne funkcje

- **Katalog książek** z filtrowaniem po kategoriach i wyszukiwaniem
- **Szczegółowe strony książek** z pełnymi opisami i informacjami
- **Formularz dla autorów** do zgłaszania manuskryptów
- **Blog/Aktualności** z najnowszymi wiadomościami
- **Formularz kontaktowy** z FAQ
- **Pełna responsywność** - mobile-first design
- **SEO-friendly** - optymalne meta tagi i struktura
- **Accessibility** - WCAG AA/AAA zgodność

## 🛠 Stack technologiczny

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Język**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Czcionki**:
  - Cormorant Garamond (display/headings)
  - Inter (body text)

## 🎨 Design System

Projekt wykorzystuje kompletny design system oparty na tokenach:

- **Kolory**: Paleta oparta na #334782 (sapphire) z akcentami violet/indigo
- **Typografia**: Skala od 12px do 72px, fluid typography z clamp()
- **Spacing**: 8px grid system
- **Komponenty**: Gotowe snippety w `COMPONENT-SNIPPETS.md`

Szczegółowa dokumentacja design systemu: [`DESIGN-TOKENS.md`](DESIGN-TOKENS.md)

## 📁 Struktura projektu

```
safaia-publishing/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Strona główna
│   ├── o-nas/                   # O nas
│   ├── katalog/                 # Katalog książek
│   │   ├── page.tsx            # Lista książek
│   │   └── [id]/page.tsx       # Szczegóły książki
│   ├── dla-autorow/             # Dla autorów (formularz)
│   ├── aktualnosci/             # Blog/Aktualności
│   ├── kontakt/                 # Kontakt
│   └── globals.css              # Design system (CSS tokens)
├── components/
│   ├── Navigation.tsx           # Główna nawigacja
│   └── Footer.tsx               # Stopka
├── data/
│   └── books.ts                 # Dane książek
├── public/
│   └── logo.png                 # Logo wydawnictwa
├── DESIGN-TOKENS.md             # Dokumentacja design systemu
├── COMPONENT-SNIPPETS.md        # Gotowe komponenty
└── README.md                    # Ten plik
```

## 🚀 Instalacja i uruchomienie

### Wymagania

- Node.js 18+
- npm lub yarn

### Kroki instalacji

1. **Sklonuj repozytorium**
   ```bash
   git clone <repository-url>
   cd safaia-publishing
   ```

2. **Zainstaluj dependencies**
   ```bash
   npm install
   # lub
   yarn install
   ```

3. **Uruchom development server**
   ```bash
   npm run dev
   # lub
   yarn dev
   ```

4. **Otwórz przeglądarkę**
   ```
   http://localhost:3000
   ```

### Dostępne komendy

```bash
npm run dev          # Uruchom development server
npm run build        # Zbuduj aplikację do produkcji
npm run start        # Uruchom production server
npm run lint         # Uruchom ESLint
```

## 📤 Deployment

### Vercel (Zalecane)

Projekt jest gotowy do wdrożenia na Vercel:

1. **Push do GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Połącz z Vercel**
   - Wejdź na [vercel.com](https://vercel.com)
   - Kliknij "New Project"
   - Importuj swoje repozytorium GitHub
   - Vercel automatycznie wykryje Next.js i ustawi konfigurację

3. **Deploy**
   - Kliknij "Deploy"
   - Twoja strona będzie dostępna pod adresem `*.vercel.app`

#### Zmienne środowiskowe (opcjonalnie)

Jeśli dodasz formularze działające z API:

```env
NEXT_PUBLIC_SITE_URL=https://safaia.pl
# Dodaj inne zmienne według potrzeb
```

### Netlify

1. **Build settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

2. **Deploy**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify init
   netlify deploy --prod
   ```

### Inne platformy

Projekt Next.js można wdrożyć również na:
- AWS Amplify
- Digital Ocean App Platform
- Railway
- Render

## 🎯 Konfiguracja

### Dane książek

Edytuj plik `data/books.ts` aby dodać/zmienić książki:

```typescript
export const books: Book[] = [
  {
    id: 1,
    title: 'Tytuł książki',
    author: 'Autor',
    category: 'Sztuka',
    description: 'Krótki opis',
    longDescription: 'Długi opis',
    price: '99.00 zł',
    year: 2024,
    pages: 256,
    isbn: '978-83-XXXXX-XX-X',
    excerpt: 'Fragment książki...',
  },
  // ...
];
```

### Kolory marki

Główne kolory można zmienić w `app/globals.css`:

```css
@theme {
  --color-sapphire-700: #334782;  /* Główny kolor marki */
  --color-violet-600: #6b5b95;    /* Akcent */
  /* ... */
}
```

### Navigation Links

Edytuj linki w `components/Navigation.tsx`:

```typescript
const links = [
  { href: '/', label: 'Strona główna' },
  { href: '/o-nas', label: 'O nas' },
  // ...
];
```

## 📝 Dodawanie nowych funkcji

### Nowa strona

1. Utwórz nowy folder w `app/`:
   ```
   app/nowa-strona/page.tsx
   ```

2. Dodaj komponent:
   ```tsx
   import { Metadata } from 'next';

   export const metadata: Metadata = {
     title: 'Nowa strona',
     description: 'Opis strony',
   };

   export default function NowaStrona() {
     return (
       <section className="section-padding">
         {/* Twoja treść */}
       </section>
     );
   }
   ```

3. Dodaj link w nawigacji

### Nowy komponent

Zobacz `COMPONENT-SNIPPETS.md` dla gotowych przykładów komponentów zgodnych z design systemem.

## 🎨 Customizacja Design Systemu

### Dodanie nowego koloru

1. Dodaj token w `app/globals.css`:
   ```css
   @theme {
     --color-nowy-kolor: #123456;
   }
   ```

2. Użyj w komponencie:
   ```tsx
   <div className="bg-nowy-kolor text-white">
   ```

### Nowa utility class

Dodaj w `app/globals.css`:

```css
.moja-klasa {
  @apply px-4 py-2 bg-sapphire text-white;
}
```

## ♿ Accessibility

Projekt jest zbudowany z myślą o dostępności:

- ✅ Semantyczny HTML
- ✅ ARIA labels
- ✅ Kontrast kolorów WCAG AA/AAA
- ✅ Keyboard navigation
- ✅ Focus states
- ✅ Alt texts dla obrazów
- ✅ Skip links

## 📱 Responsive Breakpoints

```css
sm: 640px    /* Małe tablety */
md: 768px    /* Tablety */
lg: 1024px   /* Małe laptopy */
xl: 1280px   /* Laptopy */
2xl: 1536px  /* Desktop */
```

## 🔍 SEO

Każda strona ma zoptymalizowane meta tagi:

```tsx
export const metadata: Metadata = {
  title: 'Tytuł strony',
  description: 'Opis dla SEO',
  openGraph: {
    title: 'Tytuł OG',
    description: 'Opis OG',
    type: 'website',
  },
};
```

## 🐛 Troubleshooting

### Port 3000 już zajęty

```bash
# Użyj innego portu
PORT=3001 npm run dev
```

### Cache issues

```bash
# Wyczyść .next cache
rm -rf .next
npm run dev
```

### TypeScript errors

```bash
# Sprawdź typy
npm run type-check
```

## 📄 Licencja

Copyright © 2024 Safaia Wydawnictwo. Wszelkie prawa zastrzeżone.

## 👥 Kontakt

- **Email**: kontakt@safaia.pl
- **Website**: [safaia.pl](https://safaia.pl)
- **Dla autorów**: manuskrypty@safaia.pl

## 🙏 Podziękowania

Projekt wykorzystuje następujące open-source libraries:
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

---

**Built with ❤️ for lovers of beautiful books**
