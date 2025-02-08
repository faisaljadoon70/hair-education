'use client';

import dynamic from 'next/dynamic';
import useDeviceDetection from '@/hooks/useDeviceDetection';

const MobileChapter1Overview = dynamic(
  () => import('../pages/MobileChapter1Overview'),
  { ssr: false }
);

export default function MobileChapter1OverviewContainer() {
  const { isMobile } = useDeviceDetection();

  if (!isMobile) {
    return null;
  }

  return <MobileChapter1Overview />;
}
