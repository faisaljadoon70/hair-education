import { ReactNode } from 'react';
import MobileHeader from './MobileHeader';
import '@/styles/mobile.css';

interface MobilePageLayoutProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
}

export default function MobilePageLayout({ 
  children, 
  title, 
  showBackButton = true 
}: MobilePageLayoutProps) {
  return (
    <div className="mobile-page-container">
      <MobileHeader title={title} showBackButton={showBackButton} />
      <main className="mobile-page-content">
        {children}
      </main>
    </div>
  );
}
