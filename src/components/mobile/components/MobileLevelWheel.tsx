'use client';

import MobileWheelComponent from './MobileWheelComponent';

export default function MobileLevelWheel() {
  return (
    <div style={{ transform: 'scale(0.7)', transformOrigin: 'top center' }}>
      <MobileWheelComponent />
    </div>
  );
}
