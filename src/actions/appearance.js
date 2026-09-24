'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { apiPut } from '../lib/api-client.js';
import { friendlyApiError } from '../lib/api-errors.js';
import { getApiKey } from '../lib/session.js';

function redirectWithError(message) {
  redirect(`/dashboard/appearance?error=${encodeURIComponent(message)}`);
}

export async function saveAppearance(formData) {
  const apiKey = await getApiKey();
  if (!apiKey) redirect('/dashboard/sign-in');

  const appearance = {
    title: String(formData.get('title') ?? '').trim(),
    accentColor: String(formData.get('accentColor') ?? '').trim(),
    greeting: String(formData.get('greeting') ?? '').trim(),
  };

  const res = await apiPut('/tenants/me/appearance', apiKey, { appearance });
  if (!res.ok) {
    redirectWithError(friendlyApiError(res.data, 'The appearance could not be saved.'));
  }

  revalidatePath('/dashboard/appearance');
  redirect('/dashboard/appearance?saved=1');
}
