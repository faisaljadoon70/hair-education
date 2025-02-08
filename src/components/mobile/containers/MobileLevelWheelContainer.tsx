'use client';

import dynamic from 'next/dynamic';
import useDeviceDetection from '@/hooks/useDeviceDetection';

// Dynamically import mobile page
const MobileLevelWheelPage = dynamic(
  () => import('@/components/mobile/pages/MobileLevelWheelPage'),
  { ssr: false }
);

export default function MobileLevelWheelContainer() {
  const { isMobile } = useDeviceDetection();

  // Return null if not on mobile
  if (!isMobile) {
    return null;
  }

  return <MobileLevelWheelPage />;
}
