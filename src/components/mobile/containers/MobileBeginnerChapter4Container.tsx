'use client';

import dynamic from 'next/dynamic';
import useDeviceDetection from '@/hooks/useDeviceDetection';
import { ProtectedRoute } from '@/components/ProtectedRoute';

// Dynamically import mobile page
const MobileBeginnerChapter4Overview = dynamic(
  () => import('@/components/mobile/pages/MobileBeginnerChapter4Overview'),
  { ssr: false }
);

export default function MobileBeginnerChapter4Container() {
  const { isMobile } = useDeviceDetection();

  return (
    <ProtectedRoute>
      {isMobile && <MobileBeginnerChapter4Overview />}
    </ProtectedRoute>
  );
}
