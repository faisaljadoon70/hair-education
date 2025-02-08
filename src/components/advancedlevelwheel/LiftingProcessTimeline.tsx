import React from 'react';
import { motion } from 'framer-motion';

export interface TimelineStage {
  level: number;
  undertone: string;
  timeRequired: number;
  warnings: string[];
  recommendations: string[];
  processingPhases: {
    application: number;
    processing: number;
    toning?: number;
  };
}

export interface LiftingProcessTimelineProps {
  stages: TimelineStage[];
  totalTime: number;
  startingLevel: number;
  targetLevel: number;
  hairCondition: {
    porosity: number;
    chemicallyTreated: boolean;
    bleached: boolean;
    resistant: boolean;
    texture: string;
    scalpCondition: string;
  };
}

const LiftingProcessTimeline: React.FC<LiftingProcessTimelineProps> = ({
  stages,
  totalTime,
  startingLevel,
  targetLevel,
  hairCondition
}) => {
  const getLevelColor = (level: number): string => {
    const colors = {
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
    return colors[level as keyof typeof colors] || '#000000';
  };

  const getUndertoneDescription = (undertone: string): string => {
    const descriptions = {
      'Blue/Black': 'Cool, neutral base with blue-black reflects',
      'Deep Red/Orange': 'Warm base with intense red-orange pigments',
      'Red/Copper': 'Warm, rich copper with red undertones',
      'Orange/Gold': 'Warm golden tones with orange reflects',
      'Yellow': 'Light, warm yellow undertones'
    };
    return descriptions[undertone as keyof typeof descriptions] || undertone;
  };

  const getRecommendedToner = (undertone: string): string => {
    const toners = {
      'Blue/Black': 'Blue-violet toner to maintain coolness',
      'Deep Red/Orange': 'Blue-based toner to neutralize warmth',
      'Red/Copper': 'Green-based toner to neutralize red',
      'Orange/Gold': 'Violet-based toner to neutralize gold',
      'Yellow': 'Purple-based toner to neutralize yellow'
    };
    return toners[undertone as keyof typeof toners] || '';
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Process Overview</h3>
          <div className="text-sm text-gray-500">
            Total Time: <span className="text-pink-600 font-medium">{totalTime} minutes</span>
          </div>
        </div>
        
        {/* Timeline Progress Bar */}
        <div className="relative h-2 bg-gray-100 rounded-full mb-6">
          <motion.div
            className="absolute left-0 h-full bg-pink-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1 }}
          />
          {stages.map((stage, index) => (
            <div
              key={index}
              className="absolute w-3 h-3 bg-white border-2 border-pink-600 rounded-full -mt-0.5"
              style={{ left: `${(index + 1) * (100 / (stages.length + 1))}%` }}
            />
          ))}
        </div>

        {/* Color Preview */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-full border-4 border-white shadow-lg"
              style={{ backgroundColor: getLevelColor(startingLevel) }}
            />
            <div className="text-sm">
              <div className="font-medium">Starting Level {startingLevel}</div>
              <div className="text-gray-500">Current Color</div>
            </div>
          </div>
          <div className="flex-1 h-0.5 bg-gray-200 mx-4 relative">
            <motion.div
              className="absolute inset-0 bg-pink-200"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5 }}
            />
          </div>
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-full border-4 border-white shadow-lg"
              style={{ backgroundColor: getLevelColor(targetLevel) }}
            />
            <div className="text-sm">
              <div className="font-medium">Target Level {targetLevel}</div>
              <div className="text-gray-500">Final Color</div>
            </div>
          </div>
        </div>

        {/* Hair Condition Indicators */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm font-medium mb-1">Porosity</div>
            <div className="text-xs text-gray-600">
              Level {hairCondition.porosity}/10
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm font-medium mb-1">Texture</div>
            <div className="text-xs text-gray-600">
              {hairCondition.texture}
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm font-medium mb-1">Scalp</div>
            <div className="text-xs text-gray-600">
              {hairCondition.scalpCondition}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Stages */}
      <div className="space-y-4">
        {stages.map((stage, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-6 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-full border-4 border-white shadow-lg"
                    style={{ backgroundColor: getLevelColor(stage.level) }}
                  />
                  <div>
                    <h4 className="text-lg font-medium">Level {stage.level}</h4>
                    <div className="text-sm text-gray-500">Stage {index + 1}</div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-medium text-pink-600">
                  {stage.timeRequired} min
                </div>
                <div className="text-sm text-gray-500">Processing Time</div>
              </div>
            </div>

            {/* Processing Phases */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm font-medium">Application</div>
                <div className="text-xs text-gray-600">
                  {stage.processingPhases.application} minutes
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm font-medium">Processing</div>
                <div className="text-xs text-gray-600">
                  {stage.processingPhases.processing} minutes
                </div>
              </div>
              {stage.processingPhases.toning && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm font-medium">Toning</div>
                  <div className="text-xs text-gray-600">
                    {stage.processingPhases.toning} minutes
                  </div>
                </div>
              )}
            </div>

            {/* Undertone Information */}
            <div className="mb-4">
              <div className="text-sm font-medium mb-2">Expected Undertone</div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm mb-1">{stage.undertone}</div>
                <div className="text-xs text-gray-600">
                  {getUndertoneDescription(stage.undertone)}
                </div>
              </div>
            </div>

            {/* Recommendations */}
            {stage.recommendations.length > 0 && (
              <div className="mb-4">
                <div className="text-sm font-medium mb-2">Recommendations</div>
                <ul className="text-sm text-gray-600 space-y-1">
                  {stage.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Warnings */}
            {stage.warnings.length > 0 && (
              <div>
                <div className="text-sm font-medium mb-2">Important Notes</div>
                <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3">
                  <ul className="text-sm text-yellow-800 space-y-1">
                    {stage.warnings.map((warning, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-yellow-500">⚠️</span>
                        {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LiftingProcessTimeline;
