'use client';

import { ShadeCard } from '@/components/shadecard/ShadeCard';
import { MobileShadeCard } from '@/components/mobile/shadecard/MobileShadeCard';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ShadeCardPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        {isMobile ? <MobileShadeCard /> : <ShadeCard />}
      </div>
    </div>
  );
}
