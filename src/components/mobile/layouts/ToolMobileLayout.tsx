'use client';

import { ReactNode } from 'react';
import BaseMobileLayout from './BaseMobileLayout';

interface ToolMobileLayoutProps {
  children: ReactNode;
  title: string;
  fullScreen?: boolean;
}

export default function ToolMobileLayout({
  children,
  title,
  fullScreen = false
}: ToolMobileLayoutProps) {
  return (
    <BaseMobileLayout 
      title={title}
      contentClassName={fullScreen ? 'p-0' : ''} // No padding for full-screen tools
    >
      {children}
    </BaseMobileLayout>
  );
}
