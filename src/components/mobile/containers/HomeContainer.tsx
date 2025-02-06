'use client';

import MobileContainer from '../core/MobileContainer';
import HomeMobileLayout from '../layouts/HomeMobileLayout';

interface HomeContainerProps {
  children: React.ReactNode;
}

export default function HomeContainer({ children }: HomeContainerProps) {
  return (
    <MobileContainer>
      <HomeMobileLayout>
        {children}
      </HomeMobileLayout>
    </MobileContainer>
  );
}
