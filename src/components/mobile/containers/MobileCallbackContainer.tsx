'use client';

import useDeviceDetection from '@/hooks/useDeviceDetection';
import dynamic from 'next/dynamic';

const MobileAuthCallback = dynamic(() => import('../auth/MobileAuthCallback'), {
  ssr: false
});

interface MobileCallbackContainerProps {
  children: React.ReactNode;
}

export default function MobileCallbackContainer({ children }: MobileCallbackContainerProps) {
  const { isMobile } = useDeviceDetection();

  if (!isMobile) {
    return <>{children}</>;
  }

  return <MobileAuthCallback />;
}
