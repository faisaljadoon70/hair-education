'use client';

import MobileContainer from '../core/MobileContainer';
import ChapterMobileLayout from '../layouts/ChapterMobileLayout';

interface ChapterContainerProps {
  children: React.ReactNode;
  title?: string;
}

export default function ChapterContainer({ children, title }: ChapterContainerProps) {
  return (
    <MobileContainer>
      <ChapterMobileLayout title={title}>
        {children}
      </ChapterMobileLayout>
    </MobileContainer>
  );
}
