/**
 * Admin Login Page
 * /admin/login
 */

'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to admin dashboard
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.error || 'Błąd logowania');
      }
    } catch (err) {
      setError('Błąd połączenia z serwerem');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sapphire-900 to-violet-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Logo variant="full" color="white" height={120} className="mx-auto mb-4" />
          <h1 className="text-2xl font-display text-white">Panel Administracyjny</h1>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-xl font-display text-gray-900 mb-6">Logowanie</h2>

          <form onSubmit={handleSubmit}>
            {/* Password Input */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Hasło
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sapphire-700 focus:border-transparent"
                placeholder="Wprowadź hasło administratora"
                required
                disabled={isLoading}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-sapphire-700 hover:bg-sapphire-800 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logowanie...' : 'Zaloguj się'}
            </button>
          </form>

          {/* Dev Note */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs text-amber-800">
                <strong>Dev mode:</strong> Hasło domyślne: <code className="bg-amber-100 px-1 py-0.5 rounded">safaia2024</code>
                <br />
                Ustaw <code className="bg-amber-100 px-1 py-0.5 rounded">ADMIN_PASSWORD</code> w <code className="bg-amber-100 px-1 py-0.5 rounded">.env.local</code>
              </p>
            </div>
          )}
        </div>

        {/* Back to Site */}
        <div className="text-center mt-6">
          <a href="/" className="text-white/80 hover:text-white text-sm transition-colors">
            ← Powrót do strony głównej
          </a>
        </div>
      </div>
    </div>
  );
}
