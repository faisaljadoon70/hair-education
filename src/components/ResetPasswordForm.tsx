'use client';

import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { logger } from '@/utils/logger';
import LoadingSpinner from './LoadingSpinner';

export default function ResetPasswordForm({ code }: { code?: string }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (!code) {
        throw new Error('No code provided');
      }

      logger.log('Starting password reset process');
      
      // First verify the recovery code
      logger.log('Verifying recovery code');
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: 'recovery'
      });

      if (verifyError) {
        logger.error('Failed to verify recovery code', verifyError);
        throw verifyError;
      }

      logger.log('Recovery code verified, updating password');
      // Update password
      const { error: resetError } = await supabase.auth.updateUser({
        password,
      });

      if (resetError) {
        logger.error('Failed to update password', resetError);
        throw resetError;
      }

      logger.log('Password updated successfully');
      setMessage('Password updated successfully! Redirecting to login...');
      
      // Ensure signed out from all devices
      logger.log('Signing out from all devices after password change');
      await supabase.auth.signOut({ scope: 'global' });
      
      // Wait 2 seconds then redirect to sign in
      setTimeout(() => {
        logger.log('Redirecting to signin page');
        router.push('/auth/signin');
        router.refresh();
      }, 2000);
    } catch (err: any) {
      logger.error('Error in password reset process', err);
      setError(err.message || 'An error occurred while resetting your password.');
    } finally {
      setLoading(false);
    }
  };

  if (!code) {
    return null;
  }

  return (
    <div>
      <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
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
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
              placeholder="New password"
              minLength={6}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            {loading ? <LoadingSpinner /> : 'Reset Password'}
          </button>
        </div>
      </form>
      {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
      {message && <p className="mt-2 text-center text-sm text-green-600">{message}</p>}
    </div>
  );
}
