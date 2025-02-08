import React, { useState, useEffect } from 'react';
import { LEVEL_ONE_SHADES } from './LevelOneShades';

export const MobileShadeCard: React.FC = () => {
  const [selectedTone, setSelectedTone] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.tone-circle') && !target.closest('.tone-popup')) {
        setSelectedTone(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const renderToneCircle = (toneKey: string) => {
    const tone = LEVEL_ONE_SHADES[toneKey as keyof typeof LEVEL_ONE_SHADES];
    return (
      <div key={tone.id} className="relative">
        <div 
          className={`w-8 h-8 rounded-full cursor-pointer transition-transform duration-200 tone-circle ${
            selectedTone === tone.id ? 'scale-150 ring-2 ring-pink-500 ring-offset-2' : 'hover:scale-110'
          }`}
          style={{ backgroundColor: tone.hexColor }}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedTone(selectedTone === tone.id ? null : tone.id);
          }}
        />
        {selectedTone === tone.id && (
          <div 
            className="absolute z-10 top-full left-1/2 transform -translate-x-1/2 mt-4 bg-white rounded-lg shadow-xl p-4 w-48 tone-popup"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="w-16 h-16 rounded-full mx-auto mb-3"
              style={{ backgroundColor: tone.hexColor }}
            />
            <h3 className="text-center font-medium mb-1">{tone.name}</h3>
            <p className="text-sm text-center text-gray-600">{tone.id}</p>
            <p className="text-xs text-center text-gray-500 mt-2">{tone.description}</p>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-600">
                <span className="font-medium">Undertone:</span> {tone.undertone}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-xl font-semibold">Professional Shade Card</h1>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-all"
        >
          Back to Level Wheel
        </button>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Level 1 Row */}
        <div className="flex items-center mb-8">
          {/* Level Circle */}
          <div className="w-24 flex flex-col items-center mr-8">
            <div 
              className="w-12 h-12 rounded-full mb-2"
              style={{ backgroundColor: LEVEL_ONE_SHADES.natural.hexColor }}
            />
            <span className="text-sm">Level 1</span>
          </div>

          {/* Tones */}
          <div className="flex gap-6 flex-1">
            {Object.entries(LEVEL_ONE_SHADES).map(([key, tone]) => (
              <div key={tone.id} className="relative">
                <div 
                  className={`w-8 h-8 rounded-full cursor-pointer transition-transform duration-200 tone-circle ${
                    selectedTone === tone.id ? 'scale-150 ring-2 ring-pink-500 ring-offset-2 z-10' : 'hover:scale-110'
                  }`}
                  style={{ backgroundColor: tone.hexColor }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTone(selectedTone === tone.id ? null : tone.id);
                  }}
                />
                {selectedTone === tone.id && (
                  <div 
                    className="absolute z-20 top-full left-1/2 transform -translate-x-1/2 mt-4 bg-white rounded-lg shadow-xl p-4 w-48 tone-popup"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div 
                      className="w-16 h-16 rounded-full mx-auto mb-3"
                      style={{ backgroundColor: tone.hexColor }}
                    />
                    <h3 className="text-center font-medium mb-1">{tone.name}</h3>
                    <p className="text-sm text-center text-gray-600">{tone.id}</p>
                    <p className="text-xs text-center text-gray-500 mt-2">{tone.description}</p>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-600">
                        <span className="font-medium">Undertone:</span> {tone.undertone}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        <span className="font-medium">RGB:</span> ({tone.rgbColor})
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        <span className="font-medium">HEX:</span> {tone.hexColor}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
