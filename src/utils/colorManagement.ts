import { useState, useEffect } from 'react';

interface ColorProfile {
  gamut: 'srgb' | 'p3' | 'rec2020';
  brightness: number;
  contrast: number;
}

interface ColorAdjustments {
  saturation: number;
  brightness: number;
  contrast: number;
}

export interface ColorSpaces {
  hex: string;
  rgb: { r: number; g: number; b: number };
  displayP3?: { r: number; g: number; b: number };
}

// Detect device color capabilities
export const detectColorCapabilities = (): ColorProfile => {
  const supportsP3 = window.matchMedia('(color-gamut: p3)').matches;
  const supportsRec2020 = window.matchMedia('(color-gamut: rec2020)').matches;
  
  return {
    gamut: supportsRec2020 ? 'rec2020' : supportsP3 ? 'p3' : 'srgb',
    brightness: 1,
    contrast: 1
  };
};

// Convert hex to RGB
export const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

// Get optimal color value based on device capabilities
export const getOptimalColorValue = (
  colorSpaces: ColorSpaces,
  adjustments?: ColorAdjustments
): string => {
  const profile = detectColorCapabilities();
  
  if (profile.gamut === 'p3' && colorSpaces.displayP3) {
    const { r, g, b } = colorSpaces.displayP3;
    return `color(display-p3 ${r} ${g} ${b})`;
  }
  
  const { r, g, b } = colorSpaces.rgb;
  if (adjustments) {
    return `rgb(${adjustColor(r, adjustments)}, ${adjustColor(g, adjustments)}, ${adjustColor(b, adjustments)})`;
  }
  
  return `rgb(${r}, ${g}, ${b})`;
};

// Adjust color values based on device-specific calibration
const adjustColor = (value: number, adjustments: ColorAdjustments): number => {
  let adjusted = value;
  adjusted *= adjustments.brightness;
  adjusted = Math.pow(adjusted / 255, adjustments.contrast) * 255;
  return Math.max(0, Math.min(255, Math.round(adjusted)));
};

// Hook for color calibration
export const useColorCalibration = (initialAdjustments?: ColorAdjustments) => {
  const [adjustments, setAdjustments] = useState<ColorAdjustments>({
    saturation: 1,
    brightness: 1,
    contrast: 1,
    ...initialAdjustments
  });

  const calibrate = (newAdjustments: Partial<ColorAdjustments>) => {
    setAdjustments(prev => ({
      ...prev,
      ...newAdjustments
    }));
  };

  return { adjustments, calibrate };
};
