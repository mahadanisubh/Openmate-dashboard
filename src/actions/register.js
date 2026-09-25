'use server';

import { apiPost } from '../lib/api-client.js';

// T-019: registration is a public call. The key is returned to the caller to reveal once; it is not
// written to a cookie here, because the flow requires the user to copy it before signing in.
export async function registerTenant(formData) {
  const payload = {
    platformName: String(formData.get('platformName') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim(),
    password: String(formData.get('password') ?? ''),
    origin: String(formData.get('origin') ?? '').trim() || undefined,
  };

  const res = await apiPost('/register', payload);

  if (!res.ok || !res.data) {
    const message =
      res.data?.message ??
      (res.data?.fields?.length ? res.data.fields.map((f) => `${f.field}: ${f.reason}`).join('; ') : null) ??
      'The assistant could not be created. Please try again.';
    return { ok: false, error: message, fields: res.data?.fields ?? [] };
  }

  return { ok: true, tenant: res.data };
}
