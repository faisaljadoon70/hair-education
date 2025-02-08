export interface ColorProduct {
  id: string;
  brand: string;
  name: string;
  type: 'permanent' | 'semi-permanent' | 'demi-permanent' | 'temporary';
  levels: number[];
  baseColor: string;
  undertone: string;
  mixingRatio: string;
  processingTime: {
    min: number;
    max: number;
  };
  developer: {
    volumes: number[];
    defaultVolume: number;
  };
}

export interface ColorBrand {
  id: string;
  name: string;
  description: string;
  website?: string;
  logo?: string;
  products: ColorProduct[];
  colorSystem: {
    levels: number[];
    undertones: string[];
    specialMixingRules?: Record<string, string>;
  };
}

export interface ColorPlugin {
  id: string;
  name: string;
  version: string;
  brand: ColorBrand;
  // Custom color calculation logic for this brand
  calculateResult: (params: ColorCalculationParams) => ColorResult;
  // Custom mixing rules for this brand
  getMixingRules: (color1: ColorProduct, color2: ColorProduct) => MixingRule;
  // Brand-specific validation rules
  validateFormula: (formula: ColorFormula) => ValidationResult;
}

export interface ColorCalculationParams {
  startLevel: number;
  targetLevel: number;
  selectedProduct: ColorProduct;
  developer: number;
  processingTime: number;
  additionalFactors?: Record<string, any>;
}

export interface ColorResult {
  expectedLevel: number;
  expectedTone: string;
  processingTime: number;
  developer: number;
  warnings?: string[];
  notes?: string[];
}

export interface MixingRule {
  ratio: string;
  processingTime: number;
  developer: number;
  isCompatible: boolean;
  warnings?: string[];
  notes?: string[];
}

export interface ColorFormula {
  products: Array<{
    product: ColorProduct;
    amount: number;
  }>;
  developer: number;
  processingTime: number;
  notes?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors?: string[];
  warnings?: string[];
}

export type PluginRegistry = Record<string, ColorPlugin>;
