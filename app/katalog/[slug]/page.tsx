import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getBookBySlug, getRelatedBooks, getAllBookSlugs, Book } from '@/data/books';

// Generate static paths for all books
export async function generateStaticParams() {
  const slugs = getAllBookSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Generate metadata for SEO and Open Graph
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const book = getBookBySlug(params.slug);

  if (!book) {
    return {
      title: 'Książka nie znaleziona - Safaia',
    };
  }

  return {
    title: `${book.title} - ${book.author.name} | Safaia`,
    description: book.description,
    openGraph: {
      title: book.title,
      description: book.description,
      type: 'book',
      images: [
        {
          url: book.coverImage,
          width: 1200,
          height: 630,
          alt: book.title,
        },
      ],
      authors: [book.author.name],
      publishedTime: book.publishedDate,
      tags: book.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: book.title,
      description: book.description,
      images: [book.coverImage],
    },
    authors: [{ name: book.author.name }],
    keywords: [...book.tags, book.category, 'wydawnictwo', 'Safaia', 'książka'],
  };
}

export default function BookPage({ params }: { params: { slug: string } }) {
  const book = getBookBySlug(params.slug);

  if (!book) {
    notFound();
  }

  const relatedBooks = getRelatedBooks(book.id, 3);

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

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${star <= rating ? 'text-amber-400 fill-current' : 'text-gray-300'}`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Breadcrumbs */}
      <section className="py-6 bg-cream border-b border-gray-200">
        <div className="container">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-sapphire transition-colors">
              Strona główna
            </Link>
            <span>/</span>
            <Link href="/katalog" className="hover:text-sapphire transition-colors">
              Katalog
            </Link>
            <span>/</span>
            <span className="text-sapphire font-medium">{book.title}</span>
          </nav>
        </div>
      </section>

      {/* Book Details */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Left: Cover and Gallery */}
            <div>
              <div className={`aspect-[3/4] bg-gradient-to-br ${getCoverGradient(book.id)} flex items-center justify-center mb-6 relative`}>
                <span className="text-white/40 text-9xl">📖</span>

                {/* Badges */}
                <div className="absolute top-6 right-6 flex flex-col gap-2">
                  {book.newRelease && (
                    <span className="px-4 py-2 bg-red-500 text-white text-sm font-bold uppercase tracking-wide shadow-lg">
                      Nowość
                    </span>
                  )}
                  {book.recommended && (
                    <span className="px-4 py-2 bg-sapphire text-white text-sm font-bold uppercase tracking-wide shadow-lg">
                      Polecamy
                    </span>
                  )}
                </div>
              </div>

              {/* Metadata */}
              <div className="bg-cream p-6 border border-gray-200">
                <h3 className="font-display text-xl mb-4 text-sapphire-900">Szczegóły techniczne</h3>
                <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  <dt className="text-gray-600">ISBN:</dt>
                  <dd className="font-medium text-sapphire-900">{book.isbn}</dd>

                  <dt className="text-gray-600">Rok wydania:</dt>
                  <dd className="font-medium text-sapphire-900">{book.year}</dd>

                  <dt className="text-gray-600">Liczba stron:</dt>
                  <dd className="font-medium text-sapphire-900">{book.pages}</dd>

                  <dt className="text-gray-600">Wymiary:</dt>
                  <dd className="font-medium text-sapphire-900">{book.dimensions}</dd>

                  <dt className="text-gray-600">Oprawa:</dt>
                  <dd className="font-medium text-sapphire-900">{book.binding}</dd>

                  <dt className="text-gray-600">Waga:</dt>
                  <dd className="font-medium text-sapphire-900">{book.weight}</dd>

                  <dt className="text-gray-600">Język:</dt>
                  <dd className="font-medium text-sapphire-900">{book.language}</dd>
                </dl>
              </div>
            </div>

            {/* Right: Info */}
            <div>
              {/* Category */}
              <span className="inline-block px-4 py-2 bg-sapphire text-white text-xs font-medium uppercase tracking-wider mb-4">
                {book.category}
              </span>

              {/* Title */}
              <h1 className="mb-4 text-sapphire-900">{book.title}</h1>

              {/* Author */}
              <p className="text-xl text-gray-700 mb-6 font-medium">
                Autor: <span className="text-sapphire">{book.author.name}</span>
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {book.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-lg text-gray-700 leading-relaxed mb-8 pb-8 border-b border-gray-200">
                {book.description}
              </p>

              {/* Price and Purchase */}
              <div className="flex items-center gap-6 mb-8">
                <span className="text-5xl font-display text-sapphire">{book.price}</span>
                <a
                  href={book.purchaseLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-8 py-4 bg-sapphire text-white text-center font-medium hover:bg-sapphire-800 transition-colors shadow-lg hover:shadow-xl"
                >
                  Kup teraz
                </a>
              </div>

              {/* Share */}
              <div className="flex items-center gap-3 pt-6 border-t border-gray-200">
                <span className="text-sm text-gray-600 font-medium">Udostępnij:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigator.share?.({ title: book.title, url: window.location.href })}
                    className="w-10 h-10 bg-gray-100 hover:bg-sapphire hover:text-white flex items-center justify-center transition-colors"
                    aria-label="Udostępnij"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-100 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors"
                    aria-label="Udostępnij na Facebooku"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(book.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-100 hover:bg-black hover:text-white flex items-center justify-center transition-colors"
                    aria-label="Udostępnij na Twitterze"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Long Description */}
          <div className="max-w-4xl mb-16">
            <h2 className="mb-6 text-sapphire-900">O książce</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {book.longDescription}
              </p>
            </div>
          </div>

          {/* Table of Contents */}
          {book.tableOfContents && book.tableOfContents.length > 0 && (
            <div className="max-w-4xl mb-16">
              <h2 className="mb-6 text-sapphire-900">Spis treści</h2>
              <div className="bg-cream p-8 border-l-4 border-sapphire">
                <ol className="space-y-3">
                  {book.tableOfContents.map((chapter, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700">
                      <span className="font-display text-sapphire font-medium min-w-[2rem]">
                        {(index + 1).toString().padStart(2, '0')}.
                      </span>
                      <span className="leading-relaxed">{chapter}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          {/* Excerpt */}
          {book.excerpt && (
            <div className="max-w-4xl mb-16">
              <h2 className="mb-6 text-sapphire-900">Fragment książki</h2>
              <div className="relative">
                <div className="absolute top-0 left-0 text-9xl font-display text-sapphire/10 leading-none">
                  "
                </div>
                <blockquote className="relative bg-white p-12 border-l-4 border-sapphire italic text-lg text-gray-700 leading-relaxed">
                  {book.excerpt}
                </blockquote>
              </div>
            </div>
          )}

          {/* Reviews */}
          {book.reviews && book.reviews.length > 0 && (
            <div className="max-w-4xl mb-16">
              <h2 className="mb-6 text-sapphire-900">Recenzje</h2>
              <div className="space-y-6">
                {book.reviews.map((review, index) => (
                  <div key={index} className="bg-white p-6 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-medium text-sapphire-900 mb-1">{review.author}</p>
                        {renderStars(review.rating)}
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-display text-sapphire">
                          {review.rating}/5
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed italic">
                      "{review.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* About the Author */}
          <div className="max-w-4xl mb-16">
            <h2 className="mb-6 text-sapphire-900">O autorze</h2>
            <div className="bg-gradient-to-br from-cream to-white p-8 border border-gray-200">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Author Photo Placeholder */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-gradient-to-br from-sapphire-300 to-sapphire-600 rounded-full flex items-center justify-center">
                    <span className="text-5xl text-white">
                      {book.author.name.charAt(0)}
                    </span>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-display mb-3 text-sapphire-900">
                    {book.author.name}
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {book.author.bio}
                  </p>
                  <a
                    href={`mailto:${book.author.email}`}
                    className="inline-flex items-center gap-2 text-sapphire hover:text-sapphire-800 font-medium transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Skontaktuj się z autorem
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Related Books */}
          {relatedBooks.length > 0 && (
            <div>
              <h2 className="mb-8 text-sapphire-900">Powiązane tytuły</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedBooks.map((relatedBook) => (
                  <Link
                    key={relatedBook.id}
                    href={`/katalog/${relatedBook.slug}`}
                    className="group bg-white border border-gray-200 hover:shadow-2xl transition-all duration-300"
                  >
                    <div className={`aspect-[3/4] bg-gradient-to-br ${getCoverGradient(relatedBook.id)} flex items-center justify-center overflow-hidden relative`}>
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                      <span className="text-white/40 text-7xl group-hover:scale-110 transition-transform duration-500">📖</span>
                    </div>

                    <div className="p-6">
                      <span className="inline-block px-3 py-1 bg-cream text-sapphire text-xs font-medium uppercase tracking-wider mb-3">
                        {relatedBook.category}
                      </span>

                      <h3 className="text-xl font-display mb-2 text-sapphire-900 group-hover:text-sapphire transition-colors line-clamp-2">
                        {relatedBook.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 font-medium">{relatedBook.author.name}</p>

                      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                        <span className="text-2xl font-display text-sapphire">{relatedBook.price}</span>
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
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-sapphire-900 to-sapphire-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-violet-300 rounded-full blur-3xl"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6 text-white">Odkryj więcej książek</h2>
            <p className="text-xl mb-8 text-white/90 leading-relaxed">
              Zapoznaj się z naszym pełnym katalogiem publikacji o sztuce, modzie, fotografii i kulturze ludowej
            </p>
            <Link
              href="/katalog"
              className="inline-block px-10 py-4 bg-white text-sapphire font-medium hover:bg-cream transition-all shadow-xl hover:shadow-2xl"
            >
              Zobacz katalog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
