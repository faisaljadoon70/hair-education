'use client';

import { ReactNode } from 'react';
import BaseMobileLayout from './BaseMobileLayout';

interface ChapterMobileLayoutProps {
  children: ReactNode;
  title: string;
  onComplete?: () => void;
  progress?: number;
}

export default function ChapterMobileLayout({
  children,
  title,
  onComplete,
  progress = 0
}: ChapterMobileLayoutProps) {
  return (
    <BaseMobileLayout 
      title={title}
      contentClassName="pb-32" // Extra padding for progress bar
    >
      {progress > 0 && (
        <div className="fixed top-16 left-0 w-full h-1 bg-gray-200">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      {children}
      {onComplete && (
        <button 
          onClick={onComplete}
          className="fixed bottom-0 left-0 w-full bg-primary text-white p-4 mobile-touch-target"
        >
          Complete Chapter
        </button>
      )}
    </BaseMobileLayout>
  );
}
