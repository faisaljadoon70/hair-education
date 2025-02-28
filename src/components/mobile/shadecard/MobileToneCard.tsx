'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import MobileToneDetailsSheet from './MobileToneDetailsSheet';
import { getOptimalColorValue, ColorSpaces, useColorCalibration } from '../../../utils/colorManagement';

interface ToneCardProps {
  toneNumber: string;
  name: string;
  hexColor: string;
  rgbR?: number;
  rgbG?: number;
  rgbB?: number;
  displayP3R?: number;
  displayP3G?: number;
  displayP3B?: number;
}

export default function MobileToneCard({ 
  toneNumber, 
  name, 
  hexColor,
  rgbR,
  rgbG,
  rgbB,
  displayP3R,
  displayP3G,
  displayP3B
}: ToneCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const { adjustments } = useColorCalibration();
  const [optimizedColor, setOptimizedColor] = useState(hexColor);

  useEffect(() => {
    const colorSpaces: ColorSpaces = {
      hex: hexColor,
      rgb: {
        r: rgbR || parseInt(hexColor.substr(1, 2), 16),
        g: rgbG || parseInt(hexColor.substr(3, 2), 16),
        b: rgbB || parseInt(hexColor.substr(5, 2), 16)
      }
    };

    // Add Display-P3 values if available
    if (displayP3R !== undefined && displayP3G !== undefined && displayP3B !== undefined) {
      colorSpaces.displayP3 = {
        r: displayP3R,
        g: displayP3G,
        b: displayP3B
      };
    }

    const optimalColor = getOptimalColorValue(colorSpaces, adjustments);
    setOptimizedColor(optimalColor);
  }, [hexColor, rgbR, rgbG, rgbB, displayP3R, displayP3G, displayP3B, adjustments]);

  return (
    <>
      <motion.div
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowDetails(true)}
        className="relative aspect-square rounded-lg shadow-sm overflow-hidden"
        style={{
          backgroundColor: optimizedColor,
          transform: 'translateZ(0)',
          WebkitFontSmoothing: 'antialiased',
          backfaceVisibility: 'hidden'
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-white text-center">
          <span className="text-xs font-medium drop-shadow-md">{toneNumber}</span>
          <span className="text-[10px] opacity-80 drop-shadow-md">{name}</span>
        </div>
      </motion.div>

      <MobileToneDetailsSheet
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        toneNumber={toneNumber}
        name={name}
        hexColor={optimizedColor}
      />
    </>
  );
}
