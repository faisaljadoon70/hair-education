import { useDeviceDetection } from '@/hooks/useDeviceDetection';
import { ReactNode } from 'react';
import '../core/mobile.css';

interface MobileLayoutProps {
    children: ReactNode;
}

export const MobileLayout = ({ children }: MobileLayoutProps) => {
    const { isMobile } = useDeviceDetection();

    if (!isMobile) {
        return null;
    }

    return (
        <div className="mobile-layout">
            <div className="mobile-header">
                <h1 className="mobile-title">Professional Hair Education</h1>
                <p className="mobile-subtitle">
                    Master the art and science of hair coloring through our comprehensive education platform.
                </p>
            </div>
            <div className="mobile-content">
                {children}
            </div>
        </div>
    );
};

export default MobileLayout;
