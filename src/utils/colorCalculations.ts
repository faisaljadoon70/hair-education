export interface HairHistory {
  previousTreatments: {
    bleached: boolean;
    colored: boolean;
    chemicallyTreated: boolean;
    lastTreatmentDate?: Date;
  };
  naturalLevel: number;
  currentLevel: number;
  targetLevel: number;
}

export interface HairProperties {
  porosity: number;
  texture: 'Fine' | 'Medium' | 'Coarse';
  resistant: boolean;
  scalpCondition: 'Healthy' | 'Sensitive' | 'Irritated';
}

export interface DeveloperRecommendation {
  volume: number;
  reasoning: string[];
  warnings: string[];
  processingTime: number;
}

export interface ColorPrediction {
  expectedResult: {
    level: number;
    undertone: string;
    warmth: number; // 0-100, where 0 is cool and 100 is warm
  };
  developerRecommendation: DeveloperRecommendation;
  toner: {
    recommended: boolean;
    type?: string;
    reason?: string;
  };
  multipleProcesses: {
    required: boolean;
    numberOfSessions: number;
    timeBetweenSessions: number; // in days
    reason?: string;
  };
}

export function calculateDeveloperVolume(
  startLevel: number,
  targetLevel: number,
  hairProperties: HairProperties,
  history: HairHistory
): DeveloperRecommendation {
  const levelsOfLift = targetLevel - startLevel;
  const warnings: string[] = [];
  const reasoning: string[] = [];
  let volume = 20; // Default volume
  let processingTime = 30; // Default processing time in minutes

  // Base volume calculation
  if (levelsOfLift <= 1) {
    volume = 20;
    reasoning.push("1 level lift or deposit only - 20 volume recommended");
  } else if (levelsOfLift <= 2) {
    volume = 30;
    reasoning.push("2 levels lift - 30 volume recommended");
  } else if (levelsOfLift <= 4) {
    volume = 40;
    reasoning.push("3-4 levels lift - 40 volume recommended");
  } else {
    volume = 40;
    warnings.push("More than 4 levels of lift requires multiple sessions");
  }

  // Adjustments based on hair properties
  if (hairProperties.scalpCondition === 'Sensitive') {
    volume = Math.max(20, volume - 10);
    warnings.push("Reduced developer volume due to sensitive scalp");
  }

  if (hairProperties.texture === 'Fine') {
    volume = Math.max(20, volume - 10);
    reasoning.push("Reduced volume for fine hair texture");
  } else if (hairProperties.texture === 'Coarse') {
    processingTime += 15;
    reasoning.push("Increased processing time for coarse hair");
  }

  if (hairProperties.resistant) {
    processingTime += 15;
    reasoning.push("Extended processing time for resistant hair");
  }

  if (hairProperties.porosity > 7) {
    volume = Math.max(20, volume - 10);
    warnings.push("Adjusted volume due to high porosity");
  }

  // History-based adjustments
  if (history.previousTreatments.bleached) {
    volume = Math.max(20, volume - 10);
    warnings.push("Reduced volume due to previous bleaching");
  }

  return {
    volume,
    reasoning,
    warnings,
    processingTime
  };
}

export function calculateColorResult(
  hairHistory: HairHistory,
  hairProperties: HairProperties
): ColorPrediction {
  const developer = calculateDeveloperVolume(
    hairHistory.currentLevel,
    hairHistory.targetLevel,
    hairProperties,
    hairHistory
  );

  const levelsOfLift = hairHistory.targetLevel - hairHistory.currentLevel;
  const expectedUndertone = predictUndertone(hairHistory.currentLevel, hairHistory.targetLevel);
  
  const prediction: ColorPrediction = {
    expectedResult: {
      level: hairHistory.targetLevel,
      undertone: expectedUndertone,
      warmth: calculateWarmth(hairHistory.currentLevel, hairHistory.targetLevel)
    },
    developerRecommendation: developer,
    toner: {
      recommended: false
    },
    multipleProcesses: {
      required: levelsOfLift > 4,
      numberOfSessions: Math.ceil(levelsOfLift / 4),
      timeBetweenSessions: 14,
      reason: levelsOfLift > 4 ? "More than 4 levels of lift requires multiple sessions" : undefined
    }
  };

  // Determine if toner is needed
  if (['Yellow', 'Orange/Gold', 'Red/Orange'].includes(expectedUndertone)) {
    prediction.toner = {
      recommended: true,
      type: getToneRecommendation(expectedUndertone),
      reason: `Neutralize ${expectedUndertone.toLowerCase()} undertones`
    };
  }

  return prediction;
}

function predictUndertone(currentLevel: number, targetLevel: number): string {
  const undertoneMap: { [key: number]: string } = {
    1: 'Blue/Black',
    2: 'Blue/Black',
    3: 'Dark Brown',
    4: 'Red/Brown',
    5: 'Red/Orange',
    6: 'Orange/Gold',
    7: 'Gold',
    8: 'Yellow/Gold',
    9: 'Yellow',
    10: 'Pale Yellow'
  };

  return undertoneMap[targetLevel] || 'Neutral';
}

function calculateWarmth(currentLevel: number, targetLevel: number): number {
  // Base warmth increases as we lift
  let warmth = (targetLevel - currentLevel) * 15;
  
  // Adjust for natural warmth exposure
  if (targetLevel > 6) {
    warmth += 20;
  }
  
  // Cap warmth at 100
  return Math.min(100, Math.max(0, warmth));
}

function getToneRecommendation(undertone: string): string {
  const toneMap: { [key: string]: string } = {
    'Yellow': 'Violet-based toner',
    'Orange/Gold': 'Blue/Violet-based toner',
    'Red/Orange': 'Green/Blue-based toner',
    'Red': 'Green-based toner'
  };

  return toneMap[undertone] || 'Neutral toner';
}
