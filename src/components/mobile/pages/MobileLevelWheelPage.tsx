'use client';

import { useState } from 'react';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import MobileWheelComponent from '../components/MobileWheelComponent';
import MobileBottomSheet from '../components/MobileBottomSheet';
import MobileColorGrid from '../components/MobileColorGrid';
import MobileHeader from '../navigation/MobileHeader';

type ViewMode = 'wheel' | 'mix';

export default function MobileLevelWheelPage() {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('wheel');
  const [selectedMixLevels, setSelectedMixLevels] = useState<number[]>([]);

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
          <Menu as="div" className="relative flex-1 max-w-[200px]">
            <Menu.Button className="flex items-center justify-between w-full text-sm px-3 py-2 border rounded-lg hover:bg-gray-50">
              {viewMode === 'wheel' ? 'Level Wheel' : 'Mix Colors'}
              <ChevronDownIcon className="h-4 w-4 ml-2" />
            </Menu.Button>
            <Menu.Items className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleViewChange('wheel')}
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } block w-full text-left px-4 py-2 text-sm`}
                    >
                      Level Wheel
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleViewChange('mix')}
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } block w-full text-left px-4 py-2 text-sm`}
                    >
                      Mix Colors
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>

          {/* Options Menu */}
          <Menu as="div" className="relative ml-2">
            <Menu.Button className="p-2 rounded-lg hover:bg-gray-100 border">
              <EllipsisVerticalIcon className="h-6 w-6" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 z-10 mt-1 w-48 bg-white border rounded-lg shadow-lg">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } block w-full text-left px-4 py-2 text-sm`}
                    >
                      Advanced Mode
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } block w-full text-left px-4 py-2 text-sm`}
                    >
                      Shade Card
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
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
