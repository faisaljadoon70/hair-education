import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  console.log('[Middleware] Executing for path:', request.nextUrl.pathname)
  const response = NextResponse.next()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          console.log('[Middleware] Getting cookie:', name)
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          console.log('[Middleware] Setting cookie:', name)
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          console.log('[Middleware] Removing cookie:', name)
          response.cookies.delete({ name, ...options })
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()
  
  console.log('[Middleware] Session state:', session ? 'Session exists' : 'No session')

  // Allow access to auth-related routes even without session
  if (request.nextUrl.pathname.startsWith('/auth/')) {
    console.log('[Middleware] Allowing access to auth route')
    return response
  }

  // Redirect to login if accessing protected routes without session
  if (!session && (
    request.nextUrl.pathname.startsWith('/beginner') ||
    request.nextUrl.pathname.startsWith('/intermediate') ||
    request.nextUrl.pathname.startsWith('/expert')
  )) {
    console.log('[Middleware] No session found, redirecting to signin')
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  console.log('[Middleware] Access granted')
  return response
}

export const config = {
  matcher: [
    '/auth/:path*',
    '/beginner/:path*',
    '/intermediate/:path*',
    '/expert/:path*',
  ],
}
