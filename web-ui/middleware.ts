import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  try {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Allow guest access to dashboard with guest parameter
    if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
      const isGuestAccess = req.nextUrl.searchParams.get('guest') === 'true';
      if (!isGuestAccess) {
        const redirectUrl = new URL('/login', req.url);
        return NextResponse.redirect(redirectUrl);
      }
    }

    return res;
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
}