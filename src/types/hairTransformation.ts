export interface HairColor {
  level: number; // 1-10
  tone: string; // e.g., .6 (gold), .7 (ash)
}

export interface HairCondition {
  porosity: 'low' | 'medium' | 'high';
  previousTreatments: ('virgin' | 'bleached' | 'colored' | 'permed')[];
  health: 'damaged' | 'healthy';
  underlyingPigment: 'warm' | 'cool' | 'neutral';
}

export interface Step {
  type: 'lift' | 'tone' | 'deposit' | 'pre-lighten' | 'color-correct';
  description: string;
  colorFormula: {
    baseColor: HairColor;
    developerVolume: number; // 10, 20, 30, 40
    mixingRatio: string; // e.g., "1:2"
  };
  processingTime: number; // in minutes
  cautions: string[];
  tips: string[];
}

export interface HairTransformationApproach {
  id: string;
  name: string;
  description: string;
  steps: Step[];
  overallConsiderations: string[];
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  suitableHairTypes: HairCondition[];
  successProbability: number; // 0-1
  timeEfficiency: number; // 1-5
  hairHealthImpact: number; // 1-5 (1 = least impact)
  costEffectiveness: number; // 1-5
  maintenanceRequirements: number; // 1-5
}

export interface ColorChangeRequest {
  startingColor: HairColor;
  targetColor: HairColor;
  hairCondition: HairCondition;
  maxSessions: number;
  developerVolumes: number[]; // Allowed developer volumes
}

export interface TransformationPath {
  approach: HairTransformationApproach;
  totalProcessingTime: number;
  totalSessions: number;
  explanation: string;
  alternatives: HairTransformationApproach[];
}
