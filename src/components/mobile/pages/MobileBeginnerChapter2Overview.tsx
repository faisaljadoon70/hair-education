'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MobileHeader from '../navigation/MobileHeader';

export default function MobileBeginnerChapter2Overview() {
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
          <span className="text-gray-900">Chapter 2</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-4">Chapter 2: Hair Coloring Basics</h1>
        
        <p className="text-sm md:text-base text-gray-600 mb-8">
          Welcome to Chapter 2! In this chapter, you'll learn the fundamental concepts of hair coloring, including color theory, product selection, and basic application techniques.
        </p>

        <div className="space-y-4 md:space-y-6">
          <div className="bg-pink-50 p-4 md:p-6 rounded-lg">
            <h2 className="text-lg md:text-xl font-semibold mb-3">What You'll Learn</h2>
            <ul className="space-y-2 text-sm md:text-base">
              <li>• Understanding color theory and the color wheel</li>
              <li>• Selecting the right hair color products</li>
              <li>• Basic application techniques</li>
              <li>• Safety precautions and client consultation</li>
            </ul>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg md:text-xl font-semibold mb-3">Chapter Highlights</h2>
            <ul className="space-y-2 text-sm md:text-base">
              <li>• Interactive color theory exercises</li>
              <li>• Step-by-step application guides</li>
              <li>• Product selection guidelines</li>
              <li>• Practice scenarios</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => router.push('/beginner/chapter2')}
            className="w-full md:w-auto bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition-colors duration-200"
          >
            Start Chapter 2
          </button>
        </div>
      </main>
    </div>
  );
}
