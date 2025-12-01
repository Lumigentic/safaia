/**
 * Simple admin authentication
 * Using environment variable for password
 */

import { cookies } from 'next/headers';
import crypto from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'safaia2024';
const SESSION_COOKIE_NAME = 'safaia_admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Hash password for comparison
 */
function hashPassword(password: string): string {
  return crypto
    .createHash('sha256')
    .update(password + process.env.ADMIN_SALT || 'safaia-salt')
    .digest('hex');
}

/**
 * Verify admin password
 */
export function verifyPassword(password: string): boolean {
  const hashedInput = hashPassword(password);
  const hashedAdmin = hashPassword(ADMIN_PASSWORD);
  return hashedInput === hashedAdmin;
}

/**
 * Create session token
 */
export function createSession(): string {
  const sessionData = {
    timestamp: Date.now(),
    random: crypto.randomBytes(16).toString('hex'),
  };

  return Buffer.from(JSON.stringify(sessionData)).toString('base64');
}

/**
 * Validate session token
 */
export function validateSession(token: string): boolean {
  try {
    const sessionData = JSON.parse(Buffer.from(token, 'base64').toString());
    const age = Date.now() - sessionData.timestamp;

    return age < SESSION_DURATION;
  } catch {
    return false;
  }
}

/**
 * Set session cookie
 */
export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000,
    path: '/',
  });
}

/**
 * Get session from cookies
 */
export async function getSession(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value;
}

/**
 * Clear session cookie
 */
export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();

  if (!session) {
    return false;
  }

  return validateSession(session);
}

/**
 * Require authentication (use in Server Components)
 */
export async function requireAuth() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    throw new Error('Unauthorized');
  }
}
