'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SHADE_CARD_SERIES } from '@/data/shadeCardData';
import type { HairShade } from '@/types/shadeCard';

interface HairCondition {
  porosity: 'low' | 'medium' | 'high';
  health: 'healthy' | 'damaged';
  previousTreatments: ('virgin' | 'bleached' | 'colored' | 'permed')[];
}

interface FormulaPath {
  title: string;
  level: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  successRate: number;
  description: string;
  steps: {
    title: string;
    formula?: string;
    processingTime?: string;
    detailedSteps: string[];
    caution?: string;
    proTip?: string;
  }[];
}

export const ReverseFormula = () => {
  // Level and Tone State
  const [currentLevel, setCurrentLevel] = useState(1);
  const [targetLevel, setTargetLevel] = useState(1);
  const [currentTone, setCurrentTone] = useState<string | null>(null);
  const [targetTone, setTargetTone] = useState<string | null>(null);
  
  // Hair Condition State
  const [hairCondition, setHairCondition] = useState<HairCondition>({
    porosity: 'low',
    health: 'healthy',
    previousTreatments: []
  });

  // Formula Results State
  const [calculatedPath, setCalculatedPath] = useState<FormulaPath | null>(null);
  const [showResults, setShowResults] = useState(false);

  // Get shades by level from shade card
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

  const calculateFormula = () => {
    const path: FormulaPath = {
      title: 'Direct Lift and Tone',
      level: '1 session • 45 minutes per session',
      difficulty: 'Beginner',
      successRate: 90,
      description: 'Single process deposit and tone using appropriate developer volume.',
      steps: [
        {
          title: 'Preparation',
          formula: 'Mix equal parts of 1:10 with 10 volume developer',
          processingTime: '45 minutes total',
          detailedSteps: [
            'Section the hair into 4 quadrants',
            'Perform a strand test on a small section',
            'Protect client\'s skin with barrier cream',
            'Wear protective gloves throughout the process'
          ],
          caution: 'Ensure proper sectioning and even application',
          proTip: 'Use clips to maintain clean sections'
        },
        {
          title: 'Processing and Monitoring',
          formula: 'Continue checking color development',
          processingTime: 'Check every 5-10 minutes',
          detailedSteps: [
            'Monitor the color development visually',
            'Perform a strand test at 30 minutes',
            'Check scalp comfort with client',
            'Look for even color development'
          ],
          caution: 'Do not exceed maximum processing time',
          proTip: 'Keep detailed timing notes for future reference'
        }
      ]
    };

    setCalculatedPath(path);
    setShowResults(true);
  };

  const clearResults = () => {
    setCalculatedPath(null);
    setShowResults(false);
  };

  const currentShades = getShadesByLevel(currentLevel);
  const targetShades = getShadesByLevel(targetLevel);
  const levels = [1,2,3,4,5,6,7,8,9,10];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Input Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">Current Hair Details</h2>
          
          {/* Level Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
            <select 
              value={currentLevel}
              onChange={(e) => setCurrentLevel(Number(e.target.value))}
              className="w-full border rounded-md p-2"
            >
              {levels.map(level => (
                <option key={level} value={level}>Level {level}</option>
              ))}
            </select>
          </div>

          {/* Current Tone */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
            <div className="grid grid-cols-3 gap-3">
              {currentShades.map(shade => (
                <motion.div
                  key={shade.id}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setCurrentTone(shade.id)}
                  className={`
                    relative cursor-pointer rounded-lg p-6 shadow-sm
                    ${currentTone === shade.id ? 'ring-2 ring-pink-500 shadow-lg' : 'hover:shadow-md'}
                  `}
                  style={{
                    backgroundColor: shade.hexColor,
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  <div 
                    className={`text-sm font-medium text-center whitespace-nowrap overflow-hidden 
                    ${shade.level <= 5 ? 'text-white' : 'text-gray-800'}`}
                  >
                    {shade.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Target Hair Details */}
          <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">Target Hair Details</h2>

          {/* Target Level */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
            <select 
              value={targetLevel}
              onChange={(e) => setTargetLevel(Number(e.target.value))}
              className="w-full border rounded-md p-2"
            >
              {levels.map(level => (
                <option key={level} value={level}>Level {level}</option>
              ))}
            </select>
          </div>

          {/* Target Tone */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
            <div className="grid grid-cols-3 gap-3">
              {targetShades.map(shade => (
                <motion.div
                  key={shade.id}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setTargetTone(shade.id)}
                  className={`
                    relative cursor-pointer rounded-lg p-6 shadow-sm
                    ${targetTone === shade.id ? 'ring-2 ring-pink-500 shadow-lg' : 'hover:shadow-md'}
                  `}
                  style={{
                    backgroundColor: shade.hexColor,
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  <div 
                    className={`text-sm font-medium text-center whitespace-nowrap overflow-hidden 
                    ${shade.level <= 5 ? 'text-white' : 'text-gray-800'}`}
                  >
                    {shade.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Hair Condition Section */}
          <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">Hair Condition</h2>
          
          {/* Hair Porosity */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Porosity</label>
            <select 
              value={hairCondition.porosity}
              onChange={(e) => setHairCondition({...hairCondition, porosity: e.target.value as 'low' | 'medium' | 'high'})}
              className="w-full border rounded-md p-2"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Hair Health */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Health</label>
            <select 
              value={hairCondition.health}
              onChange={(e) => setHairCondition({...hairCondition, health: e.target.value as 'damaged' | 'healthy'})}
              className="w-full border rounded-md p-2"
            >
              <option value="healthy">Healthy</option>
              <option value="damaged">Damaged</option>
            </select>
          </div>

          {/* Previous Treatments */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Previous Treatments</label>
            <div className="space-y-2">
              {['virgin', 'bleached', 'colored', 'permed'].map(treatment => (
                <label key={treatment} className="flex items-center">
                  <input 
                    type="checkbox"
                    checked={hairCondition.previousTreatments.includes(treatment as any)}
                    onChange={(e) => {
                      const treatments = e.target.checked
                        ? [...hairCondition.previousTreatments, treatment]
                        : hairCondition.previousTreatments.filter(t => t !== treatment);
                      setHairCondition({...hairCondition, previousTreatments: treatments as any});
                    }}
                    className="form-checkbox h-4 w-4 text-pink-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 capitalize">{treatment}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Calculate Button */}
          <button 
            className="w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition-colors mt-4"
            onClick={calculateFormula}
          >
            Calculate Paths
          </button>
        </div>

        {/* Right Column - Formula Paths */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Formula Paths</h2>
            {showResults && (
              <button
                onClick={clearResults}
                className="text-sm text-gray-600 hover:text-gray-800 flex items-center"
              >
                <span>Clear Results</span>
              </button>
            )}
          </div>

          {!showResults && (
            <div className="text-center text-gray-600">
              Click Calculate Paths to see available options
            </div>
          )}

          {showResults && calculatedPath && (
            <div className="space-y-6">
              {/* Header Section */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{calculatedPath.title}</h3>
                  <p className="text-sm text-gray-600">{calculatedPath.level}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                    {calculatedPath.difficulty}
                  </span>
                  <span className="text-sm text-gray-600">{calculatedPath.successRate}% Success Rate</span>
                </div>
              </div>

              <p className="text-gray-700">{calculatedPath.description}</p>

              {/* Steps */}
              <div className="space-y-8">
                {calculatedPath.steps.map((step, index) => (
                  <div key={index} className="border-t pt-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm">
                        {index + 1}
                      </div>
                      <h4 className="text-lg font-semibold">{step.title}</h4>
                    </div>

                    {/* Formula and Processing Time */}
                    {(step.formula || step.processingTime) && (
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {step.formula && (
                          <div>
                            <p className="text-sm font-medium text-gray-700">Formula</p>
                            <p className="text-sm">{step.formula}</p>
                          </div>
                        )}
                        {step.processingTime && (
                          <div>
                            <p className="text-sm font-medium text-gray-700">Processing Time</p>
                            <p className="text-sm">{step.processingTime}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Detailed Steps */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Detailed Steps:</p>
                      <ol className="list-decimal list-inside space-y-1">
                        {step.detailedSteps.map((detailedStep, i) => (
                          <li key={i} className="text-sm text-gray-600">{detailedStep}</li>
                        ))}
                      </ol>
                    </div>

                    {/* Caution and Pro Tip */}
                    <div className="grid grid-cols-2 gap-4">
                      {step.caution && (
                        <div className="bg-yellow-50 p-3 rounded">
                          <p className="text-sm font-medium text-yellow-800">⚠ Caution</p>
                          <p className="text-sm text-yellow-700">{step.caution}</p>
                        </div>
                      )}
                      {step.proTip && (
                        <div className="bg-blue-50 p-3 rounded">
                          <p className="text-sm font-medium text-blue-800">💡 Pro Tip</p>
                          <p className="text-sm text-blue-700">{step.proTip}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
