'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { HAIR_TONES, ToneDefinition, HairTone } from '@/types/colorSystem';
import { calculateFinalColor } from '@/lib/utils/colorSpace';
import { levelColors } from '../levelwheel/levelData';
import type { HairLevel, LevelFormula, PracticeResult } from './types';
import { Tab } from '@headlessui/react';
import { useEducationalContent } from '@/hooks/useEducationalContent';
import LevelEducation from './LevelEducation';
import { HairHistory, HairProperties, ColorPrediction } from '@/types/colorSystem';
import LiftingProcessTimeline from './LiftingProcessTimeline';
import { calculateColorResult, calculateDeveloperVolume } from '@/utils/colorCalculations';
import { calculateTransformationPaths } from '@/utils/hairTransformation';
import type { TransformationPath, HairCondition, HairColor } from '@/types/hairTransformation';
import { useShadeCard } from '@/hooks/useShadeCard';
import { SHADE_CARD_SERIES } from '@/data/shadeCardData';
import type { HairShade } from '@/types/shadeCard';

// Floating Notification Component
const FloatingNotification = ({ 
  message, 
  isVisible, 
  onClose,
  offset = 0
}: { 
  message: string; 
  isVisible: boolean; 
  onClose: () => void;
  offset?: number;
}) => {
  if (!isVisible) return null;

  return (
    <div 
      className="fixed right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center justify-between"
      style={{ bottom: `${offset + 16}px` }}
    >
      <span>{message}</span>
      <button 
        onClick={onClose}
        className="ml-3 text-white hover:text-gray-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

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
  const [activeTab, setActiveTab] = useState<'levelWheel' | 'colorMixing' | 'formulaBuilder' | 'reverseFormula' | 'colorPrediction' | 'liftingProcess'>('levelWheel');

  // Color Mixing State
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
      color: getLevelColor(Math.round(roundedLevel)) // For now, use the basic level color
    });
  };

  // Watch for changes in colors or ratio to update result
  useEffect(() => {
    if (firstColor && secondColor) {
      calculateMixedColor();
    }
  }, [firstColor, secondColor, mixingRatio]);

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

  const calculateDeveloperStrength = (startLevel: number, targetLevel: number): number => {
    const levelDifference = targetLevel - startLevel;
    if (levelDifference <= 0) return 10; // Deposit only
    if (levelDifference <= 2) return 20;
    if (levelDifference <= 4) return 30;
    return 40; // Maximum lift
  };

  const calculateToneAdjustments = (undertone: string): string[] => {
    const adjustments: string[] = [];
    
    switch (undertone.toLowerCase()) {
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

  const updateColorPrediction = () => {
    if (!startingLevel || !targetLevel) return;

    const undertone = selectedTargetTone?.type || 'natural';
    const result = predictFinalColor(startingLevel, targetLevel, undertone, currentPorosity);

    setPrediction({
      finalColor: result.color,
      processingTime: result.processingTime,
      developerStrength: calculateDeveloperStrength(startingLevel, targetLevel),
      toneAdjustments: calculateToneAdjustments(undertone)
    });

    setShowPredictionNotification(true);
  };

  const saveFormula = () => {
    const formula = {
      id: Date.now().toString(),
      startingLevel,
      targetLevel,
      porosity: currentPorosity,
      developer: calculateDeveloperStrength(startingLevel, targetLevel),
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
    const fetchColorSystem = async () => {
      try {
        if (!supabase) {
          console.error('Supabase client not initialized');
          return;
        }

        const { data: levels, error: levelsError } = await supabase
          .from('hair_levels')
          .select('*')
          .order('level');

        if (levelsError) {
          console.error('Error fetching color system:', levelsError);
          return;
        }

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

    fetchColorSystem();
  }, []);

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

  const getShadesByLevel = (level: number): HairShade[] => {
    // Get all shades from natural series
    const naturalSeries = SHADE_CARD_SERIES.find(series => series.id === 'natural');
    if (!naturalSeries) return [];
    
    // Filter shades by level
    return naturalSeries.shades.filter(shade => shade.level === level);
  };

  const [currentLevelShades, setCurrentLevelShades] = useState<HairShade[]>([]);
  const [targetLevelShades, setTargetLevelShades] = useState<HairShade[]>([]);
  const [reverseCurrentLevel, setReverseCurrentLevel] = useState<number>(1);
  const [reverseCurrentTone, setReverseCurrentTone] = useState<string>('');
  const [reverseTargetLevel, setReverseTargetLevel] = useState<number>(1);
  const [reverseTargetTone, setReverseTargetTone] = useState<string>('');
  const [paths, setPaths] = useState<any[]>([]);
  const [reverseHairCondition, setReverseHairCondition] = useState({
    porosity: 'low',
    health: 'healthy',
    previousTreatments: []
  });

  useEffect(() => {
    const shades = getShadesByLevel(reverseCurrentLevel);
    console.log('Current level shades:', shades);
    setCurrentLevelShades(shades);
    // Set default tone if available
    if (shades.length > 0) {
      setReverseCurrentTone(shades[0].id);
    }
  }, [reverseCurrentLevel]);

  useEffect(() => {
    const shades = getShadesByLevel(reverseTargetLevel);
    console.log('Target level shades:', shades);
    setTargetLevelShades(shades);
    // Set default tone if available
    if (shades.length > 0) {
      setReverseTargetTone(shades[0].id);
    }
  }, [reverseTargetLevel]);

  const calculatePaths = () => {
    const request = {
      startingColor: { 
        level: reverseCurrentLevel, 
        tone: reverseCurrentTone 
      },
      targetColor: { 
        level: reverseTargetLevel, 
        tone: reverseTargetTone 
      },
      hairCondition: {
        porosity: reverseHairCondition.porosity,
        health: reverseHairCondition.health,
        previousTreatments: reverseHairCondition.previousTreatments,
        underlyingPigment: getUndertone(reverseCurrentLevel)
      },
      maxSessions: 3,
      developerVolumes: [10, 20, 30, 40]
    };

    const paths = calculateTransformationPaths(
      request.startingColor.level,
      request.startingColor.tone,
      request.targetColor.level,
      request.targetColor.tone,
      request.hairCondition
    );

    setPaths(paths);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <FloatingNotification
        message="Formula saved successfully!"
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
        offset={0}
      />
      <FloatingNotification
        message="Color prediction calculated!"
        isVisible={showPredictionNotification}
        onClose={() => setShowPredictionNotification(false)}
        offset={70}
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
          onClick={() => setActiveTab('colorMixing')}
          className={`px-4 py-2 rounded ${
            activeTab === 'colorMixing' ? 'bg-pink-500 text-white' : 'bg-gray-200'
          }`}
        >
          Color Mixing
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
          onClick={() => setActiveTab('reverseFormula')}
          className={`px-4 py-2 rounded ${
            activeTab === 'reverseFormula' ? 'bg-pink-500 text-white' : 'bg-gray-200'
          }`}
        >
          Reverse Formula
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
              onClick={() => {
                if (activeTab === 'levelWheel') {
                  setSelectedNode(node);
                } else if (activeTab === 'colorMixing') {
                  const level = (node.properties as HairLevel).level;
                  if (!firstColor) {
                    setFirstColor(level);
                  } else if (!secondColor) {
                    setSecondColor(level);
                  } else {
                    // If both colors are set, start over with this color
                    setFirstColor(level);
                    setSecondColor(null);
                  }
                }
              }}
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
                            onClick={() => {
                              if (activeTab === 'levelWheel') {
                                setSelectedNode(node);
                              } else if (activeTab === 'colorMixing') {
                                const level = (node.properties as HairLevel).level;
                                if (!firstColor) {
                                  setFirstColor(level);
                                } else if (!secondColor) {
                                  setSecondColor(level);
                                } else {
                                  // If both colors are set, start over with this color
                                  setFirstColor(level);
                                  setSecondColor(null);
                                }
                              }
                            }}
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

          {activeTab === 'colorMixing' && (
            <div className="grid grid-cols-2 gap-8">
              {/* Color Selection Panel */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-6">Select Colors to Mix</h3>
                
                {/* First Color Selection */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2">Chosen Color Level 1</h4>
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-12 h-12 rounded-full border-2"
                      style={{ backgroundColor: firstColor ? getLevelColor(firstColor) : '#fff' }}
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
                      style={{ backgroundColor: secondColor ? getLevelColor(secondColor) : '#fff' }}
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
                    <div className="grid grid-cols-4 gap-2">
                      {getShadesByLevel(startingLevel).map(shade => (
                        <motion.div
                          key={shade.id}
                          whileHover={{ scale: 1.1 }}
                          onClick={() => setSelectedStartingTone(shade)}
                          className={`
                            relative cursor-pointer rounded-lg p-4 
                            ${selectedStartingTone?.id === shade.id ? 'ring-2 ring-pink-500' : ''}
                          `}
                          style={{
                            backgroundColor: shade.hexColor,
                            transition: 'transform 0.2s'
                          }}
                        >
                          <div 
                            className={`text-xs text-center whitespace-nowrap overflow-hidden 
                            ${shade.level <= 5 ? 'text-white' : 'text-gray-800'}`}
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
                    <div className="grid grid-cols-4 gap-2">
                      {getShadesByLevel(targetLevel).map(shade => (
                        <motion.div
                          key={shade.id}
                          whileHover={{ scale: 1.1 }}
                          onClick={() => setSelectedTargetTone(shade)}
                          className={`
                            relative cursor-pointer rounded-lg p-4 
                            ${selectedTargetTone?.id === shade.id ? 'ring-2 ring-pink-500' : ''}
                          `}
                          style={{
                            backgroundColor: shade.hexColor,
                            transition: 'transform 0.2s'
                          }}
                        >
                          <div 
                            className={`text-xs text-center whitespace-nowrap overflow-hidden 
                            ${shade.level <= 5 ? 'text-white' : 'text-gray-800'}`}
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

          {activeTab === 'reverseFormula' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">Current Hair Details</h2>
                
                {/* Level Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Level
                  </label>
                  <select 
                    value={reverseCurrentLevel}
                    onChange={(e) => setReverseCurrentLevel(Number(e.target.value))}
                    className="w-full border rounded-md p-2"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(level => (
                      <option key={level} value={level}>Level {level}</option>
                    ))}
                  </select>
                </div>

                {/* Current Tone */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tone
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {currentLevelShades.map(shade => (
                      <motion.div
                        key={shade.id}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setReverseCurrentTone(shade.id)}
                        className={`
                          relative cursor-pointer rounded-lg p-6 shadow-sm
                          ${reverseCurrentTone === shade.id ? 'ring-2 ring-pink-500 shadow-lg' : 'hover:shadow-md'}
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

                {/* Target Hair Section */}
                <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">Target Hair Details</h2>

                {/* Target Level */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Level
                  </label>
                  <select 
                    value={reverseTargetLevel}
                    onChange={(e) => setReverseTargetLevel(Number(e.target.value))}
                    className="w-full border rounded-md p-2"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(level => (
                      <option key={level} value={level}>Level {level}</option>
                    ))}
                  </select>
                </div>

                {/* Target Tone */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tone
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {targetLevelShades.map(shade => (
                      <motion.div
                        key={shade.id}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => setReverseTargetTone(shade.id)}
                        className={`
                          relative cursor-pointer rounded-lg p-4
                          ${reverseTargetTone === shade.id ? 'ring-2 ring-pink-500' : ''}
                        `}
                        style={{
                          backgroundColor: shade.hexColor,
                          transition: 'transform 0.2s'
                        }}
                      >
                        <div 
                          className={`text-xs text-center whitespace-nowrap overflow-hidden 
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Porosity
                  </label>
                  <select 
                    value={reverseHairCondition.porosity}
                    onChange={(e) => setReverseHairCondition({...reverseHairCondition, porosity: e.target.value as 'low' | 'medium' | 'high'})}
                    className="w-full border rounded-md p-2"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                {/* Hair Health */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Health
                  </label>
                  <select 
                    value={reverseHairCondition.health}
                    onChange={(e) => setReverseHairCondition({...reverseHairCondition, health: e.target.value as 'damaged' | 'healthy'})}
                    className="w-full border rounded-md p-2"
                  >
                    <option value="healthy">Healthy</option>
                    <option value="damaged">Damaged</option>
                  </select>
                </div>

                {/* Previous Treatments */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Previous Treatments
                  </label>
                  <div className="space-y-2">
                    {['virgin', 'bleached', 'colored', 'permed'].map(treatment => (
                      <label key={treatment} className="flex items-center">
                        <input 
                          type="checkbox"
                          checked={reverseHairCondition.previousTreatments.includes(treatment as any)}
                          onChange={(e) => {
                            const treatments = e.target.checked
                              ? [...reverseHairCondition.previousTreatments, treatment]
                              : reverseHairCondition.previousTreatments.filter(t => t !== treatment);
                            setReverseHairCondition({...reverseHairCondition, previousTreatments: treatments as any});
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
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Formula Paths</h2>
                  {paths && paths.length > 0 && (
                    <button
                      onClick={() => setPaths([])}
                      className="text-gray-600 hover:text-red-600 transition-colors flex items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" />
                      </svg>
                      Clear Results
                    </button>
                  )}
                </div>
                {paths && paths.length > 0 ? (
                  <>
                    {paths.map((path, index) => (
                      <div key={index} className="mb-8 last:mb-0">
                        {/* Path Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{path.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {path.sessions} session{path.sessions > 1 ? 's' : ''} • {path.time} minutes per session
                            </p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              path.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                              path.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {path.difficulty}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              path.successRate >= 80 ? 'bg-green-100 text-green-800' :
                              path.successRate >= 60 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {path.successRate}% Success Rate
                            </span>
                          </div>
                        </div>

                        {/* Path Description */}
                        <p className="text-gray-700 mb-6">{path.description}</p>

                        {/* Steps */}
                        <div className="space-y-6">
                          {path.steps.map((step, stepIndex) => (
                            <div key={stepIndex} className="bg-gray-50 rounded-lg p-6">
                              <div className="flex items-start">
                                <div className="flex-shrink-0 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">
                                  {stepIndex + 1}
                                </div>
                                <div className="ml-4 flex-grow">
                                  <h4 className="text-lg font-medium text-gray-900 mb-2">{step.description}</h4>
                                  
                                  {/* Formula and Processing Time */}
                                  <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="bg-white p-3 rounded-md border border-gray-200">
                                      <span className="text-sm font-medium text-gray-500">Formula</span>
                                      <p className="mt-1 text-gray-900">{step.formula}</p>
                                    </div>
                                    <div className="bg-white p-3 rounded-md border border-gray-200">
                                      <span className="text-sm font-medium text-gray-500">Processing Time</span>
                                      <p className="mt-1 text-gray-900">{step.processingTime}</p>
                                    </div>
                                  </div>

                                  {/* Detailed Steps */}
                                  {step.details && (
                                    <div className="mb-4">
                                      <h5 className="text-sm font-medium text-gray-700 mb-2">Detailed Steps:</h5>
                                      <ul className="space-y-2">
                                        {step.details.map((detail, i) => (
                                          <li key={i} className="flex items-start">
                                            <span className="flex-shrink-0 w-5 h-5 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">
                                              {i + 1}
                                            </span>
                                            <span className="text-gray-700">{detail}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {/* Cautions and Tips */}
                                  <div className="grid grid-cols-2 gap-4">
                                    {step.cautions && (
                                      <div className="bg-amber-50 p-3 rounded-md">
                                        <div className="flex items-center text-amber-800 mb-1">
                                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                          </svg>
                                          <span className="font-medium">Caution</span>
                                        </div>
                                        <p className="text-amber-700 text-sm">{step.cautions}</p>
                                      </div>
                                    )}
                                    {step.tips && (
                                      <div className="bg-blue-50 p-3 rounded-md">
                                        <div className="flex items-center text-blue-800 mb-1">
                                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                          </svg>
                                          <span className="font-medium">Pro Tip</span>
                                        </div>
                                        <p className="text-blue-700 text-sm">{step.tips}</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Overall Considerations */}
                        <div className="mt-6 bg-gray-50 rounded-lg p-6">
                          <h4 className="font-medium text-gray-900 mb-4">Overall Considerations</h4>
                          <ul className="grid grid-cols-2 gap-4">
                            {path.considerations.map((consideration, i) => (
                              <li key={i} className="flex items-start">
                                <svg className="w-5 h-5 text-pink-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-gray-700">{consideration}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                    <div className="mt-8 flex justify-center">
                      <button
                        onClick={() => setPaths([])}
                        className="text-gray-600 hover:text-red-600 transition-colors flex items-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" />
                        </svg>
                        Reset All Results
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Click Calculate Paths to see available options
                  </div>
                )}
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
                    <h4 className="text-2xl font-bold mb-3 text-gray-800">Current Level</h4>
                    <select 
                      value={startingLevel || 1}
                      onChange={(e) => setStartingLevel(Number(e.target.value))}
                      className="w-full p-2 border rounded-lg"
                    >
                      {Array.from({length: 10}, (_, i) => i + 1).map(level => (
                        <option key={level} value={level}>Level {level}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Current Tone</label>
                    <div className="grid grid-cols-4 gap-2">
                      {getShadesByLevel(startingLevel).map(shade => (
                        <motion.div
                          key={shade.id}
                          whileHover={{ scale: 1.1 }}
                          onClick={() => setCurrentTone(shade)}
                          className={`
                            relative cursor-pointer rounded-lg p-4 
                            ${currentTone?.id === shade.id ? 'ring-2 ring-pink-500' : ''}
                          `}
                          style={{
                            backgroundColor: shade.hexColor,
                            transition: 'transform 0.2s'
                          }}
                        >
                          <div 
                            className={`text-xs text-center whitespace-nowrap overflow-hidden 
                            ${shade.level <= 5 ? 'text-white' : 'text-gray-800'}`}
                          >
                            {shade.name}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-2xl font-bold mb-3 text-gray-800">Desired Level</h4>
                    <select 
                      value={targetLevel || 1}
                      onChange={(e) => setTargetLevel(Number(e.target.value))}
                      className="w-full p-2 border rounded-lg"
                    >
                      {Array.from({length: 10}, (_, i) => i + 1).map(level => (
                        <option key={level} value={level}>Level {level}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Desired Tone</label>
                    <div className="grid grid-cols-4 gap-2">
                      {getShadesByLevel(targetLevel).map(shade => (
                        <motion.div
                          key={shade.id}
                          whileHover={{ scale: 1.1 }}
                          onClick={() => setDesiredTone(shade)}
                          className={`
                            relative cursor-pointer rounded-lg p-4 
                            ${desiredTone?.id === shade.id ? 'ring-2 ring-pink-500' : ''}
                          `}
                          style={{
                            backgroundColor: shade.hexColor,
                            transition: 'transform 0.2s'
                          }}
                        >
                          <div 
                            className={`text-xs text-center whitespace-nowrap overflow-hidden 
                            ${shade.level <= 5 ? 'text-white' : 'text-gray-800'}`}
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
                    onClick={updateColorPrediction}
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
              className="w-96 bg-white rounded-lg"
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
