// Example of a chapter page
export function ChapterPageExample() {
  const isMobile = useDeviceDetection();
  
  if (isMobile) {
    return (
      <ChapterMobileLayout
        title="Chapter 1: Basics"
        progress={30}
        onComplete={() => {/* handle completion */}}
      >
        {/* Your chapter content here */}
        <div className="space-y-4">
          <h2>Chapter Content</h2>
          {/* More content */}
        </div>
      </ChapterMobileLayout>
    );
  }
  return <DesktopVersion />;
}

// Example of the color wheel tool page
export function ColorWheelPageExample() {
  const isMobile = useDeviceDetection();
  
  if (isMobile) {
    return (
      <ToolMobileLayout
        title="Color Wheel"
        fullScreen={true}
      >
        {/* Your color wheel tool content */}
        <div className="h-screen">
          {/* Color wheel component */}
        </div>
      </ToolMobileLayout>
    );
  }
  return <DesktopVersion />;
}

// Example of the home page
export function HomePageExample() {
  const isMobile = useDeviceDetection();
  
  if (isMobile) {
    return (
      <HomeMobileLayout>
        {/* Your home page content */}
        <div className="space-y-6">
          <h1>Welcome back!</h1>
          {/* Course cards, progress, etc */}
        </div>
      </HomeMobileLayout>
    );
  }
  return <DesktopVersion />;
}
