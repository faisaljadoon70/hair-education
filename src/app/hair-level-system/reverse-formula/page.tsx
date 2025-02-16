'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import type { HairLevel, HairShade, TimelineStage } from '@/types/formula';

export default function ReverseFormula() {
  const [currentLevel, setCurrentLevel] = useState<number>(2);
  const [targetLevel, setTargetLevel] = useState<number>(3);
  const [currentLevelShades, setCurrentLevelShades] = useState<HairShade[]>([]);
  const [targetLevelShades, setTargetLevelShades] = useState<HairShade[]>([]);
  const [currentTone, setCurrentTone] = useState<string>('');
  const [targetTone, setTargetTone] = useState<string>('');
  const [hairCondition, setHairCondition] = useState({
    porosity: 'low',
    health: 'healthy',
    previousTreatments: [] as string[]
  });
  const [paths, setPaths] = useState<TimelineStage[]>([]);

  useEffect(() => {
    const currentShades = getShadesByLevel(currentLevel);
    const targetShades = getShadesByLevel(targetLevel);
    
    setCurrentLevelShades(currentShades);
    setTargetLevelShades(targetShades);
    
    if (currentShades.length > 0) {
      setCurrentTone(currentShades[0].id);
    }
    if (targetShades.length > 0) {
      setTargetTone(targetShades[0].id);
    }
  }, [currentLevel, targetLevel]);

  const getShadesByLevel = (level: number): HairShade[] => {
    // Implementation from original component
    return [];
  };

  const calculatePath = () => {
    if (!currentLevel || !currentTone || !targetLevel || !targetTone) {
      console.log('Missing required inputs');
      return;
    }

    // Calculate path implementation
    const stages: TimelineStage[] = [];
    setPaths(stages);
  };

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
            <Link href="/level-wheel" className="text-white/90 hover:text-white py-1 transition-all duration-200 text-base font-medium hover:-translate-y-0.5">
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
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-4">
            <Link href="/hair-level-system/level-wheel" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">Level Wheel</Link>
            <Link href="/hair-level-system/color-mixing" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">Color Mixing</Link>
            <Link href="/hair-level-system/formula-builder" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">Formula Builder</Link>
            <Link href="/hair-level-system/reverse-formula" className="px-4 py-2 bg-pink-500 text-white rounded-md">Reverse Formula</Link>
            <Link href="/hair-level-system/color-prediction" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">Color Prediction</Link>
            <Link href="/hair-level-system/lifting-process" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">Lifting Process</Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Current Hair Details */}
          <div>
            <h3 className="text-lg font-medium mb-4">Current Hair</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Level</label>
              <select 
                value={currentLevel}
                onChange={(e) => setCurrentLevel(Number(e.target.value))}
                className="w-full border rounded-md p-2"
              >
                {[1,2,3,4,5,6,7,8,9,10].map(level => (
                  <option key={level} value={level}>Level {level}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {currentLevelShades.map(shade => (
                <div key={shade.id} className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setCurrentTone(shade.id)}
                    className={`
                      relative cursor-pointer rounded-lg mb-2 w-16 h-16
                      ${currentTone === shade.id ? 'ring-2 ring-pink-500' : ''}
                    `}
                    style={{
                      backgroundColor: shade.hexColor,
                      border: '1px solid #e5e7eb'
                    }}
                  >
                    <div className="text-sm font-medium text-center">
                      {shade.name}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Target Hair Details */}
          <div>
            <h3 className="text-lg font-medium mb-4">Target Hair</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Level</label>
              <select 
                value={targetLevel}
                onChange={(e) => setTargetLevel(Number(e.target.value))}
                className="w-full border rounded-md p-2"
              >
                {[1,2,3,4,5,6,7,8,9,10].map(level => (
                  <option key={level} value={level}>Level {level}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {targetLevelShades.map(shade => (
                <div key={shade.id} className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setTargetTone(shade.id)}
                    className={`
                      relative cursor-pointer rounded-lg p-4
                      ${targetTone === shade.id ? 'ring-2 ring-pink-500' : ''}
                    `}
                    style={{
                      backgroundColor: shade.hexColor,
                      border: '1px solid #e5e7eb'
                    }}
                  >
                    <div className="text-sm font-medium text-center">
                      {shade.name}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hair Condition */}
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Hair Condition</h3>
          <div className="grid grid-cols-3 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700">Porosity</label>
              <select 
                value={hairCondition.porosity}
                onChange={(e) => setHairCondition({...hairCondition, porosity: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Health</label>
              <select 
                value={hairCondition.health}
                onChange={(e) => setHairCondition({...hairCondition, health: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value="healthy">Healthy</option>
                <option value="damaged">Damaged</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Previous Treatments</label>
              <div className="mt-2 space-y-2">
                {['Bleached', 'Color Treated', 'Chemically Straightened'].map(treatment => (
                  <label key={treatment} className="flex items-center">
                    <input 
                      type="checkbox"
                      checked={hairCondition.previousTreatments.includes(treatment)}
                      onChange={(e) => {
                        const treatments = e.target.checked
                          ? [...hairCondition.previousTreatments, treatment]
                          : hairCondition.previousTreatments.filter(t => t !== treatment);
                        setHairCondition({...hairCondition, previousTreatments: treatments});
                      }}
                      className="form-checkbox"
                    />
                    <span className="ml-2">{treatment}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={calculatePath}
            disabled={!currentLevel || !currentTone || !targetLevel || !targetTone}
            className="px-6 py-3 bg-pink-500 text-white rounded-md hover:bg-pink-600 disabled:opacity-50"
          >
            Calculate Path
          </button>
        </div>

        {/* Results Display */}
        {paths.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Transformation Path</h3>
            <div className="space-y-4">
              {paths.map((stage, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium">Stage {index + 1}</h4>
                  <div className="mt-2 space-y-2">
                    <p>Level: {stage.level}</p>
                    <p>Processing Time: {stage.timeRequired} minutes</p>
                    {stage.warnings.length > 0 && (
                      <div>
                        <h5 className="font-medium">Warnings:</h5>
                        <ul className="list-disc pl-5">
                          {stage.warnings.map((warning, i) => (
                            <li key={i}>{warning}</li>
                          ))}
                        </ul>
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
  );
}
