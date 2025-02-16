'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface TimelineStage {
  level: number;
  undertone: string;
  timeRequired: number;
  warnings: string[];
  recommendations: string[];
  processingPhases: {
    application: number;
    processing: number;
    toning?: number;
  };
}

interface LiftingProcess {
  stages: TimelineStage[];
  totalTime: number;
  warnings: string[];
}

export const LiftingProcess = () => {
  const [startingLevel, setStartingLevel] = useState(4);
  const [targetLevel, setTargetLevel] = useState(7);
  const [hairPorosity, setHairPorosity] = useState(5);
  const [hairTexture, setHairTexture] = useState('Normal');
  const [scalpCondition, setScalpCondition] = useState('Healthy');
  const [previousTreatments, setPreviousTreatments] = useState({
    colorTreated: false,
    bleached: false,
    resistant: false
  });
  const [liftingProcess, setLiftingProcess] = useState<LiftingProcess | null>(null);

  const calculateLiftingProcess = () => {
    const levelDifference = targetLevel - startingLevel;
    if (levelDifference <= 0) {
      return; // Cannot lift to a darker level
    }

    const stages: TimelineStage[] = [];
    let currentLevel = startingLevel;

    // Add a stage for each level increase
    while (currentLevel < targetLevel) {
      const nextLevel = currentLevel + 1; // Always go up by 1 level
      const isLastStage = nextLevel === targetLevel;

      const stage: TimelineStage = {
        level: nextLevel,
        undertone: "Gold",
        timeRequired: 30,
        warnings: [],
        recommendations: [
          'Use 40 volume developer',
          '3-4 levels lift - 40 volume recommended'
        ],
        processingPhases: {
          application: 15,
          processing: 30,
          toning: isLastStage ? 20 : undefined
        }
      };

      stages.push(stage);
      currentLevel = nextLevel;
    }

    // Calculate total time - each stage has 45 min (15 application + 30 processing)
    // Last stage has additional 20 min for toning
    const totalTime = (stages.length * 45) + (stages.length > 0 ? 20 : 0);

    setLiftingProcess({
      stages,
      totalTime,
      warnings: ['Previous chemical treatments may affect lifting results']
    });
  };

  return (
    <div className="container mx-auto px-6">
      <div className="flex gap-8">
        {/* Lifting Process Details */}
        <div className="w-[55%] bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-8">Lifting Process Details</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Starting Level</label>
              <select
                value={startingLevel}
                onChange={(e) => setStartingLevel(Number(e.target.value))}
                className="w-full p-3 border rounded-md"
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((level) => (
                  <option key={level} value={level}>
                    Level {level}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Level</label>
              <select
                value={targetLevel}
                onChange={(e) => setTargetLevel(Number(e.target.value))}
                className="w-full p-3 border rounded-md"
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((level) => (
                  <option key={level} value={level}>
                    Level {level}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hair Porosity</label>
              <input
                type="range"
                min="1"
                max="10"
                value={hairPorosity}
                onChange={(e) => setHairPorosity(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Previous Chemical Treatments</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={previousTreatments.colorTreated}
                    onChange={(e) => setPreviousTreatments(prev => ({ ...prev, colorTreated: e.target.checked }))}
                    className="rounded border-gray-300 text-pink-600 focus:ring-pink-500 h-4 w-4"
                  />
                  <span className="ml-2 text-sm text-gray-700">Color Treated</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={previousTreatments.bleached}
                    onChange={(e) => setPreviousTreatments(prev => ({ ...prev, bleached: e.target.checked }))}
                    className="rounded border-gray-300 text-pink-600 focus:ring-pink-500 h-4 w-4"
                  />
                  <span className="ml-2 text-sm text-gray-700">Bleached</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={previousTreatments.resistant}
                    onChange={(e) => setPreviousTreatments(prev => ({ ...prev, resistant: e.target.checked }))}
                    className="rounded border-gray-300 text-pink-600 focus:ring-pink-500 h-4 w-4"
                  />
                  <span className="ml-2 text-sm text-gray-700">Resistant Hair</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hair Texture</label>
              <select
                value={hairTexture}
                onChange={(e) => setHairTexture(e.target.value)}
                className="w-full p-3 border rounded-md"
              >
                <option value="Fine">Fine</option>
                <option value="Normal">Normal</option>
                <option value="Coarse">Coarse</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Scalp Condition</label>
              <select
                value={scalpCondition}
                onChange={(e) => setScalpCondition(e.target.value)}
                className="w-full p-3 border rounded-md"
              >
                <option value="Healthy">Healthy</option>
                <option value="Sensitive">Sensitive</option>
                <option value="Irritated">Irritated</option>
              </select>
            </div>

            <button
              onClick={calculateLiftingProcess}
              className="w-full bg-pink-600 text-white py-3 px-4 rounded-lg hover:bg-pink-700 transition-colors font-medium"
            >
              Calculate Process
            </button>
          </div>
        </div>

        {/* Process Timeline */}
        <div className="w-[45%] bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-8">Process Timeline</h2>
          {liftingProcess ? (
            <div className="space-y-6">
              {liftingProcess.stages.map((stage, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-4">Stage {index + 1}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Target Level:</span>
                      <span className="font-medium">{stage.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Processing Time:</span>
                      <span className="font-medium">{stage.timeRequired} minutes</span>
                    </div>
                    {stage.warnings.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-red-600 mb-2">Warnings</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {stage.warnings.map((warning, i) => (
                            <li key={i} className="text-sm text-red-600">{warning}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-4">Total Process</h3>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Time:</span>
                  <span className="font-medium">{liftingProcess.totalTime} minutes</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-gray-500 text-center py-12">
              Fill in the details and calculate to see the lifting process timeline
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
