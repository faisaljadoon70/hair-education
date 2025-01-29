import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
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

  // Redirect to login if accessing protected routes without session
  if (!session && (
    request.nextUrl.pathname.startsWith('/expert') ||
    request.nextUrl.pathname.startsWith('/intermediate') ||
    request.nextUrl.pathname.startsWith('/beginner')
  )) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  // Prevent access to sign-up
  if (request.nextUrl.pathname.includes('/auth/signup')) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  // List of auth-specific paths
  const authPaths = ['/auth/signin', '/auth/reset-password']
  
  const isAuthPath = authPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  // If accessing auth routes while authenticated, redirect to home
  if (isAuthPath && session && !request.nextUrl.pathname.includes('reset-password')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/auth/:path*',
    '/beginner/:path*',
    '/intermediate/:path*',
    '/expert/:path*'
  ]
}
