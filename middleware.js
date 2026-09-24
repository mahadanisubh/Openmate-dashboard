import { NextResponse } from 'next/server';

const COOKIE_NAME = 'openmate_tenant_api_key';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  if (pathname === '/dashboard/sign-in') return NextResponse.next();

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
