'use server';

import { redirect } from 'next/navigation';

import { apiGet, apiPost } from '../lib/api-client.js';
import { friendlyApiError } from '../lib/api-errors.js';
import { clearSession, setSession } from '../lib/session.js';

export async function signIn(formData) {
  const apiKey = String(formData.get('apiKey') ?? '').trim();

  if (!apiKey) {
    redirect('/dashboard/sign-in?error=The+API+key+is+required.');
  }

  const res = await apiGet('/tenants/me', apiKey);
  if (!res.ok) {
    const message = friendlyApiError(res.data, 'That API key was not recognised.');
    redirect(`/dashboard/sign-in?error=${encodeURIComponent(message)}`);
  }

  await setSession(apiKey);
  redirect('/dashboard');
}

// Email/password sign-in (T-021): the API verifies against the stored scrypt hash and returns a
// session token, which the dashboard stores in the same cookie the API already accepts.
export async function signInWithPassword(formData) {
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');

  if (!email || !password) {
    redirect('/dashboard/sign-in?error=An+email+and+password+are+required.');
  }

  const res = await apiPost('/auth/login', { email, password });
  if (!res.ok || !res.data?.token) {
    const message = friendlyApiError(res.data, 'The email or password is incorrect.');
    redirect(`/dashboard/sign-in?error=${encodeURIComponent(message)}`);
  }

  await setSession(res.data.token);
  redirect('/dashboard');
}

export async function signOut() {
  await clearSession();
  redirect('/dashboard/sign-in');
}
