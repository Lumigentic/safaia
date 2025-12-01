/**
 * Settings Storage
 * Manages site content: About page and Values
 */

import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

export interface Value {
  title: string;
  description: string;
  icon: string;
}

export interface Settings {
  about: {
    title: string;
    content: string;
    mission: string;
  };
  values: Value[];
  contact: {
    email: string;
    phone: string;
    address: string;
  };
}

/**
 * Default settings
 */
const defaultSettings: Settings = {
  about: {
    title: 'O nas',
    content: 'Safaia Publishing House to wydawnictwo specjalizujące się w pięknych, starannie wyselekcjonowanych publikacjach o sztuce, modzie, fotografii i kulturze ludowej.',
    mission: 'Naszą misją jest odkrywanie i publikowanie klejnotów literatury faktu, które inspirują, edukują i zachwycają.',
  },
  values: [
    {
      title: 'Otwartość',
      description: 'Przyjmujemy różnorodność perspektyw i tematów',
      icon: '🌍',
    },
    {
      title: 'Wiedza',
      description: 'Stawiamy na rzetelną, pogłębioną treść',
      icon: '📚',
    },
    {
      title: 'Ciekawość',
      description: 'Inspirujemy do odkrywania nowych horyzontów',
      icon: '🔍',
    },
    {
      title: 'Piękno',
      description: 'Dbamy o estetykę i jakość wykonania',
      icon: '✨',
    },
  ],
  contact: {
    email: 'kontakt@safaia.pl',
    phone: '+48 123 456 789',
    address: 'ul. Przykładowa 1, 00-001 Warszawa',
  },
};

/**
 * Ensure data directory exists
 */
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating data directory:', error);
  }
}

/**
 * Get settings
 */
export async function getSettings(): Promise<Settings> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(SETTINGS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return default settings
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      // Save default settings
      await saveSettings(defaultSettings);
      return defaultSettings;
    }
    console.error('Error reading settings:', error);
    return defaultSettings;
  }
}

/**
 * Save settings
 */
export async function saveSettings(settings: Settings): Promise<void> {
  try {
    await ensureDataDir();
    await fs.writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving settings:', error);
    throw new Error('Failed to save settings');
  }
}
