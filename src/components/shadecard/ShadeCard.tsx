'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SHADE_CARD_SERIES } from '../../data/shadeCardData';
import { HairShade } from '../../types/shadeCard';
import Link from 'next/link';

const getUndertoneColor = (undertone: string): string => {
  const colorMap: { [key: string]: string } = {
    'Neutral': 'linear-gradient(135deg, #ffffff, #f0f0f0)',
    'Warm': 'linear-gradient(135deg, #ef4444, #dc2626)',
    'Cool': 'linear-gradient(135deg, #3b82f6, #2563eb)',
    'Blue': 'linear-gradient(135deg, #60a5fa, #3b82f6)',
    'Violet': 'linear-gradient(135deg, #a855f7, #9333ea)',
    'Ash': 'linear-gradient(135deg, #6b7280, #4b5563)',
    'Red': 'linear-gradient(135deg, #ef4444, #dc2626)',
    'Mahogany': 'linear-gradient(135deg, #991b1b, #7f1d1d)',
    'Gold': 'linear-gradient(135deg, #f59e0b, #d97706)',
    'Beige': 'linear-gradient(135deg, #fcd34d, #fbbf24)',
    'Copper': 'linear-gradient(135deg, #ea580c, #c2410c)',
    'Chocolate': 'linear-gradient(135deg, #92400e, #78350f)',
    'Mocha': 'linear-gradient(135deg, #78350f, #451a03)',
    'Ash Brown': 'linear-gradient(135deg, #57534e, #44403c)',
    'Intense Ash': 'linear-gradient(135deg, #4b5563, #374151)',
    'Pearl': 'linear-gradient(135deg, #e9d5ff, #d8b4fe)'
  };
  return colorMap[undertone] || 'linear-gradient(135deg, #9ca3af, #6b7280)';
};

const getContrastColor = (hexColor: string) => {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  // Calculate brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  // Return black for light backgrounds, white for dark backgrounds
  return brightness > 128 ? 'text-gray-800' : 'text-white';
};

const getHairTypeRecommendations = (shade: HairShade) => {
  const recommendations = {
    texture: [] as string[],
    porosity: [] as string[],
    concerns: [] as string[]
  };

  // Texture recommendations
  if (shade.level >= 9) {
    recommendations.texture.push('Fine to Medium Hair');
  } else if (shade.level >= 7) {
    recommendations.texture.push('All Hair Types');
  } else {
    recommendations.texture.push('Medium to Coarse Hair');
  }

  // Porosity recommendations
  if (shade.isHighLift) {
    recommendations.porosity.push('Low to Normal Porosity');
  } else if (shade.coverage.gray > 70) {
    recommendations.porosity.push('Normal to High Porosity');
  } else {
    recommendations.porosity.push('All Porosity Levels');
  }

  // Special concerns and recommendations
  if (shade.undertone === 'Ash' || shade.undertone === 'Blue') {
    recommendations.concerns.push('Brassiness Control');
  }
  if (shade.coverage.gray > 80) {
    recommendations.concerns.push('Resistant Gray Hair');
  }
  if (shade.isHighLift) {
    recommendations.concerns.push('Virgin Hair');
  }
  if (shade.level <= 6) {
    recommendations.concerns.push('Color Longevity');
  }

  return recommendations;
};

export const ShadeCard: React.FC = () => {
  const [selectedShade, setSelectedShade] = useState<HairShade | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [comparedShades, setComparedShades] = useState<HairShade[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showGuide, setShowGuide] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUndertone, setSelectedUndertone] = useState<string>('all');
  const [showHighLiftOnly, setShowHighLiftOnly] = useState(false);
  const [grayCoverageRange, setGrayCoverageRange] = useState<[number, number]>([0, 100]);

  // Get unique undertones from available shades
  const getAvailableUndertones = () => {
    const series = SHADE_CARD_SERIES.find(series => series.id === 'natural');
    if (!series) return [];
    
    const undertones = new Set<string>();
    series.shades.forEach(shade => {
      if (shade.undertone) {
        undertones.add(shade.undertone);
      }
    });
    
    return Array.from(undertones).sort();
  };

  const availableUndertones = getAvailableUndertones();

  const filterShades = (shades: HairShade[] | undefined) => {
    if (!shades) return [];
    
    return shades.filter(shade => {
      // Search filter
      const searchMatch = searchQuery === '' || 
        shade.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `${shade.level}.${shade.primaryTone}`.includes(searchQuery);

      // Undertone filter
      const undertoneMatch = selectedUndertone === 'all' || 
        shade.undertone.toLowerCase() === selectedUndertone;

      // High lift filter
      const highLiftMatch = !showHighLiftOnly || shade.isHighLift;

      // Gray coverage filter - show shades with coverage >= min and <= max
      const coverageMatch = shade.coverage.gray >= grayCoverageRange[0] && 
                           shade.coverage.gray <= grayCoverageRange[1];

      // Debug log
      console.log(`Shade ${shade.level}.${shade.primaryTone} (${shade.name}):`, {
        grayCoverage: shade.coverage.gray,
        rangeMin: grayCoverageRange[0],
        rangeMax: grayCoverageRange[1],
        coverageMatch
      });

      return searchMatch && undertoneMatch && highLiftMatch && coverageMatch;
    });
  };

  const handleShadeClick = (shade: HairShade, e: React.MouseEvent) => {
    e.stopPropagation();
    if (compareMode) {
      if (comparedShades.find(s => s.id === shade.id)) {
        setComparedShades(comparedShades.filter(s => s.id !== shade.id));
      } else if (comparedShades.length < 3) {
        setComparedShades([...comparedShades, shade]);
      }
    } else {
      setSelectedShade(selectedShade?.id === shade.id ? null : shade);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectedShade && !(e.target as Element).closest('.shade-card, .shade-details')) {
        setSelectedShade(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [selectedShade]);

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Professional Shade Card</h1>
        <div className="flex items-center gap-4">
          <Link
            href="/shade-wheel/compare"
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg 
                     shadow-md hover:shadow-lg transform hover:-translate-y-0.5 
                     transition-all duration-200 font-medium"
          >
            Compare Shades
          </Link>
          <Link
            href="/shade-wheel/guide"
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg 
                     shadow-md hover:shadow-lg transform hover:-translate-y-0.5 
                     transition-all duration-200 font-medium"
          >
            Shade Guide
          </Link>
          <Link
            href="/level-wheel"
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg 
                     shadow-md hover:shadow-lg transform hover:-translate-y-0.5 
                     transition-all duration-200 font-medium flex items-center gap-2"
          >
            <span>Back to Level Wheel</span>
          </Link>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 space-y-4 bg-white p-4 rounded-lg shadow">
        {/* Search Bar */}
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by shade name or number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-6 items-center">
          {/* Undertone Filter */}
          <div className="flex items-center gap-2">
            <label className="font-medium">Undertone:</label>
            <select
              value={selectedUndertone}
              onChange={(e) => setSelectedUndertone(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              {availableUndertones.map(undertone => (
                <option key={undertone} value={undertone.toLowerCase()}>
                  {undertone}
                </option>
              ))}
            </select>
          </div>

          {/* High Lift Filter */}
          <div className="flex items-center gap-2">
            <label className="font-medium">High Lift Only:</label>
            <input
              type="checkbox"
              checked={showHighLiftOnly}
              onChange={(e) => setShowHighLiftOnly(e.target.checked)}
              className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
            />
          </div>

          {/* Gray Coverage Filter */}
          <div className="flex items-center gap-2">
            <label className="font-medium">Gray Coverage:</label>
            <div className="flex items-center gap-1">
              <span className="text-sm">{grayCoverageRange[0]}%</span>
              <input
                type="range"
                min={0}
                max={100}
                value={grayCoverageRange[1]}
                onChange={(e) => setGrayCoverageRange([grayCoverageRange[0], parseInt(e.target.value)])}
                className="w-32"
              />
              <span className="text-sm">{grayCoverageRange[1]}%</span>
            </div>
          </div>
        </div>
      </div>

      {showGuide && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">How to Read the Shade Card</h2>
          <p className="mb-2">• Level (1-10): Indicates lightness, 1 being darkest and 10 being lightest</p>
          <p className="mb-2">• Tone (.0-.13): Indicates the shade's undertone</p>
          <p className="mb-2">• Undertone Indicators: 🔵 Cool | 🔴 Warm | ⚪ Neutral</p>
          <p>• ⚡ indicates a high-lift shade</p>
        </div>
      )}

      {/* Add legend tooltip button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowLegend(!showLegend)}
          className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
          title="Show Color Guide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      {/* Legend popup */}
      <AnimatePresence>
        {showLegend && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-4 bg-white rounded-lg shadow-xl p-4 w-72 z-50"
          >
            <h3 className="font-semibold mb-3">Color Guide</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span>Blue - Cool undertone</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span>Red - Warm undertone</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-300" />
                <span>Gray - Neutral undertone</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">⚡</span>
                <span>High-lift shade</span>
              </div>
              <div className="flex items-center gap-2">
                <span>★</span>
                <span>Favorite shade</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t text-sm text-gray-600">
              <p>Click any shade to see detailed information</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {searchQuery ? (
        // Show all matching results when searching
        <div className="space-y-4">
          {(() => {
            const series = SHADE_CARD_SERIES.find(series => series.id === 'natural');
            const allFilteredShades = filterShades(series?.shades)
              .sort((a, b) => {
                // First sort by level
                if (a.level !== b.level) {
                  return a.level - b.level;
                }
                // Then by primary tone within each level
                return a.primaryTone - b.primaryTone;
              });

            return (
              <div className="grid grid-cols-7 gap-4">
                {allFilteredShades.map((shade) => (
                  <motion.div
                    key={shade.id}
                    whileHover={{ 
                      scale: 1.08,
                      y: -5
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => handleShadeClick(shade, e)}
                    style={{ 
                      backgroundColor: shade.hexColor,
                    }}
                    className={`
                      shade-card relative flex flex-col h-28 cursor-pointer 
                      items-center justify-between rounded-2xl p-4
                      shadow-lg hover:shadow-xl
                      transition-all duration-300 ease-in-out
                      border-2 border-white/20
                      ${getContrastColor(shade.hexColor)}
                    `}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold">{shade.level}.{shade.primaryTone}</span>
                        {shade.isHighLift && (
                          <span title="High Lift" className="text-yellow-400 text-xl filter drop-shadow-md">⚡</span>
                        )}
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setFavorites(prev => 
                            prev.includes(shade.id)
                              ? prev.filter(id => id !== shade.id)
                              : [...prev, shade.id]
                          );
                        }}
                        className="text-xl transition-all duration-300 hover:scale-125 hover:rotate-12 filter drop-shadow-md"
                        title={favorites.includes(shade.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                      >
                        {favorites.includes(shade.id) ? '★' : '☆'}
                      </button>
                    </div>

                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <motion.div 
                        whileHover={{ scale: 1.2 }}
                        className="relative group"
                      >
                        <div 
                          className="w-4 h-4 rounded-full shadow-lg transition-transform duration-300"
                          style={{
                            background: getUndertoneColor(shade.undertone)
                          }}
                        />
                        <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-sm rounded whitespace-nowrap">
                          {shade.undertone}
                        </div>
                      </motion.div>
                    </div>

                    <div className="text-sm font-medium opacity-80 truncate max-w-full">
                      {shade.name}
                    </div>
                  </motion.div>
                ))}
              </div>
            );
          })()}
        </div>
      ) : (
        // Show original level-based view when not searching
        <div className="space-y-8">
          {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((level) => (
            <div key={level} className="flex">
              <div className="flex-shrink-0 w-20 h-20 bg-tan-400 rounded-lg mr-4 flex items-center justify-center">
                <span className="text-xl font-bold">Level {level}</span>
              </div>
              <div className="flex-1 grid grid-cols-7 gap-4">
                {(() => {
                  const series = SHADE_CARD_SERIES.find(series => series.id === 'natural');
                  const filteredShades = filterShades(
                    series?.shades.filter(shade => shade.level === level)
                  ).sort((a, b) => a.primaryTone - b.primaryTone);
                  
                  return filteredShades?.map((shade) => (
                    <motion.div
                      key={shade.id}
                      whileHover={{ 
                        scale: 1.08,
                        y: -5
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => handleShadeClick(shade, e)}
                      style={{ 
                        backgroundColor: shade.hexColor,
                      }}
                      className={`
                        shade-card relative flex flex-col h-28 cursor-pointer 
                        items-center justify-between rounded-2xl p-4
                        shadow-lg hover:shadow-xl
                        transition-all duration-300 ease-in-out
                        border-2 border-white/20
                        ${getContrastColor(shade.hexColor)}
                      `}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold">{level}.{shade.primaryTone}</span>
                          {shade.isHighLift && (
                            <span title="High Lift" className="text-yellow-400 text-xl filter drop-shadow-md">⚡</span>
                          )}
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setFavorites(prev => 
                              prev.includes(shade.id)
                                ? prev.filter(id => id !== shade.id)
                                : [...prev, shade.id]
                            );
                          }}
                          className="text-xl transition-all duration-300 hover:scale-125 hover:rotate-12 filter drop-shadow-md"
                          title={favorites.includes(shade.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                        >
                          {favorites.includes(shade.id) ? '★' : '☆'}
                        </button>
                      </div>

                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <motion.div 
                          whileHover={{ scale: 1.2 }}
                          className="relative group"
                        >
                          <div 
                            className="w-4 h-4 rounded-full shadow-lg transition-transform duration-300"
                            style={{
                              background: getUndertoneColor(shade.undertone)
                            }}
                          />
                          <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-sm rounded whitespace-nowrap">
                            {shade.undertone}
                          </div>
                        </motion.div>
                      </div>

                      <div className="text-sm font-medium opacity-80 truncate max-w-full">
                        {shade.name}
                      </div>
                    </motion.div>
                  ));
                })()}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Enhanced shade details popup */}
      <AnimatePresence>
        {selectedShade && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setSelectedShade(null)}
          >
            <motion.div
              className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{selectedShade.name}</h2>
                  <p className="text-gray-600">Level {selectedShade.level}.{selectedShade.primaryTone}</p>
                </div>
                <div 
                  className="w-12 h-12 rounded-lg"
                  style={{ backgroundColor: selectedShade.hexColor }}
                />
              </div>
              
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium">Characteristics</h3>
                  <ul className="mt-1 space-y-1 text-gray-600">
                    <li>• Undertone: {selectedShade.undertone}</li>
                    <li>• Gray Coverage: {selectedShade.coverage.gray}%</li>
                    {selectedShade.isHighLift && (
                      <li>• High-lift formula</li>
                    )}
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium">Best Suited For</h3>
                  <div className="mt-2 space-y-2">
                    {(() => {
                      const recommendations = getHairTypeRecommendations(selectedShade);
                      return (
                        <>
                          <div className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                              <span className="font-medium">Hair Texture:</span>
                              <p className="text-gray-600">{recommendations.texture.join(', ')}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                              <span className="font-medium">Porosity Level:</span>
                              <p className="text-gray-600">{recommendations.porosity.join(', ')}</p>
                            </div>
                          </div>

                          {recommendations.concerns.length > 0 && (
                            <div className="flex items-start gap-2">
                              <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <div>
                                <span className="font-medium">Special Considerations:</span>
                                <p className="text-gray-600">{recommendations.concerns.join(', ')}</p>
                              </div>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium">Formulation</h3>
                  <ul className="mt-1 space-y-1 text-gray-600">
                    <li>• Mix Ratio: {selectedShade.formulation.mixing.colorRatio}:{selectedShade.formulation.mixing.developerRatio}</li>
                    <li>• Processing Time: {selectedShade.formulation.processingTime.minimum}-{selectedShade.formulation.processingTime.maximum} minutes</li>
                    <li>• Developer: {selectedShade.formulation.developer.join('/')} Vol</li>
                  </ul>
                </div>

                <div className="pt-3 mt-3 border-t">
                  <button
                    onClick={() => {
                      setFavorites(prev => 
                        prev.includes(selectedShade.id)
                          ? prev.filter(id => id !== selectedShade.id)
                          : [...prev, selectedShade.id]
                      );
                    }}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {favorites.includes(selectedShade.id) 
                      ? 'Remove from Favorites'
                      : 'Add to Favorites'
                    }
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {selectedShade && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={() => setSelectedShade(null)}
          />
        )}
      </AnimatePresence>

      {compareMode && comparedShades.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
          <div className="max-w-7xl mx-auto grid grid-cols-3 gap-4">
            {comparedShades.map(shade => (
              <div 
                key={shade.id}
                className="p-4 rounded-lg"
                style={{ backgroundColor: shade.hexColor }}
              >
                <h3 className={`font-bold ${getContrastColor(shade.hexColor)}`}>
                  {shade.name} ({shade.level}.{shade.primaryTone})
                </h3>
                <p className={getContrastColor(shade.hexColor)}>
                  Processing Time: {shade.formulation.processingTime.minimum}-{shade.formulation.processingTime.maximum} min
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
