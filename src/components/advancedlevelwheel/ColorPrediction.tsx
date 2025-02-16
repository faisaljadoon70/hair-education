'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SHADE_CARD_SERIES } from '@/data/shadeCardData';
import type { HairShade } from '@/types/shadeCard';
import { calculateFinalColor } from '@/lib/utils/colorSpace';

interface Prediction {
  processingTime: number;
  developerStrength: number;
  toneAdjustments: string[];
}

export const ColorPrediction = () => {
  const [currentLevel, setCurrentLevel] = useState(4);
  const [targetLevel, setTargetLevel] = useState(7);
  const [currentTone, setCurrentTone] = useState<HairShade | null>(null);
  const [desiredTone, setDesiredTone] = useState<HairShade | null>(null);
  const [prediction, setPrediction] = useState<Prediction | null>(null);

  const getShadesByLevel = (level: number): HairShade[] => {
    const naturalSeries = SHADE_CARD_SERIES.find(series => series.id === 'natural');
    if (!naturalSeries) return [];

    const shades = naturalSeries.shades.filter(shade => {
      const [shadeLevel, tonePart] = shade.id.split('.');
      const toneNumber = parseInt(tonePart);
      return parseInt(shadeLevel) === level && toneNumber >= 0 && toneNumber <= 13;
    });

    return shades.sort((a, b) => {
      const aTone = parseInt(a.id.split('.')[1]);
      const bTone = parseInt(b.id.split('.')[1]);
      return aTone - bTone;
    });
  };

  const calculateDeveloperStrength = (startLevel: number, targetLevel: number): number => {
    const levelDifference = targetLevel - startLevel;
    if (levelDifference <= 0) return 10; // Deposit only
    if (levelDifference <= 2) return 20;
    if (levelDifference <= 4) return 30;
    return 40; // Maximum lift
  };

  const calculateToneAdjustments = (tone: HairShade): string[] => {
    const adjustments: string[] = [];
    
    switch (tone.type?.toLowerCase()) {
      case 'ash':
        adjustments.push('Add blue-violet base to neutralize warmth');
        break;
      case 'violet':
        adjustments.push('Add violet base to neutralize yellow tones');
        break;
      case 'green':
        adjustments.push('Add green base to neutralize red tones');
        break;
      case 'pearl':
        adjustments.push('Add pearl base for iridescent finish');
        break;
      case 'silver':
        adjustments.push('Add silver base for metallic cool tones');
        break;
      case 'natural':
        adjustments.push('No additional tone adjustments needed');
        break;
      case 'gold':
        adjustments.push('Add gold base for warm undertones');
        break;
      case 'copper':
        adjustments.push('Add copper base for warm red-orange tones');
        break;
      case 'mahogany':
        adjustments.push('Add mahogany base for rich red-violet tones');
        break;
      case 'red':
        adjustments.push('Add red base for vibrant red tones');
        break;
      default:
        adjustments.push('Standard tone application');
    }
    
    return adjustments;
  };

  const updateColorPrediction = () => {
    if (!currentLevel || !targetLevel) return;

    const levelDifference = Math.abs(targetLevel - currentLevel);
    const processingTime = 30 + (levelDifference * 15);

    setPrediction({
      processingTime,
      developerStrength: calculateDeveloperStrength(currentLevel, targetLevel),
      toneAdjustments: desiredTone ? calculateToneAdjustments(desiredTone) : []
    });
  };

  const getLevelColor = (level: number): string => {
    const colors = {
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
    return colors[level as keyof typeof colors] || '#000000';
  };

  return (
    <div className="container mx-auto px-6">
      <div className="flex gap-8">
        {/* Color Prediction Form */}
        <div className="w-[55%] bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-8">Color Prediction</h2>
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Current Level</label>
              <select
                value={currentLevel}
                onChange={(e) => setCurrentLevel(Number(e.target.value))}
                className="w-full p-3 border rounded-md text-base"
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((level) => (
                  <option key={level} value={level}>
                    Level {level}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Current Tone</label>
              <div className="grid grid-cols-4 gap-4">
                {getShadesByLevel(currentLevel).map((shade) => (
                  <button
                    key={shade.id}
                    onClick={() => setCurrentTone(shade)}
                    className={`p-5 rounded-lg text-center transition-all ${
                      currentTone?.id === shade.id
                        ? 'ring-2 ring-pink-500 shadow-lg'
                        : 'hover:ring-2 hover:ring-pink-300 hover:shadow-md'
                    }`}
                    style={{ backgroundColor: shade.hexColor }}
                  >
                    <span className={`text-sm font-medium ${
                      shade.level <= 5 ? 'text-white' : 'text-gray-800'
                    }`}>
                      {shade.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Desired Level</label>
              <select
                value={targetLevel}
                onChange={(e) => setTargetLevel(Number(e.target.value))}
                className="w-full p-3 border rounded-md text-base"
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((level) => (
                  <option key={level} value={level}>
                    Level {level}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Desired Tone</label>
              <div className="grid grid-cols-4 gap-4">
                {getShadesByLevel(targetLevel).map((shade) => (
                  <button
                    key={shade.id}
                    onClick={() => setDesiredTone(shade)}
                    className={`p-5 rounded-lg text-center transition-all ${
                      desiredTone?.id === shade.id
                        ? 'ring-2 ring-pink-500 shadow-lg'
                        : 'hover:ring-2 hover:ring-pink-300 hover:shadow-md'
                    }`}
                    style={{ backgroundColor: shade.hexColor }}
                  >
                    <span className={`text-sm font-medium ${
                      shade.level <= 5 ? 'text-white' : 'text-gray-800'
                    }`}>
                      {shade.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={updateColorPrediction}
              className="w-full bg-pink-600 text-white py-3 px-4 rounded-lg hover:bg-pink-700 transition-colors text-base font-medium"
            >
              Calculate Result
            </button>
          </div>
        </div>

        {/* Prediction Results */}
        <div className="w-[45%] bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-8">Prediction Results</h2>
          {prediction ? (
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-4">Color Result</h3>
                <div className="flex items-center space-x-4">
                  <div
                    className="w-12 h-12 rounded-full shadow-inner"
                    style={{ backgroundColor: desiredTone ? calculateFinalColor(targetLevel, desiredTone) : getLevelColor(targetLevel) }}
                  />
                  <div>
                    <div className="font-medium">Level {targetLevel}</div>
                    {desiredTone && (
                      <div className="text-sm text-gray-600 mt-1">
                        {desiredTone.name}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-4">Process Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Processing Time:</span>
                    <span className="font-medium">{prediction.processingTime} minutes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Developer Strength:</span>
                    <span className="font-medium">{prediction.developerStrength} Volume</span>
                  </div>
                </div>
              </div>

              {prediction.toneAdjustments?.length > 0 && (
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-4">Recommendations</h3>
                  <ul className="space-y-2">
                    {prediction.toneAdjustments.map((adjustment, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-pink-500 mr-2">•</span>
                        <span className="text-gray-700">{adjustment}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-500 text-center py-12 px-6">
              Select hair details and click Calculate Result to see prediction
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
