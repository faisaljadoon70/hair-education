/**
 * Color mixing implementation for web interface level wheel
 */

interface LabColor {
  L: number;
  a: number;
  b: number;
}

interface RGBColor {
  r: number;
  g: number;
  b: number;
}

// Color space conversion utilities
const hexToRgb = (hex: string): RGBColor => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
};

const rgbToLab = (rgb: RGBColor): LabColor => {
  // Convert RGB to XYZ
  let rNorm = rgb.r / 255;
  let gNorm = rgb.g / 255;
  let bNorm = rgb.b / 255;

  rNorm = rNorm > 0.04045 ? Math.pow((rNorm + 0.055) / 1.055, 2.4) : rNorm / 12.92;
  gNorm = gNorm > 0.04045 ? Math.pow((gNorm + 0.055) / 1.055, 2.4) : gNorm / 12.92;
  bNorm = bNorm > 0.04045 ? Math.pow((bNorm + 0.055) / 1.055, 2.4) : bNorm / 12.92;

  const x = rNorm * 0.4124564 + gNorm * 0.3575761 + bNorm * 0.1804375;
  const y = rNorm * 0.2126729 + gNorm * 0.7151522 + bNorm * 0.0721750;
  const z = rNorm * 0.0193339 + gNorm * 0.1191920 + bNorm * 0.9503041;

  // Convert XYZ to Lab
  const xRef = 0.95047;
  const yRef = 1.0;
  const zRef = 1.08883;

  const fx = x / xRef > 0.008856 ? Math.pow(x / xRef, 1/3) : (903.3 * x / xRef + 16) / 116;
  const fy = y / yRef > 0.008856 ? Math.pow(y / yRef, 1/3) : (903.3 * y / yRef + 16) / 116;
  const fz = z / zRef > 0.008856 ? Math.pow(z / zRef, 1/3) : (903.3 * z / zRef + 16) / 116;

  const L = 116 * fy - 16;
  const a = 500 * (fx - fy);
  const b = 200 * (fy - fz);

  return { L, a, b };
};

const labToHex = (lab: LabColor): string => {
  const { L, a: labA, b: labB } = lab;
  
  // Lab to XYZ
  const fy = (L + 16) / 116;
  const fx = labA / 500 + fy;
  const fz = fy - labB / 200;

  const xRef = 0.95047;
  const yRef = 1.0;
  const zRef = 1.08883;

  const x = xRef * (fx ** 3 > 0.008856 ? fx ** 3 : (116 * fx - 16) / 903.3);
  const y = yRef * (L > 903.3 * 0.008856 ? ((L + 16) / 116) ** 3 : L / 903.3);
  const z = zRef * (fz ** 3 > 0.008856 ? fz ** 3 : (116 * fz - 16) / 903.3);

  // XYZ to RGB
  let rNorm = x * 3.2404542 - y * 1.5371385 - z * 0.4985314;
  let gNorm = -x * 0.9692660 + y * 1.8760108 + z * 0.0415560;
  let bNorm = x * 0.0556434 - y * 0.2040259 + z * 1.0572252;

  rNorm = rNorm > 0.0031308 ? 1.055 * Math.pow(rNorm, 1 / 2.4) - 0.055 : 12.92 * rNorm;
  gNorm = gNorm > 0.0031308 ? 1.055 * Math.pow(gNorm, 1 / 2.4) - 0.055 : 12.92 * gNorm;
  bNorm = bNorm > 0.0031308 ? 1.055 * Math.pow(bNorm, 1 / 2.4) - 0.055 : 12.92 * bNorm;

  const toHex = (n: number): string => {
    const hex = Math.max(0, Math.min(255, Math.round(n * 255))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(rNorm)}${toHex(gNorm)}${toHex(bNorm)}`;
};

// Web interface specific types
export interface WebHairColor {
  level: number;
  hexColor: string;
  undertone: 'warm' | 'cool' | 'neutral';
  lab?: LabColor;
}

export interface WebMixResult {
  resultLevel: number;
  resultHex: string;
  resultLab: LabColor;
}

// Web-specific mixing function
export function mixWebHairColors(color1: WebHairColor, color2: WebHairColor, ratio: number): WebMixResult {
  // Ensure LAB values are computed
  if (!color1.lab) {
    color1.lab = rgbToLab(hexToRgb(color1.hexColor));
  }
  if (!color2.lab) {
    color2.lab = rgbToLab(hexToRgb(color2.hexColor));
  }

  // Mix in Lab space
  const mixedLab = {
    L: color1.lab.L * (1 - ratio) + color2.lab.L * ratio,
    a: color1.lab.a * (1 - ratio) + color2.lab.a * ratio,
    b: color1.lab.b * (1 - ratio) + color2.lab.b * ratio,
  };

  return {
    resultLevel: color1.level * (1 - ratio) + color2.level * ratio,
    resultHex: labToHex(mixedLab),
    resultLab: mixedLab
  };
}
