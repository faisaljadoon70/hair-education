import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { logger } from '@/utils/logger';

const ResetPasswordForm = dynamic(
  () => import('@/components/ResetPasswordForm'),
  { ssr: false }
);

export default function ResetPassword({
  searchParams,
}: {
  searchParams: { code?: string };
}) {
  if (!searchParams.code) {
    logger.log('No reset code found, redirecting to signin');
    redirect('/auth/signin');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email and new password below
          </p>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <ResetPasswordForm code={searchParams.code} />
        </Suspense>
      </div>
    </div>
  );
}
