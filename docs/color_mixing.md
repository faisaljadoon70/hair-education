# Hair Color Mixing Implementation Guide

## Problem Statement
Currently, our hair color mixing implementation produces inaccurate results:
- When mixing Level 8 and Level 9, it simply shows Level 9
- No consideration for mixing ratios (assumes 50/50)
- Doesn't account for undertones
- Limited to basic hex color averaging

## Implementation Journey

### Phase 1: Basic Color Space Implementation
```typescript
// Initial interfaces
interface HairColor {
  level: number;
  hexColor: string;
  undertone: 'warm' | 'cool' | 'neutral';
  lab?: { L: number; a: number; b: number };
}

interface MixResult {
  resultLevel: number;
  resultHex: string;
  resultLab: { L: number; a: number; b: number };
}
```

#### Core Features
1. Lab color space calculations for accurate mixing
2. Support for weighted ratios (e.g., 70/30 mix)
3. Undertone consideration in calculations
4. Real-time mixing updates

### Phase 2: Mobile-Specific Implementation
Following mobile-first architecture in `src/components/mobile/`:

```typescript
// src/components/mobile/core/colorMixing.ts
export class MobileColorMixer {
  // Color conversion utilities
  private hexToRgb(hex: string): { r: number; g: number; b: number };
  private rgbToLab(r: number, g: number, b: number): { L: number; a: number; b: number };
  private labToHex(L: number, a: number, b: number): string;
  
  // Main mixing function
  public mixHairColors(color1: HairColor, color2: HairColor, ratio: number): MixResult;
}
```

#### Mobile-Specific Features
1. Touch-based ratio adjustments
2. Visual mixing process representation
3. Local storage for mixing history
4. Progress tracking integration

#### Mobile Touch Interactions
```typescript
interface TouchMixingControl {
  startPoint: { x: number; y: number };
  currentRatio: number;
  isAdjusting: boolean;
}

class MobileColorMixingGestures {
  private touchState: TouchMixingControl = {
    startPoint: { x: 0, y: 0 },
    currentRatio: 0.5,
    isAdjusting: false
  };

  // Handle touch-based ratio adjustment
  handleTouchStart(event: TouchEvent) {
    const touch = event.touches[0];
    this.touchState.startPoint = { 
      x: touch.clientX, 
      y: touch.clientY 
    };
    this.touchState.isAdjusting = true;
  }

  // Calculate ratio based on touch movement
  handleTouchMove(event: TouchEvent) {
    if (!this.touchState.isAdjusting) return;
    
    const touch = event.touches[0];
    const deltaX = touch.clientX - this.touchState.startPoint.x;
    
    // Convert movement to ratio change (1 unit = 100px)
    const ratioChange = deltaX / 100;
    this.touchState.currentRatio = Math.max(0, Math.min(1, 0.5 + ratioChange));
    
    // Trigger real-time mixing update
    this.updateMixing(this.touchState.currentRatio);
  }

  // Smooth animation for ratio updates
  private updateMixing(ratio: number) {
    requestAnimationFrame(() => {
      // Update UI with new ratio
      // Trigger color recalculation
    });
  }
}
```

### Phase 3: Future ML Integration
Preparation for machine learning enhancement:
1. Data collection structure
2. User feedback system
3. Color accuracy validation
4. Training data preparation

## Technical Implementation Details

### Color Space Conversions
```typescript
// Hex to RGB conversion
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

// RGB to Lab conversion
function rgbToLab(r: number, g: number, b: number): { L: number; a: number; b: number } {
  // Complex conversion logic here
  return { L, a, b };
}
```

### Main Mixing Algorithm
```typescript
function mixHairColors(color1: HairColor, color2: HairColor, ratio: number): MixResult {
  // Ensure Lab values are computed
  if (!color1.lab) {
    const { r, g, b } = hexToRgb(color1.hexColor);
    color1.lab = rgbToLab(r, g, b);
  }
  
  // Mix in Lab space
  const mixedLab = {
    L: color1.lab.L * (1 - ratio) + color2.lab.L * ratio,
    a: color1.lab.a * (1 - ratio) + color2.lab.a * ratio,
    b: color1.lab.b * (1 - ratio) + color2.lab.b * ratio,
  };
  
  return {
    resultLevel: color1.level * (1 - ratio) + color2.level * ratio,
    resultHex: labToHex(mixedLab.L, mixedLab.a, mixedLab.b),
    resultLab: mixedLab
  };
}
```

### Progress Tracking
```typescript
interface MixingHistory {
  id: string;
  timestamp: number;
  color1: HairColor;
  color2: HairColor;
  ratio: number;
  result: MixResult;
}

// Local storage integration
const saveMixingHistory = (history: MixingHistory) => {
  const key = 'hairColorMixingHistory';
  const existing = localStorage.getItem(key);
  const existingHistory = existing ? JSON.parse(existing) : [];
  localStorage.setItem(key, JSON.stringify([...existingHistory, history]));
};
```

### Additional Implementation Details

#### User Feedback System
```typescript
interface UserFeedback {
  mixingId: string;
  actualResult: string;
  expectedResult: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comments?: string;
}

// Feedback collection utility
const collectUserFeedback = async (feedback: UserFeedback) => {
  // Store feedback in localStorage for immediate access
  const key = 'hairColorFeedbackHistory';
  const existing = localStorage.getItem(key);
  const existingFeedback = existing ? JSON.parse(existing) : [];
  localStorage.setItem(key, JSON.stringify([...existingFeedback, feedback]));

  // Send to backend for ML training
  await fetch('/api/feedback', {
    method: 'POST',
    body: JSON.stringify(feedback)
  });
};
```

#### Device Camera Integration
```typescript
interface ColorDetection {
  capturedHex: string;
  confidence: number;
  timestamp: number;
}

class ColorCameraDetector {
  // Initialize camera with proper permissions
  async initialize(): Promise<boolean> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Setup video element and canvas for color detection
      return true;
    } catch (error) {
      console.error('Camera access denied:', error);
      return false;
    }
  }

  // Detect dominant color from video frame
  async detectColor(): Promise<ColorDetection> {
    // Capture frame and process for color
    return {
      capturedHex: '#detected_color',
      confidence: 0.95,
      timestamp: Date.now()
    };
  }
}
```

#### Non-Linear Color Mixing
```typescript
// Sigmoid function for smooth non-linear transitions
function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-12 * (x - 0.5)));
}

// Enhanced mixing algorithm with non-linear handling
function calculateNonLinearRatio(level1: number, level2: number, ratio: number): number {
  const levelDiff = Math.abs(level1 - level2);
  // Apply sigmoid function for large level differences
  return levelDiff > 3 ? sigmoid(ratio) : ratio;
}

// Enhanced mixing function
function enhancedMixHairColors(color1: HairColor, color2: HairColor, ratio: number): MixResult {
  // Apply non-linear adjustment for levels
  const adjustedRatio = calculateNonLinearRatio(color1.level, color2.level, ratio);
  
  // Mix colors in Lab space with adjusted ratio
  const mixedLab = {
    L: color1.lab.L * (1 - adjustedRatio) + color2.lab.L * adjustedRatio,
    a: color1.lab.a * (1 - adjustedRatio) + color2.lab.a * adjustedRatio,
    b: color1.lab.b * (1 - adjustedRatio) + color2.lab.b * adjustedRatio,
  };

  return {
    resultLevel: color1.level * (1 - adjustedRatio) + color2.level * adjustedRatio,
    resultHex: labToHex(mixedLab.L, mixedLab.a, mixedLab.b),
    resultLab: mixedLab
  };
}
```

## Mobile UI Components

#### History Panel Component
```typescript
interface HistoryPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = React.memo(({ isOpen, onToggle }) => {
  const history = getMixingHistory();

  return (
    <div className={`history-panel ${isOpen ? 'open' : ''}`}>
      <button onClick={onToggle}>
        {isOpen ? 'Hide History' : 'Show History'}
      </button>
      {isOpen && (
        <div className="history-list">
          {history.map((item, index) => (
            <div key={index} className="history-item">
              <span>Level: {item.resultLevel}</span>
              <div 
                className="color-preview" 
                style={{ backgroundColor: item.resultHex }} 
              />
              <span>{new Date(item.timestamp).toLocaleString()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

HistoryPanel.displayName = 'HistoryPanel';
```

#### Touch Feedback Component
```typescript
interface RippleEffect {
  x: number;
  y: number;
  size: number;
}

const TouchRipple: React.FC<{ onClick: (e: React.MouseEvent) => void }> = React.memo(({ onClick }) => {
  const [ripples, setRipples] = useState<RippleEffect[]>([]);

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ripple = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      size: Math.max(rect.width, rect.height)
    };
    
    setRipples([...ripples, ripple]);
    onClick(e);
    
    // Clean up ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.slice(1));
    }, 1000);
  };

  return (
    <div className="ripple-container" onClick={handleClick}>
      {ripples.map((ripple, i) => (
        <span 
          key={i}
          className="ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size
          }}
        />
      ))}
    </div>
  );
});

TouchRipple.displayName = 'TouchRipple';
```

#### Optimized Container Component
```typescript
const ColorMixerContainer: React.FC = () => {
  const [color1, setColor1] = useState<HairColor>({ 
    level: 8, 
    hexColor: '#b5a18a', 
    undertone: 'warm' 
  });
  const [color2, setColor2] = useState<HairColor>({ 
    level: 9, 
    hexColor: '#d4c4b0', 
    undertone: 'neutral' 
  });
  const [ratio, setRatio] = useState(0.7);
  const [result, setResult] = useState<MixResult | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Memoize mixing calculation
  const mixedResult = useMemo(() => 
    mixHairColors(color1, color2, ratio),
    [color1, color2, ratio]
  );

  // Debounced save to history
  const debouncedSave = useCallback(
    debounce((result: MixResult) => {
      saveToMixingHistory(result);
    }, 500),
    []
  );

  useEffect(() => {
    setResult(mixedResult);
    debouncedSave(mixedResult);
  }, [mixedResult, debouncedSave]);

  return (
    <div className="color-mixer-container">
      <MixingVisualizer 
        color1={color1.hexColor} 
        color2={color2.hexColor} 
        ratio={ratio} 
      />
      <RatioSlider 
        initialRatio={ratio} 
        onRatioChange={setRatio} 
      />
      <TouchRipple onClick={() => setIsHistoryOpen(!isHistoryOpen)} />
      <HistoryPanel 
        isOpen={isHistoryOpen} 
        onToggle={() => setIsHistoryOpen(!isHistoryOpen)} 
      />
    </div>
  );
};

export default React.memo(ColorMixerContainer);
```

### Performance Optimizations
1. Component Memoization:
   - Use React.memo for pure components
   - Memoize expensive calculations with useMemo
   - Debounce history saves
   
2. Touch Optimizations:
   - Hardware-accelerated animations
   - Efficient ripple effects
   - Smooth history panel transitions

3. State Management:
   - Local state for UI components
   - Memoized callbacks
   - Optimized re-renders

## Optimization Strategies

### Performance
1. Precompute Lab values for common colors
2. Memoize mixing results for frequent combinations
3. Debounce real-time updates
4. Use Web Workers for heavy calculations

### Edge Cases
1. Handle very different levels (e.g., Level 2 + Level 9)
2. Account for undertone conflicts
3. Validate and clamp result values
4. Handle invalid input gracefully

## Testing Requirements
1. Unit tests for color conversions
2. Integration tests for mixing algorithm
3. Mobile-specific interaction tests
4. Performance benchmarks

## Future Enhancements
1. ML model integration for improved accuracy
2. Spectral color handling
3. Advanced undertone mixing
4. Real-time camera color detection

## Mobile-Specific Considerations
1. Touch Gesture Support:
   - Horizontal swipe for ratio adjustment
   - Pinch-to-zoom for detailed color view
   - Double-tap to reset mix ratio

2. Mobile Performance:
   - Debounce touch events
   - Use hardware acceleration
   - Optimize repaints

3. Mobile UI Adaptations:
   - Larger touch targets
   - Clear visual feedback
   - Mobile-friendly sliders

## Updated Implementation Checklist
- [ ] Set up basic color mixing structure
- [ ] Implement color space conversions
- [ ] Create mobile-specific components
- [ ] Add progress tracking
- [ ] Implement history saving
- [ ] Add touch interactions
- [ ] Set up testing framework
- [ ] Add performance optimizations
- [ ] Prepare for ML integration
- [ ] Implement user feedback system
- [ ] Add camera color detection
- [ ] Implement non-linear mixing for edge cases
- [ ] Add real-time validation
- [ ] Set up data collection pipeline
