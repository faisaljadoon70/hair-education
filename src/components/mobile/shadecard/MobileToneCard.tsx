'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import MobileToneDetailsSheet from './MobileToneDetailsSheet';

interface ToneCardProps {
  toneNumber: string;
  name: string;
  hexColor: string;
}

// Mapping of tone names to their underlying tone colors
const TONE_COLORS = {
  // Level 1 Tones
  'Blue Black': '#0000FF',
  'Violet Black': '#800080',
  'Ash Black': '#808080',
  'Neutral Black': '#404040',
  'Warm Black': '#8B4513',
  'Red Black': '#FF0000',
  'Mahogany Black': '#800000',
  'Gold Black': '#FFD700',
  'Beige Black': '#F5F5DC',
  'Copper Black': '#B87333',
  'Chocolate Black': '#D2691E',
  'Mocha Black': '#8B4513',
  'Darkest Brown': '#654321',
  'Natural Black': '#000000',
  
  // Level 2 Tones
  'Natural Darkest Brown': '#000000',
  'Blue Darkest Brown': '#0000FF',
  'Violet Darkest Brown': '#800080',
  'Ash Darkest Brown': '#808080',
  'Neutral Darkest Brown': '#404040',
  'Warm Darkest Brown': '#8B4513',
  'Red Darkest Brown': '#FF0000',
  'Mahogany Darkest Brown': '#800000',
  'Gold Darkest Brown': '#FFD700',
  'Beige Darkest Brown': '#F5F5DC',
  'Copper Darkest Brown': '#B87333',
  'Chocolate Darkest Brown': '#D2691E',
  'Mocha Darkest Brown': '#8B4513',
  'Dark Brown': '#654321'
};

export default function MobileToneCard({ toneNumber, name, hexColor }: ToneCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  // Get the underlying tone color based on the name
  const toneColor = TONE_COLORS[name] || '#FFFFFF';

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex-shrink-0 rounded-lg p-2.5 shadow-lg cursor-pointer active:scale-95 transition-transform"
        style={{ backgroundColor: hexColor }}
        onClick={() => setShowDetails(true)}
      >
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: toneColor }}
            />
            <span className="text-white text-xs font-medium">{toneNumber}</span>
          </div>
        </div>
        <div className="text-white text-xs opacity-80 truncate">{name}</div>
      </motion.div>

      <MobileToneDetailsSheet
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        toneNumber={toneNumber}
        name={name}
        hexColor={hexColor}
      />
    </>
  );
}
