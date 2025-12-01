'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import { books, categories, sortBooks, paginateBooks, Book } from '@/data/books';

export default function KatalogPage() {
  const [activeCategory, setActiveCategory] = useState('Wszystkie');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title' | 'recommended'>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 9;

  // Filter and sort books
  const filteredAndSortedBooks = useMemo(() => {
    let result = [...books];

    // Filter by category
    if (activeCategory !== 'Wszystkie') {
      result = result.filter(book => book.category === activeCategory);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.name.toLowerCase().includes(query) ||
        book.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort
    result = sortBooks(result, sortBy);

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  // Paginate
  const paginatedData = useMemo(() => {
    return paginateBooks(filteredAndSortedBooks, currentPage, booksPerPage);
  }, [filteredAndSortedBooks, currentPage]);

  // Reset page when filters change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: typeof sortBy) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const getCoverGradient = (id: number) => {
    const gradients = [
      'from-emerald-400 to-teal-600',
      'from-rose-400 to-pink-600',
      'from-slate-400 to-gray-700',
      'from-amber-400 to-orange-600',
      'from-blue-400 to-indigo-600',
      'from-lime-400 to-green-600',
    ];
    return gradients[(id - 1) % gradients.length];
  };

  return (
    <>
      {/* Header */}
      <section className="section-padding bg-gradient-to-br from-cream to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6">Katalog książek</h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              Odkryj nasze starannie wyselekcjonowane publikacje o sztuce, modzie,
              fotografii i kulturze ludowej.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container">
          {/* Search */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="search"
                placeholder="Szukaj po tytule, autorze lub tagu..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 focus:border-sapphire focus:outline-none transition-colors text-lg"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-6 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`
                  px-6 py-3 font-medium transition-all rounded-sm
                  ${activeCategory === category
                    ? 'bg-sapphire text-white shadow-lg'
                    : 'bg-white text-sapphire border-2 border-sapphire hover:bg-sapphire hover:text-white'
                  }
                `}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort and Results Count */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600">
              Znaleziono <span className="font-bold text-sapphire">{filteredAndSortedBooks.length}</span>{' '}
              {filteredAndSortedBooks.length === 1 ? 'książkę' : filteredAndSortedBooks.length < 5 ? 'książki' : 'książek'}
            </p>

            <div className="flex items-center gap-3">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                Sortuj:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value as typeof sortBy)}
                className="px-4 py-2 border-2 border-gray-300 focus:border-sapphire focus:outline-none transition-colors"
              >
                <option value="newest">Nowości</option>
                <option value="recommended">Rekomendowane</option>
                <option value="title">Alfabetycznie</option>
                <option value="oldest">Najstarsze</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="section-padding bg-white">
        <div className="container">
          {paginatedData.books.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {paginatedData.books.map((book) => (
                  <Link
                    key={book.id}
                    href={`/katalog/${book.slug}`}
                    className="group bg-white border border-gray-200 hover:shadow-2xl transition-all duration-300"
                  >
                    {/* Cover with lazy loading */}
                    <div className={`aspect-[3/4] bg-gradient-to-br ${getCoverGradient(book.id)} flex items-center justify-center overflow-hidden relative`}>
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                      <span className="text-white/40 text-7xl group-hover:scale-110 transition-transform duration-500">📖</span>

                      {/* Badges */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        {book.newRelease && (
                          <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold uppercase tracking-wide">
                            Nowość
                          </span>
                        )}
                        {book.recommended && (
                          <span className="px-3 py-1 bg-sapphire text-white text-xs font-bold uppercase tracking-wide">
                            Polecamy
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-6">
                      {/* Category */}
                      <span className="inline-block px-3 py-1 bg-cream text-sapphire text-xs font-medium uppercase tracking-wider mb-3">
                        {book.category}
                      </span>

                      {/* Title and Author */}
                      <h3 className="text-xl font-display mb-2 text-sapphire-900 group-hover:text-sapphire transition-colors line-clamp-2">
                        {book.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 font-medium">{book.author.name}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {book.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Teaser */}
                      <p className="text-sm text-gray-700 leading-relaxed line-clamp-3 mb-4">
                        {book.description}
                      </p>

                      {/* Price and Link */}
                      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                        <span className="text-2xl font-display text-sapphire">{book.price}</span>
                        <span className="text-sm text-sapphire font-medium group-hover:text-sapphire-800 flex items-center gap-1">
                          Zobacz więcej
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {paginatedData.totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={!paginatedData.hasPrevPage}
                    className="px-4 py-2 border-2 border-sapphire text-sapphire font-medium hover:bg-sapphire hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ← Poprzednia
                  </button>

                  <div className="flex gap-2">
                    {Array.from({ length: paginatedData.totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`
                          w-10 h-10 font-medium transition-all
                          ${currentPage === page
                            ? 'bg-sapphire text-white'
                            : 'border-2 border-gray-300 text-gray-700 hover:border-sapphire hover:text-sapphire'
                          }
                        `}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage(p => Math.min(paginatedData.totalPages, p + 1))}
                    disabled={!paginatedData.hasNextPage}
                    className="px-4 py-2 border-2 border-sapphire text-sapphire font-medium hover:bg-sapphire hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Następna →
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-cream rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-display mb-2 text-sapphire-dark">
                Nie znaleziono książek
              </h3>
              <p className="text-gray-600 mb-6">
                Spróbuj zmienić kryteria wyszukiwania lub wybierz inną kategorię
              </p>
              <button
                onClick={() => {
                  setActiveCategory('Wszystkie');
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
                className="px-8 py-3 border-2 border-sapphire text-sapphire font-medium hover:bg-sapphire hover:text-white transition-all"
              >
                Wyczyść filtry
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
