import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  console.log('Middleware executing for path:', request.nextUrl.pathname)
  const response = NextResponse.next()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.delete({ name, ...options })
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()
  
  console.log('Session state in middleware:', session ? 'Session exists' : 'No session')

  // Allow access to auth-related routes even without session
  if (request.nextUrl.pathname.startsWith('/auth/')) {
    console.log('Allowing access to auth route')
    return response
  }

  // Redirect to login if accessing protected routes without session
  if (!session && (
    request.nextUrl.pathname.startsWith('/beginner') ||
    request.nextUrl.pathname.startsWith('/intermediate') ||
    request.nextUrl.pathname.startsWith('/expert')
  )) {
    console.log('No session found, redirecting to signin')
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  console.log('Access granted')
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
