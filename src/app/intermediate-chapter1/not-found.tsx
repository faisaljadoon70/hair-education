'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Sorry, the intermediate chapter 1 content you&apos;re looking for doesn&apos;t exist.
        </p>
        <div className="space-y-4">
          <Link
            href="/intermediate"
            className="block w-full bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 transition-colors"
          >
            Return to Intermediate Level
          </Link>
          <Link
            href="/"
            className="block text-pink-600 hover:text-pink-700"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
