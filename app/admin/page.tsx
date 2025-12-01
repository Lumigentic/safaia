/**
 * Admin Dashboard
 * Main admin page with overview stats
 */

import Link from 'next/link';
import { getBooks } from '@/lib/storage';

export default async function AdminDashboard() {
  // Get books data for stats
  const books = await getBooks();

  const stats = {
    totalBooks: books.length,
    featured: books.filter((b) => b.featured).length,
    newReleases: books.filter((b) => b.newRelease).length,
    categories: new Set(books.map((b) => b.category)).size,
  };

  const quickActions = [
    {
      title: 'Dodaj nową książkę',
      description: 'Utwórz nową pozycję w katalogu',
      href: '/admin/books/new',
      icon: '➕',
      color: 'bg-green-100 text-green-700 hover:bg-green-200',
    },
    {
      title: 'Zarządzaj książkami',
      description: 'Edytuj, usuń lub przeglądaj książki',
      href: '/admin/books',
      icon: '📚',
      color: 'bg-sapphire-100 text-sapphire-700 hover:bg-sapphire-200',
    },
    {
      title: 'Ustawienia strony',
      description: 'Edytuj About, wartości, kontakt',
      href: '/admin/settings',
      icon: '⚙️',
      color: 'bg-violet-100 text-violet-700 hover:bg-violet-200',
    },
    {
      title: 'Eksportuj dane',
      description: 'Pobierz CSV lub JSON',
      href: '/admin/export',
      icon: '📥',
      color: 'bg-amber-100 text-amber-700 hover:bg-amber-200',
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Witaj w panelu administracyjnym Safaia Publishing House</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-600 mb-1">Wszystkie książki</div>
          <div className="text-3xl font-display text-gray-900">{stats.totalBooks}</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-600 mb-1">Wyróżnione</div>
          <div className="text-3xl font-display text-sapphire-700">{stats.featured}</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-600 mb-1">Nowości</div>
          <div className="text-3xl font-display text-violet-700">{stats.newReleases}</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-600 mb-1">Kategorie</div>
          <div className="text-3xl font-display text-gray-900">{stats.categories}</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-12">
        <h2 className="text-xl font-display text-gray-900 mb-6">Szybkie akcje</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={`
                block p-6 rounded-lg border-2 border-transparent transition-all
                ${action.color}
              `}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{action.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{action.title}</h3>
                  <p className="text-sm opacity-80">{action.description}</p>
                </div>
                <div className="text-xl opacity-50">→</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity (placeholder) */}
      <div>
        <h2 className="text-xl font-display text-gray-900 mb-6">Ostatnia aktywność</h2>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-gray-500 text-center py-8">
            Brak ostatniej aktywności do wyświetlenia
          </p>
        </div>
      </div>
    </div>
  );
}
