import { useState, useEffect } from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouch: boolean;
}

const useDeviceDetection = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isTouch: false
  });

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const checkDevice = () => {
      const width = window.innerWidth;
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      setDeviceInfo({
        isMobile: width <= 768,
        isTablet: width > 768 && width <= 1024,
        isDesktop: width > 1024,
        isTouch: isTouch
      });
    };
    
    // Initial check
    checkDevice();
    
    // Add resize listener
    window.addEventListener('resize', checkDevice);
    
    // Check for touch capability
    const touchQuery = window.matchMedia('(hover: none) and (pointer: coarse)');
    touchQuery.addListener(checkDevice);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkDevice);
      touchQuery.removeListener(checkDevice);
    };
  }, []);

  // Return false values during SSR
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isTouch: false
    };
  }

  return deviceInfo;
};

export default useDeviceDetection;
