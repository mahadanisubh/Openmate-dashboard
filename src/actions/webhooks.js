'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { apiPut } from '../lib/api-client.js';
import { friendlyApiError } from '../lib/api-errors.js';
import { getApiKey } from '../lib/session.js';

function redirectWithError(message) {
  redirect(`/dashboard/webhooks?error=${encodeURIComponent(message)}`);
}

export async function saveWebhook(formData) {
  const apiKey = await getApiKey();
  if (!apiKey) redirect('/dashboard/sign-in');

  const webhookUrl = String(formData.get('webhookUrl') ?? '').trim();

  const res = await apiPut('/tenants/me/webhook', apiKey, { webhookUrl });
  if (!res.ok) {
    redirectWithError(friendlyApiError(res.data, 'The webhook could not be saved.'));
  }

  revalidatePath('/dashboard/webhooks');
  redirect('/dashboard/webhooks?saved=1');
}
