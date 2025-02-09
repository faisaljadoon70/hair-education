'use client';

import { useState } from 'react';
import MobileColorGrid from '../components/MobileColorGrid';
import MobileBottomSheet from '../components/MobileBottomSheet';

export default function MobileMixColorsContainer() {
  const [selectedLevels, setSelectedLevels] = useState<number[]>([]);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleLevelSelect = (level: number) => {
    if (selectedLevels.length < 2 && !selectedLevels.includes(level)) {
      setSelectedLevels([...selectedLevels, level]);
    }
  };

  const handleMixColors = () => {
    if (selectedLevels.length === 2) {
      setIsBottomSheetOpen(true);
    }
  };

  const handleCloseSheet = () => {
    setIsBottomSheetOpen(false);
    // Optionally clear selected colors when closing sheet
    setSelectedLevels([]);
  };

  return (
    <div className="relative h-full">
      <MobileColorGrid
        onLevelSelect={handleLevelSelect}
        selectedLevels={selectedLevels}
        onMixColors={handleMixColors}
      />
      {isBottomSheetOpen && (
        <MobileBottomSheet
          isOpen={isBottomSheetOpen}
          onClose={handleCloseSheet}
          selectedLevel={selectedLevels[0]}
          mixedWithLevel={selectedLevels[1]}
        />
      )}
    </div>
  );
}
