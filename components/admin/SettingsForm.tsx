/**
 * Settings Form Component
 * Edit site settings: About and Values
 */

'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import type { Settings, Value } from '@/lib/settings';

interface SettingsFormProps {
  settings: Settings;
}

export default function SettingsForm({ settings }: SettingsFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<Settings>(settings);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        router.refresh();
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(data.error || 'Błąd podczas zapisywania ustawień');
      }
    } catch (err) {
      console.error('Submit error:', err);
      setError('Błąd połączenia z serwerem');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateValue = (index: number, field: keyof Value, value: string) => {
    const newValues = [...formData.values];
    newValues[index] = { ...newValues[index], [field]: value };
    setFormData({ ...formData, values: newValues });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Success Message */}
      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-600">✓ Ustawienia zostały zapisane pomyślnie</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* About Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-display text-gray-900 mb-6">O nas</h2>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="aboutTitle" className="block text-sm font-medium text-gray-700 mb-2">
              Tytuł sekcji
            </label>
            <input
              type="text"
              id="aboutTitle"
              required
              value={formData.about.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  about: { ...formData.about, title: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sapphire-700"
            />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="aboutContent" className="block text-sm font-medium text-gray-700 mb-2">
              Opis
            </label>
            <textarea
              id="aboutContent"
              rows={4}
              required
              value={formData.about.content}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  about: { ...formData.about, content: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sapphire-700"
            />
          </div>

          {/* Mission */}
          <div>
            <label htmlFor="aboutMission" className="block text-sm font-medium text-gray-700 mb-2">
              Nasza misja
            </label>
            <textarea
              id="aboutMission"
              rows={3}
              required
              value={formData.about.mission}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  about: { ...formData.about, mission: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sapphire-700"
            />
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-display text-gray-900 mb-6">Nasze wartości</h2>

        <div className="space-y-6">
          {formData.values.map((value, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Icon */}
                <div>
                  <label
                    htmlFor={`value-icon-${index}`}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Ikona (emoji)
                  </label>
                  <input
                    type="text"
                    id={`value-icon-${index}`}
                    required
                    value={value.icon}
                    onChange={(e) => updateValue(index, 'icon', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sapphire-700 text-2xl text-center"
                    maxLength={2}
                  />
                </div>

                {/* Title */}
                <div>
                  <label
                    htmlFor={`value-title-${index}`}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Tytuł
                  </label>
                  <input
                    type="text"
                    id={`value-title-${index}`}
                    required
                    value={value.title}
                    onChange={(e) => updateValue(index, 'title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sapphire-700"
                  />
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor={`value-description-${index}`}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Opis
                  </label>
                  <input
                    type="text"
                    id={`value-description-${index}`}
                    required
                    value={value.description}
                    onChange={(e) => updateValue(index, 'description', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sapphire-700"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-display text-gray-900 mb-6">Kontakt</h2>

        <div className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="contactEmail"
              required
              value={formData.contact.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contact: { ...formData.contact, email: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sapphire-700"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-2">
              Telefon
            </label>
            <input
              type="tel"
              id="contactPhone"
              required
              value={formData.contact.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contact: { ...formData.contact, phone: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sapphire-700"
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="contactAddress" className="block text-sm font-medium text-gray-700 mb-2">
              Adres
            </label>
            <input
              type="text"
              id="contactAddress"
              required
              value={formData.contact.address}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contact: { ...formData.contact, address: e.target.value },
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sapphire-700"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => router.push('/admin')}
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
          {isSubmitting ? 'Zapisywanie...' : 'Zapisz ustawienia'}
        </button>
      </div>
    </form>
  );
}
