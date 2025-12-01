/**
 * Admin Settings API
 * PUT /api/admin/settings
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { saveSettings } from '@/lib/settings';

/**
 * PUT - Update settings
 */
export async function PUT(request: NextRequest) {
  try {
    // Require authentication
    await requireAuth();

    const settings = await request.json();

    await saveSettings(settings);

    return NextResponse.json(
      { success: true, message: 'Ustawienia zostały zapisane' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update settings error:', error);
    return NextResponse.json(
      { error: 'Błąd serwera' },
      { status: 500 }
    );
  }
}
