'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { apiUpload } from '../lib/api-client.js';
import { friendlyApiError } from '../lib/api-errors.js';
import { getApiKey } from '../lib/session.js';

function redirectWithError(message) {
  redirect(`/dashboard/documents?error=${encodeURIComponent(message)}`);
}

export async function uploadDocument(formData) {
  const apiKey = await getApiKey();
  if (!apiKey) redirect('/dashboard/sign-in');

  const file = formData.get('file');
  if (!file || typeof file === 'string' || file.size === 0) {
    redirectWithError('Choose a PDF or text document to upload.');
  }

  const contentType = file.type || (file.name?.toLowerCase().endsWith('.txt') ? 'text/plain' : 'application/pdf');
  const res = await apiUpload('/ingest/upload', apiKey, file, contentType);

  if (!res.ok) {
    redirectWithError(friendlyApiError(res.data, 'The upload failed. Try again.'));
  }

  revalidatePath('/dashboard/documents');
  redirect('/dashboard/documents?uploaded=1');
}
