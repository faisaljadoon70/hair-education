'use client';

import MobileContainer from '../core/MobileContainer';
import ToolMobileLayout from '../layouts/ToolMobileLayout';

interface ToolContainerProps {
  children: React.ReactNode;
  title?: string;
}

export default function ToolContainer({ children, title }: ToolContainerProps) {
  return (
    <MobileContainer>
      <ToolMobileLayout title={title}>
        {children}
      </ToolMobileLayout>
    </MobileContainer>
  );
}
