'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import MobileWheelComponent from '../components/MobileWheelComponent';
import MobileBottomSheet from '../components/MobileBottomSheet';
import MobileColorGrid from '../components/MobileColorGrid';
import MobileHeader from '../navigation/MobileHeader';
import { useRouter } from 'next/navigation';

type ViewMode = 'wheel' | 'mix';

export default function MobileLevelWheelPage() {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('wheel');
  const [selectedMixLevels, setSelectedMixLevels] = useState<number[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const router = useRouter();

  // Close menus when clicking outside
  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.menu-button')) {
      setIsMenuOpen(false);
      setIsOptionsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Handle menu state changes
  const handleMenuChange = (menu: 'view' | 'options' | null) => {
    if (menu === 'view') {
      setIsMenuOpen(true);
      setIsOptionsOpen(false);
    } else if (menu === 'options') {
      setIsMenuOpen(false);
      setIsOptionsOpen(true);
    } else {
      setIsMenuOpen(false);
      setIsOptionsOpen(false);
    }
  };

  // Handle opening view menu (Level Wheel dropdown)
  const handleViewMenuOpen = () => {
    handleMenuChange('view');
  };

  // Handle opening options menu (three dots)
  const handleOptionsMenuOpen = () => {
    handleMenuChange('options');
  };

  // Handle closing both menus
  const handleCloseMenus = () => {
    handleMenuChange(null);
  };

  const handleLevelClick = (level: number) => {
    if (viewMode === 'wheel') {
      setSelectedLevel(level);
      setIsBottomSheetOpen(true);
    } else {
      // In mix mode, add to selected levels
      if (selectedMixLevels.length < 2 && !selectedMixLevels.includes(level)) {
        setSelectedMixLevels([...selectedMixLevels, level]);
      }
    }
  };

  const handleMixColors = () => {
    if (selectedMixLevels.length === 2) {
      setSelectedLevel(selectedMixLevels[0]);
      setIsBottomSheetOpen(true);
    }
  };

  const handleCloseSheet = () => {
    setIsBottomSheetOpen(false);
    if (viewMode === 'mix') {
      setSelectedMixLevels([]); // Clear selected colors after mixing
    }
  };

  const handleViewChange = (newMode: ViewMode) => {
    setViewMode(newMode);
    setSelectedMixLevels([]);
    setIsBottomSheetOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-white">
      <MobileHeader isHomePage={false} />
      
      <main className="px-4 pt-16">
        {/* Top Controls */}
        <div className="flex items-center justify-between mb-4">
          {/* View Selector */}
          <div className="relative flex-1 max-w-[200px]">
            <button 
              className="menu-button flex items-center justify-between w-full text-sm px-3 py-2 border rounded-lg hover:bg-gray-50"
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
                setIsOptionsOpen(false);
              }}
            >
              {viewMode === 'wheel' ? 'Level Wheel' : 'Mix Colors'}
              <ChevronDownIcon className="w-5 h-5 ml-2" />
            </button>
            {isMenuOpen && (
              <div className="absolute left-0 mt-2 w-48 origin-top-left bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <button
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => {
                      handleViewChange('wheel');
                      setIsMenuOpen(false);
                    }}
                  >
                    Level Wheel
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => {
                      handleViewChange('mix');
                      setIsMenuOpen(false);
                    }}
                  >
                    Mix Colors
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Options Menu */}
          <div className="relative">
            <button 
              className="menu-button p-2 rounded-full hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                setIsOptionsOpen(!isOptionsOpen);
                setIsMenuOpen(false);
              }}
            >
              <EllipsisVerticalIcon className="w-6 h-6" />
            </button>
            {isOptionsOpen && (
              <div className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => {
                      setIsOptionsOpen(false);
                      router.push('/advanced-level-wheel');
                    }}
                  >
                    Advanced Mode
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => {
                      setIsOptionsOpen(false);
                      router.push('/level-wheel/shade-card');
                    }}
                  >
                    Shade Card
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center mt-8">
          {viewMode === 'wheel' ? (
            <MobileWheelComponent onLevelClick={(level) => {
              handleLevelClick(level);
              setIsBottomSheetOpen(true);
            }} />
          ) : (
            <MobileColorGrid
              onLevelSelect={handleLevelClick}
              selectedLevels={selectedMixLevels}
              onMixColors={handleMixColors}
            />
          )}
        </div>

        {/* Bottom Sheet */}
        <MobileBottomSheet
          isOpen={isBottomSheetOpen}
          onClose={handleCloseSheet}
          selectedLevel={selectedLevel}
          mixedWithLevel={viewMode === 'mix' ? selectedMixLevels[1] : undefined}
        />
      </main>
    </div>
  );
}
