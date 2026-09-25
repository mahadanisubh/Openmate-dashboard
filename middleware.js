import { NextResponse } from 'next/server';

const COOKIE_NAME = 'openmate_tenant_api_key';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  // The sign-in and Create Assistant pages are the ways in; neither needs a session.
  if (pathname === '/dashboard/sign-in' || pathname === '/dashboard/create-assistant') {
    return NextResponse.next();
  }

  const apiKey = request.cookies.get(COOKIE_NAME)?.value;
  if (!apiKey) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard/sign-in';
    url.search = '';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
