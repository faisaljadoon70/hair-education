'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { levelColors } from './colorData';
import type { HairLevel } from './types';
import { supabase } from '@/lib/supabaseClient';

export const ColorWheel = () => {
  const [currentRotation, setCurrentRotation] = useState(0);
  const [selectedLevels, setSelectedLevels] = useState<HairLevel[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<HairLevel | null>(null);
  const [hairLevels, setHairLevels] = useState<HairLevel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);
  const [view, setView] = useState<'wheel' | 'list'>('wheel');
  const [showTip, setShowTip] = useState(false);
  const [tipContent, setTipContent] = useState('');
  const [tipPosition, setTipPosition] = useState({ x: 0, y: 0 });
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const [showFormulaBuilder, setShowFormulaBuilder] = useState(false);
  const [formula, setFormula] = useState({
    developer: '20 Volume',
    ratio: '1:1',
    processingTime: '30',
    notes: ''
  });
  const [showTutorial, setShowTutorial] = useState(false);
  const [practiceMode, setPracticeMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const radius = 160;
  const centerX = 220;
  const centerY = 220;

  const tutorialSteps = [
    {
      title: "Understanding Hair Levels",
      content: "Hair levels range from 1 (darkest) to 10 (lightest). Each level represents the amount of natural pigment present in the hair.",
      image: "levels.png"
    },
    {
      title: "Color Theory Basics",
      content: "Understanding warm and cool tones is crucial. Warm tones contain red/orange/gold, while cool tones contain ash/violet/blue.",
      image: "tones.png"
    },
    {
      title: "Lifting and Depositing",
      content: "Lifting removes natural pigment, while depositing adds artificial color. The developer volume determines lifting power.",
      image: "lifting.png"
    }
  ];

  const practiceQuestions = [
    {
      question: "What level would you use to achieve a medium brown result?",
      options: ["Level 2", "Level 4", "Level 6", "Level 8"],
      correct: 1,
      explanation: "Level 4 is ideal for medium brown as it provides the right balance of depth and warmth."
    },
    {
      question: "Which levels work best for highlighting dark hair?",
      options: ["1-2 levels lighter", "2-3 levels lighter", "3-4 levels lighter", "4-5 levels lighter"],
      correct: 2,
      explanation: "Going 3-4 levels lighter creates noticeable but natural-looking highlights."
    }
  ];

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const { data: levels, error: dbError } = await supabase
          .from('hair_levels')
          .select('*')
          .order('level');

        if (dbError) throw dbError;
        if (!levels?.length) throw new Error('No hair levels found');

        setHairLevels(levels);
        setError(null);
      } catch (err) {
        console.error('Error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load hair levels');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLevels();
  }, []);

  const rotateWheel = (direction: 'left' | 'right') => {
    setCurrentRotation(prev => prev + (direction === 'left' ? -36 : 36));
  };

  const toggleLevel = (level: HairLevel) => {
    if (isMultiSelectMode) {
      setSelectedLevels(prev => {
        const exists = prev.find(l => l.level === level.level);
        if (exists) {
          return prev.filter(l => l.level !== level.level);
        }
        if (prev.length >= 2) {
          return [prev[1], level]; // Keep last selected and add new one
        }
        return [...prev, level];
      });
      setSelectedLevel(null); // Clear single selection in mix mode
    } else {
      setSelectedLevel(prev => prev?.level === level.level ? null : level);
      setSelectedLevels([]); // Clear mix selections in single mode
    }
  };

  // Reset selections when switching modes
  useEffect(() => {
    if (isMultiSelectMode) {
      setSelectedLevel(null);
    } else {
      setSelectedLevels([]);
    }
  }, [isMultiSelectMode]);

  // Function to reset mix mode and selections
  const resetMixMode = () => {
    setIsMultiSelectMode(false);
    setSelectedLevel(null);
    setSelectedLevels([]);
  };

  const getLevelRelationship = (level: number) => {
    const tips = {
      1: "Darkest level - Contains minimal underlying pigments",
      2: "Very dark - Often used for deep, rich colors",
      3: "Dark - Good base for warm brown tones",
      4: "Medium dark - Versatile level for various brown shades",
      5: "Medium - Popular level for natural-looking results",
      6: "Light - Great for warmer blonde transitions",
      7: "Medium blonde - Common target for highlighting",
      8: "Light blonde - Requires careful lifting process",
      9: "Very light blonde - Minimal underlying pigments remain",
      10: "Lightest blonde - Palest level, minimal natural pigment"
    };
    return tips[level as keyof typeof tips] || "";
  };

  const handleMouseEnter = (level: HairLevel, event: React.MouseEvent) => {
    setHoveredLevel(level.level);
    setTipContent(getLevelRelationship(level.level));
    setTipPosition({ x: event.clientX, y: event.clientY });
    setShowTip(true);
  };

  const handleMouseLeave = () => {
    setHoveredLevel(null);
    setShowTip(false);
  };

  const saveFormula = async () => {
    try {
      const { data, error } = await supabase
        .from('color_formulas')
        .insert([
          {
            level_from: selectedLevel?.level,
            level_to: selectedLevels[1]?.level,
            developer: formula.developer,
            mixing_ratio: formula.ratio,
            processing_time: parseInt(formula.processingTime),
            notes: formula.notes
          }
        ]);

      if (error) throw error;
      
      // Show success message
      alert('Formula saved successfully!');
      setShowFormulaBuilder(false);
    } catch (err) {
      console.error('Error saving formula:', err);
      alert('Failed to save formula. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-500 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className={`text-center bg-gradient-to-b from-white to-gray-50 p-8 ${view === 'list' ? 'pb-16' : ''} rounded-xl shadow-2xl max-w-6xl mx-auto relative min-h-screen`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          Professional Hair Color Wheel
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsMultiSelectMode(!isMultiSelectMode);
                setSelectedLevel(null);
                setSelectedLevels([]);
              }}
              className={`px-4 py-2 rounded-lg transition-all ${
                isMultiSelectMode
                  ? 'bg-violet-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isMultiSelectMode ? 'Exit Mix Mode' : 'Mix Colors'}
            </button>
            <button
              onClick={() => {
                resetMixMode();
                setShowFormulaBuilder(true);
              }}
              className="px-4 py-2 rounded-lg transition-all bg-green-500 text-white hover:bg-green-600"
            >
              Create Formula
            </button>
            <button
              onClick={() => {
                resetMixMode();
                setShowTutorial(true);
              }}
              className="px-4 py-2 rounded-lg transition-all bg-blue-500 text-white hover:bg-blue-600"
            >
              Tutorial
            </button>
            <button
              onClick={() => {
                resetMixMode();
                setPracticeMode(true);
              }}
              className="px-4 py-2 rounded-lg transition-all bg-yellow-500 text-white hover:bg-yellow-600"
            >
              Practice
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setView('wheel')}
              className={`px-4 py-2 rounded-lg transition-all ${
                view === 'wheel'
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Wheel View
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-lg transition-all ${
                view === 'list'
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              List View
            </button>
          </div>
        </div>
      </div>

      <div className={`flex justify-between items-start gap-12 ${view === 'list' ? 'pr-[400px]' : ''}`}>
        {/* Left Side - Quick Navigation */}
        <div className="w-64 bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Quick Navigation</h3>
          <div className="space-y-2">
            {hairLevels.map((level) => (
              <motion.div
                key={level.id || level.level}
                className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleLevel(level)}
                onMouseEnter={() => setHoveredLevel(level.level)}
                onMouseLeave={() => setHoveredLevel(null)}
                whileHover={{ x: 4 }}
              >
                <div 
                  className="w-8 h-8 rounded-full shadow-inner"
                  style={{ 
                    background: `linear-gradient(135deg, ${levelColors[level.level as keyof typeof levelColors]}, ${adjustBrightness(levelColors[level.level as keyof typeof levelColors], 20)})`,
                    border: selectedLevels.includes(level) || (selectedLevel?.level === level.level) ? '2px solid #E91E63' : '1px solid rgba(0,0,0,0.1)'
                  }}
                />
                <span className={`text-sm ${selectedLevels.includes(level) || (selectedLevel?.level === level.level) ? 'font-bold text-pink-600' : 'text-gray-600'}`}>
                  Level {level.level}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Center - Main Content */}
        <div className="flex-1 ml-4">
          <div className="max-w-[440px] mx-auto">
            <AnimatePresence mode="wait">
              {view === 'wheel' ? (
                <motion.div
                  key="wheel"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative w-[440px] h-[440px] mb-8"
                >
                  <div className="absolute inset-[-20px] rounded-full border-8 border-gray-100" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-50 to-white border border-gray-200 shadow-inner" />
                  
                  <div className="absolute left-1/2 top-1/2 w-12 h-12 -ml-6 -mt-6 rounded-full bg-gradient-to-br from-gray-100 to-white border-4 border-gray-200 shadow-inner" />
                  <div className="absolute left-1/2 top-1/2 w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-pink-500 shadow-md" />

                  {hairLevels.map((level, index) => {
                    const angle = ((index * 36) + currentRotation) * (Math.PI / 180);
                    const x = centerX + Math.cos(angle) * radius - 35;
                    const y = centerY + Math.sin(angle) * radius - 35;
                    const color = levelColors[level.level as keyof typeof levelColors];

                    return (
                      <motion.div
                        key={level.id || level.level}
                        className="absolute w-[70px] h-[70px] rounded-full cursor-pointer flex items-center justify-center text-lg font-bold shadow-lg hover:scale-110 transition-transform duration-200"
                        style={{
                          background: `linear-gradient(135deg, ${color}, ${color} 60%, ${adjustBrightness(color, 20)})`,
                          border: selectedLevels.includes(level) || (selectedLevel?.level === level.level) ? '3px solid #E91E63' : '2px solid rgba(0,0,0,0.2)',
                          color: getBrightnessFromHex(color) > 128 ? '#000' : '#fff',
                          x: x - centerX,
                          y: y - centerY,
                          scale: hoveredLevel === level.level ? 1.1 : 1,
                        }}
                        onClick={() => toggleLevel(level)}
                        onMouseEnter={(e) => handleMouseEnter(level, e)}
                        onMouseLeave={handleMouseLeave}
                        animate={{ x, y }}
                        transition={{ type: "spring", stiffness: 100 }}
                      >
                        {level.level}
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 gap-4"
                >
                  {hairLevels.map((level) => (
                    <motion.div
                      key={level.id || level.level}
                      className={`p-4 rounded-xl cursor-pointer transition-all ${
                        selectedLevels.includes(level) || (selectedLevel?.level === level.level)
                          ? 'bg-pink-50 border-pink-200'
                          : 'bg-white hover:bg-gray-50'
                      } border shadow-sm`}
                      onClick={() => toggleLevel(level)}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-full shadow-inner flex-shrink-0"
                          style={{
                            background: `linear-gradient(135deg, ${levelColors[level.level as keyof typeof levelColors]}, ${adjustBrightness(
                              levelColors[level.level as keyof typeof levelColors],
                              20
                            )})`,
                            border: '2px solid rgba(0,0,0,0.1)'
                          }}
                        />
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-bold text-gray-800">Level {level.level}</h3>
                            <span className="text-sm text-gray-500">{level.description}</span>
                          </div>
                          <div className="flex gap-6 text-sm">
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-full"
                                style={{
                                  backgroundColor: getPigmentColor(level.underlying_pigment),
                                  border: '1px solid rgba(0,0,0,0.1)'
                                }}
                              />
                              <span className="text-gray-600">{level.underlying_pigment}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-full"
                                style={{
                                  backgroundColor: getNeutralizerColor(level.neutralizing_tone),
                                  border: '1px solid rgba(0,0,0,0.1)'
                                }}
                              />
                              <span className="text-gray-600">{level.neutralizing_tone}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {view === 'wheel' && (
              <div className="space-y-6">
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => rotateWheel('left')}
                    className="px-8 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full hover:from-pink-600 hover:to-pink-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Rotate Left
                  </button>
                  <button
                    onClick={() => rotateWheel('right')}
                    className="px-8 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full hover:from-pink-600 hover:to-pink-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Rotate Right
                  </button>
                </div>
                <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium mb-2">Understanding the Color Wheel</p>
                  <ul className="space-y-2">
                    <li>• Adjacent levels show gradual color transitions</li>
                    <li>• Opposite levels are complementary (neutralizing)</li>
                    <li>• Rotate to explore relationships between levels</li>
                    <li>• Click any level to see detailed information</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Level Information */}
        <div className={`w-96 ${view === 'list' ? 'fixed right-8 top-32 bottom-8 overflow-auto' : 'ml-8'}`}>
          <AnimatePresence mode="wait">
            {isMultiSelectMode ? (
              <motion.div
                key="mixing"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`bg-white p-6 rounded-xl shadow-lg border border-gray-100 ${view !== 'list' ? 'sticky top-6' : ''}`}
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">Color Mixing Guide</h3>
                    <span className="text-sm text-gray-500">
                      {selectedLevels.length}/2 Selected
                    </span>
                  </div>
                  
                  <div className="flex gap-4">
                    {selectedLevels.length > 0 ? (
                      selectedLevels.map(level => (
                        <div
                          key={level.level}
                          className="flex-1 p-4 rounded-lg bg-gray-50"
                        >
                          <div
                            className="w-12 h-12 rounded-full mx-auto mb-2"
                            style={{
                              background: `linear-gradient(135deg, ${levelColors[level.level as keyof typeof levelColors]}, ${adjustBrightness(
                                levelColors[level.level as keyof typeof levelColors],
                                20
                              )})`,
                              border: '2px solid rgba(0,0,0,0.1)'
                            }}
                          />
                          <div className="text-center">
                            <div className="font-medium">Level {level.level}</div>
                            <div className="text-sm text-gray-600">{level.name}</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center w-full py-8 text-gray-500">
                        Select two levels to see mixing recommendations
                      </div>
                    )}
                  </div>

                  {selectedLevels.length === 2 && (
                    <div className="space-y-4">
                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-2">Mixing Recommendation</h4>
                        <div className="text-sm text-gray-600 space-y-2">
                          <p>• Mix ratio: 1:1 for balanced results</p>
                          <p>• Expected result: Level {Math.floor((selectedLevels[0].level + selectedLevels[1].level) / 2)}</p>
                          <p>• Processing time: 30-45 minutes</p>
                          <p>• Consider strand test first</p>
                        </div>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 text-yellow-800">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-medium">Professional Advice</span>
                        </div>
                        <p className="mt-2 text-sm text-yellow-700">
                          Always consult with a professional colorist before attempting complex color mixing procedures.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : selectedLevel ? (
              <motion.div 
                key="info"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`bg-white p-6 rounded-xl shadow-lg border border-gray-100 ${view !== 'list' ? 'sticky top-6' : ''}`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div 
                    className="w-16 h-16 rounded-full shadow-inner"
                    style={{ 
                      background: `linear-gradient(135deg, ${levelColors[selectedLevel.level as keyof typeof levelColors]}, ${adjustBrightness(levelColors[selectedLevel.level as keyof typeof levelColors], 20)})`,
                      border: '2px solid rgba(0,0,0,0.1)'
                    }}
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">Level {selectedLevel.level}</h3>
                    <p className="text-gray-500">{selectedLevel.description}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">Underlying Pigment</h4>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{
                          backgroundColor: getPigmentColor(selectedLevel.underlying_pigment),
                          border: '1px solid rgba(0,0,0,0.1)'
                        }}
                      />
                      <p className="text-gray-800">{selectedLevel.underlying_pigment}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">Neutralizing Tone</h4>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{
                          backgroundColor: getNeutralizerColor(selectedLevel.neutralizing_tone),
                          border: '1px solid rgba(0,0,0,0.1)'
                        }}
                      />
                      <p className="text-gray-800">{selectedLevel.neutralizing_tone}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="font-semibold text-gray-700 mb-2">Quick Tips</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Best for: {selectedLevel.description} base colors</li>
                      <li>• Use {selectedLevel.neutralizing_tone} to neutralize</li>
                      <li>• Natural level contains {selectedLevel.underlying_pigment}</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`bg-white p-6 rounded-xl shadow-lg border border-gray-100 ${view !== 'list' ? 'sticky top-6' : ''}`}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-800">Hair Level Details</h3>
                    <p className="text-sm text-gray-500">Select any level to view its information</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Click on a level from the wheel or quick navigation to see:</p>
                  <ul className="mt-2 space-y-1 list-disc list-inside">
                    <li>Detailed description</li>
                    <li>Underlying pigments</li>
                    <li>Neutralizing tones</li>
                    <li>Application tips</li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* Tooltip */}
      {showTip && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed z-50 bg-white px-4 py-2 rounded-lg shadow-xl border border-gray-200 text-sm max-w-[200px]"
          style={{
            left: tipPosition.x + 10,
            top: tipPosition.y + 10,
          }}
        >
          {tipContent}
        </motion.div>
      )}
      {/* Formula Builder Modal */}
      {showFormulaBuilder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Create Color Formula</h3>
              <button
                onClick={() => setShowFormulaBuilder(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Developer Volume
                </label>
                <select
                  value={formula.developer}
                  onChange={(e) => setFormula(prev => ({ ...prev, developer: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                >
                  <option>10 Volume</option>
                  <option>20 Volume</option>
                  <option>30 Volume</option>
                  <option>40 Volume</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mixing Ratio
                </label>
                <select
                  value={formula.ratio}
                  onChange={(e) => setFormula(prev => ({ ...prev, ratio: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                >
                  <option>1:1</option>
                  <option>1:1.5</option>
                  <option>1:2</option>
                  <option>1:3</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Processing Time (minutes)
                </label>
                <input
                  type="number"
                  value={formula.processingTime}
                  onChange={(e) => setFormula(prev => ({ ...prev, processingTime: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                  min="15"
                  max="60"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  value={formula.notes}
                  onChange={(e) => setFormula(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 h-24"
                  placeholder="Add any special instructions or observations..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  onClick={() => setShowFormulaBuilder(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={saveFormula}
                  className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
                >
                  Save Formula
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      {/* Tutorial Modal */}
      {showTutorial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4"
          >
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-800">Hair Color Theory</h3>
                <button
                  onClick={() => setShowTutorial(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tutorialSteps.map((step, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.content}</p>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Pro Tips</h4>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>• Always perform a strand test before full application</li>
                  <li>• Consider the client's natural level and desired result</li>
                  <li>• Factor in previous chemical treatments</li>
                  <li>• Use proper timing and developer volume</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      {/* Practice Mode Modal */}
      {practiceMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl p-6 max-w-xl w-full mx-4"
          >
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Practice Quiz</h3>
                <button
                  onClick={() => setPracticeMode(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-medium mb-4">
                  {practiceQuestions[currentQuestion].question}
                </h4>
                <div className="space-y-3">
                  {practiceQuestions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (index === practiceQuestions[currentQuestion].correct) {
                          alert('Correct! ' + practiceQuestions[currentQuestion].explanation);
                        } else {
                          alert('Try again! Think about the level system.');
                        }
                      }}
                      className="w-full text-left px-4 py-3 rounded-lg border hover:bg-gray-100 transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentQuestion(prev => (prev > 0 ? prev - 1 : prev))}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                  disabled={currentQuestion === 0}
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentQuestion(prev => (prev < practiceQuestions.length - 1 ? prev + 1 : prev))}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                  disabled={currentQuestion === practiceQuestions.length - 1}
                >
                  Next
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// Helper function to adjust color brightness
function adjustBrightness(hex: string, percent: number) {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  ).toString(16).slice(1);
}

// Helper function to get brightness value from hex color
function getBrightnessFromHex(hex: string) {
  const rgb = parseInt(hex.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  return (r * 299 + g * 587 + b * 114) / 1000;
}

// Helper function to get pigment color
function getPigmentColor(pigment: string): string {
  const pigmentColors: { [key: string]: string } = {
    'Red': '#FF0000',
    'Red-Orange': '#FF4500',
    'Orange': '#FFA500',
    'Yellow-Orange': '#FFB347',
    'Yellow': '#FFD700',
    'Yellow-Gold': '#FFD700',
    'Pale Yellow': '#FFEFBA',
  };
  
  const key = Object.keys(pigmentColors).find(k => 
    pigment.toLowerCase().includes(k.toLowerCase())
  );
  
  return key ? pigmentColors[key] : '#CCCCCC';
}

// Helper function to get neutralizer color
function getNeutralizerColor(neutralizer: string): string {
  const neutralizerColors: { [key: string]: string } = {
    'Green': '#00FF00',
    'Blue': '#0000FF',
    'Blue-Green': '#00CED1',
    'Violet': '#8A2BE2',
    'Purple': '#800080',
    'Ash': '#98989C',
  };
  
  const key = Object.keys(neutralizerColors).find(k => 
    neutralizer.toLowerCase().includes(k.toLowerCase())
  );
  
  return key ? neutralizerColors[key] : '#CCCCCC';
}

export default ColorWheel;
