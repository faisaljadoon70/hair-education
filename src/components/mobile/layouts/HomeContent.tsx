'use client';

import Link from 'next/link';
import { GiGraduateCap, GiScissors } from 'react-icons/gi';
import { AiFillStar, AiOutlineMail } from 'react-icons/ai';
import { useAuth } from '@/context/AuthContext';

interface HomeContentProps {
  progress: {
    beginner: number;
    intermediate: number;
    expert: number;
  };
}

export default function HomeContent({ progress }: HomeContentProps) {
  const { user } = useAuth();

  return (
    <div className="px-4 py-8 pb-24">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">
          Professional Hair Education
        </h1>
        <p className="text-gray-600 text-base">
          Master the art and science of hair coloring through our comprehensive education platform.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Link href="/beginner" 
          className="group p-6 bg-white rounded-2xl shadow-md transition-all duration-200 border-2 border-transparent touch-feedback">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-pink-100 p-3 rounded-full">
              <GiGraduateCap className="text-pink-600 text-2xl" />
            </div>
            <h2 className="text-xl font-semibold text-pink-600">Beginner Level</h2>
          </div>
          <p className="text-gray-600">Start your journey with fundamental concepts and basic techniques.</p>
          {user && (
            <div className="mt-4 bg-pink-50 rounded-full h-2">
              <div
                className="bg-pink-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress.beginner}%` }}
              />
            </div>
          )}
        </Link>

        <Link href="/intermediate"
          className="group p-6 bg-white rounded-2xl shadow-md transition-all duration-200 border-2 border-transparent touch-feedback">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-pink-100 p-3 rounded-full">
              <GiScissors className="text-pink-600 text-2xl" />
            </div>
            <h2 className="text-xl font-semibold text-pink-600">Intermediate Level</h2>
          </div>
          <p className="text-gray-600">Advance your skills with professional techniques and client consultation.</p>
          {user && (
            <div className="mt-4 bg-pink-50 rounded-full h-2">
              <div
                className="bg-pink-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress.intermediate}%` }}
              />
            </div>
          )}
        </Link>

        <Link href="/expert"
          className="group p-6 bg-white rounded-2xl shadow-md transition-all duration-200 border-2 border-transparent touch-feedback">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-pink-100 p-3 rounded-full">
              <AiFillStar className="text-pink-600 text-2xl" />
            </div>
            <h2 className="text-xl font-semibold text-pink-600">Expert Level</h2>
          </div>
          <p className="text-gray-600">Master advanced techniques and business management skills.</p>
          {user && (
            <div className="mt-4 bg-pink-50 rounded-full h-2">
              <div
                className="bg-pink-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress.expert}%` }}
              />
            </div>
          )}
        </Link>

        <Link href="/contact"
          className="group p-6 bg-white rounded-2xl shadow-md transition-all duration-200 border-2 border-transparent touch-feedback">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-pink-100 p-3 rounded-full">
              <AiOutlineMail className="text-pink-600 text-2xl" />
            </div>
            <h2 className="text-xl font-semibold text-pink-600">Contact Us</h2>
          </div>
          <p className="text-gray-600">Get in touch with our team for support and inquiries.</p>
        </Link>
      </div>
    </div>
  );
}
