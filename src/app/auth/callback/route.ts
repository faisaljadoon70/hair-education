import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { logger } from '@/utils/logger'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const type = requestUrl.searchParams.get('type')

  logger.log('Callback route accessed', { url: request.url, code: !!code, type })

  if (!code) {
    logger.log('No code provided, redirecting to signin')
    return NextResponse.redirect(new URL('/auth/signin', requestUrl.origin))
  }

  try {
    if (type === 'recovery') {
      logger.log('Processing password reset callback')
      const resetUrl = new URL('/auth/reset-password', requestUrl.origin)
      resetUrl.searchParams.set('code', code)
      logger.log('Redirecting to reset password page', { url: resetUrl.toString() })
      return NextResponse.redirect(resetUrl)
    }

    logger.log('Processing email confirmation callback')
    const supabase = createRouteHandlerClient({ cookies })
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      logger.error('Failed to exchange code for session', error)
      return NextResponse.redirect(new URL('/auth/signin?error=session', requestUrl.origin))
    }

    logger.log('Successfully created session', { userId: data.session?.user.id })
    return NextResponse.redirect(new URL('/', requestUrl.origin))
  } catch (error) {
    logger.error('Unexpected error in callback route', error)
    return NextResponse.redirect(new URL('/auth/signin?error=callback', requestUrl.origin))
  }
}
