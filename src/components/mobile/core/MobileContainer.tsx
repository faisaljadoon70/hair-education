'use client';

import { ReactNode } from 'react';
import useDeviceDetection from '@/hooks/useDeviceDetection';
import './mobile.css';

interface MobileContainerProps {
  children: ReactNode;
  pageId?: string;
}

// Core mobile container - handles layout and device detection
export default function MobileContainer({ children }: MobileContainerProps) {
  const { isMobile, isTablet } = useDeviceDetection();

  // Don't render on desktop
  if (!isMobile && !isTablet) {
    return null;
  }

  return (
    <div className="mobile-layout">
      <main className="mobile-content">
        {children}
      </main>
    </div>
  );
}
