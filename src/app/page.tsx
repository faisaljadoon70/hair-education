'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
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

      {/* Navigation Buttons */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/beginner" 
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-pink-600 mb-3">Beginner Level</h2>
            <p className="text-gray-600">Start your journey with fundamental concepts and basic techniques.</p>
          </Link>

          <Link href="/intermediate"
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-pink-600 mb-3">Intermediate Level</h2>
            <p className="text-gray-600">Advance your skills with professional techniques and client consultation.</p>
          </Link>

          <Link href="/expert"
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-pink-600 mb-3">Expert Level</h2>
            <p className="text-gray-600">Master advanced techniques and business management skills.</p>
          </Link>

          <Link href="/contact"
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-pink-600 mb-3">Contact Us</h2>
            <p className="text-gray-600">Get in touch with our team for support and inquiries.</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
