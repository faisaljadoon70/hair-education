'use client';

import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import MobileAdvancedLevelWheelPage from '../pages/MobileAdvancedLevelWheelPage';

export default function MobileAdvancedLevelWheelContainer() {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    setIsMobileView(isMobile);
  }, []);

  if (!isMobileView) {
    return null;
  }

  return <MobileAdvancedLevelWheelPage />;
}
