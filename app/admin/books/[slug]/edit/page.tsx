/**
 * Admin Edit Book Page
 * Edit existing book
 */

import { notFound } from 'next/navigation';
import { getBookBySlug } from '@/lib/storage';
import BookForm from '@/components/admin/BookForm';

interface EditBookPageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditBookPage({ params }: EditBookPageProps) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);

  if (!book) {
    notFound();
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display text-gray-900 mb-2">Edytuj książkę</h1>
        <p className="text-gray-600">{book.title}</p>
      </div>

      {/* Form */}
      <BookForm book={book} mode="edit" />
    </div>
  );
}
