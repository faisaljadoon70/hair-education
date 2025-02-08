export interface HairShade {
  id: string;
  level: number;
  primaryTone: number;
  secondaryTone?: number;
  name: string;
  description: string;
  hexColor: string;
  rgbColor: {
    r: number;
    g: number;
    b: number;
  };
  series: 'natural' | 'ash' | 'gold' | 'copper' | 'red' | 'mahogany' | 'violet' | 'special';
  coverage: {
    gray: number; // Percentage of gray coverage
    lifting: number; // Number of levels it can lift
  };
  undertone: string;
  isHighLift: boolean;
  formulation: {
    baseColor: string;
    developer: number[];  // Supported developer volumes
    mixing: {
      colorRatio: number;
      developerRatio: number;
    };
    processingTime: {
      minimum: number;
      maximum: number;
    };
  };
}

export interface ShadeCardSeries {
  id: string;
  name: string;
  description: string;
  shades: HairShade[];
  properties: {
    grayCoverage: boolean;
    liftingCapability: boolean;
    specialMixing: boolean;
  };
}

export interface ToneFamily {
  id: number;
  name: string;
  description: string;
  properties: {
    warm: boolean;
    cool: boolean;
    neutral: boolean;
  };
}

export const TONE_FAMILIES: { [key: number]: ToneFamily } = {
  0: {
    id: 0,
    name: 'Natural',
    description: 'Balanced, neutral tones without strong warm or cool reflects',
    properties: { warm: false, cool: false, neutral: true }
  },
  1: {
    id: 1,
    name: 'Ash',
    description: 'Cool, neutralizing tones that combat warmth',
    properties: { warm: false, cool: true, neutral: false }
  },
  2: {
    id: 2,
    name: 'Iridescent',
    description: 'Pearlescent, multi-dimensional cool tones',
    properties: { warm: false, cool: true, neutral: false }
  },
  3: {
    id: 3,
    name: 'Gold',
    description: 'Warm, rich golden tones',
    properties: { warm: true, cool: false, neutral: false }
  },
  4: {
    id: 4,
    name: 'Copper',
    description: 'Warm, vibrant copper tones',
    properties: { warm: true, cool: false, neutral: false }
  },
  5: {
    id: 5,
    name: 'Mahogany',
    description: 'Rich, deep red-brown tones',
    properties: { warm: true, cool: false, neutral: false }
  },
  6: {
    id: 6,
    name: 'Red',
    description: 'Vibrant, intense red tones',
    properties: { warm: true, cool: false, neutral: false }
  },
  7: {
    id: 7,
    name: 'Green',
    description: 'Neutralizing tones for red correction',
    properties: { warm: false, cool: true, neutral: false }
  },
  8: {
    id: 8,
    name: 'Blue',
    description: 'Neutralizing tones for orange correction',
    properties: { warm: false, cool: true, neutral: false }
  },
  9: {
    id: 9,
    name: 'Violet',
    description: 'Cool, purple-based tones for yellow neutralization',
    properties: { warm: false, cool: true, neutral: false }
  }
};

export const BASE_LEVELS: { [key: number]: string } = {
  1: '#090909', // True Black
  2: '#1a1110', // Soft Black
  3: '#2a1d1b', // Darkest Brown
  4: '#3b2820', // Dark Brown
  5: '#584039', // Medium Brown
  6: '#8b6b5d', // Light Brown
  7: '#b69b8f', // Dark Blonde
  8: '#d4b9a9', // Medium Blonde
  9: '#e8d5c7', // Light Blonde
  10: '#f5e6db' // Lightest Blonde
};

export interface ProcessingTime {
  developer: number;
  virgin: {
    minimum: number;
    maximum: number;
  };
  retouch: {
    minimum: number;
    maximum: number;
  };
  factors: {
    resistant: number;
    porous: number;
    fine: number;
    coarse: number;
  };
}

export const PROCESSING_TIMES: ProcessingTime[] = [
  {
    developer: 10,
    virgin: { minimum: 25, maximum: 35 },
    retouch: { minimum: 20, maximum: 30 },
    factors: {
      resistant: 1.2,
      porous: 0.8,
      fine: 0.9,
      coarse: 1.1
    }
  },
  {
    developer: 20,
    virgin: { minimum: 30, maximum: 40 },
    retouch: { minimum: 25, maximum: 35 },
    factors: {
      resistant: 1.25,
      porous: 0.75,
      fine: 0.85,
      coarse: 1.15
    }
  },
  {
    developer: 30,
    virgin: { minimum: 35, maximum: 45 },
    retouch: { minimum: 30, maximum: 40 },
    factors: {
      resistant: 1.3,
      porous: 0.7,
      fine: 0.8,
      coarse: 1.2
    }
  },
  {
    developer: 40,
    virgin: { minimum: 40, maximum: 50 },
    retouch: { minimum: 35, maximum: 45 },
    factors: {
      resistant: 1.35,
      porous: 0.65,
      fine: 0.75,
      coarse: 1.25
    }
  }
];

export interface UndertoneChart {
  level: number;
  natural: string;
  exposed: string;
  hexColor: string;
}

export const UNDERTONE_CHART: UndertoneChart[] = [
  {
    level: 1,
    natural: 'Blue-Black',
    exposed: 'None',
    hexColor: '#090909'
  },
  {
    level: 2,
    natural: 'Blue-Black',
    exposed: 'Dark Blue-Red',
    hexColor: '#1a1110'
  },
  {
    level: 3,
    natural: 'Dark Brown',
    exposed: 'Dark Red',
    hexColor: '#2a1d1b'
  },
  {
    level: 4,
    natural: 'Red-Brown',
    exposed: 'Red',
    hexColor: '#3b2820'
  },
  {
    level: 5,
    natural: 'Red-Orange',
    exposed: 'Red-Orange',
    hexColor: '#584039'
  },
  {
    level: 6,
    natural: 'Orange',
    exposed: 'Orange',
    hexColor: '#8b6b5d'
  },
  {
    level: 7,
    natural: 'Orange-Gold',
    exposed: 'Yellow-Orange',
    hexColor: '#b69b8f'
  },
  {
    level: 8,
    natural: 'Yellow-Gold',
    exposed: 'Yellow',
    hexColor: '#d4b9a9'
  },
  {
    level: 9,
    natural: 'Yellow',
    exposed: 'Pale Yellow',
    hexColor: '#e8d5c7'
  },
  {
    level: 10,
    natural: 'Pale Yellow',
    exposed: 'Lightest Yellow',
    hexColor: '#f5e6db'
  }
];
