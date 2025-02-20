'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { levelColors } from '../levelwheel/levelData';
import { SHADE_CARD_SERIES, hairShades } from '../../data/shadeCardData';
import type { HairShade } from '../../types/shadeCard';
import type { LevelFormula } from './types';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../utils/supabase';
import { toast } from 'react-hot-toast';

const getToneIntensity = (toneName: string): number => {
  // Updated tone intensity calculation based on the new structure
  const intensityMap: { [key: string]: number } = {
    'Natural': 0,
    'Blue': 1,
    'Violet': 2,
    'Ash': 3,
    'Neutral': 4,
    'Warm': 5,
    'Red': 6,
    'Mahogany': 7,
    'Gold': 8,
    'Beige': 9,
    'Copper': 10,
    'Chocolate': 11,
    'Intense': 13
  };

  for (const [key, value] of Object.entries(intensityMap)) {
    if (toneName.includes(key)) {
      return value;
    }
  }
  return 0;
};

const getToneCategory = (toneName: string): string => {
  // Updated tone categories based on the new structure
  if (toneName.includes('Blue') || toneName.includes('Ash')) return 'cool';
  if (toneName.includes('Violet')) return 'cool-neutral';
  if (toneName.includes('Neutral')) return 'neutral';
  if (toneName.includes('Warm') || toneName.includes('Gold') || toneName.includes('Beige')) return 'warm';
  if (toneName.includes('Red') || toneName.includes('Copper') || toneName.includes('Mahogany')) return 'warm-intense';
  if (toneName.includes('Chocolate') || toneName.includes('Intense')) return 'intense';
  return 'natural';
};

const calculateDeveloperVolume = (
  startLevel: number, 
  targetLevel: number, 
  porosity: number,
  startTone: HairShade | null,
  targetTone: HairShade | null
): number => {
  // Base volume calculation based on level difference
  let baseVolume = (targetLevel - startLevel) * 10;
  
  // Adjust for tone intensity difference
  if (startTone && targetTone) {
    const startIntensity = getToneIntensity(startTone.name);
    const targetIntensity = getToneIntensity(targetTone.name);
    const intensityDiff = Math.abs(targetIntensity - startIntensity);
    
    // Add volume for significant tone changes
    if (intensityDiff > 5) {
      baseVolume += 5;
    }
  }
  
  // Adjust for porosity
  const porosityFactor = (porosity - 5) / 10;
  baseVolume = baseVolume * (1 + porosityFactor);
  
  // Round to nearest standard developer volume (10, 20, 30, 40)
  const standardVolumes = [10, 20, 30, 40];
  return standardVolumes.reduce((prev, curr) => 
    Math.abs(curr - baseVolume) < Math.abs(prev - baseVolume) ? curr : prev
  );
};

const calculateProcessingTime = (
  startLevel: number, 
  targetLevel: number, 
  porosity: number,
  startTone: HairShade | null,
  targetTone: HairShade | null
): number => {
  // Base processing time based on level difference
  let baseTime = Math.abs(targetLevel - startLevel) * 5;
  
  // Adjust for tone changes
  if (startTone && targetTone) {
    const startCategory = getToneCategory(startTone.name);
    const targetCategory = getToneCategory(targetTone.name);
    
    if (startCategory !== targetCategory) {
      baseTime += 5;
      
      // Additional time for dramatic changes
      if (
        (startCategory === 'cool' && targetCategory === 'warm-intense') ||
        (startCategory === 'warm-intense' && targetCategory === 'cool')
      ) {
        baseTime += 5;
      }
    }
  }
  
  // Adjust for porosity
  const porosityFactor = (porosity - 5) / 10;
  baseTime = baseTime * (1 - porosityFactor); // Less time for high porosity
  
  // Round to nearest 5 minutes and ensure minimum of 15 minutes
  return Math.max(15, Math.round(baseTime / 5) * 5);
};

const getMixingRatio = (
  developerVolume: number,
  startTone: HairShade | null,
  targetTone: HairShade | null
): string => {
  // Default ratio
  let ratio = '1:1';
  
  if (startTone && targetTone) {
    const startCategory = getToneCategory(startTone.name);
    const targetCategory = getToneCategory(targetTone.name);
    
    // Adjust ratio based on tone categories
    if (targetCategory === 'intense' || targetCategory === 'warm-intense') {
      ratio = '1:1.5'; // More developer for intense tones
    } else if (targetCategory === 'cool' && startCategory !== 'cool') {
      ratio = '1:2'; // More developer for cooling
    }
    
    // Special case for high volume developer
    if (developerVolume >= 30) {
      ratio = '1:2'; // Always use more developer with high volumes
    }
  }
  
  return ratio;
};

const getEducationalNotes = (
  startLevel: number,
  targetLevel: number,
  porosity: number,
  developerVol: number,
  processingTime: number,
  startTone: HairShade | null,
  targetTone: HairShade | null
) => {
  const levelDifference = Math.abs(targetLevel - startLevel);
  const notes = {
    developer: '',
    processing: '',
    mixing: '',
    additional: [] as string[]
  };

  // Developer Volume Notes
  const developerExplanation = [
    `${developerVol}vol developer is recommended because you're ${startLevel > targetLevel ? 'darkening' : 'lightening'} 
    the hair by ${levelDifference} level${levelDifference > 1 ? 's' : ''}.`,
    
    porosity <= 3 
      ? 'With low porosity hair, the cuticle layers are tightly packed, making it harder for the color to penetrate. A stronger developer helps open the cuticle for better color absorption.'
      : porosity >= 8
      ? 'High porosity hair has a more open cuticle structure, allowing color to penetrate easily. A gentler developer is chosen to protect the hair and prevent over-processing.'
      : 'Medium porosity allows for standard developer strength as the hair cuticle is in an optimal state for color absorption.',
    
    startTone && targetTone ? `Moving from ${startTone.name} to ${targetTone.name} ${
      getToneCategory(startTone.name) !== getToneCategory(targetTone.name) 
        ? 'requires careful consideration as we\'re changing between tone families (warm/cool/neutral).'
        : 'stays within the same tone family, allowing for a more predictable process.'
    }` : ''
  ].filter(Boolean).join(' ');

  notes.developer = developerExplanation;

  // Processing Time Notes
  const processingExplanation = [
    `${processingTime} minutes processing time is recommended based on several factors:`,
    
    `1. Level Change: ${
      levelDifference > 2 
        ? 'A significant level change requires extended processing to achieve desired results.'
        : 'A moderate level change allows for standard processing time.'
    }`,
    
    `2. Hair Porosity: ${
      porosity <= 3
        ? 'Low porosity hair needs more time as the color molecules take longer to penetrate the tightly closed cuticle.'
        : porosity >= 8
        ? 'High porosity hair processes more quickly due to its open cuticle structure. We reduce the time to prevent over-processing.'
        : 'Medium porosity allows for standard processing time as the cuticle is in an optimal state.'
    }`,
    
    startTone && targetTone ? `3. Tone Change: ${
      getToneCategory(startTone.name) !== getToneCategory(targetTone.name)
        ? 'Changing between tone families (warm/cool/neutral) requires additional processing time to ensure proper tone development.'
        : 'Staying within the same tone family allows for more predictable processing time.'
    }` : '',
    
    `4. Monitor the hair every 5-10 minutes during processing to ensure desired results.`
  ].filter(Boolean).join('\n');

  notes.processing = processingExplanation;

  // Mixing Ratio Notes
  const mixingRatio = getMixingRatio(developerVol, startTone, targetTone);
  const mixingExplanation = [
    `The ${mixingRatio} mixing ratio (color : developer) is selected based on:`,
    
    `1. Developer Volume: ${
      developerVol >= 30
        ? 'Higher developer volumes require more developer in the mixture to ensure proper consistency and even application.'
        : 'Lower developer volumes work best with an equal ratio for optimal color deposit.'
    }`,
    
    startTone && targetTone ? `2. Tone Intensity: ${
      getToneIntensity(targetTone.name) >= 2
        ? 'Fashion tones (like blue, violet, or red) require a stronger ratio to ensure proper color deposit and longevity.'
        : 'Natural tones work well with a standard ratio for predictable results.'
    }` : '',
    
    `3. Application Tips:
    - Mix thoroughly until a smooth, creamy consistency is achieved
    - Prepare enough mixture to ensure even coverage
    - Apply immediately after mixing for best results`
  ].filter(Boolean).join('\n');

  notes.mixing = mixingExplanation;

  // Additional Considerations
  if (porosity <= 3) {
    notes.additional.push(
      'Pre-Treatment Recommendation: Use a porosity equalizer or cuticle opener before color service. This helps achieve more even color absorption in low porosity hair.'
    );
  }
  if (porosity >= 8) {
    notes.additional.push(
      'Pre-Treatment Recommendation: Apply a protein treatment 3-7 days before chemical service. This helps strengthen the hair and prevent excessive color absorption.'
    );
  }
  if (levelDifference > 3) {
    notes.additional.push(
      'Multiple Sessions Required: A significant level change may need 2-3 sessions spaced 2-3 weeks apart to maintain hair integrity. Consider using bond builders during the process.'
    );
  }
  if (startLevel > targetLevel) {
    notes.additional.push(
      'Color Fill Process Required: When darkening hair by more than 2 levels, first apply a filler to replace the missing undertones. This ensures even, long-lasting color results.'
    );
  }
  if (startTone && targetTone && getToneCategory(startTone.name) !== getToneCategory(targetTone.name)) {
    notes.additional.push(
      `Tone Family Change: Moving from ${getToneCategory(startTone.name)} to ${getToneCategory(targetTone.name)} tones requires careful consideration of underlying pigments. Consider using a toner or glaze to achieve desired results.`
    );
  }

  return notes;
};

const getToneColor = (tone: number): string => {
  const toneColors: { [key: number]: string } = {
    0: '#666666', // Natural
    1: '#3b82f6', // Blue
    2: '#a855f7', // Violet
    3: '#6b7280', // Ash
    4: '#9ca3af', // Neutral
    5: '#ef4444', // Warm
    6: '#dc2626', // Red
    7: '#991b1b', // Mahogany
    8: '#f59e0b', // Gold
    9: '#fcd34d', // Beige
    10: '#ea580c', // Copper
    11: '#92400e', // Chocolate
    12: '#e9d5ff', // Pearl
    13: '#4b5563', // Intense
  };
  return toneColors[tone] || '#666666';
};

export const FormulaBuilder: React.FC = () => {
  const { user } = useAuth();
  
  // Formula Builder State
  const [startingLevel, setStartingLevel] = useState<number>(1);
  const [targetLevel, setTargetLevel] = useState<number>(1);
  const [currentPorosity, setCurrentPorosity] = useState<number>(5);
  const [startingShade, setStartingShade] = useState<HairShade | null>(null);
  const [targetShade, setTargetShade] = useState<HairShade | null>(null);
  const [savedFormulas, setSavedFormulas] = useState<LevelFormula[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCalculated, setIsCalculated] = useState(false);
  const [systemFormula, setSystemFormula] = useState<{
    developer_volume: number;
    processing_time: number;
    mixing_ratio: string;
  }>({
    developer_volume: 20,
    processing_time: 30,
    mixing_ratio: '1:1'
  });
  const [isNamingModalOpen, setIsNamingModalOpen] = useState(false);
  const [formulaName, setFormulaName] = useState('');

  // Clear shades when level changes
  const handleStartingLevelChange = (level: number) => {
    setStartingLevel(level);
    setStartingShade(null); // Clear selected shade when level changes
  };

  const handleTargetLevelChange = (level: number) => {
    setTargetLevel(level);
    setTargetShade(null); // Clear selected shade when level changes
  };

  // Load saved formulas on mount
  useEffect(() => {
    if (user) {
      fetchSavedFormulas();
    }
  }, [user]);

  const fetchSavedFormulas = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('saved_formulas')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedFormulas(data || []);
    } catch (error) {
      console.error('Error fetching formulas:', error);
      toast.error('Failed to load saved formulas');
    }
  };

  const loadFormula = async (formula: LevelFormula) => {
    try {
      // First set the levels to trigger shade updates
      setStartingLevel(formula.starting_level);
      setTargetLevel(formula.target_level);
      setCurrentPorosity(formula.hair_porosity);

      // Wait for next render to ensure shade lists are updated
      await new Promise(resolve => setTimeout(resolve, 0));

      // Find and set the tones from the updated shade lists
      const startTone = getShadesByLevel(formula.starting_level)
        .find(shade => shade.name === formula.starting_tone);
      const targetTone = getShadesByLevel(formula.target_level)
        .find(shade => shade.name === formula.target_tone);

      if (!startTone || !targetTone) {
        throw new Error('Could not find matching tones');
      }

      setStartingShade(startTone);
      setTargetShade(targetTone);

      // Set the system formula values
      setSystemFormula({
        developer_volume: formula.developer_volume,
        processing_time: formula.processing_time,
        mixing_ratio: formula.mixing_ratio
      });

      setIsCalculated(true);
      toast.success('Formula loaded successfully');
    } catch (error) {
      console.error('Error loading formula:', error);
      toast.error('Failed to load formula. Some tone information might be missing.');
    }
  };

  const saveFormula = async (formulaName: string) => {
    if (!user || !startingShade || !targetShade) {
      toast.error('Please select all required values');
      return;
    }

    if (savedFormulas.length >= 3) {
      toast.error('Maximum limit of 3 formulas reached! Please delete an existing formula before saving a new one.', 
        { duration: 5000 }  // Show for 5 seconds
      );
      return;
    }

    try {
      const formula = {
        user_id: user.id,
        name: formulaName.trim(),
        starting_level: Number(startingLevel),
        target_level: Number(targetLevel),
        starting_tone: startingShade.name,
        target_tone: targetShade.name,
        developer_volume: Number(systemFormula.developer_volume),
        processing_time: Number(systemFormula.processing_time),
        mixing_ratio: systemFormula.mixing_ratio,
        hair_porosity: Number(currentPorosity),
        is_custom: false,
        original_formula_id: null,
        custom_developer_volume: null,
        custom_processing_time: null,
        custom_mixing_ratio: null,
        custom_notes: null,
        subscription_tier: 'free',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('saved_formulas')
        .insert([formula]);

      if (error) throw error;

      await fetchSavedFormulas();
      toast.success('Formula saved successfully!');
      setFormulaName('');
      setIsNamingModalOpen(false);
    } catch (error: any) {
      console.error('Error saving formula:', error);
      toast.error(error.message || 'Failed to save formula');
    }
  };

  const handleSaveClick = () => {
    setFormulaName('');
    setIsNamingModalOpen(true);
  };

  const handleSaveFormula = async () => {
    if (!formulaName.trim()) {
      toast.error('Please enter a name for your formula');
      return;
    }

    await saveFormula(formulaName);
    setIsNamingModalOpen(false);
  };

  const clearFormula = () => {
    setStartingLevel(1);
    setTargetLevel(1);
    setCurrentPorosity(5);
    setStartingShade(null);
    setTargetShade(null);
    setIsCalculated(false);
    setSystemFormula({
      developer_volume: 20,
      processing_time: 30,
      mixing_ratio: '1:1'
    });
  };

  const calculateFormula = () => {
    if (!startingShade || !targetShade) {
      toast.error('Please select both starting and target tones');
      return;
    }

    const developer_volume = calculateDeveloperVolume(
      startingLevel, 
      targetLevel, 
      currentPorosity,
      startingShade,
      targetShade
    );
    
    const processing_time = calculateProcessingTime(
      startingLevel, 
      targetLevel, 
      currentPorosity,
      startingShade,
      targetShade
    );
    
    const mixing_ratio = getMixingRatio(
      developer_volume,
      startingShade,
      targetShade
    );

    setSystemFormula({
      developer_volume,
      processing_time,
      mixing_ratio
    });
    setIsCalculated(true);
    toast.success('Formula calculated! Review and save if desired.');
  };

  const getShadesByLevel = (level: number): HairShade[] => {
    // Only get shades from the natural series that match the level
    return hairShades.filter(shade => shade.level === level && shade.series === 'natural');
  };

  const renderShadeGrid = (level: number, selectedShade: HairShade | null, onSelect: (shade: HairShade) => void) => {
    // Get only shades for the specific level
    const shades = getShadesByLevel(level);
    
    return (
      <div className="grid grid-cols-7 gap-2 p-4 bg-gray-50 rounded-lg">
        {shades.map(shade => (
          <motion.div
            key={shade.id}
            whileHover={{ scale: 1.02 }}
            onClick={() => onSelect(shade)}
            className={`relative cursor-pointer rounded-lg p-3 flex flex-col items-center justify-between min-h-[80px] shadow-sm border border-gray-200/20 hover:shadow-md transition-all duration-200 ${
              selectedShade?.id === shade.id ? 'ring-2 ring-pink-500 shadow-lg' : ''
            }`}
            style={{
              backgroundColor: shade.hexColor,
              transition: 'all 0.2s ease-in-out'
            }}
          >
            {/* Tone Number */}
            <div className="absolute top-1 left-1 text-xs text-white/80">
              {shade.id}
            </div>

            {/* Tone Indicator */}
            <div className="absolute top-2 right-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: getToneColor(shade.tone),
                  border: '1px solid rgba(255,255,255,0.3)'
                }}
              />
            </div>

            {/* Shade Name */}
            <div 
              className={`text-xs font-medium text-center leading-tight mt-2 ${
                level <= 5 ? 'text-white/90' : 'text-gray-800/90'
              }`}
            >
              {shade.name}
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  const deleteFormula = async (id: string) => {
    try {
      const { error } = await supabase
        .from('saved_formulas')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSavedFormulas(prev => prev.filter(f => f.id !== id));
      toast.success('Formula deleted successfully');
    } catch (error) {
      console.error('Error deleting formula:', error);
      toast.error('Failed to delete formula');
    }
  };

  return (
    <div className="flex flex-1 gap-8 p-6">
      {/* Quick Navigation */}
      <div className="w-1/5">
        <h3 className="text-xl font-bold mb-6">Quick Navigation</h3>
        <div className="space-y-4">
          {Array.from({length: 10}, (_, i) => i + 1).map(level => (
            <div
              key={level}
              onClick={() => setStartingLevel(level)}
              className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-100/50 ${startingLevel === level ? 'bg-gray-100/50 ring-1 ring-gray-200' : ''}`}
            >
              <div
                className="w-10 h-10 rounded-full shadow-md flex-shrink-0"
                style={{
                  backgroundColor: level <= 5 
                    ? `rgb(${Math.max(30, 50 - level * 8)}, ${Math.max(25, 45 - level * 8)}, ${Math.max(20, 40 - level * 8)})` 
                    : `rgb(${140 + (level-5) * 12}, ${110 + (level-5) * 12}, ${90 + (level-5) * 12})`
                }}
              />
              <span className="text-base font-medium text-gray-700">Level {level}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Formula Builder Section */}
      <div className="w-3/5 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Formula Builder</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Starting Level</label>
            <select 
              value={startingLevel}
              onChange={(e) => handleStartingLevelChange(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            >
              {Array.from({length: 10}, (_, i) => i + 1).map(level => (
                <option key={level} value={level}>Level {level}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Starting Tone</label>
            {renderShadeGrid(startingLevel, startingShade, setStartingShade)}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Target Level</label>
            <select 
              value={targetLevel}
              onChange={(e) => handleTargetLevelChange(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            >
              {Array.from({length: 10}, (_, i) => i + 1).map(level => (
                <option key={level} value={level}>Level {level}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Target Tone</label>
            {renderShadeGrid(targetLevel, targetShade, setTargetShade)}
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

          {isCalculated && (
            <div className="mt-6 space-y-4">
              <div className="bg-white rounded-lg">
                <h3 className="font-medium mb-2">Formula Details:</h3>
                <div className="text-sm">
                  <div className="mb-2">
                    <span className="font-medium">Starting Level and Tone: </span>
                    {startingLevel} {startingShade && `(${startingShade.name})`}
                  </div>
                  <div>
                    <span className="font-medium">Target Level and Tone: </span>
                    {targetLevel} {targetShade && `(${targetShade.name})`}
                  </div>
                </div>

                {/* Developer Volume Section */}
                <div className="mt-6">
                  <div className="mb-2">
                    <span className="font-medium">Developer Volume: </span>
                    <span className="text-pink-600">{systemFormula.developer_volume}vol</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {getEducationalNotes(
                      startingLevel,
                      targetLevel,
                      currentPorosity,
                      systemFormula.developer_volume,
                      systemFormula.processing_time,
                      startingShade,
                      targetShade
                    ).developer}
                  </p>
                </div>

                {/* Processing Time Section */}
                <div className="mt-4">
                  <div className="mb-2">
                    <span className="font-medium">Processing Time: </span>
                    <span className="text-pink-600">{systemFormula.processing_time} minutes</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {getEducationalNotes(
                      startingLevel,
                      targetLevel,
                      currentPorosity,
                      systemFormula.developer_volume,
                      systemFormula.processing_time,
                      startingShade,
                      targetShade
                    ).processing}
                  </p>
                </div>

                {/* Mixing Ratio Section */}
                <div className="mt-4">
                  <div className="mb-2">
                    <span className="font-medium">Mixing Ratio: </span>
                    <span className="text-pink-600">{systemFormula.mixing_ratio}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {getEducationalNotes(
                      startingLevel,
                      targetLevel,
                      currentPorosity,
                      systemFormula.developer_volume,
                      systemFormula.processing_time,
                      startingShade,
                      targetShade
                    ).mixing}
                  </p>
                </div>

                {/* Important Considerations */}
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Important Considerations:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                    {getEducationalNotes(
                      startingLevel,
                      targetLevel,
                      currentPorosity,
                      systemFormula.developer_volume,
                      systemFormula.processing_time,
                      startingShade,
                      targetShade
                    ).additional.map((note, index) => (
                      <li key={index}>{note}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex gap-4">
                  <button
                    onClick={handleSaveClick}
                    disabled={isLoading}
                    className="flex-1 bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 disabled:bg-pink-300 disabled:cursor-not-allowed"
                  >
                    Save Formula
                  </button>
                  <button
                    onClick={clearFormula}
                    disabled={isLoading}
                    className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          )}
          {!isCalculated && (
            <button
              onClick={calculateFormula}
              disabled={!startingShade || !targetShade}
              className="w-full mt-6 bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 disabled:bg-pink-300 disabled:cursor-not-allowed"
            >
              Calculate Formula
            </button>
          )}
        </div>
      </div>

      {/* Saved Formulas */}
      <div className="w-1/4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Saved Formulas</h3>
          <span className="text-sm text-gray-600">
            {savedFormulas.length}/3 Saved
          </span>
        </div>
        
        {savedFormulas.length === 0 ? (
          <p className="text-gray-500 text-sm">No saved formulas yet. You can save up to 3 formulas.</p>
        ) : (
          <div className="space-y-4">
            {savedFormulas.map((formula) => (
              <div 
                key={formula.id} 
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => loadFormula(formula)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{formula.name}</h3>
                    <p className="text-sm text-gray-600">
                      Starting: Level {formula.starting_level} ({formula.starting_tone})
                    </p>
                    <p className="text-sm text-gray-600">
                      Target: Level {formula.target_level} ({formula.target_tone})
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteFormula(formula.id);
                    }}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {savedFormulas.length === 3 && (
              <p className="text-sm text-gray-600 mt-4">
                Maximum formulas reached. Delete an existing formula to save a new one.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Naming Modal */}
      {isNamingModalOpen && (
        <React.Fragment>
          <div className="fixed inset-0 bg-black/30" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm">
              <h2 className="text-lg font-medium mb-4">Name Your Formula</h2>
              <input
                type="text"
                value={formulaName}
                onChange={(e) => setFormulaName(e.target.value)}
                className="w-full rounded-md border-gray-300 mb-4"
                placeholder="Enter formula name"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsNamingModalOpen(false)}
                  className="px-4 py-2 text-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveFormula}
                  className="px-4 py-2 bg-pink-600 text-white rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};
