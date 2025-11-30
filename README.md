# Safaia - Wydawnictwo

Strona internetowa dla Wydawnictwa Safaia - niezależnego polskiego wydawnictwa specjalizującego się w literaturze faktu dotyczącej sztuki, mody, fotografii, sztuki ludowej i historii kulinariów.

## O projekcie

Nazwa "Safaia" pochodzi z japońskiego słowa oznaczającego szafir — symbol mądrości, intelektualnej jasności i odkrywania ukrytych klejnotów.

### Główne funkcjonalności

- **Strona główna** - Elegancki hero section z animacjami, prezentacja wartości wydawnictwa
- **O nas** - Historia nazwy, misja i wartości wydawnictwa
- **Katalog książek** - Interaktywny katalog z filtrami według kategorii
- **Dla autorów** - Informacje o procesie współpracy, formularz zgłoszeniowy
- **Usługi wydawnicze** - Prezentacja usług redakcyjnych, graficznych i dystrybucyjnych
- **Kontakt** - Formularz kontaktowy i informacje o współpracy

## Design

### Paleta kolorów

- **Primary**: #334782 (deep sapphire blue)
- **Secondary**: Indigo i fioletowe odcienie
- **Accent**: #c9a961 (złoty akcent)
- **Background**: #faf9f7 (ciepły off-white)

### Typografia

- **Display font**: Cormorant Garamond - elegancki serif do nagłówków
- **Heading font**: Crimson Text - wyrafinowany serif
- **Body font**: Source Serif 4 - czytelny serif do treści

### Charakterystyka designu

- Estetyka editorial i intellectual luxury
- Inspiracja wysokiej klasy europejskimi wydawnictwami
- Subtelne animacje i mikrointerakcje
- Atmosferyczne gradienty i efekty świetlne
- Responsywny design
- Accessibility-first approach

## Stack technologiczny

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS + Custom CSS Variables
- **TypeScript**: Pełne wsparcie typów
- **Fonts**: Google Fonts (Cormorant Garamond, Crimson Text, Source Serif 4)

## Rozpoczęcie pracy

### Wymagania

- Node.js 18.x lub nowszy
- npm, yarn, pnpm lub bun

### Instalacja

```bash
# Przejdź do katalogu projektu
cd safaia-publishing

# Zainstaluj zależności
npm install

# Uruchom serwer deweloperski
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce.

### Dostępne komendy

```bash
npm run dev      # Uruchamia serwer deweloperski
npm run build    # Buduje aplikację produkcyjną
npm run start    # Uruchamia serwer produkcyjny
npm run lint     # Uruchamia ESLint
```

## Struktura projektu

```
safaia-publishing/
├── app/
│   ├── o-nas/           # Strona "O nas"
│   ├── katalog/         # Katalog książek
│   ├── dla-autorow/     # Strona dla autorów
│   ├── uslugi/          # Usługi wydawnicze
│   ├── kontakt/         # Strona kontaktowa
│   ├── layout.tsx       # Główny layout z nawigacją i stopką
│   ├── page.tsx         # Strona główna
│   └── globals.css      # Globalne style i zmienne CSS
├── components/
│   ├── Navigation.tsx   # Komponent nawigacji
│   └── Footer.tsx       # Komponent stopki
└── public/              # Pliki statyczne
```

## Customizacja

### Zmiana kolorów

Kolory można modyfikować w pliku `app/globals.css`:

```css
:root {
  --sapphire-deep: #334782;
  --gold-accent: #c9a961;
  /* ... inne zmienne */
}
```

### Dodawanie książek

Książki są obecnie zdefiniowane jako statyczna tablica w `app/katalog/page.tsx`. W przyszłości można je zastąpić danymi z CMS lub API.

### Konfiguracja formularza kontaktowego

Formularz w `app/kontakt/page.tsx` obecnie loguje dane do konsoli. Należy podłączyć go do backendu lub serwisu email (np. SendGrid, EmailJS, Formspree).

## Deployment

### Vercel (rekomendowane)

Najłatwiejszy sposób wdrożenia aplikacji Next.js:

1. Pushuj kod do repozytorium GitHub
2. Importuj projekt w [Vercel](https://vercel.com)
3. Vercel automatycznie wykryje Next.js i zastosuje odpowiednie ustawienia

### Inne platformy

- **Netlify**: Obsługuje Next.js z Edge Functions
- **AWS Amplify**: Pełne wsparcie dla Next.js
- **Self-hosted**: `npm run build && npm run start`

## Roadmap

- [ ] Integracja z headless CMS (np. Sanity, Contentful) do zarządzania książkami
- [ ] Backend dla formularza kontaktowego
- [ ] Panel administracyjny
- [ ] Newsletter integration
- [ ] E-commerce (koszyk, płatności)
- [ ] Blog/Aktualności
- [ ] Wersja językowa angielska
- [ ] SEO optimization z Next.js metadata API

## Kontakt

Projekt stworzony dla Wydawnictwa Safaia.

**Założycielka**: Rita Krawczyk
**Email**: kontakt@safaia.pl
**Manuskrypty**: manuskrypty@safaia.pl

---

**Wiedza jako źródło szczęścia** 💎
