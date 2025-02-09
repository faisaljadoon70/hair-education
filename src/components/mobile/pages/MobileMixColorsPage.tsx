'use client';

import MobileColorGrid from '../components/MobileColorGrid';

interface Props {
  selectedLevels: number[];
  mixedResult: number | null;
  onColorSelect: (level: number) => void;
  onMixColors: () => void;
  onClearResult: () => void;
  levelColors: Record<number, string>;
}

export default function MobileMixColorsPresenter({
  selectedLevels,
  mixedResult,
  onColorSelect,
  onMixColors,
  onClearResult,
  levelColors
}: Props) {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Instructions */}
      <div className="p-4 bg-blue-50 space-y-1">
        <h3 className="text-sm font-semibold text-blue-900">Instructions:</h3>
        <ol className="text-sm text-blue-800 pl-5 list-decimal">
          <li>Select two different levels</li>
          <li>Click "Mix Colors" to see the result</li>
        </ol>
      </div>

      {/* Color Grid */}
      <MobileColorGrid 
        onSelectColor={onColorSelect}
        selectedLevels={selectedLevels}
      />

      {/* Selected Colors Display */}
      <div className="px-4 py-2">
        <div className="text-sm text-gray-600">
          Selected levels ({selectedLevels.length}/2):
        </div>
        <div className="flex gap-2 mt-1">
          {selectedLevels.map(level => (
            <div
              key={level}
              className="w-8 h-8 rounded-full shadow-sm flex items-center justify-center"
              style={{ 
                backgroundColor: levelColors[level as keyof typeof levelColors],
                border: '1px solid rgba(0,0,0,0.1)'
              }}
            >
              <span className="text-sm font-medium">{level}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mix Button */}
      <div className="p-4 mt-auto border-t">
        {mixedResult ? (
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">Result: Level {mixedResult}</div>
              <div 
                className="w-full h-16 rounded-lg shadow-sm"
                style={{ 
                  backgroundColor: levelColors[mixedResult as keyof typeof levelColors],
                  border: '1px solid rgba(0,0,0,0.1)'
                }}
              />
            </div>
            <button
              onClick={onClearResult}
              className="w-full px-4 py-2 text-sm font-medium text-pink-600 border border-pink-600 rounded-lg hover:bg-pink-50"
            >
              Clear Result
            </button>
          </div>
        ) : (
          <button
            onClick={onMixColors}
            disabled={selectedLevels.length !== 2}
            className={`w-full px-4 py-2 text-sm font-medium rounded-lg
              ${selectedLevels.length === 2
                ? 'bg-pink-600 text-white hover:bg-pink-700'
                : 'bg-gray-100 text-gray-400'
              }`}
          >
            Mix Colors
          </button>
        )}
      </div>
    </div>
  );
}
