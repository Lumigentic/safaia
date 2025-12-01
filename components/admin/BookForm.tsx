/**
 * Book Form Component
 * Form for creating and editing books
 */

'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import type { Book } from '@/types/book';
import Image from 'next/image';

interface BookFormProps {
  book?: Book;
  mode: 'create' | 'edit';
}

export default function BookForm({ book, mode }: BookFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [formData, setFormData] = useState<Partial<Book>>(
    book || {
      title: '',
      slug: '',
      author: {
        name: '',
        bio: '',
        photo: '',
        email: '',
      },
      category: 'Sztuka',
      tags: [],
      description: {
        short: '',
        long: '',
      },
      excerpt: '',
      tableOfContents: [],
      price: 0,
      isbn: '',
      details: {
        dimensions: '',
        pages: 0,
        year: new Date().getFullYear(),
        binding: 'Twarda',
        weight: '',
        language: 'Polski',
      },
      cover: '',
      gallery: [],
      purchaseLink: '',
      featured: false,
      newRelease: false,
      recommended: false,
    }
  );

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/ą/g, 'a')
      .replace(/ć/g, 'c')
      .replace(/ę/g, 'e')
      .replace(/ł/g, 'l')
      .replace(/ń/g, 'n')
      .replace(/ó/g, 'o')
      .replace(/ś/g, 's')
      .replace(/ź|ż/g, 'z')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      // Auto-generate slug only in create mode
      ...(mode === 'create' && { slug: generateSlug(title) }),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const url = mode === 'create' ? '/api/admin/books' : `/api/admin/books/${book?.slug}`;
      const method = mode === 'create' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/admin/books');
        router.refresh();
      } else {
        setError(data.error || 'Błąd podczas zapisywania książki');
      }
    } catch (err) {
      console.error('Submit error:', err);
      setError('Błąd połączenia z serwerem');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Basic Info */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-display text-gray-900 mb-6">Podstawowe informacje</h2>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Tytuł *
            </label>
            <input
              type="text"
              id="title"
              required
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sapphire-700"
            />
          </div>

          {/* Slug */}
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
              Slug (URL) *
            </label>
            <input
              type="text"
              id="slug"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sapphire-700 font-mono text-sm"
              placeholder="przykladowy-tytul"
            />
            <p className="mt-1 text-xs text-gray-500">
              URL: /katalog/{formData.slug || 'slug'}
            </p>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Kategoria *
            </label>
            <select
              id="category"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sapphire-700"
            >
              <option value="Sztuka">Sztuka</option>
              <option value="Moda">Moda</option>
              <option value="Fotografia">Fotografia</option>
              <option value="Kultura ludowa">Kultura ludowa</option>
            </select>
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
              Tagi (oddzielone przecinkami)
            </label>
            <input
              type="text"
              id="tags"
              value={formData.tags?.join(', ')}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tags: e.target.value.split(',').map((tag) => tag.trim()).filter(Boolean),
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sapphire-700"
              placeholder="sztuka współczesna, abstrakcja, malarstwo"
            />
          </div>
        </div>
      </div>

      {/* Author */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-display text-gray-900 mb-6">Autor</h2>

        <div className="space-y-4">
          {/* Author Name */}
          <div>
            <label htmlFor="authorName" className="block text-sm font-medium text-gray-700 mb-2">
              Imię i nazwisko *
            </label>
            <input
              type="text"
              id="authorName"
              required
              value={formData.author?.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  author: { ...formData.author!, name: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sapphire-700"
            />
          </div>

          {/* Author Bio */}
          <div>
            <label htmlFor="authorBio" className="block text-sm font-medium text-gray-700 mb-2">
              Biografia
            </label>
            <textarea
              id="authorBio"
              rows={3}
              value={formData.author?.bio}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  author: { ...formData.author!, bio: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sapphire-700"
            />
          </div>

          {/* Author Photo */}
          <div>
            <label htmlFor="authorPhoto" className="block text-sm font-medium text-gray-700 mb-2">
              Zdjęcie (URL)
            </label>
            <input
              type="url"
              id="authorPhoto"
              value={formData.author?.photo}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  author: { ...formData.author!, photo: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sapphire-700"
              placeholder="/authors/jan-kowalski.jpg"
            />
          </div>

          {/* Author Email */}
          <div>
            <label htmlFor="authorEmail" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="authorEmail"
              value={formData.author?.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  author: { ...formData.author!, email: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sapphire-700"
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-display text-gray-900 mb-6">Opis</h2>

        <div className="space-y-4">
          {/* Short Description */}
          <div>
            <label htmlFor="descShort" className="block text-sm font-medium text-gray-700 mb-2">
              Krótki opis *
            </label>
            <textarea
              id="descShort"
              rows={2}
              required
              value={formData.description?.short}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: { ...formData.description!, short: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sapphire-700"
              placeholder="Krótki opis do listy książek"
            />
          </div>

          {/* Long Description */}
          <div>
            <label htmlFor="descLong" className="block text-sm font-medium text-gray-700 mb-2">
              Pełny opis *
            </label>
            <textarea
              id="descLong"
              rows={6}
              required
              value={formData.description?.long}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: { ...formData.description!, long: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sapphire-700"
              placeholder="Pełny opis książki"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
              Fragment
            </label>
            <textarea
              id="excerpt"
              rows={4}
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sapphire-700"
              placeholder="Fragment książki do wyświetlenia"
            />
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-display text-gray-900 mb-6">Obrazy</h2>

        <div className="space-y-4">
          {/* Cover */}
          <div>
            <label htmlFor="cover" className="block text-sm font-medium text-gray-700 mb-2">
              Okładka (URL) *
            </label>
            <input
              type="url"
              id="cover"
              required
              value={formData.cover}
              onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sapphire-700"
              placeholder="/covers/przykladowa-ksiazka.jpg"
            />
            {formData.cover && (
              <div className="mt-3 relative w-32 h-48 bg-gray-100 rounded overflow-hidden">
                <Image
                  src={formData.cover}
                  alt="Preview"
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              </div>
            )}
          </div>

          {/* Gallery */}
          <div>
            <label htmlFor="gallery" className="block text-sm font-medium text-gray-700 mb-2">
              Galeria (URLs oddzielone przecinkami)
            </label>
            <textarea
              id="gallery"
              rows={2}
              value={formData.gallery?.join(', ')}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  gallery: e.target.value.split(',').map((url) => url.trim()).filter(Boolean),
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sapphire-700"
              placeholder="/gallery/img1.jpg, /gallery/img2.jpg"
            />
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-display text-gray-900 mb-6">Szczegóły</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Cena (PLN) *
            </label>
            <input
              type="number"
              id="price"
              required
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sapphire-700"
            />
          </div>

          {/* ISBN */}
          <div>
            <label htmlFor="isbn" className="block text-sm font-medium text-gray-700 mb-2">
              ISBN
            </label>
            <input
              type="text"
              id="isbn"
              value={formData.isbn}
              onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sapphire-700"
              placeholder="978-83-XXXXX-XX-X"
            />
          </div>

          {/* Pages */}
          <div>
            <label htmlFor="pages" className="block text-sm font-medium text-gray-700 mb-2">
              Liczba stron
            </label>
            <input
              type="number"
              id="pages"
              min="0"
              value={formData.details?.pages}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  details: { ...formData.details!, pages: parseInt(e.target.value) },
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sapphire-700"
            />
          </div>

          {/* Year */}
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
              Rok wydania
            </label>
            <input
              type="number"
              id="year"
              min="1900"
              max={new Date().getFullYear() + 10}
              value={formData.details?.year}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  details: { ...formData.details!, year: parseInt(e.target.value) },
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sapphire-700"
            />
          </div>

          {/* Dimensions */}
          <div>
            <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700 mb-2">
              Wymiary
            </label>
            <input
              type="text"
              id="dimensions"
              value={formData.details?.dimensions}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  details: { ...formData.details!, dimensions: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sapphire-700"
              placeholder="21 × 29.7 cm"
            />
          </div>

          {/* Weight */}
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
              Waga
            </label>
            <input
              type="text"
              id="weight"
              value={formData.details?.weight}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  details: { ...formData.details!, weight: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sapphire-700"
              placeholder="500 g"
            />
          </div>

          {/* Binding */}
          <div>
            <label htmlFor="binding" className="block text-sm font-medium text-gray-700 mb-2">
              Oprawa
            </label>
            <select
              id="binding"
              value={formData.details?.binding}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  details: { ...formData.details!, binding: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sapphire-700"
            >
              <option value="Twarda">Twarda</option>
              <option value="Miękka">Miękka</option>
            </select>
          </div>

          {/* Language */}
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
              Język
            </label>
            <input
              type="text"
              id="language"
              value={formData.details?.language}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  details: { ...formData.details!, language: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sapphire-700"
            />
          </div>
        </div>

        {/* Purchase Link */}
        <div className="mt-4">
          <label htmlFor="purchaseLink" className="block text-sm font-medium text-gray-700 mb-2">
            Link do zakupu
          </label>
          <input
            type="url"
            id="purchaseLink"
            value={formData.purchaseLink}
            onChange={(e) => setFormData({ ...formData, purchaseLink: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sapphire-700"
            placeholder="https://sklep.example.com/ksiazka"
          />
        </div>
      </div>

      {/* Flags */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-display text-gray-900 mb-6">Oznaczenia</h2>

        <div className="space-y-3">
          {/* Featured */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-5 h-5 rounded border-gray-300 text-sapphire-700 focus:ring-sapphire-700"
            />
            <div>
              <div className="font-medium text-gray-900">Wyróżnione</div>
              <div className="text-sm text-gray-500">Wyświetl w sekcji wyróżnionych</div>
            </div>
          </label>

          {/* New Release */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.newRelease}
              onChange={(e) => setFormData({ ...formData, newRelease: e.target.checked })}
              className="w-5 h-5 rounded border-gray-300 text-sapphire-700 focus:ring-sapphire-700"
            />
            <div>
              <div className="font-medium text-gray-900">Nowość</div>
              <div className="text-sm text-gray-500">Oznacz jako nową pozycję</div>
            </div>
          </label>

          {/* Recommended */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.recommended}
              onChange={(e) => setFormData({ ...formData, recommended: e.target.checked })}
              className="w-5 h-5 rounded border-gray-300 text-sapphire-700 focus:ring-sapphire-700"
            />
            <div>
              <div className="font-medium text-gray-900">Polecane</div>
              <div className="text-sm text-gray-500">Dodaj do rekomendowanych</div>
            </div>
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          disabled={isSubmitting}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Anuluj
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-sapphire-700 hover:bg-sapphire-800 text-white font-medium px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Zapisywanie...' : mode === 'create' ? 'Utwórz książkę' : 'Zapisz zmiany'}
        </button>
      </div>
    </form>
  );
}
