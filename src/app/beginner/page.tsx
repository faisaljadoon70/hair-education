'use client';

import { useEffect } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import dynamic from 'next/dynamic';
import useDeviceDetection from '@/hooks/useDeviceDetection';

// Dynamically import mobile page to avoid loading mobile code on desktop
const MobileBeginnerPage = dynamic(
  () => import('@/components/mobile/pages/MobileBeginnerPage'),
  { ssr: false }
);

import Link from 'next/link';
import { useState } from 'react';
import { supabase } from '@/utils/supabase-client';

interface Chapter {
  number: number;
  title: string;
  description: string;
  path: string;
}

export default function BeginnerPage() {
  const { isMobile } = useDeviceDetection();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [completedChapters, setCompletedChapters] = useState<{
    [key: string]: boolean;
  }>({});

  // Array of chapters based on the document
  const chapters: Chapter[] = [
    {
      number: 1,
      title: 'Hair and Scalp',
      description: 'Learn about hair structure, types, and characteristics.',
      path: '/beginner-chapter1-overview',
    },
    {
      number: 2,
      title: 'Level System',
      description: 'Learn about hair color levels, natural tones, and the level system.',
      path: '/beginner-chapter2-overview',
    },
    {
      number: 3,
      title: 'Color Theory',
      description: 'Master the fundamentals of color theory and its application in hair coloring.',
      path: '/beginner-chapter3-overview',
    },
    {
      number: 4,
      title: 'Hair Coloring',
      description: 'Learn about different types of hair colors, application techniques, and proper color formulation.',
      path: '/beginner-chapter4-overview',
    },
    {
      number: 5,
      title: 'Chapter 5',
      description: 'Coming soon...',
      path: '/beginner-chapter5',
    },
  ];

  useEffect(() => {
    const savedProgress = localStorage.getItem('completedBeginnerChapters');
    if (savedProgress) {
      setCompletedChapters(JSON.parse(savedProgress));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(completedChapters).length > 0) {
      localStorage.setItem(
        'completedBeginnerChapters',
        JSON.stringify(completedChapters)
      );
    }
  }, [completedChapters]);

  const calculateProgress = () => {
    const completedCount = Object.values(completedChapters).filter(Boolean).length;
    return Math.round((completedCount / chapters.length) * 100);
  };

  const handleReset = () => {
    // Reset main beginner progress
    setCompletedChapters({});
    localStorage.setItem('completedBeginnerChapters', JSON.stringify({}));
    
    // Reset chapter-specific progress
    localStorage.removeItem('chapter1Progress');
    localStorage.removeItem('chapter2Progress');
    localStorage.removeItem('chapter3Progress');
    localStorage.removeItem('chapter4Progress');
    localStorage.removeItem('chapter5Progress');
  };

  // Handle page transitions
  const handleNavigation = (path: string) => {
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = path;
    }, 300);
  };

  return (
    <ProtectedRoute>
      {isMobile ? (
        <MobileBeginnerPage />
      ) : (
        <>
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

            {/* Breadcrumb */}
            <div className="bg-white shadow-sm">
              <div className="max-w-7xl mx-auto px-4">
                <div className="py-2 text-sm">
                  <span className="text-gray-500">You are here: </span>
                  <Link href="/" className="text-pink-600 hover:text-pink-700">
                    Home
                  </Link>
                  <span className="text-gray-500 mx-2">/</span>
                  <span className="text-gray-700">Beginner</span>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto p-6">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Table of Contents</h1>

                {/* Course Progress Section */}
                <div className="mb-10 bg-gray-50 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold text-gray-700">Course Progress</span>
                    <button
                      onClick={handleReset}
                      className="text-sm text-pink-600 hover:text-pink-700 font-medium"
                    >
                      Reset
                    </button>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-pink-600 rounded-full transition-all duration-300"
                      style={{ width: `${calculateProgress()}%` }}
                    />
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-sm text-gray-600">{calculateProgress()}% Complete</span>
                  </div>
                </div>

                {/* Chapters Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {chapters.map((chapter) => (
                    <Link key={chapter.number} href={chapter.path} className="block">
                      <div
                        className={`rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 ${
                          chapter.description === 'Coming soon...'
                            ? 'opacity-75 cursor-not-allowed'
                            : 'cursor-pointer hover:-translate-y-1'
                        }`}
                      >
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-pink-600 mb-2">
                            Chapter {chapter.number}: {chapter.title}
                          </h3>
                          <p className="text-gray-600">{chapter.description}</p>
                          
                          {/* Status Indicator */}
                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              {chapter.description === 'Coming soon...' ? (
                                <span className="inline-flex items-center">
                                  🔒 Coming Soon
                                </span>
                              ) : (
                                <span className="inline-flex items-center">
                                  📖 Available
                                </span>
                              )}
                            </span>
                            {completedChapters[`chapter${chapter.number}`] && (
                              <span className="text-green-500">✓ Completed</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </ProtectedRoute>
  );
}