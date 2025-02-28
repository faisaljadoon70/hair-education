'use client';

import { ShadeCard } from '@/components/shadecard/ShadeCard';
import MobileShadeCardContainer from '@/components/mobile/containers/MobileShadeCardContainer';
import useDeviceDetection from '@/hooks/useDeviceDetection';

export default function ShadeCardPage() {
  const { isMobile } = useDeviceDetection();

  if (isMobile) {
    return <MobileShadeCardContainer />;
  }

  return <ShadeCard />;
}
