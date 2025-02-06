'use client';

import { useDeviceDetection } from '@/hooks/useDeviceDetection';
import MobilePageLayout from '../MobilePageLayout';

interface MobileChapterPageProps {
  title: string;
  content: React.ReactNode;
  onComplete?: () => void;
}

export default function MobileChapterPage({ 
  title, 
  content,
  onComplete 
}: MobileChapterPageProps) {
  const isMobile = useDeviceDetection();

  if (!isMobile) return null;

  return (
    <MobilePageLayout title={title}>
      <div className="mobile-chapter-content">
        {content}
      </div>
      {onComplete && (
        <button 
          onClick={onComplete}
          className="mobile-touch-target fixed bottom-0 left-0 w-full bg-primary text-white p-4 mobile-safe-bottom"
        >
          Complete Chapter
        </button>
      )}
    </MobilePageLayout>
  );
}
