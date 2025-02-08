'use client';

import { useEffect } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import useDeviceDetection from '@/hooks/useDeviceDetection';
import Link from 'next/link';
import { useState } from 'react';
import { supabase } from '@/utils/supabase-client';
import MobileChapter1Container from '@/components/mobile/containers/MobileChapter1Container';

export default function BeginnerChapter1Overview() {
  const { isMobile } = useDeviceDetection();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ProtectedRoute>
      {isMobile ? (
        <MobileChapter1Container />
      ) : (
        <>
          {isLoading && (
            <div className="fixed inset-0 bg-pink-600/20 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
            </div>
          )}
          <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-gradient-to-r from-pink-600 to-pink-500 text-white h-20 shadow-md relative">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none"></div>
              <div className="flex items-center justify-between px-4 h-full relative">
                <Link
                  href="/"
                  className="group text-2xl font-semibold transition-transform duration-200 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-pink-600 rounded-lg p-1"
                  aria-label="Go to home page"
                >
                  <span className="transform group-hover:scale-110 transition-transform duration-200 inline-block">🏠</span>
                  <span className="text-lg">Home</span>
                </Link>

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
                  <span className="text-white/90">faisal_70@yahoo.com</span>
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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
                <Link href="/" className="hover:text-pink-600">Home</Link>
                <span>/</span>
                <Link href="/beginner" className="hover:text-pink-600">Beginner</Link>
                <span>/</span>
                <span className="text-gray-900">Chapter 1</span>
              </div>

              <h1 className="text-3xl font-bold mb-6">Chapter 1: Hair and Scalp</h1>
              
              <p className="text-gray-600 mb-8">
                Welcome to Chapter 1 of your hair education journey! In this chapter, we'll explore the fundamental concepts of hair structure and composition. Understanding these basics is crucial for becoming a skilled colorist.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-pink-50 rounded-xl p-6">
                  <h2 className="text-xl font-bold mb-4">What You'll Learn</h2>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-pink-600 mr-2">•</span>
                      Understanding hair structure and its components
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-600 mr-2">•</span>
                      The different parts of the hair shaft
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-600 mr-2">•</span>
                      Natural hair color and pigmentation
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-600 mr-2">•</span>
                      Hair and scalp anatomy basics
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-4">Chapter Highlights</h2>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-pink-600 mr-2">•</span>
                      Interactive learning modules
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-600 mr-2">•</span>
                      Detailed diagrams and illustrations
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-600 mr-2">•</span>
                      Progress tracking
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-600 mr-2">•</span>
                      Practical exercises
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <Link 
                  href="/beginner-chapter1"
                  className="inline-block bg-pink-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors duration-200"
                >
                  Start Chapter 1
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </ProtectedRoute>
  );
}
