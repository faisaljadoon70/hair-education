'use client';

import { useAuth } from '@/context/AuthContext';
import MobileHeader from '../navigation/MobileHeader';
import Link from 'next/link';
import { GiGraduateCap, GiScissors } from 'react-icons/gi';
import { AiFillStar } from 'react-icons/ai';
import { HiOutlineMail } from 'react-icons/hi';

export default function MobileHomePage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <MobileHeader isHomePage={true} />
      
      <main className="flex-1 px-4 pt-16"> {/* Increased padding-top for fixed header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Professional Hair Education</h1>
          <p className="text-gray-600 px-4">
            Master the art and science of hair coloring through our comprehensive education platform.
          </p>
        </div>

        <div className="space-y-4">
          <Link href="/beginner">
            <div className="p-4 border-2 border-pink-200 rounded-lg bg-gradient-to-r from-pink-50 to-white">
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
            <div className="p-4 border-2 border-purple-200 rounded-lg bg-gradient-to-r from-purple-50 to-white">
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
            <div className="p-4 border-2 border-blue-200 rounded-lg bg-gradient-to-r from-blue-50 to-white">
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
            <div className="p-4 border-2 border-pink-200 rounded-lg bg-gradient-to-r from-pink-50 to-white">
              <div className="flex items-center mb-2">
                <HiOutlineMail className="text-pink-500 text-2xl mr-2" />
                <h2 className="text-xl font-semibold text-pink-600">Contact Us</h2>
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
