'use client';

import { useState } from 'react';
import { calculateTransformationPaths } from '@/utils/hairTransformation';
import type { TransformationPath, HairCondition } from '@/types/hairTransformation';

export function ReverseFormula() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [targetLevel, setTargetLevel] = useState(1);
  const [currentTone, setCurrentTone] = useState('.0');
  const [targetTone, setTargetTone] = useState('.0');
  const [hairCondition, setHairCondition] = useState<HairCondition>({
    porosity: 'medium',
    previousTreatments: [],
    health: 'healthy',
    underlyingPigment: 'neutral'
  });
  const [paths, setPaths] = useState<TransformationPath[]>([]);

  const calculatePaths = () => {
    const request = {
      startingColor: { level: currentLevel, tone: currentTone },
      targetColor: { level: targetLevel, tone: targetTone },
      hairCondition,
      maxSessions: 3,
      developerVolumes: [10, 20, 30, 40]
    };

    const calculatedPaths = calculateTransformationPaths(request);
    setPaths(calculatedPaths);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Current Hair Details</h2>
          
          {/* Level Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Level
            </label>
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

          {/* Current Tone */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Tone
            </label>
            <select 
              value={currentTone}
              onChange={(e) => setCurrentTone(e.target.value)}
              className="w-full border rounded-md p-2"
            >
              <option value=".0">Natural</option>
              <option value=".1">Ash</option>
              <option value=".2">Green</option>
              <option value=".3">Gold</option>
              <option value=".4">Copper</option>
              <option value=".5">Mahogany</option>
              <option value=".6">Red</option>
              <option value=".7">Matt</option>
            </select>
          </div>

          {/* Target Level */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Level
            </label>
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

          {/* Target Tone */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Tone
            </label>
            <select 
              value={targetTone}
              onChange={(e) => setTargetTone(e.target.value)}
              className="w-full border rounded-md p-2"
            >
              <option value=".0">Natural</option>
              <option value=".1">Ash</option>
              <option value=".2">Green</option>
              <option value=".3">Gold</option>
              <option value=".4">Copper</option>
              <option value=".5">Mahogany</option>
              <option value=".6">Red</option>
              <option value=".7">Matt</option>
            </select>
          </div>

          {/* Hair Condition */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hair Porosity
            </label>
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

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hair Health
            </label>
            <select 
              value={hairCondition.health}
              onChange={(e) => setHairCondition({...hairCondition, health: e.target.value as 'damaged' | 'healthy'})}
              className="w-full border rounded-md p-2"
            >
              <option value="healthy">Healthy</option>
              <option value="damaged">Damaged</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Previous Treatments
            </label>
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
                    className="form-checkbox"
                  />
                  <span className="ml-2 capitalize">{treatment}</span>
                </label>
              ))}
            </div>
          </div>

          <button 
            className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition-colors"
            onClick={calculatePaths}
          >
            Calculate Paths
          </button>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Formula Paths</h2>
          <div className="space-y-6">
            {paths.map((path, index) => (
              <div key={path.approach.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-lg">{path.approach.name}</h3>
                  <span className="text-sm text-gray-500">
                    {path.totalSessions} session{path.totalSessions > 1 ? 's' : ''} • {path.totalProcessingTime} minutes
                  </span>
                </div>
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-sm">
                    {path.explanation}
                  </pre>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Success Rate:</span>
                    <div className="font-medium">{Math.round(path.approach.successProbability * 100)}%</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Difficulty:</span>
                    <div className="font-medium capitalize">{path.approach.difficultyLevel}</div>
                  </div>
                </div>
              </div>
            ))}
            {paths.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                Click Calculate Paths to see available options
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
