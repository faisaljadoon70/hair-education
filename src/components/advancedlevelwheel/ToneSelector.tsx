import React, { useState } from 'react';
import { HAIR_TONES, ToneDefinition, HairTone, calculateFinalColor } from '../../types/colorSystem';
import { motion } from 'framer-motion';
import { InformationCircleIcon, BeakerIcon, LightBulbIcon } from '@heroicons/react/24/outline';

interface ToneSelectorProps {
  selectedTone: HairTone | null;
  onToneSelect: (tone: HairTone) => void;
  level: number;
}

// Group tones by temperature
const TONE_GROUPS = {
  neutral: ['0'],
  cool: ['1', '2', '7', '8', '9'],
  warm: ['3', '4', '5', '6']
};

export const ToneSelector: React.FC<ToneSelectorProps> = ({
  selectedTone,
  onToneSelect,
  level
}) => {
  const [showToneInfo, setShowToneInfo] = useState<string | null>(null);
  const [showPresets, setShowPresets] = useState(false);

  const COMMON_PRESETS = [
    { name: 'Natural', primary: '0' },
    { name: 'Ash', primary: '1' },
    { name: 'Cool Violet', primary: '2', secondary: '1' },
    { name: 'Warm Gold', primary: '3', secondary: '4' },
    { name: 'Rich Copper', primary: '4', secondary: '3' },
    { name: 'Vibrant Red', primary: '6', secondary: '5' }
  ];

  const handlePresetSelect = (preset: typeof COMMON_PRESETS[0]) => {
    const primary = HAIR_TONES[preset.primary];
    const secondary = preset.secondary ? HAIR_TONES[preset.secondary] : undefined;
    
    onToneSelect({
      primary,
      secondary,
      intensity: 7
    });
  };

  const renderToneButton = (tone: ToneDefinition, isSecondary: boolean = false) => {
    const isSelected = isSecondary 
      ? selectedTone?.secondary?.code === tone.code
      : selectedTone?.primary?.code === tone.code;

    return (
      <motion.button
        key={tone.code}
        onClick={() => isSecondary ? handleSecondaryToneSelect(tone) : handlePrimaryToneSelect(tone)}
        onMouseEnter={() => setShowToneInfo(tone.code)}
        onMouseLeave={() => setShowToneInfo(null)}
        className={`relative p-3 rounded-lg transition-all ${
          isSelected
            ? 'ring-2 ring-pink-500 shadow-lg'
            : 'hover:shadow-md'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div 
          className="absolute inset-0 rounded-lg opacity-80"
          style={{
            background: `linear-gradient(135deg, ${tone.hexColor}, ${calculateFinalColor(level, { primary: tone, intensity: 7 })})`
          }}
        />
        <div className="relative z-10 text-center">
          <div className="font-medium" style={{ color: parseInt(tone.hexColor.slice(1), 16) > 0xffffff / 2 ? '#000' : '#fff' }}>
            {tone.name}
          </div>
          <div className="text-xs opacity-75" style={{ color: parseInt(tone.hexColor.slice(1), 16) > 0xffffff / 2 ? '#000' : '#fff' }}>
            {level}.{tone.code}
          </div>
        </div>
        
        {showToneInfo === tone.code && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute z-20 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-white rounded-lg shadow-lg text-sm"
          >
            <div className="font-medium mb-1">{tone.name}</div>
            <div className="text-gray-600 text-xs">{tone.description}</div>
          </motion.div>
        )}
      </motion.button>
    );
  };

  const handlePrimaryToneSelect = (tone: ToneDefinition) => {
    onToneSelect({
      primary: tone,
      intensity: selectedTone?.intensity || 7
    });
  };

  const handleSecondaryToneSelect = (tone: ToneDefinition) => {
    if (!selectedTone) return;
    
    onToneSelect({
      ...selectedTone,
      secondary: selectedTone.secondary?.code === tone.code ? undefined : tone
    });
  };

  return (
    <div className="space-y-6">
      {/* Quick Presets */}
      <div>
        <button
          onClick={() => setShowPresets(!showPresets)}
          className="flex items-center space-x-2 text-sm text-gray-600 hover:text-pink-600"
        >
          <LightBulbIcon className="h-4 w-4" />
          <span>Quick Presets</span>
        </button>
        
        {showPresets && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="mt-2 grid grid-cols-3 gap-2"
          >
            {COMMON_PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => handlePresetSelect(preset)}
                className="p-2 text-sm bg-gray-50 rounded-lg hover:bg-pink-50"
              >
                {preset.name}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Primary Tone */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">Primary Tone</label>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <InformationCircleIcon className="h-4 w-4" />
            <span>Hover for details</span>
          </div>
        </div>
        
        {/* Cool Tones */}
        <div className="space-y-2">
          <div className="text-xs font-medium text-gray-500">Cool Tones</div>
          <div className="grid grid-cols-5 gap-2">
            {TONE_GROUPS.cool.map(code => renderToneButton(HAIR_TONES[code]))}
          </div>
        </div>

        {/* Neutral Tones */}
        <div className="mt-4 space-y-2">
          <div className="text-xs font-medium text-gray-500">Neutral</div>
          <div className="grid grid-cols-5 gap-2">
            {TONE_GROUPS.neutral.map(code => renderToneButton(HAIR_TONES[code]))}
          </div>
        </div>

        {/* Warm Tones */}
        <div className="mt-4 space-y-2">
          <div className="text-xs font-medium text-gray-500">Warm Tones</div>
          <div className="grid grid-cols-5 gap-2">
            {TONE_GROUPS.warm.map(code => renderToneButton(HAIR_TONES[code]))}
          </div>
        </div>
      </div>

      {/* Secondary Tone */}
      {selectedTone && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">Secondary Tone (Optional)</label>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <BeakerIcon className="h-4 w-4" />
              <span>Mix with primary</span>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {Object.values(HAIR_TONES).map(tone => renderToneButton(tone, true))}
          </div>
        </div>
      )}

      {/* Tone Intensity */}
      {selectedTone && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tone Intensity</label>
          <input
            type="range"
            min="1"
            max="10"
            value={selectedTone.intensity}
            onChange={(e) => onToneSelect({ ...selectedTone, intensity: Number(e.target.value) })}
            className="w-full accent-pink-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Subtle</span>
            <span>Intense</span>
          </div>
        </div>
      )}

      {/* Selected Tone Preview */}
      {selectedTone && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-sm mb-3">Selected Tone Preview</h4>
          <div className="flex items-center space-x-4">
            <div 
              className="w-16 h-16 rounded-lg shadow-inner"
              style={{ 
                background: calculateFinalColor(level, selectedTone)
              }}
            />
            <div className="space-y-1">
              <div className="font-medium">Level {level}</div>
              <div className="text-sm text-gray-600">
                {selectedTone.primary.name}
                {selectedTone.secondary && ` + ${selectedTone.secondary.name}`}
              </div>
              <div className="text-xs text-gray-500">
                Intensity: {selectedTone.intensity}/10
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
