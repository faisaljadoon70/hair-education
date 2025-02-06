'use client';

import { ReactNode } from 'react';

interface MobileContainerProps {
  children: ReactNode;
  pageId?: string;
}

// Container component - handles data and business logic
export default function MobileContainer({ children }: MobileContainerProps) {
  // Pass children directly for now
  return <>{children}</>;
}
