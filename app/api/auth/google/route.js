import { NextResponse } from 'next/server';
import { randomBytes } from 'node:crypto';

// T-021: the dashboard is the OAuth client — it holds the Google client secret and runs the code
// flow. It then forwards the id_token to the API, which verifies it independently, so the API never
// needs the secret. The callback URL must be registered in Google Cloud Console (see /dashboard).
export const dynamic = 'force-dynamic';

const GOOGLE_AUTH = 'https://accounts.google.com/o/oauth2/v2/auth';

function callbackUrl(request) {
  const configured = process.env.GOOGLE_REDIRECT_URI;
  if (configured) return configured;
  const origin = process.env.OPENMATE_DASHBOARD_ORIGIN || new URL(request.url).origin;
  return `${origin.replace(/\/+$/, '')}/api/auth/google/callback`;
}

export async function GET(request) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    return NextResponse.redirect(new URL('/dashboard/sign-in?error=Google+sign-in+is+not+configured.', request.url));
  }

  // A random `state` round-trips through a short-lived cookie and is checked on the callback, so a
  // third party cannot inject an authorization code into the flow (CSRF).
  const state = randomBytes(16).toString('base64url');
  const url = new URL(GOOGLE_AUTH);
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('redirect_uri', callbackUrl(request));
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('scope', 'openid email profile');
  url.searchParams.set('state', state);
  url.searchParams.set('prompt', 'select_account');

  const response = NextResponse.redirect(url);
  response.cookies.set({
    name: 'openmate_oauth_state',
    value: state,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 600,
  });
  return response;
}
