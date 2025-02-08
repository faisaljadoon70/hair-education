'use client';

import dynamic from 'next/dynamic';
import useDeviceDetection from '@/hooks/useDeviceDetection';

// Dynamically import mobile page
const MobileBeginnerChapter3Overview = dynamic(
  () => import('@/components/mobile/pages/MobileBeginnerChapter3Overview'),
  { ssr: false }
);

export default function MobileBeginnerChapter3Container() {
  const { isMobile } = useDeviceDetection();

  // Return null if not on mobile
  if (!isMobile) {
    return null;
  }

  return <MobileBeginnerChapter3Overview />;
}
