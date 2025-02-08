'use client';

import dynamic from 'next/dynamic';
import useDeviceDetection from '@/hooks/useDeviceDetection';

// Dynamically import mobile page
const MobileBeginnerChapter2Overview = dynamic(
  () => import('@/components/mobile/pages/MobileBeginnerChapter2Overview'),
  { ssr: false }
);

export default function MobileBeginnerChapter2Container() {
  const { isMobile } = useDeviceDetection();

  if (!isMobile) {
    return null;
  }

  return <MobileBeginnerChapter2Overview />;
}
