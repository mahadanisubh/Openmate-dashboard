import { NextResponse } from 'next/server';

import { apiPost } from '../../../../../src/lib/api-client.js';
import { setSession } from '../../../../../src/lib/session.js';

// The Google authorization-code callback. Exchanges the code for tokens, forwards the id_token to the
// API for independent verification, then stores the returned session token in the auth cookie.
export const dynamic = 'force-dynamic';

const GOOGLE_TOKEN = 'https://oauth2.googleapis.com/token';

function fail(request, message) {
  return NextResponse.redirect(new URL(`/dashboard/sign-in?error=${encodeURIComponent(message)}`, request.url));
}

function redirectUri(request) {
  const configured = process.env.GOOGLE_REDIRECT_URI;
  if (configured) return configured;
  const origin = process.env.OPENMATE_DASHBOARD_ORIGIN || new URL(request.url).origin;
  return `${origin.replace(/\/+$/, '')}/api/auth/google/callback`;
}

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const expectedState = request.cookies.get('openmate_oauth_state')?.value;

  if (!code) return fail(request, 'Google did not return an authorization code.');
  if (!state || !expectedState || state !== expectedState) {
    return fail(request, 'The sign-in request could not be verified. Please try again.');
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) return fail(request, 'Google sign-in is not configured.');

  let idToken;
  try {
    const tokenRes = await fetch(GOOGLE_TOKEN, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri(request),
        grant_type: 'authorization_code',
      }),
      cache: 'no-store',
    });
    const tokens = await tokenRes.json();
    if (!tokenRes.ok || !tokens.id_token) {
      return fail(request, 'Google could not complete the sign-in.');
    }
    idToken = tokens.id_token;
  } catch {
    return fail(request, 'Google could not be reached. Please try again.');
  }

  const res = await apiPost('/auth/google', { idToken });
  if (!res.ok || !res.data?.token) {
    const message = res.data?.message ?? 'Google sign-in could not be completed.';
    return fail(request, message);
  }

  await setSession(res.data.token);
  const response = NextResponse.redirect(new URL('/dashboard', request.url));
  response.cookies.delete('openmate_oauth_state');
  return response;
}
