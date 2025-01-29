import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })

  // Refresh session if expired
  const { data: { session }, error } = await supabase.auth.getSession()
  
  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // List of paths that require authentication
  const protectedPaths = ['/beginner', '/intermediate', '/expert']
  
  // List of auth-specific paths
  const authPaths = ['/auth/signin', '/auth/reset-password']
  
  // Prevent access to sign-up
  if (request.nextUrl.pathname.includes('/auth/signup')) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }
  
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )
  
  const isAuthPath = authPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  // If accessing a protected route and not authenticated, redirect to sign in
  if (isProtectedPath && !user) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  // If accessing auth routes while authenticated, redirect to home
  if (isAuthPath && user && !request.nextUrl.pathname.includes('reset-password')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return res
}

// Specify which routes this middleware should run for
export const config = {
  matcher: [
    '/auth/:path*',
    '/beginner/:path*',
    '/intermediate/:path*',
    '/expert/:path*'
  ]
}
