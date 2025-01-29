'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { logger } from '@/utils/logger'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const supabase = createClientComponentClient()

  logger.log('Reset password page loaded', { hasCode: !!code })

  useEffect(() => {
    if (!code) {
      logger.log('No reset code found, redirecting to signin')
      router.push('/auth/signin')
    }
  }, [code, router])

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      logger.log('Starting password reset process')
      
      // First verify the recovery code
      logger.log('Verifying recovery code')
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: code!,
        type: 'recovery'
      })

      if (verifyError) {
        logger.error('Failed to verify recovery code', verifyError)
        throw verifyError
      }

      logger.log('Recovery code verified, updating password')
      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      })

      if (updateError) {
        logger.error('Failed to update password', updateError)
        throw updateError
      }

      logger.log('Password updated successfully')
      setMessage('Password updated successfully! Redirecting to login...')
      
      // Ensure signed out from all devices
      logger.log('Signing out from all devices after password change')
      await supabase.auth.signOut({ scope: 'global' })
      
      // Wait 2 seconds then redirect to sign in
      setTimeout(() => {
        logger.log('Redirecting to signin page')
        router.push('/auth/signin')
        router.refresh()
      }, 2000)
    } catch (error: any) {
      logger.error('Error in password reset process', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (!code) return null

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset your password</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleReset}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">New Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="New password"
                minLength={6}
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          {message && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="text-sm text-green-700">{message}</div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              {loading ? 'Updating...' : 'Update password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
