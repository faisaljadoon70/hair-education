'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MobileTonesBottomSheet from './MobileTonesBottomSheet';

interface LevelCircleProps {
  level: number;
  isSelected: boolean;
  baseColor: string;
  onClick: () => void;
}

const LevelCircle = ({ level, isSelected, baseColor, onClick }: LevelCircleProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        w-12 h-12 rounded-full flex items-center justify-center
        ${isSelected ? 'ring-2 ring-pink-500 ring-offset-2' : 'ring-1 ring-gray-200'}
        transition-all duration-200 shadow-sm
      `}
      style={{ backgroundColor: baseColor }}
    >
      <span className="text-white font-medium text-base drop-shadow-sm">
        {level}
      </span>
    </motion.button>
  );
};

const Tooltip = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg text-sm"
  >
    Click a level to see its tones
    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 
      border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-800"/>
  </motion.div>
);

interface MobileLevelGridProps {
  onLevelSelect?: (level: number) => void;
  selectedLevel?: number | null;
}

// Professional hair color levels with their natural names and colors
const LEVEL_DATA = {
  10: { color: '#C29F9F', name: 'Lightest Blonde' },
  9: { color: '#AE8F8F', name: 'Natural Very Light Blonde' },
  8: { color: '#9A7F7F', name: 'Light Blonde' },
  7: { color: '#866F6F', name: 'Natural Medium Blonde' },
  6: { color: '#725F5F', name: 'Natural Dark Blonde' },
  5: { color: '#5E4F4F', name: 'Natural Light Brown' },
  4: { color: '#4A3F3F', name: 'Natural Medium Brown' },
  3: { color: '#362F2F', name: 'Natural Dark Brown' },
  2: { color: '#2A1F1F', name: 'Natural Darkest Brown' },
  1: { color: '#0F0F0F', name: 'Natural Black' },
};

export default function MobileLevelGrid({ onLevelSelect, selectedLevel }: MobileLevelGridProps) {
  const [showTooltip, setShowTooltip] = useState(true);
  const [selectedLevelData, setSelectedLevelData] = useState<{ level: number; name: string } | null>(null);
  
  useEffect(() => {
    const hasInteracted = localStorage.getItem('shadecard_interaction');
    if (hasInteracted) {
      setShowTooltip(false);
    }
  }, []);

  const handleLevelSelect = (level: number) => {
    setSelectedLevelData({ level, name: LEVEL_DATA[level].name });
    setShowTooltip(false);
    localStorage.setItem('shadecard_interaction', 'true');
    if (onLevelSelect) {
      onLevelSelect(level);
    }
  };

  const handleCloseBottomSheet = () => {
    setSelectedLevelData(null);
  };

  return (
    <div className="w-full">
      <div className="text-center py-4">
        <h1 className="text-xl font-medium text-gray-900">Professional Shade Card</h1>
      </div>
      <div className="pl-2 py-2">
        <div className="flex flex-col gap-3">
          {Object.entries(LEVEL_DATA)
            .sort(([a], [b]) => parseInt(b) - parseInt(a)) // Sort from 10 to 1
            .map(([level, data]) => (
              <div key={level} className="flex items-center relative">
                <AnimatePresence>
                  {showTooltip && level === '10' && <Tooltip />}
                </AnimatePresence>
                <LevelCircle
                  level={parseInt(level)}
                  baseColor={data.color}
                  isSelected={selectedLevelData?.level === parseInt(level)}
                  onClick={() => handleLevelSelect(parseInt(level))}
                />
                <div className="ml-3 flex items-center">
                  <span className="text-sm font-medium text-gray-600 w-14">
                    Level {level}
                  </span>
                  <span className="text-sm text-gray-500">
                    {data.name}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>

      <MobileTonesBottomSheet
        isOpen={selectedLevelData !== null}
        onClose={handleCloseBottomSheet}
        level={selectedLevelData?.level || 0}
        levelName={selectedLevelData?.name || ''}
      />
    </div>
  );
}
