export interface ToneDefinition {
  code: string;          // e.g., "1", "2", "3"
  name: string;          // e.g., "Ash", "Violet", "Gold"
  hexColor: string;      // Base hex color for this tone
  description: string;   // Description of the tone
  undertoneStrength: number; // 1-10 scale of how strong the undertone is
}

export interface HairTone {
  primary: ToneDefinition;
  secondary?: ToneDefinition; // For mixed tones
  intensity: number;     // 1-10 scale
}

export interface EnhancedHairLevel {
  level: number;         // Main level (1-10)
  subLevel: number;      // Decimal part (0-9)
  baseTone: HairTone;
  naturalUndertone: ToneDefinition;
  hexColor: string;      // Final calculated color
  name: string;          // Display name
  description: string;   // Detailed description
}

// Define all possible tones
export const HAIR_TONES: { [key: string]: ToneDefinition } = {
  "0": {
    code: "0",
    name: "Natural",
    hexColor: "#000000",
    description: "Natural tone without reflect",
    undertoneStrength: 0
  },
  "1": {
    code: "1",
    name: "Ash",
    hexColor: "#4B4B4B",
    description: "Cool blue-based tone that neutralizes warmth",
    undertoneStrength: 7
  },
  "2": {
    code: "2",
    name: "Violet",
    hexColor: "#4A2F4C",
    description: "Purple-based tone that neutralizes yellow",
    undertoneStrength: 8
  },
  "3": {
    code: "3",
    name: "Gold",
    hexColor: "#B5933A",
    description: "Warm yellow-based tone",
    undertoneStrength: 6
  },
  "4": {
    code: "4",
    name: "Copper",
    hexColor: "#B5642A",
    description: "Warm orange-based tone",
    undertoneStrength: 8
  },
  "5": {
    code: "5",
    name: "Mahogany",
    hexColor: "#8B3A3A",
    description: "Red-violet balanced tone",
    undertoneStrength: 7
  },
  "6": {
    code: "6",
    name: "Red",
    hexColor: "#A31F1F",
    description: "Pure red tone",
    undertoneStrength: 9
  },
  "7": {
    code: "7",
    name: "Green",
    hexColor: "#2F4C2F",
    description: "Green-based corrective tone",
    undertoneStrength: 5
  },
  "8": {
    code: "8",
    name: "Pearl",
    hexColor: "#B5B5C3",
    description: "Iridescent mauve-based tone",
    undertoneStrength: 4
  },
  "9": {
    code: "9",
    name: "Silver",
    hexColor: "#C0C0C0",
    description: "Metallic-based tone",
    undertoneStrength: 3
  }
};

// Helper function to blend two colors
export function blendColors(color1: string, color2: string, ratio: number = 0.5): string {
  const hex1 = color1.replace('#', '');
  const hex2 = color2.replace('#', '');
  
  const r1 = parseInt(hex1.substring(0, 2), 16);
  const g1 = parseInt(hex1.substring(2, 4), 16);
  const b1 = parseInt(hex1.substring(4, 6), 16);
  
  const r2 = parseInt(hex2.substring(0, 2), 16);
  const g2 = parseInt(hex2.substring(2, 4), 16);
  const b2 = parseInt(hex2.substring(4, 6), 16);
  
  const r = Math.round(r1 * (1 - ratio) + r2 * ratio);
  const g = Math.round(g1 * (1 - ratio) + g2 * ratio);
  const b = Math.round(b1 * (1 - ratio) + b2 * ratio);
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// Base colors for each level
export const BASE_LEVEL_COLORS: { [key: number]: string } = {
  1: "#0A0A0A", // Darkest black
  2: "#1C1C1C", // Soft black
  3: "#2E2E2E", // Darkest brown
  4: "#3D3D3D", // Dark brown
  5: "#4F4F4F", // Medium brown
  6: "#696969", // Light brown
  7: "#808080", // Darkest blonde
  8: "#A0A0A0", // Medium blonde
  9: "#C0C0C0", // Light blonde
  10: "#E0E0E0" // Lightest blonde
};

// Function to calculate final color based on level and tone
export function calculateFinalColor(level: number, tone: HairTone): string {
  const baseColor = BASE_LEVEL_COLORS[level];
  let finalColor = baseColor;

  // Blend with primary tone
  finalColor = blendColors(finalColor, tone.primary.hexColor, tone.intensity / 10);

  // If there's a secondary tone, blend it too
  if (tone.secondary) {
    finalColor = blendColors(finalColor, tone.secondary.hexColor, (tone.intensity * 0.7) / 10);
  }

  return finalColor;
}
