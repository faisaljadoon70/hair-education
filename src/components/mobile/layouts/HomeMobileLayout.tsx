'use client';

import { ReactNode } from 'react';
import BaseMobileLayout from './BaseMobileLayout';
import MobileHomeNavigation from '../navigation/MobileHomeNavigation';

interface HomeMobileLayoutProps {
  children: ReactNode;
}

export default function HomeMobileLayout({
  children
}: HomeMobileLayoutProps) {
  return (
    <BaseMobileLayout 
      showBackButton={false}
      contentClassName="pb-32" // Space for navigation
    >
      {children}
      <MobileHomeNavigation />
    </BaseMobileLayout>
  );
}
