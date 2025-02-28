import { getOptimalColorValue, hexToRgb, ColorSpaces } from '../utils/colorManagement';

describe('Color Consistency Tests', () => {
  // Test color space detection
  test('should detect color space support', () => {
    // Mock window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(color-gamut: p3)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });

    const colorSpaces: ColorSpaces = {
      hex: '#FF5733',
      rgb: { r: 255, g: 87, b: 51 },
      displayP3: { r: 1, g: 0.341, b: 0.2 }
    };

    const result = getOptimalColorValue(colorSpaces);
    expect(result).toContain('display-p3');
  });

  // Test hex to RGB conversion
  test('should correctly convert hex to RGB', () => {
    const result = hexToRgb('#FF5733');
    expect(result).toEqual({
      r: 255,
      g: 87,
      b: 51
    });
  });

  // Test color adjustments
  test('should apply color adjustments correctly', () => {
    const colorSpaces: ColorSpaces = {
      hex: '#FF5733',
      rgb: { r: 255, g: 87, b: 51 }
    };

    const adjustments = {
      brightness: 0.8,
      contrast: 1.2,
      saturation: 1
    };

    const result = getOptimalColorValue(colorSpaces, adjustments);
    expect(result).toMatch(/^rgb\(\d+,\s*\d+,\s*\d+\)$/);
  });
});

// Visual regression tests
describe('Visual Color Tests', () => {
  test('should maintain color consistency across renders', async () => {
    // Note: This requires setting up visual regression testing tools
    // like Percy or Applitools
    
    // Example using Percy (pseudo-code)
    /*
    await page.goto('http://localhost:3000/level-wheel/shade-card');
    await percySnapshot('shade-card-colors');
    
    // Test mobile view
    await page.setViewport({ width: 375, height: 812 });
    await percySnapshot('shade-card-colors-mobile');
    */
  });
});
