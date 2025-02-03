'use client';

import React from 'react';
import { useDevice } from '@/hooks/useDevice';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function ResponsiveLayout({
  children,
  className = '',
}: ResponsiveLayoutProps) {
  const { isMobile, isTablet } = useDevice();

  // Adjust padding based on device type
  const layoutPadding = {
    mobile: 'pb-4',
    tablet: 'pb-6',
    desktop: 'pb-8',
  }[isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className={`${layoutPadding} ${className}`}>
        <div className={isMobile ? 'space-y-4' : 'space-y-6'}>
          {children}
        </div>
      </main>
    </div>
  );
}
