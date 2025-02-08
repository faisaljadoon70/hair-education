'use client';

import { useDeviceDetection } from '@/hooks/useDeviceDetection';
import MobileChapterPage from '@/components/mobile/templates/MobileChapterPage';
import DesktopChapterPage from '@/components/browser/templates/DesktopChapterPage';

export default function BeginnerChapter1() {
  const isMobile = useDeviceDetection();
  
  const chapterContent = (
    <div>
      {/* Your chapter content here - this will be rendered for both mobile and desktop */}
    </div>
  );

  if (isMobile) {
    return (
      <MobileChapterPage
        title="Chapter 1: Introduction to Hair Color"
        content={chapterContent}
        onComplete={() => {
          // Handle chapter completion
        }}
      />
    );
  }

  return (
    <DesktopChapterPage
      title="Chapter 1: Introduction to Hair Color"
      content={chapterContent}
    />
  );
}
