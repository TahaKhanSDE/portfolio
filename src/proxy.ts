import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isStudioRoute = pathname.startsWith('/studio');
  // POST /api/endorsements is public and must stay off this matcher.
  const isMutationApi =
    (pathname.startsWith('/api/projects') || pathname.startsWith('/api/portfolio')) &&
    request.method !== 'GET';

  if (isStudioRoute || isMutationApi) {
    const token = request.cookies.get('portfolio_auth_token')?.value;

    if (!token) {
      return isStudioRoute
        ? NextResponse.redirect(new URL('/', request.url))
        : NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch {
      return isStudioRoute
        ? NextResponse.redirect(new URL('/', request.url))
        : NextResponse.json({ error: 'Invalid Token' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/studio/:path*', '/api/projects/:path*', '/api/portfolio/:path*'],
};
