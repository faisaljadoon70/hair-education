'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import useDeviceDetection from '@/hooks/useDeviceDetection';

// Dynamically import mobile page
const MobileExpertPage = dynamic(
  () => import('@/components/mobile/pages/MobileExpertPage'),
  { ssr: false }
);

interface Props {
  chapters: {
    number: number;
    title: string;
    description: string;
    path: string;
  }[];
}

export default function MobileExpertContainer({ chapters }: Props) {
  const { isMobile } = useDeviceDetection();
  const [completedChapters, setCompletedChapters] = useState<{
    [key: string]: boolean;
  }>({});

  // Return null if not on mobile
  if (!isMobile) {
    return null;
  }

  const calculateProgress = () => {
    const completedCount = Object.values(completedChapters).filter(Boolean).length;
    return Math.round((completedCount / chapters.length) * 100);
  };

  const handleReset = () => {
    setCompletedChapters({});
    localStorage.setItem('completedExpertChapters', JSON.stringify({}));
  };

  return (
    <MobileExpertPage
      chapters={chapters}
      completedChapters={completedChapters}
      setCompletedChapters={setCompletedChapters}
      calculateProgress={calculateProgress}
      handleReset={handleReset}
    />
  );
}
