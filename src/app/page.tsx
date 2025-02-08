'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GiGraduateCap } from 'react-icons/gi';
import { GiScissors } from 'react-icons/gi';
import { AiFillStar } from 'react-icons/ai';
import { AiOutlineMail } from 'react-icons/ai';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import { supabase } from '@/utils/supabase';
import dynamic from 'next/dynamic';
import useDeviceDetection from '@/hooks/useDeviceDetection';

// Dynamically import mobile page to avoid loading mobile code on desktop
const MobileHomePage = dynamic(
  () => import('@/components/mobile/pages/MobileHomePage'),
  { ssr: false }
);

function HomeNavigation() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-gradient-to-r from-pink-600 to-pink-500 text-white h-20 shadow-md relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none"></div>
        <div className="flex items-center justify-between px-4 h-full relative">
          {!user ? (
            <div className="ml-auto">
              <Link
                href="/auth/signin"
                className="bg-white/25 text-white px-4 py-2 rounded-md shadow-sm hover:-translate-y-0.5 hover:bg-white/30 transition-all duration-200"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <>
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
                <span className="text-white/90">{user.email}</span>
                <button
                  onClick={async () => {
                    try {
                      await supabase.auth.signOut();
                      window.location.href = '/auth/signin';
                    } catch (error) {
                      console.error('Error signing out:', error);
                    }
                  }}
                  className="bg-white/25 px-4 py-1 rounded-md shadow-md hover:-translate-y-0.5 hover:bg-white/30 transition-all duration-200"
                >
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Breadcrumb */}
      {user && (
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="py-2 text-sm">
              <span className="text-gray-500">You are here: </span>
              <Link href="/" className="text-pink-600 hover:text-pink-700">
                Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Home() {
  const { isMobile } = useDeviceDetection();
  const [progress, setProgress] = useState({
    beginner: 0,
    intermediate: 0,
    expert: 0
  });

  useEffect(() => {
    // Load progress from localStorage
    const loadProgress = () => {
      try {
        const beginnerChapters = localStorage.getItem('completedBeginnerChapters');
        const intermediateChapters = localStorage.getItem('completedIntermediateChapters');
        const expertChapters = localStorage.getItem('completedExpertChapters');

        setProgress({
          beginner: beginnerChapters ? (Object.keys(JSON.parse(beginnerChapters)).length / 5) * 100 : 0,
          intermediate: intermediateChapters ? (Object.keys(JSON.parse(intermediateChapters)).length / 5) * 100 : 0,
          expert: expertChapters ? (Object.keys(JSON.parse(expertChapters)).length / 5) * 100 : 0
        });
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    };

    loadProgress();
  }, []);

  // Return mobile version if on mobile device
  if (isMobile) {
    return <MobileHomePage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <HomeNavigation />
      {/* Hero Section */}
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Professional Hair Education
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Master the art and science of hair coloring through our comprehensive education platform.
          </p>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <Link 
            href="/beginner" 
            className="bg-white rounded-xl border-2 border-pink-300 p-8 
                     shadow-md hover:shadow-xl hover:border-pink-500 
                     transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-3">
              <GiGraduateCap className="text-3xl text-pink-600" />
              <h2 className="text-2xl font-bold text-pink-600">Beginner Level</h2>
            </div>
            <p className="text-gray-600">Start your journey with fundamental concepts and basic techniques.</p>
            {progress.beginner > 0 && (
              <div className="mt-4">
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-pink-500 rounded-full transition-all duration-500" 
                    style={{width: `${progress.beginner}%`}}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-1">{Math.round(progress.beginner)}% Complete</p>
              </div>
            )}
          </Link>

          <Link 
            href="/intermediate" 
            className="bg-white rounded-xl border-2 border-pink-300 p-8 
                     shadow-md hover:shadow-xl hover:border-pink-500 
                     transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-3">
              <GiScissors className="text-3xl text-pink-600" />
              <h2 className="text-2xl font-bold text-pink-600">Intermediate Level</h2>
            </div>
            <p className="text-gray-600">Advance your skills with professional techniques and client consultation.</p>
            {progress.intermediate > 0 && (
              <div className="mt-4">
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-pink-500 rounded-full transition-all duration-500" 
                    style={{width: `${progress.intermediate}%`}}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-1">{Math.round(progress.intermediate)}% Complete</p>
              </div>
            )}
          </Link>

          <Link 
            href="/expert" 
            className="bg-white rounded-xl border-2 border-pink-300 p-8 
                     shadow-md hover:shadow-xl hover:border-pink-500 
                     transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-3">
              <AiFillStar className="text-3xl text-pink-600" />
              <h2 className="text-2xl font-bold text-pink-600">Expert Level</h2>
            </div>
            <p className="text-gray-600">Master advanced techniques and business management skills.</p>
            {progress.expert > 0 && (
              <div className="mt-4">
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-pink-500 rounded-full transition-all duration-500" 
                    style={{width: `${progress.expert}%`}}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-1">{Math.round(progress.expert)}% Complete</p>
              </div>
            )}
          </Link>

          <Link 
            href="/contact" 
            className="bg-white rounded-xl border-2 border-pink-300 p-8 
                     shadow-md hover:shadow-xl hover:border-pink-500 
                     transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-3">
              <AiOutlineMail className="text-3xl text-pink-600" />
              <h2 className="text-2xl font-bold text-pink-600">Contact Us</h2>
            </div>
            <p className="text-gray-600">Get in touch with our team for support and inquiries.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
