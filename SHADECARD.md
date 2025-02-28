# Shade Card Mobile Implementation Plan

## Analysis & Requirements

### 1. UI/UX Analysis
- **Complex Interactive UI** ✓
- **Different Layout Requirements**:
  - Web: Grid layout with multiple columns, horizontal filters
  - Mobile: Single column scrollable, stacked filters
- **Interactive Elements**:
  - Search bar with mobile keyboard optimization
  - Filter dropdowns (Undertone, High Lift)
  - Slider for gray coverage
  - Color cards with star/favorite functionality
  - Compare/Guide buttons
  - Back to Level Wheel navigation

### 2. Component Structure

```typescript
// Directory Structure
src/components/mobile/
├── containers/
│   └── MobileShadeCardContainer.tsx    // Device detection & error boundary
├── pages/
│   └── MobileShadeCardPage.tsx         // Main mobile layout & state
└── components/shadecard/
    ├── MobileShadeSearch.tsx           // Mobile-optimized search
    ├── MobileShadeFilters.tsx          // Collapsible filters
    ├── MobileShadeGrid.tsx             // Virtualized shade grid
    ├── MobileShadeCard.tsx             // Individual shade card
    └── MobileCompareBar.tsx            // Bottom action bar
```

## Implementation Steps

### 1. Setup Container & Error Boundary
```typescript
// MobileShadeCardContainer.tsx
export function MobileShadeCardContainer() {
  const { isMobile } = useDeviceDetection();
  
  if (!isMobile) return null;
  
  return (
    <MobileErrorBoundary>
      <MobileShadeCardPage />
    </MobileErrorBoundary>
  );
}
```

### 2. Shared Business Logic
```typescript
// hooks/useShadeLogic.ts
export function useShadeLogic() {
  return {
    // Shade filtering
    filterShades: (criteria) => { /* ... */ },
    // Color matching
    findMatchingShades: (color) => { /* ... */ },
    // Favorites
    toggleFavorite: (shadeId) => { /* ... */ }
  };
}
```

### 3. Mobile-Specific UI Logic
```typescript
// hooks/useMobileShadeUI.ts
export function useMobileShadeUI() {
  const [isFiltersOpen, setFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [scrollPosition, setScrollPosition] = useState(0);

  // Touch gesture handlers
  const handleSwipe = () => { /* ... */ };
  
  // Filter collapse handlers
  const toggleFilters = () => { /* ... */ };

  return {
    isFiltersOpen,
    toggleFilters,
    handleSwipe,
    // ...
  };
}
```

### 4. Performance Optimizations

1. **Virtualized List**
```typescript
// components/shadecard/MobileShadeGrid.tsx
import { VirtualizedList } from 'react-virtualized';

export function MobileShadeGrid({ shades }) {
  return (
    <VirtualizedList
      data={shades}
      rowHeight={150}
      renderItem={({ item }) => (
        <MobileShadeCard shade={item} />
      )}
    />
  );
}
```

2. **Image Optimization**
```typescript
// components/shadecard/MobileShadeCard.tsx
import Image from 'next/image';

export function MobileShadeCard({ shade }) {
  return (
    <div className="mobile-shade-card">
      <Image
        src={shade.image}
        loading="lazy"
        sizes="(max-width: 768px) 100vw"
        {...imageProps}
      />
    </div>
  );
}
```

3. **Search Optimization**
```typescript
// hooks/useDebounceSearch.ts
export function useDebounceSearch() {
  const debounceSearch = useCallback(
    debounce((term) => {
      // Perform search
    }, 300),
    []
  );
}
```

## Existing Components

### Current File Structure
```
src/components/mobile/
├── containers/
│   └── MobileShadeCardContainer.tsx    // Main container with device detection
├── pages/
│   └── MobileShadeCardPage.tsx         // Main page component with filters and grid
└── shadecard/
    └── MobileShadeCard.tsx             // Individual shade card component
```

### Component Purposes

1. **MobileShadeCardContainer.tsx**
   - Handles device detection and routing
   - Manages global shade card state
   - Wraps page with error boundaries
   - Current features:
     ```typescript
     - Device detection
     - Basic state management for undertone and gray coverage
     - BaseMobileLayout integration
     ```

2. **MobileShadeCardPage.tsx**
   - Main page layout and organization
   - Implements search and filter UI
   - Manages shade grid display
   - Current features:
     ```typescript
     - Search bar implementation
     - Filter controls (undertone, gray coverage)
     - Basic shade grid layout
     - Menu integration
     ```

3. **MobileShadeCard.tsx**
   - Individual shade card display
   - Handles shade interactions
   - Shows shade details
   - Current features:
     ```typescript
     - Color circle display
     - Shade information popup
     - Click and touch interactions
     - Basic animations
     ```

### Integration Points

1. **Data Layer**
   - Currently using static `LEVEL_ONE_SHADES`
   - Need to integrate with Supabase `mobile_shade_card` table
   - Update data fetching and caching

2. **UI Updates Needed**
   - Mobile-optimized layouts
   - Touch-friendly interactions
   - Performance improvements
   - Error boundaries

3. **State Management**
   - Convert to use Supabase data
   - Implement proper caching
   - Add error handling

## Data Layer Integration

### 1. Supabase Table Structure
```typescript
interface MobileShadeCard {
  id: string;
  level: number;
  primary_tone: number;
  name: string;
  description: text;
  hex_color: string;
  rgb_r: number;
  rgb_g: number;
  rgb_b: number;
  series: shade_series;
  gray_coverage: number;
  lifting_power: number;
  undertone: string;
  is_high_lift: boolean;
  base_color: string;
  developer: number[];
  color_ratio: number;
  developer_ratio: number;
  processing_time_min: number;
  processing_time_max: number;
  created_at: timestamp;
  updated_at: timestamp;
}
```

### 2. Data Fetching Layer
```typescript
// hooks/useMobileShadeData.ts
export function useMobileShadeData() {
  const supabase = useSupabaseClient();
  const [shades, setShades] = useState<MobileShadeCard[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchShades = async (filters?: ShadeFilters) => {
    setLoading(true);
    let query = supabase
      .from('mobile_shade_card')
      .select('*');

    // Apply filters
    if (filters?.level) {
      query = query.eq('level', filters.level);
    }
    if (filters?.undertone) {
      query = query.eq('undertone', filters.undertone);
    }
    if (filters?.grayConverage) {
      query = query.gte('gray_coverage', filters.grayConverage);
    }
    if (filters?.isHighLift) {
      query = query.eq('is_high_lift', true);
    }

    const { data, error } = await query;
    setShades(data || []);
    setLoading(false);
    return { data, error };
  };

  return {
    shades,
    loading,
    fetchShades
  };
}
```

### 3. Mobile-Specific Data Transformations
```typescript
// utils/mobileShadeTransforms.ts
export function transformShadeForMobile(shade: MobileShadeCard) {
  return {
    ...shade,
    displayName: `${shade.level}.${shade.primary_tone} ${shade.name}`,
    processingTime: `${shade.processing_time_min}-${shade.processing_time_max} min`,
    mixingRatio: `${shade.color_ratio}:${shade.developer_ratio}`,
    rgbColor: `rgb(${shade.rgb_r},${shade.rgb_g},${shade.rgb_b})`
  };
}
```

### 4. Integration with UI Components
```typescript
// components/shadecard/MobileShadeGrid.tsx
export function MobileShadeGrid() {
  const { shades, loading, fetchShades } = useMobileShadeData();
  const { filters } = useMobileShadeFilters();

  useEffect(() => {
    fetchShades(filters);
  }, [filters]);

  if (loading) return <MobileShadeGridSkeleton />;

  return (
    <VirtualizedList
      data={shades.map(transformShadeForMobile)}
      renderItem={({ item }) => (
        <MobileShadeCard shade={item} />
      )}
    />
  );
}
```

### 5. Caching Strategy
```typescript
// hooks/useMobileShadeCache.ts
export function useMobileShadeCache() {
  const queryClient = useQueryClient();

  // Cache by filter combinations
  const getCacheKey = (filters: ShadeFilters) => 
    ['mobile-shades', filters].filter(Boolean);

  return {
    prefetchShades: async (filters: ShadeFilters) => {
      await queryClient.prefetchQuery({
        queryKey: getCacheKey(filters),
        queryFn: () => fetchShades(filters)
      });
    },
    invalidateShades: () => 
      queryClient.invalidateQueries({ queryKey: ['mobile-shades'] })
  };
}
```

## Testing Requirements

### 1. Functionality Testing
- [ ] Search functionality with mobile keyboard
- [ ] Filter interactions and combinations
- [ ] Shade card selection and details
- [ ] Favorites toggling
- [ ] Compare feature
- [ ] Navigation back to level wheel

### 2. Performance Testing
- [ ] Scroll performance with 50+ shades
- [ ] Search response time
- [ ] Image loading optimization
- [ ] Filter application speed
- [ ] Touch response time

### 3. UI/UX Testing
- [ ] Filter visibility and usability
- [ ] Touch target sizes
- [ ] Gesture recognition
- [ ] Keyboard interaction
- [ ] Error state handling
- [ ] Loading states

### 4. Device Testing
- [ ] Various screen sizes
- [ ] Different iOS versions
- [ ] Different Android versions
- [ ] Tablet layout
- [ ] Orientation changes

## Next Steps

1. Create basic container and error boundary
2. Implement core shade card component
3. Add search and filter functionality
4. Implement virtualized grid
5. Add compare functionality
6. Optimize performance
7. Add tests
8. Documentation
