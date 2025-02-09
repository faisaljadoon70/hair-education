'use client';

import { useState } from 'react';
import { ChevronDownIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import MobileAdvancedWheelComponent from '../components/MobileAdvancedWheelComponent';
import MobileBottomSheet from '../components/MobileBottomSheet';
import MobileHeader from '../navigation/MobileHeader';

export default function MobileAdvancedLevelWheelPage() {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'wheel' | 'formula' | 'prediction' | 'lifting'>('wheel');

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

  const handleLevelClick = (level: number) => {
    setSelectedLevel(level);
    setIsBottomSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* Header Bar */}
        <div className="bg-pink-500 text-white flex items-center justify-between px-4 h-14">
          <button 
            onClick={() => handleMenuChange('view')}
            className="flex items-center space-x-2 menu-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          <div className="flex items-center space-x-2">
            <span>Level Wheel</span>
            <ChevronDownIcon className="w-5 h-5" />
          </div>

          <button 
            onClick={() => handleMenuChange('options')}
            className="menu-button"
          >
            <EllipsisVerticalIcon className="w-6 h-6" />
          </button>
        </div>

        {/* View Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg py-2">
            <button 
              className={`w-full px-4 py-2 text-left ${activeTab === 'wheel' ? 'text-pink-500' : 'text-gray-700'}`}
              onClick={() => {
                setActiveTab('wheel');
                handleMenuChange(null);
              }}
            >
              Level Wheel
            </button>
            <button 
              className={`w-full px-4 py-2 text-left ${activeTab === 'formula' ? 'text-pink-500' : 'text-gray-700'}`}
              onClick={() => {
                setActiveTab('formula');
                handleMenuChange(null);
              }}
            >
              Formula Builder
            </button>
            <button 
              className={`w-full px-4 py-2 text-left ${activeTab === 'prediction' ? 'text-pink-500' : 'text-gray-700'}`}
              onClick={() => {
                setActiveTab('prediction');
                handleMenuChange(null);
              }}
            >
              Color Prediction
            </button>
            <button 
              className={`w-full px-4 py-2 text-left ${activeTab === 'lifting' ? 'text-pink-500' : 'text-gray-700'}`}
              onClick={() => {
                setActiveTab('lifting');
                handleMenuChange(null);
              }}
            >
              Lifting Process
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="pt-14">
        {activeTab === 'wheel' && (
          <MobileAdvancedWheelComponent onLevelClick={handleLevelClick} />
        )}
        {activeTab === 'formula' && (
          <div className="text-center py-8 text-gray-500">Formula Builder content coming soon</div>
        )}
        {activeTab === 'prediction' && (
          <div className="text-center py-8 text-gray-500">Color Prediction content coming soon</div>
        )}
        {activeTab === 'lifting' && (
          <div className="text-center py-8 text-gray-500">Lifting Process content coming soon</div>
        )}
      </div>

      {/* Bottom Sheet */}
      <MobileBottomSheet 
        isOpen={isBottomSheetOpen} 
        onClose={handleCloseSheet}
        level={selectedLevel}
      />
    </div>
  );
}
