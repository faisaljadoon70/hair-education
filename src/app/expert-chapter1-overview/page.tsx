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
            <Link href="/intermediate" className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5">
              Intermediate
            </Link>
            <span className="text-white py-1 px-4 text-base font-bold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:rounded-full bg-white/15 rounded-md">
              Expert
            </span>
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
          <Link href="/expert" className="hover:text-pink-600">Expert</Link>
          <span>/</span>
          <span className="text-gray-900">Chapter 1</span>
        </div>

        <h1 className="text-3xl font-bold mb-6">Chapter 1: Advanced Hair Techniques</h1>
        
        <p className="text-gray-600 mb-8">
          Welcome to Chapter 1 of the Expert level! In this advanced chapter, we'll explore sophisticated hair coloring techniques, business management strategies, and professional development skills that will elevate your expertise to the highest level.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-pink-50 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">What You'll Learn</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-pink-600 mr-2">•</span>
                Advanced color formulation and mixing techniques
              </li>
              <li className="flex items-start">
                <span className="text-pink-600 mr-2">•</span>
                Complex color correction procedures
              </li>
              <li className="flex items-start">
                <span className="text-pink-600 mr-2">•</span>
                Professional salon management skills
              </li>
              <li className="flex items-start">
                <span className="text-pink-600 mr-2">•</span>
                Client consultation and relationship building
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Chapter Highlights</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-pink-600 mr-2">•</span>
                Professional case studies
              </li>
              <li className="flex items-start">
                <span className="text-pink-600 mr-2">•</span>
                Advanced technique demonstrations
              </li>
              <li className="flex items-start">
                <span className="text-pink-600 mr-2">•</span>
                Business management tools
              </li>
              <li className="flex items-start">
                <span className="text-pink-600 mr-2">•</span>
                Interactive learning exercises
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/expert-chapter1"
            className="inline-block bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Start Chapter 1
          </Link>
        </div>
      </div>
    </div>
  );
}
