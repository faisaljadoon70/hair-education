'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Chapter1Overview() {
  const router = useRouter();

  return (
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
            <Link href="/beginner" className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5">
              Beginner
            </Link>
            <span className="text-white py-1 px-4 text-base font-bold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:rounded-full bg-white/15 rounded-md">
              Intermediate
            </span>
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
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-pink-600">Home</Link>
          <span>/</span>
          <Link href="/intermediate" className="hover:text-pink-600">Intermediate</Link>
          <span>/</span>
          <span className="text-gray-900">Chapter 1</span>
        </div>

        <h1 className="text-3xl font-bold mb-6">Chapter 1: Hair Analysis & Structure</h1>
        
        <p className="text-gray-600 mb-8">
          Welcome to Chapter 1 of your intermediate hair education journey! In this chapter, we'll dive deep into advanced concepts of hair analysis and structure. Understanding these advanced principles is essential for becoming an expert colorist.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-pink-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">What You'll Learn</h2>
            <ul className="space-y-2">
              <li>• Porosity analysis techniques and their importance</li>
              <li>• Advanced hair strand structure analysis</li>
              <li>• Detailed understanding of hair growth cycles</li>
              <li>• Professional assessment methods</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Chapter Highlights</h2>
            <ul className="space-y-2">
              <li>• Interactive analysis exercises</li>
              <li>• Professional diagnostic techniques</li>
              <li>• Progress tracking system</li>
              <li>• Practical case studies</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => router.push('/intermediate/chapter1')}
            className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition-colors duration-200"
          >
            Start Chapter 1
          </button>
        </div>
      </div>
    </div>
  );
}
