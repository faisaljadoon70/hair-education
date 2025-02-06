'use client';

import { ReactNode } from 'react';
import MobileHeader from '../navigation/MobileHeader';
import '@/styles/mobile.css';

interface BaseMobileLayoutProps {
  children: ReactNode;
  title?: string;
  showHeader?: boolean;
  showBackButton?: boolean;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
}

export default function BaseMobileLayout({
  children,
  title,
  showHeader = true,
  showBackButton = true,
  className = '',
  headerClassName = '',
  contentClassName = ''
}: BaseMobileLayoutProps) {
  return (
    <div className={`min-h-screen w-full bg-white mobile-scroll ${className}`}>
      {showHeader && (
        <MobileHeader 
          title={title} 
          showBackButton={showBackButton} 
          className={headerClassName}
        />
      )}
      <main className={`mobile-content mobile-safe-area ${contentClassName}`}>
        {children}
      </main>
    </div>
  );
}
