# Mobile Implementation Guidelines

## Table of Contents
1. [Core Setup](#core-setup)
2. [Implementation Steps](#implementation-steps)
3. [Directory Structure](#directory-structure)
4. [Testing Checklist](#testing-checklist)
5. [Best Practices](#best-practices)
6. [Advanced Implementation Recommendations](#advanced-implementation-recommendations)
7. [Complex UI Components Guidelines](#complex-ui-components-guidelines)
8. [Build System Considerations](#build-system-considerations)

## Core Setup

### 1. Device Detection Hook
```typescript
// src/hooks/useDeviceDetection.ts
export function useDeviceDetection() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.matchMedia('(max-width: 768px)').matches;
      const tablet = window.matchMedia('(max-width: 1024px)').matches;
      setIsMobile(mobile);
      setIsTablet(tablet);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return { isMobile, isTablet };
}
```

### 2. Core Mobile Container
```typescript
// src/components/mobile/core/MobileContainer.tsx
interface MobileContainerProps {
  children: ReactNode;
  allowTablet?: boolean;
  fallback?: ReactNode;
  // Add progress tracking
  progress?: {
    [key: string]: number;
  };
  onProgressUpdate?: (progress: number) => void;
}

export function MobileContainer({ 
  children, 
  allowTablet = false,
  fallback = null,
  progress,
  onProgressUpdate
}: MobileContainerProps) {
  const { isMobile, isTablet } = useDeviceDetection();
  
  const shouldRenderMobile = isMobile || (allowTablet && isTablet);
  if (!shouldRenderMobile) return fallback;

  return (
    <div className="mobile-root-container">
      {children}
    </div>
  );
}
```

### 3. Mobile Layout Wrapper
```typescript
// src/components/mobile/layouts/BaseMobileLayout.tsx
interface BaseMobileLayoutProps {
  children: ReactNode;
  title?: string;
  showHeader?: boolean;
  showBack?: boolean;
  safeArea?: boolean;
  className?: string;
}

export function BaseMobileLayout({
  children,
  title,
  showHeader = true,
  showBack = true,
  safeArea = true,
  className = ''
}: BaseMobileLayoutProps) {
  return (
    <div className={`
      mobile-layout-wrapper
      min-h-screen
      w-full
      ${safeArea ? 'safe-area-inset' : ''}
      ${className}
    `}>
      {showHeader && (
        <header className="mobile-header">
          {showBack && <BackButton />}
          {title && <h1>{title}</h1>}
        </header>
      )}
      <main className="mobile-main-content">
        {children}
      </main>
    </div>
  );
}
```

## Implementation Steps

### Step 1: Define Shared Interfaces
```typescript
// shared/types/content.ts
interface SharedPageContent {
  title: string;
  description: string;
  sections: Section[];
  progress?: {
    [key: string]: number;
  };
}

interface Section {
  id: number;
  title: string;
  description: string;
  path: string;
}
```

### Step 2: Create Mobile Components
1. Create mobile-specific UI components in `src/components/mobile/components/`
2. Keep components pure and reusable
3. Use mobile-optimized styling

### Step 3: Implement Dynamic Loading
```typescript
// In main page component
const MobilePage = dynamic(
  () => import('@/components/mobile/pages/MobilePage'),
  { 
    ssr: false,
    loading: () => <MobileLoadingState />
  }
);
```

### Step 4: Update Main Page
1. Import mobile container (not page directly)
2. Add desktop-only class to web UI
3. Remove any existing device detection
4. Ensure proper routing setup

## Directory Structure
```
src/
├── components/
│   └── mobile/
│       ├── core/
│       │   ├── MobileContainer.tsx
│       │   └── MobilePresenter.tsx
│       ├── layouts/
│       │   └── BaseMobileLayout.tsx
│       ├── containers/
│       │   └── MobileFeatureContainer.tsx
│       ├── pages/
│       │   └── MobileFeaturePage.tsx
│       └── components/
│           └── MobileComponent.tsx
└── hooks/
    └── useDeviceDetection.ts
```

## Testing Checklist

### 1. Device Detection
- [ ] Shows mobile view on mobile devices
- [ ] Shows web view on desktop
- [ ] Proper tablet handling
- [ ] Responsive to orientation changes

### 2. Layout
- [ ] Header appears correctly
- [ ] Safe areas respected
- [ ] Proper spacing/padding
- [ ] Mobile-friendly touch targets
- [ ] Scrolling works correctly

### 3. Isolation
- [ ] No web styles leaking
- [ ] Mobile styles contained
- [ ] No shared state issues
- [ ] Proper route handling

### 4. Performance
- [ ] Fast initial load
- [ ] Smooth animations
- [ ] No unnecessary re-renders
- [ ] Optimized images

### 5. Progress Management
- [ ] Progress persistence works
- [ ] Dynamic loading fallbacks display correctly
- [ ] Error boundaries catch and display errors properly
- [ ] Progress tracking updates correctly

## Best Practices

### 1. Mobile Container Usage
- Always use MobileContainer for device detection
- Never implement device detection in pages
- Handle fallback content appropriately
- Keep container logic minimal

### 2. Layout Wrapper Usage
- Use BaseMobileLayout consistently
- Configure safe areas appropriately
- Handle header visibility properly
- Maintain proper spacing

### 3. Styling Guidelines
- Use mobile-specific class names
- Implement touch-friendly sizing
- Handle safe areas properly
- Use relative units (rem, vh, vw)

### 4. Code Organization
- Keep mobile code isolated
- Use proper naming conventions
- Maintain clear component hierarchy
- Document complex logic

### 5. Performance Considerations
- Lazy load when possible
- Optimize images for mobile
- Minimize bundle size
- Handle offline capabilities

## Advanced Implementation Recommendations

### 1. Shared Component Architecture
```typescript
// Implement shared components that work for both mobile and web
interface SharedComponentProps {
  isMobile?: boolean;
  // other shared props
}

// Example: shared/components/LevelCard.tsx
const LevelCard = ({ isMobile, ...props }: SharedComponentProps) => {
  return (
    <div className={`base-card ${isMobile ? 'mobile' : 'web'}`}>
      {/* Common structure, different styles */}
    </div>
  );
};
```

### 2. Centralized Content Management
```typescript
// constants/content.ts
export const SHARED_CONTENT = {
  // Define content once, use everywhere
  sections: {
    home: {
      title: 'Professional Hair Education',
      levels: [/* shared content */]
    }
  }
};
```

### 3. Improved State Management
```typescript
// hooks/useSharedState.ts
export function useSharedState() {
  // State management that works for both mobile and web
  return {
    state: {/* shared state */},
    actions: {/* shared actions */}
  };
}
```

### 4. Unified Layout System
- Use a common layout system that adapts to mobile/web
- Share layout components when possible
- Maintain consistent spacing and structure

### 5. Performance Optimizations
- Use dynamic imports for mobile-specific code
- Implement proper code splitting
- Cache device detection results
- Optimize bundle size for each platform

### 6. Type Safety and Shared Interfaces
```typescript
// types/shared.ts
export interface SharedTypes {
  // Define types that work across mobile and web
}
```

### 7. Best Practices for Shared Logic
- Create platform-agnostic business logic
- Use adapters for platform-specific features
- Implement shared validation and data processing
- Maintain consistent error handling

### 8. Testing Considerations
- Test components in both mobile and web contexts
- Use shared test utilities
- Implement platform-specific test cases
- Ensure consistent behavior across devices

### 9. Progress Management
```typescript
// hooks/useProgress.ts
export function useProgress(pageId: string) {
  const [progress, setProgress] = useState<{
    [key: string]: number;
  }>({});
  
  const updateProgress = useCallback((sectionId: string, value: number) => {
    setProgress(prev => ({
      ...prev,
      [sectionId]: value
    }));
    // Persist progress
    localStorage.setItem(`${pageId}_progress`, JSON.stringify(progress));
  }, [pageId]);

  return { progress, updateProgress };
}
```

### 10. Error Boundaries
```typescript
// components/mobile/core/MobileErrorBoundary.tsx
export function MobileErrorBoundary({ children }) {
  return (
    <ErrorBoundary fallback={<MobileErrorFallback />}>
      {children}
    </ErrorBoundary>
  );
}
```

## Complex UI Components Guidelines

### When to Use Separate Components

1. **Different Interaction Patterns**
   - When mobile and web require different user interaction models
   - Example: Color wheel with side panel (web) vs bottom sheet (mobile)
   - When touch-based vs mouse-based interactions differ significantly

2. **Layout Differences**
   - When components need fundamentally different layouts
   - Example: Grid layout for web vs stack layout for mobile
   - When screen real estate usage varies significantly

3. **Animation and Transitions**
   - When mobile needs specific gesture-based animations
   - When web uses hover states not available on mobile
   - When transition patterns differ between platforms

### Build System Considerations

1. **Shared Build Process**
   - All components (mobile and web) share the same build
   - Syntax errors in either will break the entire application
   - Need careful error handling and testing

2. **Code Organization**
   - Keep mobile components in dedicated folders
   - Use clear naming conventions
   - Maintain separation of concerns despite shared build

3. **Testing Requirements**
   - Test both interfaces after any changes
   - Verify changes don't break either interface
   - Use error boundaries effectively

### Best Practices for Complex UIs

1. **State Management**
   - Share business logic when possible
   - Keep UI state separate for each interface
   - Use common data models

2. **Component Structure**
   - Create platform-specific containers
   - Share utility functions and hooks
   - Keep platform-specific logic isolated

3. **Performance Optimization**
   - Use dynamic imports for large components
   - Implement proper loading states
   - Consider code splitting strategies

## Example Implementation

```typescript
// 1. Mobile Page (Presenter)
export function MobileFeaturePage() {
  return (
    <div className="mobile-feature">
      <MobileComponent />
    </div>
  );
}

// 2. Mobile Container
export function MobileFeatureContainer() {
  return (
    <MobileContainer>
      <BaseMobileLayout title="Feature">
        <MobileFeaturePage />
      </BaseMobileLayout>
    </MobileContainer>
  );
}

// 3. Main Page
export default function FeaturePage() {
  return (
    <>
      <MobileFeatureContainer />
      <div className="desktop-only">
        <WebFeatureUI />
      </div>
    </>
  );
}
```

## Common Pitfalls to Avoid
1. Modifying web files directly
2. Mixing mobile and web styles
3. Duplicating device detection
4. Skipping the container pattern
5. Ignoring safe areas
6. Using non-touch-friendly sizes

Remember: Mobile implementation should always be isolated, performant, and maintainable. Follow these guidelines strictly to ensure consistency across the application.
