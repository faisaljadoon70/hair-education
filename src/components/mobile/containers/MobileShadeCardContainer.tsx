'use client';

import MobileContainer from '../core/MobileContainer';
import MobileShadeCardPage from '../pages/MobileShadeCardPage';
import MobileHeader from '../navigation/MobileHeader';

export default function MobileShadeCardContainer() {
  return (
    <MobileContainer>
      <div className="h-screen bg-white flex flex-col">
        <MobileHeader />
        <div className="flex-1">
          <MobileShadeCardPage />
        </div>
      </div>
    </MobileContainer>
  );
}

// Helper Icons
const MenuIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const HomeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);
