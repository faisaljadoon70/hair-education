'use client';

import { Suspense } from 'react';
import { AdvancedLevelWheel } from '@/components/advancedlevelwheel/AdvancedLevelWheel';
import Loading from './loading';

export default function AdvancedLevelWheelPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense fallback={<Loading />}>
          <AdvancedLevelWheel />
        </Suspense>
      </div>
    </main>
  );
}
