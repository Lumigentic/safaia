/**
 * Admin Settings Page
 * Edit site content: About page and Values
 */

import SettingsForm from '@/components/admin/SettingsForm';
import { getSettings } from '@/lib/settings';

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display text-gray-900 mb-2">Ustawienia</h1>
        <p className="text-gray-600">Edytuj treści strony About i wartości</p>
      </div>

      {/* Form */}
      <SettingsForm settings={settings} />
    </div>
  );
}
