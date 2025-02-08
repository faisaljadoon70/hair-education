'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { levelColors } from '../levelwheel/levelData';
import type { HairLevel, LevelFormula, PracticeResult } from './types';
import { Tab } from '@headlessui/react';
import { useEducationalContent } from '@/hooks/useEducationalContent';
import LevelEducation from './LevelEducation';
import { ToneSelector } from './ToneSelector';
import { HairTone, calculateFinalColor } from '../../types/colorSystem';
import { FloatingNotification } from './FloatingNotification';
import LiftingProcessTimeline from './LiftingProcessTimeline';
import { calculateColorResult, calculateDeveloperVolume, HairHistory, HairProperties, ColorPrediction } from '../../utils/colorCalculations';

interface ColorNode {
  id: string;
  type: 'level' | 'pigment' | 'formula';
  properties: HairLevel | LevelFormula;
  edges: { [key: string]: ColorNode };
  x: number;
  y: number;
}

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

interface HairCondition {
  texture: string;
  scalpCondition: string;
  chemicallyTreated: boolean;
  bleached: boolean;
  resistant: boolean;
  porosity: number;
}

const radius = 180;
const springConfig = { type: "spring", stiffness: 300, damping: 30 };

export const AdvancedLevelWheel = () => {
  const [colorGraph, setColorGraph] = useState<{ [key: string]: ColorNode }>({});
  const [selectedNode, setSelectedNode] = useState<ColorNode | null>(null);
  const [rotation, setRotation] = useState(0);
  const [activeTab, setActiveTab] = useState<'levelWheel' | 'formulaBuilder' | 'colorPrediction' | 'liftingProcess'>('levelWheel');

  // Formula Builder State
  const [currentFormula, setCurrentFormula] = useState<LevelFormula | null>(null);
  const [savedFormulas, setSavedFormulas] = useState<LevelFormula[]>([]);
  
  // Color Prediction State
  const [startingLevel, setStartingLevel] = useState<number>(1);
  const [targetLevel, setTargetLevel] = useState<number>(1);
  const [currentPorosity, setCurrentPorosity] = useState<number>(5);
  const [prediction, setPrediction] = useState<{
    finalColor: any;
    processingTime: number;
    developerStrength: number;
    toneAdjustments: string[];
  } | null>(null);

  // Tone State
  const [selectedStartingTone, setSelectedStartingTone] = useState<HairTone | null>(null);
  const [selectedTargetTone, setSelectedTargetTone] = useState<HairTone | null>(null);
  const [currentTone, setCurrentTone] = useState<HairTone | null>(null);
  const [desiredTone, setDesiredTone] = useState<HairTone | null>(null);

  // Lifting Process State
  const [liftingProcess, setLiftingProcess] = useState<LiftingProcess | null>(null);
  const [hairCondition, setHairCondition] = useState<HairCondition>({
    texture: 'Normal',
    scalpCondition: 'Healthy',
    chemicallyTreated: false,
    bleached: false,
    resistant: false,
    porosity: 5
  });
  const [colorPrediction, setColorPrediction] = useState<ColorPrediction | null>(null);

  // Technical Calculations
  const calculateProcessingTime = () => {
    if (!startingLevel || !targetLevel) return 0;
    const levelDifference = Math.abs(targetLevel - startingLevel);
    const porosityFactor = 1 + (currentPorosity / 10);
    return Math.round(30 * levelDifference * porosityFactor);
  };

  const calculateDeveloperStrength = () => {
    if (!startingLevel || !targetLevel) return 0;
    const levelDifference = Math.abs(targetLevel - startingLevel);
    if (levelDifference <= 2) return 20;
    if (levelDifference <= 4) return 30;
    return 40;
  };

  const calculateLiftingProcess = () => {
    // Create hair history object
    const hairHistory: HairHistory = {
      previousTreatments: {
        bleached: hairCondition.bleached,
        colored: hairCondition.chemicallyTreated,
        chemicallyTreated: hairCondition.chemicallyTreated,
      },
      naturalLevel: startingLevel, // Assuming starting level is natural
      currentLevel: startingLevel,
      targetLevel: targetLevel
    };

    // Create hair properties object
    const hairProperties: HairProperties = {
      porosity: hairCondition.porosity,
      texture: hairCondition.texture as 'Fine' | 'Medium' | 'Coarse',
      resistant: hairCondition.resistant,
      scalpCondition: hairCondition.scalpCondition as 'Healthy' | 'Sensitive' | 'Irritated'
    };

    // Get color prediction
    const prediction = calculateColorResult(hairHistory, hairProperties);
    setColorPrediction(prediction);

    // Calculate stages based on prediction
    const stages: TimelineStage[] = [];
    const warnings: string[] = [...prediction.developerRecommendation.warnings];
    let totalTime = 0;

    // If multiple processes required, only show first session
    const maxLevelsPerSession = 4;
    const levelsThisSession = Math.min(
      Math.abs(targetLevel - startingLevel),
      maxLevelsPerSession
    );

    const direction = targetLevel > startingLevel ? 1 : -1;
    let currentLevel = startingLevel;
    const targetForSession = startingLevel + (direction * levelsThisSession);

    while (currentLevel !== targetForSession) {
      const nextLevel = currentLevel + direction;
      const stageTime = prediction.developerRecommendation.processingTime;
      
      const stage: TimelineStage = {
        level: nextLevel,
        undertone: prediction.expectedResult.undertone,
        timeRequired: stageTime,
        warnings: [],
        recommendations: [
          `Use ${prediction.developerRecommendation.volume} volume developer`,
          ...prediction.developerRecommendation.reasoning
        ],
        processingPhases: {
          application: 15,
          processing: stageTime,
          toning: prediction.toner.recommended ? 20 : undefined
        }
      };

      if (prediction.toner.recommended) {
        stage.recommendations.push(prediction.toner.reason || 'Toning recommended');
      }

      totalTime += stageTime + 15; // Add application time
      if (stage.processingPhases.toning) {
        totalTime += stage.processingPhases.toning;
      }

      stages.push(stage);
      currentLevel = nextLevel;
    }

    // Add multiple process warning if needed
    if (prediction.multipleProcesses.required) {
      warnings.push(
        `This transformation requires ${prediction.multipleProcesses.numberOfSessions} sessions ` +
        `with ${prediction.multipleProcesses.timeBetweenSessions} days between sessions`
      );
    }

    setLiftingProcess({
      stages,
      totalTime,
      warnings
    });
  };

  const getUndertone = (level: number): string => {
    if (level <= 2) return "Blue/Black";
    if (level <= 4) return "Deep Red/Orange";
    if (level <= 6) return "Red/Copper";
    if (level <= 8) return "Orange/Gold";
    return "Yellow";
  };

  const calculateStageTime = (from: number, to: number, porosity: number): number => {
    const baseTime = 30; // Base time in minutes
    const porosityFactor = porosity / 5; // Higher porosity = faster processing
    const levelDifference = Math.abs(to - from);
    
    let time = baseTime * levelDifference / porosityFactor;
    
    if (hairCondition.resistant) {
      time *= 1.5; // 50% more time for resistant hair
    }
    
    return Math.round(time);
  };

  const getLevelColor = (level: number): string => {
    const colors = {
      1: '#090909', // True Black
      2: '#1a1110', // Soft Black
      3: '#2a1d1b', // Darkest Brown
      4: '#3b2820', // Dark Brown
      5: '#584039', // Medium Brown
      6: '#8b6b5d', // Light Brown
      7: '#b69b8f', // Dark Blonde
      8: '#d4b9a9', // Medium Blonde
      9: '#e8d5c7', // Light Blonde
      10: '#f5e6db' // Lightest Blonde
    };
    return colors[level as keyof typeof colors] || '#000000';
  };

  const getUndertoneColor = (undertone: string): string => {
    const colors = {
      'Blue/Black': '#1a1a2e', // Deep Blue-Black
      'Deep Red/Orange': '#8b3a3a', // Deep Auburn
      'Red/Copper': '#a45a3c', // Rich Copper
      'Orange/Gold': '#c68e3c', // Warm Gold
      'Yellow': '#d4af37' // Rich Yellow
    };
    return colors[undertone as keyof typeof colors] || '#000000';
  };

  const [showNotification, setShowNotification] = useState(false);
  const [showPredictionNotification, setShowPredictionNotification] = useState(false);

  const calculatePrediction = () => {
    const newPrediction = {
      processingTime: calculateProcessingTime(),
      developerStrength: calculateDeveloperStrength(),
      finalColor: { level: targetLevel, name: `Level ${targetLevel}` },
      toneAdjustments: []
    };
    setPrediction(newPrediction);
    setShowPredictionNotification(true);
  };

  const saveFormula = () => {
    const formula = {
      id: Date.now().toString(),
      startingLevel,
      targetLevel,
      porosity: currentPorosity,
      developer: calculateDeveloperStrength(),
      processingTime: calculateProcessingTime(),
      createdAt: new Date().toISOString()
    };
    
    setSavedFormulas([...savedFormulas, formula]);
    setShowNotification(true);
  };

  const [levels, setLevels] = useState<HairLevel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const levelId = selectedNode ? (selectedNode.properties as HairLevel).level : null;
  console.log('Selected Node:', selectedNode);
  console.log('Level ID:', levelId);
  const { theory, chemicalProcess, terminology, quiz } = useEducationalContent(levelId || 0);

  useEffect(() => {
    console.log('Educational Content:', { theory, chemicalProcess, terminology, quiz });
  }, [theory, chemicalProcess, terminology, quiz]);

  useEffect(() => {
    fetchColorSystem();
  }, []);

  const fetchColorSystem = async () => {
    try {
      const { data: levels, error: levelsError } = await supabase
        .from('hair_levels')
        .select('*')
        .order('level');

      if (levelsError) throw levelsError;

      // Build the graph structure with almost-circular layout (330 degrees)
      const graph: { [key: string]: ColorNode } = {};
      levels?.forEach((level: HairLevel, index: number) => {
        const totalLevels = levels.length;
        // Calculate angle for each level, spanning 330 degrees (leaving a 30-degree gap)
        const startAngle = Math.PI / 6; // 30 degrees
        const totalAngle = (Math.PI * 11) / 6; // 330 degrees
        const angle = startAngle + (index / (totalLevels - 1)) * totalAngle;
        
        // Calculate position using the angle
        const x = 220 + Math.cos(angle) * radius;
        const y = 220 + Math.sin(angle) * radius;

        graph[`level_${level.level}`] = {
          id: `level_${level.level}`,
          type: 'level',
          properties: level,
          edges: {},
          x,
          y
        };
      });

      // Add relationships between adjacent levels only
      levels?.forEach((level: HairLevel) => {
        const node = graph[`level_${level.level}`];
        if (level.level > 1) {
          node.edges['darker'] = graph[`level_${level.level - 1}`];
        }
        if (level.level < 10) {
          node.edges['lighter'] = graph[`level_${level.level + 1}`];
        }
      });

      setColorGraph(graph);
    } catch (err) {
      console.error('Error fetching color system:', err);
    }
  };

  const rotateWheel = (direction: 'left' | 'right') => {
    const newRotation = rotation + (direction === 'left' ? -45 : 45);
    setRotation(newRotation);
  };

  const calculateStageRecommendations = (stage: TimelineStage) => {
    const recommendations: string[] = [];
    
    if (stage.level <= 4) {
      recommendations.push('Use low-volume developer to maintain hair integrity');
    }
    
    if (hairCondition.porosity > 7) {
      recommendations.push('Apply protein treatment before processing');
    }
    
    if (stage.undertone === 'Deep Red/Orange') {
      recommendations.push('Consider blue-based toner to neutralize warmth');
    }
    
    return recommendations;
  };

  const calculateProcessingPhases = (stage: TimelineStage) => {
    const baseApplication = 15;
    const processingTime = stage.timeRequired;
    let toningTime = 0;
    
    if (['Orange/Gold', 'Yellow'].includes(stage.undertone)) {
      toningTime = 20;
    }
    
    return {
      application: baseApplication,
      processing: processingTime,
      toning: toningTime || undefined
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <FloatingNotification
        message="Formula saved successfully!"
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
      />
      <FloatingNotification
        message="Color prediction calculated!"
        isVisible={showPredictionNotification}
        onClose={() => setShowPredictionNotification(false)}
      />
      {/* Navigation Tabs */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('levelWheel')}
          className={`px-4 py-2 rounded ${
            activeTab === 'levelWheel' ? 'bg-pink-500 text-white' : 'bg-gray-200'
          }`}
        >
          Level Wheel
        </button>
        <button
          onClick={() => setActiveTab('formulaBuilder')}
          className={`px-4 py-2 rounded ${
            activeTab === 'formulaBuilder' ? 'bg-pink-500 text-white' : 'bg-gray-200'
          }`}
        >
          Formula Builder
        </button>
        <button
          onClick={() => setActiveTab('colorPrediction')}
          className={`px-4 py-2 rounded ${
            activeTab === 'colorPrediction' ? 'bg-pink-500 text-white' : 'bg-gray-200'
          }`}
        >
          Color Prediction
        </button>
        <button
          onClick={() => setActiveTab('liftingProcess')}
          className={`px-4 py-2 rounded ${
            activeTab === 'liftingProcess' ? 'bg-pink-500 text-white' : 'bg-gray-200'
          }`}
        >
          Lifting Process
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex">
        {/* Quick Navigation */}
        <div className="w-48 p-4 space-y-4">
          <h3 className="text-lg font-semibold mb-4">Quick Navigation</h3>
          {Object.entries(colorGraph).map(([key, node]) => (
            <motion.div
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedNode(node)}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <div
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: getLevelColor((node.properties as HairLevel).level) }}
              />
              <span className="text-sm">
                Level {(node.properties as HairLevel).level}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === 'levelWheel' && (
            <>
              <div className="relative">
                <motion.div
                  className="w-full"
                  animate={{ rotate: rotation }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <svg viewBox="0 0 440 440" className="w-full max-w-[600px] mx-auto">
                    {/* Background circle */}
                    <circle
                      cx="220"
                      cy="220"
                      r={radius + 40}
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="1"
                    />

                    {/* Center point */}
                    <circle cx="220" cy="220" r="5" fill="#E91E63" />

                    {/* Relationship lines with gradient */}
                    {Object.entries(colorGraph).map(([key, node]) => (
                      Object.entries(node.edges).map(([type, target]) => (
                        <motion.line
                          key={`${node.id}-${target.id}`}
                          x1={node.x}
                          y1={node.y}
                          x2={target.x}
                          y2={target.y}
                          stroke="url(#lineGradient)"
                          strokeWidth="2"
                          strokeDasharray="4"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1 }}
                        />
                      ))
                    ))}

                    {/* Level circles with animations */}
                    {Object.entries(colorGraph).map(([key, node]) => {
                      const level = (node.properties as HairLevel).level;
                      return (
                        <motion.g
                          key={key}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", delay: level * 0.1 }}
                        >
                          <motion.circle
                            cx={node.x}
                            cy={node.y}
                            r="30"
                            fill={getLevelColor(level)}
                            stroke={selectedNode?.id === node.id ? '#E91E63' : '#666'}
                            strokeWidth="2"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setSelectedNode(node)}
                            className="cursor-pointer"
                          />
                          <text
                            x={node.x}
                            y={node.y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="white"
                            className="text-sm font-bold pointer-events-none"
                          >
                            {level}
                          </text>
                        </motion.g>
                      );
                    })}

                    {/* Gradient definition for lines */}
                    <defs>
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#666" stopOpacity="0.2" />
                        <stop offset="50%" stopColor="#666" stopOpacity="1" />
                        <stop offset="100%" stopColor="#666" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>

                {/* Rotation controls */}
                <div className="flex justify-center space-x-4 mt-4">
                  <button
                    onClick={() => rotateWheel('left')}
                    className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
                  >
                    Rotate Left
                  </button>
                  <button
                    onClick={() => rotateWheel('right')}
                    className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
                  >
                    Rotate Right
                  </button>
                </div>
              </div>

              {/* Education content - Only show when wheel tab is active */}
              {selectedNode && (
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">
                      Level {(selectedNode.properties as HairLevel).level}
                    </h2>
                    <button
                      onClick={() => setSelectedNode(null)}
                      className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
                    >
                      Education
                    </button>
                  </div>
                  <LevelEducation
                    levelId={(selectedNode.properties as HairLevel).level}
                    theory={theory}
                    chemicalProcess={chemicalProcess}
                    terminology={terminology}
                    quiz={quiz}
                  />
                </div>
              )}
            </>
          )}

          {activeTab === 'formulaBuilder' && (
            <div className="grid grid-cols-2 gap-8">
              {/* Formula Builder */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-6">Formula Builder</h3>
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
                    <ToneSelector
                      selectedTone={selectedStartingTone}
                      onToneSelect={setSelectedStartingTone}
                      level={startingLevel}
                    />
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
                    <ToneSelector
                      selectedTone={selectedTargetTone}
                      onToneSelect={setSelectedTargetTone}
                      level={targetLevel}
                    />
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
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Saved Formulas</h3>
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
                <div className="space-y-4">
                  {savedFormulas.map((formula) => (
                    <div 
                      key={formula.id}
                      className="p-4 border rounded-lg hover:border-pink-500 relative group"
                    >
                      <div 
                        className="cursor-pointer"
                        onClick={() => setCurrentFormula(formula)}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Level {formula.startingLevel} → {formula.targetLevel}</span>
                          <span className="text-sm text-gray-500">
                            {new Date(formula.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          <div>Developer: {formula.developer}Vol</div>
                          <div>Processing Time: {formula.processingTime}min</div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm('Are you sure you want to delete this formula?')) {
                            setSavedFormulas(savedFormulas.filter(f => f.id !== formula.id));
                            if (currentFormula?.id === formula.id) {
                              setCurrentFormula(null);
                            }
                          }
                        }}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0111 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  {savedFormulas.length === 0 && (
                    <div className="text-center py-4 text-gray-500">
                      No saved formulas yet
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'colorPrediction' && (
            <div className="grid grid-cols-2 gap-8">
              {/* Prediction Controls */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-6">Color Prediction</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Current Level</label>
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
                    <label className="block text-sm font-medium text-gray-700">Current Tone</label>
                    <ToneSelector
                      selectedTone={currentTone}
                      onToneSelect={setCurrentTone}
                      level={startingLevel}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Desired Level</label>
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
                    <label className="block text-sm font-medium text-gray-700">Desired Tone</label>
                    <ToneSelector
                      selectedTone={desiredTone}
                      onToneSelect={setDesiredTone}
                      level={targetLevel}
                    />
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
                    onClick={calculatePrediction}
                    className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700"
                  >
                    Calculate Result
                  </button>
                </div>
              </div>

              {/* Prediction Results */}
              {prediction && (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Prediction Results</h3>
                    <button
                      onClick={() => setPrediction(null)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Clear Result
                    </button>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Processing Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Processing Time:</span>
                          <span className="font-medium">{prediction.processingTime} minutes</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Developer Strength:</span>
                          <span className="font-medium">{prediction.developerStrength} Volume</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Color Result</h4>
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-10 h-10 rounded-full border"
                          style={{ 
                            backgroundColor: desiredTone 
                              ? calculateFinalColor(targetLevel, desiredTone)
                              : getLevelColor(targetLevel) 
                          }}
                        />
                        <div>
                          <div className="font-medium">Level {targetLevel}</div>
                          {desiredTone && (
                            <div className="text-sm text-gray-600">
                              {desiredTone.primary.name}
                              {desiredTone.secondary && ` + ${desiredTone.secondary.name}`}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {prediction.toneAdjustments?.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Recommendations</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          {prediction.toneAdjustments.map((adjustment, index) => (
                            <li key={index}>{adjustment}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'liftingProcess' && (
            <div className="grid grid-cols-2 gap-8">
              {/* Left Panel - Controls */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-6">Lifting Process Details</h3>
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
                    <label className="block text-sm font-medium text-gray-700">Hair Porosity</label>
                    <input 
                      type="range"
                      min="1"
                      max="10"
                      value={hairCondition.porosity}
                      onChange={(e) => setHairCondition(prev => ({ ...prev, porosity: Number(e.target.value) }))}
                      className="mt-1 block w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Low</span>
                      <span>Medium</span>
                      <span>High</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Previous Chemical Treatments</label>
                    <div className="flex space-x-6">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={hairCondition.chemicallyTreated}
                          onChange={(e) => setHairCondition(prev => ({
                            ...prev,
                            chemicallyTreated: e.target.checked
                          }))}
                          className="rounded border-gray-300 text-pink-600 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">Color Treated</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={hairCondition.bleached}
                          onChange={(e) => setHairCondition(prev => ({
                            ...prev,
                            bleached: e.target.checked
                          }))}
                          className="rounded border-gray-300 text-pink-600 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">Bleached</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={hairCondition.resistant}
                          onChange={(e) => setHairCondition(prev => ({
                            ...prev,
                            resistant: e.target.checked
                          }))}
                          className="rounded border-gray-300 text-pink-600 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">Resistant Hair</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hair Texture</label>
                    <select
                      value={hairCondition.texture}
                      onChange={(e) => setHairCondition(prev => ({ ...prev, texture: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                    >
                      <option>Fine</option>
                      <option>Normal</option>
                      <option>Coarse</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Scalp Condition</label>
                    <select
                      value={hairCondition.scalpCondition}
                      onChange={(e) => setHairCondition(prev => ({ ...prev, scalpCondition: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                    >
                      <option>Healthy</option>
                      <option>Sensitive</option>
                      <option>Irritated</option>
                    </select>
                  </div>

                  <button
                    onClick={calculateLiftingProcess}
                    className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700"
                  >
                    Calculate Lifting Process
                  </button>
                </div>
              </div>

              {/* Right Panel - Results */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Process Timeline</h3>
                  <button 
                    onClick={() => setLiftingProcess(null)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Clear Result
                  </button>
                </div>
                
                {!liftingProcess ? (
                  <p className="text-sm text-gray-600">
                    Select starting and target levels to see the detailed lifting process.
                  </p>
                ) : (
                  <LiftingProcessTimeline
                    stages={liftingProcess.stages}
                    totalTime={liftingProcess.totalTime}
                    startingLevel={startingLevel}
                    targetLevel={targetLevel}
                    hairCondition={hairCondition}
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Level Details Panel */}
        <AnimatePresence>
          {selectedNode && activeTab === 'levelWheel' && (
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              className="w-96 bg-white rounded-lg shadow-lg"
            >
              <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-t-lg bg-gray-50 p-2 border-b">
                  <Tab className={({ selected }) => `
                    w-full py-2 text-sm font-medium rounded-md
                    ${selected 
                      ? 'bg-pink-500 text-white'
                      : 'text-gray-600 hover:text-pink-500'
                    }
                  `}>
                    Color Info
                  </Tab>
                  <Tab className={({ selected }) => `
                    w-full py-2 text-sm font-medium rounded-md
                    ${selected 
                      ? 'bg-pink-500 text-white'
                      : 'text-gray-600 hover:text-pink-500'
                    }
                  `}>
                    Education
                  </Tab>
                </Tab.List>

                <Tab.Panels>
                  {/* Color Info Panel */}
                  <Tab.Panel className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-lg font-semibold">
                        Level {(selectedNode.properties as HairLevel).level}
                      </h3>
                      <button
                        onClick={() => setSelectedNode(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xs font-semibold text-blue-900 uppercase mb-1">
                          Technical Description
                        </h4>
                        <p className="text-gray-900">
                          {(selectedNode.properties as HairLevel).name}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xs font-semibold text-blue-900 uppercase mb-2">
                          Underlying Pigment
                        </h4>
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-4 h-4 rounded-sm border border-gray-200"
                            style={{ 
                              backgroundColor: (selectedNode.properties as HairLevel).underlying_pigment.toLowerCase()
                            }}
                          />
                          <div className="text-sm">
                            <div className="text-gray-900">
                              {(selectedNode.properties as HairLevel).underlying_pigment}
                            </div>
                            <div className="text-xs text-gray-500">
                              Natural Pigment
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-semibold text-blue-900 uppercase mb-2">
                          Neutralizing Tone
                        </h4>
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-4 h-4 rounded-sm border border-gray-200"
                            style={{ 
                              backgroundColor: (selectedNode.properties as HairLevel).neutralizing_tone.toLowerCase()
                            }}
                          />
                          <div className="text-sm">
                            <div className="text-gray-900">
                              {(selectedNode.properties as HairLevel).neutralizing_tone}
                            </div>
                            <div className="text-xs text-gray-500">
                              Corrective Tone
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-semibold text-blue-900 uppercase mb-2">
                          Level Relationships
                        </h4>
                        <div className="space-y-2">
                          {Object.entries(selectedNode.edges).map(([type, target]) => (
                            <div key={type} className="flex items-center space-x-2">
                              <div 
                                className="w-4 h-4 rounded-sm"
                                style={{ backgroundColor: getLevelColor((target.properties as HairLevel).level) }}
                              />
                              <span className="text-sm">
                                <span className="text-gray-600 capitalize">{type}:</span>
                                <span className="ml-1">Level {(target.properties as HairLevel).level}</span>
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Tab.Panel>

                  {/* Education Panel */}
                  <Tab.Panel className="p-6">
                    {selectedNode && (
                      <LevelEducation
                        levelId={(selectedNode.properties as HairLevel).level}
                        theory={theory}
                        chemicalProcess={chemicalProcess}
                        terminology={terminology}
                        quiz={quiz}
                      />
                    )}
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
