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
  const [isMixingMode, setIsMixingMode] = useState(false);
  const [mixedResult, setMixedResult] = useState<string | null>(null);
  const [resultLevel, setResultLevel] = useState<number | null>(null);

  const radius = 160;
  const centerX = 220;
  const centerY = 220;

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

  const getColorForTone = (tone: string) => {
    if (!tone) return '#718096';
    const lowerTone = tone.toLowerCase();
    if (lowerTone.includes('blue')) return '#4299e1';
    if (lowerTone.includes('red')) return '#e53e3e';
    if (lowerTone.includes('orange')) return '#ed8936';
    if (lowerTone.includes('green')) return '#48bb78';
    if (lowerTone.includes('violet')) return '#9f7aea';
    if (lowerTone.includes('yellow')) return '#ecc94b';
    return '#718096';
  };

  const mixSelectedColors = () => {
    if (selectedLevels.length !== 2) return;
    
    const color1 = levelColors[selectedLevels[0].level as keyof typeof levelColors];
    const color2 = levelColors[selectedLevels[1].level as keyof typeof levelColors];
    
    // Convert hex to RGB and mix
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    
    if (!rgb1 || !rgb2) return;
    
    const mixedRgb = {
      r: Math.round((rgb1.r + rgb2.r) / 2),
      g: Math.round((rgb1.g + rgb2.g) / 2),
      b: Math.round((rgb1.b + rgb2.b) / 2)
    };
    
    // Calculate the result level (average of the two levels)
    const level1 = parseInt(selectedLevels[0].level);
    const level2 = parseInt(selectedLevels[1].level);
    setResultLevel(Math.round((level1 + level2) / 2));
    
    setMixedResult(rgbToHex(mixedRgb));
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHex = (rgb: { r: number, g: number, b: number }) => {
    return '#' + [rgb.r, rgb.g, rgb.b]
      .map(x => x.toString(16).padStart(2, '0'))
      .join('');
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
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Professional Hair Color Wheel</h1>
      
      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => {
            setIsMixingMode(!isMixingMode);
            if (!isMixingMode) {
              setSelectedLevels([]);
              setMixedResult(null);
              setResultLevel(null);
            }
          }}
          className={`px-4 py-2 rounded-md transition-colors ${
            isMixingMode ? 'bg-pink-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Mix Colors
        </button>
        <button
          onClick={() => {
            setView('wheel');
            setIsMixingMode(false);
            setSelectedLevels([]);
            setMixedResult(null);
            setResultLevel(null);
          }}
          className={`px-4 py-2 rounded-md transition-colors ${
            view === 'wheel' ? 'bg-pink-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Wheel View
        </button>
        <button
          onClick={() => {
            setView('list');
            setIsMixingMode(false);
            setSelectedLevels([]);
            setMixedResult(null);
            setResultLevel(null);
          }}
          className={`px-4 py-2 rounded-md transition-colors ${
            view === 'list' ? 'bg-pink-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          List View
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Quick Navigation */}
        <div className="md:col-span-3">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-medium text-lg mb-6">Quick Navigation</h3>
            <div className="space-y-4">
              {hairLevels.map((level) => (
                <motion.div
                  key={level.id || level.level}
                  className="flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleLevel(level)}
                  onMouseEnter={() => setHoveredLevel(level.level)}
                  onMouseLeave={() => setHoveredLevel(null)}
                  whileHover={{ x: 4 }}
                >
                  <div 
                    className="w-10 h-10 rounded-full shadow-inner"
                    style={{ 
                      background: `linear-gradient(135deg, ${levelColors[level.level as keyof typeof levelColors]}, ${adjustBrightness(levelColors[level.level as keyof typeof levelColors], 20)})`,
                      border: selectedLevels.includes(level) || (selectedLevel?.level === level.level) ? '2px solid #E91E63' : '1px solid rgba(0,0,0,0.1)'
                    }}
                  />
                  <span className={`text-base ${selectedLevels.includes(level) || (selectedLevel?.level === level.level) ? 'font-bold text-pink-600' : 'text-gray-600'}`}>
                    Level {level.level}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Color Wheel */}
        <div className="md:col-span-6">
          {view === 'wheel' ? (
            <div className="relative flex flex-col items-center">
              <div className="w-full flex justify-center mb-8">
                <motion.div
                  key="wheel"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative"
                  style={{ width: '440px', height: '440px', marginLeft: '80px' }}
                >
                  {/* Outer circle */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      border: '4px solid rgba(209, 213, 219, 0.5)',
                      background: 'radial-gradient(circle at center, rgba(243, 244, 246, 0.2), rgba(229, 231, 235, 0.4))'
                    }}
                  />
                  {/* Inner circle */}
                  <div
                    className="absolute"
                    style={{
                      width: '352px',
                      height: '352px',
                      left: '10%',
                      top: '10%',
                      borderRadius: '50%',
                      border: '4px solid rgba(209, 213, 219, 0.6)',
                      background: 'radial-gradient(circle at center, rgba(243, 244, 246, 0.3), rgba(229, 231, 235, 0.5))'
                    }}
                  />
                  
                  <div className="absolute left-1/2 top-1/2 w-12 h-12 -ml-6 -mt-6 rounded-full bg-gradient-to-br from-gray-100 to-white border-4 border-gray-200 shadow-inner" />
                  <div className="absolute left-1/2 top-1/2 w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-pink-500 shadow-md" />
                  
                  {/* Level circles */}
                  {hairLevels.map((level, index) => {
                    const angle = (index * (360 / hairLevels.length) + currentRotation) * (Math.PI / 180);
                    const color = levelColors[level.level as keyof typeof levelColors];
                    const x = centerX + Math.cos(angle) * radius - 35;
                    const y = centerY + Math.sin(angle) * radius - 35;

                    return (
                      <motion.div
                        key={level.id || level.level}
                        className="absolute rounded-full flex items-center justify-center text-lg font-bold shadow-lg hover:scale-110 transition-transform duration-200"
                        style={{
                          width: '70px',
                          height: '70px',
                          x,
                          y,
                          cursor: 'pointer',
                          background: `linear-gradient(135deg, ${color}, ${color} 60%, ${adjustBrightness(color, 20)})`,
                          border: selectedLevels.includes(level) || (selectedLevel?.level === level.level) ? '3px solid #E91E63' : '2px solid rgba(0,0,0,0.2)',
                          color: getBrightnessFromHex(color) > 128 ? '#000' : '#fff',
                          zIndex: 10
                        }}
                        onClick={() => {
                          if (isMixingMode) {
                            if (selectedLevels.length < 2 && !selectedLevels.find(l => l.level === level.level)) {
                              setSelectedLevels([...selectedLevels, level]);
                            }
                          } else {
                            toggleLevel(level);
                          }
                        }}
                        onMouseEnter={() => setHoveredLevel(level.level)}
                        onMouseLeave={() => setHoveredLevel(null)}
                        whileHover={{ scale: 1.1 }}
                        animate={{ x, y }}
                        transition={{ type: "spring", stiffness: 100 }}
                      >
                        {level.level}
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>

              {/* Rotation Controls - Centered */}
              <div className="flex justify-center gap-3 mt-4" style={{ marginLeft: '80px' }}>
                <button
                  onClick={() => rotateWheel('left')}
                  className="px-3 py-1.5 text-sm bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
                >
                  Rotate Left
                </button>
                <button
                  onClick={() => rotateWheel('right')}
                  className="px-3 py-1.5 text-sm bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
                >
                  Rotate Right
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Hair Color Levels</h3>
              <div className="space-y-4">
                {hairLevels.map((level) => (
                  <motion.div
                    key={level.id || level.level}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
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
                                backgroundColor: getColorForTone(level.underlying_pigment),
                                border: '1px solid rgba(0,0,0,0.1)'
                              }}
                            />
                            <span className="text-gray-600">{level.underlying_pigment}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{
                                backgroundColor: getColorForTone(level.neutralizing_tone),
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
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Hair Level Details or Mix Colors */}
        <div className="md:col-span-3">
          {isMixingMode ? (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Mix Hair Colors</h3>
              
              <div className="mb-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                  <p className="text-blue-700">Instructions:</p>
                  <ol className="text-blue-600 ml-4 list-decimal">
                    <li>Click on any level number in the wheel to select it</li>
                    <li>Select two different levels to see their mixed result</li>
                    <li>Click "Mix Colors" when ready to see the combination</li>
                  </ol>
                </div>

                <p className="text-gray-600 mb-2">Selected levels ({selectedLevels.length}/2):</p>
                <div className="flex gap-4 mb-4">
                  {selectedLevels.map((level, index) => (
                    <div
                      key={level.level}
                      className="w-16 h-16 rounded-full shadow-md flex items-center justify-center relative group"
                      style={{
                        background: levelColors[level.level as keyof typeof levelColors],
                        color: getBrightnessFromHex(levelColors[level.level as keyof typeof levelColors]) > 128 ? '#000' : '#fff'
                      }}
                    >
                      <span className="text-lg font-bold">Level {level.level}</span>
                      <button
                        onClick={() => {
                          setSelectedLevels(selectedLevels.filter(l => l.level !== level.level));
                        }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-md"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {Array(2 - selectedLevels.length).fill(0).map((_, i) => (
                    <div key={i} className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-gray-400 text-sm">Click wheel</div>
                        <div className="text-gray-300 text-xs">to select</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedLevels.length === 2 && (
                <div className="mb-4">
                  <button
                    onClick={mixSelectedColors}
                    className="w-full px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Mix Colors</span>
                    {mixedResult && <span>↻</span>}
                  </button>
                </div>
              )}

              {mixedResult && (
                <div className="mb-4">
                  <p className="text-gray-600 mb-2">Mixed Result:</p>
                  <div className="w-full h-24 rounded-lg shadow-md" style={{ background: mixedResult }} />
                  <p className="text-center text-gray-500 mt-2">
                    Result: Level {resultLevel}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedLevels([]);
                      setMixedResult(null);
                      setResultLevel(null);
                    }}
                    className="w-full mt-4 px-4 py-2 bg-pink-100 text-pink-700 rounded-md hover:bg-pink-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Clear Result</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-lg">Hair Level Details</h3>
                <div className="text-pink-500">ⓘ</div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {selectedLevel 
                  ? `Level ${selectedLevel.level} Details`
                  : 'Select any level to view its information'}
              </p>
              {selectedLevel ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">Description</h4>
                    <p className="text-sm text-gray-600">{selectedLevel.description}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">Underlying Pigment</h4>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: getColorForTone(selectedLevel.underlying_pigment),
                          border: '1px solid rgba(0,0,0,0.1)'
                        }}
                      />
                      <p className="text-sm text-gray-600">{selectedLevel.underlying_pigment}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">Neutralizing Tone</h4>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: getColorForTone(selectedLevel.neutralizing_tone),
                          border: '1px solid rgba(0,0,0,0.1)'
                        }}
                      />
                      <p className="text-sm text-gray-600">{selectedLevel.neutralizing_tone}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">Application Tips</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Best for: {selectedLevel.description} base colors</li>
                      <li>• Use {selectedLevel.neutralizing_tone} to neutralize</li>
                      <li>• Natural level contains {selectedLevel.underlying_pigment}</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-sm text-gray-500">
                  <p>Click on a level to see:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Detailed description</li>
                    <li>Underlying pigments</li>
                    <li>Neutralizing tones</li>
                    <li>Application tips</li>
                  </ul>
                </div>
              )}
            </div>
          )}
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
