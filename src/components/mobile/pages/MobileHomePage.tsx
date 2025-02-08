'use client';

import { useAuth } from '@/context/AuthContext';
import MobileHeader from '../navigation/MobileHeader';
import Link from 'next/link';
import { GiGraduateCap, GiScissors } from 'react-icons/gi';
import { AiFillStar } from 'react-icons/ai';
import { HiOutlineMail } from 'react-icons/hi';
import useDeviceDetection from '@/hooks/useDeviceDetection';
import { useEffect, useState } from 'react';

export default function MobileHomePage() {
  const { user } = useAuth();
  const { isMobile, isTablet } = useDeviceDetection();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Don't render mobile layout on desktop
  if (!isMobile && !isTablet) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="mobile-layout">
        <MobileHeader isHomePage={true} />
        <div className="mobile-content flex items-center justify-center">
          <div className="animate-pulse space-y-4 w-full">
            <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 bg-gray-200 rounded mx-4"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-layout">
      <MobileHeader isHomePage={true} />
      
      <main className="mobile-content">
        <div className="text-center mt-16">
          <h1 className="text-2xl font-bold mb-2">Professional Hair Education</h1>
          <p className="text-gray-600">
            Master the art and science of hair coloring through our comprehensive education platform.
          </p>
        </div>

        <div className="mt-4">
          <Link href="/beginner">
            <div className="p-4 border-2 border-pink-200 rounded-lg bg-gradient-to-r from-pink-50 to-white touch-feedback mb-4">
              <div className="flex items-center mb-2">
                <GiGraduateCap className="text-pink-500 text-2xl mr-2" />
                <h2 className="text-xl font-semibold text-pink-600">Beginner Level</h2>
              </div>
              <p className="text-gray-600 text-sm">
                Start your journey with fundamental concepts and basic techniques.
              </p>
            </div>
          </Link>

          <Link href="/intermediate">
            <div className="p-4 border-2 border-purple-200 rounded-lg bg-gradient-to-r from-purple-50 to-white touch-feedback mb-4">
              <div className="flex items-center mb-2">
                <GiScissors className="text-purple-500 text-2xl mr-2" />
                <h2 className="text-xl font-semibold text-purple-600">Intermediate Level</h2>
              </div>
              <p className="text-gray-600 text-sm">
                Advance your skills with professional techniques and client consultation.
              </p>
            </div>
          </Link>

          <Link href="/expert">
            <div className="p-4 border-2 border-blue-200 rounded-lg bg-gradient-to-r from-blue-50 to-white touch-feedback mb-4">
              <div className="flex items-center mb-2">
                <AiFillStar className="text-blue-500 text-2xl mr-2" />
                <h2 className="text-xl font-semibold text-blue-600">Expert Level</h2>
              </div>
              <p className="text-gray-600 text-sm">
                Master advanced techniques and become a certified professional.
              </p>
            </div>
          </Link>

          <Link href="/contact">
            <div className="p-4 border-2 border-gray-200 rounded-lg bg-gradient-to-r from-gray-50 to-white touch-feedback">
              <div className="flex items-center mb-2">
                <HiOutlineMail className="text-gray-500 text-2xl mr-2" />
                <h2 className="text-xl font-semibold text-gray-600">Contact Us</h2>
              </div>
              <p className="text-gray-600 text-sm">
                Get in touch with our team for support and inquiries.
              </p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
