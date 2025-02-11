import {
  HairColor,
  HairCondition,
  Step,
  HairTransformationApproach,
  ColorChangeRequest,
  TransformationPath
} from '../types/hairTransformation';

function canLiftDirectly(
  startingColor: HairColor,
  targetColor: HairColor,
  hairCondition: HairCondition
): boolean {
  const levelDifference = targetColor.level - startingColor.level;
  return (
    levelDifference <= 2 &&
    hairCondition.health === 'healthy' &&
    !hairCondition.previousTreatments.includes('bleached')
  );
}

function requiresGradualLifting(
  startingColor: HairColor,
  targetColor: HairColor,
  hairCondition: HairCondition
): boolean {
  const levelDifference = targetColor.level - startingColor.level;
  return (
    levelDifference > 2 ||
    hairCondition.health === 'damaged' ||
    hairCondition.previousTreatments.includes('bleached')
  );
}

function getPossibleApproaches(
  startingColor: HairColor,
  targetColor: HairColor,
  hairCondition: HairCondition,
  developerVolumes: number[]
): HairTransformationApproach[] {
  const approaches: HairTransformationApproach[] = [];

  // Direct Lift and Tone
  if (canLiftDirectly(startingColor, targetColor, hairCondition)) {
    approaches.push({
      id: 'direct-lift-tone',
      name: 'Direct Lift and Tone',
      description: 'Lift and tone in one step using a high-volume developer.',
      steps: [],
      overallConsiderations: ['Best for healthy hair with minimal level difference.'],
      difficultyLevel: 'intermediate',
      suitableHairTypes: [{ 
        porosity: 'low',
        previousTreatments: ['virgin'],
        health: 'healthy',
        underlyingPigment: 'neutral'
      }],
      successProbability: 0.9,
      timeEfficiency: 5,
      hairHealthImpact: 2,
      costEffectiveness: 4,
      maintenanceRequirements: 3
    });
  }

  // Gradual Lifting
  if (requiresGradualLifting(startingColor, targetColor, hairCondition)) {
    approaches.push({
      id: 'gradual-lifting',
      name: 'Gradual Lifting',
      description: 'Lift hair gradually over multiple sessions to minimize damage.',
      steps: [],
      overallConsiderations: ['Ideal for damaged or highly porous hair.'],
      difficultyLevel: 'advanced',
      suitableHairTypes: [{ 
        porosity: 'high',
        previousTreatments: ['bleached'],
        health: 'damaged',
        underlyingPigment: 'warm'
      }],
      successProbability: 0.8,
      timeEfficiency: 2,
      hairHealthImpact: 4,
      costEffectiveness: 2,
      maintenanceRequirements: 4
    });
  }

  return approaches;
}

function calculateStepsForApproach(
  approach: HairTransformationApproach,
  startingColor: HairColor,
  targetColor: HairColor,
  hairCondition: HairCondition
): Step[] {
  const steps: Step[] = [];
  const levelDifference = targetColor.level - startingColor.level;

  switch (approach.id) {
    case 'direct-lift-tone':
      steps.push({
        type: 'lift',
        description: 'Direct lift to target level',
        colorFormula: {
          baseColor: targetColor,
          developerVolume: 30,
          mixingRatio: '1:2'
        },
        processingTime: 45,
        cautions: [
          'Monitor lifting process closely',
          'Do not exceed 45 minutes processing time'
        ],
        tips: [
          'Check hair every 10 minutes',
          'Apply to mid-lengths and ends last'
        ]
      });
      break;

    case 'gradual-lifting':
      // First session
      steps.push({
        type: 'pre-lighten',
        description: 'First lightening session',
        colorFormula: {
          baseColor: { level: startingColor.level + 2, tone: '.0' },
          developerVolume: 20,
          mixingRatio: '1:2'
        },
        processingTime: 35,
        cautions: [
          'Watch for signs of damage',
          'Stop if hair becomes gummy'
        ],
        tips: [
          'Apply to mid-lengths first',
          'Leave roots for last 15 minutes'
        ]
      });

      // Toning if needed
      if (targetColor.tone !== '.0') {
        steps.push({
          type: 'tone',
          description: 'Toning to neutralize warmth',
          colorFormula: {
            baseColor: { ...targetColor },
            developerVolume: 10,
            mixingRatio: '1:2'
          },
          processingTime: 20,
          cautions: ['Check color development frequently'],
          tips: ['Apply evenly', 'Use cool water to rinse']
        });
      }
      break;
  }

  return steps;
}

function calculateSuccessProbability(
  approach: HairTransformationApproach,
  hairCondition: HairCondition
): number {
  let probability = approach.successProbability;

  if (hairCondition.health === 'damaged') probability -= 0.2;
  if (hairCondition.porosity === 'high') probability -= 0.1;

  return Math.max(0, Math.min(1, probability));
}

function calculateTimeEfficiency(
  totalProcessingTime: number,
  totalSessions: number
): number {
  // 1-5 scale, 5 being most efficient
  if (totalSessions === 1 && totalProcessingTime <= 60) return 5;
  if (totalSessions === 1 && totalProcessingTime <= 90) return 4;
  if (totalSessions === 2) return 3;
  if (totalSessions === 3) return 2;
  return 1;
}

function calculateTotalSessions(steps: Step[], maxSessions: number): number {
  // Group steps by session based on type
  let sessions = 1;
  let currentSessionTime = 0;

  steps.forEach(step => {
    if (currentSessionTime + step.processingTime > 120) {
      sessions++;
      currentSessionTime = step.processingTime;
    } else {
      currentSessionTime += step.processingTime;
    }
  });

  return Math.min(sessions, maxSessions);
}

function rankPaths(paths: TransformationPath[]): TransformationPath[] {
  return paths.sort((a, b) => {
    const weights = {
      timeEfficiency: 0.3,
      hairHealthImpact: 0.4,
      costEffectiveness: 0.2,
      maintenanceRequirements: 0.1,
    };

    const scoreA =
      a.approach.timeEfficiency * weights.timeEfficiency +
      (5 - a.approach.hairHealthImpact) * weights.hairHealthImpact +
      a.approach.costEffectiveness * weights.costEffectiveness +
      (5 - a.approach.maintenanceRequirements) * weights.maintenanceRequirements;

    const scoreB =
      b.approach.timeEfficiency * weights.timeEfficiency +
      (5 - b.approach.hairHealthImpact) * weights.hairHealthImpact +
      b.approach.costEffectiveness * weights.costEffectiveness +
      (5 - b.approach.maintenanceRequirements) * weights.maintenanceRequirements;

    return scoreB - scoreA; // Higher score = better
  });
}

export function calculateTransformationPaths(
  currentLevel: number,
  currentTone: string,
  targetLevel: number,
  targetTone: string,
  hairCondition: HairCondition
): TransformationPath[] {
  const paths: TransformationPath[] = [];
  const levelDifference = Math.abs(targetLevel - currentLevel);
  const isLifting = targetLevel > currentLevel;
  const maxLiftPerSession = hairCondition.health === 'damaged' ? 1 : 2;
  const sessions = Math.ceil(levelDifference / maxLiftPerSession);
  const baseProcessingTime = 45;

  // Adjust success rate based on hair condition
  const getSuccessRate = () => {
    let rate = 90;
    if (hairCondition.health === 'damaged') rate -= 10;
    if (hairCondition.porosity === 'high') rate -= 5;
    if (hairCondition.previousTreatments.includes('bleached')) rate -= 5;
    return Math.max(rate, 70);
  };

  // Get difficulty based on conditions
  const getDifficulty = () => {
    if (hairCondition.health === 'damaged' || levelDifference > 3) return 'Advanced';
    if (levelDifference > 2 || hairCondition.previousTreatments.length > 0) return 'Intermediate';
    return 'Beginner';
  };

  // Direct path for small level differences and healthy hair
  if (levelDifference <= maxLiftPerSession && hairCondition.health === 'healthy') {
    paths.push({
      name: "Direct Lift and Tone",
      description: `Single process ${isLifting ? 'lift' : 'deposit'} and tone using appropriate developer volume.`,
      sessions: 1,
      time: baseProcessingTime,
      steps: [
        {
          description: "Preparation",
          formula: `Mix equal parts of ${targetLevel} ${targetTone} with ${isLifting ? Math.min(levelDifference * 20, 40) : 10} volume developer`,
          processingTime: "45 minutes total",
          details: [
            "Section the hair into 4 quadrants",
            "Perform a strand test on a small section",
            "Protect client's skin with barrier cream",
            "Wear protective gloves throughout the process"
          ],
          cautions: hairCondition.porosity === 'high' ? "Monitor closely due to high porosity" : "Ensure proper sectioning and even application",
          tips: "Use clips to maintain clean sections"
        },
        {
          description: "Application Process",
          formula: `Level ${targetLevel} ${targetTone} with ${isLifting ? Math.min(levelDifference * 20, 40) : 10} volume developer`,
          processingTime: "30-45 minutes",
          details: [
            "Start application at the back nape area",
            "Work in thin sections (1/8 inch)",
            "Apply color 1 inch away from scalp",
            "Once complete, go back and apply to scalp area",
            "Ensure even saturation throughout"
          ],
          cautions: hairCondition.previousTreatments.includes('bleached') ? "Take extra care with previously bleached areas" : "Avoid overlapping on previously colored hair",
          tips: "Use a timer and check every 5-10 minutes"
        },
        {
          description: "Processing and Monitoring",
          formula: "Continue checking color development",
          processingTime: "Check every 5-10 minutes",
          details: [
            "Monitor the color development visually",
            "Perform a strand test at 30 minutes",
            "Check scalp comfort with client",
            "Look for even color development"
          ],
          cautions: hairCondition.porosity === 'high' ? "Check more frequently due to high porosity" : "Do not exceed maximum processing time",
          tips: "Keep detailed timing notes for future reference"
        },
        {
          description: "Rinsing and Post-Care",
          formula: "Use color-safe shampoo and conditioner",
          processingTime: "15-20 minutes",
          details: [
            "Emulsify color gently before rinsing",
            "Rinse with lukewarm water until clear",
            "Apply post-color treatment for 5 minutes",
            "Use cool water for final rinse",
            "Apply leave-in treatment if needed"
          ],
          cautions: "Ensure all color is thoroughly rinsed",
          tips: hairCondition.porosity === 'high' ? "Use extra conditioning treatment" : "Schedule follow-up appointment for toner if needed"
        }
      ],
      considerations: [
        "Client's natural level and desired result",
        "Hair porosity and condition",
        "Previous chemical services",
        "Scalp sensitivity",
        "Home care routine recommendations",
        "Maintenance schedule"
      ],
      successRate: getSuccessRate(),
      difficulty: getDifficulty()
    });
  }

  // Multiple steps for bigger level differences or damaged hair
  if (levelDifference > maxLiftPerSession || hairCondition.health === 'damaged') {
    paths.push({
      name: "Progressive Lift and Tone",
      description: "Multiple sessions to safely achieve target level while maintaining hair integrity.",
      sessions: sessions,
      time: baseProcessingTime,
      steps: [
        {
          description: "Initial Assessment",
          formula: "Detailed consultation and strand test",
          processingTime: "15-20 minutes",
          details: [
            "Analyze current hair condition",
            "Perform elasticity test",
            "Check porosity levels",
            "Document existing color history",
            "Take 'before' photos"
          ],
          cautions: hairCondition.health === 'damaged' ? "Note areas of significant damage" : "Note any contraindications",
          tips: "Create detailed client record"
        },
        {
          description: "First Lightening Session",
          formula: `Level ${currentLevel + maxLiftPerSession} with ${Math.min(maxLiftPerSession * 20, 30)} volume developer`,
          processingTime: "35-45 minutes",
          details: [
            "Section hair into quadrants",
            "Apply lightener to mid-lengths first",
            "Work in thin, consistent sections",
            "Monitor lifting process closely",
            "Process until desired level is reached"
          ],
          cautions: hairCondition.health === 'damaged' ? "Monitor integrity closely" : "Avoid scalp contact initially",
          tips: hairCondition.porosity === 'high' ? "Check every 5 minutes" : "Use foils for precise application"
        },
        {
          description: "Deep Conditioning Treatment",
          formula: "Professional strengthening treatment",
          processingTime: "20 minutes",
          details: [
            "Apply protein treatment",
            "Use heat for better penetration",
            "Focus on most processed areas",
            "Assess hair condition",
            "Plan next session timing"
          ],
          cautions: hairCondition.porosity === 'high' ? "Balance protein and moisture carefully" : "Monitor hair's protein/moisture balance",
          tips: "Recommend take-home treatments"
        }
      ],
      considerations: [
        `${sessions} sessions required for safe lifting`,
        "Hair integrity is the top priority",
        "Regular conditioning treatments needed",
        "Careful monitoring between sessions",
        "Adjusted timing based on hair response",
        "Home care protocol is crucial"
      ],
      successRate: getSuccessRate(),
      difficulty: getDifficulty()
    });
  }

  return paths;
}

function generateExplanation(approach: HairTransformationApproach): string {
  let explanation = `${approach.name}\n\n`;
  explanation += `${approach.description}\n\n`;
  explanation += 'Steps:\n';

  approach.steps.forEach((step, index) => {
    explanation += `${index + 1}. ${step.description}\n`;
    explanation += `   • Formula: Level ${step.colorFormula.baseColor.level}${step.colorFormula.baseColor.tone} with ${step.colorFormula.developerVolume} volume developer\n`;
    explanation += `   • Processing Time: ${step.processingTime} minutes\n`;
    if (step.cautions.length) {
      explanation += `   • Cautions: ${step.cautions.join(', ')}\n`;
    }
    if (step.tips.length) {
      explanation += `   • Tips: ${step.tips.join(', ')}\n`;
    }
    explanation += '\n';
  });

  explanation += '\nOverall Considerations:\n';
  approach.overallConsiderations.forEach(consideration => {
    explanation += `• ${consideration}\n`;
  });

  return explanation;
}
