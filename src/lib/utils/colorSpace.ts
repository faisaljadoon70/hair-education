// Color space conversion utilities

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface Lab {
  L: number;
  a: number;
  b: number;
}

// Convert hex color to RGB
export function hexToRgb(hex: string): RGB {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

// Convert RGB to Lab color space
export function rgbToLab(rgb: RGB): Lab {
  // First, convert RGB to XYZ
  let rr = rgb.r / 255;
  let gg = rgb.g / 255;
  let bb = rgb.b / 255;

  // Apply gamma correction
  const r1 = rr > 0.04045 ? Math.pow((rr + 0.055) / 1.055, 2.4) : rr / 12.92;
  const g1 = gg > 0.04045 ? Math.pow((gg + 0.055) / 1.055, 2.4) : gg / 12.92;
  const b1 = bb > 0.04045 ? Math.pow((bb + 0.055) / 1.055, 2.4) : bb / 12.92;

  // Convert to XYZ
  const x = (r1 * 0.4124 + g1 * 0.3576 + b1 * 0.1805) * 100;
  const y = (r1 * 0.2126 + g1 * 0.7152 + b1 * 0.0722) * 100;
  const z = (r1 * 0.0193 + g1 * 0.1192 + b1 * 0.9505) * 100;

  // Convert XYZ to Lab
  const xn = 95.047;
  const yn = 100.000;
  const zn = 108.883;

  const fx = x / xn > 0.008856 ? Math.pow(x / xn, 1/3) : (7.787 * x / xn) + 16/116;
  const fy = y / yn > 0.008856 ? Math.pow(y / yn, 1/3) : (7.787 * y / yn) + 16/116;
  const fz = z / zn > 0.008856 ? Math.pow(z / zn, 1/3) : (7.787 * z / zn) + 16/116;

  const L = (116 * fy) - 16;
  const a = 500 * (fx - fy);
  const b = 200 * (fy - fz);

  return { L, a, b };
}

// Convert Lab color back to hex
export function labToHex(lab: Lab): string {
  // First convert Lab to XYZ
  const y = (lab.L + 16) / 116;
  const x = lab.a / 500 + y;
  const z = y - lab.b / 200;

  const xn = 95.047;
  const yn = 100.000;
  const zn = 108.883;

  const x3 = Math.pow(x, 3);
  const z3 = Math.pow(z, 3);
  const y3 = Math.pow(y, 3);

  const xr = x3 > 0.008856 ? x3 : (x - 16/116) / 7.787;
  const yr = y3 > 0.008856 ? y3 : (y - 16/116) / 7.787;
  const zr = z3 > 0.008856 ? z3 : (z - 16/116) / 7.787;

  const X = xr * xn;
  const Y = yr * yn;
  const Z = zr * zn;

  // Convert XYZ to RGB
  let r = X * 0.032406 - Y * 0.015372 - Z * 0.004986;
  let g = -X * 0.009689 + Y * 0.018758 + Z * 0.000415;
  let b = X * 0.000557 - Y * 0.002040 + Z * 0.010570;

  // Apply gamma correction
  r = r > 0.0031308 ? 1.055 * Math.pow(r, 1/2.4) - 0.055 : 12.92 * r;
  g = g > 0.0031308 ? 1.055 * Math.pow(g, 1/2.4) - 0.055 : 12.92 * g;
  b = b > 0.0031308 ? 1.055 * Math.pow(b, 1/2.4) - 0.055 : 12.92 * b;

  // Convert to 0-255 range and clamp
  const red = Math.max(0, Math.min(255, Math.round(r * 255)));
  const green = Math.max(0, Math.min(255, Math.round(g * 255)));
  const blue = Math.max(0, Math.min(255, Math.round(b * 255)));

  // Convert to hex
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
}

// Calculate color in Lab space considering undertone
export function calculateColorWithUndertone(
  baseColor: string,
  undertone: 'ash' | 'violet' | 'green' | 'pearl' | 'silver' | 'natural' | 'gold' | 'copper' | 'mahogany' | 'red',
  strength: number = 1
): string {
  const baseLab = rgbToLab(hexToRgb(baseColor));
  
  // Undertone adjustments in Lab space
  const undertoneAdjustments: Record<string, { a: number; b: number }> = {
    ash: { a: -5, b: -5 },      // More green-blue
    violet: { a: 10, b: -10 },  // More purple
    green: { a: -10, b: 5 },    // More green
    pearl: { a: -2, b: -2 },    // Slight cool
    silver: { a: 0, b: -5 },    // Cool
    natural: { a: 0, b: 0 },    // No adjustment
    gold: { a: 2, b: 15 },      // Warm yellow
    copper: { a: 15, b: 20 },   // Warm orange
    mahogany: { a: 20, b: 10 }, // Warm red-brown
    red: { a: 25, b: 15 }       // Pure red
  };

  const adjustment = undertoneAdjustments[undertone] || { a: 0, b: 0 };
  
  // Apply undertone adjustments with strength factor
  const adjustedLab = {
    L: baseLab.L,
    a: baseLab.a + (adjustment.a * strength),
    b: baseLab.b + (adjustment.b * strength)
  };

  return labToHex(adjustedLab);
}

// Predict final color based on starting level, target level, and undertone
export function predictFinalColor(
  startLevel: number,
  targetLevel: number,
  undertone: string,
  porosity: number = 5
): { color: string; processingTime: number } {
  // Base colors for levels (simplified version)
  const levelColors = {
    1: '#0f0f0f', // Black
    2: '#1a1a1a', // Darkest Brown
    3: '#2a2a2a', // Dark Brown
    4: '#3a3a3a', // Medium Brown
    5: '#4a4a4a', // Light Brown
    6: '#6a6a6a', // Dark Blonde
    7: '#8a8a8a', // Medium Blonde
    8: '#aaaaaa', // Light Blonde
    9: '#cccccc', // Very Light Blonde
    10: '#eeeeee' // Lightest Blonde
  };

  // Get base colors
  const startColor = levelColors[startLevel as keyof typeof levelColors];
  const targetColor = levelColors[targetLevel as keyof typeof levelColors];

  // Convert to Lab space
  const startLab = rgbToLab(hexToRgb(startColor));
  const targetLab = rgbToLab(hexToRgb(targetColor));

  // Calculate processing time based on level difference and porosity
  const levelDifference = Math.abs(targetLevel - startLevel);
  const porosityFactor = 1 + (porosity - 5) / 10; // Porosity adjustment
  const baseProcessingTime = 30; // Base processing time in minutes
  const processingTime = Math.round(baseProcessingTime * levelDifference * porosityFactor);

  // Calculate final color in Lab space
  const finalLab = {
    L: targetLab.L,
    a: targetLab.a,
    b: targetLab.b
  };

  // Apply undertone
  const finalColor = calculateColorWithUndertone(labToHex(finalLab), undertone as any);

  return {
    color: finalColor,
    processingTime
  };
}
