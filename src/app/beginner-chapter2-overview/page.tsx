'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useDeviceDetection from '@/hooks/useDeviceDetection';
import dynamic from 'next/dynamic';

// Dynamically import mobile page
const MobileBeginnerChapter2Overview = dynamic(
  () => import('@/components/mobile/pages/MobileBeginnerChapter2Overview'),
  { ssr: false }
);

export default function BeginnerChapter2Overview() {
  const router = useRouter();
  const { isMobile } = useDeviceDetection();

  return (
    <>
      {isMobile ? (
        <MobileBeginnerChapter2Overview />
      ) : (
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
                <button className="bg-white/25 text-white px-4 py-1 rounded-md hover:bg-white/30">
                  Sign Out
                </button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center text-sm text-gray-500 space-x-2 mb-6">
              <Link href="/" className="hover:text-pink-600">Home</Link>
              <span>/</span>
              <Link href="/beginner" className="hover:text-pink-600">Beginner</Link>
              <span>/</span>
              <span className="text-gray-900">Chapter 2</span>
            </div>

            <h1 className="text-3xl font-bold mb-6">Chapter 2: Hair Coloring Basics</h1>
            
            <p className="text-gray-600 mb-8">
              Welcome to Chapter 2! In this chapter, you'll learn the fundamental concepts of hair coloring, including color theory, product selection, and basic application techniques.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-pink-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">What You'll Learn</h2>
                <ul className="space-y-2">
                  <li>• Understanding color theory and the color wheel</li>
                  <li>• Selecting the right hair color products</li>
                  <li>• Basic application techniques</li>
                  <li>• Safety precautions and client consultation</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Chapter Highlights</h2>
                <ul className="space-y-2">
                  <li>• Interactive color theory exercises</li>
                  <li>• Step-by-step application guides</li>
                  <li>• Product selection guidelines</li>
                  <li>• Practice scenarios</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => router.push('/beginner/chapter2')}
                className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition-colors duration-200"
              >
                Start Chapter 2
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
