'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { logger } from '@/utils/logger'
import { useState, useEffect } from 'react'

export default function SignIn() {
  const [origin, setOrigin] = useState('')
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

  if (!origin) return null

  const handleForgotPassword = async (email: string) => {
    try {
      logger.log('Starting password reset flow', { email })
      
      // Sign out from all devices
      logger.log('Signing out from all devices')
      const { error: signOutError } = await supabase.auth.signOut({ scope: 'global' })
      if (signOutError) {
        logger.error('Error signing out from all devices', signOutError)
        throw signOutError
      }
      logger.log('Successfully signed out from all devices')

      // Send reset password email
      logger.log('Sending reset password email')
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?type=recovery`
      })

      if (error) {
        logger.error('Error sending reset password email', error)
        throw error
      }
      
      logger.log('Reset password email sent successfully')
    } catch (error) {
      logger.error('Error in forgot password flow', error)
      throw error
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#9333ea',
                  brandAccent: '#7928a1'
                }
              }
            },
            className: {
              button: 'w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500',
              input: 'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm'
            }
          }}
          localization={{
            variables: {
              sign_in: {
                email_label: 'Email address',
                password_label: 'Password',
                email_input_placeholder: 'Your email',
                password_input_placeholder: 'Your password',
                button_label: 'Sign in',
                loading_button_label: 'Signing in ...',
                forgot_password_text: 'Forgot your password?'
              }
            }
          }}
          providers={[]}
          redirectTo={`${origin}/auth/callback`}
          onForgotPassword={handleForgotPassword}
          magicLink={false}
          showLinks={false}
          view="sign_in"
        />
      </div>
    </div>
  )
}
