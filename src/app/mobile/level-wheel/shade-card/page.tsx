'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useDeviceDetection from '@/hooks/useDeviceDetection';
import MobileShadeCardContainer from '@/components/mobile/containers/MobileShadeCardContainer';

export default function MobileShadeCardPage() {
  const router = useRouter();
  const { isMobile } = useDeviceDetection();

  useEffect(() => {
    // Redirect to web version if not on mobile
    if (!isMobile) {
      router.push('/level-wheel/shade-card');
    }
  }, [isMobile, router]);

  if (!isMobile) {
    return null;
  }

  return <MobileShadeCardContainer />;
}
