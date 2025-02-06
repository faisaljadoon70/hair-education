'use client';

import useDeviceDetection from '@/hooks/useDeviceDetection';
import MobileBeginnerPage from '../pages/MobileBeginnerPage';

interface MobileBeginnerContainerProps {
  children: React.ReactNode;
}

export default function MobileBeginnerContainer({ children }: MobileBeginnerContainerProps) {
  const { isMobile } = useDeviceDetection();

  if (isMobile) {
    return <MobileBeginnerPage />;
  }

  return <>{children}</>;
}
