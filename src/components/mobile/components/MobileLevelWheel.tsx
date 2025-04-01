'use client';

import MobileWheelComponent from './MobileWheelComponent';
import { motion } from 'framer-motion';

interface Props {
  onLevelSelect?: (level: number) => void;
}

export default function MobileLevelWheel({ onLevelSelect }: Props) {
  console.log('MobileLevelWheel received props:', { onLevelSelect });
  
  return (
    <div style={{ transform: 'scale(0.77)', transformOrigin: 'top center' }} className="flex flex-col items-center">
      <div className="mb-20">
        <MobileWheelComponent onLevelSelect={onLevelSelect} />
      </div>
      <motion.p 
        className="text-gray-600 text-sm font-medium"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 1.2,
          type: "spring",
          stiffness: 100
        }}
      >
        Click a color to get more info
      </motion.p>
    </div>
  );
}
