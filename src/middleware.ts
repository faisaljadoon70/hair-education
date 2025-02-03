import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

// Device type detection
function getDeviceType(userAgent: string) {
  const ua = userAgent.toLowerCase();
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
}

export async function middleware(request: NextRequest) {
  // Device detection
  const userAgent = request.headers.get('user-agent') || '';
  const deviceType = getDeviceType(userAgent);
  
  // Debug logging
  console.log('[Middleware] Request:', {
    path: request.nextUrl.pathname,
    deviceType,
    method: request.method,
    url: request.url
  });

  const response = NextResponse.next();

  // Add device type to headers
  response.headers.set('x-device-type', deviceType);

  // Protected routes that require authentication
  const { pathname } = request.nextUrl;
  const protectedPaths = ['/beginner', '/intermediate', '/expert'];
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

  if (isProtectedPath) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            response.cookies.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            response.cookies.delete({ name, ...options });
          },
        },
      }
    );

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        const redirectUrl = new URL('/auth/signin', request.url);
        redirectUrl.searchParams.set('redirectTo', pathname);
        return NextResponse.redirect(redirectUrl);
      }
    } catch (error) {
      console.error('[Middleware] Auth Error:', error);
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}
