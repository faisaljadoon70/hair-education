import { useState, useEffect } from 'react';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface DeviceInfo {
  type: DeviceType;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  hasTouch: boolean;
  orientation: 'portrait' | 'landscape';
  screenWidth: number;
  screenHeight: number;
}

export function useDevice(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    type: 'desktop',
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    hasTouch: false,
    orientation: 'landscape',
    screenWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
    screenHeight: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Get device type from headers (set by middleware)
    const deviceType = document.querySelector('meta[name="x-device-type"]')?.getAttribute('content') as DeviceType || 'desktop';

    // Detect touch capability
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Get orientation
    const getOrientation = () => 
      window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';

    // Update device info
    const updateDeviceInfo = () => {
      setDeviceInfo({
        type: deviceType,
        isMobile: deviceType === 'mobile',
        isTablet: deviceType === 'tablet',
        isDesktop: deviceType === 'desktop',
        hasTouch,
        orientation: getOrientation(),
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
      });
    };

    // Initial update
    updateDeviceInfo();

    // Listen for resize events
    window.addEventListener('resize', updateDeviceInfo);
    window.addEventListener('orientationchange', updateDeviceInfo);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
      window.removeEventListener('orientationchange', updateDeviceInfo);
    };
  }, []);

  return deviceInfo;
}
