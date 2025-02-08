'use client';

import { useDeviceDetection } from '@/hooks/useDeviceDetection';
import MobilePageLayout from '@/components/mobile/MobilePageLayout';

export default function BeginnerPage() {
  const isMobile = useDeviceDetection();
  
  if (isMobile) {
    return (
      <MobilePageLayout title="Beginner Course">
        {/* Your beginner page content here */}
        <div className="mobile-page-content">
          <h1>Welcome to Beginner Course</h1>
          {/* More content */}
        </div>
      </MobilePageLayout>
    );
  }

  return (
    // Desktop version
    <div>Desktop version of Beginner page</div>
  );
}
