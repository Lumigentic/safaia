/**
 * Admin Login API Route
 * POST /api/admin/login
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, createSession, setSessionCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: 'Hasło jest wymagane' },
        { status: 400 }
      );
    }

    // Verify password
    const isValid = verifyPassword(password);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Nieprawidłowe hasło' },
        { status: 401 }
      );
    }

    // Create session
    const sessionToken = createSession();
    await setSessionCookie(sessionToken);

    return NextResponse.json(
      { success: true, message: 'Zalogowano pomyślnie' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Błąd serwera' },
      { status: 500 }
    );
  }
}
