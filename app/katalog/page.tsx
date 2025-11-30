'use client';

import { useState } from 'react';
import { Metadata } from 'next';

// Przykładowe książki - w przyszłości można zastąpić danymi z API/CMS
const books = [
  {
    id: 1,
    title: 'Japońska sztuka ikebany',
    author: 'Anna Kowalska',
    category: 'Sztuka',
    description: 'Odkryj filozofię i techniki tradycyjnego japońskiego aranżowania kwiatów.',
    price: '89.00 zł',
    year: 2024,
    cover: '/books/ikebana.jpg',
  },
  {
    id: 2,
    title: 'Historia polskiego haftu',
    author: 'Maria Nowak',
    category: 'Sztuka ludowa',
    description: 'Podróż przez wieki tradycji hafciarskiej w Polsce - od wzorów ludowych po współczesność.',
    price: '119.00 zł',
    year: 2023,
    cover: '/books/haft.jpg',
  },
  {
    id: 3,
    title: 'Fotografie zapomnianych miejsc',
    author: 'Piotr Wiśniewski',
    category: 'Fotografia',
    description: 'Album fotograficzny przedstawiający opuszczone budynki i zapomniane zakątki Europy.',
    price: '149.00 zł',
    year: 2024,
    cover: '/books/miejsca.jpg',
  },
  {
    id: 4,
    title: 'Moda lat 20. XX wieku',
    author: 'Ewa Zielińska',
    category: 'Moda',
    description: 'Rewolucja w damskiej garderobie - jak lata dwudzieste zmieniły świat mody na zawsze.',
    price: '99.00 zł',
    year: 2023,
    cover: '/books/lata20.jpg',
  },
  {
    id: 5,
    title: 'Kulinarna historia Polski',
    author: 'Tomasz Lewandowski',
    category: 'Historia kulinariów',
    description: 'Od średniowiecznych uczt po współczesną kuchnię - ewolucja polskich smaków.',
    price: '109.00 zł',
    year: 2024,
    cover: '/books/kulinaria.jpg',
  },
  {
    id: 6,
    title: 'Bauhaus: Forma i funkcja',
    author: 'Katarzyna Majewska',
    category: 'Sztuka',
    description: 'Wpływ niemieckiej szkoły sztuki na współczesny design i architekturę.',
    price: '139.00 zł',
    year: 2023,
    cover: '/books/bauhaus.jpg',
  },
];

const categories = ['Wszystkie', 'Sztuka', 'Moda', 'Fotografia', 'Sztuka ludowa', 'Historia kulinariów'];

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState('Wszystkie');

  const filteredBooks =
    selectedCategory === 'Wszystkie'
      ? books
      : books.filter((book) => book.category === selectedCategory);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-[var(--lavender-soft)]/20 to-transparent">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6 fade-in-up">Katalog książek</h1>
            <p className="text-2xl text-[var(--color-text-muted)] font-body leading-relaxed fade-in-up" style={{ animationDelay: '0.2s' }}>
              Odkryj nasze starannie wyselekcjonowane publikacje
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 font-body text-sm tracking-wide rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-[var(--sapphire-deep)] text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-[var(--color-text-muted)] hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="section-padding bg-[var(--cream)]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredBooks.map((book, index) => (
              <div
                key={book.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:scale-105 group stagger-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Book Cover */}
                <div className="aspect-[3/4] bg-gradient-to-br from-[var(--sapphire-deep)] to-[var(--violet-accent)] relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-white p-8">
                    <div className="text-center">
                      <div className="text-6xl mb-4">📖</div>
                      <h3 className="font-display text-2xl mb-2 leading-tight">
                        {book.title}
                      </h3>
                      <p className="font-body text-sm opacity-80">{book.author}</p>
                    </div>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                </div>

                {/* Book Info */}
                <div className="p-6">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-[var(--lavender-soft)]/30 text-[var(--sapphire-deep)] text-xs font-body rounded-full">
                      {book.category}
                    </span>
                  </div>

                  <h4 className="text-xl font-heading text-[var(--sapphire-deep)] mb-2 group-hover:text-[var(--violet-accent)] transition-colors">
                    {book.title}
                  </h4>

                  <p className="text-sm text-[var(--color-text-muted)] font-body mb-1">
                    {book.author}
                  </p>

                  <p className="text-sm text-[var(--color-text-muted)] font-body leading-relaxed mb-4">
                    {book.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-lg font-heading text-[var(--sapphire-deep)] font-semibold">
                      {book.price}
                    </span>
                    <span className="text-xs text-[var(--color-text-muted)] font-body">
                      {book.year}
                    </span>
                  </div>

                  <button className="w-full mt-4 px-4 py-2.5 bg-[var(--sapphire-deep)] text-white font-body text-sm tracking-wide rounded-sm hover:bg-[var(--indigo-dark)] transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                    Zobacz szczegóły
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Jeśli brak książek w kategorii */}
          {filteredBooks.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">📚</div>
              <h3 className="text-2xl font-heading text-[var(--sapphire-deep)] mb-4">
                Brak książek w tej kategorii
              </h3>
              <p className="text-[var(--color-text-muted)] font-body">
                Pracujemy nad nowymi tytułami. Wróć wkrótce!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-[var(--lavender-soft)]/20 to-[var(--sapphire-deep)]/10 p-12 rounded-2xl">
            <h3 className="text-3xl font-heading text-[var(--sapphire-deep)] mb-4">
              Bądź na bieżąco
            </h3>
            <p className="text-[var(--color-text-muted)] font-body mb-8">
              Zapisz się do newslettera i dowiaduj się o nowych publikacjach jako pierwszy
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Twój adres e-mail"
                className="flex-1 px-4 py-3 rounded-sm border border-gray-300 focus:border-[var(--sapphire-deep)] focus:outline-none font-body"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-[var(--sapphire-deep)] text-white font-body tracking-wide rounded-sm hover:bg-[var(--indigo-dark)] transition-all duration-300 hover:shadow-lg"
              >
                Zapisz się
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
