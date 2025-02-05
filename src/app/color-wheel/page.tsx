'use client';

import { ColorWheel } from '@/components/colorwheel/ColorWheel';

export default function ColorWheelPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-pink-600 to-pink-500 p-4">
        <a
          href="/"
          className="group text-white text-lg font-semibold transition-transform duration-200 flex items-center space-x-2 w-fit focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-pink-600 rounded-lg p-1"
          aria-label="Go to home page"
        >
          <span className="transform group-hover:scale-110 transition-transform duration-200 inline-block">🏠</span>
          <span>Home</span>
        </a>
      </div>

      <div className="container mx-auto p-4">
        <ColorWheel />
      </div>
    </div>
  );
}
