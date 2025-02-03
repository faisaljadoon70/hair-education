'use client';

import React from 'react';
import { useDevice } from '@/hooks/useDevice';
import { useTutorial } from '@/context/TutorialContext';

interface ContainerProps {
  children: (props: {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    preferences: any;
    progress: any;
  }) => React.ReactNode;
  className?: string;
}

export function Container({ children, className = '' }: ContainerProps) {
  const { type, isMobile, isTablet, isDesktop } = useDevice();
  const { preferences, progress } = useTutorial();

  // Common container styles based on device type
  const containerStyles = {
    mobile: 'max-w-screen-sm mx-auto px-4',
    tablet: 'max-w-screen-md mx-auto px-6',
    desktop: 'max-w-screen-lg mx-auto px-8',
  };

  return (
    <div className={`${containerStyles[type]} ${className}`}>
      {children({
        isMobile,
        isTablet,
        isDesktop,
        preferences,
        progress,
      })}
    </div>
  );
}
