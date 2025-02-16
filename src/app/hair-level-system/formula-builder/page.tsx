'use client';

import { useState } from 'react';
import Link from 'next/link';

// Import the exact colors from levelData
const levelColors = {
  1: "#000000", // Level 1 - Black
  2: "#231815", // Level 2 - Darkest Brown
  3: "#362318", // Level 3 - Dark Brown
  4: "#4A2D1C", // Level 4 - Medium Brown
  5: "#6B4435", // Level 5 - Light Brown
  6: "#8B6A4F", // Level 6 - Dark Blonde
  7: "#B68E68", // Level 7 - Medium Blonde
  8: "#D4B190", // Level 8 - Light Blonde
  9: "#E8C9A4", // Level 9 - Very Light Blonde
  10: "#F2DFC4" // Level 10 - Lightest Blonde/Platinum
};

export default function FormulaBuilder() {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [developer, setDeveloper] = useState<string>('20');
  const [processingTime, setProcessingTime] = useState<number>(30);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-600 to-pink-500 text-white h-20 shadow-md relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none"></div>
        <div className="flex items-center justify-between px-4 h-full relative">
          <a
            href="/"
            className="group text-2xl font-semibold transition-transform duration-200 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-pink-600 rounded-lg p-1"
            aria-label="Go to home page"
          >
            <span className="transform group-hover:scale-110 transition-transform duration-200 inline-block">🏠</span>
            <span className="text-lg">Home</span>
          </a>

          <div className="hidden md:flex space-x-14 items-center">
            <Link href="/beginner" className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5">
              Beginner
            </Link>
            <Link href="/intermediate" className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5">
              Intermediate
            </Link>
            <Link href="/expert" className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5">
              Expert
            </Link>
            <Link href="/contact" className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5">
              Contact
            </Link>
            <Link href="/hair-level-system" className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5">
              Hair Level System
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-white/90">faisal_70@yahoo.com</span>
            <button
              className="bg-white/25 text-white px-4 py-2 rounded-md shadow-sm hover:-translate-y-0.5 hover:bg-white/30 transition-all duration-200"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8">
          <Link href="/hair-level-system/level-wheel" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">Level Wheel</Link>
          <Link href="/hair-level-system/color-mixing" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">Color Mixing</Link>
          <Link href="/hair-level-system/formula-builder" className="px-4 py-2 bg-pink-500 text-white rounded-md">Formula Builder</Link>
          <Link href="/hair-level-system/reverse-formula" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">Reverse Formula</Link>
          <Link href="/hair-level-system/color-prediction" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">Color Prediction</Link>
          <Link href="/hair-level-system/lifting-process" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">Lifting Process</Link>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Quick Navigation */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-4">Quick Navigation</h3>
            <div className="space-y-3">
              {Object.entries(levelColors).map(([level, color]) => (
                <div 
                  key={level} 
                  className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-1 rounded"
                  onClick={() => setSelectedLevel(parseInt(level))}
                >
                  <div
                    className="w-8 h-8 rounded-full border-2 border-gray-200"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-sm">Level {level}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-10 grid grid-cols-2 gap-8">
            {/* Formula Input Panel */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-6">Build Your Formula</h3>
              
              {/* Target Level Selection */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-2">Target Level</h4>
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-16 h-16 rounded-full border-2"
                    style={{ 
                      backgroundColor: selectedLevel ? levelColors[selectedLevel] : 'white',
                      borderColor: selectedLevel ? 'gray' : '#ddd'
                    }}
                  />
                  <span>Level {selectedLevel || '?'}</span>
                </div>
              </div>

              {/* Developer Selection */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-2">Developer Volume</h4>
                <select 
                  value={developer}
                  onChange={(e) => setDeveloper(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="10">10 Volume</option>
                  <option value="20">20 Volume</option>
                  <option value="30">30 Volume</option>
                  <option value="40">40 Volume</option>
                </select>
              </div>

              {/* Processing Time */}
              <div>
                <h4 className="text-lg font-semibold mb-2">Processing Time (minutes)</h4>
                <input 
                  type="range" 
                  min="15" 
                  max="45" 
                  step="5"
                  value={processingTime}
                  onChange={(e) => setProcessingTime(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-sm text-gray-600 mt-2">
                  {processingTime} minutes
                </div>
              </div>
            </div>

            {/* Result Panel */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-6">Formula Result</h3>
              {selectedLevel ? (
                <div>
                  <div className="flex items-center space-x-4 mb-6">
                    <div 
                      className="w-24 h-24 rounded-full border-2"
                      style={{ backgroundColor: levelColors[selectedLevel] }}
                    />
                    <div>
                      <h4 className="text-lg font-semibold">Level {selectedLevel}</h4>
                      <p className="text-gray-600">With {developer} Volume Developer</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">Formula Details:</h4>
                      <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li>Mix equal parts color and {developer} volume developer</li>
                        <li>Process for {processingTime} minutes</li>
                        <li>Monitor development closely</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold">Application Tips:</h4>
                      <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li>Apply to dry, unwashed hair</li>
                        <li>Section hair into quadrants</li>
                        <li>Use thin, even sections</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">
                  Select a target level and adjust your formula settings
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
