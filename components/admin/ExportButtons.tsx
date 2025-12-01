/**
 * Export Buttons Component
 * Client-side export functionality for CSV and JSON
 */

'use client';

import type { Book } from '@/types/book';

interface ExportButtonsProps {
  books: Book[];
}

/**
 * Convert books to CSV format
 */
function booksToCSV(books: Book[]): string {
  const headers = [
    'Tytuł',
    'Slug',
    'Autor',
    'Kategoria',
    'Tagi',
    'Opis krótki',
    'Cena',
    'ISBN',
    'Strony',
    'Rok',
    'Wymiary',
    'Oprawa',
    'Język',
    'Okładka',
    'Link zakupu',
    'Wyróżnione',
    'Nowość',
    'Polecane',
  ];

  const rows = books.map((book) => [
    book.title,
    book.slug,
    book.author.name,
    book.category,
    book.tags.join('; '),
    book.description.short,
    book.price,
    book.isbn || '',
    book.details.pages,
    book.details.year,
    book.details.dimensions || '',
    book.details.binding,
    book.details.language,
    book.cover,
    book.purchaseLink || '',
    book.featured ? 'Tak' : 'Nie',
    book.newRelease ? 'Tak' : 'Nie',
    book.recommended ? 'Tak' : 'Nie',
  ]);

  // Escape CSV values
  const escapeCSV = (value: string | number | boolean): string => {
    const str = String(value);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const csvContent = [
    headers.map(escapeCSV).join(','),
    ...rows.map((row) => row.map(escapeCSV).join(',')),
  ].join('\n');

  return csvContent;
}

/**
 * Download file
 */
function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * JSON Export Button
 */
function JSONExportButton({ books }: ExportButtonsProps) {
  const handleExport = () => {
    const json = JSON.stringify(books, null, 2);
    const timestamp = new Date().toISOString().split('T')[0];
    downloadFile(json, `safaia-books-${timestamp}.json`, 'application/json');
  };

  return (
    <button
      onClick={handleExport}
      className="bg-sapphire-700 hover:bg-sapphire-800 text-white font-medium px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
    >
      <span>📥</span>
      <span>Pobierz JSON</span>
    </button>
  );
}

/**
 * CSV Export Button
 */
function CSVExportButton({ books }: ExportButtonsProps) {
  const handleExport = () => {
    const csv = booksToCSV(books);
    const timestamp = new Date().toISOString().split('T')[0];
    // Add UTF-8 BOM for Excel compatibility
    const csvWithBOM = '\uFEFF' + csv;
    downloadFile(csvWithBOM, `safaia-books-${timestamp}.csv`, 'text/csv;charset=utf-8');
  };

  return (
    <button
      onClick={handleExport}
      className="bg-green-700 hover:bg-green-800 text-white font-medium px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
    >
      <span>📥</span>
      <span>Pobierz CSV</span>
    </button>
  );
}

// Export both as named exports
const ExportButtons = {
  JSON: JSONExportButton,
  CSV: CSVExportButton,
};

export default ExportButtons;
