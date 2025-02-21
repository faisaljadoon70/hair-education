'use client';

import { useState } from 'react';
import MobileLevelGrid from '../shadecard/MobileLevelGrid';

interface MobileShadeCardPageProps {
  selectedLevel?: number | null;
  onLevelSelect?: (level: number) => void;
}

export default function MobileShadeCardPage({
  selectedLevel: propSelectedLevel,
  onLevelSelect: propOnLevelSelect,
}: MobileShadeCardPageProps) {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(propSelectedLevel || null);

  const handleLevelSelect = (level: number) => {
    setSelectedLevel(level);
    if (propOnLevelSelect) {
      propOnLevelSelect(level);
    }
  };

  return (
    <div className="h-full bg-white">
      <MobileLevelGrid 
        selectedLevel={selectedLevel}
        onLevelSelect={handleLevelSelect}
      />
    </div>
  );
}
