'use client';

import { Metadata } from 'next';
import { useState } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import useDeviceDetection from '@/hooks/useDeviceDetection';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const MobileLevelWheelPage = dynamic(
  () => import('@/components/mobile/pages/MobileLevelWheelPage'),
  { ssr: false }
);

const LevelWheel = dynamic(() => import('@/components/levelwheel/LevelWheel'), {
  ssr: false,
});

export default function ColorWheelPage() {
  const { isMobile } = useDeviceDetection();

  return (
    <>
      {isMobile ? (
        <MobileLevelWheelPage />
      ) : (
        <ProtectedRoute>
          <div className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-pink-600 to-pink-500 p-4">
              <a
                href="/"
                className="group text-white text-lg font-semibold transition-transform duration-200 flex items-center space-x-2 w-fit focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-pink-600 rounded-lg p-1"
                aria-label="Go to home page"
              >
                <span className="transform group-hover:scale-110 transition-transform duration-200 inline-block">🏠</span>
                <span>Home</span>
              </a>
            </div>

            <div className="container mx-auto p-4">
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
