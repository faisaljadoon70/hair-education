import { useState } from 'react';

interface Shade {
  id: string;
  name: string;
  level: number;
  tone: string;
  color: string;
}

// Move shades outside the hook to avoid recreating on every render
const ALL_SHADES: Shade[] = [
  // Level 10 shades
  { id: '10.0', name: 'Natural', level: 10, tone: 'Natural', color: '#F2E6D8' },
  { id: '10.1', name: 'Blue', level: 10, tone: 'Ash', color: '#E6E6E6' },
  { id: '10.2', name: 'Violet', level: 10, tone: 'Violet', color: '#E6D8E6' },
  { id: '10.3', name: 'Gold', level: 10, tone: 'Gold', color: '#F2D8B2' },
  
  // Level 9 shades
  { id: '9.0', name: 'Natural', level: 9, tone: 'Natural', color: '#E6D8C4' },
  { id: '9.1', name: 'Blue', level: 9, tone: 'Ash', color: '#D8D8D8' },
  { id: '9.2', name: 'Violet', level: 9, tone: 'Violet', color: '#D8C4D8' },
  { id: '9.3', name: 'Gold', level: 9, tone: 'Gold', color: '#E6C49B' },
  
  // Level 8 shades
  { id: '8.0', name: 'Natural', level: 8, tone: 'Natural', color: '#D8C4B2' },
  { id: '8.1', name: 'Blue', level: 8, tone: 'Ash', color: '#C4C4C4' },
  { id: '8.2', name: 'Violet', level: 8, tone: 'Violet', color: '#C4B2C4' },
  { id: '8.3', name: 'Gold', level: 8, tone: 'Gold', color: '#D8B287' },

  // Level 7 shades
  { id: '7.0', name: 'Natural', level: 7, tone: 'Natural', color: '#C4B29B' },
  { id: '7.1', name: 'Blue', level: 7, tone: 'Ash', color: '#B2B2B2' },
  { id: '7.2', name: 'Violet', level: 7, tone: 'Violet', color: '#B29BB2' },
  { id: '7.3', name: 'Gold', level: 7, tone: 'Gold', color: '#C49B73' },

  // Level 6 shades
  { id: '6.0', name: 'Natural', level: 6, tone: 'Natural', color: '#B29B87' },
  { id: '6.1', name: 'Blue', level: 6, tone: 'Ash', color: '#9B9B9B' },
  { id: '6.2', name: 'Violet', level: 6, tone: 'Violet', color: '#9B879B' },
  { id: '6.3', name: 'Gold', level: 6, tone: 'Gold', color: '#B28760' },

  // Level 5 shades
  { id: '5.0', name: 'Natural', level: 5, tone: 'Natural', color: '#9B8773' },
  { id: '5.1', name: 'Blue', level: 5, tone: 'Ash', color: '#878787' },
  { id: '5.2', name: 'Violet', level: 5, tone: 'Violet', color: '#876087' },
  { id: '5.3', name: 'Gold', level: 5, tone: 'Gold', color: '#9B734D' },

  // Level 4 shades
  { id: '4.0', name: 'Natural', level: 4, tone: 'Natural', color: '#876049' },
  { id: '4.1', name: 'Blue', level: 4, tone: 'Ash', color: '#604949' },
  { id: '4.2', name: 'Violet', level: 4, tone: 'Violet', color: '#604960' },
  { id: '4.3', name: 'Gold', level: 4, tone: 'Gold', color: '#875E3D' },

  // Level 3 shades
  { id: '3.0', name: 'Natural', level: 3, tone: 'Natural', color: '#604936' },
  { id: '3.1', name: 'Blue', level: 3, tone: 'Ash', color: '#493636' },
  { id: '3.2', name: 'Violet', level: 3, tone: 'Violet', color: '#493649' },
  { id: '3.3', name: 'Gold', level: 3, tone: 'Gold', color: '#60492D' },

  // Level 2 shades
  { id: '2.0', name: 'Natural', level: 2, tone: 'Natural', color: '#493624' },
  { id: '2.1', name: 'Blue', level: 2, tone: 'Ash', color: '#362424' },
  { id: '2.2', name: 'Violet', level: 2, tone: 'Violet', color: '#362436' },
  { id: '2.3', name: 'Gold', level: 2, tone: 'Gold', color: '#49361D' },

  // Level 1 shades
  { id: '1.0', name: 'Natural', level: 1, tone: 'Natural', color: '#241D12' },
  { id: '1.1', name: 'Blue', level: 1, tone: 'Ash', color: '#121212' },
  { id: '1.2', name: 'Violet', level: 1, tone: 'Violet', color: '#1D121D' },
  { id: '1.3', name: 'Gold', level: 1, tone: 'Gold', color: '#241D0C' },
];

export const useShadeCard = () => {
  const getShadesByLevel = (level: number) => {
    const filteredShades = ALL_SHADES.filter(shade => shade.level === level);
    console.log('Getting shades for level:', level, filteredShades);
    return filteredShades;
  };

  return {
    shades: ALL_SHADES,
    getShadesByLevel,
  };
};
