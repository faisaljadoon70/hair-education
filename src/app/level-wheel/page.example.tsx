'use client';

import { useDeviceDetection } from '@/hooks/useDeviceDetection';
import MobilePageLayout from '@/components/mobile/MobilePageLayout';

export default function ColorWheelPage() {
  const isMobile = useDeviceDetection();
  
  if (isMobile) {
    return (
      <MobilePageLayout title="Color Wheel">
        {/* Your color wheel page content here */}
        <div className="mobile-page-content">
          <div className="mobile-touch-target">
            {/* Color wheel interactive elements */}
          </div>
        </div>
      </MobilePageLayout>
    );
  }

  return (
    // Desktop version
    <div>Desktop version of Color Wheel</div>
  );
}
