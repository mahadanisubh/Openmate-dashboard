const DEFAULT_API_BASE = 'http://localhost:8080';

export function apiBase() {
  return (process.env.OPENMATE_API_BASE ?? DEFAULT_API_BASE).replace(/\/+$/, '');
}

async function parseBody(res) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return { error: 'UNPARSEABLE_RESPONSE', message: text.slice(0, 200) };
  }
}

export async function apiRequest(path, { method = 'GET', body, apiKey, contentType = 'application/json' } = {}) {
  const init = {
    method,
    headers: {
      'x-api-key': apiKey,
      'content-type': contentType,
      accept: 'application/json',
    },
    cache: 'no-store',
  };

  if (body !== undefined) init.body = JSON.stringify(body);

  const res = await fetch(`${apiBase()}${path}`, init);
  const data = await parseBody(res);

  return { ok: res.ok, status: res.status, data };
}

export async function apiGet(path, apiKey) {
  return apiRequest(path, { apiKey });
}

export async function apiPut(path, apiKey, body) {
  return apiRequest(path, { method: 'PUT', apiKey, body });
}

// Public registration (T-019): no tenant key yet, so this path carries no credential.
export async function apiPost(path, body) {
  return apiRequest(path, { method: 'POST', body });
}

export async function apiUpload(path, apiKey, file, contentType) {
  const res = await fetch(`${apiBase()}${path}`, {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'content-type': contentType || file?.type || 'application/octet-stream',
      accept: 'application/json',
    },
    body: file,
    cache: 'no-store',
  });
  const data = await parseBody(res);

  return { ok: res.ok, status: res.status, data };
}
