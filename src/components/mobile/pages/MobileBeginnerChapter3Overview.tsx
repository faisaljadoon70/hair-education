'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MobileHeader from '../navigation/MobileHeader';

export default function MobileBeginnerChapter3Overview() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <MobileHeader isHomePage={false} />
      
      <main className="flex-1 px-4 pt-16">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-pink-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/beginner" className="hover:text-pink-600">Beginner</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Chapter 3</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-4">Chapter 3: Color Theory</h1>
        
        <p className="text-sm md:text-base text-gray-600 mb-8">
          Welcome to Chapter 3 of your hair education journey! In this chapter, we'll explore the fascinating world of color theory and its application in hair coloring. Understanding these fundamental concepts is essential for becoming a skilled colorist and creating beautiful, harmonious hair colors.
        </p>

        <div className="space-y-4 md:space-y-6">
          <div className="bg-pink-50 p-4 md:p-6 rounded-lg">
            <h2 className="text-lg md:text-xl font-semibold mb-3">What You'll Learn</h2>
            <ul className="space-y-2 text-sm md:text-base">
              <li>• Basic principles of color and their application</li>
              <li>• Understanding translucent vs opaque colors</li>
              <li>• Color wheel and color relationships</li>
              <li>• Primary, secondary, and tertiary colors</li>
            </ul>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg md:text-xl font-semibold mb-3">Chapter Highlights</h2>
            <ul className="space-y-2 text-sm md:text-base">
              <li>• Interactive color mixing exercises</li>
              <li>• Visual demonstrations</li>
              <li>• Real-world application examples</li>
              <li>• Practice activities</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => router.push('/beginner/chapter3')}
            className="w-full md:w-auto bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition-colors duration-200"
          >
            Start Chapter 3
          </button>
        </div>
      </main>
    </div>
  );
}
