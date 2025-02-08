# Professional Hair Color Wheel Implementation Guide

## Step 1: Project Setup

### 1.1 Development Environment Setup
```bash
# Initialize Next.js project with TypeScript
npx create-next-app@latest hair-color-wheel --typescript --tailwind
cd hair-color-wheel

# Essential Dependencies
npm install @supabase/supabase-js     # Database
npm install color-convert              # Color space conversions
npm install @use-gesture/react         # Touch/mouse interactions
npm install react-spring              # Smooth animations
npm install three                     # WebGL rendering
npm install @types/color-convert      # TypeScript definitions
npm install d3                        # For advanced color calculations
npm install jest @testing-library/react @testing-library/jest-dom # Testing
npm install eslint eslint-config-next # Linting
npm install prettier                  # Code formatting
npm install husky lint-staged         # Pre-commit hooks
```

### 1.2 Project Structure
```plaintext
src/
├── components/
│   ├── ColorWheel/
│   │   ├── index.tsx                # Main wheel component
│   │   ├── Canvas.tsx               # Canvas renderer
│   │   ├── SVG.tsx                  # SVG renderer
│   │   ├── WebGL.tsx                # WebGL renderer
│   │   ├── Controls.tsx             # Wheel controls
│   │   ├── Calibration.tsx          # Display calibration
│   │   ├── Legend.tsx               # Color level legend
│   │   ├── PigmentDisplay.tsx       # Underlying pigment display
│   │   └── types.ts                 # Wheel-specific types
│   ├── Formula/
│   │   ├── Calculator.tsx           # Formula calculations
│   │   ├── Display.tsx              # Formula display
│   │   ├── History.tsx             # Formula history
│   │   └── Validation.tsx          # Formula validation
│   └── Client/
│       ├── History.tsx              # Client history
│       ├── Record.tsx               # Client records
│       ├── Notes.tsx               # Client notes
│       └── Analysis.tsx            # Hair analysis
├── lib/
│   ├── colors/
│   │   ├── conversion.ts            # Color space conversions
│   │   ├── calibration.ts           # Screen calibration
│   │   ├── standards.ts             # Professional standards
│   │   ├── validation.ts           # Color validation
│   │   └── calculations.ts         # Advanced calculations
│   ├── database/
│   │   ├── schema.ts                # Database schema
│   │   ├── queries.ts               # Database queries
│   │   ├── migrations/             # Database migrations
│   │   └── seeds/                  # Seed data
│   └── utils/
│       ├── formulas.ts              # Formula calculations
│       ├── validation.ts            # Input validation
│       ├── error-handling.ts       # Error handling
│       ├── logging.ts              # Logging utilities
│       └── testing.ts              # Test utilities
├── tests/
│   ├── unit/
│   │   ├── ColorWheel.test.tsx     # Color wheel tests
│   │   └── Formula.test.tsx        # Formula tests
│   └── integration/
│       ├── ColorSystem.test.tsx    # System integration tests
│       └── ClientFlow.test.tsx     # Client flow tests
└── types/
    ├── color.ts                     # Color types
    ├── formula.ts                   # Formula types
    ├── client.ts                    # Client types
    └── errors.ts                   # Error types
```

### 1.3 Environment Configuration
```typescript
// .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
NEXT_PUBLIC_COLOR_CALIBRATION=enabled
NEXT_PUBLIC_ENVIRONMENT=development
NEXT_PUBLIC_API_VERSION=v1
NEXT_PUBLIC_LOGGING_LEVEL=debug
```

### 1.4 Testing Setup
```typescript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
  ],
};
```

### 1.5 Error Handling Setup
```typescript
// types/errors.ts
export enum ColorWheelErrorType {
  CALIBRATION_FAILED = 'CALIBRATION_FAILED',
  INVALID_COLOR = 'INVALID_COLOR',
  CONVERSION_ERROR = 'CONVERSION_ERROR',
  FORMULA_ERROR = 'FORMULA_ERROR',
}

export class ColorWheelError extends Error {
  constructor(
    public type: ColorWheelErrorType,
    public message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ColorWheelError';
  }
}

// lib/utils/error-handling.ts
export const handleColorError = (error: ColorWheelError) => {
  switch (error.type) {
    case ColorWheelErrorType.CALIBRATION_FAILED:
      // Handle calibration errors
      break;
    case ColorWheelErrorType.INVALID_COLOR:
      // Handle invalid color errors
      break;
    // ... handle other cases
  }
};
```

### 1.6 Rendering Technology Comparison
| Feature | SVG | Canvas | WebGL |
|---------|-----|--------|-------|
| Performance | Good for <1000 elements | Good for <10000 elements | Excellent for >10000 elements |
| Memory Usage | Higher | Medium | Lower |
| Interactivity | Native DOM events | Manual implementation | Manual with shaders |
| Animation | CSS/JS animations | requestAnimationFrame | GPU-accelerated |
| Color Accuracy | Good | Better | Best |
| Device Support | All modern browsers | All modern browsers | Most modern browsers |
| Touch Support | Native | Manual | Manual |
| Accessibility | Native | Manual | Manual |

### 1.7 Performance Optimization
```typescript
// lib/utils/performance.ts
export const PERFORMANCE_THRESHOLDS = {
  LOW: {
    maxElements: 1000,
    updateInterval: 60,  // 60ms
    batchSize: 100
  },
  MEDIUM: {
    maxElements: 5000,
    updateInterval: 30,  // 30ms
    batchSize: 500
  },
  HIGH: {
    maxElements: 10000,
    updateInterval: 16,  // 16ms (~60fps)
    batchSize: 1000
  }
};

export const getOptimalRenderer = (
  elements: number,
  deviceCapabilities: DeviceCapabilities
): 'svg' | 'canvas' | 'webgl' => {
  if (elements > PERFORMANCE_THRESHOLDS.MEDIUM.maxElements && 
      deviceCapabilities.webgl2Supported) {
    return 'webgl';
  }
  if (elements > PERFORMANCE_THRESHOLDS.LOW.maxElements) {
    return 'canvas';
  }
  return 'svg';
};
```

### 1.8 Device Calibration
```typescript
// lib/colors/deviceCalibration.ts
export interface DeviceCapabilities {
  screenResolution: {
    width: number;
    height: number;
    dpi: number;
  };
  colorDepth: number;
  webgl2Supported: boolean;
  touchSupported: boolean;
  performanceGrade: 'low' | 'medium' | 'high';
}

export const calibrateDevice = async (): Promise<DeviceProfile> => {
  const profile = await detectDeviceCapabilities();
  const colorProfile = await calibrateColorDisplay();
  const touchProfile = await calibrateTouchInput();
  
  return {
    capabilities: profile,
    color: colorProfile,
    touch: touchProfile,
    timestamp: new Date(),
    validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  };
};
```

### 1.9 Caching Strategy
```typescript
// lib/utils/cache.ts
interface CacheConfig {
  maxAge: number;        // Maximum age in milliseconds
  version: string;       // Cache version
  prefix: string;        // Cache key prefix
}

export class ColorWheelCache {
  private config: CacheConfig;

  constructor(config: CacheConfig) {
    this.config = config;
  }

  async get<T>(key: string): Promise<T | null> {
    const cacheKey = this.getCacheKey(key);
    const cached = localStorage.getItem(cacheKey);
    
    if (!cached) return null;
    
    const { data, timestamp, version } = JSON.parse(cached);
    
    if (version !== this.config.version || 
        Date.now() - timestamp > this.config.maxAge) {
      localStorage.removeItem(cacheKey);
      return null;
    }
    
    return data as T;
  }

  async set<T>(key: string, data: T): Promise<void> {
    const cacheKey = this.getCacheKey(key);
    const cacheData = {
      data,
      timestamp: Date.now(),
      version: this.config.version
    };
    
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  }

  private getCacheKey(key: string): string {
    return `${this.config.prefix}:${key}`;
  }
}

// Initialize cache
export const colorWheelCache = new ColorWheelCache({
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  version: '1.0.0',
  prefix: 'color-wheel'
});
```

### 1.10 Logging System
```typescript
// lib/utils/logging.ts
enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: any;
}

class ColorWheelLogger {
  private static instance: ColorWheelLogger;
  private logs: LogEntry[] = [];
  
  static getInstance(): ColorWheelLogger {
    if (!ColorWheelLogger.instance) {
      ColorWheelLogger.instance = new ColorWheelLogger();
    }
    return ColorWheelLogger.instance;
  }

  log(level: LogLevel, message: string, context?: any) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context
    };

    this.logs.push(entry);
    
    // Send to monitoring service if in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToMonitoring(entry);
    }

    // Console output in development
    if (process.env.NODE_ENV === 'development') {
      console[level](message, context);
    }
  }

  private async sendToMonitoring(entry: LogEntry) {
    // Implementation for sending logs to monitoring service
  }

  getLogs(level?: LogLevel): LogEntry[] {
    return level 
      ? this.logs.filter(log => log.level === level)
      : this.logs;
  }
}

export const logger = ColorWheelLogger.getInstance();
```

### 1.11 Error Recovery
```typescript
// lib/utils/errorRecovery.ts
interface RecoveryStrategy {
  type: 'retry' | 'fallback' | 'reset';
  maxAttempts?: number;
  delay?: number;
  fallbackValue?: any;
}

export class ErrorRecovery {
  private static async retry<T>(
    operation: () => Promise<T>,
    maxAttempts: number,
    delay: number
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        if (attempt < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw lastError;
  }

  static async recover<T>(
    operation: () => Promise<T>,
    strategy: RecoveryStrategy
  ): Promise<T> {
    try {
      switch (strategy.type) {
        case 'retry':
          return await this.retry(
            operation,
            strategy.maxAttempts || 3,
            strategy.delay || 1000
          );
        
        case 'fallback':
          try {
            return await operation();
          } catch {
            return strategy.fallbackValue;
          }
        
        case 'reset':
          try {
            return await operation();
          } catch {
            // Reset application state
            localStorage.clear();
            window.location.reload();
            throw new Error('Application reset required');
          }
      }
    } catch (error) {
      logger.log(LogLevel.ERROR, 'Recovery failed', { error, strategy });
      throw error;
    }
  }
}
```

### 1.12 Accessibility Features
```typescript
// components/ColorWheel/Accessibility.tsx
interface AccessibilityProps {
  enabled: boolean;
  announcements: boolean;
  highContrast: boolean;
  keyboardNavigation: boolean;
}

export const AccessibilityProvider: React.FC<AccessibilityProps> = ({
  enabled,
  announcements,
  highContrast,
  keyboardNavigation,
  children
}) => {
  const handleKeyboard = (event: KeyboardEvent) => {
    if (!keyboardNavigation) return;
    
    switch (event.key) {
      case 'ArrowRight':
        // Navigate to next color level
        break;
      case 'ArrowLeft':
        // Navigate to previous color level
        break;
      case 'Enter':
        // Select current color level
        break;
    }
  };

  const announce = (message: string) => {
    if (!announcements) return;
    
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'alert');
    announcement.setAttribute('aria-live', 'polite');
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
  };

  useEffect(() => {
    if (enabled && keyboardNavigation) {
      window.addEventListener('keydown', handleKeyboard);
      return () => window.removeEventListener('keydown', handleKeyboard);
    }
  }, [enabled, keyboardNavigation]);

  return (
    <AccessibilityContext.Provider value={{ announce, highContrast }}>
      {children}
    </AccessibilityContext.Provider>
  );
};
```

### 1.13 Mobile Optimization
```typescript
// lib/utils/mobileOptimization.ts
interface MobileConfig {
  touchRadius: number;      // Touch target size
  gestureThreshold: number; // Minimum distance for gesture
  hapticFeedback: boolean;  // Enable vibration
  performanceMode: 'low' | 'medium' | 'high';
}

export class MobileOptimizer {
  private config: MobileConfig;
  
  constructor(config: MobileConfig) {
    this.config = config;
  }

  optimizeForDevice(): void {
    // Adjust rendering quality based on device capabilities
    if (this.isLowEndDevice()) {
      this.config.performanceMode = 'low';
    }

    // Enable hardware acceleration
    document.body.style.transform = 'translateZ(0)';
    
    // Add touch-specific styles
    document.documentElement.style.setProperty(
      '--touch-target-size',
      `${this.config.touchRadius}px`
    );

    // Add viewport meta tags
    this.addViewportMeta();
  }

  private isLowEndDevice(): boolean {
    return !matchMedia('(min-resolution: 2dppx)').matches ||
           navigator.hardwareConcurrency <= 4;
  }

  private addViewportMeta(): void {
    const viewport = document.createElement('meta');
    viewport.name = 'viewport';
    viewport.content = [
      'width=device-width',
      'initial-scale=1',
      'viewport-fit=cover',
      'user-scalable=no'
    ].join(', ');
    document.head.appendChild(viewport);
  }

  enableHapticFeedback(): void {
    if (!this.config.hapticFeedback) return;
    
    if ('vibrate' in navigator) {
      document.addEventListener('click', () => {
        navigator.vibrate(1);
      });
    }
  }
}

// Initialize mobile optimization
export const mobileOptimizer = new MobileOptimizer({
  touchRadius: 44,         // Apple's recommended minimum
  gestureThreshold: 10,    // 10px minimum for gesture
  hapticFeedback: true,
  performanceMode: 'high'
});
```

### 1.14 Hybrid Rendering Strategy
```typescript
// lib/rendering/HybridRenderer.ts
interface HybridRendererConfig {
  preferredMode: 'svg' | 'canvas' | 'webgl';
  fallbackOrder: ('svg' | 'canvas' | 'webgl')[];
  thresholds: {
    svg: number;
    canvas: number;
    webgl: number;
  };
}

export class HybridRenderer {
  private config: HybridRendererConfig;
  private currentMode: 'svg' | 'canvas' | 'webgl';
  private renderers: Map<string, any>;

  constructor(config: HybridRendererConfig) {
    this.config = config;
    this.renderers = new Map();
    this.currentMode = this.determineOptimalMode();
  }

  private determineOptimalMode(): 'svg' | 'canvas' | 'webgl' {
    // Check WebGL support
    const canvas = document.createElement('canvas');
    const hasWebGL = !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    
    // Check device capabilities
    const devicePixelRatio = window.devicePixelRatio || 1;
    const isHighDensityDisplay = devicePixelRatio > 1;
    
    // Make decision based on capabilities and thresholds
    if (hasWebGL && this.config.thresholds.webgl > 0) {
      return 'webgl';
    }
    
    if (isHighDensityDisplay && this.config.thresholds.canvas > 0) {
      return 'canvas';
    }
    
    return 'svg';
  }

  async initialize(): Promise<void> {
    // Initialize primary renderer
    await this.initializeRenderer(this.currentMode);
    
    // Initialize fallbacks
    for (const mode of this.config.fallbackOrder) {
      if (mode !== this.currentMode) {
        await this.initializeRenderer(mode);
      }
    }
  }

  private async initializeRenderer(mode: 'webgl' | 'canvas' | 'svg'): Promise<void> {
    switch (mode) {
      case 'webgl':
        this.renderers.set('webgl', new WebGLRenderer());
        break;
      case 'canvas':
        this.renderers.set('canvas', new CanvasRenderer());
        break;
      case 'svg':
        this.renderers.set('svg', new SVGRenderer());
        break;
    }
  }

  async render(scene: ColorWheelScene): Promise<void> {
    try {
      const renderer = this.renderers.get(this.currentMode);
      await renderer.render(scene);
    } catch (error) {
      logger.log(LogLevel.ERROR, 'Primary renderer failed', { error });
      await this.fallback(scene);
    }
  }

  private async fallback(scene: ColorWheelScene): Promise<void> {
    for (const mode of this.config.fallbackOrder) {
      try {
        const fallbackRenderer = this.renderers.get(mode);
        await fallbackRenderer.render(scene);
        this.currentMode = mode;
        return;
      } catch (error) {
        logger.log(LogLevel.ERROR, `Fallback to ${mode} failed`, { error });
        continue;
      }
    }
    throw new Error('All rendering modes failed');
  }
}
```

### 1.15 State Management
```typescript
// lib/state/ColorWheelState.ts
import { createContext, useContext, useReducer } from 'react';
import { ColorLevel, ColorWheelConfig } from '@/types/color';
import { ColorWheelError, ColorWheelErrorType } from '@/types/errors';

export const colorWheelReducer = (
  state: ColorWheelState,
  action: ColorWheelAction
): ColorWheelState => {
  switch (action.type) {
    case 'SELECT_LEVEL':
      return {
        ...state,
        selectedLevel: action.level
      };
    
    case 'UPDATE_CONFIG':
      return {
        ...state,
        config: {
          ...state.config,
          ...action.config
        }
      };
    
    case 'ADD_TO_HISTORY':
      return {
        ...state,
        history: [...state.history, action.level]
      };
    
    case 'UPDATE_CALIBRATION':
      return {
        ...state,
        calibration: action.calibration
      };
    
    case 'RESET_STATE':
      return initialState;
    
    default:
      return state;
  }
};

// Create context
const ColorWheelContext = createContext<{
  state: ColorWheelState;
  dispatch: React.Dispatch<ColorWheelAction>;
} | null>(null);

// Provider component
export const ColorWheelProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(colorWheelReducer, initialState);

  // Persist state changes
  useEffect(() => {
    colorWheelCache.set('colorWheel:state', state);
  }, [state]);

  return (
    <ColorWheelContext.Provider value={{ state, dispatch }}>
      {children}
    </ColorWheelContext.Provider>
  );
};

// Custom hook for accessing state
export const useColorWheel = () => {
  const context = useContext(ColorWheelContext);
  if (!context) {
    throw new Error('useColorWheel must be used within ColorWheelProvider');
  }
  return context;
};
```

### 1.16 Integration Testing
```typescript
// tests/integration/ColorWheel.test.tsx

import { render, fireEvent } from '@testing-library/react';
import { ColorWheelProvider } from '@/lib/state/ColorWheelState';
import { ColorWheel } from '@/components/ColorWheel';
import { mockColorLevels } from '@/tests/mocks/colorData';

describe('ColorWheel Integration', () => {
  beforeEach(() => {
    // Reset cache and local storage
    localStorage.clear();
    // Mock device capabilities
    Object.defineProperty(window, 'devicePixelRatio', { value: 2 });
  });

  test('complete color selection flow', async () => {
    const { getByTestId, findByText } = render(
      <ColorWheelProvider>
        <ColorWheel levels={mockColorLevels} />
      </ColorWheelProvider>
    );

    // Test initial render
    expect(getByTestId('color-wheel')).toBeInTheDocument();

    // Test level selection
    const level5Section = getByTestId('level-5');
    await act(async () => {
      fireEvent.click(level5Section);
    });

    // Verify selection updated state
    expect(await findByText('Level 5')).toBeInTheDocument();

    // Test formula calculation
    const formula = await findByTestId('formula-result');
    expect(formula).toHaveTextContent('20 Volume Developer');
  });

  test('handles device calibration', async () => {
    const { getByTestId, findByText } = render(
      <ColorWheelProvider>
        <ColorWheel levels={mockColorLevels} />
      </ColorWheelProvider>
    );

    // Trigger calibration
    const calibrateButton = getByTestId('calibrate-display');
    await act(async () => {
      fireEvent.click(calibrateButton);
    });

    // Verify calibration flow
    expect(await findByText('Calibration Complete')).toBeInTheDocument();

    // Verify color accuracy post-calibration
    const level = getByTestId('level-1');
    const computedStyle = window.getComputedStyle(level);
    expect(computedStyle.backgroundColor).toBe('rgb(0, 0, 0)');
  });

  test('handles error recovery', async () => {
    // Mock WebGL failure
    jest.spyOn(WebGLRenderingContext.prototype, 'drawArrays')
      .mockImplementation(() => { throw new Error('WebGL Error'); });

    const { getByTestId, findByText } = render(
      <ColorWheelProvider>
        <ColorWheel levels={mockColorLevels} />
      </ColorWheelProvider>
    );

    // Verify fallback to Canvas
    expect(await findByText('Using Canvas Renderer')).toBeInTheDocument();

    // Test functionality in fallback mode
    const level3Section = getByTestId('level-3');
    await act(async () => {
      fireEvent.click(level3Section);
    });

    expect(await findByText('Level 3')).toBeInTheDocument();
  });
});

// tests/integration/Formula.test.tsx
describe('Formula Integration', () => {
  test('calculates correct formula for level transition', async () => {
    const { getByTestId, findByText } = render(
      <ColorWheelProvider>
        <ColorWheel levels={mockColorLevels} />
        <FormulaCalculator />
      </ColorWheelProvider>
    );

    // Select starting level
    await act(async () => {
      fireEvent.click(getByTestId('level-3'));
    });

    // Select target level
    await act(async () => {
      fireEvent.click(getByTestId('level-7'));
    });

    // Verify formula calculation
    const formula = await findByText(/30 Volume Developer/);
    expect(formula).toBeInTheDocument();

    // Verify processing time calculation
    const processingTime = await findByText(/35-45 minutes/);
    expect(processingTime).toBeInTheDocument();
  });
});

// tests/integration/ClientFlow.test.tsx
describe('Client Flow Integration', () => {
  test('complete client consultation flow', async () => {
    const { getByTestId, findByText } = render(
      <ColorWheelProvider>
        <ClientConsultation />
      </ColorWheelProvider>
    );

    // Fill client details
    await act(async () => {
      fireEvent.change(getByTestId('client-name'), {
        target: { value: 'Jane Doe' }
      });
      fireEvent.change(getByTestId('current-level'), {
        target: { value: '5' }
      });
      fireEvent.change(getByTestId('target-level'), {
        target: { value: '8' }
      });
    });

    // Submit consultation
    await act(async () => {
      fireEvent.click(getByTestId('submit-consultation'));
    });

    // Verify formula generation
    expect(await findByText(/Formula for Level 5 to 8/)).toBeInTheDocument();

    // Verify client record creation
    expect(await findByText('Client Record Created')).toBeInTheDocument();
  });
});

## Step 2: Core Components Implementation

### 2.1 Color Types Definition
```typescript
// types/color.ts

export interface ColorLevel {
  level: number;              // 1-10 scale
  name: string;              // "Light Blonde", etc.
  labValues: {
    l: number;              // Lightness (0-100)
    a: number;              // Red/Green axis
    b: number;              // Blue/Yellow axis
    tolerance: number;      // Acceptable variance
  };
  underlyingPigment: {
    primary: string;        // "Orange", "Yellow", etc.
    secondary?: string;     // Secondary pigment
    intensity: number;      // 0-100 scale
    depth: number;          // Pigment depth level
    contribution: number;   // Percentage contribution
  };
  naturalBase: boolean;     // Is this a natural base color?
  manufacturer?: {          // Optional manufacturer-specific data
    code: string;
    name: string;
    line: string;
    version: string;       // Product version
    notes: string;         // Manufacturing notes
  };
  calibration?: {          // Calibration data
    lastCalibrated: Date;
    profile: string;
    accuracy: number;
  };
}

export interface PigmentExposure {
  level: number;            // Current level
  exposedPigments: {
    color: string;          // Pigment color
    percentage: number;     // Exposure percentage
    tone: string;          // Warm, Cool, Neutral
    strength: number;      // Pigment strength
    predictedFade: number; // Predicted fade rate
  }[];
  liftingStage: number;     // 0-4 lifting stages
  timing: {                // Processing timing
    minimum: number;       // Minimum minutes
    maximum: number;       // Maximum minutes
    optimal: number;       // Optimal processing time
  };
}

export interface ColorWheelConfig {
  displayMode: 'svg' | 'canvas' | 'webgl';
  size: number;             // Wheel diameter
  rotation: number;         // Current rotation
  segments: number;         // Number of segments
  rings: number;           // Number of concentric rings
  calibrated: boolean;     // Is display calibrated?
  performance: {
    quality: 'low' | 'medium' | 'high';
    antialiasing: boolean;
    precision: number;
  };
  interaction: {
    touchEnabled: boolean;
    rotationLocked: boolean;
    zoomEnabled: boolean;
    snapToLevel: boolean;
  };
  display: {
    showLabels: boolean;
    showPigments: boolean;
    showGrid: boolean;
    theme: 'light' | 'dark';
  };
}

export interface ColorCalibration {
  profile: {
    gamma: number;
    brightness: number;
    contrast: number;
  };
  display: {
    type: string;
    colorSpace: string;
    bitDepth: number;
  };
  environment: {
    lightingCondition: string;
    temperature: number;
  };
  lastCalibrated: Date;
  nextCalibration: Date;
}
```

### 2.2 Base Color Wheel Component
```typescript
// components/ColorWheel/index.tsx

import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useGesture } from '@use-gesture/react';
import { ColorLevel, ColorWheelConfig } from '@/types/color';
import { convertLabToRgb } from '@/lib/colors/conversion';

interface ColorWheelProps {
  levels: ColorLevel[];
  config: ColorWheelConfig;
  onSelect: (level: ColorLevel) => void;
  onRotate?: (degrees: number) => void;
}

export const ColorWheel: React.FC<ColorWheelProps> = ({
  levels,
  config,
  onSelect,
  onRotate
}) => {
  const [selectedLevel, setSelectedLevel] = useState<ColorLevel | null>(null);
  const [rotation, setRotation] = useState(config.rotation);

  // Wheel animation
  const [{ transform }, api] = useSpring(() => ({
    transform: 'rotate(0deg)',
    config: { tension: 120, friction: 14 }
  }));

  // Touch/Mouse gesture handling
  const bind = useGesture({
    onDrag: ({ movement: [x, y], first, last }) => {
      const angle = Math.atan2(y, x) * (180 / Math.PI);
      if (!first) {
        setRotation(angle);
        api.start({ transform: `rotate(${angle}deg)` });
      }
      if (last && onRotate) {
        onRotate(angle);
      }
    }
  });

  // Generate wheel segments based on display mode
  const WheelRenderer = () => {
    switch (config.displayMode) {
      case 'webgl':
        return <WebGLWheel {...wheelProps} />;
      case 'canvas':
        return <CanvasWheel {...wheelProps} />;
      default:
        return <SVGWheel {...wheelProps} />;
    }
  };

  return (
    <div className="color-wheel-container" {...bind()}>
      <WheelRenderer />
      {selectedLevel && (
        <div className="selected-level-info">
          <h3>{selectedLevel.name}</h3>
          <p>Level: {selectedLevel.level}</p>
          <p>Primary Pigment: {selectedLevel.underlyingPigment.primary}</p>
        </div>
      )}
    </div>
  );
};

// Styling
const styles = {
  container: `
    relative
    w-full
    aspect-square
    max-w-[600px]
    touch-none
    select-none
  `,
  wheel: `
    w-full
    h-full
    rounded-full
    shadow-lg
    transition-transform
    duration-300
    ease-out
  `,
  info: `
    absolute
    top-full
    left-0
    w-full
    mt-4
    p-4
    bg-white
    rounded-lg
    shadow-md
  `
};
```

### 2.3 Color Processing Utilities
```typescript
// lib/colors/conversion.ts

import colorConvert from 'color-convert';
import { ColorLevel, PigmentExposure, ColorCalibration } from '@/types/color';
import { ColorWheelError, ColorWheelErrorType } from '@/types/errors';

export const convertLabToRgb = (
  lab: ColorLevel['labValues'],
  calibration?: ColorCalibration
) => {
  try {
    const rgb = colorConvert.lab.rgb([lab.l, lab.a, lab.b]);
    
    if (calibration) {
      return applyCalibration(rgb, calibration);
    }
    
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  } catch (error) {
    throw new ColorWheelError(
      ColorWheelErrorType.CONVERSION_ERROR,
      'Failed to convert LAB to RGB',
      { lab, error }
    );
  }
};

export const calculateExposedPigments = (
  startLevel: number,
  targetLevel: number,
  options: {
    porosity?: number;
    resistance?: number;
    previousServices?: string[];
  } = {}
): PigmentExposure[] => {
  const exposures: PigmentExposure[] = [];
  let currentLevel = startLevel;

  while (currentLevel < targetLevel) {
    const pigments = getPigmentsForLevel(currentLevel);
    const timing = calculateProcessingTime(currentLevel, targetLevel, options);
    
    exposures.push({
      level: currentLevel,
      exposedPigments: pigments,
      liftingStage: getLiftingStage(currentLevel, targetLevel),
      timing
    });
    
    currentLevel++;
  }

  return exposures;
};

export const validateColorAccuracy = (
  expected: ColorLevel['labValues'],
  actual: ColorLevel['labValues'],
  tolerance: number = 2.0
): boolean => {
  const deltaE = calculateDeltaE(expected, actual);
  return deltaE <= tolerance;
};

export const calculateDeltaE = (
  color1: ColorLevel['labValues'],
  color2: ColorLevel['labValues']
): number => {
  // Implementation of CIE2000 color difference formula
  // Returns Delta E value
};
```

### 2.4 Professional Color Standards
```typescript
// lib/colors/standards.ts

export const NATURAL_LEVELS = {
  1: { 
    name: 'Black',
    lab: { l: 0, a: 0, b: 0 },
    commonNames: ['Jet Black', 'Soft Black'],
    characteristics: {
      reflectivity: 'Minimal',
      undertones: ['Blue', 'Violet'],
    }
  },
  2: { 
    name: 'Darkest Brown',
    lab: { l: 10, a: 2, b: 3 },
    commonNames: ['Off Black', 'Soft Black Brown'],
    characteristics: {
      reflectivity: 'Low',
      undertones: ['Blue'],
    }
  },
  // ... more levels
  10: { 
    name: 'Lightest Blonde',
    lab: { l: 85, a: 0, b: 15 },
    commonNames: ['Platinum', 'High Lift Blonde'],
    characteristics: {
      reflectivity: 'Maximum',
      undertones: ['Pale Yellow'],
    }
  }
};

export const UNDERLYING_PIGMENTS = {
  1: { 
    primary: 'Blue-Black',
    intensity: 100,
    characteristics: {
      resistance: 'Maximum',
      liftingStages: 5,
    }
  },
  2: { 
    primary: 'Blue',
    intensity: 90,
    characteristics: {
      resistance: 'Very High',
      liftingStages: 4,
    }
  },
  // ... more pigments
  10: { 
    primary: 'Pale Yellow',
    intensity: 10,
    characteristics: {
      resistance: 'Minimal',
      liftingStages: 1,
    }
  }
};

export const LIFTING_STAGES = {
  0: {
    name: 'Natural',
    characteristics: ['No lift', 'Natural pigmentation'],
  },
  1: {
    name: 'Red',
    characteristics: ['First stage of lift', 'Strong red undertones'],
  },
  2: {
    name: 'Red-Orange',
    characteristics: ['Second stage', 'Balanced red-orange'],
  },
  3: {
    name: 'Orange',
    characteristics: ['Third stage', 'Dominant orange'],
  },
  4: {
    name: 'Yellow-Orange',
    characteristics: ['Fourth stage', 'Transitional yellow-orange'],
  },
  5: {
    name: 'Yellow',
    characteristics: ['Final stage', 'Pure yellow undertone'],
  }
};

export const PROCESSING_FACTORS = {
  porosity: {
    low: { timeMultiplier: 1.2, developerAdjustment: 0 },
    medium: { timeMultiplier: 1.0, developerAdjustment: 0 },
    high: { timeMultiplier: 0.8, developerAdjustment: -5 },
  },
  texture: {
    fine: { timeMultiplier: 0.9, developerAdjustment: -2 },
    medium: { timeMultiplier: 1.0, developerAdjustment: 0 },
    coarse: { timeMultiplier: 1.1, developerAdjustment: +2 },
  },
  resistance: {
    low: { timeMultiplier: 0.9, developerStrength: -5 },
    normal: { timeMultiplier: 1.0, developerStrength: 0 },
    high: { timeMultiplier: 1.2, developerStrength: +5 },
  }
};
```

### 2.5 Testing Implementation
```typescript
// tests/unit/ColorWheel.test.tsx

import { render, fireEvent } from '@testing-library/react';
import { ColorWheel } from '@/components/ColorWheel';
import { NATURAL_LEVELS } from '@/lib/colors/standards';

describe('ColorWheel Component', () => {
  test('renders all color levels correctly', () => {
    const { container } = render(
      <ColorWheel
        levels={Object.values(NATURAL_LEVELS)}
        config={{
          displayMode: 'svg',
          size: 400,
          rotation: 0,
          segments: 10,
          rings: 10,
          calibrated: true,
        }}
        onSelect={() => {}}
      />
    );
    
    const segments = container.querySelectorAll('path');
    expect(segments).toHaveLength(10);
  });

  test('handles color selection', () => {
    const handleSelect = jest.fn();
    const { container } = render(
      <ColorWheel
        levels={Object.values(NATURAL_LEVELS)}
        config={{
          displayMode: 'svg',
          size: 400,
          rotation: 0,
          segments: 10,
          rings: 10,
          calibrated: true,
        }}
        onSelect={handleSelect}
      />
    );
    
    const firstSegment = container.querySelector('path');
    fireEvent.click(firstSegment);
    expect(handleSelect).toHaveBeenCalled();
  });

  test('maintains color accuracy within tolerance', () => {
    const { container } = render(
      <ColorWheel
        levels={Object.values(NATURAL_LEVELS)}
        config={{
          displayMode: 'svg',
          size: 400,
          rotation: 0,
          segments: 10,
          rings: 10,
          calibrated: true,
        }}
        onSelect={() => {}}
      />
    );
    
    const segments = container.querySelectorAll('path');
    segments.forEach((segment) => {
      const fill = segment.getAttribute('fill');
      const rgb = fill.match(/\d+/g).map(Number);
      const lab = colorConvert.rgb.lab(rgb);
      expect(validateColorAccuracy(
        { l: lab[0], a: lab[1], b: lab[2] },
        NATURAL_LEVELS[1].lab,
        2.0
      )).toBeTruthy();
    });
  });
};

```

### 2.6 WebGL Implementation
```typescript
// components/ColorWheel/WebGL.tsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ColorLevel } from '@/types/color';

interface WebGLWheelProps {
  levels: ColorLevel[];
  size: number;
  onSelect: (level: ColorLevel) => void;
}

export const WebGLWheel: React.FC<WebGLWheelProps> = ({
  levels,
  size,
  onSelect
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const sceneRef = useRef<THREE.Scene>();

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });

    // Create color wheel geometry
    const wheelGeometry = new THREE.CircleGeometry(1, levels.length * 3);
    const wheelMaterial = new THREE.ShaderMaterial({
      vertexShader: \`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      \`,
      fragmentShader: \`
        varying vec2 vUv;
        uniform sampler2D colorTexture;
        
        void main() {
          vec2 center = vec2(0.5, 0.5);
          vec2 delta = vUv - center;
          float radius = length(delta);
          float angle = atan(delta.y, delta.x);
          
          // Convert angle to color wheel position
          float normalizedAngle = (angle + PI) / (2.0 * PI);
          vec4 color = texture2D(colorTexture, vec2(normalizedAngle, radius));
          
          gl_FragColor = color;
        }
      \`,
      uniforms: {
        colorTexture: { value: createColorTexture(levels) }
      }
    });

    const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    scene.add(wheel);
    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      renderer.dispose();
      wheelGeometry.dispose();
      wheelMaterial.dispose();
    };
  }, [levels, size]);

  return <canvas ref={canvasRef} width={size} height={size} />;
};
```

### 2.7 Touch/Mouse Interaction Handler
```typescript
// components/ColorWheel/InteractionHandler.tsx
import { useGesture } from '@use-gesture/react';
import { useState, useRef } from 'react';
import { ColorLevel } from '@/types/color';

interface InteractionHandlerProps {
  onRotate: (angle: number) => void;
  onZoom: (scale: number) => void;
  onSelect: (level: ColorLevel) => void;
  onHover: (level: ColorLevel | null) => void;
}

export const InteractionHandler: React.FC<InteractionHandlerProps> = ({
  onRotate,
  onZoom,
  onSelect,
  onHover
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const startAngleRef = useRef(0);

  const bind = useGesture({
    onDrag: ({ movement: [x, y], first, last }) => {
      const angle = Math.atan2(y, x) * (180 / Math.PI);
      if (!first) {
        setIsDragging(true);
        startAngleRef.current = angle;
      } else {
        const currentAngle = Math.atan2(y, x);
        const rotation = (currentAngle - startAngleRef.current) * (180 / Math.PI);
        onRotate(rotation);
      }
      if (last) {
        setIsDragging(false);
      }
    },
    onPinch: ({ offset: [scale] }) => {
      onZoom(scale);
    },
    onHover: ({ hovering }) => {
      if (!isDragging) {
        const level = hovering ? getLevelFromPosition() : null;
        onHover(level);
      }
    },
    onTap: () => {
      if (!isDragging) {
        const level = getLevelFromPosition();
        if (level) onSelect(level);
      }
    }
  });

  return <div {...bind()} className="interaction-handler" />;
};
```

### 2.8 Basic Formula Calculator
```typescript
// components/Formula/BasicCalculator.tsx
interface FormulaInputs {
  currentLevel: number;
  targetLevel: number;
  porosity: 'low' | 'medium' | 'high';
  resistance: 'low' | 'medium' | 'high';
  previousServices: string[];
}

export const calculateBasicFormula = ({
  currentLevel,
  targetLevel,
  porosity,
  resistance,
  previousServices
}: FormulaInputs): FormulaResult => {
  const levelDifference = targetLevel - currentLevel;
  const porosityFactor = PROCESSING_FACTORS.porosity[porosity];
  const resistanceFactor = PROCESSING_FACTORS.resistance[resistance];

  // Calculate developer volume
  let developerVolume = 10;
  if (levelDifference > 2) developerVolume = 30;
  else if (levelDifference > 1) developerVolume = 20;

  // Adjust for porosity and resistance
  developerVolume += porosityFactor.developerAdjustment;
  developerVolume += resistanceFactor.developerStrength;

  // Calculate processing time
  let processingTime = 30; // Base time in minutes
  processingTime *= porosityFactor.timeMultiplier;
  processingTime *= resistanceFactor.timeMultiplier;

  // Adjust for previous services
  if (previousServices.includes('bleach')) {
    developerVolume -= 5;
    processingTime *= 0.8;
  }

  return {
    developer: {
      volume: Math.max(10, Math.min(40, developerVolume)), // Clamp between 10-40
      ratio: '1:1'
    },
    processingTime: {
      minimum: Math.floor(processingTime * 0.8),
      optimal: Math.floor(processingTime),
      maximum: Math.floor(processingTime * 1.2)
    },
    warnings: getProcessWarnings({
      currentLevel,
      targetLevel,
      previousServices
    })
  };
};
```

### 2.9 Initial Data Schema
```sql
-- Initial minimal schema for core functionality
CREATE TABLE color_levels (
  id SERIAL PRIMARY KEY,
  level INTEGER NOT NULL CHECK (level BETWEEN 1 AND 10),
  name VARCHAR(50) NOT NULL,
  lab_values JSONB NOT NULL,
  underlying_pigment JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE formulas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  brand VARCHAR(50) NOT NULL,
  current_level INTEGER REFERENCES color_levels(id),
  target_level INTEGER REFERENCES color_levels(id),
  developer_volume INTEGER CHECK (developer_volume IN (10, 20, 30, 40)),
  mixing_ratio VARCHAR(10) NOT NULL,
  processing_time_min INTEGER NOT NULL,
  processing_time_max INTEGER NOT NULL,
  version INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE formula_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  formula_id UUID REFERENCES formulas(id),
  version INTEGER NOT NULL,
  changes JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(100) NOT NULL
);

-- Indexes for performance
CREATE INDEX idx_color_levels_level ON color_levels(level);
CREATE INDEX idx_formulas_levels ON formulas(current_level, target_level);
CREATE INDEX idx_formula_versions_formula ON formula_versions(formula_id);

```

### 1.17 API Documentation

#### Component API
```typescript
// Components API Documentation

/**
 * ColorWheel Component
 * @component
 * @example
 * ```tsx
 * <ColorWheel
 *   levels={colorLevels}
 *   onLevelSelect={(level) => console.log(level)}
 *   config={{
 *     size: 500,
 *     responsive: true,
 *     highContrast: false
 *   }}
 * />
 * ```
 */
interface ColorWheelProps {
  /** Array of color levels to display */
  levels: ColorLevel[];
  /** Callback when a level is selected */
  onLevelSelect?: (level: ColorLevel) => void;
  /** Configuration options */
  config?: ColorWheelConfig;
  /** Enable accessibility features */
  accessibility?: AccessibilityProps;
}

/**
 * FormulaCalculator Component
 * @component
 * @example
 * ```tsx
 * <FormulaCalculator
 *   currentLevel={5}
 *   targetLevel={8}
 *   onFormulaCalculated={(formula) => console.log(formula)}
 * />
 * ```
 */
interface FormulaCalculatorProps {
  /** Current hair color level */
  currentLevel: number;
  /** Target hair color level */
  targetLevel: number;
  /** Callback when formula is calculated */
  onFormulaCalculated?: (formula: Formula) => void;
}
```

#### Utility Functions
```typescript
/**
 * Convert LAB color to RGB
 * @function
 * @example
 * ```typescript
 * const rgb = convertLabToRgb({ l: 50, a: 10, b: 20 });
 * console.log(rgb); // { r: 128, g: 100, b: 90 }
 * ```
 */
function convertLabToRgb(lab: LabColor): RgbColor;

/**
 * Calculate color formula
 * @function
 * @example
 * ```typescript
 * const formula = calculateFormula({
 *   currentLevel: 5,
 *   targetLevel: 8,
 *   formula: 'standard'
 * });
 * ```
 */
function calculateFormula(params: FormulaParams): Formula;
```

### 1.18 Troubleshooting Guide

#### Common Issues and Solutions

1. **Color Accuracy Issues**
```typescript
// Problem: Colors appear incorrect on different devices
// Solution: Use device calibration

await colorWheelCalibration.calibrate({
  referenceColor: { r: 0, g: 0, b: 0 },
  targetDevice: 'monitor'
});
```

2. **Performance Issues**
```typescript
// Problem: Slow rendering on mobile devices
// Solution: Enable performance mode

const mobileConfig: MobileConfig = {
  performanceMode: 'high',
  touchRadius: 44,
  hapticFeedback: false
};

mobileOptimizer.optimizeForDevice(mobileConfig);
```

3. **State Management Issues**
```typescript
// Problem: State not persisting between sessions
// Solution: Enable state persistence

const persistConfig = {
  key: 'colorWheel',
  storage: localStorage,
  whitelist: ['selectedLevel', 'history']
};

const persistedReducer = persistReducer(persistConfig, colorWheelReducer);
```

### 1.19 Performance Monitoring

```typescript
// lib/monitoring/PerformanceMonitor.ts
interface PerformanceMetrics {
  fps: number;
  renderTime: number;
  memoryUsage: number;
  interactionDelay: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    fps: 0,
    renderTime: 0,
    memoryUsage: 0,
    interactionDelay: 0
  };

  private thresholds = {
    fps: 30,
    renderTime: 16, // ms
    memoryUsage: 50, // MB
    interactionDelay: 100 // ms
  };

  startMonitoring(): void {
    // Monitor FPS
    let frameCount = 0;
    let lastTime = performance.now();

    const measureFPS = () => {
      const currentTime = performance.now();
      frameCount++;

      if (currentTime - lastTime >= 1000) {
        this.metrics.fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;

        if (this.metrics.fps < this.thresholds.fps) {
          this.optimizePerformance();
        }
      }

      requestAnimationFrame(measureFPS);
    };

    requestAnimationFrame(measureFPS);

    // Monitor render time
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'render') {
          this.metrics.renderTime = entry.duration;

          if (this.metrics.renderTime > this.thresholds.renderTime) {
            this.optimizeRendering();
          }
        }
      }
    });

    observer.observe({ entryTypes: ['render'] });

    // Monitor memory usage
    if ('memory' in performance) {
      setInterval(() => {
        this.metrics.memoryUsage = (performance as any).memory.usedJSHeapSize / (1024 * 1024);

        if (this.metrics.memoryUsage > this.thresholds.memoryUsage) {
          this.optimizeMemory();
        }
      }, 1000);
    }

    // Monitor interaction delay
    const interactionObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'first-input') {
          this.metrics.interactionDelay = entry.processingStart - entry.startTime;

          if (this.metrics.interactionDelay > this.thresholds.interactionDelay) {
            this.optimizeInteraction();
          }
        }
      }
    });

    interactionObserver.observe({ entryTypes: ['first-input'] });
  }

  private optimizePerformance(): void {
    // Reduce visual effects
    document.documentElement.style.setProperty('--animation-duration', '0ms');
    
    // Disable non-critical features
    this.disableNonCriticalFeatures();
    
    // Switch to lighter renderer
    hybridRenderer.switchToLightRenderer();
  }

  private optimizeRendering(): void {
    // Reduce update frequency
    this.throttleUpdates();
    
    // Use simpler visual representations
    this.simplifyVisuals();
  }

  private optimizeMemory(): void {
    // Clear caches
    colorWheelCache.clear();
    
    // Release unused resources
    this.releaseUnusedResources();
  }

  private optimizeInteraction(): void {
    // Debounce event handlers
    this.debounceHandlers();
    
    // Reduce animation complexity
    this.simplifyAnimations();
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }
}

export const performanceMonitor = new PerformanceMonitor();
```

### 1.20 Performance Optimization Strategies

```typescript
// lib/optimization/Optimizer.ts
interface OptimizationStrategy {
  name: string;
  condition: () => boolean;
  optimize: () => void;
}

class Optimizer {
  private strategies: OptimizationStrategy[] = [
    {
      name: 'reduceQuality',
      condition: () => performanceMonitor.getMetrics().fps < 30,
      optimize: () => {
        hybridRenderer.setQuality('low');
        this.disableEffects();
      }
    },
    {
      name: 'batchUpdates',
      condition: () => performanceMonitor.getMetrics().renderTime > 16,
      optimize: () => {
        this.enableBatchUpdates();
        this.deferNonCriticalUpdates();
      }
    },
    {
      name: 'memoryOptimization',
      condition: () => performanceMonitor.getMetrics().memoryUsage > 50,
      optimize: () => {
        this.clearCaches();
        this.releaseUnusedResources();
      }
    },
    {
      name: 'interactionOptimization',
      condition: () => performanceMonitor.getMetrics().interactionDelay > 100,
      optimize: () => {
        this.optimizeEventHandlers();
        this.simplifyAnimations();
      }
    }
  ];

  optimize(): void {
    for (const strategy of this.strategies) {
      if (strategy.condition()) {
        strategy.optimize();
        logger.log(LogLevel.INFO, `Applied optimization strategy: ${strategy.name}`);
      }
    }
  }

  private disableEffects(): void {
    document.documentElement.style.setProperty('--enable-effects', 'none');
  }

  private enableBatchUpdates(): void {
    // Implementation
  }

  private deferNonCriticalUpdates(): void {
    // Implementation
  }

  private clearCaches(): void {
    // Implementation
  }

  private releaseUnusedResources(): void {
    // Implementation
  }

  private optimizeEventHandlers(): void {
    // Implementation
  }

  private simplifyAnimations(): void {
    // Implementation
  }
}

export const optimizer = new Optimizer();

```

### 1.21 Internationalization Support

```typescript
// lib/i18n/I18nManager.ts
interface I18nConfig {
  defaultLocale: string;
  supportedLocales: string[];
  fallbackLocale: string;
  loadPath: string;
}

interface TranslationData {
  [key: string]: string | TranslationData;
}

class I18nManager {
  private config: I18nConfig;
  private translations: Map<string, TranslationData> = new Map();
  private currentLocale: string;

  constructor(config: I18nConfig) {
    this.config = config;
    this.currentLocale = this.detectLocale();
    this.loadTranslations(this.currentLocale);
  }

  async setLocale(locale: string): Promise<void> {
    if (!this.config.supportedLocales.includes(locale)) {
      throw new Error(`Unsupported locale: ${locale}`);
    }

    if (!this.translations.has(locale)) {
      await this.loadTranslations(locale);
    }

    this.currentLocale = locale;
    document.documentElement.lang = locale;
    document.documentElement.dir = this.isRTL(locale) ? 'rtl' : 'ltr';

    this.updateNumberFormat();
    this.updateDateFormat();
  }

  translate(key: string, params?: Record<string, string>): string {
    const translation = this.getNestedTranslation(
      this.translations.get(this.currentLocale) || {},
      key
    );

    if (!translation) {
      // Fallback to default locale
      const fallback = this.getNestedTranslation(
        this.translations.get(this.config.fallbackLocale) || {},
        key
      );

      if (!fallback) {
        console.warn(`Translation missing for key: ${key}`);
        return key;
      }

      return this.interpolate(fallback, params);
    }

    return this.interpolate(translation, params);
  }

  formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
    return new Intl.NumberFormat(this.currentLocale, options).format(value);
  }

  formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
    return new Intl.DateTimeFormat(this.currentLocale, options).format(date);
  }

  private detectLocale(): string {
    const browserLocale = navigator.language.split('-')[0];
    return this.config.supportedLocales.includes(browserLocale)
      ? browserLocale
      : this.config.defaultLocale;
  }

  private async loadTranslations(locale: string): Promise<void> {
    try {
      const response = await fetch(
        `${this.config.loadPath}/${locale}.json`
      );
      const translations = await response.json();
      this.translations.set(locale, translations);
    } catch (error) {
      console.error(`Failed to load translations for ${locale}:`, error);
      // Fall back to default locale
      if (locale !== this.config.defaultLocale) {
        await this.loadTranslations(this.config.defaultLocale);
      }
    }
  }

  private getNestedTranslation(obj: TranslationData, path: string): string | undefined {
    return path.split('.').reduce((acc: any, part: string) => {
      return acc && acc[part];
    }, obj) as string | undefined;
  }

  private interpolate(text: string, params?: Record<string, string>): string {
    if (!params) return text;

    return text.replace(/\{\{(\w+)\}\}/g, (_, key) => {
      return params[key] || `{{${key}}}`;
    });
  }

  private isRTL(locale: string): boolean {
    const rtlLocales = ['ar', 'he', 'fa'];
    return rtlLocales.includes(locale.split('-')[0]);
  }

  private updateNumberFormat(): void {
    // Update number input formats
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
      input.setAttribute('lang', this.currentLocale);
    });
  }

  private updateDateFormat(): void {
    // Update date input formats
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
      input.setAttribute('lang', this.currentLocale);
    });
  }
}

export const i18n = new I18nManager({
  defaultLocale: 'en',
  supportedLocales: ['en', 'es', 'fr', 'de', 'ar'],
  fallbackLocale: 'en',
  loadPath: '/locales'
});

// Usage examples
i18n.translate('colorWheel.level', { level: '5' });
i18n.formatNumber(1234.56, { style: 'currency', currency: 'USD' });
i18n.formatDate(new Date(), { dateStyle: 'full' });

```

### 1.22 Security Implementation

```typescript
// lib/security/SecurityManager.ts
interface SecurityConfig {
  rateLimit: {
    windowMs: number;
    maxRequests: number;
  };
  cors: {
    allowedOrigins: string[];
    allowedMethods: string[];
  };
  validation: {
    maxInputLength: number;
    allowedCharacters: RegExp;
  };
}

class SecurityManager {
  private config: SecurityConfig;
  private requestCounts: Map<string, number> = new Map();

  constructor(config: SecurityConfig) {
    this.config = config;
    this.register();
  }

  validateInput(input: string): boolean {
    if (input.length > this.config.validation.maxInputLength) {
      throw new Error('Input exceeds maximum length');
    }

    if (!this.config.validation.allowedCharacters.test(input)) {
      throw new Error('Input contains invalid characters');
    }

    return true;
  }

  sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '') // Remove potential HTML
      .trim()
      .substring(0, this.config.validation.maxInputLength);
  }

  checkRateLimit(clientId: string): boolean {
    const now = Date.now();
    const count = this.requestCounts.get(clientId) || 0;

    if (count >= this.config.rateLimit.maxRequests) {
      throw new Error('Rate limit exceeded');
    }

    this.requestCounts.set(clientId, count + 1);
    setTimeout(() => {
      this.requestCounts.delete(clientId);
    }, this.config.rateLimit.windowMs);

    return true;
  }

  validateCORS(origin: string): boolean {
    return this.config.cors.allowedOrigins.includes(origin) ||
           this.config.cors.allowedOrigins.includes('*');
  }
}

export const securityManager = new SecurityManager({
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100
  },
  cors: {
    allowedOrigins: ['http://localhost:3000', 'https://hair-education.com'],
    allowedMethods: ['GET', 'POST', 'PUT', 'DELETE']
  },
  validation: {
    maxInputLength: 1000,
    allowedCharacters: /^[a-zA-Z0-9\s\-_.,!?()]*$/
  }
});
```

### 1.23 Analytics Implementation

```typescript
// lib/analytics/AnalyticsManager.ts
interface AnalyticsEvent {
  type: string;
  timestamp: number;
  data: any;
  userId?: string;
  sessionId: string;
}

interface AnalyticsConfig {
  batchSize: number;
  flushInterval: number;
  samplingRate: number;
}

class AnalyticsManager {
  private config: AnalyticsConfig;
  private events: AnalyticsEvent[] = [];
  private sessionId: string;

  constructor(config: AnalyticsConfig) {
    this.config = config;
    this.sessionId = this.generateSessionId();
    this.startAutoFlush();
  }

  async trackEvent(type: string, data: any): Promise<void> {
    if (Math.random() > this.config.samplingRate) return;

    const event: AnalyticsEvent = {
      type,
      timestamp: Date.now(),
      data,
      sessionId: this.sessionId,
      userId: this.getUserId()
    };

    this.events.push(event);

    if (this.events.length >= this.config.batchSize) {
      await this.flush();
    }
  }

  async trackError(error: Error, context?: any): Promise<void> {
    await this.trackEvent('error', {
      message: error.message,
      stack: error.stack,
      context
    });
  }

  async trackPerformance(metrics: PerformanceMetrics): Promise<void> {
    await this.trackEvent('performance', metrics);
  }

  async trackUserBehavior(action: string, details: any): Promise<void> {
    await this.trackEvent('user_behavior', {
      action,
      details,
      path: window.location.pathname
    });
  }

  private async flush(): Promise<void> {
    if (this.events.length === 0) return;

    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          events: this.events
        })
      });

      this.events = [];
    } catch (error) {
      console.error('Failed to flush analytics:', error);
    }
  }

  private startAutoFlush(): void {
    setInterval(() => this.flush(), this.config.flushInterval);
  }

  private generateSessionId(): string {
    return Math.random().toString(36).substring(2);
  }

  private getUserId(): string | undefined {
    return localStorage.getItem('userId');
  }
}

export const analyticsManager = new AnalyticsManager({
  batchSize: 50,
  flushInterval: 30000, // 30 seconds
  samplingRate: 0.1 // 10% sampling
});

// Usage examples
analyticsManager.trackUserBehavior('select_color', {
  level: 5,
  formula: 'standard'
});

analyticsManager.trackPerformance({
  fps: 60,
  renderTime: 16,
  memoryUsage: 50,
  interactionDelay: 100
});

analyticsManager.trackError(new Error('Color calculation failed'), {
  currentLevel: 5,
  targetLevel: 8
});
```

### 1.24 Analytics Dashboard Integration

```typescript
// components/AnalyticsDashboard.tsx
interface AnalyticsDashboardProps {
  timeRange: 'day' | 'week' | 'month';
  metrics: string[];
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  timeRange,
  metrics
}) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchAnalyticsData(timeRange, metrics).then(setData);
  }, [timeRange, metrics]);

  return (
    <div className="analytics-dashboard">
      <div className="metrics-overview">
        {metrics.map(metric => (
          <MetricCard
            key={metric}
            metric={metric}
            data={data?.[metric]}
          />
        ))}
      </div>
      
      <div className="charts">
        <TimeSeriesChart
          data={data?.timeSeries}
          metrics={metrics}
        />
      </div>
      
      <div className="user-behavior">
        <UserBehaviorFlow data={data?.userFlow} />
        <EventBreakdown data={data?.events} />
      </div>
      
      <div className="performance-metrics">
        <PerformanceOverview data={data?.performance} />
        <ErrorRateChart data={data?.errors} />
      </div>
    </div>
  );
};

// Helper components
const MetricCard: React.FC<{ metric: string; data: any }> = ({
  metric,
  data
}) => (
  <div className="metric-card">
    <h3>{metric}</h3>
    <div className="value">{data?.value}</div>
    <div className="trend">
      {data?.trend > 0 ? '↑' : '↓'} {Math.abs(data?.trend)}%
    </div>
  </div>
);

const TimeSeriesChart: React.FC<{ data: any; metrics: string[] }> = ({
  data,
  metrics
}) => {
  // Implementation using a charting library like Chart.js
  return <div className="time-series-chart">{/* Chart implementation */}</div>;
};

const UserBehaviorFlow: React.FC<{ data: any }> = ({ data }) => (
  <div className="user-flow">
    {/* Sankey diagram or flow chart implementation */}
  </div>
);

const EventBreakdown: React.FC<{ data: any }> = ({ data }) => (
  <div className="event-breakdown">
    {/* Event breakdown visualization */}
  </div>
);

const PerformanceOverview: React.FC<{ data: any }> = ({ data }) => (
  <div className="performance-overview">
    {/* Performance metrics visualization */}
  </div>
);

const ErrorRateChart: React.FC<{ data: any }> = ({ data }) => (
  <div className="error-rate-chart">
    {/* Error rate visualization */}
  </div>
);

```

### 1.25 Data Backup & Recovery

```typescript
// lib/backup/BackupManager.ts
interface BackupConfig {
  autoBackupInterval: number;  // milliseconds
  maxBackups: number;
  compressionLevel: number;    // 1-9
  encryptionKey?: string;
}

interface BackupMetadata {
  timestamp: number;
  version: string;
  checksum: string;
  size: number;
}

class BackupManager {
  private config: BackupConfig;
  private backups: Map<string, BackupMetadata> = new Map();
  private db: IDBDatabase;

  constructor(config: BackupConfig) {
    this.config = config;
    this.initializeDB();
    this.startAutoBackup();
  }

  async createBackup(): Promise<string> {
    const state = await this.gatherState();
    const timestamp = Date.now();
    const backupId = `backup_${timestamp}`;

    // Compress state
    const compressed = await this.compress(state);

    // Encrypt if key provided
    const final = this.config.encryptionKey
      ? await this.encrypt(compressed)
      : compressed;

    // Calculate checksum
    const checksum = await this.calculateChecksum(final);

    // Store backup
    await this.storeBackup(backupId, final);

    // Update metadata
    this.backups.set(backupId, {
      timestamp,
      version: process.env.APP_VERSION || '1.0.0',
      checksum,
      size: final.length
    });

    // Cleanup old backups
    await this.cleanupOldBackups();

    return backupId;
  }

  async restoreBackup(backupId: string): Promise<void> {
    // Verify backup exists
    if (!this.backups.has(backupId)) {
      throw new Error('Backup not found');
    }

    // Load backup
    const backup = await this.loadBackup(backupId);
    const metadata = this.backups.get(backupId)!;

    // Verify checksum
    const checksum = await this.calculateChecksum(backup);
    if (checksum !== metadata.checksum) {
      throw new Error('Backup corrupted');
    }

    // Decrypt if necessary
    const decrypted = this.config.encryptionKey
      ? await this.decrypt(backup)
      : backup;

    // Decompress
    const state = await this.decompress(decrypted);

    // Restore state
    await this.restoreState(state);
  }

  private async gatherState(): Promise<any> {
    return {
      colorWheel: await colorWheelCache.getAll(),
      userPreferences: localStorage.getItem('userPreferences'),
      formulas: await this.getFormulas(),
      analytics: analyticsManager.getStoredEvents()
    };
  }

  private async compress(data: any): Promise<Uint8Array> {
    const compressed = pako.deflate(JSON.stringify(data), {
      level: this.config.compressionLevel
    });
    return compressed;
  }

  private async decompress(data: Uint8Array): Promise<any> {
    const decompressed = pako.inflate(data, { to: 'string' });
    return JSON.parse(decompressed);
  }

  private async encrypt(data: Uint8Array): Promise<Uint8Array> {
    if (!this.config.encryptionKey) {
      throw new Error('Encryption key not provided');
    }

    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(this.config.encryptionKey),
      'AES-GCM',
      false,
      ['encrypt']
    );

    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv
      },
      key,
      data
    );

    // Combine IV and encrypted data
    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(encrypted), iv.length);

    return combined;
  }

  private async decrypt(data: Uint8Array): Promise<Uint8Array> {
    if (!this.config.encryptionKey) {
      throw new Error('Encryption key not provided');
    }

    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(this.config.encryptionKey),
      'AES-GCM',
      false,
      ['decrypt']
    );

    // Extract IV and encrypted data
    const iv = data.slice(0, 12);
    const encrypted = data.slice(12);

    const decrypted = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv
      },
      key,
      encrypted
    );

    return new Uint8Array(decrypted);
  }

  private startAutoBackup(): void {
    setInterval(
      () => this.createBackup(),
      this.config.autoBackupInterval
    );
  }

  private async cleanupOldBackups(): Promise<void> {
    const backups = Array.from(this.backups.entries());
    if (backups.length <= this.config.maxBackups) return;

    // Sort by timestamp, newest first
    backups.sort((a, b) => b[1].timestamp - a[1].timestamp);

    // Remove oldest backups
    for (let i = this.config.maxBackups; i < backups.length; i++) {
      const [backupId] = backups[i];
      await this.deleteBackup(backupId);
      this.backups.delete(backupId);
    }
  }
}

export const backupManager = new BackupManager({
  autoBackupInterval: 24 * 60 * 60 * 1000, // Daily
  maxBackups: 7,
  compressionLevel: 6
});
```

### 1.26 Offline Support

```typescript
// lib/offline/ServiceWorker.ts
interface CacheConfig {
  version: string;
  assets: string[];
  dynamicCache: string[];
}

class ServiceWorkerManager {
  private config: CacheConfig;

  constructor(config: CacheConfig) {
    this.config = config;
    this.register();
  }

  private async register(): Promise<void> {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('ServiceWorker registered:', registration);
      } catch (error) {
        console.error('ServiceWorker registration failed:', error);
      }
    }
  }
}

// sw.js
const CACHE_NAME = 'color-wheel-v1';
const OFFLINE_URL = '/offline.html';

self.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        OFFLINE_URL,
        '/',
        '/index.html',
        '/styles.css',
        '/app.js',
        '/assets/icons/icon-192x192.png',
        '/assets/icons/icon-512x512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (event: any) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        return caches.match(OFFLINE_URL);
      });
    })
  );
});

// lib/offline/OfflineSync.ts
interface SyncItem {
  id: string;
  type: 'formula' | 'client' | 'preference';
  data: any;
  timestamp: number;
}

class OfflineSync {
  private syncQueue: SyncItem[] = [];
  private db: IDBDatabase;

  constructor() {
    this.initializeDB();
    this.startSync();
  }

  async addToQueue(item: Omit<SyncItem, 'id' | 'timestamp'>): Promise<void> {
    const syncItem: SyncItem = {
      ...item,
      id: crypto.randomUUID(),
      timestamp: Date.now()
    };

    this.syncQueue.push(syncItem);
    await this.saveToIndexedDB(syncItem);

    if (navigator.onLine) {
      this.sync();
    }
  }

  private async initializeDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('ColorWheelOfflineDB', 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;
        db.createObjectStore('syncQueue', { keyPath: 'id' });
      };
    });
  }

  private async saveToIndexedDB(item: SyncItem): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['syncQueue'], 'readwrite');
      const store = transaction.objectStore('syncQueue');
      const request = store.add(item);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  private async sync(): Promise<void> {
    if (this.syncQueue.length === 0) return;

    const items = [...this.syncQueue];
    this.syncQueue = [];

    try {
      await Promise.all(
        items.map(async (item) => {
          await this.syncItem(item);
          await this.removeFromIndexedDB(item.id);
        })
      );
    } catch (error) {
      console.error('Sync failed:', error);
      // Put failed items back in queue
      this.syncQueue.push(...items);
    }
  }

  private async syncItem(item: SyncItem): Promise<void> {
    const endpoint = this.getEndpoint(item.type);
    await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item.data)
    });
  }

  private getEndpoint(type: SyncItem['type']): string {
    switch (type) {
      case 'formula':
        return '/api/formulas/sync';
      case 'client':
        return '/api/clients/sync';
      case 'preference':
        return '/api/preferences/sync';
      default:
        throw new Error(`Unknown sync type: ${type}`);
    }
  }

  private startSync(): void {
    window.addEventListener('online', () => this.sync());
  }
}

export const offlineSync = new OfflineSync();
```

### 1.27 Collaboration Features

```typescript
// lib/collaboration/CollaborationManager.ts
interface CollaborationConfig {
  syncInterval: number;
  conflictResolution: 'lastWriteWins' | 'merge';
  maxRetries: number;
}

interface SharedState {
  version: number;
  data: any;
  lastModified: number;
  modifiedBy: string;
}

class CollaborationManager {
  private config: CollaborationConfig;
  private socket: WebSocket;
  private state: SharedState;
  private pendingChanges: Map<string, any> = new Map();
  private retryCount: number = 0;

  constructor(config: CollaborationConfig) {
    this.config = config;
    this.initializeWebSocket();
    this.startSyncInterval();
  }

  private initializeWebSocket(): void {
    this.socket = new WebSocket('wss://your-server.com/collaboration');

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.handleMessage(message);
    };

    this.socket.onclose = () => {
      if (this.retryCount < this.config.maxRetries) {
        setTimeout(() => {
          this.retryCount++;
          this.initializeWebSocket();
        }, 1000 * Math.pow(2, this.retryCount));
      }
    };
  }

  private handleMessage(message: any): void {
    switch (message.type) {
      case 'state_update':
        this.handleStateUpdate(message.data);
        break;
      case 'conflict':
        this.handleConflict(message.data);
        break;
      case 'sync_request':
        this.sendState();
        break;
    }
  }

  private handleStateUpdate(newState: SharedState): void {
    if (newState.version <= this.state.version) {
      return;
    }

    if (this.hasPendingChanges()) {
      this.resolveConflict(newState);
    } else {
      this.updateState(newState);
    }
  }

  private handleConflict(serverState: SharedState): void {
    if (this.config.conflictResolution === 'lastWriteWins') {
      if (serverState.lastModified > this.state.lastModified) {
        this.updateState(serverState);
      } else {
        this.sendState();
      }
    } else {
      this.mergeStates(serverState);
    }
  }

  private mergeStates(serverState: SharedState): void {
    // Implement three-way merge
    const baseState = this.findCommonAncestor(serverState);
    const merged = this.performThreeWayMerge(
      baseState,
      this.state,
      serverState
    );

    this.updateState({
      ...merged,
      version: Math.max(this.state.version, serverState.version) + 1,
      lastModified: Date.now()
    });

    this.sendState();
  }

  private findCommonAncestor(serverState: SharedState): SharedState {
    // Implementation of finding last common state
    return {} as SharedState;
  }

  private performThreeWayMerge(
    base: SharedState,
    local: SharedState,
    remote: SharedState
  ): SharedState {
    // Implementation of three-way merge
    return {} as SharedState;
  }

  private hasPendingChanges(): boolean {
    return this.pendingChanges.size > 0;
  }

  private updateState(newState: SharedState): void {
    this.state = newState;
    this.notifyListeners();
  }

  private sendState(): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({
        type: 'state_update',
        data: this.state
      }));
    }
  }

  private startSyncInterval(): void {
    setInterval(() => {
      if (this.hasPendingChanges()) {
        this.sendState();
      }
    }, this.config.syncInterval);
  }

  private notifyListeners(): void {
    // Notify all registered listeners of state change
  }
}

export const collaborationManager = new CollaborationManager({
  syncInterval: 5000, // 5 seconds
  conflictResolution: 'merge',
  maxRetries: 5
});
```

### 1.28 Error Boundaries

```typescript
// components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { logError } from '@/lib/analytics/AnalyticsManager';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logError('React Error Boundary Caught:', {
      error: error.toString(),
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString()
    });
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-boundary-fallback">
          <h2>Something went wrong</h2>
          <details>
            <summary>Error Details</summary>
            <pre>{this.state.error?.toString()}</pre>
          </details>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="retry-button"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage in ColorWheel component
export const ColorWheel: React.FC = () => {
  return (
    <ErrorBoundary
      fallback={
        <div className="color-wheel-error">
          <h3>Color Wheel Error</h3>
          <p>Unable to render the color wheel. Please try refreshing the page.</p>
        </div>
      }
    >
      <ColorWheelContent />
    </ErrorBoundary>
  );
};

```

## Step 3: Interactive Features

### 3.1 Color Wheel Interaction
```typescript
// components/ColorWheel/Interaction.tsx
interface InteractionProps {
  onLevelSelect: (level: number) => void;
  onPigmentView: (pigment: string) => void;
  onFormulaCalculate: (formula: Formula) => void;
}

export const ColorWheelInteraction: React.FC<InteractionProps> = ({
  onLevelSelect,
  onPigmentView,
  onFormulaCalculate
}) => {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [selectedPigment, setSelectedPigment] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleLevelClick = (level: number) => {
    setSelectedLevel(level);
    onLevelSelect(level);
  };

  const handlePigmentHover = (pigment: string) => {
    setSelectedPigment(pigment);
    onPigmentView(pigment);
  };

  const calculateFormula = () => {
    if (!selectedLevel) return;
    
    setIsCalculating(true);
    const formula = generateFormula(selectedLevel, selectedPigment);
    onFormulaCalculate(formula);
    setIsCalculating(false);
  };

  return (
    <div className="color-wheel-interaction">
      <div className="level-selector">
        {Array.from({ length: 10 }, (_, i) => i + 1).map(level => (
          <button
            key={level}
            onClick={() => handleLevelClick(level)}
            className={`level-button ${selectedLevel === level ? 'selected' : ''}`}
          >
            Level {level}
          </button>
        ))}
      </div>
      <div className="pigment-viewer">
        {UNDERLYING_PIGMENTS.map(pigment => (
          <div
            key={pigment.name}
            onMouseEnter={() => handlePigmentHover(pigment.name)}
            className="pigment-item"
          >
            {pigment.name}
          </div>
        ))}
      </div>
      <button
        onClick={calculateFormula}
        disabled={!selectedLevel || isCalculating}
        className="calculate-button"
      >
        {isCalculating ? 'Calculating...' : 'Calculate Formula'}
      </button>
    </div>
  );
};
```

### 3.2 Formula Calculator
```typescript
// components/Formula/Calculator.tsx
interface CalculatorProps {
  currentLevel: number;
  targetLevel: number;
  porosity: Porosity;
  resistance: Resistance;
}

export const FormulaCalculator: React.FC<CalculatorProps> = ({
  currentLevel,
  targetLevel,
  porosity,
  resistance
}) => {
  const [formula, setFormula] = useState<Formula | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const result = calculateFormula({
        currentLevel,
        targetLevel,
        porosity,
        resistance
      });
      setFormula(result);
      setError(null);
    } catch (err) {
      setError(err.message);
      setFormula(null);
    }
  }, [currentLevel, targetLevel, porosity, resistance]);

  if (error) {
    return <div className="formula-error">{error}</div>;
  }

  return (
    <div className="formula-display">
      {formula && (
        <>
          <div className="formula-header">
            <h3>Color Formula</h3>
            <span>Level {currentLevel} → Level {targetLevel}</span>
          </div>
          <div className="formula-details">
            <div className="developer">
              <label>Developer Volume:</label>
              <span>{formula.developer}V</span>
            </div>
            <div className="processing-time">
              <label>Processing Time:</label>
              <span>{formula.processingTime} minutes</span>
            </div>
            <div className="mixing-ratio">
              <label>Mixing Ratio:</label>
              <span>{formula.mixingRatio}</span>
            </div>
          </div>
          <div className="formula-notes">
            <h4>Application Notes:</h4>
            <ul>
              {formula.notes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};
```

### 3.3 Client History
```typescript
// components/Client/History.tsx
interface ClientHistoryProps {
  clientId: string;
}

export const ClientHistory: React.FC<ClientHistoryProps> = ({ clientId }) => {
  const [history, setHistory] = useState<ColorHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await supabase
          .from('color_history')
          .select('*')
          .eq('client_id', clientId)
          .order('created_at', { ascending: false });
        
        setHistory(data);
      } catch (error) {
        console.error('Failed to load history:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [clientId]);

  return (
    <div className="client-history">
      <h3>Color History</h3>
      {loading ? (
        <div>Loading history...</div>
      ) : (
        <div className="history-timeline">
          {history.map((record) => (
            <div key={record.id} className="history-item">
              <div className="date">
                {new Date(record.created_at).toLocaleDateString()}
              </div>
              <div className="formula">
                <strong>Formula Used:</strong>
                <pre>{JSON.stringify(record.formula, null, 2)}</pre>
              </div>
              <div className="notes">
                <strong>Notes:</strong>
                <p>{record.notes}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
```

## Step 4: Professional Features

### 4.1 Color Analysis
```typescript
// components/Analysis/ColorAnalysis.tsx
interface AnalysisProps {
  image: File;
  onAnalysisComplete: (results: AnalysisResults) => void;
}

export const ColorAnalysis: React.FC<AnalysisProps> = ({
  image,
  onAnalysisComplete
}) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResults | null>(null);

  const analyzeImage = async () => {
    setAnalyzing(true);
    try {
      // Convert image to base64
      const base64 = await convertToBase64(image);
      
      // Send to analysis service
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image: base64 })
      });
      
      const data = await response.json();
      setResults(data);
      onAnalysisComplete(data);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  useEffect(() => {
    if (image) {
      analyzeImage();
    }
  }, [image]);

  return (
    <div className="color-analysis">
      {analyzing ? (
        <div className="analyzing-state">
          <Spinner />
          <p>Analyzing hair color...</p>
        </div>
      ) : results ? (
        <div className="analysis-results">
          <div className="current-level">
            <h4>Current Level</h4>
            <span>{results.currentLevel}</span>
          </div>
          <div className="underlying-pigments">
            <h4>Underlying Pigments</h4>
            <ul>
              {results.pigments.map((pigment) => (
                <li key={pigment.name}>
                  {pigment.name}: {pigment.percentage}%
                </li>
              ))}
            </ul>
          </div>
          <div className="recommendations">
            <h4>Recommendations</h4>
            <ul>
              {results.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};
```

### 4.2 Professional Tools
```typescript
// components/Professional/Tools.tsx
interface ToolsProps {
  onToolSelect: (tool: ProfessionalTool) => void;
}

export const ProfessionalTools: React.FC<ToolsProps> = ({ onToolSelect }) => {
  const tools: ProfessionalTool[] = [
    {
      id: 'strand-test',
      name: 'Strand Test Calculator',
      description: 'Calculate processing time for strand tests'
    },
    {
      id: 'porosity-test',
      name: 'Porosity Assessment',
      description: 'Evaluate hair porosity levels'
    },
    {
      id: 'resistance-test',
      name: 'Resistance Measurement',
      description: 'Measure hair resistance to chemical processes'
    },
    {
      id: 'color-correction',
      name: 'Color Correction Guide',
      description: 'Step-by-step color correction procedures'
    }
  ];

  return (
    <div className="professional-tools">
      <h3>Professional Tools</h3>
      <div className="tools-grid">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onToolSelect(tool)}
            className="tool-button"
          >
            <h4>{tool.name}</h4>
            <p>{tool.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
```

### 4.3 Documentation Generator
```typescript
// components/Professional/Documentation.tsx
interface DocumentationProps {
  clientData: ClientData;
  formulaHistory: FormulaHistory[];
  analysisResults: AnalysisResults[];
}

export const DocumentationGenerator: React.FC<DocumentationProps> = ({
  clientData,
  formulaHistory,
  analysisResults
}) => {
  const [document, setDocument] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const generateDocument = async () => {
    setGenerating(true);
    try {
      const doc = await generateProfessionalDocument({
        client: clientData,
        history: formulaHistory,
        analysis: analysisResults
      });
      
      setDocument(doc);
    } catch (error) {
      console.error('Document generation failed:', error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="documentation-generator">
      <button
        onClick={generateDocument}
        disabled={generating}
        className="generate-button"
      >
        {generating ? 'Generating...' : 'Generate Documentation'}
      </button>
      
      {document && (
        <div className="document-preview">
          <div className="document-actions">
            <button onClick={() => printDocument(document)}>
              Print
            </button>
            <button onClick={() => exportPDF(document)}>
              Export PDF
            </button>
            <button onClick={() => emailDocument(document, clientData.email)}>
              Email to Client
            </button>
          </div>
          <div 
            className="document-content"
            dangerouslySetInnerHTML={{ __html: document }}
          />
        </div>
      )}
    </div>
  );
};
```

```
{{ ... }}
```
```sql
-- Core Data Types
interface ColorSystem {
  levels: LevelData[];
  formulas: FormulaData[];
  clients: ClientRecord[];
  colorHistory: ColorTransaction[];
}

interface ColorLevel {
  level: number;          // 1-10 scale
  underlyingPigment: string;
  naturalColor: string;   // Hex or HSL
  artificialOptions: ColorFormula[];
  porosityFactors: PorosityEffect[];
}

interface ColorFormula {
  id: string;
  brand: string;
  lineType: string;      // permanent, demi, etc.
  mixingRatio: string;
  processingTime: number;
  targetLevel: number;
  version: number;
  expectedResult: ColorData;
}

interface ClientRecord {
  id: string;
  name: string;
  currentLevel: number;
  targetLevel: number;
  formulas: string[];    // Array of formula IDs
  colorHistory: ColorTransaction[];
  notes: string;
}

interface ColorTransaction {
  id: string;
  date: Date;
  formulaId: string;
  startLevel: number;
  achievedLevel: number;
  processingTime: number;
  notes: string;
}

-- Supabase Schema Implementation

-- Color Levels Table
create table color_levels (
  id SERIAL PRIMARY KEY,
  level INTEGER NOT NULL CHECK (level BETWEEN 1 AND 10),
  name VARCHAR(50) NOT NULL,
  lab_values JSONB NOT NULL,
  underlying_pigment JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Color Formulas Table
create table color_formulas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  brand VARCHAR(50) NOT NULL,
  current_level INTEGER REFERENCES color_levels(id),
  target_level INTEGER REFERENCES color_levels(id),
  developer_volume INTEGER CHECK (developer_volume IN (10, 20, 30, 40)),
  mixing_ratio VARCHAR(10) NOT NULL,
  processing_time_min INTEGER NOT NULL,
  processing_time_max INTEGER NOT NULL,
  version INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Clients Table
create table clients (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name VARCHAR(100) NOT NULL,
  current_level INTEGER REFERENCES color_levels(level),
  target_level INTEGER REFERENCES color_levels(level),
  formulas JSONB DEFAULT '[]'::jsonb,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Color Transactions Table
create table color_transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) NOT NULL,
  formula_id UUID REFERENCES color_formulas(id) NOT NULL,
  start_level INTEGER REFERENCES color_levels(level),
  achieved_level INTEGER REFERENCES color_levels(level),
  processing_time INTEGER NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Row Level Security Policies
create policy "Users can view their own clients"
  on clients for select
  using (auth.uid() = user_id);

create policy "Users can insert their own clients"
  on clients for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own clients"
  on clients for update
  using (auth.uid() = user_id);

create policy "Users can view color transactions for their clients"
  on color_transactions for select
  using (
    exists (
      select 1 from clients
      where clients.id = color_transactions.client_id
      and clients.user_id = auth.uid()
    )
  );

-- Indexes for Performance
create index idx_color_formulas_target_level on color_formulas(target_level);
create index idx_clients_user_id on clients(user_id);
create index idx_color_transactions_client_id on color_transactions(client_id);

-- Database Service Implementation

-- Color Level Operations
export const colorLevelDB = {
  async getAll() {
    const { data, error } = await supabase
      .from('color_levels')
      .select('*')
      .order('level');
    
    if (error) throw error;
    return data;
  },

  async getByLevel(level: number) {
    const { data, error } = await supabase
      .from('color_levels')
      .select('*')
      .eq('level', level)
      .single();
    
    if (error) throw error;
    return data;
  }
};

-- Formula Operations
export const formulaDB = {
  async create(formula: Omit<ColorFormula, 'id'>) {
    const { data, error } = await supabase
      .from('color_formulas')
      .insert(formula)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getByTargetLevel(level: number) {
    const { data, error } = await supabase
      .from('color_formulas')
      .select('*')
      .eq('target_level', level)
      .order('version', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};

-- Client Operations
export const clientDB = {
  async create(client: Omit<ClientRecord, 'id'>) {
    const { data, error } = await supabase
      .from('clients')
      .insert({
        ...client,
        user_id: supabase.auth.user()?.id
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getClientHistory(clientId: string) {
    const { data, error } = await supabase
      .from('color_transactions')
      .select(`
        *,
        formula:color_formulas(*)
      `)
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};

-- Transaction Operations
export const transactionDB = {
  async create(transaction: Omit<ColorTransaction, 'id'>) {
    const { data, error } = await supabase
      .from('color_transactions')
      .insert(transaction)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getRecentTransactions(hours: number = 24) {
    const { data, error } = await supabase
      .from('color_transactions')
      .select(`
        *,
        client:clients(*),
        formula:color_formulas(*)
      `)
      .gte('created_at', new Date(Date.now() - hours * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};

-- Database Hooks

export function useColorLevels() {
  const [levels, setLevels] = useState<ColorLevel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadLevels = async () => {
      try {
        const data = await colorLevelDB.getAll();
        setLevels(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadLevels();
  }, []);

  return { levels, loading, error };
}

export function useClientHistory(clientId: string) {
  const [history, setHistory] = useState<ColorTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!clientId) return;

    const loadHistory = async () => {
      try {
        const data = await clientDB.getClientHistory(clientId);
        setHistory(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [clientId]);

  return { history, loading, error };
}

export function useRecentTransactions(hours: number = 24) {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<ColorTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) return;

    const loadTransactions = async () => {
      try {
        const data = await transactionDB.getRecentTransactions(hours);
        setTransactions(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, [user, hours]);

  return { transactions, loading, error };
}
```
```sql
-- Core Data Types
interface ColorSystem {
  levels: LevelData[];
  formulas: FormulaData[];
  clients: ClientRecord[];
  colorHistory: ColorTransaction[];
}

interface ColorLevel {
  level: number;          // 1-10 scale
  underlyingPigment: string;
  naturalColor: string;   // Hex or HSL
  artificialOptions: ColorFormula[];
  porosityFactors: PorosityEffect[];
}

interface ColorFormula {
  id: string;
  brand: string;
  lineType: string;      // permanent, demi, etc.
  mixingRatio: string;
  processingTime: number;
  targetLevel: number;
  version: number;
  expectedResult: ColorData;
}

interface ClientRecord {
  id: string;
  name: string;
  currentLevel: number;
  targetLevel: number;
  formulas: string[];    // Array of formula IDs
  colorHistory: ColorTransaction[];
  notes: string;
}

interface ColorTransaction {
  id: string;
  date: Date;
  formulaId: string;
  startLevel: number;
  achievedLevel: number;
  processingTime: number;
  notes: string;
}

-- Supabase Schema Implementation

-- Color Levels Table
create table color_levels (
  id SERIAL PRIMARY KEY,
  level INTEGER NOT NULL CHECK (level BETWEEN 1 AND 10),
  name VARCHAR(50) NOT NULL,
  lab_values JSONB NOT NULL,
  underlying_pigment JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Color Formulas Table
create table color_formulas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  brand VARCHAR(50) NOT NULL,
  current_level INTEGER REFERENCES color_levels(id),
  target_level INTEGER REFERENCES color_levels(id),
  developer_volume INTEGER CHECK (developer_volume IN (10, 20, 30, 40)),
  mixing_ratio VARCHAR(10) NOT NULL,
  processing_time_min INTEGER NOT NULL,
  processing_time_max INTEGER NOT NULL,
  version INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Clients Table
create table clients (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name VARCHAR(100) NOT NULL,
  current_level INTEGER REFERENCES color_levels(level),
  target_level INTEGER REFERENCES color_levels(level),
  formulas JSONB DEFAULT '[]'::jsonb,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Color Transactions Table
create table color_transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) NOT NULL,
  formula_id UUID REFERENCES color_formulas(id) NOT NULL,
  start_level INTEGER REFERENCES color_levels(level),
  achieved_level INTEGER REFERENCES color_levels(level),
  processing_time INTEGER NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Row Level Security Policies
create policy "Users can view their own clients"
  on clients for select
  using (auth.uid() = user_id);

create policy "Users can insert their own clients"
  on clients for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own clients"
  on clients for update
  using (auth.uid() = user_id);

create policy "Users can view color transactions for their clients"
  on color_transactions for select
  using (
    exists (
      select 1 from clients
      where clients.id = color_transactions.client_id
      and clients.user_id = auth.uid()
    )
  );

-- Indexes for Performance
create index idx_color_formulas_target_level on color_formulas(target_level);
create index idx_clients_user_id on clients(user_id);
create index idx_color_transactions_client_id on color_transactions(client_id);

-- Database Service Implementation

-- Color Level Operations
export const colorLevelDB = {
  async getAll() {
    const { data, error } = await supabase
      .from('color_levels')
      .select('*')
      .order('level');
    
    if (error) throw error;
    return data;
  },

  async getByLevel(level: number) {
    const { data, error } = await supabase
      .from('color_levels')
      .select('*')
      .eq('level', level)
      .single();
    
    if (error) throw error;
    return data;
  }
};

-- Formula Operations
export const formulaDB = {
  async create(formula: Omit<ColorFormula, 'id'>) {
    const { data, error } = await supabase
      .from('color_formulas')
      .insert(formula)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getByTargetLevel(level: number) {
    const { data, error } = await supabase
      .from('color_formulas')
      .select('*')
      .eq('target_level', level)
      .order('version', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};

-- Client Operations
export const clientDB = {
  async create(client: Omit<ClientRecord, 'id'>) {
    const { data, error } = await supabase
      .from('clients')
      .insert({
        ...client,
        user_id: supabase.auth.user()?.id
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getClientHistory(clientId: string) {
    const { data, error } = await supabase
      .from('color_transactions')
      .select(`
        *,
        formula:color_formulas(*)
      `)
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};

-- Transaction Operations
export const transactionDB = {
  async create(transaction: Omit<ColorTransaction, 'id'>) {
    const { data, error } = await supabase
      .from('color_transactions')
      .insert(transaction)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getRecentTransactions(hours: number = 24) {
    const { data, error } = await supabase
      .from('color_transactions')
      .select(`
        *,
        client:clients(*),
        formula:color_formulas(*)
      `)
      .gte('created_at', new Date(Date.now() - hours * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};

-- Database Hooks

export function useColorLevels() {
  const [levels, setLevels] = useState<ColorLevel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadLevels = async () => {
      try {
        const data = await colorLevelDB.getAll();
        setLevels(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadLevels();
  }, []);

  return { levels, loading, error };
}

export function useClientHistory(clientId: string) {
  const [history, setHistory] = useState<ColorTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!clientId) return;

    const loadHistory = async () => {
      try {
        const data = await clientDB.getClientHistory(clientId);
        setHistory(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [clientId]);

  return { history, loading, error };
}

export function useRecentTransactions(hours: number = 24) {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<ColorTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) return;

    const loadTransactions = async () => {
      try {
        const data = await transactionDB.getRecentTransactions(hours);
        setTransactions(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, [user, hours]);

  return { transactions, loading, error };
}
