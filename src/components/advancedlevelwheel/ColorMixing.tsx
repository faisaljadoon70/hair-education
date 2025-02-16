'use client';

import React, { useState, useEffect } from 'react';
import { levelColors } from '../levelwheel/levelData';

export const ColorMixing = () => {
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
    
    // Find the closest shade card color for this level
    const roundedLevel = Math.round(mixedLevel * 10) / 10; // Round to nearest 0.1
    
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

  // Quick Navigation levels
  const levels = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="flex">
      {/* Quick Navigation */}
      <div className="w-48 mr-8">
        <h3 className="text-lg font-semibold mb-4">Quick Navigation</h3>
        <div className="space-y-2">
          {levels.map((level) => (
            <div 
              key={level}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => {
                if (!firstColor) {
                  setFirstColor(level);
                } else if (!secondColor) {
                  setSecondColor(level);
                }
              }}
            >
              <div 
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: levelColors[level] }}
              />
              <span>Level {level}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-8">
        {/* Color Selection Panel */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-6">Select Colors to Mix</h3>
          
          {/* First Color Selection */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Chosen Color Level 1</h4>
            <div className="flex items-center space-x-4">
              <div 
                className="w-12 h-12 rounded-full border-2"
                style={{ backgroundColor: firstColor ? levelColors[firstColor] : '#fff' }}
              />
              <span>Level {firstColor || '?'}</span>
            </div>
          </div>

          {/* Second Color Selection */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Chosen Color Level 2</h4>
            <div className="flex items-center space-x-4">
              <div 
                className="w-12 h-12 rounded-full border-2"
                style={{ backgroundColor: secondColor ? levelColors[secondColor] : '#fff' }}
              />
              <span>Level {secondColor || '?'}</span>
            </div>
          </div>

          {/* Mixing Ratio Slider */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Mixing Ratio</h4>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={mixingRatio}
              onChange={(e) => setMixingRatio(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{100 - mixingRatio}% Level {firstColor || '?'}</span>
              <span>{mixingRatio}% Level {secondColor || '?'}</span>
            </div>
          </div>
        </div>

        {/* Result Panel */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
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
  );
};
