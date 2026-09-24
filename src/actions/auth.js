'use server';

import { redirect } from 'next/navigation';

import { apiGet } from '../lib/api-client.js';
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

export async function signOut() {
  await clearSession();
  redirect('/dashboard/sign-in');
}
