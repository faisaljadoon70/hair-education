'use client';

import { Metadata } from 'next';
import { useState } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import useDeviceDetection from '@/hooks/useDeviceDetection';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/utils/supabase';

const MobileLevelWheelPage = dynamic(
  () => import('@/components/mobile/pages/MobileLevelWheelPage'),
  { ssr: false }
);

const LevelWheel = dynamic(() => import('@/components/levelwheel/LevelWheel'), {
  ssr: false,
});

export default function ColorWheelPage() {
  const { isMobile } = useDeviceDetection();
  const { user, signOut } = useAuth();

  return (
    <>
      {isMobile ? (
        <MobileLevelWheelPage />
      ) : (
        <ProtectedRoute>
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
                    onClick={() => signOut()}
                    className="bg-white/25 text-white px-4 py-2 rounded-md shadow-sm hover:-translate-y-0.5 hover:bg-white/30 transition-all duration-200"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </header>
            <div className="container mx-auto px-4 py-8">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Professional Hair Level Wheel</h1>
                <div className="space-x-4">
                  <Link
                    href="/advanced-level-wheel"
                    className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
                  >
                    Advanced Mode
                  </Link>
                  <Link
                    href="/level-wheel/shade-card"
                    className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
                  >
                    Shade Card
                  </Link>
                </div>
              </div>
              <LevelWheel />
            </div>
          </div>
        </ProtectedRoute>
      )}
    </>
  );
}
