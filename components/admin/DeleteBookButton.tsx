/**
 * Delete Book Button Component
 * Client component with confirmation dialog
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DeleteBookButtonProps {
  slug: string;
  title: string;
}

export default function DeleteBookButton({ slug, title }: DeleteBookButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/admin/books/${slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.refresh();
        setShowConfirm(false);
      } else {
        const data = await response.json();
        alert(`Błąd: ${data.error || 'Nie udało się usunąć książki'}`);
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Błąd połączenia z serwerem');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="text-red-600 hover:text-red-900 transition-colors"
        title="Usuń"
      >
        🗑️
      </button>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-display text-gray-900 mb-2">Potwierdź usunięcie</h3>
            <p className="text-gray-600 mb-6">
              Czy na pewno chcesz usunąć książkę <strong>{title}</strong>? Tej operacji nie można cofnąć.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Anuluj
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                {isDeleting ? 'Usuwanie...' : 'Usuń'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
