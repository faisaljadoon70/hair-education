import { HairShade } from '@/types/shadeCard';

export interface HairLevel {
  id: number;
  level: number;
  name: string;
  description: string;
  underlying_pigment: string;
  neutralizing_tone: string;
  technical_notes: string;
}

export interface LevelFormula {
  id: string;
  startingLevel: number;
  targetLevel: number;
  startingTone: HairShade;
  targetTone: HairShade;
  porosity: number;
  createdAt: string;
}

export interface PracticeResult {
  id: number;
  starting_level: number;
  target_level: number;
  formula_used: LevelFormula;
  result_level: number;
  notes: string;
  created_at: string;
}

export interface ColorPrediction {
  finalColor: HairLevel;
  processingTime: number;
  developerStrength: number;
  recommendations?: string[];
  warnings?: string[];
}

export interface ColorRelationship {
  fromLevel: number;
  toLevel: number;
  relationship: 'requires' | 'compatible' | 'results_in';
  strength: number;
  notes?: string;
}
