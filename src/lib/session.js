import { cookies } from 'next/headers';
import { apiGet } from './api-client.js';

const COOKIE_NAME = 'openmate_tenant_api_key';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export function cookieName() {
  return COOKIE_NAME;
}

export async function getApiKey() {
  const jar = await cookies();
  return jar.get(COOKIE_NAME)?.value ?? null;
}

export async function setSession(apiKey) {
  const jar = await cookies();
  jar.set({
    name: COOKIE_NAME,
    value: apiKey,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    // Path `/` so the marketing pages can read the cookie's presence to switch the nav CTA between
    // "Create your assistant" and "Go to dashboard" without an API round trip.
    path: '/',
    maxAge: MAX_AGE_SECONDS,
  });
}

// Presence only: no API call, so a server component (the home page) can branch the CTA cheaply. The
// tenant is still verified by the API on every dashboard request; this is a display hint, not auth.
export async function hasSession() {
  const jar = await cookies();
  return Boolean(jar.get(COOKIE_NAME)?.value);
}

export async function clearSession() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function getTenant() {
  const apiKey = await getApiKey();
  if (!apiKey) return null;

  const res = await apiGet('/tenants/me', apiKey);
  return res.ok && res.data ? res.data : null;
}
