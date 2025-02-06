'use client';

import useDeviceDetection from '@/hooks/useDeviceDetection';
import dynamic from 'next/dynamic';

const MobileSignIn = dynamic(() => import('../auth/MobileSignIn'), {
  ssr: false
});

interface MobileAuthContainerProps {
  children: React.ReactNode;
}

export default function MobileAuthContainer({ children }: MobileAuthContainerProps) {
  const { isMobile } = useDeviceDetection();

  if (!isMobile) {
    return <>{children}</>;
  }

  return <MobileSignIn />;
}
