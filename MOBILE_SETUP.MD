# Mobile Setup Guide

This guide provides step-by-step instructions for adding mobile support to web interface pages.

## Critical Rules
1. NEVER modify web interface files directly
2. Keep ALL mobile code in `/src/components/mobile/`
3. Always use device detection before showing mobile UI
4. Mobile styles must not affect web styles

## Step-by-Step Implementation

### Step 1: Create Mobile Container
```typescript
// src/components/mobile/containers/MobileFeatureContainer.tsx

'use client';

import useDeviceDetection from '@/hooks/useDeviceDetection';
import MobileFeaturePage from '../pages/MobileFeaturePage';
import { useState, useEffect } from 'react';

interface MobileFeatureContainerProps {
  children: React.ReactNode;
}

export default function MobileFeatureContainer({ children }: MobileFeatureContainerProps) {
  const { isMobile } = useDeviceDetection();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  // Add business logic here
  useEffect(() => {
    if (!isMobile) return;
    // Load data, handle state, etc.
  }, [isMobile]);

  if (isMobile) {
    return <MobileFeaturePage isLoading={isLoading} data={data} />;
  }

  return <>{children}</>;
}
```

### Step 2: Create Mobile Page (Presenter)
```typescript
// src/components/mobile/pages/MobileFeaturePage.tsx

'use client';

import React from 'react';
import BaseMobileLayout from '../layouts/BaseMobileLayout';

interface MobileFeaturePageProps {
  isLoading: boolean;
  data: any;
}

const MobileFeaturePage: React.FC<MobileFeaturePageProps> = ({
  isLoading,
  data
}) => {
  return (
    <BaseMobileLayout 
      title="Your Title"
      showBackButton={true}
    >
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-600 border-t-transparent"></div>
        </div>
      ) : (
        <div className="p-4">
          {/* Your mobile UI here */}
        </div>
      )}
    </BaseMobileLayout>
  );
};

export default MobileFeaturePage;
```

### Step 3: Update Web Page
```typescript
// src/app/your-feature/page.tsx

'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import useDeviceDetection from '@/hooks/useDeviceDetection';
import MobileFeatureContainer from '@/components/mobile/containers/MobileFeatureContainer';

export default function YourFeaturePage() {
  const { isMobile } = useDeviceDetection();

  return (
    <ProtectedRoute>
      {isMobile ? (
        <MobileFeatureContainer />
      ) : (
        // Web UI remains unchanged
        <div className="web-ui">
          {/* ... */}
        </div>
      )}
    </ProtectedRoute>
  );
}
```

## Implementation Checklist

### 1. Container Setup
- [ ] Create container in `/mobile/containers/`
- [ ] Import useDeviceDetection
- [ ] Add children prop interface
- [ ] Implement device detection
- [ ] Add business logic (data loading, state management)
- [ ] Return mobile page or children based on device

### 2. Page (Presenter) Setup
- [ ] Create page in `/mobile/pages/`
- [ ] Import BaseMobileLayout
- [ ] Define props interface for data
- [ ] Use BaseMobileLayout with proper title
- [ ] Implement loading state
- [ ] Add mobile-specific UI components
- [ ] Use proper mobile styling classes

### 3. Web Page Integration
- [ ] Import mobile container
- [ ] Add device detection
- [ ] Wrap mobile container in condition
- [ ] Keep web UI unchanged

## Common Patterns

### Loading States
```typescript
{isLoading ? (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-600 border-t-transparent"></div>
  </div>
) : (
  // Content
)}
```

### Mobile Layout Usage
```typescript
<BaseMobileLayout 
  title="Page Title"
  showBackButton={true}
  className="custom-class"
>
  {/* Content */}
</BaseMobileLayout>
```

### Data Loading Pattern
```typescript
useEffect(() => {
  const loadData = async () => {
    if (!isMobile) return;
    setIsLoading(true);
    try {
      // Load data
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  loadData();
}, [isMobile]);
```

## Testing
1. Test on both mobile and desktop devices
2. Verify device detection works
3. Check loading states
4. Ensure web UI remains unchanged
5. Verify mobile styles don't affect web

## Troubleshooting
1. If mobile UI shows on desktop:
   - Check device detection in container
   - Verify condition in web page

2. If styles leak to web:
   - Use mobile-specific classes
   - Check BaseMobileLayout usage

3. If header missing:
   - Verify BaseMobileLayout import
   - Check showHeader prop
