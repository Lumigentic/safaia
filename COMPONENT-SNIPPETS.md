# Safaia Design System - Component Snippets

Gotowe do użycia komponenty wykorzystujące tokeny z `DESIGN-TOKENS.md`.

---

## 📖 BookCard

Karta książki do użycia w katalogu i na stronie głównej.

### Podstawowa wersja
```tsx
<div className="group bg-white hover:shadow-xl transition-all duration-300">
  <div className="aspect-book bg-gradient-to-br from-sapphire to-violet overflow-hidden">
    <img
      src="/books/book-cover.jpg"
      alt="Tytuł książki"
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
  </div>
  <div className="p-6">
    <span className="inline-block px-3 py-1 bg-cream text-sapphire text-xs font-medium uppercase tracking-wide mb-3">
      Kategoria
    </span>
    <h3 className="text-xl font-display mb-2 text-sapphire-dark group-hover:text-sapphire transition-colors">
      Tytuł książki
    </h3>
    <p className="text-sm text-gray-600 mb-4">Imię i nazwisko autora</p>
    <p className="text-sm text-gray leading-relaxed mb-4">
      Krótki opis książki, który zachęca do przeczytania więcej...
    </p>
    <div className="flex justify-between items-center">
      <span className="text-2xl font-display text-sapphire">89.00 zł</span>
      <button className="px-4 py-2 bg-sapphire text-white text-sm font-medium hover:bg-sapphire-dark transition-colors">
        Zobacz więcej
      </button>
    </div>
  </div>
</div>
```

### Wersja kompaktowa (dla listy)
```tsx
<div className="flex gap-6 bg-white p-6 hover:shadow-md transition-shadow">
  <div className="w-32 flex-shrink-0">
    <div className="aspect-book bg-gradient-to-br from-sapphire to-violet">
      <img
        src="/books/book-cover.jpg"
        alt="Tytuł książki"
        className="w-full h-full object-cover"
      />
    </div>
  </div>
  <div className="flex-1">
    <span className="inline-block px-2 py-1 bg-cream text-sapphire text-xs font-medium uppercase tracking-wide mb-2">
      Kategoria
    </span>
    <h3 className="text-lg font-display mb-1 text-sapphire-dark">
      Tytuł książki
    </h3>
    <p className="text-sm text-gray-600 mb-3">Imię i nazwisko autora</p>
    <p className="text-sm text-gray leading-relaxed line-clamp-2 mb-4">
      Krótki opis książki...
    </p>
    <div className="flex items-center gap-4">
      <span className="text-xl font-display text-sapphire">89.00 zł</span>
      <a href="#" className="text-sm text-sapphire hover:text-sapphire-dark font-medium">
        Czytaj więcej →
      </a>
    </div>
  </div>
</div>
```

---

## 🎭 Hero Section

Główna sekcja powitalna na stronie głównej.

### Wersja z gradientem
```tsx
<section className="section-padding bg-gradient-to-br from-cream to-white">
  <div className="container">
    <div className="max-w-4xl mx-auto text-center fade-in">
      <h1 className="mb-6">
        Odkrywamy klejnoty literatury faktu
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
        Niezależne wydawnictwo specjalizujące się w publikacjach o sztuce, modzie,
        fotografii i kulturze ludowej. Każda książka to starannie wyselekcjonowana
        treść i przemyślana forma.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="/katalog"
          className="px-8 py-4 bg-sapphire text-white font-medium hover:bg-sapphire-dark transition-colors"
        >
          Zobacz katalog
        </a>
        <a
          href="/dla-autorow"
          className="px-8 py-4 border-2 border-sapphire text-sapphire font-medium hover:bg-sapphire hover:text-white transition-all"
        >
          Dla autorów
        </a>
      </div>
    </div>
  </div>
</section>
```

### Wersja z obrazem tła
```tsx
<section className="relative section-padding-lg bg-sapphire-dark text-white overflow-hidden">
  <div className="absolute inset-0 opacity-20">
    <img
      src="/hero-bg.jpg"
      alt=""
      className="w-full h-full object-cover"
    />
  </div>
  <div className="container relative z-10">
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-white mb-6">
        Każda książka to klejnot
      </h1>
      <p className="text-xl text-white/90 mb-8 leading-relaxed">
        Starannie wyselekcjonowana treść i przemyślana forma
      </p>
      <a
        href="/katalog"
        className="inline-block px-8 py-4 bg-white text-sapphire font-medium hover:bg-cream transition-colors"
      >
        Przeglądaj katalog
      </a>
    </div>
  </div>
</section>
```

---

## ✍️ AuthorCard

Karta autora do użycia na stronie "O nas" lub w sekcji autorów.

```tsx
<div className="bg-white p-8 text-center">
  <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-to-br from-sapphire to-violet">
    <img
      src="/authors/author-photo.jpg"
      alt="Imię i nazwisko autora"
      className="w-full h-full object-cover"
    />
  </div>
  <h3 className="text-2xl font-display mb-2 text-sapphire-dark">
    Imię i nazwisko
  </h3>
  <p className="text-sm text-sapphire uppercase tracking-wide mb-4">
    Rola / stanowisko
  </p>
  <p className="text-gray leading-relaxed mb-6">
    Krótka biografia autora. Pasjonat literatury faktu, sztuki i dobrze opowiedzianej historii.
    Safaia to marzenie o wydawnictwie, które łączy rzetelną wiedzę z piękną formą.
  </p>
  <a
    href="mailto:autor@safaia.pl"
    className="text-sapphire hover:text-sapphire-dark font-medium text-sm"
  >
    Skontaktuj się →
  </a>
</div>
```

---

## 📰 EditorialGrid

Siatka dla artykułów blogowych / aktualności.

### Grid 2-kolumnowy
```tsx
<div className="grid md:grid-cols-2 gap-8">
  {/* Article Card */}
  <article className="group bg-white hover:shadow-lg transition-shadow">
    <div className="aspect-hero bg-gradient-to-br from-sapphire to-violet overflow-hidden">
      <img
        src="/articles/article-image.jpg"
        alt="Tytuł artykułu"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div className="p-6">
      <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
        <time dateTime="2024-01-15">15 stycznia 2024</time>
        <span>•</span>
        <span>5 min czytania</span>
      </div>
      <h3 className="text-xl font-display mb-3 text-sapphire-dark group-hover:text-sapphire transition-colors">
        Tytuł artykułu lub aktualności
      </h3>
      <p className="text-sm text-gray leading-relaxed mb-4">
        Krótkie streszczenie artykułu, które zachęca do przeczytania całości...
      </p>
      <a
        href="/aktualnosci/slug"
        className="text-sm text-sapphire hover:text-sapphire-dark font-medium"
      >
        Czytaj dalej →
      </a>
    </div>
  </article>
</div>
```

### Grid 3-kolumnowy (wersja kompaktowa)
```tsx
<div className="grid md:grid-cols-3 gap-6">
  {/* Compact Article Card */}
  <article className="bg-white hover:shadow-md transition-shadow">
    <div className="aspect-video bg-gradient-to-br from-sapphire to-violet">
      <img
        src="/articles/article-thumb.jpg"
        alt="Tytuł artykułu"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-4">
      <time className="text-xs text-gray-600 mb-2 block">15 stycznia 2024</time>
      <h3 className="font-display text-lg mb-2 text-sapphire-dark">
        Tytuł artykułu
      </h3>
      <p className="text-sm text-gray leading-relaxed line-clamp-3">
        Streszczenie...
      </p>
    </div>
  </article>
</div>
```

---

## 💬 Quote Block

Blok cytatu do użycia w artykułach i na stronach edytorskich.

```tsx
<blockquote className="my-12 px-8 py-6 bg-cream border-l-4 border-sapphire">
  <p className="text-xl font-display text-sapphire-dark leading-relaxed mb-4">
    „Ikebana to nie tylko aranżowanie kwiatów. To medytacyjna praktyka,
    która uczy nas obserwacji natury, cierpliwości i harmonii."
  </p>
  <footer className="text-sm text-gray-600">
    — <cite className="font-medium not-italic">Anna Kowalska</cite>, Japońska sztuka ikebany
  </footer>
</blockquote>
```

### Wersja z większym akcentem
```tsx
<blockquote className="my-16 max-w-3xl mx-auto text-center">
  <div className="w-16 h-16 mx-auto mb-6 bg-sapphire/10 rounded-full flex items-center justify-center">
    <svg className="w-8 h-8 text-sapphire" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
    </svg>
  </div>
  <p className="text-2xl font-display text-sapphire-dark leading-relaxed mb-6">
    „Każda książka w naszym katalogu to klejnot — unikalny, wartościowy
    i starannie dopracowany, gotowy by zachwycać czytelników."
  </p>
  <footer className="text-gray-600">
    <cite className="font-medium not-italic">Rita Krawczyk</cite>
  </footer>
</blockquote>
```

---

## 📣 CTA (Call-to-Action)

Sekcja zachęty do działania.

### Wersja z kolorowym tłem
```tsx
<section className="section-padding bg-sapphire text-white">
  <div className="container">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-white mb-6">
        Jesteś autorem?
      </h2>
      <p className="text-xl text-white/90 mb-8 leading-relaxed">
        Szukamy unikalnych głosów i fascynujących historii. Jeśli masz pomysł na książkę,
        która pasuje do naszego profilu - chcemy Cię poznać.
      </p>
      <a
        href="/dla-autorow"
        className="inline-block px-8 py-4 bg-white text-sapphire font-medium hover:bg-cream transition-colors"
      >
        Wyślij manuskrypt
      </a>
    </div>
  </div>
</section>
```

### Wersja z borderami
```tsx
<section className="section-padding bg-white">
  <div className="container">
    <div className="max-w-3xl mx-auto border-2 border-sapphire p-12 text-center">
      <h2 className="mb-4">
        Newsletter
      </h2>
      <p className="text-gray mb-8">
        Bądź na bieżąco z nowymi publikacjami i wydarzeniami
      </p>
      <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Twój adres email"
          className="flex-1 px-4 py-3 border-2 border-gray-300 focus:border-sapphire focus:outline-none"
          required
        />
        <button
          type="submit"
          className="px-6 py-3 bg-sapphire text-white font-medium hover:bg-sapphire-dark transition-colors whitespace-nowrap"
        >
          Zapisz się
        </button>
      </form>
    </div>
  </div>
</section>
```

### Wersja inline (subtelna)
```tsx
<div className="bg-cream p-8 text-center">
  <p className="text-lg text-sapphire-dark mb-4">
    Chcesz wiedzieć więcej o naszych publikacjach?
  </p>
  <a
    href="/katalog"
    className="inline-block px-6 py-3 border-2 border-sapphire text-sapphire font-medium hover:bg-sapphire hover:text-white transition-all"
  >
    Przeglądaj katalog
  </a>
</div>
```

---

## 📋 Category Filter

Filtr kategorii dla strony katalogu.

```tsx
<div className="flex flex-wrap gap-3 mb-12 justify-center">
  {['Wszystkie', 'Sztuka', 'Moda', 'Fotografia', 'Sztuka ludowa', 'Historia kulinariów'].map((category) => (
    <button
      key={category}
      className={`
        px-6 py-2 font-medium transition-all
        ${activeCategory === category
          ? 'bg-sapphire text-white'
          : 'bg-white text-sapphire border-2 border-sapphire hover:bg-sapphire hover:text-white'
        }
      `}
      onClick={() => setActiveCategory(category)}
    >
      {category}
    </button>
  ))}
</div>
```

---

## 📝 Form Components

Komponenty formularzy dla strony kontaktowej i "Dla autorów".

### Input field
```tsx
<div className="mb-6">
  <label
    htmlFor="email"
    className="block text-sm font-medium text-sapphire-dark mb-2"
  >
    Adres email <span className="text-error">*</span>
  </label>
  <input
    type="email"
    id="email"
    name="email"
    required
    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-sapphire focus:outline-none transition-colors"
    placeholder="twoj@email.pl"
  />
</div>
```

### Textarea
```tsx
<div className="mb-6">
  <label
    htmlFor="message"
    className="block text-sm font-medium text-sapphire-dark mb-2"
  >
    Wiadomość <span className="text-error">*</span>
  </label>
  <textarea
    id="message"
    name="message"
    rows={6}
    required
    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-sapphire focus:outline-none transition-colors resize-y"
    placeholder="Opowiedz nam o swoim projekcie..."
  ></textarea>
</div>
```

### File upload
```tsx
<div className="mb-6">
  <label
    htmlFor="manuscript"
    className="block text-sm font-medium text-sapphire-dark mb-2"
  >
    Załącz manuskrypt (PDF, DOCX)
  </label>
  <div className="border-2 border-dashed border-gray-300 p-8 text-center hover:border-sapphire transition-colors">
    <input
      type="file"
      id="manuscript"
      name="manuscript"
      accept=".pdf,.doc,.docx"
      className="hidden"
    />
    <label
      htmlFor="manuscript"
      className="cursor-pointer"
    >
      <div className="w-16 h-16 mx-auto mb-4 bg-sapphire/10 rounded-full flex items-center justify-center">
        <svg className="w-8 h-8 text-sapphire" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      </div>
      <p className="text-sm text-gray-600">
        Kliknij aby wybrać plik lub przeciągnij go tutaj
      </p>
      <p className="text-xs text-gray-500 mt-2">
        Maksymalny rozmiar: 10MB
      </p>
    </label>
  </div>
</div>
```

### Submit button
```tsx
<button
  type="submit"
  className="w-full px-8 py-4 bg-sapphire text-white font-medium hover:bg-sapphire-dark transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
  disabled={isSubmitting}
>
  {isSubmitting ? 'Wysyłanie...' : 'Wyślij zgłoszenie'}
</button>
```

---

## 🔍 Search Bar

Pole wyszukiwania dla katalogu książek.

```tsx
<div className="relative max-w-md mx-auto mb-12">
  <input
    type="search"
    placeholder="Szukaj książek, autorów..."
    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 focus:border-sapphire focus:outline-none transition-colors"
  />
  <svg
    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
</div>
```

---

## 🎯 Feature Cards

Karty cech/wartości do użycia na stronie "O nas".

```tsx
<div className="grid md:grid-cols-3 gap-8">
  <div className="text-center p-6">
    <div className="w-16 h-16 bg-sapphire/10 rounded-full flex items-center justify-center mx-auto mb-4">
      <svg className="w-8 h-8 text-sapphire" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    </div>
    <h3 className="text-xl font-display mb-3 text-sapphire-dark">
      Starannie wyselekcjonowane
    </h3>
    <p className="text-gray text-sm leading-relaxed">
      Każda pozycja w naszym katalogu to unikatowy klejnot -
      publikujemy tylko to, w co naprawdę wierzymy.
    </p>
  </div>
</div>
```

---

## 📱 Responsive Images

Przykłady użycia obrazów responsywnych.

### Book cover
```tsx
<img
  src="/books/book-cover-800.jpg"
  srcSet="
    /books/book-cover-400.jpg 400w,
    /books/book-cover-800.jpg 800w,
    /books/book-cover-1200.jpg 1200w
  "
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  alt="Tytuł książki - okładka"
  className="w-full h-full object-cover"
  loading="lazy"
/>
```

### Hero image
```tsx
<img
  src="/hero-1200.jpg"
  srcSet="
    /hero-600.jpg 600w,
    /hero-1200.jpg 1200w,
    /hero-1800.jpg 1800w
  "
  sizes="100vw"
  alt="Hero background"
  className="w-full h-full object-cover"
/>
```

---

## 🎨 Gradient Backgrounds

Gotowe gradienty do użycia w różnych sekcjach.

```tsx
{/* Sapphire to Violet */}
<div className="bg-gradient-to-br from-sapphire to-violet">

{/* Cream to White (subtle) */}
<div className="bg-gradient-to-br from-cream to-white">

{/* Sapphire to Indigo */}
<div className="bg-gradient-to-r from-sapphire via-violet to-indigo">

{/* Dark overlay */}
<div className="bg-gradient-to-t from-sapphire-dark/90 to-sapphire-dark/50">
</div>
```

---

## ✨ Animation Classes

Przykłady użycia klas animacji z globals.css.

```tsx
{/* Fade in on load */}
<div className="fade-in">

{/* Slide up on load */}
<div className="slide-up">

{/* Scale on hover */}
<div className="scale-on-hover">

{/* Combined animations */}
<div className="fade-in slide-up">
  Treść pojawi się z efektem fade i slide
</div>
```

---

## 📦 Complete Page Example

Przykład kompletnej sekcji łączącej kilka komponentów.

```tsx
<section className="section-padding bg-cream">
  <div className="container">
    {/* Header */}
    <div className="text-center mb-12">
      <h2 className="mb-4">Nasze najnowsze publikacje</h2>
      <p className="text-gray max-w-2xl mx-auto">
        Odkryj starannie wyselekcjonowane tytuły z naszego katalogu
      </p>
    </div>

    {/* Category Filter */}
    <div className="flex flex-wrap gap-3 mb-12 justify-center">
      {categories.map((category) => (
        <button
          key={category}
          className={`px-6 py-2 font-medium transition-all ${
            activeCategory === category
              ? 'bg-sapphire text-white'
              : 'bg-white text-sapphire border-2 border-sapphire hover:bg-sapphire hover:text-white'
          }`}
        >
          {category}
        </button>
      ))}
    </div>

    {/* Books Grid */}
    <div className="grid md:grid-cols-3 gap-8 mb-12">
      {books.map((book) => (
        <div key={book.id} className="group bg-white hover:shadow-xl transition-all duration-300">
          <div className="aspect-book bg-gradient-to-br from-sapphire to-violet">
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-6">
            <span className="inline-block px-3 py-1 bg-cream text-sapphire text-xs font-medium uppercase tracking-wide mb-3">
              {book.category}
            </span>
            <h3 className="text-xl font-display mb-2 text-sapphire-dark group-hover:text-sapphire transition-colors">
              {book.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{book.author}</p>
            <p className="text-sm text-gray leading-relaxed mb-4">
              {book.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-display text-sapphire">{book.price}</span>
              <a href={`/katalog/${book.id}`} className="px-4 py-2 bg-sapphire text-white text-sm font-medium hover:bg-sapphire-dark transition-colors">
                Zobacz więcej
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* CTA */}
    <div className="text-center">
      <a
        href="/katalog"
        className="inline-block px-8 py-4 border-2 border-sapphire text-sapphire font-medium hover:bg-sapphire hover:text-white transition-all"
      >
        Zobacz cały katalog
      </a>
    </div>
  </div>
</section>
```
