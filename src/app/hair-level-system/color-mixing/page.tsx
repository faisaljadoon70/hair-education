'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

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

export default function ColorMixing() {
  const [firstColor, setFirstColor] = useState<number | null>(null);
  const [secondColor, setSecondColor] = useState<number | null>(null);
  const [mixingRatio, setMixingRatio] = useState<number>(50); // 50% default
  const [mixedResult, setMixedResult] = useState<{level: number, color: string} | null>(null);

  // Calculate mixed color result
  const calculateMixedColor = () => {
    if (!firstColor || !secondColor) return;

    // Calculate the weighted average level based on the mixing ratio
    const firstColorWeight = (100 - mixingRatio) / 100;
    const secondColorWeight = mixingRatio / 100;
    
    const mixedLevel = (firstColor * firstColorWeight) + (secondColor * secondColorWeight);
    
    // Find the closest level
    const roundedLevel = Math.round(mixedLevel * 10) / 10; // Round to nearest 0.1
    
    // Interpolate between the two closest integer levels to get the exact color
    const lowerLevel = Math.floor(roundedLevel);
    const upperLevel = Math.ceil(roundedLevel);
    const fraction = roundedLevel - lowerLevel;
    
    setMixedResult({
      level: roundedLevel,
      color: levelColors[Math.round(roundedLevel)]
    });
  };

  // Watch for changes in colors or ratio to update result
  useEffect(() => {
    if (firstColor && secondColor) {
      calculateMixedColor();
    }
  }, [firstColor, secondColor, mixingRatio]);

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
          <Link href="/advanced-level-wheel" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">Level Wheel</Link>
          <Link href="/hair-level-system/color-mixing" className="px-4 py-2 bg-pink-500 text-white rounded-md">Color Mixing</Link>
          <Link href="/hair-level-system/formula-builder" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">Formula Builder</Link>
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
                  onClick={() => {
                    const levelNum = parseInt(level);
                    if (!firstColor) {
                      setFirstColor(levelNum);
                    } else if (!secondColor) {
                      setSecondColor(levelNum);
                    } else {
                      // If both colors are set, start over with this color
                      setFirstColor(levelNum);
                      setSecondColor(null);
                    }
                  }}
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
            {/* Color Selection Panel */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-6">Select Colors to Mix</h3>
              
              {/* Chosen Colors */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-2">Chosen Color Level 1</h4>
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-16 h-16 rounded-full border-2"
                      style={{ 
                        backgroundColor: firstColor ? levelColors[firstColor] : 'white',
                        borderColor: firstColor ? 'gray' : '#ddd'
                      }}
                    />
                    <span>Level {firstColor || '?'}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2">Chosen Color Level 2</h4>
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-16 h-16 rounded-full border-2"
                      style={{ 
                        backgroundColor: secondColor ? levelColors[secondColor] : 'white',
                        borderColor: secondColor ? 'gray' : '#ddd'
                      }}
                    />
                    <span>Level {secondColor || '?'}</span>
                  </div>
                </div>
              </div>

              {/* Mixing Ratio Slider */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-2">Mixing Ratio</h4>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={mixingRatio}
                  onChange={(e) => setMixingRatio(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>{100 - mixingRatio}% Level {firstColor || '?'}</span>
                  <span>{mixingRatio}% Level {secondColor || '?'}</span>
                </div>
              </div>
            </div>

            {/* Result Panel */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-6">Mixed Color Result</h3>
              {mixedResult ? (
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <div 
                      className="w-24 h-24 rounded-full border-2"
                      style={{ backgroundColor: mixedResult.color }}
                    />
                    <div>
                      <h4 className="text-lg font-semibold">Level {mixedResult.level}</h4>
                      <p className="text-gray-600">Based on {100 - mixingRatio}:{mixingRatio} ratio</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">
                  Select two colors and adjust the ratio to see the result
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
