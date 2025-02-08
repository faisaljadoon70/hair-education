'use client';

import { useDeviceDetection } from '@/hooks/useDeviceDetection';
import ChapterContainer from '@/components/mobile/containers/ChapterContainer';
import ToolContainer from '@/components/mobile/containers/ToolContainer';
import HomeContainer from '@/components/mobile/containers/HomeContainer';

// Example for chapter pages (beginner-chapter1, intermediate-chapter1, etc.)
export function ChapterPageImplementation() {
  const isMobile = useDeviceDetection();
  
  if (isMobile) {
    return (
      <ChapterContainer
        chapterId="beginner-1"
        title="Introduction to Hair Color"
      >
        <div className="space-y-4">
          <h2>Chapter Content</h2>
          {/* Chapter content here */}
        </div>
      </ChapterContainer>
    );
  }

  return <DesktopVersion />;
}

// Example for tool pages (color-wheel, analyze)
export function ToolPageImplementation() {
  const isMobile = useDeviceDetection();
  
  if (isMobile) {
    return (
      <ToolContainer
        toolId="color-wheel"
        title="Color Wheel"
        fullScreen={true}
      >
        <div className="h-screen">
          {/* Tool content here */}
        </div>
      </ToolContainer>
    );
  }

  return <DesktopVersion />;
}

// Example for home/overview pages
export function HomePageImplementation() {
  const isMobile = useDeviceDetection();
  
  if (isMobile) {
    return (
      <HomeContainer>
        <div className="space-y-6">
          <h1>Welcome to Hair Education</h1>
          {/* Home content here */}
        </div>
      </HomeContainer>
    );
  }

  return <DesktopVersion />;
}
