'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FormulaBuilderContainer } from '@/components/formula/FormulaBuilderContainer';
import { useUser } from '@/hooks/useUser';
import Link from 'next/link';

export default function FormulaBuilderPage() {
  const router = useRouter();
  const { user, isLoading } = useUser();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect due to useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-pink-600 to-pink-500 text-white h-20 shadow-md relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none"></div>
        <div className="flex items-center justify-between px-4 h-full relative">
          <a
            href="/"
            className="group text-2xl font-semibold transition-transform duration-200 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-pink-600 rounded-lg p-1"
            aria-label="Go to home page"
          >
            <span className="transform group-hover:scale-110 transition-transform duration-200 inline-block">🏠</span>
            <span className="text-lg">Home</span>
          </a>

          <div className="hidden md:flex space-x-14 items-center">
            <Link href="/beginner" className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5">
              Beginner
            </Link>
            <Link href="/intermediate" className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5">
              Intermediate
            </Link>
            <Link href="/expert" className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5">
              Expert
            </Link>
          </div>
        </div>
      </header>

      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <nav className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm">
              <Link href="/level-wheel" className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-pink-50 hover:text-pink-600">
                Level Wheel
              </Link>
              <Link href="/color-mixing" className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-pink-50 hover:text-pink-600">
                Color Mixing
              </Link>
              <Link href="/formula-builder" className="px-4 py-2 rounded-md text-sm font-medium bg-pink-500 text-white shadow-sm">
                Formula Builder
              </Link>
              <Link href="/reverse-formula" className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-pink-50 hover:text-pink-600">
                Reverse Formula
              </Link>
              <Link href="/color-prediction" className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-pink-50 hover:text-pink-600">
                Color Prediction
              </Link>
              <Link href="/lifting-process" className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-pink-50 hover:text-pink-600">
                Lifting Process
              </Link>
            </nav>
          </div>

          <FormulaBuilderContainer
            userId={user.id}
            subscriptionTier={user.subscription_tier || 'basic'}
          />
        </div>
      </main>
    </div>
  );
}
