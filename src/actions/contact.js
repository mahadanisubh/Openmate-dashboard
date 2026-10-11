'use server';

import { apiPost } from '../lib/api-client.js';

// T-022: the contact form posts to the API, which stores the message — a missing mail provider cannot lose a submission.
export async function sendContactMessage(formData) {
  const payload = {
    kind: String(formData.get('kind') ?? '').trim(),
    name: String(formData.get('name') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim(),
    message: String(formData.get('message') ?? '').trim(),
  };

  const res = await apiPost('/contact', payload);
  if (!res.ok) {
    const message =
      res.data?.message ??
      (res.data?.fields?.length ? res.data.fields.map((f) => `${f.field}: ${f.reason}`).join('; ') : null) ??
      'Your message could not be sent. Please try again.';
    return { ok: false, error: message };
  }
  return { ok: true };
}
