'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { apiPut } from '../lib/api-client.js';
import { friendlyApiError } from '../lib/api-errors.js';
import { getApiKey } from '../lib/session.js';

function redirectWithError(message) {
  redirect(`/dashboard/origins?error=${encodeURIComponent(message)}`);
}

export async function saveOrigins(formData) {
  const apiKey = await getApiKey();
  if (!apiKey) redirect('/dashboard/sign-in');

  const raw = String(formData.get('origins') ?? '');
  const origins = raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const res = await apiPut('/tenants/me/origins', apiKey, { origins });
  if (!res.ok) {
    redirectWithError(friendlyApiError(res.data, 'The origins could not be saved.'));
  }

  revalidatePath('/dashboard/origins');
  redirect('/dashboard/origins?saved=1');
}
