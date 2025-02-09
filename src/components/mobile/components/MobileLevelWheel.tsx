'use client';

import MobileWheelComponent from './MobileWheelComponent';

interface Props {
  onLevelSelect?: (level: number) => void;
}

export default function MobileLevelWheel({ onLevelSelect }: Props) {
  console.log('MobileLevelWheel received props:', { onLevelSelect });
  
  return (
    <div style={{ transform: 'scale(0.77)', transformOrigin: 'top center' }}>
      <MobileWheelComponent onLevelSelect={onLevelSelect} />
    </div>
  );
}
