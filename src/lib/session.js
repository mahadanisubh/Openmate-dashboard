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
    path: '/dashboard',
    maxAge: MAX_AGE_SECONDS,
  });
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
