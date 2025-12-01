/**
 * Admin Export Page
 * Export books data to CSV/JSON
 */

import ExportButtons from '@/components/admin/ExportButtons';
import { getBooks } from '@/lib/storage';

export default async function ExportPage() {
  const books = await getBooks();

  const stats = {
    totalBooks: books.length,
    totalSize: JSON.stringify(books).length,
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display text-gray-900 mb-2">Export danych</h1>
        <p className="text-gray-600">Pobierz katalog książek w formacie CSV lub JSON</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-600 mb-1">Książki do eksportu</div>
          <div className="text-3xl font-display text-gray-900">{stats.totalBooks}</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-600 mb-1">Rozmiar danych</div>
          <div className="text-3xl font-display text-gray-900">
            {(stats.totalSize / 1024).toFixed(1)} KB
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-display text-gray-900 mb-6">Formaty eksportu</h2>

        <div className="space-y-6">
          {/* JSON Export */}
          <div className="flex items-start gap-4 pb-6 border-b border-gray-200">
            <div className="text-4xl">📄</div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">JSON</h3>
              <p className="text-gray-600 mb-4">
                Format JSON zawiera pełną strukturę danych, w tym wszystkie pola, zagnieżdżone obiekty i tablice. Idealny do migracji, backupu lub integracji z innymi systemami.
              </p>
              <ul className="text-sm text-gray-600 mb-4 space-y-1">
                <li>✓ Pełna struktura danych</li>
                <li>✓ Zagnieżdżone obiekty (autor, szczegóły)</li>
                <li>✓ Tablice (tagi, galeria, spis treści)</li>
                <li>✓ Format czytelny dla człowieka (pretty-print)</li>
              </ul>
              <ExportButtons.JSON books={books} />
            </div>
          </div>

          {/* CSV Export */}
          <div className="flex items-start gap-4">
            <div className="text-4xl">📊</div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">CSV</h3>
              <p className="text-gray-600 mb-4">
                Format CSV (Comma-Separated Values) zawiera podstawowe pola w formacie tabelarycznym. Idealny do analizy w Excel, Google Sheets lub importu do baz danych.
              </p>
              <ul className="text-sm text-gray-600 mb-4 space-y-1">
                <li>✓ Podstawowe pola (tytuł, autor, kategoria, cena)</li>
                <li>✓ Kompatybilny z Excel i Google Sheets</li>
                <li>✓ Łatwy import do systemów CRM/ERP</li>
                <li>✓ Zakodowany w UTF-8 (polskie znaki)</li>
              </ul>
              <ExportButtons.CSV books={books} />
            </div>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">ℹ️ Informacje o eksporcie</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Eksport zawiera wszystkie książki z katalogu</li>
          <li>• Pliki są generowane w czasie rzeczywistym (brak cache)</li>
          <li>• Dane eksportowane są w aktualnej wersji (bez historii zmian)</li>
          <li>• Możesz użyć eksportu JSON do migracji na Netlify CMS lub Sanity</li>
        </ul>
      </div>
    </div>
  );
}
