'use client';

import { useGestures } from '@/hooks/useGestures';
import BaseMobileLayout from '../layouts/BaseMobileLayout';

// Presenter component - handles UI only
export default function MobilePresenter({ containerState, layout: Layout = BaseMobileLayout, ...props }) {
  const { handleSwipe } = useGestures();

  return (
    <div onTouchStart={handleSwipe.start} onTouchEnd={handleSwipe.end}>
      <Layout {...props}>
        {/* UI rendering based on containerState */}
        {!containerState.isOnline && (
          <div className="bg-yellow-100 p-2 text-sm">
            Working offline - changes will sync when online
          </div>
        )}
        {props.children}
      </Layout>
    </div>
  );
}
