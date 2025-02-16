'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { levelColors } from '../levelwheel/levelData';
import { SHADE_CARD_SERIES } from '@/data/shadeCardData';
import type { HairShade } from '@/types/shadeCard';
import type { LevelFormula } from './types';

export const FormulaBuilder = () => {
  // Formula Builder State
  const [startingLevel, setStartingLevel] = useState<number>(1);
  const [targetLevel, setTargetLevel] = useState<number>(1);
  const [currentPorosity, setCurrentPorosity] = useState<number>(5);
  const [selectedStartingTone, setSelectedStartingTone] = useState<HairShade | null>(null);
  const [selectedTargetTone, setSelectedTargetTone] = useState<HairShade | null>(null);
  const [savedFormulas, setSavedFormulas] = useState<LevelFormula[]>([]);
  const [currentFormula, setCurrentFormula] = useState<LevelFormula | null>(null);

  // Get shades by level from shade card
  const getShadesByLevel = (level: number): HairShade[] => {
    // Get only the natural series
    const naturalSeries = SHADE_CARD_SERIES.find(series => series.id === 'natural');
    if (!naturalSeries) return [];

    // Get shades from 0 to 13 for the selected level
    const shades = naturalSeries.shades.filter(shade => {
      const [shadeLevel, tonePart] = shade.id.split('.');
      const toneNumber = parseInt(tonePart);
      return parseInt(shadeLevel) === level && toneNumber >= 0 && toneNumber <= 13;
    });

    // Sort by tone number (0-13)
    return shades.sort((a, b) => {
      const aTone = parseInt(a.id.split('.')[1]);
      const bTone = parseInt(b.id.split('.')[1]);
      return aTone - bTone;
    });
  };

  const saveFormula = () => {
    if (!selectedStartingTone || !selectedTargetTone) return;

    const newFormula: LevelFormula = {
      id: Date.now().toString(),
      startingLevel,
      targetLevel,
      startingTone: selectedStartingTone,
      targetTone: selectedTargetTone,
      porosity: currentPorosity,
      createdAt: new Date().toISOString()
    };

    setSavedFormulas(prev => [...prev, newFormula]);
    setCurrentFormula(newFormula);
  };

  // Reset selected tones when level changes
  useEffect(() => {
    setSelectedStartingTone(null);
  }, [startingLevel]);

  useEffect(() => {
    setSelectedTargetTone(null);
  }, [targetLevel]);

  return (
    <div className="flex flex-1 gap-8 p-6">
      {/* Formula Builder Section */}
      <div className="w-3/5 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Formula Builder</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Starting Level</label>
            <select 
              value={startingLevel}
              onChange={(e) => setStartingLevel(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            >
              {Array.from({length: 10}, (_, i) => i + 1).map(level => (
                <option key={level} value={level}>Level {level}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Starting Tone</label>
            <div className="grid grid-cols-4 gap-3 p-4 bg-gray-50 rounded-lg">
              {getShadesByLevel(startingLevel).map(shade => (
                <motion.div
                  key={shade.id}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedStartingTone(shade)}
                  className={`
                    relative cursor-pointer rounded-lg p-4 flex items-center justify-center
                    min-h-[100px] min-w-[120px] shadow-sm border border-gray-200/20
                    hover:shadow-md transition-all duration-200
                    ${selectedStartingTone?.id === shade.id ? 'ring-2 ring-pink-500 shadow-lg' : ''}
                  `}
                  style={{
                    backgroundColor: shade.hexColor,
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  <div 
                    className={`text-sm font-medium text-center leading-tight px-1
                    ${shade.level <= 5 ? 'text-white/90' : 'text-gray-800/90'}`}
                  >
                    {shade.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Target Level</label>
            <select 
              value={targetLevel}
              onChange={(e) => setTargetLevel(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            >
              {Array.from({length: 10}, (_, i) => i + 1).map(level => (
                <option key={level} value={level}>Level {level}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Target Tone</label>
            <div className="grid grid-cols-4 gap-3 p-4 bg-gray-50 rounded-lg">
              {getShadesByLevel(targetLevel).map(shade => (
                <motion.div
                  key={shade.id}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedTargetTone(shade)}
                  className={`
                    relative cursor-pointer rounded-lg p-4 flex items-center justify-center
                    min-h-[100px] min-w-[120px] shadow-sm border border-gray-200/20
                    hover:shadow-md transition-all duration-200
                    ${selectedTargetTone?.id === shade.id ? 'ring-2 ring-pink-500 shadow-lg' : ''}
                  `}
                  style={{
                    backgroundColor: shade.hexColor,
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  <div 
                    className={`text-sm font-medium text-center leading-tight px-1
                    ${shade.level <= 5 ? 'text-white/90' : 'text-gray-800/90'}`}
                  >
                    {shade.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Hair Porosity</label>
            <input 
              type="range"
              min="1"
              max="10"
              value={currentPorosity}
              onChange={(e) => setCurrentPorosity(Number(e.target.value))}
              className="mt-1 block w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>

          <button
            onClick={saveFormula}
            className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700"
          >
            Save Formula
          </button>
        </div>
      </div>

      {/* Saved Formulas */}
      <div className="w-2/5 bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Saved Formulas</h2>
          {savedFormulas.length > 0 && (
            <button
              onClick={() => {
                if (confirm('Are you sure you want to clear all saved formulas?')) {
                  setSavedFormulas([]);
                  setCurrentFormula(null);
                }
              }}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Clear All
            </button>
          )}
        </div>
        {savedFormulas.length > 0 ? (
          <div className="space-y-4">
            {savedFormulas.map((formula) => (
              <div 
                key={formula.id}
                className="p-4 border rounded-lg hover:border-pink-500 relative group"
                onClick={() => setCurrentFormula(formula)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Level {formula.startingLevel} → Level {formula.targetLevel}</h4>
                    <p className="text-sm text-gray-600">
                      {formula.startingTone.name} to {formula.targetTone.name}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Porosity: {formula.porosity}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSavedFormulas(prev => prev.filter(f => f.id !== formula.id));
                      if (currentFormula?.id === formula.id) {
                        setCurrentFormula(null);
                      }
                    }}
                    className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No saved formulas yet</p>
        )}
      </div>
    </div>
  );
};
