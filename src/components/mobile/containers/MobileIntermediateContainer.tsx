'use client';

import useDeviceDetection from '@/hooks/useDeviceDetection';
import MobileIntermediatePage from '../pages/MobileIntermediatePage';

interface Chapter {
  number: number;
  title: string;
  description: string;
  path: string;
}

interface MobileIntermediateContainerProps {
  children: React.ReactNode;
  chapters: Chapter[];
  completedChapters: { [key: string]: boolean };
  setCompletedChapters: (chapters: { [key: string]: boolean }) => void;
  calculateProgress: () => number;
  handleReset: () => void;
}

export default function MobileIntermediateContainer({ 
  children,
  chapters,
  completedChapters,
  setCompletedChapters,
  calculateProgress,
  handleReset 
}: MobileIntermediateContainerProps) {
  const { isMobile } = useDeviceDetection();

  if (isMobile) {
    return <MobileIntermediatePage 
      chapters={chapters}
      completedChapters={completedChapters}
      setCompletedChapters={setCompletedChapters}
      calculateProgress={calculateProgress}
      handleReset={handleReset}
    />;
  }

  return <>{children}</>;
}
