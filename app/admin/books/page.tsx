/**
 * Admin Books List
 * List and manage all books
 */

import Link from 'next/link';
import Image from 'next/image';
import { getBooks } from '@/lib/storage';
import DeleteBookButton from '@/components/admin/DeleteBookButton';

export default async function AdminBooksPage() {
  const books = await getBooks();

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display text-gray-900 mb-2">Książki</h1>
          <p className="text-gray-600">Zarządzaj katalogiem książek</p>
        </div>

        <Link
          href="/admin/books/new"
          className="bg-sapphire-700 hover:bg-sapphire-800 text-white font-medium px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
        >
          <span>➕</span>
          <span>Dodaj książkę</span>
        </Link>
      </div>

      {/* Books List */}
      {books.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-display text-gray-900 mb-2">Brak książek</h3>
          <p className="text-gray-600 mb-6">Dodaj pierwszą książkę do katalogu</p>
          <Link
            href="/admin/books/new"
            className="bg-sapphire-700 hover:bg-sapphire-800 text-white font-medium px-6 py-3 rounded-lg transition-colors inline-block"
          >
            Dodaj książkę
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Okładka
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tytuł
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Autor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Akcje
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {books.map((book) => (
                <tr key={book.slug} className="hover:bg-gray-50 transition-colors">
                  {/* Cover */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative w-12 h-16 bg-gray-100 rounded overflow-hidden">
                      <Image
                        src={book.cover}
                        alt={book.title}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  </td>

                  {/* Title */}
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{book.title}</div>
                    <div className="text-xs text-gray-500">{book.slug}</div>
                  </td>

                  {/* Author */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{book.author.name}</div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sapphire-100 text-sapphire-800">
                      {book.category}
                    </span>
                  </td>

                  {/* Status Badges */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {book.featured && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                          ⭐ Wyróżnione
                        </span>
                      )}
                      {book.newRelease && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          🆕 Nowość
                        </span>
                      )}
                      {book.recommended && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-violet-100 text-violet-800">
                          💎 Polecane
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={`/katalog/${book.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                        title="Zobacz"
                      >
                        👁️
                      </a>
                      <Link
                        href={`/admin/books/${book.slug}/edit`}
                        className="text-sapphire-600 hover:text-sapphire-900 transition-colors"
                        title="Edytuj"
                      >
                        ✏️
                      </Link>
                      <DeleteBookButton slug={book.slug} title={book.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Stats */}
      {books.length > 0 && (
        <div className="mt-6 text-sm text-gray-600">
          Wyświetlanie {books.length} {books.length === 1 ? 'książki' : 'książek'}
        </div>
      )}
    </div>
  );
}
