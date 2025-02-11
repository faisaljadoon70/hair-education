import React from 'react';

interface MixingRatioSliderProps {
  ratio: number;
  onRatioChange: (ratio: number) => void;
  color1Level: number;
  color2Level: number;
}

export const MixingRatioSlider: React.FC<MixingRatioSliderProps> = ({
  ratio,
  onRatioChange,
  color1Level,
  color2Level,
}) => {
  return (
    <div className="mixing-ratio-container">
      <div className="ratio-display">
        <span className="level-label">Level {color1Level}: {Math.round((1 - ratio) * 100)}%</span>
        <span className="level-label">Level {color2Level}: {Math.round(ratio * 100)}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={ratio}
        onChange={(e) => onRatioChange(parseFloat(e.target.value))}
        className="ratio-slider"
      />
      <style jsx>{`
        .mixing-ratio-container {
          width: 100%;
          max-width: 300px;
          margin: 20px auto;
          padding: 15px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .ratio-display {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .level-label {
          font-size: 14px;
          color: #666;
        }

        .ratio-slider {
          width: 100%;
          height: 4px;
          background: linear-gradient(to right, 
            #333 0%, 
            #333 ${(1 - ratio) * 100}%, 
            #999 ${(1 - ratio) * 100}%, 
            #999 100%
          );
          border-radius: 2px;
          -webkit-appearance: none;
          outline: none;
        }

        .ratio-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          background: #ff4d8c;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
          transition: all 0.2s ease;
        }

        .ratio-slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          background: #ff3377;
        }

        .ratio-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #ff4d8c;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
          transition: all 0.2s ease;
        }

        .ratio-slider::-moz-range-thumb:hover {
          transform: scale(1.1);
          background: #ff3377;
        }
      `}</style>
    </div>
  );
};
