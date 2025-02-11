import React, { useState, useEffect } from 'react';
import { MixingRatioSlider } from './MixingRatioSlider';
import { WebHairColor, WebMixResult, mixWebHairColors } from './colorMixing';

interface MixingPanelProps {
  selectedLevels: number[];
  onClose?: () => void;
}

export const MixingPanel: React.FC<MixingPanelProps> = ({
  selectedLevels,
  onClose
}) => {
  const [ratio, setRatio] = useState(0.5);
  const [mixResult, setMixResult] = useState<WebMixResult | null>(null);

  // Define colors based on selected levels
  const color1: WebHairColor = {
    level: selectedLevels[0],
    hexColor: getLevelColor(selectedLevels[0]), // You'll need to implement this
    undertone: 'neutral' // Default to neutral for now
  };

  const color2: WebHairColor = {
    level: selectedLevels[1],
    hexColor: getLevelColor(selectedLevels[1]),
    undertone: 'neutral'
  };

  useEffect(() => {
    if (selectedLevels.length === 2) {
      const result = mixWebHairColors(color1, color2, ratio);
      setMixResult(result);
    }
  }, [selectedLevels, ratio]);

  if (selectedLevels.length !== 2) {
    return (
      <div className="mixing-panel">
        <p>Please select two levels to mix</p>
      </div>
    );
  }

  return (
    <div className="mixing-panel">
      <h3>Mix Hair Colors</h3>
      <div className="color-preview">
        <div className="color-box" style={{ backgroundColor: color1.hexColor }}>
          <span>Level {color1.level}</span>
        </div>
        <div className="color-box result" style={{ 
          backgroundColor: mixResult?.resultHex || '#fff'
        }}>
          <span>Level {mixResult?.resultLevel.toFixed(1)}</span>
        </div>
        <div className="color-box" style={{ backgroundColor: color2.hexColor }}>
          <span>Level {color2.level}</span>
        </div>
      </div>
      
      <MixingRatioSlider
        ratio={ratio}
        onRatioChange={setRatio}
        color1Level={color1.level}
        color2Level={color2.level}
      />

      <style jsx>{`
        .mixing-panel {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          max-width: 400px;
          margin: 20px auto;
        }

        h3 {
          margin: 0 0 20px;
          color: #333;
          text-align: center;
        }

        .color-preview {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .color-box {
          width: 80px;
          height: 80px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
          font-weight: bold;
          position: relative;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .color-box.result {
          width: 100px;
          height: 100px;
          border: 3px solid #ff4d8c;
        }

        .color-box span {
          background: rgba(0,0,0,0.4);
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

// Helper function to get color for a level (implement based on your color system)
function getLevelColor(level: number): string {
  // This should return the hex color for each level
  const colorMap: { [key: number]: string } = {
    1: '#000000',
    2: '#2c2c2c',
    3: '#3c3c3c',
    4: '#4a3b32',
    5: '#584438',
    6: '#6b534a',
    7: '#8b6b5d',
    8: '#b5a18a',
    9: '#d4c4b0',
    10: '#e8dccf'
  };
  return colorMap[level] || '#000000';
}
