'use client';

import { levelColors } from '@/components/levelwheel/levelData';

interface Props {
  onLevelSelect: (level: number) => void;
  selectedLevels: number[];
  onMixColors: () => void;
}

export default function MobileColorGrid({ onLevelSelect, selectedLevels = [], onMixColors }: Props) {
  const topRow = [5, 4, 3, 2, 1];
  const bottomRow = [10, 9, 8, 7, 6];
  const rows = [topRow, bottomRow];

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-[90%] max-w-sm mx-auto">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-between mb-8">
            {row.map((level) => {
              const color = levelColors[level as keyof typeof levelColors];
              const isSelected = selectedLevels.includes(level);
              return (
                <button
                  key={level}
                  onClick={() => onLevelSelect(level)}
                  className="w-[11.5] h-[11.5] rounded-full shadow-sm transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-pink-500 mx-2"
                  style={{
                    backgroundColor: color,
                    border: isSelected ? '3px solid #EC4899' : '2px solid rgba(255,255,255,0.2)',
                    width: '2.875rem',
                    height: '2.875rem'
                  }}
                >
                  <span 
                    className="flex items-center justify-center text-sm font-medium"
                    style={{ color: '#ffffff' }}
                  >
                    {level}
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
      
      <div className="text-center text-gray-600 text-sm mt-6 mb-4">
        Select colors to get result
      </div>

      {/* Selected Colors Display */}
      <div className="flex justify-center gap-8 mb-6">
        {[0, 1].map((index) => {
          const level = selectedLevels[index];
          const color = level ? levelColors[level as keyof typeof levelColors] : 'transparent';
          return (
            <div
              key={index}
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: color,
                border: '2px dashed #ccc',
                boxShadow: level ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              {level ? (
                <span className="text-white font-medium">{level}</span>
              ) : (
                <span className="text-gray-400 text-sm">Select color</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Mix Colors Button - only show when both colors are selected */}
      {selectedLevels.length === 2 && (
        <button
          onClick={onMixColors}
          className="bg-pink-500 text-white px-8 py-3 rounded-full font-medium shadow-sm hover:bg-pink-600 transition-colors"
        >
          Mix Colors
        </button>
      )}
    </div>
  );
}
