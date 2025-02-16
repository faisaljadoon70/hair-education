import type { HairShade } from './shadeCard';

export interface EnvironmentalFactors {
  climate?: string;
  humidity?: string;
  temperature?: string;
}

export interface TechniqueDetails {
  applicationMethod?: string;
  specialTools?: string[];
  heatApplication?: string;
}

export interface ClientSpecificNotes {
  hairTexture?: string;
  porosityNotes?: string;
  previousChemicalServices?: string;
}

export interface ResultsDocumentation {
  beforeAfterExpectations?: string;
  commonPitfalls?: string;
  successRate?: number;
}

export interface SavedFormula {
  id: string;
  userId: string;
  name: string;
  // Core Features
  startingLevel: number;
  startingTone: HairShade | null;
  targetLevel: number;
  targetTone: HairShade | null;
  hairPorosity: number;
  developerVolume: number;
  processingTime: number;
  mixingRatio: string;
  
  // Custom Approach
  isCustom: boolean;
  originalFormulaId?: string;
  customDeveloperVolume?: number;
  customProcessingTime?: number;
  customMixingRatio?: string;
  customNotes?: string;

  // Optional Features
  environmentalFactors?: EnvironmentalFactors;
  techniqueDetails?: TechniqueDetails;
  clientSpecificNotes?: ClientSpecificNotes;
  resultsDocumentation?: ResultsDocumentation;

  createdAt?: string;
  updatedAt?: string;
  subscriptionTier: 'basic' | 'premium' | 'professional';
}

export interface FormulaError {
  message: string;
  field?: string;
}

export interface FormulaBuilderProps {
  userId: string;
  subscriptionTier: 'basic' | 'premium' | 'professional';
  onSave?: (formula: SavedFormula) => void;
  onError?: (error: FormulaError) => void;
}

export interface ColorTheoryAnalysis {
  startingLevel: number;
  startingTone: string;
  underlyingPigment: string;
  targetLevel: number;
  targetTone: string;
  colorFamily: string;
  requiredLift: number;
}

export interface ProcessingPhases {
  application: number;
  processing: number;
  toning?: number;
}

export interface SystemRecommendations {
  developerVolume: number;
  developerNotes: string[];
  processingTime: number;
  processingPhases: ProcessingPhases;
  professionalNotes: string[];
  safetyConsiderations: string[];
  applicationTips: string[];
}

export interface EnhancedFormula {
  colorTheory: ColorTheoryAnalysis;
  recommendations: SystemRecommendations;
}
