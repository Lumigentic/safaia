/**
 * Admin Navigation Component
 * Top navigation bar for admin panel
 */

'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import Logo from '@/components/Logo';
import Link from 'next/link';

export default function AdminNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
    }
  };

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/books', label: 'Książki', icon: '📚' },
    { href: '/admin/settings', label: 'Ustawienia', icon: '⚙️' },
    { href: '/admin/export', label: 'Export', icon: '📥' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-4">
            <Logo variant="mark" height={32} />
            <div className="hidden sm:block">
              <h1 className="text-lg font-display text-gray-900">Panel Administracyjny</h1>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${isActive
                      ? 'bg-sapphire-100 text-sapphire-900'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                >
                  <span className="mr-1.5">{item.icon}</span>
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}

            {/* Divider */}
            <div className="h-6 w-px bg-gray-300 mx-2" />

            {/* View Site */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              title="Zobacz stronę"
            >
              🌐
            </a>

            {/* Logout */}
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors disabled:opacity-50"
              title="Wyloguj"
            >
              {isLoggingOut ? '⏳' : '🚪'}
              <span className="hidden sm:inline ml-1.5">Wyloguj</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
