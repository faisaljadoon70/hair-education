'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/utils/supabase';
import useDeviceDetection from '@/hooks/useDeviceDetection';
import dynamic from 'next/dynamic';

const MobileBeginnerChapter3Overview = dynamic(
  () => import('@/components/mobile/pages/MobileBeginnerChapter3Overview'),
  { ssr: false }
);

export default function BeginnerChapter3Overview() {
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const { isMobile } = useDeviceDetection();

  const handleNavigation = (path: string) => {
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = path;
    }, 300);
  };

  return (
    <>
      {isMobile ? (
        <MobileBeginnerChapter3Overview />
      ) : (
        <ProtectedRoute>
          {isLoading && (
            <div className="fixed inset-0 bg-pink-600/20 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
            </div>
          )}
          <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
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
                  <span className="text-white py-1 px-4 text-base font-bold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:rounded-full bg-white/15 rounded-md">
                    Beginner
                  </span>
                  <Link href="/intermediate" className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5">
                    Intermediate
                  </Link>
                  <Link href="/expert" className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5">
                    Expert
                  </Link>
                  <Link href="/contact" className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5">
                    Contact
                  </Link>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-white/90">{user?.email}</span>
                  <button
                    onClick={async () => {
                      await supabase.auth.signOut();
                    }}
                    className="bg-white/25 px-4 py-1 rounded-md shadow-md hover:-translate-y-0.5 hover:bg-white/30 transition-all duration-200"
                  >
                    Sign Out
                  </button>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-white p-2"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {isMobileMenuOpen ? (
                        <path d="M6 18L18 6M6 6l12 12" />
                      ) : (
                        <path d="M4 6h16M4 12h16m-7 6h7" />
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              {/* Mobile menu */}
              {isMobileMenuOpen && (
                <div className="md:hidden bg-pink-700">
                  <div className="px-2 pt-2 pb-3 space-y-1">
                    <Link href="/" className="block text-white/90 hover:text-white px-3 py-2 w-full text-left">
                      Home
                    </Link>
                    <span className="block text-white bg-white/15 px-3 py-2 w-full text-left">
                      Beginner
                    </span>
                    <Link href="/intermediate" className="block text-white/90 hover:text-white px-3 py-2 w-full text-left">
                      Intermediate
                    </Link>
                    <Link href="/expert" className="block text-white/90 hover:text-white px-3 py-2 w-full text-left">
                      Expert
                    </Link>
                    <Link href="/contact" className="block text-white/90 hover:text-white px-3 py-2 w-full text-left">
                      Contact
                    </Link>
                  </div>
                </div>
              )}
            </header>

            {/* Breadcrumb */}
            <div className="bg-white shadow-sm">
              <div className="max-w-7xl mx-auto px-4">
                <div className="py-2 text-sm">
                  <span className="text-gray-500">Your path: </span>
                  <Link href="/" className="text-pink-600 hover:text-pink-700">
                    Home
                  </Link>
                  <span className="text-gray-500"> / </span>
                  <Link href="/beginner" className="text-pink-600 hover:text-pink-700">
                    Beginner
                  </Link>
                  <span className="text-gray-500"> / </span>
                  <span className="text-gray-900">Chapter 3</span>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Chapter 3: Colour Theory</h1>
                
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-600 mb-8">
                    Welcome to Chapter 3 of your hair education journey! In this chapter, we'll explore the fascinating world of color theory and its application in hair coloring. Understanding these fundamental concepts is essential for becoming a skilled colorist and creating beautiful, harmonious hair colors.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-pink-50 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-pink-600 mb-3">What You'll Learn</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Basic principles of color and their application</li>
                        <li>• Understanding translucent vs opaque colors</li>
                        <li>• Color wheel and color relationships</li>
                        <li>• Primary, secondary, and tertiary colors</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-gray-700 mb-3">Chapter Highlights</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Interactive color theory demonstrations</li>
                        <li>• Practical color mixing exercises</li>
                        <li>• Progress tracking</li>
                        <li>• Real-world application examples</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={() => handleNavigation('/beginner-chapter3')}
                      className="bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors duration-200 transform hover:scale-105"
                    >
                      Start Chapter 3
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ProtectedRoute>
      )}
    </>
  );
}
