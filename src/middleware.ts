import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isStudioRoute = pathname.startsWith('/studio');
  const isMutationApi = pathname.startsWith('/api/projects') && req.method !== 'GET';

  if (isStudioRoute || isMutationApi) {
    const token = req.cookies.get('portfolio_auth_token')?.value;

    if (!token) {
      return isStudioRoute
        ? NextResponse.redirect(new URL('/', req.url))
        : NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch {
      return isStudioRoute
        ? NextResponse.redirect(new URL('/', req.url))
        : NextResponse.json({ error: 'Invalid Token' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/studio/:path*', '/api/projects/:path*'],
};