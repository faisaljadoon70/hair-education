'use client';

import dynamic from 'next/dynamic';
import MobileContainer from '@/components/mobile/core/MobileContainer';
import MobilePresenter from '@/components/mobile/core/MobilePresenter';
import ChapterMobileLayout from '@/components/mobile/layouts/ChapterMobileLayout';

// Dynamic import for heavy components
const ColorWheel = dynamic(() => import('@/components/colorwheel/ColorWheel'), {
  loading: () => <p>Loading...</p>,
  ssr: false // Disable SSR for interactive components
});

export default function ChapterPage() {
  return (
    <MobileContainer pageId="chapter-1">
      {(containerState) => (
        <MobilePresenter
          containerState={containerState}
          layout={ChapterMobileLayout}
          title="Chapter 1"
        >
          <div className="space-y-4">
            {/* Content here */}
            {containerState.isOnline ? (
              <ColorWheel />
            ) : (
              <div>Offline version of color wheel</div>
            )}
          </div>
        </MobilePresenter>
      )}
    </MobileContainer>
  );
}
