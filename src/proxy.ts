import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const authed = request.cookies.get('dh_admin')?.value === process.env.ADMIN_PASSWORD;
  const isLoginPage = request.nextUrl.pathname === '/admin/login';
  const isAdminApi = request.nextUrl.pathname.startsWith('/api/admin/');

  if (isLoginPage) {
    if (authed) return NextResponse.redirect(new URL('/admin', request.url));
    return NextResponse.next();
  }

  if (!authed) {
    if (isAdminApi) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/api/admin/:path*'],
};
