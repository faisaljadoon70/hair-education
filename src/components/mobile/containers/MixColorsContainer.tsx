'use client';

import { useEffect, useState } from 'react';
import MobileMixColorsContainer from './MobileMixColorsContainer';
import dynamic from 'next/dynamic';

// Import the web version dynamically to avoid mobile code in web bundle
const LevelWheel = dynamic(() => import('@/components/levelwheel/LevelWheel'), {
  ssr: false
});

export default function MixColorsContainer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check initially
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return <MobileMixColorsContainer />;
  }

  // Return web version for non-mobile
  return <LevelWheel />;
}
