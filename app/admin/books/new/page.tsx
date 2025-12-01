/**
 * Admin New Book Page
 * Create new book
 */

import BookForm from '@/components/admin/BookForm';

export default function NewBookPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display text-gray-900 mb-2">Nowa książka</h1>
        <p className="text-gray-600">Dodaj nową pozycję do katalogu</p>
      </div>

      {/* Form */}
      <BookForm mode="create" />
    </div>
  );
}
