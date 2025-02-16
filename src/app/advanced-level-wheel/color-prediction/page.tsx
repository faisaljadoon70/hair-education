'use client';

import { Suspense } from 'react';
import { ColorPrediction } from '@/components/advancedlevelwheel/ColorPrediction';
import Loading from '../loading';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/utils/supabase';

export default function ColorPredictionPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-600 to-pink-500 text-white h-20 shadow-md relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none"></div>
        <div className="flex items-center justify-between px-4 h-full relative">
          <Link
            href="/"
            className="group text-2xl font-semibold transition-transform duration-200 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-pink-600 rounded-lg p-1"
          >
            <span className="transform group-hover:scale-110 transition-transform duration-200 inline-block">🏠</span>
            <span className="text-lg">Home</span>
          </Link>

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

      {/* Navigation Tabs */}
      <div className="mb-8">
        <div className="flex space-x-2">
          <Link href="/advanced-level-wheel" className="px-6 py-2 rounded-t bg-gray-100">Level Wheel</Link>
          <Link href="/advanced-level-wheel/color-mixing" className="px-6 py-2 rounded-t bg-gray-100">Color Mixing</Link>
          <Link href="/advanced-level-wheel/formula-builder" className="px-6 py-2 rounded-t bg-gray-100">Formula Builder</Link>
          <Link href="/advanced-level-wheel/reverse-formula" className="px-6 py-2 rounded-t bg-gray-100">Reverse Formula</Link>
          <Link href="/advanced-level-wheel/color-prediction" className="px-6 py-2 rounded-t bg-pink-500 text-white">Color Prediction</Link>
          <Link href="/advanced-level-wheel/lifting-process" className="px-6 py-2 rounded-t bg-gray-100">Lifting Process</Link>
        </div>
        <div className="h-px bg-gray-200 -mt-px"></div>
      </div>

      {/* Main Content */}
      <Suspense fallback={<Loading />}>
        <ColorPrediction />
      </Suspense>
    </div>
  );
}
