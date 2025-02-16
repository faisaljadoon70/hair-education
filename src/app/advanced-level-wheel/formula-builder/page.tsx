'use client';

import { Suspense } from 'react';
import { FormulaBuilder } from '@/components/advancedlevelwheel/FormulaBuilder';
import Loading from '../loading';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/utils/supabase';

export default function FormulaBuilderPage() {
  const { user } = useAuth();

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
            <Link href="/contact" className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5">
              Contact
            </Link>
            <Link href="/level-wheel" className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5">
              Hair Level System
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-white/90">{user?.email}</span>
            <button
              onClick={async () => {
                try {
                  await supabase.auth.signOut();
                  window.location.href = '/auth/signin';
                } catch (error) {
                  console.error('Error signing out:', error);
                }
              }}
              className="bg-white/25 text-white px-4 py-2 rounded-md shadow-sm hover:-translate-y-0.5 hover:bg-white/30 transition-all duration-200"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex space-x-4">
          <Link href="/advanced-level-wheel" className="px-4 py-2 bg-gray-200 rounded">Level Wheel</Link>
          <Link href="/advanced-level-wheel/color-mixing" className="px-4 py-2 bg-gray-200 rounded">Color Mixing</Link>
          <Link href="/advanced-level-wheel/formula-builder" className="px-4 py-2 bg-pink-500 text-white rounded">Formula Builder</Link>
          <Link href="/advanced-level-wheel/reverse-formula" className="px-4 py-2 bg-gray-200 rounded">Reverse Formula</Link>
          <Link href="/advanced-level-wheel/color-prediction" className="px-4 py-2 bg-gray-200 rounded">Color Prediction</Link>
          <Link href="/advanced-level-wheel/lifting-process" className="px-4 py-2 bg-gray-200 rounded">Lifting Process</Link>
        </div>
        <Suspense fallback={<Loading />}>
          <FormulaBuilder />
        </Suspense>
      </main>
    </div>
  );
}
